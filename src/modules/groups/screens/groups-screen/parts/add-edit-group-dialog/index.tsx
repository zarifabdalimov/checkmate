"use client";

import { Button } from "@/modules/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/modules/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/ui/form";
import { Input } from "@/modules/ui/input";
import { Group } from '@/lib/api/generated/model'
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import * as React from "react";
import { GroupFormData, useGroupForm } from "./hooks/use-group-form";

interface AddEditGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group?: Group | null;
  onSubmit: (data: GroupFormData) => void;
}

export function AddEditGroupDialog({
  open,
  onOpenChange,
  group,
  onSubmit,
}: AddEditGroupDialogProps) {
  const isEditing = !!group;
  const t = useTranslations("Dashboard.groups.dialog");
  const form = useGroupForm();

  // Reset form when dialog opens/closes or group changes
  useEffect(() => {
    if (open) {
      form.reset({
        name: group?.name || "",
      });
    }
  }, [open, group, form]);

  const handleSubmit = (data: GroupFormData) => {
    onSubmit(data);
    onOpenChange(false);
    form.reset();
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? t("edit.title") : t("add.title")}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? t("edit.description") : t("add.description")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.name.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.name.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                {t("buttons.cancel")}
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? t("buttons.saving")
                  : isEditing
                    ? t("buttons.updateGroup")
                    : t("buttons.addGroup")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
