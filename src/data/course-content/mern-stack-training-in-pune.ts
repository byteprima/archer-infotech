import type { CourseRichContent } from "./types";

export const mernStackTrainingInPune: CourseRichContent = {
  intro:
    "MERN Stack — MongoDB, Express, React, Node.js — is the fastest path to a deployed full-stack web application using a single language end-to-end (JavaScript or TypeScript). Pune product startups, SaaS teams, and edtech / fintech companies actively hire MERN developers; Naukri, Cutshort, and Indeed Pune list 100–200 active MERN-specific roles in 2026 across Raja Software Labs, FindingPi, Scry Analytics, nCircle Tech, IAMOPS, Cognizant Sogeti, Mphasis, Emerson, and Eaton's digital teams. Archer Infotech's MERN Stack training in Pune teaches the stack as it is actually used in 2026 — Node.js 24 LTS with native TypeScript support, Express 5 (with NestJS introduced as the senior-track alternative), React 19 with Server Components and Actions, MongoDB 8 with Atlas Vector Search, all glued with JWT auth and deployed via Docker. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn MERN Stack in 2026",
    paragraphs: [
      "MERN is the speed stack. Single language top-to-bottom (JavaScript / TypeScript), unified npm ecosystem, modern tooling — you can ship a deployed full-stack project in 8–10 weeks of disciplined work, where Java Full Stack typically needs 16+ weeks. That speed advantage matters for two audiences: career switchers who need a portfolio fast, and product startups who hire on shipped work, not on years of experience. Pune's product engineering, SaaS, fintech (CRED, Niyo, Jupiter offshoots), and edtech teams (BYJU's Pune offshoot and similar) all hire MERN developers in 2026.",
      "What changed in 2026: Node.js 24 LTS (Krypton, October 2025) is now the recommended baseline for greenfield work — npm v11 makes installs 65% faster, and native TypeScript type-stripping graduated to stable, so you can run TS files directly in Node 24 without a build step. React 19 shipped Server Components, Actions, the new `use()` hook, and form-action improvements; Next.js 15 with App Router is the dominant frontend wrapper. MongoDB 8 made queryable encryption stable and improved time-series performance. Express 5 (released late 2024) is still the dominant Node web framework in Pune JDs, with Fastify gaining ground in performance-critical product roles and NestJS appearing in ~25% of senior MERN postings.",
      "What this means for hiring: 2026 Pune MERN job descriptions explicitly call out Node 22+ (often 24), React 19 with Server Components, TypeScript, MongoDB Atlas, Docker, and increasingly LLM API integration. Archer Infotech's curriculum is rebuilt around this 2026 reality — TypeScript-first, Server Components from week one of the React module, and a real LLM-integrated capstone option.",
    ],
    keyPoints: [
      "Node.js 24 LTS with native TypeScript and 65%-faster npm",
      "React 19 — Server Components, Actions, `use()` hook",
      "Next.js 15 App Router as the production frontend wrapper",
      "MongoDB 8 with Atlas Vector Search for AI-adjacent features",
      "Express 5 default, NestJS introduced for senior-track readers",
      "Pune market — 100–200 active MERN-specific Pune roles in 2026",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, BSc-CS, or BCA student wanting to ship a full-stack project fast",
      "Career switcher with 2–3 months runway who needs a working portfolio for Pune product hiring",
      "Working professional in a non-JS stack wanting to move to product / SaaS roles",
      "Designer, content creator, or product person who wants to build their own ideas end-to-end",
      "Final-year student preparing for product startup placements in Pune (Raja Software Labs, FindingPi, Scry Analytics, fintech)",
    ],
    notForYou: [
      "If you refuse to write JavaScript or TypeScript — MERN is JS top to bottom",
      "If you target Cognizant / Infosys / TCS Pune mass-hire pipelines — they prefer Java Full Stack",
      "If your goal is data, ML, or AI engineering — Python is the right stack, not MERN",
      "If you want a deeply-OOP, statically-typed enterprise codebase feel — Java is your stack",
      "If you cannot tolerate a fast-moving ecosystem — React, Node, and npm churn yearly",
    ],
  },

  curriculum: [
    {
      title: "JavaScript & TypeScript Foundations",
      weekRange: "Weeks 1–2",
      description:
        "Modern JavaScript (ES2024+) — let / const, arrow functions, destructuring, spread / rest, template literals, async / await, modules. Then TypeScript — types, interfaces, generics, narrowing, utility types — because Pune 2026 MERN JDs increasingly say 'TypeScript' explicitly. Set up Node 24 with native TypeScript support so you can run `.ts` files directly without a build step. By end of module you write TS comfortably and read existing JS codebases without flinching.",
      topics: [
        "ES2024+ syntax — destructuring, spread, optional chaining",
        "async / await and Promises",
        "ES modules (import / export)",
        "TypeScript basics — types, interfaces, generics",
        "Narrowing, type guards, utility types",
        "Node 24 native TypeScript support",
        "tsconfig.json essentials",
      ],
    },
    {
      title: "Node.js 24 & Backend Fundamentals",
      weekRange: "Week 3",
      description:
        "How Node actually works — event loop, libuv, async I/O, streams, buffers — at a useful level (no kernel-level rabbit holes). Build a small HTTP server from scratch using the `http` module before introducing Express, so you appreciate what Express is doing. Cover environment variables, dotenv, package.json scripts, and the npm vs pnpm vs yarn choice (we recommend pnpm for new projects).",
      topics: [
        "Node event loop and async I/O",
        "Streams and buffers (just enough)",
        "HTTP module from scratch",
        "package.json, npm scripts, dotenv",
        "pnpm vs npm vs yarn",
        "Native fetch in Node 24",
      ],
    },
    {
      title: "Express 5 — REST APIs",
      weekRange: "Weeks 4–5",
      description:
        "Express 5 — middleware, routing, error handling (much improved in v5), request validation with Zod or Joi, structured logging with Pino, and JWT-based authentication. Build a real REST API with full CRUD against MongoDB. Cover the basics of testing with Vitest or Jest. Includes a brief introduction to NestJS for students considering senior product-engineering tracks.",
      topics: [
        "Express 5 middleware and routing",
        "Error handling (Express 5 async error propagation)",
        "Request validation with Zod or Joi",
        "Structured logging with Pino",
        "JWT auth with jsonwebtoken",
        "Testing with Vitest / Jest",
        "Brief NestJS introduction (controllers, providers, modules)",
      ],
    },
    {
      title: "MongoDB 8 — Database & ODM",
      weekRange: "Week 6",
      description:
        "MongoDB schema design, indexing, aggregation pipelines, and the ODM choice (Mongoose vs Prisma — we cover both with honest trade-offs). Includes the patterns Pune SaaS teams actually use — embedded vs referenced documents, two-phase commits in single-document transactions, and the Atlas-specific features (Vector Search, Search Index) that keep showing up in 2026 MERN + AI JDs. Cover Postgres briefly as a pragmatic alternative since some Pune product teams use Postgres with Prisma instead of MongoDB.",
      topics: [
        "MongoDB schema design — embedded vs referenced",
        "Indexes, query optimisation",
        "Aggregation pipelines",
        "Mongoose vs Prisma",
        "Atlas Vector Search basics",
        "Brief Postgres + Prisma alternative",
      ],
    },
    {
      title: "React 19 + Next.js 15",
      weekRange: "Weeks 7–9",
      description:
        "Modern React — function components and Hooks (`useState`, `useEffect`, `useReducer`, `useContext`, `useMemo`, `useCallback`), the new `use()` hook, Suspense, Error Boundaries. Server Components and the App Router — the model Pune 2026 product hiring expects. Forms with Actions, server actions for write operations, and Tailwind CSS for styling. State management with Zustand (recommended for new code) or Redux Toolkit (for heritage codebases).",
      topics: [
        "React 19 — function components and Hooks",
        "use() hook, Suspense, Error Boundaries",
        "Next.js 15 App Router — server vs client components",
        "Server Actions for write operations",
        "Forms with Actions",
        "State management — Zustand or Redux Toolkit",
        "Tailwind CSS",
        "REST integration with TanStack Query",
      ],
    },
    {
      title: "Full Stack Integration & Real-time Features",
      weekRange: "Week 10",
      description:
        "Connect the pieces — frontend ↔ backend with REST and TanStack Query for caching, JWT carried through, real-time updates via WebSocket or Server-Sent Events. Cover file upload to S3-compatible storage, image optimisation with Next/Image, and the deployment topology (Vercel for the frontend, Render or AWS for the backend). Includes a mini-project end-to-end before the capstone.",
      topics: [
        "REST integration with TanStack Query",
        "JWT auth flow front-to-back",
        "WebSocket and Server-Sent Events",
        "File upload to S3-compatible storage",
        "Next.js Image optimisation",
        "Deployment topology — Vercel + Render / AWS",
      ],
    },
    {
      title: "DevOps, Docker & Production Practices",
      weekRange: "Week 11",
      description:
        "Containerise your Express + Node service with Docker, a multi-stage build for size optimisation, and Docker Compose for local Mongo + backend + frontend. CI/CD via GitHub Actions, environment promotion (dev → staging → prod), structured logging that ships to a free-tier observability service. Cover the OWASP top-10 for Node specifically — JWT signing-key handling, npm audit, supply-chain attacks (recent npm supply-chain incidents are an interview topic in Pune product roles).",
      topics: [
        "Docker multi-stage build",
        "Docker Compose for local dev",
        "GitHub Actions CI/CD",
        "Environment promotion — dev / staging / prod",
        "OWASP top-10 for Node",
        "npm audit and supply-chain hygiene",
      ],
    },
    {
      title: "AI Integration (Bonus) + Capstone & Interview Prep",
      weekRange: "Week 12 + 2 weeks placement prep",
      description:
        "Add an LLM-integrated feature to your capstone — for example, a 'summarise this thread' button that calls OpenAI or Anthropic, or a vector-search feature using MongoDB Atlas Vector Search. Two weeks of capstone work plus mock interviews with Pune company question banks (Raja Software Labs, FindingPi, Scry Analytics, Cognizant, Mphasis). DSA refresher, resume + LinkedIn polish, GitHub cleanup, HR mock interviews.",
      topics: [
        "OpenAI / Anthropic SDK in Node",
        "MongoDB Atlas Vector Search",
        "Capstone — full implementation, deployment, README",
        "Code review with the lead trainer",
        "Technical mock interviews — 3 rounds",
        "DSA quick refresher",
        "Resume + LinkedIn rewrite",
        "GitHub portfolio polish",
      ],
    },
  ],

  projects: [
    {
      title: "Real-Time Collaborative SaaS Application",
      description:
        "Build a multi-user real-time application — Express 5 + MongoDB 8 backend with JWT auth, WebSocket for real-time updates, React 19 + Next.js 15 frontend with Server Components and Actions, Tailwind for styling, deployed Vercel (frontend) + Render or AWS (backend). Pick a real domain — collaborative whiteboard, real-time chat, live polling app, project management tool. Includes file upload, optimistic updates, and offline-first considerations.",
      technologies: [
        "Node.js 24 + TypeScript",
        "Express 5",
        "MongoDB 8",
        "React 19 + Next.js 15",
        "WebSocket",
        "JWT auth",
        "Tailwind CSS",
        "Vercel + Render",
      ],
    },
    {
      title: "AI-Powered MERN Application",
      description:
        "MERN application with an LLM-integrated feature — a document Q&A app, a meeting-notes summariser, a content-generation tool, or a search-with-AI experience. Uses MongoDB Atlas Vector Search for embeddings, OpenAI or Anthropic API for generation, Server Components for SEO-friendly rendering. The combination Pune AI-adjacent product startups want to see in 2026.",
      technologies: [
        "Node.js 24 + TypeScript",
        "Express 5",
        "MongoDB Atlas + Vector Search",
        "React 19 + Next.js 15",
        "OpenAI / Anthropic SDK",
        "Tailwind CSS",
      ],
    },
    {
      title: "E-commerce Platform with Stripe / Razorpay",
      description:
        "Full-feature e-commerce backend with cart, checkout, payment integration (Razorpay for India, Stripe for international), order management, and an admin dashboard. React 19 + Next.js 15 storefront with Server Components for SEO, MongoDB for catalogue and orders. Deployed end-to-end. The classic capstone that demonstrates breadth — payments, transactions, user roles, file uploads, and search.",
      technologies: [
        "Node.js 24 + TypeScript",
        "Express 5",
        "MongoDB 8",
        "React 19 + Next.js 15",
        "Razorpay / Stripe",
        "JWT auth + role-based access",
        "Vercel + Render",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Patil (Senior Corporate Trainer, 10+ yrs full-stack and Node) and Amol Chougule (Technical Trainer specialising in modern web and mobile, 5+ yrs ex-Mindstix). Both write production JavaScript / TypeScript every day across product engineering work and personally lead the React, Node, and capstone weeks.",

  careerOutcomes: {
    paragraphs: [
      "MERN Stack hiring in Pune is concentrated in product engineering, SaaS, fintech, and edtech — sectors that hire on shipped work over years of experience. Salary depends heavily on portfolio quality and TypeScript fluency.",
      "Pune-specific Indeed page for 'MERN Stack Developer' does not exist; the role is hired under 'Full Stack Developer' (Pune average ₹10.61 lakh per year, n=35, January 2026). AmbitionBox Pune lists ₹4.2 lakh average for MERN developers (range ₹1.2L–₹8L) which captures the entry-level skew. 6figr 2026 reports senior MERN (10–20 yrs) at ₹18 lakh average.",
      "What pulls a MERN developer above the average band: a public GitHub portfolio with at least one deployed Next.js project, demonstrable TypeScript fluency, and one production-shaped feature (real-time, payment integration, or AI). Our capstone projects are designed exactly around these signals.",
    ],
    salaryBands: [
      {
        role: "Junior MERN / 0–2 yrs (Pune-aligned)",
        band: "₹3,20,000 – ₹5,80,000 per year",
        source: {
          label: "Internshala India + 6figr 2026 (national fresher band, Pune midpoint similar)",
          url: "https://6figr.com/in/salary/mern-stack--s",
        },
      },
      {
        role: "MERN Stack Developer Pune (overall)",
        band: "₹4,20,000 per year average (range ₹1.2L–₹8L)",
        source: {
          label: "AmbitionBox Pune aggregation (March 2026)",
          url: "https://6figr.com/in/salary/mern-stack--s",
        },
      },
      {
        role: "Full Stack Developer overall — Pune (Indeed proxy)",
        band: "₹10,61,661 per year",
        source: {
          label: "Indeed Pune Full Stack (January 2026, n=35)",
          url: "https://in.indeed.com/career/full-stack-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Mid MERN — 4–9 years (national)",
        band: "₹13,20,000 per year average",
        source: {
          label: "6figr / scholarhat 2026",
          url: "https://6figr.com/in/salary/mern-stack--s",
        },
      },
      {
        role: "Senior MERN — 10–20 years (national)",
        band: "₹18,00,000 per year average",
        source: {
          label: "6figr 2026",
          url: "https://6figr.com/in/salary/mern-stack--s",
        },
      },
    ],
    hiringCompanies: [
      "Raja Software Labs",
      "FindingPi",
      "Scry Analytics",
      "nCircle Tech",
      "IAMOPS",
      "Cognizant Sogeti",
      "Mphasis Pune",
      "Capgemini Pune",
      "Emerson Pune",
      "Eaton",
      "BYJU's (Pune)",
      "CRED (engineering)",
      "Niyo",
      "Jupiter",
      "Tekit Solutions",
      "Bharti Share Market",
    ],
    rolesAfterCourse: [
      "MERN Stack Developer",
      "Full Stack Developer (JavaScript / TypeScript)",
      "Frontend Developer (React + Next.js)",
      "Node.js Backend Developer",
      "Junior Software Engineer at product startups",
      "Software Engineer at SaaS / fintech / edtech",
    ],
  },

  modesAndDuration: {
    duration:
      "3.5 months of structured curriculum (14 weeks, JavaScript through DevOps) plus 2 weeks of capstone and interview preparation",
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
      tools: ["Zoom for live sessions", "GitHub for code reviews", "Slack / WhatsApp for asynchronous Q&A"],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over 5–6 months instead of 3.5 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with extended interview prep and the AI-integration module; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 10 of the course, not at the end. By the time you finish the curriculum, your resume is ready, your GitHub is presentable, and you have completed at least three mock technical interviews against question banks from Pune product, SaaS, and IT-services companies.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 10 — resume and LinkedIn rewrite, with feedback from a trainer who has hired",
      "Week 11 — GitHub portfolio cleanup, public READMEs, deployment links",
      "Week 12 — DSA quick refresher targeting screening patterns at Pune product companies",
      "Weeks 13–14 — three rounds of mock technical interviews",
      "Week 14 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at partner companies",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Raja Software Labs",
      "FindingPi",
      "Scry Analytics",
      "Cognizant",
      "Mphasis Pune",
      "Capgemini Pune",
      "Persistent Systems",
      "Emerson Pune",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune MERN training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Amol Patil and Amol Chougule",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Node.js version covered",
        archer: "Node.js 24 LTS with native TypeScript support",
        typical: "Often Node 18 or generic 'latest Node'",
      },
      {
        feature: "React version covered",
        archer: "React 19 — Server Components, Actions, use() hook",
        typical: "React 18 or 'modern React' generic",
      },
      {
        feature: "TypeScript-first",
        archer: "Yes — TS from week 2 onwards",
        typical: "JavaScript only or TypeScript as add-on",
      },
      {
        feature: "MongoDB version + Atlas features",
        archer: "MongoDB 8 with Atlas Vector Search",
        typical: "Generic MongoDB chapter",
      },
      {
        feature: "AI / LLM integration module",
        archer: "Included — OpenAI / Anthropic + Atlas Vector Search",
        typical: "Not covered or marketing-only mention",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — public repository per student",
        typical: "Rare",
      },
      {
        feature: "Salary data with sources",
        archer: "Cited from Indeed Pune + AmbitionBox + 6figr with URLs",
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
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student work and named trainers before you pay.",
  },

  versusAlternative: {
    heading: "MERN Stack vs Java Full Stack — Which Fits Your Goal",
    paragraphs: [
      "Speed answer: MERN is the fastest path from 'I know nothing' to a deployed full-stack project — single language (TypeScript) end-to-end, npm ecosystem, React 19 + Node 24 means modern resume in weeks, not months.",
      "Ceiling answer: Pune product startups pay MERN seniors ₹15–25 lakh, comparable to Java seniors. But MERN openings in Pune are roughly one-third to one-quarter of Java openings — banks, IT-services majors, and Fortune-500 backends in Pune are still Java-first.",
      "Honest answer: if you want maximum job count and a stable, predictable hiring funnel (Cognizant, TCS, Synechron, Bajaj Finserv), pick Java Full Stack. If you want to ship fast, build a portfolio, and target product startup / SaaS / fintech culture, pick MERN. If undecided after both, default to Java in Pune — the volume bias is real. Many of our students do one stack first, get placed, then add the other as a side study.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites are minimal — basic computer use, logical thinking, and willingness to commit 8–10 hours per week of practice outside class. No prior programming experience required; we start from `console.log('Hello, world!')` on day one. If you already know JavaScript or have done a 12th-standard CS course, you will move slightly faster but won't be ahead of where the course expects.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call with the lead trainer",
      "Confirm enrolment and complete pre-course orientation",
      "Show up to day one with a laptop running 64-bit OS — Node and IDE setup is part of session 1",
    ],
  },

  faqs: [
    {
      question: "What is the MERN Stack developer salary in Pune?",
      answer:
        "Indeed Pune's Full Stack Developer page (Jan 2026, n=35) reports ₹10.61 lakh per year average. AmbitionBox Pune lists MERN developer average at ₹4.2 lakh (range ₹1.2L–₹8L) which captures the entry-level skew. Senior MERN (10–20 yrs) averages ₹18 lakh nationally per 6figr 2026.",
    },
    {
      question: "How long does the MERN stack course take?",
      answer:
        "Three and a half months — 14 weeks of structured curriculum (JavaScript through DevOps and AI integration) plus 2 weeks of capstone and interview preparation. Weekend batches stretch over 5–6 months at the same content depth, designed for working professionals.",
    },
    {
      question: "Is MERN stack still in demand in 2026?",
      answer:
        "Yes — particularly in Pune product engineering, SaaS, fintech, and edtech. Naukri and Indeed Pune list 100–200 active MERN-specific roles. The 2026 trend is MERN + TypeScript + AI-integration, which is what our curriculum teaches.",
    },
    {
      question: "Do I need to know JavaScript before joining MERN?",
      answer:
        "No — we start with two weeks of modern JavaScript and TypeScript foundations before introducing Node and Express. If you already know JS, those weeks let you go deeper on TypeScript and modern ES2024+ features.",
    },
    {
      question: "MERN vs MEAN — which is better in Pune?",
      answer:
        "MERN (with React) has more Pune product-startup demand than MEAN (with Angular) in 2026. MEAN is mostly seen in IT-services tracks where Angular is preferred. We teach MERN by default; if your target employer mandates Angular, take our Java Full Stack with the Angular track instead.",
    },
    {
      question: "Can a fresher get a MERN job in Pune?",
      answer:
        "Yes — Pune product startups (Raja Software Labs, FindingPi, Scry Analytics, nCircle Tech, IAMOPS) actively hire MERN freshers, and IT-services like Cognizant Sogeti and Mphasis run MERN-specific tracks. Junior Pune MERN entry typically starts ₹3.2L–₹5.8L per year.",
    },
    {
      question: "Which is better, MERN or Java Full Stack, for jobs in Pune?",
      answer:
        "Java Full Stack has roughly 3–4× the open-role count of MERN in Pune — better for IT-services, banking, and Fortune-500 backend hiring. MERN is faster to ship and better for product startups, SaaS, and fintech. Default to Java if undecided; volume bias is real.",
    },
    {
      question: "What is the fee of MERN training in Pune at Archer Infotech?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. The higher end covers placement-track classroom batches with extended interview prep and the AI-integration module; the lower end covers concession-eligible online or weekend formats.",
    },
    {
      question: "Is the AI/LLM module included or extra?",
      answer:
        "Included in every batch. You add an LLM-integrated feature to your capstone — for example, summarisation via OpenAI / Anthropic, or vector search via MongoDB Atlas. This is what separates 2026 Pune MERN hiring from 2022 Pune MERN hiring.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects to choose from: (1) real-time collaborative SaaS, (2) AI-powered MERN application, (3) e-commerce platform with Razorpay / Stripe. All three become public GitHub repositories with deployed URLs you reference in interviews.",
    },
    {
      question: "Do you cover Express only, or NestJS too?",
      answer:
        "Express 5 is the default and covered in depth. NestJS is introduced briefly for students considering senior product-engineering tracks where ~25% of Pune JDs now mention it. We cover NestJS basics — controllers, providers, modules — without forcing you to switch from Express.",
    },
    {
      question: "Are weekend MERN classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over 5–6 months instead of 3.5. Same content, same trainers, same projects. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews, referrals via our alumni network, resume and LinkedIn rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "Why TypeScript-first instead of plain JavaScript?",
      answer:
        "Pune 2026 MERN job descriptions increasingly say 'TypeScript' explicitly. Node 24 ships with native TypeScript type-stripping, so you can run TS files directly without a build step. Starting in TS from week 2 means you graduate with the right habit for production codebases.",
    },
    {
      question: "Are the named trainers actually teaching, or just on the brochure?",
      answer:
        "Amol Patil personally leads Node, Express, and the capstone weeks. Amol Chougule personally leads JavaScript / TypeScript foundations, React 19, and the frontend integration weeks. The same names you see on this page are the same people you meet on day one of your batch.",
    },
  ],

  finalCta: {
    heading: "Ready to start MERN Stack training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol Patil or Amol Chougule are happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see the classroom, and decide with full information.",
  },
};
