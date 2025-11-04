"use client";

import { CheckCircle, Users, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

export function WhyCheckmate() {
  const t = useTranslations("LandingPage.features");

  return (
    <section id="why-checkmate" className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold">{t("title")}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Benefits section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-semibold text-lg max-w-[220px] mx-auto">{t("benefit1.title")}</h3>
        </div>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-semibold text-lg max-w-[220px] mx-auto">{t("benefit2.title")}</h3>
        </div>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-semibold text-lg max-w-[220px] mx-auto">{t("benefit3.title")}</h3>
        </div>
      </div>
      </div>
    </section>
  );
}

