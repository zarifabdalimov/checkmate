"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";
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
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">CheckMate</span>
          </div>

          {/* Navigation Links */}
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
              onClick={() => scrollToSection("pricing")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {t("navigation.pricing")}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {t("navigation.about")}
            </button>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {auth.data ? (
              <Button className="font-medium shadow-sm" asChild>
                <Link href="/dashboard/home">{t("auth.dashboard")}</Link>
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
