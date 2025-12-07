"use client";

import { Input } from "@/modules/ui/input";
import { RadioGroup, RadioGroupItem } from "@/modules/ui/radio-group";
import { Label } from "@/modules/ui/label";
import { Controller } from "react-hook-form";
import { useEditableTestFormContext } from "../../../../hooks/use-editable-test-form-context";

interface QuestionOptionsProps {
  questionIndex: number;
  isEditing: boolean;
}

export function QuestionOptions({
  questionIndex,
  isEditing,
}: QuestionOptionsProps) {
  const { control, watch, setValue } = useEditableTestFormContext();
  const question = watch(`questions.${questionIndex}`);

  const handleCorrectAnswerChange = (optionIndex: number) => {
    const currentOptions = question?.options;
    if (!currentOptions) return;

    const updatedOptions = currentOptions.map((opt, idx) => ({
      ...opt,
      correct: idx === optionIndex,
    }));
    setValue(`questions.${questionIndex}.options`, updatedOptions);
  };

  if (!question || !question.options) {
    return null;
  }

  if (isEditing) {
    return (
      <div className="space-y-2 pl-6">
        <RadioGroup
          value={question.options.findIndex((opt) => opt.correct).toString()}
          onValueChange={(value) =>
            handleCorrectAnswerChange(parseInt(value))
          }
        >
          {question.options.map((option, optionIndex) => (
            <div key={option.order} className="flex items-center gap-3">
              <RadioGroupItem
                value={optionIndex.toString()}
                id={`q${questionIndex}-opt${optionIndex}`}
              />
              <Label
                htmlFor={`q${questionIndex}-opt${optionIndex}`}
                className="font-medium text-sm"
              >
                {String.fromCharCode(65 + optionIndex)}.
              </Label>
              <Controller
                name={`questions.${questionIndex}.options.${optionIndex}.answer`}
                control={control}
                render={({ field }) => (
                  <Input {...field} className="flex-1" />
                )}
              />
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  }

  return (
    <div className="space-y-2 pl-6">
      {question.options.map((option, optionIndex) => (
        <div key={option.order} className="flex items-start gap-2">
          <span className="font-medium text-sm">
            {String.fromCharCode(65 + optionIndex)}.
          </span>
          <span className="text-sm">{option.answer}</span>
        </div>
      ))}
    </div>
  );
}
