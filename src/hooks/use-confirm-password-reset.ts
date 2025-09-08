"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { confirmPasswordReset } from "@/lib/auth";

export function useConfirmPasswordReset() {
  const router = useRouter();

  return useMutation({
    mutationFn: confirmPasswordReset,
    onSuccess: () => {
      router.push("/auth/sign-in?message=password-reset");
    },
  });
}
