import type { CourseRichContent } from "./types";

export const nextjsTrainingInPune: CourseRichContent = {
  intro:
    "Next.js is the dominant React-based full-stack framework in Pune product engineering and the default choice for new web applications at Pune SaaS / fintech / consumer-tech companies. Persistent Systems, BMW TechWorks, Mercedes-Benz R&D India product teams, Mastercard Pune Tech Hub, Amagi, Fyllo, BharatPe Pune, Razorpay Pune, plus the broader Pune startup scene ship most of their customer-facing properties on it. Archer Infotech's Next.js training in Pune teaches the framework as it is actually used in 2026 — Next.js 15 / 16 with the App Router as default, React 19 Server Components and Server Actions, the streaming + Suspense model, partial prerendering (PPR), edge / Node runtime selection, plus the production tail (Vercel deployment, Edge Functions, ISR, on-demand revalidation, Image / Font / Script optimisations). Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Next.js in 2026",
    paragraphs: [
      "Next.js has become the de-facto choice for production React applications — and Pune product engineering follows the global trend closely. Indeed Pune lists more than 600 active Next.js-specific openings as of May 2026, with another ~1,000 React openings that list Next.js as 'preferred' (which means expected). The biggest employers asking for Next.js are Persistent Systems, BMW TechWorks, Mastercard Pune Tech Hub, Amagi, Fyllo, BharatPe Pune, Razorpay Pune, plus most Pune SaaS and fintech startups. Senior Next.js engineers earn 15–25% above pure React engineers because the role bundles frontend with full-stack responsibility (Server Components, Server Actions, edge / serverless deployment).",
      "What changed in 2026: Next.js 15 (released Oct 2024) shipped the React Compiler, async request APIs, stable Partial Prerendering, plus improved caching defaults (the 2024 cache controversy is now resolved). Next.js 16 (early 2026) graduated Turbopack as the default bundler, doubled-down on the React 19 features (use, useActionState, useFormStatus), and refined the Server Actions error model. Vercel's edge runtime + AI SDK integration has matured into the default for AI-powered web apps. Many teams have completed their migration from the pages router to the App Router; new courses should not teach the pages router as the primary pattern.",
      "What this means for hiring: 2026 Pune Next.js JDs expect App Router fluency, Server Components mental model, Server Actions for mutations, ISR / on-demand revalidation, plus Vercel deployment and edge / Node runtime selection. Senior roles add caching strategies (the 2024 cache changes), middleware patterns, monorepo / Turborepo setups, and AI integration via Vercel AI SDK. Archer Infotech's curriculum is rebuilt around exactly these expectations — App-Router-first, server-component-fluent, deployment-ready.",
    ],
    keyPoints: [
      "600+ active Next.js-specific openings on Indeed Pune (May 2026)",
      "Another ~1,000 React openings list Next.js as 'preferred'",
      "15–25% compensation premium over pure React at equivalent experience",
      "Next.js 16 — Turbopack default, React 19 baseline, refined Server Actions",
      "Vercel AI SDK + Edge runtime — the modern AI-powered web pattern",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Working React developer wanting to add full-stack capability via Next.js",
      "Working full-stack developer (any backend) wanting to add Next.js for rapid product development",
      "Engineering / BCS / MCA student preparing for Pune product / SaaS / fintech roles where Next.js is dominant",
      "Working Next.js developer on the pages router wanting to migrate to the App Router and Server Components",
      "Senior frontend engineer wanting to lead a Next.js / SSR migration credibly",
      "Career restarter targeting product engineering as a high-leverage re-entry path",
    ],
    notForYou: [
      "If you have no React experience — take our React course first; Next.js is React + a framework",
      "If you cannot put in 8–10 hours per week of practice outside class — Server Components require a real mental-model shift",
      "If you only want a certificate sticker with no portfolio — Pune Next.js hiring screens hard on deployed apps with Lighthouse scores",
      "If your goal is enterprise / BFSI Angular work — Angular is the right choice; Next.js is React-side",
      "If you have 2+ years of production Next.js App Router experience — you'll be under-stretched; talk to us about advanced specialisations",
    ],
  },

  curriculum: [
    {
      title: "Next.js 16 Fundamentals & App Router",
      weekRange: "Weeks 1–2",
      description:
        "Next.js from the App Router up. Cover project setup, the file-based routing convention (app directory, layouts, pages, loading.tsx, error.tsx, not-found.tsx), parallel routes and intercepting routes (the patterns most institutes skip but real product teams use), nested layouts, route groups, plus the dev / build / start workflow with Turbopack as the default bundler. By the end of week 2 every student has a multi-page Next.js 16 app with proper layouts and routing.",
      topics: [
        "Project setup with `create-next-app`",
        "App Router fundamentals — app directory, page.tsx, layout.tsx",
        "loading.tsx, error.tsx, not-found.tsx",
        "Nested layouts and route groups",
        "Parallel routes and intercepting routes",
        "Turbopack default bundler",
        "Dev / build / start workflow",
      ],
    },
    {
      title: "Advanced Routing — Route Groups, Parallel & Intercepting Routes",
      weekRange: "Week 2",
      description:
        "The App Router beyond folders and `page.tsx`. Route groups for organising files without affecting the URL — the mechanism behind having separate marketing and application layouts in one project. Templates versus layouts, and the specific difference that matters: a layout persists across navigation, a template remounts.\n\nParallel routes render several independent pages into one layout, which is how a real dashboard with independently loading panels is built. Intercepting routes are what produce the modal-over-a-feed pattern that has a real, shareable URL — the Instagram photo-modal behaviour — and they are genuinely hard to reason about until someone shows you the folder convention.",
      topics: [
        "Route groups and URL-neutral organisation",
        "Nested layouts and shared UI",
        "Templates versus layouts, and remount behaviour",
        "Dynamic segments and catch-all routes",
        "Parallel routes and named slots",
        "Independent loading and error states per slot",
        "Intercepting routes and the modal pattern",
        "Soft navigation versus hard navigation",
        "Link, prefetching and navigation performance",
        "Programmatic navigation and the router API",
      ],
    },
    {
      title: "React 19 Server Components in Next.js",
      weekRange: "Week 3",
      description:
        "The biggest mental-model shift from pages-router Next or pure React. Cover the Server vs Client Component boundary (the discipline of `'use client'`), what runs where (the server vs client serialisation rules), the Suspense + streaming model, async Server Components fetching data without hooks, the React 19 `use` API for promise / context unwrapping in Server Components. Plus the discipline of structuring an app as 'mostly Server Components, Client Components only where needed' — the inversion of the React-mental-model that Next.js demands.",
      topics: [
        "Server vs Client Components — the boundary rules",
        "`'use client'` directive",
        "Server Components — async fetch without hooks",
        "Streaming and Suspense boundaries",
        "React 19 `use` API",
        "Component structure — Server-first, Client where needed",
        "Serialisation rules across the boundary",
      ],
    },
    {
      title: "Data Fetching, Caching & Revalidation",
      weekRange: "Week 4",
      description:
        "The area Next.js 14 / 15 redesigned, where most production bugs live. Cover the fetch() extension with `cache` and `next.revalidate`, the four caching layers (Request Memoisation, Data Cache, Full Route Cache, Router Cache), `revalidatePath` / `revalidateTag` for on-demand revalidation, the new explicit-cache defaults of Next.js 15+, plus dynamic vs static rendering and Partial Prerendering (PPR). We finish with a real product-style data-fetching pattern — list page (static + ISR), detail page (dynamic per request), action that revalidates both.",
      topics: [
        "fetch() extension — cache, next.revalidate, tags",
        "Caching layers — Request Memo, Data, Full Route, Router",
        "revalidatePath and revalidateTag",
        "Static vs dynamic rendering",
        "ISR and on-demand revalidation",
        "Partial Prerendering (PPR)",
        "Cache invalidation strategies",
      ],
    },
    {
      title: "Caching in Depth — Lifetime, Tags & Revalidation",
      weekRange: "Week 4",
      description:
        "The single most misunderstood part of Next.js, and the source of most \"why is my data stale\" bug reports. The caching layers are separated explicitly — request memoisation, the data cache, the full route cache, and the client router cache — because they have different lifetimes and different invalidation rules, and conflating them is what produces the confusion.\n\nYou then control them deliberately: cache lifetimes, tag-based invalidation with `revalidateTag`, path revalidation, opting routes into dynamic rendering, and reading the build output to see which routes were static and which were not. The rule taught throughout is to make caching an explicit decision rather than something that happens to you.",
      topics: [
        "The four caching layers and their lifetimes",
        "Request memoisation within a render",
        "The data cache and fetch options",
        "The full route cache and static generation",
        "The client-side router cache",
        "Cache tags and revalidateTag",
        "revalidatePath and on-demand invalidation",
        "Time-based revalidation and ISR",
        "Opting into dynamic rendering deliberately",
        "Reading the build output for static and dynamic routes",
        "Debugging a stale response",
      ],
    },
    {
      title: "Server Actions & Mutations",
      weekRange: "Week 5",
      description:
        "Server Actions replace REST APIs for most CRUD work in Next.js apps. Cover the syntax (`'use server'` exports), inline vs separate-file actions, FormData handling, progressive enhancement (forms work without JS), error handling with the React 19 `useActionState` and `useFormStatus` hooks, the `useOptimistic` hook for optimistic UI, plus Zod-based input validation. The honest discussion: when Server Actions earn their place vs when traditional REST API routes are the right tool.",
      topics: [
        "Server Actions — `'use server'` syntax",
        "Inline actions vs separate-file actions",
        "FormData and form handling",
        "Progressive enhancement",
        "useActionState, useFormStatus, useOptimistic",
        "Zod-based input validation",
        "Server Actions vs API routes — when each fits",
      ],
    },
    {
      title: "Route Handlers & Backend-for-Frontend",
      weekRange: "Week 5",
      description:
        "Next.js as a backend, which for a large share of applications is the whole backend. Route handlers — the request and response objects, HTTP methods, dynamic segments, streaming responses and runtime selection between Node and edge.\n\nThe architectural framing is backend-for-frontend: an API layer shaped for this application rather than a general-purpose service, which is what makes it worth writing in the same repository. You cover input parsing and validation, consistent error responses, status codes, webhooks with signature verification, and — importantly — when you should not build the backend here and should call a separate service instead.",
      topics: [
        "Route handlers and HTTP methods",
        "Request and response objects",
        "Dynamic segments and query parsing",
        "Input validation with Zod",
        "Consistent error shapes and status codes",
        "Streaming responses",
        "Node versus edge runtime",
        "Backend-for-frontend as an architecture",
        "Webhooks and signature verification",
        "Rate limiting a route handler",
        "When not to build the backend in Next.js",
      ],
    },
    {
      title: "Authentication, Database & Production Patterns",
      weekRange: "Week 6",
      description:
        "Production-grade integrations. Authentication with Auth.js (NextAuth) v5 — the dominant Pune choice — covering JWT vs database sessions, OAuth (GitHub / Google / Azure AD), credentials provider, plus the Middleware pattern for route protection. Database — PostgreSQL with Drizzle ORM (the 2026 favourite TypeScript-native ORM in Pune product teams), connection pooling for serverless / edge runtime constraints. Plus production patterns — environment variables, the Vercel deployment story, edge vs Node runtime selection, ISR with PPR.",
      topics: [
        "Auth.js / NextAuth v5",
        "OAuth providers — GitHub / Google / Azure AD",
        "JWT vs database sessions",
        "Middleware for route protection",
        "PostgreSQL + Drizzle ORM",
        "Connection pooling for serverless",
        "Environment variables and config",
        "Edge vs Node runtime selection",
      ],
    },
    {
      title: "Middleware, Security & Content Security Policy",
      weekRange: "Week 6",
      description:
        "The request-level layer and the hardening that production requires. Middleware runs before a request is handled — the right place for redirects, locale detection, A/B assignment and coarse auth checks, and the wrong place for database work, which is a mistake with a very visible latency cost.\n\nSecurity covers what actually applies to a Next.js application: XSS and where React does and does not protect you, CSRF in the context of Server Actions, injection through unvalidated input, secure cookie configuration, and the `server-only` boundary that keeps secrets out of the client bundle. Content Security Policy is set up with nonces properly rather than disabled because it broke something.",
      topics: [
        "Middleware — what belongs there and what does not",
        "Redirects, rewrites and locale detection",
        "Coarse auth checks at the edge",
        "Security headers and their effects",
        "Content Security Policy with nonces",
        "XSS — where React protects you and where it does not",
        "CSRF and Server Action protections",
        "Input validation and injection risks",
        "Secure cookie attributes",
        "The server-only boundary and leaked secrets",
        "Auditing what actually ships in the client bundle",
      ],
    },
    {
      title: "Integrations — Uploads, Email, Payments & Real-Time",
      weekRange: "Week 6",
      description:
        "The features every real product needs and no tutorial covers together. File uploads done properly — presigned URLs to object storage rather than routing bytes through your server, validation, size limits and image processing. Transactional email with a provider, templates, and the deliverability basics that decide whether your mail reaches an inbox.\n\nPayments cover the checkout flow, webhook-driven fulfilment and idempotency — with the standing rule that you never trust the client to tell you a payment succeeded. Real-time closes the module: Server-Sent Events, WebSocket options, polling as a legitimate choice, and streaming AI responses, which is now a common requirement.",
      topics: [
        "File uploads with presigned URLs to object storage",
        "Upload validation, size limits and image processing",
        "Transactional email providers and templates",
        "Email deliverability basics",
        "Payment checkout flows",
        "Webhook-driven fulfilment and idempotency",
        "Never trusting the client about payment state",
        "Server-Sent Events for one-way updates",
        "WebSocket options with Next.js",
        "Polling as a legitimate choice",
        "Streaming AI responses to the client",
      ],
    },
    {
      title: "Performance, SEO & Image / Font / Script Optimisation",
      weekRange: "Week 7",
      description:
        "Next.js's performance story is the reason Pune product teams choose it. Cover Core Web Vitals (LCP, INP, CLS) and how Next.js's defaults help / hurt each, the Image component for automatic optimisation, Font optimisation with `next/font`, Script component for third-party scripts, the Metadata API for SEO (replacing the old Head pattern), structured data with JSON-LD, plus the Lighthouse + PageSpeed Insights workflow that signals 'this engineer cares about performance' on Pune product hiring panels.",
      topics: [
        "Core Web Vitals — LCP, INP, CLS",
        "next/image for automatic optimisation",
        "next/font for font optimisation",
        "next/script for third-party scripts",
        "Metadata API for SEO",
        "Structured data (JSON-LD)",
        "Lighthouse + PageSpeed Insights workflow",
      ],
    },
    {
      title: "Testing Next.js Applications",
      weekRange: "Week 7",
      description:
        "How you test an application whose components run in two different places. Unit tests with Vitest for pure logic; component tests with Testing Library for client components; and the honest position on Server Components, which are awkward to unit-test today and are better covered by end-to-end tests — a limitation worth stating plainly rather than pretending around.\n\nRoute handlers are tested as the API they are. End-to-end testing with Playwright covers the flows that matter — sign-in, checkout, form submission — and the module closes on test data strategy, mocking external services, and running the suite in CI so it actually protects the main branch.",
      topics: [
        "Unit testing with Vitest",
        "Component testing with Testing Library",
        "Server Components and their testing limits",
        "Testing route handlers as APIs",
        "Testing Server Actions",
        "End-to-end tests with Playwright",
        "Test data strategy and fixtures",
        "Mocking external services and payment providers",
        "Accessibility assertions in tests",
        "Running the suite in CI",
        "What is worth testing and what is not",
      ],
    },
    {
      title: "Deployment — Vercel, Self-Hosting, Docker & CI/CD",
      weekRange: "Week 7",
      description:
        "Getting it live, on more than one kind of infrastructure. Vercel first because it is the reference deployment and everything works; then self-hosting honestly, because plenty of Pune employers run on their own infrastructure and need someone who knows what Next.js requires outside Vercel — the Node server, the standalone output mode, and which features need extra work.\n\nDocker covers multi-stage builds and small production images. CI/CD covers a pipeline that lints, tests, builds and deploys on merge, with preview deployments per pull request. Environment variables, secrets and configuration per environment run throughout.",
      topics: [
        "Vercel deployment and preview environments",
        "Self-hosting on a Node server",
        "Standalone output mode",
        "Which features need extra work off Vercel",
        "Dockerising Next.js with multi-stage builds",
        "Docker Compose with a database",
        "Cloud deployment options",
        "Environment variables and secrets per environment",
        "GitHub Actions — lint, test, build, deploy",
        "Preview deployments per pull request",
        "Rollback and release safety",
      ],
    },
    {
      title: "Architecture, Data Access & Migrating from Pages Router",
      weekRange: "Week 8",
      description:
        "How a Next.js codebase is organised so it survives its second year. A data access layer that every Server Component and route handler goes through, so authorisation is enforced in one place rather than repeated in twelve; repository patterns; and keeping domain logic out of route files.\n\nObservability covers structured logging, error tracking and web-vitals reporting from real users. The module closes on the Pages Router — still running in a great many production applications — what differs, and how an incremental migration to the App Router is actually carried out, since \"maintain and migrate an existing Next.js application\" is a real Pune job description.",
      topics: [
        "A data access layer as the single authorisation point",
        "Repository patterns and testable data code",
        "Keeping domain logic out of route files",
        "Folder structure that survives growth",
        "Structured logging and error tracking",
        "Real-user web-vitals reporting",
        "Analytics without wrecking performance",
        "Pages Router — getServerSideProps and getStaticProps",
        "What differs between the two routers",
        "Incremental migration route by route",
        "Running both routers during a migration",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Week 8 + 1 week capstone",
      description:
        "One week of full-time capstone work plus structured interview preparation. Pick one of three capstone projects (see Capstone Projects). Mock interviews calibrated for Pune Next.js hiring panels — Persistent, BMW TechWorks, Mastercard Pune Tech Hub, Amagi, Fyllo, BharatPe, Razorpay. Includes a Server Components / Server Actions whiteboard round (the most common 2026 senior interview question), a caching / revalidation scenario round, and a behavioural round. Resume / LinkedIn / GitHub polish included.",
      topics: [
        "Capstone implementation, deployment, README",
        "Code review with the lead trainer",
        "Server Components mock round",
        "Caching / revalidation scenario round",
        "Resume + LinkedIn rewrite for Next.js JDs",
        "GitHub portfolio polish — deployed Vercel apps with Lighthouse scores",
        "HR mock interview and salary negotiation",
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
    src: "/images/courses/nextjs-path-v1.webp",
    width: 1400,
    height: 900,
    alt: "Eight-stage Next.js learning path taught at Archer Infotech Pune: React foundations covering components, hooks and state as the prerequisite; the App Router covering file routing, layouts, nested and dynamic routes; rendering models covering Server Components, server-side rendering, static generation, incremental regeneration and streaming; data and mutations covering fetching, caching, revalidation and Server Actions; route handlers and authentication covering API routes, middleware, sessions and protection; the database layer covering Prisma or Drizzle, queries and migrations; optimisation and SEO covering images, fonts, metadata and Core Web Vitals; and deployment and operations covering Vercel, self-hosting, monitoring and projects.",
    caption:
      "The order this course is taught in. Each stage expands into the modules below — nothing arrives before its prerequisite.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/nextjs-syllabus-v1.pdf",
    title: "Next.js Course Syllabus — Complete Module List",
    slug: "nextjs-syllabus",
    blurb:
      "The complete 119-section syllabus as a 41-page PDF — the App Router in full, Server and Client Components, every caching layer, Server Actions, route handlers, authentication, databases, the Metadata API and SEO, security and CSP, testing, deployment and self-hosting, seven mini projects, three capstone options and interview preparation. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the 41-page PDF",
        items: [
          "All 119 numbered sections in teaching order, from prerequisites through to career roles after training.",
          "The App Router covered exhaustively — route groups, parallel routes, intercepting routes, layouts, templates, streaming and error handling.",
          "Caching separated into its actual layers, with lifetime, tags and revalidation each given their own section — the part of Next.js most courses get wrong.",
          "Seven mini projects and three capstone options (e-commerce, learning management, project-management SaaS), plus interview preparation for both Next.js and architecture rounds.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "Next.js Developer — full-stack React with the App Router.",
          "Full Stack Developer — frontend and backend in one codebase.",
          "React Developer — with server rendering and SEO depth.",
          "Frontend Engineer — performance and Core Web Vitals ownership.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "Production SaaS App — Next.js 16 + Drizzle + Auth.js",
      description:
        "A complete production-style SaaS application — pick a real domain (project management, expense tracker, invoicing, classroom-attendance). Server Components for static / SEO-friendly pages with PPR, Server Actions for mutations with useOptimistic, Drizzle ORM against PostgreSQL (Neon free tier), Auth.js v5 with GitHub or Google OAuth, Tailwind + shadcn/ui, full Lighthouse 95+ scores. Deployed to Vercel with on-demand revalidation. Outcome: a public GitHub repository plus a clickable demo URL — exactly what Pune product engineering hiring panels look at first.",
      technologies: [
        "Next.js 16 (App Router) + React 19",
        "TypeScript",
        "Drizzle ORM + PostgreSQL (Neon)",
        "Auth.js / NextAuth v5",
        "Tailwind CSS + shadcn/ui",
        "Vercel deployment with PPR + ISR",
      ],
    },
    {
      title: "AI-Powered Web App with Vercel AI SDK + Server Streaming",
      description:
        "A 2026-relevant AI-powered web application — a chat assistant or document Q&A interface with the Vercel AI SDK, Anthropic Claude or OpenAI as the model, server-streaming responses (Server-Sent Events to the React component), conversation persistence in PostgreSQL, plus rate limiting via Upstash. Deployed to Vercel with Edge functions for the streaming endpoint. Demonstrates the patterns Pune AI-platform teams hire on — modern Next.js + AI integration + streaming.",
      technologies: [
        "Next.js 16 + Vercel AI SDK",
        "Anthropic Claude / OpenAI",
        "Server-Sent Events streaming",
        "PostgreSQL + Drizzle for conversation persistence",
        "Upstash Redis for rate limiting",
        "Vercel Edge runtime",
      ],
    },
    {
      title: "E-Commerce Storefront with PPR + Stripe (Test Mode)",
      description:
        "A high-performance e-commerce storefront — product listing pages with Partial Prerendering (static shell + dynamic price / stock), product detail pages with ISR, cart with Server Actions and useOptimistic, Stripe checkout in test mode, full Image / Font / Script optimisation. Targets sub-1s LCP on 3G connections. Demonstrates the performance discipline Pune e-commerce / SaaS teams test for.",
      technologies: [
        "Next.js 16 with PPR",
        "Stripe Checkout (test mode)",
        "Drizzle ORM + PostgreSQL",
        "Tailwind CSS",
        "Vercel deployment",
        "Lighthouse 95+ target",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Chougule (Technical Trainer — Modern Web & Mobile, hands-on at Mindstix Software Labs, ships Next.js / React / Angular every day). Amol personally leads every Next.js session from Day 1 through capstone — the name you see here is the name you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "Next.js Developer is among the highest-velocity-growth roles in Pune product engineering in 2026 — Indeed Pune lists 600+ active Next.js-specific openings, with another ~1,000 React openings listing Next.js as preferred. The biggest employers are Persistent Systems, BMW TechWorks India, Mercedes-Benz R&D India, Mastercard Pune Tech Hub, Amagi, Fyllo, BharatPe Pune, Razorpay Pune, Pine Labs Pune, plus the Pune SaaS / fintech startup scene. Senior Next.js engineers earn 15–25% above pure React engineers because the role bundles frontend with full-stack responsibility.",
      "What pulls a Next.js engineer above the median band: depth on Server Components and the Server / Client boundary, demonstrable Server Actions usage, one production deployed Vercel app with 90+ Lighthouse scores, caching / revalidation literacy (the most-asked 2026 senior interview topic), and one AI integration via Vercel AI SDK. Our capstone projects are designed exactly around these signals.",
      "Senior Next.js / Frontend Engineer bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr.",
    ],
    salaryBands: [
      {
        role: "Next.js Developer (Pune)",
        band: "₹8,40,000 per year average",
        source: {
          label: "Indeed Pune (Next.js Developer)",
          url: "https://in.indeed.com/career/next.js-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Junior Next.js Developer (Pune entry, <2 years)",
        band: "₹4,50,000 – ₹7,50,000 per year",
        source: {
          label: "AmbitionBox Pune Next.js Developer",
          url: "https://www.ambitionbox.com/profile/next-js-developer-salary-in-pune",
        },
      },
      {
        role: "Mid-level Next.js Developer (Pune, 3–5 years)",
        band: "₹12,00,000 – ₹20,00,000 per year",
        source: {
          label: "Glassdoor Pune Next.js Developer",
          url: "https://www.glassdoor.co.in/Salaries/pune-next-js-developer-salary-SRCH_IL.0,4_IM1072_KO5,22.htm",
        },
      },
      {
        role: "Senior Next.js / Full Stack Engineer (national, 5–8 years)",
        band: "₹22,00,000 – ₹38,00,000 per year",
        source: {
          label: "6figr India Senior Next.js Engineer (Pune ±10%)",
          url: "https://6figr.com/in/salary/senior-next-js-engineer--t",
        },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "Mastercard Pune Tech Hub",
      "Amagi",
      "Fyllo",
      "BharatPe (Pune)",
      "Razorpay (Pune)",
      "Pine Labs (Pune)",
      "Drip Capital",
      "Innovaccer (Pune)",
      "Whatfix (Pune)",
      "Synechron",
      "TCS",
      "Cognizant",
      "Capgemini",
    ],
    rolesAfterCourse: [
      "Next.js Developer",
      "Full Stack Developer (Next.js)",
      "Frontend Developer (Next.js)",
      "Senior React Developer (with Next experience)",
      "Junior Solutions Engineer at SaaS / fintech startups",
    ],
  },

  modesAndDuration: {
    duration:
      "8 weeks of structured curriculum plus 1 week of capstone project and interview preparation (~2 months total)",
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
        "Same hours as classroom batches",
        "Recordings available for review",
        "Same code reviews and project feedback as in-person batches",
      ],
      tools: [
        "Zoom for live sessions",
        "GitHub for code reviews and PRs",
        "Vercel free tier for capstone deployments",
        "Slack / WhatsApp for async Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over ~3 months instead of 2 to accommodate working professionals.",
    },
    batchPolicy:
      "Maximum 15 students per batch. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode, batch type, and any applicable concession.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
      "Bundled React + Next.js enrolment with discount",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 6 of the course. By the time you finish the curriculum, your resume highlights deployed Vercel apps with Lighthouse 90+ scores, your GitHub has at least two production-style Next.js repositories, and you have completed at least three mock technical interviews against question banks from Pune Next.js hiring teams.",
      "We say placement support, not placement guarantee. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 6 — resume and LinkedIn rewrite, calibrated for Next.js JDs",
      "Week 7 — GitHub portfolio cleanup, Vercel deployment links, Lighthouse scores",
      "Weeks 8 — three rounds of mock technical interviews",
      "Week 8 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies, with extra emphasis on Pune SaaS / fintech",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "BMW TechWorks India",
      "Mastercard Pune Tech Hub",
      "Amagi",
      "Fyllo",
      "BharatPe (Pune)",
      "Razorpay (Pune)",
      "Pine Labs (Pune)",
      "Synechron",
      "TCS",
      "Cognizant",
      "Capgemini",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune Next.js training institutes on factual rows only — no logos, no opinions.",
    rows: [
      {
        feature: "Trainer named on course page with photo and LinkedIn",
        archer: "Yes — Amol Chougule",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Next.js version covered",
        archer: "Next.js 16 — App Router default, Turbopack, React 19",
        typical: "Next.js 13 / 14 with pages router still",
      },
      {
        feature: "App Router vs pages router",
        archer: "App Router as default; pages router as 'reading legacy' note only",
        typical: "Pages router taught as primary",
      },
      {
        feature: "Server Components depth",
        archer: "Full week — boundary rules, async fetch, streaming, React 19 `use`",
        typical: "Marketing-only mention",
      },
      {
        feature: "Server Actions coverage",
        archer: "Full week — useActionState, useFormStatus, useOptimistic, Zod",
        typical: "Not covered or skipped",
      },
      {
        feature: "Caching + revalidation depth",
        archer: "Four cache layers + revalidatePath / revalidateTag + PPR",
        typical: "Basic ISR only",
      },
      {
        feature: "Database integration",
        archer: "Drizzle + Postgres + connection pooling for serverless",
        typical: "Not covered or generic",
      },
      {
        feature: "AI integration coverage",
        archer: "Vercel AI SDK + Anthropic / OpenAI streaming capstone",
        typical: "Not covered",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — deployed Vercel apps with Lighthouse 90+ scores",
        typical: "Local code on a hard drive",
      },
      {
        feature: "Salary data shown",
        archer: "Cited from Indeed Pune + AmbitionBox + Glassdoor + 6figr with source URLs",
        typical: "Single number with no source",
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
      "Compare with whoever you are considering. The right test is whether you can see actual student deployed Vercel apps before you pay.",
  },

  versusAlternative: {
    heading: "Next.js vs Pure React — Which Should You Pick in Pune?",
    paragraphs: [
      "Next.js vs pure React is a slightly mistaken framing — Next.js IS React, plus a framework around it. The honest question is whether you should learn pure React first or jump directly to Next.js.",
      "Choose pure React first (our React course) if your goal is building libraries / SDKs / component systems, working in a non-Next React codebase (Angular team migrating to React, an existing Vite SPA), or you want the full reactivity / hooks mental model before adding the framework layer. Choose Next.js (this course) directly if you already have basic React fluency or if your goal is specifically Pune product / SaaS / fintech where Next.js is the institutional default.",
      "Honest recommendation: most Pune fresher product engineers benefit from React → Next.js as a sequence (combined ~4 months), where the second-half Next.js work makes you immediately hireable for product engineering roles. Working React engineers can take Next.js standalone. Senior engineers leading a migration from CRA / Vite to Next can take this course standalone for the focused 2-month deepening.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: working React (basic hooks, components, props, state), TypeScript at a working level (we cover advanced TS in week 4 inline), basic understanding of HTTP / REST, and willingness to commit 8–10 hours per week of practice outside class. If you have done our React course or equivalent self-study, you are ready. Pure React beginners should do our React course first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation",
      "Show up to day one with a laptop running 64-bit OS, 8GB+ RAM, and Node.js 22 LTS pre-installed",
    ],
  },

  faqs: [
    {
      question: "How long does Next.js training in Pune take at Archer Infotech?",
      answer:
        "Approximately 2 months — 8 weeks of structured curriculum plus 1 week of capstone and interview preparation. The weekend batch stretches over ~3 months at the same content depth.",
    },
    {
      question: "What is the salary of a Next.js Developer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹8.40 lakh per year for Next.js Developer (May 2026). Junior Pune entry sits at ₹4.5–7.5 lakh per AmbitionBox. Mid-level (3–5 years) earns ₹12–20 lakh per Glassdoor. Senior Next.js / Full Stack Engineers earn ₹22–38 lakh nationally with Pune trending within ±10%.",
    },
    {
      question: "Do I need React before Next.js?",
      answer:
        "Yes — Next.js is React + a framework. We expect basic React fluency (hooks, components, props, state) on day 1. If you are new to React, take our React course first.",
    },
    {
      question: "App Router or Pages Router?",
      answer:
        "App Router is the default throughout this course. Pages Router is covered briefly as a 'reading legacy code' note only. New Pune Next.js work in 2026 is overwhelmingly App Router.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) production SaaS app with Drizzle + Auth.js + Server Actions, (2) AI-powered web app with Vercel AI SDK + streaming, (3) e-commerce storefront with PPR + Stripe (test mode). All three become public GitHub repositories with deployed Vercel URLs and Lighthouse 90+ scores.",
    },
    {
      question: "Are Server Components and Server Actions covered?",
      answer:
        "Yes — week 3 is dedicated to Server Components, week 5 to Server Actions. Both are core 2026 Next.js patterns and the most-asked 2026 senior interview topics.",
    },
    {
      question: "Are weekend Next.js classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~3 months instead of 2.",
    },
    {
      question: "What is the fee for the Next.js course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode and concession. Bundled React + Next.js enrolment offers significant savings.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for Next.js / Frontend / Full Stack roles, referrals via our alumni network at 12+ partner companies (with extra emphasis on Pune SaaS / fintech), resume / LinkedIn / GitHub rewrites, and salary negotiation coaching.",
    },
    {
      question: "Is the named trainer actually teaching, or are they just on the brochure?",
      answer:
        "Amol Chougule personally leads every session of every batch from Day 1 through capstone. The same name on this page is the same person you meet on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start Next.js training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol Chougule is happy to spend 30 minutes telling you whether the course is right for you, or whether the React + Next.js bundled path makes more sense for your goal.",
  },
};
