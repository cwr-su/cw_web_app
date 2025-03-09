import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized! Please login!" }), { status: 401 });
        }

        const userId = session.user.id;

        const premiumobj = await prisma.premiumobj.findFirst({
            where: { userId: userId }
        });

        return NextResponse.json({ premiumobj: premiumobj });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
