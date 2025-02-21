import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const TELEGRAM_BOT_SECRET = process.env.TELEGRAM_BOT_SECRET;

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    const { id, first_name, last_name, username, photo_url, auth_date, hash } = params;

    const receivedHash = hash;
    delete params.hash;

    const sortedParams = Object.keys(params).sort().map(key => `${key}=${params[key]}`);

    const dataCheckString = sortedParams.join("\n");

    const secretKey = crypto.createHash('sha256').update(TELEGRAM_BOT_SECRET).digest();
    const calculatedHash = crypto
        .createHmac('sha256', secretKey)
        .update(dataCheckString)
        .digest('hex');

    if (calculatedHash !== receivedHash) {
        return new Response(JSON.stringify({ error: 'Invalid hash. The request is not authentic.' }), {
            status: 400
        });
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (currentTimestamp - parseInt(auth_date) > 86400) {
        return new Response(JSON.stringify({ error: 'Data is outdated' }), {
            status: 400
        });
    }

    const userData = {
        id,
        first_name,
        last_name,
        username,
        photo_url,
    };

    (await cookies()).set("tg_user", JSON.stringify(userData));

    console.log((await cookies()).get("tg_user"));

    return NextResponse.redirect(`${process.env.SITE_URL}`)

}
