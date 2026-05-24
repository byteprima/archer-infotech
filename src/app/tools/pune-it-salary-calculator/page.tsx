import { Metadata } from "next";
import Link from "next/link";
import { Calculator, Database, TrendingUp } from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { SalaryCalculator } from "@/components/tools/salary-calculator";
import { buildPageMetadata } from "@/lib/seo";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";
import { getCourse } from "@/data/courses";
import { siteConfig } from "@/data/site-config";
import {
  salaryRoles,
  SALARY_DATA_YEAR,
  formatRange,
  formatLpa,
} from "@/data/salary-data";

const baseUrl = siteConfig.url;
const PAGE_PATH = "/tools/pune-it-salary-calculator";

export const metadata: Metadata = buildPageMetadata({
  title: `Pune IT Salary Calculator ${SALARY_DATA_YEAR}`,
  description: `Free Pune IT salary calculator for ${SALARY_DATA_YEAR} — pick a role (Java, Python, full-stack, data science, AI/ML, cloud, DevOps) and experience level to see realistic Pune salary ranges, with the courses that lead to each role.`,
  path: PAGE_PATH,
  lastModified: EVERGREEN_LAST_REVIEWED,
});

const salaryFaqs = [
  {
    question: `What is the average IT salary in Pune in ${SALARY_DATA_YEAR}?`,
    answer:
      "Pune IT freshers (0–2 years) typically earn ₹3.5–6 LPA across most tracks. Mid-level professionals (3–5 years) earn roughly ₹8–18 LPA, and senior engineers (5–8 years) ₹15–35 LPA. AI/ML, cloud and data roles sit at the top of each band.",
  },
  {
    question: "Which IT role pays the most in Pune?",
    answer:
      "AI / GenAI engineers and Machine Learning engineers command the highest pay in Pune in 2026, followed by cloud architects and data scientists. Senior AI engineers can cross ₹40–50 LPA, well above typical full-stack or backend bands.",
  },
  {
    question: "How much does a fresher software developer earn in Pune?",
    answer:
      "A fresher software developer in Pune typically earns ₹3.5–6 LPA. Full-stack, data-science and AI tracks tend to start slightly higher (₹4–7 LPA), while services-company entry roles often start around ₹3.5 LPA.",
  },
  {
    question: "Are Pune IT salaries lower than Bengaluru or Hyderabad?",
    answer:
      "At entry level Pune is broadly comparable to Bengaluru and Hyderabad. At senior levels Pune typically runs around 10% below Bengaluru, but with a meaningfully lower cost of living, so take-home value is competitive.",
  },
  {
    question: "How is this salary calculator's data sourced?",
    answer:
      `Ranges are aggregated from AmbitionBox, Glassdoor, Indeed and PayScale Pune data for ${SALARY_DATA_YEAR}, cross-checked against Archer Infotech's own placement records. Figures are Pune-specific and updated annually — they're estimates, not guarantees.`,
  },
];

export default function SalaryCalculatorPage() {
  // Resolve course links once, server-side, and hand a plain map to the
  // client calculator (keeps the catalogue the single source of truth).
  const courseLinks: Record<string, { title: string; href: string }> = {};
  for (const role of salaryRoles) {
    for (const slug of role.courseSlugs) {
      const course = getCourse(slug);
      if (course) {
        courseLinks[slug] = {
          title: course.shortTitle,
          href: `/courses/${course.categorySlug}/${slug}`,
        };
      }
    }
  }

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `Pune IT Salary Calculator ${SALARY_DATA_YEAR}`,
    url: `${baseUrl}${PAGE_PATH}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: `Estimate IT salary ranges in Pune by role and experience for ${SALARY_DATA_YEAR}.`,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    provider: {
      "@type": "EducationalOrganization",
      "@id": baseUrl,
      name: siteConfig.name,
    },
  };

  return (
    <>
      <PageEvent event="salary_calculator_viewed" properties={{ page_path: PAGE_PATH }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools/pune-it-salary-calculator" },
          { name: "Pune IT Salary Calculator", url: PAGE_PATH },
        ]}
      />

      {/* Hero */}
      <header className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs variant="light" items={[{ name: "Pune IT Salary Calculator" }]} />
          <div className="flex items-center gap-2 text-white/80 text-sm mb-3">
            <Calculator className="h-4 w-4 text-secondary" />
            <span>Free tool · updated {SALARY_DATA_YEAR}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
            Pune IT Salary Calculator {SALARY_DATA_YEAR}
          </h1>
          <p className="text-lg text-white/85 max-w-3xl">
            Pick a role and experience level to see realistic Pune salary ranges
            for {SALARY_DATA_YEAR} — and the training path that gets you there.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 md:py-16 space-y-14 max-w-4xl">
        {/* Definitive answer for AEO/featured snippet */}
        <DefinitiveAnswer eyebrow={`Pune IT salaries at a glance (${SALARY_DATA_YEAR})`}>
          IT salaries in Pune in {SALARY_DATA_YEAR} typically range from ₹3.5–6 LPA
          for freshers (0–2 years), ₹8–18 LPA at mid-level (3–5 years), and
          ₹15–35 LPA for senior engineers (5–8 years). AI/GenAI, machine
          learning and cloud roles pay the most, while services-company backend
          and frontend roles anchor the entry bands. Use the calculator below to
          see the range for a specific role and experience level.
        </DefinitiveAnswer>

        {/* Calculator */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <Calculator className="h-7 w-7 text-secondary" />
            Calculate your Pune IT salary
          </h2>
          <SalaryCalculator courseLinks={courseLinks} />
        </section>

        {/* Server-rendered full dataset — crawlable + AI-citable */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-secondary" />
            Pune IT salary ranges by role &amp; experience ({SALARY_DATA_YEAR})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-semibold">Role</th>
                  <th className="text-left p-3 font-semibold">Fresher (0–2y)</th>
                  <th className="text-left p-3 font-semibold">Mid (3–5y)</th>
                  <th className="text-left p-3 font-semibold">Senior (5–8y)</th>
                  <th className="text-left p-3 font-semibold">Lead (8y+)</th>
                  <th className="text-left p-3 font-semibold">Pune avg</th>
                </tr>
              </thead>
              <tbody>
                {salaryRoles.map((role) => {
                  const t = Object.fromEntries(role.tiers.map((x) => [x.level, x]));
                  return (
                    <tr key={role.id} className="border-t">
                      <td className="p-3 font-medium">{role.title}</td>
                      <td className="p-3">{formatRange(t.fresher.min, t.fresher.max)}</td>
                      <td className="p-3">{formatRange(t.mid.min, t.mid.max)}</td>
                      <td className="p-3">{formatRange(t.senior.min, t.senior.max)}</td>
                      <td className="p-3">{formatRange(t.lead.min, t.lead.max)}</td>
                      <td className="p-3 font-medium text-primary">{formatLpa(role.puneAverage)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            All figures are ₹ lakh per annum (LPA), Pune-specific, for{" "}
            {SALARY_DATA_YEAR}. Ranges are estimates, not guarantees.
          </p>
        </section>

        {/* Methodology */}
        <section className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <Database className="h-7 w-7 text-secondary" />
            Methodology &amp; sources
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Ranges are aggregated from <strong>AmbitionBox</strong>,{" "}
            <strong>Glassdoor</strong>, <strong>Indeed</strong> and{" "}
            <strong>PayScale</strong> Pune salary data for {SALARY_DATA_YEAR},
            cross-checked against Archer Infotech&apos;s own placement records
            (5,000+ students placed). Bands reflect typical total compensation
            for the Pune market at each experience level. Individual offers vary
            with company tier, skills, interview performance and negotiation —
            treat these as well-grounded estimates, not guarantees. We refresh
            the dataset annually.
          </p>
        </section>

        {/* FAQ */}
        <FaqSection
          heading="Pune IT salary — FAQs"
          intro="Common questions about IT pay in Pune by role, experience and city comparison."
          items={salaryFaqs}
        />

        {/* CTA */}
        <section className="rounded-xl border bg-muted/30 p-6 md:p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Want to earn at the top of these bands?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Archer Infotech&apos;s placement-backed courses train you for these
            exact Pune roles. Book a free demo and we&apos;ll map a path from
            where you are to the salary you&apos;re targeting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="course_enquiry_clicked"
              properties={{ location: "salary_calculator_cta" }}
            >
              Book a Free Demo
            </TrackedLink>
            <Link
              href="/placements"
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
            >
              See our placement records
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
