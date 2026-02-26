"use client";

import { Input } from "@/modules/ui/input";
import { Controller, useWatch } from "react-hook-form";
import type { QuestionComponentProps } from "./question-component.types";

export function NumericQuestion({
  questionIndex,
  isEditing,
  control,
}: QuestionComponentProps) {
  const payload = useWatch({
    control,
    name: `questions.${questionIndex}.payload` as `questions.${number}.payload`,
  });

  const correctAnswer =
    "correctAnswer" in payload ? payload.correctAnswer : 0;
  const tolerance = "tolerance" in payload ? payload.tolerance : undefined;

  if (isEditing) {
    return (
      <div className="pl-6">
        <Controller
          control={control}
          name={
            `questions.${questionIndex}.payload` as `questions.${number}.payload`
          }
          render={({ field }) => {
            const current = field.value as {
              correctAnswer: number;
              tolerance?: number;
            };

            return (
              <div className="flex items-center gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Correct answer</label>
                  <Input
                    type="number"
                    value={current.correctAnswer}
                    onChange={(e) =>
                      field.onChange({
                        ...current,
                        correctAnswer: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-32"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    Tolerance (optional)
                  </label>
                  <Input
                    type="number"
                    value={current.tolerance ?? ""}
                    onChange={(e) =>
                      field.onChange({
                        ...current,
                        tolerance: e.target.value
                          ? parseFloat(e.target.value)
                          : undefined,
                      })
                    }
                    placeholder="0"
                    className="w-32"
                  />
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  }

  return (
    <div className="pl-6">
      <div className="p-2 rounded-md bg-success-lighter dark:bg-success/20 border border-success-light dark:border-success inline-block">
        <span className="text-sm text-success dark:text-success-light font-medium">
          {correctAnswer}
          {tolerance ? ` (± ${tolerance})` : ""}
        </span>
      </div>
    </div>
  );
}
