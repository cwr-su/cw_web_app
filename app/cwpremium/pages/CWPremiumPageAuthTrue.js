"use client"

import CWPremiumActiveOrExpiredOrWithTGManagePage from "./cwPremiumTrue/CWPremiumActiveOrExpiredOrWithTGManagePage";
import CWPremiumNotActivePage from "./cwPremiumTrue/CWPremiumNotActivePage";
import { useEffect, useState } from "react";
import Loader from "@/app/components/Loader/LoadData";

export default function CWPremiumPageAuthTrue({ userId, site_url_privacy_policy, site_url_public_offer }) {
    const [checkPayment, setCheckPayment] = useState(undefined);
    const [premiumobj, setPremiumObj] = useState(null);
    const [premiumEndTime, setPremiumEndTime] = useState(null);
    const [subDays, setSubDays] = useState(null);
    const [user, setUserObj] = useState(null);

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
                    setPremiumObj(data.premiumobj);
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
                    setCheckPayment(false);
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
                setCheckPayment(false);
                console.error("Payment verification error:", error);
                return false;
            }
        };

        checkPaymentFunc();
    }, []);

    const fetchPremiumObj = async () => {
        try {
            if (premiumobj) {
                if (premiumobj.userCwPremium !== "process_payment" && premiumobj.userCwPremium !== "none") {
                    setPremiumEndTime(`${premiumobj.userCwPremium}`);
                }

                if (premiumEndTime) {
                    const endTime = parseInt(premiumEndTime, 10) - Math.floor(Date.now() / 1000);
                    setSubDays(Math.round(endTime / 86400));
                }
            }
        } catch (error) {
            console.error("Error with getting PaymentId (Premium Object):", error);
        }
    };

    useEffect(() => {
        fetchPremiumObj();
    });

    if (checkPayment === undefined) return <Loader />;

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