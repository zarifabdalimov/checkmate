"use client";

import {
  useCreateDemoTest,
  useGetDemoTest,
} from "@/hooks/use-create-demo-test";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { ExamplePrompts } from "./parts/example-prompts";
import {
  TestGenerationForm,
  type TestGenerationFormData,
  type TestGenerationFormRef,
} from "./parts/test-generation-form";
import { EditableTestPreview } from "./parts/editable-test-preview";

export function Hero() {
  const t = useTranslations("LandingPage.hero");
  const [testId, setTestId] = useState<string>(
    "e663ef4a-0721-4470-a12c-67ff5c0bf7b5",
  );
  const demoTestQuery = useGetDemoTest("e663ef4a-0721-4470-a12c-67ff5c0bf7b5");

  // console.log("[debug] data", demoTestQuery.data);
  // console.log("[debug] error", demoTestQuery.error);
  const previewRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<TestGenerationFormRef>(null);

  const { mutate: createTest, isPending } = useCreateDemoTest();

  const handleExampleClick = (preset: TestGenerationFormData) => {
    formRef.current?.applyPreset(preset);
  };

  const handleGenerate = async (
    data: TestGenerationFormData & { custom_difficulty_text?: string },
  ) => {
    const difficultyLevel =
      data.difficulty_level === "custom" && data.custom_difficulty_text
        ? data.custom_difficulty_text
        : data.difficulty_level;

    createTest(
      {
        model: "CLAUDE_HAIKU_3",
        subject: data.subject,
        difficulty_level: difficultyLevel,
        language: data.language,
        content: [
          {
            topic: data.topic,
            amount: 10,
            format: data.format,
          },
        ],
      },
      {
        onSuccess: (response) => {
          setTestId(response.test_id);
        },
        onError: (error) => {
          console.error("Failed to create test:", error);
        },
      },
    );
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
            <TestGenerationForm
              ref={formRef}
              onGenerate={handleGenerate}
              isGenerating={isPending}
              examplePrompts={
                <ExamplePrompts onExampleClick={handleExampleClick} />
              }
            />
            {demoTestQuery.data && (
              <div ref={previewRef}>
                <EditableTestPreview test={demoTestQuery.data} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
