import { VerifyEmailScreen } from "@/modules/auth/screens/verify-email";
import { createPageMetadata } from "@/lib/constants/metadata";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = createPageMetadata("VERIFY_EMAIL");

export default function Page() {
  return (
    <Suspense>
      <VerifyEmailScreen />
    </Suspense>
  );
}
