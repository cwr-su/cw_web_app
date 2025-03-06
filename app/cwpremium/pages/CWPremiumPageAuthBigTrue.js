"use client"

import CWPremiumActiveOrExpiredOrWithTGManagePage from "./cwPremiumTrue/CWPremiumActiveOrExpiredOrWithTGManagePage";
import CWPremiumNotActivePage from "./cwPremiumTrue/CWPremiumNotActivePage";
import { useEffect, useState } from "react";

export default function CWPremiumPageAuthTrue({ userId, site_url_privacy_policy, site_url_public_offer }) {
    const [checkPayment, setCheckPayment] = useState(false);
    const [premiumobj, setPremiumObj] = useState(null);
    const [premiumEndTime, setPremiumEndTime] = useState(null);
    const [user, setUserObj] = useState(null);

    const [subDays, setSubDays] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchGetUserObject = async () => {
            try {
                const user = await fetch("/api/getUserObject", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId }),
                });

                if (!user.ok) {
                    console.error("Request error:", await res.text());
                    return;
                }

                const data = await res.json();
                setUserObj(data.user);
            } catch (error) {
                console.error("Network error when getting a premium item:", error);
            }
        };

        fetchGetUserObject();
    }, [userId]);

    useEffect(() => {
        const checkPayment = async () => {
            try {
                const resCheckPayment = await fetch("/api/cwpremium/yookassa/check_payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId }),
                });

                if (resCheckPayment.ok) setCheckPayment(true);
            } catch (error) {
                console.error("Payment verification error:", error);
            }
        };

        checkPayment();
    }, [userId]);

    useEffect(() => {
        if (!userId) return;

        const fetchPremiumObj = async () => {
            try {
                const res = await fetch("/api/cwpremium/premiumobj/get", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId }),
                });

                if (!res.ok) {
                    console.error("Request error:", await res.text());
                    return;
                }

                const data = await res.json();
                setPremiumObj(data.premiumobj);
                setPremiumEndTime(data.premiumobj?.userCwPremium || null);
            } catch (error) {
                console.error("Network error when getting a premium object:", error);
            }
        };

        fetchPremiumObj();
    }, [userId]);

    useEffect(() => {
        if (premiumEndTime) {
            const endTime = parseInt(premiumEndTime, 10) - Math.floor(Date.now() / 1000);
            setSubDays(Math.round(endTime / 86400));
        }
    }, [premiumEndTime]);

    return (
        <section className="cwpremium_lg_ok">
            {
                checkPayment && premiumobj?.userCwPremium != "none" && premiumobj?.userCwPremium != "process_payment" ? (
                    <CWPremiumActiveOrExpiredOrWithTGManagePage premiumobj={premiumobj} subDays={subDays} user={user} site_url_privacy_policy={site_url_privacy_policy} site_url_public_offer={site_url_public_offer} />
                ) : (
                    <CWPremiumNotActivePage site_url_privacy_policy={site_url_privacy_policy} site_url_public_offer={site_url_public_offer} user={user} />
                )
            }
        </section>
    )
}