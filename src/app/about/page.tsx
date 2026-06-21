import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Award, Target, Eye, Calendar, Star, Building2, GraduationCap, BookMarked } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/data/site-config";
import { getTeamMembers, getTrainer } from "@/data/team";
import { getHiringPartners } from "@/data/companies";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { LinkedinIcon } from "@/components/common/social-icons";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { buildPageMetadata } from "@/lib/seo";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { NewsletterSignupForm } from "@/components/newsletter/newsletter-signup-form";
import { aboutFaqs } from "@/data/faqs";
import { PersonJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = buildPageMetadata({
  title: "About Archer Infotech — Pune IT Institute Since 2009",
  description:
    "Learn about Archer Infotech, Pune's trusted IT training institute since 2009. Our mission, vision, and team of expert trainers behind 10,000+ students trained and 5,000+ placed.",
  path: "/about",
});

export default function AboutPage() {
  const teamMembers = getTeamMembers();
  const hiringPartners = getHiringPartners();
  const founder = getTrainer("yogesh-patil");

  return (
    <>
      {/* Breadcrumb trail — SERP URL-path display + graph completeness.
          Audit 2026-06-21. */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />

      {/* Person schema for the named founder — E-E-A-T signal that AI
          engines and Google's helpful-content system reward. P4-08. */}
      {founder && (
        <PersonJsonLd
          name={founder.name}
          jobTitle={founder.role}
          description={founder.bio}
          image={founder.image}
          knowsAbout={founder.expertise}
          linkedin={founder.linkedin}
          url={`/trainers/${founder.id}`}
        />
      )}

      {/* Hero Section */}
      <section className="gradient-hero text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Archer Infotech — Pune&apos;s Trusted IT Training Institute Since 2009
            </h1>
            <p className="text-lg text-white/80">
              Archer Infotech is a leading IT and Language training centre providing
              full-suite of training and placement services for freshers seeking a
              new career and professionals looking for career advancement.
            </p>
          </div>
        </div>
      </section>

      {/* Definitive Answer Paragraph — citation-friendly factual opening
          rendered before any marketing copy. AI engines lift this verbatim
          when answering "About Archer Infotech / who is Archer Infotech".
          P8-07. */}
      <DefinitiveAnswer eyebrow="About Archer Infotech">
        Archer Infotech is an IT training institute in Kothrud, Pune,
        founded in 2009 and led by Yogesh Patil, a senior Java and Spring
        Boot trainer with 15+ years of MNC experience at Persistent Systems
        and Wipro. Over 17+ years it has trained 10,000+ students and placed
        5,000+ at companies like TCS, Infosys, Wipro, Tech Mahindra and
        Persistent Systems, holding a 90% placement rate and a 5.0-star
        Google rating. The institute teaches Java, Python, Full Stack, Data
        Science, AI/ML, AWS, DevOps and Cloud across weekday, weekend and
        online batches, with placement assistance bundled into every
        flagship program.
      </DefinitiveAnswer>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Welcome to <span className="text-primary">Archer Infotech</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Archer Infotech is mastered and administrated by highly skilled
                  industry experts with more than 15 years of IT experience. Our
                  institute has trained thousands of students who are now working
                  at top IT companies across India and abroad.
                </p>
                <p>
                  We have a team of highly skilled professional trainers delivering
                  proficient IT training in an affable environment, focusing on the
                  individual&apos;s needs to enable them to excel in the challenging
                  professional environment.
                </p>
                <p>
                  Our team never leaves any page unturned in the book of career and
                  success. We are committed to providing industry-relevant training
                  with placement assistance.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: siteConfig.stats.studentsPlaced, label: "Students Placed" },
                { value: siteConfig.stats.yearsExperience, label: "Years Experience" },
                { value: siteConfig.stats.batchesCompleted, label: "Batches Completed" },
                { value: siteConfig.stats.placementRate, label: "Placement Rate" },
              ].map((stat) => (
                <Card key={stat.label} className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary mb-2">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Archer Infotech?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are committed to providing the best IT training experience with
              focus on practical learning and career success.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-background p-4 rounded-lg"
              >
                <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {/* Vision Card */}
            <Card className="group border-l-4 border-l-primary transition-shadow hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center transition-colors group-hover:bg-primary">
                    <Eye className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded by <strong className="text-foreground">Yogesh Patil</strong> with over 15 years of hands-on IT industry experience, Archer Infotech was built on a single, unwavering belief — that every student in Pune deserves access to training that actually gets them hired.
                  </p>
                  <p>
                    Our vision is to be <strong className="text-foreground">Pune&apos;s most recognised IT training institute in Kothrud</strong> — a centre of excellence where freshers, graduates, and working professionals come to master in-demand technologies like Java, Python, Full Stack Development, AWS Cloud, DevOps, Data Science, and Generative AI — and leave with a job offer in hand.
                  </p>
                  <p className="font-semibold text-primary">
                    We don&apos;t just teach technology. We build careers.
                  </p>
                  <p>
                    With <strong className="text-foreground">5,000+ students placed</strong> at top IT companies including TCS, Infosys, Wipro, Tech Mahindra, and Persistent Systems, and <strong className="text-foreground">1,000+ batches</strong> successfully completed from our institute near Kothrud Bus Stand, Pune — our vision is backed by a 17-year track record that speaks louder than any promise.
                  </p>
                  <p>
                    As the IT industry evolves rapidly — from Cloud and DevOps to ChatGPT, LLMs, and Generative AI — our vision is to stay permanently ahead of that curve, so our students are always the most job-ready candidates walking into any interview room in Pune, Mumbai, or anywhere in India.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Mission Card */}
            <Card className="group border-l-4 border-l-secondary transition-shadow hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center transition-colors group-hover:bg-secondary">
                    <Target className="h-6 w-6 text-secondary transition-colors group-hover:text-secondary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our mission is to make <strong className="text-foreground">high-quality IT education accessible</strong> to every student in Pune — whether you are a fresher starting your career or an experienced professional looking to upskill.
                  </p>
                  <p className="font-medium text-foreground">
                    At our institute in Kothrud, Pune, we are committed to:
                  </p>
                  <ul className="space-y-3 ml-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span>Delivering industry-aligned IT courses taught by <strong className="text-foreground">certified trainers with 10+ years</strong> of real-world experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span>Providing <strong className="text-foreground">placement assistance</strong> with 100+ corporate partners including TCS, Infosys, Wipro, Tech Mahindra, and Persistent Systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span>Training students through <strong className="text-foreground">hands-on projects, live assignments, and mock interviews</strong> that prepare them for the competitive IT job market</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span>Continuously updating our curriculum to reflect the <strong className="text-foreground">latest technologies</strong> — from AWS and Kubernetes to ChatGPT, LLMs, and Prompt Engineering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span>Creating <strong className="text-foreground">globally competitive IT professionals</strong> who are job-ready from day one</span>
                    </li>
                  </ul>
                  <p className="italic text-center pt-4 border-t">
                    &ldquo;To reach every corner of the country and help students realise their full potential — creating world-class IT professionals, one batch at a time.&rdquo;
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Founding Story — full narrative with founder context. Heavy
          E-E-A-T surface; pairs with the Person JSON-LD emitted at the
          top so search engines can match the bio to the entity. P4-08. */}
      <section
        aria-labelledby="founding-story-heading"
        className="py-16 border-t"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
              The Founding Story
            </p>
            <h2
              id="founding-story-heading"
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Why Archer Infotech exists
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
              <p>
                Archer Infotech was founded in <strong className="text-foreground">2009 in Kothrud, Pune</strong>{" "}
                by <strong className="text-foreground">Yogesh Patil</strong>, a senior Java and
                Spring Boot trainer who had spent 15+ years inside MNCs like Persistent Systems and Wipro
                shipping production code, mentoring junior developers, and watching freshers walk into
                their first interview with the wrong skills. He kept seeing the same gap: engineering
                graduates in Pune knew the theory but couldn&apos;t debug a real bug, write production-grade
                Java, deploy a working app, or talk through their thought process in a 45-minute interview
                round. The classroom training that existed at the time — at SevenMentor, TechnoGeeks, the
                NIIT-style chains — was lecture-heavy, batch-sized for revenue not learning, and disconnected
                from what TCS, Infosys, Wipro and Persistent were actually hiring for that quarter.
              </p>
              <p>
                Archer Infotech was built to close that gap. The first batch — eight students — ran out of
                a small classroom near Kothrud Bus Stand. The pitch was simple: small batches, working
                trainers (not retired academics), real production projects, and direct referrals into the
                MNC hiring partners Yogesh and the early team had built relationships with over a decade
                in industry. The first cohort placed eight out of eight at Pune IT companies within four
                months. That ratio, broadly, is what Archer Infotech still delivers in 2026 — a 90%
                placement rate (institute internal records) across cohorts who complete training and clear
                at least one mock-interview round.
              </p>
              <p>
                Seventeen years later, the model is the same — small classes, working trainers, real
                projects, direct referrals — but the catalogue and the campus have grown. The same
                Kothrud centre near Bus Stand now runs 40+ tech courses spanning Java, Python, Full Stack,
                Cloud, DevOps, Data Science, AI/ML and Generative AI; three career-stage bootcamps
                (CodeLeap for 12th passouts, CareerCode for engineering students, TechReady for graduates);
                and corporate training engagements with Amdocs, Capgemini, MindTree and Tech Mahindra.
                The numbers behind the work — 10,000+ trained, 5,000+ placed, 1,000+ batches completed,
                100+ hiring partners, a 5.0-star Google rating across 126+ verified reviews — are the
                output of one editorial choice repeated batch after batch: hire trainers who still ship
                production code, and refuse to scale faster than the trainer team can sustain.
              </p>
            </div>

            {founder?.linkedin && (
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={`/trainers/${founder.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Read {founder.name}&apos;s full profile
                </Link>
                <TrackedAnchor
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  event="founder_linkedin_clicked"
                  properties={{ location: "about_founding_story" }}
                >
                  <LinkedinIcon className="h-4 w-4" />
                  Connect with {founder.name.split(" ")[0]} on LinkedIn
                </TrackedAnchor>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Milestones Timeline — visual proof of operating history. Each
          row anchors a verifiable institute claim. P4-08. */}
      <section
        aria-labelledby="milestones-heading"
        className="py-16 bg-muted/30 border-t"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
              Seventeen Years On
            </p>
            <h2
              id="milestones-heading"
              className="text-3xl md:text-4xl font-bold mb-3"
            >
              Archer Infotech milestones
            </h2>
            <p className="text-muted-foreground mb-10 max-w-2xl">
              The institute&apos;s operating history, told through the
              numbers that matter most to learners and hiring partners.
            </p>

            <ol className="relative border-l-2 border-primary/20 ml-3 space-y-8 list-none p-0">
              {[
                {
                  year: "2009",
                  title: "Archer Infotech founded in Kothrud, Pune",
                  body: "First batch of 8 students near Kothrud Bus Stand; placed 8/8 at Pune IT companies within four months. The institute's small-batch, working-trainer, project-led model was set in this first cohort.",
                },
                {
                  year: "2012",
                  title: "Java Full Stack flagship programme launches",
                  body: "Curriculum extended from core Java into the full Spring + database + front-end stack as Pune MNCs began hiring exclusively for full-stack profiles. Java Full Stack remains the institute's most-hired track.",
                },
                {
                  year: "2016",
                  title: "Python and Data Science tracks added",
                  body: "Catalogue expanded into Python and the early Data Science / Machine Learning curriculum to match the post-2015 shift in Pune hiring demand from Java-only to Python + data roles.",
                },
                {
                  year: "2019",
                  title: "10th anniversary; AWS and DevOps tracks",
                  body: "1,000+ alumni at Pune MNCs and product startups by the 10-year mark. Cloud + DevOps tracks added as Indian IT services moved off-prem and onto AWS / Azure.",
                },
                {
                  year: "2021",
                  title: "Online + hybrid delivery rolled out site-wide",
                  body: "Every flagship course shifted to hybrid mode (Kothrud campus + live online over Zoom / Google Meet) with the same trainer, syllabus, projects and placement support — extending reach to learners outside Pune without diluting the small-batch model.",
                },
                {
                  year: "2023",
                  title: "Generative AI and LLM curriculum",
                  body: "Generative AI, prompt engineering, and ChatGPT / LLM tracks added across the catalogue. AI fluency woven into every flagship course as a baseline skill rather than treated as an upsell.",
                },
                {
                  year: "2024",
                  title: "CodeLeap, CareerCode and TechReady bootcamps",
                  body: "Three career-stage bootcamps launched — CodeLeap for 12th passouts, CareerCode for engineering students, TechReady for graduates — formalising the structured 5-year path from school to first job.",
                },
                {
                  year: "2026",
                  title: "10,000+ trained, 5,000+ placed, 100+ hiring partners",
                  body: "17 years of operating history; 90% placement rate across cohorts who complete training; 5.0-star Google rating across 126+ verified reviews; active corporate-training engagements with Amdocs, Capgemini, MindTree, Tech Mahindra.",
                },
              ].map((m) => (
                <li key={m.year} className="ml-6">
                  <span className="absolute -left-[11px] flex h-5 w-5 items-center justify-center rounded-full bg-primary ring-4 ring-background">
                    <Calendar className="h-2.5 w-2.5 text-primary-foreground" />
                  </span>
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <span className="text-lg md:text-xl font-bold text-primary">
                      {m.year}
                    </span>
                    <h3 className="text-base md:text-lg font-semibold text-foreground">
                      — {m.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {m.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Meet Our <span className="text-primary">Expert Trainers</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team of industry professionals brings real-world experience from top IT companies
              like TCS, Wipro, Capgemini, and more. Learn from trainers who have been where you want to go.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="text-center hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <CardContent className="pt-6">
                  {member.image ? (
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden relative">
                      <Image
                        src={member.image}
                        alt={`${member.name}, ${member.role} at Archer Infotech, Pune`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    {member.linkedin && (
                      <TrackedAnchor
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-[#0077B5] transition-colors"
                        title={`${member.name} on LinkedIn`}
                        event="team_linkedin_clicked"
                        properties={{ member_name: member.name, location: "about_page" }}
                      >
                        <LinkedinIcon className="h-4 w-4" />
                      </TrackedAnchor>
                    )}
                  </div>
                  <p className="text-secondary font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground mb-1">{member.experience} Experience</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{member.bio}</p>
                  <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                    {member.expertise.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs bg-muted px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <TrackedLink
                    href={`/trainers/${member.id}`}
                    className="inline-flex items-center justify-center text-sm font-medium text-primary hover:text-secondary transition-colors"
                    event="trainer_card_clicked"
                    properties={{ trainer_id: member.id, location: "about_page" }}
                  >
                    View full profile →
                  </TrackedLink>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Partners — named list with stats. Substantiates the
          "100+ corporate hiring partners" claim by showing 20 of them
          with logos. Internal-link target for course pages and the DAP
          on /placements. P4-08. */}
      <section
        aria-labelledby="hiring-partners-heading"
        className="py-16 border-t"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
              Hiring Partners
            </p>
            <h2
              id="hiring-partners-heading"
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Trusted by 100+ companies across Pune and India
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Archer Infotech alumni have been placed across the full
              spectrum of Indian IT — from Tier-1 services majors and
              global captives, to product engineering firms and Pune-based
              startups. Listed below are 20 of the 100+ active hiring
              partners (drive history, last 12 months); the full list is
              maintained internally and updated each quarter by the
              placement team. Hiring drives run continuously through the
              year for learners who have completed flagship programmes
              and cleared the institute&apos;s mock-interview round.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {hiringPartners.map((company) => (
              <div
                key={company.id}
                className="flex items-center justify-center p-4 bg-background rounded-lg border hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="text-center">
                  <Building2 className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                  <div className="font-semibold text-sm text-foreground">
                    {company.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            …and 80+ more partners across services, product, BFSI and
            startups. See{" "}
            <Link href="/placements" className="text-primary hover:underline font-medium">
              the full placements record
            </Link>{" "}
            for hiring history, salary bands and student stories.
          </p>
        </div>
      </section>

      {/* Industry Recognition & Trust Signals — verifiable claims only,
          framed as trust surface rather than self-awarded recognition.
          E-E-A-T signal that Google's helpful-content system rewards.
          P4-08. */}
      <section
        aria-labelledby="recognition-heading"
        className="py-16 bg-muted/30 border-t"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
              Recognition &amp; Trust
            </p>
            <h2
              id="recognition-heading"
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Why students and enterprises choose Archer Infotech
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed">
              The institute&apos;s standing in Pune comes from verifiable
              outcomes — review scores from real students, repeat enterprise
              clients, and a 17-year operating history rather than
              self-awarded recognition. Every claim below is grounded in
              first-party data the placement team and admissions counsellors
              maintain.
            </p>

            <div className="grid md:grid-cols-2 gap-5">
              <Card className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Star className="h-5 w-5 text-secondary fill-secondary" />
                    </div>
                    <h3 className="font-bold text-lg">5.0-star Google rating</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Across 126+ verified Google reviews (as of May 2026)
                    from former students. The rating reflects placement
                    outcomes and trainer depth — the two things students
                    and parents consistently call out in review text.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">Active enterprise clients</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Archer Infotech runs on-site corporate training
                    engagements with Amdocs, Capgemini, MindTree and Tech
                    Mahindra (as of May 2026). What the trainer team
                    teaches in classroom batches is informed by what these
                    MNCs actively hire for that quarter.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">17 years of placement history</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    5,000+ students placed at MNCs and product startups
                    since 2009 (institute placement-team records, updated
                    annually). The 90% placement rate across batches who
                    complete training and clear at least one mock-interview
                    round has stayed consistent across cohorts.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                      <GraduationCap className="h-5 w-5 text-secondary" />
                    </div>
                    <h3 className="font-bold text-lg">Industry-active faculty</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Six-person core trainer team with 54+ years of combined
                    MNC engineering experience — every member still active
                    in production roles or live corporate-training
                    engagements. LinkedIn URLs and current client
                    engagements are listed publicly on each{" "}
                    <Link href="/trainers" className="text-primary hover:underline">
                      trainer profile
                    </Link>
                    .
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-10 rounded-2xl border bg-background p-6 md:p-8">
              <div className="flex items-start gap-4">
                <BookMarked className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">
                    Editorial discipline that holds the standard
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Every trainer attends a quarterly internal upskilling
                    review. Every six months, each trainer ships a
                    side-project, a published article, or a certification
                    refresh — added to their public profile so prospective
                    learners can verify the work before enrolling. The
                    institute deliberately rotates guest sessions: every
                    batch gets a primary instructor plus at least one
                    subject-specialist deep-dive from a peer trainer. The
                    refusal to scale faster than the trainer team can
                    sustain is what keeps the placement rate stable across
                    17 years of cohorts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ block + FAQPage JSON-LD — citable answers to entity-level
          questions about Archer Infotech (founding, leadership, scale,
          differentiation, corporate offering). P8-08. */}
      <FaqSection
        heading="About Archer Infotech — FAQs"
        intro="The founding story, leadership, training history and what makes Archer Infotech different from other Pune IT institutes."
        items={aboutFaqs}
      />

      {/* P5-17 — newsletter banner. */}
      <section className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 max-w-3xl">
          <NewsletterSignupForm
            placement="about"
            variant="banner"
            headline="Pune IT careers — monthly briefing"
            subhead="Hiring updates, salary movements, and an employer spotlight every month. Free."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your IT Career?
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Join Archer Infotech and transform your career with our industry-relevant
            training programs and placement assistance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="cta_clicked"
              properties={{ cta: "contact_us", location: "about_page_bottom" }}
            >
              Contact Us
            </TrackedLink>
            <TrackedLink
              href="/courses"
              className="inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
              event="cta_clicked"
              properties={{ cta: "explore_courses", location: "about_page_bottom" }}
            >
              Explore Courses
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
