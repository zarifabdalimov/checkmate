import type { Control } from "react-hook-form";
import type { TestFormData } from "../../../../../index.types";

export interface QuestionComponentProps {
  questionIndex: number;
  isEditing: boolean;
  control: Control<TestFormData>;
}
