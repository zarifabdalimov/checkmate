"use client";

import { fadeInUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function HowItWorks() {
  const t = useTranslations("LandingPage.howItWorks");

  return (
    <section id="how-it-works" className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center space-y-4 mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
              1
            </div>
            <h3 className="text-lg font-semibold">
              {t("steps.generateTest.title")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("steps.generateTest.description")}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
              2
            </div>
            <h3 className="text-lg font-semibold">
              {t("steps.printDistribute.title")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("steps.printDistribute.description")}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
              3
            </div>
            <h3 className="text-lg font-semibold">
              {t("steps.aiEvaluation.title")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("steps.aiEvaluation.description")}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
              4
            </div>
            <h3 className="text-lg font-semibold">
              {t("steps.personalizedLearning.title")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("steps.personalizedLearning.description")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
