import { Metadata } from "next";
import { MapPin, Monitor, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { siteConfig } from "@/data/site-config";
import { db } from "@/db";
import { batches as batchesTable, type Batch } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, BatchEventsJsonLd } from "@/components/seo/json-ld";
import { filterUpcomingBatches } from "@/lib/actions/public-batches";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { batchScheduleFaqs } from "@/data/faqs";

const batchScheduleMetadata = buildPageMetadata({
  title: "Batch Schedule — Upcoming IT Training Batches in Pune",
  description:
    "View upcoming batch dates for all IT training courses at Archer Infotech, Pune. Choose from offline classroom batches in Kothrud or online live batches with flexible timings.",
  path: "/batch-schedule",
});

export const metadata: Metadata = {
  ...batchScheduleMetadata,
  // Point AI agents / machine readers at the JSON feed of upcoming batches.
  alternates: {
    ...batchScheduleMetadata.alternates,
    types: { "application/json": "/api/batches" },
  },
};

function BatchTable({ batches }: { batches: Batch[] }) {
  if (batches.length === 0) {
    return (
      <div className="rounded-lg border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
        No upcoming batches scheduled right now.{" "}
        <TrackedLink
          href="/contact"
          className="text-primary font-medium hover:underline"
          event="batch_enroll_clicked"
          properties={{ location: "batch_schedule_empty" }}
        >
          Contact us
        </TrackedLink>{" "}
        for the next available dates.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b bg-muted/50 text-left">
            <th scope="col" className="px-4 py-3 font-semibold">Course</th>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">Starts</th>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">Timing</th>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">Duration</th>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">Seats</th>
            <th scope="col" className="px-4 py-3 font-semibold text-right">Enroll</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => {
            const isAlmostFull = batch.seatsAvailable <= 5;
            return (
              <tr
                key={batch.id}
                className="border-b last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{batch.courseName}</span>
                    {isAlmostFull && (
                      <Badge className="bg-red-100 text-red-700">Almost Full</Badge>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {new Date(batch.startDate).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {batch.timing}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {batch.duration}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {batch.seatsAvailable} / {batch.totalSeats}
                </td>
                <td className="px-4 py-3 text-right">
                  <TrackedLink
                    href="/contact"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/90"
                    event="batch_enroll_clicked"
                    properties={{
                      course_name: batch.courseName,
                      batch_mode: batch.mode,
                      seats_available: batch.seatsAvailable,
                      location: "batch_schedule",
                    }}
                  >
                    Enroll Now
                  </TrackedLink>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default async function BatchSchedulePage() {
  const offlineBatches = await db.select().from(batchesTable).where(eq(batchesTable.mode, "offline")).orderBy(asc(batchesTable.startDate));
  const onlineBatches = await db.select().from(batchesTable).where(eq(batchesTable.mode, "online")).orderBy(asc(batchesTable.startDate));

  return (
    <>
      {/* Two-level BreadcrumbList — these are top-level pages, so the
          trail is Home > page. Added 2026-08-06; the crawl found the
          six top-level marketing/legal pages were the only public
          routes emitting no BreadcrumbList at all. */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Batch Schedule", url: "/batch-schedule" },
        ]}
      />

      <PageEvent
        event="batch_schedule_page_viewed"
        properties={{ page_type: "batch_schedule", page_path: "/batch-schedule" }}
      />

      {/* EducationEvent schema for every upcoming batch — Event rich results
          + AI "next batch in Pune" answers. P8-25 + P3-20. */}
      <BatchEventsJsonLd
        batches={filterUpcomingBatches([...offlineBatches, ...onlineBatches])}
      />

      {/* Hero Section */}
      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Batch Schedule
            </h1>
            <p className="text-lg text-white/80">
              View upcoming batch schedules for all our IT training courses. Choose
              between classroom training in Pune or live online sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Definitive Answer Paragraph — practical "when / where / how"
          batch info in the first body section. AI engines lift this for
          high-intent local queries. P8-07. */}
      <DefinitiveAnswer eyebrow="Upcoming IT Training Batches in Pune">
        Archer Infotech starts new batches every 1–2 weeks across flagship
        IT courses, with separate weekday and weekend cohorts. Offline
        classroom batches run at the Kothrud centre (Flat No. 12,
        Divyadarshan Housing Society, Kothrud, Pune 411038) Monday to
        Saturday, 9 AM to 8 PM; live online batches run on Zoom / Google
        Meet on the same dates. Typical timings include 7:30–9:30 AM,
        10 AM–12 PM, 4–6 PM and 6:30–8:30 PM weekdays, plus 9 AM–1 PM and
        2–6 PM weekend slots. Every batch includes lifetime LMS recordings,
        mentor 1:1s and placement assistance. Custom timings can be
        arranged on request when trainer availability permits.
      </DefinitiveAnswer>

      {/* Schedule Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="offline" className="w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <TabsList
                size="lg"
                className="grid w-full max-w-3xl grid-cols-1 gap-2 border border-primary/10 bg-primary/5 shadow-sm sm:grid-cols-2"
              >
                <TabsTrigger
                  value="offline"
                  className="flex min-h-20 flex-col items-start justify-center gap-1 border border-transparent bg-transparent px-4 text-left text-foreground/75 hover:bg-background/80 hover:text-foreground data-active:border-primary/15 data-active:bg-background data-active:text-primary data-active:shadow-sm sm:items-center sm:text-center"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 shrink-0" />
                    <span>Offline Batches</span>
                  </span>
                  <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                    Classroom training in Pune
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="online"
                  className="flex min-h-20 flex-col items-start justify-center gap-1 border border-transparent bg-transparent px-4 text-left text-foreground/75 hover:bg-background/80 hover:text-foreground data-active:border-primary/15 data-active:bg-background data-active:text-primary data-active:shadow-sm sm:items-center sm:text-center"
                >
                  <span className="flex items-center gap-2">
                    <Monitor className="h-5 w-5 shrink-0" />
                    <span>Online Batches</span>
                  </span>
                  <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                    Live instructor-led sessions
                  </span>
                </TabsTrigger>
              </TabsList>
              <p className="text-sm text-muted-foreground">
                Last updated: April 2026
              </p>
            </div>

            <TabsContent value="offline">
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Classroom Training in Pune
                </h3>
                <p className="text-sm text-muted-foreground">
                  In-person classes at our training center. Small batch sizes for
                  personalized attention.
                </p>
              </div>
              <BatchTable batches={offlineBatches} />
            </TabsContent>

            <TabsContent value="online">
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-primary" />
                  Live Online Training
                </h3>
                <p className="text-sm text-muted-foreground">
                  Interactive live classes via Zoom/Google Meet. Learn from
                  anywhere with the same quality training.
                </p>
              </div>
              <BatchTable batches={onlineBatches} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold mb-2">Custom Batch Timing</h3>
                <p className="text-sm text-muted-foreground">
                  Need a different timing? Contact us for custom batch arrangements.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold mb-2">Weekend Batches</h3>
                <p className="text-sm text-muted-foreground">
                  Weekend-only batches available for working professionals.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold mb-2">Fast Track Options</h3>
                <p className="text-sm text-muted-foreground">
                  Accelerated courses available for quick completion.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ block + FAQPage JSON-LD — practical scheduling questions
          (start dates, timings, offline vs online, switching, missed
          classes, weekend cohorts). P8-08. */}
      <FaqSection
        heading="Batch Schedule — FAQs"
        intro="Start dates, weekday and weekend timings, offline vs online format, switching mid-course, and what happens if you miss a class."
        items={batchScheduleFaqs}
      />

      {/* CTA Section */}
      <section className="py-16 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can&apos;t Find a Suitable Batch?
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Contact us to discuss your requirements. We can arrange custom timings
            or notify you when new batches are scheduled.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="cta_clicked"
              properties={{ cta: "contact_us", location: "batch_schedule_bottom" }}
            >
              Contact Us
            </TrackedLink>
            <TrackedAnchor
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
              event="contact_method_clicked"
              properties={{ method: "phone", location: "batch_schedule_bottom" }}
            >
              <Phone className="h-4 w-4" />
              {siteConfig.contact.phone}
            </TrackedAnchor>
          </div>
        </div>
      </section>
    </>
  );
}
