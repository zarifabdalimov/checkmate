"use client";

import { Button } from "@/modules/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function CTA() {
  const t = useTranslations("LandingPage.cta");

  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">{t("title")}</h2>
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button
                size="lg"
                className="text-lg font-semibold px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all"
              >
                {t("startTrial")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
