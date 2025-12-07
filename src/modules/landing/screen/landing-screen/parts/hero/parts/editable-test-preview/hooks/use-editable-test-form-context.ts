import { useFormContext } from "react-hook-form";
import type { TestFormData } from "../index.types";
import { useFieldArrayContext } from "./field-array-context";

export function useEditableTestFormContext() {
  const formContext = useFormContext<TestFormData>();
  const fieldArrayContext = useFieldArrayContext();

  return {
    ...formContext,
    ...fieldArrayContext,
  };
}
