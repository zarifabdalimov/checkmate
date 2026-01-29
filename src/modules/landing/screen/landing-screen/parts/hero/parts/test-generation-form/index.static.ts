import { ModelType, TestFormat } from "@/hooks/use-create-demo-test";

export const MODELS: ModelType[] = [
  "THETA_ON_DEMAND",
  "CLAUDE_HAIKU_3",
  "CLAUDE_HAIKU_4_5",
  "GEMINI_2_5_FLASH_LITE",
  "GEMINI_3_FLASH_PREVIEW",
];

export const DIFFICULTY_LEVELS = [
  "basicSchool",
  "middleSchool",
  "highSchool",
  "firstYearUniversity",
  "custom",
] as const;

export const FORMATS: TestFormat[] = [
  "MCQ_MULTIPLE",
  "MCQ_SINGLE",
  "OPEN_ENDED",
];
