import type { Metadata } from "next";
import Link from "next/link";
import {
  Brain,
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
import { NewsletterSignupForm } from "@/components/newsletter/newsletter-signup-form";
import { LastUpdated } from "@/components/seo/last-updated";
import { buildPageMetadata } from "@/lib/seo";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";

/**
 * P5-20 — Cluster 3 hub: Data Science / AI / ML Career (Pune, 2026).
 *
 * Third pillar in the career-paths series. Covers the analytics → DS →
 * ML → GenAI escalator: each step layers more depth, more pay, more
 * specialisation barrier.
 *
 * Sibling pillars: /career-paths/python-developer, /full-stack-developer.
 * Anchored to existing course surfaces (Data Science, ML, Data Analytics,
 * Data Engineering, Agentic AI, Prompt Eng, ChatGPT & LLMs, AI Tools).
 *
 * Target length ~4,500 words. Server-rendered.
 */

export const metadata: Metadata = buildPageMetadata({
  title: "Data Science, AI & ML Career Roadmap — Pune 2026 Complete Guide",
  description:
    "The full data career path for Pune in 2026: from data analyst to data scientist to ML engineer to GenAI specialist. 14-month plan, four specialisation tracks, salary trajectory, hiring companies (ZS, Persistent ML, Tiger Analytics, Helpshift AI), and mistakes to avoid.",
  path: "/career-paths/data-science-ai",
  lastModified: EVERGREEN_LAST_REVIEWED,
});

const faqs = [
  {
    question: "Do I need a Master's degree to work in data science in Pune?",
    answer:
      "For Data Analyst and entry-level Data Scientist roles, no — a Bachelor's + a strong portfolio + the right certifications is the standard fresher path at services majors (TCS Analytics, Cognizant Analytics, Capgemini AI) and many product companies (ZS Associates, Tiger Analytics, Cybage Analytics). For pure ML Research / AI Scientist roles at the highest-paying product companies and AI startups, a Master's or PhD in CS / stats / math is the typical filter. The honest framing: you can enter the data career at Bachelor's, but the top 5% of senior roles require advanced degrees.",
  },
  {
    question: "What's the difference between Data Analyst, Data Scientist, and ML Engineer?",
    answer:
      "Data Analyst (~₹3-6 LPA fresher) — SQL + Excel + Tableau/Power BI, reporting + ad-hoc analysis on business data. Data Scientist (~₹5-9 LPA fresher) — Python + Pandas + scikit-learn + statistics, builds predictive models from data. ML Engineer (~₹7-12 LPA fresher) — Python + TensorFlow/PyTorch + MLOps, productionises ML models. Each is a real career destination; you don't have to chain through all three. Many graduates start as analysts, move to data scientist in 2 years, then either stay there or pivot to ML engineering by year 4.",
  },
  {
    question: "How long does it take to become a data scientist in Pune from scratch?",
    answer:
      "Realistic timeline for a focused career changer with no prior coding: 14–18 months. Self-taught learners often take 24–30 months because the curriculum sequencing (math → Python → ML basics → portfolio → interview prep) is hard to self-design. Structured programmes compress this to 10–12 months including placement support. Those with Python or SQL background entering can compress by 4–6 months; those with engineering math comfort save another 2–3 months.",
  },
  {
    question: "Should I learn statistics first or Python first?",
    answer:
      "Python first, then statistics in parallel from month 3. Reason: you'll learn statistics 3x faster when you can implement what you read in code immediately. Trying to learn statistics theoretically before you can write Python ends in textbook fatigue with no transfer to actual ML projects. By month 4 you should be coding scikit-learn examples while reading the underlying stats — that's the productive ordering.",
  },
  {
    question: "Which Python libraries should I learn for a data career?",
    answer:
      "Foundation (must): NumPy, Pandas, Matplotlib, Seaborn. Classical ML (must): scikit-learn. Deep Learning (track-specific): TensorFlow OR PyTorch (pick one, learn the other later). Data engineering / pipelines (optional but rising): Polars, DuckDB. GenAI specialisation: LangChain, LangGraph, OpenAI/Anthropic SDKs. The 'must' tier is ~6 months of skill investment; the rest layers on top track-by-track.",
  },
  {
    question: "What kind of portfolio gets data scientists hired in Pune?",
    answer:
      "Four projects that consistently close interviews: (1) a substantial end-to-end ML project with a real-world dataset (not Iris/Titanic), clear problem statement, EDA, modelling, evaluation, and a written-up methodology; (2) a deployed ML model serving predictions through an API or dashboard; (3) a clear data-storytelling notebook with strong visualisations and business framing; (4) one specialisation project (deep learning + computer vision, NLP + transformers, or RAG-based LLM app). Two of these at depth + clean GitHub beats five shallow Kaggle clones.",
  },
  {
    question: "Will AI / LLMs replace data scientists?",
    answer:
      "Tools like ChatGPT and Code Interpreter are changing what data scientists do — much faster EDA, faster boilerplate code generation, faster model prototyping. They are not replacing the role; they're raising the bar. Data scientists in 2026 spend less time on Python syntax and more time on problem definition, dataset quality, model evaluation, and business framing. The role is becoming more analytical and less mechanical. Generative AI / Agentic AI specialisations are the highest-paid segment of data careers in 2026.",
  },
  {
    question: "Pune product companies vs services-major data roles — what's the trade-off?",
    answer:
      "Pune product companies in the data space (Persistent product teams, BrowserStack analytics, Druva, ZS Associates digital tech, Helpshift, GUVI, Avaamo, growing AI startups) pay 30-60% more for the same headline experience but expect deeper DSA + system design + statistics rigour at interview. Services-major data roles (TCS Analytics, Cognizant Analytics, Capgemini Insights & Data, Wipro AI360) pay less but have larger fresher intake batches and more structured early-career mentorship. Most data careers eventually pivot product-ward by year 3-4.",
  },
  {
    question: "Should I specialise in computer vision, NLP, or recommender systems?",
    answer:
      "Pune market split: NLP (with LLM/GenAI overlap) ~50%, recommender systems ~25%, computer vision ~20%, time-series ~5%. NLP + LLMs is where the budget is moving fast in 2026 — and where Pune product companies + AI startups concentrate hiring. Computer vision pays well at established product companies but has slower hiring growth. Recommender systems is a smaller specialised market. Pick based on what interests you, but be honest about the hiring volume difference.",
  },
];

const milestones = [
  {
    timeframe: "Month 1–3",
    title: "Python + Data Tools Foundations",
    detail:
      "Python fluency through Pandas-comfort: variables, control flow, functions, classes, comprehensions. Pandas for data manipulation, NumPy for arrays, Matplotlib + Seaborn for visualisation. Jupyter notebook discipline. SQL fundamentals — joins, aggregations, window functions. End-of-phase milestone: a clean Jupyter notebook analysing a real dataset (e.g. NYC Taxi or any Kaggle CSV) with EDA + 5 well-written insights.",
  },
  {
    timeframe: "Month 4–6",
    title: "Statistics + Classical ML",
    detail:
      "Statistics in parallel with code: distributions, hypothesis testing, p-values, confidence intervals, correlation vs causation. Classical ML via scikit-learn: linear/logistic regression, decision trees, random forests, gradient boosting, k-means, train/test discipline, cross-validation, evaluation metrics. End-of-phase milestone: a supervised-learning project with clear methodology + 80%+ accuracy on a non-trivial dataset.",
  },
  {
    timeframe: "Month 7–9",
    title: "Specialisation Pick + Depth",
    detail:
      "Choose one of: Data Analytics (BI + Tableau / Power BI focus), Data Science (Python + scikit-learn + stats + business framing), ML Engineering (TensorFlow / PyTorch + MLOps), Generative AI / Agentic AI (LangChain + LangGraph + vector stores). Go deep in your chosen track. End-of-phase milestone: 2 portfolio projects in your specialisation.",
  },
  {
    timeframe: "Month 10–12",
    title: "Production Portfolio + Storytelling",
    detail:
      "Build one substantial production-grade project (~80–100 hrs) — deployed model behind an API, an analytics dashboard with real business framing, or a deployed LLM app. Write a technical blog post about the build. Polish GitHub. This is the project that closes interviews. Parallel: SQL deep-dive (window functions, query optimisation) — most data interviews include SQL rounds.",
  },
  {
    timeframe: "Month 13–14+",
    title: "Interview Prep + Job Search",
    detail:
      "Statistics review (the most-tested area in data science interviews after SQL), 80+ LeetCode SQL + medium Python problems, mock case-study interviews (the biggest interview format at Pune data product companies), CV polish. Apply to 50+ companies including a mix of services (TCS Analytics, Cognizant Analytics) and product (ZS, Mu Sigma, Tiger Analytics, BrowserStack data). End-of-phase milestone: first offer.",
  },
];

const tracks = [
  {
    name: "Data Analyst",
    summary:
      "Lowest barrier to entry, most accessible Pune data career. Heavy on SQL + Tableau / Power BI + business storytelling. Natural pivot point into Data Scientist after 1-2 years.",
    coreSkills: [
      "SQL fluency — joins, aggregations, window functions, query optimisation",
      "Excel advanced (pivots, lookups, basic VBA)",
      "Tableau OR Power BI — dashboard design + storytelling",
      "Python + Pandas for analysis (basic level)",
      "Basic statistics + clear written/verbal communication",
    ],
    huntFor: "Cognizant Analytics, TCS Analytics, Capgemini Insights, Wipro analytics, Cybage, Saksoft, growing Pune startups with data needs",
    salaryBand: "₹3–6 LPA fresher → ₹6–10 LPA at 3–5 yrs",
    coursePath: "/courses/data-ai/data-analytics-training-in-pune",
    courseName: "Data Analytics Training in Pune",
  },
  {
    name: "Data Scientist",
    summary:
      "Pune's most-asked-for data role at services majors + product companies alike. Python + classical ML + statistics + business framing. The default data career destination.",
    coreSkills: [
      "Python + Pandas + NumPy + Matplotlib/Seaborn",
      "scikit-learn — classification, regression, clustering, evaluation",
      "Statistics: distributions, hypothesis testing, regression",
      "SQL fluency (still 50% of the role in services-sector contexts)",
      "Jupyter discipline + clear analysis storytelling",
    ],
    huntFor: "ZS Associates, Mu Sigma, Tiger Analytics, Cognizant Analytics, TCS Analytics, Cybage Data Science, IQVIA, Persistent analytics",
    salaryBand: "₹5–9 LPA fresher → ₹10–18 LPA at 3–5 yrs",
    coursePath: "/courses/data-ai/data-science-training-in-pune",
    courseName: "Data Science Training in Pune",
  },
  {
    name: "Machine Learning Engineer",
    summary:
      "Higher math/stats bar than Data Scientist but pays materially more. Deep model architectures + MLOps + production deployment. The product-company specialist track.",
    coreSkills: [
      "TensorFlow OR PyTorch (pick one, learn other later)",
      "Deep learning fundamentals — CNN / RNN / transformer basics",
      "Model deployment: TF Serving, ONNX, FastAPI",
      "MLOps basics — experiment tracking, model versioning, monitoring",
      "Specialisation: computer vision, NLP, or recommender systems",
    ],
    huntFor: "Persistent ML, BrowserStack ML, Druva ML, GUVI ML, Helpshift AI, ZS AI practice, AI startups",
    salaryBand: "₹7–12 LPA fresher → ₹15–25 LPA at 3–5 yrs",
    coursePath: "/courses/data-ai/machine-learning-training-in-pune",
    courseName: "Machine Learning Training in Pune",
  },
  {
    name: "Generative AI / Agentic AI Engineer",
    summary:
      "2026's highest-paying data specialisation due to supply gap. LLM orchestration + multi-agent systems + RAG + observability. Modern + fast-evolving.",
    coreSkills: [
      "LangChain + LangGraph — primary agent frameworks",
      "OpenAI Assistants + Claude tool use + MCP",
      "Vector stores: Pinecone, Weaviate, pgvector",
      "RAG pipelines: chunking, embedding, retrieval tuning",
      "Observability (LangSmith) + evals + cost controls",
    ],
    huntFor: "Persistent Avaamo group, Helpshift, GUVI, BrowserStack AI, ZS AI practice, Druva AI, Pune AI startups (founding-engineer roles)",
    salaryBand: "₹8–15 LPA fresher → ₹20–30 LPA at 3–5 yrs",
    coursePath: "/courses/generative-ai/agentic-ai-training-in-pune",
    courseName: "Agentic AI Training in Pune",
  },
];

const mistakes = [
  {
    title: "Starting with deep learning before classical ML",
    detail:
      "Skipping linear/logistic regression + decision trees to jump straight into neural networks is the most common data-learner trap. Classical ML is 80% of what most data roles actually do; neural networks are layered on top once you understand the fundamentals. The order matters.",
  },
  {
    title: "Underrating SQL",
    detail:
      "Even ML-engineering interviews at Pune product companies start with SQL rounds. SQL fluency — joins, window functions, query plans — is screened harder than Python syntax. Spend 3–4 weeks specifically on SQL depth using a real database, not just SELECT FROM toy examples.",
  },
  {
    title: "Kaggle-only portfolio",
    detail:
      "Recruiters know what a Kaggle clone looks like. The dataset is already cleaned, the problem is already defined, and the methodology is already known. One project on a messy real-world dataset (web scraping + your own EDA + your own framing) beats five Kaggle competition entries.",
  },
  {
    title: "No business framing",
    detail:
      "Data scientists who can't explain why a model matters to a business stakeholder don't pass case-study interviews. Practice translating model outputs into business decisions. The story 'I improved AUC from 0.82 to 0.87' loses to 'I reduced bad-loan acceptance by 12% with no impact on approved loans.'",
  },
  {
    title: "Skipping statistics fundamentals",
    detail:
      "Hypothesis testing, p-values, confidence intervals — interviewers screen these. Even if you don't use them daily, you need fluency to discuss model evaluation, A/B test design, and result interpretation. 20 hours of stats catch-up before interviews materially improves offers.",
  },
  {
    title: "Tutorial-only learning",
    detail:
      "Andrew Ng's course, fast.ai, Hugging Face tutorials are all excellent — but stopping there leaves you fluent in tutorials, not real work. Every tutorial block should be followed by you applying the technique to a dataset you chose. Output ratio matters more than input volume.",
  },
  {
    title: "Ignoring DSA for data interviews",
    detail:
      "Pune product company data interviews include coding rounds — typically easier than software engineering rounds but still real DSA. 50–80 LeetCode easy/medium problems before interviews dramatically improves product-company offer rates.",
  },
  {
    title: "Not deploying anything",
    detail:
      "A Jupyter notebook is fine for analysis projects but doesn't demonstrate ML engineering competence. Even one deployed model behind a simple API (Render free tier, FastAPI + scikit-learn pickle) materially differentiates you in interviews. Easier than it sounds.",
  },
];

export default function DataScienceAICareerPath() {
  return (
    <>
      <PageEvent
        event="career_path_viewed"
        properties={{ slug: "data-science-ai" }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Career Paths", url: "/career-paths" },
          { name: "Data Science / AI / ML", url: "/career-paths/data-science-ai" },
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
                { name: "Data Science / AI / ML" },
              ]}
            />
            <p className="uppercase text-xs tracking-wider opacity-80 mb-3 mt-2">
              Career Path · Pune · 2026
            </p>
            <h1
              id="pillar-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
            >
              Data Science, AI &amp; ML Career Roadmap — Pune 2026 Complete Guide
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">
              The realistic path from analyst to ML engineer to GenAI
              specialist — including which track to pick, the 14-month plan,
              salary trajectory, and mistakes that derail data careers.
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
            Building a Data Science / AI / ML career in Pune in 2026 takes 12–18 months: 3 months Python + data tools, 3 months statistics + classical ML, 3 months specialisation pick (Analytics, Data Science, ML Engineering, or GenAI), 3 months portfolio + production-grade project, 2 months interview prep. Pune fresher bands: Analyst ₹3-6 LPA, Data Scientist ₹5-9 LPA, ML Engineer ₹7-12 LPA, Agentic AI ₹8-15 LPA. GenAI / Agentic AI is the highest-paid specialisation currently due to supply gap. Sources: Naukri + LinkedIn + AmbitionBox Pune data + AI listings, last 90 days.
          </DefinitiveAnswer>

          {/* Why Data Science / AI */}
          <section aria-labelledby="why-data">
            <h2
              id="why-data"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <Brain className="h-7 w-7 text-secondary" />
              Why Data Science / AI in Pune in 2026
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Pune is the second-largest data science delivery centre in
                India after Bangalore. ZS Associates, Mu Sigma, Tiger
                Analytics, Cognizant Analytics, TCS Analytics, IQVIA, and
                Cybage Data Science all run substantial Pune operations.
                Pune data + AI listings ran 1,200–1,800 per month across
                Naukri + LinkedIn through 2025 — covering Data Analyst,
                Data Scientist, ML Engineer, Data Engineer, and the
                rapidly-growing GenAI / Agentic AI specialisation.
              </p>
              <p>
                The economics are uniquely favourable. Data careers span
                four distinct compensation bands tied to specialisation:
                ₹3-6 LPA fresher for Analyst, ₹5-9 LPA for Data Scientist,
                ₹7-12 LPA for ML Engineer, ₹8-15 LPA for GenAI engineer.
                Every track is hireable in Pune; the bar rises with
                specialisation. The career arc is steep — senior data
                scientists at Pune product companies clear ₹25-35 LPA;
                Staff / Principal levels at AI-native cos exceed ₹50 LPA +
                equity.
              </p>
              <p>
                What changed in 2024-2026: the GenAI boom shifted hiring
                budgets toward agentic AI engineers — the supply gap is
                real, the premium is structural, and Pune product
                companies (Persistent&apos;s Avaamo group, Helpshift,
                GUVI, BrowserStack AI, ZS AI practice) are hiring
                aggressively. Engineers planning a 2026-2030 career arc
                increasingly treat the Data Science → GenAI escalator as
                the highest-leverage path in Indian tech.
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
              The 14-Month Plan
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Realistic for a focused career changer or fresh graduate. Data
              careers take 2 months longer than full-stack careers because
              of the statistics + ML methodology depth required. Those with
              Python or SQL background entering can compress by 4–6 months.
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

          {/* Four Tracks */}
          <section aria-labelledby="four-tracks">
            <h2
              id="four-tracks"
              className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4"
            >
              <GitBranch className="h-7 w-7 text-secondary" />
              Four Data Career Tracks — Pick One in Month 7
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The data field branches into four hireable specialisations.
              Each shares the foundation (Months 1–6) and then diverges.
              Salary bands rise as you move down this list, but so do the
              math + statistics barriers.
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
              Pune Data Career Salary Trajectory
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Bands below are Pune-specific, sourced from AmbitionBox +
              Indeed + LinkedIn + Naukri data / AI listings (last 12
              months). The table covers Data Scientist (the median data
              role); Analyst skews lower, ML Engineer + GenAI skew higher.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border rounded-lg overflow-hidden">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Experience</th>
                    <th className="text-left p-3 font-semibold">
                      Pune Services Analytics
                    </th>
                    <th className="text-left p-3 font-semibold">
                      Pune Product / AI Cos
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-3">Fresher (0–1 yr)</td>
                    <td className="p-3 text-muted-foreground">₹4–6 LPA</td>
                    <td className="p-3 text-muted-foreground">₹6–10 LPA</td>
                  </tr>
                  <tr>
                    <td className="p-3">Junior (1–3 yrs)</td>
                    <td className="p-3 text-muted-foreground">₹6–10 LPA</td>
                    <td className="p-3 text-muted-foreground">₹10–18 LPA</td>
                  </tr>
                  <tr>
                    <td className="p-3">Mid (3–6 yrs)</td>
                    <td className="p-3 text-muted-foreground">₹10–15 LPA</td>
                    <td className="p-3 text-muted-foreground">₹16–26 LPA</td>
                  </tr>
                  <tr>
                    <td className="p-3">Senior (6+ yrs)</td>
                    <td className="p-3 text-muted-foreground">₹14–22 LPA</td>
                    <td className="p-3 text-muted-foreground">₹25–40 LPA</td>
                  </tr>
                  <tr>
                    <td className="p-3">Staff / Principal</td>
                    <td className="p-3 text-muted-foreground">₹20–32 LPA</td>
                    <td className="p-3 text-muted-foreground">₹35–55+ LPA</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Interactive band exploration with track-specific bumps:{" "}
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
              Top Pune Companies Hiring Data / AI Talent
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Sampled from Naukri + LinkedIn + AmbitionBox Pune data + AI
              listings over the last 90 days. Pune has 100+ companies
              actively hiring across the four tracks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="font-semibold mb-2">
                  Analytics / Services majors
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Cognizant Analytics</li>
                  <li>TCS Analytics</li>
                  <li>Capgemini Insights &amp; Data</li>
                  <li>Wipro AI360</li>
                  <li>Accenture AI</li>
                  <li>Mindtree (LTIMindtree) Analytics</li>
                  <li>Tech Mahindra AI · Atos AI</li>
                </ul>
              </div>
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="font-semibold mb-2">
                  Product + AI-native cos
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>ZS Associates (AI practice)</li>
                  <li>Tiger Analytics · Mu Sigma</li>
                  <li>Persistent ML · Persistent Avaamo</li>
                  <li>BrowserStack AI · Helpshift</li>
                  <li>GUVI · Druva ML · IQVIA</li>
                  <li>Cybage Data Science</li>
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
              8 Mistakes That Stall Data Careers in Pune
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Patterns we see across data learners — the mistakes below
              correlate strongly with 6+ month placement delays.
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
                  href="/compare/data-analyst-vs-data-scientist-career-pune"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Data Analyst vs Data Scientist Career
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Comparison · first-data-role pick framework
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/data-ai/data-science-training-in-pune"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Data Science Training in Pune
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Course · Python + ML + stats
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/generative-ai/agentic-ai-training-in-pune"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Agentic AI Training in Pune
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Course · LangChain + LangGraph specialisation
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
                  href="/guides/best-data-science-projects-pune-freshers-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    10 Best Data Science Projects for Pune Freshers
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Guide · portfolio projects from analytics → GenAI
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/tensorflow-vs-pytorch-for-pune-ml-engineers-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    TensorFlow vs PyTorch for Pune ML Engineers
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Comparison · ML framework pick + LLM ecosystem
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/sql-interview-questions-pune-data-freshers-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    10 SQL Interview Questions for Pune Data Freshers
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Guide · ranked by Pune interview frequency
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/top-statistics-concepts-pune-data-scientists-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Top 10 Statistics Concepts for Pune Data Scientists
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Guide · ranked by interview frequency + day-to-day use
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/power-bi-vs-tableau-for-pune-data-analysts-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Power BI vs Tableau for Pune Data Analysts
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Comparison · BI tool pick + Pune company patterns
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/supervised-vs-unsupervised-learning-pune-data-scientists-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Supervised vs Unsupervised Learning
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Comparison · ML problem-framing for Pune data scientists
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/feature-engineering-techniques-pune-data-scientists-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    10 Feature Engineering Techniques for Pune Data Scientists
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Guide · encoding + scaling + binning + interactions + imputation
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/random-forest-vs-xgboost-for-pune-data-scientists-2026"
                  className="block rounded border p-3 bg-card hover:border-secondary transition-colors"
                >
                  <span className="font-medium block text-sm">
                    Random Forest vs XGBoost for Pune Data Scientists
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Comparison · tabular ML algorithm pick + hyperparameter complexity
                  </span>
                </Link>
              </li>
            </ul>
          </section>

          {/* FAQ */}
          <FaqSection
            heading="Frequently asked questions"
            intro="Common questions from prospective data professionals we've trained over the last 17 years."
            items={faqs}
          />

          {/* P5-17 — newsletter banner. */}
          <NewsletterSignupForm
            placement="career-path-data-science-ai"
            variant="banner"
            headline="Pune Data / AI careers — monthly briefing"
            subhead="Hiring updates, salary movements, and an employer spotlight every month. Free."
          />
        </div>
      </article>

      {/* CTA */}
      <section className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Compass className="h-10 w-10 text-secondary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to start your data / AI career?
          </h2>
          <p className="text-muted-foreground mb-6">
            We&apos;ve trained 10,000+ engineers since 2009 — including
            growing cohorts in data science, ML, and the new generative AI
            tracks. Book a free demo and we&apos;ll map a personalised
            version of this roadmap to your background.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="course_enquiry_clicked"
              properties={{
                location: "career_path_cta",
                career_path: "data-science-ai",
              }}
            >
              Book a Free Demo
            </TrackedLink>
            <Link
              href="/courses/data-ai"
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
            >
              See data &amp; AI courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
