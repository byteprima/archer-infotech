import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  BreadcrumbJsonLd,
  CategoryCollectionJsonLd,
} from "@/components/seo/json-ld";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { buildPageMetadata } from "@/lib/seo";
import { EVERGREEN_LAST_REVIEWED, NEW_ASSETS_LAST_REVIEWED } from "@/lib/seo/content-dates";
import { LastUpdated } from "@/components/seo/last-updated";
import { SourceCitations } from "@/components/seo/source-citations";
import { sourcesForTopics } from "@/data/authoritative-sources";
import { FaqSection } from "@/components/seo/faq-section";
import { reportsHubFaqs } from "@/data/hub-faqs";

/**
 * P6-13 — Reports hub.
 *
 * Currently a single-report hub (Pune IT Hiring Report 2026). Future
 * editions (2027+) and any additional standalone reports go here.
 */

export const metadata: Metadata = buildPageMetadata({
  title: "Reports — Annual Pune IT Market Data",
  description:
    "Free annual data reports on the Pune IT market — hiring volume, salary bands, top employers, skills demand, and college-to-company placement pipelines.",
  path: "/reports",
  lastModified: EVERGREEN_LAST_REVIEWED,
});

const reports = [
  {
    slug: "pune-it-hiring-report-2026",
    title: "Pune IT Hiring Report 2026",
    blurb:
      "Where Pune's 25,000+ annual IT hires are going, what they're being paid, and which skills are winning interviews. 25-35 pages, 8 sections, free PDF.",
    status: "preview-live" as const,
  },
];

export default function ReportsHub() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Reports", url: "/reports" },
        ]}
      />
      <CategoryCollectionJsonLd
        name="Reports — Annual Pune IT Market Data"
        description="Free annual data reports on the Pune IT market — hiring volume, salary bands, top employers, skills demand, and placement pipelines."
        url="/reports"
        items={reports.map((r) => ({
          name: r.title,
          url: `/reports/${r.slug}`,
          description: r.blurb,
        }))}
      />

      <article aria-labelledby="hub-title">
        <header className="gradient-hero text-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <Breadcrumbs variant="light" items={[{ name: "Reports" }]} />
            <p className="uppercase text-xs tracking-wider opacity-80 mb-3 mt-2">
              Pune IT · Annual Reports
            </p>
            <h1
              id="hub-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
            >
              Pune IT Market Reports
            </h1>
            <LastUpdated iso={NEW_ASSETS_LAST_REVIEWED} className="mt-3 text-xs md:text-sm text-white/70" />
            <p className="text-lg md:text-xl text-white/85 max-w-3xl">
              Free annual data reports on Pune&apos;s IT hiring market —
              built from primary listings analysis and 17+ years of
              placement records.
            </p>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl space-y-10">
          <DefinitiveAnswer eyebrow="About these reports">
            We publish free, annual data reports on the Pune IT hiring
            market. Each report covers hiring volume, top employers,
            salary bands, skills demand, college placement pipelines, and a
            forward outlook. Every figure is sourced and dated; we don&apos;t
            invent numbers or claim &quot;100% placement&quot;. Use the form
            on each report&apos;s page to download the PDF.
          </DefinitiveAnswer>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((r) => (
              <Link
                key={r.slug}
                href={`/reports/${r.slug}`}
                className="rounded-xl border bg-card p-6 hover:border-primary hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex items-center gap-2 text-primary mb-3">
                  <FileText className="h-5 w-5" />
                  <h2 className="font-semibold text-lg">{r.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground flex-grow">
                  {r.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium">
                  See preview + download
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </section>
        </div>
      </article>
      <SourceCitations
        heading="Curriculum references"
        intro="Official documentation for the technologies referenced on this page."
        items={sourcesForTopics(["java-full-stack", "python", "data-science", "aws"])}
      />

      {/* Hub-level FAQ — gives this page question-shaped headings,
          adjacent answers and a FAQPage payload it previously had none
          of. Content is specific to this hub, not shared boilerplate.
          Audit 2026-08-09. */}
      <FaqSection heading="About these reports — FAQs" items={reportsHubFaqs} />

    </>
  );
}
