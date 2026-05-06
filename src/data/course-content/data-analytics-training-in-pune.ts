import type { CourseRichContent } from "./types";

export const dataAnalyticsTrainingInPune: CourseRichContent = {
  intro:
    "Data Analytics is the highest-volume entry path into Pune's data economy — Indeed Pune lists more than 1,200 active Data Analyst / Business Analyst / BI Analyst openings as of May 2026, with Tiger Analytics, Fractal Analytics, ZS Associates, MathCo, Bajaj Finserv, Cognizant Pune Capital Markets, plus most BFSI / retail / pharma teams hiring continuously. Archer Infotech's Data Analytics training in Pune teaches the discipline as it is actually practiced in 2026 — Excel at the level real analysts use (Power Query, dynamic arrays, advanced PivotTables), SQL at the window-functions / CTE level, Python with pandas 2 for analysis, Power BI and Tableau for dashboarding, plus the LLM-augmented analytics workflows that have become the 2026 differentiator. The course is the right beginner-friendly entry into Pune analytics careers and an alternative to our Data Science course for candidates who want the wider entry door without ML / deep-learning depth. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Data Analytics in 2026",
    paragraphs: [
      "Data Analyst is the most-hired entry-level data role in Pune in 2026 — Indeed Pune lists 1,200+ active openings across Data Analyst, Business Analyst, BI Analyst, Reporting Analyst, and Marketing Analyst titles. The biggest employers are Tiger Analytics, Fractal Analytics, ZS Associates, MathCo, Bajaj Finserv, Cognizant Pune Capital Markets, Mercedes-Benz R&D India, Cummins, John Deere ETC, plus most Pune retail / pharma / e-commerce teams. Salary is more accessible than Data Scientist (₹3.5–6 lakh fresher entry vs ₹4.5–7.5 for DS), but the path to senior is steady — Senior Data Analysts at 5+ years earn ₹10–15 lakh in Pune.",
      "What changed in 2026: pandas 2 with the Arrow backend has matured (10–100× faster than legacy pandas on common operations), Excel has gained dynamic arrays and Power Query as standard features (no longer 'advanced'), Power BI Fabric has consolidated Microsoft's analytics stack, Tableau remains the de-facto BFSI choice in Pune. Most importantly, LLM-augmented analytics — using Claude or GPT to draft SQL, summarise findings, generate first-draft dashboards — is no longer optional; it is the 2026 differentiator on Pune analyst resumes.",
      "What this means for hiring: 2026 Pune Data Analyst JDs expect SQL fluency at the window-functions / CTEs level, Excel at the Power Query level, one BI tool (Power BI or Tableau), basic Python with pandas, plus business-communication discipline (the 5-page memo, the 15-minute analyst pitch). Archer Infotech's curriculum is rebuilt around exactly these expectations — modern stack, deployable artefacts, AI-augmented workflow.",
    ],
    keyPoints: [
      "1,200+ active Data Analyst / BA / BI Analyst openings on Indeed Pune (May 2026)",
      "Pune analytics scene — Tiger / Fractal / ZS / MathCo plus BFSI",
      "Excel + SQL + Python + Power BI / Tableau — the 2026 stack",
      "LLM-augmented analytics — the 2026 differentiator on resumes",
      "Wider entry door than Data Scientist; stronger fresher absorption",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, BSc, BCom, or BBA student looking for your first Data Analyst / BA role in Pune",
      "Working professional in non-data role (testing, support, ops, sales) wanting a structured switch into analytics",
      "Domain expert (finance, marketing, ops, retail, pharma) who wants quantitative depth on top of business knowledge",
      "Career restarter targeting analytics as a flexible, high-demand re-entry path",
      "Working developer wanting to add data and BI skills to a backend / full-stack profile",
      "Student deciding between Data Analytics and Data Science — start here if you have non-CS background",
    ],
    notForYou: [
      "If you expect a guaranteed ₹10L+ Data Analyst offer with no portfolio — Pune fresher Data Analyst entry is ₹3.5–6 lakh",
      "If you cannot put in 6–8 hours per week of practice outside class — analytics is a portfolio discipline",
      "If your goal is ML Engineer / deep-learning research — pick our Machine Learning course",
      "If you want certificate-only learning with no projects — Pune analytics hiring screens hard on dashboards and SQL portfolios",
      "If you have done a Master's in Statistics with applied analytics projects — talk to us about the Data Science course instead",
    ],
  },

  curriculum: [
    {
      title: "Excel for Analytics — the Real-Analyst Subset",
      weekRange: "Weeks 1–2",
      description:
        "Excel as Pune analysts actually use it. Cover the foundational subset (cell referencing, named ranges, formulas, IF / VLOOKUP / INDEX-MATCH / XLOOKUP), then the productivity layer (PivotTables, slicers, conditional formatting, data validation), then the modern Excel features (dynamic arrays, FILTER / SORT / UNIQUE / SEQUENCE, LET / LAMBDA basics), Power Query for ETL inside Excel (the topic that separates senior analysts from junior — Power Query is the Excel feature that lets you handle 5–10M rows). By the end of week 2 every student has built a complete analytics workbook on a real dataset.",
      topics: [
        "Cell referencing, named ranges, formulas",
        "VLOOKUP / INDEX-MATCH / XLOOKUP",
        "PivotTables and slicers",
        "Dynamic arrays — FILTER / SORT / UNIQUE / SEQUENCE",
        "LET / LAMBDA for reusable formulas",
        "Power Query for ETL inside Excel",
        "Conditional formatting and data validation",
        "What-if analysis and Goal Seek",
      ],
    },
    {
      title: "SQL for Analytics — Window Functions, CTEs, EXPLAIN Plans",
      weekRange: "Weeks 3–4",
      description:
        "SQL is half of every Pune Data Analyst job. Cover the parts that actually matter — joins (inner, left, anti, semi), aggregations, CTEs and recursive CTEs, window functions (ROW_NUMBER, RANK, LAG, LEAD, running totals, moving averages), self-joins, plus the EXPLAIN-plan basics that separate a 5-second query from a 5-minute one. Hands-on with PostgreSQL 16 against a public retail dataset; query plans reviewed in class. Plus dialect notes for BigQuery and Snowflake (the cloud-warehouse alternatives Pune analytics teams use).",
      topics: [
        "JOIN, GROUP BY, HAVING — done properly",
        "CTEs and recursive CTEs",
        "Window functions — partition, frame, ordering",
        "Subqueries — correlated, anti-joins, EXISTS",
        "Index basics and EXPLAIN plans",
        "PostgreSQL 16 hands-on",
        "BigQuery and Snowflake dialect notes",
      ],
    },
    {
      title: "Python for Analytics — pandas 2 Essentials",
      weekRange: "Weeks 5–6",
      description:
        "Python at the level a Data Analyst actually uses it — not Software Engineer depth. Cover the modern subset (variables, control flow, comprehensions, type hints lightly), then pandas 2 with Arrow backend (10–100× faster than legacy pandas on common operations) — DataFrames, indexing, joining, groupby, reshape, plus the data-cleaning patterns (missing values, outliers, type coercion). Visualisation with matplotlib and seaborn at the level you need for analyst reports. We finish with a 5-page exploratory analysis report on a public Indian dataset (RBI / NSE / India Open Data).",
      topics: [
        "Python 3.13 essentials",
        "pandas 2 with Arrow backend",
        "DataFrames — load, query, transform",
        "Joining and reshaping",
        "groupby and aggregation",
        "Data cleaning — missing values, outliers",
        "matplotlib and seaborn for analyst reports",
        "Jupyter notebook discipline",
      ],
    },
    {
      title: "Power BI & Tableau — Dashboarding for Pune Hiring",
      weekRange: "Weeks 7–8",
      description:
        "The two BI tools that dominate Pune hiring. Power BI as the Microsoft-stack default (used by most Pune captives, BFSI, and Microsoft-ecosystem teams) — data model, DAX (CALCULATE, FILTER, ALL — the trio every Pune Power BI interview tests for), relationships, dashboards, drill-through, plus Power BI Service for sharing. Tableau as the BFSI / general-analytics default — Tableau Desktop, calculated fields, Level-of-Detail expressions, dashboards, plus Tableau Public for portfolio. We deliberately teach both at depth because Pune hiring is split between them.",
      topics: [
        "Power BI — data model, DAX, dashboards",
        "DAX trio — CALCULATE, FILTER, ALL",
        "Power BI relationships and drill-through",
        "Power BI Service for sharing",
        "Tableau Desktop — workbooks, calculated fields",
        "LOD (Level of Detail) expressions",
        "Tableau Public for portfolio",
      ],
    },
    {
      title: "Statistics, A/B Testing & Business Storytelling",
      weekRange: "Week 9",
      description:
        "The statistics analysts actually use. Descriptive statistics (mean, median, variance, percentiles), basic probability, hypothesis testing (t-test, chi-square at the level you need to interpret an A/B test), confidence intervals, plus A/B testing fundamentals (peeking, MDE, statistical power). Then the higher-leverage skill — business storytelling — KPI selection, the discipline of the 5-page analyst memo, the 15-minute analyst pitch (the soft skill that decides who gets promoted in the first 18 months).",
      topics: [
        "Descriptive statistics",
        "Basic probability",
        "Hypothesis testing — t-test, chi-square",
        "Confidence intervals",
        "A/B testing fundamentals",
        "KPI selection",
        "5-page analyst memo discipline",
        "15-minute analyst pitch",
      ],
    },
    {
      title: "LLM-Augmented Analytics & Capstone",
      weekRange: "Week 10 + 1 week capstone",
      description:
        "The 2026 differentiator. Use Claude or OpenAI APIs to draft SQL, summarise long datasets, generate first-draft dashboards. Build a small text-to-SQL workflow against a real database. Cover the discipline of when LLMs help analytics and when they hurt (numbers reasoning is still weak; LLMs are great at SQL drafting and prose summarisation). Capstone project (see Capstone Projects). Mock interviews calibrated for Pune Data Analyst panels — Tiger / Fractal / ZS / MathCo / Bajaj Finserv. Includes a SQL mock round (these companies test SQL hard), a case-study round, and a behavioural round.",
      topics: [
        "OpenAI / Anthropic SDKs for analytics",
        "Text-to-SQL workflow",
        "Schema-aware prompts",
        "When LLMs help and when they hurt",
        "Capstone implementation, deployment, README",
        "SQL mock interview round",
        "Case-study mock — analytics business question",
        "Behavioural and product-thinking round",
        "Resume + LinkedIn rewrite",
        "GitHub portfolio polish",
      ],
    },
  ],

  projects: [
    {
      title: "Business Analytics Dashboard with SQL + Power BI",
      description:
        "A retail or BFSI analytics project — load a 5–10M row public dataset into PostgreSQL, write a layered analytics SQL view (window functions, CTEs, materialised views), build a Power BI dashboard on top with drill-down and slicers, and write a 5-page business memo. Outcome: a public GitHub repository plus a Power BI / Tableau Public link — exactly what Pune Data Analyst hiring panels interview on.",
      technologies: [
        "PostgreSQL 16",
        "SQL — window functions, CTEs, materialised views",
        "Power BI — DAX, dashboards",
        "Tableau Public alternative",
        "Public retail / BFSI dataset",
      ],
    },
    {
      title: "End-to-End Analyst Report on Public Indian Dataset",
      description:
        "A 10-page exploratory data analysis report on a public Indian dataset (RBI economic data, NSE stock data, India Open Data Portal, or Kaggle). Includes data cleaning with pandas 2, exploratory analysis with descriptive statistics, visualisation with matplotlib / seaborn, and business storytelling. Outcome: a Jupyter notebook on GitHub plus the PDF report.",
      technologies: [
        "Python 3.13 + pandas 2",
        "matplotlib + seaborn",
        "Jupyter notebook",
        "Public Indian dataset",
      ],
    },
    {
      title: "LLM-Augmented Text-to-SQL Mini-Workflow",
      description:
        "A small text-to-SQL workflow — let a non-technical user ask a business question in English, generate the SQL via Claude or OpenAI, validate the SQL (block writes, sanity-check joins), execute against PostgreSQL, return a chart. Demonstrates the AI-augmented analyst pattern that signals 2026 fluency.",
      technologies: [
        "Python 3.13",
        "OpenAI / Anthropic SDK",
        "PostgreSQL",
        "Streamlit for the simple UI",
        "matplotlib for chart generation",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Patil (Senior Corporate Trainer, 10+ years, lead for the Data Analytics / Data Science / Data Engineering tracks at Archer Infotech). Amol personally leads every session of every batch.",

  careerOutcomes: {
    paragraphs: [
      "Data Analyst is among the highest-volume entry roles in Pune in 2026 — Indeed Pune lists 1,200+ active openings, with continuous hiring at Tiger Analytics, Fractal Analytics, ZS Associates, MathCo, Bajaj Finserv, Cognizant Pune Capital Markets, Mercedes-Benz R&D India, Cummins, John Deere ETC, plus most Pune retail / pharma / e-commerce teams.",
      "What pulls a Data Analyst above the median band: depth on at least one BI tool (Power BI or Tableau), demonstrable SQL fluency at window-functions level, one published Tableau Public or Power BI Service dashboard, plus business-communication discipline (the 5-page memo). Our capstone projects are designed exactly around these signals.",
      "Senior Data Analyst bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures.",
    ],
    salaryBands: [
      {
        role: "Data Analyst (Pune)",
        band: "₹5,76,030 per year average",
        source: {
          label: "Indeed Pune (Data Analyst)",
          url: "https://in.indeed.com/career/data-analyst/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Junior Data Analyst (Pune entry, <2 years)",
        band: "₹3,50,000 – ₹6,00,000 per year",
        source: {
          label: "AmbitionBox Pune Data Analyst",
          url: "https://www.ambitionbox.com/profile/data-analyst-salary-in-pune",
        },
      },
      {
        role: "Senior Data Analyst (Pune, 5+ years)",
        band: "₹10,00,000 – ₹15,00,000 per year",
        source: {
          label: "Glassdoor Pune Senior Data Analyst",
          url: "https://www.glassdoor.co.in/Salaries/pune-senior-data-analyst-salary-SRCH_IL.0,4_IM1072_KO5,24.htm",
        },
      },
      {
        role: "Lead Analyst / Analytics Manager (national, 8+ years)",
        band: "₹16,00,000 – ₹28,00,000 per year",
        source: {
          label: "6figr India Lead Analyst (Pune ±10%)",
          url: "https://6figr.com/in/salary/lead-data-analyst--t",
        },
      },
    ],
    hiringCompanies: [
      "Tiger Analytics",
      "Fractal Analytics",
      "ZS Associates",
      "MathCo",
      "Bajaj Finserv",
      "Cognizant Pune Capital Markets",
      "Mercedes-Benz R&D India",
      "Cummins India",
      "John Deere ETC",
      "BMC Software",
      "Persistent Systems",
      "TCS",
      "Infosys",
      "Capgemini",
      "Wipro",
      "Synechron",
    ],
    rolesAfterCourse: [
      "Data Analyst",
      "Business Analyst",
      "BI Analyst",
      "Reporting Analyst",
      "Marketing Analyst",
      "Operations Analyst",
      "Junior Data Scientist (with extension)",
    ],
  },

  modesAndDuration: {
    duration:
      "10 weeks of structured curriculum plus 1 week of capstone project and interview preparation (~3 months total)",
    classroom: {
      location: "Archer Infotech, Kothrud, Pune",
      timing: ["Morning batch — 10:00 to 13:00", "Evening batch — 18:00 to 21:00"],
    },
    online: {
      timing: ["Same hours as classroom batches", "Recordings available for review"],
      tools: ["Zoom for live sessions", "GitHub for portfolio", "Power BI Desktop / Tableau Public", "Slack / WhatsApp for async Q&A"],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote: "Stretches over ~5 months instead of 3 to accommodate working professionals.",
    },
    batchPolicy: "Maximum 15 students per batch.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode and concession.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 8 of the course. By the time you finish the curriculum, your resume highlights real published dashboards (Power BI Service or Tableau Public), your GitHub has at least two SQL + analytics repositories, and you have completed at least three mock technical interviews.",
      "We say placement support, not placement guarantee. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions.",
    ],
    process: [
      "Week 8 — resume and LinkedIn rewrite for Data Analyst JDs",
      "Week 9 — GitHub portfolio cleanup, dashboard links",
      "Weeks 10–11 — SQL drills, case-study mock rounds, dashboard mock pitches",
      "Weeks 11 — three rounds of mock technical interviews",
      "Week 11 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies (with extra emphasis on Pune analytics scene)",
      "Up to 6 months of continued support",
      "Free re-entry to future batch interview-prep sessions",
    ],
    partnerCompanies: [
      "Tiger Analytics",
      "Fractal Analytics",
      "ZS Associates",
      "MathCo",
      "Bajaj Finserv",
      "Cognizant Pune Capital Markets",
      "Mercedes-Benz R&D India",
      "Cummins",
      "TCS",
      "Infosys",
      "Capgemini",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune Data Analytics training institutes on factual rows only.",
    rows: [
      { feature: "Trainer named with photo and LinkedIn", archer: "Yes — Amol Patil", typical: "No — generic branding" },
      { feature: "Excel depth", archer: "Power Query + dynamic arrays + LAMBDA", typical: "VLOOKUP and PivotTables only" },
      { feature: "SQL depth", archer: "Window functions + CTEs + EXPLAIN plans on real Postgres", typical: "Basic SELECT / GROUP BY only" },
      { feature: "Python depth", archer: "pandas 2 + Arrow + matplotlib + seaborn", typical: "Pandas 1.x or skipped" },
      { feature: "BI tools covered", archer: "Power BI AND Tableau — both at depth", typical: "One tool, often basics only" },
      { feature: "LLM-augmented analytics module", archer: "Yes — text-to-SQL service, real OpenAI / Anthropic API", typical: "Not covered" },
      { feature: "Public portfolio output", archer: "Yes — published Power BI / Tableau Public dashboards + SQL repos", typical: "Local Excel files" },
      { feature: "Salary data shown", archer: "Cited from Indeed Pune + AmbitionBox + Glassdoor + 6figr", typical: "Single number with no source" },
      { feature: "Course fee transparency", archer: "₹20,000 – ₹90,000 published range", typical: "Hidden behind enquiry form" },
      { feature: "Placement support", archer: "6 months, with free re-entry", typical: "1–3 months or vague" },
      { feature: "Batch size cap", archer: "15 students", typical: "25–40 students" },
    ],
    closing: "Compare with whoever you are considering. The right test is whether you can see actual student dashboards before you pay.",
  },

  versusAlternative: {
    heading: "Data Analytics vs Data Science — Which Should You Pick in Pune?",
    paragraphs: [
      "Data Analytics vs Data Science is the most-asked question in Pune analytics counselling. Both roles spend most of their time in SQL and Python, both produce dashboards and reports, both communicate to business stakeholders. The difference is at the deep end — Data Scientist roles add predictive modelling, A/B testing rigour, and ML engineering; Data Analyst roles stay closer to descriptive analytics and BI tooling.",
      "Pune market reality (May 2026): Data Analyst entry is wider (more openings, lower bar — ₹3.5–6L starting), Data Scientist entry is narrower but pays better (₹5–10L starting). The path most of our students take is Data Analyst → Data Scientist over 2–3 years, building portfolio depth on the side.",
      "Honest recommendation: pick Data Analytics if you have a non-technical background and want the wider entry door. Pick Data Science if you have engineering / strong-quant background and want the bigger long-term ceiling. Either way, Data Analytics graduates can transition to Data Scientist in 2–3 years with self-study or our follow-on Data Science course.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: basic computer use, comfort with school-level math, willingness to commit 6–8 hours per week of practice outside class. No prior programming or SQL experience required; we start from `SELECT * FROM table` on day one. Open to commerce, science, engineering, humanities backgrounds — Data Analyst is the most-democratic data role in Pune hiring.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation (Excel, PostgreSQL, Power BI Desktop install)",
      "Show up to day one with a laptop running 64-bit OS, 8GB+ RAM, and Office 365 (Excel) plus PostgreSQL pre-installed",
    ],
  },

  faqs: [
    {
      question: "How long does Data Analytics training in Pune take at Archer Infotech?",
      answer:
        "Approximately 3 months — 10 weeks of structured curriculum plus 1 week of capstone and interview preparation. The weekend batch stretches over ~5 months at the same content depth.",
    },
    {
      question: "What is the salary of a Data Analyst in Pune?",
      answer:
        "Indeed Pune reports an average of ₹5.76 lakh per year for Data Analyst (May 2026). Junior Pune entry sits at ₹3.5–6 lakh. Senior Data Analysts (5+ years) earn ₹10–15 lakh. Lead Analysts / Analytics Managers earn ₹16–28 lakh nationally with Pune trending within ±10%.",
    },
    {
      question: "Data Analytics or Data Science?",
      answer:
        "Data Analytics if you want the wider entry door, especially from non-CS background. Data Science if you have engineering / strong-quant background and want the bigger long-term ceiling.",
    },
    {
      question: "Do I need a math or statistics degree?",
      answer:
        "No — we cover the statistics analysts actually use (week 9) at a level any commerce / science / engineering / humanities graduate can absorb with practice.",
    },
    {
      question: "Do I need Python or SQL before joining?",
      answer:
        "No — we cover SQL from `SELECT *` (weeks 3–4) and Python from basics (weeks 5–6). What we expect is willingness to practice.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) business analytics dashboard with SQL + Power BI on a 5–10M row dataset, (2) end-to-end analyst report on a public Indian dataset, (3) LLM-augmented text-to-SQL mini-workflow. All become public GitHub repositories or published dashboards.",
    },
    {
      question: "Is the LLM / AI module included?",
      answer:
        "Yes — week 10 covers LLM-augmented analytics workflows (text-to-SQL, prose summarisation, dashboard drafting). Capstone Project #3 is a complete text-to-SQL workflow. This is the 2026 differentiator on Pune analyst resumes.",
    },
    {
      question: "Are weekend Data Analytics classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~5 months instead of 3.",
    },
    {
      question: "What is the fee for the Data Analytics course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode and concession.",
    },
    {
      question: "Can I switch from non-tech to Data Analyst via this course?",
      answer:
        "Yes — and roughly 40% of our Data Analytics students come from non-tech backgrounds (commerce, biology, finance, ops). Career restarters and domain experts from finance / pharma / retail tend to do well because their domain knowledge differentiates them at interviews.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support, referrals via our alumni network at 12+ partner companies (extra emphasis on Pune analytics scene), resume / LinkedIn / GitHub rewrites, salary negotiation coaching.",
    },
    {
      question: "Is the named trainer actually teaching?",
      answer:
        "Amol Patil personally leads every session of every batch.",
    },
  ],

  finalCta: {
    heading: "Ready to start Data Analytics training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol is happy to spend 30 minutes telling you whether the course fits your goal.",
  },
};
