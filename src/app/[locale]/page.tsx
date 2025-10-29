import { METADATA_CONSTANTS } from "@/lib/constants/metadata";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Home",
  description: METADATA_CONSTANTS.LANDING_DESCRIPTION,
  openGraph: {
    title: METADATA_CONSTANTS.BRAND_FULL,
    description: METADATA_CONSTANTS.LANDING_DESCRIPTION,
  },
  twitter: {
    title: METADATA_CONSTANTS.BRAND_FULL,
    description: METADATA_CONSTANTS.LANDING_DESCRIPTION,
  },
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const { LandingScreen } = await import(
    "@/modules/landing/screen/landing-screen"
  );

  return <LandingScreen />;
}

