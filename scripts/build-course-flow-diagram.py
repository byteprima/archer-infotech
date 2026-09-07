#!/usr/bin/env python3
"""
Render a per-course workflow diagram for the Data & AI course pages.

The four courses previously shared one learning-path image. That image shows
where a course sits *relative to the others*, which is the right picture for
the category page but says nothing about what the course itself does. These
diagrams show each course's own pipeline, so the illustration on a page is
about that page.

Styled to match the supplied Data & AI learning-path diagram — dark navy
ground, neon-outlined rounded stages, arrows between them — so the five read
as one family.

The diagram is a summary, never the source of truth: every word inside it is
invisible to crawlers and AI engines, so the module list on the page must
carry the same information as text.

Usage
-----
    python3 scripts/build-course-flow-diagram.py
"""

from PIL import Image, ImageDraw, ImageFont

W = 1400
TOP_BLOCK, BOX_H, GAP, BOTTOM_BLOCK = 168, 62, 20, 96
BG_TOP = (13, 26, 43)
BG_BOT = (8, 17, 31)
INK = (238, 244, 252)
MUTED = (150, 170, 196)

BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
REG = "/System/Library/Fonts/Supplemental/Arial.ttf"

# Each course: filename stem, title, and its own pipeline stages with the
# accent colour used for that stage's outline and glow.
COURSES = {
    "data-analytics-workflow": {
        "title": "How a Data Analyst Works",
        "sub": "The Data Analytics workflow taught at Archer Infotech, Pune",
        "stages": [
            ("Raw Data", "Excel, SQL, CSV, APIs", (56, 189, 248)),
            ("Clean & Prepare", "Missing values, duplicates, types", (45, 212, 191)),
            ("Analyse", "Pandas, SQL, statistics, EDA", (52, 211, 153)),
            ("Visualise", "Power BI, DAX, Matplotlib", (250, 204, 21)),
            ("Insight & Decision", "KPIs, dashboards, storytelling", (248, 113, 113)),
        ],
    },
    "data-engineering-workflow": {
        "title": "How a Data Engineer Works",
        "sub": "The Data Engineering pipeline taught at Archer Infotech, Pune",
        "stages": [
            ("Sources", "Databases, APIs, logs, events", (56, 189, 248)),
            ("Ingest", "Batch + streaming, Kafka, CDC", (129, 140, 248)),
            ("Store", "Data lake, warehouse, lakehouse", (168, 85, 247)),
            ("Transform", "Spark, PySpark, dbt, ETL/ELT", (45, 212, 191)),
            ("Orchestrate", "Airflow, quality, observability", (250, 204, 21)),
            ("Serve", "Analytics, BI and ML consumers", (52, 211, 153)),
        ],
    },
    "data-science-workflow": {
        "title": "How a Data Scientist Works",
        "sub": "The Data Science workflow taught at Archer Infotech, Pune",
        "stages": [
            ("Problem", "Frame the business question", (56, 189, 248)),
            ("Explore", "EDA, statistics, hypotheses", (129, 140, 248)),
            ("Engineer Features", "Encoding, scaling, selection", (168, 85, 247)),
            ("Model", "Regression, classification, ensembles", (250, 204, 21)),
            ("Evaluate", "Validation, metrics, explainability", (248, 113, 113)),
            ("Deploy & Communicate", "APIs, dashboards, findings", (52, 211, 153)),
        ],
    },
    # The three full-stack tracks that had no learning-path diagram. Java and
    # .NET already carry their own roadmap artwork, so they are not here.
    "python-full-stack-path": {
        "title": "The Python Full Stack Learning Path",
        "sub": "The order the Python Full Stack course is taught at Archer Infotech, Pune",
        "stages": [
            ("Python", "Syntax, data structures, OOP, modules, exceptions", (56, 189, 248)),
            ("Databases", "SQL, schema design, ORM, MongoDB basics", (129, 140, 248)),
            ("Web & JavaScript", "HTML5, CSS3, ES6+, the DOM, async", (168, 85, 247)),
            ("React", "Components, hooks, routing, state, forms", (45, 212, 191)),
            ("Django & DRF", "Models, ORM, auth, admin, REST APIs", (52, 211, 153)),
            ("FastAPI & Integration", "Async APIs, JWT, React-to-backend wiring", (250, 204, 21)),
            ("Deploy & Scale", "Docker, CI/CD, cloud, Redis, Celery, security", (251, 146, 60)),
            ("AI-Assisted Dev", "Copilots, LLM integration, projects, interviews", (248, 113, 113)),
        ],
    },
    "mern-stack-path": {
        "title": "The MERN Stack Learning Path",
        "sub": "The order the MERN Stack course is taught at Archer Infotech, Pune",
        "stages": [
            ("Web Fundamentals", "HTML5, CSS3, Flexbox, Grid, Tailwind", (56, 189, 248)),
            ("JavaScript", "Functions, arrays, objects, OOP, ES6+", (129, 140, 248)),
            ("DOM & Async", "Events, forms, storage, promises, fetch", (168, 85, 247)),
            ("TypeScript", "Types, interfaces, generics, typed React", (45, 212, 191)),
            ("React", "Hooks, routing, context, Redux Toolkit, performance", (52, 211, 153)),
            ("Node.js & Express", "Modules, middleware, REST APIs, auth", (250, 204, 21)),
            ("MongoDB", "Schemas, Mongoose, aggregation, indexing", (251, 146, 60)),
            ("Deploy & Career", "Docker, CI/CD, cloud, projects, interviews", (248, 113, 113)),
        ],
    },
    "mean-stack-path": {
        "title": "The MEAN Stack Learning Path",
        "sub": "The order the MEAN Stack course is taught at Archer Infotech, Pune",
        "stages": [
            ("Web Fundamentals", "HTML5, CSS3, Flexbox, Grid, Tailwind", (56, 189, 248)),
            ("JavaScript", "Functions, arrays, objects, OOP, ES6+", (129, 140, 248)),
            ("DOM & Async", "Events, forms, storage, promises, fetch", (168, 85, 247)),
            ("TypeScript", "Types, interfaces, decorators, generics", (45, 212, 191)),
            ("Angular", "Components, services, DI, routing, forms, RxJS", (52, 211, 153)),
            ("Node.js & Express", "Modules, middleware, REST APIs, auth", (250, 204, 21)),
            ("MongoDB", "Schemas, Mongoose, aggregation, indexing", (251, 146, 60)),
            ("Deploy & Career", "Docker, CI/CD, cloud, projects, interviews", (248, 113, 113)),
        ],
    },
    # Modern Web — one learning path per course in the category.
    "react-path": {
        "title": "The React.js Learning Path",
        "sub": "The order the React.js course is taught at Archer Infotech, Pune",
        "stages": [
            ("Modern JavaScript", "ES6+, destructuring, modules, async", (56, 189, 248)),
            ("JSX & Components", "Elements, props, composition, rendering lists", (129, 140, 248)),
            ("State & Events", "useState, handlers, controlled forms", (168, 85, 247)),
            ("Hooks", "useEffect, useRef, useReducer, custom hooks", (45, 212, 191)),
            ("Routing & Data", "React Router, fetch, TanStack Query", (52, 211, 153)),
            ("State Management", "Context, Redux Toolkit, Zustand", (250, 204, 21)),
            ("Performance & Testing", "Memoisation, code splitting, RTL, Vitest", (251, 146, 60)),
            ("Build & Deploy", "Vite, environments, hosting, projects", (248, 113, 113)),
        ],
    },
    "angular-path": {
        "title": "The Angular Learning Path",
        "sub": "The order the Angular course is taught at Archer Infotech, Pune",
        "stages": [
            ("TypeScript", "Types, interfaces, generics, decorators", (56, 189, 248)),
            ("Components & Templates", "Bindings, lifecycle, encapsulation, signals", (129, 140, 248)),
            ("Directives & Pipes", "Structural, attribute, custom, control flow", (168, 85, 247)),
            ("Services & DI", "Injectors, providers, injection tokens", (45, 212, 191)),
            ("Routing", "Params, guards, resolvers, lazy loading", (52, 211, 153)),
            ("Forms & HttpClient", "Reactive forms, validation, interceptors", (250, 204, 21)),
            ("RxJS", "Observables, operators, subscription management", (251, 146, 60)),
            ("State, Test & Deploy", "NgRx, Jasmine, Karma, build, deploy", (248, 113, 113)),
        ],
    },
    "nextjs-path": {
        "title": "The Next.js Learning Path",
        "sub": "The order the Next.js course is taught at Archer Infotech, Pune",
        "stages": [
            ("React Foundations", "Components, hooks, state — the prerequisite", (56, 189, 248)),
            ("App Router", "File routing, layouts, nested and dynamic routes", (129, 140, 248)),
            ("Rendering Models", "Server Components, SSR, SSG, ISR, streaming", (168, 85, 247)),
            ("Data & Mutations", "Fetching, caching, revalidation, Server Actions", (45, 212, 191)),
            ("Route Handlers & Auth", "API routes, middleware, sessions, protection", (52, 211, 153)),
            ("Database Layer", "Prisma or Drizzle, queries, migrations", (250, 204, 21)),
            ("Optimisation & SEO", "Images, fonts, metadata, Core Web Vitals", (251, 146, 60)),
            ("Deploy & Operate", "Vercel, self-hosting, monitoring, projects", (248, 113, 113)),
        ],
    },
    "typescript-path": {
        "title": "The TypeScript Learning Path",
        "sub": "The order the TypeScript course is taught at Archer Infotech, Pune",
        "stages": [
            ("JavaScript Refresher", "ES6+, closures, modules, async", (56, 189, 248)),
            ("Types & Inference", "Primitives, unions, literals, narrowing", (129, 140, 248)),
            ("Interfaces & Aliases", "Objects, optional, readonly, index signatures", (168, 85, 247)),
            ("Functions & Generics", "Overloads, constraints, generic components", (45, 212, 191)),
            ("Classes & Decorators", "Access modifiers, abstract, decorators", (52, 211, 153)),
            ("Advanced Types", "Conditional, mapped, template literal, utility", (250, 204, 21)),
            ("Config & Tooling", "tsconfig, strict mode, ESLint, build setup", (251, 146, 60)),
            ("TypeScript in Practice", "React, Node, testing, migrating a codebase", (248, 113, 113)),
        ],
    },
    "nodejs-path": {
        "title": "The Node.js Learning Path",
        "sub": "The order the Node.js course is taught at Archer Infotech, Pune",
        "stages": [
            ("JavaScript & Async", "ES6+, promises, async/await, error handling", (56, 189, 248)),
            ("Node Runtime", "Event loop, modules, npm, environment config", (129, 140, 248)),
            ("Core Modules", "File system, path, streams, buffers, events", (168, 85, 247)),
            ("Express", "Routing, middleware, controllers, error handling", (45, 212, 191)),
            ("Databases", "MongoDB and Mongoose, SQL, data modelling", (52, 211, 153)),
            ("Auth & Security", "JWT, bcrypt, validation, OWASP, rate limiting", (250, 204, 21)),
            ("Real-time & Testing", "Socket.IO, Jest, Supertest, coverage", (251, 146, 60)),
            ("Deploy & Scale", "Docker, CI/CD, PM2, caching, monitoring", (248, 113, 113)),
        ],
    },
    # Cloud certification tracks. Stages are the exam domains, in the order
    # the course teaches them, with each domain's exam weight — which is the
    # number a candidate actually plans study time against.
    "aws-saa-path": {
        "title": "The AWS Solutions Architect Associate Path",
        "sub": "SAA-C03 exam domains in the order taught at Archer Infotech, Pune",
        "stages": [
            ("Foundations", "Account setup, EC2, S3, VPC, IAM refresher", (56, 189, 248)),
            ("Resilient Architectures", "Domain 1 — ~26% — HA, DR, decoupling", (129, 140, 248)),
            ("High-Performing", "Domain 2 — ~24% — compute, storage, database fit", (168, 85, 247)),
            ("Secure Applications", "Domain 3 — ~30% — IAM, KMS, detective controls", (45, 212, 191)),
            ("Cost-Optimised", "Domain 4 — ~20% — right-sizing, purchase options", (52, 211, 153)),
            ("Well-Architected Review", "Six pillars applied to your own design", (250, 204, 21)),
            ("Mock Exams", "Timed papers, gap closure, question technique", (251, 146, 60)),
            ("Exam Day", "Booking, proctoring, pacing, result", (248, 113, 113)),
        ],
        "tail": "DESIGN  |  DEFEND  |  CERTIFY",
    },
    "azure-az104-path": {
        "title": "The Azure Administrator (AZ-104) Path",
        "sub": "AZ-104 exam domains in the order taught at Archer Infotech, Pune",
        "stages": [
            ("Foundations", "Portal, CLI, PowerShell, Bicep, resource hierarchy", (56, 189, 248)),
            ("Identity & Governance", "Domain 1 — ~20-25% — Entra ID, RBAC, Policy", (129, 140, 248)),
            ("Storage", "Domain 2 — ~15-20% — accounts, replication, Files", (168, 85, 247)),
            ("Compute", "Domain 3 — ~20-25% — VMs, scale sets, App Service", (45, 212, 191)),
            ("Virtual Networking", "Domain 4 — ~20-25% — VNets, NSGs, load balancing", (52, 211, 153)),
            ("Monitor & Maintain", "Domain 5 — ~10-15% — Monitor, Backup, Site Recovery", (250, 204, 21)),
            ("Mock Exams", "Timed papers, scenario walkthroughs, gap closure", (251, 146, 60)),
            ("Exam Day", "Booking, proctoring, pacing, result", (248, 113, 113)),
        ],
        "tail": "ADMINISTER  |  SECURE  |  CERTIFY",
    },
    "gcp-ace-path": {
        "title": "The Google Cloud Associate Cloud Engineer Path",
        "sub": "ACE exam domains in the order taught at Archer Infotech, Pune",
        "stages": [
            ("Foundations", "Console, gcloud, Cloud Shell, resource hierarchy", (56, 189, 248)),
            ("Set Up Projects", "Domain 1 — ~17% — projects, billing, accounts", (129, 140, 248)),
            ("Plan & Configure", "Domain 2 — ~17% — compute, storage, network choice", (168, 85, 247)),
            ("Deploy & Implement", "Domain 3 — ~25% — GCE, GKE, Cloud Run, functions", (45, 212, 191)),
            ("Ensure Operation", "Domain 4 — ~20% — Monitoring, Logging, quotas", (52, 211, 153)),
            ("Access & Security", "Domain 5 — ~21% — IAM, service accounts, org policy", (250, 204, 21)),
            ("Mock Exams", "Timed papers, gcloud command drills, gap closure", (251, 146, 60)),
            ("Exam Day", "Booking, proctoring, pacing, result", (248, 113, 113)),
        ],
        "tail": "BUILD  |  OPERATE  |  CERTIFY",
    },
    "salesforce-admin-path": {
        "title": 'The Salesforce Administrator Path',
        "sub": 'The order the Administrator course is taught at Archer Infotech, Pune',
        "tail": 'CONFIGURE  |  AUTOMATE  |  REPORT',
        "stages": [
            ('Platform Basics', 'CRM concepts, objects, the data model', (56, 189, 248)),
            ('Users & Access', 'Profiles, permission sets, role hierarchy', (129, 140, 248)),
            ('Security Model', 'OWD, sharing rules, field-level security', (168, 85, 247)),
            ('Data Modelling', 'Objects, fields, relationships, record types', (45, 212, 191)),
            ('User Interface', 'Page layouts, Lightning pages, list views', (52, 211, 153)),
            ('Automation', 'Flow Builder, validation rules, approvals', (250, 204, 21)),
            ('Reports & Dashboards', 'Report types, formulas, dynamic dashboards', (251, 146, 60)),
            ('Certification', 'Mock exams, exam strategy, org walkthrough', (248, 113, 113)),
        ],
    },
    "salesforce-developer-path": {
        "title": 'The Salesforce Developer Path',
        "sub": 'The order the Developer course is taught at Archer Infotech, Pune',
        "tail": 'BUILD  |  INTEGRATE  |  DEPLOY',
        "stages": [
            ('Platform Foundations', 'Objects, security, VS Code, Salesforce CLI', (56, 189, 248)),
            ('Apex Fundamentals', 'Types, collections, classes, DML', (129, 140, 248)),
            ('SOQL & SOSL', 'Relationship queries, aggregates, selectivity', (168, 85, 247)),
            ('Triggers & Limits', 'Bulkification, order of execution, governor limits', (45, 212, 191)),
            ('Asynchronous Apex', 'Future, Queueable, Batch, Scheduled', (52, 211, 153)),
            ('Lightning Web Components', 'Templates, events, wire adapters, Jest', (250, 204, 21)),
            ('Integration', 'REST, SOAP, callouts, named credentials, OAuth', (251, 146, 60)),
            ('Test & Deploy', 'Coverage, Salesforce DX, Git, CI', (248, 113, 113)),
        ],
    },
    "salesforce-ba-path": {
        "title": 'The Salesforce Business Analyst Path',
        "sub": 'The order the Business Analyst course is taught at Archer Infotech, Pune',
        "tail": 'ASK  |  MAP  |  SPECIFY',
        "stages": [
            ('The Analyst Role', 'Delivery models, artefacts, where the role sits', (56, 189, 248)),
            ('Platform Literacy', 'Objects, security, Flow limits, reporting constraints', (129, 140, 248)),
            ('Elicitation', 'Interviews, workshops, stakeholder management', (168, 85, 247)),
            ('Process Mapping', 'As-is, to-be, swimlanes, gap analysis', (45, 212, 191)),
            ('User Stories', 'Acceptance criteria, INVEST, backlog, prioritisation', (52, 211, 153)),
            ('Data & Reporting', 'Requirements, migration mapping, report specs', (250, 204, 21)),
            ('Solution & UAT', 'Design participation, test scripts, sign-off', (251, 146, 60)),
            ('Certification', 'Requirements portfolio, mock exams, interviews', (248, 113, 113)),
        ],
    },
    "salesforce-consultant-path": {
        "title": 'The Salesforce Consultant Progression Track',
        "sub": 'A progression track — assumes existing platform experience. Archer Infotech, Pune',
        "tail": 'SCOPE  |  DESIGN  |  DELIVER',
        "stages": [
            ("The Consultant's Remit", 'Engagement models, discovery, statements of work', (56, 189, 248)),
            ('Scoping & Estimation', 'Workshops, ranges, assumptions, defending an estimate', (129, 140, 248)),
            ('Sales Cloud Delivery', 'Lead to cash, forecasting, territories', (168, 85, 247)),
            ('Service Cloud Delivery', 'Channels, routing, entitlements, knowledge', (45, 212, 191)),
            ('Migration & Integration', 'Sequencing, reconciliation, pattern selection', (52, 211, 153)),
            ('Solution & Governance', 'Declarative-first, debt prevention, design authority', (250, 204, 21)),
            ('Change & Go-Live', 'UAT, training, adoption, hypercare', (251, 146, 60)),
            ('Client Craft', 'Steering meetings, refusing scope, bad news early', (248, 113, 113)),
        ],
    },
    "salesforce-data-path": {
        "title": 'The Salesforce Data & Analytics Path',
        "sub": 'The order the Data & Analytics course is taught at Archer Infotech, Pune',
        "tail": 'MODEL  |  CLEAN  |  ANSWER',
        "stages": [
            ('Data Model', 'Schema, relationships, sharing and its effect on totals', (56, 189, 248)),
            ('Data Quality', 'Profiling, duplicates, validation, stewardship', (129, 140, 248)),
            ('Reporting Depth', 'Custom report types, joined reports, formulas', (168, 85, 247)),
            ('Migration & Integration', 'Bulk API, upsert, CDC, Salesforce Connect', (45, 212, 191)),
            ('CRM Analytics', 'Datasets, recipes, SAQL, row-level security', (52, 211, 153)),
            ('Data Cloud', 'Ingestion, identity resolution, segmentation', (250, 204, 21)),
            ('Tableau', 'Calculations, LOD expressions, dashboard design', (251, 146, 60)),
            ('AI Foundations', 'Grounding, Einstein data requirements, governance', (248, 113, 113)),
        ],
    },
    "salesforce-marketing-path": {
        "title": 'The Salesforce Marketing Cloud Path',
        "sub": 'The order the Marketing Cloud course is taught at Archer Infotech, Pune',
        "tail": 'SEGMENT  |  JOURNEY  |  MEASURE',
        "stages": [
            ('Architecture & Setup', 'Business units, Data Extensions, contact model', (56, 189, 248)),
            ('Email & Content', 'Content Builder, templates, deliverability', (129, 140, 248)),
            ('Segmentation & SQL', 'Data Extensions, query activities, suppression', (168, 85, 247)),
            ('Journey Builder', 'Entry sources, splits, goals, automation', (45, 212, 191)),
            ('AMPscript', 'Variables, lookups, dynamic personalisation', (52, 211, 153)),
            ('Cross-Channel', 'SMS, push, advertising, frequency capping', (250, 204, 21)),
            ('Analytics', 'Engagement, attribution limits, testing discipline', (251, 146, 60)),
            ('Certification', 'Campaign case study, Email Specialist prep', (248, 113, 113)),
        ],
    },
    "salesforce-sales-path": {
        "title": 'The Salesforce Sales Cloud Path',
        "sub": 'The order the Sales Cloud course is taught at Archer Infotech, Pune',
        "tail": 'PIPELINE  |  FORECAST  |  ADOPT',
        "stages": [
            ('Sales Process', 'Methodology, lead to cash, stage design', (56, 189, 248)),
            ('Lead Management', 'Capture, assignment, scoring, conversion', (129, 140, 248)),
            ('Opportunities', 'Stages, sales path, products, price books', (168, 85, 247)),
            ('Quoting & Contracts', 'Quotes, discounts, approvals, orders', (45, 212, 191)),
            ('Forecasting', 'Categories, quotas, territories, analytics', (52, 211, 153)),
            ('Sales Automation', 'Flow, email integration, cadences, mobile', (250, 204, 21)),
            ('Adoption', 'Measuring use, pipeline hygiene, sales ops', (251, 146, 60)),
            ('Certification', 'Org walkthrough, Administrator and Consultant prep', (248, 113, 113)),
        ],
    },
    "salesforce-architect-path": {
        "title": 'The Salesforce Architect Preparation Track',
        "sub": 'A preparation track — assumes roughly five years hands-on. Archer Infotech, Pune',
        "tail": 'DECIDE  |  DEFEND  |  DOCUMENT',
        "stages": [
            ("The Architect's Remit", 'Accountability, decision records, design authority', (56, 189, 248)),
            ('Application Architecture', 'Layering, multi-org, packaging, technical debt', (129, 140, 248)),
            ('Data Architecture', 'Skew, large data volumes, indexes, archiving', (168, 85, 247)),
            ('Integration Architecture', 'Patterns, middleware, events, limit budgeting', (45, 212, 191)),
            ('Identity & Access', 'SAML, OAuth, SSO, provisioning, external identity', (52, 211, 153)),
            ('Security & Compliance', 'Sharing at scale, encryption, Shield, threat modelling', (250, 204, 21)),
            ('Scale & Resilience', 'Performance, monitoring, backup, release strategy', (251, 146, 60)),
            ('AI & Review Board', 'Agentforce architecture, governance, design defence', (248, 113, 113)),
        ],
    },
    "machine-learning-workflow": {
        "title": "How a Machine Learning Engineer Works",
        "sub": "The Machine Learning lifecycle taught at Archer Infotech, Pune",
        "stages": [
            ("Data", "Collect, clean, split", (56, 189, 248)),
            ("Features", "Engineering, scaling, encoding", (129, 140, 248)),
            ("Algorithm", "Regression, trees, SVM, boosting", (168, 85, 247)),
            ("Train", "Fit, cross-validate, tune", (250, 204, 21)),
            ("Evaluate", "Metrics, calibration, error analysis", (248, 113, 113)),
            ("Deploy & Monitor", "Serving, drift, retraining", (52, 211, 153)),
        ],
    },
    "chatgpt-llms-workflow": {
        "title": "ChatGPT & LLMs Learning Sequence",
        "sub": "The focused OpenAI and LLM application track at Archer Infotech, Pune",
        "stages": [
            ("LLM Foundations", "Models, tokens, context, SDK setup", (56, 189, 248)),
            ("Chat APIs", "Messages, state, streaming, retries", (129, 140, 248)),
            ("Structured Outputs", "JSON schema, validators, extraction", (168, 85, 247)),
            ("Tool Use", "Function calling, APIs, safe actions", (45, 212, 191)),
            ("RAG", "Embeddings, vector stores, citations", (250, 204, 21)),
            ("Assistants & Realtime", "Custom GPTs, files, voice workflows", (248, 113, 113)),
            ("Production Capstone", "FastAPI, tracing, cost, deployment", (52, 211, 153)),
        ],
    },
    "prompt-engineering-workflow": {
        "title": "Prompt Engineering Learning Sequence",
        "sub": "The focused prompt design and evaluation course at Archer Infotech, Pune",
        "stages": [
            ("Model Behaviour", "Prompt anatomy, context, limitations", (56, 189, 248)),
            ("Task Design", "Briefs, examples, constraints", (129, 140, 248)),
            ("Output Contracts", "Formats, schemas, validators", (168, 85, 247)),
            ("Evaluation", "Test cases, rubrics, versioning", (250, 204, 21)),
            ("Domain Patterns", "Sales, support, code, research, legal", (248, 113, 113)),
            ("Prompt Suite", "Library, documentation, capstone demo", (52, 211, 153)),
        ],
    },
    "ai-tools-productivity-workflow": {
        "title": "AI Tools for Productivity Sequence",
        "sub": "The practical AI-tool workflow course at Archer Infotech, Pune",
        "stages": [
            ("Daily-Driver Setup", "ChatGPT, Claude, Gemini, Perplexity", (56, 189, 248)),
            ("Research & Writing", "Sources, summaries, docs, reports", (129, 140, 248)),
            ("Creative Tools", "Images, video, audio, presentations", (168, 85, 247)),
            ("Coding Assistants", "Cursor, Claude Code, Copilot", (45, 212, 191)),
            ("Automation", "Zapier, Make, n8n, approvals", (250, 204, 21)),
            ("Measure Impact", "Role workflows, quality checks", (248, 113, 113)),
            ("Productivity Capstone", "Playbook, demo, privacy rules", (52, 211, 153)),
        ],
    },
    "java-programming-workflow": {
        "title": "Core Java Learning Sequence",
        "sub": "The Core Java foundation taught at Archer Infotech, Pune",
        "stages": [
            ("Java Foundations", "JDK, JVM, syntax, exceptions", (56, 189, 248)),
            ("OOP Design", "Classes, interfaces, records, sealed types", (129, 140, 248)),
            ("Exceptions + I/O", "Packages, files, custom errors", (168, 85, 247)),
            ("Collections", "Generics, streams, List, Set, Map", (45, 212, 191)),
            ("Concurrency", "Threads, executors, virtual threads", (250, 204, 21)),
            ("JDBC", "SQL connectivity, DAO, transactions", (248, 113, 113)),
            ("DSA in Java", "Arrays, maps, recursion, trees", (52, 211, 153)),
            ("Core Java Capstone", "Portfolio, mock interviews, placement prep", (56, 189, 248)),
        ],
    },
    "python-programming-workflow": {
        "title": "Core Python Learning Sequence",
        "sub": "The Core Python foundation taught at Archer Infotech, Pune",
        "stages": [
            ("Python Foundations", "Syntax, functions, types, tooling", (56, 189, 248)),
            ("Data Structures", "Lists, dictionaries, comprehensions", (129, 140, 248)),
            ("OOP & Exceptions", "Classes, dataclasses, protocols", (168, 85, 247)),
            ("Files + JSON + CSV", "pathlib, context managers, reports", (45, 212, 191)),
            ("Modules + Tooling", "Packages, venv, argparse, GitHub", (250, 204, 21)),
            ("Advanced Core", "Generators, decorators, regex, logging", (248, 113, 113)),
            ("Testing + DSA", "pytest, debugging, interview patterns", (52, 211, 153)),
            ("Core Python Capstone", "Automation, SQLite/API basics, portfolio", (56, 189, 248)),
        ],
    },
    "javascript-programming-workflow": {
        "title": "JavaScript Programming Learning Sequence",
        "sub": "The browser, Node and framework-ready route taught at Archer Infotech, Pune",
        "stages": [
            ("JS Foundations", "Syntax, scope, closures, this", (56, 189, 248)),
            ("Modern ECMAScript", "Modules, arrays, objects, iterators", (129, 140, 248)),
            ("OOP + Functional", "Classes, factories, composition", (168, 85, 247)),
            ("Async Runtime", "Event loop, promises, async/await", (45, 212, 191)),
            ("Browser APIs", "DOM, Fetch, storage, observers", (250, 204, 21)),
            ("TypeScript Primer", "Types, generics, strict mode", (248, 113, 113)),
            ("Testing + Tooling", "Vitest, Playwright, Vite, CI", (52, 211, 153)),
            ("Capstone", "SPA, Node CLI, real-time mini-app", (56, 189, 248)),
        ],
    },
    "c-programming-workflow": {
        "title": "C Programming Learning Sequence",
        "sub": "The systems and embedded foundation taught at Archer Infotech, Pune",
        "stages": [
            ("C Foundations", "Compiler, types, control flow", (56, 189, 248)),
            ("Functions", "Headers, recursion, stack frames", (129, 140, 248)),
            ("Arrays & Strings", "Buffers, char arrays, string.h", (168, 85, 247)),
            ("Pointers", "Addresses, arithmetic, callbacks", (45, 212, 191)),
            ("Memory", "malloc, free, valgrind, ASan", (250, 204, 21)),
            ("Structures", "Structs, unions, bitfields, trees", (248, 113, 113)),
            ("Files & Systems", "File I/O, POSIX, preprocessor", (52, 211, 153)),
            ("Capstone", "Database, firmware, data structures", (56, 189, 248)),
        ],
    },
    "cpp-programming-workflow": {
        "title": "C++ Programming Learning Sequence",
        "sub": "The modern C++ and high-performance route taught at Archer Infotech, Pune",
        "stages": [
            ("C++ Foundations", "Toolchain, references, CMake", (56, 189, 248)),
            ("Object-Oriented C++", "Classes, move semantics, polymorphism", (129, 140, 248)),
            ("Templates", "Generic programming, concepts", (168, 85, 247)),
            ("STL", "Containers, iterators, algorithms", (45, 212, 191)),
            ("RAII + Memory", "Smart pointers, ownership, safety", (250, 204, 21)),
            ("Modern C++", "C++17/20/23, ranges, concurrency", (248, 113, 113)),
            ("Build + Test", "GoogleTest, sanitizers, clang-tidy", (52, 211, 153)),
            ("Capstone", "Systems, game loop, embedded option", (56, 189, 248)),
        ],
    },
    "dotnet-csharp-programming-workflow": {
        "title": "C# Programming Learning Sequence",
        "sub": "The C# language foundation taught at Archer Infotech, Pune",
        "stages": [
            ("C# Foundations", "Syntax, nullable types, dotnet CLI", (56, 189, 248)),
            ("OOP C#", "Records, interfaces, pattern matching", (129, 140, 248)),
            ("Collections + LINQ", "Queries, deferred execution, generics", (168, 85, 247)),
            ("Async Runtime", "Tasks, cancellation, parallelism", (45, 212, 191)),
            ("IO + JSON", "Streams, System.Text.Json, errors", (250, 204, 21)),
            ("Delegates + Events", "Lambdas, callbacks, event patterns", (248, 113, 113)),
            ("Testing + DSA", "xUnit, debugging, interview patterns", (52, 211, 153)),
            ("C# Capstone", "Console tool, domain library, portfolio", (56, 189, 248)),
        ],
    },
    "spring-boot-microservices-workflow": {
        "title": "Spring Boot & Microservices Learning Sequence",
        "sub": "The production Java backend specialisation taught at Archer Infotech, Pune",
        "stages": [
            ("Java Refresher", "Java 21, records, streams, virtual threads", (56, 189, 248)),
            ("Spring Core", "DI, configuration, testing basics", (129, 140, 248)),
            ("REST APIs", "Controllers, validation, OpenAPI", (168, 85, 247)),
            ("Persistence", "JPA, transactions, PostgreSQL", (45, 212, 191)),
            ("Microservices", "Boundaries, gateway, discovery, config", (250, 204, 21)),
            ("Messaging", "Kafka, RabbitMQ, event design", (248, 113, 113)),
            ("Cloud Operations", "Docker, Kubernetes, observability", (52, 211, 153)),
            ("Capstone", "Production system, interviews, placement prep", (56, 189, 248)),
        ],
    },
    "aws-cloud-path": {
        "title": "The AWS Cloud Learning Path",
        "sub": "The order the AWS Cloud Computing course is taught at Archer Infotech, Pune",
        "stages": [
            ("Cloud Foundations", "Regions, AZs, shared responsibility, billing", (56, 189, 248)),
            ("Identity & Access", "IAM users, roles, policies, federation", (129, 140, 248)),
            ("Networking", "VPC, subnets, endpoints, Route 53", (168, 85, 247)),
            ("Compute", "EC2, Auto Scaling, Lambda, serverless", (45, 212, 191)),
            ("Containers", "ECR, ECS, Fargate, EKS", (52, 211, 153)),
            ("Storage & Databases", "S3, EBS, RDS, Aurora, DynamoDB", (250, 204, 21)),
            ("Infrastructure as Code", "Terraform, CDK, CloudFormation", (251, 146, 60)),
            ("CI/CD & Observability", "GitHub Actions, CloudWatch, X-Ray", (248, 113, 113)),
            ("Security & Cost", "KMS, WAF, Well-Architected, FinOps", (56, 189, 248)),
            ("Generative AI", "Bedrock, knowledge bases, capstone", (129, 140, 248)),
        ],
    },
    "azure-cloud-path": {
        "title": "The Microsoft Azure Learning Path",
        "sub": "The order the Microsoft Azure course is taught at Archer Infotech, Pune",
        "stages": [
            ("Azure Foundations", "Management groups, subscriptions, cost", (56, 189, 248)),
            ("Entra ID & RBAC", "Identities, roles, Conditional Access", (129, 140, 248)),
            ("Networking", "VNet, NSG, load balancing, Private Link", (168, 85, 247)),
            ("Compute", "VMs, scale sets, App Service, Functions", (45, 212, 191)),
            ("Containers", "ACR, Container Apps, AKS", (52, 211, 153)),
            ("Storage & Databases", "Blob, Files, Azure SQL, Cosmos DB", (250, 204, 21)),
            ("Infrastructure as Code", "Bicep, Terraform, ARM templates", (251, 146, 60)),
            ("CI/CD & Monitoring", "Azure DevOps, Actions, Monitor, KQL", (248, 113, 113)),
            ("Security & Cost", "Key Vault, Defender, FinOps", (56, 189, 248)),
            ("Azure OpenAI", "AI Search, RAG, capstone, AZ-104", (129, 140, 248)),
        ],
    },
    "google-cloud-path": {
        "title": "The Google Cloud Learning Path",
        "sub": "The order the Google Cloud Platform course is taught at Archer Infotech, Pune",
        "stages": [
            ("GCP Foundations", "Org, folders, projects, billing", (56, 189, 248)),
            ("IAM", "Roles, service accounts, workload identity", (129, 140, 248)),
            ("Networking", "Global VPC, firewall, Cloud NAT, load balancing", (168, 85, 247)),
            ("Compute Engine", "Machine types, instance groups, autoscaling", (45, 212, 191)),
            ("GKE", "Autopilot, Standard mode, workload identity", (52, 211, 153)),
            ("Serverless", "Cloud Run, Run Jobs, Cloud Functions", (250, 204, 21)),
            ("Storage & Databases", "Cloud Storage, Cloud SQL, Spanner, Firestore", (251, 146, 60)),
            ("BigQuery", "Partitioning, clustering, query optimisation", (248, 113, 113)),
            ("Terraform & Ops", "Cloud Build, Logging, Monitoring, Trace", (56, 189, 248)),
            ("Vertex AI", "Gemini, managed RAG, capstone", (129, 140, 248)),
        ],
    },
    "devops-engineering-path": {
        "title": "The DevOps Engineering Learning Path",
        "sub": "The order the DevOps Engineering course is taught at Archer Infotech, Pune",
        "stages": [
            ("Linux & Networking", "Permissions, systemd, DNS, diagnostics", (56, 189, 248)),
            ("Bash & Git", "Scripting, branching, trunk-based development", (129, 140, 248)),
            ("Docker", "Images, multi-stage builds, registries", (168, 85, 247)),
            ("Kubernetes", "Pods, deployments, services, ingress, RBAC", (45, 212, 191)),
            ("Helm & Operators", "Charts, Kustomize, cluster operations", (52, 211, 153)),
            ("CI/CD", "GitHub Actions, Jenkins, shared libraries", (250, 204, 21)),
            ("Terraform & GitOps", "State, modules, Argo CD", (251, 146, 60)),
            ("Observability", "Prometheus, Grafana, Loki, Tempo", (248, 113, 113)),
            ("Security & Supply Chain", "Kyverno, Falco, Cosign, SBOMs", (56, 189, 248)),
            ("FinOps & SRE", "SLOs, incidents, capstone platform", (129, 140, 248)),
        ],
    },
    "kubernetes-path": {
        "title": "The Kubernetes Learning Path",
        "sub": "The order the Kubernetes course is taught at Archer Infotech, Pune",
        "stages": [
            ("Architecture", "Control plane, etcd, scheduler, kubelet", (56, 189, 248)),
            ("Pods & Probes", "Sidecars, init containers, readiness", (129, 140, 248)),
            ("Workloads", "Deployments, StatefulSets, DaemonSets, Jobs", (168, 85, 247)),
            ("Services & Ingress", "Cluster DNS, NGINX, Gateway API", (45, 212, 191)),
            ("Config & Storage", "ConfigMaps, Secrets, volumes, CSI", (52, 211, 153)),
            ("Helm & Operators", "Charts, overlays, CRDs, controllers", (250, 204, 21)),
            ("Security", "RBAC, admission, network policy, PSA", (251, 146, 60)),
            ("Observability", "Prometheus, Grafana, Loki, Tempo", (248, 113, 113)),
            ("Scheduling & Scaling", "Affinity, taints, HPA, Karpenter", (56, 189, 248)),
            ("GitOps & Capstone", "Argo CD, service mesh, CKA prep", (129, 140, 248)),
        ],
    },
    "docker-path": {
        "title": "The Docker Learning Path",
        "sub": "The order the Docker course is taught at Archer Infotech, Pune",
        "stages": [
            ("Container Fundamentals", "Namespaces, cgroups, OCI image format", (56, 189, 248)),
            ("Dockerfile Authoring", "Instructions, layer cache, ENTRYPOINT", (129, 140, 248)),
            ("BuildKit & Multi-Stage", "Cache mounts, build secrets, distroless", (168, 85, 247)),
            ("Multi-Platform & Registries", "Buildx, manifest lists, ECR, GHCR", (45, 212, 191)),
            ("Docker Compose", "Services, healthchecks, profiles, overrides", (52, 211, 153)),
            ("Networking & Volumes", "Bridge, DNS, named volumes, stateful", (250, 204, 21)),
            ("Security", "Non-root, capabilities, seccomp, socket risk", (251, 146, 60)),
            ("Supply Chain", "Trivy scanning, SBOMs, Cosign signing", (248, 113, 113)),
            ("CI/CD & Operations", "Pipelines, troubleshooting, capstone", (56, 189, 248)),
        ],
    },
    "android-path": {
        "title": "The Android Development Learning Path",
        "sub": "The order the Android App Development course is taught at Archer Infotech, Pune",
        "stages": [
            ("Kotlin", "Null safety, data classes, scope functions", (56, 189, 248)),
            ("Studio & Gradle", "Kotlin DSL, resources, lifecycle", (129, 140, 248)),
            ("Jetpack Compose", "Composables, state hoisting, recomposition", (168, 85, 247)),
            ("Material 3 & Motion", "Theming, dynamic colour, animation", (45, 212, 191)),
            ("Navigation", "NavHost, deep links, adaptive layouts", (52, 211, 153)),
            ("Architecture", "MVVM, ViewModels, Hilt, layering", (250, 204, 21)),
            ("Coroutines & Flow", "Structured concurrency, StateFlow", (251, 146, 60)),
            ("Data Layer", "Retrofit, Room, DataStore, offline-first", (248, 113, 113)),
            ("Background & Firebase", "WorkManager, notifications, FCM", (56, 189, 248)),
            ("Test, Tune & Ship", "Compose tests, Baseline Profiles, Play Store", (129, 140, 248)),
        ],
    },
    "flutter-path": {
        "title": "The Flutter Development Learning Path",
        "sub": "The order the Flutter App Development course is taught at Archer Infotech, Pune",
        "stages": [
            ("Dart 3", "Null safety, records, patterns, async", (56, 189, 248)),
            ("Flutter Tooling", "pubspec, hot reload, DevTools, flavours", (129, 140, 248)),
            ("Widgets & Layout", "Widget tree, keys, the constraint model", (168, 85, 247)),
            ("Material 3 & Responsive", "Theming, Cupertino, breakpoints", (45, 212, 191)),
            ("Riverpod", "Providers, AsyncValue, code generation", (52, 211, 153)),
            ("Bloc & Cubit", "Events, states, transformers", (250, 204, 21)),
            ("Navigation & Forms", "go_router, deep links, validation", (251, 146, 60)),
            ("Data Layer", "Dio, Drift, offline-first, Firebase", (248, 113, 113)),
            ("Motion & Native", "Animations, CustomPainter, platform channels", (56, 189, 248)),
            ("Test, Tune & Ship", "DevTools, both stores, CI/CD, capstone", (129, 140, 248)),
        ],
    },
    "react-native-path": {
        "title": "The React Native Learning Path",
        "sub": "The order the React Native course is taught at Archer Infotech, Pune",
        "stages": [
            ("RN Foundations", "Primitives, StyleSheet, New Architecture", (56, 189, 248)),
            ("Expo", "SDK, Expo Router, development builds", (129, 140, 248)),
            ("Components & Layout", "Flexbox, safe areas, FlatList, FlashList", (168, 85, 247)),
            ("Styling", "NativeWind, design tokens, dark mode", (45, 212, 191)),
            ("React 19 Hooks", "useTransition, useOptimistic, Compiler", (52, 211, 153)),
            ("Navigation", "React Navigation 7, typed params, deep links", (250, 204, 21)),
            ("Forms & Server State", "React Hook Form, Zod, TanStack Query", (251, 146, 60)),
            ("Motion & Gestures", "Reanimated 3 worklets, Gesture Handler", (248, 113, 113)),
            ("Native Capabilities", "Camera, notifications, TurboModules", (56, 189, 248)),
            ("Test, Tune & Ship", "Hermes profiling, EAS Build, both stores", (129, 140, 248)),
        ],
    },
    "ios-swift-path": {
        "title": "The iOS Development Learning Path",
        "sub": "The order the iOS App Development course is taught at Archer Infotech, Pune",
        "stages": [
            ("Swift 6", "Optionals, closures, structs, value semantics", (56, 189, 248)),
            ("Protocols & Generics", "POP, opaque types, errors, ARC", (129, 140, 248)),
            ("Xcode & SPM", "Schemes, debugger, modularisation", (168, 85, 247)),
            ("SwiftUI Foundations", "Views, state, bindings, layout", (45, 212, 191)),
            ("Navigation & Lists", "NavigationStack, forms, focus state", (52, 211, 153)),
            ("State & Architecture", "Observable macro, MV, MVVM, DI", (250, 204, 21)),
            ("Concurrency", "async/await, task groups, actors, Sendable", (251, 146, 60)),
            ("Data Layer", "URLSession, Codable, SwiftData, Keychain", (248, 113, 113)),
            ("Motion & Platform", "Gestures, APNs, StoreKit 2, WidgetKit", (56, 189, 248)),
            ("Test, Tune & Ship", "Swift Testing, Instruments, TestFlight", (129, 140, 248)),
        ],
    },
    "mysql-path": {
        "title": "The MySQL Learning Path",
        "sub": "The order the MySQL Database course is taught at Archer Infotech, Pune",
        "stages": [
            ("Relational Foundations", "The model, MySQL 8.4, utf8mb4, my.cnf", (56, 189, 248)),
            ("Core SQL", "SELECT clauses, DML, DDL, NULL handling", (129, 140, 248)),
            ("Types & Constraints", "DECIMAL money, foreign keys, defaults", (168, 85, 247)),
            ("Joins & Subqueries", "Outer joins, anti-joins, derived tables", (45, 212, 191)),
            ("Modern SQL", "CTEs, window functions, the JSON type", (52, 211, 153)),
            ("Schema Design", "Normal forms, denormalisation, migrations", (250, 204, 21)),
            ("Indexing", "Clustered index, composite order, covering", (251, 146, 60)),
            ("Performance", "EXPLAIN, slow query log, keyset pagination", (248, 113, 113)),
            ("Transactions", "Isolation levels, gap locks, deadlocks", (56, 189, 248)),
            ("Production & Capstone", "Privileges, backup, replication, cloud", (129, 140, 248)),
        ],
    },
    "postgresql-path": {
        "title": "The PostgreSQL Learning Path",
        "sub": "The order the PostgreSQL course is taught at Archer Infotech, Pune",
        "stages": [
            ("Foundations", "Process architecture, schemas, psql, pg_hba", (56, 189, 248)),
            ("Core SQL & Types", "Evaluation order, NUMERIC, timestamptz", (129, 140, 248)),
            ("Constraints & Design", "Identity columns, exclusion constraints", (168, 85, 247)),
            ("Joins & LATERAL", "Outer joins, EXISTS, top-N-per-group", (45, 212, 191)),
            ("Analytical SQL", "CTEs, window frames, grouping sets", (52, 211, 153)),
            ("JSONB & Arrays", "Containment, SQL/JSON path, GIN indexes", (250, 204, 21)),
            ("Indexing", "B-tree, GIN, GiST, BRIN, partial, covering", (251, 146, 60)),
            ("Performance", "EXPLAIN ANALYZE, joins, pg_stat_statements", (248, 113, 113)),
            ("Concurrency", "MVCC, isolation, VACUUM, SKIP LOCKED", (56, 189, 248)),
            ("Extensions", "Full-text search, pgvector, PostGIS", (129, 140, 248)),
            ("Production & Capstone", "Partitioning, replication, RLS, PITR", (168, 85, 247)),
        ],
    },
    "mongodb-path": {
        "title": "The MongoDB Learning Path",
        "sub": "The order the MongoDB course is taught at Archer Infotech, Pune",
        "stages": [
            ("Document Foundations", "BSON types, the 16MB limit, MongoDB 8.0", (56, 189, 248)),
            ("CRUD & Operators", "Projection, arrays, pipeline updates", (129, 140, 248)),
            ("Validation & Collections", "JSON Schema, TTL, time-series", (168, 85, 247)),
            ("Document Modelling", "Embedding vs referencing, array growth", (45, 212, 191)),
            ("Modelling Patterns", "Bucket, computed, extended reference", (52, 211, 153)),
            ("Aggregation", "match, group, lookup, facet, window fields", (250, 204, 21)),
            ("Indexing & Performance", "ESR rule, executionStats, covered reads", (251, 146, 60)),
            ("Transactions", "Write concern, read concern, change streams", (248, 113, 113)),
            ("Search & Vectors", "Atlas Search analysers, vector retrieval", (56, 189, 248)),
            ("Production & Capstone", "Replica sets, sharding, security, backup", (129, 140, 248)),
        ],
    },
    "oracle-database-path": {
        "title": "The Oracle Database Learning Path",
        "sub": "The order the Oracle Database course is taught at Archer Infotech, Pune",
        "stages": [
            ("Foundations", "Instance, schemas, tablespaces, 23ai, OCI", (56, 189, 248)),
            ("Core SQL", "DUAL, ROWNUM, NVL, format models", (129, 140, 248)),
            ("Schema Objects", "Types, constraints, sequences, dictionary", (168, 85, 247)),
            ("Joins & Subqueries", "ANSI syntax, EXISTS, the NOT IN trap", (45, 212, 191)),
            ("Advanced SQL", "Analytics, MERGE, CONNECT BY, PIVOT", (52, 211, 153)),
            ("PL/SQL Fundamentals", "Blocks, cursors, collections, exceptions", (250, 204, 21)),
            ("Packages & Programs", "Procedures, functions, packages", (251, 146, 60)),
            ("Triggers & Bulk", "BULK COLLECT, FORALL, dynamic SQL", (248, 113, 113)),
            ("Architecture", "SGA, PGA, background processes, undo", (56, 189, 248)),
            ("Multitenant", "CDB, PDB, Autonomous Database", (129, 140, 248)),
            ("Tuning & Physical Design", "Partitioning, plans, AWR, wait events", (168, 85, 247)),
            ("Production & Capstone", "RMAN, VPD, TDE, Data Guard, RAC", (45, 212, 191)),
        ],
    },
    "firebase-path": {
        "title": "The Firebase Learning Path",
        "sub": "The order the Firebase Development course is taught at Archer Infotech, Pune",
        "stages": [
            ("Platform Foundations", "Projects, the CLI, the emulator suite", (56, 189, 248)),
            ("Authentication", "Phone OTP, federated sign-in, custom claims", (129, 140, 248)),
            ("Firestore", "Query limits, indexes, aggregation, writes", (168, 85, 247)),
            ("Data Modelling", "Denormalising for cost, counters, hotspots", (45, 212, 191)),
            ("Security Rules", "Ownership, roles, validation, rule tests", (52, 211, 153)),
            ("Realtime & Offline", "Listeners, persistence, conflict handling", (250, 204, 21)),
            ("Serverless", "Functions triggers, Storage, Cloud Messaging", (251, 146, 60)),
            ("Delivery & Capstone", "Hosting, analytics, Genkit, cost control", (248, 113, 113)),
        ],
    },
    "salesforce-path": {
        "title": "The Salesforce Admin + Developer Learning Path",
        "sub": "The order the Salesforce Admin + Developer course is taught at Archer Infotech, Pune",
        "stages": [
            ("Platform & Data Model", "Orgs, objects, fields, relationships", (56, 189, 248)),
            ("Security & Access", "Permission sets, OWD, sharing rules", (129, 140, 248)),
            ("UI Configuration", "Lightning pages, dynamic forms, record types", (168, 85, 247)),
            ("Formulas & Validation", "Formula language, cross-object, rules", (45, 212, 191)),
            ("Flow Builder", "Record-triggered, screen, scheduled, faults", (52, 211, 153)),
            ("Data & Reporting", "Data Loader, duplicate rules, dashboards", (250, 204, 21)),
            ("Apex", "Types, collections, SOQL, SOSL, selectivity", (251, 146, 60)),
            ("Triggers & Limits", "Handler frameworks, bulk safety, async, tests", (248, 113, 113)),
            ("Lightning Web Components", "Decorators, wire, LDS, Jest", (56, 189, 248)),
            ("Integration & Release", "Named credentials, events, CLI, Git", (129, 140, 248)),
            ("AI, Capstone & Certification", "Data Cloud, Agentforce, ADM 201, PD1", (168, 85, 247)),
        ],
    },
    "selenium-java-path": {
        "title": "The Selenium with Java Learning Path",
        "sub": "The order the Selenium with Java course is taught at Archer Infotech, Pune",
        "stages": [
            ("Testing Fundamentals", "SDLC, STLC, test cases, defect life cycle", (56, 189, 248)),
            ("Core Java", "OOP, collections, exceptions, file handling", (129, 140, 248)),
            ("Selenium WebDriver", "Locators, XPath, waits, frames, tables", (168, 85, 247)),
            ("TestNG", "Annotations, DataProvider, parallel execution", (45, 212, 191)),
            ("Maven", "POM, dependencies, plugins, build lifecycle", (52, 211, 153)),
            ("Framework Development", "Page Object Model, Page Factory, hybrid", (250, 204, 21)),
            ("BDD with Cucumber", "Gherkin, feature files, step definitions", (251, 146, 60)),
            ("Reporting", "TestNG, Extent, Allure, screenshots", (248, 113, 113)),
            ("Git & Jenkins", "Branching, pull requests, CI triggers", (56, 189, 248)),
            ("AI-Assisted Testing", "Script generation, debugging, validation", (129, 140, 248)),
        ],
    },
    "selenium-python-path": {
        "title": "The Selenium with Python Learning Path",
        "sub": "The order the Selenium with Python course is taught at Archer Infotech, Pune",
        "stages": [
            ("Testing Fundamentals", "SDLC, STLC, test cases, defect management", (56, 189, 248)),
            ("Python", "Collections, functions, OOP, exceptions", (129, 140, 248)),
            ("Selenium WebDriver", "Locators, XPath, waits, frames, tables", (168, 85, 247)),
            ("PyTest", "Fixtures, parameterisation, markers, xdist", (45, 212, 191)),
            ("Framework Development", "Page Object Model, utilities, config", (52, 211, 153)),
            ("BDD with Behave", "Gherkin, feature files, step definitions", (250, 204, 21)),
            ("Reporting", "PyTest HTML, Allure, screenshots", (251, 146, 60)),
            ("Git & GitHub", "Branching, pull requests, code review", (248, 113, 113)),
            ("CI/CD with Jenkins", "Build triggers, scheduled runs, reports", (56, 189, 248)),
            ("AI-Assisted Testing", "Script generation, debugging, validation", (129, 140, 248)),
        ],
    },
    "playwright-path": {
        "title": "The Playwright with TypeScript Learning Path",
        "sub": "The order the Playwright course is taught at Archer Infotech, Pune",
        "stages": [
            ("Testing Fundamentals", "SDLC, test planning, defect management", (56, 189, 248)),
            ("JavaScript", "Functions, classes, promises, async/await", (129, 140, 248)),
            ("TypeScript", "Types, interfaces, generics, tsconfig", (168, 85, 247)),
            ("Playwright Fundamentals", "Contexts, role locators, auto-waiting", (45, 212, 191)),
            ("Advanced Automation", "Frames, tabs, uploads, tables", (52, 211, 153)),
            ("Test Framework", "Fixtures, parallel runs, retries, config", (250, 204, 21)),
            ("Page Object Model", "Base pages, components, test data", (251, 146, 60)),
            ("API & Visual Testing", "Request context, mocking, screenshots", (248, 113, 113)),
            ("Reporting & Debugging", "Allure, videos, Trace Viewer", (56, 189, 248)),
            ("CI/CD & AI Testing", "GitHub Actions, script generation, validation", (129, 140, 248)),
        ],
    },
    "api-testing-path": {
        "title": "The API Testing & Automation Learning Path",
        "sub": "The order the API Testing course is taught at Archer Infotech, Pune",
        "stages": [
            ("API Fundamentals", "REST, HTTP methods, status codes, JSON", (56, 189, 248)),
            ("Postman", "Requests, collections, environments, variables", (129, 140, 248)),
            ("Authentication", "API keys, Bearer, JWT, OAuth 2.0", (168, 85, 247)),
            ("Postman Automation", "Scripts, assertions, Collection Runner", (45, 212, 191)),
            ("API Documentation", "Swagger, OpenAPI, deriving tests from specs", (52, 211, 153)),
            ("Automation Framework", "Rest Assured, PyTest or Playwright", (250, 204, 21)),
            ("Advanced Testing", "Schema validation, contract, negative cases", (251, 146, 60)),
            ("Performance & Security", "Load basics, OWASP API security", (248, 113, 113)),
            ("Git & CI/CD", "Newman, Jenkins, GitHub Actions", (56, 189, 248)),
            ("AI-Assisted Testing", "Generation from specs, mocks, validation", (129, 140, 248)),
        ],
    },
    "software-testing-path": {
        "title": "The Software Testing & QA Learning Path",
        "sub": "The order the manual testing course is taught at Archer Infotech, Pune",
        "stages": [
            ("Testing Foundations", "Seven principles, verification, validation", (56, 189, 248)),
            ("SDLC & STLC", "Waterfall, V-Model, Agile, entry/exit criteria", (129, 140, 248)),
            ("Levels & Types", "Unit, integration, system, UAT, regression", (168, 85, 247)),
            ("Test Design", "Equivalence partitioning, boundary values", (45, 212, 191)),
            ("Advanced Design", "Decision tables, state transition, use cases", (52, 211, 153)),
            ("Exploratory Testing", "Charters, session-based management", (250, 204, 21)),
            ("Planning & Docs", "Test strategy, plans, traceability", (251, 146, 60)),
            ("Defect Management", "Life cycle, severity, priority, Jira, JQL", (248, 113, 113)),
            ("API Testing", "Postman collections, environments, assertions", (56, 189, 248)),
            ("ISTQB Foundation", "Full syllabus walkthrough and mock exams", (129, 140, 248)),
        ],
    },
    "codeleap-path": {
        "title": "The CodeLeap Learning Path",
        "sub": "The order the 8-week CodeLeap bootcamp is taught at Archer Infotech, Pune",
        "stages": [
            ("Python Programming", "Weeks 1-2 — syntax, logic, first projects", (56, 189, 248)),
            ("Web Development", "Weeks 3-4 — HTML, CSS, JavaScript, deployed site", (129, 140, 248)),
            ("AI & Smart Tools", "Weeks 5-6 — AI tools, APIs, a mini-application", (168, 85, 247)),
            ("GitHub & Portfolio", "Week 7 — version control, public profile", (45, 212, 191)),
            ("Career Preparation", "Week 8 — resume, LinkedIn, communication", (52, 211, 153)),
        ],
    },
    "careercode-path": {
        "title": "The CareerCode Semester Path",
        "sub": "How CareerCode runs alongside an engineering degree at Archer Infotech, Pune",
        "stages": [
            ("Choose Your Track", "Frontend, Backend, Full Stack, Data, AI/ML, DBA", (56, 189, 248)),
            ("Semester 1-2", "Programming foundations and one core language", (129, 140, 248)),
            ("Semester 3-4", "Core track skills and real coursework projects", (168, 85, 247)),
            ("Semester 5-6", "Advanced track topics and a reviewed project", (45, 212, 191)),
            ("Semester 7-8", "Capstone, portfolio and placement readiness", (52, 211, 153)),
            ("Internship Prep", "Aptitude, communication, interviews, referrals", (250, 204, 21)),
        ],
    },
    "techready-path": {
        "title": "The TechReady Intensive Path",
        "sub": "The shared shape of all ten TechReady programmes at Archer Infotech, Pune",
        "stages": [
            ("Language Core", "4 weeks — Java, Python, JavaScript or C#", (56, 189, 248)),
            ("Advanced Language", "3-4 weeks — depth, patterns, problem solving", (129, 140, 248)),
            ("Backend & Frameworks", "5 weeks — Spring Boot, Django, Node or .NET", (168, 85, 247)),
            ("Frontend", "5 weeks — React, Angular or advanced UI", (45, 212, 191)),
            ("Databases", "3 weeks — SQL, NoSQL, modelling, queries", (52, 211, 153)),
            ("DevOps & Deployment", "2 weeks — Git, Docker, CI/CD, cloud basics", (250, 204, 21)),
            ("Capstone Project", "4-6 weeks — a reviewed, portfolio-grade build", (251, 146, 60)),
            ("Placement Prep", "Ongoing — aptitude, mocks, resume, referrals", (248, 113, 113)),
        ],
    },
}


def rounded(d, box, radius, outline, width=3, fill=None):
    d.rounded_rectangle(box, radius=radius, outline=outline, width=width, fill=fill)


def glow(base, box, radius, colour):
    """Cheap outer glow: successively fainter rounded strokes."""
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(layer)
    for i, alpha in ((6, 26), (4, 40), (2, 70)):
        gd.rounded_rectangle(
            [box[0] - i, box[1] - i, box[2] + i, box[3] + i],
            radius=radius + i, outline=colour + (alpha,), width=2,
        )
    base.alpha_composite(layer)


def build(stem, spec):
    stages = spec["stages"]
    n = len(stages)
    H = TOP_BLOCK + n * BOX_H + (n - 1) * GAP + BOTTOM_BLOCK

    img = Image.new("RGBA", (W, H), BG_TOP + (255,))
    d = ImageDraw.Draw(img)
    for y in range(H):
        t = y / (H - 1)
        c = tuple(round(BG_TOP[i] + (BG_BOT[i] - BG_TOP[i]) * t) for i in range(3))
        d.line([(0, y), (W, y)], fill=c + (255,))
    for x in range(0, W, 34):
        for y in range(0, H, 34):
            d.point((x, y), fill=(70, 96, 130, 255))

    top, left, right = TOP_BLOCK, 60, W - 60

    # Glows first, compositing onto the base. ImageDraw must be re-bound after
    # this: the earlier version kept drawing through the pre-composite handle,
    # which is why every stage title came out ghosted while the smaller
    # description text underneath rendered solid.
    for i, (_, _, colour) in enumerate(stages):
        y0 = top + i * (BOX_H + GAP)
        glow(img, (left, y0, right, y0 + BOX_H), 14, colour)

    # Flatten to RGB before drawing anything else. ImageDraw writes RGBA
    # values straight into the buffer instead of alpha-blending them, so on an
    # RGBA canvas the translucent box fill and the text end up fighting — which
    # is why the stage names rendered as faint outlines while the step numbers,
    # same font and size, came out solid. On RGB there is no alpha to mishandle.
    img = img.convert("RGB")
    d = ImageDraw.Draw(img)

    f_title = ImageFont.truetype(BOLD, 34)
    f_sub = ImageFont.truetype(REG, 17)
    f_stage = ImageFont.truetype(BOLD, 21)
    f_desc = ImageFont.truetype(REG, 14)
    f_brand = ImageFont.truetype(BOLD, 15)
    f_small = ImageFont.truetype(REG, 12)

    d.text((60, 48), spec["title"], font=f_title, fill=INK)
    d.text((60, 92), spec["sub"], font=f_sub, fill=MUTED)

    for i, (name, desc, colour) in enumerate(stages):
        y0 = top + i * (BOX_H + GAP)
        box = (left, y0, right, y0 + BOX_H)
        # Slightly lifted panel, mixed by hand rather than via alpha.
        panel = tuple(round(BG_TOP[k] + (colour[k] - BG_TOP[k]) * 0.10) for k in range(3))
        d.rounded_rectangle(box, radius=14, fill=panel, outline=colour, width=3)
        d.text((left + 26, y0 + 13), name, font=f_stage, fill=INK)
        d.text((left + 26, y0 + 39), desc, font=f_desc, fill=MUTED)
        d.text((right - 54, y0 + 18), f"{i + 1:02d}", font=f_stage, fill=colour)
        if i < n - 1:
            cx = left + 46
            ay0, ay1 = y0 + BOX_H + 3, y0 + BOX_H + GAP - 3
            d.line([(cx, ay0), (cx, ay1)], fill=colour, width=2)
            d.polygon([(cx - 5, ay1 - 5), (cx + 5, ay1 - 5), (cx, ay1 + 2)], fill=colour)

    d.text((60, H - 52), "ARCHER INFOTECH", font=f_brand, fill=INK)
    d.text((60, H - 31), "Kothrud, Pune  |  archerinfotech.in", font=f_small, fill=MUTED)
    tail = spec.get("tail", "LEARN TODAY  |  BUILD TOMORROW")
    d.text((W - 60 - d.textlength(tail, font=f_small), H - 31), tail,
           font=f_small, fill=MUTED)

    out = img
    out.save(f"public/images/courses/{stem}-v1.webp", "WEBP", quality=88, method=6)
    out.save(f"public/images/courses/{stem}-v1.avif", "AVIF", quality=70)
    return out.size


if __name__ == "__main__":
    for stem, spec in COURSES.items():
        size = build(stem, spec)
        print(f"  {stem}-v1.webp  {size[0]}x{size[1]}")
