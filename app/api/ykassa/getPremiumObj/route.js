import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { userId } = await req.json();

        if (!userId) return NextResponse.json({ error: "UserId has not been found!" }, { status: 404 });

        const premiumobj = await prisma.premiumobj.findUnique({ where: { id: userId } });

        return NextResponse.json({ premiumobj: premiumobj });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
