"use client";

import { signUpUser } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignUp() {
  return useMutation({
    mutationFn: signUpUser,
  });
}
