"use client";

import { useAuth } from "@/hooks/use-auth";
import { Link } from "@/i18n/navigation";
import { Button } from "@/modules/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/modules/ui/tooltip";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("LandingPage.hero");
  const tHeader = useTranslations("LandingPage.header");
  const auth = useAuth();

  return (
    <section className="py-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight whitespace-pre-line leading-12 md:leading-20 lg:leading-22"
          >
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                  {chunks}
                </span>
              ),
            })}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    size="lg"
                    disabled
                    className="text-lg font-semibold px-8 py-4 h-auto opacity-50 cursor-not-allowed"
                  >
                    {t("comingSoon")}
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-white text-lg">{t("comingSoonTooltip")}</p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
