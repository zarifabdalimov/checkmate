import { useGetApiV1Groups } from "@/lib/api/generated/aPIForCheckmateApp";
import { Card, CardContent, CardHeader, CardTitle } from "@/modules/ui/card";
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
import { useEditTestFormContext } from "../../hooks/use-edit-test-form-context";

export function BasicInfoStep() {
  const form = useEditTestFormContext();
  const groups = useGetApiV1Groups();
  const t = useTranslations("Dashboard.tests.dialog");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("form.basicInfo.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
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
            name="group_id"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.group.label")}</FormLabel>
                <Select
                  disabled
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("form.group.placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {groups.data?.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
