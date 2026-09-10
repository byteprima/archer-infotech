"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUserRole } from "@/lib/actions/users";
import {
  USER_ROLES,
  ROLE_LABELS,
  ROLE_DESCRIPTIONS,
  type UserRole,
} from "@/lib/leads/roles";

interface UserRoleButtonProps {
  userId: string;
  userEmail: string;
  currentRole: string;
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



  const handleChange = async (nextRole: UserRole) => {
    if (nextRole === currentRole) return;

    const confirmed = window.confirm(
      `Change ${userEmail} to ${ROLE_LABELS[nextRole]}?`,
    );
    if (!confirmed) return;

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
    <select
      value={currentRole}
      disabled={isPending || isCurrentAdmin}
      onChange={(event) => handleChange(event.target.value as UserRole)}
      className="h-9 rounded-md border border-input bg-background px-2 text-sm disabled:opacity-60"
      title={
        isCurrentAdmin
          ? "You cannot change your own role"
          : ROLE_DESCRIPTIONS[currentRole as UserRole]
      }
    >
      {USER_ROLES.map((role) => (
        <option key={role} value={role}>
          {ROLE_LABELS[role]}
        </option>
      ))}
    </select>
  );
}
