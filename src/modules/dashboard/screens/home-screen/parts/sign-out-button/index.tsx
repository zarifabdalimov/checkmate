"use client";

import { useSignOut } from "@/hooks/use-sign-out";
import { Button } from "@/modules/ui/button";
import { useRouter } from "@/i18n/navigation";

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

  return (
    <Button variant="outline" onClick={handleSignOut}>
      Sign out
    </Button>
  );
}
