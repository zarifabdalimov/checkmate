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
import { useTranslations } from "next-intl";
import { useTestFormContext } from "../../hooks/use-test-form-context";

export function ParametersStep() {
  const form = useTestFormContext();
  const t = useTranslations("Dashboard.tests.dialog");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.subject.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("form.subject.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.topic.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("form.topic.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="student_age_range"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.ageRange.label")}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("form.ageRange.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5-7">5-7 years</SelectItem>
                    <SelectItem value="8-10">8-10 years</SelectItem>
                    <SelectItem value="11-13">11-13 years</SelectItem>
                    <SelectItem value="14-16">14-16 years</SelectItem>
                    <SelectItem value="17-18">17-18 years</SelectItem>
                    <SelectItem value="18+">18+ years</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="difficulty_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.difficulty.label")}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={t("form.difficulty.placeholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">
                      {t("form.difficulty.options.beginner")}
                    </SelectItem>
                    <SelectItem value="intermediate">
                      {t("form.difficulty.options.intermediate")}
                    </SelectItem>
                    <SelectItem value="advanced">
                      {t("form.difficulty.options.advanced")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
