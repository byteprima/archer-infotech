import { Metadata } from "next";
import Link from "next/link";
import { Building2, CalendarDays, MapPin, Users, CheckCircle2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageEvent } from "@/components/analytics/page-event";
import { buildPageMetadata } from "@/lib/seo";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { LastUpdated } from "@/components/seo/last-updated";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";
import { getPublishedDrives } from "@/lib/actions/placement-drives";
import { siteConfig } from "@/data/site-config";

export const revalidate = 600;

export const metadata: Metadata = buildPageMetadata({
  title: "Placement Drives at Archer Infotech Pune — Companies & Results",
  description:
    "Which companies have run placement drives at Archer Infotech, when, and how many students were selected. A dated record of hiring activity, not a job board.",
  path: "/placement-drives",
  lastModified: EVERGREEN_LAST_REVIEWED,
});

const MODE_LABEL: Record<string, string> = {
  campus: "On campus",
  virtual: "Virtual",
  walk_in: "Walk-in",
  partner_office: "At the company",
};

const STATUS_LABEL: Record<string, string> = {
  upcoming: "Upcoming",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function PlacementDrivesPage() {
  const drives = await getPublishedDrives();
  const completed = drives.filter((d) => d.status === "completed");
  const upcoming = drives.filter((d) => d.status === "upcoming" || d.status === "in_progress");

  // Totals are computed from published rows only, and only from rows where the
  // number was actually recorded. A drive with a null count is excluded rather
  // than counted as zero — an unreported drive and a drive where nobody was
  // selected are different facts, and averaging them together would misstate
  // both.
  const withSelected = completed.filter((d) => typeof d.studentsSelected === "number");
  const totalSelected = withSelected.reduce((n, d) => n + (d.studentsSelected ?? 0), 0);
  const companies = new Set(drives.map((d) => d.company)).size;

  return (
    <div className="min-h-screen">
      <PageEvent event="placement_drives_viewed" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Placements", url: "/placements" },
          { name: "Placement Drives", url: "/placement-drives" },
        ]}
      />

      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Placement Drives at Archer Infotech
          </h1>
          <p className="text-lg text-primary-foreground/85">
            Which companies came, when they came, and what happened. Every
            entry below is a drive we actually ran — with the outcome recorded
            where we have it, and marked as unrecorded where we do not.
          </p>
          <LastUpdated
            iso={EVERGREEN_LAST_REVIEWED}
            label="Record last reviewed"
            className="mt-5 text-xs md:text-sm text-white/70"
          />
        </div>
      </section>

      <DefinitiveAnswer eyebrow="What is a placement drive at Archer Infotech?">
        A placement drive is a hiring round a company runs for Archer Infotech
        students at our Kothrud centre, at the company&apos;s office, or online.
        The institute arranges the drive, shares the eligibility criteria with
        the batches it applies to, and prepares candidates through mock
        interviews beforehand. {companies > 0 ? `${companies} companies` : "Companies"}{" "}
        have run drives recorded on this page
        {totalSelected > 0
          ? `, with ${totalSelected} student${totalSelected === 1 ? "" : "s"} selected across the completed drives where the outcome was recorded`
          : ""}
        . These drives are for enrolled students rather than open public
        applications, which is why this page is a record of hiring activity and
        not a job board.
      </DefinitiveAnswer>

      {drives.length === 0 ? (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-muted-foreground">
              Drive records are being added. In the meantime, the{" "}
              <Link href="/placements" className="text-primary hover:underline">
                placements page
              </Link>{" "}
              carries the outcomes we already publish.
            </p>
          </div>
        </section>
      ) : (
        <>
          {upcoming.length > 0 && (
            <DriveList
              id="upcoming-drives"
              heading="Which drives are coming up?"
              intro="Eligibility is shared directly with the batches each drive applies to. If you are an enrolled student, the placement cell will contact you."
              drives={upcoming}
            />
          )}
          {completed.length > 0 && (
            <DriveList
              id="completed-drives"
              heading="Which companies have already recruited here?"
              intro="Completed drives, newest first, with the number of students who appeared and were selected wherever that was recorded."
              drives={completed}
              muted
            />
          )}
        </>
      )}

      <section className="py-12 border-t">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-3">Where do these students end up?</h2>
          <p className="text-muted-foreground mb-6">
            The individual outcomes — names, companies and roles, published with
            each student&apos;s consent — are on the placements page.
          </p>
          <Link
            href="/placements"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            See placement records
          </Link>
        </div>
      </section>
    </div>
  );
}

function DriveList({
  id,
  heading,
  intro,
  drives,
  muted = false,
}: {
  id: string;
  heading: string;
  intro: string;
  drives: Awaited<ReturnType<typeof getPublishedDrives>>;
  muted?: boolean;
}) {
  return (
    <section
      aria-labelledby={id}
      className={`py-14 border-t ${muted ? "bg-muted/30" : ""}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 id={id} className="text-3xl font-bold mb-3">
            {heading}
          </h2>
          <p className="text-muted-foreground">{intro}</p>
        </div>

        {/* ItemList rather than JobPosting, deliberately. These drives are for
            enrolled students, so a stranger arriving from Google Jobs could not
            apply — and a posting left live past its close can trigger a manual
            action against every job on the domain. The value here is a dated,
            checkable record, which ItemList expresses honestly. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: heading,
              numberOfItems: drives.length,
              itemListElement: drives.map((d, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Organization",
                  name: d.company,
                  description: `${d.role}${d.driveDate ? ` — drive held ${d.driveDate}` : ""}${
                    typeof d.studentsSelected === "number"
                      ? `, ${d.studentsSelected} Archer Infotech student(s) selected`
                      : ""
                  }.`,
                },
              })),
            }),
          }}
        />

        <div className="max-w-4xl mx-auto grid gap-5 md:grid-cols-2">
          {drives.map((d) => (
            <Card key={d.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                    {d.company}
                  </h3>
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {STATUS_LABEL[d.status] ?? d.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-foreground mb-3">{d.role}</p>

                <dl className="space-y-1.5 text-sm text-muted-foreground">
                  {d.packageBand && (
                    <div className="flex gap-2">
                      <dt className="font-medium text-foreground">Package</dt>
                      <dd>{d.packageBand}</dd>
                    </div>
                  )}
                  {d.driveDate && (
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{formatDate(d.driveDate)}</span>
                    </div>
                  )}
                  {d.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>
                        {d.location} · {MODE_LABEL[d.mode] ?? d.mode}
                      </span>
                    </div>
                  )}
                  {d.eligibility && (
                    <div className="flex gap-2">
                      <dt className="font-medium text-foreground">Eligible</dt>
                      <dd>{d.eligibility}</dd>
                    </div>
                  )}
                </dl>

                {/* Outcome. Rendered as "not recorded" rather than as zero,
                    because those mean different things and only one of them
                    is a fact we can stand behind. */}
                {d.status === "completed" && (
                  <div className="mt-4 rounded-lg bg-muted/50 p-3 text-sm">
                    {typeof d.studentsSelected === "number" ? (
                      <p className="flex items-center gap-2 font-medium text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                        {d.studentsSelected} selected
                        {typeof d.studentsAppeared === "number" && (
                          <span className="font-normal text-muted-foreground">
                            {" "}
                            of {d.studentsAppeared} who appeared
                          </span>
                        )}
                      </p>
                    ) : (
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" aria-hidden="true" />
                        Outcome not recorded for this drive
                      </p>
                    )}
                  </div>
                )}

                {d.description && (
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {d.description}
                  </p>
                )}
                {d.applyNote && d.status !== "completed" && (
                  <p className="mt-3 text-xs text-muted-foreground">{d.applyNote}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Drives are arranged for enrolled Archer Infotech students. For
          enrolment and eligibility, contact the placement cell on{" "}
          {siteConfig.contact.phone}.
        </p>
      </div>
    </section>
  );
}
