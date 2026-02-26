"use client";

import { RadioGroup, RadioGroupItem } from "@/modules/ui/radio-group";
import { Label } from "@/modules/ui/label";
import { Controller, useWatch } from "react-hook-form";
import type { QuestionComponentProps } from "./question-component.types";

export function TrueFalseQuestion({
  questionIndex,
  isEditing,
  control,
}: QuestionComponentProps) {
  const payload = useWatch({
    control,
    name: `questions.${questionIndex}.payload` as `questions.${number}.payload`,
  });

  const correctAnswer =
    "correctAnswer" in payload ? payload.correctAnswer : true;

  if (isEditing) {
    return (
      <div className="pl-6">
        <Controller
          control={control}
          name={
            `questions.${questionIndex}.payload` as `questions.${number}.payload`
          }
          render={({ field }) => {
            const current =
              "correctAnswer" in field.value ? field.value.correctAnswer : true;
            return (
              <RadioGroup
                value={current ? "true" : "false"}
                onValueChange={(v) =>
                  field.onChange({ correctAnswer: v === "true" })
                }
                className="flex gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="true"
                    id={`q${questionIndex}-true`}
                  />
                  <Label htmlFor={`q${questionIndex}-true`}>True</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="false"
                    id={`q${questionIndex}-false`}
                  />
                  <Label htmlFor={`q${questionIndex}-false`}>False</Label>
                </div>
              </RadioGroup>
            );
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2 pl-6">
      {["True", "False"].map((label) => {
        const isCorrect =
          (label === "True" && correctAnswer) ||
          (label === "False" && !correctAnswer);
        return (
          <div
            key={label}
            className={`flex items-start gap-2 p-2 rounded-md transition-colors ${
              isCorrect
                ? "bg-success-lighter dark:bg-success/20 border border-success-light dark:border-success"
                : ""
            }`}
          >
            <span
              className={`text-sm ${isCorrect ? "text-success dark:text-success-light font-medium" : ""}`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
