import { NextResponse } from 'next/server';
import { YooCheckout } from '@a2seven/yoo-checkout';

const checkout = new YooCheckout({
    shopId: process.env.YOOKASSA_SHOP_ID,
    secretKey: process.env.YOOKASSA_SECRET_KEY,
});

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const paymentId = searchParams.get('paymentId');

        if (!paymentId) {
            return NextResponse.json({ error: 'Payment ID is required' }, { status: 400 });
        }

        const payment = await checkout.getPayment(paymentId);
        return NextResponse.json({ status: payment.status });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
