import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        const premiumobj = await prisma.premiumobj.findUnique({
            where: { id: userId }, 
        });

        if (!premiumobj) {
            return res.status(404).json({ error: "Premium Object not found" });
        }

        return res.status(200).json({ premiumobj });
    } catch (error) {
        console.error("Error when retrieving a premiumobj:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
