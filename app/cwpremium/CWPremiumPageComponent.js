"use client"

import { useState, useEffect } from "react";
import Script from "next/script";
import CWPremiumPageAuthFalse from "./pages/CWPremiumPageAuthFalse";
import CWPremiumPageAuthTrue from "./pages/CWPremiumPageAuthTrue";
import Loader from "../components/Loader/LoadData";
import { useRouter, useSearchParams } from "next/navigation";

import { useSession } from "next-auth/react";

import "../styles/index.css";
import "../styles/cw_premium.css";
import "../styles/modal_window.css";
import "../styles/auth_preloader.css";
import "../styles/succ_paystat_mdl.css";
import "../styles/err_paystat_mdl.css";
import "../styles_my/tabs.css";
import "../styles/auth_registration_styles.css";
import "./styles/contents_in_tabs.css";
import "../styles/faq.css";


export default function CWPremiumComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const site_url_public_offer = `${process.env.NEXT_PUBLIC_SITE_URL}/public_offer/Public_offer_CWR_SU_24_11_2024.pdf`;
    const site_url_privacy_policy = `${process.env.NEXT_PUBLIC_SITE_URL}/privacy_policy/Privacy_Policy_CWR_SU_CW_from_23_11_2024.pdf`;

    const [paymentStatus, setPaymentStatus] = useState(null);

    const { data: session, status } = useSession();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        sessionStorage.removeItem("redirUrlNext");
    }, []);

    useEffect(() => {
        const paymentStatus = searchParams.get("status");

        if (paymentStatus) {
            setPaymentStatus(paymentStatus);

            const newParams = new URLSearchParams(searchParams.toString());
            newParams.delete("status");

            router.replace(`/cwpremium?${newParams.toString()}`, { scroll: false });
        }
    }, [searchParams, router]);

    useEffect(() => {
        if (status === "authenticated") {
            setUserId(session.user.id);
        } else if (status === "unauthenticated") {
            sessionStorage.setItem("redirUrlNext", "/cwpremium");
        }

    }, [status, session]);

    // Successful Window-Notify
    const [showNotificationSuccessful, setshowNotificationSuccessful] = useState(false);
    const [animationClassSuccessful, setanimationClassSuccessful] = useState("hidden");

    useEffect(() => {
        if (paymentStatus === "successful" && userId) {
            setshowNotificationSuccessful(true);
            setTimeout(() => setanimationClassSuccessful("visible"), 1000);

            const timeoutId = setTimeout(() => closeNotificationSuccessful(), 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [paymentStatus, userId]);

    const closeNotificationSuccessful = () => {
        setanimationClassSuccessful("hidden");
        setTimeout(() => setshowNotificationSuccessful(false), 2000);
    };


    // Error Notify-Window
    const [showNotificationError, setshowNotificationError] = useState(false);
    const [animationClassError, setanimationClassError] = useState("hidden");

    useEffect(() => {
        if (paymentStatus === "error" && userId) {
            setshowNotificationError(true);
            setTimeout(() => setanimationClassError("visible"), 1000);

            const timeoutId = setTimeout(() => closeNotificationError(), 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [paymentStatus, userId]);

    const closeNotificationError = () => {
        setanimationClassError("hidden");
        setTimeout(() => setshowNotificationError(false), 2000);
    };

    if (status === "loading") return <Loader />;

    return (
        <section className="cwpremium">
            {showNotificationSuccessful && (
                <div className="notify-block">
                    <div className={`notification ${animationClassSuccessful}`} id="notification">
                        <div className="successful-box">
                            <span></span>
                        </div>
                        <div className="sucf-box-text">
                            <p>Success</p>
                            <p>CW subscription payment was successful!</p>
                        </div>
                        <button id="close" onClick={closeNotificationSuccessful}>
                            &times;
                        </button>
                    </div>
                </div>
            )}

            {showNotificationError && (
                <div className="notify-block-err">
                    <div className={`notification-err ${animationClassError}`} id="notification">
                        <div className="error-box">
                            <span></span>
                        </div>
                        <div className="err-box-text">
                            <p>Payment failed or is pending payment</p>
                            <p>Try update the page!</p>
                        </div>
                        <button id="close-err" onClick={closeNotificationError}>
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