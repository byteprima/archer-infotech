/**
 * Pune IT Glossary — term + definition data set.
 *
 * AI engines (Google AI Overview, Perplexity, ChatGPT, Gemini, Claude)
 * heavily cite glossary pages for term-definition queries. This page
 * targets the long-tail of "what is X" / "X meaning in IT" / "X vs Y"
 * queries that don't fit our other content shapes.
 *
 * Schema strategy:
 *  - Page-level: DefinedTermSet (Schema.org) wrapped in BreadcrumbList
 *  - Per-term: DefinedTerm entries with descriptions
 *  - Selected FAQ-style terms also emit FAQPage schema for AI Overview pickup
 *
 * Content strategy: Pune-relevant IT terminology only. Each term answers
 * (1) what it is in 1 sentence, (2) why it matters for a Pune IT career,
 * (3) optional internal link to a relevant course / pillar / spoke.
 */

export interface GlossaryEntry {
  /** Term/phrase as commonly written. */
  term: string;
  /** Anchor slug (lowercase, hyphenated). */
  slug: string;
  /** Optional alternative spellings / acronyms. */
  aliases?: string[];
  /** Top-level category bucket for hub navigation. */
  category: "stacks" | "roles" | "tools-frameworks" | "career-terms" | "ai-data" | "testing-qa";
  /** 1-sentence "what it is" definition. */
  definition: string;
  /** 1-2 sentence "why it matters in Pune" context. */
  puneContext: string;
  /** Optional internal link (course / pillar / guide / compare). */
  href?: string;
  /** Human label for the optional href. */
  hrefLabel?: string;
}

export const glossaryEntries: GlossaryEntry[] = [
  // ─── Stacks ─────────────────────────────────────────────────────────────
  {
    term: "Java Full Stack",
    slug: "java-full-stack",
    category: "stacks",
    definition:
      "A web-application stack pairing Java + Spring Boot for the backend with Angular or React for the frontend and a relational database (PostgreSQL / MySQL / Oracle).",
    puneContext:
      "Pune services-sector default. The single largest full-stack hiring profile across Persistent, Capgemini, Mindtree, Tech Mahindra, Cognizant, Wipro, Infosys, and TCS fresher campus drives. Salary band ₹3.5-6 LPA fresher / ₹8-14 LPA at 3-5 yrs.",
    href: "/career-paths/full-stack-developer",
    hrefLabel: "Full Stack Developer career path",
  },
  {
    term: "MERN Stack",
    slug: "mern-stack",
    aliases: ["MERN"],
    category: "stacks",
    definition:
      "A JavaScript-everywhere stack: MongoDB (database) + Express (server framework) + React (frontend) + Node.js (runtime).",
    puneContext:
      "Pune product-startup default. Favoured at BrowserStack, Helpshift, Druva, GUVI, and most seed-stage AI startups because the single-language stack accelerates feature shipping. Salary band ₹4-7 LPA fresher / ₹9-16 LPA at 3-5 yrs.",
    href: "/courses/full-stack-development/mern-stack-training-in-pune",
    hrefLabel: "MERN Stack Training in Pune",
  },
  {
    term: "MEAN Stack",
    slug: "mean-stack",
    aliases: ["MEAN"],
    category: "stacks",
    definition:
      "MERN's older sibling — same MongoDB + Express + Node.js base but with Angular as the frontend framework instead of React.",
    puneContext:
      "Smaller Pune hiring market than MERN (~80 listings/month vs ~500/month). Survives at specific Angular-shop services-major teams; MERN is the safer 2026 pick for new portfolios.",
  },
  {
    term: ".NET Full Stack",
    slug: "dotnet-full-stack",
    aliases: [".NET FS", "DotNet Full Stack"],
    category: "stacks",
    definition:
      "ASP.NET Core + C# + Entity Framework Core for the backend, Angular or React for the frontend, SQL Server for the database.",
    puneContext:
      "Pune BFSI / Insurance / Healthcare vertical default. Strong at Cognizant .NET practice, Saksoft, Mphasis, BNP Paribas IT, Allianz tech, Atos Syntel. Salary band ₹4-7 LPA fresher / ₹9-16 LPA at 3-5 yrs.",
    href: "/courses/full-stack-development/dotnet-full-stack-training-in-pune",
    hrefLabel: ".NET Full Stack Training in Pune",
  },
  {
    term: "Python Full Stack",
    slug: "python-full-stack",
    category: "stacks",
    definition:
      "Django (or Flask + FastAPI) + React + PostgreSQL + Celery/Redis for background jobs.",
    puneContext:
      "Pune Python-shop default + the natural bridge stack to data science / ML / AI engineering tracks. ZS Associates web teams, GUVI, Persistent product, growing AI startups. Salary band ₹4-7 LPA fresher / ₹9-16 LPA at 3-5 yrs.",
    href: "/courses/full-stack-development/python-full-stack-training-in-pune",
    hrefLabel: "Python Full Stack Training in Pune",
  },

  // ─── Tools + Frameworks ─────────────────────────────────────────────────
  {
    term: "Spring Boot",
    slug: "spring-boot",
    category: "tools-frameworks",
    definition:
      "An opinionated Java framework on top of the Spring Framework that auto-configures most application infrastructure, letting developers focus on business logic.",
    puneContext:
      "The default Java backend framework at every Pune services major + most product companies. The single most-asked-about framework at Pune Java fresher interviews. Pune Java listings reference Spring Boot in roughly 90% of postings.",
    href: "/courses/programming/java-training-in-pune",
    hrefLabel: "Java Training in Pune",
  },
  {
    term: "Microservices",
    slug: "microservices",
    category: "tools-frameworks",
    definition:
      "An architectural pattern where an application is split into independently-deployable services that communicate via APIs (REST or messaging), each owning its data.",
    puneContext:
      "Pune product companies and modern services-major engagements increasingly default to microservices over monolithic apps. Adding Spring Cloud + Docker + Kafka exposure to a Java portfolio bumps Pune fresher offers ₹1-3 LPA above standard backend band.",
    href: "/courses/programming/spring-boot-microservices-training-in-pune",
    hrefLabel: "Spring Boot Microservices Training",
  },
  {
    term: "REST API",
    slug: "rest-api",
    aliases: ["REST", "RESTful API"],
    category: "tools-frameworks",
    definition:
      "An architectural style for web APIs using HTTP methods (GET / POST / PUT / DELETE) over resources represented as URLs, exchanging data typically as JSON.",
    puneContext:
      "The interview-screened API style at virtually every Pune backend role. REST API design + proper status codes + authentication patterns (JWT, OAuth2) appear in nearly every Pune Java / Python / .NET / Node fresher interview.",
  },
  {
    term: "CRUD",
    slug: "crud",
    aliases: ["Create Read Update Delete"],
    category: "tools-frameworks",
    definition:
      "Create, Read, Update, Delete — the four basic operations of persistent storage, used as shorthand for any application that manages user-editable data.",
    puneContext:
      "A CRUD app is the foundational portfolio piece for any Pune backend / full-stack fresher role. But recruiters identify pure-CRUD apps instantly; portfolios with only CRUD projects underperform vs portfolios that exercise one harder-than-CRUD concept (auth depth, async, integration).",
  },
  {
    term: "Selenium",
    slug: "selenium",
    category: "tools-frameworks",
    definition:
      "An open-source browser-automation framework for testing web applications, with Java being its most common driver language at enterprise QA teams.",
    puneContext:
      "Pune QA automation default. Persistent, Capgemini, Mindtree, Tech Mahindra, Cognizant all run Selenium + Java + TestNG as their automation testing stack. Selenium 4 + TestNG + Page Object Model is the screened-for combination.",
    href: "/courses/testing-qa/selenium-training-in-pune",
    hrefLabel: "Selenium Training in Pune",
  },
  {
    term: "LangChain",
    slug: "langchain",
    category: "ai-data",
    definition:
      "A Python framework for building applications powered by Large Language Models (LLMs), providing abstractions for prompts, chains, agents, memory, and tool integration.",
    puneContext:
      "Pune agentic-AI / LLM-application default. Persistent's Avaamo group, Helpshift, GUVI, BrowserStack AI, ZS AI practice all standardise on LangChain + LangGraph for their agent + RAG layer. Salary premium of ₹3-6 LPA over equivalent classical-ML profiles.",
    href: "/courses/generative-ai/agentic-ai-training-in-pune",
    hrefLabel: "Agentic AI Training in Pune",
  },
  {
    term: "LangGraph",
    slug: "langgraph",
    category: "ai-data",
    definition:
      "A LangChain extension for building stateful, multi-step agent graphs — the production pattern for agents that reason, plan, call tools, and recover from errors.",
    puneContext:
      "The production-default agent framework at Pune AI shops in 2026. Multi-agent supervisor + worker patterns built on LangGraph are the highest-paid agentic-AI portfolio differentiator.",
  },
  {
    term: "RAG",
    slug: "rag",
    aliases: ["Retrieval Augmented Generation", "Retrieval-Augmented Generation"],
    category: "ai-data",
    definition:
      "Retrieval-Augmented Generation — an LLM pattern that retrieves relevant chunks from a vector store before generating a response, so the LLM grounds answers in your own documents.",
    puneContext:
      "The most-recognised 2026 LLM-application pattern in Pune product + AI startup hiring. A working RAG chatbot over your own documents (LangChain + Pinecone or pgvector + OpenAI/Anthropic) is among the strongest portfolio differentiators for AI engineer roles.",
  },
  {
    term: "LLM",
    slug: "llm",
    aliases: ["Large Language Model"],
    category: "ai-data",
    definition:
      "A foundation model trained on large text corpora that can generate, classify, summarise, and reason over text — the underlying technology behind ChatGPT, Claude, Gemini, etc.",
    puneContext:
      "LLM API integration (OpenAI, Anthropic, Google) is becoming a baseline expectation for new product-engineering roles in Pune, not just dedicated AI engineering tracks. Even Pune full-stack and data-engineering roles increasingly screen for LLM application literacy.",
  },
  {
    term: "MLOps",
    slug: "mlops",
    category: "ai-data",
    definition:
      "Machine Learning Operations — the discipline of getting ML models from notebook to production reliably: experiment tracking, model versioning, deployment, monitoring, retraining.",
    puneContext:
      "Pune ML Engineer + Senior Data Scientist roles increasingly require MLOps fluency. Tools to know: MLflow, DVC, Weights & Biases, Kubeflow basics. ₹2-4 LPA premium over pure data-science profiles at mid-career.",
  },

  // ─── Roles ──────────────────────────────────────────────────────────────
  {
    term: "SDET",
    slug: "sdet",
    aliases: ["Software Development Engineer in Test"],
    category: "roles",
    definition:
      "Software Development Engineer in Test — an engineering role that writes both test automation and test infrastructure code, sitting between QA and development.",
    puneContext:
      "Pune SDET salary band ₹10-18 LPA at 3-6 years, materially above standard QA automation (₹6-10 LPA). The natural career exit from Selenium / TestNG automation experience. Most-hired at product companies (BrowserStack, Persistent product, Druva).",
    href: "/courses/testing-qa/selenium-training-in-pune",
    hrefLabel: "Selenium Training in Pune",
  },
  {
    term: "Data Analyst vs Data Scientist",
    slug: "data-analyst-vs-data-scientist",
    category: "roles",
    definition:
      "Data Analyst = SQL + dashboards + ad-hoc business analysis. Data Scientist = Python + statistics + ML + predictive modelling. Two distinct career destinations on the same ladder.",
    puneContext:
      "Pune fresher salaries: Analyst ₹3-6 LPA / Scientist ₹5-9 LPA. About 60% of Pune data graduates start as Analyst, pivot to Scientist by year 2-3 — the most-trodden data career arc.",
    href: "/compare/data-analyst-vs-data-scientist-career-pune",
    hrefLabel: "Data Analyst vs Data Scientist Compare",
  },
  {
    term: "AI Engineer",
    slug: "ai-engineer",
    category: "roles",
    definition:
      "An engineer who builds LLM-powered applications: prompt design, RAG pipelines, agentic systems, model serving, observability, evals — the application layer on top of foundation models.",
    puneContext:
      "Highest-paid Pune fresher tier in 2026: ₹8-15 LPA at product companies (Persistent Avaamo, Helpshift, GUVI, BrowserStack AI, ZS AI). Supply gap means immediate interview signal for candidates with a deployed multi-agent capstone.",
    href: "/career-paths/data-science-ai",
    hrefLabel: "Data Science / AI / ML career path",
  },

  // ─── Career terms ───────────────────────────────────────────────────────
  {
    term: "DSA",
    slug: "dsa",
    aliases: ["Data Structures and Algorithms"],
    category: "career-terms",
    definition:
      "Data Structures and Algorithms — the foundational CS concepts (arrays, linked lists, trees, graphs, sorting, searching, dynamic programming) that drive technical-interview screening.",
    puneContext:
      "Universal Pune fresher interview gate. Services-major tier: 50+ easy LeetCode + 20 medium. Product-company tier: 100+ medium + 20 hard. Most failed Pune fresher product-company interviews are DSA-failed, not framework-failed.",
    href: "/guides/leetcode-patterns-pune-fresher-it-interviews-2026",
    hrefLabel: "LeetCode Patterns guide",
  },
  {
    term: "Bench",
    slug: "bench",
    category: "career-terms",
    definition:
      "The period after joining a services major during which you're employed and being paid but not yet allocated to a client project — typically used for training and skill-building.",
    puneContext:
      "Pune services-major fresher bench typically runs 3-6 months. Used for paid Java/.NET/SAP/Salesforce certification programmes. Bench performance influences first-project allocation; treat it as a training opportunity, not idle time.",
  },
  {
    term: "Onshore / Offshore / Onsite",
    slug: "onshore-offshore-onsite",
    category: "career-terms",
    definition:
      "Onshore = working in the client's country. Offshore = working in your home country (India) for a foreign client. Onsite = deputed to client premises (typically onshore).",
    puneContext:
      "Pune services-major fresher work is almost exclusively offshore. Onshore deputation (US, UK, Australia) typically opens after 18-24 months of strong offshore performance. Onshore base salaries land $90K-140K USD for Java/Python developers; major career inflection.",
  },
  {
    term: "GCC",
    slug: "gcc",
    aliases: ["Global Capability Centre", "Global Capability Center"],
    category: "career-terms",
    definition:
      "Global Capability Centre — a captive offshore unit set up by a multinational corporation in India to deliver work for the parent company (vs an Indian services major delivering for many clients).",
    puneContext:
      "Pune GCCs include Allianz tech, BNP Paribas IT, BMC Software, BNY Mellon tech, Citigroup tech (smaller), several BFSI captives. Pay 30-60% above Indian services majors at fresher level; smaller batch sizes, slower hiring cadence, less bench, more direct project work.",
  },
  {
    term: "Services vs Product Company",
    slug: "services-vs-product-company",
    category: "career-terms",
    definition:
      "Services companies (TCS, Infosys, Cognizant, etc.) sell engineering work to many clients. Product companies (BrowserStack, Druva, etc.) own + sell a software product to many customers.",
    puneContext:
      "Pune fresher salary delta: services ₹3.5-6 LPA vs product ₹5-12 LPA. Product filters harder on portfolio + DSA + system design. Most Pune careers start at services, pivot to product after 18-24 months.",
    href: "/compare/services-vs-product-company-first-it-job-pune",
    hrefLabel: "Services vs Product compare",
  },
  {
    term: "CTC",
    slug: "ctc",
    aliases: ["Cost to Company"],
    category: "career-terms",
    definition:
      "Cost To Company — the total annual compensation figure quoted in Indian offer letters, including base salary, statutory benefits (PF, gratuity), variable pay, and sometimes notional benefits.",
    puneContext:
      "Pune fresher offer CTCs of ₹4-6 LPA typically translate to ₹28,000-38,000 in-hand monthly after tax + PF + insurance deductions. Always ask for the in-hand figure alongside CTC during offer negotiations; the delta can be 25-35%.",
  },
  {
    term: "Notice Period",
    slug: "notice-period",
    category: "career-terms",
    definition:
      "The contractually-required period an employee must continue working after submitting resignation before they can leave — typically 30, 60, or 90 days at Pune IT companies.",
    puneContext:
      "Pune services majors typically require 60-90 days notice; product companies 30-60 days; startups 15-30 days. Notice-period buyouts are negotiable, especially when joining at significant CTC bump. Plan job searches with notice period in mind.",
  },

  // ─── Testing + QA ───────────────────────────────────────────────────────
  {
    term: "ISTQB",
    slug: "istqb",
    aliases: ["International Software Testing Qualifications Board"],
    category: "testing-qa",
    definition:
      "International Software Testing Qualifications Board — the global QA certification body. Foundation Level is the standard fresher-tier certification, with intermediate and expert tiers above.",
    puneContext:
      "Near-mandatory at Pune services-major QA fresher hiring filters as of 2026. Exam fee ~₹4,500 paid separately to ISTQB. ~70-80% of focused candidates clear Foundation within 6 weeks of prep.",
    href: "/courses/testing-qa/software-testing-training-in-pune",
    hrefLabel: "Software Testing & QA Training",
  },
  {
    term: "SDLC / STLC",
    slug: "sdlc-stlc",
    aliases: ["SDLC", "STLC"],
    category: "testing-qa",
    definition:
      "Software Development Life Cycle (SDLC) = the development workflow (requirements → design → code → test → release). Software Testing Life Cycle (STLC) = the testing-specific workflow (test planning → design → execution → closure).",
    puneContext:
      "First-round Pune QA interview question at virtually every services major. SDLC models (Waterfall, V-Model, Agile/Scrum) + STLC phases + entry/exit criteria are screened verbally before any tooling questions.",
  },
  {
    term: "Page Object Model",
    slug: "page-object-model",
    aliases: ["POM"],
    category: "testing-qa",
    definition:
      "An automation-testing design pattern where each web page is represented by a class encapsulating its elements + behaviours, separating test logic from page-structure details.",
    puneContext:
      "The default Selenium automation framework pattern at Pune services-major QA teams. POM + Page Factory + Data-Driven Testing is the combination screened for in Pune automation-engineer interviews.",
  },
];

export function getGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return glossaryEntries.find((e) => e.slug === slug);
}

export function getGlossaryByCategory(
  category: GlossaryEntry["category"]
): GlossaryEntry[] {
  return glossaryEntries.filter((e) => e.category === category);
}

export const glossaryCategoryLabels: Record<GlossaryEntry["category"], string> = {
  stacks: "Tech Stacks",
  "tools-frameworks": "Tools & Frameworks",
  "ai-data": "AI & Data",
  roles: "Roles & Specialisations",
  "career-terms": "Career & Hiring Terms",
  "testing-qa": "Testing & QA",
};
