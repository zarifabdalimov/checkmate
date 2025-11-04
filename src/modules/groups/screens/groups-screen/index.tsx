"use client";

import { useGetApiV1Groups } from "@/lib/api/generated/aPIForCheckmateApp";
import { Group } from "@/lib/api/generated/model";
import { Button } from "@/modules/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useBoolean } from "usehooks-ts";
import { Status } from "../../../components/status";
import { useGroupMutations } from "./hooks/use-group-mutations";
import { AddEditGroupDialog } from "./parts/add-edit-group-dialog";
import { GroupFormData } from "./parts/add-edit-group-dialog/hooks/use-group-form";
import { GroupsTable } from "./parts/groups-table";

export function GroupsScreen() {
  const groupsQuery = useGetApiV1Groups();
  const { addGroupMutation, deleteGroupMutation, editGroupMutation } =
    useGroupMutations();
  const isDialogOpen = useBoolean();
  const [editingGroup, setEditingGroup] = React.useState<Group | null>(null);
  const t = useTranslations("Dashboard.groups.screen");

  const handleAddGroup = (groupData: GroupFormData) => {
    if (editingGroup) {
      // Update uses students_ids (note the 's')
      editGroupMutation.mutate({
        groupId: editingGroup.id,
        data: {
          name: groupData.name,
          student_ids: groupData.studentIds,
        },
      });
    } else {
      // Create uses student_ids (no 's')
      addGroupMutation.mutate({
        data: {
          name: groupData.name,
          student_ids: groupData.studentIds,
        },
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

  if (groupsQuery.isLoading) {
    return <Status isLoading />;
  }

  if (groupsQuery.isError) {
    return (
      <Status
        icon="alert-circle"
        title="Failed to load groups"
        description="There was an error loading your groups. Please try again."
      />
    );
  }

  if (groupsQuery.data?.length === 0) {
    return (
      <>
        <Status
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
