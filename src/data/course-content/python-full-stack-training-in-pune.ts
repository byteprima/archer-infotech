import type { CourseRichContent } from "./types";

export const pythonFullStackTrainingInPune: CourseRichContent = {
  intro:
    "Python Full Stack — Django / FastAPI on the backend, React or Next.js on the frontend — is the highest-velocity entry path into Pune product engineering and SaaS hiring in 2026. Pune SaaS companies (Amagi, Fyllo, Drip Capital Pune teams), AI / data-platform startups, plus the analytics-engineering arms of Tiger Analytics, Fractal, and ZS Associates ship most of their primary applications on this stack. Archer Infotech's Python Full Stack training in Pune teaches the stack as it is actually used in 2026 — Python 3.13, Django 5.x with full async, Django REST Framework (the dominant Pune choice for APIs) plus FastAPI for high-performance / AI-glue services, React 19 + TypeScript for the frontend, PostgreSQL + Redis + Celery + Docker for the production tail, and one cloud deployment story. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Python Full Stack in 2026",
    paragraphs: [
      "Python Full Stack is the most pragmatic skill stack for an Indian developer who wants to ship products end-to-end. Indeed Pune lists more than 1,400 active Python and Django / FastAPI roles as of May 2026 (counting backend-only and full-stack JDs combined); add another 1,300+ React openings that pair naturally and you are looking at the strongest combined hiring signal in Pune product engineering. The biggest employers are the Pune SaaS scene (Amagi, Fyllo, Drip Capital, Innovaccer Pune, Whatfix Pune), AI / data platforms (Tiger Analytics product engineering, Fractal product, MathCo product), Persistent Systems, BMW TechWorks India, Mastercard Pune Tech Hub, plus the Pune captive arms of Cummins, Mercedes-Benz, and John Deere ETC.",
      "What changed in 2026: Django 5.x is the production default and ships full async support (ORM, views, middleware), the new database-computed default values, GeneratedField for stored generated columns, and dramatic admin UI improvements. Django REST Framework remains the dominant API toolkit in Pune Django shops (despite competition from django-ninja and FastAPI) because of its ecosystem. FastAPI has matured into the default for AI-glue microservices and high-throughput APIs. The frontend pairing has settled — React 19 + TypeScript + TanStack Query is the dominant choice; Next.js where SSR matters. Celery 5.x with Redis remains the de-facto background-job stack. Docker + Postgres + Nginx is the production deployment baseline.",
      "What this means for hiring: 2026 Pune Python Full Stack JDs expect Python 3.11+, Django 5 with DRF (or FastAPI for newer teams), React + TypeScript on the frontend, PostgreSQL at a working level, Redis + Celery for async work, Docker fluency, and one production deployment story. Senior roles add observability (pino-equivalent — structured logging, OpenTelemetry, Sentry), microservices, and basic AWS / GCP cloud architecture. Archer Infotech's curriculum is rebuilt around exactly these expectations — modern stack, deployment-ready, AI-aware.",
    ],
    keyPoints: [
      "1,400+ active Python / Django / FastAPI roles on Indeed Pune (May 2026)",
      "Django 5 with full async + DRF — the dominant Pune product backend",
      "FastAPI for AI-glue services — second framework in the curriculum",
      "React 19 + TypeScript + TanStack Query — the modern frontend pairing",
      "Pune SaaS / AI-platform scene — strongest combined hiring signal",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student targeting Python Full Stack / Django Developer roles",
      "Working Python developer wanting to add a strong frontend layer for full-stack roles",
      "Working frontend developer (React / Angular / Vue) wanting to add Python backend for full-stack profile",
      "Career restarter targeting full-stack as a flexible, remote-friendly re-entry path",
      "Working professional in another stack (.NET, Java, PHP) wanting to switch into Pune SaaS / AI-platform hiring where Python dominates",
      "Domain expert (analytics, finance, biology, education) wanting to ship a Python product end-to-end",
    ],
    notForYou: [
      "If you have no programming background — take our Python course first; this assumes Python fluency from week 1",
      "If you cannot put in 10–12 hours per week of practice outside class — full-stack is the most lab-heavy of the major tracks",
      "If you only want a certificate sticker with no portfolio — Pune product engineering hiring screens hard on real PRs and deployed apps",
      "If your goal is specifically Pune captive R&D centres (Mercedes-Benz, Cummins, Honeywell) — those skew .NET / Java; pick .NET Full Stack or Java Full Stack",
      "If you have 4+ years of production Django + React experience — you'll be under-stretched; talk to us about advanced Django architecture / FastAPI microservices specialisations",
    ],
  },

  curriculum: [
    {
      title: "Python 3.13 Refresher & Modern Tooling",
      weekRange: "Week 1",
      description:
        "A targeted refresher rather than an introduction. Cover modern Python (f-strings, comprehensions, generators, type hints, dataclasses, walrus operator, match-case from 3.10), virtual environments with uv (the 2026 fast pip-replacement gaining adoption in Pune teams) or poetry, ruff for formatting + linting, mypy / pyright for type checking, and pytest as the universal default test runner. We assume basic Python fluency on day 1; this week levels the floor on the modern toolchain. By the end of week 1 every student has a clean development environment with uv, ruff, mypy, pytest, and Git all configured.",
      topics: [
        "Modern Python — type hints, dataclasses, match-case",
        "Virtual environments with uv / poetry",
        "ruff for formatting + linting",
        "mypy / pyright for type checking",
        "pytest essentials",
        "git + GitHub workflow for full-stack projects",
        "VS Code + Pylance setup",
      ],
    },
    {
      title: "Django 5 Foundations — Models, Views, Templates, Admin",
      weekRange: "Weeks 2–3",
      description:
        "Django from first principles, taught in the order that produces working applications fastest. Cover the project / app structure, Django ORM (models, fields, relationships, querysets, the discipline that prevents N+1 queries), database migrations, the URL dispatcher, function-based and class-based views, the Django template language, and the Django admin (which alone is a hiring differentiator — most institutes underuse it). Plus the discipline of Django settings management — environment variables, dotenv, settings split (base / dev / prod). By the end of week 3 every student has built a small CRM-style app with custom admin and full CRUD.",
      topics: [
        "Django project / app structure",
        "Models, fields, relationships, querysets",
        "Migrations — the right and wrong way",
        "URL dispatcher and views (FBV vs CBV)",
        "Django template language",
        "Django admin — the customisation that hiring panels notice",
        "Settings management with environment variables",
        "Static and media file handling",
      ],
    },
    {
      title: "Django REST Framework — APIs Done Right",
      weekRange: "Week 4",
      description:
        "DRF is still the dominant Pune Django API toolkit. Cover serializers (the heart of DRF), ModelViewSets and the default router, authentication (Session, Token, JWT via djangorestframework-simplejwt), permissions and the discipline of permission classes, throttling, filtering / search / ordering, pagination, plus OpenAPI / Swagger generation via drf-spectacular. We compare with django-ninja (the Pydantic-based DRF alternative gaining adoption) and FastAPI — and we honestly say when each is the right tool.",
      topics: [
        "Serializers — model, plain, nested, read/write split",
        "ModelViewSet, generic views, custom actions",
        "Authentication — Session, Token, JWT (simplejwt)",
        "Permissions and permission classes",
        "Throttling, filtering, search, ordering",
        "Pagination — page, limit/offset, cursor",
        "OpenAPI via drf-spectacular",
        "DRF vs django-ninja vs FastAPI — when each fits",
      ],
    },
    {
      title: "Async Django, FastAPI & Real-Time",
      weekRange: "Week 5",
      description:
        "The newer side of Python web. Django 5 async views and the async ORM, ASGI deployment, Django Channels for WebSocket. Then FastAPI as the standalone framework for high-performance APIs and AI-glue microservices — Pydantic v2, async endpoints, dependency injection, OpenAPI auto-generated. We build one async Django service and one FastAPI service so you internalise the ergonomic differences. Plus the production reality — when async earns its complexity (I/O-bound services with thousands of concurrent connections) and when sync Django is still the right tool.",
      topics: [
        "Django 5 async views and async ORM",
        "ASGI servers — uvicorn, daphne",
        "Django Channels for WebSocket",
        "FastAPI essentials — Pydantic v2, async, DI",
        "FastAPI vs Django — when each is right",
        "WebSocket patterns and Redis pub/sub for scaling",
        "Streaming responses (SSE) for AI / progress",
      ],
    },
    {
      title: "PostgreSQL Depth & SQL for Backend Engineers",
      weekRange: "Week 6",
      description:
        "Database depth that separates junior from mid-level Python engineers. Cover Postgres essentials at the level you will actually use — joins, transactions, indexes (B-tree / GIN / GiST / BRIN), EXPLAIN plans, materialised views, JSON / JSONB columns, full-text search, CTEs, window functions. Then the Django ORM mapping — raw SQL when you need it, F() and Q() expressions, select_related / prefetch_related (the #1 N+1 fix), aggregations, conditional updates. Plus connection pooling with pgbouncer (the production must-have most institutes skip).",
      topics: [
        "Postgres essentials — joins, transactions, indexes",
        "EXPLAIN plans and query optimisation",
        "JSONB columns for flexible data",
        "Full-text search with tsvector",
        "CTEs and window functions",
        "Django ORM — F(), Q(), aggregations, select_related / prefetch_related",
        "Connection pooling with pgbouncer",
        "Database migrations in production",
      ],
    },
    {
      title: "Authentication, Authorization & Security",
      weekRange: "Week 7",
      description:
        "The security baseline every production Python service needs. Cover Django's built-in auth (still the right default for most apps), JWT for SPA / mobile clients via simplejwt, social / OAuth login via django-allauth or python-social-auth (Google / GitHub / Azure AD), role-based and object-level permissions, rate limiting, and the security middleware stack (CSRF, XSS, SQL injection — Django defends most of these by default but you should understand how). Plus secrets management — django-environ, AWS Secrets Manager, Azure Key Vault — and the Pune-relevant compliance basics (PII handling, password storage, audit logging).",
      topics: [
        "Django built-in auth and the User model",
        "JWT auth with simplejwt for SPA / mobile",
        "OAuth / social login via django-allauth",
        "Role-based and object-level permissions",
        "Django security defaults — CSRF, XSS, SQLi",
        "Rate limiting with django-ratelimit / DRF throttling",
        "Secrets management",
        "Audit logging and PII discipline",
      ],
    },
    {
      title: "Background Jobs — Celery, Redis, and Async Workflows",
      weekRange: "Week 8",
      description:
        "The backbone of every production Python service. Celery 5.x with Redis (the dominant Pune choice) — task queues, scheduled tasks via celery-beat, retry / backoff, error handling, monitoring with Flower. Cover the patterns that matter — idempotency, dead-letter queues, task chunking for large datasets, result backends, plus the discipline of designing tasks that survive worker restarts. We cover the alternatives (RQ for simpler stacks, dramatiq, Huey) and when each fits, plus a small section on django-q2 for teams that don't want Celery's complexity.",
      topics: [
        "Celery 5.x essentials — workers, brokers, results",
        "Redis as Celery broker",
        "celery-beat for scheduled tasks",
        "Retry, backoff, dead-letter queues",
        "Idempotency and exactly-once-ish patterns",
        "Flower for monitoring",
        "Alternatives — RQ, dramatiq, django-q2",
      ],
    },
    {
      title: "Frontend — React 19 + TypeScript + TanStack Query",
      weekRange: "Weeks 9–10",
      description:
        "The frontend half of full-stack. React 19 essentials — components, props, state, hooks (useState, useEffect, useTransition, useOptimistic, useFormStatus), TypeScript-first throughout, Vite as the build tool, Tailwind for styling. Then the integration layer — TanStack Query for server state (the modern default), React Router 7 for routing, React Hook Form + Zod for forms, JWT interceptor pattern. We finish by wiring the React frontend to the Django + DRF API from week 4 — login, list / detail / create / update / delete, optimistic updates, error handling. (Optional Next.js path for students targeting SSR-heavy use cases.)",
      topics: [
        "React 19 — components, props, hooks",
        "TypeScript-first React",
        "Vite + Tailwind toolchain",
        "TanStack Query for server state",
        "React Router 7",
        "React Hook Form + Zod",
        "JWT interceptor and auth flow",
        "Optimistic updates and error handling",
        "(Optional) Next.js for SSR use cases",
      ],
    },
    {
      title: "Production — Docker, Deployment, Observability",
      weekRange: "Week 11",
      description:
        "The week that turns a notebook into a service Pune teams will deploy. Docker multi-stage builds for Python apps (Gunicorn / uvicorn, the right WSGI / ASGI choice, the static-files story), Docker Compose for local-dev stacks (Django + Postgres + Redis + Celery worker + Celery beat). Then deployment — Render and Fly.io for fast deploys, AWS Elastic Beanstalk for the AWS path, Railway for the simplest path, plus a brief on AKS / EKS for larger teams. Observability — structured logging with structlog, Sentry for error tracking, OpenTelemetry instrumentation, Prometheus metrics via django-prometheus.",
      topics: [
        "Docker multi-stage builds for Python",
        "Gunicorn vs uvicorn vs daphne",
        "Static and media file handling in production",
        "Docker Compose for local dev",
        "Deployment — Render, Fly.io, Railway, AWS",
        "structlog for structured logging",
        "Sentry for error tracking",
        "OpenTelemetry + Prometheus + Grafana",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Weeks 12–13 + 2 weeks placement prep",
      description:
        "Two weeks of full-time capstone work plus structured interview preparation. Pick one of three capstone projects (see Capstone Projects). Mock interviews calibrated for Pune Python full-stack hiring panels — Amagi, Fyllo, Drip Capital, Innovaccer Pune, Persistent product engineering, plus Pune analytics product teams. Includes a coding round (Django / DRF / SQL live), a design round (decompose a feature, choose between sync and async, structure DRF serializers), and a behavioural round. Resume / LinkedIn / GitHub polish included.",
      topics: [
        "Capstone implementation, deployment, README",
        "Code review with the lead trainer",
        "Live-coding mock — Django / DRF / SQL",
        "Design mock — feature decomposition, async vs sync",
        "Behavioural and product-thinking round",
        "Resume + LinkedIn rewrite for Python Full Stack JDs",
        "GitHub portfolio polish — deployed apps with CI badges",
        "HR mock interview and salary negotiation",
      ],
    },
  ],

  projects: [
    {
      title: "Production SaaS Application — Django + DRF + React + Postgres",
      description:
        "A complete production-grade SaaS application — pick a real domain (project management, expense management, classroom-attendance, time tracking, invoicing). Django 5 backend with DRF, custom admin, simplejwt auth, role-based permissions, Postgres with proper indexes. React 19 + TypeScript frontend with Tailwind, TanStack Query, React Hook Form + Zod, JWT interceptor. Celery + Redis for background jobs (email notifications, scheduled reports). Docker Compose for local dev, Sentry for errors, deployed to Render or Fly.io with GitHub Actions CI/CD. Outcome: a public GitHub repository plus a clickable demo URL — exactly what Pune SaaS hiring panels interview on.",
      technologies: [
        "Django 5.x + DRF",
        "Python 3.13 + simplejwt",
        "PostgreSQL + Redis + Celery",
        "React 19 + TypeScript + Vite",
        "Tailwind + TanStack Query + React Hook Form",
        "Docker Compose + Sentry",
        "Render / Fly.io + GitHub Actions",
      ],
    },
    {
      title: "FastAPI + LLM-Powered Microservice with Streamlit Dashboard",
      description:
        "An AI-glue microservice — FastAPI backend with Pydantic v2, JWT auth, Postgres + pgvector for embeddings, OpenAI / Anthropic API integration for a real use case (document Q&A, sales-prep assistant, customer-support summarisation), structured logging with structlog. Plus a Streamlit dashboard frontend (Python-native, fast iteration) for the demo. Deployed to AWS Lambda (Mangum) or Render. Demonstrates the patterns Pune SaaS / AI-platform teams hire on — modern Python + AI integration + observability.",
      technologies: [
        "FastAPI + Pydantic v2",
        "Python 3.13 + JWT",
        "PostgreSQL + pgvector",
        "OpenAI / Anthropic SDK",
        "structlog",
        "Streamlit dashboard",
        "AWS Lambda (Mangum) or Render",
      ],
    },
    {
      title: "Real-Time Collaboration App — Django Channels + React + WebSocket",
      description:
        "A real-time collaboration application — Django backend with Channels for WebSocket, Postgres + Redis, multi-user presence, optimistic comment threads, file uploads to S3 / Azure Blob, full-text search via Postgres tsvector. React 19 + TypeScript frontend with TanStack Query for REST and a WebSocket hook for live updates, optimistic UI, role-based access. Includes Sentry instrumentation and a small Grafana dashboard. Demonstrates the patterns Pune product-engineering teams hire on — real-time, observable, deployed.",
      technologies: [
        "Django 5 + Django Channels",
        "PostgreSQL + Redis pub/sub",
        "WebSocket with reconnection logic",
        "React 19 + TypeScript",
        "TanStack Query + Tailwind",
        "S3 / Azure Blob for files",
        "Sentry + Grafana",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Patil (Senior Corporate Trainer, 10+ years, lead for the Python / Data Science / Full Stack tracks at Archer Infotech). Amol ships Django and React for a living and personally leads every session of every batch from Day 1 through capstone — the name you see here is the name you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "Python Full Stack Developer is one of the highest-velocity entry roles in Pune product engineering and SaaS in 2026 — Indeed Pune lists 1,400+ active Python / Django / FastAPI openings, with continuous hiring at the Pune SaaS scene (Amagi, Fyllo, Drip Capital, Innovaccer Pune, Whatfix Pune), AI / data platforms (Tiger Analytics product engineering, Fractal product, MathCo product), Persistent Systems, BMW TechWorks India, Mastercard Pune Tech Hub, plus Pune captive R&D for Cummins / Mercedes-Benz / John Deere ETC product teams.",
      "What pulls a Python full-stack developer above the median band: depth on at least one Django ORM optimisation pattern (select_related, prefetch_related, sub-queries), one production-deployed full-stack app on GitHub, demonstrable Celery + Redis background-job pattern, React + TypeScript fluency, and one AI / LLM integration project (the 2026 differentiator). Our capstone projects are designed exactly around these signals.",
      "Senior Python Full Stack Developer and Tech Lead bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr.",
    ],
    salaryBands: [
      {
        role: "Python Developer (Pune)",
        band: "₹7,59,185 per year average",
        source: {
          label: "Indeed Pune (Python Developer, April 2026)",
          url: "https://in.indeed.com/career/python-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Django Developer (Pune)",
        band: "₹6,30,000 per year average",
        source: {
          label: "Indeed Pune (Django Developer)",
          url: "https://in.indeed.com/career/django-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Junior Python Full Stack Developer (Pune entry, <2 years)",
        band: "₹4,00,000 – ₹7,00,000 per year",
        source: {
          label: "AmbitionBox Pune Python Full Stack Developer",
          url: "https://www.ambitionbox.com/profile/python-full-stack-developer-salary-in-pune",
        },
      },
      {
        role: "Mid-level Python Full Stack Developer (Pune, 3–5 years)",
        band: "₹10,00,000 – ₹17,00,000 per year",
        source: {
          label: "Glassdoor Pune Python Full Stack Developer",
          url: "https://www.glassdoor.co.in/Salaries/pune-python-full-stack-developer-salary-SRCH_IL.0,4_IM1072_KO5,32.htm",
        },
      },
      {
        role: "Senior Python Full Stack Developer / Tech Lead (national, 5–8 years)",
        band: "₹18,00,000 – ₹32,00,000 per year",
        source: {
          label: "6figr India Senior Python Full Stack (Pune ±10%)",
          url: "https://6figr.com/in/salary/senior-python-full-stack-developer--t",
        },
      },
    ],
    hiringCompanies: [
      "Amagi",
      "Fyllo",
      "Drip Capital",
      "Innovaccer (Pune)",
      "Whatfix (Pune)",
      "Tiger Analytics",
      "Fractal Analytics",
      "MathCo",
      "Persistent Systems",
      "BMW TechWorks India",
      "Mastercard Pune Tech Hub",
      "Cummins India",
      "Mercedes-Benz R&D India",
      "John Deere ETC",
      "TCS",
      "Cognizant",
    ],
    rolesAfterCourse: [
      "Python Full Stack Developer",
      "Django Developer",
      "Python Backend Developer",
      "FastAPI Developer",
      "Full Stack Developer (Python + React)",
      "Junior AI Engineer (with self-study)",
      "Software Engineer (product / SaaS)",
    ],
  },

  modesAndDuration: {
    duration:
      "13 weeks of structured curriculum plus 2 weeks of capstone project and interview preparation (~3.5 months total). The original 5-month listing reflects an optional extended evening format with deeper React and AI-integration work; both formats cover the core stack.",
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
        "Stretches over ~6 months instead of 3.5 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch — small enough that the trainer reviews every student's PR personally. Classroom batches start every 6 weeks; weekend batches every 8 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote — we calibrate by early-bird timing, group enrolment, and returning-alumni concessions.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with full FastAPI / AI integration / Channels modules and extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 9 of the course, not at the end. By the time you finish the curriculum, your resume highlights real deployed Python full-stack applications, your GitHub has at least two production-style repositories, and you have completed at least three mock technical interviews against question banks from Pune Python full-stack hiring teams.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 9 — resume and LinkedIn rewrite, calibrated for Python Full Stack JDs",
      "Week 10 — GitHub portfolio cleanup, deployed demo URLs, CI badges",
      "Weeks 11–12 — Django / DRF / SQL drills, design mock rounds, behavioural prep",
      "Weeks 13–14 — three rounds of mock technical interviews",
      "Week 14 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies, with extra emphasis on Pune SaaS / AI-platform scene",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Amagi",
      "Fyllo",
      "Drip Capital",
      "Innovaccer (Pune)",
      "Tiger Analytics",
      "Fractal Analytics",
      "MathCo",
      "Persistent Systems",
      "BMW TechWorks India",
      "Mastercard Pune Tech Hub",
      "TCS",
      "Cognizant",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune Python Full Stack training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainer named on course page with photo and LinkedIn",
        archer: "Yes — Amol Patil",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Stack version covered",
        archer: "Python 3.13, Django 5.x async, DRF, React 19 + TS",
        typical: "Python 3.10, Django 4 sync-only, React 17 + JS",
      },
      {
        feature: "Frameworks covered",
        archer: "Django + DRF (primary) + FastAPI (AI / high-perf)",
        typical: "Django-only, often without DRF",
      },
      {
        feature: "Frontend coverage",
        archer: "React 19 + TypeScript + TanStack Query, real integration",
        typical: "Django templates only, or token React without TS",
      },
      {
        feature: "Background jobs",
        archer: "Celery + Redis + celery-beat — full week with patterns",
        typical: "Not covered or marketing mention",
      },
      {
        feature: "Database depth",
        archer: "Postgres EXPLAIN plans, JSONB, full-text search, pgbouncer",
        typical: "ORM-only, no SQL or performance work",
      },
      {
        feature: "AI / LLM integration project",
        archer: "Yes — capstone option uses OpenAI / Anthropic API + pgvector",
        typical: "Not covered or marketing mention",
      },
      {
        feature: "Testing in the curriculum",
        archer: "pytest + pytest-django + Playwright with real coverage",
        typical: "Theory-only or skipped entirely",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — deployed apps with CI badges",
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
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student deployed full-stack apps before you pay.",
  },

  versusAlternative: {
    heading: "Python Full Stack vs MERN Full Stack — Which Should You Pick in Pune?",
    paragraphs: [
      "Python Full Stack vs MERN Full Stack is the most-asked question for Pune product / SaaS-targeted students. The honest answer: both have ample Pune jobs at SaaS / fintech / product engineering, both pay similarly at equivalent experience, and the choice should be by where you start and what you want to build.",
      "Choose Python Full Stack if your goal is Pune AI / data-platform companies, analytics-engineering work, scientific-computing or data-heavy SaaS, or you already know Python and want to stay on it. The Pune AI / analytics scene (Tiger, Fractal, MathCo product teams) hires Python full-stack heavily; MERN candidates rarely make the shortlist. The bonus: Python opens AI Engineer / GenAI Engineer roles at the same time, since LLM glue work is overwhelmingly Python.",
      "Choose MERN Full Stack if your goal is Pune SaaS startups that ship in JavaScript end-to-end (Amagi, BharatPe Pune, Razorpay Pune ship significant Node.js work), real-time-heavy products (chat, collaboration, gaming), or you already know JavaScript / React and want backend on the same language. MERN graduates also stack naturally with React Native for mobile work.",
      "Honest recommendation: pick Python Full Stack if you have data / analytics / AI ambitions or already know Python. Pick MERN if you want all-JavaScript single-language full-stack or are aiming at startups specifically. Many of our students learn the second stack as a side skill once placed; senior full-stack engineers often work across both at the design level.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: Python fluency at the level of being able to write a 200-line script without lookup, basic understanding of HTML / CSS / JavaScript, basic SQL, and willingness to commit 10–12 hours per week of practice outside class. We expect Python fluency on day 1; week 1 levels up the modern Python toolchain. If you have done our Python or Data Science course (or equivalent self-study), you are ready. Pure non-developers should do a Python course first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal (we say no to roughly 10% of enquirers)",
      "Confirm enrolment and complete pre-course orientation (Python 3.13, Node 22, Postgres install scripts; GitHub account)",
      "Show up to day one with a laptop running 64-bit OS, 16GB RAM (recommended), and Python 3.13 + Node 22 LTS pre-installed (we provide an install script)",
    ],
  },

  faqs: [
    {
      question: "Which is the best Python Full Stack training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves. The test that works: ask any institute you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student GitHub repositories with deployed full-stack apps and CI badges, and (3) name companies that hired their last 5 batches. Compare on those three.",
    },
    {
      question: "How long does Python Full Stack training in Pune take at Archer Infotech?",
      answer:
        "Approximately 3.5 months — 13 weeks of structured curriculum plus 2 weeks of capstone project and interview preparation. The original 5-month listing reflects an optional extended evening format. The weekend batch stretches over ~6 months at the same content depth, designed for working professionals.",
    },
    {
      question: "What is the salary of a Python Full Stack Developer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹7.59 lakh per year for Python Developer (April 2026) and ₹6.30 lakh for Django Developer. Junior Python Full Stack Developer Pune entry sits at ₹4–7 lakh per year per AmbitionBox. Mid-level (3–5 years) earns ₹10–17 lakh per Glassdoor. Senior Python Full Stack Developers / Tech Leads (5–8 years) earn ₹18–32 lakh nationally with Pune trending within ±10%.",
    },
    {
      question: "What is the fee for the Python Full Stack course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and applicable concession. The higher end covers placement-track classroom batches with full FastAPI / AI integration / Channels modules and extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    },
    {
      question: "Do I need Python before joining the course?",
      answer:
        "Yes — Python fluency is required from week 1. If you have done our Python or Data Science course (or equivalent), you are ready. We do not turn this course into a Python primer; that would short-change the full-stack content.",
    },
    {
      question: "Django or FastAPI — which does the course focus on?",
      answer:
        "Both. Django + DRF as the primary backend (the dominant Pune Python product backend) is taught deeply across weeks 2–4, then FastAPI as the second framework for AI-glue and high-performance services in week 5. Capstone Project #1 uses Django + DRF; Project #2 uses FastAPI. Pune teams use both; we cover both.",
    },
    {
      question: "Python Full Stack or MERN — which should I pick in Pune?",
      answer:
        "Python Full Stack if your goal is Pune AI / data-platform companies, analytics engineering, or you already know Python (bonus: opens AI Engineer roles). MERN if your goal is all-JavaScript single-language full-stack, real-time-heavy products, or React Native mobile work down the road. Both have ample Pune jobs at equivalent compensation.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) production SaaS application with Django + DRF + React + Postgres + Celery, (2) FastAPI + LLM-powered microservice with pgvector and Streamlit dashboard, (3) real-time collaboration app with Django Channels + WebSocket + React. All three become public GitHub repositories with passing CI badges and clickable demo URLs.",
    },
    {
      question: "Is React covered or only Django templates?",
      answer:
        "React 19 + TypeScript is covered deeply across weeks 9–10 — components, hooks, Vite, Tailwind, TanStack Query, React Hook Form + Zod, JWT integration with the Django + DRF API. Django templates are covered briefly in week 2–3 for the admin and server-rendered pages, but React is the primary frontend. The 2026 Pune full-stack market expects a SPA frontend, not Django-templates-only.",
    },
    {
      question: "Is AI / LLM integration covered?",
      answer:
        "Yes — week 5 includes FastAPI + AI-glue patterns, and Capstone Project #2 is a complete LLM-powered microservice with OpenAI / Anthropic API integration, pgvector for embeddings, and a Streamlit dashboard. AI integration on the Python backend is the 2026 differentiator on Pune Python full-stack resumes.",
    },
    {
      question: "Are weekend Python Full Stack classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~6 months instead of 3.5. Same content, same trainer, same projects. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "Can I switch from another stack (.NET, Java, PHP) to Python Full Stack via this course?",
      answer:
        "Yes — and we have a sizable cohort doing exactly this. Working developers transitioning from another backend stack typically slot in well after they get Python fluency in place; the database / auth / observability / Docker layers translate directly. We adjust capstone scope for cross-stack switchers to highlight your existing strengths.",
    },
    {
      question: "Does this course pair well with the Data Science course?",
      answer:
        "Yes — Python Full Stack and Data Science share the Python and Postgres foundations. Many of our Data Science students take this course 6–12 months later to add the full-stack production-engineering layer, and many Python Full Stack students take the Data Science course as a depth specialisation. Combined, the two cover the full Pune AI Engineer / Applied AI Engineer profile.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for Python Full Stack roles (live-coding + Django / DRF / SQL conceptual + design rounds), referrals via our alumni network at 12+ partner companies (with extra emphasis on Pune SaaS / AI-platform scene), resume / LinkedIn / GitHub rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "Is the named trainer actually teaching, or are they just on the brochure?",
      answer:
        "Amol Patil personally leads every session of every batch from Day 1 through capstone — he ships Django and React for a living and brings real production patterns into the classroom. The same name on this page is the same person you meet on day one; his LinkedIn is on the trainer profile page, and we welcome a 30-minute conversation with him before you enrol.",
    },
  ],

  finalCta: {
    heading: "Ready to start Python Full Stack training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 6–8 weeks. Reach out via the enquiry form or call us — Amol is happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see actual student deployed Python full-stack apps, meet a current batch, and decide with full information.",
  },
};
