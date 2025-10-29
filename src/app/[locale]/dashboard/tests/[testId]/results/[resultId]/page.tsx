import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string; testId: string; resultId: string }>;
};

export default async function TestResultDetailPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const { TestResultDetailScreen } = await import(
    "@/modules/tests/screens/test-result-detail-screen"
  );

  return <TestResultDetailScreen />;
}
