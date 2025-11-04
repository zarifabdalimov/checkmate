"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/modules/ui/card";
import {
  Brain,
  CheckCircle,
  Users,
  Sparkles,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function Features() {
  const t = useTranslations("LandingPage.features");

  return (
    <section id="features" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold">{t("sectionTitle")}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>{t("aiTestGeneration.title")}</CardTitle>
            <CardDescription>
              {t("aiTestGeneration.description")}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>{t("automatedGrading.title")}</CardTitle>
            <CardDescription>
              {t("automatedGrading.description")}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>{t("studentInsights.title")}</CardTitle>
            <CardDescription>
              {t("studentInsights.description")}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>{t("personalAiTutor.title")}</CardTitle>
            <CardDescription>
              {t("personalAiTutor.description")}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      </div>
    </section>
  );
}
