import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { NotifyYandexLogIn } from "../../../components/senderEMails/NotifyYandexLogIn";
import axios from "axios";

const CLIENT_ID = process.env.YANDEX_CLIENT_ID;
const CLIENT_SECRET = process.env.YANDEX_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.SITE_URL}/api/auth/yandex`;

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get("/api/user", { headers: { Authorization: `Bearer ${token}` } })
                .then(() => NextResponse.redirect(process.env.SITE_URL))
                .catch(() => localStorage.removeItem("token"));
        }

        const { searchParams } = new URL(req.url);
        const code = searchParams.get("code");

        if (!code) {
            return NextResponse.json({ error: "No authorisation code" }, { status: 400 });
        }

        const tokenResponse = await fetch("https://oauth.yandex.ru/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            return NextResponse.json({ error: tokenData.error_description || "Error when receiving a token" }, { status: 400 });
        }

        const userResponse = await fetch("https://login.yandex.ru/info", {
            method: "POST",
            headers: {
                "Authorization": `OAuth ${tokenData.access_token}`,
            },
        });

        const userInfo = await userResponse.json();

        if (userInfo.code == "Code has expired") {
            return NextResponse.redirect(`${process.env.SITE_URL}/login`);
        }

        const login = userInfo.login;
        const email = userInfo.default_email;
        const firstname = userInfo.firstname;
        const lastname = userInfo.lastname;

        const existingUserLogin = await prisma.users.findUnique({ where: { login } });
        if (existingUserLogin) {
            if (existingUserLogin.email != userInfo.email) {
                await prisma.users.update({
                    where: { id: existingUserLogin.id },
                    data: {
                        email: userInfo.email,
                        methodOfReg: "ya_oauth"
                    },
                });
            }
        } else {
            await prisma.users.create({
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    login: login,
                    email: email,
                    password: `yandex_id_psuid=${userInfo}`,
                    methodOfReg: "ya_oauth"
                },
            });

            const user = await prisma.users.findUnique({ where: { login } });
            await prisma.premiumobj.create({
                data: {
                    userId: user.id
                },
            });
        }

        const new_token = jwt.sign(
            { id: user.id, login: user.login }, process.env.JWT_SECRET, {
            expiresIn: process.env.HOURS_EXPIRES_TOKEN,
        });
        localStorage.setItem("token", new_token);

        NotifyYandexLogIn(email, firstname, req);

        // return NextResponse.redirect(`${process.env.SITE_URL}`);

        return new Response(JSON.stringify({ message: "Sign up via YANDEX ID was successfully!", token, isNewUser }), { status: 201 });


    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}