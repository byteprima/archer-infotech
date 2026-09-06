import type { CourseRichContent } from "./types";

export const firebaseTrainingInPune: CourseRichContent = {
  intro:
    "Firebase is the de-facto Backend-as-a-Service (BaaS) for mobile-first applications in Pune startups — single-team mobile / web teams, solopreneurs, and early-stage fintech / consumer-tech companies use Firebase to ship full-stack mobile apps without building or operating a backend. Archer Infotech's Firebase Development training in Pune teaches the platform as it is actually used in 2026 — the modern Firebase stack on Google Cloud (post the 2024 'Firebase is now part of Google Cloud' branding rollup), Firestore for real-time document database, Firebase Authentication, Cloud Functions (now powered by Cloud Run under the hood), Firebase Hosting, Firebase Cloud Messaging, plus the newer additions (Firebase Genkit for GenAI, Firebase Data Connect for SQL-relational integration, Firebase App Hosting). The course is the right complement to our Android / Flutter / React Native / React courses for students who want to build full-stack mobile apps with one team. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Firebase in 2026",
    paragraphs: [
      "Firebase is the most-deployed mobile-app backend in Pune startup hiring — Indeed Pune doesn't list 'Firebase Developer' as a standalone job title (it's not), but Firebase fluency is listed as required or preferred on 800+ Pune mobile / full-stack JDs as of May 2026. The biggest employers using Firebase as production backend are Pune-based fintech / consumer-tech / health-tech / ed-tech startups, plus several Pune captives and BFSI mobile teams that use Firebase for specific apps. The economics are compelling — for early-stage and mid-stage companies, Firebase replaces a backend team with a managed service.",
      "What changed in 2026: Firebase has fully integrated into Google Cloud (the 2024 rollup). Cloud Functions for Firebase is now Cloud Run-backed under the hood. Firebase Genkit (released 2024) is the GenAI toolkit for building AI-powered features on Firebase. Firebase Data Connect (released 2024) brings managed Postgres into the Firebase ecosystem for the use cases where Firestore's document model isn't right. Firebase App Hosting (preview / GA in 2024–2025) is the modern deployment path for Next.js / Angular / Vue web apps with SSR support. Firestore has gotten Realtime Database-equivalent latency, plus better aggregations and indexing.",
      "What this means for hiring: 2026 Pune Firebase JDs (or rather, mobile / full-stack JDs that list Firebase) expect Firestore data-modelling at depth (the security-rules-driven access model is unique), Firebase Auth flows, Cloud Functions for serverless logic, FCM for push notifications, plus the newer additions where they earn their place (Genkit for GenAI, Data Connect for SQL).",
    ],
    keyPoints: [
      "Listed as required / preferred on 800+ Pune mobile / full-stack JDs (May 2026)",
      "De-facto BaaS for Pune startup mobile apps",
      "Firebase fully integrated into Google Cloud (2024 rollup)",
      "Firestore + Firebase Auth + Cloud Functions + FCM — the core 2026 stack",
      "Genkit for GenAI + Data Connect for SQL — 2024+ additions",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Working Android / iOS / Flutter / React Native developer wanting to add Firebase for full-stack mobile",
      "Working React / Next.js developer wanting Firebase for serverless backend",
      "Engineering / BCS / MCA student preparing for our mobile tracks (Firebase is a natural complement)",
      "Founder / solopreneur shipping a mobile MVP — Firebase is the right backend for solo / small teams",
      "Working backend developer wanting to add a managed BaaS to your toolkit",
      "Career restarter targeting Pune startup mobile-development",
    ],
    notForYou: [
      "If your goal is heavy-OLTP transactional workloads (financial-ledger style) — Firestore isn't the right tool",
      "If your goal is enterprise / BFSI backend — Firebase isn't the right institutional fit",
      "If you want SQL / relational depth — pick our Postgres or Oracle course",
      "If you cannot put in 5–6 hours per week of practice outside class",
      "If you have 2+ years of production Firebase experience — talk to us about advanced specialisations",
    ],
  },

  curriculum: [
    {
      title: "Firebase in 2026 — Platform, Projects & the Emulator Suite",
      weekRange: "Week 1",
      description:
        "What Firebase actually is after the Google Cloud consolidation: a set of managed services sitting on the same projects, IAM and billing as the rest of Google Cloud, rather than a separate product. The product map is worked through so that later choices are informed — Authentication, Firestore, Realtime Database, Cloud Functions, Cloud Storage, Hosting, Cloud Messaging, Crashlytics, Analytics, Remote Config — with the question each one answers.\n\nThe project is then set up the way a team would rather than the way a tutorial does: separate projects for development, staging and production, the Firebase CLI and project aliases, configuration kept out of source control, and the Local Emulator Suite running Auth, Firestore, Functions and Storage on the laptop. The emulator is treated as the daily driver from week one, because developing against a live production project is how student projects lose data and run up bills.",
      topics: [
        "Firebase as part of Google Cloud — projects, IAM and billing",
        "The product map and what each service is for",
        "Separate dev, staging and production projects",
        "The Firebase CLI, project aliases and firebase.json",
        "The Local Emulator Suite as the daily driver",
        "Seeding and exporting emulator data",
        "SDK setup for web, Android, iOS and Flutter",
        "Spark and Blaze plans, and what actually triggers cost",
      ],
    },
    {
      title: "Firebase Authentication",
      weekRange: "Week 1",
      description:
        "Identity, which every other Firebase feature depends on because security rules are written against it. The provider set is built out in class — email and password with verification and reset, phone and OTP as the dominant flow in India, Google, Apple, GitHub and Microsoft federated sign-in, and anonymous accounts later upgraded to a permanent identity without losing the user's data.\n\nThe token model is then made explicit: the ID token, its expiry and refresh, and how it reaches both security rules and your own backend. Custom claims are used for role-based access, with the propagation delay that catches people out; the Admin SDK verifies tokens server-side; and custom tokens integrate an existing authentication system. Multi-factor authentication, account linking, and the session and sign-out edge cases close the module.",
      topics: [
        "Email and password, verification and password reset",
        "Phone and OTP sign-in, and its India-specific rate limits",
        "Google, Apple, GitHub and Microsoft federated sign-in",
        "Anonymous accounts and upgrading them in place",
        "ID tokens, refresh and expiry",
        "Custom claims for roles, and claim propagation delay",
        "Admin SDK token verification on your own backend",
        "Custom tokens for an existing auth system",
        "Multi-factor authentication and account linking",
      ],
    },
    {
      title: "Firestore — Data Model, Queries & Aggregation",
      weekRange: "Week 2",
      description:
        "Firestore's model in its own terms: documents, collections and subcollections, document references, the 1MB document limit, and the field types that differ from plain JSON — timestamps, geopoints, references and arrays.\n\nQueries are then taught alongside their constraints, because Firestore's limits are the thing that most shapes a design. Equality and range filters and the single-range-field rule, `orderBy` interaction, `array-contains` and `in` with their element caps, cursor pagination with `startAfter`, and the composite indexes the console asks you to create. Real-time listeners are contrasted with one-off reads on both cost and behaviour, `count`, `sum` and `average` aggregation queries are used to avoid reading a collection to size it, and transactions and batched writes complete the module.",
      topics: [
        "Documents, collections, subcollections and references",
        "Field types — timestamp, geopoint, reference, array, map",
        "Equality and range filters, and the single-range rule",
        "orderBy, array-contains, in and their limits",
        "Cursor pagination with startAfter and limit",
        "Composite indexes and index exemptions",
        "Real-time listeners against one-off reads",
        "count, sum and average aggregation queries",
        "Transactions and batched writes",
      ],
    },
    {
      title: "Firestore Data Modelling for Scale",
      weekRange: "Week 2",
      description:
        "Modelling for a database billed per document read, where the cost of a design is visible on an invoice. Denormalisation is the default rather than a compromise: duplicate the fields a screen needs so the screen is one read, and keep the copies consistent with a Cloud Function. Root collections against subcollections, and the collection-group query that makes subcollections searchable across parents.\n\nCounters and aggregates are held as fields rather than computed on read, with distributed counters for the write-rate ceiling of one sustained write per second per document. The write-hotspot problem is demonstrated — sequential document IDs concentrate writes on one index range — along with fan-out for feeds, the security-rules-driven access model that constrains schema shape, and pagination designs that stay cheap.",
      topics: [
        "Denormalising so a screen is a single read",
        "Root collections against subcollections",
        "Collection-group queries",
        "Keeping duplicated data consistent with Functions",
        "Counters, aggregate fields and distributed counters",
        "The one-write-per-second document ceiling",
        "Write hotspots from sequential document IDs",
        "Fan-out patterns for feeds and notifications",
        "Modelling around what security rules can express",
      ],
    },
    {
      title: "Security Rules",
      weekRange: "Week 3",
      description:
        "The module that decides whether an application is safe, and the one most Firebase tutorials skip. Firestore and Storage rules share a language and a mental model: rules are not filters, an unauthorised query fails rather than returning fewer rows, and a rule that reads another document costs a read and can be denied itself.\n\nThe work is hands-on and adversarial. Rules are written for ownership, roles from custom claims, field-level validation and immutable fields; `get` and `exists` lookups are used for membership checks with their cost made explicit; and the Rules Playground and emulator unit tests turn rules into something with a test suite. The class then attacks its own project from a plain client SDK with a stolen user token — the exercise that makes the difference between rules that look right and rules that hold.",
      topics: [
        "The rules language, and why rules are not filters",
        "Ownership rules with request.auth",
        "Roles from custom claims",
        "Field-level validation and immutable fields",
        "get and exists lookups, and what they cost",
        "Storage rules for uploads — type, size and path",
        "The Rules Playground and emulator unit tests",
        "Attacking your own project from a client SDK",
        "The common rule mistakes that leak whole collections",
      ],
    },
    {
      title: "Realtime Listeners, Offline Persistence & Sync",
      weekRange: "Week 3",
      description:
        "The behaviour that makes Firebase feel different to build on: an application that keeps working without a network. Offline persistence on mobile and in the browser, the local cache, latency compensation where a write appears instantly and reconciles later, and the pending-writes metadata a considered UI actually shows the user.\n\nConflict handling is worked through honestly — last-write-wins is the default, and transactions or server timestamps are what you use when that is not acceptable. Listener lifecycle and detachment are covered because leaked listeners are both a memory bug and a billing one. The Realtime Database is then compared with Firestore on query model, pricing and latency, with the cases where it is still the better choice, such as presence.",
      topics: [
        "Offline persistence on mobile and web",
        "The local cache and latency compensation",
        "Pending writes and metadata-aware UI",
        "Last-write-wins, and when it is not acceptable",
        "Server timestamps and transactional updates",
        "Listener lifecycle, detachment and leaks",
        "Realtime Database against Firestore",
        "Presence with the Realtime Database",
        "Testing offline behaviour in the emulator",
      ],
    },
    {
      title: "Cloud Functions for Firebase",
      weekRange: "Week 4",
      description:
        "Server-side logic without a server to operate. Second-generation Cloud Functions run on Cloud Run, and the trigger types are covered with the job each one suits: HTTPS and callable functions for client-invoked work, Firestore and Auth and Storage triggers for reacting to events, scheduled functions for recurring jobs, and Pub/Sub and Task Queue functions for background work.\n\nThe operational realities are given equal weight, because they are what breaks in production: cold starts and minimum instances, concurrency and instance limits, idempotency for a trigger that may fire twice, retries and dead-lettering, and the infinite loop created by a function that writes to the document that triggered it. Secrets, the Admin SDK's privileged access, structured logging, error reporting and local debugging in the emulator complete the module.",
      topics: [
        "Second-generation functions on Cloud Run",
        "HTTPS and callable functions",
        "Firestore, Auth and Storage event triggers",
        "Scheduled, Pub/Sub and Task Queue functions",
        "Cold starts, minimum instances and concurrency",
        "Idempotency, retries and dead-lettering",
        "The trigger loop, and how to break it",
        "Secrets, environment configuration and the Admin SDK",
        "Structured logging, error reporting and emulator debugging",
      ],
    },
    {
      title: "Cloud Storage & Cloud Messaging",
      weekRange: "Week 4",
      description:
        "Files and notifications, the two features almost every mobile brief includes. Cloud Storage covers upload and download with resumable transfers and progress, path design that lets a rule authorise by ownership, metadata and content types, signed URLs, and image processing triggered on upload so that thumbnails are generated server-side rather than on the device.\n\nCloud Messaging then covers the delivery path properly: device tokens and their rotation, topic and condition targeting, notification against data messages and how each behaves in foreground, background and terminated states on both Android and iOS, APNs configuration, deep links into the app, and delivery reporting. Rate limits, batching and the discipline of not sending a notification nobody asked for close the module.",
      topics: [
        "Resumable uploads, downloads and progress reporting",
        "Storage path design that rules can authorise",
        "Metadata, content types and signed URLs",
        "Image resizing triggered on upload",
        "FCM device tokens and token rotation",
        "Topic and condition targeting",
        "Notification against data messages across app states",
        "APNs setup, deep links and delivery reporting",
        "Rate limits, batching and notification restraint",
      ],
    },
    {
      title: "Hosting, App Hosting & Web Deployment",
      weekRange: "Week 5",
      description:
        "Getting the web half of the product in front of users. Firebase Hosting for static and single-page applications — the global CDN, cache headers, rewrites and redirects, custom domains and automatic certificates, preview channels for pull-request review, and multi-site hosting from one project.\n\nApp Hosting is then used for framework-driven applications that need server rendering, with Next.js and Angular as the worked examples: the GitHub-connected build and deploy flow, server-side rendering against Cloud Run, environment configuration and secrets, and rollbacks. The module ends on release discipline — promoting the same build through staging to production rather than rebuilding, and the deploy pipeline in GitHub Actions that automates it.",
      topics: [
        "Firebase Hosting, the CDN and cache headers",
        "Rewrites, redirects and single-page routing",
        "Custom domains and automatic certificates",
        "Preview channels for pull-request review",
        "Multi-site hosting from one project",
        "App Hosting for Next.js and Angular",
        "Server-side rendering on Cloud Run",
        "Environment configuration, secrets and rollbacks",
        "Deploy pipelines in GitHub Actions",
      ],
    },
    {
      title: "Analytics, Crashlytics, Remote Config & A/B Testing",
      weekRange: "Week 5",
      description:
        "The instrumentation that separates a shipped app from a maintained one. Google Analytics for Firebase covers automatic and custom events, event parameters and user properties, audiences, funnels and retention, the DebugView used to verify an event before release, and the BigQuery export that makes the raw event data queryable in SQL.\n\nCrashlytics follows — crash and non-fatal reporting, symbol upload for readable stack traces, custom keys and logs that make a crash reproducible, and velocity alerts. Remote Config then turns configuration into a server-side decision with conditions, percentage rollouts and a kill switch for a feature that is misbehaving, and A/B Testing builds on both to run a real experiment with a stated metric. Performance Monitoring and App Check close the module.",
      topics: [
        "Automatic and custom events, parameters and user properties",
        "Audiences, funnels, retention and DebugView",
        "The BigQuery export and SQL over raw events",
        "Crashlytics, symbol upload and readable stack traces",
        "Custom keys, logs and velocity alerts",
        "Remote Config conditions and percentage rollouts",
        "Feature flags and a kill switch",
        "A/B testing with a stated success metric",
        "Performance Monitoring and App Check",
      ],
    },
    {
      title: "Firebase Genkit, Gemini & Data Connect",
      weekRange: "Week 6",
      description:
        "The two additions that changed what a Firebase backend can be asked to do. Genkit is the framework for AI features: flows as testable units, Gemini model calls, structured output with a schema so the response can be trusted by the calling code, retrieval-augmented generation over your own Firestore data, tool calling, and the developer UI for tracing and evaluating a flow. Flows are deployed as Cloud Functions and rate-limited, with cost and prompt-injection risk treated as engineering concerns rather than footnotes.\n\nData Connect then covers the case Firestore is wrong for: a managed PostgreSQL database inside a Firebase project, with a schema, GraphQL-shaped queries and mutations, generated typed SDKs, and authorisation expressed alongside them. The judgement is the point — relational integrity, joins and reporting belong in Data Connect; documents, real-time and offline belong in Firestore, and a real application often uses both.",
      topics: [
        "Genkit flows, and testing them as units",
        "Gemini model calls and structured output schemas",
        "Retrieval-augmented generation over Firestore data",
        "Tool calling and the Genkit developer UI",
        "Deploying flows as Cloud Functions, with rate limits",
        "Token cost, latency and prompt-injection risk",
        "Data Connect — managed PostgreSQL in a Firebase project",
        "Schema, queries, mutations and generated typed SDKs",
        "Choosing between Firestore and Data Connect",
      ],
    },
    {
      title: "Cost, Performance & Production Readiness",
      weekRange: "Week 6",
      description:
        "The module that stops a working prototype from becoming an expensive incident. Firebase bills per operation, so cost is a design property: a listener attached to a large collection, an unbounded query, a counter updated on every page view, or a trigger that writes back into its own collection are each traced from code to line item, with budget alerts and quota limits configured as a backstop.\n\nProduction readiness is then run as a checklist against each student's own project: security rules tested rather than assumed, App Check enforced so the backend only answers the real app, indexes declared in source control, backups and Firestore point-in-time recovery, IAM tightened so nobody develops with owner rights, monitoring and alerting, and a documented incident path. Vendor lock-in and an honest exit strategy close the module.",
      topics: [
        "Reading the bill — reads, writes, storage and egress",
        "The query and listener patterns that cost the most",
        "Budget alerts, quotas and a spending backstop",
        "App Check enforcement across services",
        "Indexes and rules kept in source control",
        "Backups and Firestore point-in-time recovery",
        "IAM least privilege for a team",
        "Monitoring, alerting and an incident path",
        "Vendor lock-in and a realistic exit strategy",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Week 7 + placement prep",
      description:
        "The capstone is a complete product on Firebase: authenticated users, a Firestore model designed for its read patterns, security rules with a test suite, Cloud Functions for the logic that cannot live on the client, file upload with server-side processing, push notifications, one Genkit AI feature, analytics and Crashlytics wired in, and a web client deployed on Hosting or App Hosting — released through a pipeline with a staging project in front of production.\n\nInterview preparation targets what Pune panels ask a Firebase candidate, which is rarely trivia: model this feature in Firestore and justify the reads it costs, write a security rule for this requirement, explain what happens to this write offline, and say where Firebase would be the wrong choice. Resume, LinkedIn and GitHub are rewritten around the capstone, and two mock interviews are run and reviewed.",
      topics: [
        "Capstone — auth, Firestore model, rules and Functions",
        "File upload, notifications and one Genkit AI feature",
        "Analytics, Crashlytics and App Check in place",
        "Web client deployed through staging to production",
        "A tested rules suite and a documented data model",
        "Modelling and rules questions under interview conditions",
        "Explaining offline behaviour and cost trade-offs",
        "Where Firebase is the wrong choice, argued honestly",
        "Resume, LinkedIn and GitHub rewritten around the capstone",
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
    src: "/images/courses/firebase-path-v1.webp",
    width: 1400,
    height: 900,
    alt: "Eight-stage Firebase learning path taught at Archer Infotech Pune: platform foundations covering Firebase within Google Cloud, per-environment projects, the CLI and the Local Emulator Suite; authentication covering email, phone OTP, federated sign-in, ID tokens and custom claims; Firestore covering documents, query limits, composite indexes, aggregation queries and transactions; data modelling covering denormalisation for cost, collection-group queries, distributed counters and write hotspots; security rules covering ownership, role checks, field validation, emulator rule tests and attacking your own project; realtime and offline covering listeners, offline persistence, latency compensation and conflict handling; serverless covering Cloud Functions triggers, cold starts, idempotency, Cloud Storage and Cloud Messaging; and delivery covering Hosting and App Hosting, Analytics and Crashlytics, Remote Config, Genkit AI features, Data Connect, cost control and the capstone project.",
    caption:
      "The order this course is taught in. Each stage expands into the modules below — nothing arrives before its prerequisite.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/firebase-development-syllabus-v1.pdf",
    title: "Firebase Course Syllabus — Complete Module List",
    slug: "firebase-syllabus",
    blurb:
      "The complete fourteen-module syllabus as a PDF — the platform and the emulator suite, Authentication, Firestore queries and data modelling, security rules, offline persistence and sync, Cloud Functions, Cloud Storage and Cloud Messaging, Hosting and App Hosting, Analytics, Crashlytics and Remote Config, Genkit and Data Connect, cost and production readiness, and the capstone. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the PDF",
        items: [
          "All fourteen modules in teaching order, week by week, from the first emulator run through to the capstone.",
          "A full security-rules module, including emulator rule tests and an exercise where the class attacks its own project from a plain client SDK.",
          "Two modelling modules written around what Firestore actually bills for — denormalising so a screen is one read, distributed counters, and write hotspots.",
          "The 2024-and-later platform in depth: second-generation Cloud Functions on Cloud Run, App Hosting for Next.js and Angular, Genkit AI flows and Data Connect's managed PostgreSQL.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "Mobile Developer (Android, Flutter, React Native) — the backend half of the job.",
          "Frontend / Full Stack Developer — serverless backends without operating one.",
          "Startup Engineer or Founding Developer — shipping a product with a small team.",
          "AI Feature Developer — Genkit flows and retrieval over your own app data.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "Full-Stack Mobile App on Firebase",
      description:
        "A complete mobile app with Firebase as the entire backend — pick a real domain (chat, expense tracker, recipe finder, fitness tracker). Firebase Auth (email / Google / Apple), Firestore for data with proper security rules, Cloud Functions for server-side logic (order processing, scheduled cleanups), Cloud Storage for file uploads, FCM for push notifications, plus Crashlytics and Analytics. Frontend can be Android / iOS / Flutter / React / React Native — whichever you've trained on. Outcome: a deployed mobile app + GitHub repo demonstrating the Firebase patterns that Pune startup mobile teams hire on.",
      technologies: [
        "Firebase Auth + Firestore + Cloud Functions",
        "Cloud Storage + FCM",
        "Crashlytics + Analytics",
        "Frontend: Android / iOS / Flutter / React / RN",
      ],
    },
    {
      title: "Genkit-Powered AI Feature on Firebase",
      description:
        "A 2026-relevant capstone — add a Gemini-powered AI feature to a Firebase app via Firebase Genkit (chat assistant, document Q&A, content recommendation, image-description). Demonstrates the modern Firebase + AI integration pattern.",
      technologies: [
        "Firebase Genkit",
        "Gemini via Vertex AI",
        "Firestore for conversation persistence",
        "Cloud Functions for the orchestration",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Patil (Senior Corporate Trainer, 10+ years, lead for the MERN / Mobile / Backend tracks at Archer Infotech) and Amol Chougule (Technical Trainer — Modern Web & Mobile, hands-on at Mindstix Software Labs). Both personally take sessions in every batch.",

  careerOutcomes: {
    paragraphs: [
      "Firebase fluency is increasingly expected on Pune mobile-developer / full-stack JDs — Indeed Pune doesn't list 'Firebase Developer' as a standalone title (it's not), but Firebase appears as required or preferred on 800+ Pune mobile / full-stack JDs. The biggest employers using Firebase are Pune-based fintech / consumer-tech / health-tech / ed-tech startups, plus several captives and BFSI mobile teams.",
      "Firebase is most valuable as a force-multiplier on existing mobile / full-stack roles — adding Firebase to your Android / iOS / Flutter / React profile makes you immediately useful at a startup or solo-developer setting. Compensation is similar to your underlying mobile / full-stack role; Firebase fluency doesn't itself create a separate salary band.",
      "The course doubles as an excellent foundation for our follow-on AI Engineer / Generative AI tracks — many AI-powered Pune mobile features are built on Firebase + Gemini.",
    ],
    salaryBands: [
      {
        role: "Mobile Developer with Firebase fluency (Pune entry, <2 years)",
        band: "₹4,00,000 – ₹7,00,000 per year",
        source: { label: "AmbitionBox Pune Mobile Developer", url: "https://www.ambitionbox.com/profile/mobile-application-developer-salary-in-pune" },
      },
      {
        role: "Mid-level Full Stack with Firebase (Pune, 3–5 years)",
        band: "₹10,00,000 – ₹17,00,000 per year",
        source: { label: "Glassdoor Pune Full Stack Developer", url: "https://www.glassdoor.co.in/Salaries/pune-full-stack-developer-salary-SRCH_IL.0,4_IM1072_KO5,25.htm" },
      },
      {
        role: "Senior Mobile / Full Stack with Firebase (Pune, 5–8 years)",
        band: "₹16,00,000 – ₹26,00,000 per year",
        source: { label: "Glassdoor Pune Senior Full Stack", url: "https://www.glassdoor.co.in/Salaries/pune-senior-full-stack-developer-salary-SRCH_IL.0,4_IM1072_KO5,32.htm" },
      },
    ],
    hiringCompanies: [
      "Pune-based fintech / consumer-tech / health-tech / ed-tech startups",
      "Pune solo-developer / freelance ecosystem",
      "BharatPe (Pune)",
      "Razorpay (Pune)",
      "Pine Labs (Pune)",
      "Drip Capital",
      "Innovaccer (Pune)",
      "Whatfix (Pune)",
      "BFSI mobile teams (specific apps)",
    ],
    rolesAfterCourse: [
      "Mobile Developer with Firebase fluency",
      "Full Stack Developer (Firebase backend)",
      "Junior Solutions Engineer at startups",
      "Solopreneur / freelancer shipping mobile apps",
      "Junior AI Engineer (with Genkit)",
    ],
  },

  modesAndDuration: {
    duration: "6 weeks of structured curriculum plus 1 week of capstone (~1.5 months total)",
    classroom: { location: "Archer Infotech, Kothrud, Pune", timing: ["Morning batch — 10:00 to 13:00", "Evening batch — 18:00 to 21:00"] },
    online: {
      timing: ["Same hours as classroom batches", "Recordings available for review"],
      tools: ["Zoom for live sessions", "Firebase Console + emulator suite", "Firebase CLI", "GitHub for capstone", "Slack / WhatsApp for async Q&A"],
    },
    weekend: { timing: ["Saturday + Sunday, 09:00 to 13:00"], durationNote: "Stretches over ~2.5 months instead of 1.5." },
    batchPolicy: "Maximum 15 students per batch.",
  },

  fees: {
    note:
      "Course fees range ₹20,000 – ₹90,000 depending on mode and concession — Firebase as a 1.5-month course typically lands at the lower end. Firebase Spark (free tier) covers all lab work; Blaze (pay-as-you-go) is needed only for Cloud Functions usage above the free quota.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2 instalments at no extra cost",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement focus for Firebase students is calibrated for Mobile / Full Stack roles where Firebase is a complement skill (not a standalone hireable specialisation). Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions.",
    ],
    process: [
      "Resume + LinkedIn rewrite emphasising Firebase fluency on top of mobile / full-stack background",
      "GitHub portfolio cleanup",
      "Mock interview rounds for Mobile / Full Stack roles",
      "Post-course referrals via our 17-year alumni network (with extra emphasis on Pune startups)",
      "Up to 6 months of continued support",
      "Free re-entry to future batch interview-prep sessions",
    ],
    partnerCompanies: [
      "Pune-based fintech / consumer-tech / health-tech / ed-tech startups",
      "BharatPe (Pune)",
      "Razorpay (Pune)",
      "Pine Labs (Pune)",
      "Drip Capital",
      "Innovaccer (Pune)",
      "Whatfix (Pune)",
    ],
  },

  comparison: {
    intro: "We compare ourselves against typical Pune Firebase training institutes on factual rows only.",
    rows: [
      { feature: "Trainers named with photos and LinkedIn", archer: "Yes — Amol Patil and Amol Chougule", typical: "No — generic branding" },
      { feature: "Firebase generation covered", archer: "Modern Firebase post Google Cloud rollup, Cloud Functions v2", typical: "Old Firebase (pre-2024 architecture)" },
      { feature: "Firestore depth", archer: "Document modelling + security rules + composite indexes — 2 weeks", typical: "Basic CRUD only" },
      { feature: "Security rules", archer: "Yes — full coverage with rules-driven access patterns", typical: "Mentioned only" },
      { feature: "Cloud Functions v2", archer: "Yes — Cloud Run-backed, all trigger types", typical: "v1 (legacy)" },
      { feature: "Firebase Genkit (GenAI)", archer: "Yes — capstone-eligible", typical: "Not covered" },
      { feature: "Firebase Data Connect (managed Postgres)", archer: "Yes — covered", typical: "Not covered" },
      { feature: "Public GitHub portfolio output", archer: "Yes — full-stack mobile app + Genkit AI feature", typical: "Local code on hard drive" },
      { feature: "Placement support", archer: "6 months, with free re-entry", typical: "1–3 months or vague" },
      { feature: "Batch size cap", archer: "15 students", typical: "25–40 students" },
    ],
    closing: "Compare with whoever you are considering.",
  },

  versusAlternative: {
    heading: "Firebase Standalone or Bundled With Mobile / Web Track?",
    paragraphs: [
      "Firebase as a standalone 1.5-month course is the right fit if you (1) already have mobile / web / full-stack background and want to add Firebase for startup hiring, (2) are a solopreneur / founder shipping a mobile app, or (3) want to add the modern Firebase + AI (Genkit) layer to your toolkit.",
      "Bundling Firebase with our Android / Flutter / React Native / React courses is the right fit if you are starting from zero — Firebase pairs cleanly with all four. Combined enrolment offers significant bundle savings.",
      "Honest recommendation: take Firebase standalone if you have a mobile / web / full-stack base. Take it bundled with one of the mobile or web tracks if you are starting from zero.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: at least basic JavaScript or another programming language, basic familiarity with mobile or web development (you should have done at least one frontend track — Android, iOS, Flutter, React, RN, or web JS — before this course). Willingness to commit 5–6 hours per week of practice.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation (Firebase account creation, Firebase CLI install)",
      "Show up to day one with a laptop running 64-bit OS",
    ],
  },

  faqs: [
    {
      question: "How long does Firebase training in Pune take at Archer Infotech?",
      answer: "Approximately 1.5 months — 6 weeks plus 1 week of capstone. Weekend batch ~2.5 months.",
    },
    {
      question: "Is Firebase free?",
      answer:
        "Firebase Spark is the free tier (generous quotas for development and small apps). Blaze is pay-as-you-go for production. The course lab work runs entirely on Spark for most students.",
    },
    {
      question: "What is the salary impact?",
      answer:
        "Firebase fluency adds value to existing Mobile / Full Stack roles rather than creating a separate salary band. Junior mobile developers with Firebase ₹4–7 lakh; mid-level full stack with Firebase ₹10–17 lakh; senior ₹16–26 lakh.",
    },
    {
      question: "Do I need a mobile or web background?",
      answer:
        "Yes — Firebase is a backend complement to a frontend stack. You should have done at least one frontend track (Android, iOS, Flutter, React, RN, or web JS) before this course.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — two capstone projects: (1) full-stack mobile app entirely on Firebase, (2) Genkit-powered AI feature on Firebase using Gemini.",
    },
    {
      question: "Is Genkit / GenAI covered?",
      answer:
        "Yes — week 6 covers Firebase Genkit and Gemini integration. Capstone Project #2 is a complete Genkit-powered feature.",
    },
    {
      question: "Are weekend Firebase classes available in Pune?",
      answer: "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~2.5 months instead of 1.5.",
    },
    {
      question: "What is the fee?",
      answer: "Course fees range ₹20,000 – ₹90,000 depending on mode and concession.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of placement support, referrals via our alumni network (extra emphasis on Pune startup scene), mock interviews.",
    },
    {
      question: "Are the named trainers actually teaching?",
      answer: "Amol Patil and Amol Chougule personally lead every session.",
    },
  ],

  finalCta: {
    heading: "Ready to start Firebase training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 3–4 weeks. Reach out via the enquiry form or call us — Amol Patil and Amol Chougule are happy to spend 30 minutes telling you whether the course fits your goal.",
  },
};
