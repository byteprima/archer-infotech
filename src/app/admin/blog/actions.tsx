"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { deletePost, togglePublishStatus } from "@/lib/actions/blog";

interface DeletePostButtonProps {
  id: number;
  title: string;
}

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deletePost(id);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Failed to delete post. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}

interface TogglePublishButtonProps {
  id: number;
  isPublished: boolean;
}

export function TogglePublishButton({ id, isPublished }: TogglePublishButtonProps) {
  const router = useRouter();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      const result = await togglePublishStatus(id, !isPublished);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Failed to update publish status. Please try again.");
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      disabled={isToggling}
      title={isPublished ? "Unpublish" : "Publish"}
    >
      {isToggling ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isPublished ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </Button>
  );
}
