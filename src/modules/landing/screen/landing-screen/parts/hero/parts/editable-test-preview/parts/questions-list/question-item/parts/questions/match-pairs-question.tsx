"use client";

import { Input } from "@/modules/ui/input";
import { Button } from "@/modules/ui/button";
import { Controller, useWatch } from "react-hook-form";
import { Plus, Trash2, ArrowRight } from "lucide-react";
import type { QuestionComponentProps } from "./question-component.types";

export function MatchPairsQuestion({
  questionIndex,
  isEditing,
  control,
}: QuestionComponentProps) {
  const payload = useWatch({
    control,
    name: `questions.${questionIndex}.payload` as `questions.${number}.payload`,
  });

  const pairs = "pairs" in payload ? payload.pairs : [];

  if (isEditing) {
    return (
      <div className="pl-6">
        <Controller
          control={control}
          name={
            `questions.${questionIndex}.payload` as `questions.${number}.payload`
          }
          render={({ field }) => {
            const currentPairs =
              "pairs" in field.value ? field.value.pairs : [];

            return (
              <div className="space-y-2">
                {currentPairs.map((pair, pairIndex) => (
                  <div key={pairIndex} className="flex items-center gap-2">
                    <Input
                      value={pair.left}
                      onChange={(e) => {
                        const updated = [...currentPairs];
                        updated[pairIndex] = {
                          ...updated[pairIndex],
                          left: e.target.value,
                        };
                        field.onChange({ pairs: updated });
                      }}
                      placeholder="Term"
                      className="flex-1"
                    />
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <Input
                      value={pair.right}
                      onChange={(e) => {
                        const updated = [...currentPairs];
                        updated[pairIndex] = {
                          ...updated[pairIndex],
                          right: e.target.value,
                        };
                        field.onChange({ pairs: updated });
                      }}
                      placeholder="Match"
                      className="flex-1"
                    />
                    {currentPairs.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const updated = currentPairs.filter(
                            (_, i) => i !== pairIndex,
                          );
                          field.onChange({ pairs: updated });
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
                  onClick={() => {
                    field.onChange({
                      pairs: [...currentPairs, { left: "", right: "" }],
                    });
                  }}
                >
                  <Plus className="h-4 w-4" />
                  Add pair
                </Button>
              </div>
            );
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2 pl-6">
      {pairs.map((pair, index) => (
        <div
          key={index}
          className="flex items-center gap-2 p-2 rounded-md bg-muted/50"
        >
          <span className="text-sm font-medium flex-1">{pair.left}</span>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-sm flex-1">{pair.right}</span>
        </div>
      ))}
    </div>
  );
}
