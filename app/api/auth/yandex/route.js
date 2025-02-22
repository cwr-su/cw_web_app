import { NextResponse } from "next/server";

const CLIENT_ID = process.env.YANDEX_CLIENT_ID;
const CLIENT_SECRET = process.env.YANDEX_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.SITE_URL}/api/auth/yandex`;

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const code = searchParams.get("code");

        if (!code) {
            return NextResponse.json({ error: "No authorisation code" }, { status: 400 });
        }

        const tokenResponse = await fetch("https://oauth.yandex.ru/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            return NextResponse.json({ error: tokenData.error_description || "Error when receiving a token" }, { status: 400 });
        }

        const userResponse = await fetch("https://login.yandex.ru/info", {
            method: "POST",
            headers: {
                "Authorization": `OAuth ${tokenData.access_token}`,
            },
        });

        const userInfo = await userResponse.json();

        if (!userResponse.ok) {
            return NextResponse.json({ error: userInfo.error || "Error when retrieving user data" }, { status: 400 });
        }

        if (userInfo["code"] == "Code has expired") {
            return NextResponse.redirect(`${process.env.SITE_URL}/login`)
        } else {
            
            return NextResponse.redirect(`${process.env.SITE_URL}`)
        }
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}