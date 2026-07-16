import type { CourseRichContent } from "./types";

/**
 * Agentic AI — rich content overlay.
 *
 * Tier 2 quality. The newest course in the catalogue (added 2026-06-06).
 * Anchors:
 *  - LangChain + LangGraph as primary teaching frameworks
 *  - OpenAI Assistants + Claude tool use covered directly (not just via wrapper)
 *  - Salary bands from Pune AI Engineer listings (Naukri + LinkedIn last 90d)
 *  - Multi-agent + production observability emphasis
 *  - Pune product company concentration (Persistent, Avaamo, Helpshift, GUVI)
 *
 * Pillar 4 P3-01 rich content + P4-10 follow-up — fourth and final of 4.
 */

export const agenticAITrainingInPune: CourseRichContent = {
  intro:
    "Agentic AI is the fastest-growing GenAI specialisation in Pune's product-engineering market — the discipline of building AI systems that reason, plan, call tools, and execute multi-step workflows. This 2-month programme moves beyond prompt engineering and chatbots to production agent systems: LangChain + LangGraph for stateful agent graphs, OpenAI Assistants API + Function Calling, Claude tool use, multi-agent orchestration, vector-backed memory, observability with LangSmith, and a deployed capstone agent. Designed for Python developers, backend engineers, and data scientists moving up the AI stack.",

  whyLearn: {
    heading: "Why Learn Agentic AI in Pune in 2026",
    paragraphs: [
      "The shift from prompt-engineering to agent-engineering is the most consequential change in the AI engineering job market since the GPT-4 release. Pune product companies (Persistent's Avaamo group, Helpshift, GUVI, BrowserStack's AI team, Druva, Avaamo, ZS Associates' AI practice) and the IT services AI centres of excellence (TCS AI, Infosys Topaz, Wipro AI360, Capgemini AI CoE) shifted hiring in 2025 from 'prompt engineer' to 'AI engineer / agentic AI developer.' The pure prompt-engineering role is fading; the agent-development role is where the budgets are moving. Pune AI Engineer listings ran 200–400 per month consistently through the second half of 2025 across Naukri + LinkedIn — small absolute numbers but consistently above the supply curve.",
      "The salary signal: Pune AI Engineer fresher-to-mid offers currently sit ₹8–15 LPA, materially above the equivalent Java/Python development band (₹4–7 LPA). The reason is supply-side: very few candidates can demonstrate working agent systems with tool calls, multi-step planning, and production observability hookups. Hiring managers are willing to pay a premium for engineers who can ship a working LangGraph agent that recovers from tool-call failures, prunes context intelligently, and runs within cost budgets. The certificate of competence is a deployed working agent on GitHub — exactly what this course's capstone delivers.",
      "What separates this course from the free YouTube agentic AI content: the difficult parts of agent engineering aren't the framework APIs (LangChain is well-documented). They're the production realities — observability hookups so you can debug a 7-step agent loop, eval frameworks (deterministic + LLM-as-judge) so you can detect quality regressions, cost controls + caching strategies, memory pruning when context windows fill, error recovery patterns when tool calls fail, and multi-agent orchestration patterns. Those are the modules that turn 'I followed a LangChain tutorial' into 'I shipped a production agent.'",
    ],
    keyPoints: [
      "200–400 active Pune AI Engineer listings each month (H2 2025)",
      "Pune AI Engineer fresher-to-mid band: ₹8–15 LPA",
      "₹3–6 LPA premium over equivalent dev roles due to supply gap",
      "LangChain + LangGraph = Pune market default",
      "Sr Agentic AI Engineer in Pune product cos = ₹18–30 LPA",
      "Direct path to Architect / Founding AI Engineer at startups",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Python developers (1+ years) wanting to pivot into the highest-paying engineering specialisation in 2026",
      "Backend engineers comfortable with REST APIs who want to add agent-orchestration to their stack",
      "Data scientists who've moved from notebooks into production and want to own the LLM-application layer",
      "Generative AI track graduates wanting agent-development depth beyond prompt engineering",
      "Engineering team leads evaluating LLM platforms who need hands-on agent-building literacy",
    ],
    notForYou: [
      "Complete coding beginners — start with our Python track first; agentic AI assumes intermediate Python comfort",
      "Anyone wanting to train or fine-tune foundation models — that's an entirely different specialisation (ML engineering, not agent engineering)",
      "Folks targeting pure data-engineering roles — vector stores + RAG are covered but not as the core",
      "Candidates expecting a no-code agent course — every module has hands-on code; LangGraph in particular requires comfort with async Python",
    ],
  },

  curriculum: [
    {
      title: "Foundations: LLMs as Reasoning Engines",
      weekRange: "Week 1–2",
      description:
        "The mental model shift. LLM APIs reframed not as text completers but as reasoning engines that can be steered to produce structured decisions. Tool / function calling fundamentals — the single most-important agent primitive — taught against both OpenAI and Anthropic SDKs so you understand the cross-vendor patterns. System prompts + behaviour shaping. Structured outputs (JSON mode, schema-constrained generation). Token economics + context-window strategy that actually maps to how you'll budget production agents. The most important Week 2 lesson: when an agent is the right tool vs when a simple workflow with one LLM call is better.",
      topics: [
        "OpenAI + Anthropic + Google LLM API basics (cross-vendor)",
        "Function / tool calling — the agent's most important primitive",
        "System prompts + behaviour shaping (with worked examples)",
        "Structured outputs — JSON mode, schema constraints, retry on parse failure",
        "Token economics + context-window strategy",
        "Streaming vs blocking responses",
        "When agents are NOT the answer — workflow vs agent decision frame",
      ],
    },
    {
      title: "Agent Frameworks",
      weekRange: "Week 3–4",
      description:
        "The framework tour, but with discipline. LangChain core — chains, runnables, the LangChain Expression Language — covered as the most-widely-deployed agent framework in 2026 but with explicit notes on its abstraction overhead. LangGraph (Salesforce-AI's stateful agent graph framework, now LangChain's recommended pattern) — the production default. OpenAI Assistants API + Threads as the vendor-native alternative. Claude tool use + Computer Use API direct against the SDK so you know what the framework wrappers are hiding. By end of Module 2 you'll have built a single-agent ReAct loop from scratch without a framework — then with LangGraph — and understand exactly what abstractions you bought.",
      topics: [
        "LangChain core — chains, runnables, expression language",
        "LangGraph — stateful agent graphs, the production pattern",
        "OpenAI Assistants API + Threads + Runs",
        "Claude tool use + Computer Use API",
        "Cross-framework comparison: when to use which",
        "Building a ReAct loop from scratch (no framework)",
        "Rebuilding the same loop with LangGraph",
      ],
    },
    {
      title: "Multi-step Workflows + Memory",
      weekRange: "Week 5–6",
      description:
        "Where agent engineering gets hard. ReAct + reflection patterns — the agent observes its own output and decides whether to continue, replan, or finish. Plan-and-execute architectures (LangGraph's plan-and-execute primitive) for tasks that benefit from explicit upfront decomposition. Short-term vs long-term memory and the architectural patterns for each. Vector stores for episodic memory — Pinecone, Weaviate, pgvector — taught against the cost-and-latency trade-offs that matter in production. Conversation summarisation + context pruning when context windows fill. Error recovery + retry strategies (the most common production failure mode).",
      topics: [
        "ReAct + self-reflection loops",
        "Plan-and-execute agent architectures",
        "Memory taxonomy — short-term, long-term, episodic, working",
        "Vector stores — Pinecone, Weaviate, pgvector comparison",
        "Embedding strategy + chunk size + retrieval tuning",
        "Conversation summarisation + context pruning patterns",
        "Error recovery + retry strategies",
        "Capstone milestone: single-agent system with memory deployed locally",
      ],
    },
    {
      title: "Multi-Agent Systems + Production",
      weekRange: "Week 7–8",
      description:
        "The production handoff. Supervisor + worker multi-agent patterns (LangGraph's recommended approach). Agent-to-agent communication protocols and when MCP (Model Context Protocol) fits. Tool registries + permission models for trustworthy production agents. Observability with LangSmith and Helicone — non-negotiable for production agent debugging. Eval frameworks: deterministic checks + LLM-as-judge + human-in-the-loop sampling. Cost controls + caching strategies (the difference between sustainable and bankrupt agent products). Deployment patterns: FastAPI + serverless edge. The 2-week capstone closes with a deployed multi-step multi-agent system you can demo at interview.",
      topics: [
        "Multi-agent patterns — supervisor + worker, hierarchical, swarm",
        "MCP (Model Context Protocol) basics",
        "Tool registries + permission models",
        "Observability — LangSmith, Helicone, instrumentation patterns",
        "Evals: deterministic + LLM-as-judge + human-sampled",
        "Cost controls + caching + token budgeting",
        "Deployment — FastAPI + Vercel / Cloudflare Workers",
        "Capstone (final 2 weeks): deployed multi-agent system",
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
      title: "Research Agent with Web Search + Memory",
      description:
        "Build a single-agent research assistant that takes a research question, plans a multi-step approach, executes web searches + content extraction, maintains short-term memory across turns, and produces a sourced final answer. Built with LangGraph, deployed locally with FastAPI, instrumented with LangSmith for trace inspection. The portfolio piece that demonstrates ReAct + tool use + memory in one artefact.",
      technologies: ["LangGraph", "Python 3.11+", "OpenAI / Anthropic SDK", "Tavily / Serper for web search", "FastAPI", "LangSmith"],
    },
    {
      title: "Customer Support Agent with RAG + Tool Calls",
      description:
        "A production-style customer support agent backed by a vector store of your company's documentation (PDF + Markdown + HTML chunking), with tool calls for ticket creation in a sample CRM, refund initiation in a sample billing API, and escalation to a human queue. Includes a basic eval harness (deterministic + LLM-as-judge) that catches regressions. Deployed to a free-tier Cloudflare Worker.",
      technologies: ["LangChain + LangGraph", "pgvector / Pinecone", "OpenAI Assistants OR Claude tool use", "FastAPI", "Cloudflare Workers", "Eval harness (basic LLM-as-judge)"],
    },
    {
      title: "Multi-Agent Capstone — Supervisor + Specialist Workers",
      description:
        "The closing capstone. A supervisor agent routes incoming tasks to specialist worker agents (e.g. a code-writing agent, a database-query agent, a web-search agent), aggregates their outputs, and decides next actions. Full observability via LangSmith, deterministic + LLM-as-judge evals, cost controls + caching, deployed to Vercel or Cloudflare with a streaming web UI. This is the project that closes Pune AI Engineer interviews when shown live.",
      technologies: ["LangGraph (supervisor pattern)", "Python", "OpenAI + Anthropic (multi-vendor routing)", "pgvector for shared agent memory", "LangSmith observability", "Vercel or Cloudflare deployment", "Streaming response UI"],
    },
  ],

  trainersIntro:
    "The Agentic AI track is taught by trainers actively shipping LLM applications at Pune product companies — so framework patterns and production observability stories are from current 2026 engagements, not 2023 tutorials.",

  careerOutcomes: {
    paragraphs: [
      "The Pune AI Engineer market is supply-constrained: hiring managers consistently report 6–10x more open headcount than qualified candidates in the agentic AI specialisation. The result is a premium compensation band that doesn't look like the rest of the Pune dev market. Fresher AI Engineer roles at product companies (Persistent's Avaamo group, Helpshift, GUVI, ZS Associates' AI practice, Druva's AI team, BrowserStack's AI team) currently land ₹8–12 LPA. Services-major AI practices (TCS AI, Infosys Topaz, Wipro AI360, Capgemini AI CoE, Accenture's AI delivery centre) hire at ₹6–10 LPA — still above the equivalent Java/Python fresher band. The premium is paid for the working-agent-on-GitHub signal: hiring managers will hire a candidate with no AI engineering work-experience but a deployed LangGraph agent over a candidate with general Python experience.",
      "The career arc accelerates: 1 year + 2 production agent systems = ₹12–18 LPA. 3 years + multi-agent system + observability + eval framework experience = ₹20–30 LPA. 5+ years moves to Sr AI Engineer / Staff Engineer / Founding AI Engineer at startups — the latter often involves equity + ₹25–40 LPA base + bonus. Onshore (US) AI Engineer roles for 3-year experienced Pune candidates have offered $150K–220K USD base in 2025–2026. We don't promise the onshore arc; we map the realistic path. Source: Naukri + LinkedIn Pune AI Engineer listings (last 90 days, sampled 2026-06).",
    ],
    salaryBands: [
      {
        role: "AI Engineer / Agentic AI Developer (fresher)",
        band: "₹6–10 LPA (services) / ₹8–12 LPA (product)",
        source: { label: "LinkedIn Pune AI Engineer listings", url: "https://www.linkedin.com/jobs/search/?keywords=AI+engineer+langchain&location=Pune" },
      },
      {
        role: "Agentic AI Engineer (1–3 yrs)",
        band: "₹12–18 LPA",
        source: { label: "Naukri Pune AI Engineer listings", url: "https://www.naukri.com/ai-engineer-jobs-in-pune" },
      },
      {
        role: "Senior AI Engineer (3–6 yrs)",
        band: "₹20–30 LPA",
        source: { label: "Glassdoor Pune Senior AI Engineer", url: "https://www.glassdoor.co.in/Salaries/pune-senior-ai-engineer-salary-SRCH_IL.0,4_IM1064_KO5,22.htm" },
      },
      {
        role: "Staff / Founding AI Engineer (6+ yrs)",
        band: "₹30–50+ LPA + equity at startups",
        source: { label: "AmbitionBox Pune Staff Engineer + Pune AI startup compensation reports", url: "https://www.ambitionbox.com/profile/staff-engineer-salary" },
      },
    ],
    hiringCompanies: [
      "Persistent Systems (Avaamo AI group)",
      "Helpshift",
      "GUVI",
      "BrowserStack (AI team)",
      "Druva (AI engineering)",
      "ZS Associates (AI practice)",
      "Avaamo",
      "TCS AI",
      "Infosys Topaz",
      "Wipro AI360",
      "Capgemini AI CoE",
      "Accenture AI",
      "Cognizant AI practice",
      "Mphasis Stelligent (AI delivery)",
      "Various Pune AI startups (founding-engineer roles)",
    ],
    rolesAfterCourse: [
      "AI Engineer",
      "Agentic AI Developer",
      "GenAI Application Engineer",
      "AI Solutions Engineer",
      "LLM Application Engineer",
      "Founding AI Engineer (startup)",
      "GenAI Architect (with senior experience)",
    ],
  },

  modesAndDuration: {
    duration: "2 months (8 weeks) weekday/online; 10 weeks weekend",
    classroom: {
      location: "Archer Infotech Kothrud campus (Flat No. 12, Divyadarshan Housing Society, Kothrud, Pune 411038)",
      timing: [
        "Evening batch: Monday–Friday 19:00–20:30 (heavily preferred for working professionals)",
        "Saturday lab session: 10:00–13:00 (capstone build + deployment practice)",
      ],
    },
    online: {
      timing: ["Live sessions: Monday–Friday 20:00–21:30 IST", "Recordings in LMS within 24 hrs", "Capstone deployment-help office hours on Saturdays"],
      tools: ["Google Meet for live sessions", "OpenAI + Anthropic API keys (we provide credits for course duration; you can also use your own)", "GitHub for capstone code", "LangSmith free tier (we provide)", "Slack batch channel"],
    },
    weekend: {
      timing: ["Saturday + Sunday 10:00–13:00 (6 hrs/week)"],
      durationNote: "Weekend track runs 10 weeks to maintain contact-hour parity",
    },
    batchPolicy:
      "Batch sizes capped at 16 for the weekday/online tracks and 10 for the weekend track — smaller than our other tracks because agentic AI debugging requires per-student trainer attention (production agent debugging is iterative). New batches start every 4–6 weeks; the track is among our most-requested. Book early.",
  },

  fees: {
    note: "Agentic AI is priced in the upper band of our catalogue reflecting trainer specialisation, smaller batch size, and the LLM API credits + LangSmith access we provide for the course duration. EMI available; contact admissions for current fee.",
    range: "₹40,000 – ₹60,000 (typical track band, includes provided API credits)",
    sourceCitation: { label: "Archer Infotech 2026 fee schedule", url: "/contact" },
    paymentOptions: [
      "One-time payment (5% discount)",
      "EMI: 50% at enrolment + 50% at week 4",
      "EMI: 3-month plan (1/3 monthly)",
      "Note: LLM API usage beyond provided credits during capstone phase typically costs ₹500–1,500 self-paid (your own OpenAI / Anthropic key)",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support is bundled — no separate fee. The Agentic AI placement pipeline runs differently than our other tracks because hiring volume is smaller but offers are higher. Rather than 100+ partner-company introductions, we run a more curated process: 20–30 high-quality introductions to the Pune product companies and AI-practice teams actively hiring agent engineers. The placement workflow starts in Week 5 (parallel to the multi-step workflows module) — CV + GitHub portfolio review + capstone scoping discussion — so by graduation week your portfolio is interview-ready.",
      "We don't guarantee placement. Our institute-records rate is 90% across all tracks; the Agentic AI track is too new for a meaningful placement-rate average (only ~25 graduates so far) but early signals are strong because the supply-demand imbalance favours graduates. The bottleneck for agentic AI placements is almost always the working-agent demonstration — graduates with a deployed capstone agent on GitHub place 3–5x faster than those who couldn't get a capstone shipped.",
    ],
    process: [
      "Week 5: CV review + GitHub portfolio review + capstone project scoping discussion",
      "Week 6: First mock interview (technical — LangChain/LangGraph code walkthrough + tool-calling design questions)",
      "Week 7: Second mock interview (system design — multi-agent architecture + observability + cost questions)",
      "Week 8: Curated introductions to 20+ Pune product companies + AI-practice teams",
      "Post-completion: Weekly 1:1 placement-cell support for 8 weeks, with capstone iteration help",
    ],
    partnerCompanies: [
      "Persistent Systems (Avaamo AI group)",
      "Helpshift",
      "GUVI",
      "BrowserStack (AI team)",
      "Druva",
      "ZS Associates",
      "Avaamo",
      "TCS AI",
      "Infosys Topaz",
      "Wipro AI360",
      "Various Pune AI startups via founder-network introductions",
      "20+ curated AI-team partners across Pune product + services AI practices",
    ],
  },

  comparison: {
    intro:
      "How Archer Infotech's Agentic AI track compares against the typical Pune training-institute version of this course (and free YouTube agentic AI content). Anonymous comparison from candidates who switched in or considered alternatives.",
    rows: [
      { feature: "Framework depth", archer: "LangChain + LangGraph + OpenAI Assistants + Claude tool use direct against SDKs", typical: "LangChain-only tutorial walkthrough, no LangGraph, no direct SDK exposure" },
      { feature: "Build-from-scratch discipline", archer: "ReAct loop built without a framework first, THEN with LangGraph — you understand what abstractions buy", typical: "Framework-first only — you don't know what's underneath" },
      { feature: "Production observability", archer: "Full module on LangSmith + Helicone + instrumentation patterns", typical: "Not covered" },
      { feature: "Eval frameworks", archer: "Deterministic + LLM-as-judge + human-in-the-loop sampling covered", typical: "'You'll figure it out in production' — i.e. not covered" },
      { feature: "Multi-agent patterns", archer: "Supervisor + worker, hierarchical, swarm patterns with hands-on builds", typical: "Single-agent only" },
      { feature: "Cost + caching strategy", archer: "Full session on cost controls, semantic caching, token budgeting", typical: "Not covered (until your first AWS bill shock)" },
      { feature: "Capstone deployment", archer: "Deployed to Vercel or Cloudflare with working public URL — demo-able at interviews", typical: "Local-only Jupyter notebooks" },
      { feature: "Class size", archer: "Under 16 weekday/online, under 10 weekend (small for per-student agent debugging)", typical: "30–50 (impossible to debug per-student agent loops)" },
      { feature: "Trainer profile", archer: "Active LLM-application engineers at Pune product cos", typical: "Trainers who took a LangChain bootcamp 18 months ago" },
    ],
    closing:
      "The differentiator at hiring stage is the deployed-and-demo-able capstone agent. Free YouTube content can teach the API surface; what it can't teach is the production-readiness discipline that makes the difference between 'I followed a tutorial' and 'I shipped a real agent.'",
  },

  versusAlternative: {
    heading: "Agentic AI vs Generative AI vs Machine Learning — Which Should You Pick?",
    paragraphs: [
      "Three adjacent but distinct AI career paths. Machine Learning Engineer = training and deploying ML models (deep statistical / math background, typically Masters' / PhD pipeline for senior roles). Generative AI Engineer (our generic GenAI track) = working with foundation models as a user — prompt engineering, RAG, fine-tuning. Agentic AI Engineer (this track) = building autonomous systems on top of foundation models — multi-step planning, tool use, multi-agent orchestration.",
      "Pune hiring volume in 2026: ML Engineer ~100–200 listings/month (steady, demands deep ML background); Generative AI Engineer ~200–400 listings/month (rapidly hiring but compensation softer than agentic); Agentic AI Engineer ~200–400 listings/month and growing fast (highest premium). If your goal is maximum Pune market access AND highest compensation premium at fresher-to-mid level, agentic AI is the right pick — provided you have intermediate Python comfort going in. If you don't have Python comfort, do our Python track first, then come back to this.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "The course assumes intermediate Python comfort — comfortable with classes, async functions, REST API calls, and basic familiarity with Git + command line. Deep ML / model-training background is NOT required; agentic AI is about orchestrating existing foundation models, not training new ones. About 50% of each batch are Python developers with 1+ years experience; ~30% are backend engineers from non-Python stacks who picked up Python recently; ~20% are data scientists moving up the stack. Week 1 includes a Python+LLM-API refresher for anyone who needs it but doesn't slow the pace for those who don't.",
      "Before you enrol, the 5-step starting sequence below makes Week 1 smoother. None of it is gated.",
    ],
    suggestedSteps: [
      "Create an OpenAI API account + add ~$5 credit (api.openai.com) — first API call exposure beats reading docs",
      "Create an Anthropic API account + add ~$5 credit (console.anthropic.com) — we use both vendors for cross-vendor patterns",
      "Install Python 3.11+ and verify `python --version` works",
      "Skim the OpenAI Function Calling documentation (~30 min) so the tool-use concept is familiar before Week 2",
      "Read the LangChain 'Get Started' page (~15 min) just to see the surface area; we'll teach the depth",
    ],
  },

  faqs: [
    {
      question: "What's the difference between an LLM and an AI agent?",
      answer:
        "An LLM is a single-call inference engine — give it a prompt, get a completion. An AI agent is an LLM in a loop: it can call tools (search the web, query a database, execute code), observe the results, and decide what to do next until a goal is achieved. This course teaches the second. Agents add planning, memory, tool use, error recovery, and multi-step decision-making on top of the LLM primitive.",
    },
    {
      question: "Do I need to know Python or have ML background?",
      answer:
        "Python yes — the entire ecosystem (LangChain, LangGraph, OpenAI/Anthropic SDKs) is Python-first. Intermediate Python comfort is the prereq: classes, async functions, REST API calls. Deep ML / model-training background is NOT required — agentic AI is about orchestrating existing foundation models, not training them. If you can write Python and understand REST APIs, you can take this course. Week 1 includes a Python+LLM-API refresher.",
    },
    {
      question: "Which frameworks does the course actually use?",
      answer:
        "LangChain + LangGraph as primary teaching frameworks (largest ecosystem, most Pune job postings reference them). OpenAI Assistants API and Claude tool use covered directly against SDKs — so you understand what abstractions exist and when to bypass them. Side coverage of LlamaIndex (RAG-heavy) and CrewAI (multi-agent specialist). No framework lock-in — by graduation you can pick the right tool per project, not just default to whatever you learned first.",
    },
    {
      question: "What career roles does this prepare me for and what's the realistic Pune salary?",
      answer:
        "AI Engineer / Agentic AI Developer (₹8–12 LPA fresher at Pune product companies, ₹6–10 LPA at services AI practices), GenAI Application Engineer, LLM Application Engineer. With 1 year + 2 production agent systems on GitHub = ₹12–18 LPA. 3+ years = ₹20–30 LPA. Pune product cos (Persistent, Helpshift, GUVI, Avaamo, BrowserStack AI) and services AI practices (TCS AI, Infosys Topaz, Wipro AI360, Capgemini AI CoE) all hire. Source: Naukri + LinkedIn Pune AI Engineer listings, last 90 days.",
    },
    {
      question: "How much do the LLM API calls actually cost during the course?",
      answer:
        "We provide OpenAI + Anthropic API credits for course duration sufficient for modules 1–3. The capstone phase (modules 4) typically requires ~₹500–1,500 of self-paid API usage as agents run multi-step loops for testing. Cost controls + caching are explicitly taught (one of the modules' core skills) so you learn to keep agent operating costs sustainable — both for the course and your eventual production work.",
    },
    {
      question: "How is this different from the Generative AI track?",
      answer:
        "Generative AI (our GenAI track) covers the LLM-application layer: prompt engineering, RAG, fine-tuning, vendor APIs. Agentic AI (this track) is one level up the stack: building autonomous systems that reason, plan, call tools, manage memory, recover from errors. Generative AI Engineer = strong on prompts and RAG. Agentic AI Engineer = builds multi-step agents in production. The agentic AI specialisation pays ₹2–4 LPA more at fresher-to-mid in Pune currently due to supply gap.",
    },
    {
      question: "Will the course cover MCP (Model Context Protocol) and Computer Use?",
      answer:
        "MCP yes, at depth — it's becoming the standard agent-to-tool protocol in 2026 and we cover both consuming MCP servers and exposing your own tools as MCP. Claude Computer Use API yes, conceptually + a hands-on demo — full Computer Use production deployment is its own specialisation. Both topics are in the closing modules so the framework foundations are solid before the protocol layer is added.",
    },
    {
      question: "What's the placement process for such a new and specialised track?",
      answer:
        "Smaller volume but higher quality. Rather than 100+ broad partner introductions, we run a curated process of 20–30 introductions to Pune AI-practice teams and product companies actively hiring agent engineers. The bottleneck for agentic AI placements is consistently the working-agent-on-GitHub artefact — graduates with a deployed capstone agent place 3–5x faster than those who couldn't ship the capstone. We track this and prioritise capstone-completion support over abstract interview prep.",
    },
  ],

  finalCta: {
    heading: "Ready to start Agentic AI training in Pune?",
    paragraph:
      "Two months from now you can have a deployed multi-agent system on Vercel or Cloudflare, a LangSmith-instrumented agent on GitHub, eval frameworks shipping, and the placement cell introducing you to Pune product companies hiring AI engineers. The next batch typically starts within 4 weeks; weekday, weekend, and live-online formats all available. Visit the contact page, message us on WhatsApp, or call admissions for the current batch schedule.",
  },
};
