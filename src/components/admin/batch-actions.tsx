"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { deleteBatch } from "@/lib/actions/batches";

interface DeleteBatchButtonProps {
  id: number;
  label: string;
  compact?: boolean;
  redirectTo?: string;
}

export function DeleteBatchButton({ id, label, compact = false, redirectTo }: DeleteBatchButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${label}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deleteBatch(id);
      if (result.success) {
        if (redirectTo) {
          router.push(redirectTo);
        } else {
          router.refresh();
        }
      } else {
        alert(result.message);
      }
    } catch {
      alert("Failed to delete batch. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size={compact ? "sm" : "default"}
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      {!compact && <span className="ml-2">Delete</span>}
    </Button>
  );
}
