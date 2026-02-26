import type { Test } from "@/hooks/use-create-demo-test";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { testFormSchema, type TestFormData } from "../index.types";
import { transformBeQuestions } from "../utils/transform-be-questions";

export function useEditableTestForm(test: Test) {
  const content = test.content;
  const metadata = content?.test_metadata;
  const testContent = content?.test_content;

  const methods = useForm<TestFormData>({
    resolver: zodResolver(testFormSchema),
    defaultValues: {
      testName: metadata?.name || "Untitled Test",
      questions: testContent
        ? transformBeQuestions(testContent.groups)
        : [],
    },
  });

  const fieldArrayMethods = useFieldArray({
    control: methods.control,
    name: "questions",
  });

  return {
    ...methods,
    fieldArrayMethods,
  };
}
