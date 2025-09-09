import { Group } from "@/lib/api/generated/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const createGroupSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    name: z.string().min(1, t("nameRequired")).max(100, t("nameTooLong")),
    studentIds: z.array(z.string()),
  });

export type GroupFormData = {
  name: string;
  studentIds: string[];
};

export function useGroupForm(group?: Group) {
  const tValidation = useTranslations("Dashboard.groups.dialog.validation");
  const groupSchema = React.useMemo(
    () => createGroupSchema(tValidation),
    [tValidation],
  );

  return useForm<GroupFormData>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: group?.name || "",
      studentIds: [],
    },
  });
}
