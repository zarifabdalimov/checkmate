"use client";

import { Button } from "@/modules/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/modules/ui/popover";
import { SortableColumns } from "@/modules/ui/sortable";
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
import { useCallback, useState } from "react";
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

  const handleReorder = useCallback(
    (newOrder: string[]) => {
      // Map new id order back to field array moves.
      // We apply moves one by one from top to bottom.
      const currentIds = fields.map((f) => f.id);
      const working = [...currentIds];

      for (let targetIdx = 0; targetIdx < newOrder.length; targetIdx++) {
        const id = newOrder[targetIdx];
        const currentIdx = working.indexOf(id);
        if (currentIdx !== targetIdx && currentIdx !== -1) {
          move(currentIdx, targetIdx);
          // Mirror in working array
          const [moved] = working.splice(currentIdx, 1);
          working.splice(targetIdx, 0, moved);
        }
      }
    },
    [fields, move],
  );

  const renderQuestion = useCallback(
    (id: string) => {
      const index = fields.findIndex((f) => f.id === id);
      if (index === -1) return null;
      return <QuestionItem questionIndex={index} isEditing={isEditing} />;
    },
    [fields, isEditing],
  );

  const mid = Math.ceil(fields.length / 2);

  return (
    <div>
      {isEditing ? (
        <SortableColumns
          items={fields.map((f) => f.id)}
          onReorder={handleReorder}
          renderItem={renderQuestion}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {fields.slice(0, mid).map((field, i) => (
              <QuestionItem
                key={field.id}
                questionIndex={i}
                isEditing={false}
              />
            ))}
          </div>
          <div className="space-y-4">
            {fields.slice(mid).map((field, i) => (
              <QuestionItem
                key={field.id}
                questionIndex={mid + i}
                isEditing={false}
              />
            ))}
          </div>
        </div>
      )}
      {isEditing && (
        <div className="flex justify-center print:hidden mt-6">
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
