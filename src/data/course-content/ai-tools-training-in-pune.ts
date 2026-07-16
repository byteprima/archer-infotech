import type { CourseRichContent } from "./types";

export const aiToolsTrainingInPune: CourseRichContent = {
  intro:
    "AI Tools for Productivity is the most-democratic AI course in our catalogue — designed for working professionals across every Pune knowledge-work role (engineers, analysts, marketers, consultants, lawyers, doctors, teachers, founders) who want to build a productivity-multiplier toolkit using ChatGPT, Claude, GitHub Copilot, Cursor, Midjourney, Perplexity, NotebookLM, and the broader 2026 AI-tool ecosystem. Archer Infotech's AI Tools training in Pune is the focused 1-month course covering text AI tools (Claude, ChatGPT, Gemini, Perplexity), creative AI tools (Midjourney, DALL-E, Stable Diffusion, Adobe Firefly), code AI tools (GitHub Copilot, Cursor, Claude Code), automation AI tools (Zapier AI, Make.com, n8n with AI), plus the productivity-integration patterns (research, writing, slide-decks, meeting notes, code reviews, data analysis). The course is open to non-technical professionals and is the natural complement to our Prompt Engineering and Generative AI tracks. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn AI Tools in 2026",
    paragraphs: [
      "AI-tool fluency has become the single biggest productivity differentiator across knowledge-work roles in Pune in 2026. Engineers who use Cursor / Claude Code / GitHub Copilot well ship roughly 30–50% more output per week than equivalent-skill engineers who don't. Marketers who use Claude + Perplexity + Midjourney well produce 5–10× the content volume per week. Consultants who use Claude + NotebookLM well produce client-deliverables in 30–40% less time. Indeed Pune doesn't list 'AI Tools' as a job title (it isn't one), but 'AI-fluent' is increasingly an unwritten requirement on every modern Pune product, marketing, consulting, and PM JD.",
      "What changed in 2026: the tool landscape has consolidated meaningfully. ChatGPT (and Claude, and Gemini) have become daily-driver chat tools. Cursor and Claude Code are now the dominant agentic coding tools (replacing the older Copilot autocomplete pattern). Perplexity has matured as the de-facto research / fact-checking tool. NotebookLM has carved out a specific niche for document-grounded thinking. Midjourney v7 / DALL-E 3 / Stable Diffusion 3.5 / Flux Pro are the dominant image-generation tools. Zapier AI, Make.com AI, and n8n with AI nodes have made low-code automation broadly accessible.",
      "What this means for hiring: AI-tool fluency is now an unwritten requirement on every modern Pune knowledge-work role. The course gives you the daily-driver toolkit and the discipline of integrating these tools into existing workflows — without becoming dependent on them in ways that hurt your underlying craft.",
    ],
    keyPoints: [
      "AI-tool fluency is the single biggest productivity differentiator on knowledge-work roles in 2026",
      "Engineers using Cursor / Claude Code / Copilot ship 30–50% more output per week",
      "Tool landscape has consolidated — ChatGPT, Claude, Cursor, Perplexity, Midjourney, NotebookLM, Zapier AI",
      "Open to non-technical professionals — no programming required",
      "Complement to Prompt Engineering (deeper craft) and Generative AI (engineering depth)",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Working knowledge worker (any role) wanting to build an AI-tool productivity stack",
      "Engineering / BCS / MCA student preparing for the modern Pune workplace where AI fluency is expected",
      "Product manager / consultant / business analyst wanting AI-augmented workflow",
      "Content / marketing / sales / HR professional wanting AI-powered productivity",
      "Founder / solopreneur wanting to leverage AI tools for the things you don't have a team for yet",
      "Designer / creative wanting to integrate Midjourney / DALL-E / Adobe Firefly into your workflow",
      "Domain expert (legal, medical, financial, education) wanting AI-tool productivity in your domain",
    ],
    notForYou: [
      "If you want backend AI engineering (RAG, fine-tuning, agents at depth) — take our Generative AI course",
      "If you want prompting craft as a real engineering discipline — take our Prompt Engineering course",
      "If you want to build AI applications with code — take our ChatGPT & LLMs or Generative AI course",
      "If you only want to learn ChatGPT alone — most of what we teach extends naturally beyond ChatGPT, but if your remit is strictly OpenAI ecosystem you may benefit from our ChatGPT & LLMs course",
    ],
  },

  curriculum: [
    {
      title: "Text AI Tools — ChatGPT, Claude, Gemini, Perplexity",
      weekRange: "Week 1",
      description:
        "The daily-driver text-AI toolkit. Cover ChatGPT (paid plan benefits, Custom GPTs, voice mode, Canvas, Projects), Claude (Sonnet 4.6 / Opus 4.7, Projects, Artifacts, computer use), Gemini (2.5 Pro for long-context, deep research), Perplexity (the de-facto research / fact-checking tool with citations), plus the discipline of choosing the right tool for the right task. Each student builds a personal 'tool selection grid' — a 2-page document explaining when they reach for which tool.",
      topics: [
        "ChatGPT — Custom GPTs, Canvas, Projects, voice mode",
        "Claude — Projects, Artifacts, computer use",
        "Gemini — long-context, deep research",
        "Perplexity — research with citations",
        "NotebookLM — document-grounded thinking",
        "Tool selection grid — when to reach for which",
      ],
    },
    {
      title: "Creative AI Tools — Image, Video, Audio",
      weekRange: "Week 2",
      description:
        "The creative-AI toolkit. Image generation — Midjourney v7 (the de-facto creative-tool default), DALL-E 3 (built into ChatGPT), Stable Diffusion 3.5 / Flux Pro (the open-source / power-user options), Adobe Firefly (the brand-safe enterprise option). Video — Sora, Runway Gen-3, Kling. Audio — ElevenLabs (text-to-speech), Whisper (speech-to-text), Suno / Udio for music. Plus the disciplined patterns — prompt engineering for images, brand-safety filtering, asset pipelines.",
      topics: [
        "Midjourney v7",
        "DALL-E 3 (in ChatGPT)",
        "Stable Diffusion 3.5 / Flux Pro",
        "Adobe Firefly for brand-safe imagery",
        "Sora, Runway Gen-3 for video",
        "ElevenLabs / Whisper for audio",
        "Image-prompt patterns",
        "Asset pipelines and copyright",
      ],
    },
    {
      title: "Code AI Tools — Cursor, Claude Code, GitHub Copilot",
      weekRange: "Week 3",
      description:
        "The 2026 dominant coding-AI tools. Cover Cursor (the IDE that has become the developer default in many Pune product engineering teams) — Composer mode, Agent mode, codebase-wide context. Claude Code (the CLI agentic coding tool) — terminal-native, agentic, integrates with existing workflows. GitHub Copilot (the autocomplete + chat baseline). The honest comparison: when each fits, when each over-promises, plus the discipline of code-review-driven AI-coding (don't ship what you don't understand). Module is included for non-engineers as 'tools your engineering colleagues use' so cross-functional teams have shared vocabulary.",
      topics: [
        "Cursor — Composer, Agent mode",
        "Claude Code — CLI agentic coding",
        "GitHub Copilot — autocomplete + chat",
        "When each fits",
        "Code-review-driven AI coding",
        "Cross-functional vocabulary",
      ],
    },
    {
      title: "Automation, Workflow Integration & Capstone",
      weekRange: "Week 4",
      description:
        "Tying tools together into real workflows. Automation tools — Zapier AI, Make.com, n8n with AI nodes — and the patterns for connecting Gmail / Slack / Notion / Sheets / your CRM with AI-augmented steps. Plus the integration patterns — meeting notes (Otter, Fireflies, Granola), research workflows (Perplexity + Claude + NotebookLM), content workflows (Claude + Midjourney + Canva), code workflows (Cursor + Claude Code + GitHub Copilot). Capstone — design and ship one complete AI-augmented workflow for your specific role / domain.",
      topics: [
        "Zapier AI, Make.com, n8n",
        "Workflow automation patterns",
        "Meeting notes — Otter / Fireflies / Granola",
        "Research workflow — Perplexity + Claude + NotebookLM",
        "Content workflow — Claude + Midjourney + Canva",
        "Code workflow — Cursor + Claude Code + Copilot",
        "Capstone — your role-specific workflow",
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
      title: "Personal AI-Augmented Workflow for Your Role",
      description:
        "Design and document a complete AI-augmented workflow for your specific role (PM, marketer, engineer, consultant, founder, designer, domain expert). Includes a tool-selection grid, the daily-driver chain (research → analysis → drafting → review), a 5-page document explaining the workflow with screenshots, plus measurable productivity metrics from before / after adoption. Becomes a reference artefact you'll use daily.",
      technologies: [
        "ChatGPT / Claude / Gemini",
        "Perplexity / NotebookLM",
        "Cursor / Copilot (if engineer)",
        "Midjourney / DALL-E (if creative)",
        "Zapier / Make.com (for automation)",
      ],
    },
    {
      title: "Domain-Specific Tool-Stack Cookbook",
      description:
        "A documented collection of AI-tool patterns for a specific domain (legal, medical, financial, marketing, consulting, education) — published on GitHub or shared internally. 15+ patterns with examples, model-specific variants, plus the discipline of when AI helps and when it hurts. Becomes a portable knowledge artefact reusable across projects.",
      technologies: [
        "Markdown documentation",
        "Multiple AI tools side-by-side",
        "Domain-specific prompts",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Vinod Patil (Solutions Architect & AI Trainer, 12 years) and Amol Patil (Senior Corporate Trainer, 10+ years). Both use these tools daily and personally take sessions in every batch.",

  careerOutcomes: {
    paragraphs: [
      "AI-tool fluency does not produce a specific job title — it is a productivity-multiplier on every existing role. Engineers who use Cursor / Claude Code well ship more; marketers who use Claude + Perplexity + Midjourney well produce more content; consultants who use Claude + NotebookLM well produce client deliverables faster. Indeed Pune doesn't list 'AI-tool user' as a job, but increasingly every modern JD lists AI fluency as preferred.",
      "What pulls a candidate above the median band on AI-fluency: the ability to articulate a specific workflow, demonstrable productivity gain (metrics before / after), one cross-functional integration project. The course gives you exactly these signals.",
    ],
    salaryBands: [
      {
        role: "Productivity multiplier on existing role (any)",
        band: "20–40% productivity gain typical, role-dependent",
        source: { label: "Industry studies on AI-tool adoption (Anthropic, OpenAI, McKinsey 2025)", url: "https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-state-of-ai" },
      },
      {
        role: "AI Specialist / AI Trainer (Pune entry)",
        band: "₹4,00,000 – ₹8,00,000 per year",
        source: { label: "AmbitionBox Pune AI Specialist", url: "https://www.ambitionbox.com/profile/ai-specialist-salary-in-pune" },
      },
      {
        role: "Senior AI Specialist / AI Trainer (Pune, 3–5 years)",
        band: "₹10,00,000 – ₹18,00,000 per year",
        source: { label: "Glassdoor Pune AI Specialist", url: "https://www.glassdoor.co.in/Salaries/pune-ai-specialist-salary-SRCH_IL.0,4_IM1072_KO5,18.htm" },
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
      "TCS Research and Innovation",
      "Infosys Topaz",
      "Wipro AI&I",
      "Mastercard Pune Tech Hub",
    ],
    rolesAfterCourse: [
      "Productivity multiplier in your existing role",
      "AI Specialist / AI Trainer (entry)",
      "AI-Augmented Content Strategist",
      "AI-Augmented Consultant",
      "AI Product Manager (with PM background)",
    ],
  },

  modesAndDuration: {
    duration: "4 weeks of structured curriculum (~1 month total)",
    classroom: { location: "Archer Infotech, Kothrud, Pune", timing: ["Morning batch — 10:00 to 13:00", "Evening batch — 18:00 to 21:00"] },
    online: {
      timing: ["Same hours as classroom batches", "Recordings available for review"],
      tools: ["Zoom for live sessions", "ChatGPT Plus + Claude Pro recommended (~$20 each / month — student-funded)", "Slack / WhatsApp for async Q&A"],
    },
    weekend: { timing: ["Saturday + Sunday, 09:00 to 13:00"], durationNote: "Stretches over ~2 months instead of 1." },
    batchPolicy: "Maximum 15 students per batch.",
  },

  fees: {
    note:
      "Course fees range ₹20,000 – ₹90,000 depending on mode and concession — AI Tools as a 1-month course typically lands at the lower end. Tool subscriptions (ChatGPT Plus / Claude Pro / Midjourney) are paid by the student directly, typically $20–40 / month total.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI at no extra cost",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "AI Tools is primarily a productivity-multiplier course rather than a placement-focused one. We still offer placement support for students targeting AI Specialist / AI Trainer entry roles. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions.",
    ],
    process: [
      "Resume + LinkedIn rewrite emphasising AI-tool fluency",
      "Documentation of the AI-augmented workflow you built in the capstone",
      "Mock interview rounds for AI Specialist / Trainer roles",
      "Post-course referrals via our 17-year alumni network",
      "Up to 6 months of continued support",
      "Free re-entry to future batch interview-prep sessions",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "Tiger Analytics",
      "Fractal Analytics",
      "Amagi",
      "TCS Research and Innovation",
      "Infosys Topaz",
      "Wipro AI&I",
    ],
  },

  comparison: {
    intro: "We compare ourselves against typical Pune AI Tools training institutes on factual rows only.",
    rows: [
      { feature: "Trainers named with photos and LinkedIn", archer: "Yes — Vinod and Amol Patil", typical: "No — generic branding" },
      { feature: "Tools covered", archer: "ChatGPT + Claude + Gemini + Perplexity + Cursor + Midjourney + Zapier", typical: "ChatGPT only" },
      { feature: "Open to non-technical professionals", archer: "Yes — designed for engineers AND knowledge workers", typical: "Engineering audience only" },
      { feature: "Workflow integration depth", archer: "Full week — automation, meeting notes, research, content, code", typical: "Demos only" },
      { feature: "Code AI tools (Cursor / Claude Code)", archer: "Yes — included as cross-functional vocabulary", typical: "Not covered" },
      { feature: "Public output", archer: "Yes — AI-augmented workflow document, domain cookbook", typical: "No artefact" },
      { feature: "Course fee transparency", archer: "₹20,000 – ₹90,000 published", typical: "Hidden behind enquiry form" },
      { feature: "Placement support", archer: "6 months, with free re-entry", typical: "1–3 months or vague" },
      { feature: "Batch size cap", archer: "15 students", typical: "25–40 students" },
    ],
    closing: "Compare with whoever you are considering.",
  },

  versusAlternative: {
    heading: "AI Tools vs Prompt Engineering vs Generative AI?",
    paragraphs: [
      "Three courses with different depth profiles. AI Tools (this course, 1 month) — broad tool literacy, productivity multiplier, accessible to any knowledge worker. Prompt Engineering (1 month) — focused on prompting craft as a real engineering discipline. Generative AI (3 months) — comprehensive AI engineering across Claude / GPT / Gemini / open-source plus RAG, agents, fine-tuning, multi-modal.",
      "Pick AI Tools if you want broad daily-driver toolkit and productivity multiplier across roles. Pick Prompt Engineering if you want focused prompting craft. Pick Generative AI if you want backend AI engineering. Many students take AI Tools first as a 1-month foundation, then progress to Prompt Engineering or Generative AI.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: basic computer use, willingness to commit 5–6 hours per week of practice. Open to engineers and non-technical professionals — no programming experience required.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call",
      "Confirm enrolment — set up ChatGPT Plus / Claude Pro accounts (student-funded)",
      "Show up to day one with a laptop",
    ],
  },

  faqs: [
    {
      question: "How long does AI Tools training in Pune take at Archer Infotech?",
      answer: "Approximately 1 month — 4 weeks of structured curriculum. Weekend batch stretches over ~2 months.",
    },
    {
      question: "Is this course for non-technical professionals?",
      answer: "Yes — designed for both engineers and knowledge workers. No programming experience required.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — two capstone projects: (1) personal AI-augmented workflow for your role, (2) domain-specific tool-stack cookbook.",
    },
    {
      question: "Do I need paid AI subscriptions?",
      answer:
        "Recommended — ChatGPT Plus and Claude Pro at ~$20 each per month give you access to the frontier models. Midjourney similarly. Total typically $20–40 / month, paid by the student.",
    },
    {
      question: "Are weekend AI Tools classes available in Pune?",
      answer: "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~2 months instead of 1.",
    },
    {
      question: "What is the fee?",
      answer: "Course fees range ₹20,000 – ₹90,000 depending on mode. Tool subscriptions paid by the student.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of placement support for students targeting AI Specialist / Trainer entry roles, plus referrals via our alumni network.",
    },
    {
      question: "Are the named trainers actually teaching?",
      answer: "Vinod Patil and Amol Patil personally lead every session of every batch.",
    },
  ],

  finalCta: {
    heading: "Ready to start AI Tools training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 2–3 weeks. Reach out via the enquiry form or call us — Vinod and Amol are happy to spend 30 minutes telling you whether the course fits your goal.",
  },
};
