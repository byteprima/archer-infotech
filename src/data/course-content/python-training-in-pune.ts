import type { CourseRichContent } from "./types";

export const pythonTrainingInPune: CourseRichContent = {
  intro:
    "Python is the fastest path from 'I have never coded' to a working programmer in Pune's IT job market. It powers data science, AI/LLM integration, automation, web backends (Django, FastAPI), and the scripting layer of every cloud platform. Indeed Pune lists 1,000+ active Python roles as of 2026 — across product engineering at Persistent Systems and BMW TechWorks India, data and analytics at Tiger Analytics and Fractal, and IT services at TCS, Infosys, and Cognizant. Archer Infotech's Python training in Pune teaches Python as it is actually used in 2026 — Python 3.13, FastAPI for AI-glue services, Django 5 with async, pandas 2 + NumPy 2 + scikit-learn, and direct hands-on with LLM APIs. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Python in 2026",
    paragraphs: [
      "Python has the lowest learning curve of any production language and the highest demand growth of any backend language in India over the last three years. Indeed Pune lists more than 1,000 active Python roles as of May 2026, spanning IT services, product engineering, data and analytics, and engineering R&D. Tiger Analytics, Fractal Analytics, ZS Associates, MathCo, and Persistent Systems are all hiring Python developers in Pune today. The language is also the de-facto layer for AI integration — every Pune fintech, healthtech, and SaaS team building LLM features writes the glue code in Python.",
      "What changed in 2026: Python 3.13 is the production default and ships free-threaded mode (no-GIL) as a beta build, FastAPI has matured into the dominant framework for AI/LLM-glue microservices, Django 5 has full async support across ORM, views, and middleware, and the data stack (pandas 2 with Arrow backend, NumPy 2, scikit-learn 1.5+) is faster and more memory-efficient than the 2020-era stack most legacy courses still teach.",
      "What this means for hiring in Pune: job descriptions increasingly call out specific combinations — Python + FastAPI + LLM API + vector database (pgvector, Pinecone, Weaviate), or Python + Django + Celery + Postgres + Docker, or Python + pandas + scikit-learn + MLflow. Archer Infotech's curriculum is rebuilt around these actual JD patterns, not a generic 2020 syllabus.",
    ],
    keyPoints: [
      "Python 3.13 with free-threaded mode and JIT improvements",
      "FastAPI for AI-glue services, Django 5 for production web apps",
      "pandas 2 with Arrow backend, NumPy 2, scikit-learn 1.5+, PyTorch 2.4+",
      "LLM integration — OpenAI / Anthropic SDKs, LangChain, LlamaIndex, vector DBs",
      "Pune market reality — 1,000+ active Indeed Python listings, growing year-on-year",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student looking for your first IT or data role in Pune",
      "Working professional in a non-Python stack wanting to switch into data, ML, or AI engineering",
      "BSc graduate or 12th-passout looking for the lowest-friction entry into a programming career",
      "Career restarter (took a break, raising a family, switching from non-tech) re-entering software",
      "Domain expert (analytics, finance, biology) who wants to add Python to your toolkit for data work",
    ],
    notForYou: [
      "If you are targeting core-banking or large-team Cognizant-style enterprise Java work — pick Java Full Stack instead, both have ample Pune jobs",
      "If your goal is Android / iOS native development — Python is not your path",
      "If you expect a guaranteed ₹10L+ fresher offer — Pune junior Python ranges ₹2L–₹4L; the ₹10L+ roles need 3+ years or specialisation",
      "If you will not put in 8–10 hours of practice per week outside class — Python is forgiving but not magical",
      "If you want certificate-only learning with no projects — Pune hiring managers screen on portfolio, not certificates",
    ],
  },

  curriculum: [
    {
      title: "Python Fundamentals",
      weekRange: "Weeks 1–2",
      description:
        "Set up Python 3.13 with virtual environments and pip, write your first script, then move into the language properly — variables, primitive types, control flow, functions, and the rich literal syntax (f-strings, list comprehensions). By the end of this module you'll be comfortable reading any Python codebase and writing 100-line scripts without lookup. We use modern tooling — uv or poetry for environments, ruff for formatting, mypy for type hints — so you absorb professional habits from day one.",
      topics: [
        "Python 3.13 installation and virtual environments",
        "Variables, primitive types, and dynamic typing",
        "Control flow — if / for / while / match-case",
        "Functions, default arguments, *args / **kwargs",
        "f-strings and formatted output",
        "Type hints (PEP 484) and mypy basics",
        "Errors and exception handling",
      ],
    },
    {
      title: "Data Structures & Comprehensions",
      weekRange: "Weeks 3–4",
      description:
        "Lists, tuples, sets, dictionaries — when each is the right choice and how each is implemented (CPython internals at a useful level). Comprehensions for declarative data transformation, generator expressions for lazy evaluation, and the collections module for specialised structures (defaultdict, Counter, deque). We finish with a small project that uses all four core structures in their idiomatic forms.",
      topics: [
        "Lists, tuples, sets, dictionaries — costs and trade-offs",
        "List, set, dict comprehensions",
        "Generators and lazy evaluation",
        "collections module — Counter, defaultdict, deque",
        "itertools and functools essentials",
        "Mutability and shared-reference pitfalls",
      ],
    },
    {
      title: "Object-Oriented Python",
      weekRange: "Week 5",
      description:
        "Classes, instances, inheritance, polymorphism, and Python's distinctive features — properties, dunder methods, dataclasses (the modern way to write 80% of classes), and Protocol typing. Includes the discipline that hiring panels test for — when to use a class vs a function, when to use composition over inheritance, and how to design for testability.",
      topics: [
        "Classes, __init__, instance vs class attributes",
        "Inheritance and method resolution order (MRO)",
        "Properties and descriptors",
        "Dunder / magic methods",
        "Dataclasses and attrs",
        "Protocol typing (PEP 544)",
        "Composition over inheritance",
      ],
    },
    {
      title: "File I/O, JSON, and Working with the Filesystem",
      weekRange: "Week 6",
      description:
        "Read and write text and binary files using context managers, parse and emit JSON, walk directory trees with pathlib (the modern replacement for os.path), and work with CSV and Excel data using pandas. Covers the patterns Pune SaaS and analytics teams use daily — log parsing, batch file processing, scheduled report generation.",
      topics: [
        "Context managers and the with statement",
        "JSON read / write / streaming",
        "pathlib for filesystem operations",
        "CSV and Excel via pandas",
        "Working with environment variables",
      ],
    },
    {
      title: "Web Backends — Django 5 + FastAPI",
      weekRange: "Weeks 7–8",
      description:
        "Two frameworks, two use cases. Django 5 for full-feature web apps with admin, ORM, auth, templates, and async views — the framework powering most Pune SaaS and IT-services Python backends. FastAPI for high-performance API services and AI-glue microservices — the framework Pune fintech and ML-platform teams ship today. Both delivered hands-on, not lectured.",
      topics: [
        "Django 5 — models, views, templates, admin, async views",
        "Django REST Framework basics",
        "FastAPI — Pydantic v2, async endpoints, dependency injection",
        "Authentication — Django auth, FastAPI + JWT",
        "Database integration — Postgres + SQLAlchemy 2 / Django ORM",
        "Migrations and database evolution",
      ],
    },
    {
      title: "Data Science & Analytics with Python",
      weekRange: "Weeks 9–10",
      description:
        "The data stack as it is actually used in 2026 — pandas 2 with Arrow backend (10–100× faster than legacy pandas on common operations), NumPy 2, scikit-learn 1.5+, matplotlib + seaborn for visualisation. Build a real end-to-end project — load a public dataset, clean and feature-engineer with pandas, train a model with scikit-learn, evaluate with cross-validation, and produce a report. This module alone qualifies you for entry-level data analyst roles in Pune.",
      topics: [
        "pandas 2 — DataFrames, Arrow backend, performance",
        "NumPy 2 — arrays, vectorisation, broadcasting",
        "Data cleaning and feature engineering",
        "Visualisation — matplotlib, seaborn, plotly",
        "scikit-learn — pipelines, cross-validation, common models",
        "Train/test discipline and model evaluation",
      ],
    },
    {
      title: "AI & LLM Integration",
      weekRange: "Week 11",
      description:
        "The 2026 differentiator. Integrate OpenAI and Anthropic APIs into a Python backend, build a retrieval-augmented generation (RAG) pipeline with a vector database, use LangChain or LlamaIndex for orchestration, and ship a small AI-powered service. This module is what separates 2026 Pune Python hiring from 2022 Pune Python hiring.",
      topics: [
        "OpenAI and Anthropic SDKs",
        "Embeddings and vector databases (pgvector, Pinecone, Weaviate)",
        "Retrieval-augmented generation (RAG)",
        "LangChain and LlamaIndex orchestration basics",
        "Prompt design for production",
        "Cost, rate limits, and observability for LLM calls",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Week 12 + 2 weeks placement prep",
      description:
        "Pick one of three capstone projects (see Capstone Projects). Two weeks of full-time project work plus mock interviews with Pune company question banks (TCS, Infosys, Persistent, Tiger Analytics, Fractal). DSA refresher targeting screening rounds, resume + LinkedIn polish, GitHub cleanup, and HR mock interviews including salary negotiation.",
      topics: [
        "Capstone project — full implementation, deployment, README",
        "Code review with the lead trainer",
        "Technical mock interviews — 3 rounds",
        "DSA refresher targeted at screening patterns",
        "Resume + LinkedIn rewrite",
        "GitHub portfolio polish",
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
      title: "FastAPI + LLM-Powered REST Service",
      description:
        "Build a FastAPI backend with JWT auth, Postgres, and an LLM-integrated endpoint — for example, a document Q&A service that ingests PDFs, embeds chunks into pgvector, and answers user queries via OpenAI or Anthropic. Includes rate limiting, structured logging, and a basic dashboard. Deploy to AWS or Render. Outcome: a public GitHub repo demonstrating the exact stack Pune AI-platform teams want to see in interviews.",
      technologies: [
        "FastAPI",
        "Python 3.13",
        "PostgreSQL + pgvector",
        "OpenAI / Anthropic SDK",
        "JWT auth",
        "Docker",
        "AWS or Render",
      ],
    },
    {
      title: "Django 5 SaaS Application",
      description:
        "A multi-user web application with Django 5 — user auth, role-based permissions, a custom admin interface, async views for long-running tasks, Celery + Redis for background jobs, and Postgres as the database. Pick a real domain — expense tracker, asset manager, ticketing system. Deployed to a cloud provider with Nginx + Gunicorn, includes basic monitoring.",
      technologies: [
        "Django 5",
        "Django REST Framework",
        "Celery + Redis",
        "PostgreSQL",
        "Nginx + Gunicorn",
        "Docker Compose",
        "AWS or DigitalOcean",
      ],
    },
    {
      title: "End-to-End Data Science Project",
      description:
        "Pick a public dataset (Kaggle or Indian government open data), build the full pipeline — data cleaning with pandas 2, exploratory analysis, feature engineering, model training with scikit-learn, evaluation, and a deployment as a small FastAPI inference endpoint with MLflow tracking. Outcome: a Jupyter notebook plus a deployed prediction API — the combo Pune data and analytics teams interview on.",
      technologies: [
        "pandas 2",
        "NumPy 2",
        "scikit-learn",
        "matplotlib + seaborn",
        "MLflow",
        "FastAPI inference endpoint",
        "Jupyter / VS Code",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Patil, a Senior Corporate Trainer with over 10 years of demonstrated history in Pune's IT training industry. Amol writes Python every day across full-stack and data-engineering work and personally leads every Python batch from setup through capstone.",

  careerOutcomes: {
    paragraphs: [
      "Python developers are among the most-hired roles in Pune's IT corridor — Indeed lists over 1,000 active Pune Python openings as of May 2026, growing year-on-year. Salary depends heavily on specialisation (web vs data vs AI/ML) and project depth, not raw years of experience.",
      "What pulls a Python developer above the average band: a public GitHub portfolio with at least one deployed FastAPI or Django project, demonstrable data-science work (a clean Kaggle-style notebook), and one LLM-integrated project. Our capstone projects are designed exactly around these signals.",
      "Senior and Lead Python bands below are national figures (Pune-specific Indeed pages do not exist for these roles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr aggregations.",
    ],
    salaryBands: [
      {
        role: "Junior Python Developer (Pune)",
        band: "₹18,628 per month (~₹2.2 lakh per year)",
        source: {
          label: "Indeed Pune (Junior Python Developer)",
          url: "https://in.indeed.com/career/junior-python-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Python Developer overall — Pune",
        band: "₹7,59,185 per year",
        source: {
          label: "Indeed Pune (updated April 2026)",
          url: "https://in.indeed.com/career/python-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Python Developer Pune (Glassdoor estimate)",
        band: "₹5,00,000 base / ₹5,50,000 total",
        source: {
          label: "Glassdoor Pune",
          url: "https://www.glassdoor.co.in/Salaries/pune-python-developer-salary-SRCH_IL.0,4_IM1072_KO5,21.htm",
        },
      },
      {
        role: "Senior Python Developer (national, 7–10 years)",
        band: "₹15,00,000 – ₹25,00,000 per year",
        source: {
          label: "Industry aggregation 2026",
          url: "https://www.upgrad.com/blog/python-developer-salary-in-india/",
        },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
      "Atos / Eviden",
      "BMW TechWorks India",
      "Tiger Analytics",
      "Fractal Analytics",
      "ZS Associates",
      "MathCo",
      "Synechron",
      "Mercedes-Benz R&D India",
      "Cummins India",
      "Honeywell",
      "John Deere ETC",
    ],
    rolesAfterCourse: [
      "Python Developer",
      "Backend Engineer (FastAPI / Django)",
      "Data Analyst",
      "Junior Data Scientist",
      "ML Engineer (with self-study)",
      "AI/LLM Integration Engineer",
      "Automation Engineer",
      "Software Engineer at IT services",
    ],
  },

  modesAndDuration: {
    duration:
      "3 months of structured curriculum (12 weeks) plus 2 weeks of capstone project work and interview preparation",
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
        "Stretches over 5 months instead of 3 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with extended interview prep and the AI/LLM module; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 8 of the course, not at the end. By the time you finish the curriculum, your resume is ready, your GitHub is presentable, and you have completed at least three mock technical interviews against question banks from Pune product, services, and analytics companies.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 8 — resume and LinkedIn rewrite, with feedback from a trainer who has hired",
      "Week 9 — GitHub portfolio cleanup, public READMEs, deployment links",
      "Weeks 10–11 — DSA quick refresher targeting screening patterns at TCS, Persistent, Tiger Analytics",
      "Weeks 11–12 — three rounds of mock technical interviews",
      "Week 12 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at partner companies",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
      "Tiger Analytics",
      "Fractal Analytics",
      "ZS Associates",
      "Synechron",
      "Mercedes-Benz R&D India",
      "Cummins",
      "Honeywell",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune Python training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Amol Patil, Senior Corporate Trainer",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Python version covered",
        archer: "Python 3.13 with Python 3.12 fallback",
        typical: "Often Python 3.10 or generic 'Python 3'",
      },
      {
        feature: "Web framework coverage",
        archer: "Both Django 5 (full stack) and FastAPI (AI-glue)",
        typical: "One framework or just Flask",
      },
      {
        feature: "Data science stack",
        archer: "pandas 2, NumPy 2, scikit-learn 1.5+, real Kaggle-style project",
        typical: "Topic list only with no project work",
      },
      {
        feature: "AI / LLM integration module",
        archer: "Yes — OpenAI/Anthropic SDK, RAG, vector DB, LangChain",
        typical: "Not covered or marketing-only mention",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — public repository per student",
        typical: "Rare",
      },
      {
        feature: "Salary data",
        archer: "Cited from Indeed Pune + Glassdoor with source URLs",
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
    heading: "Python vs Java — Which to Learn First in 2026",
    paragraphs: [
      "If your goal is data, ML, AI/LLM-integration, scripting, or automation jobs, Python wins on time-to-first-paycheck — the Pune market for 'Python + AI glue' roles is wider than ever. Tiger Analytics, Fractal, ZS Associates, MathCo, and most fintech AI teams hire Python far more than Java.",
      "If your goal is enterprise backend engineering — banking, large-team Java-shop work at Cognizant, Synechron, or Bajaj Finserv Pune — Java is still the higher-floor language, and Python alone won't get you in. Java has roughly 14% more open jobs in India than Python on LinkedIn, but the volumes are close enough that the choice should be by goal, not by job count.",
      "Honest answer for most Pune freshers: start with Python because the entry barrier is lower, get placed, then add Java if you pivot to enterprise. Mid-career engineers already in Java should add Python as a secondary skill, not replace. Many of our students do both — start here, get a job, then add the second language as a side study.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites are minimal — basic computer use, logical thinking, and willingness to commit 8–10 hours per week of practice outside class. No prior programming experience required; we start from `print('Hello, world!')` on day one. If you have done a 12th-standard computer-science course, you will move slightly faster but won't be ahead of where the course expects.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal",
      "Confirm enrolment and complete pre-course orientation",
      "Show up to day one with a laptop running 64-bit OS — Python installation is part of session 1",
    ],
  },

  faqs: [
    {
      question: "What is the Python course fee in Pune at Archer Infotech?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. The higher end covers placement-track classroom batches with extended interview prep and the AI/LLM module; the lower end covers concession-eligible online or weekend formats. Placement support is included in every fee tier.",
    },
    {
      question: "How long is the Python training course in Pune?",
      answer:
        "Three months (12 weeks) of structured curriculum plus 2 weeks of capstone and interview preparation. The weekend batch stretches over 5 months at the same content depth, designed for working professionals.",
    },
    {
      question: "Is Python better than Java for beginners in 2026?",
      answer:
        "Python has a lower learning curve and lets you build something useful faster — better for absolute beginners. Java has slightly more open jobs in Pune. For most freshers we recommend Python first, then add Java later if you pivot to enterprise. Both languages have ample Pune demand.",
    },
    {
      question: "What is the salary of a Python developer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹7.59 lakh per year for Python Developer (April 2026). Junior Python Developer Pune averages around ₹2.2 lakh per year (₹18,628 per month). Senior Python developers with 7+ years earn ₹15–25 lakh per year nationally; Pune trends within ±10% of these figures.",
    },
    {
      question: "Which companies in Pune hire Python developers?",
      answer:
        "Persistent Systems, TCS, Infosys, Cognizant, Capgemini, Atos/Eviden, BMW TechWorks India, Tiger Analytics, Fractal Analytics, ZS Associates, MathCo, Synechron, Mercedes-Benz R&D India, Cummins, Honeywell, and John Deere ETC are among the top Pune employers actively hiring Python developers in 2026.",
    },
    {
      question: "Do I need a coding background to learn Python?",
      answer:
        "No — we start from absolute basics. The course is designed for first-time programmers. What you do need is 8–10 hours per week of practice outside class. Coding is learned by writing code; passive watching does not transfer.",
    },
    {
      question: "Is Python certification worth it for jobs in Pune?",
      answer:
        "Pune hiring managers screen on portfolio over certificates. A clean public GitHub with one deployed FastAPI or Django project plus one data-science notebook beats any certification at the screening stage. We help you build exactly this portfolio during the course.",
    },
    {
      question: "Can I learn Python and switch to data science / AI later?",
      answer:
        "Yes — and the course is designed for this. The curriculum includes a full data-science module (pandas 2, NumPy, scikit-learn) and an AI/LLM integration module. After the course, many of our students take a focused data-science specialisation as a follow-up — but the foundation set here is enough for entry-level data analyst and Python-with-AI roles.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) FastAPI + LLM-powered REST service with vector DB, (2) Django 5 SaaS application with Celery and Redis, (3) end-to-end data science project with pandas, scikit-learn, and a deployed inference endpoint. All three become public GitHub repositories.",
    },
    {
      question: "Are weekend Python classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over 5 months instead of 3. Same content, same trainers, same projects. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "Do you cover Django and FastAPI both, or only one?",
      answer:
        "Both. Django 5 for full-feature web applications (the framework powering most Pune SaaS Python backends) and FastAPI for high-performance APIs and AI-glue services (the framework Pune fintech and ML-platform teams ship today). You will build at least one project in each.",
    },
    {
      question: "Is the AI/LLM module included or extra?",
      answer:
        "Included in every batch. You will integrate OpenAI and Anthropic APIs into a Python backend, build a retrieval-augmented generation (RAG) pipeline with a vector database, and ship a small AI-powered service. This is what separates 2026 Pune Python hiring from 2022 Pune Python hiring.",
    },
    {
      question: "Can a fresher get a Python job in Pune?",
      answer:
        "Yes — Indeed Pune lists 1,000+ active Python roles as of May 2026, including entry-level positions at IT services (TCS, Infosys, Cognizant, Capgemini), product engineering, and analytics companies. Junior Pune Python entry typically starts around ₹2–4 lakh per year, with strong growth from year 2.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews, referrals via our alumni network, resume and LinkedIn rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "Is the named trainer actually teaching, or just on the brochure?",
      answer:
        "Amol Patil personally leads every Python batch from setup through capstone — the same name on this page is the same person you meet on day one. His LinkedIn is on the trainer profile page; we welcome a 30-minute conversation with him before you enrol.",
    },
  ],

  finalCta: {
    heading: "Ready to start Python training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol is happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see the classroom, and decide with full information.",
  },
};
