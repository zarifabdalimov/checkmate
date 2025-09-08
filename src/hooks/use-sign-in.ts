"use client";

import { signInUser } from "@/lib/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signInUser,
    onSuccess: (data) => {
      if (data.isSignedIn) {
        queryClient.invalidateQueries({ queryKey: ["auth"] });
      }
    },
  });
}
