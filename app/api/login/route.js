import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || "2e1fbd3222815089d9cd39d63654a2c053285a5ca3dda46bb6cc201e718552e5";

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

        const token = jwt.sign(
            { id: user.id, login: user.login }, secret, {
            expiresIn: process.env.HOURS_EXPIRES_TOKEN,
        }
        );

        console.log("User logged in:", login);
        return new Response(JSON.stringify({ token }), { status: 200 });
    } catch (error) {
        console.error("Login error:", error);
        return new Response(JSON.stringify({ error: "server" }), { status: 500 });
    }
}
