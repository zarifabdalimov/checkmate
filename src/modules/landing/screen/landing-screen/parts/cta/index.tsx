"use client";

import { Link } from "@/i18n/navigation";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Button } from "@/modules/ui/button";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

export function CTA() {
  const t = useTranslations("LandingPage.cta");
  const locale = useLocale();

  const surveyLinks: Record<string, string> = {
    cs: "https://forms.gle/4iAWnVBRUPbKpLze8",
    en: "https://forms.gle/8YiiUWYszgPb4WJC6",
    de: "https://forms.gle/8YiiUWYszgPb4WJC6", // Fallback to EN for German
  };

  const surveyLink = surveyLinks[locale] || surveyLinks.en;

  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center space-y-8 max-w-3xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold"
          >
            {t("footer")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground mb-6"
          >
            {t("footerSubtitle")}
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href={surveyLink} target="_blank" rel="noopener noreferrer">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <Button
                  size="lg"
                  className="text-lg font-semibold px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all"
                >
                  {t("survey")}
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
