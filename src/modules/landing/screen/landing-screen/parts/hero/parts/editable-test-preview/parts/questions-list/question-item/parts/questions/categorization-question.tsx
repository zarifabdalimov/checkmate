"use client";

import { Input } from "@/modules/ui/input";
import { Button } from "@/modules/ui/button";
import { Controller, useWatch } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import type { QuestionComponentProps } from "./question-component.types";

export function CategorizationQuestion({
  questionIndex,
  isEditing,
  control,
}: QuestionComponentProps) {
  const payload = useWatch({
    control,
    name: `questions.${questionIndex}.payload` as `questions.${number}.payload`,
  });

  const categories = "categories" in payload ? payload.categories : [];

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
              categories: { name: string; items: string[] }[];
            };

            const updateCategories = (
              cats: { name: string; items: string[] }[],
            ) => {
              field.onChange({ categories: cats });
            };

            return (
              <div className="space-y-4">
                {current.categories.map((category, catIndex) => (
                  <div
                    key={catIndex}
                    className="space-y-2 p-3 rounded-md border"
                  >
                    <div className="flex items-center gap-2">
                      <Input
                        value={category.name}
                        onChange={(e) => {
                          const updated = [...current.categories];
                          updated[catIndex] = {
                            ...updated[catIndex],
                            name: e.target.value,
                          };
                          updateCategories(updated);
                        }}
                        placeholder="Category name"
                        className="flex-1 font-medium"
                      />
                      {current.categories.length > 2 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const updated = current.categories.filter(
                              (_, i) => i !== catIndex,
                            );
                            updateCategories(updated);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center gap-2 pl-4"
                      >
                        <Input
                          value={item}
                          onChange={(e) => {
                            const updated = [...current.categories];
                            const items = [...updated[catIndex].items];
                            items[itemIndex] = e.target.value;
                            updated[catIndex] = {
                              ...updated[catIndex],
                              items,
                            };
                            updateCategories(updated);
                          }}
                          placeholder="Item"
                          className="flex-1"
                        />
                        {category.items.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const updated = [...current.categories];
                              updated[catIndex] = {
                                ...updated[catIndex],
                                items: category.items.filter(
                                  (_, i) => i !== itemIndex,
                                ),
                              };
                              updateCategories(updated);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-4"
                      onClick={() => {
                        const updated = [...current.categories];
                        updated[catIndex] = {
                          ...updated[catIndex],
                          items: [...category.items, ""],
                        };
                        updateCategories(updated);
                      }}
                    >
                      <Plus className="h-3 w-3" />
                      Add item
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateCategories([
                      ...current.categories,
                      { name: "", items: [""] },
                    ])
                  }
                >
                  <Plus className="h-4 w-4" />
                  Add category
                </Button>
              </div>
            );
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3 pl-6">
      {categories.map((category, index) => (
        <div key={index} className="space-y-1">
          <p className="text-sm font-medium">{category.name}</p>
          <div className="flex flex-wrap gap-1 pl-2">
            {category.items.map((item, itemIndex) => (
              <span
                key={itemIndex}
                className="text-xs px-2 py-1 rounded-md bg-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
