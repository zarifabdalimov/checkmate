import { Link } from "@/i18n/navigation";
import { Button } from "@/modules/ui/button";
import { useTranslations } from "next-intl";

type AuthButtonsProps = {
  isAuthenticated: boolean;
  isMobile?: boolean;
};

export function AuthButtons({
  isAuthenticated,
  isMobile = false,
}: AuthButtonsProps) {
  const t = useTranslations("LandingPage.header");

  if (isAuthenticated) {
    return (
      <Button
        className={`font-medium shadow-sm shrink-0 ${isMobile ? "w-full" : ""}`}
        asChild
      >
        <Link href="/dashboard">{t("auth.dashboard")}</Link>
      </Button>
    );
  }

  return (
    <>
      <Button
        variant={isMobile ? "outline" : "ghost"}
        className={`font-medium shrink-0 ${isMobile ? "w-full" : ""}`}
        asChild
      >
        <Link href="/auth/sign-in">{t("auth.signIn")}</Link>
      </Button>
      <Button
        className={`font-medium shadow-sm shrink-0 ${isMobile ? "w-full" : ""}`}
        asChild
      >
        <Link href="/auth/sign-up">{t("auth.signUp")}</Link>
      </Button>
    </>
  );
}
