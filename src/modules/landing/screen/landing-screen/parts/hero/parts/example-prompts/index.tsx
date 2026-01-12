"use client";

import { Badge } from "@/modules/ui/badge";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { BookOpen, Languages, Globe, FlaskConical } from "lucide-react";
import type { TestGenerationFormData } from "../test-generation-form";

const iconMap = {
  english: Languages,
  history: Globe,
  science: FlaskConical,
  literature: BookOpen,
};

interface ExamplePromptsProps {
  onExampleClick: (preset: TestGenerationFormData) => void;
}

export function ExamplePrompts({ onExampleClick }: ExamplePromptsProps) {
  const t = useTranslations("ShowcasePage.examples");
  const tForm = useTranslations("ShowcasePage.form");

  const examples: Array<{
    id: string;
    icon: typeof Languages;
    title: string;
    preset: TestGenerationFormData;
  }> = [
    {
      id: "english",
      icon: iconMap.english,
      title: t("english.title"),
      preset: {
        subject: tForm("subjects.english"),
        difficulty_level: "middleSchool",
        topic: t("english.topic"),
        format: "MCQ_SINGLE",
        language: "English",
        model: "CLAUDE_HAIKU_3",
      },
    },
    {
      id: "history",
      icon: iconMap.history,
      title: t("history.title"),
      preset: {
        subject: tForm("subjects.history"),
        difficulty_level: "highSchool",
        topic: t("history.topic"),
        format: "MCQ_SINGLE",
        language: "English",
        model: "CLAUDE_HAIKU_3",
      },
    },
    {
      id: "science",
      icon: iconMap.science,
      title: t("science.title"),
      preset: {
        subject: tForm("subjects.biology"),
        difficulty_level: "highSchool",
        topic: t("science.topic"),
        format: "MCQ_SINGLE",
        language: "English",
        model: "CLAUDE_HAIKU_3",
      },
    },
    {
      id: "literature",
      icon: iconMap.literature,
      title: t("literature.title"),
      preset: {
        subject: tForm("subjects.literature"),
        difficulty_level: "highSchool",
        topic: t("literature.topic"),
        format: "MCQ_SINGLE",
        language: "English",
        model: "CLAUDE_HAIKU_3",
      },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.7 }}
      className="flex flex-wrap gap-2 justify-center"
    >
      {examples.map((example, index) => {
        const Icon = example.icon;
        return (
          <motion.div
            key={example.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
          >
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary/10 hover:border-primary/50 transition-all px-3 py-1.5 gap-2 text-sm"
              onClick={() => onExampleClick(example.preset)}
            >
              <Icon className="h-3.5 w-3.5" />
              {example.title}
            </Badge>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
