"use client"

import { useEffect, useState } from "react";
import TelegramLogin from "./TelegramWidget";
import Script from "next/script";

export default function CWPremiumPageAuthFalse({ site_url_privacy_policy, site_url_public_offer, user }) {
    const [error403ForConnMCW, setError403ForConnMCW] = useState(null);

    useEffect(() => {
        let error403ForConnMCWLS = localStorage.getItem("error403ForConnMCW");
        if (error403ForConnMCWLS) {
            setError403ForConnMCW(true);
            localStorage.removeItem("error403ForConnMCW");
        }
    })

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
                            <button id="close-err" onclick="closeErrorBox()">
                                &times;
                            </button>
                        </div>
                        <Script src="/scripts/err_paystat_mdl.js" strategy="afterInteractive" />
                    </div>
                ) : (null)
                    (

                        <div class="card-cw-premium">
                            <div class="benefits">
                            </div>

                            <div class="cw-premium">
                                <div class="card">
                                    <div class="card__title">
                                        <div class="icon">
                                            <i class="fa fa-arrow-left"></i>
                                        </div>
                                        <h3>New product</h3>
                                    </div>
                                    <div class="card__body">
                                        <div class="half">
                                            <div class="featured_text">
                                                <h1>CW</h1>
                                                <p class="sub">Premium</p>
                                                <p class="price">₽1.00</p>
                                                <p class="price-old">₽59.00</p>
                                            </div>
                                            <div class="image">
                                                <img src="../storage/cw_premium/cwpremium.svg" alt="CW PREMIUM" />
                                            </div>
                                        </div>
                                        <div class="half">
                                            <div class="description">
                                                <p>&emsp;&emsp;The CW Premium subscription provides many of the benefits mentioned above. Thanks to this subscription, an ordinary user receives not only generation from AI, but also another set of functionality, including - the user (even if he does not know programming languages well or at all) can use the Manager CW Bot API.</p>
                                                <p>&emsp;&emsp;Also, a user who has a subscription to Telegram Premium has the right to use the Manager CW Bot API (his created bot) as a personal assistant manager. He (the bot) is able to respond to messages that you missed / or could not respond to. The bot will respond with the message template you set on different topics, for example, if a friend wrote to you - "Thank you very much" or something like that and in a positive context - the bot will respond to him with the phrase you set, e.g. "Please", or some kind of sticker, or premium emoji (from Telegram Emoji).</p>
                                                <p>&emsp;&emsp;We hope you enjoy your CW Premium subscription.</p>
                                            </div>
                                            <span class="stock"><i class="fa fa-pen"></i> In stock</span>
                                        </div>
                                    </div>
                                    <div class="card__footer">
                                        <div class="card-footer-sub">
                                            <div class="recommend">
                                                <p>Recommended by</p>
                                                <h3>Artificial intelligence CW</h3>
                                            </div>
                                            <form action="index.php" method="post" class="subscribe_form" id='subscribef'>
                                                <input type="hidden" name="email" value={user.email} />

                                                <div class="input-box button-submit" id="subscribe">
                                                    <input type="submit" name="subscribe" value="Subscribe" class="subscribe-btn" />
                                                </div>
                                            </form>
                                            <div id="preloader" style="display: none;">
                                                <div id="loader"></div>
                                            </div>
                                            <div id="preloader_two" style="display: none;">
                                                <svg class="pl" viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                                                    <defs>
                                                        <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                                                            <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                                                            <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                                                        </linearGradient>
                                                        <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                                                            <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                                                        </linearGradient>
                                                    </defs>
                                                    <circle class="pl__ring" cx="100" cy="100" r="82" fill="none" stroke="url(#pl-grad1)" stroke-width="36" stroke-dasharray="0 257 1 257" stroke-dashoffset="0.01" stroke-linecap="round" transform="rotate(-90,100,100)" />
                                                    <line class="pl__ball" stroke="url(#pl-grad2)" x1="100" y1="18" x2="100.01" y2="182" stroke-width="36" stroke-dasharray="1 165" stroke-linecap="round" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="hr-cw-premium">
                                        <p>or join your MCW account</p>
                                    </div>
                                    <TelegramLogin />
                                </div>
                            </div>

                            <div class="important">
                                <p>
                                    <b>{user.firstname} {user.lastname}</b>, please read the documents (contract of offer and privacy policy) before paying for your subscription.
                                </p>

                                <p>
                                    By clicking on the "Subscribe" button, you (<em>{user.firstname} {user.lastname}, @{user.login}</em>) accept the contract/public offer located at: <a href={site_url_public_offer} target="_blank">this page</a>, and the privacy policy located at: <a href={site_url_privacy_policy} target="_blank">this page</a>.
                                </p>

                                <p>
                                    The delivery of the CW Premium digital product is done by adding the payment details to the Database and providing the subscription services to the user in full, as well as providing subscription management capabilities.
                                </p>
                            </div>
                        </div>
                    )
            }
        </section>
    );
}