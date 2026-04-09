"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Pencil, Trash2, Eye, EyeOff, Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  deleteTestimonial,
  toggleTestimonialHighlightStatus,
  toggleTestimonialPublishStatus,
} from "@/lib/actions/testimonials";
import { toast } from "sonner";

interface TestimonialAdminActionsProps {
  id: number;
  name: string;
  isPublished: boolean;
  isHighlighted: boolean;
}

export function TestimonialAdminActions({
  id,
  name,
  isPublished,
  isHighlighted,
}: TestimonialAdminActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isHighlighting, setIsHighlighting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete testimonial from ${name}? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteTestimonial(id);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to delete testimonial. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublish = async () => {
    setIsPublishing(true);
    try {
      const result = await toggleTestimonialPublishStatus(id, !isPublished);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to update publish status. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleToggleHighlight = async () => {
    setIsHighlighting(true);
    try {
      const result = await toggleTestimonialHighlightStatus(id, !isHighlighted);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to update highlight status. Please try again.");
    } finally {
      setIsHighlighting(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleTogglePublish}
        disabled={isPublishing}
        title={isPublished ? "Unpublish" : "Publish"}
      >
        {isPublishing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isPublished ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggleHighlight}
        disabled={isHighlighting}
        title={isHighlighted ? "Remove highlight" : "Highlight"}
      >
        {isHighlighting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isHighlighted ? (
          <Star className="h-4 w-4 fill-current" />
        ) : (
          <StarOff className="h-4 w-4" />
        )}
      </Button>
      <Link href={`/admin/testimonials/${id}/edit`}>
        <Button variant="ghost" size="sm" title="Edit testimonial">
          <Pencil className="h-4 w-4" />
        </Button>
      </Link>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-600 hover:bg-red-50 hover:text-red-700"
        title="Delete testimonial"
      >
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
