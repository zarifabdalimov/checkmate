"use client";

import { Input } from "@/modules/ui/input";
import { Button } from "@/modules/ui/button";
import { SortableList, SortableItem } from "@/modules/ui/sortable";
import { Controller, useWatch } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";
import type { QuestionComponentProps } from "./question-component.types";

export function OrderingQuestion({
  questionIndex,
  isEditing,
  control,
}: QuestionComponentProps) {
  const payload = useWatch({
    control,
    name: `questions.${questionIndex}.payload` as `questions.${number}.payload`,
  });

  const items = "items" in payload ? payload.items : [];

  if (isEditing) {
    return (
      <div className="pl-6">
        <Controller
          control={control}
          name={
            `questions.${questionIndex}.payload` as `questions.${number}.payload`
          }
          render={({ field }) => {
            const currentItems =
              "items" in field.value ? field.value.items : [];

            const itemIds = currentItems.map((_, i) => `ordering-${questionIndex}-${i}`);

            const handleReorder = (oldIndex: number, newIndex: number) => {
              const updated = [...currentItems];
              const [moved] = updated.splice(oldIndex, 1);
              updated.splice(newIndex, 0, moved);
              const reordered = updated.map((item, i) => ({
                ...item,
                order: i + 1,
              }));
              field.onChange({ items: reordered });
            };

            return (
              <div className="space-y-2">
                <SortableList items={itemIds} onReorder={handleReorder}>
                  <div className="space-y-2">
                    {currentItems.map((item, itemIndex) => (
                      <SortableItem
                        key={itemIds[itemIndex]}
                        id={itemIds[itemIndex]}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground w-6 text-center">
                            {item.order}.
                          </span>
                          <Input
                            value={item.text}
                            onChange={(e) => {
                              const updated = [...currentItems];
                              updated[itemIndex] = {
                                ...updated[itemIndex],
                                text: e.target.value,
                              };
                              field.onChange({ items: updated });
                            }}
                            placeholder={`Item ${itemIndex + 1}`}
                            className="flex-1"
                          />
                          {currentItems.length > 2 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const updated = currentItems
                                  .filter((_, i) => i !== itemIndex)
                                  .map((item, i) => ({
                                    ...item,
                                    order: i + 1,
                                  }));
                                field.onChange({ items: updated });
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </SortableItem>
                    ))}
                  </div>
                </SortableList>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    field.onChange({
                      items: [
                        ...currentItems,
                        { order: currentItems.length + 1, text: "" },
                      ],
                    });
                  }}
                >
                  <Plus className="h-4 w-4" />
                  Add item
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
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2 p-2 rounded-md bg-muted/50"
        >
          <span className="text-sm font-medium text-muted-foreground w-6 text-center">
            {item.order}.
          </span>
          <span className="text-sm">{item.text}</span>
        </div>
      ))}
    </div>
  );
}
