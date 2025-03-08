"use client"

import { useState, useEffect } from "react";
import Script from "next/script";
import CWPremiumPageAuthFalse from "./pages/CWPremiumPageAuthFalse";
import CWPremiumPageAuthTrue from "./pages/CWPremiumPageAuthTrue";

import "../styles/index.css"
import "../styles/cw_premium.css"
import "../styles/modal_window.css"
import "../styles/auth_preloader.css"
import "../styles/succ_paystat_mdl.css"
import "../styles/err_paystat_mdl.css"
import "../styles_my/tabs.css"
import "../styles/auth_registration_styles.css"
import "./styles/contents_in_tabs.css"
import "../styles/faq.css"


export default function CWPremiumPage() {
    useEffect(() => {
        sessionStorage.removeItem("redirUrlNext");
    }, []);

    const site_url_public_offer = `${process.env.NEXT_PUBLIC_SITE_URL}/public_offer/Public_offer_CWR_SU_24_11_2024.pdf`;
    const site_url_privacy_policy = `${process.env.NEXT_PUBLIC_SITE_URL}/privacy_policy/Privacy_Policy_CWR_SU_CW_from_23_11_2024.pdf`;

    const [userId, setUserId] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);

    useEffect(() => {
        const paymentStatus = sessionStorage.getItem("paymentStatus");
        if (paymentStatus) {
            setPaymentStatus(paymentStatus);
        }
        sessionStorage.removeItem("paymentStatus");

        fetch("/api/user")
            .then((res) => res.json())
            .then((data) => {
                if (data.userId) {
                    setUserId(data.userId);
                } else {
                    sessionStorage.setItem("redirUrlNext", "/cwpremium");
                }
            });
    }, []);

    const [showNotificationSuccessful, setShowNotificationSuccessful] = useState(false);
    const [animationClassSuccessful, setAnimationClassSuccessful] = useState("hidden");

    useEffect(() => {
        if (paymentStatus === "successful" && userId) {
            const timeoutFirst = setTimeout(() => {
                setShowNotificationSuccessful(true);
                setAnimationClassSuccessful("visible");

                const timeoutId = setTimeout(() => {
                    setAnimationClassSuccessful("hidden");
                    setTimeout(() => setShowNotificationSuccessful(false), 5000);
                }, 5000);

                return () => clearTimeout(timeoutId);
            }, 3500);

            return () => clearTimeout(timeoutFirst);
        }
    }, [paymentStatus, userId]);

    const closeSuccessfulBox = () => {
        setAnimationClassSuccessful("hidden");
        setTimeout(() => setShowNotificationSuccessful(false), 5000);
    };

    // Error Notify-Window
    const [showNotificationError, setShowNotificationError] = useState(false);
    const [animationClassError, setAnimationClassError] = useState("hidden");

    useEffect(() => {
        if (paymentStatus === "successful" && userId) {
            const timeoutFirst = setTimeout(() => {
                setShowNotificationError(true);
                setAnimationClassError("visible");

                const timeoutId = setTimeout(() => {
                    setAnimationClassError("hidden");
                    setTimeout(() => setShowNotificationError(false), 5000);
                }, 5000);

                return () => clearTimeout(timeoutId);
            }, 3500);

            return () => clearTimeout(timeoutFirst);
        }
    }, [paymentStatus, userId]);

    const closeErrorBox = () => {
        setAnimationClassError("hidden");
        setTimeout(() => setShowNotificationError(false), 5000);
    };

    return (
        <section className="cwpremium">
            {paymentStatus === "successful" && userId && showNotificationSuccessful && (
                <div className="notify-block">
                    <div id="notification" className={`notification ${animationClassSuccessful}`}>
                        <div className="successful-box">
                            <span></span>
                        </div>
                        <div className="sucf-box-text">
                            <p>Success</p>
                            <p>CW subscription payment was successful!</p>
                        </div>
                        <button id="close" onClick={closeSuccessfulBox}>
                            &times;
                        </button>
                    </div>
                </div>
            )}

            {
                paymentStatus === "error" && userId && (
                    <div className="notify-block-err">
                        <div id="notification-err">
                            <div className="error-box">
                                <span></span>
                            </div>
                            <div className="err-box-text">
                                <p>Payment failed or is pending payment</p>
                                <p>Try update the page!</p>
                            </div>
                            <button id="close-err" onClick={closeErrorBox}>
                                &times;
                            </button>
                        </div>
                    </div>
                )}

            {userId ? (

                (
                    <CWPremiumPageAuthTrue userId={userId} site_url_privacy_policy={site_url_privacy_policy} site_url_public_offer={site_url_public_offer} />
                )
            ) : (
                <CWPremiumPageAuthFalse site_url_privacy_policy={site_url_privacy_policy} site_url_public_offer={site_url_public_offer} />
            )}

            <Script src="/scripts/modal_window.js" strategy="afterInteractive" />
            <Script src="/scripts/faq_clck.js" strategy="afterInteractive" />
        </section>
    )
}