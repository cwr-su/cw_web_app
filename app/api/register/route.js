import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export const dynamic = "force-static";
// export const revalidate = 10;

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return new Response(JSON.stringify({ error: "Заполните все поля" }), { status: 400 });
        }

        // Проверяем, существует ли уже пользователь по EMail
        const existingUserEMail = await prisma.user.findUnique({ where: { email } });
        if (existingUserEMail) {
            return new Response(JSON.stringify({ error: "Пользователь с таким EMail уже существует" }), { status: 400 });
        }

        const existingUserLogin = await prisma.user.findUnique({ where: { username } });
        if (existingUserLogin) {
            return new Response(JSON.stringify({ error: "Пользователь с таким логином уже существует" }), { status: 400 });
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаём пользователя в базе
        const newUser = await prisma.user.create({
            data: { username: username, email: email, password: hashedPassword },
        });

        return new Response(JSON.stringify({ message: "Регистрация успешна!" }), { status: 201 });
    } catch (error) {
        console.error("Ошибка регистрации:", error);
        return new Response(JSON.stringify({ error: "Ошибка на сервере" }), { status: 500 });
    }
}
