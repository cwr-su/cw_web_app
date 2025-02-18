import "./globals.css";
import LayoutClient from "./layoutClient";

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
            <body className="min-h-screen bg-gray-100">
                <LayoutClient>{children}</LayoutClient>
            </body>
        </html>
    );
}
