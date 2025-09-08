"use client";

import {
  useDeleteApiV1GroupsGroupId,
  useGetApiV1Groups,
  usePatchApiV1GroupsGroupId,
  usePostApiV1Groups,
} from "@/lib/api/generated/aPIForCheckmateApp";
import { Group } from "@/lib/api/generated/model";
import { EmptyState } from "@/modules/components/empty-state";
import { Button } from "@/modules/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useBoolean } from "usehooks-ts";
import { AddEditGroupDialog } from "./parts/add-edit-group-dialog";
import { GroupsTable } from "./parts/groups-table";

export function GroupsScreen() {
  const groupsQuery = useGetApiV1Groups();
  const isDialogOpen = useBoolean();
  const [editingGroup, setEditingGroup] = React.useState<Group | null>(null);
  const addGroupMutation = usePostApiV1Groups();
  const deleteGroupMutation = useDeleteApiV1GroupsGroupId();
  const editGroupMutation = usePatchApiV1GroupsGroupId();
  const t = useTranslations("Dashboard.groups.screen");

  const handleAddGroup = (
    groupData: Omit<Group, "id" | "created_at" | "updated_at">,
  ) => {
    if (editingGroup) {
      editGroupMutation.mutate({
        groupId: editingGroup.id,
        data: groupData,
      });
    } else {
      addGroupMutation.mutate({
        data: groupData,
      });
    }
    setEditingGroup(null);
  };

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group);
    isDialogOpen.setTrue();
  };

  const handleDeleteGroup = (group: Group) => {
    deleteGroupMutation.mutate({
      groupId: group.id,
    });
  };

  const handleDialogClose = (open: boolean) => {
    isDialogOpen.setValue(open);
    if (!open) {
      setEditingGroup(null);
    }
  };

  if (groupsQuery.data?.length === 0) {
    return (
      <>
        <EmptyState
          icon="users"
          title={t("emptyState.title")}
          description={t("emptyState.description")}
          cta={{
            label: t("emptyState.addFirstButton"),
            onClick: isDialogOpen.setTrue,
          }}
        />
        <AddEditGroupDialog
          open={isDialogOpen.value}
          onOpenChange={handleDialogClose}
          group={editingGroup}
          onSubmit={handleAddGroup}
        />
      </>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">{t("description")}</p>
        <Button onClick={isDialogOpen.setTrue} className="gap-2">
          <Plus className="h-4 w-4" />
          {t("addButton")}
        </Button>
      </div>
      <GroupsTable
        data={groupsQuery.data ?? []}
        onEditGroup={handleEditGroup}
        onDeleteGroup={handleDeleteGroup}
      />
      <AddEditGroupDialog
        open={isDialogOpen.value}
        onOpenChange={handleDialogClose}
        group={editingGroup}
        onSubmit={handleAddGroup}
      />
    </div>
  );
}
