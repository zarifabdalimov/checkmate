import { ReactTable } from "@/modules/components/react-table";
import * as React from "react";
import { useStudentsTable } from "./hooks/use-students-table";
import { Student } from "@/lib/api/generated/model";

interface StudentsTableProps {
  data: Student[];
  onEditStudent?: (student: Student) => void;
  onDeleteStudent?: (student: Student) => void;
}

export function StudentsTable({
  data,
  onEditStudent,
  onDeleteStudent,
}: StudentsTableProps) {
  const table = useStudentsTable({
    data,
    onEditStudent,
    onDeleteStudent,
  });

  return <ReactTable table={table} />;
}
