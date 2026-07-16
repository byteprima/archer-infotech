import type { CourseRichContent } from "./types";

export const mongodbTrainingInPune: CourseRichContent = {
  intro:
    "MongoDB is the dominant NoSQL document database in Pune product engineering — almost every Pune Node.js / MERN stack codebase runs on Mongo, and Pune startups (especially fintech / consumer-tech / e-commerce) frequently pick Mongo as their primary database for fast development and flexible schema. Archer Infotech's MongoDB training in Pune teaches the database as it is actually used in 2026 — MongoDB 8.0 (released October 2024) as the production default, document modelling with embedding vs referencing, the rich query language, the aggregation pipeline (Mongo's analytics engine), indexing including the 2024 vector-search additions, transactions (yes, MongoDB has multi-document ACID transactions since 4.0), Mongoose as the de-facto Node.js ODM, plus the production tail (replica sets, sharding overview, MongoDB Atlas managed cloud). Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn MongoDB in 2026",
    paragraphs: [
      "MongoDB is among the most-deployed databases in Pune product engineering — Indeed Pune lists 800+ active openings that explicitly require MongoDB, plus a thousand more Node.js / MERN / backend roles where Mongo is the institutional default. The biggest employers running Mongo at scale are Persistent Systems, BMW TechWorks India, Mastercard Pune Tech Hub, Synechron, plus the entire Pune SaaS / fintech / e-commerce startup scene (Amagi, Fyllo, BharatPe Pune, Razorpay Pune, Pine Labs Pune, Drip Capital, Innovaccer Pune, Whatfix Pune). MongoDB Atlas (the managed-cloud variant) has become the de-facto choice for many startups — easier operations than self-hosting.",
      "What changed in 2026: MongoDB 8.0 (October 2024) is the current production default — significant performance improvements (30%+ on common workloads), Queryable Encryption GA, plus better time-series and vector-search support. MongoDB Atlas Vector Search has matured into a credible alternative to pgvector / dedicated vector databases for AI / RAG use cases. Atlas Search (full-text search via Lucene) has matured. The Atlas-Stream-Processing service has emerged for stream-processing workflows. Plus the MongoDB ecosystem has tightened around Mongoose for Node.js + the official drivers for Python / Java / .NET.",
      "What this means for hiring: 2026 Pune MongoDB JDs expect document-modelling fluency (embedding vs referencing, the discipline of denormalising for read patterns), aggregation-pipeline depth, indexing (including text and vector indexes), plus basic Atlas operations. Senior roles add replica sets, sharding, transactions, plus the Atlas-Search / Atlas-Vector-Search patterns.",
    ],
    keyPoints: [
      "800+ active Pune openings explicitly require MongoDB (May 2026)",
      "Plus another ~1,000 Node.js / MERN roles where Mongo is the default",
      "MongoDB 8.0 — current production default, 30%+ perf gains",
      "MongoDB Atlas — de-facto managed-cloud choice",
      "Atlas Vector Search — credible alternative to pgvector for RAG",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Working Node.js / MERN developer wanting MongoDB depth (the database your team probably runs)",
      "Working backend developer in another stack wanting to add MongoDB",
      "Engineering / BCS / MCA student preparing for our MERN Stack track or Node.js track",
      "Working Python / Java / .NET developer wanting MongoDB skill for full-stack roles",
      "Career restarter targeting Pune SaaS / fintech / e-commerce backend",
      "Working SQL DBA wanting to add NoSQL document database to your skill stack",
    ],
    notForYou: [
      "If you want enterprise relational DBA depth — pick Oracle or PostgreSQL",
      "If your goal is BFSI Capital Markets DBA premium — pick Oracle (BFSI runs more Oracle)",
      "If your goal is heavy-OLTP transactional workloads (financial-ledger style) — Postgres or Oracle is usually the right tool",
      "If you cannot put in 6–8 hours per week of practice outside class",
      "If you have 3+ years of production MongoDB experience — talk to us about advanced specialisations",
    ],
  },

  curriculum: [
    {
      title: "MongoDB Foundations & Document Model",
      weekRange: "Weeks 1–2",
      description:
        "MongoDB from first principles. Cover the document model (BSON, the JSON-like document format with rich types — ObjectId, Date, Decimal128), MongoDB 8.0 installation (local + Docker + MongoDB Atlas free tier), mongosh CLI, MongoDB Compass GUI, plus the CRUD operations — insertOne / insertMany / find / findOne / updateOne / updateMany / deleteOne / deleteMany. Plus query operators ($eq / $ne / $gt / $lt / $in / $nin / $and / $or / $not / $exists / $type), projection, sorting, limit / skip, and the discipline of writing efficient queries from day 1.",
      topics: [
        "Document model — BSON, ObjectId, Date, Decimal128",
        "MongoDB 8.0 install (local + Docker + Atlas free tier)",
        "mongosh CLI + MongoDB Compass",
        "CRUD operations",
        "Query operators",
        "Projection, sorting, limit, skip",
        "Write concerns and read concerns",
      ],
    },
    {
      title: "Document Modelling — Embedding vs Referencing",
      weekRange: "Week 3",
      description:
        "The skill that separates junior from senior MongoDB engineers — and the topic where most production MongoDB performance issues live. Cover the embedding vs referencing decision, the rules that guide it (read-frequency, write-frequency, growth pattern, document size limits — 16MB), plus the specific patterns (one-to-few embedded, one-to-many with references, many-to-many with document references). Plus schema design for time-series data, audit-trail patterns, and the discipline of designing schemas around your actual access patterns (the schema-on-write pattern that Mongo favours).",
      topics: [
        "Embedding vs referencing rules",
        "One-to-few embedded",
        "One-to-many with references",
        "Many-to-many patterns",
        "Document size limits (16MB)",
        "Time-series schema design",
        "Audit-trail patterns",
        "Schema-on-write discipline",
      ],
    },
    {
      title: "Aggregation Pipeline & Analytics",
      weekRange: "Weeks 4–5",
      description:
        "MongoDB's aggregation pipeline is its analytics engine and the feature that most candidates underuse. Cover the pipeline stages — $match (filter early!), $group (aggregations), $project (shape the output), $sort, $limit, $skip, $unwind (denormalise arrays), $lookup (joins), $facet (multiple pipelines in one query), $bucket / $bucketAuto (histograms), $merge / $out (write results to a collection). Plus the $expr operator for cross-field comparison, regex queries, plus the array operators ($map / $filter / $reduce). Real examples on a 10M+ document dataset.",
      topics: [
        "Pipeline stages — $match, $group, $project",
        "$sort, $limit, $skip",
        "$unwind for arrays",
        "$lookup for joins",
        "$facet for multi-pipeline",
        "$bucket / $bucketAuto for histograms",
        "$merge / $out",
        "$expr for cross-field comparison",
        "Array operators",
        "10M+ document dataset hands-on",
      ],
    },
    {
      title: "Indexing, Atlas Search & Atlas Vector Search",
      weekRange: "Week 6",
      description:
        "Indexes in depth. Single-field, compound (the order matters), multikey (for arrays), text (full-text search), 2dsphere (geospatial), partial, sparse, hashed indexes — and when each fits. Plus the explain() output for query optimisation, the IXSCAN vs COLLSCAN distinction, plus the discipline of avoiding common Mongo anti-patterns (queries that bypass indexes due to type coercion). Then Atlas Search (Lucene-based full-text search in Atlas), Atlas Vector Search (the 2026 pgvector alternative for RAG / AI use cases) — when each earns its place.",
      topics: [
        "Index types — single, compound, multikey, text, 2dsphere",
        "Partial, sparse, hashed indexes",
        "Compound index column order",
        "explain() output",
        "IXSCAN vs COLLSCAN",
        "Atlas Search (Lucene)",
        "Atlas Vector Search for RAG",
      ],
    },
    {
      title: "Transactions, Replica Sets & Production",
      weekRange: "Week 7",
      description:
        "Production MongoDB. Multi-document ACID transactions (yes, MongoDB has them since 4.0; common Pune interview misconception is they don't), the discipline of when transactions earn their complexity vs when atomic single-document updates suffice. Replica sets — primary + secondaries, automatic failover, read preferences. Sharding overview (chunk-based horizontal partitioning) — covered at primer depth, with the honest discussion that most Pune teams use sharded Atlas only at scale. Plus the security baseline — authentication (SCRAM, x.509), authorisation (built-in + custom roles), TLS, plus Queryable Encryption (the 2024+ feature for encrypted-at-rest fields).",
      topics: [
        "Multi-document ACID transactions",
        "When to use transactions",
        "Replica sets — primary + secondaries",
        "Automatic failover",
        "Read preferences",
        "Sharding overview",
        "Authentication — SCRAM, x.509",
        "Custom roles",
        "TLS and Queryable Encryption",
      ],
    },
    {
      title: "Mongoose ODM, Atlas Operations & Capstone",
      weekRange: "Week 8 + 1 week capstone",
      description:
        "Mongoose as the de-facto Node.js ODM — schemas, validation, middleware (pre / post hooks), virtuals, populate (Mongo's join), plus the discipline of when to use Mongoose vs raw MongoDB driver. MongoDB Atlas operations — cluster setup, network access, database users, monitoring, alerts, backup / restore. Capstone (see Capstone Projects).",
      topics: [
        "Mongoose schemas and validation",
        "Mongoose middleware",
        "Virtuals and populate",
        "Mongoose vs raw driver",
        "Atlas cluster operations",
        "Backup / restore via Atlas",
        "Capstone implementation",
        "Resume + LinkedIn rewrite",
        "GitHub portfolio polish",
      ],
    },
    {
      title: "AI-Assisted Development Workflow",
      weekRange: "Final Week",
      highlight: true,
      description:
        "The skill every 2026 hiring panel now probes for — building real work with AI in the loop, responsibly. Learn to drive AI assistants (GitHub Copilot, Claude, Cursor, and IDE-native AI) to scaffold and accelerate the tools and stack this course covers, generate tests, explain and refactor unfamiliar code, and cut the boilerplate — while keeping you firmly in control of every decision. Heavy focus on guardrails: reviewing each AI suggestion, spotting hallucinated APIs or wrong answers, and handling licensing and data-privacy concerns. Close with a mini-project that takes a deliverable end-to-end using an AI-assisted workflow, then fold the same tooling into version control and everyday team practice.",
      topics: [
        "AI assistants — GitHub Copilot, Claude, Cursor, IDE-native AI",
        "Effective prompting for this course's stack — scaffolding, boilerplate, config",
        "AI-assisted test generation and coverage",
        "Explaining, refactoring, and modernising unfamiliar code with AI",
        "AI-driven review, error detection, and quality checks",
        "Generating and maintaining documentation with AI",
        "AI debugging — interpreting errors, logs, and failing output",
        "Guardrails — reviewing output, avoiding hallucinations, licensing & data privacy",
        "Team workflow — AI in the editor, in reviews, and in delivery pipelines",
        "Mini-project — a deliverable built end-to-end with an AI-assisted workflow",
      ],
    },
  ],

  projects: [
    {
      title: "MERN-Style E-Commerce Backend with Aggregation Analytics",
      description:
        "A complete MERN-style backend on MongoDB — pick a real domain (e-commerce, fintech transactions, ticketing, inventory). Document modelling with proper embed-vs-reference decisions, 10M+ documents synthetic data, 20+ aggregation-pipeline analytics queries (top sellers, cohort retention, RFM analysis), proper indexing with explain() output. Optionally a small Express + Mongoose service on top.",
      technologies: [
        "MongoDB 8.0 + Atlas",
        "Aggregation pipeline depth",
        "Indexing + explain()",
        "Mongoose ODM",
        "Express service (optional)",
        "10M+ document dataset",
      ],
    },
    {
      title: "Atlas Vector Search RAG Service",
      description:
        "A retrieval-augmented generation service backed by MongoDB Atlas Vector Search — pick a real domain corpus, embed via OpenAI, store in Atlas Vector Search, hybrid retrieval (Atlas Search BM25 + Vector Search dense + reranking), plus a small FastAPI / Express endpoint. Demonstrates the 2026 Mongo differentiator alongside pgvector.",
      technologies: [
        "MongoDB Atlas Vector Search",
        "OpenAI embeddings",
        "Atlas Search (Lucene)",
        "FastAPI or Express endpoint",
      ],
    },
    {
      title: "Time-Series + Real-Time App",
      description:
        "A time-series application using MongoDB time-series collections (IoT sensor data, app events, financial tick data) with continuous queries, retention policies, plus a small real-time dashboard.",
      technologies: [
        "MongoDB 8.0 time-series collections",
        "Aggregation pipeline for analytics",
        "Change Streams for real-time",
        "Streamlit or simple frontend",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Patil (Senior Corporate Trainer, 10+ years, lead for the MERN / Full Stack tracks at Archer Infotech) and Ankita Hartale (Java Full Stack & Database Trainer, expert in MongoDB / MySQL / PostgreSQL / Oracle). Both personally take sessions in every batch.",

  careerOutcomes: {
    paragraphs: [
      "MongoDB fluency is a near-mandatory expectation on Pune Node.js / MERN / backend roles — Indeed Pune lists 800+ openings explicitly requiring MongoDB, plus another ~1,000 Node.js / MERN roles where it is the default. The biggest employers are Persistent Systems, BMW TechWorks India, Mastercard Pune Tech Hub, Synechron, plus the entire Pune SaaS / fintech / e-commerce startup scene.",
      "What pulls a MongoDB developer above the median band: depth on document modelling (embed-vs-reference decisions), demonstrable aggregation-pipeline work, indexing literacy with explain() output, plus one Atlas Vector Search project (the 2026 differentiator). Our capstone projects are designed exactly around these signals.",
      "Senior MongoDB Developer / DBA bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures.",
    ],
    salaryBands: [
      {
        role: "MongoDB Developer (Pune)",
        band: "₹6,52,000 per year average",
        source: { label: "Indeed Pune (MongoDB Developer)", url: "https://in.indeed.com/career/mongodb-developer/salaries/Pune--Maharashtra" },
      },
      {
        role: "Junior MongoDB Developer (Pune entry, <2 years)",
        band: "₹3,80,000 – ₹6,80,000 per year",
        source: { label: "AmbitionBox Pune MongoDB Developer", url: "https://www.ambitionbox.com/profile/mongodb-developer-salary-in-pune" },
      },
      {
        role: "Mid-level MongoDB Developer (Pune, 3–5 years)",
        band: "₹10,00,000 – ₹16,00,000 per year",
        source: { label: "Glassdoor Pune MongoDB Developer", url: "https://www.glassdoor.co.in/Salaries/pune-mongodb-developer-salary-SRCH_IL.0,4_IM1072_KO5,22.htm" },
      },
      {
        role: "Senior MongoDB DBA / Engineer (Pune, 5–8 years)",
        band: "₹15,00,000 – ₹26,00,000 per year",
        source: { label: "Glassdoor Pune Senior MongoDB DBA", url: "https://www.glassdoor.co.in/Salaries/pune-senior-mongodb-dba-salary-SRCH_IL.0,4_IM1072_KO5,23.htm" },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "BMW TechWorks India",
      "Mastercard Pune Tech Hub",
      "Synechron",
      "Bajaj Finserv (some teams)",
      "Amagi",
      "Fyllo",
      "BharatPe (Pune)",
      "Razorpay (Pune)",
      "Pine Labs (Pune)",
      "Drip Capital",
      "Innovaccer (Pune)",
      "Whatfix (Pune)",
      "TCS",
      "Cognizant",
      "Capgemini",
    ],
    rolesAfterCourse: [
      "MongoDB Developer",
      "Backend Developer (MongoDB-heavy)",
      "Full Stack Developer (MERN)",
      "Junior MongoDB DBA",
      "AI Engineer (with Atlas Vector Search)",
    ],
  },

  modesAndDuration: {
    duration: "8 weeks of structured curriculum plus 1 week of capstone (~2 months total)",
    classroom: { location: "Archer Infotech, Kothrud, Pune", timing: ["Morning batch — 10:00 to 13:00", "Evening batch — 18:00 to 21:00"] },
    online: {
      timing: ["Same hours as classroom batches", "Recordings available for review"],
      tools: ["Zoom for live sessions", "MongoDB Atlas free tier per student", "MongoDB Compass + mongosh", "GitHub for capstone", "Slack / WhatsApp for async Q&A"],
    },
    weekend: { timing: ["Saturday + Sunday, 09:00 to 13:00"], durationNote: "Stretches over ~3.5 months instead of 2." },
    batchPolicy: "Maximum 15 students per batch.",
  },

  fees: {
    note: "Course fees range ₹20,000 – ₹90,000 depending on mode and concession. MongoDB Atlas free tier covers lab work for most students.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2 instalments at no extra cost",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 6. By the end of the curriculum your resume highlights real document-modelling and aggregation-pipeline work, your GitHub has at least two production-style repositories, and you have completed at least two mock technical interviews.",
      "We say placement support, not placement guarantee. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions.",
    ],
    process: [
      "Week 6 — resume + LinkedIn rewrite",
      "Week 7 — GitHub portfolio cleanup",
      "Weeks 8–9 — two rounds of mock technical interviews",
      "Week 9 — HR mock and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies (with extra emphasis on Pune SaaS / fintech / MERN stacks)",
      "Up to 6 months of continued support",
      "Free re-entry to future batch interview-prep sessions",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "BMW TechWorks India",
      "Synechron",
      "Amagi",
      "BharatPe (Pune)",
      "Razorpay (Pune)",
      "Pine Labs (Pune)",
      "Drip Capital",
      "Innovaccer (Pune)",
      "TCS",
      "Cognizant",
    ],
  },

  comparison: {
    intro: "We compare ourselves against typical Pune MongoDB training institutes on factual rows only.",
    rows: [
      { feature: "Trainers named with photos and LinkedIn", archer: "Yes — Amol Patil and Ankita Hartale", typical: "No — generic branding" },
      { feature: "MongoDB version covered", archer: "MongoDB 8.0 — Queryable Encryption, Vector Search", typical: "MongoDB 4.x or 5.x" },
      { feature: "Document modelling depth", archer: "Full week — embed-vs-reference, time-series, audit", typical: "Surface coverage" },
      { feature: "Aggregation pipeline", archer: "Two weeks — all stages, 10M+ document hands-on", typical: "Basic $match / $group only" },
      { feature: "Index types", archer: "Single, compound, multikey, text, 2dsphere, partial, sparse, hashed", typical: "Single + compound only" },
      { feature: "Atlas Search + Vector Search", archer: "Yes — full coverage, RAG capstone", typical: "Not covered" },
      { feature: "Transactions", archer: "Multi-document ACID covered with discipline of when to use", typical: "Skipped — common misconception that Mongo doesn't have transactions" },
      { feature: "Public GitHub portfolio output", archer: "Yes — schema design + aggregation pipelines + RAG project", typical: "Local code on hard drive" },
      { feature: "Salary data shown", archer: "Cited from Indeed Pune + AmbitionBox + Glassdoor", typical: "Single number with no source" },
      { feature: "Placement support", archer: "6 months, with free re-entry", typical: "1–3 months or vague" },
      { feature: "Batch size cap", archer: "15 students", typical: "25–40 students" },
    ],
    closing: "Compare with whoever you are considering.",
  },

  versusAlternative: {
    heading: "MongoDB vs PostgreSQL — Which Should You Pick?",
    paragraphs: [
      "MongoDB for Pune Node.js / MERN / SaaS / fintech / consumer-tech where the document model fits your access patterns and you want fast iteration on schema. PostgreSQL for relational data with strong transactional requirements, complex joins, or where you want both relational and JSONB in the same database.",
      "Pune market reality: both have ~700–800 explicit openings; most Pune Node.js / MERN teams default to Mongo, most Pune Java / Python / fintech / analytics teams default to Postgres. Many of our students learn both — Mongo for the MERN-stack work, Postgres for the more relational backends.",
      "Honest recommendation: pick Mongo if you're targeting Pune SaaS / fintech / Node.js / MERN. Pick Postgres if you're targeting Pune product engineering / fintech / analytics / AI engineering with relational data needs. Both are well-paid; both have ample Pune hiring.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: basic computer use, familiarity with JSON (the core skill), basic JavaScript / Python helps but isn't required. No prior database experience required. Willingness to commit 6–8 hours per week of practice.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation (MongoDB Atlas free-tier signup, mongosh + Compass install)",
      "Show up to day one with a laptop running 64-bit OS",
    ],
  },

  faqs: [
    {
      question: "How long does MongoDB training in Pune take at Archer Infotech?",
      answer: "Approximately 2 months — 8 weeks plus 1 week of capstone. Weekend batch ~3.5 months.",
    },
    {
      question: "MongoDB or PostgreSQL?",
      answer:
        "Mongo for Pune Node.js / MERN / SaaS / fintech / consumer-tech. Postgres for relational + transactional + analytics. Both well-paid with ample Pune hiring.",
    },
    {
      question: "What is the salary of a MongoDB Developer in Pune?",
      answer:
        "Indeed Pune ₹6.52 lakh average. Junior ₹3.8–6.8 lakh per AmbitionBox. Mid-level ₹10–16 lakh per Glassdoor. Senior ₹15–26 lakh.",
    },
    {
      question: "Does MongoDB have transactions?",
      answer:
        "Yes — multi-document ACID transactions since MongoDB 4.0. Common misconception is they don't. We cover when to use transactions vs when atomic single-document updates suffice.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) MERN-style e-commerce with aggregation analytics on 10M+ documents, (2) Atlas Vector Search RAG service, (3) time-series + real-time app.",
    },
    {
      question: "Is Atlas Vector Search / RAG covered?",
      answer:
        "Yes — week 6 covers Atlas Vector Search and the RAG patterns. Capstone Project #2 is a complete Atlas Vector Search RAG service.",
    },
    {
      question: "Are weekend MongoDB classes available in Pune?",
      answer: "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~3.5 months.",
    },
    {
      question: "What is the fee?",
      answer: "Course fees range ₹20,000 – ₹90,000 depending on mode and concession.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of placement support, referrals via our alumni network (extra emphasis on Pune SaaS / fintech / MERN stacks), mock interviews.",
    },
    {
      question: "Are the named trainers actually teaching?",
      answer: "Amol Patil and Ankita Hartale personally lead every session.",
    },
  ],

  finalCta: {
    heading: "Ready to start MongoDB training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4 weeks. Reach out via the enquiry form or call us — Amol and Ankita are happy to spend 30 minutes telling you whether the course fits your goal.",
  },
};
