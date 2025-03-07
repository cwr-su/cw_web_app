"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState < string | null > (null);

    useEffect(() => {
        if (!searchParams) return;

        const paymentStatus = searchParams.get("paymentStatus");
        const newStatus = paymentStatus === "successful" ? "successful" : "error";

        localStorage.setItem("paymentStatus", newStatus);
        setStatus(newStatus);

        setTimeout(() => {
            router.push("/cwpremium");
        }, 100);
    }, [searchParams, router]);

    return (
        <Suspense fallback={<span>...</span>}>
            <span>Process...</span>
        </Suspense>
    );
}
