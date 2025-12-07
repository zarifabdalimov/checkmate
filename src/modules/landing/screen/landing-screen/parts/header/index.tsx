"use client";

import { useAuth } from "@/hooks/use-auth";
import { useBoolean } from "usehooks-ts";
import { Button } from "@/modules/ui/button";
import { Menu } from "lucide-react";
import { LanguageSelector } from "./language-selector";
import { DesktopNav } from "./parts/desktop-nav";
import { Logo } from "./parts/logo";
import { MobileMenu } from "./parts/mobile-menu";
import { useActiveSection } from "./hooks/use-active-section";
import { useScrollToSection } from "./hooks/use-scroll-to-section";

export function Header() {
  const auth = useAuth();
  const mobileMenu = useBoolean(false);
  const activeSection = useActiveSection();
  const scrollToSection = useScrollToSection();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            <Logo />

            <DesktopNav
              activeSection={activeSection}
              onNavigate={scrollToSection}
            />

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2 sm:gap-3 justify-end">
              <LanguageSelector />
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={mobileMenu.setTrue}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenu.value}
        onOpenChange={mobileMenu.setValue}
        isAuthenticated={!!auth.data}
        onNavigate={scrollToSection}
      />
    </>
  );
}
