"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import { PromptInput } from "./parts/prompt-input";
import { ExamplePrompts } from "./parts/example-prompts";
import { GeneratedPreview } from "./parts/generated-preview";

export function Hero() {
  const t = useTranslations("LandingPage.hero");
  const [prompt, setPrompt] = useState("");
  const [generatedTest, setGeneratedTest] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  const handleGenerate = (test: string) => {
    setGeneratedTest(test);
    // Scroll to the preview section after a short delay to allow it to render
    setTimeout(() => {
      previewRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <section className="py-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight whitespace-pre-line leading-12 md:leading-20 lg:leading-22"
          >
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                  {chunks}
                </span>
              ),
            })}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          <div className="pt-8 space-y-12 max-w-6xl mx-auto">
            <PromptInput
              prompt={prompt}
              onPromptChange={setPrompt}
              onGenerate={handleGenerate}
              examplePrompts={
                <ExamplePrompts onExampleClick={handleExampleClick} />
              }
            />
            {generatedTest && (
              <div ref={previewRef}>
                <GeneratedPreview content={generatedTest} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
