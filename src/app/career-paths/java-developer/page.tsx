import type { Metadata } from "next";
import Link from "next/link";
import {
  Coffee,
  Compass,
  TrendingUp,
  Building2,
  CalendarRange,
  AlertTriangle,
  GitBranch,
  ArrowRight,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/json-ld";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { LastUpdated } from "@/components/seo/last-updated";
import { buildPageMetadata } from "@/lib/seo";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";

/**
 * P5-18+ — Cluster 5: Become a Java Developer (Pune, 2026).
 *
 * Fifth career-path pillar — anchors the LARGEST single-language hiring
 * category in Pune (services-sector Java + Spring Boot dominates fresher
 * volume by 2-3x vs. any other language). The Java career is distinct
 * enough from Full Stack to warrant its own pillar — covers backend,
 * Android, enterprise architecture, and microservices specialisation arcs.
 *
 * Sibling pillars: python-developer, full-stack-developer, data-science-ai,
 * first-it-job-pune.
 *
 * Target length ~3,500 words (slightly tighter than other pillars).
 */

export const metadata: Metadata = buildPageMetadata({
  title: "How to Become a Java Developer in Pune — Complete 2026 Career Roadmap",
  description:
    "The full Java developer career path for Pune in 2026: 12-month plan, four specialisation arcs (Backend / Full Stack / Android / Enterprise Architect), salary trajectory, hiring companies, and mistakes to avoid. Java drives 30%+ of Pune fresher hiring volume.",
  path: "/career-paths/java-developer",
  lastModified: EVERGREEN_LAST_REVIEWED,
});

const faqs = [
  {
    question: "Why is Java still the top fresher hiring language in Pune in 2026?",
    answer:
      "Pune's IT services sector — Persistent, Capgemini, Mindtree, Tech Mahindra, Cognizant, Wipro, Infosys, TCS — runs the majority of its enterprise codebases on Java + Spring Boot. These same companies hire the largest fresher batches in Pune (combined 5,000-8,000 freshers/year). The structural dependency is decades deep; it isn't changing soon. Java fresher listings in Pune ran 2,000-2,800/month consistently through 2025 — roughly 2x the volume of any other single language.",
  },
  {
    question: "How long does it take to become a Java developer in Pune from scratch?",
    answer:
      "Realistic timeline: 8-12 months for a focused career changer. Java's stricter syntax + heavier toolchain (Maven, Spring, JPA) means slightly longer ramp than Python (~9 vs ~7 months to portfolio depth), but the placement velocity is faster because Pune services-major hiring volume is structurally larger. Structured programmes compress to 6-9 months including placement support.",
  },
  {
    question: "Should I learn Core Java or Spring Boot first?",
    answer:
      "Core Java first — there's no productive shortcut. Spring Boot assumes solid Java fundamentals: classes, inheritance, generics, collections, exceptions, basic concurrency. 3 months of Core Java depth saves 6 months of Spring Boot confusion. Many learners try to skip directly to Spring Boot via tutorials; they end up framework-fluent but fundamentals-shaky, which fails technical interviews at the medium-tier and above.",
  },
  {
    question: "Java vs Python for Pune freshers — which is the right pick?",
    answer:
      "Java for largest fresher hiring pool (services majors); Python for fastest career growth into data/AI specialisations. Java fresher salary band ₹3.5-6 LPA (services), Python equivalent (₹3.5-7 LPA depending on track). Java's career arc maps cleanly through Full Stack → Microservices Architect → Enterprise Architect at ₹25-40 LPA; Python's into Data Science → ML Engineer → AI Engineer at similar ceilings. Neither is wrong; the question is which hiring channel you're optimising for.",
  },
  {
    question: "Do Pune product companies hire Java developers, or is it mostly services?",
    answer:
      "Both, with a tilt — services majors hire the volume, product companies hire a meaningful slice. Pune product Java work: Persistent product teams, Druva, Cybage, Saksoft, Atos, BFSI tech (BNP Paribas IT, Allianz tech), and large e-commerce engineering. Product-company Java fresher salaries land ₹5-9 LPA vs services ₹3.5-6 LPA, with the trade-off of deeper portfolio + DSA + system design filters.",
  },
  {
    question: "What about Android development with Java in 2026?",
    answer:
      "Android Java is shrinking but still hireable. Google has shifted official Android development to Kotlin (which is interoperable with Java), but Pune Android shops still run substantial Java codebases that need maintenance + extension. Realistic strategy: learn Java fundamentals first, then add Kotlin in months 6-9 if Android is your target. Pure Android Java jobs exist but the trend is clearly toward Java + Kotlin combined.",
  },
  {
    question: "What microservices skills do Pune Java developers need?",
    answer:
      "Spring Boot + Spring Cloud foundations, REST API design, basic distributed-system concepts (eventual consistency, idempotency, retries), Docker + Kubernetes basics, and message queues (RabbitMQ / Kafka exposure). Pune services-major projects that pay above-band fresher offers (₹5-7 LPA) increasingly expect microservices fluency at year-1. Get the Spring Boot foundations solid first; layer microservices on top in months 9-12.",
  },
  {
    question: "How important is DSA for Pune Java fresher interviews?",
    answer:
      "Services-major tier: 50+ easy LeetCode + 20 medium is the working baseline. Product-company tier (Persistent product, Druva, BFSI tech): 100+ medium + 20 hard. Top-tier product: 200+ medium/hard. Java is the second-best language for LeetCode practice after Python (clean syntax for collections + concurrency). Most failed Java fresher interviews at product tier are DSA-failed, not Java-failed.",
  },
];

const milestones = [
  {
    timeframe: "Month 1–3",
    title: "Core Java Fundamentals",
    detail:
      "Master Java syntax + OOP deeply: classes, inheritance, polymorphism, encapsulation, abstract classes, interfaces, generics, exception handling, collections framework, file I/O, basic concurrency (Thread, Runnable, Executor). Daily coding practice — ≥1 hour. End-of-phase milestone: solve 40+ HackerRank Java problems + build 1 console-based application (banking, library, inventory) with proper OOP design.",
  },
  {
    timeframe: "Month 4–6",
    title: "Spring Boot + Database Integration",
    detail:
      "Spring Boot 3.x fundamentals: dependency injection, REST controllers, Spring Data JPA, MySQL/PostgreSQL integration, Spring Security basics, Spring profiles for config. Add unit testing with JUnit 5 + Mockito. End-of-phase milestone: a deployed Spring Boot REST API with authentication, full CRUD, integration tests, pushed to GitHub with a clean README.",
  },
  {
    timeframe: "Month 7–9",
    title: "Specialisation + Frontend or Microservices",
    detail:
      "Choose your direction: Java Full Stack (add React or Angular for backend-frontend integration), Microservices (add Spring Cloud + Docker + Kafka), or Android (add Android SDK + Kotlin basics). Go deep. End-of-phase milestone: 1-2 portfolio projects demonstrating your chosen specialisation at production-grade quality.",
  },
  {
    timeframe: "Month 10–12",
    title: "Portfolio Polish + Interview Prep",
    detail:
      "Final production-grade portfolio project (~80 hrs). 100+ LeetCode easy + medium for services-tier; 80+ medium for product-tier. System design basics (load balancing, caching, message queues). Mock interviews — 2 technical + 1 HR per week. Apply to 60+ companies. End-of-phase milestone: first offer in hand.",
  },
];

const tracks = [
  {
    name: "Backend Developer (Spring Boot)",
    summary:
      "Pune's most-hired Java profile by volume — services-sector dominant. Backend feature development against established Spring Boot codebases, often working on a single business capability for a major US/UK client.",
    coreSkills: [
      "Java 17+, Spring Boot 3.x, Spring Data JPA, Spring Security",
      "REST API design + OpenAPI / Swagger documentation",
      "PostgreSQL or MySQL — joins, indexes, query optimisation",
      "Maven build + Jenkins/GitHub Actions CI",
      "Unit + integration testing (JUnit 5 + Mockito + Testcontainers)",
    ],
    huntFor: "All Pune services majors + many product companies + BFSI tech teams",
    salaryBand: "₹3.5–6 LPA fresher → ₹8–14 LPA at 3–5 yrs",
    coursePath: "/courses/programming/java-training-in-pune",
    courseName: "Java Training in Pune",
  },
  {
    name: "Java Full Stack",
    summary:
      "Spring Boot backend + Angular or React frontend + relational DB. The Pune services-sector default for client-facing application work; also strong product-company demand.",
    coreSkills: [
      "Full Java backend stack (above) +",
      "Angular OR React — component design, state management, routing",
      "Spring Security with JWT + role-based access",
      "Modern build tooling: Vite/webpack for frontend, Maven for backend",
      "Basic Docker for local dev + deployment",
    ],
    huntFor: "Services majors + product cos + BFSI verticals + Pune startups using JVM stacks",
    salaryBand: "₹4–7 LPA fresher → ₹9–16 LPA at 3–5 yrs",
    coursePath: "/courses/full-stack-development/java-full-stack-training-in-pune",
    courseName: "Java Full Stack Training in Pune",
  },
  {
    name: "Microservices + Cloud-Native",
    summary:
      "Spring Cloud + Docker + Kubernetes + message queues. The high-velocity specialisation track at product companies and modern services-major engagements. Pays materially above the backend band.",
    coreSkills: [
      "Spring Cloud (Config Server, Service Discovery, Gateway, Circuit Breaker)",
      "Docker + Kubernetes basics + Helm charts",
      "RabbitMQ or Kafka for async messaging",
      "Observability — Prometheus + Grafana + distributed tracing",
      "Cloud platform basics (AWS, Azure, or GCP — one)",
    ],
    huntFor: "Persistent product, Druva, BFSI tech teams modernising legacy systems, Pune product startups",
    salaryBand: "₹6–10 LPA fresher → ₹14–22 LPA at 3–5 yrs",
    coursePath: "/courses/full-stack-development/spring-boot-microservices-training-in-pune",
    courseName: "Spring Boot Microservices Training in Pune",
  },
  {
    name: "Android Java + Kotlin",
    summary:
      "Mobile Android development — Java with progressive Kotlin adoption. Smaller hiring market than backend/full-stack but specialised + stable demand at Pune mobile shops.",
    coreSkills: [
      "Java fundamentals + progressive Kotlin adoption",
      "Android SDK + Jetpack Compose (modern) + Android Studio",
      "Room (SQLite) + Retrofit (REST) + Coroutines (async)",
      "MVVM architecture + lifecycle awareness",
      "Play Store deployment + crash analytics",
    ],
    huntFor: "Pune mobile shops + Helpshift mobile + Avaamo mobile + product cos with Android apps",
    salaryBand: "₹4–6 LPA fresher → ₹9–15 LPA at 3–5 yrs",
    coursePath: "/courses/mobile-app-development/android-development-training-in-pune",
    courseName: "Android Development Training in Pune",
  },
];

const mistakes = [
  {
    title: "Jumping to Spring Boot before Core Java fundamentals",
    detail:
      "The most common Java learner mistake. Spring Boot tutorials make you productive quickly but leave fundamentals gaps that fail interview rounds. Generics, collections internals, exception hierarchies, multithreading basics — these are the screening areas. 3 months of solid Core Java before Spring Boot pays back over years.",
  },
  {
    title: "Ignoring testing discipline",
    detail:
      "Pune services-sector hiring screens hard on test code quality; product companies require it. JUnit 5 + Mockito basics on portfolio projects materially improve interview signal. Even one project with 70%+ test coverage demonstrates the professional discipline that hiring managers look for.",
  },
  {
    title: "No deployed portfolio",
    detail:
      "Local-only Spring Boot apps don't close interviews. Deploy to Render, Railway, or Fly.io free tier with a working URL. By month 9 you should have 2 deployed projects with public URLs and clean GitHub READMEs.",
  },
  {
    title: "Underrating SQL + database design",
    detail:
      "Most Java backend roles are 50% database work. SQL fluency — joins, indexes, query plans, transaction isolation, basic normalisation — is interview-screened at services majors and required at product. Spend 3-4 weeks on PostgreSQL or MySQL depth using a real schema, not just SELECT FROM toy examples.",
  },
  {
    title: "Tutorial-only learning without projects",
    detail:
      "Java tutorial content (Udemy, YouTube, free guides) is abundant but trains tutorial-followers, not problem-solvers. Every learning block must end with you applying it to your own project. By month 6 you should have 5+ Spring Boot projects on GitHub, even if some are small.",
  },
  {
    title: "Skipping DSA for Java fresher prep",
    detail:
      "Even services-major Java interviews include light DSA screens. Product-company Java interviews lean on DSA heavily. 50+ LeetCode easy + 30 medium in Java specifically (not just Python) is the floor for serious product-tier targets.",
  },
];

export default function JavaDeveloperCareerPath() {
  return (
    <>
      <PageEvent
        event="career_path_viewed"
        properties={{ slug: "java-developer" }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Career Paths", url: "/career-paths" },
          { name: "Java Developer", url: "/career-paths/java-developer" },
        ]}
      />
      <FAQJsonLd faqs={faqs} />

      <article aria-labelledby="pillar-title">
        <header className="gradient-hero text-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <Breadcrumbs
              variant="light"
              items={[
                { name: "Career Paths", href: "/career-paths" },
                { name: "Java Developer" },
              ]}
            />
            <p className="uppercase text-xs tracking-wider opacity-80 mb-3 mt-2">
              Career Path · Pune · 2026
            </p>
            <h1
              id="pillar-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
            >
              How to Become a Java Developer in Pune — Complete 2026 Career Roadmap
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">
              Java drives the single largest fresher hiring volume in Pune
              (2,000–2,800 monthly listings, 2x any other language). The full
              path from <code className="px-1.5 py-0.5 rounded bg-white/15">public static void main</code>{" "}
              to a Pune offer — including 4 specialisation arcs, the 12-month
              plan, salary trajectory, and mistakes that stall Java careers.
            </p>
            <div className="mt-4">
              <LastUpdated
                iso={EVERGREEN_LAST_REVIEWED}
                className="text-xs md:text-sm text-white/70"
              />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 md:py-16 space-y-14 max-w-4xl">
          {/* TL;DR */}
          <DefinitiveAnswer eyebrow="The short version">
            Becoming a Java developer in Pune in 2026 takes 8–12 months of focused work: 3 months Core Java fundamentals, 3 months Spring Boot + database, 3 months specialisation (Backend / Full Stack / Microservices / Android), 1–3 months portfolio polish + interview prep. Pune Java fresher salaries: ₹3.5–6 LPA (services) / ₹5–9 LPA (product). Senior + architect tracks reach ₹25–40 LPA. Java drives Pune&apos;s largest single-language fresher hiring volume (2,000-2,800 listings/month, ~2x any other) so first-offer probability is structurally higher than other tracks. Source: Naukri + LinkedIn Pune Java listings, last 90 days.
          </DefinitiveAnswer>

          {/* Why Java */}
          <section aria-labelledby="why-java">
            <h2
              id="why-java"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <Coffee className="h-7 w-7 text-secondary" />
              Why Java Dominates Pune Fresher Hiring in 2026
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Pune&apos;s IT services sector — Persistent, Capgemini,
                Mindtree, Tech Mahindra, Cognizant, Wipro, Infosys, TCS,
                Accenture, IBM India — runs the majority of its enterprise
                codebases on Java + Spring Boot. These same companies hire
                the largest fresher batches in Pune (combined 5,000-8,000
                freshers per year). The structural dependency is decades
                deep; it isn&apos;t changing soon. Pune Java fresher listings
                ran 2,000-2,800 per month consistently through 2025 — roughly
                2x the volume of any other single language.
              </p>
              <p>
                For a fresher optimising for first-offer probability inside
                90 days, Java is the single highest-EV language pick. The
                services-major Java hiring pipeline is the largest, most
                forgiving, and most structured. Realistic outcome: ~70% of
                Pune Java track graduates have first offer in hand inside
                90 days of active search; ~85% within 120 days. The numbers
                are favourable because the math is favourable.
              </p>
              <p>
                Career economics work too. Pune Java fresher offers: ₹3.5-6
                LPA (services) / ₹5-9 LPA (product). 1-3 years experience:
                ₹5-10 LPA services / ₹8-16 LPA product. 5+ years: ₹14-24 LPA
                services / ₹20-35 LPA product. Senior Java Architect + Staff
                Engineer roles in Pune product cos clear ₹30-50+ LPA. The
                ladder is one of the cleanest in Indian tech because Java is
                the enterprise default — every step up the ladder has demand.
              </p>
            </div>
          </section>

          {/* 12-month plan */}
          <section aria-labelledby="twelve-month-plan">
            <h2
              id="twelve-month-plan"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <CalendarRange className="h-7 w-7 text-secondary" />
              The 12-Month Plan
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Realistic for a focused career changer or fresh graduate. Java
              takes ~2 months longer than Python to reach hireable depth
              because of the heavier toolchain + stricter type system —
              that&apos;s offset by faster placement velocity once you&apos;re
              hireable.
            </p>
            <ol className="space-y-4">
              {milestones.map((m, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-lg border p-5 bg-card"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-semibold shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-baseline gap-3 mb-1">
                      <h3 className="font-semibold text-lg">{m.title}</h3>
                      <span className="text-sm text-secondary font-medium">
                        {m.timeframe}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {m.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-sm text-muted-foreground mt-6">
              Structured programmes compress this —{" "}
              <Link
                href="/courses/programming/java-training-in-pune"
                className="text-primary hover:underline font-medium"
              >
                Java Training in Pune
              </Link>{" "}
              + the{" "}
              <Link
                href="/bootcamps/careercode"
                className="text-primary hover:underline font-medium"
              >
                CareerCode
              </Link>{" "}
              bootcamp pathway typically delivers the same milestones in 6-9
              months including placement support.
            </p>
          </section>

          {/* Four Tracks */}
          <section aria-labelledby="four-tracks">
            <h2
              id="four-tracks"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <GitBranch className="h-7 w-7 text-secondary" />
              Four Java Career Tracks — Pick One in Month 7
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Java&apos;s ecosystem branches into four hireable arcs. Each
              shares the Core Java + Spring Boot foundation (Months 1-6) and
              then diverges. Salary bands rise as you move down this list.
            </p>
            <div className="space-y-4">
              {tracks.map((t, i) => (
                <div
                  key={i}
                  className="rounded-lg border p-5 bg-card hover:border-secondary transition-colors"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{t.name}</h3>
                    <span className="text-sm font-medium text-secondary">
                      {t.salaryBand}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {t.summary}
                  </p>
                  <p className="text-sm font-medium mb-2">Core skills:</p>
                  <ul className="space-y-1 mb-3">
                    {t.coreSkills.map((skill, j) => (
                      <li
                        key={j}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-muted-foreground mb-3">
                    <span className="font-medium text-foreground">
                      Pune hiring:
                    </span>{" "}
                    {t.huntFor}
                  </p>
                  <Link
                    href={t.coursePath}
                    className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
                  >
                    {t.courseName}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Salary Trajectory */}
          <section aria-labelledby="salary-trajectory">
            <h2
              id="salary-trajectory"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <TrendingUp className="h-7 w-7 text-secondary" />
              Pune Java Developer Salary Trajectory
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Sourced from AmbitionBox + Indeed + LinkedIn + Naukri Pune Java
              listings (last 12 months). Table reflects Backend Developer
              band (the median Java role); Full Stack + Microservices
              specialisations skew 10-30% above; Android is in line.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border rounded-lg overflow-hidden">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Experience</th>
                    <th className="text-left p-3 font-semibold">
                      Pune Services Majors
                    </th>
                    <th className="text-left p-3 font-semibold">
                      Pune Product Cos
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-3">Fresher (0–1 yr)</td>
                    <td className="p-3 text-muted-foreground">₹3.5–6 LPA</td>
                    <td className="p-3 text-muted-foreground">₹5–9 LPA</td>
                  </tr>
                  <tr>
                    <td className="p-3">Junior (1–3 yrs)</td>
                    <td className="p-3 text-muted-foreground">₹5–10 LPA</td>
                    <td className="p-3 text-muted-foreground">₹8–16 LPA</td>
                  </tr>
                  <tr>
                    <td className="p-3">Mid (3–6 yrs)</td>
                    <td className="p-3 text-muted-foreground">₹9–14 LPA</td>
                    <td className="p-3 text-muted-foreground">₹14–24 LPA</td>
                  </tr>
                  <tr>
                    <td className="p-3">Senior (6+ yrs)</td>
                    <td className="p-3 text-muted-foreground">₹14–24 LPA</td>
                    <td className="p-3 text-muted-foreground">₹22–35 LPA</td>
                  </tr>
                  <tr>
                    <td className="p-3">Staff / Architect</td>
                    <td className="p-3 text-muted-foreground">₹22–32 LPA</td>
                    <td className="p-3 text-muted-foreground">₹30–50+ LPA</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Interactive band exploration:{" "}
              <Link
                href="/tools/pune-it-salary-calculator"
                className="text-primary hover:underline font-medium"
              >
                Pune IT Salary Calculator
              </Link>
              .
            </p>
          </section>

          {/* Top Companies */}
          <section aria-labelledby="hiring-companies">
            <h2
              id="hiring-companies"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <Building2 className="h-7 w-7 text-secondary" />
              Top Pune Companies Hiring Java Developers
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Effectively every Pune services major + a large slice of
              product companies. Java hiring is structurally distributed
              across the largest set of Pune employers — making it the
              broadest target list of any career track.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="font-semibold mb-2">Services majors</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Persistent Systems · Capgemini</li>
                  <li>Mindtree (LTIMindtree) · Tech Mahindra</li>
                  <li>Cognizant · Wipro · Infosys · TCS</li>
                  <li>Accenture · IBM India · Atos · DXC</li>
                  <li>Coforge · Mphasis · Saksoft</li>
                  <li>Amdocs · Cybage · Atos Syntel</li>
                </ul>
              </div>
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="font-semibold mb-2">
                  Product + BFSI tech cos
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Persistent product teams</li>
                  <li>Druva · Cybage · Saksoft</li>
                  <li>BNP Paribas IT (BFSI)</li>
                  <li>Allianz Pune tech (BFSI)</li>
                  <li>Atos Syntel · BMC Software · Sungard</li>
                  <li>Pune e-commerce + SaaS startups</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mistakes */}
          <section aria-labelledby="mistakes">
            <h2
              id="mistakes"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <AlertTriangle className="h-7 w-7 text-secondary" />
              6 Mistakes That Stall Java Careers in Pune
            </h2>
            <ol className="space-y-4">
              {mistakes.map((m, i) => (
                <li
                  key={i}
                  className="rounded-lg border-l-4 border-amber-500 bg-amber-50/30 dark:bg-amber-950/10 p-4"
                >
                  <h3 className="font-semibold mb-1 flex items-start gap-2">
                    <span className="text-amber-700 dark:text-amber-400">
                      {i + 1}.
                    </span>
                    {m.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {m.detail}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* Related Reading */}
          <section
            aria-labelledby="related-reading"
            className="rounded-lg border bg-muted/30 p-6"
          >
            <h2
              id="related-reading"
              className="text-xl md:text-2xl font-bold flex items-center gap-3 mb-4"
            >
              <BookOpen className="h-6 w-6 text-secondary" />
              Go Deeper — Related Reading
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li>
                <Link
                  href="/compare/java-vs-python-for-beginners"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Java vs Python for Beginners
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Comparison · first-language pick framework
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/mern-vs-java-full-stack"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    MERN vs Java Full Stack
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Comparison · stack pick framework
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/best-spring-boot-projects-for-pune-resume-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    10 Best Spring Boot Projects for Pune Resume
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Guide · portfolio projects foundation → microservices → AI
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/spring-boot-interview-questions-pune-java-freshers-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    10 Spring Boot Interview Questions for Pune Freshers
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Guide · ranked by Pune interview frequency
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/programming/java-training-in-pune"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Java Training in Pune
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Course · 4 months Core Java + Spring Boot
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/career-paths/full-stack-developer"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Full Stack Developer Career Path
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Sibling pillar · Java FS is one of 4 stack picks
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/monolithic-vs-microservices-for-pune-java-developers-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Monolithic vs Microservices for Pune Java
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Comparison · architecture pick + salary upside
                  </span>
                </Link>
              </li>
            </ul>
          </section>

          {/* FAQ */}
          <FaqSection
            heading="Frequently asked questions"
            intro="Common questions from prospective Java developers we've trained over the last 17 years."
            items={faqs}
          />
        </div>
      </article>

      {/* CTA */}
      <section className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Compass className="h-10 w-10 text-secondary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to start your Java career?
          </h2>
          <p className="text-muted-foreground mb-6">
            We&apos;ve trained 10,000+ engineers since 2009 — Java has been
            our most-placed track for 17 years running. Book a free demo
            and we&apos;ll map a personalised version of this roadmap to
            your background.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="course_enquiry_clicked"
              properties={{
                location: "career_path_cta",
                career_path: "java-developer",
              }}
            >
              Book a Free Demo
            </TrackedLink>
            <Link
              href="/courses/programming/java-training-in-pune"
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
            >
              See the Java course
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
