"use client"

import Loader from "@/app/components/Loader/LoadData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentComponentPage() {
    const router = useRouter();

    useEffect(() => {
        const getPaymentId = async () => {
            try {
                const response = await fetch("/api/ykassa/getPremiumObj", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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

        const updatePaymentInfoAndActivateCWPremium = async () => {
            const response = await fetch("/api/updPayInfoAndActivateCWPremium", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();

            return data.status;
        }

        const checkPayment = async () => {
            if (status === "unauthenticated") return router.push("/login");

            const paymentId = await getPaymentId();
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
                    return await updatePaymentInfoAndActivateCWPremium();
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
                router.push("/cwpremium?status=successful");
            } else if (paymentStatus === "error" || paymentStatus === "expired") {
                router.push("/cwpremium?status=error");
            } else {
                router.push("/cwpremium");
            }
        };

        processPayment();
    }, [router]);

    return <Loader/>;
}