"use client";

import {
  FORMATS,
} from "@/modules/landing/screen/landing-screen/parts/hero/parts/test-generation-form/index.static";
import { Button } from "@/modules/ui/button";
import { Card, CardContent } from "@/modules/ui/card";
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
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";
import type { CreateTestFormData } from "../hooks/use-create-test-form";

interface ContentSectionItemProps {
  index: number;
  form: UseFormReturn<CreateTestFormData>;
  isGenerating: boolean;
  canRemove: boolean;
  onRemove: () => void;
}

export function ContentSectionItem({
  index,
  form,
  isGenerating,
  canRemove,
  onRemove,
}: ContentSectionItemProps) {
  const t = useTranslations("CreateTestPage.form");
  const tFormat = useTranslations("ShowcasePage.form");

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold">
            {t("contentSectionTitle", { number: index + 1 })}
          </h4>
          {canRemove && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
              disabled={isGenerating}
              className="text-destructive hover:text-destructive/80 gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {t("removeSection")}
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name={`content.${index}.topic`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("topic.label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("topic.placeholder")}
                    disabled={isGenerating}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`content.${index}.format`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("format.label")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isGenerating}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("format.placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FORMATS.map((format) => (
                        <SelectItem key={format} value={format}>
                          {tFormat(`format.options.${format}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`content.${index}.amount`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("amount.label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={50}
                      placeholder={t("amount.placeholder")}
                      disabled={isGenerating}
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value, 10),
                        )
                      }
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
