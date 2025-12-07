"use client";

import { Button } from "@/modules/ui/button";
import { Textarea } from "@/modules/ui/textarea";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: (test: string) => void;
  examplePrompts?: React.ReactNode;
}

export function PromptInput({
  prompt,
  onPromptChange,
  onGenerate,
  examplePrompts,
}: PromptInputProps) {
  const t = useTranslations("ShowcasePage.promptInput");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    // Simulate generation delay - API call will be added later
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onGenerate(prompt);
    setIsGenerating(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="w-full max-w-4xl mx-auto space-y-3"
    >
      <div className="relative">
        <div className="relative">
          <div className="relative bg-card border border-border rounded-xl overflow-hidden">
            <Textarea
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("placeholder")}
              className="min-h-[180px] resize-none border-0 focus-visible:ring-0 text-base p-6 bg-transparent"
              disabled={isGenerating}
            />
            <div className="flex items-center justify-between p-4 border-t bg-muted/30">
              <span className="text-sm text-muted-foreground">
                {t("keyboardShortcut")}
              </span>
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                size="lg"
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("generating")}
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    {t("generate")}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {examplePrompts && examplePrompts}
    </motion.div>
  );
}
