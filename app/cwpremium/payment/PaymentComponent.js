"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentComponentPage() {
    const router = useRouter();

    useEffect(() => {
        const getUserId = async () => {
            try {
                const response = await fetch("/api/user");
                const data = await response.json();

                if (data.userId) {
                    return data.userId;
                } else {
                    return false;
                }
            } catch (error) {
                console.error("Error when retrieving userId:", error);
            }
        };

        const getPaymentId = async (userId) => {
            try {
                if (!userId) router.push("/login");

                const response = await fetch("/api/ykassa/getPremiumObj", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId }),
                });

                const data = await response.json();

                if (data.premiumobj) {
                    const paymentId = data.premiumobj.paymentId;
                    if (paymentId == "none") {
                        return false;
                    }
                    return paymentId;
                }

            } catch (error) {
                console.error("Error with getting PaymentId (Premium Object):", error);
            }
        };

        const updatePaymentInfoAndActivateCWPremium = async (userId) => {
            const response = await fetch("/api/updPayInfoAndActivateCWPremium", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            });

            const data = await response.json();

            return data.status;
        }

        const checkPayment = async () => {
            const userId = await getUserId();
            const paymentId = await getPaymentId(userId);
            if (!paymentId) {
                console.log("Payment ID is none!");
                return;
            }

            try {
                const response = await fetch(`/api/ykassa/checkPayment?paymentId=${paymentId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error(`Request error: ${response.status}`);
                }

                const data = await response.json();

                if (data.status === "succeeded") {
                    return await updatePaymentInfoAndActivateCWPremium(userId);
                } else {
                    console.log("Status of payment has hadn't 'succeeded' yet.");
                    return "error";
                }
            } catch (error) {
                console.error("Payment verification error:", error);
                return false;
            }
        }

        const processPayment = async () => {
            const paymentStatus = await checkPayment();

            if (paymentStatus === "success_upd") {
                sessionStorage.setItem("paymentStatus", "successful");
            } else if (paymentStatus === "error" || paymentStatus === "expired") {
                sessionStorage.setItem("paymentStatus", "error");
            }

            router.push("/cwpremium");
        };

        processPayment();
    }, [router]);

    return <section>Please, waiting...</section>;
}