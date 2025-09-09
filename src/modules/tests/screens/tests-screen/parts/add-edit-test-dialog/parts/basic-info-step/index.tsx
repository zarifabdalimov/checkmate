import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/ui/form";
import { Input } from "@/modules/ui/input";
import { useTranslations } from "next-intl";
import { useTestFormContext } from "../../hooks/use-test-form-context";

export function BasicInfoStep() {
  const form = useTestFormContext();
  const t = useTranslations("Dashboard.tests.dialog");

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("form.name.label")}</FormLabel>
            <FormControl>
              <Input placeholder={t("form.name.placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("form.description.label")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("form.description.placeholder")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
