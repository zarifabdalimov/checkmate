import { createPageMetadata } from "@/lib/constants/metadata";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = createPageMetadata("DASHBOARD");

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="flex flex-1 items-center justify-center">
      <h1 className="text-3xl font-bold">Dashboard Home</h1>
    </div>
  );
}
