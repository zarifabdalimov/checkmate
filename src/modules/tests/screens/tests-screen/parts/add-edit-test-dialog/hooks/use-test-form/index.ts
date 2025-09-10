import { TestParamsQuestionFormat } from "@/lib/api/generated/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const createTestSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    name: z.string().min(1, t("nameRequired")).max(100, t("nameTooLong")),
    description: z.string().optional(),
    group_id: z.string().min(1, t("groupRequired")),
    subject: z
      .string()
      .min(1, t("subjectRequired"))
      .max(100, t("subjectTooLong")),
    topic: z.string().min(1, t("topicRequired")).max(100, t("topicTooLong")),
    student_age_range: z.string().min(1, t("ageRangeRequired")),
    difficulty_level: z.string().min(1, t("difficultyRequired")),
    question_format: z.nativeEnum(TestParamsQuestionFormat),
    number_of_questions: z
      .number()
      .min(1, t("questionsMin"))
      .max(100, t("questionsMax")),
    time_per_question_in_minutes: z
      .number()
      .min(0.5, t("timeMin"))
      .max(60, t("timeMax")),
  });

export type TestFormData = z.infer<ReturnType<typeof createTestSchema>>;

export function useTestForm() {
  const tValidation = useTranslations("Dashboard.tests.dialog.validation");
  const testSchema = React.useMemo(
    () => createTestSchema(tValidation),
    [tValidation],
  );

  return useForm<TestFormData>({
    resolver: zodResolver(testSchema),
  });
}
