import type { CourseRichContent } from "./types";

export const postgresqlTrainingInPune: CourseRichContent = {
  intro:
    "PostgreSQL is the dominant relational database in Pune product engineering and modern fintech / SaaS — Persistent Systems, BMC Software, Bajaj Finserv (significant Postgres footprint alongside Oracle), Synechron, BMW TechWorks India, Mastercard Pune Tech Hub, Amagi, Fyllo, BharatPe Pune, Razorpay Pune, Pine Labs Pune, Drip Capital, Innovaccer Pune, Whatfix Pune all run their primary OLTP workloads on it. Archer Infotech's PostgreSQL training in Pune teaches the database as it is actually used in 2026 — Postgres 16+ as the production default (Postgres 17 released Sept 2024 is gaining adoption), modern SQL features (window functions, CTEs, lateral joins), JSONB at depth (the Postgres differentiator), full-text search, partitioning, plus the rich extension ecosystem (pgvector for AI / RAG, PostGIS for geo, TimescaleDB for time-series, Citus for distribution). Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn PostgreSQL in 2026",
    paragraphs: [
      "Postgres has eclipsed MySQL as the default choice for new Pune product engineering — Indeed Pune lists 700+ active openings that explicitly require PostgreSQL, plus several thousand more where Postgres is listed alongside other databases. The biggest employers running Postgres at scale are Persistent Systems, BMC Software, Bajaj Finserv, BMW TechWorks India, Mastercard Pune Tech Hub, plus the Pune SaaS / fintech scene (Amagi, Fyllo, BharatPe Pune, Razorpay Pune, Pine Labs Pune, Drip Capital, Innovaccer Pune, Whatfix Pune). Postgres also powers Amazon RDS / Aurora PostgreSQL, Azure Database for PostgreSQL Flexible Server, Cloud SQL Postgres, and Supabase / Neon — managed cloud variants several Pune teams ship on.",
      "What changed in 2026: Postgres 16 (released Sept 2023) shipped logical replication improvements, parallel queries enhancements, plus better JSON path matching. Postgres 17 (released Sept 2024) shipped vector indexing improvements, incremental backup, plus performance gains. The pgvector extension has become the default vector database for RAG / AI integration in Pune product engineering — most Pune AI features use Postgres + pgvector instead of separate vector databases. The serverless Postgres trend (Neon, Supabase, AWS Aurora Serverless v2) has matured for the cases where elastic scaling matters.",
      "What this means for hiring: 2026 Pune Postgres JDs expect SQL fluency at the window-functions / CTE / lateral-join level, JSONB depth, indexing and EXPLAIN-plan literacy, transactions and isolation, plus basic logical replication. Senior roles add partitioning, the major extensions (pgvector for AI / RAG; PostGIS for geo; TimescaleDB for time-series), plus performance tuning at depth. Archer Infotech's curriculum is rebuilt around exactly these expectations.",
    ],
    keyPoints: [
      "700+ active Pune openings explicitly require PostgreSQL (May 2026)",
      "Eclipsed MySQL as default for new Pune product engineering",
      "Postgres 16+ — current production default; Postgres 17 gaining adoption",
      "JSONB + window functions + lateral joins — modern Postgres features",
      "pgvector for AI / RAG integration — the 2026 differentiator",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Working backend / full-stack developer wanting Postgres depth (the database your team probably runs)",
      "Engineering, BCS, MCA, or BSc-CS student targeting Pune product engineering / fintech / SaaS",
      "Working MySQL developer wanting to add Postgres for the wider modern-product hiring market",
      "Working Data Engineer wanting Postgres-as-warehouse / Postgres-on-AI depth",
      "Career restarter targeting Database Administrator / Backend / Analytics-Engineer roles",
      "Working AI Engineer wanting pgvector + RAG depth",
    ],
    notForYou: [
      "If your goal is BFSI Pune Capital Markets DBA premium — pick our Oracle Database course (BFSI runs more Oracle at the high end)",
      "If your goal is LAMP / WordPress / digital-agency work — pick our MySQL course (more institutional fit)",
      "If you want NoSQL / document-database — pick our MongoDB course",
      "If you cannot put in 6–8 hours per week of practice outside class",
      "If you have 3+ years of production Postgres DBA experience — talk to us about advanced specialisations",
    ],
  },

  curriculum: [
    {
      title: "PostgreSQL Foundations & Modern SQL",
      weekRange: "Weeks 1–2",
      description:
        "Postgres from first principles. Cover Postgres 16+ installation (Linux / macOS / Windows / Docker, plus the managed-cloud options — Neon, Supabase, AWS RDS, Azure Flexible Server), psql CLI client, DBeaver / pgAdmin / TablePlus / DataGrip as GUI options, plus the SQL fundamentals — SELECT with all clauses, DML, DDL, Postgres data types in depth (the rich type system — INTEGER variants, NUMERIC for money, TEXT vs VARCHAR, TIMESTAMP variants, ARRAY, JSON / JSONB, UUID, ENUM), constraints. Plus the Postgres-specific generation columns and identity columns.",
      topics: [
        "Postgres 16+ installation and managed-cloud options",
        "psql, DBeaver, pgAdmin, TablePlus, DataGrip",
        "SELECT and all clauses",
        "Postgres data types in depth",
        "ARRAY and ENUM types",
        "JSON vs JSONB (when each fits)",
        "Identity columns and generation columns",
        "Constraints — PK / FK / UNIQUE / CHECK / EXCLUDE",
      ],
    },
    {
      title: "Joins, CTEs, Window Functions & Lateral Joins",
      weekRange: "Week 3",
      description:
        "The advanced SQL Postgres excels at. Cover JOINs in depth, the LATERAL JOIN (Postgres's distinctive feature for top-N-per-group queries), CTEs (regular and recursive), window functions, GROUPING SETS / CUBE / ROLLUP for analytics, plus Postgres-specific operators (anti-joins, semi-joins, row constructors). By the end of week 3 every student can write a 50-line analytical query using these features and explain it.",
      topics: [
        "JOIN types in Postgres",
        "LATERAL JOIN — top-N-per-group",
        "CTEs and recursive CTEs",
        "Window functions",
        "GROUPING SETS / CUBE / ROLLUP",
        "Row constructors",
      ],
    },
    {
      title: "JSONB Depth, Full-Text Search & Indexes",
      weekRange: "Weeks 4–5",
      description:
        "The Postgres differentiators. JSONB at depth — the binary JSON type, operators (-> / ->> / @> / ?), JSONPath queries, GIN indexes on JSONB for fast queries, plus the discipline of when to denormalise into JSONB and when to stay relational. Full-text search — tsvector, tsquery, the to_tsvector function, indexed full-text search, ranking. Then indexes broadly — B-tree, Hash, GiST, GIN, BRIN, SP-GiST — and when each fits, partial indexes, expression indexes, plus the EXPLAIN ANALYZE patterns for query optimisation on a 10M+ row dataset.",
      topics: [
        "JSONB operators — -> / ->> / @> / ?",
        "JSONPath queries",
        "GIN indexes on JSONB",
        "When to use JSONB vs relational",
        "Full-text search — tsvector, tsquery",
        "Index types — B-tree, Hash, GiST, GIN, BRIN, SP-GiST",
        "Partial and expression indexes",
        "EXPLAIN ANALYZE on 10M+ row dataset",
      ],
    },
    {
      title: "Transactions, MVCC & Concurrency",
      weekRange: "Week 6",
      description:
        "Postgres's MVCC implementation gives it stronger concurrency than most databases. Cover the ACID guarantees, the four standard isolation levels (Postgres's default is Read Committed; Repeatable Read and Serializable use Serializable Snapshot Isolation — SSI — which has different trade-offs from MySQL InnoDB), MVCC mechanics (xmin / xmax, dead tuples, VACUUM and autovacuum), advisory locks for cross-session coordination, plus the SELECT FOR UPDATE / SKIP LOCKED pattern for queue-as-table workflows.",
      topics: [
        "ACID and isolation levels",
        "Serializable Snapshot Isolation (SSI)",
        "MVCC mechanics — xmin, xmax, dead tuples",
        "VACUUM and autovacuum",
        "Advisory locks",
        "SELECT FOR UPDATE / SKIP LOCKED",
        "Queue-as-table patterns",
      ],
    },
    {
      title: "Partitioning, Replication & Production Operations",
      weekRange: "Week 7",
      description:
        "Production Postgres. Native partitioning (range / list / hash) for large tables, the discipline of partition-pruning for query performance, partition maintenance. Logical replication and physical streaming replication, the difference between them, plus pg_basebackup / pg_dump / pg_dumpall for backups. WAL (Write-Ahead Log) basics, point-in-time recovery, the pg_stat_statements extension for query monitoring, plus the security baseline (roles / privileges / row-level security).",
      topics: [
        "Native partitioning — range / list / hash",
        "Partition pruning",
        "Logical replication",
        "Physical streaming replication",
        "pg_basebackup, pg_dump, pg_dumpall",
        "WAL and point-in-time recovery",
        "pg_stat_statements",
        "Roles, privileges, row-level security",
      ],
    },
    {
      title: "Extensions, pgvector & Capstone",
      weekRange: "Week 8 + 1 week capstone",
      description:
        "The Postgres extension ecosystem is what makes Postgres uniquely powerful. Cover pgvector for vector embeddings (the 2026 differentiator — most Pune AI features use Postgres + pgvector for RAG), PostGIS for geographic data, TimescaleDB for time-series, plus a primer on Citus for horizontal sharding and the FDW (Foreign Data Wrapper) pattern for cross-database queries. Capstone — a project that uses one or more extensions meaningfully (pgvector for an AI feature, PostGIS for a location-based app, TimescaleDB for time-series analytics).",
      topics: [
        "pgvector for embeddings",
        "PostGIS for geographic data",
        "TimescaleDB for time-series",
        "Citus for sharding (overview)",
        "Foreign Data Wrappers",
        "Capstone implementation",
        "Resume + LinkedIn rewrite",
        "GitHub portfolio polish",
      ],
    },
  ],

  projects: [
    {
      title: "Production OLTP Schema with JSONB and Partitioning",
      description:
        "A complete production-style OLTP schema (e-commerce, fintech, or SaaS — your choice) using Postgres-specific features — JSONB columns where they earn their place, native partitioning on a high-volume table (orders / events / transactions), proper indexes (GIN for JSONB, B-tree for relational), 10M+ rows of synthetic data, plus 20 analytical queries with EXPLAIN ANALYZE optimisation. Outcome: a public GitHub repository with the schema, sample data, and optimisation report.",
      technologies: [
        "Postgres 16+",
        "JSONB + GIN indexes",
        "Native partitioning",
        "Window functions + lateral joins",
        "EXPLAIN ANALYZE optimisation",
        "10M+ row dataset",
      ],
    },
    {
      title: "AI / RAG Service with pgvector",
      description:
        "A retrieval-augmented generation service backed by Postgres + pgvector — pick a real domain corpus, embed via OpenAI / sentence-transformers, store in pgvector, hybrid retrieval (BM25 via tsvector + dense via pgvector + reranking), plus a small FastAPI / Express endpoint. Demonstrates the 2026 Postgres differentiator.",
      technologies: [
        "Postgres 16+ + pgvector",
        "OpenAI embeddings or sentence-transformers",
        "Full-text search via tsvector",
        "Hybrid retrieval",
        "FastAPI or Express endpoint",
      ],
    },
    {
      title: "Time-Series or Geo-Spatial App with TimescaleDB / PostGIS",
      description:
        "A time-series analytics app using TimescaleDB (IoT sensor data, financial tick data, app metrics) OR a geo-spatial app using PostGIS (location-based search, geo-fenced notifications). Demonstrates extension fluency.",
      technologies: [
        "Postgres 16+ + TimescaleDB OR PostGIS",
        "Continuous aggregates (TimescaleDB)",
        "Spatial indexes (PostGIS)",
        "Real-time analytics queries",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Ankita Hartale (Java Full Stack & Database Trainer, currently at Wipro, expert in DBMS / MySQL / PostgreSQL / Oracle / MongoDB). Ankita personally leads every session of every batch.",

  careerOutcomes: {
    paragraphs: [
      "PostgreSQL fluency is the new default expectation on Pune product engineering / fintech / SaaS backend roles in 2026 — Indeed Pune lists 700+ openings explicitly requiring Postgres. The biggest employers are Persistent Systems, BMC Software, Bajaj Finserv, BMW TechWorks India, Mastercard Pune Tech Hub, plus the Pune SaaS / fintech scene.",
      "What pulls a Postgres developer / DBA above the median band: depth on JSONB and modern SQL (window functions, lateral joins, CTEs), demonstrable EXPLAIN-plan optimisation experience, one extension specialisation (pgvector / PostGIS / TimescaleDB), plus production-operations literacy (replication, backup, recovery). Our capstone projects are designed exactly around these signals.",
      "Senior Postgres DBA / Engineer bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures.",
    ],
    salaryBands: [
      {
        role: "PostgreSQL Developer / DBA (Pune)",
        band: "₹6,98,000 per year average",
        source: { label: "Indeed Pune (PostgreSQL Developer)", url: "https://in.indeed.com/career/postgresql-developer/salaries/Pune--Maharashtra" },
      },
      {
        role: "Junior Postgres Developer (Pune entry, <2 years)",
        band: "₹4,00,000 – ₹7,00,000 per year",
        source: { label: "AmbitionBox Pune Postgres Developer", url: "https://www.ambitionbox.com/profile/postgresql-developer-salary-in-pune" },
      },
      {
        role: "Mid-level Postgres Developer / DBA (Pune, 3–5 years)",
        band: "₹10,00,000 – ₹17,00,000 per year",
        source: { label: "Glassdoor Pune Postgres DBA", url: "https://www.glassdoor.co.in/Salaries/pune-postgresql-dba-salary-SRCH_IL.0,4_IM1072_KO5,19.htm" },
      },
      {
        role: "Senior Postgres DBA (Pune, 5–8 years)",
        band: "₹16,00,000 – ₹26,00,000 per year",
        source: { label: "Glassdoor Pune Senior Postgres DBA", url: "https://www.glassdoor.co.in/Salaries/pune-senior-postgres-dba-salary-SRCH_IL.0,4_IM1072_KO5,24.htm" },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "BMC Software",
      "Bajaj Finserv",
      "BMW TechWorks India",
      "Mastercard Pune Tech Hub",
      "Synechron",
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
    ],
    rolesAfterCourse: [
      "PostgreSQL Developer",
      "Database Administrator (Postgres)",
      "Backend Developer (with Postgres depth)",
      "Analytics Engineer (Postgres + dbt)",
      "Data Engineer (Postgres-heavy)",
      "AI Engineer (with pgvector specialisation)",
    ],
  },

  modesAndDuration: {
    duration: "8 weeks of structured curriculum plus 1 week of capstone (~2 months total)",
    classroom: { location: "Archer Infotech, Kothrud, Pune", timing: ["Morning batch — 10:00 to 13:00", "Evening batch — 18:00 to 21:00"] },
    online: {
      timing: ["Same hours as classroom batches", "Recordings available for review"],
      tools: ["Zoom for live sessions", "psql + DBeaver / pgAdmin / TablePlus", "GitHub for capstone", "Slack / WhatsApp for async Q&A"],
    },
    weekend: { timing: ["Saturday + Sunday, 09:00 to 13:00"], durationNote: "Stretches over ~3.5 months instead of 2." },
    batchPolicy: "Maximum 15 students per batch.",
  },

  fees: {
    note: "Course fees range ₹20,000 – ₹90,000 depending on mode and concession.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2 instalments at no extra cost",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 6. By the end of the curriculum your resume highlights real EXPLAIN-plan optimisation work and at least one extension-based project, your GitHub has at least two production-style repositories, and you have completed at least two mock technical interviews.",
      "We say placement support, not placement guarantee. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions.",
    ],
    process: [
      "Week 6 — resume + LinkedIn rewrite",
      "Week 7 — GitHub portfolio cleanup",
      "Weeks 8–9 — two rounds of mock technical interviews",
      "Week 9 — HR mock and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies",
      "Up to 6 months of continued support",
      "Free re-entry to future batch interview-prep sessions",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "BMC Software",
      "Bajaj Finserv",
      "BMW TechWorks India",
      "Mastercard Pune Tech Hub",
      "Amagi",
      "Razorpay (Pune)",
      "TCS",
      "Cognizant",
    ],
  },

  comparison: {
    intro: "We compare ourselves against typical Pune PostgreSQL training institutes on factual rows only.",
    rows: [
      { feature: "Trainer named with photo and LinkedIn", archer: "Yes — Ankita Hartale", typical: "No — generic branding" },
      { feature: "Postgres version covered", archer: "Postgres 16+ with Postgres 17 features", typical: "Postgres 11–13 only" },
      { feature: "Modern SQL features", archer: "Window functions, lateral joins, CTEs hands-on", typical: "Basic SELECT / JOIN" },
      { feature: "JSONB depth", archer: "Full week — operators, JSONPath, GIN indexes, design patterns", typical: "Basic mention" },
      { feature: "Index types covered", archer: "B-tree, Hash, GiST, GIN, BRIN, SP-GiST + partial / expression indexes", typical: "B-tree only" },
      { feature: "Extensions (pgvector / PostGIS / TimescaleDB)", archer: "Yes — full week, capstone-eligible", typical: "Not covered" },
      { feature: "Production-operations coverage", archer: "Logical + streaming replication, backups, RLS", typical: "Skipped" },
      { feature: "Public GitHub portfolio output", archer: "Yes — schema + EXPLAIN report + extension project", typical: "Local code on hard drive" },
      { feature: "Salary data shown", archer: "Cited from Indeed Pune + AmbitionBox + Glassdoor", typical: "Single number with no source" },
      { feature: "Placement support", archer: "6 months, with free re-entry", typical: "1–3 months or vague" },
      { feature: "Batch size cap", archer: "15 students", typical: "25–40 students" },
    ],
    closing: "Compare with whoever you are considering.",
  },

  versusAlternative: {
    heading: "PostgreSQL vs MySQL vs Oracle — Which Should You Pick?",
    paragraphs: [
      "PostgreSQL for modern Pune product engineering, fintech, SaaS, and analytics-engineering teams (the more powerful database for new projects, 2026 default). MySQL for LAMP / WordPress / digital-agency / smaller-startup ecosystem (broader entry-level hiring). Oracle for Pune BFSI premium DBA specialisation (highest paid, smallest pool).",
      "Pune market reality: Postgres ~700 openings, MySQL ~600, Oracle ~400 (with Oracle paying highest per role). Many of our students learn Postgres for product engineering and analytics, MySQL for digital agency / WordPress, Oracle for BFSI premium.",
      "Honest recommendation: Postgres if you're targeting modern Pune product / fintech / SaaS / analytics engineering. MySQL if you want broadest entry-level reach. Oracle for BFSI premium DBA.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: basic computer use, willingness to commit 6–8 hours per week of practice. No prior SQL or programming experience required. If you have done our MySQL course or basic SQL, you'll move slightly faster.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation (Postgres 16+ install scripts, Neon free-tier signup)",
      "Show up to day one with a laptop running 64-bit OS",
    ],
  },

  faqs: [
    {
      question: "How long does PostgreSQL training in Pune take at Archer Infotech?",
      answer: "Approximately 2 months — 8 weeks plus 1 week of capstone. Weekend batch ~3.5 months.",
    },
    {
      question: "PostgreSQL or MySQL?",
      answer:
        "Postgres for modern Pune product engineering / fintech / SaaS / analytics. MySQL for LAMP / WordPress / digital-agency / smaller-startup. Postgres has eclipsed MySQL as the default for new Pune product work.",
    },
    {
      question: "What is the salary of a Postgres Developer / DBA in Pune?",
      answer:
        "Indeed Pune ₹6.98 lakh average. Junior ₹4–7 lakh per AmbitionBox. Mid-level ₹10–17 lakh per Glassdoor. Senior DBA ₹16–26 lakh.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) production OLTP schema with JSONB and partitioning, (2) AI / RAG service with pgvector, (3) time-series or geo-spatial app with TimescaleDB / PostGIS.",
    },
    {
      question: "Is pgvector / RAG covered?",
      answer:
        "Yes — week 8 covers pgvector and the AI / RAG patterns. Capstone Project #2 is a complete pgvector-backed RAG service. This is the 2026 Postgres differentiator.",
    },
    {
      question: "Are weekend Postgres classes available in Pune?",
      answer: "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~3.5 months.",
    },
    {
      question: "What is the fee?",
      answer: "Course fees range ₹20,000 – ₹90,000 depending on mode and concession.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of placement support, referrals via our alumni network, mock interviews.",
    },
    {
      question: "Is the named trainer actually teaching?",
      answer: "Ankita Hartale personally leads every session.",
    },
  ],

  finalCta: {
    heading: "Ready to start PostgreSQL training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4 weeks. Reach out via the enquiry form or call us — Ankita is happy to spend 30 minutes telling you whether the course fits your goal.",
  },
};
