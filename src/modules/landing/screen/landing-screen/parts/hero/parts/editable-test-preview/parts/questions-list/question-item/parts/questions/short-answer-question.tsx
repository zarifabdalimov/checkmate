"use client";

import { Input } from "@/modules/ui/input";
import { Button } from "@/modules/ui/button";
import { Controller, useWatch } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import type { QuestionComponentProps } from "./question-component.types";

export function ShortAnswerQuestion({
  questionIndex,
  isEditing,
  control,
}: QuestionComponentProps) {
  const payload = useWatch({
    control,
    name: `questions.${questionIndex}.payload` as `questions.${number}.payload`,
  });

  const acceptedAnswers =
    "acceptedAnswers" in payload ? payload.acceptedAnswers : [];

  if (isEditing) {
    return (
      <div className="pl-6">
        <Controller
          control={control}
          name={
            `questions.${questionIndex}.payload` as `questions.${number}.payload`
          }
          render={({ field }) => {
            const current = field.value as { acceptedAnswers: string[] };

            return (
              <div className="space-y-2">
                <label className="text-sm font-medium">Accepted answers</label>
                {current.acceptedAnswers.map((answer, answerIndex) => (
                  <div key={answerIndex} className="flex items-center gap-2">
                    <Input
                      value={answer}
                      onChange={(e) => {
                        const updated = [...current.acceptedAnswers];
                        updated[answerIndex] = e.target.value;
                        field.onChange({ acceptedAnswers: updated });
                      }}
                      placeholder={`Accepted answer ${answerIndex + 1}`}
                      className="flex-1"
                    />
                    {current.acceptedAnswers.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const updated = current.acceptedAnswers.filter(
                            (_, i) => i !== answerIndex,
                          );
                          field.onChange({ acceptedAnswers: updated });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    field.onChange({
                      acceptedAnswers: [...current.acceptedAnswers, ""],
                    })
                  }
                >
                  <Plus className="h-4 w-4" />
                  Add accepted answer
                </Button>
              </div>
            );
          }}
        />
      </div>
    );
  }

  return (
    <div className="pl-6">
      <div className="border border-dashed rounded-md p-4 text-sm text-muted-foreground">
        Short answer — accepted: {acceptedAnswers.filter(Boolean).join(", ") || "none set"}
      </div>
    </div>
  );
}
