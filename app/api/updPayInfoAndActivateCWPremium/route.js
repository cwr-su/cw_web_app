import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

const ACTIVE_DAYS_CWPREMIUM = parseInt(process.env.ACTIVE_DAYS_CWPREMIUM, 10);

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized! Please login!" }), { status: 401 });
        }

        const userId = session.user.id;

        const premiumObj = await prisma.premiumobj.findFirst({
            where: { userId: userId },
        });

        if (!premiumObj) {
            return new Response(JSON.stringify({ error: "No premium object found!" }), { status: 404 });
        }

        if (premiumObj.userCwPremium === "process_payment") {
            const timeOfPay = Math.floor(Date.now() / 1000);
            const exTimeForSub = timeOfPay + ACTIVE_DAYS_CWPREMIUM * 86400;

            const now = new Date();
    
            await prisma.premiumobj.update({
                where: { id: premiumObj.id },
                data: {
                    userCwPremium: `${exTimeForSub}`,
                    paidSuccessVerifiedAt: `${now}`,
                },
            });

            return NextResponse.json({ status: "success_upd" });
        } else if (premiumObj.userCwPremium !== "process_payment" && premiumObj.userCwPremium !== "none") {
            const timeNow = Math.floor(Date.now() / 1000);
            const exTimeForSub = parseInt(premiumObj.userCwPremium, 10);

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
