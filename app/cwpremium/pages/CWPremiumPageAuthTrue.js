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
                    console.error("Request error:", await user.text());
                    return;
                }

                const data = await user.json();
                setUserObj(data.user);
            } catch (error) {
                console.error("Network error when getting a user item:", error);
            }
        };

        fetchGetUserObject();
    }, [userId]);

    useEffect(() => {
        const getPaymentId = async () => {
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

        const checkPaymentFunc = async () => {
            try {
                const paymentId = await getPaymentId();
                if (!paymentId) {
                    return;
                }

                const response = await fetch(`/api/ykassa/checkPayment?paymentId=${paymentId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error(`Request error: ${response.status}`);
                }

                const data = await response.json();

                if (data.status === "succeeded") {
                    setCheckPayment(true);
                } else {
                    setCheckPayment(false);
                }
            } catch (error) {
                console.error("Payment verification error:", error);
                return false;
            }
        };

        checkPaymentFunc();
    }, [userId]);

    useEffect(() => {
        if (!userId) return;

        const fetchPremiumObj = async () => {
            try {
                const response = await fetch("/api/ykassa/getPremiumObj", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId }),
                });

                const data = await response.json();

                if (data.premiumobj) {
                    setPremiumObj(data.premiumobj);
                    if (data.premiumobj.userCwPremium !== "process_payment" && data.premiumobj.userCwPremium !== "none") {
                        setPremiumEndTime(`${data.premiumobj.userCwPremium}`);
                    }
                }

            } catch (error) {
                console.error("Error with getting PaymentId (Premium Object):", error);
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
                checkPayment && premiumobj?.userCwPremium != "none" && premiumobj?.userCwPremium != "process_payment" && user ? (
                    <CWPremiumActiveOrExpiredOrWithTGManagePage premiumobj={premiumobj} subDays={subDays} user={user} site_url_privacy_policy={site_url_privacy_policy} site_url_public_offer={site_url_public_offer} />
                ) : (
                    <CWPremiumNotActivePage site_url_privacy_policy={site_url_privacy_policy} site_url_public_offer={site_url_public_offer} user={user} />
                )
            }
        </section>
    )
}