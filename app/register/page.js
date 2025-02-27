"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";


import { YandexLoginLinkGenerate } from "../components/YandexLoginLinkGenerate";
import YandexLoginLink from "../components/YandexLoginLink";

import "../styles/auth_preloader.css";
import "../styles/auth_registration_styles.css";

export default function RegisterPage() {
    const [loadingFirst, setLoadingFirst] = useState(false);
    const [loadingSecond, setLoadingSecond] = useState(false);

    const router = useRouter();
    useEffect(() => {
        fetch("/api/user_check_auth")
            .then((res) => res.json())
            .then((data) => {
                if (data.userId) {
                    router.push("/");
                }
            });
    }, [router]);

    const [authUrl, setAuthUrl] = useState("");

    useEffect(() => {
        const { authUrl } = YandexLoginLinkGenerate();
        setAuthUrl(authUrl);
    }, []);

    const [form, setForm] = useState({ firstname: "", lastname: "", login: "", email: "", password1: "", password2: "" });

    const [errorName, setErrorName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [errorEMail, setErrorEMail] = useState("");
    const [errorLogin, setErrorLogin] = useState("");
    const [errorPassword1, setErrorPassword1] = useState("");
    const [errorPassword2, setErrorPassword2] = useState("");

    const validateForm = () => {
        function hasUpperCase(str) {
            return /[A-Z]/.test(str);
        }

        function hasNumber(str) {
            return /[0-9]/.test(str);
        }

        function isValidLogin(str) {
            const letterNumberChecker = /(?=.*[a-zA-Z])(?=.*[0-9])/;
            return letterNumberChecker.test(str) && /^[a-zA-Z0-9\-_]{5,12}$/.test(str);
        }

        let isValid = true;
        let firstErrorField = null;

        setErrorName("");
        setErrorLastName("");
        setErrorEMail("");
        setErrorLogin("");
        setErrorPassword1("");
        setErrorPassword2("");

        if (!form.firstname.trim()) {
            setErrorName("Please enter your name");
            firstErrorField = firstErrorField || "firstname";
            isValid = false;
        }
        if (!form.lastname.trim()) {
            setErrorLastName("Please enter your surname");
            firstErrorField = firstErrorField || "lastname";
            isValid = false;
        }
        if (!form.email.trim()) {
            setErrorEMail("Please enter your email");
            firstErrorField = firstErrorField || "email";
            isValid = false;
        }
        if (!form.login.trim()) {
            setErrorLogin("Please enter your login");
            firstErrorField = firstErrorField || "login";
            isValid = false;
        }
        if (form.login.trim() && !isValidLogin(form.login)) {
            setErrorLogin("Login can only be a minimum of 5 and a maximum of 12 characters including only English letters, numbers and symbols: _, -");
            firstErrorField = firstErrorField || "login";
            isValid = false;
        }
        if (!form.password1.trim()) {
            setErrorPassword1("Please enter a password");
            firstErrorField = firstErrorField || "password1";
            isValid = false;
        }
        if (form.password1.trim() && form.password1.length < 8 || !hasUpperCase(form.password1) || !hasNumber(form.password1)) {
            setErrorPassword1("The password must contain a minimum of 8 characters, including capital letters and numbers");
            firstErrorField = firstErrorField || "password1";
            isValid = false;
        }
        if (!form.password2.trim()) {
            setErrorPassword2("Please confirm your password");
            firstErrorField = firstErrorField || "password2";
            isValid = false;
        }
        if (form.password1 !== form.password2) {
            setErrorPassword2("Passwords do not match");
            firstErrorField = firstErrorField || "password2";
            isValid = false;
        }

        if (firstErrorField) {
            document.querySelector(`input[name="${firstErrorField}"]`)?.focus();
        }

        return isValid;
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoadingFirst(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            setLoadingFirst(false);
            setLoadingSecond(true);

            const data = await res.json();
            if (res.ok) {
                window.location.href = "/verify_email";
            } else {
                if (data.fieldNameErr == "emptyFileds") {
                    setErrorPassword2(`${data.error}`);
                } else if (data.fieldNameErr == "login") {
                    setErrorLogin(`${data.error}`);
                    document.querySelector(`input[name="login"]`)?.focus();
                } else if (data.fieldNameErr == "email") {
                    setErrorEMail(`${data.error}`);
                    document.querySelector(`input[name="email"]`)?.focus();
                }
            }
            setLoadingSecond(false);
        } catch (err) {
            setErrorPassword1("Server connection error");
            setLoadingFirst(false);
            setLoadingSecond(false);
        } finally {
            setLoadingFirst(false);
            setLoadingSecond(false);
        }
    };



    return (
        <section className="registration">
            <div className="logo-cw-id">
                <span className="span-logo-cw-id"></span>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <div className="form_input_box_block">
                        <p className="form_input_box_title">Name</p>
                    </div>
                    <input
                        type="text"
                        name="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                        disabled={loadingFirst & loadingSecond}
                    />
                </div>
                {errorName && <p className="error error-name">{errorName}</p>}

                <div className="input-box">
                    <div className="form_input_box_block">
                        <p className="form_input_box_title">Surname</p>
                    </div>
                    <input
                        type="text"
                        name="lastname"
                        value={form.lastname}
                        onChange={handleChange}
                        disabled={loadingFirst & loadingSecond}
                    />
                </div>
                {errorLastName && <p className="error error-lastname">{errorLastName}</p>}

                <div className="input-box">
                    <div className="form_input_box_block">
                        <p className="form_input_box_title">EMail</p>
                    </div>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={loadingFirst & loadingSecond}
                    />
                </div>
                {errorEMail && <p className="error error-email">{errorEMail}</p>}

                <div className="input-box">
                    <div className="form_input_box_block">
                        <p className="form_input_box_title">Login</p>
                    </div>
                    <input
                        type="text"
                        name="login"
                        value={form.login}
                        onChange={handleChange}
                        disabled={loadingFirst & loadingSecond}
                    />
                </div>
                {errorLogin && <p className="error error-login">{errorLogin}</p>}

                <div className="input-box">
                    <div className="form_input_box_block">
                        <p className="form_input_box_title">Password</p>
                    </div>
                    <input
                        type="password"
                        name="password1"
                        value={form.password1}
                        onChange={handleChange}
                        disabled={loadingFirst & loadingSecond}
                    />
                </div>
                {errorPassword1 && <p className="error error-password1">{errorPassword1}</p>}

                <div className="input-box">
                    <div className="form_input_box_block">
                        <p className="form_input_box_title">Confirm password</p>
                    </div>
                    <input
                        type="password"
                        name="password2"
                        value={form.password2}
                        onChange={handleChange}
                        disabled={loadingFirst & loadingSecond}
                    />
                </div>
                {errorPassword2 && <p className="error error-password2">{errorPassword2}</p>}

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
                        value={loadingFirst & loadingSecond ? "Signing up..." : "Sign up"}
                        className="button_reg_auth"
                        disabled={loadingFirst & loadingSecond}
                    />
                </div>

                <div className="hr-for-other-methods">
                    <p>or log in with</p>
                </div>

                <div className="logo-ya-block">
                    <YandexLoginLink authUrl={authUrl} />
                </div>

                <div className="already-or-not-reg-auth-txt">
                    <p>Have an account? <Link href="./auth">Sign in</Link></p>
                </div>

            </form>
        </section>
    );
}
