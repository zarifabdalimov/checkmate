"use client";

import { useGetStudents } from "@/lib/api/generated/aPIForCheckmateApp";
import { Student } from "@/lib/api/generated/model";
import { Button } from "@/modules/ui/button";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useBoolean } from "usehooks-ts";
import { Status } from "../../../components/status";
import { useStudentMutations } from "./hooks/use-student-mutations";
import { AddEditStudentDialog } from "./parts/add-edit-student-dialog";
import { StudentsTable } from "./parts/students-table";

export function StudentsScreen() {
  const studentsQuery = useGetStudents();
  const { addStudentMutation, deleteStudentMutation, editStudentMutation } =
    useStudentMutations();
  const isDialogOpen = useBoolean();
  const [editingStudent, setEditingStudent] = React.useState<Student | null>(
    null,
  );
  const t = useTranslations("Dashboard.students.screen");

  const handleAddStudent = (
    studentData: Omit<Student, "id" | "created_at" | "updated_at">,
  ) => {
    if (editingStudent) {
      editStudentMutation.mutate({
        studentId: editingStudent.id,
        data: studentData,
      });
    } else {
      addStudentMutation.mutate({
        data: studentData,
      });
    }
    setEditingStudent(null);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    isDialogOpen.setTrue();
  };

  const handleDeleteStudent = (student: Student) => {
    deleteStudentMutation.mutate({
      studentId: student.id,
    });
  };

  const handleDialogClose = (open: boolean) => {
    isDialogOpen.setValue(open);
    if (!open) {
      setEditingStudent(null);
    }
  };

  if (studentsQuery.isLoading) {
    return <Status isLoading />;
  }

  if (studentsQuery.isError) {
    return (
      <Status
        icon="alert-circle"
        title="Failed to load students"
        description="There was an error loading your students. Please try again."
      />
    );
  }

  if (studentsQuery.data?.length === 0) {
    return (
      <>
        <Status
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
