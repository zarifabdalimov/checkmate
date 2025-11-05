"use client";

import { confirmPasswordReset } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";

export function useConfirmPasswordReset() {
  const router = useRouter();

  return useMutation({
    mutationFn: confirmPasswordReset,
    onSuccess: () => {
      router.push("/auth/sign-in?message=password-reset");
    },
  });
}
