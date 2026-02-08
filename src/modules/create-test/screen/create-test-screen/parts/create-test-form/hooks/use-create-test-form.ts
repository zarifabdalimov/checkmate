import {
  DIFFICULTY_LEVELS,
  FORMATS,
  MODELS,
} from "@/modules/landing/screen/landing-screen/parts/hero/parts/test-generation-form/index.static";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import type { TestFormat, ModelType } from "@/hooks/use-create-demo-test";

export interface ContentSectionData {
  topic: string;
  format: TestFormat;
  amount: number;
}

export interface CreateTestFormData {
  subject: string;
  difficulty_level: string;
  custom_difficulty_text?: string;
  language: string;
  model: ModelType;
  content: ContentSectionData[];
}

const contentSectionSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  format: z.enum(FORMATS),
  amount: z.number().min(1, "At least 1 question").max(50, "Max 50 questions"),
});

const formSchema = z
  .object({
    subject: z.string().min(1, "Subject is required"),
    difficulty_level: z.string().min(1, "Difficulty level is required"),
    custom_difficulty_text: z.string().optional(),
    language: z.string().min(1, "Language is required"),
    model: z.enum(MODELS),
    content: z.array(contentSectionSchema).min(1, "At least one section is required"),
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

export function useCreateTestForm() {
  const form = useForm<CreateTestFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      difficulty_level: "",
      custom_difficulty_text: "",
      language: "",
      model: "CLAUDE_HAIKU_3",
      content: [
        {
          topic: "",
          format: "MCQ_SINGLE",
          amount: 10,
        },
      ],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "content",
  });

  const [showPresets, setShowPresets] = useState(true);

  const difficultyLevel = form.watch("difficulty_level");
  const { isDirty } = form.formState;

  useEffect(() => {
    if (isDirty) {
      setShowPresets(false);
    }
  }, [isDirty]);

  useEffect(() => {
    if (difficultyLevel !== "custom") {
      form.setValue("custom_difficulty_text", "");
    }
  }, [difficultyLevel, form]);

  const addSection = () => {
    fieldArray.append({
      topic: "",
      format: "MCQ_SINGLE",
      amount: 10,
    });
  };

  const removeSection = (index: number) => {
    if (fieldArray.fields.length > 1) {
      fieldArray.remove(index);
    }
  };

  const applyPreset = (preset: CreateTestFormData) => {
    form.reset({
      ...preset,
      custom_difficulty_text: "",
    });

    fieldArray.replace(preset.content);
    setShowPresets(false);
  };

  return {
    form,
    fieldArray,
    difficultyLevel,
    showPresets,
    addSection,
    removeSection,
    applyPreset,
  };
}
