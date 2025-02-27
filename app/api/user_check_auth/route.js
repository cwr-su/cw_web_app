import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ status: 200 });
        }

        return NextResponse.json({ status: 403 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 200 });
    }
}
