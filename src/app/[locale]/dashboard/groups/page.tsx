import { createPageMetadata } from "@/lib/constants/metadata";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = createPageMetadata("GROUPS");

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function GroupsPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const { GroupsScreen } = await import(
    "@/modules/groups/screens/groups-screen"
  );

  return <GroupsScreen />;
}
