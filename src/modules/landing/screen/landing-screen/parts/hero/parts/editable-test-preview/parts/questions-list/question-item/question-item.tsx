"use client";

import { Input } from "@/modules/ui/input";
import { Button } from "@/modules/ui/button";
import { Badge } from "@/modules/ui/badge";
import { Controller } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { useEditableTestFormContext } from "../../../hooks/use-editable-test-form-context";
import { QuestionBody } from "./parts/question-body";
import type { QuestionType } from "../../../index.types";

const TYPE_LABELS: Record<QuestionType, string> = {
  SINGLE_CHOICE: "Single Choice",
  MULTIPLE_CHOICE: "Multiple Choice",
  OPEN_ENDED: "Open Ended",
  TRUE_FALSE: "True / False",
  MATCH_PAIRS: "Match Pairs",
  ORDERING: "Ordering",
  FILL_IN_THE_BLANK: "Fill in the Blank",
  CATEGORIZATION: "Categorization",
  NUMERIC: "Numeric",
  SHORT_ANSWER: "Short Answer",
  HIGHLIGHT: "Highlight",
};

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
    <div className="space-y-2">
      {isEditing && (
        <div className="text-left">
          <Badge variant="outline">
            {TYPE_LABELS[question.type]}
          </Badge>
        </div>
      )}
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

      <QuestionBody
        type={question.type}
        questionIndex={questionIndex}
        isEditing={isEditing}
        control={control}
      />
    </div>
  );
}
