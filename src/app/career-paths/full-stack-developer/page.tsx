import type { Metadata } from "next";
import Link from "next/link";
import {
  Layers,
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
 * P5-19 — Cluster 2 hub: Become a Full Stack Developer (Pune, 2026).
 *
 * Sibling pillar to /career-paths/python-developer. Anchors a topic
 * cluster covering MERN vs MEAN vs Java FS, frontend vs backend,
 * stack-pick frameworks, Pune full-stack hiring map.
 *
 * Existing on-site surfaces linked inline:
 *  - /compare/mern-vs-java-full-stack
 *  - /courses/full-stack-development (category + 4 course pages)
 *  - /bootcamps/codeleap, /careercode, /techready
 *  - /tools/pune-it-salary-calculator, /pune-it-career-roadmap
 *
 * Target length ~4,500 words. Server-rendered for AI-engine citation.
 */

export const metadata: Metadata = buildPageMetadata({
  title: "How to Become a Full Stack Developer in Pune — Complete 2026 Roadmap",
  description:
    "The full path to becoming a full stack developer in Pune in 2026 — choosing between MERN, MEAN, Java Full Stack, .NET Full Stack, and Python Full Stack; the 12-month plan; salary bands; hiring companies; mistakes to avoid. Sourced from Pune full-stack hiring data — 1,800+ monthly listings.",
  path: "/career-paths/full-stack-developer",
  lastModified: EVERGREEN_LAST_REVIEWED,
});

const faqs = [
  {
    question: "How long does it take to become a full stack developer in Pune?",
    answer:
      "Realistic timeline: 10–14 months for a focused career changer. The full stack discipline requires deep enough fluency in both frontend (HTML/CSS/JS + a framework) and backend (a language + database + API design) that you can ship a complete feature end-to-end. That's 4 months of foundations + 4 months on your chosen stack + 4 months of portfolio projects and interview prep. Bootcamp pathways like CareerCode or TechReady compress this to 8–10 months including placement support.",
  },
  {
    question: "Which full stack should I pick in Pune — MERN, MEAN, Java, .NET, or Python?",
    answer:
      "Pune services-sector hiring volume in 2025: Java Full Stack ~700/month, .NET Full Stack ~400/month, MERN ~500/month, Python Full Stack ~300/month, MEAN ~80/month. Java FS has the most fresher slots; MERN has the strongest product-startup demand; .NET FS pays slightly more in enterprise BFSI/Insurance contexts; Python FS doubles as a Data Science gateway. There's no universally-best answer — pick based on the kind of role you want.",
  },
  {
    question: "Frontend, backend, or full stack — which should I aim for?",
    answer:
      "Full stack is the most-hired Pune services-sector profile in 2026. Specialist roles (pure frontend or pure backend) do exist and pay slightly more at senior levels, but at fresher and 1–3 year levels, full stack roles dominate the listings 4:1. The honest framing: become hireable as full stack first, then specialise into your stronger half over 2–4 years.",
  },
  {
    question: "Can I become a full stack developer without a CS degree?",
    answer:
      "Yes. About 40% of Pune full-stack hires we track come from non-CS backgrounds — engineering graduates from other branches, BCom, BBA, science. What separates hireable candidates from non-hireable is: a GitHub portfolio with 2–3 substantial deployed full-stack projects, comfort in a technical interview (DSA basics + system design fundamentals), and a clear narrative of why the candidate switched. The degree filter exists but doesn't override portfolio depth at most Pune employers.",
  },
  {
    question: "Should I learn React or Angular first?",
    answer:
      "Pune market split in 2026: React ~75%, Angular ~20%, Vue and other ~5%. If you have no preference, learn React — larger market, larger learning resources, easier to find help. Angular is the right pick if you target specific employers (Cognizant + Capgemini Pune teams use Angular heavily) or if you prefer opinionated frameworks. Both will get you hired; React maximises optionality.",
  },
  {
    question: "What does a portfolio for full stack developer interviews look like?",
    answer:
      "Three projects that close offers in Pune: (1) a deployed full-stack web app with authentication, REST API, database CRUD, deployed to a live URL (the foundation); (2) a project demonstrating one harder concept — real-time features (WebSockets), payment integration, file uploads, or third-party API integration (depth); (3) a portfolio/blog site you built yourself, deployed, and own end-to-end (signal of agency). GitHub Pages or Vercel for hosting; cost is near zero.",
  },
  {
    question: "How much do Pune full stack developers actually earn?",
    answer:
      "Fresher full stack offers in Pune currently land ₹3.5–6 LPA at services majors and ₹5–9 LPA at product companies (sampled from Naukri + LinkedIn + AmbitionBox Pune Full Stack listings, last 12 months). 1–3 years brings ₹6–11 LPA at services and ₹9–16 LPA at product. Senior full-stack roles at 5+ years sit ₹14–24 LPA at services, ₹20–35+ LPA at product. The stack choice (Java vs MERN vs .NET) affects this within ±15%.",
  },
  {
    question: "What's the difference between MERN, MEAN, and Java Full Stack?",
    answer:
      "MERN (MongoDB + Express + React + Node) is the JavaScript-everywhere stack — frontend and backend in one language, popular at product startups, easiest single-language pick for self-learners. MEAN swaps React for Angular. Java Full Stack (Spring Boot + Angular/React + SQL) dominates Pune services-sector hiring — heavier toolchain, more enterprise patterns, the safest fresher-placement pick. .NET Full Stack (ASP.NET Core + C# + Angular/React + SQL Server) is the equivalent in BFSI/Insurance/Healthcare Pune verticals.",
  },
  {
    question: "Do I need to know DevOps to be a full stack developer?",
    answer:
      "Basic deployment yes; deep DevOps no. By the time you ship your first portfolio project you should understand: Git/GitHub, environment variables + .env files, deploying to a free-tier host (Vercel, Render, Railway), basic Docker for local dev parity. CI/CD pipelines, Kubernetes, and observability are nice-to-have for fresher roles and become more relevant at 2+ years. Don't let DevOps depth gate your first full-stack job.",
  },
];

const milestones = [
  {
    timeframe: "Month 1–3",
    title: "HTML + CSS + JavaScript Foundations",
    detail:
      "Master semantic HTML, CSS (Flexbox + Grid + responsive design), and modern JavaScript (ES6+, async/await, fetch, DOM). Daily coding practice — ≥1 hour. End-of-phase milestone: rebuild 3 well-known site landing pages from scratch with no framework, deploy to GitHub Pages.",
  },
  {
    timeframe: "Month 4–5",
    title: "Pick Your Stack + Frontend Framework",
    detail:
      "Choose your stack (MERN / Java FS / .NET FS / Python FS). Learn the frontend framework: React for MERN/Java/Python; Angular for .NET/MEAN. Component composition, state management, routing, forms, API consumption. End-of-phase milestone: a working frontend SPA consuming a public API.",
  },
  {
    timeframe: "Month 6–8",
    title: "Backend + Database",
    detail:
      "Backend language fluency (Node.js / Java + Spring Boot / C# + ASP.NET / Python + Django/Flask). REST API design + auth (JWT). Database: PostgreSQL or MySQL for relational; MongoDB if your stack is MERN. Migrations, query design, indexes. End-of-phase milestone: a deployed full-stack app with auth + CRUD.",
  },
  {
    timeframe: "Month 9–10",
    title: "Portfolio Polish + Production Discipline",
    detail:
      "Build one substantial portfolio project (~80 hrs of work) demonstrating production discipline: tests, error handling, environment configuration, deployment, observability. This is the project that closes interviews. Polish GitHub, write a build-walkthrough blog post.",
  },
  {
    timeframe: "Month 11–14",
    title: "DSA + Interview Prep + Job Search",
    detail:
      "100+ LeetCode easy/medium problems, system design basics (load balancers, caching, database choice, queue patterns), mock interviews. Apply to 50+ companies. Specialty: prepare for full-stack-specific live-coding rounds (build a small app in 60–90 min). End-of-phase milestone: first offer in hand.",
  },
];

const stacks = [
  {
    name: "Java Full Stack",
    summary:
      "Spring Boot 3.x + JPA + Angular/React + PostgreSQL/MySQL. The Pune services-sector default; broadest fresher placement pool.",
    coreSkills: [
      "Java 17+, Spring Boot 3.x, Spring Data JPA, Spring Security",
      "Angular or React (Angular common at Cognizant + Capgemini)",
      "PostgreSQL or MySQL — joins, indexes, query plans",
      "REST API design + Swagger / OpenAPI",
      "Maven build + Jenkins / GitHub Actions for CI",
    ],
    huntFor: "Persistent, Capgemini, Mindtree, Tech Mahindra, Cognizant, Wipro, Infosys, Accenture, TCS",
    salaryBand: "₹3.5–6 LPA fresher → ₹8–14 LPA at 3–5 yrs",
    coursePath: "/courses/full-stack-development/java-full-stack-training-in-pune",
    courseName: "Java Full Stack Training in Pune",
  },
  {
    name: "MERN Stack",
    summary:
      "MongoDB + Express + React + Node.js. JavaScript everywhere; favoured by Pune product startups and SaaS-builders.",
    coreSkills: [
      "Modern JavaScript / TypeScript (ES6+ + async patterns)",
      "React fundamentals + hooks + state management",
      "Node.js + Express + REST API patterns",
      "MongoDB schema design + aggregation pipeline",
      "Deployment: Vercel (frontend) + Render / Railway / Fly.io (backend)",
    ],
    huntFor: "Pune product startups + SaaS cos, BrowserStack, Helpshift, Druva, GUVI, and many seed-stage AI startups",
    salaryBand: "₹4–7 LPA fresher → ₹9–16 LPA at 3–5 yrs",
    coursePath: "/courses/full-stack-development/mern-stack-training-in-pune",
    courseName: "MERN Stack Training in Pune",
  },
  {
    name: ".NET Full Stack",
    summary:
      "ASP.NET Core + C# + Entity Framework + Angular/React + SQL Server. Pune BFSI, Insurance, and Healthcare-vertical default.",
    coreSkills: [
      "C# + .NET 8 + ASP.NET Core MVC / Web API",
      "Entity Framework Core + LINQ",
      "Angular (.NET shops trend Angular) or React",
      "SQL Server — joins, stored procedures, indexes",
      "Azure App Services + Azure DevOps pipelines",
    ],
    huntFor: "Cognizant .NET practice, Saksoft, Mphasis, BNP Paribas IT, Allianz Pune tech, Atos Syntel",
    salaryBand: "₹4–7 LPA fresher → ₹9–16 LPA at 3–5 yrs",
    coursePath: "/courses/full-stack-development/dotnet-full-stack-training-in-pune",
    courseName: ".NET Full Stack Training in Pune",
  },
  {
    name: "Python Full Stack",
    summary:
      "Django/Flask + React + PostgreSQL. Doubles as the entry path to Data Science and AI engineering tracks.",
    coreSkills: [
      "Python + Django (or Flask + FastAPI) + Django REST Framework",
      "React fundamentals + hooks + state management",
      "PostgreSQL — relational design + query optimisation",
      "Celery + Redis for background jobs (Django ecosystem)",
      "Deployment: Render / Railway / Fly.io + Vercel for frontend",
    ],
    huntFor: "ZS Associates web + product teams, GUVI, Persistent product, Pune SaaS startups, AI startups with web frontends",
    salaryBand: "₹4–7 LPA fresher → ₹9–16 LPA at 3–5 yrs",
    coursePath: "/courses/full-stack-development/python-full-stack-training-in-pune",
    courseName: "Python Full Stack Training in Pune",
  },
];

const mistakes = [
  {
    title: "Trying to learn 3 frontend frameworks before going deep on one",
    detail:
      "React, Angular, Vue, Svelte — they all teach the same concepts (components, state, effects). You only need depth in one to be hireable. Pick one (React for most Pune learners), build 3 projects with it, then add a second framework only after your first job if a role specifically requires it.",
  },
  {
    title: "No deployed portfolio projects",
    detail:
      "Local-only projects on GitHub don't close interviews. Hiring managers ask 'where can I see it running?' Free deployment tiers (Vercel, Render, Railway, Fly.io) eliminate the cost excuse. By month 9 you should have 2 projects on live URLs.",
  },
  {
    title: "Skipping the database fundamentals module",
    detail:
      "Full stack roles include database design + query writing. SQL or MongoDB depth — joins, indexes, query plans, aggregations — is screened in technical interviews. Don't let an ORM (Spring Data JPA / Entity Framework / Mongoose) hide raw query skills from you.",
  },
  {
    title: "Treating CSS as an afterthought",
    detail:
      "Full stack means you ship visible UI. CSS fluency (Flexbox, Grid, responsive design, modern Tailwind) materially affects what hiring managers see in your portfolio. Bad CSS makes a good backend project look amateur. Spend 2–3 weeks specifically on CSS depth.",
  },
  {
    title: "Ignoring Git workflow until it's a real problem",
    detail:
      "Branching, pull requests, merge conflicts, rebasing, commit hygiene — these are interview screening areas at most Pune product companies and even some services majors. Practice the workflow on personal projects before you're in a team where mistakes cost something.",
  },
  {
    title: "Picking a stack based on hype rather than hiring data",
    detail:
      "Rust + Solid + Bun is exciting reading; Spring Boot + Angular + MySQL is what hires you in Pune. Match your stack pick to the actual hiring volume in your target market. Once you're employed, side-project with whatever's interesting.",
  },
  {
    title: "Building only CRUD apps",
    detail:
      "Every starter portfolio is a todo + auth + CRUD app. Recruiters scroll past these. One project that exercises a non-CRUD concept (real-time WebSockets, payments, file upload + processing, third-party API integration, scheduled jobs) immediately differentiates you.",
  },
  {
    title: "Not writing tests, ever",
    detail:
      "Pune services sector screens hard on testing discipline; product companies require it. Even basic Jest / Vitest unit tests on frontend logic and Mocha / pytest / xUnit tests on backend endpoints signal professional intent. Add tests retroactively to your strongest portfolio project before applying.",
  },
];

export default function FullStackDeveloperCareerPath() {
  return (
    <>
      <PageEvent
        event="career_path_viewed"
        properties={{ slug: "full-stack-developer" }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Career Paths", url: "/career-paths" },
          { name: "Full Stack Developer", url: "/career-paths/full-stack-developer" },
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
                { name: "Full Stack Developer" },
              ]}
            />
            <p className="uppercase text-xs tracking-wider opacity-80 mb-3 mt-2">
              Career Path · Pune · 2026
            </p>
            <h1
              id="pillar-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
            >
              How to Become a Full Stack Developer in Pune — Complete 2026 Roadmap
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">
              The realistic path from your first <code className="px-1.5 py-0.5 rounded bg-white/15">&lt;html&gt;</code> to a Pune full-stack offer — including which stack to pick, the 12-month plan, salary bands sourced from Pune hiring data, and the mistakes that stall career changers.
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
            Becoming a full stack developer in Pune in 2026 takes 10–14 months: 3 months of HTML/CSS/JS, 2 months on a frontend framework, 3 months on backend + database, 2 months portfolio polish, 2 months interview prep. The biggest decision is stack pick — Java Full Stack has the most services-sector fresher slots (~700 Pune listings/month); MERN dominates product startups (~500/month). Pune full-stack fresher salaries: ₹3.5–6 LPA services, ₹5–9 LPA product. Mid-level (3–5 yrs) bands move to ₹8–16 LPA. The bottleneck is rarely framework knowledge — it&apos;s deployed-portfolio depth and interview readiness. Sources: Naukri + LinkedIn + AmbitionBox Pune Full Stack listings, last 12 months.
          </DefinitiveAnswer>

          {/* Why Full Stack */}
          <section aria-labelledby="why-fullstack">
            <h2
              id="why-fullstack"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <Layers className="h-7 w-7 text-secondary" />
              Why Full Stack in Pune in 2026
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Full stack developer is the single most-hired role title in
                Pune&apos;s IT services sector in 2026. Pune Naukri + LinkedIn
                full-stack listings ran 1,800+ per month through 2025 — more
                than any specialist role (frontend, backend, or DevOps
                independently). The structural reason: services-sector
                project staffing prefers engineers who can move across
                layers, and product-company team sizes favour the same
                multi-skill profile. At fresher-to-mid levels, full stack
                roles outnumber specialist roles roughly 4:1 in Pune
                listings.
              </p>
              <p>
                The career economics work too. Pune full-stack fresher
                offers land ₹3.5–6 LPA at services majors and ₹5–9 LPA at
                product companies. By 3–5 years the bands shift to ₹8–14
                LPA services / ₹14–22 LPA product. Senior full-stack roles
                at product companies routinely exceed ₹30 LPA. Compared to
                pure-frontend or pure-backend specialist tracks, full stack
                pays slightly less at senior levels but enters the curve
                ₹0.5–1.5 LPA higher because of the broader fresher hiring
                pool.
              </p>
              <p>
                Stack pick matters but isn&apos;t the irreversible decision
                it feels like at start. About 30% of our full-stack
                graduates pivot stacks (Java FS → MERN, or vice versa)
                within their first 2 years — the second stack is much
                faster to pick up once you understand the universal
                concepts (REST, auth, relational vs document DBs, build
                tooling). Pick the stack that maps to where you want to
                work first; you can switch later.
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
              Realistic for a focused career changer or fresh graduate with
              consistent daily practice (≥1 hour weekday + 6+ hours
              weekend). Working professionals targeting the
              weekend-and-evening route should add 4–6 months for the same
              milestones.
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
              Structured bootcamp pathways compress this —{" "}
              <Link
                href="/bootcamps/codeleap"
                className="text-primary hover:underline font-medium"
              >
                CodeLeap
              </Link>{" "}
              (for 12th passouts),{" "}
              <Link
                href="/bootcamps/careercode"
                className="text-primary hover:underline font-medium"
              >
                CareerCode
              </Link>{" "}
              (for engineering students), and{" "}
              <Link
                href="/bootcamps/techready"
                className="text-primary hover:underline font-medium"
              >
                TechReady
              </Link>{" "}
              (for graduates) typically deliver the same milestones in 8–10
              months including placement support.
            </p>
          </section>

          {/* Stack Picks */}
          <section aria-labelledby="stack-picks">
            <h2
              id="stack-picks"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <GitBranch className="h-7 w-7 text-secondary" />
              Four Pune-Hireable Full Stacks — Pick One in Month 4
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Stack-pick framework: match the stack to the type of company
              you want to work at first. Java FS for services-major fresher
              slots (largest pool); MERN for product startups; .NET FS for
              Pune BFSI/Insurance verticals; Python FS if you want a Data
              Science gateway built into your stack.
            </p>
            <div className="space-y-4">
              {stacks.map((s, i) => (
                <div
                  key={i}
                  className="rounded-lg border p-5 bg-card hover:border-secondary transition-colors"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{s.name}</h3>
                    <span className="text-sm font-medium text-secondary">
                      {s.salaryBand}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {s.summary}
                  </p>
                  <p className="text-sm font-medium mb-2">Core skills:</p>
                  <ul className="space-y-1 mb-3">
                    {s.coreSkills.map((skill, j) => (
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
                    {s.huntFor}
                  </p>
                  <Link
                    href={s.coursePath}
                    className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
                  >
                    {s.courseName}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Stack-by-stack comparison:{" "}
              <Link
                href="/compare/mern-vs-java-full-stack"
                className="text-primary hover:underline font-medium"
              >
                MERN vs Java Full Stack
              </Link>
              .
            </p>
          </section>

          {/* Salary Trajectory */}
          <section aria-labelledby="salary-trajectory">
            <h2
              id="salary-trajectory"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <TrendingUp className="h-7 w-7 text-secondary" />
              Pune Full Stack Developer Salary Trajectory
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Bands below are Pune-specific, sourced from AmbitionBox +
              Indeed + LinkedIn + Naukri full-stack listings (last 12
              months). Bands hold within ±15% across the four stack picks
              (Java FS / MERN / .NET FS / Python FS).
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
                    <td className="p-3 text-muted-foreground">₹6–11 LPA</td>
                    <td className="p-3 text-muted-foreground">₹9–16 LPA</td>
                  </tr>
                  <tr>
                    <td className="p-3">Mid (3–6 yrs)</td>
                    <td className="p-3 text-muted-foreground">₹10–15 LPA</td>
                    <td className="p-3 text-muted-foreground">₹15–24 LPA</td>
                  </tr>
                  <tr>
                    <td className="p-3">Senior (6+ yrs)</td>
                    <td className="p-3 text-muted-foreground">₹14–24 LPA</td>
                    <td className="p-3 text-muted-foreground">₹22–35 LPA</td>
                  </tr>
                  <tr>
                    <td className="p-3">Staff / Architect</td>
                    <td className="p-3 text-muted-foreground">₹22–32 LPA</td>
                    <td className="p-3 text-muted-foreground">₹32–55+ LPA</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Interactive band exploration with stack-specific bumps:{" "}
              <Link
                href="/tools/pune-it-salary-calculator"
                className="text-primary hover:underline font-medium"
              >
                Pune IT Salary Calculator
              </Link>
              .
            </p>
          </section>

          {/* Hiring Companies */}
          <section aria-labelledby="hiring-companies">
            <h2
              id="hiring-companies"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <Building2 className="h-7 w-7 text-secondary" />
              Top Pune Companies Hiring Full Stack Developers
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Sampled from Naukri + LinkedIn + AmbitionBox Pune full-stack
              listings over the last 90 days. Not exhaustive — Pune has
              500+ companies actively hiring full-stack across the four
              main stacks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="font-semibold mb-2">Services majors</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Persistent Systems</li>
                  <li>Capgemini</li>
                  <li>Mindtree (LTIMindtree)</li>
                  <li>Tech Mahindra</li>
                  <li>Cognizant</li>
                  <li>Wipro · Infosys · TCS</li>
                  <li>Accenture · IBM India · Atos · DXC</li>
                </ul>
              </div>
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="font-semibold mb-2">Product + Startup cos</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>BrowserStack · Cybage · Druva</li>
                  <li>Helpshift · GUVI · Avaamo</li>
                  <li>Persistent product teams</li>
                  <li>Saksoft · Saviynt</li>
                  <li>BNP Paribas IT (BFSI .NET)</li>
                  <li>Allianz Pune tech (BFSI)</li>
                  <li>Pune SaaS + AI startups</li>
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
              8 Mistakes That Stall Full Stack Careers in Pune
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Patterns we see across both successful and stalled learners.
              The mistakes below correlate strongly with 6+ month delays in
              landing a first offer.
            </p>
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

          {/* Related reading */}
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
                  href="/courses/full-stack-development"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Full Stack Courses in Pune
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Category · 4 stack-specific tracks
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/pune-it-salary-calculator"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Pune IT Salary Calculator
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Tool · 13 roles × 4 experience tiers
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/frontend-vs-backend-developer-career-pune"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Frontend vs Backend Developer Career
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Comparison · Pune specialisation framework
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/career-paths/python-developer"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Python Developer Career Path
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Sibling pillar · Python-specific roadmap
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/best-full-stack-projects-for-pune-resume-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    10 Best Full Stack Projects for Pune Resume
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Guide · portfolio projects ranked by recruiter signal
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/react-interview-questions-pune-freshers-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    10 React Interview Questions for Pune Freshers
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Guide · ranked by Pune interview frequency
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/tailwind-vs-bootstrap-for-pune-frontend-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Tailwind vs Bootstrap for Pune Frontend
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Comparison · utility-first vs component library pick
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/nodejs-concepts-pune-full-stack-developers-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    10 Node.js Concepts for Pune Full Stack Devs
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Guide · event loop + streams + middleware + auth + testing
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/postgresql-queries-pune-full-stack-developers-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    10 PostgreSQL Queries for Pune Full Stack Devs
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Guide · JSONB + window functions + UPSERT + indexes
                  </span>
                </Link>
              </li>
            </ul>
          </section>

          {/* FAQ */}
          <FaqSection
            heading="Frequently asked questions"
            intro="Common questions from prospective full-stack developers we've trained over the last 17 years."
            items={faqs}
          />
        </div>
      </article>

      {/* CTA footer */}
      <section className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Compass className="h-10 w-10 text-secondary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to start your full-stack career?
          </h2>
          <p className="text-muted-foreground mb-6">
            We&apos;ve trained 10,000+ engineers since 2009, with full-stack
            tracks placing 90% within 6 months of completion. Book a free
            demo and we&apos;ll map a personalised version of this roadmap
            to your background.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="course_enquiry_clicked"
              properties={{
                location: "career_path_cta",
                career_path: "full-stack-developer",
              }}
            >
              Book a Free Demo
            </TrackedLink>
            <Link
              href="/courses/full-stack-development"
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
            >
              See full-stack courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
