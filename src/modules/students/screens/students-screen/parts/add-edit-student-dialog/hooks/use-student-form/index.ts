import { Student } from "@/lib/api/generated/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const createStudentSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    name: z.string().min(1, t("nameRequired")).max(100, t("nameTooLong")),
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
    phone: z
      .string()
      .min(1, t("phoneRequired"))
      .regex(/^[\+]?[1-9][\d]{0,15}$/, t("phoneInvalid")),
  });

export type StudentFormData = {
  name: string;
  email: string;
  phone: string;
};

export function useStudentForm(student?: Student) {
  const tValidation = useTranslations("Dashboard.students.dialog.validation");
  const studentSchema = React.useMemo(
    () => createStudentSchema(tValidation),
    [tValidation],
  );

  return useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: student?.name || "",
      email: student?.email || "",
      phone: student?.phone || "",
    },
  });
}
