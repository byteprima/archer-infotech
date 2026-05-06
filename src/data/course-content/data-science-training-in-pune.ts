import type { CourseRichContent } from "./types";

export const dataScienceTrainingInPune: CourseRichContent = {
  intro:
    "Pune is one of India's three largest data-science hiring hubs alongside Bengaluru and Gurugram, with major analytics employers — Tiger Analytics, Fractal Analytics, ZS Associates, MathCo, Persistent Systems, and Bajaj Finserv — running their primary delivery centres here. Archer Infotech's Data Science training in Pune teaches the discipline as it is actually practiced in 2026 — Python 3.13, pandas 2 with the Arrow backend, NumPy 2, scikit-learn 1.5+, statsmodels for inference, SQL on PostgreSQL, dashboarding with Streamlit and Power BI, and a full MLOps tail (MLflow, FastAPI inference endpoints, basic monitoring). Plus an honest LLM-augmented analytics module — the 2026 differentiator. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Data Science in 2026",
    paragraphs: [
      "Data Science is no longer a single job title — it is a family of roles (Data Analyst, Data Scientist, ML Engineer, Analytics Engineer, AI Engineer) that overlap heavily and pay well. Indeed Pune lists more than 1,000 active Data-related roles as of May 2026, with Tiger Analytics, Fractal Analytics, ZS Associates, MathCo, and Persistent Systems hiring continuously. Pune analytics teams now bid against Bengaluru on compensation for senior data scientists, and the city's BFSI sector (Bajaj Finserv, Cognizant Pune Capital Markets) makes it especially strong for risk modelling, fraud analytics, and credit scoring work.",
      "What changed in 2026: pandas 2 with the Arrow backend is 10–100× faster than legacy pandas on common operations, scikit-learn 1.5+ ships better defaults and stronger pipelines, dashboarding has shifted from PowerBI-only to Streamlit + Power BI side-by-side, and MLflow has become the default experiment-tracking layer in Pune analytics shops. Most importantly, LLM-augmented analytics — using Claude or GPT-4 to draft SQL, summarise findings, and generate first-draft dashboards — is no longer optional; it is what separates a 2026 data scientist from a 2022 one.",
      "What this means for hiring in Pune: 2026 job descriptions expect a working portfolio (one Kaggle-style notebook plus one deployed dashboard), SQL fluency at the window-functions / CTE level, scikit-learn pipelines without copy-paste, and basic FastAPI to serve a model. Archer Infotech's curriculum is rebuilt around exactly these expectations — modern stack, deployable artefacts, AI-augmented workflow.",
    ],
    keyPoints: [
      "1,000+ active data-related roles on Indeed Pune as of May 2026",
      "Pune is a top-3 India hiring city for analytics — Tiger / Fractal / ZS / MathCo all here",
      "pandas 2 + Arrow + scikit-learn 1.5+ — the 2026 stack, not the 2022 stack",
      "MLflow + FastAPI + Streamlit — deployable artefacts, not just notebooks",
      "LLM-augmented analytics — the differentiator on every 2026 Pune resume",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student looking for your first analytics or data-science role in Pune",
      "Working professional in a non-data role (testing, support, ops, business) wanting a structured switch into analytics",
      "Domain expert (finance, biology, marketing, operations) who wants quantitative depth on top of business knowledge",
      "Working developer wanting to add data and ML skills to a backend or full-stack profile",
      "Career restarter targeting analytics or data-science as a high-demand re-entry path",
    ],
    notForYou: [
      "If you expect a guaranteed ₹15L+ Data Scientist offer with no math, no portfolio — Pune fresher data-analyst entry sits at ₹3.5–₹6 lakh; the ₹15L+ roles need 3+ years and demonstrable depth",
      "If you cannot put in 8–10 hours per week of practice outside class — data is a portfolio discipline, not a slide-deck one",
      "If you want certificate-only learning with no projects — Pune analytics hiring screens on Kaggle-style notebooks and dashboards, not certificates",
      "If your goal is purely deep-learning research / publications — pick a research programme; this course covers production-relevant ML, not novel architectures",
      "If you have done a Master's in Statistics with applied projects — you'll be under-stretched; talk to us about the senior MLE specialisation instead",
    ],
  },

  curriculum: [
    {
      title: "Python for Data — From Zero to Pandas-Fluent",
      weekRange: "Weeks 1–2",
      description:
        "Set up Python 3.13 with virtual environments and Jupyter, write idiomatic Python — comprehensions, generators, dunder methods, type hints — and graduate to pandas 2 with the Arrow backend (10–100× faster than legacy pandas on the operations you will run daily). NumPy 2 vectorisation, broadcasting, and the rules of when to drop down to NumPy from pandas. By the end of week 2, every student can load a 5-million-row CSV, clean it, and answer ten business questions in under 30 minutes.",
      topics: [
        "Python 3.13, virtual envs, Jupyter / VS Code setup",
        "Idiomatic Python — comprehensions, generators, type hints",
        "NumPy 2 — arrays, vectorisation, broadcasting",
        "pandas 2 — Series, DataFrame, MultiIndex",
        "Arrow backend (pyarrow) and PyArrow-aware operations",
        "groupby, merge, pivot, reshape — the four daily operations",
        "Memory and performance trade-offs",
      ],
    },
    {
      title: "SQL for Analytics — Window Functions, CTEs, Optimisation",
      weekRange: "Week 3",
      description:
        "SQL is half of every Pune data-job. Cover the parts that actually matter for analytics — joins (inner, left, anti, semi), aggregations, CTEs, window functions (ROW_NUMBER, RANK, LAG, LEAD, running totals, moving averages), self-joins, and the EXPLAIN plan basics that separate a 5-second query from a 5-minute one. Hands-on with PostgreSQL 16 against a public retail dataset; query plans reviewed in class. By the end of the week, every student can rewrite a slow analyst query in two ways and explain which is faster and why.",
      topics: [
        "SELECT, JOIN, GROUP BY, HAVING — the basics done properly",
        "CTEs and recursive CTEs",
        "Window functions — partition, frame, ordering",
        "Subqueries — correlated, anti-joins, EXISTS",
        "Index basics and EXPLAIN plans",
        "PostgreSQL 16 with a real retail / e-commerce schema",
        "BigQuery and Redshift dialect notes (for analytics-engineer roles)",
      ],
    },
    {
      title: "Statistics & Probability for Data Science",
      weekRange: "Week 4",
      description:
        "The statistics that hiring panels actually test for and that you will use weekly. Descriptive statistics (mean, median, variance, percentiles), probability distributions (Bernoulli, Binomial, Normal, Poisson), the central limit theorem, hypothesis testing (z-test, t-test, chi-square, Mann-Whitney), p-values, confidence intervals, A/B testing fundamentals, Bayes' theorem, and bootstrap resampling. We use simulation in Python (NumPy + scipy.stats) to build intuition rather than relying on formula recall.",
      topics: [
        "Descriptive statistics and distributions",
        "Probability — joint, conditional, marginal, Bayes",
        "Sampling and the Central Limit Theorem",
        "Hypothesis testing — t-test, chi-square, Mann-Whitney",
        "p-values, confidence intervals, effect sizes",
        "A/B testing fundamentals and pitfalls (peeking, MDE)",
        "Bootstrap and permutation tests",
      ],
    },
    {
      title: "Exploratory Data Analysis & Visualisation",
      weekRange: "Week 5",
      description:
        "EDA is the highest-leverage skill in working data science — and the skill most courses skip. Cover the discipline of asking a dataset the right questions: missing-value handling, outlier detection, distribution checks, correlation analysis, segment-wise drill-downs. Visualisation with matplotlib for control, seaborn for default-pretty, and plotly for interactivity. We finish with a public Indian dataset (RBI, NSE, India Open Data Portal) — every student produces a 10-page exploratory PDF report graded against a Pune analyst-interview rubric.",
      topics: [
        "EDA workflow — missing values, outliers, distributions",
        "matplotlib internals — axes, figures, layouts",
        "seaborn for statistical visualisation",
        "plotly for interactive dashboards",
        "Correlation, multicollinearity, cardinality checks",
        "Storytelling with data — the 10-page analyst report",
      ],
    },
    {
      title: "Machine Learning Foundations",
      weekRange: "Weeks 6–7",
      description:
        "scikit-learn 1.5+ as the production-grade ML library it is. Supervised learning — linear and logistic regression, decision trees, random forests, gradient boosting (XGBoost, LightGBM, CatBoost), SVMs. Unsupervised — k-means, hierarchical clustering, PCA, t-SNE. Cross-validation done right (stratified, time-series-aware), hyperparameter tuning with Optuna, and the discipline of train/validation/test splits that prevents the leak-and-overfit failure mode that ends most fresher data-science interviews. We build an end-to-end pipeline using scikit-learn's Pipeline + ColumnTransformer abstractions.",
      topics: [
        "scikit-learn API — estimators, transformers, pipelines",
        "Linear / logistic regression with regularisation",
        "Tree-based models — Random Forest, XGBoost, LightGBM",
        "Hyperparameter tuning with Optuna",
        "Cross-validation strategies — stratified, time-series, group",
        "Model evaluation — confusion matrix, ROC AUC, PR AUC, calibration",
        "Class imbalance — SMOTE, class weights, threshold tuning",
        "Clustering and dimensionality reduction",
      ],
    },
    {
      title: "Deep Learning & Modern NLP",
      weekRange: "Week 8",
      description:
        "PyTorch 2.4+ as the dominant framework for new deep-learning work in Pune. Build neural networks from scratch (forward/backward pass, autograd intuition), then move to convolutional networks for image work and transformers for NLP. Hugging Face Transformers for pre-trained model usage — sentence embeddings, sentiment classification, named-entity recognition. We deliberately keep this module practical — the goal is to use deep learning effectively, not to derive backprop on a whiteboard.",
      topics: [
        "PyTorch 2.4+ — tensors, autograd, training loop",
        "Neural network basics — MLP, regularisation, dropout",
        "CNNs for image classification (transfer learning with ResNet)",
        "Transformer basics and attention",
        "Hugging Face Transformers for NLP",
        "Sentence embeddings and semantic similarity",
        "When to use deep learning vs gradient boosting (the honest answer)",
      ],
    },
    {
      title: "MLOps — From Notebook to Production",
      weekRange: "Week 9",
      description:
        "The week most data-science courses skip and most Pune hiring panels test for. Experiment tracking with MLflow (runs, metrics, artefacts, model registry), model serving with FastAPI (Pydantic v2, async endpoints, JWT auth), Docker containerisation of inference services, basic monitoring (Prometheus + Grafana), and a small CI/CD pipeline (GitHub Actions running tests, building containers, deploying to AWS). We deploy at least one model to a live endpoint that we then call from a Streamlit dashboard.",
      topics: [
        "MLflow — tracking, registry, deployment",
        "FastAPI inference endpoints with Pydantic v2",
        "Docker for inference containers",
        "GitHub Actions CI/CD",
        "Basic monitoring — latency, error rate, drift",
        "Versioning data and models — DVC overview",
      ],
    },
    {
      title: "Dashboarding & Business Communication",
      weekRange: "Week 10",
      description:
        "A model nobody can use is worth nothing. Build production-ready dashboards with Streamlit (Python-native, fast iteration) and Power BI (the default in Pune BFSI and large captives). Cover dashboard design principles, KPI selection, drill-down hierarchies, and the discipline of storytelling for non-technical stakeholders. We finish with a 15-minute mock business presentation in front of the class — the soft skill that decides who gets promoted in the first 18 months.",
      topics: [
        "Streamlit — pages, state, caching, deployment",
        "Power BI — data model, DAX basics, dashboards",
        "Dashboard design principles — Ben Shneiderman / Edward Tufte",
        "KPI selection and drill-down hierarchies",
        "Storytelling for non-technical audiences",
        "Presenting findings — the 15-minute analyst pitch",
      ],
    },
    {
      title: "LLM-Augmented Analytics",
      weekRange: "Week 11",
      description:
        "The 2026 differentiator. Use Claude or OpenAI APIs to draft SQL queries, summarise long datasets, generate first-draft dashboards, and ship a small text-to-SQL service against a real database. Cover retrieval-augmented generation (RAG) for analytics over internal documentation, prompt design for analytics workflows, cost / latency / safety trade-offs, and the limits of LLMs for reasoning over numbers. This module is what separates 2026 Pune data-science hiring from 2022 hiring.",
      topics: [
        "OpenAI and Anthropic SDKs in Python",
        "Text-to-SQL — patterns, schema-aware prompts, validators",
        "RAG over internal docs (pgvector, Postgres)",
        "Prompt design for analytics workflows",
        "LLM cost, latency, and safety considerations",
        "When LLMs help and when they hurt analytics quality",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Week 12 + 2 weeks placement prep",
      description:
        "Two weeks of full-time capstone work plus structured interview preparation. Pick one of three capstone projects (see Capstone Projects). Mock interviews calibrated for Pune analytics hiring panels — Tiger Analytics, Fractal, ZS, MathCo, Persistent. Includes a SQL mock round (these companies test SQL hard), a case-study round, and a behavioural / domain round. Resume / LinkedIn / GitHub polish included.",
      topics: [
        "Capstone project — full implementation, deployment, README",
        "Code review with the lead trainer",
        "SQL mock interview round",
        "Case-study mock — analytics business question",
        "Behavioural and domain mock round",
        "Resume + LinkedIn rewrite calibrated for analytics JDs",
        "GitHub portfolio polish — Kaggle-style notebooks + deployed dashboard",
      ],
    },
  ],

  projects: [
    {
      title: "End-to-End Predictive Modelling Pipeline",
      description:
        "Pick a real public dataset (Indian government open data, RBI / NSE financial data, or a Kaggle dataset). Build the full pipeline — EDA report, feature engineering with scikit-learn ColumnTransformer, modelling with XGBoost / LightGBM tuned via Optuna, cross-validated evaluation, calibration, MLflow experiment tracking, and a FastAPI inference endpoint deployed to AWS or Render. Outcome: a clean Jupyter notebook plus a deployed prediction API plus a Streamlit dashboard — exactly the combo Pune analytics teams interview on.",
      technologies: [
        "Python 3.13",
        "pandas 2 + Arrow",
        "scikit-learn 1.5+",
        "XGBoost / LightGBM",
        "Optuna for tuning",
        "MLflow",
        "FastAPI inference endpoint",
        "Streamlit",
        "AWS or Render",
      ],
    },
    {
      title: "Business Analytics Dashboard with SQL + Power BI",
      description:
        "A retail or BFSI analytics project — load a 5–10M row dataset into PostgreSQL, write a layered analytics SQL view (window functions, CTEs, materialised views), build a Power BI dashboard on top with drill-down and slicers, and write a 5-page business memo. Ideal for Tiger Analytics / Fractal / Bajaj Finserv interviews where SQL + Power BI is the daily stack. Optional Streamlit version for software-engineering profile alignment.",
      technologies: [
        "PostgreSQL 16",
        "SQL — window functions, CTEs, materialised views",
        "Power BI — DAX, dashboards",
        "Streamlit (optional)",
        "Public retail / BFSI dataset",
      ],
    },
    {
      title: "LLM-Augmented Text-to-SQL Service",
      description:
        "A FastAPI service that lets a non-technical user ask a business question in English and returns a chart plus the underlying SQL. Schema-aware prompting against PostgreSQL, output validation (block writes, sanity-check joins), retrieval-augmented context for table descriptions via pgvector, structured logging, and a small Streamlit frontend. Outcome: a 2026-relevant project that demos in 5 minutes and signals AI-augmented analytics on the resume.",
      technologies: [
        "FastAPI",
        "PostgreSQL + pgvector",
        "OpenAI / Anthropic SDK",
        "SQL safety validators",
        "Streamlit frontend",
        "Docker + AWS deployment",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Patil (Senior Corporate Trainer, 10+ years, lead for Python / Data Science / AI/ML / DevOps tracks) and Vinod Patil (Solutions Architect & AI Trainer, 12 years, AI/ML and AWS specialisation). Both personally take sessions in every batch — the names you see here are the names you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "Data and analytics is among the most-hired job families in Pune in 2026 — Indeed Pune lists 1,000+ active roles across Data Analyst, Data Scientist, Analytics Engineer, ML Engineer, and AI Engineer titles. Salary depends heavily on title, domain (BFSI / retail / pharma), and demonstrable portfolio quality, not just years of experience. The biggest Pune employers are Tiger Analytics, Fractal Analytics, ZS Associates, MathCo, Persistent Systems, Bajaj Finserv, BMC Software, and the captive analytics arms of Mercedes-Benz R&D India and Cummins.",
      "What pulls a data scientist above the median band: a clean Kaggle-style notebook on a non-trivial business problem, a deployed dashboard or inference API (not just a Jupyter file), SQL fluency at the window-functions level, and one LLM-augmented analytics project. Our capstone projects are designed exactly around these signals.",
      "Senior Data Scientist and Lead Analyst bands are reported as national figures (Pune-specific Indeed pages do not exist for these specific role titles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr aggregations.",
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
        role: "Data Scientist (Pune)",
        band: "₹10,82,402 per year average",
        source: {
          label: "Indeed Pune (Data Scientist)",
          url: "https://in.indeed.com/career/data-scientist/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Junior Data Scientist (Pune)",
        band: "₹4,50,000 – ₹7,50,000 per year",
        source: {
          label: "AmbitionBox Pune Data Scientist",
          url: "https://www.ambitionbox.com/profile/data-scientist-salary-in-pune",
        },
      },
      {
        role: "Senior Data Scientist (Pune mid-level, 5–8 years)",
        band: "₹15,00,000 – ₹26,00,000 per year",
        source: {
          label: "Glassdoor Pune Senior Data Scientist",
          url: "https://www.glassdoor.co.in/Salaries/pune-senior-data-scientist-salary-SRCH_IL.0,4_IM1072_KO5,26.htm",
        },
      },
      {
        role: "Lead / Principal Data Scientist (national, 8+ years)",
        band: "₹28,00,000 – ₹50,00,000 per year",
        source: {
          label: "6figr India Lead Data Scientist (Pune ±10%)",
          url: "https://6figr.com/in/salary/lead-data-scientist--t",
        },
      },
    ],
    hiringCompanies: [
      "Tiger Analytics",
      "Fractal Analytics",
      "ZS Associates",
      "MathCo",
      "Persistent Systems",
      "Bajaj Finserv",
      "BMC Software",
      "Mercedes-Benz R&D India",
      "Cummins India",
      "John Deere ETC",
      "BMW TechWorks India",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
      "Synechron",
    ],
    rolesAfterCourse: [
      "Data Analyst",
      "Junior Data Scientist",
      "Analytics Engineer",
      "Business Analyst (data-heavy)",
      "BI Developer",
      "ML Engineer (with self-study extension)",
      "AI Engineer (LLM-augmented analytics)",
      "Quantitative Analyst (BFSI, with domain study)",
    ],
  },

  modesAndDuration: {
    duration:
      "3 months of structured curriculum (12 weeks) plus 2 weeks of capstone project work and interview preparation. The original 5-month listing reflects an extended schedule available on request for working professionals who want a slower pace; both formats cover identical content.",
    classroom: {
      location: "Archer Infotech, Kothrud, Pune",
      timing: [
        "Morning batch — 10:00 to 13:00",
        "Evening batch — 18:00 to 21:00",
        "Lab access available outside class hours",
      ],
    },
    online: {
      timing: [
        "Same hours as classroom batches — morning or evening",
        "Recordings available for review",
        "Same notebook reviews and project feedback as in-person batches",
      ],
      tools: [
        "Zoom for live sessions",
        "GitHub for notebook and dashboard reviews",
        "Slack / WhatsApp for asynchronous Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over 5 months instead of 3 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch — small enough that the trainer reviews every student's notebooks and dashboards personally. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote — we calibrate by early-bird timing, group enrolment, and returning-alumni concessions.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with full LLM-augmented analytics module and extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 8 of the course, not at the end. By the time you finish the curriculum, your resume highlights real Kaggle-style notebooks and a deployed dashboard, your GitHub is presentable, and you have completed at least three mock technical interviews against question banks from Pune analytics companies.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 8 — resume and LinkedIn rewrite, calibrated for analytics JDs",
      "Week 9 — GitHub portfolio cleanup, notebook polish, dashboard deployment links",
      "Weeks 10–11 — SQL drills, case-study walkthroughs, dashboard mock pitches",
      "Weeks 11–12 — three rounds of mock technical interviews (SQL, case, behavioural)",
      "Week 12 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Tiger Analytics",
      "Fractal Analytics",
      "ZS Associates",
      "MathCo",
      "Persistent Systems",
      "Bajaj Finserv",
      "Mercedes-Benz R&D India",
      "Cummins",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune Data Science training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Amol Patil and Vinod Patil",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Stack version covered",
        archer: "Python 3.13, pandas 2 + Arrow, scikit-learn 1.5+, PyTorch 2.4+",
        typical: "Often pandas 1.x, scikit-learn 1.0, TensorFlow 1 / 2.x",
      },
      {
        feature: "SQL depth covered",
        archer: "Window functions, CTEs, EXPLAIN plans on real PostgreSQL",
        typical: "Basic SELECT / GROUP BY only",
      },
      {
        feature: "MLOps coverage",
        archer: "MLflow + FastAPI + Docker + GitHub Actions deployment",
        typical: "Notebook-only — no deployment artefact",
      },
      {
        feature: "LLM-augmented analytics module",
        archer: "Yes — text-to-SQL service, RAG over docs, real OpenAI / Anthropic API",
        typical: "Not covered, or marketing-only mention",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — Kaggle-style notebooks + deployed dashboard + inference API",
        typical: "Notebook screenshots in a PDF",
      },
      {
        feature: "Salary data shown",
        archer: "Cited from Indeed Pune + AmbitionBox + Glassdoor + 6figr with source URLs",
        typical: "Single number with no source",
      },
      {
        feature: "Course fee transparency",
        archer: "₹20,000 – ₹90,000 published range with mode breakdown",
        typical: "Hidden behind enquiry form",
      },
      {
        feature: "Placement support duration after course",
        archer: "6 months, with free re-entry to interview prep",
        typical: "1–3 months or vaguely 'until placed'",
      },
      {
        feature: "Batch size cap",
        archer: "15 students",
        typical: "25–40 students",
      },
    ],
    closing:
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student notebooks and dashboards before you pay.",
  },

  versusAlternative: {
    heading: "Data Science vs Data Analytics — Which Should You Pick in Pune?",
    paragraphs: [
      "Data Science vs Data Analytics is the most-asked question in Pune analytics counselling. The honest answer: they overlap heavily and the title difference often comes down to the company's HR taxonomy, not the work. Both roles spend most of their time in SQL and Python, both produce dashboards, both communicate to business stakeholders. The difference is at the deep end — Data Scientist roles add predictive modelling, A/B testing rigour, and (sometimes) ML engineering; Data Analyst roles stay closer to descriptive analytics and BI tooling.",
      "Pune market reality: Data Analyst entry is wider (more openings, lower bar — ₹3.5–₹6L starting), Data Scientist entry is narrower but pays better (₹5–₹10L starting, ₹15–₹26L at senior). The path most of our students take is Data Analyst → Data Scientist over 2–3 years, building portfolio depth on the side.",
      "Honest recommendation: pick Data Science if you have engineering / strong-quant background and want the bigger long-term ceiling; pick Data Analytics if you are coming from a non-technical background and want the wider entry door. Either way, our curriculum covers both — the deep modules (ML, MLOps, LLMs) are what tilt your resume toward Data Scientist titles, but the same course gets you a Data Analyst role if that fits your profile better.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: basic computer use, comfort with school-level math (mean / median / variance), and willingness to commit 8–10 hours per week of practice outside class. No prior programming experience required; we start from `print('Hello, world')` on day one. If you have engineering / commerce / science background you will move at the expected pace; humanities and arts graduates may need an extra 2–3 hours per week of math grounding which we provide via supplementary worksheets.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal (we say no to roughly 10% of enquirers)",
      "Confirm enrolment and complete pre-course orientation (Python install, Jupyter setup)",
      "Show up to day one with a laptop running 64-bit OS — Python and PostgreSQL installation is part of session 1",
    ],
  },

  faqs: [
    {
      question: "Which is the best Data Science training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves. The test that works: ask any institute you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student GitHub repositories with deployed dashboards, and (3) name companies that hired their last 5 batches. Compare on those three.",
    },
    {
      question: "How long does Data Science training in Pune take at Archer Infotech?",
      answer:
        "Three months (12 weeks) of structured curriculum plus 2 weeks of capstone and interview preparation. The weekend batch stretches over 5 months at the same content depth. An extended 5-month evening format is also available for working professionals who want a slower pace — both formats cover identical content.",
    },
    {
      question: "What is the salary of a Data Scientist in Pune?",
      answer:
        "Indeed Pune reports an average of ₹10.82 lakh per year for Data Scientist (May 2026). Junior Data Scientist Pune starts at ₹4.5–₹7.5 lakh per year (AmbitionBox). Senior Data Scientists (5–8 years) earn ₹15–₹26 lakh per Glassdoor. Lead Data Scientists earn ₹28–₹50 lakh nationally with Pune trending within ±10% of those figures.",
    },
    {
      question: "What is the salary of a Data Analyst in Pune?",
      answer:
        "Indeed Pune reports an average of ₹5.76 lakh per year for Data Analyst (May 2026). Fresher Data Analyst entry typically lands at ₹3.5–₹6 lakh, with strong year-on-year growth and a clear path to Senior Analyst at ₹10–₹15 lakh by year 4–5.",
    },
    {
      question: "Do I need a math or statistics degree?",
      answer:
        "No — we cover the statistics and probability you actually need (week 4) at a level that engineering, commerce, science, or even humanities graduates can absorb with practice. What matters more is consistent practice; a CS degree without Kaggle-style portfolio work loses to a humanities degree with one.",
    },
    {
      question: "Do I need Python before joining the course?",
      answer:
        "No — weeks 1–2 are dedicated to Python from zero. If you have done any programming (any language) you will move slightly faster but won't be ahead of where the course expects.",
    },
    {
      question: "Data Science or Machine Learning — which course should I pick?",
      answer:
        "Data Science is the broader discipline (statistics + analytics + ML + dashboards + business communication); Machine Learning is the deeper-but-narrower specialisation (algorithms, model tuning, deployment, MLOps). For a first job in Pune analytics, Data Science is the right starting point. Pick our Machine Learning course if you already have analytics or strong engineering background and want algorithmic depth.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) end-to-end predictive modelling pipeline with MLflow + FastAPI deployment, (2) business analytics dashboard with SQL + Power BI on a 5–10M row dataset, (3) LLM-augmented text-to-SQL service. All three become public GitHub repositories you reference in interviews.",
    },
    {
      question: "Which companies in Pune hire Data Scientists?",
      answer:
        "Tiger Analytics, Fractal Analytics, ZS Associates, MathCo, Persistent Systems, Bajaj Finserv, BMC Software, Mercedes-Benz R&D India, Cummins, John Deere ETC, BMW TechWorks India, TCS, Infosys, Cognizant, Capgemini, and Synechron are the main Pune Data / Analytics employers in 2026.",
    },
    {
      question: "Is the LLM / AI module included or extra?",
      answer:
        "Included in every batch. Week 11 is a full module on LLM-augmented analytics — text-to-SQL services, retrieval-augmented generation over internal docs, and prompt design for analytics workflows. This module is what separates 2026 Pune data-science hiring from 2022 hiring.",
    },
    {
      question: "Are weekend Data Science classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over 5 months instead of 3. Same content, same trainers, same projects. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "What is the fee for the Data Science course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and applicable concession. The higher end covers placement-track classroom batches with full LLM-augmented analytics module and extended interview prep; the lower end covers concession-eligible online or weekend formats. Placement support is included in every fee tier.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for analytics roles (SQL round + case study + behavioural), referrals via our alumni network at 12+ partner companies, resume / LinkedIn / GitHub rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "Can I switch from non-tech to Data Science via this course?",
      answer:
        "Yes — and roughly 30% of our Data Science students come from non-tech backgrounds (commerce, biology, finance, ops). The honest caveat: you will need 8–10 hours per week of practice outside class plus a strong portfolio at the end. Career restarters and domain experts from finance / pharma / retail tend to do well because their domain knowledge differentiates them at the interview.",
    },
    {
      question: "Are the named trainers actually teaching, or are they just on the brochure?",
      answer:
        "Amol Patil personally leads the Python, SQL, ML, and MLOps weeks. Vinod Patil leads the deep learning, LLM-augmented analytics, and capstone weeks. The same names you see on this page show up in your batch on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start Data Science training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol and Vinod are happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see actual student notebooks and dashboards, meet a current batch, and decide with full information.",
  },
};
