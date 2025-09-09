import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { createEditTestSchema, EditTestFormData } from "../../types";

export function useEditTestFormContext() {
  return useFormContext<EditTestFormData>();
}

export function useEditTestForm(defaultValues: EditTestFormData) {
  const tValidation = useTranslations("Dashboard.tests.dialog.validation");

  const schema = React.useMemo(
    () => createEditTestSchema(tValidation),
    [tValidation],
  );

  return useForm<EditTestFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });
}
