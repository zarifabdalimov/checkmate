"use client";

import {
  DIFFICULTY_LEVELS,
  FORMATS,
  MODELS,
} from "@/modules/landing/screen/landing-screen/parts/hero/parts/test-generation-form/index.static";
import { Button } from "@/modules/ui/button";
import { Card, CardContent } from "@/modules/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/ui/form";
import { Input } from "@/modules/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/ui/select";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { forwardRef, useImperativeHandle } from "react";
import {
  type TestGenerationFormData,
  useTestGenerationForm,
} from "./hooks/use-test-generation-form";

export type { TestGenerationFormData };

export interface TestGenerationFormRef {
  applyPreset: (preset: TestGenerationFormData) => void;
}

interface TestGenerationFormProps {
  onGenerate: (data: TestGenerationFormData) => void;
  isGenerating: boolean;
  examplePrompts?: React.ReactNode;
}

export const TestGenerationForm = forwardRef<
  TestGenerationFormRef,
  TestGenerationFormProps
>(function TestGenerationForm(
  { onGenerate, isGenerating, examplePrompts },
  ref,
) {
  const t = useTranslations("ShowcasePage.form");
  const { form, difficultyLevel, applyPreset } = useTestGenerationForm();

  // Expose method to apply preset
  useImperativeHandle(ref, () => ({
    applyPreset,
  }));

  const onSubmit = (data: TestGenerationFormData) => {
    onGenerate(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="w-full max-w-2xl mx-auto space-y-3"
    >
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground">
          {t("tryItOut")}
        </p>
      </div>
      <Card className="overflow-hidden">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Subject */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("subject.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("subject.placeholder")}
                        disabled={isGenerating}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Topic */}
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("topic.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("topic.placeholder")}
                        disabled={isGenerating}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Language */}
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("language.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("language.placeholder")}
                        disabled={isGenerating}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="difficulty_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("difficulty.label")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isGenerating}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={t("difficulty.placeholder")}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DIFFICULTY_LEVELS.map((level) => (
                            <SelectItem key={level} value={level}>
                              {t(`difficulty.options.${level}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("format.label")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isGenerating}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={t("format.placeholder")}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {FORMATS.map((format) => (
                            <SelectItem key={format} value={format}>
                              {t(`format.options.${format}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("model.label")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isGenerating}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t("model.placeholder")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MODELS.map((model) => (
                          <SelectItem key={model} value={model}>
                            {t(`model.options.${model}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Custom Difficulty (shown when custom is selected) */}
              {difficultyLevel === "custom" && (
                <FormField
                  control={form.control}
                  name="custom_difficulty_text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("customDifficulty.label")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("customDifficulty.placeholder")}
                          disabled={isGenerating}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Generate Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isGenerating}
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
            </form>
          </Form>
        </CardContent>
      </Card>
      {examplePrompts && examplePrompts}
    </motion.div>
  );
});
