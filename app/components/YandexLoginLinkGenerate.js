export function YandexLoginLinkGenerate() {
    const YANDEX_CLIENT_ID = process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID;
    const REDIRECT_URI = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/yandex`;

    if (!YANDEX_CLIENT_ID || !REDIRECT_URI) {
        console.error("Client ID or Redirect URI not specified");
        return { authUrl: "" };
    }

    const authUrl = `https://oauth.yandex.ru/authorize?${new URLSearchParams({
        client_id: YANDEX_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: "code",
        state: "secure_random_state",
    }).toString()}`;

    return { authUrl };
}
