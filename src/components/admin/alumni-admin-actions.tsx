"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, Trash2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  approveAndPublishAlumnus,
  deleteAlumnus,
  updateAlumnusStatus,
} from "@/lib/actions/alumni";
import { ALUMNI_STATUSES, type AlumniStatus } from "@/lib/alumni/constants";

interface Props {
  id: number;
  status: AlumniStatus;
  consentDisplayPublic: boolean;
  hasTestimonialText: boolean;
  alreadyPublished: boolean;
}

export function AlumniAdminActions({
  id,
  status,
  consentDisplayPublic,
  hasTestimonialText,
  alreadyPublished,
}: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  const run = async (
    key: string,
    fn: () => Promise<{ success: boolean; message: string }>,
    after?: () => void
  ) => {
    setBusy(key);
    try {
      const result = await fn();
      if (result.success) {
        toast.success(result.message);
        if (after) after();
        else router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  const canPublish = consentDisplayPublic && hasTestimonialText;

  return (
    <div className="space-y-4">
      {/* Publish */}
      <div className="space-y-2">
        <Button
          className="w-full"
          disabled={!canPublish || busy !== null}
          onClick={() =>
            run("publish", () => approveAndPublishAlumnus(id))
          }
        >
          {busy === "publish" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : alreadyPublished ? (
            <UploadCloud className="mr-2 h-4 w-4" />
          ) : (
            <CheckCircle2 className="mr-2 h-4 w-4" />
          )}
          {alreadyPublished ? "Re-sync testimonial" : "Approve & publish testimonial"}
        </Button>
        {!consentDisplayPublic && (
          <p className="text-xs text-muted-foreground">
            Cannot publish — alumnus did not consent to public display.
          </p>
        )}
        {consentDisplayPublic && !hasTestimonialText && (
          <p className="text-xs text-muted-foreground">
            Cannot publish — no testimonial text was provided.
          </p>
        )}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase text-muted-foreground">
          Set status
        </p>
        <div className="flex flex-wrap gap-2">
          {ALUMNI_STATUSES.filter((s) => s !== "published").map((s) => (
            <Button
              key={s}
              variant={status === s ? "default" : "outline"}
              size="sm"
              disabled={busy !== null}
              onClick={() =>
                run(`status-${s}`, () => updateAlumnusStatus(id, s))
              }
            >
              {busy === `status-${s}` ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                s
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Delete */}
      <div className="border-t pt-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive"
          disabled={busy !== null}
          onClick={() => {
            if (
              !confirm(
                "Delete this alumni submission permanently? This also removes the uploaded photo."
              )
            )
              return;
            run("delete", () => deleteAlumnus(id), () =>
              router.push("/admin/alumni")
            );
          }}
        >
          {busy === "delete" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="mr-2 h-4 w-4" />
          )}
          Delete submission
        </Button>
      </div>
    </div>
  );
}
