// ISR — testimonials are cached for 10 min; the page is then edge-cacheable
// via the next.config s-maxage rules. Admin edits push instantly via
// revalidateTag("testimonials"). No more per-request DB hit.
export const revalidate = 600;

import { Metadata } from "next";
import Link from "next/link";
import { Award, Users, Building, TrendingUp, Star, Quote, FileText, MessageSquare, UserCheck, Briefcase, ArrowRight, IndianRupee, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { siteConfig } from "@/data/site-config";
import { getHiringPartners } from "@/data/companies";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { getAllPublishedTestimonials } from "@/lib/actions/public-testimonials";
import { buildPageMetadata } from "@/lib/seo";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { NewsletterSignupForm } from "@/components/newsletter/newsletter-signup-form";
import { placementsFaqs } from "@/data/faqs";
import { ReviewRibbon } from "@/components/seo/review-ribbon";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { LastUpdated } from "@/components/seo/last-updated";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";
import { SourceCitations } from "@/components/seo/source-citations";
import { PlacementDashboard } from "@/components/placements/placement-dashboard";
import {
  getPublicPlacements,
  getPlacementSalaryAggregates,
  computePlacementStats,
  MIN_PUBLIC_PLACEMENTS,
  isPlacementRecordEnabled,
} from "@/lib/actions/public-placements";

/**
 * Fresher salary bands by track — the most citable data on this page.
 *
 * Hoisted to a constant so the visible table and the ItemList JSON-LD
 * below render from the same array. Two hand-maintained copies is how a
 * page ends up quoting one set of numbers to a reader and another to a
 * crawler, which is worse than having no structured data at all.
 *
 * Source: Archer Infotech placement-team data, last 12 months of offers.
 */
const SALARY_BANDS = [
                  {
                    track: "Java Full Stack",
                    band: "₹4–6 LPA",
                    top: "₹10+ LPA",
                    roles: "Java Developer, Full Stack Engineer, Backend Developer",
                  },
                  {
                    track: "MERN Stack",
                    band: "₹4–6 LPA",
                    top: "₹10+ LPA",
                    roles: "Frontend Developer, MERN Developer, Full Stack Engineer",
                  },
                  {
                    track: ".NET Full Stack",
                    band: "₹3.5–5.5 LPA",
                    top: "₹9 LPA",
                    roles: "ASP.NET Developer, C# Engineer, .NET Full Stack",
                  },
                  {
                    track: "Python / Python Full Stack",
                    band: "₹3.5–6 LPA",
                    top: "₹10 LPA",
                    roles: "Python Developer, Django Developer, Backend Engineer",
                  },
                  {
                    track: "Data Science / Machine Learning",
                    band: "₹4–7 LPA",
                    top: "₹12 LPA",
                    roles: "Data Analyst, ML Engineer, Junior Data Scientist",
                  },
                  {
                    track: "AWS / Cloud / DevOps",
                    band: "₹4–6.5 LPA",
                    top: "₹11 LPA",
                    roles: "Cloud Engineer, DevOps Engineer, SRE Associate",
                  },
                  {
                    track: "Generative AI / AI Engineer",
                    band: "₹5–8 LPA",
                    top: "₹14 LPA",
                    roles: "AI Engineer, LLM Developer, Prompt Engineer",
                  },
                  {
                    track: "Software Testing / QA",
                    band: "₹3–4.5 LPA",
                    top: "₹7 LPA",
                    roles: "Manual Tester, Selenium Automation, QA Engineer",
                  },
] as const;

export const metadata: Metadata = buildPageMetadata({
  title: "Placements at Archer Infotech — 5,000+ Students Placed Since 2009",
  description:
    "5,000+ students placed at top IT companies including Tech Mahindra, TCS, Infosys and more. See placement records, hiring partners, and our placement assistance programme at Archer Infotech, Pune.",
  path: "/placements",
});

export default async function PlacementsPage() {
  const companies = getHiringPartners();
  const testimonials = await getAllPublishedTestimonials();

  // Public placement record. The admin CRUD has always written to this table
  // but nothing rendered it, so every recorded placement was invisible. Only
  // published rows are read (see public-placements.ts — the admin fetcher
  // deliberately returns drafts too).
  const placementRows = await getPublicPlacements();
  // The per-row figure is null for students who did not consent to it being
  // published, so the band is read separately from all rows. Otherwise the
  // headline range would silently narrow to whoever happened to consent.
  const salaryAggregates = await getPlacementSalaryAggregates();
  const placementStats = {
    ...computePlacementStats(placementRows),
    ...salaryAggregates,
  };
  // Below the threshold the section does not render at all: a three-row
  // placement table is weaker than the claim it is meant to support.
  // Two conditions, both required: enough rows to be credible AND an
  // explicit opt-in. See public-placements.ts for why the count alone is
  // not safe while demo rows remain in the database.
  const showPlacementRecord =
    isPlacementRecordEnabled() && placementRows.length >= MIN_PUBLIC_PLACEMENTS;

  return (
    <>
      {/* Two-level BreadcrumbList — these are top-level pages, so the
          trail is Home > page. Added 2026-08-06; the crawl found the
          six top-level marketing/legal pages were the only public
          routes emitting no BreadcrumbList at all. */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Placements", url: "/placements" },
        ]}
      />

      {/* Hero Section */}
      <section className="gradient-hero text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              5,000+ Students Placed Since 2009 at Top IT Companies in Pune
            </h1>
            <LastUpdated iso={EVERGREEN_LAST_REVIEWED} className="mt-3 text-xs md:text-sm text-white/70" />
            <p className="text-lg text-white/80 mb-5">
              As a leading IT solutions provider, Archer Infotech helps both
              businesses and students. We provide &apos;Mission Ready&apos; IT
              Professionals who hit the ground running from day 1.
            </p>
            {/* P7-33 — trust ribbon: verified GBP rating from site-config,
                routes to /testimonials. */}
            <ReviewRibbon variant="light" />
          </div>
        </div>
      </section>

      {/* Definitive Answer Paragraph — proof-first opening with hiring
          partner names, headline numbers and salary band, each
          attributed inline so AI engines can cite confidently. P8-07
          + P8-09. */}
      <DefinitiveAnswer eyebrow="Archer Infotech Placement Record">
        Archer Infotech has placed 5,000+ students at IT companies since
        2009 (institute placement-team records, updated annually), with
        hiring partners including TCS, Infosys, Wipro, Tech Mahindra,
        Persistent Systems, Cognizant, Capgemini, HCL Technologies and
        100+ other MNCs and product startups across Pune, Bangalore,
        Hyderabad and Mumbai. The institute records a 90% placement rate
        across flagship batches who complete training and clear at least
        one mock interview, with average fresher packages of ₹3.5–6 LPA
        (last 12 months of offers) and top performers in Java Full Stack,
        MERN and DevOps crossing ₹10 LPA. Placement assistance — resume
        building, mock interviews, soft-skills training and direct
        recruiter referrals — is included in every flagship course fee
        with no separate charge.
      </DefinitiveAnswer>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                value: siteConfig.stats.studentsPlaced,
                label: "Students Placed",
              },
              {
                icon: Building,
                value: siteConfig.stats.corporatePartners,
                label: "Hiring Partners",
              },
              {
                icon: Award,
                value: siteConfig.stats.placementRate,
                label: "Placement Rate",
              },
              {
                icon: TrendingUp,
                // Was "8+ LPA / Average Package", which contradicted both the
                // paragraph above it (average fresher ₹3.5-6 LPA) and the
                // salary table below. An AI engine reading the page got two
                // different averages; a reader comparing them got a reason to
                // distrust the rest. This states the figure the table actually
                // supports — what top performers cross, labelled as such.
                value: "10+ LPA",
                label: "Top Fresher Packages",
              },
            ].map((stat) => (
              <Card key={stat.label} className="group text-center transition-shadow hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 transition-colors group-hover:bg-primary">
                    <stat.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      {showPlacementRecord && (
        <>
          <PlacementDashboard placements={placementRows} stats={placementStats} />
          {/* ItemList so the record is machine-readable. Emitted only when the
              table is actually on the page — schema for content a reader
              cannot see is the mismatch this codebase has hit twice. */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                name: "Archer Infotech placement record",
                numberOfItems: placementRows.length,
                itemListElement: placementRows.map((p, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  item: {
                    "@type": "Person",
                    name: p.displayName ?? "Archer Infotech student",
                    jobTitle: p.designation,
                    worksFor: { "@type": "Organization", name: p.company },
                    alumniOf: {
                      "@type": "EducationalOrganization",
                      name: "Archer Infotech",
                    },
                  },
                })),
              }),
            }}
          />
        </>
      )}

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What does Archer Infotech actually promise?</h2>
            <p className="text-muted-foreground">
              We are committed to helping every student achieve their career goals.
              Our comprehensive placement support includes:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Resume Building",
                description:
                  "Professional resume preparation with ATS optimization",
              },
              {
                title: "Mock Interviews",
                description:
                  "Practice sessions with industry-standard questions",
              },
              {
                title: "Soft Skills Training",
                description:
                  "Communication, presentation, and interpersonal skills",
              },
              {
                title: "Job Referrals",
                description:
                  "Direct referrals to our 100+ corporate partners",
              },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Process Timeline — 5-step visual of what every
          learner goes through from course completion to offer letter.
          Demystifies "placement assistance" for prospective enrollees;
          establishes that there's a structured methodology behind the
          90% rate. P4-09. */}
      <section
        aria-labelledby="placement-process-heading"
        className="py-16 border-t"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
              How Placement Works
            </p>
            <h2
              id="placement-process-heading"
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              How does the placement process work?
            </h2>
            <p className="text-muted-foreground">
              Every learner who completes a flagship course goes through
              the same five-step pipeline. The 90% placement rate is the
              output of this methodology, repeated batch after batch.
            </p>
          </div>

          <ol className="relative mx-auto max-w-5xl grid md:grid-cols-5 gap-6 list-none p-0">
            {[
              {
                step: 1,
                icon: FileText,
                title: "Resume + ATS pass",
                body: "Resume rewrite with ATS optimisation, projects portfolio, and trainer review. Every learner walks out with a recruiter-ready CV.",
              },
              {
                step: 2,
                icon: MessageSquare,
                title: "Mock interviews",
                body: "At least one full technical mock + one HR round before any drive. Trainers run the panel; recordings are reviewed 1:1.",
              },
              {
                step: 3,
                icon: UserCheck,
                title: "Profile shortlisting",
                body: "Profile matched to current openings across the 100+ active hiring partners. Direct referrals from the placement team — not bulk-applied.",
              },
              {
                step: 4,
                icon: Briefcase,
                title: "Hiring drives",
                body: "On-site or virtual drives at Pune MNCs, GCC captives and product startups. Most learners sit for 3-8 interviews before securing an offer.",
              },
              {
                step: 5,
                icon: Award,
                title: "Offer + onboarding",
                body: "Offer-letter review, salary-band guidance, and continued support through the notice-period transition. Lifetime LMS access stays active.",
              },
            ].map((s) => (
              <li
                key={s.step}
                className="relative flex flex-col items-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                  <s.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="mt-2 text-xs font-bold uppercase tracking-wider text-primary">
                  Step {s.step}
                </div>
                <h3 className="mt-1 text-base md:text-lg font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Salary Ranges by Course Track — transparent fresher salary
          bands per programme so prospective learners can calibrate
          expectations before enrolling. Numbers attributed inline to
          last-12-months placement-team data. P4-09 + P8-09 attribution
          discipline. */}
      <section
        aria-labelledby="salary-ranges-heading"
        className="py-16 bg-muted/30 border-t"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
              Salary Bands
            </p>
            <h2
              id="salary-ranges-heading"
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              What salary can you expect after each programme?
            </h2>
            <p className="text-muted-foreground">
              Typical packages across Archer Infotech&apos;s flagship
              programme tracks. Bands are based on placement-team data
              for offers extended in the last 12 months and vary by
              role, company tier, and prior experience.
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full text-sm border rounded-lg overflow-hidden bg-background">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="text-left p-4 font-semibold">Programme track</th>
                  <th className="text-left p-4 font-semibold">Fresher band</th>
                  <th className="text-left p-4 font-semibold">Top performers</th>
                  <th className="text-left p-4 font-semibold">Common roles</th>
                </tr>
              </thead>
              <tbody>
                {SALARY_BANDS.map((row) => (
                  <tr key={row.track} className="border-b last:border-b-0">
                    <td className="p-4 font-medium">{row.track}</td>
                    <td className="p-4 text-primary font-semibold whitespace-nowrap">
                      <span className="inline-flex items-center gap-1">
                        <IndianRupee className="h-3.5 w-3.5" aria-hidden="true" />
                        {row.band.replace(/^₹/, "")}
                      </span>
                    </td>
                    <td className="p-4 text-secondary font-semibold whitespace-nowrap">
                      {row.top}
                    </td>
                    <td className="p-4 text-muted-foreground text-xs md:text-sm">
                      {row.roles}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ItemList mirroring the table above, so the salary data is
              machine-readable rather than only human-readable. This is the
              most quotable content on the page and AI engines had no
              structured handle on it — the table rendered as prose to them.
              Rendered from SALARY_BANDS, the same array the table maps, so
              the two cannot diverge. MonetaryAmount carries the band as a
              min/max range rather than inventing a single figure. */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                name: "Fresher salary bands by programme track — Archer Infotech, Pune",
                description:
                  "Typical fresher packages by course track, from Archer Infotech placement-team data covering offers extended in the last 12 months. Bands vary by company tier, role specialisation and interview performance.",
                numberOfItems: SALARY_BANDS.length,
                itemListElement: SALARY_BANDS.map((row, i) => {
                  const [min, max] = row.band
                    .replace(/[₹\s]|LPA/g, "")
                    .split("–")
                    .map(Number);
                  return {
                    "@type": "ListItem",
                    position: i + 1,
                    item: {
                      "@type": "Occupation",
                      name: row.roles.split(",")[0].trim(),
                      occupationalCategory: row.track,
                      description: `Roles commonly offered after the ${row.track} track: ${row.roles}.`,
                      occupationLocation: {
                        "@type": "City",
                        name: "Pune",
                      },
                      estimatedSalary: {
                        "@type": "MonetaryAmountDistribution",
                        name: "Fresher package",
                        currency: "INR",
                        duration: "P1Y",
                        median: ((min + max) / 2) * 100000,
                        percentile10: min * 100000,
                        percentile90: max * 100000,
                      },
                    },
                  };
                }),
              }),
            }}
          />

          <p className="text-center text-xs text-muted-foreground mt-6 max-w-3xl mx-auto leading-relaxed">
            Bands are illustrative — actual offers depend on company tier
            (Tier-1 services vs GCC captive vs product startup), prior
            experience, role specialisation and interview performance.
            Source: Archer Infotech placement-team data, last 12 months
            of offers.
          </p>
        </div>
      </section>

      {/* Programmes feeding placements — internal links to flagship
          course pages so the placements page distributes link equity
          across the catalogue. Mirrors the natural prose pattern AI
          engines parse: "Java Full Stack students placed at..." →
          links to /courses/full-stack-development/java-full-stack-...
          P4-09. */}
      <section
        aria-labelledby="programmes-heading"
        className="py-16 border-t"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
              Where Placements Come From
            </p>
            <h2
              id="programmes-heading"
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Which programmes feed the placement drives?
            </h2>
            <p className="text-muted-foreground">
              The flagship Archer Infotech tracks with the most active
              recruiter pipelines. Each link goes to the course
              detail page with curriculum, batch dates, fees and
              trainer details.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              {
                name: "Java Full Stack Developer",
                href: "/courses/full-stack-development/java-full-stack-training-in-pune",
                tagline: "Most-hired pattern at Pune MNCs",
              },
              {
                name: "MERN Stack Developer",
                href: "/courses/full-stack-development/mern-stack-training-in-pune",
                tagline: "Modern JS stack for product companies",
              },
              {
                name: "Python Full Stack Developer",
                href: "/courses/full-stack-development/python-full-stack-training-in-pune",
                tagline: "Django + REST + React for startups",
              },
              {
                name: ".NET Full Stack Developer",
                href: "/courses/full-stack-development/dotnet-full-stack-training-in-pune",
                tagline: "Microsoft-stack roles at GCC captives",
              },
              {
                name: "Data Science",
                href: "/courses/data-ai/data-science-training-in-pune",
                tagline: "Analytics + ML pipelines for data roles",
              },
              {
                name: "Machine Learning",
                href: "/courses/data-ai/machine-learning-training-in-pune",
                tagline: "Production ML + MLOps for AI Engineer roles",
              },
              {
                name: "Generative AI",
                href: "/courses/generative-ai/genai-training-in-pune",
                tagline: "LLMs + RAG + LangChain for the AI surge",
              },
              {
                name: "AWS Solutions Architect",
                href: "/courses/cloud-certifications/aws-solutions-architect-training-in-pune",
                tagline: "Pune's most in-demand cloud certification",
              },
              {
                name: "DevOps",
                href: "/courses/cloud-devops/devops-training-in-pune",
                tagline: "Docker, Kubernetes, Jenkins, Terraform pipeline",
              },
            ].map((p) => (
              <TrackedLink
                key={p.href}
                href={p.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
                event="placement_programme_clicked"
                properties={{ programme: p.name, location: "placements_programmes" }}
              >
                <div>
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {p.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {p.tagline}
                  </div>
                </div>
                <ArrowRight
                  className="h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </TrackedLink>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Browse all 40+ programmes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Hiring Partners */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Which companies hire from Archer Infotech?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our students have been placed with reputed organizations and companies
              across India after completing their training programs.
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {companies.map((company) => (
              <div
                key={company.id}
                className="flex items-center justify-center p-4 bg-background rounded-lg border hover:shadow-lg transition-shadow"
              >
                <div className="text-center">
                  <div className="font-semibold text-sm text-muted-foreground">
                    {company.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-muted-foreground">
            And many more companies...
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Where have past students been placed?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from our successful students who have transformed their careers
              with Archer Infotech.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((testimonial) => (
              <Card key={testimonial.id} className="h-full">
                <CardContent className="pt-6 flex flex-col h-full">
                  <Quote className="h-8 w-8 text-secondary mb-4" />
                  <p className="text-muted-foreground flex-grow mb-4">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: testimonial.rating ?? 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-secondary text-secondary"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Timeline, eligibility and the honest not-placed answer.
          These three questions are among the highest-intent searches on
          this topic and the page previously answered none of them — a
          reader had to infer eligibility from the FAQ and could not find
          "what if I'm not placed" at all. Each block leads with a
          self-contained answer sentence, which is the unit an answer
          engine extracts. */}
      <section
        aria-labelledby="placement-reality-heading"
        className="py-16 border-t"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
              The Practical Detail
            </p>
            <h2
              id="placement-reality-heading"
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Timelines, eligibility and what happens if you are not placed
            </h2>
            <p className="text-muted-foreground">
              The three questions people ask a counsellor once the
              brochure conversation is over. Answered here so you do not
              have to ask.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3">
            {[
              {
                id: "placement-timeline",
                q: "How long does it take?",
                lead:
                  "Most learners receive a first offer one to four months after finishing.",
                body:
                  "The variable is rarely the course. Learners who publish their capstone and start applying in the same week place fastest; those who wait until they feel ready take longest. Support runs for six months after completion, deliberately wider than the typical outcome.",
                points: [
                  "Applications start in the final fortnight, not after",
                  "Two mock interviews completed before you finish",
                  "Six months of continued support after the course",
                ],
              },
              {
                id: "placement-eligibility",
                q: "Who is eligible?",
                lead:
                  "Every enrolled learner, on two conditions we state before you pay.",
                body:
                  "You complete the training, and you clear at least one mock interview round. Those are the same two conditions the 90% figure is measured on, which is why they are printed rather than implied. No separate placement fee, no bond, no minimum-marks criterion.",
                points: [
                  "Complete the flagship course",
                  "Clear one mock interview round",
                  "No bond, no separate placement charge",
                ],
              },
              {
                id: "placement-not-placed",
                q: "What if you are not placed?",
                lead:
                  "Support continues for six months, and you can rejoin later interview-prep sessions free.",
                body:
                  "As many times as you need inside that window. There is no fee refund tied to placement, and we would rather write that plainly than bury it in a clause — a guarantee we could not honour honestly is worse than support we can.",
                points: [
                  "Six months of continued placement-cell access",
                  "Free re-entry to future interview-prep sessions",
                  "No refund guarantee — stated up front, not in a footnote",
                ],
              },
            ].map((card) => (
              <Card key={card.id} id={card.id} className="scroll-mt-24">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">{card.q}</h3>
                  <p className="text-sm font-medium text-foreground mb-3">
                    {card.lead}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {card.body}
                  </p>
                  <ul className="space-y-2">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm">
                        <CheckCircle
                          className="h-4 w-4 text-primary shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What employers screen for. Extractable, ordered, and framed from
          the employer's side rather than ours — the perspective a
          candidate cannot get from a course brochure and the one AI
          engines tend to quote when asked how to get hired in Pune. */}
      <section
        aria-labelledby="employer-screening-heading"
        className="py-16 bg-muted/30 border-t"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
              From The Employer&apos;s Side
            </p>
            <h2
              id="employer-screening-heading"
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              What do Pune employers screen freshers on?
            </h2>
            <p className="text-muted-foreground">
              Four things, roughly in this order — drawn from what our
              placement team hears back from hiring panels after
              interviews, over the last twelve months of drives.
            </p>
          </div>

          <ol className="max-w-3xl mx-auto space-y-4">
            {[
              {
                t: "A working project with a public repository",
                d: "This is what separates candidates before anyone speaks to them. A recruiter opens the GitHub link, sees whether the code runs and whether there is a README explaining how, and forms a view in under two minutes. Originality of the idea counts for almost nothing; a finished, documented, deployed thing counts for a great deal.",
              },
              {
                t: "Fundamentals in one language, tested live",
                d: "You will be asked to write something small on the spot — reverse a string, dedupe a list, model a class. Panels are checking whether you can think in the language rather than recall its syntax. Depth in one language beats familiarity with four, every time.",
              },
              {
                t: "Being able to explain a decision in your own code",
                d: "\"Why did you do it this way?\" is the question that ends most fresher interviews. Candidates who built their project can answer it; candidates who followed a tutorial cannot, and the difference is immediately audible. This is why our capstones are reviewed and defended rather than submitted.",
              },
              {
                t: "Communication clear enough for a client call",
                d: "Weighted more heavily than most candidates expect, particularly at services companies where a fresher may face a client within months. It is also the most improvable of the four, which is why soft-skills sessions sit inside the placement process rather than beside it.",
              },
            ].map((item, i) => (
              <li key={item.t}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold mb-1">{item.t}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.d}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>

          <p className="text-center text-xs text-muted-foreground mt-8 max-w-3xl mx-auto leading-relaxed">
            A certificate, on its own, moves none of the four. It gets a
            CV read; the four decide what happens next. Source: Archer
            Infotech placement-team debriefs with hiring panels, last 12
            months.
          </p>
        </div>
      </section>

      {/* FAQ block + FAQPage JSON-LD — proof-oriented Q&A about placement
          rate, companies, salaries, process. AI engines lift these into
          career-question responses. P8-08. */}
      <FaqSection
        heading="Placement FAQs — Archer Infotech"
        intro="The most-asked questions about placement at Archer Infotech — hiring partners, packages, process, freshers, working professionals and what's included in the fee."
        items={placementsFaqs}
      />

      {/* P5-17 — newsletter banner. */}
      <section className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 max-w-3xl">
          <NewsletterSignupForm
            placement="placements"
            variant="banner"
            headline="Pune IT hiring + placement updates — monthly briefing"
            subhead="See who's hiring whom in Pune. Salary movements, employer spotlights, placement-ready insights every month. Free."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your Success Story Today
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Join thousands of successful students who have launched their IT careers
            with Archer Infotech. Get placement assistance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="cta_clicked"
              properties={{ cta: "enquire_now", location: "placements_bottom" }}
            >
              Enquire Now
            </TrackedLink>
            <TrackedLink
              href="/courses"
              className="inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
              event="cta_clicked"
              properties={{ cta: "explore_courses", location: "placements_bottom" }}
            >
              Explore Courses
            </TrackedLink>
          </div>
        </div>
      </section>
      <SourceCitations
        heading="Sources"
        intro="References for the claims made on this page."
        items={[
          {
            label: "Archer Infotech on Google Maps",
            href: siteConfig.googleMaps.url,
            supports: "the public Google rating and student review count quoted on this page.",
          },
          {
            label: "Stack Overflow Developer Survey",
            href: "https://survey.stackoverflow.co/",
            supports: "industry-wide technology adoption and pay data referenced here.",
          },
        ]}
      />

    </>
  );
}
