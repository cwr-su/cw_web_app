import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NotifyYandexLogIn } from "../../../components/senderEMails/NotifyYandexLogIn";
import { YandexLoginLinkGenerate } from "../../../components/YandexLoginLinkGenerate";
import { generateNewJWTToken } from "../../../components/generateNewJWTToken/generateNewJWTToken";

const CLIENT_ID = process.env.YANDEX_CLIENT_ID;
const CLIENT_SECRET = process.env.YANDEX_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.SITE_URL}/api/auth/yandex`;
const JWT_SECRET = process.env.JWT_SECRET;
const HOURS_EXPIRES_TOKEN = process.env.HOURS_EXPIRES_TOKEN;

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const code = searchParams.get("code");

        if (!code) {
            return NextResponse.json({ error: "No authorization code" }, { status: 400 });
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
        if (tokenData.error_description == "Code has expired") {
            const authUrl = YandexLoginLinkGenerate();

            console.log("Redirecting to:", authUrl);

            return NextResponse.redirect(authUrl.authUrl, 302);
        }
        if (!tokenResponse.ok) {
            return NextResponse.json({ error: tokenData.error_description || "Error when receiving a token" }, { status: 400 });
        }

        const userResponse = await fetch("https://login.yandex.ru/info", {
            method: "POST",
            headers: { "Authorization": `OAuth ${tokenData.access_token}` },
        });

        const userInfo = await userResponse.json();
        if (userInfo.code === "Code has expired") {
            return NextResponse.redirect(`${process.env.SITE_URL}/login`);
        }

        const login = userInfo.login;
        let email = userInfo.default_email;
        const firstname = userInfo.first_name;
        const lastname = userInfo.last_name;

        if (await prisma.users.findUnique({ where: { email } })) {
            return NextResponse.redirect(`${process.env.SITE_URL}/login?error=email_exists`);
        }

        let user = await prisma.users.findUnique({ where: { login } });
        if (user) {
            if (user.email !== email) {
                await prisma.users.update({
                    where: { id: user.id },
                    data: { email, methodOfReg: "ya_oauth" },
                });
            }
        } else {
            user = await prisma.users.create({
                data: {
                    firstname,
                    lastname,
                    login,
                    email,
                    password: `yandex_id_psuid=${userInfo.psuid}`,
                    methodOfReg: "ya_oauth",
                },
            });

            await prisma.premiumobj.create({ data: { userId: user.id } });
        }

        const new_token = await generateNewJWTToken(JWT_SECRET, HOURS_EXPIRES_TOKEN, user);

        NotifyYandexLogIn(email, firstname, req);

        const response = NextResponse.redirect(process.env.SITE_URL);
        response.headers.set(
            "Set-Cookie",
            `token=${new_token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${HOURS_EXPIRES_TOKEN * 3600}`
        );

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
