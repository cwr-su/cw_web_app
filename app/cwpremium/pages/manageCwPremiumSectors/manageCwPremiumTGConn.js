"use client"

import Link from "next/link";

export default function ManageCwPremiumTGConn({ subDays, user }) {
    const linkMailToFaqAns1 = `mailto:help@cwr.su?subject=Refund and cancellation of CW Premium subscription on account: ${user?.login}`;
    const linkMailToFaqAns3 = `mailto:help@cwr.su?subject=I (@${user?.login}) Found a new bug in the cwr.su system. System: CW`;

    const faqData = [
        {
            question: "Can I cancel my subscription and get a refund?",
            answer: (
                <p>
                    Yes, you will be able to cancel your CW Premium subscription and receive a refund if you cancelled your subscription at the{" "}
                    <a href="https://t.me/helper_cwBot" target="_blank">Telegram Bot MCW (Manager CW Bot)</a> - make a TicketSystem enquiry.<br/>
                    Also, if you can write to EMail:{" "}
                    <a href={linkMailToFaqAns1}>help@cwr.su</a>, for a refund (or Telegram Stars) by providing your login, we will first verify your identity and then issue a refund.
                </p>
            ),
        },
        {
            question: "How can I get an API key?",
            answer: (
                <p>
                    To get the API key you need:
                    <br />
                    1. Go to <Link href="/my/">this page (CW ID account)</Link>, and then
                    go to the "My API" section.
                    <br />
                    2. Click on the pencil to the right of the phrase "API (Licence) key"
                    and confirm the action by entering your login.
                    <br />
                    3. You will receive your API key in the "release window".<br />
                    Important! After updating the CW ID account management page - the key
                    will be hidden.
                </p>
            ),
        },
        {
            question:
                "What should I do if I find a bug in the CW ID or/and CW or/and CW Premium system?",
            answer: (
                <p>
                    If you find a bug, please write to{" "}
                    <a href={linkMailToFaqAns3}>help@cwr.su</a> and specify where the bug
                    was found.
                </p>
            ),
        },
        {
            question: "What to do if you urgently need a response from the administrator/developer?",
            answer: (
                <p>
                    You should write to the developer's Telegram:{" "}
                    <a href="https://t.me/aleksandr_twitt">@aleksandr_twitt</a>, or the
                    MCW-Bot Ticket System:{" "}
                    <a href="https://t.me/helper_cwBot">here</a>.
                </p>
            ),
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const typeAnimate = 'fade';

    return (
        <section className="manage_my_cwpremium">
            <span id="cwpremium-logo-icon"></span>

            <div className="user_container">
                <div className="tabs">
                    <input checked id="tab-btn-1" name="tab-btn" type="radio" value="" />
                    <label for="tab-btn-1">My Premium</label>
                    <input id="tab-btn-2" name="tab-btn" type="radio" value="" />
                    <label for="tab-btn-2">Telegram Link</label>
                    <input id="tab-btn-3" name="tab-btn" type="radio" value="" />
                    <label for="tab-btn-3" className="link-tab-btn"><Link href="../my/ai/">My AI</Link></label>

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
                                            {faqData.map((item, index) => {
                                                const isLast = index === faqData.length - 1;
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`faq-item ${openIndex === index ? "active" : ""} ${isLast ? "last" : ""}`}
                                                    >

                                                        <div
                                                            className="visible-faq-item-sector"
                                                            onClick={() => toggleFAQ(index)}
                                                        >
                                                            <span className="faq-title">
                                                                <p>{item.question}</p>
                                                            </span>
                                                            <span className="faq-span-button">
                                                                <div id="openFaqAnswerBtn" className={`${openIndex === index ? "rotated" : ""}`}>
                                                                    <svg
                                                                        width="100%"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        color="rgba(0, 0, 0, 0.96)"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            clipRule="evenodd"
                                                                            d="M4.46967 7.96967C4.76256 7.67678 5.23744 7.67678 5.53033 7.96967L12 14.4393L18.4697 7.96967C18.7626 7.67678 19.2374 7.67678 19.5303 7.96967C19.8232 8.26256 19.8232 8.73744 19.5303 9.03033L12.5303 16.0303C12.2374 16.3232 11.7626 16.3232 11.4697 16.0303L4.46967 9.03033C4.17678 8.73744 4.17678 8.26256 4.46967 7.96967Z"
                                                                            fill="currentColor"
                                                                        ></path>
                                                                    </svg>
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div className={`faq-answer ${openIndex === index ? "active" : ""}`}>
                                                            {item.answer}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-content" id="content-2">
                        <div className="cwpremium_content_tab">
                            <div className="info_main_block">
                                <p className="title_section">Unlink your Telegram account:</p>
                                <div className="content_info_section">
                                    <div className="unlink_box">
                                        <button type="button" className="btn btn-default" data-modal="modal_1">Unlink</button>
                                    </div>

                                    <div className="overlay overlay_1" data-close="" id="overlay"></div>

                                    <div id="modal_1" className="dlg-modal dlg-modal-fade">
                                        <span className="closer" data-close=""></span>
                                        <div className="scrolling-modal">
                                            <section className="inside_modal">
                                                <h1>Are you sure you want to unlink your Telegram account from CW, thereby losing your subscription to the CW website?</h1>
                                                <div className="form_in_modal">
                                                    <form action="index.php" method="post" className="unlink_form unlink-tg-form-in-tab" id='unlinkf'>
                                                        <div className="input-box">
                                                            <div className="form_input_box_block">
                                                                <p className="form_input_box_title">Enter your login, to confirm the action:</p>
                                                            </div>
                                                            <input type="text" name="login" placeholder={user?.login} />
                                                        </div>
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
                                                        <p className="error" id="error-message"></p>
                                                        <div className="input-box button-submit">
                                                            <input type="submit" name="unlink" value="Unlink" className="button_unlink_tg" />
                                                        </div>
                                                    </form>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        var typeAnimate = '${typeAnimate}';
                    `,
                }}
            />
        </section>

    );
}