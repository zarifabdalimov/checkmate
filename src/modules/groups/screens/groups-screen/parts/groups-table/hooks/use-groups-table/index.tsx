import { Group } from "@/lib/api/generated/model";
import { TEMP_ENTITY_ID } from "@/lib/constants/cache";
import { TableDeleteAction, TableEditAction } from "@/modules/ui/table";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
      columnHelper.accessor("student_ids", {
        header: t("columns.studentsCount"),
        cell: (info) => info.getValue()?.length ?? 0,
      }),
      columnHelper.display({
        id: "actions",
        header: t("columns.actions"),
        cell: (info) =>
          info.row.original.id === TEMP_ENTITY_ID ? null : (
            <div className="flex items-center gap-2">
              <TableEditAction
                onClick={() => onEditGroup?.(info.row.original)}
              />
              <TableDeleteAction
                onClick={() => onDeleteGroup?.(info.row.original)}
              />
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
