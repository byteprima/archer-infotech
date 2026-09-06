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
      title: "Foundations of Agentic AI — Agents, Chatbots and Workflows",
      weekRange: "Week 1",
      description:
        "The distinction the whole course rests on, made precise before any code. A chatbot answers. A workflow executes a sequence you wrote. An agent is given a goal and decides for itself what steps to take, which tools to call, and when it is done — and that autonomy is exactly what makes agents powerful, expensive, hard to test and occasionally dangerous.\n\nYou work through where each of the three is the right answer, using real business processes rather than toy examples: a support ticket triage, a lead qualification flow, a document review. The most valuable output of the week is the ability to say no — to recognise the large class of problems where a deterministic workflow with one LLM call is cheaper, faster and more reliable than an agent, which is the judgement that distinguishes an engineer from someone who has read the marketing.",
      topics: [
        "What Agentic AI means and where the term is misused",
        "Chatbots versus AI agents versus fixed workflows",
        "Generative AI versus Agentic AI",
        "Why agentic systems matter now",
        "Real-world use cases across support, sales, HR and engineering",
        "Autonomy as a cost — testing, debugging and trust",
        "Matching agent complexity to business value",
        "When to avoid agents and use deterministic software",
        "Opportunities, risks and current limitations",
        "Mapping a business process into candidate agent steps",
      ],
    },
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
        "Reasoning, planning and instruction following",
        "Token economics + context-window strategy",
        "Model behaviour over long multi-step tasks",
        "Model selection for agentic systems",
        "Streaming vs blocking responses",
        "When agents are NOT the answer — workflow vs agent decision frame",
      ],
    },
    {
      title: "Agent Architecture — Goals, Planning, Tools, Memory, State",
      weekRange: "Week 2",
      description:
        "The anatomy of an agent, component by component, so that later framework code is recognisable rather than magical. An agent is a loop around five parts: a goal and its instructions, a context it can read, a set of tools it can call, a memory it can write to and read back, and a state that survives between steps. Take any one away and you get a different, usually worse, system.\n\nYou build a single-agent ReAct loop by hand — no framework — so the observe / think / act cycle, the stopping condition and the state object are code you wrote rather than abstractions you imported. This is the module students most often say made the frameworks in Week 3 click, because every LangGraph node afterwards maps to something they have already implemented themselves.",
      topics: [
        "The five components of an agent",
        "Goals, instructions and context design",
        "Planning and task decomposition",
        "The observe, think, act and reflect loop",
        "Agent state and what must survive a step",
        "Stopping conditions and step limits",
        "Tool use as the agent's interface to the world",
        "Short-term versus long-term memory",
        "Building a ReAct loop from scratch, no framework",
        "Reading an agent trace and finding the bad step",
      ],
    },
    {
      title: "Tools and Function Calling in Depth",
      weekRange: "Week 2–3",
      description:
        "Tools are where an agent stops being a conversation and starts having effects, so they get a module of their own rather than a passing mention. You build the four families the job actually requires: API tools against a real third-party service with authentication and rate limits, database tools with parameterised queries, search and retrieval tools over a document set, and file or document tools that read and write real artefacts.\n\nThe engineering half is where the marks are. Tool schemas written so the model picks correctly rather than plausibly; input validation that assumes the model will pass something wrong, because it will; result handling that turns an API error into something the agent can recover from rather than a stack trace; idempotency so a retried call does not charge a customer twice. You also classify tools by risk — read-only, reversible write, irreversible action — which is the classification the security module later builds permissions on.",
      topics: [
        "What a tool is in an agentic system",
        "Function-calling schemas that the model picks correctly",
        "API tools — authentication, pagination, rate limits",
        "Database tools and safe parameterised queries",
        "Search and retrieval tools",
        "File and document tools",
        "Tool input validation and type coercion",
        "Tool result handling and error recovery",
        "Idempotency and safe retries",
        "Read-only, reversible and irreversible tool classes",
        "Tool descriptions as prompt engineering",
        "Building a tool-enabled assistant prototype",
      ],
    },
    {
      title: "Agent Frameworks — LangChain, LangGraph, Agents SDK, CrewAI",
      weekRange: "Week 3–4",
      description:
        "The framework tour, but with discipline. LangChain core — chains, runnables, the LangChain Expression Language — covered as the most-widely-deployed agent framework in 2026 but with explicit notes on its abstraction overhead. LangGraph — stateful agent graphs, the production default. OpenAI Assistants and the Agents SDK as the vendor-native alternative. Claude tool use + Computer Use API direct against the SDK so you know what the framework wrappers are hiding. CrewAI and AutoGen-style multi-agent frameworks covered for their role-based model.\n\nBecause you built a ReAct loop by hand in Week 2, you rebuild that same loop with LangGraph here and can state precisely what abstraction you bought and what it cost you in debuggability. The module closes on framework selection for a project — and on the case for no framework at all, which for a two-tool agent is often correct.",
      topics: [
        "LangChain core — chains, runnables, expression language",
        "LangGraph — stateful agent graphs, the production pattern",
        "OpenAI Assistants API + Threads + Runs, and the Agents SDK",
        "Claude tool use + Computer Use API",
        "CrewAI and role-based agent frameworks",
        "AutoGen-style multi-agent concepts",
        "Spring AI agentic patterns for Java teams",
        "Cross-framework comparison: when to use which",
        "Rebuilding the hand-written ReAct loop with LangGraph",
        "When no framework is the right answer",
      ],
    },
    {
      title: "Agent Design Patterns — Router, Sequential, Parallel, Evaluator",
      weekRange: "Week 4",
      description:
        "Most working agentic systems are not one clever autonomous agent; they are a small number of well-understood patterns composed together. This module names them so you can reach for the right one instead of reinventing it, and so you can recognise them in an architecture discussion at interview.\n\nThe router pattern classifies an incoming request and dispatches it. The sequential pattern runs deterministic steps with an LLM at each. The parallel pattern fans work out and merges results. The evaluator-optimiser pattern has one model produce and another critique until a quality bar is met. The supervisor-worker pattern delegates to specialists. Human-in-the-loop inserts an approval gate. For each you cover what it costs, how it fails and the size of problem it suits — and you implement two of them against the same task so the trade-off is something you have measured rather than read.",
      topics: [
        "Single-agent workflow",
        "Router pattern for request classification",
        "Sequential and chained workflows",
        "Parallel fan-out and result merging",
        "Evaluator-optimiser loops",
        "Supervisor and worker delegation",
        "Human-in-the-loop approval gates",
        "Choosing a pattern by cost, latency and failure mode",
        "Composing patterns without losing traceability",
        "Implementing two patterns against one task and comparing",
      ],
    },
    {
      title: "Multi-step Workflows + Memory",
      weekRange: "Week 5",
      description:
        "Where agent engineering gets hard. ReAct + reflection patterns — the agent observes its own output and decides whether to continue, replan, or finish. Plan-and-execute architectures (LangGraph's plan-and-execute primitive) for tasks that benefit from explicit upfront decomposition. Short-term vs long-term memory and the architectural patterns for each. Vector stores for episodic memory — Pinecone, Weaviate, pgvector — taught against the cost-and-latency trade-offs that matter in production. Conversation summarisation + context pruning when context windows fill. Error recovery + retry strategies (the most common production failure mode).",
      topics: [
        "ReAct + self-reflection loops",
        "Plan-and-execute agent architectures",
        "Memory taxonomy — short-term, long-term, episodic, working",
        "Conversation memory, task memory and user-preference memory",
        "Vector stores — Pinecone, Weaviate, pgvector comparison",
        "Vector-based memory retrieval and updating",
        "Embedding strategy + chunk size + retrieval tuning",
        "Conversation summarisation + context pruning patterns",
        "Memory privacy, retention and user consent",
        "Error recovery + retry strategies",
        "Capstone milestone: single-agent system with memory deployed locally",
      ],
    },
    {
      title: "Planning, Replanning and Human-in-the-Loop Review",
      weekRange: "Week 5–6",
      description:
        "An agent that plans once and executes blindly fails on the first tool error. This module is about what happens after something goes wrong, which in production is most of the time. You cover task decomposition into steps small enough to verify, replanning when a step fails or returns something unexpected, and the difference between a retryable failure and one that should stop the run and ask a person.\n\nHuman-in-the-loop is treated as an architectural decision rather than a safety afterthought: where to put an approval checkpoint, what to show the reviewer so the decision takes seconds rather than minutes, how to hold agent state while waiting for a human who may not return for hours, and how to resume cleanly. You also cover controlling long-running tasks — step budgets, wall-clock limits, cost ceilings and cancellation — because an agent that loops without a bound is the single most expensive bug in this field.",
      topics: [
        "Task breakdown into verifiable steps",
        "Step-by-step planning and plan representation",
        "Replanning after tool failure or unexpected output",
        "Retryable failures versus stop-and-ask failures",
        "Human approval checkpoints and what to show a reviewer",
        "Holding and resuming agent state across a human wait",
        "Agent reflection and self-critique",
        "Step budgets, time limits and cost ceilings",
        "Cancellation and clean shutdown of a run",
        "Building safer workflows for sensitive tasks",
      ],
    },
    {
      title: "Retrieval-Augmented Agents and Agentic RAG",
      weekRange: "Week 6",
      description:
        "Agents that answer from a knowledge base rather than from training data — the most commonly deployed agentic pattern in Indian enterprise work, because it is the one with an obvious business case. You start from a RAG refresher, then move to what makes retrieval agentic: the agent decides whether to retrieve at all, what to search for, whether the results were good enough, and whether to search again with a different query.\n\nThat decision loop is both the value and the risk. You cover source-grounded answering with citations, using retrieval to reduce rather than launder hallucination, retrieval as an input to a decision rather than just to a sentence, and knowledge-base maintenance — the unglamorous work of keeping an index current, which is where most deployed systems quietly decay. You finish by building a knowledge-base agent over a real document set with grounded, cited answers.",
      topics: [
        "RAG refresher — embeddings, chunking, retrieval",
        "Letting the agent decide whether and what to retrieve",
        "Query reformulation and repeated retrieval",
        "Vector stores and semantic search for agents",
        "Document retrieval as input to an agent decision",
        "Source-grounded answers with citations",
        "Detecting insufficient retrieval before answering",
        "Knowledge-base maintenance and freshness",
        "Access control over retrieved content",
        "Building a knowledge-base agent end to end",
      ],
    },
    {
      title: "Multi-Agent Systems",
      weekRange: "Week 6–7",
      description:
        "Several agents with distinct roles, coordinating on one task. Supervisor and worker as the default production pattern; role-based specialists such as researcher, writer, reviewer, coder and tester; debate and review patterns where one agent critiques another's output; and hierarchical and swarm arrangements with an honest account of where each stops working.\n\nThe module gives equal weight to the failure side, because multi-agent systems fail in ways single agents do not: cost multiplied by the number of participants, latency stacked serially, conflicting conclusions with no arbiter, agents talking past each other, and traces that no one can debug. The rule taught here is that a second agent must earn its place — if one agent with two tools does the job, that is the better system, and being able to argue that in a design review is worth more than being able to build a six-agent swarm.",
      topics: [
        "What a multi-agent system is and when it earns its cost",
        "Role-based specialist agents",
        "Supervisor and worker pattern",
        "Debate, critique and review patterns",
        "Research, coding, testing and review agent teams",
        "Agent-to-agent communication and message contracts",
        "Model Context Protocol (MCP) for shared tool access",
        "Collaboration and conflict resolution",
        "Cost, latency and complexity multipliers",
        "Tracing a multi-agent run end to end",
        "Designing a small multi-agent workflow",
      ],
    },
    {
      title: "Agentic Automation — Support, Sales, HR and Operations",
      weekRange: "Week 7",
      description:
        "The applied module, and the one that most directly maps to what Pune employers are actually buying. Business process automation with agents is where the current budget sits: support ticket triage and resolution, sales lead qualification and follow-up, resume screening and interview scheduling, email and communication handling, education and training assistants, and internal operations workflows.\n\nFor each you do the same exercise: take the existing manual process, break it into steps, mark which steps an agent can own outright, which need a tool, and which must stay with a person and why. The deliverable is an automation blueprint for one real workflow — the artefact that turns “I built an agent” into “I automated a process and can say what it saved”, which is the version that survives an interview follow-up question.",
      topics: [
        "Mapping a business workflow into agent steps",
        "Customer support triage and resolution agents",
        "Sales and lead qualification agents",
        "HR, resume screening and scheduling agents",
        "Email and communication automation",
        "Education and training assistants",
        "Personal productivity and task agents",
        "Identifying mandatory manual approval points",
        "Integrating with CRM, helpdesk and internal systems",
        "Writing an automation blueprint with expected savings",
      ],
    },
    {
      title: "Agent Evaluation and Testing",
      weekRange: "Week 7",
      description:
        "Evaluating an agent is genuinely harder than evaluating a model, and pretending otherwise is how unreliable systems reach production. There is no single correct output to compare against: two different tool sequences can both be right, and the same input can legitimately produce different runs. So evaluation moves to the things that can be measured — did the task succeed against a defined criterion, did the agent select the right tool, were the arguments correct, was the answer grounded in what was retrieved, how many steps and how much money did it take.\n\nYou build a scenario suite from real inputs, score runs on task success, tool-selection accuracy, groundedness, cost and latency, and wire it as a regression test so a prompt or model change that quietly breaks step four gets caught before a customer finds it. Human evaluation gets a rubric rather than a vibe, and you cover feedback loops that turn production failures back into test cases.",
      topics: [
        "Why agent evaluation is harder than model evaluation",
        "Defining task success criteria",
        "Tool-selection and tool-argument accuracy",
        "Groundedness and hallucination checks",
        "Step count, latency and cost as quality metrics",
        "Building a scenario suite from real inputs",
        "Regression testing agent workflows",
        "LLM-as-judge and where it misleads",
        "Human evaluation rubrics",
        "Feedback loops from production failures into tests",
      ],
    },
    {
      title: "Security, Guardrails and Responsible Agentic AI",
      weekRange: "Week 8",
      description:
        "An agent with tools is an attack surface with a language model in front of it. Prompt injection matters more here than anywhere else in AI engineering, because the model does not just say something wrong — it calls a tool. You cover direct and indirect injection, injection arriving through retrieved documents and fetched web pages, and why filtering the input is not a fix.\n\nThe defences are architectural: permission boundaries per tool, approval required before any irreversible or sensitive action, least-privilege credentials so a compromised agent cannot exceed its remit, output validation before a result is acted on, and excessive-agency control — the OWASP category that names precisely this failure. Alongside: data privacy and access control over what an agent may read, unbounded token and cost control, system-prompt leakage, and audit logs detailed enough to reconstruct what an agent did and why. Framed against the OWASP Top 10 for LLM Applications, which is what an enterprise security review will hold you to.",
      topics: [
        "Prompt injection, direct and indirect",
        "Injection through retrieved documents and fetched pages",
        "Tool abuse and unsafe action execution",
        "Excessive agency and how to bound it",
        "Permission boundaries and least-privilege credentials",
        "Approval gates before irreversible actions",
        "Output validation before acting on a result",
        "Data privacy and access control for agent reads",
        "System-prompt leakage awareness",
        "Unbounded token and cost control",
        "Audit logs and traceability",
        "OWASP Top 10 for LLM applications as a checklist",
      ],
    },
    {
      title: "Production Agents — Deployment, Tracing, Cost and Monitoring",
      weekRange: "Week 8",
      description:
        "The production handoff. Observability first, because a seven-step agent loop cannot be debugged from logs alone: tracing with LangSmith or Langfuse, span-level visibility into every model call and tool invocation, and instrumentation you add while building rather than after an incident.\n\nThen the operational layer — deployment behind FastAPI with async workers and streaming, containerisation, background execution for long runs, error recovery and escalation paths, monitoring failed runs, alerting on cost and step-count anomalies, and versioning tools, prompts and workflows together so a rollback restores a known-good system rather than half of one. Caching and token budgeting close the cost loop. You finish against a production-readiness checklist covering the questions asked before an agent is allowed near real users.",
      topics: [
        "Tracing with LangSmith and Langfuse",
        "Span-level visibility into model and tool calls",
        "Instrumentation patterns added during development",
        "Deployment — FastAPI, async workers, streaming responses",
        "Containerisation and background execution for long runs",
        "Error recovery and escalation paths",
        "Monitoring failed runs and alerting on anomalies",
        "Cost controls, caching and token budgeting",
        "Versioning tools, prompts and workflows together",
        "Rollback and safe re-deployment",
        "Production-readiness checklist for agents",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Weeks 9–10",
      description:
        "Two weeks of full-time capstone work on a deployed agentic system, plus interview preparation calibrated to how agentic AI is actually assessed. You pick one capstone (see Capstone Projects), take it to a deployed, traced, evaluated state, and document the architecture with a diagram — because the interview question is never ‘did it work’, it is ‘why did you choose that pattern, and what did you do when a tool call failed’.\n\nMock rounds cover agent system design, tool-use and function-calling questions, memory and retrieval questions, multi-agent coordination, and security and responsible-AI questions. You rehearse explaining your own trace: walking a panel through a real run, naming the step that failed and the fix. Resume, LinkedIn and GitHub polish is included, aimed at the AI Engineer and Agentic AI Developer job descriptions Pune product companies are posting.",
      topics: [
        "Capstone implementation, deployment and README",
        "Architecture diagram for an agent system",
        "Code and trace review with the lead trainer",
        "Agent system-design mock round",
        "Tool-use and function-calling interview questions",
        "Memory, RAG and retrieval interview questions",
        "Multi-agent system interview questions",
        "Security and responsible-AI interview questions",
        "Walking a panel through a real agent trace",
        "Resume, LinkedIn and GitHub polish for AI Engineer roles",
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

  roadmapImage: {
    src: "/images/courses/agentic-ai-overview-v1.webp",
    width: 1672,
    height: 941,
    alt: "Agentic AI overview diagram used in Archer Infotech's Pune training: how Agentic AI differs from traditional AI, generative AI and human-in-the-loop systems; the agent loop of perception, reasoning, planning, tool use, memory, action and feedback; core capabilities including goal-driven behaviour, multi-step task execution, tool orchestration, autonomous decision flow and context awareness; the typical agent workflow from goal through understand, plan, use tools, act, observe and improve; and common use cases such as research, coding, support, productivity, data analysis and multi-agent workflows.",
    caption:
      "The agent loop this course teaches — perceive, reason, plan, call tools, act, remember, and learn from the result — plus how Agentic AI differs from generative AI. Every ring in the diagram is a module below.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/agentic-ai-syllabus-v1.pdf",
    title: "Agentic AI Course Syllabus — Complete Module List",
    slug: "agentic-ai-syllabus",
    blurb:
      "The full fifteen-part syllabus as a 7-page PDF — agent architecture, tools and function calling, memory, planning and replanning, agentic RAG, multi-agent systems, automation use cases, evaluation, security and guardrails, frameworks, seven capstone projects and an interview-preparation section. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the 7-page PDF",
        items: [
          "All fifteen syllabus parts plus a thirteen-module teaching plan, in the order they are taught.",
          "Eight hands-on assignments listed with the skill each one practises, from a tool-calling assistant to a multi-agent research workflow and an agent safety checklist.",
          "The production sections most agent courses omit: agent design patterns, tool safety and permission boundaries, evaluation metrics, guardrails, tracing, and a deployment checklist.",
          "Prerequisites written as three separate tracks — required AI foundation, non-coding learners, and technical learners — so you can place yourself before enrolling.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "Agentic AI Engineer — designing and shipping tool-using, multi-step agent systems.",
          "AI Engineer — the applied LLM-application path at Pune product companies.",
          "AI Automation Engineer — turning business processes into supervised agent workflows.",
          "AI Solutions Architect — choosing agent patterns, tools and guardrails for enterprise use.",
        ],
      },
    ],
  },

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
    {
      question: "Should I learn Generative AI before Agentic AI?",
      answer:
        "Yes, and it is the sequence we recommend. Agentic AI assumes you already understand LLMs, tokens and context windows, prompting, structured outputs, embeddings and RAG — an agent is those components arranged in a loop with tools attached. If you have that from our Generative AI course, from work, or from your own building, start here. If you do not, start with Generative AI; the two courses were designed to run in that order and the Agentic AI syllabus opens by assuming the Generative AI syllabus is behind you.",
    },
    {
      question: "What is the difference between Generative AI and Agentic AI?",
      answer:
        "Generative AI creates or transforms content: user asks, model generates, you read the result. Agentic AI acts: the system is given a goal, decides what steps to take, calls tools to search, query, write or send, observes what came back, and continues until the task is complete or it stops to ask a person. Generative AI is the intelligence layer; Agentic AI is how that intelligence interacts with real systems and performs work. Practically, the difference in an interview is that agentic work brings in tool design, permissions, state, planning, error recovery and evaluation.",
    },
    {
      question: "Is Agentic AI suitable for experienced software developers?",
      answer:
        "It is arguably the AI specialisation that suits experienced developers best. Building a reliable agent is mostly software engineering: API design, authentication, validation, idempotency, error recovery, state management, permissions, logging and testing. The LLM is one component in a system that has to be architected properly. Developers with backend or full-stack experience usually move faster through this course than candidates with a pure data-science background, because the hard parts are the parts they already do.",
    },
    {
      question: "Can I take this course without a coding background?",
      answer:
        "Not this one. Every module has hands-on Python, and the LangGraph work in particular assumes comfort with async code and typed data structures. If your interest in agents is about automating business processes rather than writing them, our AI Tools for Productivity course covers no-code and low-code automation, and you can return to this course after our Python track. We would rather tell you that up front than have you sit through eight weeks of code you cannot follow.",
    },
    {
      question: "Does the course cover multi-agent systems, or only single agents?",
      answer:
        "Both, with the single-agent work first because most production systems are single agents and most multi-agent designs would be better as one. You build a single-agent ReAct loop by hand in week two, then move through supervisor-and-worker patterns, role-based specialist agents, debate and review patterns, and agent-to-agent communication. The multi-agent module gives equal weight to the failure modes — multiplied cost, stacked latency, conflicting conclusions and untraceable runs — because knowing when a second agent does not earn its place is the more valuable judgement.",
    },
    {
      question: "How do you actually test an agent? There is no single right answer.",
      answer:
        "That is exactly why evaluation gets its own module. You cannot diff against one expected output, so you measure what can be measured: did the task meet a defined success criterion, did the agent choose the right tool, were the arguments correct, was the answer grounded in what was retrieved, and how many steps and how much money did it take. You build a scenario suite from real inputs and run it as a regression test, so a prompt or model change that quietly breaks step four is caught before a customer finds it. Human review is done against a written rubric rather than an impression.",
    },
    {
      question: "Is prompt injection and agent security covered seriously?",
      answer:
        "Yes, as a full module rather than a closing slide, because an agent with tools is an attack surface with a language model in front of it. We cover direct and indirect prompt injection, injection arriving through retrieved documents and fetched web pages, tool abuse, and excessive agency. The defences taught are architectural: per-tool permission boundaries, least-privilege credentials, approval gates before irreversible actions, output validation before a result is acted on, and audit logs you can reconstruct a run from. The module is framed against the OWASP Top 10 for LLM Applications, which is the checklist an enterprise security review will actually hold you to.",
    },
    {
      question: "Can I download the full Agentic AI syllabus before enrolling?",
      answer:
        "Yes. The complete fifteen-part syllabus is available as a 7-page PDF from the download block on this page — all modules in teaching order, the eight hands-on assignments with the skill each one practises, the prerequisites split into three tracks, and the production sections on design patterns, tool safety, evaluation, guardrails and deployment. Everything in the PDF is also on this page as text; the PDF is simply the version you can read offline or forward to a manager approving the training.",
    },
  ],

  finalCta: {
    heading: "Ready to start Agentic AI training in Pune?",
    paragraph:
      "Two months from now you can have a deployed multi-agent system on Vercel or Cloudflare, a LangSmith-instrumented agent on GitHub, eval frameworks shipping, and the placement cell introducing you to Pune product companies hiring AI engineers. The next batch typically starts within 4 weeks; weekday, weekend, and live-online formats all available. Visit the contact page, message us on WhatsApp, or call admissions for the current batch schedule.",
  },
};
