import { createPageMetadata } from "@/lib/constants/metadata";
import { VerifyEmailScreen } from "@/modules/auth/screens/verify-email";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata("VERIFY_EMAIL", locale);
}

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
