import type { CourseRichContent } from "./types";

export const oracleDatabaseTrainingInPune: CourseRichContent = {
  intro:
    "Oracle Database remains the dominant DBMS in Pune BFSI, large-enterprise, and Capital Markets workloads — Bajaj Finserv, Cognizant Pune Capital Markets, Mastercard Pune Tech Hub, ICICI / HDFC / Axis Pune captives, plus most Pune-based BFSI / financial-services back-office systems run on Oracle. Archer Infotech's Oracle Database training in Pune is the focused track for engineers and DBAs targeting BFSI and large-enterprise premium roles where Oracle is the institutional default — distinct from our broader MySQL / PostgreSQL courses. The track runs from database fundamentals and the relational model through the full Oracle SQL dialect, database design and normalization, PL/SQL at depth (blocks, cursors, exception handling, procedures, functions, packages, triggers, collections and bulk processing), and the administration half — architecture, storage, security, Oracle Net, undo, backup and recovery with RMAN, Data Pump and SQL*Loader, performance tuning and the optimizer, partitioning, and the multitenant architecture — finishing on a complete Hospital Management System database. Classroom in Kothrud, online live, and weekend batches available.",

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
      title: "Database Management Systems & the Relational Model",
      weekRange: "Week 1",
      description:
        "The course opens on the ideas Oracle is an implementation of, because a student who learns Oracle without them ends up able to type commands and unable to design anything. What data is, what a database management system is for, and the model families that came before and alongside the relational one — hierarchical, network, object-oriented and NoSQL — each with the problem it was built to solve.\n\nThe relational model is then built up properly: tables, rows and columns; primary, foreign, candidate and composite keys distinguished from one another rather than used interchangeably; and the three relationship shapes, with the join table that many-to-many always requires. Constraints are introduced as the guarantees the database itself enforces, normalization is previewed so that the vocabulary is familiar when Module 12 takes it apart, and SQL is placed as the language that addresses all of it.",
      topics: [
        "Data, databases and what a DBMS is actually for",
        "Hierarchical, network, relational, object-oriented and NoSQL",
        "RDBMS features — tables, rows and columns",
        "Primary, foreign, candidate and composite keys",
        "One-to-one, one-to-many and many-to-many relationships",
        "Database constraints and what they guarantee",
        "Database normalization — the overview before the detail",
        "Where SQL fits, and what it is not",
      ],
    },
    {
      title: "Oracle Database, Editions & Environment Setup",
      weekRange: "Week 1",
      description:
        "What Oracle Database is, how the company and the product got here, and which edition a given job actually runs on. Oracle is compared directly against MySQL, Microsoft SQL Server and PostgreSQL — not to declare a winner, but so that a student arriving from any of them knows which of their habits will transfer and which will quietly produce wrong answers.\n\nThe terminology is then pinned down, because it causes more confusion than any other part of the course: an Oracle Server, an Oracle instance and an Oracle database are three different things, and the multitenant container and pluggable database sit on top of all three. The environment is set up together so that nobody is blocked in week two — Oracle Database Free / Express Edition installed, SQL Developer and SQL*Plus configured, a connection created against a service name, and the first SQL statement executed. Service names against SIDs, listener configuration and Oracle Net Services are covered here because they are the source of nearly every first-week failure.",
      topics: [
        "Oracle Database editions, features and use cases",
        "Oracle against MySQL, SQL Server and PostgreSQL",
        "Server, instance and database — three different things",
        "Client-server architecture; Oracle 19c and modern releases",
        "Multitenant overview — container and pluggable databases",
        "Installing Oracle Database Free / Express Edition",
        "Installing SQL Developer; the SQL*Plus command line",
        "Service names, SID, listener and Oracle Net Services",
        "Lab — create a connection and run the first SQL statement",
      ],
    },
    {
      title: "Oracle Architecture — Memory, Processes & Storage",
      weekRange: "Week 2",
      description:
        "The internals every DBA interview tests and every developer benefits from. The System Global Area is taken component by component — database buffer cache, shared pool with its library cache and data dictionary cache, redo log buffer, large pool, Java pool, streams pool and fixed SGA — and then the Program Global Area, where the sort and hash work areas decide whether an operation stays in memory or spills to disk.\n\nThe background processes are traced through a real commit rather than listed: DBWn, LGWR, CKPT, SMON, PMON, ARCn, MMON and MMAN, and what each one guarantees about durability. User processes and server processes are separated from background processes so the whole interaction is visible end to end. Storage closes the module in both directions — the logical hierarchy of database, tablespace, segment, extent and block, the four segment types, and the physical files underneath: data files, control files, redo logs, archived logs, parameter files and password files.",
      topics: [
        "Instance startup and shutdown, step by step",
        "SGA — buffer cache, shared pool, library and dictionary cache",
        "Redo log buffer, large pool, Java pool and streams pool",
        "PGA — private SQL area, session memory, sort and hash areas",
        "Automatic Shared Memory and Automatic Memory Management",
        "DBWn, LGWR, CKPT, SMON, PMON, ARCn, MMON and MMAN",
        "User process, server process and how they interact",
        "Logical storage — tablespaces, segments, extents and blocks",
        "Segment types — table, index, undo and temporary",
        "Physical files — data, control, redo, parameter and password",
      ],
    },
    {
      title: "Tablespaces, Control Files, Redo & Archived Logs",
      weekRange: "Weeks 2–3",
      description:
        "The storage layer a DBA is accountable for, handled hands-on. SYSTEM, SYSAUX, USERS, UNDO and TEMP are covered by the role each plays rather than as a list to memorise, along with the permanent-against-temporary and bigfile-against-smallfile choices. Tablespaces are created, altered, taken offline and made read-only; data files are added, resized and set to autoextend; and usage is monitored, which is the task that actually recurs in production.\n\nControl files follow — what they hold, why they are multiplexed, how to back one up and how to recreate one when it is lost. Redo logs are then covered as groups and members, with log switches and checkpoints explained by what triggers them, and groups and members added and dropped in class. The module ends on archiving: NOARCHIVELOG against ARCHIVELOG, why every production database runs in the latter, how to enable it, where archives go and what happens to recovery when they are missing.",
      topics: [
        "SYSTEM, SYSAUX, USERS, UNDO and TEMP tablespaces",
        "Permanent against temporary; bigfile against smallfile",
        "Creating, altering and dropping tablespaces",
        "Adding data files, resizing and autoextend",
        "Online, offline and read-only tablespaces",
        "Control files — contents, multiplexing, backup and recreation",
        "Redo log groups, members, log switches and checkpoints",
        "Adding and dropping redo log groups and members",
        "NOARCHIVELOG against ARCHIVELOG, and why production needs it",
        "Lab — create a tablespace, add and resize a data file, monitor usage",
      ],
    },
    {
      title: "Oracle Users, Schemas & Profiles",
      weekRange: "Week 3",
      description:
        "Oracle blurs the line between a user and a schema in a way no other database in this category does, and getting it straight early prevents a category of confusion later. A user is created, altered and dropped; a schema is what that user owns; and the two names are the same string, which is exactly why the distinction has to be taught rather than assumed.\n\nThe practical settings follow, each with the failure it prevents. Default and temporary tablespaces decide where a user's objects and sort work land. Quotas decide whether a create succeeds at all, and a missing quota produces an error message that reads as though the tablespace itself is broken. Password management, expiration, and account locking and unlocking are covered as the operational tasks they are, and profiles tie password policy and resource limits together into something that can be applied to a group rather than repeated per user.",
      topics: [
        "Oracle users against schemas — the distinction Oracle blurs",
        "CREATE USER, ALTER USER and DROP USER",
        "Default tablespace and temporary tablespace",
        "User quotas, and the error a missing one produces",
        "Password management and password expiration",
        "Account locking and unlocking",
        "User profiles and resource limits",
      ],
    },
    {
      title: "SQL Fundamentals, Tables & Oracle Data Types",
      weekRange: "Weeks 3–4",
      description:
        "SQL is introduced by its five command families — DDL, DML, DQL, TCL and DCL — so that every statement learned afterwards has somewhere to sit. CREATE, ALTER, DROP, TRUNCATE and RENAME are covered together, with TRUNCATE against DELETE given proper attention because the difference is transactional, not cosmetic, and the wrong choice is not recoverable by rollback.\n\nOracle's type system is then worked through with the traps named. VARCHAR2 against CHAR and the padding difference; NCHAR and NVARCHAR2 for national character sets; NUMBER with precision and scale, and why INTEGER and FLOAT are not what a developer from another database expects; DATE, which always carries a time component whether or not anyone asked for one; TIMESTAMP and TIMESTAMP WITH TIME ZONE; and the large-object types CLOB, NCLOB, BLOB and BFILE with the storage implications of each. Tables are created, altered and renamed throughout.",
      topics: [
        "DDL, DML, DQL, TCL and DCL — the five families",
        "CREATE, ALTER, DROP, TRUNCATE and RENAME",
        "CHAR, VARCHAR2, NCHAR and NVARCHAR2",
        "NUMBER with precision and scale; INTEGER and FLOAT",
        "DATE, TIMESTAMP and TIMESTAMP WITH TIME ZONE",
        "CLOB, NCLOB, BLOB and BFILE",
        "Creating tables and defining columns",
        "TRUNCATE against DELETE — a transactional difference",
      ],
    },
    {
      title: "Constraints & Data Manipulation",
      weekRange: "Week 4",
      description:
        "Constraints are presented as the only integrity guarantee that survives a second application, a bad script or a direct SQL*Plus session — which is the argument for putting them in the database rather than in code. NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY and CHECK, plus DEFAULT values, are declared both at column level and at table level, named deliberately so that a violation message identifies itself, and then enabled, disabled and dropped as a maintenance operation.\n\nData manipulation follows on constrained tables so that every rule is visible when it fires. INSERT of single and multiple rows and INSERT ... SELECT; UPDATE and DELETE; and MERGE as the single statement that replaces a check-then-insert race. Transaction control closes the module — COMMIT, ROLLBACK and SAVEPOINT — together with read consistency and an introduction to isolation, which is where Oracle's behaviour begins to diverge from the databases students have met before.",
      topics: [
        "NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY and CHECK",
        "DEFAULT values and naming constraints deliberately",
        "Column-level against table-level constraints",
        "Enabling, disabling and dropping constraints",
        "Viewing constraints through the data dictionary",
        "INSERT single, multiple rows, and INSERT ... SELECT",
        "UPDATE, DELETE and MERGE",
        "COMMIT, ROLLBACK and SAVEPOINT",
        "Read consistency and transaction isolation — first look",
      ],
    },
    {
      title: "Retrieving, Filtering & Sorting Data",
      weekRange: "Week 4",
      description:
        "The SELECT statement, built up one clause at a time. Selecting all columns against naming them, column aliases, DISTINCT, arithmetic expressions, literals and concatenation. NULL is given its own treatment here rather than mentioned in passing, because in Oracle an empty string is NULL, and any expression touching a NULL produces one — which silently changes results for anyone arriving from another database.\n\nFiltering then covers the comparison operators, BETWEEN, IN, LIKE with its wildcards, and IS NULL, which is the only correct way to test for one. The logical operators and their precedence are drilled, because a missing pair of brackets around an OR is one of the most common and least visible bugs in production SQL. ORDER BY closes the module, with ascending and descending sorts, multi-column ordering, and where NULLs land.",
      topics: [
        "SELECT — all columns, specific columns and column aliases",
        "DISTINCT, arithmetic expressions, literals and concatenation",
        "NULL values, and the empty string that is one",
        "WHERE and the comparison operators",
        "BETWEEN, IN, LIKE and IS NULL",
        "AND, OR, NOT and operator precedence",
        "ORDER BY — ASC, DESC and multiple-column sorting",
      ],
    },
    {
      title: "Oracle Built-in & Aggregate Functions",
      weekRange: "Week 5",
      description:
        "The function library that appears in every Oracle interview and most production queries. Character functions — UPPER, LOWER, INITCAP, LENGTH, SUBSTR, INSTR, TRIM and its directional forms, REPLACE and CONCAT. Numeric functions — ROUND, TRUNC, MOD, CEIL, FLOOR and ABS. Date functions — SYSDATE and CURRENT_DATE and the difference between them, ADD_MONTHS, MONTHS_BETWEEN, NEXT_DAY, LAST_DAY, and ROUND and TRUNC applied to dates, which surprises people the first time.\n\nConversion functions are taught with format models rather than by example, so that TO_CHAR, TO_DATE and TO_NUMBER can be used against a date format nobody has seen before. The NULL functions NVL, NVL2, NULLIF and COALESCE are compared directly, as are CASE and DECODE — the first portable, the second Oracle's own and still everywhere in existing code. Aggregates close the module: COUNT, SUM, AVG, MIN and MAX, GROUP BY and HAVING, multi-column grouping, nested aggregates, and how each aggregate treats a NULL, which is the detail interviews reliably probe.",
      topics: [
        "UPPER, LOWER, INITCAP, LENGTH, SUBSTR and INSTR",
        "TRIM, LTRIM, RTRIM, REPLACE and CONCAT",
        "ROUND, TRUNC, MOD, CEIL, FLOOR and ABS",
        "SYSDATE, ADD_MONTHS, MONTHS_BETWEEN, NEXT_DAY, LAST_DAY",
        "TO_CHAR, TO_DATE, TO_NUMBER and format models",
        "NVL, NVL2, NULLIF and COALESCE",
        "CASE and DECODE",
        "COUNT, SUM, AVG, MIN and MAX",
        "GROUP BY, HAVING and multiple-column grouping",
        "Nested aggregates and NULL handling inside aggregates",
      ],
    },
    {
      title: "Joins, Subqueries & Set Operators",
      weekRange: "Weeks 5–6",
      description:
        "Combining tables, taught in modern ANSI syntax. Inner joins, the three outer joins, cross joins and self joins; equi and non-equi joins; and natural joins covered mainly so that students know why not to use one. Oracle's legacy (+) operator is included deliberately but narrowly: a developer who joins a Pune BFSI maintenance team will be handed decade-old code that uses it, and needs to read it without needing to write it.\n\nSubqueries follow in every position they can occupy — single-row, multiple-row, multiple-column, nested and correlated — with EXISTS and NOT EXISTS presented as the correct expression of semi- and anti-joins, and ANY and ALL alongside IN. Scalar subqueries get their own treatment. Set operators close the module: UNION against UNION ALL and what the difference costs, INTERSECT, MINUS, the rules the operand queries must satisfy, and how ORDER BY behaves across a set operation.",
      topics: [
        "INNER, LEFT, RIGHT and FULL OUTER joins",
        "CROSS, SELF, equi, non-equi and natural joins",
        "Oracle legacy (+) join syntax — reading it, not writing it",
        "Single-row, multiple-row and multiple-column subqueries",
        "Nested and correlated subqueries",
        "EXISTS, NOT EXISTS, IN, ANY and ALL",
        "Scalar subqueries",
        "UNION, UNION ALL, INTERSECT and MINUS",
        "Set-operator rules and ORDER BY across a set operation",
        "Lab — Employee, Department, Customer and Orders queried across joins",
      ],
    },
    {
      title: "Views, Sequences, Indexes & Synonyms",
      weekRange: "Week 6",
      description:
        "The schema objects an Oracle application is assembled from. Views first — simple against complex, created and replaced, made read-only or given WITH CHECK OPTION, and updated through where Oracle permits it — plus the data dictionary views that describe them. Sequences follow, with START WITH, INCREMENT BY, MINVALUE, MAXVALUE, CYCLE and CACHE, and NEXTVAL and CURRVAL used correctly across a session.\n\nIndexes are treated as a trade rather than a free win: B-tree, unique, composite, bitmap, function-based and reverse-key, why bitmap indexes suit a warehouse and are dangerous under concurrent DML, how composite column order should follow the query, and the write cost every index adds. Index monitoring shows which ones are earning their place. Synonyms close the module — private and public, what they hide and what they can obscure.",
      topics: [
        "Simple and complex views; CREATE OR REPLACE",
        "Read-only views, WITH CHECK OPTION and updating through a view",
        "Sequences — START WITH, INCREMENT BY, CYCLE and CACHE",
        "NEXTVAL and CURRVAL; altering and dropping sequences",
        "B-tree, unique and composite indexes",
        "Bitmap indexes, and why not under concurrent DML",
        "Function-based and reverse-key indexes",
        "Index monitoring, and the write cost of every index",
        "Private and public synonyms",
      ],
    },
    {
      title: "Database Normalization",
      weekRange: "Week 6",
      description:
        "Normalization is taught here, after tables and constraints exist, because the anomalies it prevents can now be demonstrated on a real schema instead of described in the abstract. Redundancy is introduced deliberately into a working table, and the insert, update and delete anomalies are then produced on demand — which is considerably more convincing than a definition.\n\nFunctional dependency gives the vocabulary, and the normal forms are worked through in order: first, second, third and Boyce-Codd, each applied to the same messy dataset so the progression is visible rather than theoretical. The module closes on the judgement half, which most syllabi omit — when a normalised design is the right answer, and when a reporting workload justifies denormalising deliberately and documenting why. The practical exercise converts an unnormalized business dataset into a properly normalised set of tables.",
      topics: [
        "Database design fundamentals and data redundancy",
        "Insert, update and delete anomalies, demonstrated",
        "Functional dependency",
        "First Normal Form",
        "Second Normal Form",
        "Third Normal Form",
        "Boyce-Codd Normal Form",
        "When to denormalise deliberately, and how to document it",
        "Practical — normalise an unnormalized business dataset",
      ],
    },
    {
      title: "PL/SQL Fundamentals, Control Structures & Cursors",
      weekRange: "Week 7",
      description:
        "PL/SQL is what an Oracle career is actually built on, and Pune's BFSI and ERP employers hire for it by name. The module opens on what PL/SQL adds to SQL and why the combination exists at all, then the block structure — declare, begin, exception, end — and anonymous blocks. Variables, constants and data types follow, with %TYPE and %ROWTYPE taught as the default rather than an option, so that a declaration tracks the table it reads from and does not break silently when a column widens.\n\nControl structures come next: IF, ELSIF, nested IF and CASE; the basic LOOP, WHILE and FOR; and EXIT, EXIT WHEN and CONTINUE. Cursors then get proper depth, because they are where most PL/SQL is actually spent. Implicit and explicit cursors, the full declare-open-fetch-close lifecycle, the four cursor attributes, the cursor FOR loop that most working code uses and should, and parameterised cursors for reuse across a program.",
      topics: [
        "SQL against PL/SQL, and what PL/SQL adds",
        "PL/SQL architecture and block structure",
        "Anonymous blocks; variables, constants and data types",
        "%TYPE and %ROWTYPE as the default declaration style",
        "IF, IF ELSE, ELSIF, nested IF and CASE",
        "Basic LOOP, WHILE LOOP, FOR LOOP and nested loops",
        "EXIT, EXIT WHEN and CONTINUE",
        "Implicit and explicit cursors; the cursor lifecycle",
        "%FOUND, %NOTFOUND, %ROWCOUNT and %ISOPEN",
        "Cursor FOR loops and parameterised cursors",
      ],
    },
    {
      title: "Exception Handling, Procedures & Functions",
      weekRange: "Weeks 7–8",
      description:
        "Exception handling is treated as a design skill rather than a syntax lesson. Predefined, non-predefined and user-defined exceptions; SQLCODE and SQLERRM for reporting what actually happened; RAISE and RAISE_APPLICATION_ERROR for signalling upward with a message an application can act on. WHEN OTHERS is covered together with the failure mode that hides more Oracle bugs than any other — an empty handler that swallows an error and lets a batch job report success.\n\nStored procedures follow: created, executed, modified and dropped; IN, OUT and IN OUT parameters; local variables; and exception handling placed inside a procedure so failures are contained where they occur. Functions are then compared with procedures on the basis that decides between them — a function returns a value and can be called from SQL, a procedure performs work — along with RETURN, calling functions from both SQL and PL/SQL, and what DETERMINISTIC promises the optimizer.",
      topics: [
        "Predefined, non-predefined and user-defined exceptions",
        "WHEN OTHERS, and the empty handler that hides real bugs",
        "SQLCODE and SQLERRM",
        "RAISE and RAISE_APPLICATION_ERROR",
        "Creating, executing, modifying and dropping procedures",
        "IN, OUT and IN OUT parameters; local variables",
        "Exception handling inside procedures",
        "Functions, RETURN, and calling them from SQL and PL/SQL",
        "Procedures against functions — choosing correctly",
        "Deterministic functions",
      ],
    },
    {
      title: "Packages & Database Triggers",
      weekRange: "Week 8",
      description:
        "Packages are presented as the unit Oracle development is genuinely organised around, not as an optional extra. Specification against body; public objects in the spec and private ones in the body; package variables and the session lifetime of package state, which surprises people the first time a value survives across calls; and package initialisation. The argument for making packages the default is made on maintenance grounds — a change inside a body does not invalidate everything that depends on the spec.\n\nTriggers follow, with the emphasis on knowing when not to write one. BEFORE and AFTER; INSERT, UPDATE and DELETE; statement-level against row-level and what each can see; the :OLD and :NEW qualifiers; INSTEAD OF triggers, which are what make a complex view updatable; and DDL and database event triggers for auditing structural change. Enabling, disabling and dropping triggers closes the module, along with the maintenance reality that a forgotten disabled trigger is a silent data-integrity hole.",
      topics: [
        "Package specification against package body",
        "Public and private objects; package variables",
        "Package state, session lifetime and initialisation",
        "Why packages are the right default unit",
        "BEFORE and AFTER; INSERT, UPDATE and DELETE triggers",
        "Statement-level against row-level triggers",
        "The :OLD and :NEW qualifiers",
        "INSTEAD OF triggers on views",
        "DDL triggers and database event triggers",
        "Enabling, disabling and dropping triggers",
      ],
    },
    {
      title: "Advanced PL/SQL & the Data Dictionary",
      weekRange: "Week 8",
      description:
        "The PL/SQL that separates a maintainer from an author. Records and collections — associative arrays, nested tables and VARRAYs — with the selection criteria for each rather than three syntaxes to memorise. Bulk processing is the performance half of the module and is often the difference between a nightly job that finishes inside its window and one that does not: the context switch between the PL/SQL and SQL engines, BULK COLLECT for reading in batches, and FORALL for writing them.\n\nDynamic SQL follows — EXECUTE IMMEDIATE and native dynamic SQL, with bind variables presented as both a performance measure and an injection defence — along with ref cursors for returning result sets to a caller, autonomous transactions for logging that must survive a rollback, and the performance considerations that tie the module together. The data dictionary closes it: the USER_, ALL_ and DBA_ families and what separates them, the objects worth knowing by name, and the V$ dynamic performance views that answer live questions about a running instance.",
      topics: [
        "Records and collections",
        "Associative arrays, nested tables and VARRAYs",
        "The PL/SQL to SQL context switch and what it costs",
        "BULK COLLECT and FORALL",
        "EXECUTE IMMEDIATE and native dynamic SQL",
        "Ref cursors and autonomous transactions",
        "PL/SQL performance considerations",
        "USER_, ALL_ and DBA_ views — and what separates them",
        "USER_TABLES, USER_CONSTRAINTS, USER_INDEXES, USER_OBJECTS",
        "V$INSTANCE, V$DATABASE, V$SESSION and V$SQL",
      ],
    },
    {
      title: "Oracle Security & Administration Fundamentals",
      weekRange: "Week 9",
      description:
        "Security first, because it decides what every later administrative action is permitted to do. Authentication against authorization; system privileges against object privileges; GRANT and REVOKE, including what happens to a privilege granted onward when the original is revoked. Roles are built and assigned as the manageable unit, profiles carry password policy and resource limits, and least privilege is applied to a real application account rather than stated as a principle.\n\nAdministration fundamentals follow. The DBA's actual responsibilities, then instance administration in the detail an interview will test: STARTUP NOMOUNT, MOUNT and OPEN, with what becomes possible at each stage and which recovery tasks require which; and SHUTDOWN NORMAL, TRANSACTIONAL, IMMEDIATE and ABORT, with the cost of ABORT made explicit. Initialization parameters close the module — SPFILE against PFILE, static against dynamic parameters, ALTER SYSTEM and ALTER SESSION, viewing and modifying parameters, and creating each file from the other, which is the recovery path when a bad parameter stops an instance from starting.",
      topics: [
        "Authentication, authorization and the privilege model",
        "System privileges and object privileges; GRANT and REVOKE",
        "Creating, assigning and managing roles",
        "Profiles, password policy, account locking and expiration",
        "Least privilege applied to a real application account",
        "DBA responsibilities and instance administration",
        "STARTUP NOMOUNT, MOUNT and OPEN",
        "SHUTDOWN NORMAL, TRANSACTIONAL, IMMEDIATE and ABORT",
        "SPFILE against PFILE; static and dynamic parameters",
        "ALTER SYSTEM, ALTER SESSION and creating each file from the other",
      ],
    },
    {
      title: "Oracle Net, Undo Management & Temporary Tablespaces",
      weekRange: "Week 9",
      description:
        "Connectivity is where most Oracle problems are first noticed and least often understood, so the listener is taken apart properly. Oracle Net Services and listener architecture; listener.ora, tnsnames.ora and sqlnet.ora and what belongs in each; static against dynamic service registration; and LSNRCTL for starting, stopping and checking status. Troubleshooting is practised on deliberately broken configurations, because reading the error is the skill.\n\nUndo follows, and it is the mechanism behind Oracle's read consistency rather than merely a rollback buffer. What undo data is for, how it serves read consistency, transaction rollback and recovery at once; undo tablespaces, Automatic Undo Management and undo retention; and monitoring, including the retention setting behind a snapshot-too-old error. Temporary tablespaces close the module — temporary segments and the sorting operations that create them, TEMP tablespaces and temp files, creating and monitoring them, and temporary tablespace groups for spreading concurrent sort load.",
      topics: [
        "Oracle Net Services and listener architecture",
        "listener.ora, tnsnames.ora and sqlnet.ora",
        "Static and dynamic service registration",
        "LSNRCTL — start, stop, status and troubleshooting",
        "Undo data — read consistency, rollback and recovery",
        "Undo tablespaces and Automatic Undo Management",
        "Undo retention, monitoring, and snapshot-too-old",
        "Temporary segments and sorting operations",
        "Creating and monitoring TEMP tablespaces and temp files",
        "Temporary tablespace groups",
      ],
    },
    {
      title: "Backup & Recovery — RMAN, Data Pump & SQL*Loader",
      weekRange: "Week 10",
      description:
        "The work a production DBA is genuinely accountable for. Failure types are separated first — instance failure, media failure, user error and statement failure — because each has a different recovery, and choosing the wrong one wastes the outage. Complete against incomplete recovery, and physical against logical backup, frame everything that follows.\n\nRMAN is then covered in depth: architecture, the control-file repository and the recovery catalog, backup sets and image copies, full and incremental backups at level 0 and level 1, and archived log, control file and SPFILE backups. Recovery is performed rather than described — RESTORE and RECOVER applied to a whole database, a tablespace, a data file and a control file, plus point-in-time recovery. Data Pump covers expdp and impdp across full, schema, table and tablespace scope, with schema and tablespace remapping and object filtering. SQL*Loader closes the module: control, data, log, bad and discard files, and the conventional against direct path load choice.",
      topics: [
        "Failure types — instance, media, user error and statement",
        "Complete against incomplete recovery; physical against logical backup",
        "RMAN architecture, repository and recovery catalog",
        "Backup sets, image copies, full and incremental level 0 / 1",
        "Archived log, control file and SPFILE backups",
        "RESTORE and RECOVER — database, tablespace, data file, control file",
        "Point-in-time recovery, performed",
        "Data Pump — expdp and impdp; full, schema, table and tablespace",
        "Remapping schemas and tablespaces; filtering objects",
        "SQL*Loader — control, log, bad and discard files; direct path load",
      ],
    },
    {
      title: "Performance Tuning & the Oracle Optimizer",
      weekRange: "Weeks 10–11",
      description:
        "Finding the slow thing and proving it got faster. Performance is separated into its dimensions first — SQL, memory, disk I/O and CPU — with wait events as the evidence that says which one a system is actually blocked on, rather than which one somebody guessed. Database statistics and the optimizer concepts underneath are introduced before any tuning is attempted.\n\nExecution plans are then read properly: EXPLAIN PLAN and DBMS_XPLAN, access paths, index usage against full table scans — including when a full scan is correctly the faster choice — and the join methods. Query rewriting and SQL tuning techniques are applied to slow statements on a dataset large enough that improvements are measurable. The optimizer closes the module: the cost-based optimizer and what it needs from you, DBMS_STATS and table and index statistics, cardinality and selectivity as the estimates every plan rests on, and nested loop, hash and sort-merge joins with the conditions that make each one right.",
      topics: [
        "SQL, memory, disk I/O and CPU as performance dimensions",
        "Wait events and database statistics",
        "EXPLAIN PLAN and DBMS_XPLAN",
        "Access paths, index usage and full table scans",
        "Query rewriting and SQL tuning techniques",
        "The cost-based optimizer and DBMS_STATS",
        "Table and index statistics",
        "Cardinality and selectivity",
        "Nested loop, hash and sort-merge joins",
      ],
    },
    {
      title: "Locking, Concurrency, Partitioning & Materialized Views",
      weekRange: "Week 11",
      description:
        "How Oracle behaves when more than one person is working at once, which is the only condition production ever runs in. Transactions and locks; row-level against table-level locking; blocking sessions and how to identify one; deadlocks and what Oracle does about them automatically. Locked sessions are found and killed safely in class, because doing it under pressure for the first time is how the wrong session gets terminated. Read consistency and isolation levels are revisited here with the undo mechanism now understood.\n\nPartitioning follows as Oracle's strongest large-table feature: range, list, hash and composite partitioning, the advantages that justify the added complexity, partition pruning as the mechanism that delivers them, and local against global partitioned indexes with the maintenance cost of each. Materialized views close the module — how they differ from views, complete against fast refresh, on-demand against on-commit, and query rewrite, which lets the optimizer use one without the query mentioning it.",
      topics: [
        "Transactions, row-level locks and table-level locks",
        "Blocking sessions and deadlocks",
        "Identifying locked sessions and killing them safely",
        "Read consistency and isolation levels",
        "Range, list, hash and composite partitioning",
        "Advantages of partitioning, and partition pruning",
        "Local against global partitioned indexes",
        "Materialized views against views",
        "Complete, fast, on-demand and on-commit refresh",
        "Query rewrite",
      ],
    },
    {
      title: "Multitenant Architecture, Monitoring & Enterprise Manager",
      weekRange: "Weeks 11–12",
      description:
        "The deployment model Oracle has standardised on, now that the architecture underneath it is understood. Container and pluggable databases, CDB$ROOT and PDB$SEED, and the container a session is connected to — which is the fact behind a large share of \"the table does not exist\" confusion in modern Oracle. PDBs are created, opened, closed, cloned, unplugged and plugged back in during class, and common against local users is covered as the privilege question it is.\n\nMonitoring follows, starting where a real investigation starts: the alert log, trace files and the automatic diagnostic repository. The dynamic performance views are then used for live questions — V$SESSION, V$SQL, V$SYSTEM_EVENT and V$SYSSTAT — across sessions, SQL, tablespaces, data files, memory and processes. Oracle Enterprise Manager closes the module as the graphical counterpart: the monitoring dashboard, performance, storage and session monitoring, SQL monitoring, and alerts and notifications — taught after the command line, so that it is read as a convenience rather than as the only way in.",
      topics: [
        "CDB, PDB, CDB$ROOT and PDB$SEED",
        "Creating, opening, closing and cloning PDBs",
        "Plugging and unplugging a pluggable database",
        "Common users against local users",
        "The alert log, trace files and the diagnostic repository",
        "V$SESSION, V$SQL, V$SYSTEM_EVENT and V$SYSSTAT",
        "Monitoring sessions, SQL, tablespaces and data files",
        "Monitoring memory and processes",
        "Enterprise Manager — dashboard, performance and storage monitoring",
        "Enterprise Manager — session and SQL monitoring, alerts and notifications",
      ],
    },
    {
      title: "High Availability & Real-World Database Design",
      weekRange: "Week 12",
      description:
        "Availability first, at overview depth and honestly labelled as such. What high availability means as a requirement rather than a product; Real Application Clusters and the problems it does and does not solve; Data Guard with physical and logical standby databases and the difference in what each can do; Active Data Guard for offloading reporting; and failover and disaster recovery as distinct concepts with distinct objectives.\n\nDesign closes the taught curriculum by putting the whole course back together. A written requirement is analysed into entities, attributes and relationships; keys are chosen; an ER diagram is drawn and normalised; and a schema is designed with naming conventions that a second developer can predict. Then the four strategies that separate a schema that works from one that survives — index strategy, constraint strategy, security strategy, and the performance considerations that are far cheaper to decide now than to retrofit after the data has arrived.",
      topics: [
        "High availability and database availability concepts",
        "Oracle RAC — overview, and what it does not solve",
        "Data Guard — physical and logical standby databases",
        "Active Data Guard; failover and disaster recovery concepts",
        "Requirement analysis — identifying entities and attributes",
        "Primary keys, foreign keys and relationships",
        "ER diagrams and normalisation applied to a real brief",
        "Schema design and naming conventions",
        "Index strategy, constraint strategy and security strategy",
        "Performance considerations designed in, not retrofitted",
      ],
    },
    {
      title: "Capstone — Hospital Management System & Interview Preparation",
      weekRange: "Week 12 + placement prep",
      description:
        "The capstone runs the entire course through one system. A hospital database covering departments, doctors, patients, appointments, treatments, prescriptions, medicines, billing, payments and users is designed from the brief — ER diagram first, then normalised, then built. Tables, primary keys, foreign keys and constraints; sample data; SQL queries and reports; views, sequences and indexes; a PL/SQL layer of procedures, functions and packages; triggers and exception handling; database users with roles and privileges; and finally a Data Pump export and an RMAN backup of the finished database, because a project that cannot be restored is not finished.\n\nInterview preparation is calibrated for the three panel types Pune actually runs. SQL rounds cover joins, subqueries, aggregate and analytical queries, set operators, views, indexes, constraints and transactions. PL/SQL rounds cover procedures, functions, packages, triggers, cursors, exceptions, collections, dynamic SQL and bulk processing. DBA rounds cover architecture, SGA and PGA, background processes, tablespaces and the file types, users and roles, backup and recovery, RMAN, Data Pump, performance tuning, the listener, and startup and shutdown. Resume, LinkedIn and GitHub are rewritten around the capstone, and mock interviews are run and reviewed.",
      topics: [
        "Hospital Management System — ER diagram and normalised design",
        "Tables, keys, constraints and sample data",
        "SQL queries, reports, views, sequences and indexes",
        "PL/SQL procedures, functions and packages",
        "Triggers and exception handling",
        "Database users, roles and privileges for the application",
        "Data Pump export and an RMAN backup of the project",
        "SQL interview topics — joins, subqueries, analytics, set operators",
        "PL/SQL interview topics — packages, cursors, collections, bulk processing",
        "DBA interview topics — architecture, tablespaces, RMAN, tuning, listener",
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
    alt: "Twelve-stage Oracle Database learning path taught at Archer Infotech Pune: database foundations covering DBMS types, the relational model and keys; Oracle and setup covering editions, installation, SQL Developer and the listener; architecture covering the SGA, PGA, background processes and storage; storage and redo covering tablespaces, control files, redo logs and archiving; users and schemas covering profiles, quotas and password management; core SQL covering DDL, DML, Oracle data types, constraints and SELECT; functions and joins covering built-in and aggregate functions, joins, subqueries and set operators; objects and normalization covering views, sequences, indexes, synonyms and first through Boyce-Codd normal form; PL/SQL covering blocks, control structures, cursors, exception handling, procedures and functions; packages and advanced PL/SQL covering packages, triggers, collections, BULK COLLECT, FORALL and dynamic SQL; administration covering security, startup and shutdown, initialization parameters, Oracle Net, undo, RMAN, Data Pump and SQL*Loader; and tuning and capstone covering the optimizer, locking, partitioning, materialized views, multitenant, monitoring, high availability and the Hospital Management System project.",
    caption:
      "The order this course is taught in. Each stage expands into the modules below — nothing arrives before its prerequisite.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/oracle-database-syllabus-v1.pdf",
    title: "Oracle Database Course Syllabus — Complete Module List",
    slug: "oracle-database-syllabus",
    blurb:
      "The complete twenty-five-module syllabus as a PDF — database and Oracle fundamentals, installation and environment setup, memory, process and storage architecture, tablespaces, control files and redo, users and schemas, Oracle SQL from the five command families through joins, subqueries and set operators, views, sequences, indexes and synonyms, normalization to Boyce-Codd, PL/SQL from blocks and cursors through packages, triggers and bulk processing, the data dictionary, security and administration, Oracle Net, undo and temporary tablespaces, RMAN with Data Pump and SQL*Loader, tuning and the optimizer, locking, partitioning and materialized views, multitenant, monitoring and Enterprise Manager, high availability, real-world design, and the Hospital Management System capstone. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the PDF",
        items: [
          "All twenty-five modules in teaching order, week by week, across the full three-month programme.",
          "Four modules of PL/SQL at depth — fundamentals and cursors, exception design with procedures and functions, packages and triggers, then collections, BULK COLLECT, FORALL and dynamic SQL, which is what Pune BFSI roles are tested on.",
          "The DBA half in full — memory, process and storage architecture, tablespaces and redo, security and administration, Oracle Net, undo, RMAN recovery performed rather than described, Data Pump, SQL*Loader, tuning, partitioning, multitenant and Enterprise Manager.",
          "The Hospital Management System capstone brief in full, plus the SQL, PL/SQL and DBA interview topic lists the Pune panels are built from.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "PL/SQL Developer — the highest-volume Oracle hiring track in Pune BFSI.",
          "Oracle Database Administrator — architecture, backup, recovery, tuning and availability.",
          "Database Developer — analytic SQL, partitioning and performance work.",
          "Data Migration / Integration Engineer — Data Pump, SQL*Loader and cross-platform moves.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "Hospital Management System — Full Oracle Database",
      description:
        "The course capstone, built from a written brief the way a real system starts. An Oracle database for a hospital covering departments, doctors, patients, appointments, treatments, prescriptions, medicines, billing, payments and users — designed as an ER diagram, normalised, then implemented with tables, primary and foreign keys and constraints, loaded with sample data, and queried through SQL reports, views, sequences and indexes. On top of it sits a full PL/SQL layer: procedures, functions and packages carrying the business logic, triggers for audit and validation, and exception handling throughout. Database users are created with roles and privileges scoped to the application, and the finished database is exported with Data Pump and backed up with RMAN — a project that cannot be restored is not finished. Outcome: a public GitHub repository with the schema, the PL/SQL code, the ER diagram and the runbook.",
      technologies: [
        "Oracle 19c LTS or later",
        "ER diagram and normalised schema design",
        "PL/SQL packages, procedures and functions",
        "Triggers, constraints and exception handling",
        "Views, sequences, indexes and SQL reports",
        "Users, roles and privileges",
        "Data Pump export and RMAN backup",
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
      "What pulls an Oracle DBA / PL-SQL Developer above the median band: PL/SQL depth (packages, collections, bulk processing), demonstrable RMAN backup / recovery experience, plan-driven SQL tuning, and a database you designed yourself from a written brief rather than copied from a tutorial. Our capstone projects are designed exactly around these signals.",
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
      tools: ["Zoom for live sessions", "Oracle Database Free / Express Edition locally", "SQL Developer and SQL*Plus", "GitHub for capstone", "Slack / WhatsApp for async Q&A"],
    },
    weekend: { timing: ["Saturday + Sunday, 09:00 to 13:00"], durationNote: "Stretches over ~5 months instead of 3." },
    batchPolicy: "Maximum 15 students per batch.",
  },

  fees: {
    note: "Course fees range ₹20,000 – ₹90,000 depending on mode and concession. Oracle Database Free / Express Edition is free for lab work.",
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
      { feature: "Oracle version covered", archer: "Oracle 19c LTS and later, multitenant by default", typical: "Oracle 11g / 12c only" },
      { feature: "PL/SQL depth", archer: "Cursors, exceptions, packages, triggers, collections, BULK COLLECT, FORALL, dynamic SQL — 4 modules", typical: "Basic procedures / functions only" },
      { feature: "RMAN backup / recovery", archer: "Full + incremental + 4 recovery scenarios hands-on", typical: "Theory only" },
      { feature: "Performance tuning", archer: "Execution plans, DBMS_XPLAN, the optimizer, statistics, wait events", typical: "Skipped" },
      { feature: "Multitenant CDB / PDB", archer: "Yes — covered", typical: "Not covered (still teaching pre-12c architecture)" },
      { feature: "Public GitHub portfolio output", archer: "Yes — Hospital Management System schema + PL/SQL + RMAN runbooks", typical: "Local code on hard drive" },
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
      "Confirm enrolment and complete pre-course orientation (Oracle Database Free / Express Edition install)",
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
        "Yes — two capstone projects: (1) a complete Hospital Management System database, designed from a brief through ER diagram, normalisation, full PL/SQL layer, roles and privileges, Data Pump export and RMAN backup, (2) an RMAN backup / recovery exercise with documented runbooks for four recovery scenarios.",
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
