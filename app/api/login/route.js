import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { generateNewJWTToken } from "../../components/generateNewJWTToken/generateNewJWTToken";
import { NotifyCWIDLogIn } from "../../components/senderEMails/NotifyCwIdLogIn";

const JWT_SECRET = process.env.JWT_SECRET;
const HOURS_EXPIRES_TOKEN = process.env.HOURS_EXPIRES_TOKEN;

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { login, password } = await req.json();

        const user = await prisma.users.findUnique({ where: { login } });

        if (!user) {
            console.log("User not found:", login);
            return new Response(JSON.stringify({ error: "login" }), { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid credentials for user:", login);
            return new Response(JSON.stringify({ error: "password" }), { status: 401 });
        }

        const new_token = await generateNewJWTToken(JWT_SECRET, HOURS_EXPIRES_TOKEN, user);

        let response;

        try {
            await NotifyCWIDLogIn(email, firstname, verifyCode, req);

            response = NextResponse.json({ message: "Successfully login in CW ID! Notification has been sent" }, { status: 201 });
            response.headers.set(
                "Set-Cookie",
                `token=${new_token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${HOURS_EXPIRES_TOKEN * 3600}`
            );
        } catch {
            response = NextResponse.json({ message: "Successfully login in CW ID! Notification has not been sent (CW Mailer Error. Try disconnect VPN.)" }, { status: 201 });
            response.headers.set(
                "Set-Cookie",
                `token=${new_token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${HOURS_EXPIRES_TOKEN * 3600}`
            );
        }
        return response;

    } catch (error) {
        const response = NextResponse.json({ error: "server" }, { status: 400 });
        return response;
    }
}
