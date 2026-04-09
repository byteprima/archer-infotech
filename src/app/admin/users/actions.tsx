"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Shield, ShieldOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateUserRole } from "@/lib/actions/users";

interface UserRoleButtonProps {
  userId: string;
  userEmail: string;
  currentRole: "user" | "admin";
  isCurrentAdmin: boolean;
}

export function UserRoleButton({
  userId,
  userEmail,
  currentRole,
  isCurrentAdmin,
}: UserRoleButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const nextRole = currentRole === "admin" ? "user" : "admin";

  const handleClick = async () => {
    const confirmed = window.confirm(
      `${nextRole === "admin" ? "Grant" : "Remove"} admin access for ${userEmail}?`
    );

    if (!confirmed) {
      return;
    }

    setIsPending(true);

    try {
      const result = await updateUserRole(userId, nextRole);

      if (!result.success) {
        window.alert(result.message);
        return;
      }

      router.refresh();
    } catch {
      window.alert("Failed to update the user role. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      type="button"
      variant={currentRole === "admin" ? "outline" : "default"}
      size="sm"
      onClick={handleClick}
      disabled={isPending || isCurrentAdmin}
      title={isCurrentAdmin ? "You cannot remove your own admin access." : undefined}
    >
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : currentRole === "admin" ? (
        <ShieldOff className="mr-2 h-4 w-4" />
      ) : (
        <Shield className="mr-2 h-4 w-4" />
      )}
      {currentRole === "admin" ? "Remove Admin" : "Make Admin"}
    </Button>
  );
}
