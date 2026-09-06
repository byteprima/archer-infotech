import type { CourseRichContent } from "./types";

/**
 * Salesforce Admin + Developer — rich content overlay.
 *
 * Tier 2 quality. Anchors:
 *  - Combined Admin (ADM 201) + Developer (PD1) track — the Pune hiring
 *    market overwhelmingly wants this combination, not pure Admin
 *  - Salary bands from AmbitionBox + LinkedIn Pune Salesforce listings
 *  - Hiring companies: services majors + Salesforce-native consulting partners
 *  - Cert exam costs explicitly separate from course fee
 *
 * Pillar 4 P3-01 rich content + P4-10 follow-up — third of 4.
 */

export const salesforceTrainingInPune: CourseRichContent = {
  intro:
    "Salesforce Admin + Developer is the most accessible high-paying platform engineering career in Pune for non-CS graduates and Java developers alike. This 3-month programme combines the declarative Admin track (Lightning, Flows, Validation Rules, Reports — aligned to ADM 201) with the programmatic Developer track (Apex, SOQL, Lightning Web Components — aligned to Platform Developer I / PD1). Hands-on throughout in a real Salesforce Developer Edition org, finishing with a deployed sample application and certification-ready exam preparation.",

  whyLearn: {
    heading: "Why Learn Salesforce in Pune in 2026",
    paragraphs: [
      "Salesforce is the world's #1 CRM platform with 150,000+ customer organisations and an ecosystem worth ~$1.6 trillion in attached jobs by 2028 (IDC estimate). Pune sits at the centre of India's Salesforce delivery: Cognizant's Pune Salesforce practice runs into the thousands of engineers, Accenture and TCS both have dedicated Pune Salesforce centres of excellence, and the boutique Salesforce-native partners — CloudFulcrum, Saksoft, Saviynt, Mphasis — concentrate their delivery teams here. Pune Salesforce role listings ran 400–700 per month consistently through 2025 across Naukri and LinkedIn, and the demand is structurally tied to enterprise digital transformation — not a hype cycle.",
      "What makes Salesforce uniquely attractive as a career path: high salary entry point, low coding barrier on the Admin side, structured certification ladder that directly maps to compensation increases, and global mobility. A Pune Salesforce Developer with 4 years experience + Platform Developer II cert can move to a US/Canada/Australia offer without changing employers — Salesforce's offshore practice is built around this mobility model. We don't oversell this; it's the realistic outcome for graduates who chase the cert ladder consistently.",
      "A large share of Pune postings ask for combined Admin + Developer profiles, which is why this course teaches both halves together rather than as two separate tracks. That is not the only viable route: our Salesforce Career Guide 2026 sets out eight distinct career paths, and pure administration, business analysis and the cloud specialisations are all genuinely hireable on their own — we teach each of them as a separate course. Take this combined programme if you want both halves at once; take the single-path course if you want depth in one.",
    ],
    keyPoints: [
      "400–700 active Pune Salesforce job listings each month (2025)",
      "Fresher band ₹3.5–5 LPA services / ₹5–7 LPA Salesforce-native partners",
      "ADM 201 + PD1 stack = ₹0.5–1.5 LPA offer bump",
      "Sr Salesforce Developer in Pune = ₹10–18 LPA at 4–6 yrs",
      "Salesforce Architect / Lead Developer = ₹18–30 LPA at 7+ yrs",
      "Strong global mobility — offshore-to-onshore career arc",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Non-IT graduates (BBA, BCom, BCA, BSc) wanting a high-paying platform engineering career without traditional CS coursework",
      "Functional consultants and business analysts who want to add Salesforce platform skills",
      "Java developers pivoting to Salesforce platform engineering (Apex syntax is Java-like; the transition is structurally easy)",
      "Career changers from operations, sales support, or HR who already understand business processes",
      "Working professionals (weekend batch) committed to 6 hrs/week for 12 weeks plus 4–6 hrs/week of self-study for cert prep",
    ],
    notForYou: [
      "Anyone targeting pure-coding product-engineering roles — Salesforce is a platform, not a general-purpose language",
      "People who want a 100% hands-off learn-by-watching format — this course is heavy on org-based exercises and Trailhead Superbadges",
      "Candidates expecting to skip certifications — the Pune Salesforce hiring funnel filters hard on ADM 201 minimum, PD1 preferred",
      "Folks unwilling to invest extra in exam fees (~₹16,500 per cert, paid separately to Salesforce)",
    ],
  },

  curriculum: [
    {
      title: "CRM Concepts, the Salesforce Platform & Your Org",
      weekRange: "Week 1",
      description:
        "What a CRM is for before any of Salesforce's vocabulary is used — the business problem of one customer record shared across sales, service and marketing, and why companies buy a platform rather than build one. The product map follows so that later choices are informed: Sales Cloud, Service Cloud, Experience Cloud, Marketing Cloud and Data Cloud, and which of them Pune delivery teams actually staff for.\n\nThe org is then set up the way you will use it for the next twelve weeks: a free Developer Edition org, a Trailhead account, Setup and the object manager, and the Lightning Experience interface. The admin and developer split is made explicit — what is configured and what is coded — along with the sandbox and production distinction, release cycles, and how to read Salesforce's own documentation and release notes, which is a working skill in itself.",
      topics: [
        "CRM concepts and the single customer record",
        "Sales, Service, Experience, Marketing and Data Cloud",
        "Which clouds Pune delivery teams actually staff",
        "Developer Edition org and Trailhead playground setup",
        "Lightning Experience, Setup and the Object Manager",
        "Admin against developer responsibilities",
        "Orgs, sandboxes and the three-release-a-year cycle",
        "Reading Salesforce documentation and release notes",
      ],
    },
    {
      title: "The Data Model — Objects, Fields & Relationships",
      weekRange: "Week 1",
      description:
        "The standard object model first, because everything else sits on it: Account, Contact, Lead, Opportunity, Case and the record lifecycle each one implies, including the conversion path from Lead to Account, Contact and Opportunity that trips up newcomers.\n\nCustom objects and the full field-type tour follow, with the choices that are expensive to reverse called out — picklist against text, currency and roll-up behaviour, and the external ID that makes an integration idempotent. Relationships are the heart of the module: lookup against master-detail, what cascade delete and roll-up summary fields buy you, the many-to-many junction object, hierarchical relationships on User, and schema-builder diagrams. The module closes on schema design from a written brief, and on the limits that shape it — field counts, object counts and record types.",
      topics: [
        "Standard objects and the record lifecycle",
        "Lead conversion into Account, Contact and Opportunity",
        "Custom objects and the full field-type tour",
        "Picklists, global value sets and dependent picklists",
        "External IDs and idempotent integration",
        "Lookup against master-detail relationships",
        "Roll-up summary fields and cascade delete",
        "Junction objects for many-to-many",
        "Designing a schema from a written brief",
      ],
    },
    {
      title: "Security & Access — Profiles, Permission Sets & Sharing",
      weekRange: "Week 2",
      description:
        "The single largest area in the ADM 201 exam and the one Pune interviews probe hardest, taught as the layered model it actually is: what you can log into, then what objects and fields you can touch, then which records. Licences, profiles, permission sets and permission set groups with muting, built the modern way — a minimal profile plus permission sets — because Salesforce is winding permissions down on profiles in favour of permission sets.\n\nRecord access is then built from the outside in: organisation-wide defaults set restrictively, the role hierarchy opening access upward, sharing rules and criteria-based sharing widening it sideways, teams and manual sharing for exceptions, and Apex managed sharing where declarative tools run out. Field-level security, login IP ranges, multi-factor authentication, and the 'why can this user see this record' diagnosis exercise close the module.",
      topics: [
        "Licences, profiles and the minimal-profile approach",
        "Permission sets, permission set groups and muting",
        "Object, field and record permissions as separate layers",
        "Organisation-wide defaults set restrictively",
        "Role hierarchy, sharing rules and criteria-based sharing",
        "Account and opportunity teams, and manual sharing",
        "Apex managed sharing, at primer depth",
        "Field-level security and encrypted fields",
        "Diagnosing why a user can or cannot see a record",
      ],
    },
    {
      title: "UI Configuration — Lightning Pages, Layouts & Record Types",
      weekRange: "Week 3",
      description:
        "Shaping what a user sees, which is most of what an administrator is asked for day to day. Page layouts and compact layouts, Lightning record pages assembled in the App Builder, dynamic forms and dynamic actions so that fields and buttons appear by condition rather than by profile-specific layout sprawl, and component visibility rules.\n\nRecord types and business processes then handle the case where one object serves two different teams with different picklist values and different page layouts — the pattern behind a large share of real org design. Lightning apps and navigation, list views with filters and inline editing, global and quick actions, path and kanban views, and mobile layout considerations complete the module, along with the discipline of designing for the user's actual task rather than exposing every field on the object.",
      topics: [
        "Page layouts, compact layouts and field arrangement",
        "Lightning record pages and the App Builder",
        "Dynamic forms and dynamic actions",
        "Component visibility rules",
        "Record types and business processes",
        "Lightning apps, navigation and utility bar",
        "List views, filters and inline editing",
        "Global actions, quick actions, path and kanban",
        "Designing for the task rather than the schema",
      ],
    },
    {
      title: "Formula Fields & Validation Rules",
      weekRange: "Week 3",
      description:
        "The formula language, given a module of its own because it is a screen-out question in Pune Salesforce interviews and because it reappears in validation rules, flows, reports and Lightning page visibility. Operators and functions across text, number, date and logic; `IF`, `CASE`, `ISBLANK` against `ISNULL`, `PRIORVALUE` and `ISCHANGED`; cross-object formulas that traverse a lookup; and formulas that return an image or a hyperlink for a genuinely more usable record page.\n\nValidation rules are then written as the inverse of a formula — a rule fires when the expression evaluates to true — with the error placement and message wording that makes the difference between a helpful guard rail and a support ticket. Roll-up summaries, the compile-size limit, and the debugging method for a formula that returns the wrong answer close the module.",
      topics: [
        "Formula data types, operators and functions",
        "IF, CASE, ISBLANK against ISNULL",
        "PRIORVALUE, ISCHANGED and ISNEW in rules",
        "Cross-object formulas across a lookup",
        "Image and hyperlink formulas",
        "Validation rules and the true-means-block logic",
        "Error location, wording and bypass patterns",
        "Roll-up summary fields and their limits",
        "Debugging a formula that returns the wrong answer",
      ],
    },
    {
      title: "Declarative Automation with Flow Builder",
      weekRange: "Weeks 4–5",
      description:
        "Flow is now the automation tool, and this module is built on that: Workflow Rules and Process Builder were retired at the end of 2025, so they are covered only far enough that you can read and migrate the ones still sitting in older Pune orgs. Record-triggered flows are taught with the before-save against after-save distinction made concrete, because a before-save update on the same record is an order of magnitude cheaper and is the answer an interviewer is listening for.\n\nScreen flows build guided interfaces, scheduled flows handle batch work, and autolaunched and platform-event-triggered flows are called from elsewhere. Elements, variables, collections, loops and fault paths are worked through, then the parts that separate a flow that survives from one that does not: bulkification, the entry-condition and run-once discipline, the flow trigger explorer for ordering, subflows for reuse, error handling that notifies somebody, and debugging with the flow debugger and the debug log. Approval processes and Flow Orchestration close the module.",
      topics: [
        "Workflow Rules and Process Builder as retired legacy",
        "Record-triggered flows — before-save against after-save",
        "Screen flows and guided user interfaces",
        "Scheduled, autolaunched and platform-event flows",
        "Variables, collections, loops and assignments",
        "Bulkification and staying inside limits",
        "Entry conditions, recursion and the trigger explorer",
        "Fault paths, error handling and subflows",
        "Approval processes and Flow Orchestration",
      ],
    },
    {
      title: "Data Management & Data Quality",
      weekRange: "Week 5",
      description:
        "Loading, moving and trusting the data, which is where a real implementation spends more time than anyone budgets for. The Data Import Wizard and Data Loader compared on when each is right, then the mechanics that matter: field mapping, upsert against insert, external IDs as the key that makes a reload safe, record owner assignment, and turning automation off for a bulk load so a trigger does not fire ten thousand times.\n\nData quality follows — duplicate and matching rules, merge behaviour, required-field and validation strategy for imported data, and normalising picklist values that arrived as free text. The module closes on the operational side: data export and the weekly export service, backup and the honest fact that Salesforce's own recycle bin is not a backup, mass transfer and mass delete, storage limits, and the data-privacy obligations under India's DPDP Act when a sandbox holds real customer records.",
      topics: [
        "Data Import Wizard against Data Loader",
        "Field mapping, insert, update and upsert",
        "External IDs for safe, repeatable loads",
        "Disabling automation during a bulk load",
        "Duplicate rules, matching rules and merge",
        "Cleaning picklist and free-text values",
        "Export service, backup and what the recycle bin is not",
        "Mass transfer, mass delete and storage limits",
        "Sandbox data masking and DPDP obligations",
      ],
    },
    {
      title: "Reports, Dashboards & Analytics",
      weekRange: "Week 6",
      description:
        "The output business users actually judge an org by. Report types and the custom report type that unlocks a cross-object question, then the four formats — tabular, summary, matrix and joined — chosen by the question being asked rather than by habit. Filters, filter logic, cross filters and the 'records without related records' pattern that answers most churn and gap questions.\n\nBucket columns, row-level formulas, summary formulas, groupings and charts follow; then dashboards with dynamic dashboards that run as the viewing user, filters, component types and refresh behaviour. Sharing and folder access is treated as a security topic rather than an afterthought, subscriptions and scheduled reports deliver the numbers without anyone logging in, and the module closes on report performance on large data volumes and on CRM Analytics at orientation depth.",
      topics: [
        "Report types and custom report types",
        "Tabular, summary, matrix and joined reports",
        "Filters, filter logic and cross filters",
        "Records without related records",
        "Bucket columns, row-level and summary formulas",
        "Charts, groupings and conditional highlighting",
        "Dashboards, dynamic dashboards and filters",
        "Folder sharing, subscriptions and scheduled reports",
        "Report performance, and CRM Analytics in outline",
      ],
    },
    {
      title: "Apex Fundamentals",
      weekRange: "Weeks 6–7",
      description:
        "The developer half opens here, and it opens gently: the first sessions are programming foundations for the roughly forty per cent of each batch who arrive from commerce, science or operations backgrounds — variables, control flow, methods and objects — before any Apex-specific syntax. Java developers move through this in a session and go deeper on the platform specifics instead.\n\nApex itself is then covered as the strongly typed, Java-like language it is: primitives and sObjects, collections and when a Map is the right answer, classes, interfaces and inheritance, static against instance context, properties, exceptions and custom exception types, and the developer console, VS Code with the Salesforce Extension Pack and anonymous Apex as the working environment. The execution context is introduced early because everything later depends on it: what one transaction is, and what shares its limits.",
      topics: [
        "Programming foundations for non-coders",
        "Apex primitives, sObjects and type safety",
        "Lists, Sets and Maps, and choosing between them",
        "Classes, interfaces, inheritance and static context",
        "Exceptions, custom exceptions and try-catch-finally",
        "DML statements against the Database methods",
        "The transaction and execution context",
        "Developer Console, VS Code and anonymous Apex",
        "Apex against Java — what transfers and what does not",
      ],
    },
    {
      title: "SOQL, SOSL & Data Access",
      weekRange: "Week 7",
      description:
        "Getting data out of the platform. SOQL from the basics through the parts that carry marks and interview questions: parent-to-child and child-to-parent traversal, relationship queries, aggregate queries with `GROUP BY` and `HAVING`, date literals, `FOR UPDATE` locking, and binding variables safely.\n\nSOSL covers the cross-object text search that SOQL cannot do. The selectivity discussion is where this module earns its place: what makes a filter selective, custom indexes, skinny tables, the query optimiser, and the non-selective query error that appears the first time a student's code meets a real data volume. Query plans are read in the developer console, and the module closes on the security layer developers most often skip — `WITH USER_MODE`, `WITH SECURITY_ENFORCED`, `stripInaccessible` and the sharing keywords that decide whose access an Apex class runs under.",
      topics: [
        "SOQL syntax, filtering, ordering and limits",
        "Parent-to-child and child-to-parent relationship queries",
        "Aggregate queries, GROUP BY and HAVING",
        "Date literals, FOR UPDATE and bind variables",
        "SOSL for cross-object text search",
        "Selectivity, custom indexes and skinny tables",
        "Reading a query plan; the non-selective query error",
        "WITH USER_MODE, SECURITY_ENFORCED and stripInaccessible",
        "with sharing, without sharing and inherited sharing",
      ],
    },
    {
      title: "Triggers, Frameworks & Bulk-Safe Patterns",
      weekRange: "Week 8",
      description:
        "Trigger context first — before and after, insert, update, delete, undelete, `Trigger.new` against `Trigger.oldMap`, and which context can modify the record without a further DML statement. Then the discipline that separates production code from tutorial code: one trigger per object, no business logic inside the trigger, and a handler class that the trigger delegates to.\n\nA handler framework is built in class rather than described, with a recursion guard, a bypass switch for data loads, and a clear separation between trigger, handler and service layers. Bulk safety is drilled until it is reflex — never a query or DML inside a loop, always build a collection and act on it once — using deliberately unsafe code refactored under a two-hundred-record load. The order of execution is then walked end to end, because it explains almost every 'my validation rule fired before my flow' question, and the module closes on trigger and flow coexisting in one org without fighting.",
      topics: [
        "Trigger contexts and the Trigger context variables",
        "One trigger per object, logic in a handler class",
        "Building a handler framework with a recursion guard",
        "A bypass switch for data loads and integrations",
        "Never query or DML inside a loop",
        "Refactoring unsafe code under a bulk load",
        "The order of execution, walked end to end",
        "Trigger and Flow coexisting in one org",
        "Partial success with Database methods and Savepoints",
      ],
    },
    {
      title: "Governor Limits, Asynchronous Apex & Testing",
      weekRange: "Week 9",
      description:
        "Governor limits are the concept Salesforce developers are most reliably tested on, so they are taught by cause rather than as a table to memorise: multi-tenancy, what counts as one transaction, and which limits are per transaction against per day. Limit methods, the debug log's limit section, and deliberately breaching each major limit in a scratch exercise so the error message is familiar before it appears in production.\n\nAsynchronous Apex then follows as the answer to most limit problems: Queueable with chaining and finalizers, Batch Apex with `start`, `execute` and `finish` for large volumes, Scheduled Apex, and future methods with an honest account of why they are mostly legacy now. Testing closes the module and it is treated as design rather than as a coverage tax — test data factories, `Test.startTest` and `stopTest`, `System.Assert` with meaningful messages, mocking callouts, testing as a specific user, negative and bulk tests, and why seventy-five per cent coverage is a deployment gate rather than a quality bar.",
      topics: [
        "Multi-tenancy and why the limits exist",
        "Per-transaction against per-day limits",
        "Limits methods and the debug log limit section",
        "Queueable Apex, chaining and finalizers",
        "Batch Apex — start, execute, finish and stateful",
        "Scheduled Apex, and future methods as legacy",
        "Test data factories and Test.startTest",
        "System.Assert, mocking callouts and running as a user",
        "Negative tests, bulk tests and what coverage is not",
      ],
    },
    {
      title: "Lightning Web Components",
      weekRange: "Week 10",
      description:
        "The modern UI layer, built on web standards rather than a proprietary framework. Component structure and the module bundle, templates and directives, reactivity and the `@api`, `@track` and `@wire` decorators, and the lifecycle hooks with the render cycle they belong to. Parent-to-child through public properties and methods, child-to-parent through custom events, and the Lightning Message Service for components with no relationship to each other.\n\nData access is covered both ways — Lightning Data Service through `lightning/uiRecordApi` for record work without Apex, and wired or imperative Apex when the question is more complex — with the caching difference between them made explicit. The Salesforce Lightning Design System, base components and accessibility follow, then Jest unit tests with `sfdx-lwc-jest`, error and loading states, navigation, and surfacing a component on a record page, an app page and a screen flow.",
      topics: [
        "Component bundles, templates and directives",
        "@api, @track and @wire; reactivity rules",
        "Lifecycle hooks and the render cycle",
        "Parent-child communication and custom events",
        "Lightning Message Service across the page",
        "Lightning Data Service against wired and imperative Apex",
        "SLDS, base components and accessibility",
        "Jest unit tests with sfdx-lwc-jest",
        "Exposing a component to pages, apps and flows",
      ],
    },
    {
      title: "Integration — REST, Platform Events & External Services",
      weekRange: "Week 11",
      description:
        "Salesforce is rarely the only system in the estate, and integration work is a large share of Pune Salesforce delivery. Outbound first: named credentials and external credentials as the modern way to hold an endpoint and its authentication, HTTP callouts from Apex, callouts from a flow, JSON serialisation and deserialisation, the callout limits, and mocking a callout in tests because a real one is not allowed there.\n\nInbound covers the REST and SOAP APIs, custom Apex REST endpoints, Composite and Bulk API 2.0 for volume, and Connected Apps with the OAuth flows a client actually uses. Event-driven integration then covers Platform Events, Change Data Capture and the Pub/Sub API, followed by External Services from an OpenAPI specification and Salesforce Connect for external objects. The module closes on the failure modes: retries, idempotency, error logging and the integration user's permissions.",
      topics: [
        "Named credentials and external credentials",
        "Apex HTTP callouts and callouts from Flow",
        "JSON serialisation, deserialisation and wrapper classes",
        "Callout limits and mocking callouts in tests",
        "REST and SOAP APIs; custom Apex REST endpoints",
        "Composite API and Bulk API 2.0",
        "Connected Apps and the OAuth flows",
        "Platform Events, Change Data Capture and Pub/Sub API",
        "External Services, Salesforce Connect and retry design",
      ],
    },
    {
      title: "Release Management — Sandboxes, SFDX, Git & Deployment",
      weekRange: "Week 11",
      description:
        "How work actually reaches production, which is the part self-taught candidates most often cannot answer. Sandbox types and what each is for — Developer, Developer Pro, Partial Copy and Full — refresh cadence, sandbox seeding and masking real data, and designing an environment path rather than developing in production.\n\nThe modern toolchain is then used rather than described: Salesforce CLI, source format and the project structure, scratch orgs and source tracking, retrieving and deploying metadata, and Git with branches and pull requests holding the org's real history. Change sets are covered as the legacy path still in use at many Pune accounts, unlocked packages as the modular alternative, and a deployment is automated in GitHub Actions with tests as the gate. The module closes on release governance — destructive changes, deployment failures and how to read them, and the release-window discipline that keeps a Friday deploy from becoming a weekend.",
      topics: [
        "Sandbox types, refresh cadence and seeding",
        "Designing an environment path to production",
        "Salesforce CLI, source format and project structure",
        "Scratch orgs and source tracking",
        "Git branches, pull requests and code review",
        "Change sets as the legacy path",
        "Unlocked packages and modular metadata",
        "A GitHub Actions deployment gated on tests",
        "Destructive changes and reading deployment failures",
      ],
    },
    {
      title: "Einstein, Data Cloud & Agentforce",
      weekRange: "Week 12",
      description:
        "The platform's AI layer, at the depth that lets you hold a credible conversation in an interview and configure a working example — not architect-level depth, which is a separate specialisation. Data Cloud first, because the rest depends on it: data streams, data model objects, identity resolution and calculated insights, and why a customer data platform sits underneath the AI story rather than beside it.\n\nEinstein features that ship with the clouds are then configured — scoring, prediction and conversation tooling — followed by Prompt Builder for grounded prompt templates that reference real record data, and the Einstein Trust Layer, whose masking, zero-retention and audit properties are the first question an Indian BFSI or healthcare client asks. Agentforce closes the module: agent topics, actions backed by Flow and Apex, testing an agent's behaviour, and an honest account of where an agent is the wrong answer.",
      topics: [
        "Data Cloud — data streams and data model objects",
        "Identity resolution and calculated insights",
        "Einstein scoring, prediction and conversation features",
        "Prompt Builder and grounding a prompt in record data",
        "The Einstein Trust Layer — masking, retention, audit",
        "Agentforce topics, actions and instructions",
        "Backing an agent action with Flow or Apex",
        "Testing and evaluating agent behaviour",
        "Where an agent is the wrong answer",
      ],
    },
    {
      title: "Capstone, ADM 201 & PD1 Certification Preparation",
      weekRange: "Week 12 + placement prep",
      description:
        "The capstone runs the whole course through one org: a schema modelled from a written brief, a security model with organisation-wide defaults and permission sets, dynamic Lightning pages, validation rules, record-triggered and screen flows, a bulk-safe Apex trigger framework with tests above ninety per cent, an LWC front end with Jest tests, one outbound integration behind a named credential, reports and dashboards for the business owner, and the whole thing in a Git repository deployed through a sandbox with a README a stranger can follow.\n\nCertification preparation runs alongside it: full timed mock exams for ADM 201 and Platform Developer I, a weak-area review driven by the mock results rather than by the syllabus order, and the Trailhead Superbadges hiring managers look for. Interview preparation targets what Pune panels actually ask — walk through your order of execution, why this flow is before-save, how you would make this trigger bulk-safe, and how you would move it to production — with resume, LinkedIn and GitHub rewritten around the capstone and two mock interviews recorded and reviewed.",
      topics: [
        "Capstone org — schema, security, UI and automation",
        "Bulk-safe trigger framework with tests above 90%",
        "An LWC front end with Jest tests",
        "One outbound integration behind a named credential",
        "Deployment through a sandbox, tracked in Git",
        "Full timed ADM 201 and PD1 mock exams",
        "Weak-area review driven by mock results",
        "Trailhead Superbadges — Apex Specialist and LWC Specialist",
        "Two mock interviews, recorded and reviewed",
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
    src: "/images/courses/salesforce-path-v1.webp",
    width: 1400,
    height: 1146,
    alt: "Eleven-stage Salesforce Admin and Developer learning path taught at Archer Infotech Pune: platform and data model covering orgs, standard and custom objects, fields and relationships; security and access covering profiles, permission set groups, organisation-wide defaults and sharing rules; user interface configuration covering Lightning record pages, dynamic forms and record types; formulas and validation covering the formula language, cross-object formulas and validation rules; Flow Builder covering record-triggered, screen and scheduled flows with fault paths; data and reporting covering Data Loader, duplicate rules, report types and dashboards; Apex covering types, collections, SOQL, SOSL and query selectivity; triggers and limits covering handler frameworks, bulk-safe patterns, governor limits, asynchronous Apex and testing; Lightning Web Components covering decorators, wire adapters, Lightning Data Service and Jest tests; integration and release covering named credentials, REST callouts, Platform Events, Salesforce CLI, Git and deployment; and platform AI with the capstone, covering Data Cloud, Prompt Builder, Agentforce and ADM 201 and Platform Developer I certification preparation.",
    caption:
      "The order this course is taught in. Each stage expands into the modules below — nothing arrives before its prerequisite.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/salesforce-admin-plus-developer-syllabus-v1.pdf",
    title: "Salesforce Admin + Developer Course Syllabus — Complete Module List",
    slug: "salesforce-admin-developer-syllabus",
    blurb:
      "The complete eighteen-module syllabus as a PDF — the platform and data model, the security and sharing model, Lightning page configuration, formulas and validation rules, Flow Builder, data management, reports and dashboards, Apex, SOQL and SOSL, triggers and bulk-safe frameworks, governor limits and asynchronous Apex, Lightning Web Components, integration, release management with the Salesforce CLI and Git, Data Cloud and Agentforce, and the capstone with ADM 201 and PD1 preparation. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the PDF",
        items: [
          "All eighteen modules in teaching order, week by week, across the full three-month Admin and Developer programme.",
          "The security model in the depth ADM 201 tests it — licences, permission set groups, organisation-wide defaults, role hierarchy, sharing rules and Apex managed sharing.",
          "The developer half in full: a trigger handler framework built in class, bulk-safe refactoring under load, governor limits by cause, asynchronous Apex and testing as design.",
          "The parts most syllabi omit — the order of execution, query selectivity and custom indexes, named credentials, and a GitHub Actions deployment gated on tests.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "Salesforce Administrator — the ADM 201 half, taught on a real org rather than slides.",
          "Salesforce Developer — Apex, LWC and integration to Platform Developer I standard.",
          "Salesforce Consultant — the combined profile most Pune postings actually ask for.",
          "Salesforce Business Analyst — process design, data modelling and reporting.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "Custom CRM for a Sample Business",
      description:
        "Build a complete Salesforce org for a sample business — custom object model, page layouts, validation rules, automation flows, a sales funnel report dashboard. Demonstrates Admin track competency end-to-end. The artefact most hiring managers ask to walk through at interview.",
      technologies: ["Salesforce Lightning Experience", "Custom objects + relationships", "Flow Builder", "Validation Rules + Formula Fields", "Lightning App Builder", "Reports + Dashboards"],
    },
    {
      title: "Apex Trigger Framework with Bulk-Safe Patterns",
      description:
        "Implement a production-grade trigger handler framework on a custom object — full unit test coverage at 90%+, bulk-safe DML operations, governor-limit-aware design. Push to a GitHub repository with a README walking through the pattern. The portfolio piece that proves Developer competence to PD1-level hiring managers.",
      technologies: ["Apex (triggers + classes)", "Test classes + 90% coverage", "Handler/Dispatcher framework pattern", "SOQL + SOSL", "GitHub"],
    },
    {
      title: "LWC + Apex Mini-App (Capstone)",
      description:
        "A working Lightning Web Component that fetches Salesforce data via Apex, renders a custom UI with parent-child communication, handles errors gracefully, and writes back to the org. Includes unit tests for both the LWC (Jest) and the Apex back-end. This is the project that closes interviews for LWC-emphasised JDs at Pune Salesforce-native partners.",
      technologies: ["Lightning Web Components", "Apex", "Jest (LWC testing)", "Lightning Data Service", "Salesforce CLI", "VS Code Salesforce Extensions"],
    },
  ],

  trainersIntro:
    "Lead trainer for the Salesforce track has been an active Pune Salesforce delivery engineer for years — both certifications taught (ADM 201 + PD1) and platform patterns shown reflect what hiring managers screen for today, not certification material from 2018.",

  careerOutcomes: {
    paragraphs: [
      "Pune Salesforce hiring has two distinct bands. Services majors (Cognizant, Accenture, TCS, Wipro, Capgemini, Infosys) hire Salesforce fresher consultants at ₹3.5–5 LPA — usually for delivery on US/UK/AU client engagements where the offshore-to-onshore arc kicks in after 18–24 months. Salesforce-native consulting partners (CloudFulcrum, Saksoft, Saviynt, Mphasis Stelligent, Persistent's Salesforce practice) pay 30–50% more for fresher hires (₹5–7 LPA) because their billing model has higher per-engineer margins. Both bands expect ADM 201 minimum at hire; PD1 in 6 months is the implicit expectation.",
      "The compensation arc moves faster than most India tech tracks. 1+ year experience + ADM 201 + PD1 + a working LWC portfolio = ₹6–10 LPA. 3 years + Platform Developer II + integration patterns experience = ₹12–18 LPA. 6 years + Salesforce Architect or Application Architect certs = ₹20–30+ LPA. Onshore (US/UK/AU) Salesforce Developer offers at this experience band typically land $90K–140K USD. Source data: AmbitionBox + LinkedIn Pune Salesforce listings (last 12 months), cross-validated against Glassdoor Pune Salesforce salary reports.",
    ],
    salaryBands: [
      {
        role: "Salesforce Admin / Developer (fresher)",
        band: "₹3.5–5 LPA (services) / ₹5–7 LPA (Salesforce-native partner)",
        source: { label: "AmbitionBox Pune Salesforce Developer", url: "https://www.ambitionbox.com/profile/salesforce-developer-salary?experience=0" },
      },
      {
        role: "Salesforce Consultant (1–3 yrs)",
        band: "₹6–10 LPA",
        source: { label: "LinkedIn Pune Salesforce listings", url: "https://www.linkedin.com/jobs/search/?keywords=salesforce&location=Pune" },
      },
      {
        role: "Senior Salesforce Developer (3–6 yrs)",
        band: "₹12–18 LPA",
        source: { label: "Glassdoor Pune Salesforce Developer", url: "https://www.glassdoor.co.in/Salaries/pune-salesforce-developer-salary-SRCH_IL.0,4_IM1064_KO5,25.htm" },
      },
      {
        role: "Salesforce Architect / Lead (6+ yrs)",
        band: "₹18–30 LPA",
        source: { label: "AmbitionBox Pune Salesforce Architect", url: "https://www.ambitionbox.com/profile/salesforce-architect-salary" },
      },
    ],
    hiringCompanies: [
      "Cognizant Pune (Salesforce practice)",
      "Accenture Pune (Salesforce CoE)",
      "TCS Pune (CRM Next + Salesforce)",
      "Capgemini",
      "Wipro",
      "Infosys",
      "Mindtree (LTIMindtree)",
      "Tech Mahindra",
      "Persistent Systems (Salesforce practice)",
      "CloudFulcrum (Salesforce-native partner)",
      "Saksoft",
      "Saviynt",
      "Mphasis Stelligent",
      "Coforge",
      "IBM India (Salesforce practice)",
    ],
    rolesAfterCourse: [
      "Salesforce Administrator",
      "Salesforce Developer",
      "Salesforce Consultant (combined Admin+Dev)",
      "Salesforce Business Analyst",
      "Salesforce Platform Engineer",
      "Apex Developer",
      "LWC Developer (with Sr experience)",
    ],
  },

  modesAndDuration: {
    duration: "3 months (12 weeks) for the weekday/online track; 14 weeks for the weekend track",
    classroom: {
      location: "Archer Infotech Kothrud campus (Flat No. 12, Divyadarshan Housing Society, Kothrud, Pune 411038)",
      timing: [
        "Morning batch: Monday–Friday 10:30–12:00",
        "Evening batch: Monday–Friday 19:00–20:30",
        "Saturday lab session: 10:00–13:00 (Trailhead Superbadge + org practice)",
      ],
    },
    online: {
      timing: ["Live sessions: Monday–Friday 20:00–21:30 IST", "Recordings in LMS within 24 hrs"],
      tools: ["Google Meet for live sessions", "Salesforce Developer Edition org (free)", "Trailhead playground (free)", "VS Code + Salesforce Extensions (free)", "Slack batch channel"],
    },
    weekend: {
      timing: ["Saturday + Sunday 10:00–13:00 (6 hrs/week)"],
      durationNote: "Weekend track runs 14 weeks to maintain total contact-hour parity",
    },
    batchPolicy:
      "Batch sizes capped at 18 weekday + online, 12 weekend. New batches start every 4–6 weeks for the Salesforce track (slightly slower cadence than core dev tracks due to higher per-batch trainer demand). Book early — the track is among our most-requested.",
  },

  fees: {
    note: "Salesforce Admin + Developer is priced in the upper-mid band of our catalogue reflecting the 3-month duration and the per-batch trainer demand. Certification exam fees (ADM 201 ~₹16,500 / PD1 ~₹16,500) are paid separately to Salesforce when you sit for the exams. EMI available; contact admissions for current fee.",
    range: "₹35,000 – ₹50,000 (typical track band) + Salesforce exam fees if pursued",
    sourceCitation: { label: "Archer Infotech 2026 fee schedule", url: "/contact" },
    paymentOptions: [
      "One-time payment (5% discount)",
      "EMI: 50% at enrolment + 50% at week 6",
      "EMI: 3-month plan (1/3 monthly)",
      "Note: Salesforce exam fees billed separately by Salesforce when you sit",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support is bundled — no separate fee. The Salesforce placement pipeline runs slightly differently than our other tracks: services-major hiring tends to happen in 4 quarterly intake batches, while Salesforce-native partners hire continuously throughout the year. We map graduate readiness against both. The placement workflow starts in Week 8 (during the Apex module) — CV review, GitHub portfolio audit, cert-readiness check — so by graduation week your portfolio is reviewed and you've done 2 mock interviews.",
      "We don't guarantee placement. Our institute-records rate is 90% across all tracks. The Salesforce track runs slightly below average specifically because hiring managers gate hard on ADM 201 certification — graduates who postpone the cert exam beyond 6 weeks of course completion place noticeably slower. About 70–80% of our Salesforce graduates clear ADM 201 within 3 months of course completion; PD1 typically follows 3–6 months later.",
    ],
    process: [
      "Week 8: CV review + GitHub portfolio audit + cert-readiness check (ADM 201)",
      "Week 10: First mock interview (technical — Admin scenarios + basic Apex)",
      "Week 12: Second mock interview (LWC scenarios + integration patterns) + cert-readiness check (PD1)",
      "Post-completion Week 1–4: Direct introductions to 10+ partner companies (services + Salesforce-native)",
      "Post-completion Week 5–12: Weekly placement-cell check-ins + cert-prep coaching as you apply",
    ],
    partnerCompanies: [
      "Cognizant",
      "Accenture",
      "TCS",
      "Capgemini",
      "Persistent Systems (Salesforce practice)",
      "Wipro",
      "Infosys",
      "Coforge",
      "MindTree (LTIMindtree)",
      "100+ partner companies including the boutique Salesforce-native partner network",
    ],
  },

  comparison: {
    intro:
      "How Archer Infotech's Salesforce Admin + Developer track compares against the typical Pune training-institute offering. Anonymous comparison from candidates who switched in.",
    rows: [
      { feature: "Track structure", archer: "Combined Admin + Developer in one 12-week track (matches Pune hiring market)", typical: "Sold as 2 separate tracks (8-week Admin + 12-week Dev) totalling 20 weeks + higher fee" },
      { feature: "Automation tool taught", archer: "Flow Builder primary (Salesforce's 2023+ recommended tool); Process Builder mentioned as legacy", typical: "Process Builder still taught as primary — deprecated by Salesforce" },
      { feature: "Permission model coverage", archer: "Permission Set Groups (modern); profiles covered as legacy context", typical: "Profile-only model — the 2018 way" },
      { feature: "LWC depth", archer: "Full module + Jest unit testing + capstone LWC+Apex mini-app", typical: "LWC mentioned, no real component build" },
      { feature: "Trigger framework discipline", archer: "Handler/Dispatcher pattern + bulk-safe DML practice", typical: "Inline trigger logic — the anti-pattern" },
      { feature: "Cert prep depth (ADM 201 + PD1)", archer: "2 full timed mock exams per cert + Trailhead Superbadges", typical: "PowerPoint walkthrough only" },
      { feature: "Class size", archer: "Under 18 weekday / under 12 weekend", typical: "30–40 per batch" },
      { feature: "Placement cell handoff", archer: "Starts Week 8 — portfolio + certs aligned by graduation", typical: "Placement starts after course completion" },
    ],
    closing:
      "The differentiator at hiring stage is the combined Admin + Developer structure plus the LWC+Apex capstone. Pune Salesforce-native partners specifically look for the LWC capstone artefact on GitHub during the technical screen.",
  },

  versusAlternative: {
    heading: "Salesforce vs SAP / Oracle ERP — Which Platform Career Should You Pick?",
    paragraphs: [
      "All three are major enterprise platform careers with Pune delivery footprints, but the entry economics differ. Salesforce has the lowest barrier-to-entry for non-CS graduates because the Admin track is largely declarative — point-and-click, not code. SAP and Oracle ERP both require deeper functional consulting backgrounds at entry (1+ year of business process exposure). Salesforce hires faster off our course but the fresher salary band sits ₹0.5–1 LPA below the SAP fresher band. Trade-off: faster entry, slightly lower starting offer.",
      "On the career arc, Salesforce typically outperforms SAP and Oracle for 4–6 year experienced engineers because Salesforce's product evolution (Lightning, LWC, Einstein AI, Data Cloud) keeps adding new specialisations that pay above-market. SAP's pace is steadier but more entrenched. Honest read: if you have a coding inclination and want platform engineering with continuous innovation, Salesforce. If you have a deep business process background and want stable enterprise consulting, SAP. Both work in Pune.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "The Admin half of the course assumes no IT background; basic computer literacy is enough. About 40% of each batch come from non-CS backgrounds (BBA, BCom, BCA, BSc-non-CS) and finish at the same level. The Developer half (Apex, LWC) does involve programming, and we allocate the first ~2 weeks of the Developer module specifically to programming foundations for non-coders — variables, control flow, functions, basic OOP. Java developers pivoting in skip this fast and accelerate through Apex/LWC; non-coders catch up by end of Module 3 with structured practice.",
      "The 5-step starting sequence below makes Week 1 smoother. Most of it is free.",
    ],
    suggestedSteps: [
      "Sign up for a free Salesforce Developer Edition org at developer.salesforce.com — we'll use this throughout",
      "Create a free Trailhead account — Trailhead is Salesforce's gamified learning platform; you'll earn badges + Superbadges through the course",
      "Install VS Code + the Salesforce Extension Pack (free)",
      "Watch the Salesforce 'Trailhead Quick Start' module (~30 min) so the platform UI is familiar before Week 1",
      "Set up a GitHub account — your Apex trigger framework + LWC capstone will live there as portfolio artefacts",
    ],
  },

  faqs: [
    {
      question: "Should I start with Admin or Developer first?",
      answer:
        "Both — and the course handles the sequencing for you. The Pune Salesforce hiring market overwhelmingly hires combined Admin + Developer profiles ('Salesforce Consultant'), not pure-Admin or pure-Developer. We sequence Admin first (lower complexity, builds platform fluency) then Developer (deeper). Splitting them into separate tracks costs 4 extra weeks and a higher fee for no hiring-market advantage.",
    },
    {
      question: "Do I need programming experience to take this course?",
      answer:
        "Not for the Admin half — about 40% of each batch comes from non-CS backgrounds (commerce, BBA, science) and completes the Admin track at the same level as engineering graduates. The Developer half (Apex, LWC) does involve programming but starts gently — Apex syntax is Java-like and we dedicate the first ~2 weeks specifically to programming foundations for non-coders. By Module 4 the cohorts converge.",
    },
    {
      question: "What does Salesforce certification cost and is it included?",
      answer:
        "Course prep is included; the exam fees are paid separately to Salesforce. ADM 201 (Administrator) ~₹16,500, PD1 (Platform Developer I) ~₹16,500. You sit for the exams when you're ready — typically 6 weeks for ADM 201 and 3–6 months later for PD1. About 70–80% of our trainees clear ADM 201 within 3 months of course completion; PD1 clearance rate at first attempt sits around 60–70% which is in line with the global Salesforce average.",
    },
    {
      question: "What does the Pune Salesforce job market actually look like?",
      answer:
        "Strong and structural, not hype. Pune hosts the Salesforce delivery centres of every major services firm — Cognizant, Accenture, TCS, Capgemini, Wipro, Infosys — plus Salesforce-native consulting partners (CloudFulcrum, Saksoft, Saviynt, Mphasis Stelligent). 400–700 active Salesforce listings per month across Naukri + LinkedIn in 2025. Fresher salaries ₹3.5–5 LPA at services majors, ₹5–7 LPA at Salesforce-native partners. Source: AmbitionBox + LinkedIn Pune Salesforce listings, last 12 months.",
    },
    {
      question: "Can I transition from a non-IT job to Salesforce in 3 months?",
      answer:
        "Realistic timeline: 3 months of focused course work + 4–6 weeks of dedicated cert prep + 1–2 months of active applications = first offer typically in 5–6 months from enrolment. About 40% of our Salesforce graduates come from non-IT backgrounds. The path works; it requires consistency on cert completion and a willingness to do 4–6 hrs/week of additional Trailhead practice beyond classroom hours.",
    },
    {
      question: "Will the course cover Salesforce Marketing Cloud, Service Cloud, or Industry Clouds?",
      answer:
        "Sales Cloud + Service Cloud are covered at depth (they make up 80% of Pune hiring). Marketing Cloud has its own architecture and is typically a separate specialisation track — out of scope here. Industry Clouds (Health Cloud, Financial Services Cloud) build on the Sales Cloud foundation — covered conceptually in the closing weeks so you can pivot into them post-course. Experience Cloud (community / portal) is covered in the Lightning module.",
    },
    {
      question: "What about Data Cloud and Einstein AI / Agentforce?",
      answer:
        "Both are covered as introductions in the closing weeks. Data Cloud is Salesforce's customer data platform — the fundamentals get a session. Agentforce (Salesforce's 2024 agentic AI layer) is covered conceptually with hands-on tool-call configuration. Deep specialisation in either requires a follow-on focused track; the goal here is enough literacy to discuss both at interview, not architect-level depth.",
    },
    {
      question: "What if I want to relocate or work onshore (US/UK/Australia) eventually?",
      answer:
        "Salesforce has one of the cleanest offshore-to-onshore career arcs of any platform stack. Realistic timing: 18–24 months at a services major in Pune + relevant client engagement on US/UK/AU accounts + the right certifications (typically ADM 201 + PD1 + Application Architect by year 5) = onshore deputation or transfer offers become realistic. Onshore Salesforce Developer base salaries land $90K–140K USD typically. We don't promise this; we map the realistic path.",
    },
  ],

  finalCta: {
    heading: "Ready to start Salesforce training in Pune?",
    paragraph:
      "Three months from now you can have ADM 201 + PD1 prep complete, a deployed CRM org on your portfolio, a working Apex trigger framework + LWC capstone on GitHub, and a placement cell actively introducing you to Pune Salesforce hiring managers. The next batch typically starts within 4 weeks; weekday, weekend, and live-online formats all available. Visit the contact page, message us on WhatsApp, or call admissions for the current batch schedule.",
  },
};
