"use client";

import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import "./styles/index.css";
import "./styles/theme.css";
import "./styles/light_preloader.css";
import "./styles/loader_server_data.css";

export default function LayoutClient({ children }) {
    return (
        <SessionProvider>
            <AuthWrapper>{children}</AuthWrapper>
        </SessionProvider>
    );
}

function AuthWrapper({ children }) {
    const { data: session } = useSession();

    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.body.classList.add("loading");

        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.classList.remove("loading");
        }, 1500);

        const savedTheme = localStorage.getItem("color-scheme") || "default";
        document.documentElement.setAttribute("data-color-scheme", savedTheme);
        setIsDarkMode(savedTheme === "dark");

        return () => clearTimeout(timer);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        document.body.classList.toggle("block", !menuOpen);
    };

    useEffect(() => {
        setMenuOpen(false);
        document.body.classList.remove("block");
    }, [pathname]);

    const toggleTheme = () => {
        const newTheme = isDarkMode ? "default" : "dark";
        document.documentElement.setAttribute("data-color-scheme", newTheme);
        localStorage.setItem("color-scheme", newTheme);
        setIsDarkMode(!isDarkMode);
    };

    return (
        <body className={`cw-body ${menuOpen ? "block" : ""}`}>
            {isLoading && (
                <div className="preloader_of_all_pages">
                    <div className="spinner"></div>
                </div>
            )}
            <section id="page">
                <div className="header-navbar">
                    <div className={`wrap ${menuOpen ? "active" : ""}`}>
                        <div className="visible_sector">
                            <div className="logo">
                                <Link href="/" className={pathname === "/" ? "active" : ""}><span className="span-logo"></span></Link>
                            </div>
                            <div className="hamburger-lines" onClick={toggleMenu}>
                                <span className={`line line1 ${menuOpen ? "click" : ""}`}></span>
                                <span className={`line line2 ${menuOpen ? "click" : ""}`}></span>
                                <span className={`line line3 ${menuOpen ? "click" : ""}`}></span>
                            </div>
                        </div>
                        <div className={`mobile-navbar-main ${menuOpen ? "active" : ""}`}>
                            <div className={`navbar-mob ${menuOpen ? "show" : ""}`}>
                                <div className={`menu-mob ${menuOpen ? "show" : ""}`}>
                                    <div className={`slider ${menuOpen ? "show" : ""}`}>
                                        <div className="slide-track">
                                            <div className="slide">
                                                <Link href="#manager_cw_bot"><img src="/storage/carousel/manager_cw_bot_cover_of_docs_200pxX200px.svg" height="100" width="250" alt="" /></Link>
                                            </div>
                                            <div className="slide">
                                                <img src="/storage/carousel/universal-logo-cw-premium.svg" height="100" width="250" alt="" />
                                            </div>
                                            <div className="slide">
                                                <img src="/storage/carousel/cwlogo_premium.svg" height="100" width="250" alt="" />
                                            </div>
                                            <div className="slide">
                                                <Link href="#manager_cw_bot">
                                                    <img src="/storage/carousel/manager_cw_bot_cover_of_docs_200pxX200px.svg" height="100" width="250" alt="" />
                                                </Link>
                                            </div>
                                            <div className="slide">
                                                <img src="/storage/carousel/universal-logo-cw-premium.svg" height="100" width="250" alt="" />
                                            </div>
                                            <div className="slide">
                                                <img src="/storage/carousel/cwlogo_premium.svg" height="100" width="250" alt="" />
                                            </div>
                                            <div className="slide">
                                                <img src="/storage/carousel/manager_cw_bot_cover_of_docs_200pxX200px.svg" height="100" width="250" alt="" />
                                            </div>
                                            <div className="slide">
                                                <img src="/storage/carousel/universal-logo-cw-premium.svg" height="100" width="250" alt="" />
                                            </div>
                                            <div className="slide">
                                                <img src="/storage/carousel/cwlogo_premium.svg" height="100" width="250" alt="" />
                                            </div>
                                            <div className="slide">
                                                <Link href="#manager_cw_bot"><img src="/storage/carousel/manager_cw_bot_cover_of_docs_200pxX200px.svg" height="100" width="250" alt="" />
                                                </Link>
                                            </div>
                                            <div className="slide">
                                                <img src="/storage/carousel/universal-logo-cw-premium.svg" height="100" width="250" alt="" />
                                            </div>
                                            <div className="slide">
                                                <img src="/storage/carousel/cwlogo_premium.svg" height="100" width="250" alt="" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-navbar">
                                        <div className="flex-navbar-left">
                                            <div className="elem-nav"><Link href="/" className={pathname === "/" ? "active" : ""}><span className="first_p_child" id="home-icon"></span>Home</Link></div>
                                            <div className="elem-nav"><Link href="/cwpremium/" className={pathname === "/cwpremium" ? "active" : ""}><span id="cwpremium-icon"></span>CW Premium</Link></div>
                                            <div className="elem-nav"><Link href="/projects" className={pathname === "/projects" ? "active" : ""}><span id="projects-icon"></span>CW's Projects</Link></div>
                                            <div className="elem-nav"><Link href="https://docs.cwr.su/" target="_blank"><span id="docs-icon"></span>Docs MCW</Link></div>
                                            <div className="elem-nav"><Link href="/from_developer" className={pathname === "/from_developer" ? "active" : ""}><span id="from-dev-icon"></span>From Developer</Link></div>
                                        </div>
                                        <div className="flex-navbar-right">
                                            <div className="elem_nav">
                                                <div className="toggle-dark-light">
                                                    <div className="button r" id="button-1">
                                                        <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} className="checkbox toggle" id="hide-checkbox" />
                                                        <div className="knobs"></div>
                                                        <div className="layer"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="elem-nav">
                                                {session ? (
                                                    <Link href="#" onClick={(e) => { e.preventDefault(); signOut(); }} className="logout-btn" id="logout-btn">
                                                        <span id="auth-icon"></span>Logout
                                                    </Link>
                                                ) : (
                                                    <Link href="/login" className="login-btn" id="login-btn"><span id="auth-icon"></span>Login</Link>
                                                )}
                                            </div>
                                            <div className="elem-nav"><Link href="https://acdn.cwr.su/" target="_blank"><span id="acdn-icon"></span>ACDN Storage</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`page ${menuOpen ? "hide" : ""}`}>
                    <main>{children}</main>
                    <footer>
                        <p>© CodeWriter (CW), 2023-{new Date().getFullYear()}</p>
                        <p><a href="https://cwr.su/privacy_policy/Privacy_Policy_CWR_SU_CW_from_23_11_2024.pdf" target="_blank">Privacy Policy</a>. <a href="https://cwr.su/public_offer/Public_offer_CWR_SU_24_11_2024.pdf" target="_blank">Contract / Offer / User Agreement</a></p>
                        <p>All rights reserved</p>
                    </footer>
                </div>
            </section>
        </body>
    );
}
