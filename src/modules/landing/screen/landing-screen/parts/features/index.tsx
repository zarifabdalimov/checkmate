"use client";

import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/ui/card";
import { motion } from "framer-motion";
import { Brain, CheckCircle, Sparkles, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export function Features() {
  const t = useTranslations("LandingPage.features");

  return (
    <section id="features" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center space-y-4 mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold"
          >
            {t("sectionTitle")}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp}>
            <Card className="border-2 h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t("aiTestGeneration.title")}</CardTitle>
                <CardDescription>
                  {t("aiTestGeneration.description")}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="border-2 h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t("automatedGrading.title")}</CardTitle>
                <CardDescription>
                  {t("automatedGrading.description")}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="border-2 h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t("studentInsights.title")}</CardTitle>
                <CardDescription>
                  {t("studentInsights.description")}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="border-2 h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t("personalAiTutor.title")}</CardTitle>
                <CardDescription>
                  {t("personalAiTutor.description")}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
