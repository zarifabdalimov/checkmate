"use client";

import {
  getGetApiV1TestsTestIdQueryOptions,
  usePostApiV1TestsTestIdComplete,
} from "@/lib/api/generated/aPIForCheckmateApp";
import { TestStatus } from "@/lib/api/generated/model";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/modules/ui/alert-dialog";
import { Button } from "@/modules/ui/button";
import { queryClient } from "@/modules/providers/query-provider";
import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useBoolean } from "usehooks-ts";

interface LockTestButtonProps {
  testId: string;
  disabled?: boolean;
}

export function LockTestButton({ testId, disabled }: LockTestButtonProps) {
  const t = useTranslations("Dashboard.tests.dialog");
  const tMutations = useTranslations("Dashboard.mutations.tests");
  const isLockDialogOpen = useBoolean();
  const lockTest = usePostApiV1TestsTestIdComplete();

  const handleLockTest = () => {
    lockTest.mutate(
      { testId },
      {
        onSuccess: () => {
          toast.success(tMutations("lock.success"));

          queryClient.setQueryData(
            getGetApiV1TestsTestIdQueryOptions(testId).queryKey,
            (test) => {
              if (!test) {
                return test;
              }

              return {
                ...test,
                status: TestStatus.completed,
              };
            },
          );
        },
        onError: () => {
          toast.error(tMutations("lock.error"));
        },
        onSettled: () => {
          isLockDialogOpen.setFalse();
        },
      },
    );
  };

  return (
    <AlertDialog
      open={isLockDialogOpen.value}
      onOpenChange={isLockDialogOpen.setValue}
    >
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={disabled || lockTest.isPending}>
          <Lock />
          {lockTest.isPending ? t("buttons.saving") : t("buttons.lockTest")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("lockTestConfirm.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("lockTestConfirm.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t("lockTestConfirm.cancelButton")}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleLockTest}>
            {t("lockTestConfirm.confirmButton")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
