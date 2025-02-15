import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/utils/auth"; // Функция для проверки JWT

const prisma = new PrismaClient();

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
            include: { user: { select: { id: true, username: true } } } // Получаем данные автора поста
        });
        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Ошибка загрузки постов" }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        const token = req.headers.get("Authorization")?.split(" ")[1]; // Получаем токен из заголовка
        if (!token) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const decoded = verifyToken(token); // Проверяем токен
        if (!decoded) {
            return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
        }

        const { content } = await req.json();
        if (!content.trim()) {
            return new Response(JSON.stringify({ error: "Content is required" }), { status: 400 });
        }

        const post = await prisma.post.create({
            data: { content, userId: decoded.id } // Сохраняем ID пользователя
        });

        return new Response(JSON.stringify(post), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
    }
}
