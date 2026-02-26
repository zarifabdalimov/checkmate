"use client";

import { Button } from "@/modules/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/modules/ui/popover";
import { SortableList, SortableItem } from "@/modules/ui/sortable";
import {
  Plus,
  CircleDot,
  CheckSquare,
  AlignLeft,
  ToggleLeft,
  Link,
  ArrowUpDown,
  TextCursorInput,
  FolderTree,
  Hash,
  MessageSquare,
  Highlighter,
} from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useEditableTestFormContext } from "../../hooks/use-editable-test-form-context";
import type { QuestionType } from "../../index.types";
import { createDefaultQuestion } from "../../utils/default-payloads";
import { QuestionItem } from "./question-item/question-item";

const QUESTION_TYPE_OPTIONS: {
  type: QuestionType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { type: "SINGLE_CHOICE", label: "Single Choice", icon: CircleDot },
  { type: "MULTIPLE_CHOICE", label: "Multiple Choice", icon: CheckSquare },
  { type: "OPEN_ENDED", label: "Open Ended", icon: AlignLeft },
  { type: "TRUE_FALSE", label: "True / False", icon: ToggleLeft },
  { type: "MATCH_PAIRS", label: "Match Pairs", icon: Link },
  { type: "ORDERING", label: "Ordering", icon: ArrowUpDown },
  {
    type: "FILL_IN_THE_BLANK",
    label: "Fill in the Blank",
    icon: TextCursorInput,
  },
  { type: "CATEGORIZATION", label: "Categorization", icon: FolderTree },
  { type: "NUMERIC", label: "Numeric", icon: Hash },
  { type: "SHORT_ANSWER", label: "Short Answer", icon: MessageSquare },
  { type: "HIGHLIGHT", label: "Highlight", icon: Highlighter },
];

interface QuestionsListProps {
  isEditing: boolean;
}

export function QuestionsList({ isEditing }: QuestionsListProps) {
  const t = useTranslations("ShowcasePage.preview");
  const { fields, append, move } = useEditableTestFormContext();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleAddQuestion = (type: QuestionType) => {
    const newQuestion = createDefaultQuestion(type);
    newQuestion.order = fields.length + 1;
    append(newQuestion);
    setPopoverOpen(false);
  };

  const handleReorder = (oldIndex: number, newIndex: number) => {
    move(oldIndex, newIndex);
  };

  const questionItems = fields.map((field, questionIndex) => (
    <QuestionItem
      key={field.id}
      questionIndex={questionIndex}
      isEditing={isEditing}
    />
  ));

  return (
    <div className="space-y-8">
      {isEditing ? (
        <SortableList
          items={fields.map((f) => f.id)}
          onReorder={handleReorder}
        >
          <div className="space-y-8">
            {fields.map((field, questionIndex) => (
              <SortableItem key={field.id} id={field.id}>
                <QuestionItem
                  questionIndex={questionIndex}
                  isEditing={isEditing}
                />
              </SortableItem>
            ))}
          </div>
        </SortableList>
      ) : (
        questionItems
      )}
      {isEditing && (
        <div className="flex justify-center print:hidden">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                <Plus className="h-4 w-4" />
                {t("addQuestion")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="center">
              <div className="space-y-1">
                {QUESTION_TYPE_OPTIONS.map(({ type, label, icon: Icon }) => (
                  <Button
                    key={type}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={() => handleAddQuestion(type)}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
