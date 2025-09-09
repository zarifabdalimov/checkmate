import { Group } from "@/lib/api/generated/model";
import { TEMP_ENTITY_ID } from "@/lib/constants/cache";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

interface UseGroupsTableProps {
  data: Group[];
  onEditGroup?: (group: Group) => void;
  onDeleteGroup?: (group: Group) => void;
}

const columnHelper = createColumnHelper<Group>();

export function useGroupsTable({
  data,
  onEditGroup,
  onDeleteGroup,
}: UseGroupsTableProps) {
  const t = useTranslations("Dashboard.groups.table");

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("name", {
        header: t("columns.name"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: "actions",
        header: t("columns.actions"),
        cell: (info) =>
          info.row.original.id === TEMP_ENTITY_ID ? null : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEditGroup?.(info.row.original)}
                className="p-1 hover:bg-muted rounded transition-colors"
                title={t("actions.editTooltip")}
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDeleteGroup?.(info.row.original)}
                className="p-1 hover:bg-muted rounded transition-colors text-destructive hover:text-destructive"
                title={t("actions.deleteTooltip")}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ),
      }),
    ],
    [onEditGroup, onDeleteGroup, t],
  );

  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
}
