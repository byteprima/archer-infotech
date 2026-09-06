import type { CourseRichContent } from "./types";

export const chatgptLlmsTrainingInPune: CourseRichContent = {
  intro:
    "ChatGPT and the wider OpenAI ecosystem dominate enterprise AI adoption in Pune — most Pune fintech / SaaS / consumer-tech teams that ship LLM features run primarily on OpenAI APIs (GPT-5, GPT-4.1, Embeddings, Whisper, Sora, plus Custom GPTs and the Assistants API). Archer Infotech's ChatGPT & LLMs training in Pune is the focused track for engineers and product teams that want OpenAI-ecosystem depth — distinct from our broader Generative AI course (which covers Claude / Gemini / open-source as well). The track teaches the OpenAI API surface in detail (Chat Completions, function calling, structured output, Batch API, Realtime API, Vector Stores, Assistants API, Custom GPTs), fine-tuning workflows, plus the production patterns (FastAPI streaming, cost / latency / safety controls, Langfuse observability). Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn ChatGPT & LLMs in 2026",
    paragraphs: [
      "OpenAI remains the most-deployed frontier-model vendor in Pune product engineering — Indeed Pune lists 300+ active openings that explicitly call out 'OpenAI', 'ChatGPT API', or 'GPT' as required, plus a few hundred more that list it as preferred. The biggest employers shipping OpenAI-powered features are Persistent Systems, BMC Software, Bajaj Finserv, BharatPe Pune, Razorpay Pune, plus the Pune SaaS scene (Amagi, Fyllo, Drip Capital, Innovaccer Pune, Whatfix Pune). Compensation for AI Engineers with demonstrable OpenAI integration runs at the top of Pune's IT corridor.",
      "What changed in 2026: GPT-5 (released late 2025) is the production frontier model, with GPT-4.1 as a faster / cheaper alternative for many use cases. The Assistants API has matured for stateful workflows (Custom GPTs in the consumer product, Assistants API in the developer product). Structured Outputs guarantees JSON-schema compliance. The Batch API offers 50% cost savings for non-real-time workloads. The Realtime API enables voice-first applications. Fine-tuning with reinforcement learning (RFT) has moved from preview to GA. Plus the Vector Store integration in the Assistants API has consolidated the RAG pattern.",
      "What this means for hiring: 2026 Pune ChatGPT / LLM JDs expect OpenAI SDK fluency in Python and TypeScript, function calling and structured outputs, basic RAG implementation, plus the production engineering layer (streaming, cost monitoring, safety filtering). Senior roles add fine-tuning, multi-model orchestration, and evaluation discipline.",
    ],
    keyPoints: [
      "300+ active Pune openings explicitly require 'OpenAI' or 'ChatGPT API' (May 2026)",
      "GPT-5 + GPT-4.1 + Assistants API + Realtime API + Batch API — the modern OpenAI surface",
      "Structured Outputs + function calling + Vector Stores — the production patterns",
      "Senior AI Engineer compensation regularly hits ₹30–50 lakh in Pune",
      "Distinct from broader Generative AI course — OpenAI-ecosystem depth",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Working backend / full-stack developer wanting to add OpenAI integration to your skill stack",
      "Working product manager or solutions architect wanting hands-on depth before commissioning AI features",
      "Working AI engineer wanting to deepen specifically on the OpenAI ecosystem",
      "Engineering / BCS / MCA student targeting Pune AI Engineer / GenAI Engineer roles",
      "Domain expert (legal, medical, financial, education) wanting to ship an OpenAI-powered product in your domain",
    ],
    notForYou: [
      "If you have no Python experience — take our Python course first; this assumes Python fluency",
      "If you want broad multi-model AI / GenAI training — take our Generative AI course (covers Claude / Gemini / open-source too)",
      "If you cannot put in 8–10 hours per week of practice outside class",
      "If you want certificate-only learning with no portfolio — Pune AI hiring screens hard on real deployed work",
      "If you have 2+ years of production OpenAI / LLM work — talk to us about advanced fine-tuning / RAG specialisations",
    ],
  },

  curriculum: [
    {
      title: "LLM Foundations and the OpenAI Ecosystem",
      weekRange: "Week 1",
      description:
        "The course opens with the mental model every later module depends on: what a Large Language Model is, what it can do reliably, and where it fails. You learn the OpenAI model family in practical terms — GPT-5 and GPT-4.1 for reasoning and general application work, smaller models for low-cost throughput, embedding models for retrieval, Whisper for speech, and multimodal models for images and documents.\n\nThe setup work is deliberately hands-on. Students configure API keys, install the Python and TypeScript SDKs, use the Playground for fast experiments, and build a first chat-completion call that logs request, response, token usage and cost. By the end of the week you can explain the difference between a chat UI and an LLM API, and you have a working local environment ready for the rest of the course.",
      topics: [
        "OpenAI model family — GPT-5, GPT-4.1, smaller models, embeddings, Whisper",
        "Model selection criteria — quality / cost / latency",
        "Python SDK + TypeScript SDK setup",
        "API key management",
        "OpenAI Playground for prototyping",
        "Cost dashboards and rate limits",
        "First chat-completion call with token logging",
      ],
    },
    {
      title: "Chat Completions, Prompts, Streaming and State",
      weekRange: "Week 2",
      description:
        "Once the environment works, the API surface becomes the subject. You study system, user and assistant messages, when to keep state in your application instead of assuming the model remembers, how temperature and token limits affect output, and why prompt templates should live in code rather than in someone’s notes app.\n\nThe module then moves from a blocking response to a production-style streamed response. Students wire Server-Sent Events into a small chat endpoint, add graceful timeout handling, and compare the user experience of streaming with a plain request-response flow. The goal is not only to make a chat box, but to understand the request lifecycle of an LLM feature.",
      topics: [
        "Chat Completions API",
        "Roles — system / user / assistant",
        "Temperature, top_p, max_tokens",
        "Conversation state in your application",
        "Prompt templates in source control",
        "Streaming with SSE",
        "Timeouts, retries and user-facing errors",
      ],
    },
    {
      title: "Structured Outputs, Schemas and Reliable Extraction",
      weekRange: "Week 3",
      description:
        "The third week turns natural-language output into software you can trust. You learn Structured Outputs with JSON Schema, schema-constrained generation, Pydantic validation, retry-and-repair loops, and the difference between asking a model to 'return JSON' and requiring a shape your application can parse.\n\nHands-on labs focus on practical extraction: pulling fields from resumes, invoices, support tickets and product documents; validating the output; and writing tests that catch schema drift. This is the point where students begin thinking like application engineers rather than prompt users, because every response must either pass a contract or fail safely.",
      topics: [
        "Structured Outputs with JSON schema",
        "Schema-constrained generation",
        "Pydantic validation",
        "Retry-and-repair patterns",
        "Reliable data extraction",
        "Prompt regression tests",
        "Prompt versioning",
      ],
    },
    {
      title: "Function Calling & Tool Use",
      weekRange: "Week 4",
      description:
        "Function calling is where an LLM stops being a text generator and starts becoming part of a workflow. You define tools with JSON schemas, let the model choose when to call them, execute those tools in your code, and return observations to the model for the next step.\n\nThe engineering discipline gets equal weight: tool arguments must be validated, database access must be parameterised, external API calls need retries, and dangerous actions need approval gates. Students build a small assistant that combines a calculator, a database lookup and a REST API call, then intentionally break it to learn how tool misuse appears in logs.",
      topics: [
        "Function calling — schema description",
        "Request-response loop",
        "Parallel tool calling",
        "Tool design — idempotency, validation",
        "Error handling and retry",
        "Read-only vs write tools",
        "Approval gates for sensitive actions",
        "Multi-step assistants",
      ],
    },
    {
      title: "Embeddings, Vector Stores & RAG",
      weekRange: "Week 5",
      description:
        "This week teaches the most common enterprise LLM pattern: grounding a model in documents instead of hoping it already knows the answer. You learn embeddings, vector similarity, chunking, metadata, retrieval quality and the difference between semantic search and keyword search.\n\nThe implementation uses both managed and self-hosted paths. Students build one RAG prototype with OpenAI Vector Stores and File Search, then compare it with a simple pgvector or Chroma implementation so they understand what the managed layer hides. The module closes with citation-aware answers and a small evaluation sheet that records whether the right chunks were retrieved.",
      topics: [
        "text-embedding-3-large / -small",
        "OpenAI Vector Stores",
        "pgvector / Chroma / Weaviate alternatives",
        "Chunking strategies",
        "Hybrid retrieval and reranking",
        "Assistants API File Search (managed RAG)",
        "Citation-aware generation",
        "Retrieval quality checks",
      ],
    },
    {
      title: "Custom GPTs, Assistants API & Realtime API",
      weekRange: "Week 6",
      description:
        "After the raw APIs, students study the productised OpenAI surfaces and learn when each belongs in a real organisation. Custom GPTs are treated as the fast internal-tool path for business users. The Assistants API is treated as the developer path for stateful applications with tools, files and longer-running work. The Realtime API introduces voice and low-latency interaction patterns.\n\nThe practical output is a decision matrix: when to use a Custom GPT, when to build on Assistants, when to stay with raw chat completions, and when the complexity is not justified. Students build a small assistant with files, tools and conversation state, then compare the trade-offs against the earlier FastAPI implementation.",
      topics: [
        "Custom GPTs — building, sharing, monetising",
        "Assistants API — threads, messages, runs",
        "Stateful conversations",
        "Realtime API for voice",
        "Files, tools and assistant instructions",
        "Custom GPTs vs Assistants API vs raw Chat Completions",
      ],
    },
    {
      title: "Fine-Tuning & Production Engineering",
      weekRange: "Week 7",
      description:
        "Fine-tuning is taught as a choice, not as a badge. You learn when it helps — domain tone, repeated classification, extraction style, cost reduction — and when RAG or better prompting is the correct answer. The module covers dataset preparation, train / validation splits, examples in the required format, post-fine-tune evaluation and rollback planning.\n\nThe second half is production engineering: serving through FastAPI, logging prompts safely, tracing calls with Langfuse or OpenAI usage dashboards, using the Batch API for non-real-time workloads, and applying moderation or safety checks where user-generated content is involved. The emphasis is that a model feature is a service with operations, cost and failure modes.",
      topics: [
        "When to fine-tune (and when not)",
        "Fine-tuning API for GPT-4o-mini / GPT-3.5-turbo",
        "Dataset preparation",
        "Reinforcement fine-tuning (RFT)",
        "Evaluation post-fine-tune",
        "FastAPI for serving",
        "Streaming and Server-Sent Events",
        "Langfuse + OpenAI usage observability",
        "Batch API for cost savings",
        "Safety / moderation API",
      ],
    },
    {
      title: "Capstone & Interview Prep",
      weekRange: "Week 8",
      description:
        "The final teaching week converts the course into a portfolio artefact. Students choose a capstone, implement it with a clean repository, add a README, record setup steps, capture screenshots or a demo video, and write an evaluation note that explains quality, latency, cost and known limits.\n\nInterview preparation runs beside the capstone rather than after it. You practise explaining OpenAI API choices, tool schemas, RAG retrieval failures, streaming architecture and fine-tuning trade-offs. The aim is simple: when an interviewer opens your GitHub project, you can walk through not just what it does, but why each engineering choice was made.",
      topics: [
        "Capstone implementation, deployment, README",
        "AI system-design mock round",
        "Evaluation / observability discussion",
        "Resume + LinkedIn rewrite for AI Engineer JDs",
        "GitHub portfolio polish",
        "Demo walkthrough practice",
        "HR mock and salary negotiation",
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
    src: "/images/courses/chatgpt-llms-workflow-v1.webp",
    width: 1400,
    height: 818,
    alt: "ChatGPT and LLMs workflow diagram showing the course sequence from LLM foundations and OpenAI setup to chat APIs, structured outputs, function calling, RAG, Assistants API, Realtime API, production engineering and capstone deployment.",
    caption:
      "The focused ChatGPT & LLMs sequence — model foundations, API integration, reliable outputs, tool use, RAG, Assistants and a deployable capstone.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/chatgpt-llms-syllabus-v1.pdf",
    title: "ChatGPT & LLMs Course Syllabus — Complete Module List",
    slug: "chatgpt-llms-syllabus",
    blurb:
      "Download the focused 8-week syllabus covering OpenAI setup, chat APIs, structured output, function calling, embeddings, RAG, Assistants, Realtime, fine-tuning, production engineering and capstone work.",
    asideBlocks: [
      {
        heading: "What is inside the PDF",
        items: [
          "A week-by-week sequence from LLM foundations to deployable OpenAI-powered applications.",
          "Production topics usually missing from short courses: schema validation, tool safety, streaming, cost tracking, RAG quality checks and observability.",
          "Capstone and interview-preparation guidance so the course output becomes a portfolio project, not only classroom notes.",
        ],
      },
      {
        heading: "Best fit for",
        items: [
          "Backend and full-stack developers adding OpenAI integration.",
          "Students targeting junior AI Engineer and LLM application roles.",
          "Product and solution teams building OpenAI-backed internal tools.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "Domain RAG Service with Assistants API File Search",
      description:
        "A production-style RAG service using OpenAI's Assistants API File Search (the managed RAG path) — pick a real domain corpus (legal / medical / regulatory / product docs), upload via the Files API, build an Assistant with File Search enabled, expose via FastAPI with streaming. Plus citation handling and a small evaluation report (RAGAS or manual eval). Outcome: a public GitHub repository with deployed demo URL.",
      technologies: [
        "OpenAI Assistants API + File Search",
        "FastAPI with streaming",
        "Python 3.13",
        "Langfuse tracing",
        "Render or Vercel deployment",
      ],
    },
    {
      title: "Multi-Tool Agent with Function Calling",
      description:
        "An agent that uses function calling to combine retrieval, SQL queries, REST APIs, and computational tools — pick a domain workflow (sales prep, customer support, financial analysis). Includes graceful error handling, conversation memory, observability via Langfuse, and a Streamlit or React frontend.",
      technologies: [
        "OpenAI function calling",
        "FastAPI backend",
        "Streamlit or React frontend",
        "PostgreSQL + pgvector",
        "Langfuse observability",
      ],
    },
    {
      title: "Fine-Tuned GPT-4o-mini for Domain Use Case",
      description:
        "Fine-tune GPT-4o-mini on a domain dataset — Indian legal language, medical SOAP notes, customer-support tone, or financial summarisation. Includes proper dataset preparation, fine-tuning via the OpenAI API, evaluation comparing fine-tuned vs base model on the same task, plus deployed demo.",
      technologies: [
        "OpenAI fine-tuning API",
        "GPT-4o-mini",
        "Custom evaluation harness",
        "FastAPI deployed demo",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Vinod Patil (Solutions Architect & AI Trainer, 12 years, deep specialisation in LLMs / GenAI / AI architecture; leads the Generative AI track at Archer Infotech).",

  careerOutcomes: {
    paragraphs: [
      "AI Engineer / GenAI Engineer / OpenAI integration roles are among the highest-paid technical specialisations in Pune in 2026 — Indeed Pune lists 300+ openings explicitly requiring OpenAI / ChatGPT API. The biggest employers are Persistent Systems, BMC Software, Bajaj Finserv, BharatPe Pune, Razorpay Pune, plus the Pune SaaS scene.",
      "What pulls an OpenAI-specialised engineer above the median band: a public GitHub repository with at least one deployed RAG service with measured retrieval quality, demonstrable function-calling depth, one fine-tuning project, plus production engineering (FastAPI streaming + observability + cost control). Our capstone projects are designed exactly around these signals.",
      "Senior AI Engineer bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures.",
    ],
    salaryBands: [
      {
        role: "AI Engineer (Pune)",
        band: "₹9,89,000 per year average",
        source: { label: "Indeed Pune (AI Engineer)", url: "https://in.indeed.com/career/ai-engineer/salaries/Pune--Maharashtra" },
      },
      {
        role: "Junior AI Engineer / GenAI Engineer (Pune entry, <2 years)",
        band: "₹6,00,000 – ₹12,00,000 per year",
        source: { label: "AmbitionBox Pune AI Engineer", url: "https://www.ambitionbox.com/profile/ai-engineer-salary-in-pune" },
      },
      {
        role: "Mid-level AI Engineer (Pune, 3–5 years)",
        band: "₹16,00,000 – ₹26,00,000 per year",
        source: { label: "Glassdoor Pune AI Engineer", url: "https://www.glassdoor.co.in/Salaries/pune-ai-engineer-salary-SRCH_IL.0,4_IM1072_KO5,16.htm" },
      },
      {
        role: "Senior AI Engineer (national, 5–8 years)",
        band: "₹28,00,000 – ₹50,00,000 per year",
        source: { label: "6figr India Senior AI Engineer (Pune ±10%)", url: "https://6figr.com/in/salary/senior-ai-engineer--t" },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "BMC Software",
      "Bajaj Finserv",
      "BharatPe (Pune)",
      "Razorpay (Pune)",
      "Pine Labs (Pune)",
      "Amagi",
      "Fyllo",
      "Drip Capital",
      "Innovaccer (Pune)",
      "Whatfix (Pune)",
      "Tiger Analytics",
      "Fractal Analytics",
      "TCS Research and Innovation",
      "Infosys Topaz",
      "Mastercard Pune Tech Hub",
    ],
    rolesAfterCourse: [
      "AI Engineer (OpenAI specialisation)",
      "GenAI Engineer",
      "LLM Application Developer",
      "Prompt Engineer (with engineering depth)",
      "RAG Engineer",
      "Junior AI Solutions Architect",
    ],
  },

  modesAndDuration: {
    duration: "8 weeks of structured curriculum (~2 months total)",
    classroom: { location: "Archer Infotech, Kothrud, Pune", timing: ["Morning batch — 10:00 to 13:00", "Evening batch — 18:00 to 21:00"] },
    online: {
      timing: ["Same hours as classroom batches", "Recordings available for review"],
      tools: ["Zoom for live sessions", "OpenAI API access (each student funds ~₹1,500 of API credits)", "GitHub for code reviews", "Slack / WhatsApp for async Q&A"],
    },
    weekend: { timing: ["Saturday + Sunday, 09:00 to 13:00"], durationNote: "Stretches over ~3.5 months instead of 2." },
    batchPolicy: "Maximum 15 students per batch.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode and concession. OpenAI API spend (~₹1,500 across the course) is paid by the student directly.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2 instalments at no extra cost",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 6. By the end of the curriculum your resume highlights real OpenAI-integrated services with measured evaluation, your GitHub has at least two production-style repositories, and you have completed at least two mock technical interviews focused on AI Engineer roles.",
      "We say placement support, not placement guarantee. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions.",
    ],
    process: [
      "Week 6 — resume + LinkedIn rewrite for AI Engineer JDs",
      "Week 7 — GitHub portfolio cleanup, demo URLs, evaluation reports",
      "Week 8 — two rounds of mock technical interviews",
      "Week 8 — HR mock and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network",
      "Up to 6 months of continued support",
      "Free re-entry to future batch interview-prep sessions",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "BMC Software",
      "Bajaj Finserv",
      "BharatPe (Pune)",
      "Razorpay (Pune)",
      "Amagi",
      "Tiger Analytics",
      "Fractal Analytics",
      "TCS Research and Innovation",
      "Infosys Topaz",
      "Mastercard Pune Tech Hub",
    ],
  },

  comparison: {
    intro: "We compare ourselves against typical Pune ChatGPT / LLM training institutes on factual rows only.",
    rows: [
      { feature: "Trainer named with photo and LinkedIn", archer: "Yes — Vinod Patil", typical: "No — generic branding" },
      { feature: "Models covered", archer: "GPT-5 + GPT-4.1 + Assistants API + Realtime + Batch API", typical: "GPT-3.5-turbo only" },
      { feature: "Function calling depth", archer: "Full week — schema design, parallel calling, error handling", typical: "Basic mention" },
      { feature: "Fine-tuning coverage", archer: "GPT-4o-mini fine-tuning + RFT, capstone-eligible", typical: "Not covered" },
      { feature: "Production engineering", archer: "FastAPI streaming + Langfuse + cost dashboards", typical: "Notebook only" },
      { feature: "Public GitHub portfolio output", archer: "Yes — deployed demos with evaluation reports", typical: "Notebooks only" },
      { feature: "Salary data shown", archer: "Cited from Indeed Pune + AmbitionBox + Glassdoor + 6figr", typical: "Single number with no source" },
      { feature: "Course fee transparency", archer: "₹20,000 – ₹90,000 published", typical: "Hidden behind enquiry form" },
      { feature: "Placement support", archer: "6 months, with free re-entry", typical: "1–3 months or vague" },
      { feature: "Batch size cap", archer: "15 students", typical: "25–40 students" },
    ],
    closing: "Compare with whoever you are considering.",
  },

  versusAlternative: {
    heading: "ChatGPT & LLMs vs Generative AI — Which Should You Pick?",
    paragraphs: [
      "ChatGPT & LLMs is the OpenAI-ecosystem-focused 2-month course — depth on GPT-5 / GPT-4.1, Assistants API, Custom GPTs, Realtime API, Batch API, OpenAI fine-tuning. Generative AI is the broader 3-month course — Claude / GPT / Gemini all hands-on, plus open-source LLMs (Llama / Mistral) and LoRA fine-tuning, plus multi-modal.",
      "Pick ChatGPT & LLMs if you specifically need OpenAI ecosystem depth (your team is OpenAI-only, your target employer ships on GPT). Pick Generative AI if you want broader multi-vendor / open-source / multi-modal AI engineering. Many of our students do both as a sequence.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: Python fluency, comfort with REST APIs and JSON, basic backend or web development. If you have done our Python or Generative AI course, you are ready.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation (OpenAI account creation guide)",
      "Show up to day one with a laptop running 64-bit OS and a credit card for OpenAI API setup",
    ],
  },

  faqs: [
    {
      question: "How long does ChatGPT & LLMs training in Pune take at Archer Infotech?",
      answer:
        "Approximately 2 months — 8 weeks of structured curriculum. The weekend batch stretches over ~3.5 months at the same content depth.",
    },
    {
      question: "What is the salary impact?",
      answer:
        "AI Engineers with demonstrable OpenAI integration earn at the top of Pune's IT corridor — Indeed Pune ₹9.89 lakh average for AI Engineer; Senior AI Engineers earn ₹28–50 lakh nationally with Pune trending within ±10%.",
    },
    {
      question: "ChatGPT & LLMs or Generative AI — which?",
      answer:
        "ChatGPT & LLMs for OpenAI ecosystem depth. Generative AI for broader multi-vendor / open-source / multi-modal coverage. Many students do both as a sequence.",
    },
    {
      question: "Do I need Python?",
      answer:
        "Yes — Python fluency is required from day 1.",
    },
    {
      question: "Is fine-tuning covered?",
      answer:
        "Yes — week 6–7 covers OpenAI fine-tuning API for GPT-4o-mini plus reinforcement fine-tuning (RFT). Capstone Project #3 is a complete fine-tuning workflow.",
    },
    {
      question: "Are weekend ChatGPT & LLMs classes available in Pune?",
      answer: "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~3.5 months instead of 2.",
    },
    {
      question: "What is the fee?",
      answer:
        "Course fees range ₹20,000 – ₹90,000 depending on mode. OpenAI API spend (~₹1,500) is paid by the student directly.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of placement support, referrals via our alumni network at 12+ partner companies, mock interviews, salary negotiation.",
    },
    {
      question: "Is the named trainer actually teaching?",
      answer: "Vinod Patil personally leads every session of every batch.",
    },
  ],

  finalCta: {
    heading: "Ready to start ChatGPT & LLMs training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Vinod is happy to spend 30 minutes telling you whether the course fits your goal.",
  },
};
