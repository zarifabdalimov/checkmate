import { Group } from "@/lib/api/generated/model";
import { ReactTable } from "@/modules/components/react-table";
import * as React from "react";
import { useGroupsTable } from "./hooks/use-groups-table";

interface GroupsTableProps {
  data: Group[];
  onEditGroup?: (group: Group) => void;
  onDeleteGroup?: (group: Group) => void;
}

export function GroupsTable({
  data,
  onEditGroup,
  onDeleteGroup,
}: GroupsTableProps) {
  const table = useGroupsTable({
    data,
    onEditGroup,
    onDeleteGroup,
  });

  return <ReactTable table={table} />;
}
