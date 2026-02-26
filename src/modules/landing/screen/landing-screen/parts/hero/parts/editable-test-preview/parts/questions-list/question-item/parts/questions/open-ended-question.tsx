"use client";

import { Textarea } from "@/modules/ui/textarea";
import { Controller } from "react-hook-form";
import type { QuestionComponentProps } from "./question-component.types";
import { useWatch } from "react-hook-form";

export function OpenEndedQuestion({
  questionIndex,
  isEditing,
  control,
}: QuestionComponentProps) {
  const payload = useWatch({
    control,
    name: `questions.${questionIndex}.payload` as `questions.${number}.payload`,
  });

  const sampleAnswer =
    "sampleAnswer" in payload ? (payload.sampleAnswer ?? "") : "";

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
              "sampleAnswer" in field.value
                ? (field.value.sampleAnswer ?? "")
                : "";
            return (
              <Textarea
                value={current}
                onChange={(e) =>
                  field.onChange({ ...field.value, sampleAnswer: e.target.value })
                }
                placeholder="Sample answer (optional, for grading reference)"
                rows={3}
              />
            );
          }}
        />
      </div>
    );
  }

  return (
    <div className="pl-6">
      <div className="border border-dashed rounded-md p-4 text-sm text-muted-foreground">
        {sampleAnswer || "Open-ended response — students will type their answer here."}
      </div>
    </div>
  );
}
