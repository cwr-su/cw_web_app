import { Suspense } from "react";
import PaymentComponentPage from "./PaymentComponent";

export default function PaymentPage() {
    return (
        <Suspense>
            <PaymentComponentPage />
        </Suspense>
    );
}
