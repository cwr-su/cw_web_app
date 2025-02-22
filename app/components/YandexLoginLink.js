"use client";

export default function YandexLoginLink({ authUrl }) {
    return (<a href={authUrl}>
        <div className="logo-ya">
            <span className='span-logo-ya'></span>

        </div>
    </a>);
}
