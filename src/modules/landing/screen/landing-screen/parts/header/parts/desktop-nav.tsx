import { Button } from "@/modules/ui/button";
import { useTranslations } from "next-intl";
import { NAV_SECTIONS } from "../index.static";

type DesktopNavProps = {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
};

export function DesktopNav({ activeSection, onNavigate }: DesktopNavProps) {
  const t = useTranslations("LandingPage.header");

  return (
    <nav className="hidden md:flex items-center space-x-2">
      {NAV_SECTIONS.map((section) => (
        <Button
          key={section.id}
          variant="ghost"
          onClick={() => onNavigate(section.id)}
          className={`font-medium relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${
            activeSection === section.id
              ? "text-foreground after:w-[calc(100%-2rem)]"
              : "after:w-0 hover:after:w-[calc(100%-2rem)]"
          }`}
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
    </nav>
  );
}

