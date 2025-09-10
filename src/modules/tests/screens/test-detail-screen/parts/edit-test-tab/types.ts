import { TestParamsQuestionFormat } from "@/lib/api/generated/model";
import { useTranslations } from "next-intl";
import * as z from "zod";

// Extended form schema that includes test content
export const createEditTestSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    name: z.string().min(1, t("nameRequired")).max(100, t("nameTooLong")),
    description: z.string().optional(),
    group_id: z.string().min(1, t("groupRequired")),
    // Parameters are read-only, no validation needed
    subject: z.string().optional(),
    topic: z.string().optional(),
    student_age_range: z.string().optional(),
    difficulty_level: z.string().optional(),
    question_format: z.nativeEnum(TestParamsQuestionFormat).optional(),
    number_of_questions: z.number().optional(),
    time_per_question_in_minutes: z.number().optional(),
    content: z.array(
      z.object({
        q: z.number().min(1),
        question: z.string().min(1, "Question is required"),
        correctAnswer: z.string().optional(),
        options: z
          .array(
            z.object({
              order: z.number(),
              answer: z.string().min(1, "Answer option is required"),
              correct: z.boolean(),
            }),
          )
          .min(2, "At least 2 options are required"),
      }),
    ),
  });

export type EditTestFormData = z.infer<ReturnType<typeof createEditTestSchema>>;
