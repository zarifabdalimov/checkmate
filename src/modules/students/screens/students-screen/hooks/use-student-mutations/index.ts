import {
  getGetStudentsQueryOptions,
  useDeleteApiV1StudentsStudentId,
  usePatchApiV1StudentsStudentId,
  usePostApiV1Students,
} from "@/lib/api/generated/aPIForCheckmateApp";
import { TEMP_ENTITY_ID } from "@/lib/constants/cache";
import { queryClient } from "@/providers/query-provider";
import { toast } from "sonner";

export function useStudentMutations() {
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
        toast.error("Failed to add student");

        queryClient.setQueryData(
          getGetStudentsQueryOptions().queryKey,
          context?.previousStudents ?? [],
        );
      },
      onSuccess: async (newUser) => {
        toast.success(`Student ${newUser.name} added successfully`);

        await queryClient.invalidateQueries({
          queryKey: getGetStudentsQueryOptions().queryKey,
        });
      },
    },
  });
  const deleteStudentMutation = useDeleteApiV1StudentsStudentId({
    mutation: {
      onMutate: (variables) => {
        toast.success("Student deleted successfully");

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
        toast.error("Failed to delete student");

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
        toast.error("Failed to update student");

        queryClient.setQueryData(
          getGetStudentsQueryOptions().queryKey,
          context?.previousStudents ?? [],
        );
      },
      onSuccess: async (updatedStudent) => {
        toast.success(`Student ${updatedStudent.name} updated successfully`);

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
