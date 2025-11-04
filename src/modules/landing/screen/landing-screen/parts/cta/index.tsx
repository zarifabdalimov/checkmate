"use client";

import { Button } from "@/modules/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, Phone } from "lucide-react";

export function CTA() {
  const t = useTranslations("LandingPage.cta");

  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">{t("footer")}</h2>
          <p className="text-lg text-muted-foreground mb-6">{t("footerSubtitle")}</p>
          <Link 
            href="https://forms.gle/your-survey-link" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="text-lg font-semibold px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all"
            >
              {t("survey")}
            </Button>
          </Link>

          <div className="mt-12 pt-12 border-t border-border/50">
            <h3 className="text-xl font-semibold mb-4">{t("contactUs")}</h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-muted-foreground">
              <a 
                href="mailto:info@checkmate.ink" 
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                info@checkmate.ink
              </a>
              <a 
                href="tel:+420721518984" 
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                +420 721 518 984
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
