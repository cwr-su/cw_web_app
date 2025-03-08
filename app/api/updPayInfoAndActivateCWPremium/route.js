import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ACTIVE_DAYS_CWPREMIUM = parseInt(process.env.ACTIVE_DAYS_CWPREMIUM, 10);

export async function POST(req) {
    try {
        const { userId } = await req.json();
        if (!userId) return NextResponse.json({ error: "UserID is none!" }, { status: 500 });

        const user = await prisma.premiumobj.findUnique({
            where: { id: userId }
        });

        if (user.userCwPremium === "process_payment") {
            const timeOfPay = Math.floor(Date.now() / 1000);
            const exTimeForSub = timeOfPay + ACTIVE_DAYS_CWPREMIUM * 86400;

            const now = new Date();

            await prisma.premiumobj.update({
                where: { id: userId },
                data: {
                    userCwPremium: `${exTimeForSub}`,
                    paidSuccessVerifiedAt: `${now}`,
                },
            });

            return NextResponse.json({ status: "success_upd" });
        } else if (user.userCwPremium !== "process_payment" && user.userCwPremium !== "none") {
            const timeNow = Math.floor(Date.now() / 1000);
            const exTimeForSub = parseInt(user.userCwPremium, 10);

            if ((exTimeForSub - timeNow) / 86400 > 0) {
                return NextResponse.json({ status: "already_activated" });
            }
            return NextResponse.json({ status: "expired" });
        }

        return NextResponse.json({ status: "error" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
