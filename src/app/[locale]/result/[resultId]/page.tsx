import { PublicTestResultPinScreen } from "@/modules/tests/screens/public-test-result-pin-screen";
import { setRequestLocale } from "next-intl/server";

export default async function PublicTestResultPinPage({
  params,
}: {
  params: Promise<{ locale: string; resultId: string }>;
}) {
  const { locale, resultId } = await params;
  setRequestLocale(locale);

  return <PublicTestResultPinScreen resultId={resultId} />;
}
