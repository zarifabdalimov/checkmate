import {
  getGetApiV1GroupsQueryOptions,
  useDeleteApiV1GroupsGroupId,
  usePatchApiV1GroupsGroupId,
  usePostApiV1Groups,
} from "@/lib/api/generated/aPIForCheckmateApp";
import { TEMP_ENTITY_ID } from "@/lib/constants/cache";
import { queryClient } from "@/modules/providers/query-provider";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function useGroupMutations() {
  const t = useTranslations("Dashboard.mutations.groups");
  const addGroupMutation = usePostApiV1Groups({
    mutation: {
      onMutate: (variables) => {
        const previousGroups =
          queryClient.getQueryData(getGetApiV1GroupsQueryOptions().queryKey) ??
          [];

        queryClient.setQueryData(getGetApiV1GroupsQueryOptions().queryKey, [
          {
            ...variables.data,
            id: TEMP_ENTITY_ID,
            created_at: "",
            updated_at: "",
          },
          ...previousGroups,
        ]);

        return { previousGroups };
      },
      onError: (_, __, context) => {
        toast.error(t("add.error"));

        queryClient.setQueryData(
          getGetApiV1GroupsQueryOptions().queryKey,
          context?.previousGroups ?? [],
        );
      },
      onSuccess: async (newGroup) => {
        toast.success(t("add.success", { name: newGroup.name }));

        await queryClient.invalidateQueries({
          queryKey: getGetApiV1GroupsQueryOptions().queryKey,
        });
      },
    },
  });

  const deleteGroupMutation = useDeleteApiV1GroupsGroupId({
    mutation: {
      onMutate: (variables) => {
        const previousGroups =
          queryClient.getQueryData(getGetApiV1GroupsQueryOptions().queryKey) ??
          [];

        queryClient.setQueryData(
          getGetApiV1GroupsQueryOptions().queryKey,
          previousGroups.filter((group) => variables.groupId !== group.id),
        );

        return { previousGroups };
      },
      onError: (_, __, context) => {
        toast.error(t("delete.error"));

        queryClient.setQueryData(
          getGetApiV1GroupsQueryOptions().queryKey,
          context?.previousGroups ?? [],
        );
      },
      onSuccess: () => {
        toast.success(t("delete.success"));
      },
    },
  });

  const editGroupMutation = usePatchApiV1GroupsGroupId({
    mutation: {
      onMutate: (variables) => {
        const previousGroups =
          queryClient.getQueryData(getGetApiV1GroupsQueryOptions().queryKey) ??
          [];

        queryClient.setQueryData(
          getGetApiV1GroupsQueryOptions().queryKey,
          previousGroups.map((group) =>
            group.id === variables.groupId
              ? { ...group, ...variables.data }
              : group,
          ),
        );

        return { previousGroups };
      },
      onError: (_, __, context) => {
        toast.error(t("edit.error"));

        queryClient.setQueryData(
          getGetApiV1GroupsQueryOptions().queryKey,
          context?.previousGroups ?? [],
        );
      },
      onSuccess: async (updatedGroup) => {
        toast.success(t("edit.success", { name: updatedGroup.name }));

        await queryClient.invalidateQueries({
          queryKey: getGetApiV1GroupsQueryOptions().queryKey,
        });
      },
    },
  });

  return {
    addGroupMutation,
    deleteGroupMutation,
    editGroupMutation,
  };
}
