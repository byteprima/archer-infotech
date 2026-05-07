export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { Award, Users, Building, TrendingUp, Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { siteConfig } from "@/data/site-config";
import { getHiringPartners } from "@/data/companies";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { db } from "@/db";
import { testimonials as testimonialsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { buildPageMetadata } from "@/lib/seo";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { placementsFaqs } from "@/data/faqs";

export const metadata: Metadata = buildPageMetadata({
  title: "Placements at Archer Infotech — 5,000+ Students Placed Since 2009",
  description:
    "5,000+ students placed at top IT companies including Tech Mahindra, TCS, Infosys and more. See placement records, hiring partners, and our placement assistance programme at Archer Infotech, Pune.",
  path: "/placements",
});

export default async function PlacementsPage() {
  const companies = getHiringPartners();
  const testimonials = await db.select().from(testimonialsTable).where(eq(testimonialsTable.isPublished, true));

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              5,000+ Students Placed Since 2009 at Top IT Companies in Pune
            </h1>
            <p className="text-lg text-white/80">
              As a leading IT solutions provider, Archer Infotech helps both
              businesses and students. We provide &apos;Mission Ready&apos; IT
              Professionals who hit the ground running from day 1.
            </p>
          </div>
        </div>
      </section>

      {/* Definitive Answer Paragraph — proof-first opening with hiring
          partner names, headline numbers and salary band. AI engines and
          Featured Snippets cite this when answering "Archer Infotech
          placements / placement record". P8-07. */}
      <DefinitiveAnswer eyebrow="Archer Infotech Placement Record">
        Archer Infotech has placed 5,000+ students at IT companies since
        2009, with hiring partners including TCS, Infosys, Wipro, Tech
        Mahindra, Persistent Systems, Cognizant, Capgemini, HCL Technologies
        and 100+ other MNCs and product startups across Pune, Bangalore,
        Hyderabad and Mumbai. The institute records a 90% placement rate
        across flagship batches, with average fresher packages of ₹3.5–6
        LPA and top performers in Java Full Stack, MERN and DevOps crossing
        ₹10 LPA. Placement assistance — resume building, mock interviews,
        soft-skills training and direct recruiter referrals — is included
        in every flagship course fee with no separate charge.
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
                value: "8+ LPA",
                label: "Average Package",
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Placement Promise</h2>
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

      {/* Hiring Partners */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Hiring Partners</h2>
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
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
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

      {/* FAQ block + FAQPage JSON-LD — proof-oriented Q&A about placement
          rate, companies, salaries, process. AI engines lift these into
          career-question responses. P8-08. */}
      <FaqSection
        heading="Placement FAQs — Archer Infotech"
        intro="The most-asked questions about placement at Archer Infotech — hiring partners, packages, process, freshers, working professionals and what's included in the fee."
        items={placementsFaqs}
      />

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
    </>
  );
}
