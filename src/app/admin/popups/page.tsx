import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Plus, MonitorPlay } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PopupAdminActions } from "@/components/admin/popup-admin-actions";
import { listPopupCampaigns } from "@/lib/actions/popup-campaigns";
import { requireAdminPage } from "@/lib/admin";

export const dynamic = "force-dynamic";

/** Today in IST — the same clock the public resolver uses. */
function todayIST(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export default async function AdminPopupsPage() {
  await requireAdminPage();
  const campaigns = await listPopupCampaigns();
  const today = todayIST();

  // Mirrors getActivePopup: enabled, and inside its window if it has one.
  // Most recently updated wins, so at most one is ever actually showing.
  const liveId = campaigns.find(
    (c) =>
      c.enabled &&
      (!c.startDate || today >= c.startDate) &&
      (!c.endDate || today <= c.endDate),
  )?.id;

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-2 flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold">Website Popup</h1>
              <p className="text-sm text-muted-foreground">
                Control the promotional popup shown to visitors — switch it on
                or off, change the artwork, and choose whether it collects
                enquiries. Changes take effect on the next page load, without
                a deploy.
              </p>
            </div>
            <Link href="/admin/popups/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Popup
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {campaigns.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
              <MonitorPlay className="h-10 w-10 text-muted-foreground" />
              <p className="font-medium">No popup campaigns yet</p>
              <p className="max-w-md text-sm text-muted-foreground">
                Create one to show an offer to every visitor. Nothing is shown
                on the website until a campaign is switched on.
              </p>
              <Link href="/admin/popups/new">
                <Button className="mt-2">
                  <Plus className="mr-2 h-4 w-4" />
                  New Popup
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {campaigns.map((c) => {
              const isLive = c.id === liveId;
              const scheduled =
                c.enabled && !isLive && c.startDate && today < c.startDate;
              const expired =
                c.enabled && !isLive && c.endDate && today > c.endDate;

              return (
                <Card key={c.id}>
                  <CardContent className="flex flex-col gap-4 p-4 sm:flex-row">
                    <div className="w-full shrink-0 overflow-hidden rounded-md border sm:w-56">
                      <Image
                        src={`/media/offers/${c.imageFilename}`}
                        alt={c.imageAlt}
                        width={c.imageWidth}
                        height={c.imageHeight}
                        className="h-auto w-full"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-medium">{c.subject}</h2>
                        {isLive && <Badge>Live now</Badge>}
                        {scheduled && <Badge variant="secondary">Scheduled</Badge>}
                        {expired && <Badge variant="secondary">Finished</Badge>}
                        {!c.enabled && <Badge variant="outline">Off</Badge>}
                        <Badge variant="outline">
                          {c.mode === "image_only"
                            ? "Image only"
                            : "Image + enquiry form"}
                        </Badge>
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {c.startDate || c.endDate
                          ? `${c.startDate || "no start"} → ${c.endDate || "no end"}`
                          : "No date limit — runs until switched off"}
                      </p>

                      {c.mode === "image_and_form" && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Leads arrive tagged{" "}
                          <code className="rounded bg-muted px-1">
                            popup:
                            {c.subject
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-")
                              .replace(/^-+|-+$/g, "")
                              .slice(0, 60)}
                          </code>
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Link href={`/admin/popups/${c.id}`}>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </Link>
                        <PopupAdminActions
                          id={c.id}
                          enabled={c.enabled}
                          subject={c.subject}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
