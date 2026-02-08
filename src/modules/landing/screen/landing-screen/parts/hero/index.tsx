"use client";

import {
  useCreateDemoTest,
  useGetDemoTest,
} from "@/hooks/use-create-demo-test";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ExamplePrompts } from "./parts/example-prompts";
import {
  TestGenerationForm,
  type TestGenerationFormData,
  type TestGenerationFormRef,
} from "./parts/test-generation-form";
import { EditableTestPreview } from "./parts/editable-test-preview";
import { TestGenerationLoading } from "./parts/test-generation-loading";

export function Hero() {
  const t = useTranslations("LandingPage.hero");
  const tError = useTranslations("ShowcasePage.errors");
  const [testId, setTestId] = useState<string>("");
  const demoTestQuery = useGetDemoTest(testId);
  const previewRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<TestGenerationFormRef>(null);

  const { mutate: createTest, isPending } = useCreateDemoTest();

  useEffect(() => {
    if (testId && demoTestQuery.data?.status === "pending") {
      const scrollToLoading = () => {
        if (loadingRef.current) {
          loadingRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        } else {
          setTimeout(scrollToLoading, 50);
        }
      };

      setTimeout(scrollToLoading, 100);
    }
  }, [testId, demoTestQuery.data?.status]);

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
        model: data.model,
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
          toast.error(tError("createTestFailed"), {
            description: tError("createTestFailedDescription"),
          });
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
            className="text-4xl md:text-6xl lg:text-7xl tracking-tight whitespace-pre-line leading-12 md:leading-20 lg:leading-22"
          >
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="bg-gradient-to-r font-bold">
                  {chunks}
                </span>
              ),
            })}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg font-normal md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="flex justify-center"
            >
              <Link
                href="/create-test"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("advancedConfig")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
            {testId && demoTestQuery.data?.status === "pending" && (
              <div ref={loadingRef}>
                <TestGenerationLoading testId={testId} />
              </div>
            )}
            {demoTestQuery.data?.status === "completed" &&
              demoTestQuery.data.content && (
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
