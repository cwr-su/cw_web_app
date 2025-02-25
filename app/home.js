"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

import "./globals.css";
import { getCookie } from "cookies-next/client";

export default function Home() {
    // const [user, setUser] = useState(null);
    // const [content, setContent] = useState("");
    // const [posts, setPosts] = useState([]);
    const [isSetTGCookie, setTGCookie] = useState(false);
    const [parsedUserDataObj, setParsedUserData] = useState(null);

    useEffect(() => {
        const userData = getCookie('tg_user');

        if (userData) {
            const parsedUserData = JSON.parse(userData);
            console.log("User Data from Cookie:", parsedUserData);
            setTGCookie(true);
            setParsedUserData(parsedUserData);
        } else {
            console.log("No user data in cookie.");
        }

        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get("/api/user", { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => setUser(res.data.user))
                .catch(() => setUser(null));
        }
        // fetchPosts();
    }, []);

    // const fetchPosts = async () => {
    //     try {
    //         const res = await axios.get("/api/posts");
    //         setPosts(res.data);
    //     } catch (error) {
    //         console.error("Error loading posts:", error);
    //     }
    // };

    // const handlePost = async () => {
    //     if (!content.trim()) return;

    //     const token = localStorage.getItem("token");
    //     try {
    //         await axios.post("/api/posts", { content }, { headers: { Authorization: `Bearer ${token}` } });
    //         setContent("");
    //         fetchPosts();
    //     } catch (error) {
    //         console.error("Error when publishing a post:", error);
    //     }
    // };

    return (
        <section className="my_page">
            <div className="feed">
                <h1>CW | WEBAPP | Pre-Production version 0.0.1</h1>
                <p>(Log in with telegram: <Link href="/tg"><span>CLICK HERE</span></Link>.)</p><p>Person: </p>{isSetTGCookie ? (
                    <div>
                        <p>Welcome, {parsedUserDataObj.first_name} {parsedUserDataObj.last_name}</p>
                        <p>Username: {parsedUserDataObj.username}</p>
                        <img src={parsedUserDataObj.photo_url} alt="User Photo" width="50" height="50" />
                    </div>
                ) : (
                    <p>Stranger</p>
                )}

                <hr></hr>

                {/* {user ? (
                    <div>
                        <textarea
                            className="whats_new"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What's new?"
                        />
                        <button onClick={handlePost}>Publish</button>
                    </div>
                ) : (
                    <p>Sign in to publish posts via CW ID</p>
                )}
                <div className="posts">
                    {Array.isArray(posts) && posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="post">{post.content}</div>
                        ))
                    ) : (
                        <p>There are no posts to display.</p>
                    )}
                </div> */}
            </div>
        </section>
    );
}
