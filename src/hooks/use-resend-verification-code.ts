"use client";

import { useMutation } from "@tanstack/react-query";
import { resendVerificationCode } from "@/lib/auth";

export function useResendVerificationCode() {
  return useMutation({
    mutationFn: resendVerificationCode,
  });
}
