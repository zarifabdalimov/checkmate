import {
  getGetStudentsQueryOptions,
  useDeleteApiV1StudentsStudentId,
  usePatchApiV1StudentsStudentId,
  usePostApiV1Students,
} from "@/lib/api/generated/aPIForCheckmateApp";
import { TEMP_ENTITY_ID } from "@/lib/constants/cache";
import { queryClient } from "@/modules/providers/query-provider";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useStudentMutations() {
  const t = useTranslations("Dashboard.mutations.students");
  const addStudentMutation = usePostApiV1Students({
    mutation: {
      onMutate: (variables) => {
        const previousStudents =
          queryClient.getQueryData(getGetStudentsQueryOptions().queryKey) ?? [];

        queryClient.setQueryData(getGetStudentsQueryOptions().queryKey, [
          {
            ...variables.data,
            id: TEMP_ENTITY_ID,
            created_at: "",
            updated_at: "",
          },
          ...previousStudents,
        ]);

        return { previousStudents };
      },
      onError: (_, __, context) => {
        toast.error(t("add.error"));

        queryClient.setQueryData(
          getGetStudentsQueryOptions().queryKey,
          context?.previousStudents ?? [],
        );
      },
      onSuccess: async (newUser) => {
        toast.success(t("add.success", { name: newUser.name }));

        await queryClient.invalidateQueries({
          queryKey: getGetStudentsQueryOptions().queryKey,
        });
      },
    },
  });
  const deleteStudentMutation = useDeleteApiV1StudentsStudentId({
    mutation: {
      onMutate: (variables) => {
        toast.success(t("delete.success"));

        const previousStudents =
          queryClient.getQueryData(getGetStudentsQueryOptions().queryKey) ?? [];

        queryClient.setQueryData(
          getGetStudentsQueryOptions().queryKey,
          previousStudents.filter(
            (student) => variables.studentId !== student.id,
          ),
        );

        return { previousStudents };
      },
      onError: (_, __, context) => {
        toast.error(t("delete.error"));

        queryClient.setQueryData(
          getGetStudentsQueryOptions().queryKey,
          context?.previousStudents ?? [],
        );
      },
    },
  });
  const editStudentMutation = usePatchApiV1StudentsStudentId({
    mutation: {
      onMutate: (variables) => {
        const previousStudents =
          queryClient.getQueryData(getGetStudentsQueryOptions().queryKey) ?? [];

        queryClient.setQueryData(
          getGetStudentsQueryOptions().queryKey,
          previousStudents.map((student) =>
            student.id === variables.studentId
              ? { ...student, ...variables.data }
              : student,
          ),
        );

        return { previousStudents };
      },
      onError: (_, __, context) => {
        toast.error(t("edit.error"));

        queryClient.setQueryData(
          getGetStudentsQueryOptions().queryKey,
          context?.previousStudents ?? [],
        );
      },
      onSuccess: async (updatedStudent) => {
        toast.success(t("edit.success", { name: updatedStudent.name }));

        await queryClient.invalidateQueries({
          queryKey: getGetStudentsQueryOptions().queryKey,
        });
      },
    },
  });

  return {
    addStudentMutation,
    deleteStudentMutation,
    editStudentMutation,
  };
}
