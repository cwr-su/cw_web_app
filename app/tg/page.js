"use client";
import { useEffect } from "react";

const TelegramLogin = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-widget.js?7";
        script.setAttribute("data-telegram-login", "codew_cloud_auth_bot");
        script.setAttribute("data-size", "large");
        script.setAttribute("data-auth-url", "/api/auth/telegram");
        script.async = true;

        document.getElementById("telegram-widget-container").appendChild(script);
    }, []);

    return <div id="telegram-widget-container"></div>;
};

export default TelegramLogin;
