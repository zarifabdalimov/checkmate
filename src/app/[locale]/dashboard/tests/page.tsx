import { createPageMetadata } from "@/lib/constants/metadata";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = createPageMetadata("TESTS");

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TestsPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const { TestsScreen } = await import("@/modules/tests/screens/tests-screen");

  return <TestsScreen />;
}
