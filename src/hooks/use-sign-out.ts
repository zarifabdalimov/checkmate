"use client";

import { signOutUser } from "@/lib/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      // Clear all auth-related queries
      queryClient.clear();
    },
  });
}
