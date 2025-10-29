import { VerifyEmailScreen } from "@/modules/auth/screens/verify-email";
import { createPageMetadata } from "@/lib/constants/metadata";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export const metadata: Metadata = createPageMetadata("VERIFY_EMAIL");

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function VerifyEmailPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <Suspense>
      <VerifyEmailScreen />
    </Suspense>
  );
}
