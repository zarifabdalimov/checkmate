"use client";

import { Input } from "@/modules/ui/input";
import { Button } from "@/modules/ui/button";
import { Controller, useWatch } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import type { QuestionComponentProps } from "./question-component.types";

export function FillInTheBlankQuestion({
  questionIndex,
  isEditing,
  control,
}: QuestionComponentProps) {
  const payload = useWatch({
    control,
    name: `questions.${questionIndex}.payload` as `questions.${number}.payload`,
  });

  const textWithBlanks =
    "textWithBlanks" in payload ? payload.textWithBlanks : "";
  const answers = "answers" in payload ? payload.answers : [];

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
              textWithBlanks: string;
              answers: string[];
            };

            return (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Text (use ___ for blanks)
                  </label>
                  <Input
                    value={current.textWithBlanks}
                    onChange={(e) =>
                      field.onChange({
                        ...current,
                        textWithBlanks: e.target.value,
                      })
                    }
                    placeholder='e.g. "The capital of France is ___"'
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Answers (in order of blanks)
                  </label>
                  {current.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground w-6 text-center">
                        {answerIndex + 1}.
                      </span>
                      <Input
                        value={answer}
                        onChange={(e) => {
                          const updated = [...current.answers];
                          updated[answerIndex] = e.target.value;
                          field.onChange({ ...current, answers: updated });
                        }}
                        placeholder={`Answer for blank ${answerIndex + 1}`}
                        className="flex-1"
                      />
                      {current.answers.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const updated = current.answers.filter(
                              (_, i) => i !== answerIndex,
                            );
                            field.onChange({ ...current, answers: updated });
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
                        ...current,
                        answers: [...current.answers, ""],
                      })
                    }
                  >
                    <Plus className="h-4 w-4" />
                    Add answer
                  </Button>
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  }

  const parts = textWithBlanks.split("___");

  return (
    <div className="pl-6">
      <p className="text-sm">
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && (
              <span className="inline-block mx-1 px-3 py-0.5 bg-muted rounded border border-dashed text-muted-foreground">
                {answers[index] || "___"}
              </span>
            )}
          </span>
        ))}
      </p>
    </div>
  );
}
