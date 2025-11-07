"use client";

import { fadeInUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export function ContactUs() {
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
            {t("contactUs")}
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center text-muted-foreground"
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
