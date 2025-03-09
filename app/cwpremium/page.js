import { Suspense } from "react";
import CWPremiumComponent from "./CWPremiumPageComponent";

export default function CWPremiumPage() {
    return (
        <Suspense>
            <CWPremiumComponent />
        </Suspense>
    );
}
