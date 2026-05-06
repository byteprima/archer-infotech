import type { CourseRichContent } from "./types";

export const genaiTrainingInPune: CourseRichContent = {
  intro:
    "Generative AI has shifted from research curiosity to mainstream production engineering — every Pune fintech, healthtech, SaaS company, and BFSI shop is now shipping LLM features in customer-facing products. AI Engineer, Applied AI Engineer, and GenAI Solutions Architect titles are the highest-paying technical roles for new entrants in Pune as of May 2026. Archer Infotech's Generative AI training in Pune teaches the discipline as it is actually practiced — Claude (Sonnet 4.6 / Opus 4.7), GPT-5 / GPT-4.1, Gemini, Llama 3.x and Mistral on the open side, retrieval-augmented generation with vector databases, agentic workflows with tool use, parameter-efficient fine-tuning, evaluation discipline, plus the production engineering layer (FastAPI, Docker, observability, cost control). Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Generative AI in 2026",
    paragraphs: [
      "Generative AI has moved from 'demo at a conference' to 'in production at every Pune product company' in under three years. Indeed Pune lists more than 400 active AI Engineer / GenAI Engineer / Applied AI Engineer openings as of May 2026 — a tripling from May 2024. Persistent Systems, BMC Software, Bajaj Finserv, Tiger Analytics, Fractal Analytics, ZS Associates, BMW TechWorks India, Mercedes-Benz R&D India, and the captive innovation arms (TCS Research, Infosys Topaz, Mastercard Pune Tech Hub) are hiring continuously. Compensation for AI Engineers with demonstrable production work runs at the very top of Pune's IT corridor — Senior AI Engineers regularly earn ₹30–60 lakh per year, comparable to Senior ML Engineers and ahead of equivalent-experience full-stack developers.",
      "What changed in 2026: the field has stabilised enough to teach. Claude Sonnet 4.6 / Opus 4.7 and GPT-5 / GPT-4.1 are the dominant frontier models for Pune production work, with Gemini 2.5 Pro a strong third. Llama 3.x and Mistral on the open-source side have closed the quality gap for many enterprise use cases (with the privacy advantage of running on-prem). Anthropic's Model Context Protocol (MCP), OpenAI's function calling, and tool-use frameworks (Pydantic-AI, LangChain, LlamaIndex) have settled the agent design pattern. Vector databases — pgvector, Weaviate, Chroma, Pinecone — are commodity. Evaluation has become non-negotiable; Pune CTOs are asking for RAGAS / DeepEval scores, not vibes-based demos.",
      "What this means for hiring: 2026 Pune AI Engineer JDs expect demonstrable LLM API work with at least one frontier model (Claude / GPT / Gemini), one production RAG pipeline with measured retrieval quality, basic agent / tool-use patterns, prompt engineering at the system-prompt + few-shot level, evaluation discipline (RAGAS or equivalent), and FastAPI + Docker for serving. Senior roles add LoRA / QLoRA fine-tuning and observability for LLM calls (latency, cost, hallucination rate). Archer Infotech's curriculum is rebuilt around exactly these expectations — engineering-first, evaluation-aware, frontier-model + open-source coverage.",
    ],
    keyPoints: [
      "400+ active AI Engineer / GenAI Engineer roles on Indeed Pune (May 2026)",
      "Claude Sonnet 4.6 / Opus 4.7 + GPT-5 / 4.1 + Gemini 2.5 Pro — frontier defaults",
      "Llama 3.x + Mistral — open-source for on-prem and privacy-sensitive workloads",
      "RAG + Agents + tool use + MCP — the 2026 design vocabulary",
      "Senior AI Engineer compensation regularly hits ₹30–60 lakh in Pune",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student targeting AI Engineer / GenAI Engineer / Applied AI Engineer roles",
      "Working backend / full-stack developer wanting to add GenAI to your skill stack",
      "Working data scientist or ML engineer wanting to add the LLM / RAG / agent layer",
      "Product manager or solutions architect wanting hands-on depth before commissioning AI features",
      "Domain expert (legal, medical, financial, education) wanting to ship a GenAI product in your domain",
      "Career restarter targeting AI Engineer as a high-demand re-entry path",
    ],
    notForYou: [
      "If you have no Python experience — take our Python course first; this course assumes Python fluency from week 1",
      "If you expect a guaranteed ₹25L+ AI Engineer offer with no portfolio — Pune fresher AI Engineer entry sits at ₹6–12 lakh; the ₹25L+ roles need 2–3 years and demonstrable production deployments",
      "If you cannot put in 10–12 hours per week of practice outside class — GenAI changes weekly; you need active engagement",
      "If you want certificate-only learning with no projects — Pune AI hiring screens hard on actual deployed work",
      "If your goal is purely deep-learning research / training foundation models — pick a research programme; this course is application engineering, not training-from-scratch",
      "If you have done a Master's in NLP / ML with 2+ years of LLM production work — talk to us about specialised consulting / corporate training instead",
    ],
  },

  curriculum: [
    {
      title: "Foundations — Transformers, LLMs, the 2026 Model Landscape",
      weekRange: "Week 1",
      description:
        "What an LLM actually is — at the level you need to build with one, not the level you need to publish a paper. Cover the transformer architecture (attention, positional encoding, layer norm, residual streams) at an intuition level, the difference between pre-training, instruction tuning, and RLHF / DPO, the model-family landscape (Claude, GPT, Gemini, Llama, Mistral, Phi, Qwen), and why specific models suit specific use cases (Claude for long-context analysis, GPT for general tasks, Gemini for multimodal, Llama / Mistral for on-prem and privacy). Plus the discipline that good AI Engineers practice — what a model is bad at, where hallucinations come from, and the cost / latency / quality triangle.",
      topics: [
        "Transformer architecture intuition — attention and residual stream",
        "Pre-training, instruction tuning, RLHF / DPO",
        "Model families — Claude, GPT, Gemini, Llama, Mistral, Phi, Qwen",
        "Frontier-model selection criteria",
        "Hallucinations — sources and mitigations",
        "Cost / latency / quality trade-offs",
      ],
    },
    {
      title: "Prompt Engineering & Structured Output",
      weekRange: "Week 2",
      description:
        "Prompt engineering as a real engineering discipline, not magic incantations. Cover system prompts vs user prompts, few-shot prompting, chain-of-thought and the limits thereof, role / persona prompts (and why most production systems should not use them), JSON mode / structured output / Pydantic-AI for type-safe LLM responses, response constraints and validators, prompt versioning and A/B testing, and the discipline of writing prompts as code (in Git, with tests, with metrics). Hands-on with Claude, GPT, and Gemini APIs side-by-side so you internalise their differences.",
      topics: [
        "System prompts vs user prompts — when each is right",
        "Few-shot and chain-of-thought prompting",
        "Structured output — JSON mode, Pydantic-AI, response_format",
        "Output validation and retry patterns",
        "Prompt versioning, A/B testing, telemetry",
        "Anthropic / OpenAI / Google API SDKs hands-on",
      ],
    },
    {
      title: "Embeddings, Vector Databases & Semantic Search",
      weekRange: "Week 3",
      description:
        "The retrieval half of retrieval-augmented generation. Cover sentence embeddings (sentence-transformers, BAAI BGE, OpenAI text-embedding-3, Voyage), the geometry of embedding space, vector databases (pgvector for SQL-native, Chroma for prototyping, Weaviate / Pinecone / Qdrant for scale), distance metrics (cosine, dot product, L2), HNSW indexing, hybrid retrieval (BM25 + dense + reranking with cross-encoders), and chunking strategies (fixed-size, semantic, parent-document). We finish with a small semantic-search service against a real corpus of your choice.",
      topics: [
        "Embedding models — sentence-transformers, BGE, OpenAI, Voyage",
        "Vector geometry — cosine, dot product, L2",
        "pgvector, Chroma, Weaviate, Pinecone, Qdrant",
        "HNSW indexing and approximate nearest neighbour",
        "Chunking — fixed, semantic, parent-document",
        "Hybrid retrieval — BM25 + dense + reranker",
        "Cross-encoders for reranking",
      ],
    },
    {
      title: "Retrieval-Augmented Generation (RAG) Done Right",
      weekRange: "Week 4",
      description:
        "RAG is the dominant production GenAI pattern in Pune product engineering — and the pattern most poorly executed in the field. Cover the full pipeline: ingestion (PDFs, HTML, code, images via vision models), chunking, embedding, storage, query rewriting, retrieval, reranking, prompt assembly, generation, citation, and response validation. The discipline that separates working RAG from theatre — chunk-size experimentation, retrieval recall measurement, hybrid retrieval, query rewriting for vague questions, and citation-aware generation. Build a production-style RAG service with measured retrieval quality.",
      topics: [
        "End-to-end RAG architecture",
        "Document ingestion — PDFs, HTML, code, vision-OCR",
        "Query rewriting and expansion",
        "Hybrid retrieval (BM25 + dense + reranker)",
        "Prompt assembly with citation tags",
        "Citation-aware generation",
        "Anti-patterns — when RAG doesn't help",
        "Multi-tenant RAG and access control",
      ],
    },
    {
      title: "Agents, Tool Use & Model Context Protocol",
      weekRange: "Week 5",
      description:
        "Agentic workflows — LLMs that call tools, query databases, hit APIs, and loop until a goal is satisfied. Cover OpenAI function calling, Claude tool use, Anthropic's Model Context Protocol (MCP) for tool federation, the agent design loop (think → act → observe → think), task decomposition patterns, ReAct, error handling, and the honest limits of agents in production today (cost, latency, debuggability). Build a multi-tool agent that combines retrieval, computation, and external APIs against a real-world workflow.",
      topics: [
        "OpenAI function calling and Claude tool use",
        "Model Context Protocol (MCP) basics",
        "Agent loops — ReAct, Plan-and-Execute",
        "Task decomposition patterns",
        "Tool design — schemas, error handling, idempotency",
        "Multi-step memory and conversational state",
        "Honest limits — cost, latency, debuggability",
      ],
    },
    {
      title: "Frameworks — LangChain, LlamaIndex, Pydantic-AI",
      weekRange: "Week 6",
      description:
        "Frameworks are tools, not religion. Cover the working subset of LangChain (chains, runnables, LangGraph for state machines), LlamaIndex (best-in-class for RAG over heterogeneous data), and Pydantic-AI (type-safe agent design — the framework Pune Python teams have been gravitating to in 2026). Honest comparison with hand-rolled stacks — when frameworks save time, when they obscure debugging, and when senior AI Engineers reach for vanilla SDK calls instead. Build the same small project in two of the three frameworks to feel the difference.",
      topics: [
        "LangChain — chains, runnables, LangGraph",
        "LlamaIndex — for heterogeneous RAG",
        "Pydantic-AI — type-safe agent design",
        "Vanilla SDK vs framework — when each wins",
        "Tracing with LangSmith / Langfuse",
        "Framework migration patterns",
      ],
    },
    {
      title: "Evaluation, Observability & Guardrails",
      weekRange: "Week 7",
      description:
        "The week that separates senior AI Engineers from prompt-tinkerers. Cover offline evaluation — RAGAS for RAG quality (faithfulness, answer relevance, context precision / recall), DeepEval for unit-test-style LLM evaluation, human-in-the-loop evaluation patterns. Online observability — Langfuse / LangSmith for tracing, latency / cost / token tracking, structured logging that an SRE can actually debug. Guardrails — content filtering, prompt injection defence, jailbreak resistance, output safety, and the discipline of red-teaming your own system before shipping.",
      topics: [
        "RAGAS — faithfulness, answer relevance, context precision / recall",
        "DeepEval — unit-test-style LLM evaluation",
        "Human-in-the-loop evaluation",
        "LangSmith / Langfuse tracing",
        "Latency / cost / token observability",
        "Prompt injection and jailbreak defence",
        "Content filtering and output safety",
        "Red-teaming patterns before launch",
      ],
    },
    {
      title: "Open-Source LLMs & Fine-Tuning",
      weekRange: "Week 8",
      description:
        "When and why to leave the frontier APIs. Cover the open-source landscape (Llama 3.x, Mistral, Phi-3, Qwen, IndicBERT for Indian languages), local serving (Ollama for dev, vLLM / TGI for production, llama.cpp for CPU / Apple Silicon), parameter-efficient fine-tuning (LoRA, QLoRA, PEFT) on a single consumer GPU or Colab Pro, dataset preparation for fine-tuning, training discipline (overfitting checks, evaluation), and the honest comparison — when fine-tuning a small open model beats prompting a frontier model (privacy, cost, latency, domain register) and when it doesn't.",
      topics: [
        "Open-source landscape — Llama 3.x, Mistral, Phi-3, Qwen, IndicBERT",
        "Local serving — Ollama, vLLM, TGI, llama.cpp",
        "PEFT — LoRA, QLoRA — on Colab Pro / single consumer GPU",
        "Dataset preparation for fine-tuning",
        "Evaluation post-fine-tune",
        "Frontier API vs fine-tuned open — the honest comparison",
      ],
    },
    {
      title: "Multimodal — Images, Audio, Video, Code",
      weekRange: "Week 9",
      description:
        "Beyond text. Vision-language models (Claude vision, GPT-4-vision, Gemini multimodal) for document understanding, OCR, and visual QA. Image generation (DALL-E 3, Imagen, Stable Diffusion 3, Flux) and the production patterns (asset pipelines, brand-safe filtering, costs). Speech (Whisper for transcription, ElevenLabs for synthesis), code generation (Claude / GPT for code, the honest 'pair programmer' pattern), and the multimodal RAG pattern (text + image retrieval). Plus a cost-conscious approach since multimodal calls run 5–10× the cost of text-only.",
      topics: [
        "Vision-language models — Claude / GPT / Gemini vision",
        "OCR and document understanding",
        "Image generation — DALL-E 3, Imagen, Stable Diffusion, Flux",
        "Speech — Whisper, ElevenLabs",
        "Code generation patterns",
        "Multimodal RAG",
        "Cost discipline for multimodal",
      ],
    },
    {
      title: "Production GenAI — FastAPI, Docker, Observability, Cost",
      weekRange: "Week 10",
      description:
        "The week that turns a notebook into a service. FastAPI as the de facto serving layer for GenAI in Python (async endpoints, Pydantic v2, JWT auth, streaming responses with Server-Sent Events, WebSocket for chat). Docker for containerisation, GitHub Actions CI/CD with model-call mocking in tests, observability (Langfuse + Prometheus + Grafana for production-grade GenAI telemetry), and FinOps for LLM calls — token budgets per request, caching (semantic cache + exact cache), prompt compression, and the patterns that cut a runaway OpenAI / Anthropic bill by 50–70% without changing model quality.",
      topics: [
        "FastAPI for GenAI — async, streaming, WebSocket",
        "Server-Sent Events for streaming responses",
        "Docker containers for inference",
        "GitHub Actions CI/CD with API mocking",
        "Langfuse + Prometheus + Grafana telemetry",
        "Token budgets, semantic caching, prompt compression",
        "Cost dashboards and alerting",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Weeks 11–12 + 2 weeks placement prep",
      description:
        "Two weeks of full-time capstone work plus structured interview preparation. Pick one of three capstone projects (see Capstone Projects). Mock interviews calibrated for Pune AI Engineer hiring panels — Persistent, BMC, Bajaj Finserv, Tiger Analytics, Fractal, BMW TechWorks, Mercedes-Benz R&D, TCS Research, Infosys Topaz, Mastercard Pune Tech Hub. Includes a system-design round (design a customer-support assistant for a BFSI company), an evaluation round (how would you measure if this RAG is working?), and a behavioural / product-thinking round. Resume / LinkedIn / GitHub polish included.",
      topics: [
        "Capstone implementation, deployment, README",
        "Code review with the lead trainer",
        "AI system-design mock round",
        "Evaluation-thinking mock round",
        "Behavioural and product-thinking round",
        "Resume + LinkedIn rewrite for AI Engineer JDs",
        "GitHub portfolio polish — RAG with measured retrieval recall, agent demos",
        "HR mock interview and salary negotiation",
      ],
    },
  ],

  projects: [
    {
      title: "Production RAG Service with Measured Retrieval Quality",
      description:
        "Pick a real domain corpus (Indian legal documents, medical guidelines, internal product documentation, RBI / SEBI regulations, or a public dataset). Build a complete RAG service — ingestion pipeline (PDFs + HTML), semantic chunking, hybrid retrieval (BM25 + dense + reranker), query rewriting for vague questions, citation-aware generation with Claude or GPT, FastAPI service with streaming responses, Langfuse tracing, and RAGAS evaluation showing measured faithfulness / context precision / answer relevance scores. Outcome: a public GitHub repository with a clickable demo URL plus an evaluation report — exactly the artefact Pune AI Engineer hiring panels interview on.",
      technologies: [
        "Claude / GPT API",
        "pgvector or Weaviate",
        "BAAI BGE embeddings + cross-encoder reranker",
        "FastAPI with streaming",
        "Langfuse tracing",
        "RAGAS evaluation",
        "Docker + GitHub Actions",
        "AWS or Render deployment",
      ],
    },
    {
      title: "Multi-Tool Agent with MCP / Function Calling",
      description:
        "Build a domain-specific assistant that uses multiple tools — retrieval over a corpus, SQL queries against a database, REST API calls to internal services, and computational tools (calculators, validators). Implement using either Anthropic Model Context Protocol or OpenAI function calling. Includes graceful error handling, retry patterns, conversational memory, observability via Langfuse, and a Streamlit or React frontend for demo. Pick a real workflow — customer-support assistant, sales-prep assistant, financial-analysis assistant. Outcome: an agent that demos in 5 minutes and signals senior-AI-Engineer thinking on the resume.",
      technologies: [
        "Claude tool use or OpenAI function calling",
        "Model Context Protocol (optional)",
        "Pydantic-AI or LangGraph",
        "PostgreSQL + pgvector",
        "FastAPI backend",
        "Streamlit or React frontend",
        "Langfuse observability",
      ],
    },
    {
      title: "Fine-Tuned Open-Source LLM for Domain Use Case",
      description:
        "Take an open-source model (Llama 3.1 8B, Mistral 7B, or Phi-3) and fine-tune it via LoRA / QLoRA on Colab Pro for a specific domain register — Indian legal language, medical SOAP notes, customer-support tone, or financial summarisation. Includes proper dataset preparation, training discipline (validation curves, early stopping), evaluation comparing fine-tuned model against base model AND against a frontier model on the same task, and serving via vLLM or Ollama. Outcome: a 2026-relevant fine-tuning project with documented evaluation — the differentiator on senior AI Engineer JDs and the artefact most Pune AI candidates lack.",
      technologies: [
        "Llama 3.1 / Mistral / Phi-3",
        "PEFT — LoRA / QLoRA",
        "Hugging Face Transformers + datasets + accelerate",
        "Colab Pro / Kaggle GPU",
        "vLLM or Ollama serving",
        "Evaluation against frontier baseline",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Vinod Patil (Solutions Architect & AI Trainer, 12 years, deep specialisation in LLMs / GenAI / Cloud Architecture, leads the Generative AI track at Archer Infotech) and Amol Patil (Senior Corporate Trainer, 10+ years, lead for the Python / Data Science / AI/ML / DevOps tracks). Both personally take sessions in every batch — the names you see here are the names you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "AI Engineer, GenAI Engineer, and Applied AI Engineer are the highest-paid technical roles for new entrants in Pune in 2026 — Indeed Pune lists 400+ active openings, tripling from 2024, with continuous hiring at Persistent Systems, BMC Software, Bajaj Finserv, Tiger Analytics, Fractal Analytics, ZS Associates, BMW TechWorks India, Mercedes-Benz R&D India, TCS Research and Innovation, Infosys Topaz, Wipro AI&I, and the Mastercard Pune Tech Hub. Compensation has separated from generic 'Software Engineer' titles — Senior AI Engineers regularly earn ₹30–60 lakh per year because the role bundles modelling literacy with production engineering and product judgement.",
      "What pulls an AI Engineer above the median band: a public GitHub repository with a deployed RAG service AND measured retrieval quality (not just a demo), one agent / tool-use project that demos in 5 minutes, evaluation discipline visible in the README (RAGAS scores, latency / cost dashboards), and one fine-tuning project on an open-source model. Our capstone projects are designed exactly around these signals.",
      "Senior AI Engineer and AI Solutions Architect bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures based on AmbitionBox, 6figr, and direct alumni feedback.",
    ],
    salaryBands: [
      {
        role: "AI Engineer (Pune)",
        band: "₹9,89,000 per year average",
        source: {
          label: "Indeed Pune (AI Engineer)",
          url: "https://in.indeed.com/career/ai-engineer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Junior AI Engineer / GenAI Engineer (Pune entry, <2 years)",
        band: "₹6,00,000 – ₹12,00,000 per year",
        source: {
          label: "AmbitionBox Pune AI Engineer",
          url: "https://www.ambitionbox.com/profile/ai-engineer-salary-in-pune",
        },
      },
      {
        role: "Mid-level AI Engineer (Pune, 3–5 years)",
        band: "₹16,00,000 – ₹26,00,000 per year",
        source: {
          label: "Glassdoor Pune AI Engineer",
          url: "https://www.glassdoor.co.in/Salaries/pune-ai-engineer-salary-SRCH_IL.0,4_IM1072_KO5,16.htm",
        },
      },
      {
        role: "Senior AI Engineer / Applied AI Engineer (national, 5–8 years)",
        band: "₹28,00,000 – ₹50,00,000 per year",
        source: {
          label: "6figr India Senior AI Engineer (Pune ±10%)",
          url: "https://6figr.com/in/salary/senior-ai-engineer--t",
        },
      },
      {
        role: "AI Solutions Architect / Lead AI Engineer (national, 8+ years)",
        band: "₹45,00,000 – ₹80,00,000 per year",
        source: {
          label: "Industry aggregation 2026 (Pune ±10%)",
          url: "https://www.payscale.com/research/IN/Job=AI_Engineer/Salary",
        },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "BMC Software",
      "Bajaj Finserv",
      "Tiger Analytics",
      "Fractal Analytics",
      "ZS Associates",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "TCS Research and Innovation",
      "Infosys Topaz",
      "Wipro AI&I",
      "Mastercard Pune Tech Hub",
      "MathCo",
      "Synechron",
      "Mphasis NEXT Labs",
      "Cognizant AI",
    ],
    rolesAfterCourse: [
      "AI Engineer",
      "GenAI Engineer",
      "Applied AI Engineer",
      "LLM Engineer",
      "RAG / Search Engineer",
      "AI Application Developer",
      "Prompt Engineer (with engineering depth)",
      "Junior AI Solutions Architect",
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
      tools: [
        "Zoom for live sessions",
        "GitHub for code reviews",
        "Anthropic + OpenAI + Google API access (each student funds ~₹1,500 of API credits across the course)",
        "Google Colab Pro / Kaggle GPU for the fine-tuning week",
        "Slack / WhatsApp for asynchronous Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over 5 months instead of 3 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch — small enough that the trainer reviews every student's prompts, retrieval quality, and evaluation reports personally. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote — we calibrate by early-bird timing, group enrolment, and returning-alumni concessions. LLM API spend (Anthropic + OpenAI + Google) typically runs ₹1,500 across the course, GPU compute (Colab Pro for fine-tuning) ~₹1,000 — both paid by the student directly.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with full fine-tuning + multimodal modules, frontier-model API access, and extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 8 of the course, not at the end. By the time you finish the curriculum, your resume highlights real RAG and agent work with measured evaluation, your GitHub has a deployed AI service with a clickable demo URL, and you have completed at least three mock technical interviews against question banks from Pune AI hiring teams.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 8 — resume and LinkedIn rewrite, calibrated for AI Engineer / GenAI Engineer JDs",
      "Week 9 — GitHub portfolio cleanup, RAG demo deployment links, evaluation reports polish",
      "Weeks 10–11 — AI system-design drills, evaluation-thinking walkthroughs, behavioural / product mock rounds",
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
      "Tiger Analytics",
      "Fractal Analytics",
      "ZS Associates",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "TCS Research and Innovation",
      "Infosys Topaz",
      "Wipro AI&I",
      "Mastercard Pune Tech Hub",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune Generative AI training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Vinod Patil and Amol Patil",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Frontier models covered hands-on",
        archer: "Claude Sonnet 4.6 / Opus 4.7, GPT-5 / 4.1, Gemini 2.5 Pro — all three SDKs",
        typical: "OpenAI-only, often GPT-3.5 / GPT-4",
      },
      {
        feature: "Open-source LLM fine-tuning",
        archer: "LoRA / QLoRA / PEFT on Llama / Mistral / Phi — capstone-eligible project",
        typical: "Theoretical mention, no hands-on",
      },
      {
        feature: "RAG depth covered",
        archer: "Hybrid retrieval + rerankers + RAGAS evaluation + citation generation",
        typical: "Basic embed-and-retrieve, no evaluation",
      },
      {
        feature: "Agent / tool-use coverage",
        archer: "Function calling, MCP, ReAct, multi-step memory hands-on",
        typical: "Marketing mention only",
      },
      {
        feature: "Evaluation discipline",
        archer: "RAGAS + DeepEval + Langfuse — full week of evaluation engineering",
        typical: "Vibes-based 'looks good' demo only",
      },
      {
        feature: "Multimodal coverage",
        archer: "Vision-language + image gen + speech + multimodal RAG",
        typical: "Image generation demo only",
      },
      {
        feature: "Production engineering pattern",
        archer: "FastAPI streaming + Docker + Langfuse observability + cost dashboards",
        typical: "Notebook-only — no deployment artefact",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — deployed AI services with clickable demos and evaluation reports",
        typical: "Notebook screenshots in a PDF",
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
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student RAG demos with measured retrieval quality before you pay.",
  },

  versusAlternative: {
    heading: "Generative AI vs Machine Learning — Which Should You Pick in Pune?",
    paragraphs: [
      "GenAI vs ML is the most-asked question in Pune AI counselling. The honest distinction: Machine Learning is the broader engineering discipline (algorithms, modelling, deployment, MLOps, including but not limited to LLMs). Generative AI is the specialisation focused on LLMs and generative models — heavier on prompting, RAG, agents, and frontier-model APIs; lighter on classical algorithm depth and from-scratch training. Both ship to production at most Pune product companies; they overlap heavily.",
      "Compensation reality in Pune (May 2026): ML Engineer averages ₹10.32 lakh on Indeed; AI Engineer averages ₹9.89 lakh — close at the average level. The separation appears at the senior end — Senior AI Engineers / Applied AI Engineers running RAG / agent / fine-tuning systems in production are getting ₹28–50 lakh national bands (Pune ±10%), comparable to Senior ML Engineers, with AI Solutions Architect titles pushing into ₹45–80 lakh. The premium is for engineers who can both design AND ship LLM systems with measured quality.",
      "Honest recommendation: pick Generative AI if your goal is shipping LLM-powered products fast, you have backend or full-stack background, and you want the highest-velocity 2026 entry path into AI roles. Pick Machine Learning if your goal is algorithmic depth, classical-ML deployment, or research-flavoured engineering. Either path stacks well with the other — many of our students do GenAI first (faster portfolio, faster placement) and add ML 6–12 months later.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: Python fluency at the level of being able to write a 200-line script without lookup, comfort with REST APIs and JSON, and basic familiarity with at least one SQL or NoSQL database. If you have done our Python or Data Science course (or equivalent), you are ready. Working backend or full-stack developers from any Python / Java / Node background typically slot in well; pure non-developers should do the Python course first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal (we say no to roughly 15% of GenAI enquirers because Python or backend foundation is not yet there)",
      "Confirm enrolment and complete pre-course orientation (API account creation guide for Anthropic + OpenAI + Google, environment setup)",
      "Show up to day one with a laptop running 64-bit OS, a personal credit card or UPI mandate (for API account verification — billing alarms keep usage in budget)",
    ],
  },

  faqs: [
    {
      question: "Which is the best Generative AI training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves. The test that works: ask any institute you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student RAG demos with measured retrieval quality (RAGAS scores), and (3) name companies that hired their last 5 batches. Compare on those three.",
    },
    {
      question: "How long does Generative AI training in Pune take at Archer Infotech?",
      answer:
        "Three months (12 weeks) of structured curriculum plus 2 weeks of capstone project and interview preparation. The weekend batch stretches over 5 months at the same content depth, designed for working professionals.",
    },
    {
      question: "What is the salary of an AI Engineer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹9.89 lakh per year for AI Engineer (May 2026). Junior AI Engineer Pune entry sits at ₹6–12 lakh per year per AmbitionBox. Mid-level AI Engineers (3–5 years) earn ₹16–26 lakh per Glassdoor. Senior AI Engineers / Applied AI Engineers (5–8 years) earn ₹28–50 lakh nationally with Pune trending within ±10%. AI Solutions Architects (8+ years) regularly hit ₹45–80 lakh.",
    },
    {
      question: "What is the fee for the Generative AI course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and applicable concession. The higher end covers placement-track classroom batches with full fine-tuning + multimodal modules, frontier-model API access, and extended interview prep; the lower end covers concession-eligible online or weekend formats. LLM API spend (~₹1,500) and GPU compute for fine-tuning (~₹1,000) are paid by the student directly.",
    },
    {
      question: "Do I need ML or deep-learning background?",
      answer:
        "No — we cover the transformer / LLM intuition you actually need (week 1) at a level that anyone with backend / full-stack / Python background can absorb. We focus on application engineering, not training models from scratch. If you do have ML / deep-learning background, you will move slightly faster in weeks 1 and 8 (fine-tuning).",
    },
    {
      question: "Do I need Python before joining the course?",
      answer:
        "Yes — Python fluency is required from week 1. If you have done our Python or Data Science course (or equivalent), you are ready. We do not turn this course into a Python primer; that would short-change the GenAI content.",
    },
    {
      question: "Generative AI or Machine Learning — which should I pick?",
      answer:
        "GenAI for LLM / RAG / agent / prompt-engineering depth and the highest-velocity 2026 entry path into AI roles. Machine Learning for classical algorithm depth, deployment of supervised / unsupervised models, and broader engineering pattern. Both stack well — many students do GenAI first (faster portfolio) and add ML 6–12 months later. Compensation at the senior end is comparable.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) production RAG service with measured retrieval quality (RAGAS evaluation), (2) multi-tool agent with MCP or function calling, (3) fine-tuned open-source LLM for a domain use case. All three become public GitHub repositories with clickable demo URLs and evaluation reports.",
    },
    {
      question: "Which models are covered — only ChatGPT?",
      answer:
        "All three frontier model families hands-on — Claude (Sonnet 4.6 / Opus 4.7), GPT (GPT-5 / GPT-4.1), and Gemini (2.5 Pro) — plus open-source models (Llama 3.x, Mistral, Phi-3) for the fine-tuning week. We deliberately use multiple SDKs side-by-side so you internalise the differences, because Pune production teams pick models per use case rather than committing to one vendor.",
    },
    {
      question: "Is fine-tuning covered or extra?",
      answer:
        "Included in every batch. Week 8 is a full module on parameter-efficient fine-tuning (LoRA, QLoRA, PEFT) on open-source models running on Colab Pro or Kaggle GPU. Capstone Project #3 is a complete fine-tune-and-deploy workflow. This module is what separates 2026 senior Pune AI Engineer hiring from prompt-engineer-only candidates.",
    },
    {
      question: "Is Anthropic Claude / Model Context Protocol covered?",
      answer:
        "Yes — Claude Sonnet 4.6 and Opus 4.7 are first-class throughout the course (alongside GPT-5 / 4.1 and Gemini 2.5 Pro). Anthropic Model Context Protocol (MCP) is covered in week 5 alongside OpenAI function calling — both as the dominant tool-use patterns in 2026. Capstone Project #2 lets you choose either MCP or function calling.",
    },
    {
      question: "What about evaluation — RAGAS / DeepEval?",
      answer:
        "Week 7 is a full module on evaluation discipline — RAGAS for RAG quality (faithfulness, answer relevance, context precision / recall), DeepEval for unit-test-style LLM evaluation, Langfuse for production tracing, and the discipline of red-teaming your own system before launch. Pune AI hiring panels in 2026 specifically test for evaluation thinking, which is the differentiator on senior interviews.",
    },
    {
      question: "Are weekend GenAI classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over 5 months instead of 3. Same content, same trainers, same projects. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "How is this different from your ChatGPT & LLMs / Prompt Engineering / AI Tools courses?",
      answer:
        "This Generative AI training is the comprehensive engineering programme — 3 months covering prompting + RAG + agents + fine-tuning + multimodal + production engineering. ChatGPT & LLMs is a 2-month focused track on the OpenAI ecosystem. Prompt Engineering is a 1-month focused course on prompting craft. AI Tools is a 1-month course on using AI tools for productivity. The GenAI course is the full engineering programme; the others are focused subsets.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for AI Engineer / GenAI Engineer roles (system-design + evaluation-thinking + behavioural rounds), referrals via our alumni network at 12+ partner companies, resume / LinkedIn / GitHub rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "Are the named trainers actually teaching, or are they just on the brochure?",
      answer:
        "Vinod Patil personally leads the LLM foundations, prompt engineering, agents, fine-tuning, and capstone weeks. Amol Patil leads the RAG, frameworks, evaluation, and production engineering weeks. The same names you see on this page show up in your batch on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start Generative AI training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Vinod and Amol are happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see actual student RAG demos and agent walkthroughs, meet a current batch, and decide with full information.",
  },
};
