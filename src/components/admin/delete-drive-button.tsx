"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { deletePlacementDrive } from "@/lib/actions/placement-drives";

/**
 * Two-step delete. A single-click destructive button in an admin list is how
 * a record with a recorded outcome gets lost to a mis-tap, and there is no
 * undo behind this.
 */
export function DeleteDriveButton({ id, label }: { id: number; label: string }) {
  const router = useRouter();
  const [armed, setArmed] = useState(false);
  const [busy, setBusy] = useState(false);

  async function remove() {
    setBusy(true);
    const result = await deletePlacementDrive(id);
    setBusy(false);
    if (result.success) {
      toast.success(result.message);
      router.push("/admin/placement-drives");
      router.refresh();
    } else {
      toast.error(result.message);
      setArmed(false);
    }
  }

  if (!armed) {
    return (
      <Button variant="outline" size="sm" onClick={() => setArmed(true)}>
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Delete {label}?</span>
      <Button variant="destructive" size="sm" onClick={remove} disabled={busy}>
        {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Yes, delete
      </Button>
      <Button variant="outline" size="sm" onClick={() => setArmed(false)}>
        Cancel
      </Button>
    </div>
  );
}
