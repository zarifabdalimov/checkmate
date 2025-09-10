"use client";

import { useGetApiV1Tests } from "@/lib/api/generated/aPIForCheckmateApp";
import { Test } from "@/lib/api/generated/model";
import { Button } from "@/modules/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useBoolean } from "usehooks-ts";
import { Status } from "../../../components/status";
import { useTestMutations } from "./hooks/use-test-mutations";
import { AddEditTestDialog } from "./parts/add-edit-test-dialog";
import { TestFormData } from "./parts/add-edit-test-dialog/hooks/use-test-form";
import { TestsTable } from "./parts/tests-table";

export function TestsScreen() {
  const testsQuery = useGetApiV1Tests();
  const { addTestMutation, deleteTestMutation } = useTestMutations();
  const isDialogOpen = useBoolean();
  const t = useTranslations("Dashboard.tests.screen");

  const handleAddTest = (data: TestFormData) => {
    addTestMutation.mutate({
      data: {
        name: data.name,
        description: data.description,
        group_id: data.group_id,
        test_params: {
          subject: data.subject,
          topic: data.topic,
          student_age_range: data.student_age_range,
          difficulty_level: data.difficulty_level,
          question_format: data.question_format,
          number_of_questions: data.number_of_questions,
          time_per_question_in_minutes: data.time_per_question_in_minutes,
        },
        scheduled_at: new Date().toISOString(),
      },
    });
  };

  const handleDeleteTest = (test: Test) => {
    deleteTestMutation.mutate({
      testId: test.id,
    });
  };

  const handleDialogClose = (open: boolean) => {
    isDialogOpen.setValue(open);
  };

  if (testsQuery.isLoading) {
    return <Status isLoading />;
  }

  if (testsQuery.isError) {
    return (
      <Status
        icon="alert-circle"
        title="Failed to load tests"
        description="There was an error loading your tests. Please try again."
      />
    );
  }

  if (testsQuery.data?.length === 0) {
    return (
      <>
        <Status
          icon="clipboard-list"
          title={t("emptyState.title")}
          description={t("emptyState.description")}
          cta={{
            label: t("emptyState.addFirstButton"),
            onClick: isDialogOpen.setTrue,
          }}
        />
        <AddEditTestDialog
          open={isDialogOpen.value}
          onOpenChange={handleDialogClose}
          onSubmit={handleAddTest}
        />
      </>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">{t("description")}</p>
        <Button onClick={isDialogOpen.setTrue} className="gap-2">
          <Plus className="h-4 w-4" />
          {t("addButton")}
        </Button>
      </div>
      <TestsTable
        data={testsQuery.data ?? []}
        onDeleteTest={handleDeleteTest}
      />
      <AddEditTestDialog
        open={isDialogOpen.value}
        onOpenChange={handleDialogClose}
        onSubmit={handleAddTest}
      />
    </div>
  );
}
