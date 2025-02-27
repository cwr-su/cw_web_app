import { NextResponse } from "next/server";

export async function GET(req) {
    const token = req.cookies.get("token")?.value || null;

    if (!token) {
        return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    return NextResponse.json({ token });
}
