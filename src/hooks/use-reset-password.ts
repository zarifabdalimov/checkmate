"use client";

import { resetUserPassword } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";

export function useResetPassword() {
  return useMutation({
    mutationFn: resetUserPassword,
  });
}
