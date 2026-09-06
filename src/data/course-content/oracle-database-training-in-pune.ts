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
      title: "Oracle Database Foundations & First Contact",
      weekRange: "Week 1",
      description:
        "What an Oracle database is before any of its vocabulary is used. The relational model, then the terms that trip up newcomers arriving from MySQL or PostgreSQL — an Oracle instance against an Oracle database, a schema that is also a user, and a tablespace that has no equivalent elsewhere.\n\nThe environments are set up together so nobody is blocked later: Oracle Database 23ai Free and 19c Express Edition locally, Oracle in Docker, and an Always Free Autonomous Database on Oracle Cloud Infrastructure, which is how most students will actually practise. SQL Developer, SQLcl and DBeaver are configured, along with connection descriptors, `tnsnames.ora` and easy-connect strings — the source of most first-week failures.",
      topics: [
        "Instance against database, schema against user",
        "Tablespaces, segments, extents and blocks",
        "Oracle 19c, 21c and 23ai — what differs and what matters",
        "Oracle 23ai Free and Express Edition locally",
        "Oracle in Docker and the OCI Always Free Autonomous Database",
        "SQL Developer, SQLcl and DBeaver",
        "Listeners, tnsnames.ora and easy-connect strings",
        "Diagnosing ORA-12154 and the usual connection errors",
      ],
    },
    {
      title: "Core SQL in Oracle",
      weekRange: "Weeks 1–2",
      description:
        "The Oracle SQL dialect, taught in the order the server evaluates a query so that the behaviour of aliases and aggregates stops being arbitrary. `SELECT` with every clause, `DUAL` and why it exists, `ROWNUM` against the modern `FETCH FIRST n ROWS ONLY`, and the single-row functions that appear in every Oracle interview — `NVL`, `NVL2`, `DECODE`, `TO_CHAR`, `TO_DATE` and the format models that go with them.\n\nOracle's treatment of the empty string as `NULL` is given its own time, because it is a genuine dialect difference that silently changes results for anyone arriving from another database. Aggregates, `GROUP BY` and `HAVING`, DML with `RETURNING INTO`, and transaction control with `COMMIT`, `ROLLBACK` and savepoints complete the module.",
      topics: [
        "SELECT clauses in logical evaluation order",
        "DUAL, ROWNUM and FETCH FIRST n ROWS ONLY",
        "NVL, NVL2, COALESCE and DECODE",
        "TO_CHAR, TO_DATE and format models",
        "Empty string as NULL — the Oracle dialect difference",
        "Aggregates, GROUP BY and HAVING",
        "INSERT, UPDATE, DELETE and RETURNING INTO",
        "COMMIT, ROLLBACK, SAVEPOINT and read consistency",
        "Reading ORA- error messages and acting on them",
      ],
    },
    {
      title: "Data Types, Constraints & Schema Objects",
      weekRange: "Week 2",
      description:
        "Choosing types and enforcing rules in a database whose defaults differ from everyone else's. `NUMBER` with precision and scale, `VARCHAR2` against `CHAR` and the byte-versus-character length semantics that break multilingual data, `DATE` which always carries a time, `TIMESTAMP WITH TIME ZONE`, `INTERVAL`, and the large-object types `CLOB` and `BLOB`.\n\nConstraints follow — primary and foreign keys, `UNIQUE`, `CHECK`, `NOT NULL`, deferrable constraints, and the `ON DELETE` actions Oracle does and does not support. Then the schema objects that make up an Oracle application: sequences against identity columns, synonyms both private and public, views and inline views, materialised views with refresh options, and temporary tables. The module closes on the data dictionary — `USER_`, `ALL_` and `DBA_` views — and how to answer questions about a schema by querying it.",
      topics: [
        "NUMBER precision and scale; VARCHAR2 against CHAR",
        "Byte against character length semantics",
        "DATE, TIMESTAMP WITH TIME ZONE and INTERVAL",
        "CLOB, BLOB and large-object handling",
        "Primary, foreign, UNIQUE, CHECK and deferrable constraints",
        "Sequences against identity columns",
        "Synonyms, views, inline views and materialised views",
        "Global and private temporary tables",
        "The data dictionary — USER_, ALL_ and DBA_ views",
      ],
    },
    {
      title: "Joins, Subqueries & Set Operators",
      weekRange: "Week 3",
      description:
        "Combining tables in modern ANSI syntax, with Oracle's legacy `(+)` outer-join operator covered only so that a developer can read the decade-old code they will be handed in a Pune BFSI maintenance role — not so that they write it.\n\nInner, outer, cross and self joins, then subqueries in every position: scalar, `IN` list, inline view, and `WITH` clause. Correlated and uncorrelated subqueries are compared by execution cost rather than by definition, `EXISTS` and `NOT EXISTS` are shown as the correct way to express semi- and anti-joins, and the `NOT IN` trap with a `NULL` in the subquery result is demonstrated because it silently returns nothing and is asked about constantly. `UNION`, `UNION ALL`, `INTERSECT` and `MINUS` close the module.",
      topics: [
        "ANSI join syntax, inner, outer, cross and self joins",
        "Reading legacy (+) outer-join code",
        "Scalar, IN-list and inline-view subqueries",
        "The WITH clause and readable query structure",
        "Correlated against uncorrelated, and what each costs",
        "EXISTS and NOT EXISTS for semi- and anti-joins",
        "The NOT IN with NULL trap",
        "UNION, UNION ALL, INTERSECT and MINUS",
        "Multi-table INSERT and conditional insert-all",
      ],
    },
    {
      title: "Analytic Functions & Advanced SQL",
      weekRange: "Weeks 3–4",
      description:
        "The SQL that keeps reporting work inside the database, and the strongest area of Oracle's dialect. Analytic functions with `OVER`, `PARTITION BY` and windowing clauses — `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `LAG`, `LEAD`, `FIRST_VALUE`, `LAST_VALUE`, running totals and moving averages — followed by the `KEEP DENSE_RANK FIRST` form that Oracle developers use and few others know.\n\n`MERGE` is taught as the single-statement upsert that replaces a check-then-insert race condition. Hierarchical queries with `CONNECT BY`, `LEVEL`, `SYS_CONNECT_BY_PATH` and `START WITH` handle org charts and bills of materials; `PIVOT` and `UNPIVOT` reshape result sets; `GROUPING SETS`, `CUBE` and `ROLLUP` produce multi-level totals in one pass; and regular-expression functions and the `MODEL` clause close the module.",
      topics: [
        "Analytic functions, OVER, PARTITION BY and windows",
        "ROW_NUMBER, RANK, DENSE_RANK and NTILE",
        "LAG, LEAD, FIRST_VALUE and LAST_VALUE",
        "KEEP DENSE_RANK FIRST / LAST",
        "MERGE as a single-statement upsert",
        "Hierarchical queries — CONNECT BY, LEVEL, SYS_CONNECT_BY_PATH",
        "PIVOT and UNPIVOT",
        "GROUPING SETS, CUBE and ROLLUP",
        "REGEXP functions and the MODEL clause",
      ],
    },
    {
      title: "PL/SQL Fundamentals — Blocks, Cursors & Exceptions",
      weekRange: "Weeks 4–5",
      description:
        "PL/SQL is what an Oracle career is actually built on, and Pune's BFSI and ERP employers hire for it specifically. The anonymous block and its declare, begin and exception sections; variables and constants; `%TYPE` and `%ROWTYPE` so that a declaration follows the table it reads from; records and collections including associative arrays, nested tables and varrays.\n\nControl flow, then cursors in depth — implicit and explicit, the cursor `FOR` loop that most working code uses, cursor attributes, parameterised cursors and `FOR UPDATE` cursors. Exception handling is treated as a design skill rather than a syntax lesson: predefined and user-defined exceptions, `SQLCODE` and `SQLERRM`, `RAISE_APPLICATION_ERROR`, `PRAGMA EXCEPTION_INIT`, and the failure mode that hides more Oracle bugs than any other — the empty `WHEN OTHERS THEN NULL` handler.",
      topics: [
        "Block structure — declare, begin, exception",
        "Variables, constants, %TYPE and %ROWTYPE",
        "Records, associative arrays, nested tables and varrays",
        "IF, CASE, LOOP, WHILE and FOR",
        "Implicit and explicit cursors, and cursor FOR loops",
        "Cursor attributes, parameters and FOR UPDATE",
        "Predefined and user-defined exceptions",
        "SQLCODE, SQLERRM and RAISE_APPLICATION_ERROR",
        "Why WHEN OTHERS THEN NULL hides real bugs",
      ],
    },
    {
      title: "Procedures, Functions & Packages",
      weekRange: "Week 5",
      description:
        "Structuring PL/SQL so that it can be maintained by somebody else. Stored procedures and functions, `IN`, `OUT` and `IN OUT` parameters, default values and named notation, overloading, and the difference between a function used in SQL and one used only in PL/SQL — including the purity rules and the `DETERMINISTIC` and `RESULT_CACHE` hints.\n\nPackages are then presented as the unit Oracle development is genuinely organised around: specification against body, private procedures, package-level state and its session lifetime, initialisation blocks, and the reduced recompilation cascade that makes packages the right default. Dependency and invalidation behaviour, `SHOW ERRORS` and `USER_ERRORS`, `DBMS_OUTPUT` and the `DBMS_` supplied packages worth knowing round out the module.",
      topics: [
        "Procedures, functions and parameter modes",
        "Default values, named notation and overloading",
        "Functions in SQL, purity and DETERMINISTIC",
        "RESULT_CACHE and function result caching",
        "Package specification against body",
        "Package state, session lifetime and initialisation",
        "Dependencies, invalidation and recompilation",
        "SHOW ERRORS, USER_ERRORS and compilation warnings",
        "DBMS_OUTPUT and the supplied DBMS_ packages",
      ],
    },
    {
      title: "Triggers, Bulk Processing & Dynamic SQL",
      weekRange: "Week 6",
      description:
        "The advanced PL/SQL that separates a maintainer from an author. Triggers — `BEFORE` and `AFTER`, row against statement level, `INSTEAD OF` on views, compound triggers, and the mutating-table error explained by its cause rather than worked around by superstition. Autonomous transactions for logging that must survive a rollback.\n\nBulk processing is the performance half of the module and is the difference between a nightly job that finishes and one that does not: the context switch between the PL/SQL and SQL engines, `BULK COLLECT` with `LIMIT`, `FORALL` with `SAVE EXCEPTIONS`, and pipelined table functions for streaming results. Dynamic SQL closes it — `EXECUTE IMMEDIATE`, `DBMS_SQL`, bind variables as both a performance and an injection-prevention measure, and `DBMS_ASSERT` for identifiers that cannot be bound.",
      topics: [
        "Triggers — BEFORE, AFTER, row, statement and INSTEAD OF",
        "Compound triggers and the mutating-table error",
        "Autonomous transactions for durable logging",
        "The PL/SQL to SQL context switch and its cost",
        "BULK COLLECT with LIMIT",
        "FORALL and SAVE EXCEPTIONS",
        "Pipelined table functions",
        "EXECUTE IMMEDIATE, DBMS_SQL and bind variables",
        "PL/SQL injection and DBMS_ASSERT",
      ],
    },
    {
      title: "Oracle Architecture — Memory, Processes & Storage",
      weekRange: "Weeks 6–7",
      description:
        "The internals a DBA interview will test and a developer benefits from. The System Global Area and its components — buffer cache, shared pool with the library cache and data dictionary cache, redo log buffer and large pool — and the Program Global Area with the sort and hash areas that decide whether an operation stays in memory.\n\nThe background processes are then traced through an actual commit: `DBWn`, `LGWR`, `CKPT`, `SMON`, `PMON` and `ARCn`, and what each guarantees. Physical storage covers control files, data files, redo log groups and members, archive logs, and the tablespace, segment, extent and block hierarchy, with `SYSTEM`, `SYSAUX`, `UNDO` and `TEMP` explained by role. Automatic Storage Management and the startup and shutdown modes complete the module.",
      topics: [
        "SGA — buffer cache, shared pool, redo buffer, large pool",
        "PGA, sort area and hash area",
        "Background processes — DBWn, LGWR, CKPT, SMON, PMON, ARCn",
        "What actually happens during a COMMIT",
        "Control files, data files, redo logs and archive logs",
        "Tablespaces, segments, extents and blocks",
        "SYSTEM, SYSAUX, UNDO and TEMP tablespaces",
        "Automatic Storage Management",
        "Startup and shutdown modes",
      ],
    },
    {
      title: "Multitenant — CDBs, PDBs & Autonomous Database",
      weekRange: "Week 7",
      description:
        "The deployment model Oracle has standardised on. Container databases and pluggable databases, the root container and the seed, common against local users and roles, and how a session's container determines what it can see — the fact behind a large share of 'the table does not exist' confusion in modern Oracle.\n\nPluggable databases are created, cloned, unplugged, plugged in and relocated in class, including the refreshable clone used for test refreshes. Resource management across containers, backup and recovery implications, and the upgrade path follow. The module closes on Oracle Autonomous Database, which is how a growing share of Pune workloads now run: what it automates, what it does not, and which of the skills in this course still apply when the provider takes the routine work over.",
      topics: [
        "Container and pluggable databases; root and seed",
        "Common against local users and roles",
        "Session containers and why an object seems missing",
        "Creating, cloning and relocating a PDB",
        "Refreshable clones for test refreshes",
        "Resource manager across containers",
        "Backup and recovery in a multitenant database",
        "Autonomous Database — what it automates",
        "Which DBA skills still matter under automation",
      ],
    },
    {
      title: "Indexing, Partitioning & Physical Design",
      weekRange: "Week 8",
      description:
        "Physical design decisions that determine whether a system scales. B-tree indexes and the leftmost-prefix rule, bitmap indexes and why they suit a data warehouse and are dangerous under concurrent DML, function-based indexes, reverse-key indexes, index-organised tables, and composite index ordering driven by the query rather than the table.\n\nPartitioning is Oracle's strongest large-table feature: range, list, hash, composite, interval and reference partitioning; partition pruning at parse and at run time; partition-wise joins; local against global indexes and what each costs at maintenance time; and the exchange-partition trick that loads or archives a hundred million rows as a metadata operation. Compression, `NOLOGGING` bulk loads and direct-path inserts close the module.",
      topics: [
        "B-tree indexes and the leftmost-prefix rule",
        "Bitmap indexes, and why not under concurrent DML",
        "Function-based, reverse-key and index-organised tables",
        "Composite index ordering driven by the query",
        "Range, list, hash, composite and interval partitioning",
        "Partition pruning and partition-wise joins",
        "Local against global indexes",
        "Exchange partition for fast load and archive",
        "Compression, NOLOGGING and direct-path inserts",
      ],
    },
    {
      title: "Performance Tuning — Plans, AWR & SQL Tuning",
      weekRange: "Weeks 8–9",
      description:
        "Finding the slow thing and proving it got faster. Execution plans from `EXPLAIN PLAN`, `DBMS_XPLAN.DISPLAY_CURSOR` and SQL Monitor, read for access paths, join methods and — most importantly — the gap between estimated and actual cardinality, which is where most bad plans begin.\n\nThe optimiser's inputs are then examined: statistics gathering, histograms on skewed columns, adaptive plans, bind-variable peeking and the plan instability it causes, plus SQL Plan Management baselines for pinning a good plan. Diagnostics come from AWR and ADDM reports, Active Session History and the wait-event model that tells you whether a system is waiting on CPU, I/O or a lock. Bind variables and cursor sharing close the module, on a dataset large enough that every improvement is measured.",
      topics: [
        "EXPLAIN PLAN, DBMS_XPLAN.DISPLAY_CURSOR and SQL Monitor",
        "Access paths, join methods and cardinality estimates",
        "Statistics, histograms and skewed columns",
        "Adaptive plans and bind-variable peeking",
        "SQL Plan Management and plan baselines",
        "AWR and ADDM reports",
        "Active Session History and the wait-event model",
        "Bind variables, cursor sharing and library-cache pressure",
        "Optimizer hints, and the discipline of rarely using them",
      ],
    },
    {
      title: "Concurrency, Transactions & Undo",
      weekRange: "Week 9",
      description:
        "Oracle's read-consistency model, which behaves differently from every other database in this category and is examined for that reason. Multiversion read consistency built on undo, statement-level and transaction-level consistency, and the `ORA-01555` snapshot-too-old error explained by its actual cause.\n\nIsolation levels in Oracle — read committed and serializable, and the absence of dirty reads by construction — are demonstrated in two sessions, along with row locks, table locks and lock modes, `SELECT FOR UPDATE` with `NOWAIT` and `SKIP LOCKED`, and deadlock detection with the trace file that follows. Undo and redo are separated clearly, flashback query and flashback table are used to recover from a mistaken update, and optimistic locking patterns for application code close the module.",
      topics: [
        "Multiversion read consistency and undo",
        "Statement-level against transaction-level consistency",
        "ORA-01555 snapshot too old, and its real cause",
        "Read committed and serializable in Oracle",
        "Row locks, table locks and lock modes",
        "SELECT FOR UPDATE with NOWAIT and SKIP LOCKED",
        "Deadlock detection and reading the trace file",
        "Undo against redo — what each is for",
        "Flashback query and flashback table",
      ],
    },
    {
      title: "Backup & Recovery with RMAN and Data Pump",
      weekRange: "Week 10",
      description:
        "The work a Pune BFSI DBA is actually accountable for. ARCHIVELOG mode and why a production database runs in it, then RMAN in depth — full and incremental backups, incrementally updated backups, block change tracking, compression and encryption, the recovery catalog, and retention policies.\n\nRecovery is practised rather than described. Every student performs complete recovery, incomplete point-in-time recovery, tablespace and data-file recovery, and a block-level recovery, then validates each with `RESTORE VALIDATE`. Data Pump covers logical export and import, schema and table-level moves, remapping between schemas and tablespaces, and transportable tablespaces. The module ends on designing a strategy from recovery point and recovery time objectives rather than from habit.",
      topics: [
        "ARCHIVELOG mode and why production requires it",
        "RMAN full, incremental and incrementally updated backups",
        "Block change tracking, compression and encryption",
        "The recovery catalog and retention policies",
        "Complete and point-in-time recovery, performed",
        "Tablespace, data-file and block-level recovery",
        "RESTORE VALIDATE and proving a backup works",
        "Data Pump export, import and remapping",
        "Designing a strategy from RPO and RTO",
      ],
    },
    {
      title: "Security, Auditing & BFSI Compliance",
      weekRange: "Week 10",
      description:
        "Oracle runs the systems that regulators ask about, and its security features exist for that reason. Users, roles and the privilege model; profiles for password policy and resource limits; least privilege applied to an application account; and the definer against invoker rights decision that determines whose privileges a stored procedure runs with.\n\nThen the features that appear in Indian BFSI requirements specifically: Virtual Private Database for row-level security, Oracle Label Security, Data Redaction for masking in query results, Transparent Data Encryption for tablespaces and columns, and unified auditing with policies that survive a privileged user attempting to disable them. The module closes on the obligations behind them — RBI and SEBI expectations, and India's DPDP Act — and on data masking for the non-production copies where most real leaks happen.",
      topics: [
        "Users, roles, system and object privileges",
        "Profiles, password policy and resource limits",
        "Definer against invoker rights",
        "Virtual Private Database for row-level security",
        "Oracle Label Security and Data Redaction",
        "Transparent Data Encryption for tablespaces and columns",
        "Unified auditing and tamper-evident policies",
        "RBI, SEBI and DPDP obligations in practice",
        "Masking non-production copies",
      ],
    },
    {
      title: "High Availability — Data Guard, RAC & GoldenGate",
      weekRange: "Week 11",
      description:
        "Keeping an Oracle system available when a machine, a data centre or a region is lost. Data Guard first, at working depth: physical and logical standbys, the three protection modes and what each trades between data loss and latency, redo transport and apply, switchover against failover, the Data Guard Broker, Fast-Start Failover, and Active Data Guard for offloading reporting to the standby.\n\nReal Application Clusters follows as an architecture rather than an installation exercise — shared storage, cache fusion, services and connection-time load balancing, and honest guidance on when RAC solves a problem and when it adds one. GoldenGate covers logical replication for zero-downtime migration and cross-platform integration, and the module closes on the Maximum Availability Architecture that Pune BFSI reference designs are built from.",
      topics: [
        "Physical and logical standby databases",
        "Protection modes and the data-loss trade-off",
        "Redo transport, apply and lag monitoring",
        "Switchover against failover; Data Guard Broker",
        "Fast-Start Failover and Active Data Guard",
        "RAC — shared storage, cache fusion and services",
        "When RAC helps, and when it does not",
        "GoldenGate for zero-downtime migration",
        "Maximum Availability Architecture reference designs",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Week 12 + placement prep",
      description:
        "The capstone runs the whole course through one system: a schema modelled from a written brief, loaded with millions of rows, served by a PL/SQL package that carries the transactional logic, partitioned and indexed against measured plan output, secured with Virtual Private Database and auditing, protected by a tested RMAN point-in-time restore, and documented well enough that a stranger can run it.\n\nInterview preparation is calibrated for the panels Pune actually runs — BFSI PL/SQL developer and Oracle DBA rounds. Expect to write analytic SQL live, explain read consistency and `ORA-01555`, walk through a recovery scenario, describe a plan you fixed and how you proved it, and justify a partitioning strategy. Resume, LinkedIn and GitHub are rewritten around the capstone, and two mock interviews are run and reviewed.",
      topics: [
        "Capstone schema, data load and PL/SQL package",
        "Partitioning and indexing with measured plan evidence",
        "Virtual Private Database and unified auditing",
        "A verified RMAN point-in-time restore",
        "README, ER diagram and data dictionary",
        "Live analytic-SQL and PL/SQL writing under interview conditions",
        "Recovery-scenario and read-consistency questioning",
        "Resume, LinkedIn and GitHub rewritten around the capstone",
        "Two mock interviews calibrated for Pune BFSI panels",
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

  roadmapImage: {
    src: "/images/courses/oracle-database-path-v1.webp",
    width: 1400,
    height: 1228,
    alt: "Twelve-stage Oracle Database learning path taught at Archer Infotech Pune: foundations covering the instance, schemas, tablespaces and connecting to 23ai and Autonomous Database; core SQL covering DUAL, ROWNUM, NVL and format models; schema objects covering NUMBER and VARCHAR2 types, constraints, sequences, views and the data dictionary; joins and subqueries covering ANSI syntax, EXISTS and the NOT IN with NULL trap; advanced SQL covering analytic functions, MERGE, CONNECT BY hierarchies and PIVOT; PL/SQL fundamentals covering blocks, cursors, collections and exception handling; procedures, functions and packages; triggers, BULK COLLECT, FORALL and dynamic SQL; architecture covering the SGA, PGA, background processes, redo and undo; multitenant covering container and pluggable databases and Autonomous Database; physical design and tuning covering partitioning, execution plans, AWR reports and the wait-event model; and production covering read consistency, RMAN recovery, Virtual Private Database, Transparent Data Encryption, Data Guard, RAC and the capstone project.",
    caption:
      "The order this course is taught in. Each stage expands into the modules below — nothing arrives before its prerequisite.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/oracle-database-syllabus-v1.pdf",
    title: "Oracle Database Course Syllabus — Complete Module List",
    slug: "oracle-database-syllabus",
    blurb:
      "The complete eighteen-module syllabus as a PDF — Oracle foundations and core SQL, schema objects and the data dictionary, joins and analytic functions, PL/SQL from blocks through packages, triggers and bulk processing, the SGA and background processes, multitenant and Autonomous Database, partitioning and physical design, plan reading and AWR tuning, read consistency and undo, RMAN backup and recovery, security and BFSI compliance, Data Guard and RAC, and the capstone. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the PDF",
        items: [
          "All eighteen modules in teaching order, week by week, across the full three-month programme.",
          "Three modules of PL/SQL at depth — cursors and exception design, packages, then bulk processing with BULK COLLECT and FORALL, which is what Pune BFSI roles are tested on.",
          "The DBA half in full — the SGA and background processes, multitenant, partitioning, AWR and ASH tuning, and RMAN recovery scenarios performed rather than described.",
          "The security and availability material Indian BFSI requirements name directly: Virtual Private Database, Data Redaction, Transparent Data Encryption, unified auditing, Data Guard and RAC.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "PL/SQL Developer — the highest-volume Oracle hiring track in Pune BFSI.",
          "Oracle Database Administrator — architecture, backup, recovery, tuning and availability.",
          "Database Developer — analytic SQL, partitioning and performance work.",
          "Data Migration / Integration Engineer — Data Pump, GoldenGate and cross-platform moves.",
        ],
      },
    ],
  },

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
