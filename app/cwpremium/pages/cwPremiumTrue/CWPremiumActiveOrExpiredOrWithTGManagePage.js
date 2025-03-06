"use client"

import TelegramLogin from "../TelegramWidget";
import ManageCwPremiumTGNone from "../manageSectors/manageCwPremiumTGNone";
import ManageCwPremiumTGConn from "../manageSectors/manageCwPremiumTGConn";

export default function CWPremiumActiveOrExpiredOrWithTGManagePage({ premiumobj, subDays, user, site_url_privacy_policy, site_url_public_offer }) {
    return (
        <section className="premium_manage">
            <style jsx>{`
                .page {
                    padding: 1rem;
                    box-shadow: unset;
                    background-color: unset;
                }
            `}
            </style>
            {
                subDays > 0 ? (
                    <main>
                        {
                            premiumobj.userMCWTgId === "none" ? (
                                <ManageCwPremiumTGNone subDays={subDays} user={user} />
                            ) : (
                                <ManageCwPremiumTGConn subDays={subDays} user={user} />
                            )
                        }
                    </main>
                ) : (
                    <main>
                        <section className="subscribe">
                            <h2>Manage your CW PREMIUM</h2>
                            <p>Your subscription has expired! Sign up for a new one here, or on Telegram: @helper_cwBot</p>
                        </section>
                        <section className="subscribe">
                            <div className="card-cw-premium">
                                <div className="cw-premium">
                                    <div className="card">
                                        <div className="card__title">
                                            <div className="icon">
                                                <i className="fa fa-arrow-left"></i>
                                            </div>
                                            <h3>Renew your Premium</h3>
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
                                            <div className="half renew">
                                                <div className="description">
                                                    <p>&emsp;&emsp;Subscription will become available after the payment goes through the system. A few minutes after payment - refresh this page.</p>
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
                                                <form action="index.php" method="post" className="subscribe_form" id='subscribef'>
                                                    <input type="hidden" name="email" value={user.email} />
                                                    <div className="input-box button-submit">
                                                        <input type="submit" name="subscribe" value="Subscribe" className="subscribe-btn" />
                                                    </div>
                                                </form>
                                                <div id="preloader" style="display: none;">
                                                    <div id="loader"></div>
                                                </div>
                                                <div id="preloader_two" style="display: none;">
                                                    <svg className="pl" viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
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
                                                        <circle className="pl__ring" cx="100" cy="100" r="82" fill="none" stroke="url(#pl-grad1)" stroke-width="36" stroke-dasharray="0 257 1 257" stroke-dashoffset="0.01" stroke-linecap="round" transform="rotate(-90,100,100)" />
                                                        <line className="pl__ball" stroke="url(#pl-grad2)" x1="100" y1="18" x2="100.01" y2="182" stroke-width="36" stroke-dasharray="1 165" stroke-linecap="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hr-cw-premium">
                                            <p>or UPDATE* CW Premium with your MCW account</p>
                                        </div>
                                        <TelegramLogin />
                                    </div>
                                </div>

                                <div className="important">
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

                                <div className="footnote">
                                    <p>*UPDATE. If you subscribed via Telegram bot @helper_cwBot, on the website - you need to “apply changes”! To do so, click on the Sign-In button with Telegram.</p>
                                    <p>**API. The API function will be added to the CW system (i.e. CWR.SU website) in the near future.</p>
                                </div>
                            </div>
                        </section>
                    </main>
                )
            }
        </section>
    );
}