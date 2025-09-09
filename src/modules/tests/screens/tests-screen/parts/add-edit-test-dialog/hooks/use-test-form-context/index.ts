import { useFormContext } from "react-hook-form";
import { TestFormData } from "../use-test-form";

export function useTestFormContext() {
  return useFormContext<TestFormData>();
}
