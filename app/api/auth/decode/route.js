import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) return NextResponse.json({ error: "No token found" }, { status: 401 });

        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);

        return NextResponse.json({ userId: decoded.id, login: decoded.login });
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }
}
