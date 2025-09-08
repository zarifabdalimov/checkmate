import { VerifyEmailScreen } from "@/modules/auth/screens/verify-email";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <VerifyEmailScreen />
    </Suspense>
  );
}
