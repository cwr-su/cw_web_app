"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Loader from "../components/Loader/LoadData";

import { YandexLoginLinkGenerate } from "../components/YandexLoginLinkGenerate";
import YandexLoginLink from "../components/YandexLoginLink";

import "../styles/auth_preloader.css";
import "../styles/auth_registration_styles.css";

import { signIn, useSession, getSession } from "next-auth/react";

export default function LoginPage() {
    const [redirUrlNext, setRedirUrlNext] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isErrorMessageGETQ, setIsErrorMessageGETQ] = useState(false);
    const [errorMessageGETQ, setErrorMessageGETQ] = useState("");
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            let linkNext = "/";
            if (session.user.verifyCode !== "null") linkNext = "/verify_email";
            router.push(linkNext);
        }
    }, [status, router, session]);

    useEffect(() => {
        const errorMessage = searchParams.get("error");
        if (errorMessage) {
            setErrorMessageGETQ("This E-Mail is already registered! Try to log in.");
            setIsErrorMessageGETQ(true);
        }

        const newParams = new URLSearchParams(searchParams.toString());
        newParams.delete("error");

        router.replace(`/login?${newParams.toString()}`, { scroll: false });
    }, [router]);

    const [authUrl, setAuthUrl] = useState("");

    useEffect(() => {
        const { authUrl } = YandexLoginLinkGenerate();
        setAuthUrl(authUrl);
    }, []);

    useEffect(() => {
        const redirUrlNextItem = sessionStorage.getItem("redirUrlNext");
        if (redirUrlNextItem) setRedirUrlNext(redirUrlNextItem);
    }, []);

    const [form, setForm] = useState({ login: "", password: "" });
    const [errorLogin, setErrorLogin] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const [loadingFirst, setLoadingFirst] = useState(false);
    const [loadingSecond, setLoadingSecond] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorLogin("");
        setErrorPassword("");
        setLoadingFirst(true);

        const result = await signIn("credentials", {
            redirect: false,
            login: form.login,
            password: form.password,
        });

        setLoadingFirst(false);
        setLoadingSecond(true);

        if (result.error) {
            setError("Invalid login or password");
        } else {
            const updatedSession = await getSession();
            let nextUrl = "/";
            if (updatedSession.user.verifyCode !== "null" || updatedSession.user.verifyCode !== null) {
                nextUrl = "/verify_email";
            }
            setLoadingSecond(false);
            router.push(nextUrl);
        }
    };

    if (status === "loading") return <Loader/>;

    return (
        <section className="auth">
            {isErrorMessageGETQ ? (<div className="errorSlide"><p>{errorMessageGETQ}</p></div>) : (<span></span>)}

            <div className="logo-cw-id">
                <span className="span-logo-cw-id"></span>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <div className="form_input_box_block">
                        <p className="form_input_box_title">Login</p>
                    </div>
                    <input
                        type="text"
                        name="login"
                        value={form.login}
                        onChange={handleChange}
                        required
                        disabled={loadingFirst & loadingSecond}
                    />
                </div>
                {errorLogin && <p className="error error-login">{errorLogin}</p>}

                <div className="input-box">
                    <div className="form_input_box_block">
                        <p className="form_input_box_title">Password</p>
                        <p className="form_input_box_title">
                            <a href="/forgot_password">Recover</a>
                        </p>
                    </div>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        disabled={loadingFirst & loadingSecond}
                    />
                </div>
                {errorPassword && <p className="error error-password">{errorPassword}</p>}

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
                        value={loadingFirst & loadingSecond ? "Logging in..." : "Log in"}
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
                    <p>No account? <Link href="/register">Sign up</Link></p>
                </div>

            </form>
        </section>
    );
}
