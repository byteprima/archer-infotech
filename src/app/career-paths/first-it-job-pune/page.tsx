import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  Compass,
  TrendingUp,
  Building2,
  CalendarRange,
  AlertTriangle,
  Target,
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
 * P5-21 — Cluster 4 hub: Land Your First IT Job in Pune.
 *
 * Path-agnostic pillar — applies to any tech stack pick. Covers the
 * meta-decisions and execution patterns that determine whether you land
 * a first offer in 60 days or 6 months: portfolio principles, DSA prep,
 * interview discipline, application strategy, resume + LinkedIn polish,
 * services vs product trade-off, common rejection patterns.
 *
 * Sibling pillars: python-developer, full-stack-developer, data-science-ai.
 * The fourth and final career-paths pillar in the P5-18-to-21 batch.
 *
 * Target length ~4,500 words. Server-rendered.
 */

export const metadata: Metadata = buildPageMetadata({
  title: "How to Land Your First IT Job in Pune — Complete 2026 Guide",
  description:
    "The path-agnostic playbook for landing your first Pune IT offer in 2026 — services vs product trade-off, portfolio principles, DSA prep, interview discipline, the 90-day search plan, and the 8 patterns that derail freshers. Works for any tech stack.",
  path: "/career-paths/first-it-job-pune",
  lastModified: EVERGREEN_LAST_REVIEWED,
});

const faqs = [
  {
    question: "Should I aim for a services-major job or a product company for my first IT job in Pune?",
    answer:
      "Services-major fresher hiring is structurally larger (15-20x the volume of product-company fresher hiring) and has more forgiving filters (campus drives, batch intakes, 3-6 month bench-to-project ramp). Product companies pay 40-80% more but expect deeper portfolio + DSA + system design + technical communication at fresher level. The pragmatic answer: target services for the first offer (likely outcome inside 90 days), then pivot to product after 18-24 months of experience. Skipping services and going product-only often extends the search to 6-9 months.",
  },
  {
    question: "How many companies should I apply to for my first IT job?",
    answer:
      "Realistic target: 60-100 well-targeted applications across services + product + mid-tier consulting + startups, spread over 8-12 weeks. Quality matters — a tailored CV + targeted cover note for each application gets meaningfully better conversion than 500 mass applications. Track everything in a spreadsheet: company, role, applied date, source (referral / portal / direct), CV variant sent, response, interview rounds. The data tells you what's working.",
  },
  {
    question: "Do I need DSA preparation for Pune fresher IT jobs?",
    answer:
      "For services-major filter rounds: 30–50 easy LeetCode problems is the realistic floor (pattern recognition + basic algorithms). For product-company interviews: 100-150 medium problems + 20 hard is the working baseline. For top-tier product companies (BrowserStack, Persistent product teams, AI startups): 250+ medium/hard + competitive-programming exposure. The bar scales with company tier. Most failed Pune fresher interviews at product cos are DSA-failed, not stack-failed.",
  },
  {
    question: "Is referral-based application better than direct portal application?",
    answer:
      "Yes — by 3-5x conversion. The data is consistent across hiring channels: a referred candidate is roughly 4x more likely to get an initial recruiter conversation and 2x more likely to get an offer. LinkedIn is the primary referral discovery channel; the second is alumni from your college / bootcamp / course. Spend 30 minutes a day cultivating referrals; it outperforms 30 minutes more on LeetCode at the early-search stage.",
  },
  {
    question: "How important is GitHub for Pune fresher IT jobs?",
    answer:
      "Critical at product companies; meaningful at services majors; near-zero at pure body-shops. Product company hiring managers will open your GitHub during the technical screen — a thin profile screens you out. Services majors don't always check, but a clean GitHub with 3-5 pinned portfolio projects materially improves the interview signal you generate. Investment-to-impact ratio: very high; ~20 hrs of GitHub polish at the search start phase is among the highest-leverage actions you can take.",
  },
  {
    question: "What's the right Pune fresher CV format?",
    answer:
      "Single-page ATS-friendly format: contact + LinkedIn + GitHub at top; one-line summary (3 lines max); skills (organised by category, not a wall of words); projects (3 highest-impact, with measurable outcomes — 'reduced X by Y' or 'built Z used by N people'); education; certifications (only if relevant). Honest framing: services-major hiring teams pattern-match against templates; product companies read carefully. Tailor the CV per target tier.",
  },
  {
    question: "How long should my first IT job search take in Pune?",
    answer:
      "Realistic distribution from our placement-cell data (90% institute-records rate across 17 years): ~40% land first offer in 60 days of active search; ~70% in 90 days; ~85% in 120 days; ~95% in 6 months. The variance is 80% explained by: (1) application volume + targeting discipline, (2) interview communication readiness, (3) GitHub + portfolio depth, (4) the specific tech stack vs Pune market demand for it. Setting an active 90-day search target — with daily application + prep — beats waiting until you 'feel ready'.",
  },
  {
    question: "Should I negotiate a fresher offer in Pune?",
    answer:
      "Yes, lightly, and almost everyone underestimates the room. Services-major fresher offers have ₹0.3-0.8 LPA negotiation room when you have a second offer in hand. Product-company offers typically have ₹1-2 LPA negotiation room. The frame: 'I'm genuinely excited about the role. I have another offer at X LPA — can you match it / move closer?' is more effective than 'I want more money.' Don't negotiate if you don't have a competing offer or a strong market-rate argument; you'll come across as inexperienced.",
  },
  {
    question: "What if I get rejected from 30 companies in a row?",
    answer:
      "Diagnostic first: was the rejection at CV screen (fix CV + targeting), recruiter screen (fix communication + LinkedIn presence), technical screen (fix DSA / portfolio depth), or final round (fix interview pacing / soft skills)? Random-feeling rejections almost always cluster at one stage. Fix the highest-frequency stage, run another 20 applications, re-diagnose. Most fresher search recoveries happen by fixing one specific stage — not by applying harder.",
  },
];

const milestones = [
  {
    timeframe: "Week 1–2",
    title: "Foundation Audit + CV Polish",
    detail:
      "Audit your portfolio (GitHub repos, deployed projects, technical writing). Build a single-page CV in 2-3 variants (services-targeted, product-targeted, startup-targeted). Set up LinkedIn properly: photo, banner, headline targeting your search, About section, work + project entries, 3-5 endorsements requested. Spreadsheet ready for tracking applications.",
  },
  {
    timeframe: "Week 3–4",
    title: "Application Engine On",
    detail:
      "First 25 applications: 15 services majors (Persistent, Capgemini, Mindtree, Tech Mahindra, Cognizant, etc.), 5 mid-tier consulting (Saksoft, Cybage, Atos), 5 product / startup. Mix of portal application + LinkedIn referral requests + direct email. Target 5-7 daily applications. Start LeetCode in parallel (30 min/day, easy track).",
  },
  {
    timeframe: "Week 5–8",
    title: "Interview Loop Beginning + Diagnose",
    detail:
      "First interviews land. After each: write a short post-mortem (what was asked, what went well, what didn't, action item). Identify your weakest stage (CV/recruiter/tech/final) and fix that with focused practice. Continue application volume (3-5/day baseline). Add mock interviews — 2 technical + 1 HR per week.",
  },
  {
    timeframe: "Week 9–12",
    title: "Offer Conversion",
    detail:
      "By now you should have ≥3 active processes. Convert. Final-round prep: company-specific research, behavioural answer rehearsal, project-walkthrough discipline. Negotiation prep if multiple offers come in. End-of-phase milestone: first offer accepted OR diagnostic-driven plan for week 13+.",
  },
  {
    timeframe: "Week 13+",
    title: "Extended Search (if needed)",
    detail:
      "If no offer by week 12, this is a diagnosis phase not a willpower phase. Most extended searches need ONE specific fix — usually CV targeting, portfolio depth, or interview communication. Bring in external feedback: career-cell mock, LinkedIn community review, peer code review. Don't apply more; fix the bottleneck first.",
  },
];

const pillars = [
  {
    name: "Portfolio + GitHub",
    summary:
      "The single highest-leverage signal you control. Three projects: foundation (deployed full-stack app), depth (one harder concept demonstrated), agency (your own portfolio site).",
    details: [
      "3-5 pinned repos with clear READMEs (not 50 tutorial clones)",
      "At least 1 project deployed to a live URL (free tier OK)",
      "Commit history showing daily-or-near-daily activity over 3-6 months",
      "Clean code: linting, formatting, basic tests",
      "Technical blog post or detailed README walking through one build",
    ],
  },
  {
    name: "DSA + System Design",
    summary:
      "The universal interview gate. Tier your prep against your target companies — services majors need pattern recognition, product companies need depth.",
    details: [
      "Services tier: 50+ LeetCode easy + 20 medium",
      "Product tier: 100+ medium + 20 hard, focused on top patterns (arrays, hashing, two pointers, DP basics, trees)",
      "System design basics for product fresher: load balancers, caching, choosing DBs, simple scaling",
      "Practice coding LIVE (whiteboard / shared editor), not just in your IDE",
      "Time-boxed practice — easy 15 min, medium 30 min, hard 60 min",
    ],
  },
  {
    name: "Resume + LinkedIn",
    summary:
      "Where 70% of opportunities start. ATS-friendly format, recruiter-readable headline, project narratives that sell.",
    details: [
      "Single-page CV with 3 variants (services / product / startup)",
      "LinkedIn: clear photo + headline targeting your search + complete About + projects entries",
      "Skills section ordered by tier (top 5 expert / next 5 proficient / rest familiar)",
      "Cold outreach scripts ready for recruiters + hiring managers",
      "Profile open to opportunities, with current geo and role preferences correctly set",
    ],
  },
  {
    name: "Application + Interview Strategy",
    summary:
      "Volume + targeting + diagnosis. Track everything; fix the weakest stage; don't just apply harder when stuck.",
    details: [
      "Target 60-100 well-chosen applications across 8-12 weeks",
      "Mix: 60% services, 25% mid-tier, 15% product / startup (calibrate to your stack)",
      "Track in spreadsheet: applied, source, response, interview outcomes",
      "Post-mortem every interview: write what was asked + what you'd do different",
      "Mock interviews: 2 technical + 1 HR per week from week 4 onward",
    ],
  },
];

const mistakes = [
  {
    title: "Waiting until you 'feel ready' to start applying",
    detail:
      "The single biggest cause of extended fresher searches. Most learners delay application start by 2-4 months because they 'aren't ready yet.' The truth: you become ready faster by starting applications + interviews than by studying alone. Start applying at month 8 of a 12-month learning plan, not month 12. Early rejections are diagnostic, not discouraging.",
  },
  {
    title: "Random application without targeting",
    detail:
      "Applying to 200 unrelated roles dilutes everything — your CV becomes generic, your time goes to low-conversion roles, and you can't track what's working. Pick 5-7 target company categories, build CV variants for each, and track conversion per category. The pattern data tells you where to double down.",
  },
  {
    title: "Skipping mock interviews",
    detail:
      "Most fresher rejections after the technical round are interview communication failures, not technical failures. You can know the answer and still fail by hesitating, talking too quickly, or not structuring your response. Mock interviews — even with peers — directly improve this. 4-6 mocks in your first 3 weeks of search is the lowest-effort highest-leverage prep.",
  },
  {
    title: "Ignoring referrals because 'I don't know anyone'",
    detail:
      "LinkedIn cold messages to alumni from your college / bootcamp / course get 15-25% reply rates if written well — that's a huge funnel. Find 20 alumni at target companies, message each with a clear specific ask, and you'll have 3-5 referrals inside 2 weeks. The 'I don't know anyone' belief is false; you haven't asked yet.",
  },
  {
    title: "Optimising LeetCode at the expense of everything else",
    detail:
      "DSA matters, but only one of the four pillars of fresher hireability (portfolio, DSA, resume/LI, application strategy). Many learners spend 8 weeks grinding 300 LeetCode problems and still don't get offers — because their CV is generic, GitHub is thin, and application count is low. Balance the time across all four pillars.",
  },
  {
    title: "Generic CV for every application",
    detail:
      "A services-major CV that highlights bench-to-project readiness loses against a product-company CV that highlights deployed projects + DSA exposure. Same candidate, different framing per target tier. Three variants is the minimum; 5-7 lightly-tailored versions is better.",
  },
  {
    title: "Not tracking applications + responses",
    detail:
      "If you can't tell me your application-to-interview rate, recruiter-screen-to-technical rate, or technical-to-offer rate, you can't diagnose what to fix. A simple spreadsheet — applied, source, response, stages, outcome — is foundational. Fixing bottlenecks requires data.",
  },
  {
    title: "Quitting too early",
    detail:
      "About 30% of fresher searches that succeed by month 6 had given up applying around month 3 and re-started. The first 8-10 weeks of applications often have low conversion because the search machinery isn't tuned yet. Push past the early-discouragement window. If month 3 looks bleak, diagnose + fix + continue — don't stop.",
  },
];

export default function FirstITJobPuneCareerPath() {
  return (
    <>
      <PageEvent
        event="career_path_viewed"
        properties={{ slug: "first-it-job-pune" }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Career Paths", url: "/career-paths" },
          { name: "First IT Job in Pune", url: "/career-paths/first-it-job-pune" },
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
                { name: "First IT Job in Pune" },
              ]}
            />
            <p className="uppercase text-xs tracking-wider opacity-80 mb-3 mt-2">
              Career Path · Pune · 2026
            </p>
            <h1
              id="pillar-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
            >
              How to Land Your First IT Job in Pune — Complete 2026 Guide
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">
              The path-agnostic playbook — works for Java, Python, full
              stack, data, anything. Services vs product trade-off,
              portfolio principles, DSA prep, the 90-day search plan, and
              the 8 patterns that derail freshers.
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
            Landing a first IT job in Pune in 2026 takes 60–120 days of focused search if you have your portfolio + CV + LinkedIn + DSA basics ready. The 4 pillars that determine outcome: portfolio depth (3 deployed projects), DSA prep (tiered to your target companies — services need 50+ easy, product need 100+ medium), CV + LinkedIn polish (with 3 variants), and application strategy (60-100 targeted applications, tracked in a spreadsheet). Services-major fresher offers land ₹3-6 LPA; product-company offers land ₹5-12 LPA depending on stack. About 90% of placement-eligible fresher candidates land an offer in 6 months — based on Archer Infotech&apos;s 17-year placement data.
          </DefinitiveAnswer>

          {/* Why this pillar */}
          <section aria-labelledby="why-this">
            <h2
              id="why-this"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <Briefcase className="h-7 w-7 text-secondary" />
              Why Most First-IT-Job Searches Take 6+ Months
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Looking at the search-pattern data of ~5,000 Archer Infotech
                placements over 17 years, the distribution of first-offer
                timelines clusters into two clear groups. Group A: ~70% land
                first offer inside 90 days of active search. Group B: 30%
                take 4-6+ months — and the variance between groups is
                almost entirely explained by structural issues, not stack
                pick or market conditions.
              </p>
              <p>
                The four structural issues that predict extended searches:
                (1) starting application too late, waiting to &lsquo;feel
                ready&rsquo;; (2) low application volume (under 30 across the
                first 8 weeks); (3) untargeted CV that doesn&apos;t
                differentiate services-tier vs product-tier framing; (4) no
                interview post-mortem discipline, so the same mistakes
                repeat across 10+ interviews. None of these are about
                knowing more Java or more Python; they&apos;re about how the
                search machine runs.
              </p>
              <p>
                Stack pick matters less than most learners think for the
                first offer. Pune services majors (60-70% of fresher hiring
                volume) generally don&apos;t care whether you trained on
                Java FS, MERN, .NET FS, or Python — they hire on
                fundamentals + bench-readiness + portfolio + interview
                signal, then ramp you on their actual project stack
                post-joining. The honest framing: focus 80% of your search
                energy on these four pillars (not stack-specific depth) for
                the first offer.
              </p>
            </div>
          </section>

          {/* 12-week plan */}
          <section aria-labelledby="twelve-week-plan">
            <h2
              id="twelve-week-plan"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <CalendarRange className="h-7 w-7 text-secondary" />
              The 90-Day Search Plan
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Built around a 12-week active search window. The plan assumes
              you have foundational tech skills (one stack at portfolio-ready
              depth) and is about how to convert that into an offer. If you
              don&apos;t yet have a stack at portfolio depth, see our
              technical career-path pillars first.
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
          </section>

          {/* Four Pillars */}
          <section aria-labelledby="four-pillars">
            <h2
              id="four-pillars"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <Target className="h-7 w-7 text-secondary" />
              The 4 Pillars of Fresher Hireability
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Every successful first-offer search runs on these four. If
              your search is stalling, one of them is the weakest link.
              Audit yourself against each.
            </p>
            <div className="space-y-4">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  className="rounded-lg border p-5 bg-card hover:border-secondary transition-colors"
                >
                  <h3 className="font-semibold text-lg mb-2">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {p.summary}
                  </p>
                  <ul className="space-y-1">
                    {p.details.map((d, j) => (
                      <li
                        key={j}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Services vs Product */}
          <section aria-labelledby="services-vs-product">
            <h2
              id="services-vs-product"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <TrendingUp className="h-7 w-7 text-secondary" />
              Services-Major vs Product Company — The First-Offer Trade-off
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The most consequential meta-decision in your first-offer
              search. Both are valid Pune career entry points; they have
              materially different filter patterns + compensation + early
              experience.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border rounded-lg overflow-hidden">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Dimension</th>
                    <th className="text-left p-3 font-semibold">
                      Services Majors
                    </th>
                    <th className="text-left p-3 font-semibold">
                      Product Companies
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-3 font-medium">Pune fresher volume</td>
                    <td className="p-3 text-muted-foreground">
                      ~80% of total
                    </td>
                    <td className="p-3 text-muted-foreground">
                      ~20% of total
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Fresher salary band</td>
                    <td className="p-3 text-muted-foreground">₹3–6 LPA</td>
                    <td className="p-3 text-muted-foreground">₹5–12 LPA</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Filter strictness</td>
                    <td className="p-3 text-muted-foreground">
                      Pattern + bench-readiness
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Portfolio + DSA + system design
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">
                      Realistic search timeline
                    </td>
                    <td className="p-3 text-muted-foreground">60–90 days</td>
                    <td className="p-3 text-muted-foreground">90–180 days</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">
                      Stack flexibility on joining
                    </td>
                    <td className="p-3 text-muted-foreground">High</td>
                    <td className="p-3 text-muted-foreground">Low</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Bench / training period</td>
                    <td className="p-3 text-muted-foreground">3–6 months</td>
                    <td className="p-3 text-muted-foreground">2–6 weeks</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Year-2 promotion %</td>
                    <td className="p-3 text-muted-foreground">10–15%</td>
                    <td className="p-3 text-muted-foreground">20–35%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Pragmatic recommendation: target services for the first
              offer (likely outcome inside 90 days), then pivot to product
              after 18–24 months of services-sector experience. The pure
              product-first path works for top 20% candidates; for
              everyone else, services-first is the higher-probability
              route.
            </p>
          </section>

          {/* Top Companies */}
          <section aria-labelledby="hiring-companies">
            <h2
              id="hiring-companies"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <Building2 className="h-7 w-7 text-secondary" />
              Top Pune Companies Hiring Fresher IT Talent
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The Pune fresher pipeline maps to consistent target lists
              across the major stacks. Volume + named hiring relationships
              from our 17-year placement-cell network.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="font-semibold mb-2">Services majors</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Persistent Systems</li>
                  <li>Capgemini · Mindtree (LTIMindtree)</li>
                  <li>Tech Mahindra · Cognizant</li>
                  <li>Wipro · Infosys · TCS</li>
                  <li>Accenture · IBM India · Atos · DXC</li>
                  <li>Coforge · Mphasis · Saksoft</li>
                  <li>Amdocs · Cybage</li>
                </ul>
              </div>
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="font-semibold mb-2">
                  Product + AI-native cos
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>BrowserStack · Druva · Helpshift</li>
                  <li>Persistent product teams (Avaamo group)</li>
                  <li>GUVI · ZS Associates digital tech</li>
                  <li>Cybage Data Science · Avaamo</li>
                  <li>Tiger Analytics · Mu Sigma</li>
                  <li>Saviynt · IQVIA</li>
                  <li>Pune AI startups (founding-engineer roles)</li>
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
              8 Mistakes That Stall First-Offer Searches
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Patterns across stalled vs successful Pune fresher searches.
              Each correlates with 6+ week delays. If you&apos;re stuck,
              audit yourself against this list.
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
                  href="/career-paths/python-developer"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Python Developer Career Path
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Sibling pillar · Python stack roadmap
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
                    Sibling pillar · 4-stack pick framework
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/career-paths/data-science-ai"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Data Science / AI / ML Career Path
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Sibling pillar · data career roadmap
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/top-pune-it-companies-hiring-freshers-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Top 10 Pune IT Companies Hiring Freshers
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Guide · target-company list with salary bands
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/linkedin-optimisation-tips-pune-it-freshers-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    10 LinkedIn Optimisation Tips for Pune IT Freshers
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Guide · search-strategy + alumni-referral playbook
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/salary-negotiation-tips-pune-it-freshers-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    10 Salary Negotiation Tips for Pune IT Freshers
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Guide · anchoring + leverage + post-offer playbook
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/services-vs-product-company-first-it-job-pune"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Services vs Product Company First Job
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Comparison · target-tier decision framework
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/campus-vs-off-campus-placement-pune-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Campus vs Off-campus Placement in Pune
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Comparison · application strategy framework
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/internship-vs-direct-fresher-it-job-pune-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Internship vs Direct Fresher Job in Pune
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Comparison · pre-graduation vs post-graduation entry
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/leetcode-patterns-pune-fresher-it-interviews-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    10 LeetCode Patterns for Pune Freshers
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Guide · DSA prep ordered by interview frequency
                  </span>
                </Link>
              </li>
            </ul>
          </section>

          {/* FAQ */}
          <FaqSection
            heading="Frequently asked questions"
            intro="Common questions from prospective Pune fresher candidates we've placed over the last 17 years."
            items={faqs}
          />
        </div>
      </article>

      {/* CTA */}
      <section className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Compass className="h-10 w-10 text-secondary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to land your first IT job?
          </h2>
          <p className="text-muted-foreground mb-6">
            We&apos;ve placed 5,000+ freshers since 2009 — about 90% within
            6 months of course completion. Book a free demo and we&apos;ll
            map a personalised first-offer plan to your background.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="course_enquiry_clicked"
              properties={{
                location: "career_path_cta",
                career_path: "first-it-job-pune",
              }}
            >
              Book a Free Demo
            </TrackedLink>
            <Link
              href="/placements"
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
            >
              See placement record
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
