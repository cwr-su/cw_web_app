import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { sendVerificationEmail } from "../../components/senderEMails/VerificationCodeSendFromReg";
import { generateVerificationCode } from "../../components/generateVerificationCode";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { firstname, lastname, login, email, password1, password2 } = await req.json();

        if (!firstname || !lastname || !login || !email || !password1 || !password2) {
            return new Response(JSON.stringify({ error: "Fill in all fields!", fieldNameErr: "emptyFileds" }), { status: 400 });
        }

        const existingUserEMail = await prisma.users.findUnique({ where: { email } });
        if (existingUserEMail) {
            return new Response(JSON.stringify({ error: "A user with this EMail already exists", fieldNameErr: "email" }), { status: 400 });
        }

        const existingUserLogin = await prisma.users.findUnique({ where: { login } });
        if (existingUserLogin) {
            return new Response(JSON.stringify({ error: "A user with this login already exists", fieldNameErr: "login" }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password1, 10);

        const verifyCode = await generateVerificationCode();

        const user = await prisma.users.create({
            data: {
                firstname: firstname,
                lastname: lastname,
                login: login,
                email: email,
                password: hashedPassword,
                verifyCode: verifyCode
            },
        });

        await prisma.premiumobj.create({
            data: {
                userId: user.id
            },
        });

        let response;
        
        try {
            await sendVerificationEmail(email, firstname, verifyCode, req);
            response = NextResponse.json({ message: "Sign up successful! Verification code sent!" }, { status: 201 });
        } catch (err) {
            console.log(`Error with sending EMail: Error: ${err}`);
            response = NextResponse.json({ message: "Sign up successful! BUT Verification code has not been sent (CW Mailer Error. Try disconnect VPN.)" }, { status: 201 });
        }

        return response;

    } catch (error) {
        console.error("Sign up error: ", error);
        return new Response(JSON.stringify({ error: "Server error!" }), { status: 500 });
    }
}
