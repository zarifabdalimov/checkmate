import { PublicTestResultViewScreen } from "@/modules/tests/screens/public-test-result-view-screen";
import { setRequestLocale } from "next-intl/server";

export default async function PublicTestResultViewPage({
  params,
}: {
  params: Promise<{ locale: string; resultId: string; token: string }>;
}) {
  const { locale, resultId, token } = await params;
  setRequestLocale(locale);

  return <PublicTestResultViewScreen resultId={resultId} token={token} />;
}
