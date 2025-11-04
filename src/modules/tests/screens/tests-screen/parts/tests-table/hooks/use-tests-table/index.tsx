import { Link } from "@/i18n/navigation";
import { Test } from "@/lib/api/generated/model";
import { TEMP_ENTITY_ID } from "@/lib/constants/cache";
import { TableDeleteAction, TableExternalLinkAction } from "@/modules/ui/table";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import * as React from "react";

interface UseTestsTableProps {
  data: Test[];
  onDeleteTest?: (test: Test) => void;
}

const columnHelper = createColumnHelper<Test>();

export function useTestsTable({ data, onDeleteTest }: UseTestsTableProps) {
  const t = useTranslations("Dashboard.tests.table");

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("name", {
        header: t("columns.name"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("test_params.subject", {
        header: t("columns.subject"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("test_params.topic", {
        header: t("columns.topic"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("test_params.student_age_range", {
        header: t("columns.studentAgeRange"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("test_params.difficulty_level", {
        header: t("columns.difficultyLevel"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: "actions",
        header: t("columns.actions"),
        cell: (info) =>
          info.row.original.id === TEMP_ENTITY_ID ? null : (
            <div className="flex items-center gap-2">
              <Link href={`/dashboard/tests/${info.row.original.id}`}>
                <TableExternalLinkAction />
              </Link>
              <TableDeleteAction
                onClick={() => onDeleteTest?.(info.row.original)}
              />
            </div>
          ),
      }),
    ],
    [onDeleteTest, t],
  );

  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
}
