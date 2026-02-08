"use client";

import { Badge } from "@/modules/ui/badge";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { BookOpen, Languages, Globe, FlaskConical } from "lucide-react";
import type { CreateTestFormData } from "../hooks/use-create-test-form";

const iconMap = {
  english: Languages,
  history: Globe,
  science: FlaskConical,
  literature: BookOpen,
};

interface ExamplePresetsProps {
  onPresetClick: (preset: CreateTestFormData) => void;
}

export function ExamplePresets({ onPresetClick }: ExamplePresetsProps) {
  const t = useTranslations("CreateTestPage.examples");
  const tSubjects = useTranslations("ShowcasePage.form.subjects");

  const examples: Array<{
    id: string;
    icon: typeof Languages;
    title: string;
    preset: CreateTestFormData;
  }> = [
    {
      id: "english",
      icon: iconMap.english,
      title: t("english.title"),
      preset: {
        subject: tSubjects("english"),
        difficulty_level: "middleSchool",
        language: "English",
        model: "CLAUDE_HAIKU_3",
        content: [
          {
            topic: t("english.sections.grammar"),
            format: "MCQ_SINGLE",
            amount: 5,
          },
          {
            topic: t("english.sections.vocabulary"),
            format: "OPEN_ENDED",
            amount: 5,
          },
        ],
      },
    },
    {
      id: "history",
      icon: iconMap.history,
      title: t("history.title"),
      preset: {
        subject: tSubjects("history"),
        difficulty_level: "highSchool",
        language: "English",
        model: "CLAUDE_HAIKU_3",
        content: [
          {
            topic: t("history.sections.events"),
            format: "MCQ_SINGLE",
            amount: 5,
          },
          {
            topic: t("history.sections.figures"),
            format: "MCQ_MULTIPLE",
            amount: 5,
          },
        ],
      },
    },
    {
      id: "science",
      icon: iconMap.science,
      title: t("science.title"),
      preset: {
        subject: tSubjects("biology"),
        difficulty_level: "highSchool",
        language: "English",
        model: "CLAUDE_HAIKU_3",
        content: [
          {
            topic: t("science.sections.cells"),
            format: "MCQ_SINGLE",
            amount: 5,
          },
          {
            topic: t("science.sections.genetics"),
            format: "OPEN_ENDED",
            amount: 5,
          },
        ],
      },
    },
    {
      id: "literature",
      icon: iconMap.literature,
      title: t("literature.title"),
      preset: {
        subject: tSubjects("literature"),
        difficulty_level: "highSchool",
        language: "English",
        model: "CLAUDE_HAIKU_3",
        content: [
          {
            topic: t("literature.sections.themes"),
            format: "MCQ_SINGLE",
            amount: 5,
          },
          {
            topic: t("literature.sections.analysis"),
            format: "OPEN_ENDED",
            amount: 5,
          },
        ],
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
              onClick={() => onPresetClick(example.preset)}
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
