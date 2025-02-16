import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic"; // Обработаем запросы динамически

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        // Логируем запрос
        console.log("Request received:", req);

        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            console.log("Validation failed: missing fields");
            return new Response(JSON.stringify({ error: "Заполните все поля" }), { status: 400 });
        }

        // Проверяем, существует ли уже пользователь по EMail
        const existingUserEMail = await prisma.user.findUnique({ where: { email } });
        if (existingUserEMail) {
            console.log("User with email already exists:", email);
            return new Response(JSON.stringify({ error: "Пользователь с таким EMail уже существует" }), { status: 400 });
        }

        const existingUserLogin = await prisma.user.findUnique({ where: { username } });
        if (existingUserLogin) {
            console.log("User with username already exists:", username);
            return new Response(JSON.stringify({ error: "Пользователь с таким логином уже существует" }), { status: 400 });
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаём пользователя в базе
        const newUser = await prisma.user.create({
            data: { username, email, password: hashedPassword },
        });

        console.log("User created successfully:", newUser);

        return new Response(JSON.stringify({ message: "Регистрация успешна!" }), { status: 201 });
    } catch (error) {
        console.error("Ошибка регистрации:", error);
        return new Response(JSON.stringify({ error: "Ошибка на сервере" }), { status: 500 });
    }
}
