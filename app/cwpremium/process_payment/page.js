"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProcessPaymentPage() {
    const router = useRouter();
    useEffect(() => {
        fetch("/api/cwpremium/process_payment")
            .then((res) => res.json())
            .then((data) => {
                if (data.link) {
                    router.push(data.link);
                } else {
                    router.push("/")
                }
            });
    }, [router])
    return;
}