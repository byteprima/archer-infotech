import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Rocket,
  CheckCircle,
  GraduationCap,
  Briefcase,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { bootcamps } from "@/data/bootcamps";
import { audiences } from "@/data/audiences";
import { siteConfig } from "@/data/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { bootcampsFaqs } from "@/data/faqs";
import { SourceCitations } from "@/components/seo/source-citations";
import { sourcesForTopics } from "@/data/authoritative-sources";
import { LastUpdated } from "@/components/seo/last-updated";
import { BOOTCAMP_LAST_REVIEWED } from "@/lib/seo/content-dates";

export const metadata: Metadata = buildPageMetadata({
  title: "Coding Bootcamps in Pune — CodeLeap, CareerCode, TechReady",
  description:
    "Explore CodeLeap, CareerCode and TechReady bootcamps by Archer Infotech, Pune. Vacation coding programmes for 12th passouts, semester-wise tracks for engineering students, and placement-assisted intensives for graduates.",
  path: "/bootcamps",
});

const bootcampHighlights = [
  {
    slug: "codeleap",
    icon: Rocket,
    color: "from-blue-600 to-blue-500",
    audience: "12th Passouts",
    duration: "2 Months (8 Weeks)",
    highlights: [
      "5 modules: Python, Web Dev, AI, GitHub, Career",
      "No prior coding experience required",
      "Hybrid — Kothrud campus + online",
      "Live GitHub portfolio + deployed website",
    ],
  },
  {
    slug: "careercode",
    icon: GraduationCap,
    color: "from-purple-600 to-purple-500",
    audience: "Engineering Students",
    duration: "Semester by Semester",
    highlights: [
      "6 specialisation tracks",
      "Runs alongside your college education",
      "Internship & placement preparation",
      "Communication, aptitude, and interview training",
    ],
  },
  {
    slug: "techready",
    icon: Briefcase,
    color: "from-green-600 to-green-500",
    audience: "Graduates",
    duration: "6 to 8 Months",
    highlights: [
      "10 specialised programs",
      "6 hours daily, full-time intensive",
      "placement assistance",
      "100+ company connections",
    ],
  },
];

/**
 * Side-by-side comparison of the three programmes.
 *
 * The landing page's actual job is "which of these three am I?", and until
 * now the page answered that only in prose spread across three cards. Every
 * value here is drawn from the `details` block of the matching bootcamp in
 * bootcamps.ts — keep the two in step.
 *
 * This table is also the text counterpart of the comparison diagram above
 * it: the diagram's words are invisible to crawlers and AI engines, so
 * nothing may appear only there.
 */
const comparisonRows = [
  {
    label: "Who it is for",
    codeleap: "12th pass, any stream",
    careercode: "Engineering, BCA or BSc CS students",
    techready: "Final-year students and graduates",
  },
  {
    label: "When you take it",
    codeleap: "In the gap before college starts",
    careercode: "Alongside your degree, every semester",
    techready: "After graduating, full time",
  },
  {
    label: "Duration",
    codeleap: "2 months (8 weeks)",
    careercode: "Ongoing — semester by semester",
    techready: "6 to 8 months per programme",
  },
  {
    label: "Time commitment",
    codeleap: "Weekday or weekend batches",
    careercode: "1 to 2 technologies per semester",
    techready: "Minimum 6 hours a day",
  },
  {
    label: "Coding experience needed",
    codeleap: "None — absolute beginners",
    careercode: "Whatever your semester has covered",
    techready: "Graduate-level fundamentals",
  },
  {
    label: "What you choose",
    codeleap: "Nothing — one fixed 5-module path",
    careercode: "1 of 6 specialisation tracks",
    techready: "1 of 10 specialised programmes",
  },
  {
    label: "What you leave with",
    codeleap: "Deployed site, GitHub profile, AI mini-app",
    careercode: "Track certificate at each completed level",
    techready: "Project portfolio and certificate",
  },
  {
    label: "Career support",
    codeleap: "Resume and LinkedIn set up",
    careercode: "Internship guidance and interview prep",
    techready: "Placement-assisted, 100+ partner companies",
  },
];

export default function BootcampsPage() {
  return (
    <>
      <PageEvent
        event="bootcamps_listing_viewed"
        properties={{ location: "bootcamps_page" }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Bootcamps", url: "/bootcamps" },
        ]}
      />

      {/* Hero */}
      <section className="gradient-hero text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white border-0 mb-4">
            <Rocket className="h-3 w-3 mr-1" />
            Career Launchpad
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Intensive Bootcamp Programs
          </h1>
          <LastUpdated iso={BOOTCAMP_LAST_REVIEWED} className="mt-3 text-xs md:text-sm text-white/70" />
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Three programs designed for three stages of your career — from 12th
            passout to engineering student to job-ready graduate. Hands-on
            training, real projects, and expert mentorship by Archer Infotech,
            Pune.
          </p>
        </div>
      </section>

      {/* Definitive Answer Paragraph — career-stage explainer in the first
          ~100 words of body. AI engines cite this for "Pune coding
          bootcamp / CodeLeap / CareerCode / TechReady" queries. P8-07. */}
      <DefinitiveAnswer eyebrow="Coding Bootcamps at Archer Infotech">
        Archer Infotech runs three coding bootcamps in Pune for three career
        stages. CodeLeap is an 8-week vacation program for 12th passouts,
        covering Python, Web Development, AI basics, GitHub portfolio
        building and career skills, with no prior coding experience
        required. CareerCode is a semester-by-semester track for engineering
        students that runs alongside their college degree across six
        specialisation paths. TechReady is a 6–8 month full-time intensive
        for graduates, with placement assistance, ten specialised programs
        and direct referrals to 100+ corporate hiring partners. All three
        run in hybrid mode — Kothrud campus plus live online sessions.
      </DefinitiveAnswer>

      {/* Which one am I? — the question this page exists to answer, so it
          comes before the three cards rather than after them. The diagram
          is a summary; the table below it carries the same facts as text
          because a diagram's contents are invisible to crawlers and to AI
          engines. */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">
              Which bootcamp is for you?
            </h2>
            <p className="text-muted-foreground">
              The three programmes do not compete with each other — they map to
              three different points in a career. Find the row that describes
              where you are now.
            </p>
          </div>

          <figure className="mb-10">
            <picture>
              <source
                srcSet="/images/courses/bootcamp-compare-v1.avif"
                type="image/avif"
              />
              <img
                src="/images/courses/bootcamp-compare-v1.webp"
                alt="Comparison of the three Archer Infotech bootcamps in Kothrud, Pune. CodeLeap is for students who have just finished 12th: two months over eight weeks, no coding background needed, covering Python, web development, AI and GitHub, taken before college starts, producing a deployed site and a GitHub profile. CareerCode is for students currently in engineering or BCA: taken semester by semester alongside the degree, with six specialisation tracks at one to two technologies a semester, leaving students internship-ready by final year. TechReady is for graduates targeting a job: six to eight months full time at six hours a day, across ten specialised programmes, placement-assisted, producing a portfolio, mock interviews and referrals."
                width={1500}
                height={512}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl border border-border"
              />
            </picture>
          </figure>

          {/* Wide table scrolls inside its own container so the page body
              never scrolls horizontally on mobile. */}
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <caption className="sr-only">
                Archer Infotech bootcamps compared: CodeLeap, CareerCode and
                TechReady
              </caption>
              <thead>
                <tr className="bg-muted/50">
                  <th scope="col" className="p-4 text-left font-semibold">
                    &nbsp;
                  </th>
                  <th scope="col" className="p-4 text-left font-semibold">
                    CodeLeap
                  </th>
                  <th scope="col" className="p-4 text-left font-semibold">
                    CareerCode
                  </th>
                  <th scope="col" className="p-4 text-left font-semibold">
                    TechReady
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-t">
                    <th
                      scope="row"
                      className="p-4 text-left font-medium text-muted-foreground"
                    >
                      {row.label}
                    </th>
                    <td className="p-4">{row.codeleap}</td>
                    <td className="p-4">{row.careercode}</td>
                    <td className="p-4">{row.techready}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bootcamp Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bootcamps.map((bootcamp) => {
              // Matched by slug, not array position: the two arrays used to
              // be zipped by index, so adding or reordering a bootcamp would
              // have silently shown another programme's audience and
              // duration on the card.
              const meta = bootcampHighlights.find(
                (h) => h.slug === bootcamp.slug,
              );
              if (!meta) return null;
              const Icon = meta.icon;
              return (
                <Card
                  key={bootcamp.slug}
                  className="group overflow-hidden hover:shadow-xl transition-all hover:border-primary/30 h-full flex flex-col border-2"
                >
                  <div
                    className={`bg-gradient-to-r ${meta.color} p-6`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-white/20 text-white border-0">
                        {meta.audience}
                      </Badge>
                      <Icon className="h-6 w-6 text-white/80" />
                    </div>
                    <h2 className="font-bold text-2xl text-white">
                      {bootcamp.name}
                    </h2>
                    <p className="text-white/80 text-sm mt-1">
                      {bootcamp.tagline}
                    </p>
                  </div>

                  <CardContent className="p-6 flex-grow flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4">
                      {bootcamp.subtitle}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {meta.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto pt-4 border-t">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {meta.duration}
                      </div>
                    </div>
                  </CardContent>

                  <div className="px-6 pb-6">
                    <Link
                      href={`/bootcamps/${bootcamp.slug}`}
                      className="w-full inline-flex items-center justify-center h-11 px-4 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                    >
                      Explore {bootcamp.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Your Complete Career Journey
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our bootcamp programs are designed to support you at every stage — from your first line of code to your first job offer.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">Step 1: CodeLeap</h3>
              <p className="text-sm text-muted-foreground">
                Start with CodeLeap after 12th — learn programming basics during
                your vacation before engineering begins.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2">Step 2: CareerCode</h3>
              <p className="text-sm text-muted-foreground">
                Continue with CareerCode during engineering — build skills
                semester by semester alongside your degree.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Step 3: TechReady</h3>
              <p className="text-sm text-muted-foreground">
                Get placed with TechReady — intensive full-time training with
                placement assistance after graduation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ block + FAQPage JSON-LD — career-stage matching, comparison
          and "is this for me" answers. P8-08. */}
      <FaqSection
        heading="Bootcamp FAQs"
        intro="Picking the right bootcamp for your stage, prerequisites, online vs offline format, and how the three programs fit together as a career path."
        items={bootcampsFaqs}
      />

      {/* Keys match the tracks the bootcamps actually advertise — CodeLeap
          lists "Web Dev, Python, AI/Data Science". Do not add Java here
          unless a bootcamp track actually teaches it. */}
      <SourceCitations
        heading="Curriculum references"
        intro="Official documentation for the technologies our bootcamp tracks cover."
        items={sourcesForTopics(["python", "javascript", "data-science"])}
      />

      {/* CTA */}
      {/* Find your path — audience-intent landing pages (P4-17). Gives
          these pages a crawlable internal-link entry point and helps
          visitors self-select by their situation. */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Find your path
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not sure which programme fits? Start from where you are — we&apos;ve
              mapped the right track for each stage.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {audiences.map((a) => (
              <Link
                key={a.slug}
                href={`/courses/for/${a.slug}`}
                className="group rounded-lg border bg-background p-4 hover:border-primary hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {a.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {a.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get in touch with us for a free counselling session. We will help
            you choose the right bootcamp based on your current stage and career
            goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="bootcamp_enquiry_clicked"
              properties={{
                location: "bootcamps_listing_cta",
              }}
            >
              Enquire Now
            </TrackedLink>
            <TrackedAnchor
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
              event="contact_method_clicked"
              properties={{
                method: "phone",
                location: "bootcamps_listing_cta",
              }}
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
