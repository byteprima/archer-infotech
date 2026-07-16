import type { CourseRichContent } from "./types";

export const promptEngineeringTrainingInPune: CourseRichContent = {
  intro:
    "Prompt Engineering is the most-democratic AI skill of 2026 — accessible to engineers, product managers, marketers, lawyers, doctors, teachers, and analysts alike. Most Pune product teams now have a 'Prompt Engineer' or 'AI Specialist' on the org chart, and most non-technical knowledge workers benefit materially from prompting fluency in their day-to-day work. Archer Infotech's Prompt Engineering training in Pune is the focused 1-month course covering prompting craft as a real engineering discipline — system prompts, few-shot, chain-of-thought, role / persona patterns, JSON-structured output, prompt versioning and A/B testing, plus the platform-specific differences (Claude vs GPT vs Gemini), domain-specific patterns (sales, support, content, analysis, code, legal, medical), and the discipline of writing prompts as code. The course is open to non-technical professionals and the natural complement to our Generative AI / ChatGPT & LLMs / AI Tools tracks. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Prompt Engineering in 2026",
    paragraphs: [
      "Prompt Engineering is no longer a niche craft — it is a baseline knowledge-worker skill in 2026. Indeed Pune lists 200+ active openings that explicitly call out 'Prompt Engineering', plus a few hundred more across roles where it is listed as preferred (AI Specialist, AI Trainer, Content Strategist, AI Product Manager). The biggest employers are Persistent Systems, BMC Software, Bajaj Finserv, plus the Pune SaaS scene and content / marketing / consulting companies that have invested in AI-augmented workflows.",
      "What changed in 2026: prompting has matured from 'magic incantations' to a real engineering discipline. Frontier models (Claude Sonnet 4.6 / Opus 4.7, GPT-5 / 4.1, Gemini 2.5 Pro) have meaningfully different prompting patterns — Claude responds differently to role-prompts than GPT does; Gemini handles multi-modal prompts uniquely. Structured output (JSON-mode, Pydantic-AI, response_format) has replaced the old 'please output JSON' pattern. Evaluation has become non-negotiable — production prompts have telemetry and versioning.",
      "What this means for hiring: prompting fluency is a force-multiplier on every knowledge-work role. For Pune AI Engineer / GenAI Engineer roles, prompt-engineering depth is the entry-level signal. For Pune product / marketing / consulting roles, prompting fluency is the productivity multiplier that compounds over a career. The course is designed for both audiences.",
    ],
    keyPoints: [
      "200+ Pune openings explicitly call out Prompt Engineering (May 2026)",
      "Plus a few hundred more list it as preferred across AI Specialist / Strategist / PM roles",
      "Frontier-model differences — Claude / GPT / Gemini each have distinct patterns",
      "Structured output and prompt-as-code — the 2026 production pattern",
      "Open to engineers AND non-technical knowledge workers",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Working knowledge worker (any role) wanting AI-productivity multiplier in your day-to-day",
      "Engineering / BCS / MCA student preparing for AI Engineer / GenAI Engineer interviews",
      "Product manager / business analyst / consultant wanting AI-fluency for stakeholder work",
      "Content / marketing / sales professional wanting to integrate AI into your workflow",
      "Domain expert (legal, medical, financial, education) wanting domain-specific prompting depth",
      "Working AI engineer wanting to deepen prompting craft as a focused module",
    ],
    notForYou: [
      "If you want backend AI engineering (RAG, fine-tuning, agents at depth) — take our Generative AI course",
      "If you want OpenAI ecosystem depth specifically — take our ChatGPT & LLMs course",
      "If you only want broad AI-tool literacy without prompting depth — take our AI Tools course",
      "If you have 1+ year of production prompt-engineering experience — talk to us about advanced specialisations",
    ],
  },

  curriculum: [
    {
      title: "Prompting Foundations & The 2026 Model Landscape",
      weekRange: "Week 1",
      description:
        "What prompting actually is — communication with a probabilistic system, not magic. Cover the model-family landscape (Claude, GPT, Gemini, Llama / Mistral) and their distinctive prompting patterns, the anatomy of a prompt (system / user / assistant roles, context, instructions, few-shot examples), token budgets and cost / latency awareness, plus the discipline of writing prompts as code (in Git, with versioning, with telemetry).",
      topics: [
        "Model families — Claude / GPT / Gemini / Llama / Mistral",
        "Prompting patterns that differ by model",
        "Prompt anatomy — system / user / assistant",
        "Context, instructions, few-shot",
        "Token budgets and cost / latency",
        "Prompts as code — versioning, telemetry",
      ],
    },
    {
      title: "Core Prompting Techniques",
      weekRange: "Week 2",
      description:
        "The techniques that move prompting from beginner to mid-level. Few-shot prompting (one-shot, few-shot, zero-shot — when each fits), chain-of-thought prompting (and the limits — Anthropic and Google have published research on when CoT helps vs hurts), role / persona prompts (with the honest caveat that production systems should use them sparingly), self-consistency, plus the disciplined evaluation pattern of running each prompt against 10–20 test cases.",
      topics: [
        "Few-shot prompting — examples that work",
        "Chain-of-thought and the limits",
        "Role / persona prompts — when, why, why-not",
        "Self-consistency",
        "Step-back prompting",
        "Test-case-driven prompt iteration",
      ],
    },
    {
      title: "Structured Output, Validators & Production Prompting",
      weekRange: "Week 3",
      description:
        "The 2026 production-prompting layer. Cover structured output (OpenAI Structured Outputs, Anthropic tool-use as structured output, Pydantic-AI for type-safe responses), output validators, retry-and-repair patterns, prompt versioning (treating prompts like code in Git), A/B testing prompts, plus the observability layer (Langfuse, LangSmith). We use Anthropic Claude and OpenAI GPT side-by-side so you internalise the differences.",
      topics: [
        "Structured Outputs — OpenAI, Anthropic tool-use",
        "Pydantic-AI for type-safe LLM responses",
        "Output validators and retry-repair",
        "Prompt versioning in Git",
        "A/B testing prompts",
        "Langfuse / LangSmith observability",
      ],
    },
    {
      title: "Domain-Specific Patterns & Capstone",
      weekRange: "Week 4",
      description:
        "How prompting varies by domain. Sales / customer-support assistants, content / marketing prompts, code / engineering prompts (the GitHub Copilot / Cursor pattern), analysis / research / financial-summary prompts, legal / regulatory document analysis, medical / clinical reasoning (with the discipline of safety guardrails). Plus the capstone — pick a real workflow and build a production-grade prompt suite with versioning, telemetry, and evaluation.",
      topics: [
        "Sales and customer-support patterns",
        "Content / marketing prompts",
        "Code generation prompts (Copilot / Cursor)",
        "Analysis / research / financial summary",
        "Legal / regulatory document analysis",
        "Medical / clinical reasoning + guardrails",
        "Capstone implementation",
        "HR mock interview / role-prep",
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
      title: "Domain-Specific Prompt Suite with Evaluation",
      description:
        "Pick a real workflow in your domain (sales-prep, content-strategy, customer-support summarisation, legal-clause analysis) and build a complete prompt suite — system prompts, few-shot examples, structured outputs, evaluation against 20+ test cases. Outcome: a public GitHub repository with prompts versioned, telemetry, plus a 5-page evaluation report.",
      technologies: [
        "Anthropic Claude + OpenAI GPT (side-by-side)",
        "Pydantic-AI for structured outputs",
        "Langfuse for telemetry",
        "Test-case driven evaluation",
      ],
    },
    {
      title: "Prompt Library / Cookbook for Your Domain",
      description:
        "A curated, documented collection of 20+ production-quality prompts for a specific domain — published on GitHub with examples, model-specific variants (Claude vs GPT), and usage notes. Becomes a portable knowledge artefact you can reference in interviews and reuse in your day-to-day work.",
      technologies: [
        "Markdown documentation",
        "Multiple frontier-model variants",
        "Usage examples",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Vinod Patil (Solutions Architect & AI Trainer, 12 years, deep specialisation in LLMs and prompt engineering) and Amol Patil (Senior Corporate Trainer, 10+ years, lead for AI/ML / Data Science tracks).",

  careerOutcomes: {
    paragraphs: [
      "Prompt Engineering is among the most-democratic AI skills in 2026 — useful in every knowledge-work role and a hard requirement for several specialised roles. Indeed Pune lists 200+ openings explicitly requiring 'Prompt Engineering', plus several hundred more across AI Specialist / Strategist / PM titles where it is preferred.",
      "Compensation varies widely — pure 'Prompt Engineer' titles in Pune entry roles sit at ₹4–8 lakh; senior AI Specialist / AI Trainer roles can hit ₹15–25 lakh. The bigger value of prompt-engineering fluency is as a force-multiplier on existing roles — Pune product managers, content strategists, and consultants who internalise prompting see 20–40% productivity gains in their day-to-day.",
      "What pulls a prompt engineer above the median band: a public prompt library, demonstrable evaluation discipline (test cases + metrics), one fine-grained domain specialisation (legal / medical / financial / code), and ideally one production-deployed prompt suite.",
    ],
    salaryBands: [
      {
        role: "Prompt Engineer / AI Specialist (Pune entry)",
        band: "₹4,00,000 – ₹8,00,000 per year",
        source: { label: "AmbitionBox Pune AI Specialist", url: "https://www.ambitionbox.com/profile/ai-specialist-salary-in-pune" },
      },
      {
        role: "Senior AI Specialist / AI Trainer (Pune, 3–5 years)",
        band: "₹10,00,000 – ₹18,00,000 per year",
        source: { label: "Glassdoor Pune AI Specialist", url: "https://www.glassdoor.co.in/Salaries/pune-ai-specialist-salary-SRCH_IL.0,4_IM1072_KO5,18.htm" },
      },
      {
        role: "Lead AI Strategist (national, 5+ years)",
        band: "₹18,00,000 – ₹35,00,000 per year",
        source: { label: "6figr India Lead AI Strategist (Pune ±10%)", url: "https://6figr.com/in/salary/lead-ai-strategist--t" },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "BMC Software",
      "Bajaj Finserv",
      "Tiger Analytics",
      "Fractal Analytics",
      "Amagi",
      "Fyllo",
      "BharatPe (Pune)",
      "TCS Research and Innovation",
      "Infosys Topaz",
      "Wipro AI&I",
      "Mastercard Pune Tech Hub",
    ],
    rolesAfterCourse: [
      "Prompt Engineer",
      "AI Specialist",
      "AI Trainer",
      "Content Strategist (AI-augmented)",
      "Junior AI Product Manager",
      "Productivity multiplier in your existing role",
    ],
  },

  modesAndDuration: {
    duration: "4 weeks of structured curriculum (~1 month total)",
    classroom: { location: "Archer Infotech, Kothrud, Pune", timing: ["Morning batch — 10:00 to 13:00", "Evening batch — 18:00 to 21:00"] },
    online: {
      timing: ["Same hours as classroom batches", "Recordings available for review"],
      tools: ["Zoom for live sessions", "Anthropic + OpenAI API access (each student funds ~₹500 of API credits)", "GitHub for prompt library", "Slack / WhatsApp for async Q&A"],
    },
    weekend: { timing: ["Saturday + Sunday, 09:00 to 13:00"], durationNote: "Stretches over ~2 months instead of 1." },
    batchPolicy: "Maximum 15 students per batch.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode and concession — Prompt Engineering as a 1-month course typically lands at the lower end. API credits (~₹500 across the course) are paid by the student.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI at no extra cost",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement focus for this course is calibrated for AI Specialist / Prompt Engineer entry roles, plus the productivity-multiplier value for existing-role professionals. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions.",
    ],
    process: [
      "Resume + LinkedIn rewrite emphasising prompt-engineering fluency",
      "GitHub portfolio cleanup — prompt library, evaluation reports",
      "Mock AI Specialist interview rounds",
      "Post-course referrals via our 17-year alumni network",
      "Up to 6 months of continued support",
      "Free re-entry to future batch interview-prep sessions",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "BMC Software",
      "Bajaj Finserv",
      "Tiger Analytics",
      "Fractal Analytics",
      "Amagi",
      "TCS Research and Innovation",
      "Infosys Topaz",
    ],
  },

  comparison: {
    intro: "We compare ourselves against typical Pune Prompt Engineering training institutes on factual rows only.",
    rows: [
      { feature: "Trainers named with photos and LinkedIn", archer: "Yes — Vinod and Amol Patil", typical: "No — generic branding" },
      { feature: "Models covered", archer: "Claude, GPT, Gemini side-by-side", typical: "ChatGPT only" },
      { feature: "Structured output coverage", archer: "Yes — OpenAI Structured Outputs + Pydantic-AI", typical: "Not covered" },
      { feature: "Evaluation discipline", archer: "Test-case-driven prompt iteration + Langfuse telemetry", typical: "Vibes-based 'looks good' demo" },
      { feature: "Domain-specific patterns", archer: "Sales / content / code / legal / medical / financial — 6 domains", typical: "Generic prompts only" },
      { feature: "Public GitHub portfolio output", archer: "Yes — prompt library + evaluation report", typical: "No artefact" },
      { feature: "Open to non-technical professionals", archer: "Yes — designed for both engineers and knowledge workers", typical: "Engineering audience only" },
      { feature: "Course fee transparency", archer: "₹20,000 – ₹90,000 published range", typical: "Hidden behind enquiry form" },
      { feature: "Placement support", archer: "6 months, with free re-entry", typical: "1–3 months or vague" },
      { feature: "Batch size cap", archer: "15 students", typical: "25–40 students" },
    ],
    closing: "Compare with whoever you are considering.",
  },

  versusAlternative: {
    heading: "Prompt Engineering vs ChatGPT & LLMs vs Generative AI?",
    paragraphs: [
      "Three courses with different depth profiles. Prompt Engineering (this course, 1 month) — focused on prompting craft, accessible to non-technical professionals, no backend engineering. ChatGPT & LLMs (2 months) — OpenAI ecosystem depth including function calling, RAG, fine-tuning. Generative AI (3 months) — comprehensive AI engineering across Claude / GPT / Gemini / open-source plus RAG, agents, fine-tuning, multi-modal.",
      "Pick Prompt Engineering if you want focused prompting craft for productivity multiplier or AI Specialist entry. Pick ChatGPT & LLMs for OpenAI engineering. Pick Generative AI for comprehensive AI engineering. Many students take Prompt Engineering first as a 1-month foundation, then progress to ChatGPT & LLMs or Generative AI.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: basic computer use, willingness to commit 5–6 hours per week of practice. Open to engineers and non-technical professionals — no programming experience required (though basic Python / API knowledge helps in week 3).",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation (Anthropic + OpenAI account creation)",
      "Show up to day one with a laptop",
    ],
  },

  faqs: [
    {
      question: "How long does Prompt Engineering training in Pune take at Archer Infotech?",
      answer: "Approximately 1 month — 4 weeks of structured curriculum. Weekend batch stretches over ~2 months.",
    },
    {
      question: "Is this course for non-technical professionals?",
      answer: "Yes — designed for both engineers and knowledge workers. No programming experience required.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — two capstone projects: (1) domain-specific prompt suite with evaluation, (2) curated prompt library / cookbook published on GitHub.",
    },
    {
      question: "Are weekend Prompt Engineering classes available in Pune?",
      answer: "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~2 months instead of 1.",
    },
    {
      question: "What is the fee for the Prompt Engineering course?",
      answer: "Course fees range ₹20,000 – ₹90,000. As a 1-month course, it lands at the lower end. API credits (~₹500) paid by the student.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of placement support calibrated for AI Specialist / Prompt Engineer roles, plus referrals via our alumni network.",
    },
    {
      question: "Are the named trainers actually teaching?",
      answer: "Vinod Patil and Amol Patil personally lead every session of every batch.",
    },
  ],

  finalCta: {
    heading: "Ready to start Prompt Engineering training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 2–3 weeks. Reach out via the enquiry form or call us — Vinod and Amol are happy to spend 30 minutes telling you whether the course fits your goal.",
  },
};
