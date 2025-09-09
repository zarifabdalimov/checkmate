"use client";

import { Button } from "@/modules/ui/button";
import { GraduationCap, BookOpen, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("LandingPage.hero");

  return (
    <section className="container mx-auto px-4 pt-32 pb-16">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary shadow-sm">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">{t("badge")}</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight whitespace-pre-line">
          {t.rich("title", {
            highlight: (chunks) => (
              <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                {chunks}
              </span>
            ),
          })}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            size="lg"
            className="text-lg font-semibold px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all"
          >
            <GraduationCap className="w-5 h-5 mr-2" />
            {t("getStarted")}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg font-semibold px-8 py-4 h-auto border-2 hover:bg-primary/5 transition-all"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            {t("watchDemo")}
          </Button>
        </div>
      </div>
    </section>
  );
}
