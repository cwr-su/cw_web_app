"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Если токен существует, перенаправляем на главную страницу
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/"); // Редирект на главную
        }
    }, [router]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        if (res.ok) {
            router.push("/login"); // После регистрации перенаправляем на вход
        } else {
            setError(data.error || "Ошибка регистрации");
        }
    };

    return (
        <div className="auth-container">
            <h2>Регистрация</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Логин" value={form.username} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Пароль" value={form.password} onChange={handleChange} required />
                <button type="submit">Зарегистрироваться</button>
            </form>
            <div className="after_button_p">
                <p>Уже есть аккаунт? <a href="/login">Войти</a></p>
            </div>
        </div>
    );
}
