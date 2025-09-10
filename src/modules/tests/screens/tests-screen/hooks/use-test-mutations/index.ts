import {
  getGetApiV1TestsQueryOptions,
  useDeleteApiV1TestsTestId,
  usePatchApiV1TestsTestId,
  usePostApiV1Tests,
} from "@/lib/api/generated/aPIForCheckmateApp";
import { TEMP_ENTITY_ID } from "@/lib/constants/cache";
import { queryClient } from "@/modules/providers/query-provider";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function useTestMutations() {
  const t = useTranslations("Dashboard.mutations.tests");
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
        toast.error(t("add.error"));

        queryClient.setQueryData(
          getGetApiV1TestsQueryOptions().queryKey,
          context?.previousTests ?? [],
        );
      },
      onSuccess: async (newTest) => {
        toast.success(t("add.success", { name: newTest.name }));

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
        toast.error(t("delete.error"));

        queryClient.setQueryData(
          getGetApiV1TestsQueryOptions().queryKey,
          context?.previousTests ?? [],
        );
      },
      onSuccess: () => {
        toast.success(t("delete.success"));
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
        toast.error(t("edit.error"));

        queryClient.setQueryData(
          getGetApiV1TestsQueryOptions().queryKey,
          context?.previousTests ?? [],
        );
      },
      onSuccess: async (updatedTest) => {
        toast.success(t("edit.success", { name: updatedTest.name }));

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
