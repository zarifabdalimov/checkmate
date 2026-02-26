"use client";

import { Input } from "@/modules/ui/input";
import { Checkbox } from "@/modules/ui/checkbox";
import { Label } from "@/modules/ui/label";
import { Controller } from "react-hook-form";
import { Check } from "lucide-react";
import type { QuestionComponentProps } from "./question-component.types";
import { useWatch } from "react-hook-form";

export function MultipleChoiceQuestion({
  questionIndex,
  isEditing,
  control,
}: QuestionComponentProps) {
  const payload = useWatch({
    control,
    name: `questions.${questionIndex}.payload` as `questions.${number}.payload`,
  });

  const options = "options" in payload ? payload.options : [];

  if (isEditing) {
    return (
      <div className="space-y-2 pl-6">
        <Controller
          control={control}
          name={
            `questions.${questionIndex}.payload` as `questions.${number}.payload`
          }
          render={({ field }) => {
            const currentOptions =
              "options" in field.value ? field.value.options : [];

            return (
              <div className="space-y-2">
                {currentOptions.map((option, optionIndex) => (
                  <div key={option.order} className="flex items-center gap-3">
                    <Checkbox
                      checked={option.correct}
                      onCheckedChange={(checked) => {
                        const updated = [...currentOptions];
                        updated[optionIndex] = {
                          ...updated[optionIndex],
                          correct: Boolean(checked),
                        };
                        field.onChange({ options: updated });
                      }}
                      id={`q${questionIndex}-opt${optionIndex}`}
                    />
                    <Label
                      htmlFor={`q${questionIndex}-opt${optionIndex}`}
                      className="font-medium text-sm"
                    >
                      {String.fromCharCode(65 + optionIndex)}.
                    </Label>
                    <Input
                      value={option.answer}
                      onChange={(e) => {
                        const updated = [...currentOptions];
                        updated[optionIndex] = {
                          ...updated[optionIndex],
                          answer: e.target.value,
                        };
                        field.onChange({ options: updated });
                      }}
                      className="flex-1"
                    />
                  </div>
                ))}
              </div>
            );
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2 pl-6">
      {options.map((option, optionIndex) => (
        <div
          key={option.order}
          className={`flex items-start gap-2 p-2 rounded-md transition-colors ${
            option.correct
              ? "bg-success-lighter dark:bg-success/20 border border-success-light dark:border-success"
              : ""
          }`}
        >
          <span
            className={`font-medium text-sm flex items-center gap-1 ${option.correct ? "text-success dark:text-success-light" : ""}`}
          >
            {option.correct && <Check className="h-3 w-3" />}
            {String.fromCharCode(65 + optionIndex)}.
          </span>
          <span
            className={`text-sm ${option.correct ? "text-success dark:text-success-light font-medium" : ""}`}
          >
            {option.answer}
          </span>
        </div>
      ))}
    </div>
  );
}
