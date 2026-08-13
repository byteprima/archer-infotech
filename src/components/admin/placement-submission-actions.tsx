"use client";

import { useTransition } from "react";
import { Check, X, Eye } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  approvePlacementSubmission,
  setPlacementSubmissionStatus,
} from "@/lib/actions/admin-placement-submissions";

export function PlacementSubmissionActions({
  id,
  alreadyPublished,
}: {
  id: number;
  alreadyPublished: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const run = (fn: () => Promise<{ success: boolean; message: string }>) =>
    startTransition(async () => {
      const r = await fn();
      if (r.success) toast.success(r.message);
      else toast.error(r.message);
      router.refresh();
    });

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        size="sm"
        disabled={isPending || alreadyPublished}
        onClick={() => run(() => approvePlacementSubmission(id))}
        className="gap-1"
      >
        <Check className="h-4 w-4" />
        {alreadyPublished ? "Approved" : "Approve"}
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={isPending}
        onClick={() => run(() => setPlacementSubmissionStatus(id, "reviewed"))}
        className="gap-1"
      >
        <Eye className="h-4 w-4" />
        Mark reviewed
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={isPending}
        onClick={() => run(() => setPlacementSubmissionStatus(id, "rejected"))}
        className="gap-1 text-destructive hover:text-destructive"
      >
        <X className="h-4 w-4" />
        Reject
      </Button>
    </div>
  );
}
