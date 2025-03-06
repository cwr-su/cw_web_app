"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react"

export default function PaymentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const paymentStatus = searchParams.get("paymentStatus");
        if (paymentStatus == "successful") {
            localStorage.setItem("paymentStatus", "successful")
        } else {
            localStorage.setItem("paymentStatus", "error")
        }

        router.push("/cwpremium");
    }, [router]);
    return;
}