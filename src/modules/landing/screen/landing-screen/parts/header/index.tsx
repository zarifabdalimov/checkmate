"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/modules/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  const t = useTranslations("LandingPage.header");
  const auth = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Image alt="CheckMate.ink" src="/logo.png" width={32} height={32} />
            <span className="text-xl font-bold font-serif">CheckMate.ink</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {t("navigation.features")}
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {t("navigation.howItWorks")}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {t("navigation.about")}
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {auth.data ? (
              <Button className="font-medium shadow-sm" asChild>
                <Link href="/dashboard">{t("auth.dashboard")}</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" className="font-medium" asChild>
                  <Link href="/auth/sign-in">{t("auth.signIn")}</Link>
                </Button>
                <Button className="font-medium shadow-sm" asChild>
                  <Link href="/auth/sign-up">{t("auth.signUp")}</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
