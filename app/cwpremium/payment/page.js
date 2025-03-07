"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
    const router = useRouter();
    const [searchParams, setSearchParams] = useState < URLSearchParams | null > (null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            setSearchParams(params);
        }
    }, []);

    useEffect(() => {
        if (searchParams) {
            const paymentStatus = searchParams.get("paymentStatus");
            if (paymentStatus === "successful") {
                localStorage.setItem("paymentStatus", "successful");
            } else {
                localStorage.setItem("paymentStatus", "error");
            }

            router.push("/cwpremium");
        }
    }, [searchParams, router]);

    return null;
}
