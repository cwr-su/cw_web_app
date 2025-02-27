import { Suspense } from "react";
import LoginPage from "./LoginComponent";

export default function Page() {
    return (
        <Suspense>
            <LoginPage />
        </Suspense>
    );
}
