"use client";

import { confirmSignUpUser } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";

export function useConfirmSignUp() {
  return useMutation({
    mutationFn: confirmSignUpUser,
  });
}
