"use client";

import { motion } from "framer-motion";
import { CheckCircle, GraduationCap, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export function WhyCheckmate() {
  const t = useTranslations("LandingPage.features");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="why-checkmate" className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center space-y-4 mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Benefits section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <p className="text-lg max-w-[220px] mx-auto">
              {t("benefit1.title")}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <p className="text-lg max-w-[220px] mx-auto">
              {t("benefit2.title")}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <p className="text-lg max-w-[220px] mx-auto">
              {t("benefit3.title")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
