import { Button } from "@/modules/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/modules/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/ui/form";
import { Input } from "@/modules/ui/input";
import { RadioGroup, RadioGroupItem } from "@/modules/ui/radio-group";
import { Plus, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFieldArray } from "react-hook-form";
import { useEditTestFormContext } from "../../hooks/use-edit-test-form-context";

export function ContentEditorStep() {
  const form = useEditTestFormContext();
  const t = useTranslations("Dashboard.tests.dialog");

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "content",
  });

  const addQuestion = () => {
    const newQuestion = {
      q: fields.length + 1,
      question: "",
      correctAnswer: "",
      options: [
        { order: 1, answer: "", correct: false },
        { order: 2, answer: "", correct: false },
        { order: 3, answer: "", correct: false },
        { order: 4, answer: "", correct: false },
      ],
    };
    append(newQuestion);
  };

  const handleCorrectAnswerChange = (
    questionIndex: number,
    value: string,
    onChange: (value: string) => void,
  ) => {
    const correctIndex = parseInt(value);
    for (let i = 0; i < 4; i++) {
      form.setValue(
        `content.${questionIndex}.options.${i}.correct`,
        i === correctIndex,
      );
    }
    onChange(value);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t("form.content.title")}</CardTitle>
        <Button type="button" onClick={addQuestion}>
          <Plus />
          {t("form.content.addQuestion")}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.map((field, questionIndex) => (
          <Card key={field.id} className="p-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium">
                {t("form.content.questionNumber", {
                  number: questionIndex + 1,
                })}
              </h4>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(questionIndex)}
              >
                <Trash />
                {t("form.content.removeQuestion")}
              </Button>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name={`content.${questionIndex}.question`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.content.questionText")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("form.content.questionPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>{t("form.content.answerOptions")}</FormLabel>
                <FormField
                  control={form.control}
                  name={`content.${questionIndex}.correctAnswer`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) =>
                            handleCorrectAnswerChange(
                              questionIndex,
                              value,
                              field.onChange,
                            )
                          }
                          value={field.value || ""}
                        >
                          {Array.from({ length: 4 }, (_, optionIndex) => (
                            <div
                              key={optionIndex}
                              className="flex items-center gap-2"
                            >
                              <RadioGroupItem value={optionIndex.toString()} />
                              <span className="text-sm font-medium">
                                {String.fromCharCode(65 + optionIndex)}.
                              </span>
                              <FormField
                                control={form.control}
                                name={`content.${questionIndex}.options.${optionIndex}.answer`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl>
                                      <Input
                                        placeholder={t(
                                          "form.content.optionPlaceholder",
                                          {
                                            letter: String.fromCharCode(
                                              65 + optionIndex,
                                            ),
                                          },
                                        )}
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>
        ))}

        <Button type="button" onClick={addQuestion}>
          <Plus />
          {t("form.content.addQuestion")}
        </Button>
        {fields.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {t("form.content.noQuestions")}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
