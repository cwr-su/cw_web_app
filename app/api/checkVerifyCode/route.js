import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { userId } = await req.json();

        if (!userId) {
            return Response.json({ error: "Missing userId" }, { status: 400 });
        }

        const user = await prisma.users.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        const isVerified = user.verifyCode === "null" || user.verifyCode === "none";

        return Response.json({ isVerified });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
