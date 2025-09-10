"use client";

import { Test, TestParamsQuestionFormat } from "@/lib/api/generated/model";
import { BasicInfoStep } from "@/modules/tests/screens/tests-screen/parts/add-edit-test-dialog/parts/basic-info-step";
import { ParametersStep } from "@/modules/tests/screens/tests-screen/parts/add-edit-test-dialog/parts/parameters-step";
import { ProgressSteps } from "@/modules/tests/screens/tests-screen/parts/add-edit-test-dialog/parts/progress-steps";
import { QuestionsStep } from "@/modules/tests/screens/tests-screen/parts/add-edit-test-dialog/parts/questions-step";
import { Button } from "@/modules/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/modules/ui/dialog";
import { Form } from "@/modules/ui/form";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Step, useMultiStep } from "./hooks/use-multi-step";
import { TestFormData, useTestForm } from "./hooks/use-test-form";

interface AddEditTestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TestFormData) => void;
}

export function AddEditTestDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddEditTestDialogProps) {
  const t = useTranslations("Dashboard.tests.dialog");
  const form = useTestForm();

  const steps: Step[] = [
    {
      id: "basic",
      title: t("steps.basic.title"),
      description: t("steps.basic.description"),
    },
    {
      id: "parameters",
      title: t("steps.parameters.title"),
      description: t("steps.parameters.description"),
    },
    {
      id: "questions",
      title: t("steps.questions.title"),
      description: t("steps.questions.description"),
    },
  ];

  const {
    currentStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goToNext,
    goToPrevious,
    reset,
  } = useMultiStep(steps);

  useEffect(() => {
    if (open) {
      reset();
      form.reset({
        name: "",
        description: "",
        group_id: "",
        subject: "",
        topic: "",
        student_age_range: "",
        difficulty_level: "",
        question_format: TestParamsQuestionFormat.single_choice,
        number_of_questions: 10,
        time_per_question_in_minutes: 2,
      });
    }
  }, [open, form, reset]);

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      goToNext();
    }
  };

  const handleSubmit = (data: TestFormData) => {
    onSubmit(data);
    onOpenChange(false);
    form.reset();
    reset();
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
    reset();
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    const fieldsToValidate = getFieldsForStep(currentStepIndex);
    return await form.trigger(fieldsToValidate);
  };

  const getFieldsForStep = (stepIndex: number): (keyof TestFormData)[] => {
    switch (stepIndex) {
      case 0:
        return ["name", "description", "group_id"];
      case 1:
        return ["subject", "topic", "student_age_range", "difficulty_level"];
      case 2:
        return [
          "question_format",
          "number_of_questions",
          "time_per_question_in_minutes",
        ];
      default:
        return [];
    }
  };

  const renderStepContent = () => {
    switch (currentStepIndex) {
      case 0:
        return <BasicInfoStep />;
      case 1:
        return <ParametersStep />;
      case 2:
        return <QuestionsStep />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("add.title")}</DialogTitle>
          <DialogDescription>{currentStep.description}</DialogDescription>
        </DialogHeader>

        <div className="py-3">
          <ProgressSteps steps={steps} currentStepIndex={currentStepIndex} />
        </div>

        <FormProvider {...form}>
          <Form {...form}>
            <form className="space-y-4">
              <div>{renderStepContent()}</div>

              <DialogFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    {t("buttons.cancel")}
                  </Button>
                  {!isFirstStep && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goToPrevious}
                    >
                      {t("buttons.previous")}
                    </Button>
                  )}
                </div>

                <div className="flex gap-2">
                  {!isLastStep ? (
                    <Button type="button" onClick={handleNext}>
                      {t("buttons.next")}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={form.handleSubmit(handleSubmit)}
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting
                        ? t("buttons.saving")
                        : t("buttons.addTest")}
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </form>
          </Form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
