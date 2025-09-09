import {
  getGetApiV1TestsQueryOptions,
  useDeleteApiV1TestsTestId,
  usePatchApiV1TestsTestId,
  usePostApiV1Tests,
} from "@/lib/api/generated/aPIForCheckmateApp";
import { TEMP_ENTITY_ID } from "@/lib/constants/cache";
import { queryClient } from "@/providers/query-provider";
import { toast } from "sonner";

export function useTestMutations() {
  const addTestMutation = usePostApiV1Tests({
    mutation: {
      onMutate: (variables) => {
        const previousTests =
          queryClient.getQueryData(getGetApiV1TestsQueryOptions().queryKey) ??
          [];

        queryClient.setQueryData(getGetApiV1TestsQueryOptions().queryKey, [
          {
            ...variables.data,
            id: TEMP_ENTITY_ID,
            created_at: "",
            updated_at: "",
            status: "draft",
            content: [],
          },
          ...previousTests,
        ]);

        return { previousTests };
      },
      onError: (_, __, context) => {
        toast.error("Failed to add test");

        queryClient.setQueryData(
          getGetApiV1TestsQueryOptions().queryKey,
          context?.previousTests ?? [],
        );
      },
      onSuccess: async (newTest) => {
        toast.success(`Test ${newTest.name} added successfully`);

        await queryClient.invalidateQueries({
          queryKey: getGetApiV1TestsQueryOptions().queryKey,
        });
      },
    },
  });

  const deleteTestMutation = useDeleteApiV1TestsTestId({
    mutation: {
      onMutate: (variables) => {
        const previousTests =
          queryClient.getQueryData(getGetApiV1TestsQueryOptions().queryKey) ??
          [];

        queryClient.setQueryData(
          getGetApiV1TestsQueryOptions().queryKey,
          previousTests.filter((test) => variables.testId !== test.id),
        );

        return { previousTests };
      },
      onError: (_, __, context) => {
        toast.error("Failed to delete test");

        queryClient.setQueryData(
          getGetApiV1TestsQueryOptions().queryKey,
          context?.previousTests ?? [],
        );
      },
      onSuccess: () => {
        toast.success("Test deleted successfully");
      },
    },
  });

  const editTestMutation = usePatchApiV1TestsTestId({
    mutation: {
      onMutate: (variables) => {
        const previousTests =
          queryClient.getQueryData(getGetApiV1TestsQueryOptions().queryKey) ??
          [];

        queryClient.setQueryData(
          getGetApiV1TestsQueryOptions().queryKey,
          previousTests.map((test) =>
            test.id === variables.testId
              ? { ...test, ...variables.data }
              : test,
          ),
        );

        return { previousTests };
      },
      onError: (_, __, context) => {
        toast.error("Failed to update test");

        queryClient.setQueryData(
          getGetApiV1TestsQueryOptions().queryKey,
          context?.previousTests ?? [],
        );
      },
      onSuccess: async (updatedTest) => {
        toast.success(`Test ${updatedTest.name} updated successfully`);

        await queryClient.invalidateQueries({
          queryKey: getGetApiV1TestsQueryOptions().queryKey,
        });
      },
    },
  });

  return {
    addTestMutation,
    deleteTestMutation,
    editTestMutation,
  };
}
