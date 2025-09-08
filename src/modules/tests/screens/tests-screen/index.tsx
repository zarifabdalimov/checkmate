"use client";

import { Button } from "@/modules/ui/button";
import { EmptyState } from "@/modules/components/empty-state";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useBoolean } from "usehooks-ts";
import {
  useGetApiV1Tests,
  usePostApiV1Tests,
  useDeleteApiV1TestsTestId,
  usePatchApiV1TestsTestId,
} from "@/lib/api/generated/aPIForCheckmateApp";
import { Test } from "@/lib/api/generated/model";
import { TestsTable } from "./parts/tests-table";
import { AddEditTestDialog } from "./parts/add-edit-test-dialog";
import { TestFormData } from "./parts/add-edit-test-dialog/hooks/use-test-form";

export function TestsScreen() {
  const testsQuery = useGetApiV1Tests();
  const addTestMutation = usePostApiV1Tests();
  const deleteTestMutation = useDeleteApiV1TestsTestId();
  const editTestMutation = usePatchApiV1TestsTestId();
  const isDialogOpen = useBoolean();
  const [editingTest, setEditingTest] = React.useState<Test | null>(null);
  const t = useTranslations("Dashboard.tests.screen");

  const handleAddTest = (testData: TestFormData) => {
    // const {
    //   name,
    //   description,
    //   subject,
    //   topic,
    //   student_age_range,
    //   difficulty_level,
    //   question_format,
    //   number_of_questions,
    //   time_per_question_in_minutes,
    // } = testData;
    //
    // const testParams = {
    //   subject,
    //   topic,
    //   student_age_range,
    //   difficultyt_level: difficulty_level, // Note: API has typo in field name
    //   question_format,
    //   number_of_questions,
    //   time_per_question_in_minutes,
    // };
    //
    // if (editingTest) {
    //   editTestMutation.mutate({
    //     testId: editingTest.id,
    //     data: {
    //       name,
    //       description,
    //       test_params: testParams,
    //     },
    //   });
    // } else {
    //   addTestMutation.mutate({
    //     data: {
    //       name,
    //       description,
    //       group_id: "", // This should be set based on current context
    //       test_params: testParams,
    //       content: [],
    //     },
    //   });
    // }
    // setEditingTest(null);
  };

  const handleEditTest = (test: Test) => {
    setEditingTest(test);
    isDialogOpen.setTrue();
  };

  const handleDeleteTest = (test: Test) => {
    deleteTestMutation.mutate({
      testId: test.id,
    });
  };

  const handleDialogClose = (open: boolean) => {
    isDialogOpen.setValue(open);
    if (!open) {
      setEditingTest(null);
    }
  };

  if (testsQuery.data?.length === 0) {
    return (
      <>
        <EmptyState
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
          test={editingTest}
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
        onEditTest={handleEditTest}
        onDeleteTest={handleDeleteTest}
      />
      <AddEditTestDialog
        open={isDialogOpen.value}
        onOpenChange={handleDialogClose}
        test={editingTest}
        onSubmit={handleAddTest}
      />
    </div>
  );
}
