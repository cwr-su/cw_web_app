import { NextResponse } from "next/server";
import { sendSuccessfulVerifyEmail } from "../../components/senderEMails/sendSuccessfulVerifyEmail";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { verifyCode, userId } = await req.json();

        if (!verifyCode, !userId) {
            return new Response(JSON.stringify({ error: "Fill in the field!" }), { status: 400 });
        }

        const userById = await prisma.users.findUnique(
            { where: { id: userId } }
        );

        if (verifyCode !== userById.verifyCode) {
            return NextResponse.json({error: "This code is not correct!"}, {status: 404});
        }

        const updatedUser = await prisma.users.update({
            where: { id: userId },
            data: {
                verifyCode: "null",
            },
        });

        await sendSuccessfulVerifyEmail(updatedUser.email, updatedUser.firstname, req);

        const response = NextResponse.json({ message: "User's EMail was verificated successfully!" }, { status: 201 });
        return response;

    } catch (error) {
        console.error("Sign up error: ", error);
        return new Response(JSON.stringify({ error: "Server error!" }), { status: 500 });
    }
}
