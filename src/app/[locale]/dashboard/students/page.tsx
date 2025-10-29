import { createPageMetadata } from "@/lib/constants/metadata";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = createPageMetadata("STUDENTS");

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StudentsPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const { StudentsScreen } = await import(
    "@/modules/students/screens/students-screen"
  );

  return <StudentsScreen />;
}
