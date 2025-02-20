import LayoutClient from "./layoutClient";

export const metadata = {
    title: "CW | CWR.SU",
    description: "CW. All in one place.",
    icons: {
        icon: "/favicon/favicon.ico",
        shortcut: "/favicon/favicon-32x32.png",
        apple: "/favicon/apple-touch-icon.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
            </head>
            <LayoutClient>{children}</LayoutClient>
        </html>
    );
}
