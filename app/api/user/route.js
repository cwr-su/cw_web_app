import jwt from "jsonwebtoken";

// export const dynamic = "force-static";
// export const revalidate = 10;

const secret = process.env.JWT_SECRET || "2e1fbd3222815089d9cd39d63654a2c053285a5ca3dda46bb6cc201e718552e5";

export async function GET(req) {
    try {
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }

        const decoded = jwt.verify(token, secret);
        return new Response(JSON.stringify({ user: decoded }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid token" }), {
            status: 401,
        });
    }
}
