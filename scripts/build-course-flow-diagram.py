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
    tail = "LEARN TODAY  |  BUILD TOMORROW"
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
