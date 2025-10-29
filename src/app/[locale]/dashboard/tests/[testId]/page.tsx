import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string; testId: string }>;
};

export default async function TestDetailPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const { TestDetailScreen } = await import(
    "@/modules/tests/screens/test-detail-screen"
  );

  return <TestDetailScreen />;
}
