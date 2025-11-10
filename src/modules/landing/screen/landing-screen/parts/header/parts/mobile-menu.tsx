import { Button } from "@/modules/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/modules/ui/sheet";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "../language-selector";
import { AuthButtons } from "./auth-buttons";
import { NAV_SECTIONS } from "../index.static";

type MobileMenuProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isAuthenticated: boolean;
  onNavigate: (sectionId: string) => void;
};

export function MobileMenu({
  isOpen,
  onOpenChange,
  isAuthenticated,
  onNavigate,
}: MobileMenuProps) {
  const t = useTranslations("LandingPage.header");

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-4">
          {/* Language Selector */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Language
            </span>
            <LanguageSelector />
          </div>

          {/* Auth Buttons */}
          <div className="flex flex-col gap-3">
            <AuthButtons isAuthenticated={isAuthenticated} isMobile />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 pt-4 border-t">
            {NAV_SECTIONS.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                onClick={() => handleNavigate(section.id)}
                className="justify-start"
              >
                {section.translationKey === "navigation.partners"
                  ? "Partners"
                  : t(
                      section.translationKey as
                        | "navigation.features"
                        | "navigation.howItWorks"
                        | "navigation.about"
                    )}
              </Button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

