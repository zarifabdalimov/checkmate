"use client";

import { getCurrentAuthUser } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => getCurrentAuthUser(),
  });
}
