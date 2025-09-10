import { Student } from "@/lib/api/generated/model";
import { TEMP_ENTITY_ID } from "@/lib/constants/cache";
import { TableDeleteAction, TableEditAction } from "@/modules/ui/table";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import * as React from "react";

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
        cell: (info) =>
          info.row.original.id === TEMP_ENTITY_ID ? null : (
            <div className="flex items-center gap-2">
              <TableEditAction
                onClick={() => onEditStudent?.(info.row.original)}
              />
              <TableDeleteAction
                onClick={() => onDeleteStudent?.(info.row.original)}
              />
            </div>
          ),
      }),
    ],
    [onEditStudent, onDeleteStudent, t],
  );

  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
}
