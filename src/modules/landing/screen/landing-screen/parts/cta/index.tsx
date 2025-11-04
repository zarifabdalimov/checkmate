"use client";

import { Link } from "@/i18n/navigation";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Button } from "@/modules/ui/button";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export function CTA() {
  const t = useTranslations("LandingPage.cta");

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
            <Link
              href="https://forms.gle/your-survey-link"
              target="_blank"
              rel="noopener noreferrer"
            >
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

          <motion.div
            variants={fadeInUp}
            className="mt-12 pt-12 border-t border-border/50"
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
