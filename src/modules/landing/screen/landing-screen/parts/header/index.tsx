"use client";

import { useAuth } from "@/hooks/use-auth";
import { Link } from "@/i18n/navigation";
import { Button } from "@/modules/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LanguageSelector } from "./language-selector";

export function Header() {
  const t = useTranslations("LandingPage.header");
  const auth = useAuth();
  const [activeSection, setActiveSection] = useState<string>("");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of fixed header + some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["why-checkmate", "how-it-works", "team", "sponsors"];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image alt="CheckMate.ink" src="/logo.png" width={32} height={32} />
            <span className="text-xl font-bold font-serif hidden sm:inline">
              CheckMate.ink
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("why-checkmate")}
              className={`text-muted-foreground hover:text-foreground transition-colors font-medium relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${
                activeSection === "why-checkmate"
                  ? "text-foreground after:w-full"
                  : "after:w-0 hover:after:w-full"
              }`}
            >
              {t("navigation.features")}
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className={`text-muted-foreground hover:text-foreground transition-colors font-medium relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${
                activeSection === "how-it-works"
                  ? "text-foreground after:w-full"
                  : "after:w-0 hover:after:w-full"
              }`}
            >
              {t("navigation.howItWorks")}
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className={`text-muted-foreground hover:text-foreground transition-colors font-medium relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${
                activeSection === "team"
                  ? "text-foreground after:w-full"
                  : "after:w-0 hover:after:w-full"
              }`}
            >
              {t("navigation.about")}
            </button>
            <button
              onClick={() => scrollToSection("sponsors")}
              className={`text-muted-foreground hover:text-foreground transition-colors font-medium relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${
                activeSection === "sponsors"
                  ? "text-foreground after:w-full"
                  : "after:w-0 hover:after:w-full"
              }`}
            >
              Partners
            </button>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial justify-end">
            <div className="flex-1 sm:flex-initial">
              <LanguageSelector />
            </div>
            {auth.data ? (
              <Button className="font-medium shadow-sm shrink-0" asChild>
                <Link href="/dashboard">{t("auth.dashboard")}</Link>
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="font-medium hidden sm:inline-flex shrink-0"
                  asChild
                >
                  <Link href="/auth/sign-in">{t("auth.signIn")}</Link>
                </Button>
                <Button className="font-medium shadow-sm shrink-0" asChild>
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
