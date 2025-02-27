import jwt from "jsonwebtoken";

export async function generateNewJWTToken(JWT_SECRET, HOURS_EXPIRES_TOKEN, user) {
    return jwt.sign({ id: user.id, login: user.login }, JWT_SECRET, {
        expiresIn: `${HOURS_EXPIRES_TOKEN}h`,
    });
}