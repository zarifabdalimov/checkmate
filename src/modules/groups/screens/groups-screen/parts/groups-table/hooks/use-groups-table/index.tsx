import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import * as React from "react";
import { useTranslations } from "next-intl";
import { Group } from "@/lib/api/generated/model";

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
      columnHelper.accessor("id", {
        header: t("columns.id"),
        cell: (info) => info.getValue(),
      }),
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
                if (onEditGroup) {
                  onEditGroup(info.row.original);
                } else {
                  console.log("Edit group:", info.row.original);
                }
              }}
              className="p-1 hover:bg-muted rounded transition-colors"
              title={t("actions.editTooltip")}
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                if (onDeleteGroup) {
                  onDeleteGroup(info.row.original);
                } else {
                  console.log("Delete group:", info.row.original);
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
    [onEditGroup, onDeleteGroup, t],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return table;
}
