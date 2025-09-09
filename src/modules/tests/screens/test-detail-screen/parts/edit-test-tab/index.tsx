"use client";

import { Test, TestParamsQuestionFormat } from "@/lib/api/generated/model";
import { useEditTestForm } from "@/modules/tests/screens/test-detail-screen/parts/edit-test-tab/hooks/use-edit-test-form-context";
import { Button } from "@/modules/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/modules/ui/tabs";
import { useTranslations } from "next-intl";
import * as React from "react";
import { FormProvider } from "react-hook-form";
import { BasicInfoStep } from "./parts/basic-info-step";
import { ContentEditorStep } from "./parts/content-editor-step";
import { ParametersStep } from "./parts/parameters-step";
import { EditTestFormData } from "./types";

interface EditTestTabProps {
  test?: Test;
  onSave?: (data: EditTestFormData) => void;
}

export function EditTestTab({ test, onSave }: EditTestTabProps) {
  const t = useTranslations("Dashboard.tests.dialog");
  const form = useEditTestForm({
    name: test?.name || "",
    description: test?.description || "",
    subject: test?.test_params?.subject || "",
    topic: test?.test_params?.topic || "",
    student_age_range: test?.test_params?.student_age_range || "",
    difficulty_level: test?.test_params?.difficulty_level || "",
    question_format:
      test?.test_params?.question_format ||
      TestParamsQuestionFormat.multiple_choice,
    number_of_questions: test?.test_params?.number_of_questions || 10,
    time_per_question_in_minutes:
      test?.test_params?.time_per_question_in_minutes || 2,
    content:
      test?.content?.map((item) => ({
        ...item,
        correctAnswer: item.options.findIndex((opt) => opt.correct).toString(),
      })) || [],
  });

  const handleSubmit = (data: EditTestFormData) => {
    console.log("Form data:", data);
    onSave?.(data);
  };

  return (
    <div className="max-w-4xl">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <Tabs defaultValue="basic-info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic-info">
                {t("form.tabs.basicInfo")}
              </TabsTrigger>
              <TabsTrigger value="parameters">
                {t("form.tabs.parameters")}
              </TabsTrigger>
              <TabsTrigger value="content">
                {t("form.tabs.content")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic-info" className="space-y-4">
              <BasicInfoStep />
            </TabsContent>

            <TabsContent value="parameters" className="space-y-4">
              <ParametersStep />
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <ContentEditorStep />
            </TabsContent>
          </Tabs>

          <Button type="submit">{t("buttons.saveChanges")}</Button>
        </form>
      </FormProvider>
    </div>
  );
}
