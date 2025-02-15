import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || "2e1fbd3222815089d9cd39d63654a2c053285a5ca3dda46bb6cc201e718552e5";

export async function POST(req) {
    try {
        const { username, password } = await req.json(); // Изменено с email на username

        // Проверяем, существует ли пользователь
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            return new Response(JSON.stringify({ error: "Пользователь не найден" }), { status: 401 });
        }

        // Проверяем пароль
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ error: "Неверные учетные данные" }), { status: 401 });
        }

        // Создаём JWT-токен
        const token = jwt.sign({ id: user.id, username: user.username }, secret, {
            expiresIn: "1h",
        });

        return new Response(JSON.stringify({ token }), { status: 200 });
    } catch (error) {
        console.error("Ошибка входа:", error);
        return new Response(JSON.stringify({ error: "Ошибка входа" }), { status: 500 });
    }
}
