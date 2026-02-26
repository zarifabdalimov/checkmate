"use client";

import { Input } from "@/modules/ui/input";
import { Textarea } from "@/modules/ui/textarea";
import { Button } from "@/modules/ui/button";
import { Controller, useWatch } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import type { QuestionComponentProps } from "./question-component.types";

export function HighlightQuestion({
  questionIndex,
  isEditing,
  control,
}: QuestionComponentProps) {
  const payload = useWatch({
    control,
    name: `questions.${questionIndex}.payload` as `questions.${number}.payload`,
  });

  const passage = "passage" in payload ? payload.passage : "";
  const highlights = "highlights" in payload ? payload.highlights : [];

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
              passage: string;
              highlights: { start: number; end: number }[];
            };

            return (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Passage
                  </label>
                  <Textarea
                    value={current.passage}
                    onChange={(e) =>
                      field.onChange({ ...current, passage: e.target.value })
                    }
                    placeholder="Enter the text passage..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Highlight ranges (character offsets)
                  </label>
                  {current.highlights.map((highlight, hlIndex) => (
                    <div key={hlIndex} className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={highlight.start}
                        onChange={(e) => {
                          const updated = [...current.highlights];
                          updated[hlIndex] = {
                            ...updated[hlIndex],
                            start: parseInt(e.target.value) || 0,
                          };
                          field.onChange({ ...current, highlights: updated });
                        }}
                        placeholder="Start"
                        className="w-24"
                      />
                      <span className="text-sm text-muted-foreground">to</span>
                      <Input
                        type="number"
                        value={highlight.end}
                        onChange={(e) => {
                          const updated = [...current.highlights];
                          updated[hlIndex] = {
                            ...updated[hlIndex],
                            end: parseInt(e.target.value) || 0,
                          };
                          field.onChange({ ...current, highlights: updated });
                        }}
                        placeholder="End"
                        className="w-24"
                      />
                      <span className="text-xs text-muted-foreground truncate max-w-40">
                        {current.passage.slice(highlight.start, highlight.end) ||
                          "—"}
                      </span>
                      {current.highlights.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const updated = current.highlights.filter(
                              (_, i) => i !== hlIndex,
                            );
                            field.onChange({ ...current, highlights: updated });
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
                        highlights: [
                          ...current.highlights,
                          { start: 0, end: 0 },
                        ],
                      })
                    }
                  >
                    <Plus className="h-4 w-4" />
                    Add highlight
                  </Button>
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  }

  // Render passage with highlights
  const renderPassage = () => {
    if (!passage) return null;

    const sorted = [...highlights].sort((a, b) => a.start - b.start);
    const parts: React.ReactNode[] = [];
    let cursor = 0;

    sorted.forEach((hl, i) => {
      if (hl.start > cursor) {
        parts.push(
          <span key={`text-${i}`}>{passage.slice(cursor, hl.start)}</span>,
        );
      }
      parts.push(
        <mark
          key={`hl-${i}`}
          className="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded"
        >
          {passage.slice(hl.start, hl.end)}
        </mark>,
      );
      cursor = hl.end;
    });

    if (cursor < passage.length) {
      parts.push(<span key="rest">{passage.slice(cursor)}</span>);
    }

    return parts;
  };

  return (
    <div className="pl-6">
      <p className="text-sm leading-relaxed">{renderPassage()}</p>
    </div>
  );
}
