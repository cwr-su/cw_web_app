import { NextResponse } from 'next/server';
import { YooCheckout } from '@a2seven/yoo-checkout';
import { randomUUID } from 'crypto';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const checkout = new YooCheckout({
    shopId: process.env.YOOKASSA_SHOP_ID,
    secretKey: process.env.YOOKASSA_SECRET_KEY,
});

const amount = process.env.NEXT_PUBLIC_AMOUNT_CWPREMIUM;
const SITE_URL = process.env.SITE_URL;

export async function POST(req) {
    try {
        const { userId } = await req.json();
        if (!userId) return NextResponse.json({ error: "UserID is none!" }, { status: 500 });

        const idempotenceKey = randomUUID();

        const payment = await checkout.createPayment({
            amount: { value: amount, currency: 'RUB' },
            confirmation: { type: 'redirect', return_url: `${SITE_URL}/cwpremium/payment` },
            capture: true,
            description: 'CW Premium',
        }, idempotenceKey);

        const user = await prisma.premiumobj.update({
            where: { id: userId },
            data: {
                userCwPremium: "process_payment",
                costFloatStr: `${amount}`,
                paymentId: payment.id,
            },
        });

        return NextResponse.json({ confirmationUrl: payment.confirmation.confirmation_url });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
