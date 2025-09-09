import {
  getGetApiV1GroupsQueryOptions,
  useDeleteApiV1GroupsGroupId,
  usePatchApiV1GroupsGroupId,
  usePostApiV1Groups,
} from "@/lib/api/generated/aPIForCheckmateApp";
import { queryClient } from "@/providers/query-provider";
import { toast } from "sonner";

export function useGroupMutations() {
  const addGroupMutation = usePostApiV1Groups({
    mutation: {
      onMutate: (variables) => {
        const previousGroups =
          queryClient.getQueryData(getGetApiV1GroupsQueryOptions().queryKey) ??
          [];

        queryClient.setQueryData(getGetApiV1GroupsQueryOptions().queryKey, [
          {
            ...variables.data,
            id: "-1",
            created_at: "",
            updated_at: "",
          },
          ...previousGroups,
        ]);

        return { previousGroups };
      },
      onError: (_, __, context) => {
        toast.error("Failed to add group");

        queryClient.setQueryData(
          getGetApiV1GroupsQueryOptions().queryKey,
          context?.previousGroups ?? [],
        );
      },
      onSuccess: async (newGroup) => {
        toast.success(`Group ${newGroup.name} added successfully`);

        await queryClient.invalidateQueries({
          queryKey: getGetApiV1GroupsQueryOptions().queryKey,
        });
      },
    },
  });

  const deleteGroupMutation = useDeleteApiV1GroupsGroupId({
    mutation: {
      onMutate: (variables) => {
        toast.success("Group deleted successfully");

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
        toast.error("Failed to delete group");

        queryClient.setQueryData(
          getGetApiV1GroupsQueryOptions().queryKey,
          context?.previousGroups ?? [],
        );
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
        toast.error("Failed to update group");

        queryClient.setQueryData(
          getGetApiV1GroupsQueryOptions().queryKey,
          context?.previousGroups ?? [],
        );
      },
      onSuccess: async (updatedGroup) => {
        toast.success(`Group ${updatedGroup.name} updated successfully`);

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
