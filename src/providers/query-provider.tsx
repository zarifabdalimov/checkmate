"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: (failureCount, error) => {
              // Don't retry on auth errors
              const errorWithName = error;
              if (
                errorWithName?.name === "NotAuthorizedException" ||
                errorWithName?.name === "UserNotFoundException" ||
                errorWithName?.name === "UserNotConfirmedException"
              ) {
                return false;
              }
              return failureCount < 3;
            },
          },
          mutations: {
            retry: false, // Don't retry mutations by default
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
