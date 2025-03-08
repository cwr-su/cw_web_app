"use client"

import { useEffect, useState } from "react";
import TelegramLogin from "../TelegramWidget";
import Script from "next/script";

export default function CWPremiumPageAuthFalse({ site_url_privacy_policy, site_url_public_offer, user }) {
    const [error403ForConnMCW, setError403ForConnMCW] = useState(null);
    const [form, setForm] = useState({ userId: "" });

    useEffect(() => {
        if (user?.id) {
            setForm(prevForm => ({ ...prevForm, userId: user.id }));
        }
    }, [user]);
    
    const handleChangeSubscribe = (e) => {
        setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
    };

    const handleSubmitSubscribe = async (e) => {
        e.preventDefault();
        try {
            console.log(form);
            const response = await fetch("/api/ykassa/createPayment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json();
            if (data.confirmationUrl) window.location.href = `${data.confirmationUrl}`;
        } catch (err) {
            console.log("Error with subscribe.");
        }
    };

    useEffect(() => {
        let error403ForConnMCWLS = sessionStorage.getItem("error403ForConnMCW");
        if (error403ForConnMCWLS) {
            setError403ForConnMCW(true);
        }
        sessionStorage.removeItem("error403ForConnMCW");
    }, [])

    return (
        <section className="subscribe">
            {
                error403ForConnMCW ? (
                    <div className="notify-block-err">
                        <div id="notification-err">
                            <div className="error-box">
                                <span></span>
                            </div>
                            <div className="err-box-text">
                                <p>Error 403 | Forbidden</p>
                                <p>This account is already used in CW ID!</p>
                            </div>
                            <button id="close-err" onClick="closeErrorBox()">
                                &times;
                            </button>
                        </div>
                        <Script src="/scripts/err_paystat_mdl.js" strategy="afterInteractive" />
                    </div>
                ) : (null)
            }

            <div className="card-cw-premium">
                <div className="benefits">
                </div>

                <div className="cw-premium">
                    <div className="card">
                        <div className="card__title">
                            <div className="icon">
                                <i className="fa fa-arrow-left"></i>
                            </div>
                            <h3>New product</h3>
                        </div>
                        <div className="card__body">
                            <div className="half">
                                <div className="featured_text">
                                    <h1>CW</h1>
                                    <p className="sub">Premium</p>
                                    <p className="price">₽1.00</p>
                                    <p className="price-old">₽59.00</p>
                                </div>
                                <div className="image">
                                    <img src="../storage/cw_premium/cwpremium.svg" alt="CW PREMIUM" />
                                </div>
                            </div>
                            <div className="half">
                                <div className="description">
                                    <p>&emsp;&emsp;The CW Premium subscription provides many of the benefits mentioned above. Thanks to this subscription, an ordinary user receives not only generation from AI, but also another set of functionality, including - the user (even if he does not know programming languages well or at all) can use the Manager CW Bot API.</p>
                                    <p>&emsp;&emsp;Also, a user who has a subscription to Telegram Premium has the right to use the Manager CW Bot API (his created bot) as a personal assistant manager. He (the bot) is able to respond to messages that you missed / or could not respond to. The bot will respond with the message template you set on different topics, for example, if a friend wrote to you - "Thank you very much" or something like that and in a positive context - the bot will respond to him with the phrase you set, e.g. "Please", or some kind of sticker, or premium emoji (from Telegram Emoji).</p>
                                    <p>&emsp;&emsp;We hope you enjoy your CW Premium subscription.</p>
                                </div>
                                <span className="stock"><i className="fa fa-pen"></i> In stock</span>
                            </div>
                        </div>
                        <div className="card__footer">
                            <div className="card-footer-sub">
                                <div className="recommend">
                                    <p>Recommended by</p>
                                    <h3>Artificial intelligence CW</h3>
                                </div>
                                <form onSubmit={handleSubmitSubscribe} className="subscribe_form" id='subscribef'>
                                    <input onChange={handleChangeSubscribe} type="hidden" name="userId" value={user?.id} />

                                    <div className="input-box button-submit" id="subscribe">
                                        <input type="submit" name="subscribe" value="Subscribe" className="subscribe-btn" />
                                    </div>
                                </form>
                                <div id="preloader" style={{ display: "none" }}>
                                    <div id="loader"></div>
                                </div>
                                <div id="preloader_two" style={{ display: "none" }}>
                                    <svg className="pl" viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
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
                            </div>
                        </div>
                        <div className="hr-cw-premium">
                            <p>or join your MCW account</p>
                        </div>
                        <TelegramLogin />
                    </div>
                </div>

                <div className="important">
                    <p>
                        <b>{user?.firstname} {user?.lastname}</b>, please read the documents (contract of offer and privacy policy) before paying for your subscription.
                    </p>

                    <p>
                        By clicking on the "Subscribe" button, you (<em>{user?.firstname} {user?.lastname}, @{user?.login}</em>) accept the contract/public offer located at: <a href={site_url_public_offer} target="_blank">this page</a>, and the privacy policy located at: <a href={site_url_privacy_policy} target="_blank">this page</a>.
                    </p>

                    <p>
                        The delivery of the CW Premium digital product is done by adding the payment details to the Database and providing the subscription services to the user in full, as well as providing subscription management capabilities.
                    </p>
                </div>
            </div>
        </section>
    );
}