"use client";

import { resendVerificationCode } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";

export function useResendVerificationCode() {
  return useMutation({
    mutationFn: resendVerificationCode,
  });
}
