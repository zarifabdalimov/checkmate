"use client";

import {
  useCreateDemoTest,
  useGetDemoTest,
} from "@/hooks/use-create-demo-test";
import { Link } from "@/i18n/navigation";
import { Footer } from "@/modules/landing/screen/landing-screen/parts/footer";
import { LanguageSelector } from "@/modules/landing/screen/landing-screen/parts/header/language-selector";
import { Logo } from "@/modules/landing/screen/landing-screen/parts/header/parts/logo";
import { Button } from "@/modules/ui/button";
import { EditableTestPreview } from "@/modules/landing/screen/landing-screen/parts/hero/parts/editable-test-preview";
import { TestGenerationLoading } from "@/modules/landing/screen/landing-screen/parts/hero/parts/test-generation-loading";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  CreateTestForm,
  type CreateTestFormData,
  type CreateTestFormRef,
} from "./parts/create-test-form";
import { ExamplePresets } from "./parts/create-test-form/parts/example-presets";

export function CreateTestScreen() {
  const t = useTranslations("CreateTestPage");
  const tError = useTranslations("CreateTestPage.errors");

  const [testId, setTestId] = useState<string>("");
  const demoTestQuery = useGetDemoTest(testId);
  const loadingRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<CreateTestFormRef>(null);

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

  const handlePresetClick = (preset: CreateTestFormData) => {
    formRef.current?.applyPreset(preset);
  };

  const handleGenerate = async (data: CreateTestFormData) => {
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
        content: data.content.map((section) => ({
          topic: section.topic,
          amount: section.amount,
          format: section.format,
        })),
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
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Logo />
              <Button variant="ghost" size="sm" className="gap-1.5" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  {t("backToHome")}
                </Link>
              </Button>
            </div>
            <div className="flex items-center w-auto">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>
      <section className="py-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl md:text-6xl tracking-tight"
            >
              {t("title")}
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
              <CreateTestForm
                ref={formRef}
                onGenerate={handleGenerate}
                isGenerating={isPending}
                examplePresets={
                  <ExamplePresets onPresetClick={handlePresetClick} />
                }
              />

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
      <Footer />
    </>
  );
}
