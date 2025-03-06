"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkingVerifyCode } from "../components/checkingVerifyCode";

import "../styles/auth_preloader.css";
import "../styles/auth_registration_styles.css";

export default function VerifyEmailPage() {
    const [loadingFirst, setLoadingFirst] = useState(false);
    const [loadingSecond, setLoadingSecond] = useState(false);

    const router = useRouter();
    const [userId, setUserId] = useState();

    useEffect(() => {
        async function verifyUser() {
            try {
                const userRes = await fetch("/api/user");
                const userData = await userRes.json();

                if (!userData.userId) router.push("/login");

                setUserId(userData.userId);

                await checkingVerifyCode(userData.userId, router);
            } catch (error) {
                console.error("Error verifying user:", error);
            }
        }

        verifyUser();
    }, [router]);

    useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            userId: userId
        }));
    }, [userId]);

    const [errorVerification, setErrorVerification] = useState("");
    const [form, setForm] = useState({ verifyCode: "" });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingFirst(true);
        try {
            const res = await fetch("/api/verifyEMail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            setLoadingFirst(false);
            setLoadingSecond(true);

            const data = await res.json();
            if (res.ok) {
                window.location.href = "/";
            } else {
                await checkingVerifyCode(userId, router);

                setErrorVerification(`${data.error}`);
                document.querySelector(`input[name="verifyCode"]`)?.focus();
            }
            setLoadingSecond(false);
        } catch (err) {
            setErrorVerification("Server connection error");
            setLoadingFirst(false);
            setLoadingSecond(false);
        } finally {
            setLoadingFirst(false);
            setLoadingSecond(false);
        }
    };

    return (
        <section className="verify-email">
            <div className="logo-cw-id">
                <span className="span-logo-cw-id"></span>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <div className="form_input_box_block">
                        <p className="form_input_box_title">Verification code</p>
                    </div>
                    <input
                        type="text"
                        name="verifyCode"
                        value={form.verifyCode}
                        onChange={handleChange}
                        disabled={loadingFirst & loadingSecond}
                    />
                </div>
                {errorVerification && <p className="error error-verifyCode">{errorVerification}</p>}

                <div id="preloader" style={{ display: loadingFirst ? "flex" : "none" }}>
                    <div id="loader"></div>
                </div>
                <div id="preloader_two" style={{ display: loadingSecond ? "flex" : "none" }}>
                    <svg className="pl" viewBox="0 0 200 200" width="200" height="200">
                        <defs>
                            <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                                <stop offset="0%" stopColor="hsl(313,90%,55%)" />
                                <stop offset="100%" stopColor="hsl(223,90%,55%)" />
                            </linearGradient>
                            <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="hsl(313,90%,55%)" />
                                <stop offset="100%" stopColor="hsl(223,90%,55%)" />
                            </linearGradient>
                        </defs>
                        <circle className="pl__ring" cx="100" cy="100" r="82" fill="none" stroke="url(#pl-grad1)" strokeWidth="36" strokeDasharray="0 257 1 257" strokeDashoffset="0.01" strokeLinecap="round" transform="rotate(-90,100,100)" />
                        <line className="pl__ball" stroke="url(#pl-grad2)" x1="100" y1="18" x2="100.01" y2="182" strokeWidth="36" strokeDasharray="1 165" strokeLinecap="round" />
                    </svg>
                </div>

                <div className="input-box button-submit">
                    <input
                        type="submit"
                        name="signin"
                        value={loadingFirst & loadingSecond ? "Waiting..." : "Verify"}
                        className="button_reg_auth"
                        disabled={loadingFirst & loadingSecond}
                    />
                </div>
            </form>
        </section>
    );
}
