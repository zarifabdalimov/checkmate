import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import * as React from "react";
import { useTranslations } from "next-intl";
import { Student } from "@/lib/api/generated/model";

interface UseStudentsTableProps {
  data: Student[];
  onEditStudent?: (student: Student) => void;
  onDeleteStudent?: (student: Student) => void;
}

const columnHelper = createColumnHelper<Student>();

export function useStudentsTable({
  data,
  onEditStudent,
  onDeleteStudent,
}: UseStudentsTableProps) {
  const t = useTranslations("Dashboard.students.table");

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("id", {
        header: t("columns.id"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("name", {
        header: t("columns.name"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("email", {
        header: t("columns.email"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: "actions",
        header: t("columns.actions"),
        cell: (info) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onEditStudent) {
                  onEditStudent(info.row.original);
                } else {
                  console.log("Edit student:", info.row.original);
                }
              }}
              className="p-1 hover:bg-muted rounded transition-colors"
              title={t("actions.editTooltip")}
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                if (onDeleteStudent) {
                  onDeleteStudent(info.row.original);
                } else {
                  console.log("Delete student:", info.row.original);
                }
              }}
              className="p-1 hover:bg-muted rounded transition-colors text-destructive hover:text-destructive"
              title={t("actions.deleteTooltip")}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ),
      }),
    ],
    [onEditStudent, onDeleteStudent, t],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return table;
}
