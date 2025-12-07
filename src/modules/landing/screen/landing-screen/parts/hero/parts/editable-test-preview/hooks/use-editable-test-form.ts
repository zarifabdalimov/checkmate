import type { Test } from "@/hooks/use-create-demo-test";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { testFormSchema, type TestFormData } from "../index.types";

export function useEditableTestForm(test: Test) {
  const content = test.content;
  const metadata = content?.test_metadata;
  const testContent = content?.test_content;

  const methods = useForm<TestFormData>({
    resolver: zodResolver(testFormSchema),
    defaultValues: {
      testName: metadata?.name || "Untitled Test",
      questions: testContent
        ? testContent.groups.flatMap((group) =>
            (group.items ?? []).map((item) => ({
              question: item.question,
              options: item.options,
            })),
          )
        : [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: methods.control,
    name: "questions",
  });

  return {
    ...methods,
    fields,
    append,
    remove,
    update,
  };
}

