import { NextResponse } from "next/server";
import { sendSuccessfulVerifyEmail } from "../../components/senderEMails/sendSuccessfulVerifyEmail";
import { PrismaClient } from "@prisma/client";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { verifyCode } = await req.json();

        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized! Please login!" }), { status: 401 });
        }

        const userId = session.user.id;

        if (!verifyCode) {
            return new Response(JSON.stringify({ error: "Fill in the field!" }), { status: 400 });
        }

        const userById = await prisma.users.findUnique(
            { where: { id: userId } }
        );

        if (userById.verifyCode === "null") {
            return NextResponse.json({ message: "User's EMail was verificated successfully! Without EMail Notify." }, { status: 201 });
        }

        if (verifyCode !== userById.verifyCode) {
            return NextResponse.json({ error: "This code is not correct!" }, { status: 404 });
        }

        const updatedUser = await prisma.users.update({
            where: { id: userId },
            data: {
                verifyCode: "null",
            },
        });

        try {
            await sendSuccessfulVerifyEmail(updatedUser.email, updatedUser.firstname, req);
            return NextResponse.json({ message: "User's EMail was verificated successfully!" }, { status: 201 });
        } catch (err) {
            return NextResponse.json({ message: "User's EMail was verificated successfully! Without EMail Notify." }, { status: 201 });
        }


    } catch (errorCatch) {
        console.error("Sign up error: ", errorCatch);
        return new Response(JSON.stringify({ error: `Server error! Error: ${errorCatch}` }), { status: 500 });
    }
}
