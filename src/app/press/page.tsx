import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  Mail,
  Phone,
  ExternalLink,
  Quote,
  Building2,
  Newspaper,
} from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { siteConfig } from "@/data/site-config";
import { teamMembers } from "@/data/team";
import { buildPageMetadata } from "@/lib/seo";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";

export const metadata: Metadata = buildPageMetadata({
  title: "Press & Media Kit",
  description:
    "Press and media resources for Archer Infotech — company fact sheet, founder bio, brand assets and press-enquiry contact. A Pune IT training institute since 2009 with 10,000+ students trained.",
  path: "/press",
  lastModified: EVERGREEN_LAST_REVIEWED,
});

const founder = teamMembers.find((m) => m.id === "yogesh-patil");

// Truthful company facts — single source of truth mirrors siteConfig.stats.
const fastFacts: { label: string; value: string }[] = [
  { label: "Founded", value: "2009" },
  { label: "Years in operation", value: `${siteConfig.stats.yearsExperience} years` },
  { label: "Headquarters", value: "Kothrud, Pune, Maharashtra, India" },
  { label: "Students trained", value: `${siteConfig.stats.studentsTrained} (institute records)` },
  { label: "Students placed", value: `${siteConfig.stats.studentsPlaced} (institute records)` },
  { label: "Placement rate", value: `${siteConfig.stats.placementRate} across placement-track programmes` },
  { label: "Batches completed", value: siteConfig.stats.batchesCompleted },
  { label: "Courses offered", value: `${siteConfig.stats.courses} IT training courses` },
  { label: "Corporate partners", value: `${siteConfig.stats.corporatePartners} hiring & corporate-training partners` },
  { label: "Founder & Director", value: "Yogesh Patil" },
  { label: "Training modes", value: "Classroom (Kothrud), live online, weekend & hybrid" },
  { label: "Languages of instruction", value: "English, Hindi, Marathi" },
];

// Reusable boilerplate descriptions journalists can copy verbatim.
const boilerplate = {
  short:
    "Archer Infotech is a Pune-based IT training institute, founded in 2009, that has trained 10,000+ students and placed 5,000+ at leading IT companies.",
  medium:
    "Founded in 2009 and based in Kothrud, Pune, Archer Infotech is an IT training institute that has trained 10,000+ students and placed 5,000+ professionals at companies across the IT industry. It offers 40+ courses spanning Java, Python, full-stack development, data science, AI/ML, cloud and DevOps — in classroom, live online and weekend formats — each backed by placement assistance and trainers with MNC experience.",
  long:
    "Archer Infotech is an IT training institute in Kothrud, Pune, founded in 2009 by Yogesh Patil. Over 17+ years it has trained more than 10,000 students and placed over 5,000 at IT companies, maintaining a 90% placement rate across its placement-track programmes (institute records). The institute offers 40+ courses — including Java, Python, full-stack development, data science, machine learning, generative AI, cloud and DevOps — delivered in classroom, live-online, weekend and hybrid formats. Its trainers are working professionals with 10–15+ years of MNC experience, and it runs three structured bootcamps (CodeLeap for 12th passouts, CareerCode for engineering students, and TechReady for graduates seeking placement). Archer Infotech maintains hiring and corporate-training relationships with 100+ partner companies.",
};

function CopyableBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-5">
      <div className="flex items-center gap-2 mb-2">
        <Quote className="h-4 w-4 text-secondary" />
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}

export default function PressPage() {
  return (
    <>
      <PageEvent event="press_page_viewed" properties={{ page_path: "/press" }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Press & Media", url: "/press" },
        ]}
      />

      {/* Hero */}
      <header className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs variant="light" items={[{ name: "Press & Media" }]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
            Press &amp; Media Kit
          </h1>
          <p className="text-lg text-white/85 max-w-3xl">
            Resources for journalists, editors and partners writing about
            Archer Infotech — a Pune IT training institute operating since 2009.
            Everything here is free to use; for interviews, data or student
            stories, reach our press contact below.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 md:py-16 space-y-16 max-w-5xl">
        {/* Boilerplate / about */}
        <section className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold">About Archer Infotech</h2>
          <p className="text-muted-foreground">
            Approved company descriptions — copy whichever length fits your piece.
          </p>
          <div className="grid gap-4">
            <CopyableBlock label="One-line" text={boilerplate.short} />
            <CopyableBlock label="Short (≈60 words)" text={boilerplate.medium} />
            <CopyableBlock label="Full (≈100 words)" text={boilerplate.long} />
          </div>
        </section>

        {/* Fast facts */}
        <section className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold">Company fact sheet</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-lg overflow-hidden">
              <tbody>
                {fastFacts.map((f, i) => (
                  <tr key={i} className="border-t first:border-t-0">
                    <th className="text-left p-3 font-semibold bg-muted/50 w-1/3 align-top">
                      {f.label}
                    </th>
                    <td className="p-3 text-muted-foreground">{f.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            Figures reflect Archer Infotech&apos;s internal training and
            placement records as of {new Date(EVERGREEN_LAST_REVIEWED).getFullYear()}.
            The placement rate is measured across placement-track programmes.
          </p>
        </section>

        {/* Leadership */}
        {founder && (
          <section className="space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold">Leadership</h2>
            <Card>
              <CardContent className="pt-6 flex flex-col sm:flex-row gap-6">
                {founder.image && (
                  <div className="w-32 h-32 rounded-xl overflow-hidden relative shrink-0 ring-2 ring-primary/10">
                    <Image
                      src={founder.image}
                      alt={`${founder.name}, ${founder.role} of Archer Infotech, Pune`}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <div>
                    <h3 className="text-xl font-semibold">{founder.name}</h3>
                    <p className="text-sm text-primary font-medium">{founder.role}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {founder.bio}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {founder.linkedin && (
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        LinkedIn <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <Link
                      href={`/trainers/${founder.id}`}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      Full profile <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                    <a
                      href={founder.image}
                      download
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      Download photo <Download className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Brand assets */}
        <section className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold">Brand assets</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="rounded-lg border p-6 flex flex-col items-center text-center gap-4">
              <div className="bg-white rounded-lg p-6 w-full flex items-center justify-center">
                <Image src="/logo.svg" alt="Archer Infotech logo" width={180} height={48} />
              </div>
              <a
                href="/logo.svg"
                download
                className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
              >
                <Download className="h-4 w-4" /> Download logo (SVG)
              </a>
            </div>
            <div className="rounded-lg border p-6 space-y-3">
              <h3 className="font-semibold">Usage guidelines</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use the official spelling: <strong>Archer Infotech</strong> (one word each, no &ldquo;InfoTech&rdquo;).</li>
                <li>• Don&apos;t alter the logo colours, proportions or spacing.</li>
                <li>• Place the logo on a clean light background for best contrast.</li>
                <li>• Need PNG, dark-mode or stacked variants? Email us — we&apos;ll send them.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Corporate partners */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <Building2 className="h-7 w-7 text-secondary" />
            Corporate &amp; hiring partners
          </h2>
          <p className="text-muted-foreground">
            Archer Infotech runs corporate-training and hiring relationships with
            100+ companies. Active corporate clients include:
          </p>
          <div className="flex flex-wrap gap-2">
            {["Amdocs", "Capgemini", "MindTree", "Tech Mahindra"].map((c) => (
              <Badge key={c} variant="outline" className="text-sm py-1">
                {c}
              </Badge>
            ))}
          </div>
        </section>

        {/* For journalists / coverage */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <Newspaper className="h-7 w-7 text-secondary" />
            For journalists
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We&apos;re happy to provide data on Pune&apos;s IT-training and
            fresher-hiring landscape, arrange interviews with our founder or
            trainers, and connect you with alumni for student-journey stories
            (with their consent). A media-coverage archive will be linked here as
            it builds.
          </p>
        </section>

        {/* Press contact */}
        <section className="rounded-xl border bg-muted/30 p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-2">Press enquiries</h2>
          <p className="text-muted-foreground mb-5">
            For interviews, quotes, data or assets, contact us directly:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <TrackedAnchor
              href={`mailto:${siteConfig.contact.email}?subject=Press%20enquiry`}
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="contact_method_clicked"
              properties={{ method: "email", location: "press_contact" }}
            >
              <Mail className="h-4 w-4" />
              {siteConfig.contact.email}
            </TrackedAnchor>
            <TrackedAnchor
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex items-center gap-2 border px-5 py-2.5 rounded-lg font-medium hover:bg-muted transition-colors"
              event="contact_method_clicked"
              properties={{ method: "phone", location: "press_contact" }}
            >
              <Phone className="h-4 w-4" />
              {siteConfig.contact.phone}
            </TrackedAnchor>
          </div>
        </section>
      </div>
    </>
  );
}
