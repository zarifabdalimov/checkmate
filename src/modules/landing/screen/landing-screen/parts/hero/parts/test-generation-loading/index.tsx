"use client";

import { Card, CardContent } from "@/modules/ui/card";
import { Progress } from "@/modules/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Loader2, Sparkles, FileText, CheckCircle2 } from "lucide-react";

interface TestGenerationLoadingProps {
  testId: string;
}

const GENERATION_STEPS = [
  { key: "analyzing", duration: 2000 },
  { key: "generating", duration: 3000 },
  { key: "reviewing", duration: 2000 },
  { key: "finalizing", duration: 1000 },
] as const;

export function TestGenerationLoading({ testId }: TestGenerationLoadingProps) {
  const t = useTranslations("ShowcasePage.loading");
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = GENERATION_STEPS.reduce((sum, step) => sum + step.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 50;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 95);
      setProgress(newProgress);

      let accumulatedDuration = 0;
      for (let i = 0; i < GENERATION_STEPS.length; i++) {
        accumulatedDuration += GENERATION_STEPS[i].duration;
        if (elapsed < accumulatedDuration) {
          setCurrentStep(i);
          break;
        }
      }

      if (elapsed >= totalDuration) {
        setCurrentStep(GENERATION_STEPS.length - 1);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [testId]);

  const getStepIcon = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      return <CheckCircle2 className="w-5 h-5 text-success" />;
    } else if (stepIndex === currentStep) {
      return <Loader2 className="w-5 h-5 animate-spin text-primary" />;
    } else {
      return <div className="w-5 h-5 rounded-full border-2 border-muted" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card>
        <CardContent className="p-8 space-y-8">
          <div className="text-center space-y-4">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10"
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{t("title")}</h2>
              <p className="text-muted-foreground">{t("subtitle")}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>{t("progress")}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="sync">
                {GENERATION_STEPS.map((step, index) => {
                  if (index > currentStep) return null;

                  return (
                    <motion.div
                      key={step.key}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="flex items-center gap-4"
                    >
                      <div className="flex-shrink-0">
                        {getStepIcon(index)}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium transition-colors ${
                            index === currentStep
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {t(`steps.${step.key}`)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <FileText className="w-4 h-4" />
            <AnimatePresence mode="wait">
              <motion.span
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {t("tip")}
              </motion.span>
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
