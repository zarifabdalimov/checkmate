"use client";

import { Separator } from "@/modules/ui/separator";
import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("LandingPage.footer");

  return (
    <footer id="about" className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">CheckMate</span>
            </div>
            <p className="text-muted-foreground max-w-sm">{t("tagline")}</p>
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
