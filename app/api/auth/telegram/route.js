import { NextResponse } from "next/server";
import crypto from "crypto";

const BOT_TOKEN = "8117777932:AAHqNMpcK191cOwGeeSgbomLPTc9JMWiz_Y"; // Замени на токен бота

export async function POST(req) {
    try {
        const data = await req.json();
        console.log("Данные от Telegram:", data); // <-- ПОСМОТРИ В ТЕРМИНАЛЕ

        if (!data || !data.id) {
            console.error("Ошибка: пустые данные", data);
            return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
        }

        return NextResponse.json({ success: true, userId: data.id });
    } catch (error) {
        console.error("Ошибка авторизации Telegram:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
