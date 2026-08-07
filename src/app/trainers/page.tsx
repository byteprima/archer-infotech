import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Briefcase, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbJsonLd, CategoryCollectionJsonLd } from "@/components/seo/json-ld";
import { getTeamMembers } from "@/data/team";
import { buildPageMetadata } from "@/lib/seo";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { trainersFaqs } from "@/data/faqs";
import { LastUpdated } from "@/components/seo/last-updated";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";

export const metadata: Metadata = buildPageMetadata({
  title: "Our Trainers — Industry Experts at Archer Infotech, Pune",
  description:
    "Meet the trainers behind Archer Infotech's Pune programmes. 10–15+ years of MNC experience across Java, Python, AI/ML, Cloud, .NET, Full Stack, and Generative AI.",
  path: "/trainers",
});

export default function TrainersPage() {
  const trainers = getTeamMembers();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Trainers", url: "/trainers" },
        ]}
      />
      {/* P8-04 wave 4 — CollectionPage exposing the 6-person faculty as an
          ItemList. Each individual trainer page already emits a complete
          Person schema (sameAs LinkedIn, knowsAbout, image, worksFor @id-ref);
          this is the hub-level signal that ties them together. */}
      <CategoryCollectionJsonLd
        name="Our Trainers — Industry Experts at Archer Infotech, Pune"
        description="The 6-person faculty behind Archer Infotech's Pune programmes — 54+ combined years of MNC experience across Java, Python, AI/ML, Cloud, .NET, Full Stack, and Generative AI."
        url="/trainers"
        items={trainers.map((t) => ({
          name: t.name,
          url: `/trainers/${t.id}`,
          description: t.role,
        }))}
      />

      <section className="gradient-hero text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-4">
              <Award className="h-4 w-4 text-secondary" />
              <span>Industry-experienced trainers</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Meet the Trainers Behind Archer Infotech
            </h1>
            <LastUpdated iso={EVERGREEN_LAST_REVIEWED} className="mt-3 text-xs md:text-sm text-white/70" />
            <p className="text-lg text-white/80">
              Every course at Archer Infotech is led by a working professional with deep
              MNC experience. Get to know the people teaching you, the projects they
              have shipped, and the courses they own.
            </p>
          </div>
        </div>
      </section>

      {/* Definitive Answer Paragraph — entity-level "who teaches at Archer
          Infotech" answer in the first body section. AI engines weight
          E-E-A-T heavily for trainer/author queries; this delivers the
          factual core. P8-07. */}
      <DefinitiveAnswer eyebrow="The Trainers Behind Archer Infotech">
        Trainers at Archer Infotech are a six-person core faculty with a
        combined 54+ years of MNC engineering experience, all still
        actively working in the IT industry. Two of them — Amol Patil and
        Yogesh Patil — run on-site corporate training engagements at
        Amdocs, Capgemini, MindTree and Tech Mahindra; the remaining four
        hold full-time production-engineering roles at Pune-based startups
        and MNCs. Specialisations span Java, Python, Full Stack, .NET,
        Modern Web (React, Angular, Next.js), Mobile, Data, AI/ML,
        Generative AI and Cloud. Trainer name, LinkedIn profile and
        ongoing client engagements are confirmed before the first class.
      </DefinitiveAnswer>

      {/* What Sets Our Trainers Apart — context, criteria, current MNC engagement */}
      <section className="py-12 md:py-16 border-b">
        <div className="container mx-auto px-4 space-y-8">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                What Sets Our Trainers Apart
              </h2>
              <p className="text-muted-foreground">
                Combined <strong className="text-foreground">54+ years</strong> of MNC engineering experience. Six full-time experts.
                No retired academics, no rotating outsourced staff.
              </p>
            </div>
            <div className="lg:col-span-2 text-muted-foreground leading-relaxed">
              <p>
                Every trainer at Archer Infotech is hired against the same four criteria, in this order:
                <strong className="text-foreground"> (1)</strong> they are still actively working in the IT industry — not retired academics;
                <strong className="text-foreground"> (2)</strong> they have shipped real production code at MNCs or product companies;
                <strong className="text-foreground"> (3)</strong> they can teach — measured through a live demo session before any hiring decision; and
                <strong className="text-foreground"> (4)</strong> they commit to mentoring outside class hours, on placement prep and project review.
              </p>
            </div>
          </div>

          {/* Full-width corporate-engagement callout */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground text-lg">Current Industry Engagement (2026)</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Active corporate-training engagements */}
                <div className="bg-background border rounded-lg p-5 space-y-3">
                  <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">
                    Active corporate-training engagements
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Amol Patil</strong> and{" "}
                    <strong className="text-foreground">Yogesh Patil</strong> are running on-site corporate batches at:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-background font-medium">Amdocs</Badge>
                    <Badge variant="outline" className="bg-background font-medium">Capgemini</Badge>
                    <Badge variant="outline" className="bg-background font-medium">MindTree</Badge>
                    <Badge variant="outline" className="bg-background font-medium">Tech Mahindra</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    What they teach our students is informed by what these MNCs are actively hiring for this quarter.
                  </p>
                </div>

                {/* Active production-engineering roles */}
                <div className="bg-background border rounded-lg p-5 space-y-3">
                  <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">
                    Active production-engineering roles
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The <strong className="text-foreground">remaining four trainers</strong> continue their full-time
                    development roles at startups and MNCs across Pune.
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    Fresh production code and recent interview patterns make their way into every classroom session —
                    you are not learning from yesterday&apos;s textbooks.
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed pt-2 border-t">
                Each trainer below owns specific courses where they go deep — you can verify their LinkedIn profile,
                ongoing client engagements, and shipped projects on their individual profile page.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((trainer) => (
              <Link key={trainer.id} href={`/trainers/${trainer.id}`} className="block">
                <Card className="hover:shadow-lg hover:border-primary/30 transition-all h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {trainer.image ? (
                        <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0 ring-2 ring-primary/10">
                          <Image
                            src={trainer.image}
                            alt={`${trainer.name}, ${trainer.role} at Archer Infotech, Pune`}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold shrink-0">
                          {trainer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      )}
                      <div className="flex-grow">
                        <h2 className="font-semibold text-lg">{trainer.name}</h2>
                        <p className="text-sm text-muted-foreground mb-1">{trainer.role}</p>
                        <p className="text-xs text-primary font-medium">
                          {trainer.experience}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mt-4 line-clamp-3">
                      {trainer.bio}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {trainer.expertise.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {trainer.expertise.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{trainer.expertise.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                      View profile <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ block + FAQPage JSON-LD — entity / E-E-A-T questions about
          who teaches, hiring criteria, founder, trainer-to-course matching.
          P8-08. */}
      <FaqSection
        heading="Trainers — FAQs"
        intro="The hiring criteria, who founded Archer Infotech, how courses are matched to trainers, and how to evaluate a trainer before you enrol."
        items={trainersFaqs}
      />

      {/* How We Keep This Team Sharp — trust block + combined track record + CTA */}
      <section className="py-12 md:py-16 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                How We Keep This Team Sharp
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                All trainers above attend a quarterly internal upskilling review. Every six months, each trainer ships a
                side-project, a published article, or a certification refresh — added to their public profile so you can see
                the work, not just the title. We deliberately rotate guest sessions: every batch gets a primary instructor plus
                at least one subject-specialist deep-dive from a peer trainer.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">The combined track record</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border rounded-lg overflow-hidden bg-background">
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 md:p-4 font-medium">Combined MNC engineering experience</td>
                      <td className="p-3 md:p-4 text-right font-semibold text-primary whitespace-nowrap">54+ years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 md:p-4 font-medium">Trainers currently active in industry roles</td>
                      <td className="p-3 md:p-4 text-right font-semibold text-primary whitespace-nowrap">6 of 6</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 md:p-4 font-medium">Live corporate-training engagements (Amdocs, Capgemini, MindTree, Tech Mahindra)</td>
                      <td className="p-3 md:p-4 text-right font-semibold text-primary whitespace-nowrap">4 MNCs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 md:p-4 font-medium">Avg. response time to a student question</td>
                      <td className="p-3 md:p-4 text-right font-semibold text-primary whitespace-nowrap">&lt; 4 hours</td>
                    </tr>
                    <tr>
                      <td className="p-3 md:p-4 font-medium">Specialisations covered</td>
                      <td className="p-3 md:p-4 text-right text-xs text-muted-foreground">
                        Java · Python · Full Stack · .NET · Modern Web · Mobile · Data · AI/ML · GenAI · Cloud
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3">
                How a Trainer Gets Matched to Your Course
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Not every trainer teaches every course. We deliberately match each batch to the trainer with the
                {" "}<strong className="text-foreground">deepest current industry exposure</strong> for that specific stack.
                For example:
              </p>
              <ul className="space-y-3">
                <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 p-4 rounded-lg bg-background border">
                  <span className="font-semibold text-primary shrink-0 sm:w-64">Java Full Stack</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    led by <Link href="/trainers/ankita-hartale" className="text-primary hover:underline font-medium">Ankita Hartale</Link> (5+ years Java + database experience), with <Link href="/trainers/yogesh-patil" className="text-primary hover:underline font-medium">Yogesh Patil</Link> stepping in for advanced architecture sessions
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 p-4 rounded-lg bg-background border">
                  <span className="font-semibold text-primary shrink-0 sm:w-64">.NET Full Stack</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    owned by <Link href="/trainers/suraj-kudache" className="text-primary hover:underline font-medium">Suraj Kudache</Link> (7+ years .NET / C# at product companies in Pune)
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 p-4 rounded-lg bg-background border">
                  <span className="font-semibold text-primary shrink-0 sm:w-64">AI / Generative AI / Solution Architecture</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    led by <Link href="/trainers/vinod-patil" className="text-primary hover:underline font-medium">Vinod Patil</Link> (12 years across solution-architect and AI-platform roles)
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 p-4 rounded-lg bg-background border">
                  <span className="font-semibold text-primary shrink-0 sm:w-64">Modern Web (React, Angular, Next.js)</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    handled by <Link href="/trainers/amol-chougule" className="text-primary hover:underline font-medium">Amol Chougule</Link> (5+ years front-end and mobile specialist)
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 p-4 rounded-lg bg-background border">
                  <span className="font-semibold text-primary shrink-0 sm:w-64">Corporate / executive batches &amp; senior Python tracks</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    led by <Link href="/trainers/amol-patil" className="text-primary hover:underline font-medium">Amol Patil</Link> (10+ years senior corporate-trainer experience, currently engaged with MNC clients)
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 p-4 rounded-lg bg-background border">
                  <span className="font-semibold text-primary shrink-0 sm:w-64">Founder-led classes</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    entrepreneurship, career strategy, and architecture-level code reviews — run by <Link href="/trainers/yogesh-patil" className="text-primary hover:underline font-medium">Yogesh Patil</Link> himself
                  </span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-6">
                When you enrol, you will know your trainer&apos;s name and background
                {" "}<strong className="text-foreground">before the first class</strong> — including their LinkedIn profile,
                ongoing client engagements, and the specific projects they have shipped. No mystery, no last-minute trainer
                swaps.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                And because every trainer above is still shipping production code — whether at an
                {" "}<strong className="text-foreground">Amdocs</strong> client engagement, a Pune-based startup, or a
                {" "}<strong className="text-foreground">Tech Mahindra</strong> in-house team — the syllabus stays calibrated
                against what is being built in 2026, not what was hot five years ago. We refresh each course module every
                six months for exactly this reason: the framework versions, hiring patterns, and interview questions you
                encounter in class match what you will face in your first interview at a Pune MNC.
              </p>
            </div>

            <div className="bg-background border rounded-xl p-6 md:p-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Want to learn from them?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                The fastest way to evaluate a trainer is to sit in a live session.
                Book a free demo class in any course — no payment, no commitment — and you will be in the trainer&apos;s
                actual classroom (online or at our Kothrud centre) within seven days.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Book a Free Demo
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  Browse Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
