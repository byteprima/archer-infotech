"use client";

import { useTransition } from "react";
import { CheckCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markAllNotificationsRead } from "@/lib/actions/notifications";
import { toast } from "sonner";

export function MarkAllReadButton() {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      size="sm"
      variant="outline"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          const result = await markAllNotificationsRead();
          toast.success(result.message);
        })
      }
    >
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <CheckCheck className="mr-2 h-4 w-4" />
      )}
      Mark all read
    </Button>
  );
}
