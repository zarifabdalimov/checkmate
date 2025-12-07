import * as z from "zod";

export const testFormSchema = z.object({
  testName: z.string().min(1, "Test name is required"),
  questions: z.array(
    z.object({
      question: z.string().min(1, "Question is required"),
      options: z.array(
        z.object({
          order: z.number(),
          answer: z.string().min(1, "Answer is required"),
          correct: z.boolean(),
        })
      ),
    })
  ),
});

export type TestFormData = z.infer<typeof testFormSchema>;
