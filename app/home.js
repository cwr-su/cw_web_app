"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { useSession, getSession } from "next-auth/react";

import "./globals.css";
import { getCookie } from "cookies-next/client";

export default function Home() {
    const [isSetTGCookie, setTGCookie] = useState(false);
    const [parsedUserDataObj, setParsedUserData] = useState(null);

    const { data: session, status } = useSession();
    const [userVerifyCode, setUserVerifyCode] = useState("");

    useEffect(() => {
        if (status === "authenticated") {
            setUserVerifyCode(session.user.verifyCode);
        }
    }, [status, session]);

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
    }, []);
    return (
        <section className="my_page">
            <div className="feed">
                <h1>CW | WEBAPP | Pre-Production version 0.0.5</h1>
                <p>(Log in with telegram: <Link href="/tg"><span>CLICK HERE</span></Link>.)</p><p>Person: </p>{isSetTGCookie ? (
                    <div>
                        <p>Welcome, {parsedUserDataObj.first_name} {parsedUserDataObj.last_name}</p>
                        <p>Username: {parsedUserDataObj.username}</p>
                        <img src={parsedUserDataObj.photo_url} alt="User Photo" width="50" height="50" />
                    </div>
                ) : (
                    <p>Stranger</p>
                )}

                {userVerifyCode ? (<p>VerifyCode: {userVerifyCode} </p>) : (<p>Hmmm.... </p>)}

                <hr></hr>
            </div>
        </section>
    );
}
