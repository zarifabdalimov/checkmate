import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import * as React from "react";
import { useTranslations } from "next-intl";
import { Test } from "@/lib/api/generated/model";

interface UseTestsTableProps {
  data: Test[];
  onEditTest?: (test: Test) => void;
  onDeleteTest?: (test: Test) => void;
}

const columnHelper = createColumnHelper<Test>();

export function useTestsTable({
  data,
  onEditTest,
  onDeleteTest,
}: UseTestsTableProps) {
  const t = useTranslations("Dashboard.tests.table");

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("name", {
        header: t("columns.name"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: "actions",
        header: t("columns.actions"),
        cell: (info) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onEditTest) {
                  onEditTest(info.row.original);
                } else {
                  console.log("Edit test:", info.row.original);
                }
              }}
              className="p-1 hover:bg-muted rounded transition-colors"
              title={t("actions.editTooltip")}
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                if (onDeleteTest) {
                  onDeleteTest(info.row.original);
                } else {
                  console.log("Delete test:", info.row.original);
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
    [onEditTest, onDeleteTest, t],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return table;
}
