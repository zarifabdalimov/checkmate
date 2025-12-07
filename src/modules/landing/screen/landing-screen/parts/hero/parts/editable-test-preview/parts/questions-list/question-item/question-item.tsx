"use client";

import { Input } from "@/modules/ui/input";
import { Button } from "@/modules/ui/button";
import { Controller } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { useEditableTestFormContext } from "../../../hooks/use-editable-test-form-context";
import { QuestionOptions } from "./parts/question-options";

interface QuestionItemProps {
  questionIndex: number;
  isEditing: boolean;
}

export function QuestionItem({ questionIndex, isEditing }: QuestionItemProps) {
  const { control, watch, remove } = useEditableTestFormContext();
  const question = watch(`questions.${questionIndex}`);

  if (!question) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-start">
        <span className="font-medium shrink-0">{questionIndex + 1}.</span>
        {isEditing ? (
          <Controller
            name={`questions.${questionIndex}.question`}
            control={control}
            render={({ field }) => <Input {...field} className="flex-1" />}
          />
        ) : (
          <p className="flex-1 text-left">{question.question}</p>
        )}
        {isEditing && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => remove(questionIndex)}
            className="shrink-0 print:hidden"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <QuestionOptions questionIndex={questionIndex} isEditing={isEditing} />
    </div>
  );
}
