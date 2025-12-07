"use client";

import { Input } from "@/modules/ui/input";
import { Controller } from "react-hook-form";
import { useEditableTestFormContext } from "../hooks/use-editable-test-form-context";

interface TestTitleProps {
  isEditing: boolean;
}

export function TestTitle({ isEditing }: TestTitleProps) {
  const { control, watch } = useEditableTestFormContext();
  const testName = watch("testName");

  if (isEditing) {
    return (
      <Controller
        name="testName"
        control={control}
        render={({ field }) => (
          <Input {...field} className="text-2xl font-bold text-center" />
        )}
      />
    );
  }

  return <h1 className="text-2xl font-bold">{testName}</h1>;
}
