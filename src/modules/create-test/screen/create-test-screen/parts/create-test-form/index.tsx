"use client";

import {
  DIFFICULTY_LEVELS,
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
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Plus, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { forwardRef, useImperativeHandle } from "react";
import {
  type CreateTestFormData,
  useCreateTestForm,
} from "./hooks/use-create-test-form";
import { ContentSectionItem } from "./parts/content-section-item";

export type { CreateTestFormData };

export interface CreateTestFormRef {
  applyPreset: (preset: CreateTestFormData) => void;
}

interface CreateTestFormProps {
  onGenerate: (data: CreateTestFormData) => void;
  isGenerating: boolean;
  examplePresets?: React.ReactNode;
}

export const CreateTestForm = forwardRef<
  CreateTestFormRef,
  CreateTestFormProps
>(function CreateTestForm({ onGenerate, isGenerating, examplePresets }, ref) {
  const t = useTranslations("CreateTestPage.form");
  const tDifficulty = useTranslations("ShowcasePage.form");
  const tModel = useTranslations("ShowcasePage.form");

  const {
    form,
    fieldArray,
    difficultyLevel,
    showPresets,
    addSection,
    removeSection,
    applyPreset,
  } = useCreateTestForm();

  useImperativeHandle(ref, () => ({
    applyPreset,
  }));

  const onSubmit = (data: CreateTestFormData) => {
    onGenerate(data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-4">
              {t("generalSettings")}
            </h3>
            <Card>
              <CardContent className="space-y-4">
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
                                {tDifficulty(`difficulty.options.${level}`)}
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
                              <SelectValue
                                placeholder={t("model.placeholder")}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {MODELS.map((model) => (
                              <SelectItem key={model} value={model}>
                                {tModel(`model.options.${model}`)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
              </CardContent>
            </Card>

            <AnimatePresence>
              {showPresets && examplePresets && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0, overflow: "hidden" }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  {examplePresets}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">
              {t("contentSections")}
            </h3>
            <div className="space-y-4">
              {fieldArray.fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ContentSectionItem
                    index={index}
                    form={form}
                    isGenerating={isGenerating}
                    canRemove={fieldArray.fields.length > 1}
                    onRemove={() => removeSection(index)}
                  />
                </motion.div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addSection}
                disabled={isGenerating}
                className="w-full gap-2"
              >
                <Plus className="h-4 w-4" />
                {t("addSection")}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center pt-2"
          >
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
          </motion.div>
        </form>
      </Form>
    </div>
  );
});
