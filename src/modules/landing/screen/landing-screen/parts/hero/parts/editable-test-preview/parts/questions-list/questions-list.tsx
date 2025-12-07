"use client";

import { Button } from "@/modules/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEditableTestFormContext } from "../../hooks/use-editable-test-form-context";
import { QuestionItem } from "./question-item/question-item";

interface QuestionsListProps {
  isEditing: boolean;
}

export function QuestionsList({ isEditing }: QuestionsListProps) {
  const t = useTranslations("ShowcasePage.preview");
  const { fields, append } = useEditableTestFormContext();

  const handleAddQuestion = () => {
    append({
      question: "",
      options: [
        { order: 1, answer: "", correct: true },
        { order: 2, answer: "", correct: false },
        { order: 3, answer: "", correct: false },
        { order: 4, answer: "", correct: false },
      ],
    });
  };

  return (
    <div className="space-y-8">
      {fields.map((field, questionIndex) => (
        <QuestionItem
          key={field.id}
          questionIndex={questionIndex}
          isEditing={isEditing}
        />
      ))}
      {isEditing && (
        <div className="flex justify-center print:hidden">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddQuestion}
          >
            <Plus className="h-4 w-4" />
            {t("addQuestion")}
          </Button>
        </div>
      )}
    </div>
  );
}
