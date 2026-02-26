"use client";

import { Input } from "@/modules/ui/input";
import { RadioGroup, RadioGroupItem } from "@/modules/ui/radio-group";
import { Label } from "@/modules/ui/label";
import { Controller, useWatch } from "react-hook-form";
import type { QuestionComponentProps } from "./question-component.types";
import type { TestFormData } from "../../../../../index.types";

export function SingleChoiceQuestion({
  questionIndex,
  isEditing,
  control,
}: QuestionComponentProps) {
  const payload = useWatch({
    control,
    name: `questions.${questionIndex}.payload` as `questions.${number}.payload`,
  });

  const options = "options" in payload ? payload.options : [];

  const handleCorrectAnswerChange = (optionIdx: number) => {
    // This is handled via Controller below — we set the value through the form
  };

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
            const correctIdx = currentOptions.findIndex((opt) => opt.correct);

            return (
              <RadioGroup
                value={correctIdx.toString()}
                onValueChange={(value) => {
                  const idx = parseInt(value);
                  const updated = currentOptions.map((opt, i) => ({
                    ...opt,
                    correct: i === idx,
                  }));
                  field.onChange({ options: updated });
                }}
              >
                {currentOptions.map((option, optionIndex) => (
                  <div key={option.order} className="flex items-center gap-3">
                    <RadioGroupItem
                      value={optionIndex.toString()}
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
              </RadioGroup>
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
            className={`font-medium text-sm ${option.correct ? "text-success dark:text-success-light" : ""}`}
          >
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
