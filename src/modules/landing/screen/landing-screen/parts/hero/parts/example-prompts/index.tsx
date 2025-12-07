"use client";

import { Badge } from "@/modules/ui/badge";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { BookOpen, Calculator, Globe, FlaskConical } from "lucide-react";

const iconMap = {
  math: Calculator,
  history: Globe,
  science: FlaskConical,
  literature: BookOpen,
};

interface ExamplePromptsProps {
  onExampleClick: (prompt: string) => void;
}

export function ExamplePrompts({ onExampleClick }: ExamplePromptsProps) {
  const t = useTranslations("ShowcasePage.examples");

  const examples = [
    {
      id: "math",
      icon: iconMap.math,
      title: t("math.title"),
      prompt: t("math.prompt"),
    },
    {
      id: "history",
      icon: iconMap.history,
      title: t("history.title"),
      prompt: t("history.prompt"),
    },
    {
      id: "science",
      icon: iconMap.science,
      title: t("science.title"),
      prompt: t("science.prompt"),
    },
    {
      id: "literature",
      icon: iconMap.literature,
      title: t("literature.title"),
      prompt: t("literature.prompt"),
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
              onClick={() => onExampleClick(example.prompt)}
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
