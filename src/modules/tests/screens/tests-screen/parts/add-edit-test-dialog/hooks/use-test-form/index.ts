import { Test } from "@/lib/api/generated/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const createTestSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    name: z.string().min(1, t("nameRequired")).max(100, t("nameTooLong")),
  });

export type TestFormData = {
  name: string;
};

export function useTestForm(test?: Test) {
  const tValidation = useTranslations("Dashboard.tests.dialog.validation");
  const testSchema = React.useMemo(
    () => createTestSchema(tValidation),
    [tValidation],
  );

  return useForm<TestFormData>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      name: test?.name || "",
    },
  });
}
