import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  GraduationCap,
  Calculator,
  ArrowRight,
  Phone,
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { siteConfig } from "@/data/site-config";

/**
 * Site-wide 404. Replaces Next's default with a helpful, in-brand page
 * that gives the visitor real navigation options + a Pune/Archer search
 * intent ("are you looking for…?") so the page itself is useful to anyone
 * who lands on a stale link, and so Search engines see a meaningful
 * (non-soft-404) error page.
 *
 * Marked noindex — we don't want this page in search.
 */
export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you were looking for doesn't exist or has moved. Find courses, bootcamps, locations and tools at Archer Infotech, Pune.",
  robots: { index: false, follow: false },
};

const POPULAR_LINKS: Array<{ title: string; href: string; description: string }> = [
  {
    title: "All IT courses",
    href: "/courses",
    description: "Java, Python, full-stack, AWS, data science, AI/ML and more.",
  },
  {
    title: "Java Full Stack with Placement",
    href: "/courses/full-stack-development/java-full-stack-training-in-pune",
    description: "Our flagship placement-track programme.",
  },
  {
    title: "Pune IT Salary Calculator",
    href: "/tools/pune-it-salary-calculator",
    description: "See realistic Pune salaries by role and experience.",
  },
  {
    title: "Pune IT Career Roadmap",
    href: "/tools/pune-it-career-roadmap",
    description: "Step-by-step path from where you are to your first IT job.",
  },
  {
    title: "Bootcamps",
    href: "/bootcamps",
    description: "CodeLeap (after 12th) · CareerCode (engineering) · TechReady (graduates).",
  },
  {
    title: "Find your path",
    href: "/courses/for/graduates",
    description: "Programme picks by who you are — students, graduates, switchers.",
  },
];

export default function NotFound() {
  return (
    <>
      <header className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs variant="light" items={[{ name: "404" }]} />
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary mb-2">
            Page not found
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-3xl">
            We couldn&apos;t find that page
          </h1>
          <p className="text-lg text-white/85 max-w-3xl">
            The link may have moved or never existed. Use the popular paths
            below, or jump straight to the course catalogue — most visitors are
            here looking for IT training in Pune.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
            >
              <GraduationCap className="h-4 w-4" />
              Browse all courses
            </Link>
            <Link
              href="/tools/pune-it-salary-calculator"
              className="inline-flex items-center gap-2 border border-white/40 px-5 py-2.5 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              <Calculator className="h-4 w-4" />
              Salary calculator
            </Link>
            <TrackedAnchor
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex items-center gap-2 border border-white/40 px-5 py-2.5 rounded-lg font-medium hover:bg-white/10 transition-colors"
              event="contact_method_clicked"
              properties={{ method: "phone", location: "not_found" }}
            >
              <Phone className="h-4 w-4" />
              {siteConfig.contact.phone}
            </TrackedAnchor>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
          <Search className="h-6 w-6 text-secondary" />
          Popular places to start
        </h2>
        <p className="text-muted-foreground mb-8">
          A few of the most-visited corners of the site:
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POPULAR_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group rounded-xl border p-5 hover:border-primary hover:shadow-md transition-all"
            >
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                {l.title}
              </h3>
              <p className="text-sm text-muted-foreground">{l.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium">
                Open <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          Still stuck? Use the footer navigation or{" "}
          <Link href="/contact" className="text-primary hover:underline">
            contact our team
          </Link>{" "}
          — we&apos;ll point you to the right place.
        </p>
      </div>
    </>
  );
}
