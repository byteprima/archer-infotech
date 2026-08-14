"use client";

/** Enable/disable and delete controls on the campaign list. */

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  togglePopupCampaign,
  deletePopupCampaign,
} from "@/lib/actions/popup-campaigns";

interface Props {
  id: number;
  enabled: boolean;
  subject: string;
}

export function PopupAdminActions({ id, enabled, subject }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  const toggle = () =>
    startTransition(async () => {
      await togglePopupCampaign(id, !enabled);
      router.refresh();
    });

  const remove = () =>
    startTransition(async () => {
      await deletePopupCampaign(id);
      setConfirming(false);
      router.refresh();
    });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" variant={enabled ? "outline" : "default"} onClick={toggle} disabled={pending}>
        {enabled ? "Switch off" : "Switch on"}
      </Button>

      {confirming ? (
        <>
          <Button size="sm" variant="destructive" onClick={remove} disabled={pending}>
            Delete “{subject}”?
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setConfirming(false)}>
            Cancel
          </Button>
        </>
      ) : (
        <Button size="sm" variant="ghost" onClick={() => setConfirming(true)}>
          Delete
        </Button>
      )}
    </div>
  );
}
