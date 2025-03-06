"use client"

import Link from "next/link";

export default function CWPremiumPageAuthFalse({ subDays, user }) {
    const linkMailToFaqAns1 = `mailto:help@cwr.su?subject=Refund and cancellation of CW Premium subscription on account: ${user.login}`;
    const linkMailToFaqAns3 = `mailto:help@cwr.su?subject=I (@${user.login}) Found a new bug in the cwr.su system. System: CW`;
    
    return (
        <section className="manage_my_cwpremium">
            <span id="cwpremium-logo-icon"></span>

            <div className="user_container">
                <div className="tabs">
                    <input checked id="tab-btn-1" name="tab-btn" type="radio" value="" />
                    <label for="tab-btn-1">My Premium</label>
                    <input id="tab-btn-2" name="tab-btn" type="radio" value="" />
                    <label for="tab-btn-2" className="link-tab-btn"><Link href="/my/ai/">API</Link></label>
                    <input id="tab-btn-3" name="tab-btn" type="radio" value="" />
                    <label for="tab-btn-3" className="link-tab-btn"><Link href="/my/ai/">My AI</Link></label>
                    <div className="tab-content" id="content-1">
                        <div className="cwpremium_content_tab">
                            <div className="info_main_block">
                                <p className="title_section">Subscription is still active:</p>
                                <p className="content_info_section">{subDays} day(s)</p>
                            </div>
                        </div>

                        <div className="cwpremium_content_tab faq_content_tab">
                            <div className="info_main_block">
                                <p className="title_section faq_title_section_tab">FAQ</p>
                                <div className="content_info_section faq_content_info_section">
                                    <section className="faq faq_cwpremium_in_tab">
                                        <h2>FAQ</h2>
                                        <div className="faq-list">
                                            <div className="faq-item">
                                                <div className="visible-faq-item-sector openFaqAnswerBtn1">
                                                    <span className="faq-title">
                                                        <p>Can I cancel my subscription and get a refund?</p>
                                                    </span>
                                                    <span className="faq-span-button">
                                                        <div id="openFaqAnswerBtn">
                                                            <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="rgba(0, 0, 0, 0.96)">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.46967 7.96967C4.76256 7.67678 5.23744 7.67678 5.53033 7.96967L12 14.4393L18.4697 7.96967C18.7626 7.67678 19.2374 7.67678 19.5303 7.96967C19.8232 8.26256 19.8232 8.73744 19.5303 9.03033L12.5303 16.0303C12.2374 16.3232 11.7626 16.3232 11.4697 16.0303L4.46967 9.03033C4.17678 8.73744 4.17678 8.26256 4.46967 7.96967Z" fill="currentColor"></path>
                                                            </svg>
                                                        </div>
                                                    </span>
                                                </div>
                                                <div className="faq-answer faqAns1">
                                                    <p>Of course. You can write to EMail <a href={linkMailToFaqAns1}>help@cwr.su</a> at any time, specifying your login in the body and/or subject line of the email (it can already be specified when you go through the <a href={linkMailToFaqAns1}>this link</a>) and the reason (if desired) for unsubscribing.</p>
                                                </div>
                                            </div>

                                            <div className="faq-item">
                                                <div className="visible-faq-item-sector openFaqAnswerBtn2">
                                                    <span className="faq-title">
                                                        <p>How can I get an API key?</p>
                                                    </span>
                                                    <span className="faq-span-button">
                                                        <div id="openFaqAnswerBtn" aria-hidden="true">
                                                            <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="rgba(0, 0, 0, 0.96)">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.46967 7.96967C4.76256 7.67678 5.23744 7.67678 5.53033 7.96967L12 14.4393L18.4697 7.96967C18.7626 7.67678 19.2374 7.67678 19.5303 7.96967C19.8232 8.26256 19.8232 8.73744 19.5303 9.03033L12.5303 16.0303C12.2374 16.3232 11.7626 16.3232 11.4697 16.0303L4.46967 9.03033C4.17678 8.73744 4.17678 8.26256 4.46967 7.96967Z" fill="currentColor"></path>
                                                            </svg>
                                                        </div>
                                                    </span>
                                                </div>
                                                <div className="faq-answer faqAns2">
                                                    <p>To get the API key you need:</p>
                                                    <p>1. To go to <Link href="/my/">this page (CW ID account)</Link>, and then go to the "My API" section.</p>
                                                    <p>2. Click on the pencil to the right of the phrase "API (Licence) key" and then confirm the action (issuing/reissuing a new API key) by entering your login.</p>
                                                    <p>3. After that you will receive your API key in the "release window".<br />Important! After updating the CW ID account management page - the key will be hidden.</p>
                                                </div>
                                            </div>

                                            <div className="faq-item">
                                                <div className="visible-faq-item-sector openFaqAnswerBtn3">
                                                    <span className="faq-title">
                                                        <p>What should I do if I find a bug in the CW ID or/and CW or/and CW Premium system?</p>
                                                    </span>
                                                    <span className="faq-span-button">
                                                        <div id="openFaqAnswerBtn">
                                                            <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="rgba(0, 0, 0, 0.96)">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.46967 7.96967C4.76256 7.67678 5.23744 7.67678 5.53033 7.96967L12 14.4393L18.4697 7.96967C18.7626 7.67678 19.2374 7.67678 19.5303 7.96967C19.8232 8.26256 19.8232 8.73744 19.5303 9.03033L12.5303 16.0303C12.2374 16.3232 11.7626 16.3232 11.4697 16.0303L4.46967 9.03033C4.17678 8.73744 4.17678 8.26256 4.46967 7.96967Z" fill="currentColor"></path>
                                                            </svg>
                                                        </div>
                                                    </span>
                                                </div>
                                                <div className="faq-answer faqAns3">
                                                    <p>If you do find a bug in the systems above, please let us know by writing to EMail <a href={linkMailToFaqAns3}>help@cwr.su</a>. It is important to specify as the system - the system(s) where the bug(s) was(were) discovered.</p>
                                                </div>
                                            </div>

                                            <div className="faq-item last">
                                                <div className="visible-faq-item-sector openFaqAnswerBtn4">
                                                    <span className="faq-title">
                                                        <p>What to do if you urgently need a response from the administrator/developer?</p>
                                                    </span>
                                                    <span className="faq-span-button">
                                                        <div id="openFaqAnswerBtn">
                                                            <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="rgba(0, 0, 0, 0.96)">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.46967 7.96967C4.76256 7.67678 5.23744 7.67678 5.53033 7.96967L12 14.4393L18.4697 7.96967C18.7626 7.67678 19.2374 7.67678 19.5303 7.96967C19.8232 8.26256 19.8232 8.73744 19.5303 9.03033L12.5303 16.0303C12.2374 16.3232 11.7626 16.3232 11.4697 16.0303L4.46967 9.03033C4.17678 8.73744 4.17678 8.26256 4.46967 7.96967Z" fill="currentColor"></path>
                                                            </svg>
                                                        </div>
                                                    </span>
                                                </div>
                                                <div className="faq-answer faqAns4">
                                                    <p>You should write to the developer's Telegram account: <a href="https://t.me/aleksandr_twitt">@aleksandr_twitt</a>, or the MCW-Bot Ticket System: <a href="https://t.me/helper_cwBot">here</a>.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-content" id="content-2">
                        <div className="cwpremium_content_tab">
                            <div className="info_main_block">
                                <p className="title_section">My API-Key:</p>
                                <p className="content_info_section">
                                    Go to the <Link href="/my/">CW ID account</Link> to manage your API (Licence) key(s)
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="tab-content" id="content-3">
                        <div className="cwpremium_content_tab">
                            <div className="info_main_block">
                                <p className="title_section">AI</p>
                                <p className="content_info_section">
                                    Go to the <Link href="/my/ai/">AI CW page</Link> to ask (or generate images) AI CW
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}