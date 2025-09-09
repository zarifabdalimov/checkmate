import { Card, CardContent, CardHeader, CardTitle } from "@/modules/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/ui/form";
import { Input } from "@/modules/ui/input";
import { useTranslations } from "next-intl";
import { useEditTestFormContext } from "../../hooks/use-edit-test-form-context";

export function BasicInfoStep() {
  const form = useEditTestFormContext();
  const t = useTranslations("Dashboard.tests.dialog");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("form.basicInfo.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
      </CardContent>
    </Card>
  );
}
