"use client";

import { useMutation } from "@tanstack/react-query";
import { resetUserPassword } from "@/lib/auth";

export function useResetPassword() {
  return useMutation({
    mutationFn: resetUserPassword,
  });
}
