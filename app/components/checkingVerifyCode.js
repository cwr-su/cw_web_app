export async function checkingVerifyCode(userId, router) {
    const verifyRes = await fetch("/api/checkVerifyCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId }),
    });

    const verifyData = await verifyRes.json();

    if (verifyData.isVerified) {
        router.push("/");
    }
}