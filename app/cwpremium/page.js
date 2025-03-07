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
        console.log("Start....");
        localStorage.removeItem("redirUrlNext");
    }, []);

    const site_url_public_offer = `${process.env.NEXT_PUBLIC_SITE_URL}/public_offer/Public_offer_CWR_SU_24_11_2024.pdf`;
    const site_url_privacy_policy = `${process.env.NEXT_PUBLIC_SITE_URL}/privacy_policy/Privacy_Policy_CWR_SU_CW_from_23_11_2024.pdf`;

    const [userId, setUserId] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);

    useEffect(() => {
        const paymentStatus = localStorage.getItem("paymentStatus");
        if (paymentStatus) {
            setPaymentStatus(paymentStatus);
        }
        localStorage.removeItem("paymentStatus");

        fetch("/api/user")
            .then((res) => res.json())
            .then((data) => {
                if (data.userId) {
                    setUserId(data.userId);
                }
            });
    }, []);

    return (
        <section className="cwpremium">
            {paymentStatus === "successful" && userId ? (
                <div class="notify-block">
                    <div id="notification">
                        <div class="successful-box">
                            <span></span>
                        </div>
                        <div class="sucf-box-text">
                            <p>Success</p>
                            <p>CW subscription payment was successful!</p>
                        </div>
                        <button id="close" onClick="closeSuccessfulBox()">
                            &times;
                        </button>
                    </div>

                    <Script src="/scripts/succ_paystat_mdl.js" strategy="afterInteractive" />
                </div>
            ) : (
                null
            )}

            {
                paymentStatus === "error" && userId ? (
                    <div class="notify-block-err">
                        <div id="notification-err">
                            <div class="error-box">
                                <span></span>
                            </div>
                            <div class="err-box-text">
                                <p>Payment failed or is pending payment</p>
                                <p>Try update the page!</p>
                            </div>
                            <button id="close-err" onClick="closeErrorBox()">
                                &times;
                            </button>
                        </div>
                        <Script src="/scripts/err_paystat_mdl.js" strategy="afterInteractive" />
                    </div>
                ) : (
                    null
                )
            }

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