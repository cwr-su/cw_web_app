import { NextResponse } from 'next/server';
import { YooCheckout } from '@a2seven/yoo-checkout';
import { randomUUID } from 'crypto';

import { PrismaClient } from '@prisma/client';

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

const checkout = new YooCheckout({
    shopId: process.env.YOOKASSA_SHOP_ID,
    secretKey: process.env.YOOKASSA_SECRET_KEY,
});

const amount = process.env.NEXT_PUBLIC_AMOUNT_CWPREMIUM;
const SITE_URL = process.env.SITE_URL;

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized! Please login!" }), { status: 401 });
        }

        const userId = session.user.id;
        console.log(userId);

        const idempotenceKey = randomUUID();

        const payment = await checkout.createPayment({
            amount: { value: amount, currency: 'RUB' },
            confirmation: { type: 'redirect', return_url: `${SITE_URL}/cwpremium/payment` },
            capture: true,
            description: 'CW Premium',
        }, idempotenceKey);

        const premiumObj = await prisma.premiumobj.findFirst({
            where: { userId: userId },
        });

        if (!premiumObj) {
            return new Response(JSON.stringify({ error: "No premium object found!" }), { status: 404 });
        }

        await prisma.premiumobj.update({
            where: { id: premiumObj.id },
            data: {
                userCwPremium: "process_payment",
                costFloatStr: `${amount}`,
                paymentId: payment?.id,
            },
        });

        return NextResponse.json({ confirmationUrl: payment.confirmation.confirmation_url });
    } catch (error) {
        console.log(`Error with create payment: Error: ${error}`);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
