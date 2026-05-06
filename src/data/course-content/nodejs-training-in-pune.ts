import type { CourseRichContent } from "./types";

export const nodejsTrainingInPune: CourseRichContent = {
  intro:
    "Node.js is the dominant JavaScript backend in Pune product engineering — most SaaS, fintech, and consumer-tech companies (Amagi, Razorpay's Pune teams, BharatPe, Persistent product engineering, BMW TechWorks micro-frontend BFFs) ship their primary APIs on Node. Archer Infotech's Node.js training in Pune teaches the runtime as it is actually used in 2026 — Node.js 22 LTS with native fetch / WebStreams / test runner / .env support, TypeScript-first with tsx for dev, Express 5 for traditional REST, Fastify for high-performance services, NestJS for enterprise / Angular-friendly architectures, plus REST + GraphQL + WebSocket coverage and the production engineering tail (Postgres + Drizzle / Prisma, Redis, BullMQ, Docker, GitHub Actions, observability). Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Node.js in 2026",
    paragraphs: [
      "Node.js is the highest-leverage backend skill for any JavaScript developer — one runtime, two job markets (frontend + backend), and a hiring base that has tripled in Pune over the last five years. Indeed Pune lists more than 900 active Node.js Developer / Backend Developer (Node) roles as of May 2026. The biggest employers are Persistent Systems, BMW TechWorks India, Mercedes-Benz R&D India, Synechron, Mastercard Pune Tech Hub, BMC Software, plus the Pune SaaS and fintech scene (Amagi, Fyllo, BharatPe Pune, Razorpay Pune, Pine Labs Pune). Senior Node.js engineers compete on equal compensation with senior Java engineers in Pune product companies, and the React / Node.js full-stack profile is the most common shape on Pune product hiring shortlists.",
      "What changed in 2026: Node.js 22 LTS is the production default and ships native fetch (no more node-fetch dependency), native test runner (no more Jest if you don't want it), native .env support (no more dotenv for simple cases), built-in WebStreams, and the long-awaited type-stripping mode that runs TypeScript directly without a compile step. Express 5 graduated after a long beta with first-class async / await support and proper error propagation. Fastify has eclipsed Express as the default for new high-performance services. NestJS is the dominant choice for Pune teams that want Angular-style structure on the backend. ESM is now the standard module system; CommonJS is legacy.",
      "What this means for hiring: 2026 Pune Node.js JDs expect Node 20+ / 22 LTS, TypeScript fluency, one of Express 5 / Fastify / NestJS at depth, async / await done right (no callback hell, no unhandled promise rejections), Postgres or MongoDB at a working level, Redis for caching / sessions / rate-limiting, basic Docker, and one production deployment story. Senior roles add observability (Prometheus + Grafana or Datadog), background-job queues (BullMQ), and microservice patterns. Archer Infotech's curriculum is rebuilt around exactly these expectations.",
    ],
    keyPoints: [
      "900+ active Node.js Developer roles on Indeed Pune (May 2026)",
      "Node.js 22 LTS — native fetch, test runner, type-stripping, .env support",
      "Three frameworks taught — Express 5, Fastify, NestJS — match your target market",
      "TypeScript first-class, ESM as default, async / await everywhere",
      "Strongest backend pairing for React / Next.js full-stack roles",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student targeting Node.js Developer / Backend Developer roles",
      "Working frontend developer (React / Angular / Vue) wanting to add backend skills and become full-stack",
      "Working developer in another backend language (Python, Java, .NET) wanting to add Node.js",
      "Working JavaScript developer wanting to graduate from frontend-only into full-stack engineering",
      "Career restarter targeting full-stack JavaScript as a high-demand re-entry path",
    ],
    notForYou: [
      "If you have no JavaScript experience at all — take a JavaScript / web fundamentals course first; we expect ES2020+ fluency from week 1",
      "If you cannot put in 8–10 hours per week of practice outside class — backend is learned by writing services, not watching tutorials",
      "If you want a 30-day course with no project work — backend engineering with Postgres + Redis + Docker needs at least 2.5 months to internalise",
      "If you only want a certificate sticker with no portfolio — Pune backend hiring screens hard on deployed APIs and database design",
      "If you have 4+ years of production Node.js experience — you'll be under-stretched; talk to us about advanced microservices / NestJS / Kubernetes specialisations",
    ],
  },

  curriculum: [
    {
      title: "Modern JavaScript & TypeScript for Node.js",
      weekRange: "Week 1",
      description:
        "Node-flavoured JavaScript foundations. Cover modern JS (destructuring, spread, optional chaining, async / await, Promise.all and Promise.allSettled), TypeScript at the level you actually need for Node (types, interfaces, generics, utility types, declaration files for untyped npm packages), the tsx runtime for fast TypeScript-on-Node development, and the native Node 22 type-stripping mode. By the end of week 1 every student has Node 22 LTS, npm / pnpm, TypeScript, ESLint, Prettier, and tsx configured plus a tiny TS HTTP server running locally.",
      topics: [
        "Modern JS — destructuring, async / await, Promise.all / allSettled",
        "TypeScript types, interfaces, generics, utility types",
        "Declaration files (.d.ts) for untyped packages",
        "tsx runtime and Node 22 type-stripping",
        "ESM vs CommonJS — when each appears, why ESM is now default",
        "Node 22 LTS install, nvm, .nvmrc",
        "VS Code + ESLint + Prettier setup",
      ],
    },
    {
      title: "Node.js Runtime — Event Loop, Streams, Worker Threads",
      weekRange: "Week 2",
      description:
        "The runtime as it actually behaves. Cover the event loop in depth (microtasks vs macrotasks, the libuv phases, why setTimeout(0) and setImmediate aren't equivalent), the file-system API (fs/promises, the discipline of streams over buffers for large files), buffers and binary data, the path module, child_process and worker_threads (when each is right), and the AbortController pattern for cancellation. Plus the discipline that prevents the most common production failure modes — unhandled promise rejections, blocking the event loop with sync work, leaking event listeners.",
      topics: [
        "Event loop — microtasks, macrotasks, libuv phases",
        "fs / fs.promises and stream-first I/O",
        "Buffer, Blob, Uint8Array — when each appears",
        "child_process — exec, spawn, fork",
        "worker_threads for CPU-bound work",
        "AbortController for cancellation",
        "Common failure modes — unhandled rejections, event-loop blocking",
      ],
    },
    {
      title: "Express 5 — REST APIs Done Right",
      weekRange: "Weeks 3–4",
      description:
        "Express 5 (the 2024 GA after a long beta) is the framework most Pune Node.js codebases run today. Cover routing, middleware composition (the discipline of order matters), error handling with Express 5's first-class async / await support, request validation with Zod, response shaping, REST resource design, OpenAPI / Swagger documentation generation, plus the pragmatic security middleware stack (helmet, cors, express-rate-limit, csurf where it earns its place). We finish by building a complete RESTful API for a real domain (booking system, expense tracker, library) with full input validation, pagination, sorting, and filtering.",
      topics: [
        "Routing, route parameters, query strings",
        "Middleware composition and order",
        "Error handling — Express 5's async support",
        "Request validation with Zod",
        "Response shaping and consistent error format",
        "REST resource design",
        "OpenAPI / Swagger via tsoa or zod-to-openapi",
        "Security middleware — helmet, cors, rate-limit",
      ],
    },
    {
      title: "PostgreSQL & Drizzle ORM",
      weekRange: "Week 5",
      description:
        "Postgres is the dominant database in Pune product engineering and the right default for new Node.js services. Cover the SQL you actually need (joins, transactions, indexes, EXPLAIN plans), connection pooling, then Drizzle ORM (the 2026-favourite TypeScript-native ORM in Pune product teams) — schema definition, migrations, type-safe queries, transactions, and the discipline of keeping the ORM out of your domain layer. Honest comparison with Prisma (which is also widely used and worth knowing) and pg (the raw driver, when ORMs become liability).",
      topics: [
        "Postgres essentials — joins, transactions, indexes",
        "Connection pooling with pg-pool",
        "Drizzle ORM — schema, migrations, queries",
        "Drizzle vs Prisma vs raw pg — honest comparison",
        "Repository pattern over direct ORM use",
        "EXPLAIN plans and N+1 query prevention",
        "Database seeding and test isolation",
      ],
    },
    {
      title: "Authentication, Authorization & Security",
      weekRange: "Week 6",
      description:
        "JWT authentication flows (access + refresh tokens), session-based auth with secure cookies (still right for many apps), role-based and attribute-based access control, password hashing with argon2 / bcrypt, OAuth2 + PKCE for third-party login (Google, GitHub, Azure AD), plus the security baseline every API needs — CSRF, XSS, SSRF, SQL injection defences, rate limiting, secrets management. We cover the most-asked Pune backend security interview questions explicitly.",
      topics: [
        "JWT — access + refresh tokens, rotation",
        "Session-based auth with secure cookies",
        "Password hashing — argon2 (recommended), bcrypt",
        "RBAC and ABAC — when each fits",
        "OAuth2 + PKCE, OIDC, Azure AD / Entra ID",
        "CSRF, XSS, SSRF, SQL injection defences",
        "Rate limiting and DoS protection",
        "Secrets management — env, AWS Secrets Manager, dotenv-vault",
      ],
    },
    {
      title: "Real-Time, Streaming & WebSocket",
      weekRange: "Week 7",
      description:
        "Real-time integration patterns. WebSocket via the ws library or Socket.io, Server-Sent Events for one-way streaming, long-polling fallbacks, the discipline of designing real-time protocols that survive reconnection, presence and broadcast patterns, and the production reality of scaling (sticky sessions, Redis pub/sub, message-broker-backed fan-out). We finish with a small real-time chat / collaboration backend that you can hammer with 1000 concurrent clients on a laptop.",
      topics: [
        "WebSocket basics — ws library, Socket.io",
        "Server-Sent Events for one-way streaming",
        "Reconnection and replay patterns",
        "Presence and broadcast patterns",
        "Scaling — sticky sessions, Redis pub/sub",
        "BullMQ for delayed and recurring jobs",
        "Streaming responses — fetch streams, SSE for AI",
      ],
    },
    {
      title: "GraphQL with Apollo Server / Mercurius",
      weekRange: "Week 8",
      description:
        "GraphQL where it earns its complexity. Cover schema-first vs code-first, Apollo Server v4 (the dominant choice for Express-based stacks) and Mercurius (Fastify-native, faster), resolvers, dataloaders for the N+1 query problem, mutations, subscriptions over WebSocket, and authentication / authorization at the resolver level. Plus the honest discussion — GraphQL is brilliant for some shapes of problem and the wrong tool for others; we teach both sides.",
      topics: [
        "GraphQL schema-first vs code-first",
        "Apollo Server v4 with Express",
        "Mercurius with Fastify",
        "Resolvers and the N+1 problem",
        "DataLoader for batch + cache",
        "Mutations and input types",
        "Subscriptions over WebSocket",
        "Auth at the resolver level",
      ],
    },
    {
      title: "Fastify, NestJS & Framework Selection",
      weekRange: "Week 9",
      description:
        "Beyond Express. Fastify (the 2026 default for high-performance Node.js services in Pune product engineering) — schema-based validation with Ajv, plugins, encapsulation, hooks, lifecycle. NestJS (the dominant choice for enterprise / Angular-style Pune teams) — modules, providers, DI, controllers, guards, interceptors, pipes, the integrated ORM patterns. We deliberately teach all three (Express 5, Fastify, NestJS) and the honest framework-selection logic — what fits a startup MVP vs a high-traffic service vs a 20-engineer enterprise team.",
      topics: [
        "Fastify — schemas, plugins, hooks, encapsulation",
        "NestJS — modules, providers, DI, controllers",
        "NestJS guards, interceptors, pipes",
        "Framework selection — Express vs Fastify vs NestJS",
        "Migration patterns — Express → Fastify",
        "Microservices patterns in NestJS",
      ],
    },
    {
      title: "Testing, Observability & Production Practices",
      weekRange: "Week 10",
      description:
        "The week that separates 'works on my machine' from production-ready. Cover the Node 22 native test runner, Vitest for richer assertions, Supertest for HTTP integration tests, Postgres test isolation patterns, plus observability — structured logging with pino, OpenTelemetry instrumentation, Prometheus metrics via prom-client, Grafana dashboards. CI/CD with GitHub Actions running lint + tests + Docker build + deploy. Containerisation with Docker (multi-stage build to keep images small), then deployment to AWS / Render / Fly.io with Postgres on RDS or Neon.",
      topics: [
        "Node 22 native test runner",
        "Vitest + Supertest for HTTP tests",
        "Postgres test isolation — schemas, transactions",
        "Structured logging — pino + pretty",
        "OpenTelemetry instrumentation",
        "Prometheus metrics via prom-client",
        "Docker multi-stage builds",
        "GitHub Actions CI/CD",
        "Deployment — AWS, Render, Fly.io, Neon",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Weeks 11–12",
      description:
        "Two weeks of full-time capstone work plus structured interview preparation. Pick one of three capstone projects (see Capstone Projects). Mock interviews calibrated for Pune Node.js hiring panels — Persistent, BMW TechWorks, Mercedes-Benz R&D, Synechron, Mastercard Pune Tech Hub, plus the SaaS / fintech startup scene. Includes a live-coding round (build a small REST endpoint or middleware in 30 minutes), a JS / Node conceptual round (event loop, async patterns, framework-selection trade-offs), and a system-design round on scaling a Node.js service. Resume / LinkedIn / GitHub polish included.",
      topics: [
        "Capstone implementation, deployment, README",
        "Code review with the lead trainer",
        "Live-coding mock — REST endpoint / middleware",
        "JS / Node conceptual mock round",
        "System-design mock — scaling a Node service",
        "Resume + LinkedIn rewrite for Node.js / Backend JDs",
        "GitHub portfolio polish — deployed APIs with passing CI badges",
        "HR mock interview and salary negotiation",
      ],
    },
  ],

  projects: [
    {
      title: "Production REST API with Express 5 + Postgres + Drizzle",
      description:
        "A complete production-grade backend service for a real domain (booking platform, expense manager, library system, ticketing app) — Express 5 with proper middleware composition, Zod request validation, Drizzle ORM against Postgres with proper indexes, JWT auth with refresh-token rotation, role-based access control, OpenAPI / Swagger documentation, full test coverage with the native test runner + Supertest, structured logging with pino, Docker multi-stage build, and a GitHub Actions CI/CD pipeline deploying to AWS / Render. Outcome: a public GitHub repository plus a clickable demo URL — exactly what Pune backend hiring panels interview on.",
      technologies: [
        "Node.js 22 LTS",
        "Express 5 + TypeScript",
        "Drizzle ORM + PostgreSQL",
        "Zod for validation",
        "JWT + argon2",
        "pino structured logging",
        "Docker + GitHub Actions",
        "AWS / Render deployment",
      ],
    },
    {
      title: "High-Performance Fastify Service with Real-Time + BullMQ",
      description:
        "A performance-conscious service built on Fastify — JSON-schema-driven validation (orders of magnitude faster than runtime libraries), plugin architecture, WebSocket via @fastify/websocket, BullMQ for background jobs (image processing, email sending, scheduled reports) with Redis, plus a small admin dashboard. Includes Prometheus metrics, OpenTelemetry tracing, and a small load-test demonstrating the throughput delta vs Express. Demonstrates the patterns Pune product engineering teams hire on — high throughput, real-time, observable.",
      technologies: [
        "Node.js 22 LTS",
        "Fastify + TypeScript",
        "JSON-schema validation (Ajv)",
        "@fastify/websocket",
        "BullMQ + Redis",
        "Prometheus + Grafana",
        "OpenTelemetry",
        "Docker Compose",
      ],
    },
    {
      title: "NestJS Microservices Platform with GraphQL Gateway",
      description:
        "A NestJS-based microservices system — three services (user, catalog, order) communicating via REST and message queue (RabbitMQ or Redis Streams), an Apollo-Federation GraphQL gateway providing a unified schema for clients, JWT auth propagated via guards, Postgres per service via TypeORM or Drizzle, distributed tracing via OpenTelemetry, full Docker Compose stack for local dev, and a Kubernetes Helm chart for cloud deployment. Outcome: a 2026-relevant enterprise-pattern Node.js project — the artefact that opens senior Pune product / enterprise interviews.",
      technologies: [
        "NestJS + TypeScript",
        "Apollo Federation GraphQL",
        "RabbitMQ or Redis Streams",
        "PostgreSQL + Drizzle / TypeORM",
        "OpenTelemetry distributed tracing",
        "Docker Compose + Helm chart",
        "Optional Kubernetes deployment",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Patil (Senior Corporate Trainer, 10+ years, lead for the MERN / Full Stack tracks, ships Node.js daily) and Amol Chougule (Technical Trainer — Modern Web & Mobile, hands-on at Mindstix Software Labs). Both personally take sessions in every batch — the names you see here are the names you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "Node.js Developer is one of the highest-demand backend roles in Pune in 2026 — Indeed Pune lists 900+ active openings, growing year-on-year. The biggest employers are Persistent Systems, BMW TechWorks India, Mercedes-Benz R&D India, Synechron, Mastercard Pune Tech Hub, BMC Software, plus the Pune SaaS and fintech scene (Amagi, Fyllo, BharatPe Pune, Razorpay Pune, Pine Labs Pune). Compensation depends heavily on TypeScript fluency, depth on at least one framework (Express / Fastify / NestJS), database design strength, and demonstrable production deployment.",
      "What pulls a Node.js developer above the median band: TypeScript discipline (now expected, not optional), one production-deployed REST API or microservice on GitHub, demonstrable Postgres + Redis + Docker pattern, observability instrumentation (pino + OTel), and one specialisation (real-time, GraphQL, or NestJS). Our capstone projects are designed exactly around these signals.",
      "Senior Node.js Developer / Lead Backend Engineer bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr.",
    ],
    salaryBands: [
      {
        role: "Node.js Developer (Pune)",
        band: "₹6,67,872 per year average",
        source: {
          label: "Indeed Pune (Node.js Developer)",
          url: "https://in.indeed.com/career/node.js-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Backend Developer (Pune)",
        band: "₹6,93,500 per year average",
        source: {
          label: "Indeed Pune (Backend Developer)",
          url: "https://in.indeed.com/career/back-end-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Junior Node.js Developer (Pune entry, <2 years)",
        band: "₹3,50,000 – ₹6,50,000 per year",
        source: {
          label: "AmbitionBox Pune Node.js Developer",
          url: "https://www.ambitionbox.com/profile/node-js-developer-salary-in-pune",
        },
      },
      {
        role: "Mid-level Node.js Developer (Pune, 3–5 years)",
        band: "₹10,00,000 – ₹18,00,000 per year",
        source: {
          label: "Glassdoor Pune Node.js Developer",
          url: "https://www.glassdoor.co.in/Salaries/pune-node-js-developer-salary-SRCH_IL.0,4_IM1072_KO5,22.htm",
        },
      },
      {
        role: "Senior Node.js / Backend Engineer (national, 5–8 years)",
        band: "₹18,00,000 – ₹32,00,000 per year",
        source: {
          label: "6figr India Senior Backend Engineer (Pune ±10%)",
          url: "https://6figr.com/in/salary/senior-backend-engineer--t",
        },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "Synechron",
      "Mastercard Pune Tech Hub",
      "BMC Software",
      "Bajaj Finserv",
      "Amagi",
      "Fyllo",
      "BharatPe (Pune)",
      "Razorpay (Pune)",
      "Pine Labs (Pune)",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
    ],
    rolesAfterCourse: [
      "Node.js Developer",
      "Backend Developer",
      "Full Stack Developer (with React / Next experience)",
      "API Developer",
      "GraphQL Developer",
      "NestJS Developer",
      "Junior Microservices Engineer",
    ],
  },

  modesAndDuration: {
    duration:
      "10 weeks of structured curriculum plus 2 weeks of capstone project and interview preparation (~2.5 months total)",
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
        "Same code reviews and project feedback as in-person batches",
      ],
      tools: [
        "Zoom for live sessions",
        "GitHub for code reviews and PRs",
        "Render / Fly.io free tier for capstone deployments",
        "Slack / WhatsApp for asynchronous Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over ~4 months instead of 2.5 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch — small enough that the trainer reviews every student's PR personally. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote — we calibrate by early-bird timing, group enrolment, and returning-alumni concessions.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with full GraphQL / NestJS / microservices modules and extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 7 of the course, not at the end. By the time you finish the curriculum, your resume highlights real deployed Node.js APIs with passing CI badges, your GitHub has at least two production-style repositories, and you have completed at least three mock technical interviews against question banks from Pune backend hiring teams.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 7 — resume and LinkedIn rewrite, calibrated for Node.js / Backend JDs",
      "Week 8 — GitHub portfolio cleanup, deployed API URLs, OpenAPI doc links",
      "Weeks 9–10 — JS / Node conceptual drills, live-coding mock rounds, system-design walkthroughs",
      "Weeks 11–12 — three rounds of mock technical interviews",
      "Week 12 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "Synechron",
      "Mastercard Pune Tech Hub",
      "BMC Software",
      "Bajaj Finserv",
      "Amagi",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune Node.js training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Amol Patil and Amol Chougule",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Node.js version covered",
        archer: "Node.js 22 LTS — native fetch, test runner, type-stripping",
        typical: "Node 16 or 18, often without ESM as the default",
      },
      {
        feature: "TypeScript first-class",
        archer: "Yes — every file in TypeScript from week 1",
        typical: "JavaScript-only or TS as an optional later module",
      },
      {
        feature: "Frameworks covered",
        archer: "Express 5 + Fastify + NestJS — three frameworks, honest selection logic",
        typical: "Express only, often Express 4",
      },
      {
        feature: "Database stack",
        archer: "Postgres + Drizzle ORM as default; Prisma and raw pg for comparison",
        typical: "MongoDB-only or Mongoose-only",
      },
      {
        feature: "Testing in the curriculum",
        archer: "Native test runner + Vitest + Supertest with real coverage",
        typical: "Theory-only or skipped entirely",
      },
      {
        feature: "GraphQL coverage",
        archer: "Full week — Apollo, Mercurius, DataLoader, subscriptions",
        typical: "Not covered or marketing-only mention",
      },
      {
        feature: "Microservices / NestJS",
        archer: "Full week + capstone option — DI, modules, federation",
        typical: "Skipped or 'advanced' module",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — deployed APIs with passing CI badges",
        typical: "Local code on a hard drive",
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
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student deployed APIs before you pay.",
  },

  versusAlternative: {
    heading: "Node.js vs Java Backend — Which Should You Learn First in Pune?",
    paragraphs: [
      "Node.js vs Java is the most-asked question in Pune backend counselling. The honest answer: both have ample Pune jobs, both pay similarly at equivalent experience, and the choice should be by goal and existing skill — not by which language is 'better'.",
      "Choose Node.js if your goal is product engineering, Pune SaaS / fintech startups, full-stack JavaScript profiles (React + Node is the most common shape on Pune product hiring shortlists), or you already know JavaScript and want backend without learning a new language. Indeed Pune lists ~900 Node.js openings vs ~1,100+ Java openings; Java has more raw volume but Node has higher growth and stronger startup hiring.",
      "Choose Java if your goal is enterprise backend, BFSI (Pune is a major BFSI hub), Android, large-team services-company work at TCS / Infosys / Cognizant / Wipro, or you want the higher floor that comes with a typed compiled language. Java still has more Pune openings overall and pays a small premium at the senior-most levels in BFSI.",
      "Honest recommendation: pick Node.js if you already know JavaScript or want to be full-stack on a single language. Pick Java if you have a specific BFSI / enterprise target or are starting fresh and want the broadest Pune market. Many of our students learn the second language as a side skill once placed — senior backend engineers in Pune often work across both.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: working JavaScript at the ES2020+ level (functions, closures, async / await, modules, destructuring), basic understanding of HTTP and REST, and willingness to commit 8–10 hours per week of practice outside class. We expect basic JS fluency on day 1; week 1 levels up to TypeScript and the Node toolchain. If you have done our JavaScript or React course (or equivalent self-study), you are ready. Pure non-developers should do a JavaScript course first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal (we say no to roughly 10% of enquirers)",
      "Confirm enrolment and complete pre-course orientation (Node 22 install, GitHub account, VS Code setup, Postgres install)",
      "Show up to day one with a laptop running 64-bit OS, 8GB+ RAM, and Node.js 22 LTS pre-installed (we provide an install script)",
    ],
  },

  faqs: [
    {
      question: "Which is the best Node.js training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves. The test that works: ask any institute you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student GitHub repositories with deployed APIs and passing CI badges, and (3) name companies that hired their last 5 batches. Compare on those three.",
    },
    {
      question: "How long does Node.js training in Pune take at Archer Infotech?",
      answer:
        "Approximately 2.5 months — 10 weeks of structured curriculum plus 2 weeks of capstone project and interview preparation. The weekend batch stretches over ~4 months at the same content depth, designed for working professionals.",
    },
    {
      question: "What is the salary of a Node.js Developer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹6.68 lakh per year for Node.js Developer (May 2026) and ₹6.93 lakh for Backend Developer. Junior Node.js Developer Pune entry sits at ₹3.5–6.5 lakh per year per AmbitionBox. Mid-level (3–5 years) earns ₹10–18 lakh per Glassdoor. Senior Node.js / Backend Engineers (5–8 years) earn ₹18–32 lakh nationally with Pune trending within ±10%.",
    },
    {
      question: "What is the fee for the Node.js course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and applicable concession. The higher end covers placement-track classroom batches with full GraphQL / NestJS / microservices modules and extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    },
    {
      question: "Do I need JavaScript before joining the course?",
      answer:
        "Yes — basic JavaScript (ES2020+) fluency is required from week 1. We level up to TypeScript and the Node toolchain in week 1 but we do not start from 'what is a function'. If you are new to JavaScript, take our JavaScript course or equivalent self-study first.",
    },
    {
      question: "Node.js or Java backend — which should I learn first in Pune?",
      answer:
        "Node.js if your goal is product engineering, SaaS / fintech startups, or full-stack JavaScript (React + Node is the most common Pune product shape). Java if your goal is enterprise / BFSI / large-team services-company work — Java has more raw volume in Pune. Both pay similarly at equivalent experience.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) production REST API with Express 5 + Postgres + Drizzle + JWT + tests + Docker, (2) high-performance Fastify service with WebSocket and BullMQ, (3) NestJS microservices platform with GraphQL gateway. All three become public GitHub repositories with passing CI badges and clickable demo URLs.",
    },
    {
      question: "Is TypeScript covered or only JavaScript?",
      answer:
        "TypeScript is first-class throughout the course — every endpoint, every test, every config file in TS from week 1. TypeScript is now expected on every Pune Node.js JD; teaching JavaScript-only Node produces graduates who write 2018-style backends.",
    },
    {
      question: "Do you cover NestJS?",
      answer:
        "Yes — week 9 includes NestJS as one of the three frameworks taught (alongside Express 5 and Fastify), and Capstone Project #3 is a NestJS microservices platform. NestJS is the dominant framework choice for Pune enterprise / Angular-friendly Node teams; we cover it deeply enough that you can interview for NestJS roles.",
    },
    {
      question: "MongoDB or PostgreSQL — which database does the course use?",
      answer:
        "PostgreSQL as the default — it is the dominant database in Pune product engineering and the right default for new Node.js services. We cover Drizzle ORM as the TypeScript-native choice, with honest comparison to Prisma and raw pg. MongoDB / Mongoose is referenced for graduates entering MongoDB-centric teams (most early-stage SaaS) but is not the spine of the curriculum.",
    },
    {
      question: "Is GraphQL covered?",
      answer:
        "Yes — week 8 is a full module on GraphQL with Apollo Server (Express-based stacks) and Mercurius (Fastify-based), DataLoader for the N+1 problem, mutations, and subscriptions over WebSocket. We give the honest comparison of when GraphQL earns its complexity vs when REST is the right tool.",
    },
    {
      question: "Are weekend Node.js classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~4 months instead of 2.5. Same content, same trainers, same projects. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "Can I switch from Java / Python / .NET backend to Node.js via this course?",
      answer:
        "Yes — and we have a sizable cohort doing exactly this. Working backend developers transitioning into Node.js typically slot in well; the database / auth / observability / Docker layers translate directly, and the language switch is the smaller part. We adjust capstone scope for cross-language switchers to highlight your existing strengths.",
    },
    {
      question: "Does this course pair well with React for full-stack work?",
      answer:
        "Yes — React + Node.js is the most common full-stack profile on Pune product hiring shortlists. Many of our students take this course alongside or after the React course (or together as our Java Full Stack / MERN combo programmes). The capstone projects deliberately produce APIs that pair cleanly with a React or Next.js frontend.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for Node.js / Backend roles (live-coding + JS conceptual + system-design rounds), referrals via our alumni network at 12+ partner companies, resume / LinkedIn / GitHub rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "Are the named trainers actually teaching, or are they just on the brochure?",
      answer:
        "Amol Patil personally leads the Express, Postgres + Drizzle, auth, real-time, and NestJS / capstone weeks. Amol Chougule leads the runtime fundamentals, Fastify, GraphQL, and testing weeks. The same names you see on this page show up in your batch on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start Node.js training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol Patil and Amol Chougule are happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see actual student deployed APIs, meet a current batch, and decide with full information.",
  },
};
