import { Metadata } from "next";
import Link from "next/link";
import { Building2, CalendarDays, MapPin, Users, GraduationCap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageEvent } from "@/components/analytics/page-event";
import { buildPageMetadata } from "@/lib/seo";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { LastUpdated } from "@/components/seo/last-updated";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";
import { getPublishedSeminars } from "@/lib/actions/seminars";
import { teamMembers } from "@/data/team";
import { siteConfig } from "@/data/site-config";

export const revalidate = 600;

export const metadata: Metadata = buildPageMetadata({
  title: "Seminars & Training Sessions Delivered — Archer Infotech Pune",
  description:
    "Corporate training, college seminars and workshops Archer Infotech has delivered — where, when, on what, and to roughly how many people.",
  path: "/seminars",
  lastModified: EVERGREEN_LAST_REVIEWED,
});

const FORMAT_LABEL: Record<string, string> = {
  seminar: "Seminar",
  workshop: "Workshop",
  corporate_batch: "Corporate batch",
  guest_lecture: "Guest lecture",
  bootcamp: "Bootcamp",
};

const HOST_LABEL: Record<string, string> = {
  corporate: "Corporate",
  college: "College",
  public: "Public",
  online: "Online",
};

/** "2025-03" → "March 2025"; "2025-03-14" → "14 March 2025". */
function formatHeldOn(value: string | null): string | null {
  if (!value) return null;
  const parts = value.split("-");
  const d = new Date(parts.length === 2 ? `${value}-01` : value);
  if (Number.isNaN(d.getTime())) return value;
  return parts.length === 2
    ? d.toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function SeminarsPage() {
  const sessions = await getPublishedSeminars();
  const hosts = new Set(sessions.map((s) => s.hostOrganisation)).size;
  const withAttendees = sessions.filter((s) => typeof s.attendees === "number");
  const totalAttendees = withAttendees.reduce((n, s) => n + (s.attendees ?? 0), 0);

  return (
    <div className="min-h-screen">
      <PageEvent event="seminars_viewed" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Corporate Training", url: "/corporate-training" },
          { name: "Seminars & Training Sessions", url: "/seminars" },
        ]}
      />

      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Seminars &amp; Training Sessions We Have Delivered
          </h1>
          <p className="text-lg text-primary-foreground/85">
            Sessions run at company offices, on college campuses and online —
            with the host, the date, the topic and roughly how many people
            attended, recorded as it happened.
          </p>
          <LastUpdated
            iso={EVERGREEN_LAST_REVIEWED}
            label="Record last reviewed"
            className="mt-5 text-xs md:text-sm text-white/70"
          />
        </div>
      </section>

      <DefinitiveAnswer eyebrow="What training has Archer Infotech delivered outside its own classrooms?">
        Archer Infotech delivers corporate training at client offices, seminars
        and guest lectures on college campuses, and public workshops, alongside
        the courses it runs at its Kothrud centre.{" "}
        {sessions.length > 0
          ? `This page records ${sessions.length} session${sessions.length === 1 ? "" : "s"} across ${hosts} host organisation${hosts === 1 ? "" : "s"}${
              totalAttendees > 0
                ? `, reaching roughly ${totalAttendees} attendees where numbers were recorded`
                : ""
            }.`
          : "Sessions are recorded on this page as they are delivered."}{" "}
        Attendance figures are approximate and only shown where somebody
        recorded them at the time. Sessions are listed with the host&apos;s name
        because the engagement is the claim — an unnamed &quot;leading MNC&quot;
        proves nothing.
      </DefinitiveAnswer>

      {sessions.length === 0 ? (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-muted-foreground">
              Session records are being added. In the meantime,{" "}
              <Link href="/corporate-training" className="text-primary hover:underline">
                corporate training
              </Link>{" "}
              describes what we deliver and for whom.
            </p>
          </div>
        </section>
      ) : (
        <section aria-labelledby="sessions-heading" className="py-14 border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 id="sessions-heading" className="text-3xl font-bold mb-3">
                Where have we delivered training?
              </h2>
              <p className="text-muted-foreground">
                Newest first. Month precision is used where the exact day was
                not recorded, rather than inventing one.
              </p>
            </div>

            {/* ItemList, not Event. Google requires an Event to be bookable by
                the general public and explicitly excludes student events on
                school premises; a corporate session delivered inside a client's
                office last year is neither upcoming nor publicly bookable, so
                Event markup would earn no rich result and would assert
                something we cannot support. */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "ItemList",
                  name: "Seminars and training sessions delivered by Archer Infotech",
                  numberOfItems: sessions.length,
                  itemListElement: sessions.map((s, i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    item: {
                      "@type": "CreativeWork",
                      name: `${s.topic} — ${s.hostOrganisation}`,
                      about: s.technologies || s.topic,
                      ...(s.heldOn && { datePublished: s.heldOn }),
                      ...(s.summary && { description: s.summary }),
                    },
                  })),
                }),
              }}
            />

            <div className="max-w-4xl mx-auto grid gap-5 md:grid-cols-2">
              {sessions.map((s) => {
                const trainer = teamMembers.find((t) => t.id === s.trainerId);
                return (
                  <Card key={s.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Building2
                            className="h-4 w-4 text-primary shrink-0"
                            aria-hidden="true"
                          />
                          {s.hostOrganisation}
                        </h3>
                        <Badge variant="outline" className="shrink-0 text-xs">
                          {HOST_LABEL[s.hostType] ?? s.hostType}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-foreground mb-3">{s.topic}</p>

                      <dl className="space-y-1.5 text-sm text-muted-foreground">
                        <div className="flex gap-2">
                          <dt className="font-medium text-foreground">Format</dt>
                          <dd>
                            {FORMAT_LABEL[s.format] ?? s.format}
                            {s.duration ? ` · ${s.duration}` : ""}
                          </dd>
                        </div>
                        {s.heldOn && (
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>{formatHeldOn(s.heldOn)}</span>
                          </div>
                        )}
                        {s.city && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>{s.city}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Users className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>
                            {typeof s.attendees === "number"
                              ? `~${s.attendees} attendees`
                              : "Attendance not recorded"}
                          </span>
                        </div>
                        {trainer && (
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>
                              Delivered by{" "}
                              <Link
                                href={`/trainers/${trainer.id}`}
                                className="text-primary hover:underline"
                              >
                                {trainer.name}
                              </Link>
                            </span>
                          </div>
                        )}
                      </dl>

                      {s.technologies && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {s.technologies.split(",").map((t) => (
                            <Badge key={t} variant="outline" className="text-xs">
                              {t.trim()}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {s.summary && (
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {s.summary}
                        </p>
                      )}
                      {s.outcome && (
                        <p className="mt-2 text-sm text-foreground">
                          <span className="font-medium">What followed: </span>
                          {s.outcome}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 border-t bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-3">
            Want a session for your team or college?
          </h2>
          <p className="text-muted-foreground mb-6">
            We run corporate batches, seminars and guest lectures on the same
            stacks we teach. Tell us the audience and the outcome you want.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/corporate-training"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Corporate training
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-semibold hover:bg-muted"
            >
              Talk to us — {siteConfig.contact.phone}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
