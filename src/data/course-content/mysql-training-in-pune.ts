import type { CourseRichContent } from "./types";

export const mysqlTrainingInPune: CourseRichContent = {
  intro:
    "MySQL remains one of the most-deployed relational databases in Pune — backing most LAMP-stack web applications, the WordPress / WooCommerce ecosystem, the Pune e-commerce / classifieds / SaaS scene, and significant BFSI / IT-services workloads where MySQL has been the institutional default for two decades. Archer Infotech's MySQL training in Pune teaches the database as it is actually used in 2026 — MySQL 8.0+ as the production default (8.4 LTS released April 2024 is the current LTS; 9.x is the innovation release stream), modern SQL features (window functions, CTEs, JSON functions, lateral derived tables), database design and normalisation, transactions and isolation, indexing and query optimisation with EXPLAIN, stored procedures / functions / triggers (where they earn their place), plus the production tail (replication, backup, MySQL Workbench / DBeaver, security baseline). Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn MySQL in 2026",
    paragraphs: [
      "MySQL is among the most-deployed databases in Indian production workloads — Indeed Pune lists 600+ active openings that explicitly require MySQL, plus another ~1,000 backend / full-stack roles where MySQL is listed alongside Postgres / Mongo as 'one of'. The biggest employers running MySQL at scale are the WordPress / WooCommerce hosting / agency scene (every Pune digital agency builds on MySQL), e-commerce (Flipkart Pune teams, smaller marketplaces), BFSI legacy systems, plus the LAMP-stack startup ecosystem. MySQL also powers Amazon RDS / Aurora MySQL, Azure Database for MySQL, and Cloud SQL MySQL — managed cloud variants that several Pune teams ship on.",
      "What changed in 2026: MySQL 8.0 (released 2018, the long-running mainline) has been refreshed continuously — InnoDB Cluster for HA, JSON functions at parity with Postgres in many cases, window functions, CTEs (the 8.0 features that closed the gap with Postgres). MySQL 8.4 LTS (April 2024) is the current LTS for stable production. MySQL 9.x is the innovation stream with vector-search support and other modern features. Cloud-managed MySQL (RDS / Aurora MySQL / Azure MySQL Flexible / Cloud SQL MySQL) has matured significantly.",
      "What this means for hiring: 2026 Pune MySQL JDs expect SQL fluency at the window-functions / CTE level, indexing and EXPLAIN-plan literacy, transactions and isolation, plus basic replication understanding. Senior DBA roles add InnoDB Cluster, performance tuning at depth, and managed-cloud MySQL operations. Archer Infotech's curriculum is rebuilt around exactly these expectations — modern SQL, performance-aware, cloud-ready.",
    ],
    keyPoints: [
      "600+ active Pune openings explicitly require MySQL (May 2026)",
      "Plus ~1,000 backend / full-stack roles list it alongside Postgres / Mongo",
      "MySQL 8.0+ — window functions, CTEs, JSON parity with Postgres",
      "MySQL 8.4 LTS — current production LTS",
      "Strong Pune e-commerce / digital-agency / BFSI / LAMP startup hiring",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student wanting solid relational database foundations",
      "Working backend developer wanting MySQL depth (the database your team probably runs)",
      "Working Data Analyst or BA wanting SQL-on-MySQL for daily analytics work",
      "PHP / WordPress / LAMP developer wanting to deepen SQL fluency",
      "Career restarter targeting Database Administrator / Backend Developer roles",
      "Working Oracle / PostgreSQL DBA wanting to add MySQL for the wider Pune database market",
    ],
    notForYou: [
      "If you want enterprise-grade DBA depth for BFSI Pune Capital Markets — pick our Oracle Database course instead (Pune BFSI runs more Oracle than MySQL at the high end)",
      "If you specifically want NoSQL / document-database depth — pick our MongoDB course",
      "If you want modern Pune product-engineering Postgres depth — pick our PostgreSQL course",
      "If you cannot put in 6–8 hours per week of practice outside class",
      "If you have 3+ years of production MySQL DBA experience — talk to us about advanced specialisations",
    ],
  },

  curriculum: [
    {
      title: "MySQL Foundations & SQL Basics",
      weekRange: "Weeks 1–2",
      description:
        "MySQL from first principles. Cover MySQL 8.4 LTS installation (Linux / macOS / Windows / Docker), MySQL Workbench and DBeaver as GUI tools, the mysql CLI client, plus the SQL fundamentals — SELECT with all clauses (WHERE / GROUP BY / HAVING / ORDER BY / LIMIT), DML (INSERT / UPDATE / DELETE), DDL (CREATE / ALTER / DROP TABLE), data types in depth (the integer / decimal / string / date-time tradeoffs that BFSI interviews ask about), constraints (PK, FK, UNIQUE, CHECK, NOT NULL).",
      topics: [
        "MySQL 8.4 LTS installation",
        "MySQL Workbench / DBeaver / mysql CLI",
        "SELECT — WHERE / GROUP BY / HAVING / ORDER BY / LIMIT",
        "INSERT / UPDATE / DELETE",
        "CREATE / ALTER / DROP TABLE",
        "Data types — integer / decimal / string / date-time",
        "Constraints — PK / FK / UNIQUE / CHECK / NOT NULL",
      ],
    },
    {
      title: "Joins, Subqueries & Modern SQL",
      weekRange: "Week 3",
      description:
        "The SQL that real production code runs. Cover JOINs (INNER, LEFT, RIGHT, FULL OUTER via UNION, CROSS, SELF), subqueries (correlated and uncorrelated), set operations (UNION / UNION ALL / INTERSECT / EXCEPT), then the MySQL 8.0+ modern features — Common Table Expressions (CTEs, including recursive), window functions (ROW_NUMBER, RANK, LAG, LEAD, running totals, moving averages), lateral derived tables. By the end of week 3 every student can rewrite a slow analyst query in two ways and explain which is faster.",
      topics: [
        "JOIN types — INNER / LEFT / RIGHT / FULL via UNION",
        "Subqueries — correlated vs uncorrelated",
        "Set operations — UNION / INTERSECT / EXCEPT",
        "CTEs and recursive CTEs (MySQL 8.0+)",
        "Window functions — partition / frame / ordering",
        "Lateral derived tables (MySQL 8.0+)",
      ],
    },
    {
      title: "Database Design & Normalisation",
      weekRange: "Week 4",
      description:
        "Schema design as Pune backend / DBA panels test for. Cover the relational model, ER diagrams, normalisation (1NF / 2NF / 3NF / BCNF — at the level you actually use), denormalisation as a performance choice, surrogate vs natural keys, foreign-key cascades (ON DELETE / ON UPDATE), plus the modern decisions — JSON columns vs separate tables (when to denormalise into JSON), soft deletes vs hard deletes, audit-trail patterns, plus the schema-evolution discipline (migrations, never-drop-columns-in-prod).",
      topics: [
        "Relational model and ER diagrams",
        "Normalisation — 1NF / 2NF / 3NF / BCNF",
        "Denormalisation as a performance choice",
        "Surrogate vs natural keys",
        "Foreign-key cascades",
        "JSON columns — when each fits",
        "Soft deletes and audit trails",
        "Schema migration discipline",
      ],
    },
    {
      title: "Indexing, EXPLAIN Plans & Query Optimisation",
      weekRange: "Weeks 5–6",
      description:
        "The skill that separates junior from senior MySQL engineers. Cover B-tree indexes (the default), composite indexes (the order matters more than you think), covering indexes, hash indexes (Memory engine), full-text indexes, plus the discipline of EXPLAIN plans — type column (the join-type ladder: const / eq_ref / ref / range / index / ALL — and what each means for performance), key column, rows estimate, plus the Optimizer Trace for deeper analysis. Real examples on a 10M+ row dataset; query plans reviewed in class.",
      topics: [
        "B-tree indexes",
        "Composite index column order",
        "Covering indexes",
        "Full-text indexes",
        "EXPLAIN plans in depth",
        "Optimizer Trace",
        "Index hints (USE / FORCE / IGNORE INDEX)",
        "10M+ row dataset hands-on",
      ],
    },
    {
      title: "Transactions, Isolation, Stored Procedures & Triggers",
      weekRange: "Week 7",
      description:
        "Transactions and concurrency. Cover the ACID guarantees, transaction isolation levels (READ UNCOMMITTED / READ COMMITTED / REPEATABLE READ — MySQL InnoDB default — / SERIALIZABLE), locking (table vs row, shared vs exclusive, InnoDB row locking), deadlock detection and recovery, plus the discipline of writing transactions that don't deadlock under load. Then stored procedures, functions, triggers, events — covered honestly (when they earn their place vs when application code is the right place), with the modern preference for application-level logic over heavy procedure-driven schemas.",
      topics: [
        "ACID guarantees",
        "Isolation levels — Read Uncommitted / Committed / Repeatable Read / Serializable",
        "InnoDB row locking",
        "Deadlock detection",
        "Stored procedures and functions",
        "Triggers — when they earn their place",
        "Events for scheduled work",
      ],
    },
    {
      title: "Replication, Backup, Security & Capstone",
      weekRange: "Week 8 + 1 week capstone",
      description:
        "Production MySQL. Cover replication (asynchronous source-replica, semi-synchronous, group replication / InnoDB Cluster for HA), GTID-based replication for clean failover, plus the backup story (mysqldump, xtrabackup for hot backups, MySQL Enterprise Backup, plus the cloud-managed snapshot patterns). Security baseline — user / privilege / role management, password authentication (caching_sha2_password is the 8.0+ default), SSL / TLS encryption, plus the GDPR / DPDP-aware patterns (PII column encryption, audit logging). Capstone (see Capstone Projects).",
      topics: [
        "Replication — async / semi-sync / group",
        "GTID-based replication",
        "InnoDB Cluster",
        "Backup — mysqldump / xtrabackup",
        "User / privilege / role management",
        "SSL / TLS encryption",
        "PII column encryption",
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
      title: "E-Commerce Schema with Performance-Tuned Queries",
      description:
        "Design and implement a complete e-commerce schema (users, products, categories, orders, order_items, payments, addresses, reviews) with proper normalisation, indexes, foreign-key cascades, and JSON columns where they earn their place. Load 10M+ rows of synthetic data, write 20 analyst queries with window functions / CTEs, optimise each via EXPLAIN, and document before / after performance numbers. Outcome: a public GitHub repository with the schema, sample data, and optimisation report.",
      technologies: [
        "MySQL 8.4 LTS",
        "Modern SQL — window functions, CTEs, JSON",
        "EXPLAIN-plan optimisation",
        "10M+ row dataset",
        "GitHub repo with documentation",
      ],
    },
    {
      title: "Replicated Production-Style MySQL Setup with Backup",
      description:
        "A production-style MySQL setup — primary + replica via GTID-based replication, automated mysqldump backups via cron, point-in-time recovery testing (binary log replay), plus a small script that simulates failover. Demonstrates the operational discipline Pune DBA panels test for.",
      technologies: [
        "MySQL 8.4 LTS",
        "GTID replication",
        "mysqldump + binary log",
        "Failover scripting",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Ankita Hartale (Java Full Stack & Database Trainer, currently at Wipro, expert in DBMS, MySQL, PostgreSQL, Oracle, MongoDB) and Suraj Kudache (.NET Full Stack Trainer, Capgemini, expert in SQL Server). Both personally take sessions in every batch.",

  careerOutcomes: {
    paragraphs: [
      "MySQL fluency is foundational to most Pune backend / full-stack / data-analyst roles — Indeed Pune lists 600+ active openings explicitly requiring MySQL, plus ~1,000 backend / full-stack roles where MySQL is listed alongside other databases. The biggest employers are the Pune e-commerce / digital-agency scene, BFSI legacy systems, plus most LAMP-stack startups. Database Administrator titles at the senior level pay well — Senior DBAs in Pune earn ₹15–25 lakh.",
      "What pulls a MySQL developer / DBA above the median band: depth on EXPLAIN plans and query optimisation, demonstrable schema-design experience with at least one 10M+ row dataset, replication / backup / recovery experience, plus security-baseline awareness. Our capstone projects are designed exactly around these signals.",
      "Senior MySQL DBA bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures.",
    ],
    salaryBands: [
      {
        role: "MySQL Developer / DBA (Pune)",
        band: "₹6,12,000 per year average",
        source: { label: "Indeed Pune (MySQL Developer)", url: "https://in.indeed.com/career/mysql-developer/salaries/Pune--Maharashtra" },
      },
      {
        role: "Junior Database Administrator (Pune entry, <2 years)",
        band: "₹3,50,000 – ₹6,00,000 per year",
        source: { label: "AmbitionBox Pune Database Administrator", url: "https://www.ambitionbox.com/profile/database-administrator-salary-in-pune" },
      },
      {
        role: "Mid-level DBA (Pune, 3–5 years)",
        band: "₹9,00,000 – ₹15,00,000 per year",
        source: { label: "Glassdoor Pune Database Administrator", url: "https://www.glassdoor.co.in/Salaries/pune-database-administrator-salary-SRCH_IL.0,4_IM1072_KO5,27.htm" },
      },
      {
        role: "Senior DBA (Pune, 5–8 years)",
        band: "₹15,00,000 – ₹25,00,000 per year",
        source: { label: "Glassdoor Pune Senior DBA", url: "https://www.glassdoor.co.in/Salaries/pune-senior-dba-salary-SRCH_IL.0,4_IM1072_KO5,15.htm" },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
      "Wipro",
      "Atos / Eviden",
      "Mphasis",
      "Synechron",
      "Pune-based digital agencies (LAMP / WordPress)",
      "Pune-based e-commerce companies",
      "Pune-based BFSI legacy systems",
    ],
    rolesAfterCourse: [
      "MySQL Developer",
      "Junior Database Administrator",
      "Backend Developer (with MySQL depth)",
      "Data Analyst (SQL-heavy)",
      "Junior DBA",
    ],
  },

  modesAndDuration: {
    duration: "8 weeks of structured curriculum plus 1 week of capstone (~2 months total)",
    classroom: { location: "Archer Infotech, Kothrud, Pune", timing: ["Morning batch — 10:00 to 13:00", "Evening batch — 18:00 to 21:00"] },
    online: {
      timing: ["Same hours as classroom batches", "Recordings available for review"],
      tools: ["Zoom for live sessions", "MySQL Workbench / DBeaver", "GitHub for capstone", "Slack / WhatsApp for async Q&A"],
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
      "Placement support starts from week 6. By the end of the curriculum your resume highlights real EXPLAIN-plan optimisation work, your GitHub has at least one schema-design and one replication / backup project, and you have completed at least two mock technical interviews.",
      "We say placement support, not placement guarantee. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions.",
    ],
    process: [
      "Week 6 — resume + LinkedIn rewrite",
      "Week 7 — GitHub portfolio cleanup",
      "Weeks 8–9 — two rounds of mock technical interviews",
      "Week 9 — HR mock and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network",
      "Up to 6 months of continued support",
      "Free re-entry to future batch interview-prep sessions",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
      "Wipro",
      "Atos / Eviden",
      "Mphasis",
      "Synechron",
    ],
  },

  comparison: {
    intro: "We compare ourselves against typical Pune MySQL training institutes on factual rows only.",
    rows: [
      { feature: "Trainers named with photos and LinkedIn", archer: "Yes — Ankita Hartale and Suraj Kudache", typical: "No — generic branding" },
      { feature: "MySQL version covered", archer: "MySQL 8.4 LTS — modern features", typical: "MySQL 5.7 — pre-2018 features" },
      { feature: "Modern SQL features", archer: "Window functions, CTEs, JSON, lateral joins", typical: "Basic SELECT / JOIN only" },
      { feature: "EXPLAIN-plan depth", archer: "Full week — type column, optimiser trace, real 10M-row dataset", typical: "Theory only" },
      { feature: "Replication / backup", archer: "GTID replication + mysqldump / xtrabackup hands-on", typical: "Skipped" },
      { feature: "Public GitHub portfolio output", archer: "Yes — schema + EXPLAIN-plan optimisation report", typical: "Local code on hard drive" },
      { feature: "Salary data shown", archer: "Cited from Indeed Pune + AmbitionBox + Glassdoor", typical: "Single number with no source" },
      { feature: "Placement support", archer: "6 months, with free re-entry", typical: "1–3 months or vague" },
      { feature: "Batch size cap", archer: "15 students", typical: "25–40 students" },
    ],
    closing: "Compare with whoever you are considering.",
  },

  versusAlternative: {
    heading: "MySQL vs PostgreSQL vs Oracle — Which Should You Pick?",
    paragraphs: [
      "MySQL for the LAMP-stack / WordPress / digital-agency / smaller-startup ecosystem — broadest hiring at the entry / mid level. PostgreSQL for modern Pune product engineering, fintech, and analytics-engineering teams (the more powerful database for new projects). Oracle for Pune BFSI and enterprise — highest-paid DBA specialisation but smallest hiring pool.",
      "Pune market reality: MySQL has ~600 explicit listings, Postgres ~700, Oracle ~400 (with Oracle paying highest per role). Many of our students learn MySQL first (broadest entry), then add Postgres or Oracle for senior specialisation.",
      "Honest recommendation: MySQL for broadest entry-level hiring, especially LAMP / WordPress / digital-agency / smaller-startup track. PostgreSQL if your goal is modern product engineering / fintech / analytics. Oracle for BFSI DBA premium specialisation.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: basic computer use, willingness to commit 6–8 hours per week of practice. No prior SQL or programming experience required.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation (MySQL 8.4 install scripts)",
      "Show up to day one with a laptop running 64-bit OS",
    ],
  },

  faqs: [
    {
      question: "How long does MySQL training in Pune take at Archer Infotech?",
      answer: "Approximately 2 months — 8 weeks plus 1 week of capstone. Weekend batch ~3.5 months.",
    },
    {
      question: "Is MySQL still relevant in 2026?",
      answer:
        "Yes — Indeed Pune lists 600+ MySQL openings explicitly, plus ~1,000 backend / full-stack roles where MySQL appears alongside Postgres / Mongo. The LAMP / WordPress / digital-agency / e-commerce ecosystem runs heavily on MySQL.",
    },
    {
      question: "MySQL or PostgreSQL?",
      answer:
        "MySQL for broadest entry-level / LAMP / WordPress hiring. Postgres for modern product engineering / fintech / analytics.",
    },
    {
      question: "What is the salary of a MySQL Developer / DBA in Pune?",
      answer:
        "Indeed Pune ₹6.12 lakh average. Junior DBA ₹3.5–6 lakh per AmbitionBox. Mid-level ₹9–15 lakh. Senior DBA ₹15–25 lakh.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — two capstone projects: (1) e-commerce schema with performance-tuned queries on 10M+ row dataset, (2) replicated production-style MySQL setup with backup.",
    },
    {
      question: "Are weekend MySQL classes available in Pune?",
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
      question: "Are the named trainers actually teaching?",
      answer: "Ankita Hartale and Suraj Kudache personally lead every session.",
    },
  ],

  finalCta: {
    heading: "Ready to start MySQL training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4 weeks. Reach out via the enquiry form or call us — Ankita and Suraj are happy to spend 30 minutes telling you whether the course fits your goal.",
  },
};
