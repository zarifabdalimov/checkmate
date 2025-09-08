"use client";

import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/use-sign-out";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const signOut = useSignOut();
  const router = useRouter();

  function handleSignOut() {
    signOut.mutate(undefined, {
      onSuccess: () => {
        router.push("/");
      },
    });
  }

  return <Button onClick={handleSignOut}>Sign out</Button>;
}
