import { TEMP_ENTITY_ID } from "@/lib/constants/cache";
import { Button } from "@/modules/ui/button";
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
              <Button
                size="icon"
                variant="outline"
                onClick={() => onEditStudent?.(info.row.original)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => onDeleteStudent?.(info.row.original)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
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
