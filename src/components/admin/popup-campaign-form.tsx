"use client";

/**
 * Create / edit a campaign popup.
 *
 * The artwork's intrinsic dimensions are read here in the browser and posted
 * as hidden fields. The popup needs them to reserve space before the image
 * loads (otherwise the modal jumps as it lands), and reading them from the
 * chosen File costs nothing — no server-side image decode, no extra library.
 */

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { savePopupCampaign } from "@/lib/actions/popup-campaigns";
import type { PopupCampaign } from "@/db/schema";

interface Props {
  campaign?: PopupCampaign;
}

export function PopupCampaignForm({ campaign }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [mode, setMode] = useState(campaign?.mode ?? "image_and_form");
  const [preview, setPreview] = useState<string | null>(
    campaign ? `/media/offers/${campaign.imageFilename}` : null,
  );
  const [dims, setDims] = useState<{ w: number; h: number } | null>(
    campaign ? { w: campaign.imageWidth, h: campaign.imageHeight } : null,
  );

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      setDims({ w: img.naturalWidth, h: img.naturalHeight });
      setPreview(url);
    };
    img.src = url;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (dims) {
      fd.set("imageWidth", String(dims.w));
      fd.set("imageHeight", String(dims.h));
    }

    setPending(true);
    setMessage(null);
    setErrors({});
    try {
      const result = await savePopupCampaign(fd);
      if (!result.success) {
        setMessage(result.message);
        setErrors(result.errors ?? {});
        return;
      }
      router.push("/admin/popups");
      router.refresh();
    } catch {
      setMessage("Couldn't save. Please try again.");
    } finally {
      setPending(false);
    }
  }

  const err = (k: string) =>
    errors[k]?.[0] ? (
      <p className="text-xs text-destructive">{errors[k][0]}</p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} className="grid gap-6">
      {campaign && <input type="hidden" name="id" value={campaign.id} />}

      <div className="grid gap-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          defaultValue={campaign?.subject ?? ""}
          placeholder="Independence Day Offer"
          required
        />
        <p className="text-xs text-muted-foreground">
          Names the campaign and tags every lead it produces — they arrive with
          source <code>popup:independence-day-offer</code>, so you can filter
          this campaign&apos;s enquiries from every other lead.
        </p>
        {err("subject")}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="image">Popup image</Label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif"
          onChange={onFileChange}
          className="text-sm file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-2 file:text-sm"
        />
        <p className="text-xs text-muted-foreground">
          PNG, JPEG, WebP or AVIF, up to 5 MB. Wide artwork (roughly 16:9)
          fits the popup best.
          {campaign && " Leave empty to keep the current image."}
        </p>
        {err("image")}
        {preview && (
          <div className="mt-2 max-w-md overflow-hidden rounded-lg border">
            {/* Blob preview of a not-yet-uploaded file can't go through
                next/image, so this branch uses a plain img deliberately. */}
            {preview.startsWith("blob:") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Selected artwork preview" className="w-full" />
            ) : (
              <Image
                src={preview}
                alt="Current artwork"
                width={dims?.w ?? 1200}
                height={dims?.h ?? 675}
                className="h-auto w-full"
              />
            )}
          </div>
        )}
        {dims && (
          <p className="text-xs text-muted-foreground">
            {dims.w} × {dims.h} px
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="imageAlt">Image description</Label>
        <textarea
          id="imageAlt"
          name="imageAlt"
          defaultValue={campaign?.imageAlt ?? ""}
          rows={3}
          required
          className="w-full rounded-md border border-input bg-background p-3 text-sm outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40"
          placeholder="Independence Day Special Offer. Online Java, .NET and Python Full Stack batches. 15 August Rs 15,000, 16 August Rs 16,000, 17 August Rs 17,000."
        />
        <p className="text-xs text-muted-foreground">
          Everything written on the artwork is pixels — invisible to Google
          and to screen readers. Put the offer in words here; it is the only
          text version that exists.
        </p>
        {err("imageAlt")}
      </div>

      <fieldset className="grid gap-3">
        <legend className="mb-1 text-sm font-medium">What the popup does</legend>
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 has-checked:border-primary has-checked:bg-primary/5">
          <input
            type="radio"
            name="mode"
            value="image_and_form"
            defaultChecked={mode === "image_and_form"}
            onChange={() => setMode("image_and_form")}
            className="mt-1"
          />
          <span>
            <span className="block text-sm font-medium">
              Show the image and collect details
            </span>
            <span className="block text-xs text-muted-foreground">
              A strip under the image asks for name, mobile and course. Each
              submission is stored as a lead.
            </span>
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 has-checked:border-primary has-checked:bg-primary/5">
          <input
            type="radio"
            name="mode"
            value="image_only"
            defaultChecked={mode === "image_only"}
            onChange={() => setMode("image_only")}
            className="mt-1"
          />
          <span>
            <span className="block text-sm font-medium">Show the image only</span>
            <span className="block text-xs text-muted-foreground">
              An announcement. Optionally links somewhere when clicked.
            </span>
          </span>
        </label>
      </fieldset>

      {mode === "image_only" && (
        <div className="grid gap-2">
          <Label htmlFor="linkUrl">Link when clicked (optional)</Label>
          <Input
            id="linkUrl"
            name="linkUrl"
            defaultValue={campaign?.linkUrl ?? ""}
            placeholder="/contact"
          />
          <p className="text-xs text-muted-foreground">
            Leave empty for a plain announcement that only closes.
          </p>
          {err("linkUrl")}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="startDate">Start date (optional)</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={campaign?.startDate ?? ""}
          />
          {err("startDate")}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="endDate">End date (optional)</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={campaign?.endDate ?? ""}
          />
          {err("endDate")}
        </div>
      </div>
      <p className="-mt-2 text-xs text-muted-foreground">
        Both inclusive, in India time. Leave empty for no limit — the popup
        then runs until you switch it off. It stops by itself the day after
        the end date, with no deploy needed.
      </p>

      <label className="flex items-center gap-3 rounded-lg border p-3">
        <input
          type="checkbox"
          name="enabled"
          defaultChecked={campaign?.enabled ?? false}
          className="size-4"
        />
        <span>
          <span className="block text-sm font-medium">Live on the website</span>
          <span className="block text-xs text-muted-foreground">
            Takes effect on the next page load — visitors don&apos;t have to
            wait for a deploy.
          </span>
        </span>
      </label>

      {message && (
        <p role="alert" className="text-sm text-destructive">
          {message}
        </p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : campaign ? "Save changes" : "Create campaign"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/popups")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
