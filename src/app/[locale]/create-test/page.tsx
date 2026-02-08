import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Create Test",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CreateTestPage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const { CreateTestScreen } = await import(
    "@/modules/create-test/screen/create-test-screen"
  );

  return <CreateTestScreen />;
}
