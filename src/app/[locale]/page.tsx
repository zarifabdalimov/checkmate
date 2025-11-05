import { getMetadataForLocale } from "@/lib/constants/metadata";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getMetadataForLocale(locale);

  return {
    title: metadata.HOME_PAGE_TITLE,
    description: metadata.LANDING_DESCRIPTION,
    openGraph: {
      title: metadata.BRAND_FULL,
      description: metadata.LANDING_DESCRIPTION,
    },
    twitter: {
      title: metadata.BRAND_FULL,
      description: metadata.LANDING_DESCRIPTION,
    },
  };
}

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
