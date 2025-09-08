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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/ui/select";
import { Test, TestParamsQuestionFormat } from "@/lib/api/generated/model";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import * as React from "react";
import { TestFormData, useTestForm } from "./hooks/use-test-form";

interface AddEditTestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  test?: Test | null;
  onSubmit: (data: TestFormData) => void;
}

export function AddEditTestDialog({
  open,
  onOpenChange,
  test,
  onSubmit,
}: AddEditTestDialogProps) {
  const isEditing = !!test;
  const t = useTranslations("Dashboard.tests.dialog");
  const form = useTestForm();

  // Reset form when dialog opens/closes or test changes
  useEffect(() => {
    if (open) {
      form.reset({
        name: test?.name || "",
        description: test?.description || "",
        subject: test?.test_params?.subject || "",
        topic: test?.test_params?.topic || "",
        student_age_range: test?.test_params?.student_age_range || "",
        difficulty_level: test?.test_params?.difficultyt_level || "",
        question_format:
          test?.test_params?.question_format ||
          TestParamsQuestionFormat.multiple_choice,
        number_of_questions: test?.test_params?.number_of_questions || 10,
        time_per_question_in_minutes:
          test?.test_params?.time_per_question_in_minutes || 2,
      });
    }
  }, [open, test, form]);

  const handleSubmit = (data: TestFormData) => {
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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
            {/* Basic Information */}
            <div className="space-y-4">
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

            {/* Test Parameters */}
            <div className="space-y-4 border-t pt-4">
              <h4 className="text-sm font-medium">
                {t("form.testParams.title")}
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.subject.label")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("form.subject.placeholder")}
                          {...field}
                        />
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
                        <Input
                          placeholder={t("form.topic.placeholder")}
                          {...field}
                        />
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={t("form.ageRange.placeholder")}
                            />
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
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

              <FormField
                control={form.control}
                name="question_format"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.questionFormat.label")}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={t("form.questionFormat.placeholder")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value={TestParamsQuestionFormat.multiple_choice}
                          >
                            {t("form.questionFormat.options.multipleChoice")}
                          </SelectItem>
                          <SelectItem
                            value={TestParamsQuestionFormat.single_choice}
                          >
                            {t("form.questionFormat.options.singleChoice")}
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
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
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
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                {t("buttons.cancel")}
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? t("buttons.saving")
                  : isEditing
                    ? t("buttons.updateTest")
                    : t("buttons.addTest")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
