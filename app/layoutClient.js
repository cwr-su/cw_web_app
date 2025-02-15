"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LayoutClient({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        router.push("/login"); // Перенаправляем на страницу входа
    };

    return (
        <div className="page">
            <div className="wrap_navigation_bar">
                <div className="navbar">
                    <div className="visible_sector">
                        <div className="navbar_main_links">
                            <Link href="/" className={pathname === "/" ? "active" : ""}>Главная</Link>
                            <Link href="/profile" className={pathname === "/profile" ? "active" : ""}>Профиль</Link>
                        </div>

                        <div className="auth-buttons">
                            {isAuthenticated ? (
                                <button onClick={handleLogout} className="logout-btn" id="logout-btn">Выйти</button>
                            ) : (
                                <Link href="/login" className="login-btn" id="login-btn">Войти</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="main">{children}</div>
        </div>
    );
}
