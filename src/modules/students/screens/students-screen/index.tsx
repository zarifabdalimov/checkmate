"use client";

import { useGetStudents } from '@/lib/api/generated/aPIForCheckmateApp'
import { EmptyState } from "@/modules/components/empty-state";
import { Button } from "@/modules/ui/button";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useBoolean } from "usehooks-ts";
import { AddEditStudentDialog } from "./parts/add-edit-student-dialog";
import { StudentsTable } from "./parts/students-table";
import { Student } from "@/lib/api/generated/model";



export function StudentsScreen() {
  const studentsQuery = useGetStudents();
  const isDialogOpen = useBoolean();
  const [editingStudent, setEditingStudent] = React.useState<Student | null>(
    null,
  );
  const t = useTranslations("Dashboard.students.screen");

  const handleAddStudent = (studentData: {
    name: string;
    email: string;
    phone: string;
  }) => {
    if (editingStudent) {
      // TODO: Implement actual edit student logic
      console.log("Editing student:", { ...editingStudent, ...studentData });
    } else {
      // TODO: Implement actual add student logic
      console.log("Adding student:", studentData);
    }
    // Clear editing state
    setEditingStudent(null);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    isDialogOpen.setTrue();
  };

  const handleDeleteStudent = (student: Student) => {
    // TODO: Implement actual delete student logic
    console.log("Deleting student:", student);
  };

  const handleDialogClose = (open: boolean) => {
    isDialogOpen.setValue(open);
    if (!open) {
      setEditingStudent(null);
    }
  };

  if (studentsQuery.data?.length === 0) {
    return (
      <>
        <EmptyState
          icon="users"
          title={t("emptyState.title")}
          description={t("emptyState.description")}
          cta={{
            label: t("emptyState.addFirstButton"),
            onClick: isDialogOpen.setTrue,
          }}
        />
        <AddEditStudentDialog
          open={isDialogOpen.value}
          onOpenChange={handleDialogClose}
          student={editingStudent}
          onSubmit={handleAddStudent}
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
      <StudentsTable
        data={studentsQuery.data ?? []}
        onEditStudent={handleEditStudent}
        onDeleteStudent={handleDeleteStudent}
      />
      <AddEditStudentDialog
        open={isDialogOpen.value}
        onOpenChange={handleDialogClose}
        student={editingStudent}
        onSubmit={handleAddStudent}
      />
    </div>
  );
}
