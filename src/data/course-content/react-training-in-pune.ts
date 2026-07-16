import type { CourseRichContent } from "./types";

export const reactTrainingInPune: CourseRichContent = {
  intro:
    "React is the dominant frontend framework in Pune product engineering — Persistent Systems, BMC Software, Bajaj Finserv, BMW TechWorks India, Synechron, Mastercard Pune Tech Hub, plus most Pune SaaS and fintech startups ship their primary user interfaces in React. Archer Infotech's React training in Pune teaches the framework as it is actually used in 2026 — React 19 with the React Compiler, Server Components and the Suspense / streaming model, modern hooks (useTransition, useDeferredValue, useOptimistic, useFormStatus), TanStack Query for server state, Zustand for client state, Vite for tooling, Vitest + Testing Library for tests, and one production deployment story. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn React in 2026",
    paragraphs: [
      "React holds roughly 40% of the global frontend framework share (State of JS 2025) and a higher share in Indian product engineering. Indeed Pune lists more than 1,300 active React Developer / Frontend Developer roles as of May 2026, with continuous hiring at Persistent Systems, BMC Software, Bajaj Finserv, BMW TechWorks India, Mercedes-Benz R&D India, Synechron, Mastercard Pune Tech Hub, plus the Pune SaaS and fintech startup scene (BharatPe, Amagi, Fyllo, Pune-based Razorpay teams). React skills also unlock React Native for mobile and Next.js for full-stack roles, making it the highest-leverage frontend investment for an Indian developer.",
      "What changed in 2026: React 19 is the production default and ships the React Compiler (auto-memoisation — the end of manual useMemo / useCallback for most code), Actions and the new useActionState hook, useFormStatus and useOptimistic for form-heavy applications, and the document-metadata API. Server Components have moved from experimental to dominant via Next.js App Router. Tooling has settled around Vite for SPA work and Next.js for full-stack; create-react-app is officially deprecated and should not appear in new courses. Testing has consolidated around Vitest + Testing Library + Playwright. Redux is no longer the default — most new code uses TanStack Query for server state plus Zustand or Jotai for the small slice of client state that genuinely needs it.",
      "What this means for hiring: 2026 Pune React JDs expect React 19 with hooks fluency, TypeScript (which is now expected, not optional), TanStack Query or RTK Query, one styling solution at a working level (Tailwind, CSS Modules, or a component library), Vitest for tests, and ideally one Next.js project. Archer Infotech's curriculum is rebuilt around exactly these expectations — modern React, TypeScript-first, deployment-ready.",
    ],
    keyPoints: [
      "1,300+ active React / Frontend Developer roles on Indeed Pune (May 2026)",
      "React 19 + React Compiler — auto-memoisation, no more manual useMemo / useCallback",
      "Server Components + streaming via Next.js — the dominant 2026 pattern",
      "TypeScript is expected on every Pune React JD, not optional",
      "Vite + Vitest + Tailwind + TanStack Query — the modern toolkit",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student targeting Frontend / React Developer roles in Pune",
      "Working backend developer wanting to add modern frontend to your skill stack",
      "Working Angular / Vue / jQuery developer wanting to switch to the larger React job market",
      "Designer or web developer with HTML / CSS / JS background looking to graduate into framework work",
      "Career restarter targeting frontend as a flexible re-entry path with strong remote / WFH options",
    ],
    notForYou: [
      "If you have no JavaScript experience at all — take a JavaScript / web fundamentals course first; we expect ES2020+ fluency from week 1",
      "If you cannot put in 8–10 hours per week of practice outside class — frontend is learned by building, not watching",
      "If you want a 30-day course with no project work — modern frontend (TypeScript + Server Components + state management) needs at least 2.5 months to internalise",
      "If you only want a certificate sticker with no portfolio — Pune frontend hiring screens hard on deployed work and GitHub repos",
      "If you have 4+ years of production React experience — you'll be under-stretched; talk to us about Next.js / advanced full-stack tracks instead",
    ],
  },

  curriculum: [
    {
      title: "Modern JavaScript & TypeScript Refresher",
      weekRange: "Week 1",
      description:
        "A targeted refresher rather than an introduction. Cover the modern JavaScript subset React expects you to know — destructuring, spread / rest, optional chaining, nullish coalescing, async / await, modules, Promise.all and Promise.allSettled — plus a practical TypeScript primer (types, interfaces, generics, utility types) at the level you actually need for React props and hooks. We assume basic JS fluency on day 1; this week levels the floor on the modern syntax that the rest of the course depends on. By the end of week 1 every student has Vite + TypeScript + ESLint + Prettier configured and a tiny TS app deployed.",
      topics: [
        "Modern JS — destructuring, spread, optional chaining, async / await",
        "JS modules, dynamic imports, tree-shaking",
        "TypeScript — types, interfaces, generics, utility types",
        "Function vs arrow functions, this binding",
        "Vite + TypeScript + ESLint + Prettier setup",
        "Browser DevTools, Network tab, performance profiler basics",
      ],
    },
    {
      title: "React 19 Fundamentals",
      weekRange: "Weeks 2–3",
      description:
        "React 19 from first principles — JSX (and the rare cases when it's not transpiled), components as functions, props with TypeScript, controlled vs uncontrolled inputs, conditional rendering, lists with proper keys, lifting state up, and composition over prop-drilling. Cover the core hooks — useState, useEffect (with the discipline that prevents the dependency-array bug pile-up), useRef, useContext — and React 19's React Compiler that auto-memoises most code (so you don't manually wrap everything in useMemo / useCallback any more). By the end of week 3 every student has built a small portfolio site with routing.",
      topics: [
        "JSX, function components, TypeScript props",
        "State with useState, derived state vs stored state",
        "useEffect — when to use it, when NOT to use it",
        "useRef for DOM access and mutable values",
        "Controlled vs uncontrolled forms",
        "Conditional rendering and list rendering with keys",
        "useContext for cross-cutting state",
        "React Compiler — auto-memoisation in React 19",
      ],
    },
    {
      title: "Forms, Validation & React 19 Form Hooks",
      weekRange: "Week 4",
      description:
        "Forms are where most React applications go wrong and most junior developers lose interview points. Cover the modern form stack — React Hook Form for client-side validation (the de-facto Pune choice in 2026), Zod for schema validation shared between client and server, plus React 19's new form primitives (useActionState, useFormStatus, useOptimistic) for actions / Server-Function flows. We finish by building a multi-step wizard with proper error handling and accessibility.",
      topics: [
        "React Hook Form — register, watch, handleSubmit",
        "Zod for schema-based validation",
        "Inferring TypeScript types from Zod schemas",
        "useActionState, useFormStatus, useOptimistic (React 19)",
        "Multi-step wizards with state preservation",
        "Accessibility — labels, error announcement, focus management",
      ],
    },
    {
      title: "Routing & State Management",
      weekRange: "Week 5",
      description:
        "Client-side routing with React Router 7 (the dominant choice for SPAs) — nested routes, loaders, actions, useNavigate, route guards. Then state management as it actually works in 2026 — TanStack Query for server state (the 80% of state that lives on the backend) and Zustand for the small slice of true client state. We deliberately demote Redux from default to 'only when your team already runs it' and explain why. By the end of week 5 every student has a small e-commerce-style app with proper data fetching, caching, and a cart.",
      topics: [
        "React Router 7 — nested routes, loaders, actions",
        "useNavigate, route guards, search params",
        "TanStack Query — queries, mutations, invalidation",
        "Optimistic updates and the cache as state",
        "Zustand for client state (toasts, modals, cart UI)",
        "Honest comparison — when Redux still earns its place",
      ],
    },
    {
      title: "Styling — Tailwind, CSS Modules, Component Libraries",
      weekRange: "Week 6",
      description:
        "Three styling stacks, three Pune realities. Tailwind CSS for product engineering teams that prize velocity (the dominant choice for new projects in Pune SaaS and fintech). CSS Modules for component libraries and design-system work. Pre-built component libraries — shadcn/ui (the 2026 default), Radix UI primitives, Material UI for enterprise — and the discipline of not over-styling things that should be standard. We cover responsive design, dark mode, and the accessibility hooks that prevent your dashboard from being unusable for 15% of users.",
      topics: [
        "Tailwind CSS — utility-first, component extraction patterns",
        "CSS Modules and the BEM / atomic naming bridge",
        "shadcn/ui + Radix UI primitives",
        "Material UI for enterprise dashboards",
        "Responsive design — breakpoints, container queries",
        "Dark mode, prefers-color-scheme, theme switching",
        "Accessibility — colour contrast, keyboard nav, ARIA basics",
      ],
    },
    {
      title: "Server State, Authentication & Real-Time",
      weekRange: "Week 7",
      description:
        "The integration layer where frontend meets backend. REST integration with TanStack Query (POST / PUT / DELETE patterns, optimistic updates, retry logic), GraphQL with Apollo Client or urql, JWT authentication flows (login, refresh, logout, route guards), and real-time updates via WebSocket and Server-Sent Events. We cover the classic auth pitfalls — XSS, CSRF, secure cookies vs localStorage — at the level where you can defend the choice on a security review.",
      topics: [
        "REST integration with TanStack Query",
        "GraphQL with Apollo / urql",
        "JWT auth flows — access + refresh tokens",
        "Secure storage — httpOnly cookies vs localStorage",
        "WebSocket and Server-Sent Events for real-time",
        "Error handling, retry, exponential backoff",
        "XSS / CSRF / clickjacking — frontend defences",
      ],
    },
    {
      title: "Testing — Vitest, Testing Library & Playwright",
      weekRange: "Week 8",
      description:
        "Testing as Pune product teams actually do it. Vitest for unit tests (Jest-compatible, faster, Vite-native), Testing Library for component tests (testing what users see, not implementation details), MSW for mocking network calls in tests, and Playwright for end-to-end flows. We cover the anti-patterns that test the wrong things — testing implementation details, mocking too much, snapshot tests as the primary tool — and the discipline that produces tests senior engineers actually trust.",
      topics: [
        "Vitest — describe, it, expect, vi.fn",
        "Testing Library — getByRole, queryByText, fireEvent, user-event",
        "MSW for HTTP mocking in tests",
        "Component tests vs integration tests",
        "Playwright for end-to-end flows",
        "Coverage — useful metrics vs theatre",
        "Testing pyramid — what to test at each layer",
      ],
    },
    {
      title: "Server Components & Next.js App Router",
      weekRange: "Week 9",
      description:
        "The biggest React shift since hooks. Server Components for static and dynamic rendering, the streaming and Suspense model, Server Actions for mutations without API routes, Next.js App Router as the dominant Server Components implementation, dynamic / static rendering, route handlers, middleware. We deliberately spend a full week here because Server Components are now expected on most senior frontend interviews — the candidates who can articulate the trade-offs win the offer.",
      topics: [
        "Server vs Client Components — the boundary rules",
        "Streaming, Suspense, loading.tsx, error.tsx",
        "Server Actions for mutations",
        "Next.js App Router — file conventions, layouts, parallel routes",
        "Static vs dynamic rendering, ISR, on-demand revalidation",
        "Route handlers and middleware",
        "Image optimisation and metadata API",
      ],
    },
    {
      title: "Performance, Deployment & Production Practices",
      weekRange: "Week 10",
      description:
        "Performance — Core Web Vitals (LCP, INP, CLS) and how to fix each, code splitting and lazy loading, bundle analysis with rollup-visualizer, the discipline of measuring before optimising, React DevTools Profiler for component-level investigation. Deployment — Vercel for Next.js, Netlify / Cloudflare Pages for SPAs, GitHub Actions CI/CD pipelines that run tests + builds + Lighthouse checks. Plus the production hygiene — error tracking with Sentry, analytics with Plausible / PostHog, environment configuration.",
      topics: [
        "Core Web Vitals — LCP, INP, CLS, TTFB",
        "Code splitting, lazy(), dynamic import",
        "Bundle analysis and tree-shaking verification",
        "React DevTools Profiler",
        "Vercel / Netlify / Cloudflare Pages deployment",
        "GitHub Actions CI/CD with Lighthouse checks",
        "Error tracking — Sentry",
        "Analytics — Plausible, PostHog, GA4 basics",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Weeks 11–12",
      description:
        "Two weeks of full-time capstone work plus structured interview preparation. Pick one of three capstone projects (see Capstone Projects). Mock interviews calibrated for Pune frontend hiring panels — Persistent, BMC, Bajaj Finserv, BMW TechWorks, Synechron, plus the SaaS startup scene. Includes a live-coding round (build a small component or hook in 30 minutes), a JavaScript / React conceptual round (closures, the event loop, hooks rules, reconciliation), and a behavioural round. Resume / LinkedIn / GitHub polish included.",
      topics: [
        "Capstone implementation, deployment, README",
        "Code review with the lead trainer",
        "Live-coding mock — component / hook in 30 minutes",
        "JS / React conceptual mock round",
        "Behavioural and product-thinking round",
        "Resume + LinkedIn rewrite for Frontend / React Developer JDs",
        "GitHub portfolio polish — deployed apps with Lighthouse scores",
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

  projects: [
    {
      title: "Production E-Commerce SPA with TanStack Query + Zustand",
      description:
        "A complete e-commerce front end — product catalog with infinite-scroll pagination via TanStack Query, search and filters with URL-state syncing, cart and checkout with Zustand, JWT-authenticated user accounts, order history with optimistic mutations, dark mode, full keyboard accessibility, and Vitest + Playwright tests at meaningful coverage. Deployed to Vercel with a GitHub Actions CI pipeline that runs lint + tests + Lighthouse on every PR. Outcome: a public GitHub repository plus a clickable demo URL — exactly what Pune frontend hiring panels interview on.",
      technologies: [
        "React 19 + TypeScript",
        "Vite",
        "TanStack Query",
        "Zustand",
        "React Router 7",
        "Tailwind CSS + shadcn/ui",
        "Vitest + Testing Library + Playwright",
        "GitHub Actions + Vercel",
      ],
    },
    {
      title: "Real-Time Collaboration Dashboard",
      description:
        "A real-time team dashboard — live activity feed via WebSocket, multi-user presence, optimistic comment threads, charts via Recharts or Tremor, role-based access control, OAuth login (GitHub / Google), and offline-first behaviour with TanStack Query persistence. Includes a Sentry-instrumented error boundary tree and PostHog analytics for funnel measurement. Demonstrates the patterns Pune SaaS and fintech teams hire on — real-time, observable, accessible, deployed.",
      technologies: [
        "React 19 + TypeScript",
        "WebSocket / Socket.io",
        "TanStack Query (with persistence)",
        "Recharts / Tremor",
        "OAuth (Auth.js / NextAuth)",
        "Tailwind CSS",
        "Sentry + PostHog",
      ],
    },
    {
      title: "Next.js App Router Full-Stack Application",
      description:
        "A full-stack project with Next.js 15 / 16 App Router — Server Components for product listings (static, ISR), Client Components for interactive carts, Server Actions for mutations (no API routes needed), Postgres via Drizzle ORM, NextAuth for authentication, Stripe-style checkout flow (test mode), and image optimisation via the Next Image component. Deployed to Vercel with on-demand revalidation. Outcome: a 2026-relevant full-stack React project that demos in 5 minutes.",
      technologies: [
        "Next.js 15 / 16 (App Router)",
        "React 19 Server Components + Server Actions",
        "PostgreSQL + Drizzle ORM",
        "NextAuth / Auth.js",
        "Tailwind CSS + shadcn/ui",
        "Vercel deployment with ISR",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Chougule (Technical Trainer — Modern Web & Mobile, hands-on at Mindstix Software Labs, ships React / Next / Angular every day) and Amol Patil (Senior Corporate Trainer, 10+ years, lead for Full Stack and MERN tracks). Both personally take sessions in every batch — the names you see here are the names you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "React / Frontend Developer is one of the most-hired roles in Pune in 2026 — Indeed Pune lists 1,300+ active openings, with strong year-on-year growth driven by the Pune SaaS, fintech, and product engineering scene. The biggest employers are Persistent Systems, BMC Software, Bajaj Finserv, BMW TechWorks India, Mercedes-Benz R&D India, Synechron, Mastercard Pune Tech Hub, plus startups like Amagi, Fyllo, BharatPe Pune, and the Pune-based Razorpay teams. Compensation depends heavily on TypeScript fluency, depth on at least one state-management approach, and demonstrable deployed work.",
      "What pulls a React developer above the median band: TypeScript fluency (now mandatory), one Server Components project, a public GitHub repository with deployed apps and Lighthouse scores, demonstrable testing discipline, and one accessibility / i18n / performance specialisation. Our capstone projects are designed exactly around these signals.",
      "Senior React / Frontend Developer bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr.",
    ],
    salaryBands: [
      {
        role: "React Developer (Pune)",
        band: "₹6,21,545 per year average",
        source: {
          label: "Indeed Pune (React Developer)",
          url: "https://in.indeed.com/career/react-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Frontend Developer (Pune)",
        band: "₹6,16,772 per year average",
        source: {
          label: "Indeed Pune (Frontend Developer)",
          url: "https://in.indeed.com/career/frontend-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Junior React Developer (Pune entry, <2 years)",
        band: "₹3,50,000 – ₹6,00,000 per year",
        source: {
          label: "AmbitionBox Pune React Developer",
          url: "https://www.ambitionbox.com/profile/react-js-developer-salary-in-pune",
        },
      },
      {
        role: "Mid-level React Developer (Pune, 3–5 years)",
        band: "₹9,00,000 – ₹16,00,000 per year",
        source: {
          label: "Glassdoor Pune React Developer",
          url: "https://www.glassdoor.co.in/Salaries/pune-react-developer-salary-SRCH_IL.0,4_IM1072_KO5,20.htm",
        },
      },
      {
        role: "Senior Frontend Engineer (national, 5–8 years)",
        band: "₹18,00,000 – ₹32,00,000 per year",
        source: {
          label: "6figr India Senior Frontend Engineer (Pune ±10%)",
          url: "https://6figr.com/in/salary/senior-frontend-engineer--t",
        },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "BMC Software",
      "Bajaj Finserv",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "Synechron",
      "Mastercard Pune Tech Hub",
      "Amagi",
      "Fyllo",
      "BharatPe (Pune)",
      "Razorpay (Pune)",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
      "Atos / Eviden",
    ],
    rolesAfterCourse: [
      "React Developer",
      "Frontend Developer",
      "UI Developer",
      "Web Developer",
      "Junior Full Stack Developer",
      "React Native Developer (with mobile self-study)",
      "Next.js Developer",
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
        "Vercel for capstone deployments",
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
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with full Server Components / Next.js modules and extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 7 of the course, not at the end. By the time you finish the curriculum, your resume highlights real deployed React applications with Lighthouse scores, your GitHub has at least two production-style repositories, and you have completed at least three mock technical interviews against question banks from Pune frontend hiring teams.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 7 — resume and LinkedIn rewrite, calibrated for Frontend / React JDs",
      "Week 8 — GitHub portfolio cleanup, deployed demo URLs, Lighthouse score badges",
      "Weeks 9–10 — JS / React conceptual drills, live-coding mock rounds, behavioural prep",
      "Weeks 11–12 — three rounds of mock technical interviews",
      "Week 12 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "BMC Software",
      "Bajaj Finserv",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "Synechron",
      "Mastercard Pune Tech Hub",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
      "Atos / Eviden",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune React training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Amol Chougule and Amol Patil",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "React version covered",
        archer: "React 19 with React Compiler, Server Components, modern hooks",
        typical: "Often React 17 or 18 with class components still mixed in",
      },
      {
        feature: "TypeScript first-class",
        archer: "Yes — every file in TypeScript from week 1",
        typical: "JavaScript-only or TS as an optional later module",
      },
      {
        feature: "State management approach",
        archer: "TanStack Query + Zustand — modern 2026 default",
        typical: "Redux-only, often Redux without Toolkit",
      },
      {
        feature: "Testing in the curriculum",
        archer: "Vitest + Testing Library + Playwright with real coverage",
        typical: "Theory-only or skipped entirely",
      },
      {
        feature: "Server Components / Next.js coverage",
        archer: "Full week dedicated, with capstone option",
        typical: "Mentioned as 'advanced' or skipped",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — deployed apps with Lighthouse scores",
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
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student deployed apps before you pay.",
  },

  versusAlternative: {
    heading: "React vs Angular — Which Should You Learn First in Pune?",
    paragraphs: [
      "React vs Angular is the most-asked question in Pune frontend counselling. The honest answer: both have ample Pune jobs, both pay similarly at equivalent experience, and the choice should be by goal — not by which framework is 'better' (a question that produces no useful answer).",
      "Choose React if your goal is product engineering, a Pune SaaS or fintech startup role, React Native mobile down the road, or remote / global hiring (React's worldwide share is roughly 40% vs Angular's 18% per State of JS 2025). Indeed Pune lists 1,300+ React openings vs ~700 Angular openings; the React job market is wider and growing faster.",
      "Choose Angular if your goal is enterprise IT, BFSI dashboards, .NET / Java enterprise full-stack roles, or you specifically target large captive R&D centres (Mercedes-Benz, Cummins, John Deere ETC, Honeywell — all have substantial Angular footprints). Angular's TypeScript-first design and built-in routing / forms / DI make it strong for large-team enterprise work.",
      "Honest recommendation: pick React first if you are unsure — it has more Pune openings and the React Native bonus. Pick Angular first if you have a specific enterprise / BFSI / .NET target. Many of our students learn the second framework as a side skill once placed; senior frontend engineers in Pune often know both at a working level.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: working JavaScript at the ES2020+ level (functions, closures, async / await, modules, destructuring), HTML and CSS basics, and willingness to commit 8–10 hours per week of practice outside class. We expect basic JS fluency on day 1; week 1 levels up to TypeScript and modern toolchain. If you have done our JavaScript course or equivalent self-study, you are ready. Pure non-developers should do a JavaScript course first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal (we say no to roughly 10% of enquirers)",
      "Confirm enrolment and complete pre-course orientation (Node / npm install, GitHub account, VS Code setup)",
      "Show up to day one with a laptop running 64-bit OS, 8GB+ RAM, and Node.js 22 LTS pre-installed (we provide an install script)",
    ],
  },

  faqs: [
    {
      question: "Which is the best React training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves. The test that works: ask any institute you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student GitHub repositories with deployed apps and Lighthouse scores, and (3) name companies that hired their last 5 batches. Compare on those three.",
    },
    {
      question: "How long does React training in Pune take at Archer Infotech?",
      answer:
        "Approximately 2.5 months — 10 weeks of structured curriculum plus 2 weeks of capstone project and interview preparation. The weekend batch stretches over ~4 months at the same content depth, designed for working professionals.",
    },
    {
      question: "What is the salary of a React Developer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹6.22 lakh per year for React Developer (May 2026) and ₹6.17 lakh for Frontend Developer. Junior React Developer Pune entry sits at ₹3.5–6 lakh per year per AmbitionBox. Mid-level (3–5 years) earns ₹9–16 lakh per Glassdoor. Senior Frontend Engineers (5–8 years) earn ₹18–32 lakh nationally with Pune trending within ±10%.",
    },
    {
      question: "What is the fee for the React course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and applicable concession. The higher end covers placement-track classroom batches with full Server Components / Next.js modules and extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    },
    {
      question: "Do I need JavaScript before joining the course?",
      answer:
        "Yes — basic JavaScript (ES2020+) fluency is required from week 1. We level up to TypeScript and the modern toolchain in week 1 but we do not start from 'what is a variable'. If you are new to JavaScript, take our JavaScript course or equivalent self-study first.",
    },
    {
      question: "React or Angular — which should I learn first in Pune?",
      answer:
        "React if your goal is product engineering, Pune SaaS / fintech startups, or React Native mobile work — Indeed Pune lists 1,300+ React openings vs ~700 Angular. Angular if your goal is enterprise / BFSI / large captive R&D — those teams have heavier Angular footprints. Both pay similarly at equivalent experience.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) production e-commerce SPA with TanStack Query + Zustand + tests, (2) real-time collaboration dashboard with WebSocket and observability, (3) Next.js full-stack application with Server Components and Server Actions. All three become public GitHub repositories with clickable demo URLs.",
    },
    {
      question: "Is TypeScript covered or only JavaScript?",
      answer:
        "TypeScript is first-class throughout the course — every component, every hook, every test in TS from week 1. TypeScript is now expected on every Pune React JD, not optional, so we don't separate it into a later module.",
    },
    {
      question: "Do you cover Server Components and Next.js?",
      answer:
        "Yes — week 9 is a full module on Server Components and the Next.js App Router. Capstone Project #3 is a complete Next.js full-stack application. Server Components are now expected on most senior frontend interviews; we treat them as core, not advanced.",
    },
    {
      question: "Do you teach Redux?",
      answer:
        "We teach the modern alternative (TanStack Query + Zustand) as the default and explain when Redux still earns its place — typically when you are joining a team that already runs it. We do not centre the curriculum on Redux because Pune product engineering teams have largely moved off it for new code; teaching Redux as the primary tool produces graduates who write 2018-style React.",
    },
    {
      question: "Are weekend React classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~4 months instead of 2.5. Same content, same trainers, same projects. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "Can I switch from another framework (Angular / Vue / jQuery) to React via this course?",
      answer:
        "Yes — and we have a sizable cohort doing exactly this. Working developers transitioning into React typically slot in well; the JavaScript / TypeScript / TanStack Query / testing layers translate directly. We adjust capstone scope for cross-framework switchers to highlight your existing strengths.",
    },
    {
      question: "Does this course prepare me for React Native / mobile development?",
      answer:
        "Yes, indirectly — solid React 19 fluency is the prerequisite for React Native, and the hooks / state management / forms / styling skills transfer directly. We don't cover React Native APIs in this course (Animated, Navigation, native modules), but graduates can pick up React Native in 4–6 weeks of focused self-study.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for React / Frontend roles (live-coding + JS conceptual + behavioural rounds), referrals via our alumni network at 12+ partner companies, resume / LinkedIn / GitHub rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "Are the named trainers actually teaching, or are they just on the brochure?",
      answer:
        "Amol Chougule personally leads the React fundamentals, hooks, routing, styling, and Server Components weeks. Amol Patil leads the state management, server-state, testing, and capstone weeks. The same names you see on this page show up in your batch on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start React training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol Chougule and Amol Patil are happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see actual student deployed React apps, meet a current batch, and decide with full information.",
  },
};
