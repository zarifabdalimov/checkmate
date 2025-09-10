import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/ui/form";
import { Input } from "@/modules/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/ui/select";
import { TestParamsQuestionFormat } from "@/lib/api/generated/model";
import { useTranslations } from "next-intl";
import { useTestFormContext } from "../../hooks/use-test-form-context";

export function QuestionsStep() {
  const form = useTestFormContext();
  const t = useTranslations("Dashboard.tests.dialog");

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="question_format"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("form.questionFormat.label")}</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={t("form.questionFormat.placeholder")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TestParamsQuestionFormat.single_choice}>
                    {t("form.questionFormat.options.singleChoice")}
                  </SelectItem>
                  <SelectItem value={TestParamsQuestionFormat.multiple_choice}>
                    {t("form.questionFormat.options.multipleChoice")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="number_of_questions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.questions.label")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  placeholder={t("form.questions.placeholder")}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time_per_question_in_minutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.timePerQuestion.label")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0.5"
                  max="60"
                  step="0.5"
                  placeholder={t("form.timePerQuestion.placeholder")}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
