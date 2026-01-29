"use client";

import { Logo } from "@/modules/landing/screen/landing-screen/parts/header/parts/logo";
import { Separator } from "@/modules/ui/separator";
import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("LandingPage.footer");

  return (
    <footer id="about" className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground max-w-sm">{t("tagline")}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:info@checkmate.ink"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@checkmate.ink
              </a>
              <a
                href="tel:+420721518984"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                +420 721 518 984
              </a>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
