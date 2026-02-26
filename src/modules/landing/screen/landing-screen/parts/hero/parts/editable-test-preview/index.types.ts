import * as z from "zod";

// ─── Question Type Enum ────────────────────────────────────────────────────────

export const QUESTION_TYPES = {
  SINGLE_CHOICE: "SINGLE_CHOICE",
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  OPEN_ENDED: "OPEN_ENDED",
  MATCH_PAIRS: "MATCH_PAIRS",
  ORDERING: "ORDERING",
  TRUE_FALSE: "TRUE_FALSE",
  FILL_IN_THE_BLANK: "FILL_IN_THE_BLANK",
  CATEGORIZATION: "CATEGORIZATION",
  NUMERIC: "NUMERIC",
  SHORT_ANSWER: "SHORT_ANSWER",
  HIGHLIGHT: "HIGHLIGHT",
} as const;

export type QuestionType = (typeof QUESTION_TYPES)[keyof typeof QUESTION_TYPES];

// ─── Payload Schemas ───────────────────────────────────────────────────────────

const optionSchema = z.object({
  order: z.number(),
  answer: z.string().min(1, "Answer is required"),
  correct: z.boolean(),
});

const singleChoicePayloadSchema = z.object({
  options: z.array(optionSchema).min(2),
});

const multipleChoicePayloadSchema = z.object({
  options: z.array(optionSchema).min(2),
});

const openEndedPayloadSchema = z.object({
  sampleAnswer: z.string().optional(),
});

const matchPairsPayloadSchema = z.object({
  pairs: z
    .array(
      z.object({
        left: z.string().min(1),
        right: z.string().min(1),
      }),
    )
    .min(2),
});

const orderingPayloadSchema = z.object({
  items: z
    .array(
      z.object({
        order: z.number(),
        text: z.string().min(1),
      }),
    )
    .min(2),
});

const trueFalsePayloadSchema = z.object({
  correctAnswer: z.boolean(),
});

const fillInTheBlankPayloadSchema = z.object({
  textWithBlanks: z.string().min(1),
  answers: z.array(z.string().min(1)).min(1),
});

const categorizationPayloadSchema = z.object({
  categories: z
    .array(
      z.object({
        name: z.string().min(1),
        items: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(2),
});

const numericPayloadSchema = z.object({
  correctAnswer: z.number(),
  tolerance: z.number().optional(),
});

const shortAnswerPayloadSchema = z.object({
  acceptedAnswers: z.array(z.string().min(1)).min(1),
});

const highlightPayloadSchema = z.object({
  passage: z.string().min(1),
  highlights: z
    .array(
      z.object({
        start: z.number(),
        end: z.number(),
      }),
    )
    .min(1),
});

// ─── Question Variant Schemas ──────────────────────────────────────────────────

const baseQuestionFields = {
  id: z.string(),
  order: z.number(),
  question: z.string().min(1, "Question is required"),
};

const singleChoiceQuestionSchema = z.object({
  ...baseQuestionFields,
  type: z.literal("SINGLE_CHOICE"),
  payload: singleChoicePayloadSchema,
});

const multipleChoiceQuestionSchema = z.object({
  ...baseQuestionFields,
  type: z.literal("MULTIPLE_CHOICE"),
  payload: multipleChoicePayloadSchema,
});

const openEndedQuestionSchema = z.object({
  ...baseQuestionFields,
  type: z.literal("OPEN_ENDED"),
  payload: openEndedPayloadSchema,
});

const matchPairsQuestionSchema = z.object({
  ...baseQuestionFields,
  type: z.literal("MATCH_PAIRS"),
  payload: matchPairsPayloadSchema,
});

const orderingQuestionSchema = z.object({
  ...baseQuestionFields,
  type: z.literal("ORDERING"),
  payload: orderingPayloadSchema,
});

const trueFalseQuestionSchema = z.object({
  ...baseQuestionFields,
  type: z.literal("TRUE_FALSE"),
  payload: trueFalsePayloadSchema,
});

const fillInTheBlankQuestionSchema = z.object({
  ...baseQuestionFields,
  type: z.literal("FILL_IN_THE_BLANK"),
  payload: fillInTheBlankPayloadSchema,
});

const categorizationQuestionSchema = z.object({
  ...baseQuestionFields,
  type: z.literal("CATEGORIZATION"),
  payload: categorizationPayloadSchema,
});

const numericQuestionSchema = z.object({
  ...baseQuestionFields,
  type: z.literal("NUMERIC"),
  payload: numericPayloadSchema,
});

const shortAnswerQuestionSchema = z.object({
  ...baseQuestionFields,
  type: z.literal("SHORT_ANSWER"),
  payload: shortAnswerPayloadSchema,
});

const highlightQuestionSchema = z.object({
  ...baseQuestionFields,
  type: z.literal("HIGHLIGHT"),
  payload: highlightPayloadSchema,
});

// ─── Discriminated Union ───────────────────────────────────────────────────────

export const questionSchema = z.discriminatedUnion("type", [
  singleChoiceQuestionSchema,
  multipleChoiceQuestionSchema,
  openEndedQuestionSchema,
  matchPairsQuestionSchema,
  orderingQuestionSchema,
  trueFalseQuestionSchema,
  fillInTheBlankQuestionSchema,
  categorizationQuestionSchema,
  numericQuestionSchema,
  shortAnswerQuestionSchema,
  highlightQuestionSchema,
]);

export type Question = z.infer<typeof questionSchema>;

// ─── Per-type Payload Types ────────────────────────────────────────────────────

export type SingleChoicePayload = z.infer<typeof singleChoicePayloadSchema>;
export type MultipleChoicePayload = z.infer<typeof multipleChoicePayloadSchema>;
export type OpenEndedPayload = z.infer<typeof openEndedPayloadSchema>;
export type MatchPairsPayload = z.infer<typeof matchPairsPayloadSchema>;
export type OrderingPayload = z.infer<typeof orderingPayloadSchema>;
export type TrueFalsePayload = z.infer<typeof trueFalsePayloadSchema>;
export type FillInTheBlankPayload = z.infer<typeof fillInTheBlankPayloadSchema>;
export type CategorizationPayload = z.infer<typeof categorizationPayloadSchema>;
export type NumericPayload = z.infer<typeof numericPayloadSchema>;
export type ShortAnswerPayload = z.infer<typeof shortAnswerPayloadSchema>;
export type HighlightPayload = z.infer<typeof highlightPayloadSchema>;

// ─── Form Schema ───────────────────────────────────────────────────────────────

export const testFormSchema = z.object({
  testName: z.string().min(1, "Test name is required"),
  questions: z.array(questionSchema),
});

export type TestFormData = z.infer<typeof testFormSchema>;
