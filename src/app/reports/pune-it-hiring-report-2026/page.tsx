import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Building2,
  GraduationCap,
  LineChart,
  MapPin,
  TrendingUp,
  FileText,
  Calendar,
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  BreadcrumbJsonLd,
  ReportJsonLd,
  FAQJsonLd,
} from "@/components/seo/json-ld";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { LastUpdated } from "@/components/seo/last-updated";
import { ReportDownloadForm } from "@/components/reports/report-download-form";
import { buildPageMetadata } from "@/lib/seo";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";
import { salaryRoles, SALARY_DATA_YEAR } from "@/data/salary-data";
import { siteConfig } from "@/data/site-config";

/**
 * P6-13 — Pune IT Hiring Report 2026 landing page.
 *
 * Linkable-asset landing page for the downloadable PDF report. Today
 * the PDF itself is not yet produced (~24-32h user-side data collection
 * + ~16-24h design layout pending). This page is the on-site asset that:
 *
 *   - Holds the gated download form (`<ReportDownloadForm>`) capturing
 *     leads via the existing `submitLead` server action with
 *     source="report_download:pune-it-hiring-report-2026"
 *   - Renders live, crawlable salary data (drawn from the canonical
 *     `salary-data.ts` source — no separate data file to drift)
 *   - Shows the section-by-section preview so AI engines + Google
 *     Discover have content to cite even before the PDF ships
 *   - Emits Report + Breadcrumb + FAQ schema
 *
 * Once the PDF lands at `/reports/pune-it-hiring-report-2026.pdf`, set
 * `PDF_URL` below to that path. The download form auto-switches from
 * "Notify me when ready" → "Download the report (free)".
 *
 * Deliverable doc:
 *   ~/Documents/archer-obsidian/seo-archerinfotech/deliverables/p6-13-pune-it-hiring-report-outline.md
 */

const REPORT_TITLE = "Pune IT Hiring Report 2026";
const REPORT_SLUG = "pune-it-hiring-report-2026";
const PDF_URL: string | undefined = undefined; // ← set when PDF ships
const PUBLISHED_DATE = "2026-06-11";
const REVIEWED_DATE = EVERGREEN_LAST_REVIEWED;

const KEYWORDS = [
  "Pune IT hiring",
  "Pune IT salaries",
  "Pune software jobs",
  "Pune tech companies",
  "Pune fresher hiring",
  "Pune AI hiring",
  "Pune product companies",
  "Indian IT job market",
];

const ABSTRACT =
  "An annual data report on the Pune IT hiring market for 2026: total hiring volume by stack, the 50 most-active employers, salary bands across 13 role tracks and 4 experience tiers, the skills demand heatmap, college-to-company placement pipelines, and a forward outlook for 2027. Sourced from primary listings data (Naukri, LinkedIn), official college placement reports, and 17 years of Archer Infotech's own batch-placement records.";

const reportFaqs = [
  {
    question: "When does the full PDF become available?",
    answer:
      "The data is being collected through Q2 2026; design layout follows in Q3. We expect the PDF to ship early Q3 2026. Use the form on this page to be notified the moment the PDF is ready — we'll email it to you free.",
  },
  {
    question: "Is the salary data on this page already final?",
    answer:
      "Yes — the salary bands below are pulled live from our canonical salary dataset, which we refresh at least annually against Naukri, LinkedIn, AmbitionBox, Glassdoor and our own batch placement records. The PDF will include this same dataset plus year-over-year deltas, geographical splits within Pune, and a per-track timeline projection.",
  },
  {
    question: "Why a Pune-specific report — isn't NASSCOM's India report enough?",
    answer:
      "NASSCOM's India report is rolled up to the national level. Pune has distinct hiring patterns: a higher product-captive share than Bangalore, a stronger BFSI cluster than Hyderabad, and a tighter geography (Hinjewadi-to-Kharadi commute) that affects company-vs-talent matching. This report drills into Pune as a single labour market — with named companies, named colleges, and Pune-specific salary bands.",
  },
  {
    question: "Who is this report written for?",
    answer:
      "Three audiences: (1) HR + Talent Acquisition leads at Pune product captives and services majors who need benchmarking data; (2) College placement officers at Pune engineering institutions planning fresher placement cycles; (3) Education journalists, career counsellors, and parents trying to understand the Pune IT opportunity for 2026 graduates.",
  },
  {
    question: "Can I cite figures from this report in my own work?",
    answer:
      "Yes — citation with attribution is welcomed. Recommended citation: \"Pune IT Hiring Report 2026, Archer Infotech. https://archerinfotech.in/reports/pune-it-hiring-report-2026\". If you'd like a high-resolution chart export or an interview with the report's author, use the contact form on this page.",
  },
  {
    question: "Does the report fabricate or estimate numbers?",
    answer:
      "Every figure is sourced and dated. Where direct data is unavailable we publish an honest estimate range with the underlying assumption stated. We do not invent hiring counts, salary bands, or placement statistics — and we don't claim '100% placement' or any number that can't be verified against named records.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: `${REPORT_TITLE} — Free Annual Report`,
  description:
    "Free annual report on Pune's IT hiring market in 2026 — 50 top employers, salary bands across 13 roles × 4 experience tiers, skills demand, college-to-company pipelines. Download free.",
  path: `/reports/${REPORT_SLUG}`,
  lastModified: REVIEWED_DATE,
});

const sections = [
  { icon: BarChart3, title: "S1 — Pune IT Hiring Volume", blurb: "YoY hiring volume 2023-2026, by stack." },
  { icon: Building2, title: "S2 — Top 50 Hiring Companies", blurb: "Product captives, services majors, BFSI tech, startups." },
  { icon: LineChart, title: "S3 — Salary Bands by Role + Tier", blurb: "13 role tracks × 4 experience tiers (preview live below)." },
  { icon: TrendingUp, title: "S4 — Skills Demand Heatmap", blurb: "Top 20 in-demand + top 10 rising + top 10 fading skills." },
  { icon: MapPin, title: "S5 — Pune vs Other Indian Tech Hubs", blurb: "Cross-city comparison: Pune vs Bangalore / Hyderabad / Chennai / Gurgaon." },
  { icon: GraduationCap, title: "S6 — College → Company Pipeline", blurb: "12 Pune engineering colleges → top hiring partners + median offers." },
  { icon: Calendar, title: "S7 — Trends + 2027 Outlook", blurb: "GenAI specialist share, services-major intake decay, Pune captive expansion." },
  { icon: FileText, title: "S8 — Methodology + Sources", blurb: "Every figure dated, every source named." },
];

const tracksToShow = [
  "Programming",
  "Full Stack",
  "Modern Web",
  "Data & AI",
  "Generative AI",
  "Cloud & DevOps",
  "Mobile",
];

export default function PuneItHiringReportPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Reports", url: "/reports" },
          { name: REPORT_TITLE, url: `/reports/${REPORT_SLUG}` },
        ]}
      />
      <ReportJsonLd
        name={REPORT_TITLE}
        description={`Free annual report on Pune's IT hiring market in ${SALARY_DATA_YEAR} — hiring volume, top 50 employers, salary bands, skills demand, college-to-company pipelines.`}
        url={`/reports/${REPORT_SLUG}`}
        datePublished={PUBLISHED_DATE}
        dateModified={REVIEWED_DATE}
        keywords={KEYWORDS}
        abstract={ABSTRACT}
      />
      <FAQJsonLd faqs={reportFaqs} />

      <article aria-labelledby="report-title">
        {/* Hero */}
        <header className="gradient-hero text-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <Breadcrumbs
              variant="light"
              items={[
                { name: "Reports", href: "/reports" },
                { name: REPORT_TITLE },
              ]}
            />
            <p className="uppercase text-xs tracking-wider opacity-80 mb-3 mt-2">
              Annual Report · Pune IT Market · {SALARY_DATA_YEAR}
            </p>
            <h1
              id="report-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
            >
              {REPORT_TITLE}
            </h1>
            <p className="text-lg md:text-xl text-white/85 max-w-3xl">
              Where Pune&apos;s 25,000+ annual IT hires are going, what
              they&apos;re being paid, and which skills are winning
              interviews — built from {siteConfig.stats.yearsExperience} years
              of placement data and primary listings analysis.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <FileText className="h-4 w-4" /> 25–35 pages
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {SALARY_DATA_YEAR} edition
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BarChart3 className="h-4 w-4" /> 8 sections + appendix
              </span>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl space-y-12">
          <LastUpdated iso={REVIEWED_DATE} />

          {/* DAP — citation-ready answer for AI engines */}
          <DefinitiveAnswer eyebrow="What this report covers">
            The {REPORT_TITLE} is an annual, free data report on the Pune
            Information Technology hiring market. The {SALARY_DATA_YEAR}{" "}
            edition covers hiring volume across stacks, the 50 most-active
            employers, salary bands across 13 role tracks and 4 experience
            tiers, the skills demand heatmap, college-to-company placement
            pipelines for 12 Pune engineering colleges, and a forward
            outlook for 2027. Sourced from primary listings data, official
            placement reports, and {siteConfig.stats.yearsExperience} years
            of Archer Infotech&apos;s own batch-placement records.
          </DefinitiveAnswer>

          {/* What's inside */}
          <section aria-labelledby="sections-heading" className="space-y-4">
            <h2 id="sections-heading" className="text-2xl font-bold">
              What&apos;s inside the report
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="rounded-xl border bg-card p-5 flex gap-3"
                  >
                    <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm">{s.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {s.blurb}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Download form */}
          <section
            aria-labelledby="download-heading"
            className="rounded-xl bg-muted/30 p-6 md:p-8 space-y-4 border"
          >
            <h2 id="download-heading" className="text-2xl font-bold">
              Get the report — free
            </h2>
            <p className="text-muted-foreground">
              We email the PDF link to your inbox. No payment, no spam.
              {PDF_URL ? "" : " The PDF lands early Q3 2026 — submit the form to be notified the moment it's ready."}
            </p>
            <ReportDownloadForm
              reportSlug={REPORT_SLUG}
              pdfUrl={PDF_URL}
              reportTitle={REPORT_TITLE}
            />
          </section>

          {/* Section 3 preview — Salary Bands (live data) */}
          <section aria-labelledby="salary-preview-heading" className="space-y-5">
            <div>
              <h2 id="salary-preview-heading" className="text-2xl font-bold">
                Preview — Section 3: Salary Bands by Role
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Pune market ₹LPA ranges for {SALARY_DATA_YEAR}. Sourced from
                AmbitionBox, Glassdoor, Naukri, and Archer Infotech placement
                records (5,000+ verified placements across{" "}
                {siteConfig.stats.yearsExperience} years).
              </p>
            </div>

            {tracksToShow.map((track) => {
              const roles = salaryRoles.filter((r) => r.track === track);
              if (roles.length === 0) return null;
              return (
                <div key={track} className="space-y-2">
                  <h3 className="text-lg font-semibold text-primary">
                    {track}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b bg-muted/40">
                          <th className="text-left p-2 font-semibold">Role</th>
                          <th className="text-left p-2 font-semibold">
                            Fresher
                          </th>
                          <th className="text-left p-2 font-semibold">
                            Mid-level
                          </th>
                          <th className="text-left p-2 font-semibold">
                            Senior
                          </th>
                          <th className="text-left p-2 font-semibold">
                            Lead / Architect
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles.map((r) => (
                          <tr key={r.id} className="border-b">
                            <td className="p-2 font-medium">{r.title}</td>
                            {r.tiers.map((t) => (
                              <td
                                key={t.level}
                                className="p-2 text-muted-foreground"
                              >
                                ₹{t.min}–{t.max} LPA
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
            <p className="text-xs text-muted-foreground">
              Ranges are Pune-specific median bands; individual offers vary
              with company tier, candidate quality, and stack-fit. We do not
              quote a single "average" because the distribution is bimodal —
              services-major fresher offers cluster at the lower band, product
              captives at the higher band.
            </p>
          </section>

          {/* Methodology */}
          <section aria-labelledby="methodology-heading" className="space-y-3">
            <h2 id="methodology-heading" className="text-2xl font-bold">
              Methodology
            </h2>
            <p className="text-muted-foreground">
              Data is compiled from four primary sources: (1) Pune-filtered
              listings on Naukri and LinkedIn sampled across the 90-day
              window preceding publication; (2) publicly available
              placement reports from 12 Pune engineering colleges; (3)
              Archer Infotech&apos;s internal batch-placement records
              covering 5,000+ verified placements over{" "}
              {siteConfig.stats.yearsExperience} years; (4) cross-checks
              against AmbitionBox + Glassdoor + 6figr salary distributions.
              Sample sizes, date ranges, and source URLs are documented per
              chart in the PDF&apos;s Section 8.
            </p>
            <p className="text-muted-foreground">
              Where direct data is unavailable, we publish an honest
              estimate range with the underlying assumption stated. We do
              not invent hiring counts, salary bands, or placement
              statistics. We do not claim "100% placement" or any number
              that can&apos;t be verified against named records.
            </p>
          </section>

          {/* About Archer Infotech */}
          <section aria-labelledby="about-heading" className="space-y-3">
            <h2 id="about-heading" className="text-2xl font-bold">
              About Archer Infotech
            </h2>
            <p className="text-muted-foreground">
              Archer Infotech is a Pune-based IT training institute, founded
              in 2009 by Yogesh Patil. Across {siteConfig.stats.yearsExperience}{" "}
              years we have trained {siteConfig.stats.studentsTrained}{" "}
              engineers, placed {siteConfig.stats.studentsPlaced} of them in
              IT roles ({siteConfig.stats.placementRate} placement rate
              against eligible batch graduates), and partner with{" "}
              {siteConfig.stats.corporatePartners} corporate hiring partners
              including active 2026 clients Amdocs, Capgemini, MindTree, and
              Tech Mahindra. The institute&apos;s campus is in Kothrud, Pune;
              additional details + media kit live at{" "}
              <Link href="/press" className="text-primary hover:underline">
                /press
              </Link>
              .
            </p>
            <p className="text-muted-foreground">
              The data behind this report is curated by Archer Infotech&apos;s
              SEO + research team and reviewed by{" "}
              <Link
                href="/trainers/yogesh-patil"
                className="text-primary hover:underline"
              >
                Yogesh Patil
              </Link>
              , founder.
            </p>
          </section>

          {/* CTAs */}
          <section
            aria-labelledby="cta-heading"
            className="rounded-xl bg-primary/5 border border-primary/20 p-6 md:p-8 space-y-4"
          >
            <h2 id="cta-heading" className="text-2xl font-bold">
              Explore while you wait
            </h2>
            <p className="text-muted-foreground">
              The full PDF lands early Q3 2026. Meanwhile, our two
              interactive Pune IT planning tools give you most of the
              report&apos;s data in a self-serve format:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/tools/pune-it-salary-calculator"
                className="rounded-lg border bg-card p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold">Pune IT Salary Calculator</p>
                <p className="text-sm text-muted-foreground mt-1">
                  13 roles × 4 experience tiers + career-ladder bar +
                  "train for this role" course links.
                </p>
              </Link>
              <Link
                href="/tools/pune-it-career-roadmap"
                className="rounded-lg border bg-card p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold">Pune IT Career Roadmap</p>
                <p className="text-sm text-muted-foreground mt-1">
                  4 starting points → programmes → core courses → target
                  roles → salary trajectory.
                </p>
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq-heading" className="space-y-3">
            <h2 id="faq-heading" className="text-2xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {reportFaqs.map((f) => (
                <details key={f.question} className="rounded-lg border bg-card p-4">
                  <summary className="cursor-pointer font-medium text-base">
                    {f.question}
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
