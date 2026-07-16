import type { CourseRichContent } from "./types";

export const oracleDatabaseTrainingInPune: CourseRichContent = {
  intro:
    "Oracle Database remains the dominant DBMS in Pune BFSI, large-enterprise, and Capital Markets workloads — Bajaj Finserv, Cognizant Pune Capital Markets, Mastercard Pune Tech Hub, ICICI / HDFC / Axis Pune captives, plus most Pune-based BFSI / financial-services back-office systems run on Oracle. Archer Infotech's Oracle Database training in Pune is the focused track for engineers and DBAs targeting BFSI and large-enterprise premium roles where Oracle is the institutional default — distinct from our broader MySQL / PostgreSQL courses. The track teaches Oracle 19c / 21c / 23ai (long-term-support and innovation releases), the SQL dialect with Oracle-specific features (analytical functions, MERGE, MODEL clause), PL/SQL programming at depth (procedures, functions, packages, triggers, exception handling), Oracle administration (architecture, backup / recovery via RMAN, performance tuning, AWR), plus Oracle Cloud Infrastructure database service. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Oracle Database in 2026",
    paragraphs: [
      "Oracle Database is the highest-paid database specialisation in Pune — Indeed Pune lists 400+ active openings explicitly requiring Oracle / PL-SQL, with senior Oracle DBA salaries running ₹18–32 lakh — roughly 1.5× equivalent-experience MySQL / Postgres roles because Oracle talent is genuinely scarce and the deployments are mission-critical. The biggest employers are Bajaj Finserv (significant Oracle footprint), Cognizant Pune Capital Markets, Mastercard Pune Tech Hub, plus the Pune captives of ICICI / HDFC / Axis Bank, plus the IT services majors with Oracle practices serving global BFSI / enterprise clients (TCS, Infosys, Wipro, Capgemini, Cognizant).",
      "What changed in 2026: Oracle 23ai (released 2024) shipped vector-data type and AI Vector Search built-in (Oracle's RAG-ready story), JSON Relational Duality Views (querying JSON as relational and vice versa), plus performance improvements. Oracle 19c remains the long-term-support release that most Pune BFSI runs in production. The Multitenant architecture (CDB / PDB) is now the default deployment model. Oracle Cloud Infrastructure (OCI) Database service has matured as the managed-cloud variant; Pune BFSI is increasingly evaluating it for new workloads.",
      "What this means for hiring: 2026 Pune Oracle JDs expect SQL fluency on the Oracle dialect, PL/SQL programming at depth, basic DBA understanding (architecture, backup / recovery, tuning), plus Multitenant CDB / PDB awareness. Senior DBA roles add RMAN backup / recovery in depth, performance tuning via AWR / ASH / SQL Trace, replication via Data Guard, plus the Real Application Clusters (RAC) basics.",
    ],
    keyPoints: [
      "400+ active Pune openings explicitly require Oracle / PL-SQL (May 2026)",
      "Senior Oracle DBA salaries ~1.5× equivalent MySQL / Postgres roles",
      "Oracle 19c LTS — production default at Pune BFSI",
      "Oracle 23ai — Vector Search + JSON Duality (the modern release)",
      "Strong Pune BFSI / Capital Markets / large-enterprise hiring",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student targeting Pune BFSI Database Administrator / PL-SQL Developer roles",
      "Working developer in any database wanting to add Oracle for the BFSI / Capital Markets premium",
      "Working MySQL / Postgres / SQL Server DBA wanting to add Oracle for the wider Pune BFSI market",
      "Working PL/SQL Developer wanting to deepen DBA skills",
      "Career restarter targeting Oracle DBA / PL-SQL Developer roles in Pune BFSI",
      "Working professional preparing for Oracle Certified Associate / Professional certifications",
    ],
    notForYou: [
      "If your goal is Pune SaaS / fintech / startup roles — those overwhelmingly use MySQL / Postgres / Mongo, not Oracle",
      "If you want NoSQL / document database — pick our MongoDB course",
      "If you want modern product engineering with relational + JSONB — pick our PostgreSQL course",
      "If you cannot put in 8–10 hours per week of practice outside class — Oracle has the steepest learning curve of the database tracks",
      "If you have 4+ years of production Oracle DBA experience — you'll be under-stretched; talk to us about advanced specialisations (RAC, Exadata, Data Guard depth)",
    ],
  },

  curriculum: [
    {
      title: "Oracle Database Foundations & SQL",
      weekRange: "Weeks 1–2",
      description:
        "Oracle from first principles. Cover Oracle 19c LTS / 21c installation (Oracle XE for free local development, OCI free-tier Always Free Autonomous Database for cloud), SQL Developer + SQLcl + DBeaver as GUI options, plus the Oracle SQL dialect at depth — DDL with Oracle data types (NUMBER, VARCHAR2, CHAR, CLOB, BLOB, DATE, TIMESTAMP, INTERVAL), DML, the dual table convention, sequences and identity columns, plus the standard SELECT clauses. Note Oracle-specific SQL features (DUAL, ROWNUM, ROWID, sequences vs identity).",
      topics: [
        "Oracle 19c / 21c / 23ai install (XE + OCI Always Free)",
        "SQL Developer + SQLcl + DBeaver",
        "Oracle data types in depth",
        "DDL with Oracle conventions",
        "DUAL, ROWNUM, ROWID",
        "Sequences vs identity columns",
        "Constraints (PK / FK / UNIQUE / CHECK / NOT NULL)",
      ],
    },
    {
      title: "Joins, Subqueries & Oracle SQL Features",
      weekRange: "Week 3",
      description:
        "Modern Oracle SQL. JOINs in Oracle (the modern ANSI syntax preferred over the legacy +-operator), subqueries, MERGE statement (Oracle's UPSERT — the 'into one statement' replacement for if-exists-then-update-else-insert), analytical functions (ROW_NUMBER, RANK, LAG, LEAD, plus Oracle's distinctive ones — KEEP, FIRST_VALUE / LAST_VALUE, PERCENTILE_CONT), GROUPING SETS / CUBE / ROLLUP for analytics, plus the MODEL clause (Oracle's distinctive feature for spreadsheet-style calculations on rows).",
      topics: [
        "Modern ANSI JOIN syntax",
        "Subqueries — correlated, scalar, inline view",
        "MERGE (UPSERT)",
        "Analytical functions",
        "KEEP / FIRST_VALUE / LAST_VALUE",
        "GROUPING SETS / CUBE / ROLLUP",
        "MODEL clause",
      ],
    },
    {
      title: "PL/SQL Programming — Procedures, Functions, Packages",
      weekRange: "Weeks 4–5",
      description:
        "PL/SQL is the differentiator that defines senior Oracle careers. Cover the PL/SQL block structure, variables and types (including %TYPE and %ROWTYPE for type-from-table-column inheritance), control flow (IF / CASE / LOOP / WHILE / FOR), cursors (explicit and implicit, the SELECT INTO pattern), exception handling (named and unnamed exceptions, RAISE_APPLICATION_ERROR), procedures, functions, and packages (the Oracle modular-code unit). Plus the discipline of writing PL/SQL that survives schema evolution and concurrent execution.",
      topics: [
        "PL/SQL block structure",
        "Variables, %TYPE, %ROWTYPE",
        "Control flow",
        "Cursors — explicit and implicit",
        "Exception handling",
        "Procedures and functions",
        "Packages — specification + body",
        "PRAGMA AUTONOMOUS_TRANSACTION",
      ],
    },
    {
      title: "Triggers, Bulk Operations & Performance Patterns",
      weekRange: "Week 6",
      description:
        "Triggers (BEFORE / AFTER, ROW vs STATEMENT level, INSTEAD OF for views, COMPOUND triggers for multi-event handling). Bulk operations — BULK COLLECT INTO and FORALL (the Oracle pattern for processing 100K+ rows efficiently in PL/SQL), pipelined functions for streaming results. Performance patterns — bind variables (for SQL plan caching — the topic every Oracle interview tests for), the discipline of avoiding row-by-row processing in PL/SQL, plus the AUTONOMOUS_TRANSACTION pragma for cross-transaction logging.",
      topics: [
        "Triggers — BEFORE / AFTER / INSTEAD OF / COMPOUND",
        "BULK COLLECT INTO",
        "FORALL for bulk DML",
        "Pipelined table functions",
        "Bind variables and SQL plan caching",
        "Avoiding row-by-row processing",
      ],
    },
    {
      title: "Oracle Architecture & Multitenant",
      weekRange: "Week 7",
      description:
        "Oracle architecture for the DBA path. Cover the Oracle instance (SGA — System Global Area, including buffer cache, shared pool, redo log buffer; PGA — Program Global Area; background processes — DBWn, LGWR, CKPT, SMON, PMON, ARCn), the database (control files, data files, redo log files, archive logs), tablespaces and segments, the buffer cache and the LRU algorithm, plus the Multitenant architecture (CDB — Container Database; PDB — Pluggable Database) which is now the default deployment model.",
      topics: [
        "SGA components — buffer cache, shared pool, redo buffer",
        "PGA",
        "Background processes — DBWn, LGWR, CKPT, SMON, PMON, ARCn",
        "Control files, data files, redo logs, archive logs",
        "Tablespaces and segments",
        "Multitenant — CDB / PDB",
      ],
    },
    {
      title: "Backup / Recovery via RMAN, Performance Tuning",
      weekRange: "Weeks 8–9",
      description:
        "Backup / recovery — RMAN (Recovery Manager) at the level a Pune BFSI DBA actually uses it: full backup, incremental backup, recovery scenarios (incomplete recovery, point-in-time recovery, tablespace-level), the recovery catalog. Plus Data Pump (expdp / impdp) for logical export / import. Performance tuning — AWR (Automatic Workload Repository) reports, ASH (Active Session History), SQL Trace, the SQL Tuning Advisor, plus the discipline of identifying the top SQL by elapsed-time / CPU / I/O.",
      topics: [
        "RMAN — full and incremental backup",
        "Recovery scenarios — incomplete, PIT, tablespace",
        "Recovery catalog",
        "Data Pump (expdp / impdp)",
        "AWR reports",
        "ASH",
        "SQL Trace",
        "SQL Tuning Advisor",
      ],
    },
    {
      title: "Replication, Security & Capstone",
      weekRange: "Weeks 10–11 + 1 week placement prep",
      description:
        "Data Guard for replication / disaster-recovery (physical and logical standby), GoldenGate overview for cross-platform replication, Real Application Clusters (RAC) primer for HA. Security baseline — roles and privileges, profiles, Virtual Private Database (VPD) for row-level security, Transparent Data Encryption (TDE), plus the auditing patterns required by RBI / SEBI / DPDP for BFSI workloads. Capstone (see Capstone Projects). Mock interviews calibrated for Pune BFSI Oracle DBA / PL-SQL Developer panels.",
      topics: [
        "Data Guard — physical and logical standby",
        "GoldenGate overview",
        "RAC primer",
        "Roles, privileges, profiles",
        "Virtual Private Database (VPD)",
        "Transparent Data Encryption (TDE)",
        "Audit patterns for BFSI",
        "Capstone implementation",
        "Mock interviews — Oracle-specific rounds",
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
      title: "BFSI-Style Schema with Comprehensive PL/SQL Layer",
      description:
        "A complete BFSI-style schema (banking, insurance, or capital-markets transactions) with full PL/SQL business logic — packages with procedures and functions, triggers for audit logging, bulk-operations for batch processing, MERGE for upserts, plus 20+ analytical queries using window functions and the MODEL clause. Includes 10M+ rows of synthetic data and AWR-style performance analysis. Outcome: a public GitHub repository with the complete schema and PL/SQL code.",
      technologies: [
        "Oracle 19c LTS or 21c",
        "PL/SQL packages, procedures, functions",
        "Triggers and bulk operations",
        "MERGE and analytical functions",
        "10M+ row synthetic dataset",
        "Performance analysis report",
      ],
    },
    {
      title: "RMAN Backup / Recovery Scenarios",
      description:
        "A documented RMAN backup / recovery exercise — full + incremental backups, then four recovery scenarios (loss of data file, loss of controlfile, point-in-time recovery, tablespace point-in-time recovery). Each scenario walked through from break-the-database to recovered-and-verified. Demonstrates the operational discipline Pune BFSI DBA panels test for.",
      technologies: [
        "Oracle 19c LTS",
        "RMAN — full + incremental",
        "Recovery scenarios",
        "Documented runbooks",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Ankita Hartale (Java Full Stack & Database Trainer, currently at Wipro, expert in Oracle / MySQL / PostgreSQL / MongoDB). Ankita personally leads every session of every batch.",

  careerOutcomes: {
    paragraphs: [
      "Oracle Database is the highest-paid database specialisation in Pune in 2026 — Indeed Pune lists 400+ active openings explicitly requiring Oracle / PL-SQL, with senior Oracle DBA salaries running ~1.5× equivalent-experience MySQL / Postgres roles. The biggest Pune employers are Bajaj Finserv, Cognizant Pune Capital Markets, Mastercard Pune Tech Hub, the Pune captives of ICICI / HDFC / Axis Bank, plus the IT services majors serving global BFSI clients (TCS, Infosys, Wipro, Cognizant, Capgemini).",
      "What pulls an Oracle DBA / PL-SQL Developer above the median band: PL/SQL depth (packages, bulk operations, performance patterns), demonstrable RMAN backup / recovery experience, AWR-driven performance tuning, plus one specialisation (Data Guard, RAC, or 23ai vector-search). Our capstone projects are designed exactly around these signals.",
      "Senior Oracle DBA bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr.",
    ],
    salaryBands: [
      {
        role: "Oracle DBA / PL-SQL Developer (Pune)",
        band: "₹8,40,000 per year average",
        source: { label: "Indeed Pune (Oracle DBA)", url: "https://in.indeed.com/career/oracle-dba/salaries/Pune--Maharashtra" },
      },
      {
        role: "Junior Oracle DBA / PL-SQL Developer (Pune entry, <2 years)",
        band: "₹4,50,000 – ₹8,00,000 per year",
        source: { label: "AmbitionBox Pune Oracle DBA", url: "https://www.ambitionbox.com/profile/oracle-dba-salary-in-pune" },
      },
      {
        role: "Mid-level Oracle DBA (Pune, 3–5 years)",
        band: "₹11,00,000 – ₹18,00,000 per year",
        source: { label: "Glassdoor Pune Oracle DBA", url: "https://www.glassdoor.co.in/Salaries/pune-oracle-dba-salary-SRCH_IL.0,4_IM1072_KO5,15.htm" },
      },
      {
        role: "Senior Oracle DBA (Pune, 5–8 years)",
        band: "₹18,00,000 – ₹32,00,000 per year",
        source: { label: "Glassdoor Pune Senior Oracle DBA", url: "https://www.glassdoor.co.in/Salaries/pune-senior-oracle-dba-salary-SRCH_IL.0,4_IM1072_KO5,22.htm" },
      },
      {
        role: "Oracle Architect / Lead DBA (national, 8+ years)",
        band: "₹30,00,000 – ₹55,00,000 per year",
        source: { label: "6figr India Oracle Architect (Pune ±10%)", url: "https://6figr.com/in/salary/oracle-architect--t" },
      },
    ],
    hiringCompanies: [
      "Bajaj Finserv",
      "Cognizant Pune Capital Markets",
      "Mastercard Pune Tech Hub",
      "ICICI Bank (Pune captives)",
      "HDFC Bank (Pune captives)",
      "Axis Bank (Pune captives)",
      "Synechron",
      "TCS",
      "Infosys",
      "Wipro",
      "Capgemini",
      "Mphasis",
      "Atos / Eviden",
      "Persistent Systems (legacy systems)",
    ],
    rolesAfterCourse: [
      "Oracle DBA",
      "PL-SQL Developer",
      "Database Administrator (Oracle-specialist)",
      "BFSI Backend Developer (Oracle-heavy)",
      "Junior Oracle Architect",
    ],
  },

  modesAndDuration: {
    duration: "11 weeks of structured curriculum plus 1 week of capstone (~3 months total)",
    classroom: { location: "Archer Infotech, Kothrud, Pune", timing: ["Morning batch — 10:00 to 13:00", "Evening batch — 18:00 to 21:00"] },
    online: {
      timing: ["Same hours as classroom batches", "Recordings available for review"],
      tools: ["Zoom for live sessions", "Oracle XE locally + OCI Always Free Autonomous Database", "SQL Developer + SQLcl + DBeaver", "GitHub for capstone", "Slack / WhatsApp for async Q&A"],
    },
    weekend: { timing: ["Saturday + Sunday, 09:00 to 13:00"], durationNote: "Stretches over ~5 months instead of 3." },
    batchPolicy: "Maximum 15 students per batch.",
  },

  fees: {
    note: "Course fees range ₹20,000 – ₹90,000 depending on mode and concession. Oracle XE and OCI Always Free Autonomous Database are free for lab work.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 9. By the end of the curriculum your resume highlights real PL/SQL packages and RMAN backup / recovery work, your GitHub has at least two production-style repositories, and you have completed at least three mock technical interviews.",
      "We say placement support, not placement guarantee. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions.",
    ],
    process: [
      "Week 9 — resume + LinkedIn rewrite for Oracle DBA / PL-SQL JDs",
      "Week 10 — GitHub portfolio cleanup, performance reports",
      "Weeks 11–12 — three rounds of mock technical interviews",
      "Week 12 — HR mock and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies (with extra emphasis on Pune BFSI / Capital Markets)",
      "Up to 6 months of continued support",
      "Free re-entry to future batch interview-prep sessions",
    ],
    partnerCompanies: [
      "Bajaj Finserv",
      "Cognizant Pune Capital Markets",
      "Mastercard Pune Tech Hub",
      "Synechron",
      "TCS",
      "Infosys",
      "Wipro",
      "Capgemini",
      "Mphasis",
      "Atos / Eviden",
    ],
  },

  comparison: {
    intro: "We compare ourselves against typical Pune Oracle Database training institutes on factual rows only.",
    rows: [
      { feature: "Trainer named with photo and LinkedIn", archer: "Yes — Ankita Hartale", typical: "No — generic branding" },
      { feature: "Oracle version covered", archer: "Oracle 19c LTS + 21c + 23ai (Vector Search)", typical: "Oracle 11g / 12c only" },
      { feature: "PL/SQL depth", archer: "Packages, BULK COLLECT, FORALL, pipelined functions, triggers — 2 weeks", typical: "Basic procedures / functions only" },
      { feature: "RMAN backup / recovery", archer: "Full + incremental + 4 recovery scenarios hands-on", typical: "Theory only" },
      { feature: "Performance tuning", archer: "AWR + ASH + SQL Trace + SQL Tuning Advisor", typical: "Skipped" },
      { feature: "Multitenant CDB / PDB", archer: "Yes — covered", typical: "Not covered (still teaching pre-12c architecture)" },
      { feature: "Public GitHub portfolio output", archer: "Yes — schema + PL/SQL + RMAN runbooks", typical: "Local code on hard drive" },
      { feature: "Salary data shown", archer: "Cited from Indeed Pune + AmbitionBox + Glassdoor + 6figr", typical: "Single number with no source" },
      { feature: "Placement support", archer: "6 months, with free re-entry", typical: "1–3 months or vague" },
      { feature: "Batch size cap", archer: "15 students", typical: "25–40 students" },
    ],
    closing: "Compare with whoever you are considering. The right test is whether you can see actual student PL/SQL code before you pay.",
  },

  versusAlternative: {
    heading: "Oracle vs PostgreSQL / MySQL — Which Should You Pick?",
    paragraphs: [
      "Oracle for Pune BFSI / Capital Markets / large-enterprise premium — highest-paid database specialisation. PostgreSQL for modern Pune product engineering / fintech / SaaS / analytics. MySQL for LAMP / WordPress / digital-agency / smaller-startup hiring.",
      "Pune market reality: Oracle ~400 explicit listings (highest pay per role); Postgres ~700; MySQL ~600. Oracle DBAs earn 1.5× equivalent-experience Postgres / MySQL DBAs because the supply is genuinely scarce.",
      "Honest recommendation: Oracle if you specifically target Pune BFSI / Capital Markets DBA roles. Postgres for modern product engineering. MySQL for broader entry-level reach.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: basic computer use, basic SQL helpful but not required (we cover SQL from scratch), willingness to commit 8–10 hours per week of practice. We expect commitment because Oracle has the steepest learning curve of our database tracks.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation (Oracle XE install + OCI Always Free signup)",
      "Show up to day one with a laptop running 64-bit OS, 16GB RAM (recommended)",
    ],
  },

  faqs: [
    {
      question: "How long does Oracle Database training in Pune take at Archer Infotech?",
      answer: "Approximately 3 months — 11 weeks plus 1 week of capstone. Weekend batch ~5 months.",
    },
    {
      question: "What is the salary of an Oracle DBA in Pune?",
      answer:
        "Indeed Pune ₹8.40 lakh average (May 2026) — highest of the database specialisations. Junior ₹4.5–8 lakh per AmbitionBox. Mid-level ₹11–18 lakh per Glassdoor. Senior ₹18–32 lakh. Oracle Architect / Lead DBA ₹30–55 lakh nationally with Pune ±10%.",
    },
    {
      question: "Oracle, PostgreSQL, or MySQL?",
      answer:
        "Oracle for Pune BFSI / Capital Markets premium DBA. Postgres for modern product engineering. MySQL for LAMP / WordPress / digital-agency. Oracle pays 1.5× equivalent-experience Postgres / MySQL roles.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — two capstone projects: (1) BFSI-style schema with comprehensive PL/SQL layer on 10M+ row dataset, (2) RMAN backup / recovery exercise with documented runbooks for four recovery scenarios.",
    },
    {
      question: "Are weekend Oracle classes available in Pune?",
      answer: "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~5 months instead of 3.",
    },
    {
      question: "What is the fee?",
      answer: "Course fees range ₹20,000 – ₹90,000 depending on mode and concession.",
    },
    {
      question: "Does the course prepare me for Oracle certifications?",
      answer:
        "The curriculum maps to a meaningful subset of OCA / OCP exam topics. We do not run a dedicated certification mock-exam track inside this course; graduates typically take OCA / OCP after the course with focused exam prep.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of placement support, referrals via our alumni network at 12+ partner companies (with extra emphasis on Pune BFSI / Capital Markets), mock interviews.",
    },
    {
      question: "Is the named trainer actually teaching?",
      answer: "Ankita Hartale personally leads every session.",
    },
  ],

  finalCta: {
    heading: "Ready to start Oracle Database training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Ankita is happy to spend 30 minutes telling you whether the course fits your goal.",
  },
};
