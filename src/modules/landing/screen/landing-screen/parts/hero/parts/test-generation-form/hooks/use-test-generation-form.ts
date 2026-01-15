import {
  FORMATS,
  MODELS,
} from "@/modules/landing/screen/landing-screen/parts/hero/parts/test-generation-form/index.static";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import type { TestFormat, ModelType } from "@/hooks/use-create-demo-test";

export interface TestGenerationFormData {
  subject: string;
  difficulty_level: string;
  topic: string;
  format: TestFormat;
  language: string;
  model: ModelType;
}

const formSchema = z
  .object({
    subject: z.string().min(1, "Subject is required"),
    difficulty_level: z.string().min(1, "Difficulty level is required"),
    custom_difficulty_text: z.string().optional(),
    topic: z.string().min(1, "Topic is required"),
    format: z.enum(FORMATS),
    language: z.string().min(1, "Language is required"),
    model: z.enum(MODELS),
  })
  .superRefine((data, ctx) => {
    if (
      data.difficulty_level === "custom" &&
      !data.custom_difficulty_text?.trim()
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Custom difficulty text is required",
        path: ["custom_difficulty_text"],
      });
    }
  });

export function useTestGenerationForm() {
  const form = useForm<
    TestGenerationFormData & { custom_difficulty_text?: string }
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      difficulty_level: "",
      custom_difficulty_text: "",
      topic: "",
      format: "MCQ_SINGLE",
      language: "",
      model: "CLAUDE_HAIKU_3",
    },
  });

  const difficultyLevel = form.watch("difficulty_level");

  useEffect(() => {
    if (difficultyLevel !== "custom") {
      form.setValue("custom_difficulty_text", "");
    }
  }, [difficultyLevel, form]);

  const applyPreset = (preset: TestGenerationFormData) => {
    form.reset({
      ...preset,
      custom_difficulty_text: "",
    });
  };

  return {
    form,
    difficultyLevel,
    applyPreset,
  };
}
