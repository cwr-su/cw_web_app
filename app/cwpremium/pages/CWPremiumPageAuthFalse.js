"use client"

import TelegramLogin from "./TelegramWidget";
import Link from "next/link";

export default function CWPremiumPageAuthFalse({ site_url_privacy_policy, site_url_public_offer }) {
    
    return (
        <section className="subscribe">
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
                                    <img src="/storage/cw_premium/cwpremium.svg" alt="CW PREMIUM" />
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
                                <div className="action">
                                    <button type="button"><Link href="/login">Subscribe</Link></button>
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
                        Please read the documents (contract of offer and privacy policy) before paying for your subscription.
                    </p>

                    <p>
                        By clicking on the "Subscribe" button, you accept the contract/public offer located at: <a href={site_url_public_offer} target="_blank">this page</a>, and the privacy policy located at: <a href={site_url_privacy_policy} target="_blank">this page</a>.
                    </p>

                    <p>
                        The delivery of the CW Premium digital product is done by adding the payment details to the Database and providing the subscription services to the user in full, as well as providing subscription management capabilities.
                    </p>
                </div>
            </div>
        </section>
    );
}