import { Test } from "@/lib/api/generated/model";
import { Button } from "@/modules/ui/button";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
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
      columnHelper.display({
        id: "actions",
        header: t("columns.actions"),
        cell: (info) => (
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onDeleteTest?.(info.row.original)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
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
