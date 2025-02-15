import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "2e1fbd3222815089d9cd39d63654a2c053285a5ca3dda46bb6cc201e718552e5";

export function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET);
    } catch (error) {
        return null;
    }
}
