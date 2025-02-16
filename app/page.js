"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [user, setUser] = useState(null);
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get("/api/user", { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => setUser(res.data.user))
                .catch((err) => {
                    console.error("Ошибка при получении пользователя:", err);
                    setUser(null);
                });
        }
        fetchPosts(); // Загружаем посты при монтировании компонента
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get("/api/posts"); // GET-запрос
            console.log("Ответ от API для постов:", res); // Логируем ответ
            setPosts(res.data);
        } catch (error) {
            console.error("Ошибка загрузки постов:", error);
            // Если сервер возвращает не JSON, это поможет увидеть HTML ошибку
            if (error.response) {
                console.error("Ошибка API:", error.response.data);
            }
        }
    };

    const handlePost = async () => {
        if (!content.trim()) return;

        const token = localStorage.getItem("token");
        try {
            await axios.post("/api/posts", { content }, { headers: { Authorization: `Bearer ${token}` } });
            setContent("");
            fetchPosts(); // Обновляем посты после публикации
        } catch (error) {
            console.error("Ошибка при публикации поста:", error);
        }
    };

    return (
        <div className="feed">
            <h1>Лента</h1>

            {user ? (
                <div>
                    <textarea
                        className="whats_new"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Что нового?"
                    />
                    <button onClick={handlePost}>Опубликовать</button>
                </div>
            ) : (
                <p>Войдите, чтобы публиковать посты</p>
            )}

            <div className="posts">
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="post">{post.content}</div>
                    ))
                ) : (
                    <p>Нет постов для отображения.</p>
                )}
            </div>
        </div>
    );
}
