/**
 * Listicle guide pages (P8-12).
 *
 * AI engines cite "top N / best X" listicles prolifically because they
 * extract numbered entries more cleanly than prose. Each list follows the
 * pillar-8 structure: definitive-answer paragraph → numbered entries with a
 * consistent sub-structure (what it is → a specific data point → "best for")
 * → methodology note. Content is factual and Pune-contextual; salary figures
 * stay consistent with src/data/salary-data.ts.
 *
 * Route: /guides/[slug] (server-rendered → crawlable/citable).
 */

export interface ListicleEntry {
  name: string;
  /** One sentence: what it is / why it's on the list. */
  what: string;
  /** A specific, concrete data point (salary, demand, count…). */
  dataPoint: string;
  /** One-line "best for" recommendation. */
  bestFor: string;
  /** Optional internal link (course/tool) or external resource URL. */
  href?: string;
  /** True if href is an external resource (opens in new tab). */
  external?: boolean;
}

export interface Listicle {
  slug: string;
  shortLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Definitive answer / verdict — top 100 words. */
  intro: string;
  entries: ListicleEntry[];
  methodology: string;
  faqs: { question: string; answer: string }[];
}

export const listicles: Listicle[] = [
  // 1 ─ Python projects ───────────────────────────────────────────────────────
  {
    slug: "best-python-projects-for-resume-2026",
    shortLabel: "Best Python projects",
    metaTitle: "10 Best Python Projects for Your Resume in 2026 (Pune Guide)",
    metaDescription:
      "10 portfolio-ready Python projects that impress Pune recruiters in 2026 — from REST APIs to ML models — with what each demonstrates and who it's best for.",
    h1: "10 Best Python Projects for Your Resume in 2026",
    intro:
      "The Python projects that actually move the needle with Pune recruiters in 2026 show real-world skills — APIs, data handling, automation and a deployed app — not toy scripts. Below are 10 portfolio projects ordered from beginner to advanced; each lists what it demonstrates, a concrete skill signal, and who it suits. Build 2–3 across difficulty levels, push them to GitHub with a clear README, and you'll have more to talk about in interviews than most fresher candidates.",
    entries: [
      { name: "REST API with FastAPI", what: "A CRUD API with authentication and a database.", dataPoint: "FastAPI is among the most in-demand Python web skills in Pune job posts.", bestFor: "Backend / API-focused roles." },
      { name: "Web scraper + data pipeline", what: "Scrape a site, clean the data, store it, schedule it.", dataPoint: "Demonstrates requests/BeautifulSoup/pandas + automation in one project.", bestFor: "Data and automation roles." },
      { name: "Data analysis dashboard", what: "An interactive dashboard over a real dataset (Streamlit/Plotly).", dataPoint: "Shows pandas + visualisation + product thinking.", bestFor: "Data analyst aspirants." },
      { name: "Machine learning model + API", what: "Train a model and serve predictions via an endpoint.", dataPoint: "scikit-learn + deployment is a strong data-science signal.", bestFor: "Data science / ML roles." },
      { name: "Django blog or e-commerce app", what: "A full CRUD web app with auth, admin and templates.", dataPoint: "Django remains a steady Pune backend hiring skill.", bestFor: "Full-stack / web roles." },
      { name: "Automation bot", what: "Automate a real task — emails, reports, file processing.", dataPoint: "Recruiters love demonstrable time-saving automation.", bestFor: "Showing initiative in any role." },
      { name: "Telegram / Discord bot", what: "An interactive bot with commands and an external API.", dataPoint: "Proves API integration and event handling.", bestFor: "Beginner confidence builders." },
      { name: "Personal finance / expense tracker", what: "Track, categorise and visualise spending.", dataPoint: "Combines database + charts + a relatable use case.", bestFor: "Beginner-to-intermediate portfolios." },
      { name: "LLM-powered app (RAG chatbot)", what: "A chatbot over your own documents using an LLM API.", dataPoint: "GenAI is the fastest-rising Pune skill in 2026.", bestFor: "Standing out for AI-adjacent roles." },
      { name: "End-to-end deployed project", what: "Any project above, deployed live with CI/CD.", dataPoint: "A live URL beats a screenshot in every interview.", bestFor: "Proving you can ship, not just code." },
    ],
    methodology:
      "Projects were selected for the skills Pune recruiters actually probe in fresher interviews (APIs, data handling, deployment, and — increasingly — GenAI), balanced across difficulty so any learner can build a credible 2–3 project portfolio.",
    faqs: [
      { question: "How many Python projects should be on a fresher resume?", answer: "Two to three well-built, deployed projects beat ten half-finished ones. Pick across difficulty levels and make sure each has a clean GitHub README." },
      { question: "Do these projects need to be deployed?", answer: "At least one should be live. A working URL is the single most convincing thing you can show a Pune interviewer." },
    ],
  },

  // 2 ─ IT skills for freshers ────────────────────────────────────────────────
  {
    slug: "top-it-skills-pune-freshers-2026",
    shortLabel: "Top IT skills for freshers",
    metaTitle: "Top 7 IT Skills Pune Freshers Should Learn in 2026",
    metaDescription:
      "The 7 IT skills that get Pune freshers hired in 2026 — from a core language to cloud and DSA — with why each matters and where to start.",
    h1: "Top 7 IT Skills Pune Freshers Should Learn in 2026",
    intro:
      "Pune freshers get hired in 2026 on a focused stack, not a long list: one strong programming language, a modern framework, SQL, Git, cloud basics, data-structures-and-algorithms, and — increasingly — practical AI literacy. Below are the seven skills with the best return on effort, ordered by priority. You don't need all seven before applying; a strong core language plus projects and DSA will get you interviews, and the rest compound from there.",
    entries: [
      { name: "A core programming language (Java or Python)", what: "Depth in one language beats shallow exposure to many.", dataPoint: "Java and Python anchor the largest share of Pune fresher openings.", bestFor: "Everyone — this is non-negotiable.", href: "/compare/java-vs-python-for-beginners" },
      { name: "A web framework (Spring Boot / React / Django)", what: "Frameworks are how real apps get built and hired for.", dataPoint: "Full-stack roles dominate Pune fresher hiring volume.", bestFor: "Web and product roles.", href: "/courses/full-stack-development/java-full-stack-training-in-pune" },
      { name: "SQL & databases", what: "Almost every backend role touches a relational database.", dataPoint: "SQL appears in the majority of Pune developer job posts.", bestFor: "Backend, data and full-stack roles.", href: "/courses/database-technologies/mysql-training-in-pune" },
      { name: "Git & GitHub", what: "Version control is assumed knowledge on day one.", dataPoint: "A public GitHub with real projects is a hiring signal in itself.", bestFor: "Every developer." },
      { name: "Cloud fundamentals (AWS)", what: "Basic cloud literacy increasingly separates candidates.", dataPoint: "AWS is the dominant cloud in Pune product and BFSI firms.", bestFor: "Standing out + future-proofing.", href: "/courses/cloud-devops/aws-training-in-pune" },
      { name: "Data Structures & Algorithms (DSA)", what: "The backbone of most technical interviews.", dataPoint: "Product companies and many services drives test DSA directly.", bestFor: "Cracking interviews at better-paying firms." },
      { name: "Practical AI literacy", what: "Knowing how to use LLM tools productively in your workflow.", dataPoint: "GenAI is the fastest-rising skill across Pune job posts in 2026.", bestFor: "Any role — it's becoming table stakes.", href: "/courses/generative-ai/genai-training-in-pune" },
    ],
    methodology:
      "Skills are ranked by their frequency in Pune fresher job postings and their impact in technical interviews, weighted toward what gets you the most interviews per unit of learning effort.",
    faqs: [
      { question: "Do I need all 7 skills before applying for jobs in Pune?", answer: "No. A strong core language plus projects and DSA will get you interviews. The rest — cloud, AI literacy — compound your prospects but aren't blockers for a first role." },
      { question: "Which skill should a Pune fresher learn first?", answer: "One core language (Java or Python) to genuine depth, alongside Git and SQL. Specialise into a framework and cloud after that foundation is solid." },
    ],
  },

  // 3 ─ Java frameworks ───────────────────────────────────────────────────────
  {
    slug: "java-frameworks-every-backend-developer-should-know",
    shortLabel: "Java frameworks to know",
    metaTitle: "12 Java Frameworks Every Backend Developer Should Know (2026)",
    metaDescription:
      "The 12 Java frameworks and tools that matter for backend developers in 2026 — Spring Boot, Hibernate, JUnit and more — with what each does and when to use it.",
    h1: "12 Java Frameworks Every Backend Developer Should Know",
    intro:
      "Modern Java backend work in 2026 is built on a well-established toolkit centred on the Spring ecosystem, with Hibernate for persistence, JUnit for testing and a build tool tying it together. Below are the 12 frameworks and tools that recur across Pune enterprise and product backends, with what each does and when it matters. You don't need to master all 12 to get hired — Spring Boot, Spring Data JPA, Hibernate and JUnit cover most fresher and mid-level work.",
    entries: [
      { name: "Spring Boot", what: "The de-facto framework for production Java services.", dataPoint: "Appears in the overwhelming majority of Pune Java job posts.", bestFor: "Every Java backend developer.", href: "/courses/programming/spring-boot-microservices-training-in-pune" },
      { name: "Spring MVC", what: "The web layer for request/response and REST controllers.", dataPoint: "Foundational to most Spring web applications.", bestFor: "Building web APIs." },
      { name: "Spring Data JPA", what: "Repository abstraction over database access.", dataPoint: "Cuts boilerplate data-access code dramatically.", bestFor: "Database-backed services." },
      { name: "Hibernate", what: "The ORM that maps Java objects to relational tables.", dataPoint: "Underpins Spring Data JPA; still asked about directly.", bestFor: "Understanding persistence deeply." },
      { name: "Spring Security", what: "Authentication and authorisation for Spring apps.", dataPoint: "Security questions are common in mid-level interviews.", bestFor: "Securing real applications." },
      { name: "Spring Cloud", what: "Tooling for distributed systems and microservices.", dataPoint: "Microservices are standard at larger Pune product firms.", bestFor: "Microservices architectures." },
      { name: "JUnit & Mockito", what: "Unit testing and mocking for reliable code.", dataPoint: "Testing skills increasingly differentiate candidates.", bestFor: "Writing maintainable, tested code." },
      { name: "Maven / Gradle", what: "Build and dependency-management tools.", dataPoint: "One of these is on virtually every Java project.", bestFor: "Every Java developer." },
      { name: "Jakarta EE (formerly Java EE)", what: "Enterprise APIs (servlets, JPA, CDI).", dataPoint: "Still present in established enterprise codebases.", bestFor: "Legacy and enterprise roles." },
      { name: "Quarkus", what: "A cloud-native, fast-startup Java framework.", dataPoint: "Growing in container/Kubernetes-first shops.", bestFor: "Cloud-native microservices." },
      { name: "Micronaut", what: "A lightweight JVM framework with low memory use.", dataPoint: "Popular for serverless and microservices.", bestFor: "Lean, fast services." },
      { name: "SLF4J / Logback", what: "The standard logging facade and implementation.", dataPoint: "Proper logging is expected in production code.", bestFor: "Observability and debugging." },
    ],
    methodology:
      "Frameworks were chosen by their presence in Pune enterprise and product Java codebases and job descriptions, prioritising the Spring ecosystem that anchors most real-world backend work.",
    faqs: [
      { question: "Which Java frameworks should a fresher learn first?", answer: "Spring Boot, Spring Data JPA, Hibernate and JUnit cover most fresher and mid-level Java work in Pune. Add Spring Security and Spring Cloud as you move toward microservices." },
      { question: "Is Spring Boot enough to get a Java job in Pune?", answer: "Spring Boot plus solid core Java, SQL and a couple of projects is enough to start interviewing. The rest of this list deepens your profile as you grow." },
    ],
  },

  // 4 ─ Free full-stack resources ─────────────────────────────────────────────
  {
    slug: "free-resources-to-learn-full-stack-development",
    shortLabel: "Free full-stack resources",
    metaTitle: "8 Free Resources to Learn Full Stack Development (Pune Students, 2026)",
    metaDescription:
      "8 genuinely free, high-quality resources to learn full-stack development in 2026 — for Pune students who want to start without spending — plus when structured training helps.",
    h1: "8 Free Resources to Learn Full Stack Development",
    intro:
      "You can learn the fundamentals of full-stack development in 2026 entirely for free — the resources below are genuinely high-quality and cost nothing. The honest caveat: free resources give you the knowledge but not the structure, feedback or placement support that converts learning into a Pune job, which is where most self-learners stall. Use these to build foundations and decide if you enjoy coding; consider structured, placement-backed training when you're serious about getting hired.",
    entries: [
      { name: "freeCodeCamp", what: "Full interactive curricula for web development with certificates.", dataPoint: "Thousands of hours of free, project-based content.", bestFor: "Structured self-paced beginners.", href: "https://www.freecodecamp.org", external: true },
      { name: "The Odin Project", what: "A complete full-stack curriculum (HTML→JS→Node/Rails).", dataPoint: "Project-heavy and job-focused.", bestFor: "Learners who want a clear path.", href: "https://www.theodinproject.com", external: true },
      { name: "MDN Web Docs", what: "The authoritative reference for HTML, CSS and JavaScript.", dataPoint: "Maintained by Mozilla; the web's standard docs.", bestFor: "Looking things up correctly.", href: "https://developer.mozilla.org", external: true },
      { name: "CS50 (Harvard, free)", what: "A rigorous intro to computer science fundamentals.", dataPoint: "Free to audit; builds real CS foundations.", bestFor: "Strengthening fundamentals.", href: "https://cs50.harvard.edu", external: true },
      { name: "Official framework docs", what: "React, Node, Django and Spring all have excellent free docs.", dataPoint: "Always the most accurate, up-to-date source.", bestFor: "Learning a framework properly." },
      { name: "GitHub", what: "Host your code, read real projects, build a portfolio.", dataPoint: "A public GitHub is itself a hiring signal.", bestFor: "Building and showcasing work.", href: "https://github.com", external: true },
      { name: "Frontend Mentor", what: "Real-world frontend challenges with designs to build.", dataPoint: "Great for a deployable UI portfolio.", bestFor: "Practising frontend skills.", href: "https://www.frontendmentor.io", external: true },
      { name: "YouTube (quality channels)", what: "Free full-length courses and project walkthroughs.", dataPoint: "Best paired with building, not passive watching.", bestFor: "Visual learners filling specific gaps." },
    ],
    methodology:
      "Resources were selected for being genuinely free, high-quality, and aligned with the skills Pune full-stack roles require — favouring structured, project-based learning over passive video.",
    faqs: [
      { question: "Can I become a full-stack developer for free?", answer: "You can learn the fundamentals for free with these resources. Most learners who get hired, though, add structure, feedback and placement support — which is what free resources don't provide." },
      { question: "Are free resources enough to get a job in Pune?", answer: "They build the knowledge, but most self-learners stall without accountability or a placement pipeline. Use free resources to start, then structured training to get hired.", },
    ],
  },

  // 5 ─ Highest-paying roles (uses salary-data figures) ───────────────────────
  {
    slug: "highest-paying-it-roles-pune-engineering-graduates",
    shortLabel: "Highest-paying IT roles",
    metaTitle: "5 Highest-Paying IT Roles in Pune for Engineering Graduates (2026)",
    metaDescription:
      "The 5 highest-paying IT career tracks in Pune for engineering graduates in 2026 — AI, ML, data science, cloud and DevOps — with salary ranges and how to get in.",
    h1: "5 Highest-Paying IT Roles in Pune for Engineering Graduates",
    intro:
      "The highest-paying IT roles in Pune in 2026 cluster around AI, machine learning, data science and cloud — fields where demand outstrips supply. Below are the five tracks with the strongest pay trajectory for engineering graduates, with Pune salary ranges (consistent with our salary calculator) and the path into each. All five reward depth and projects over pedigree, so a graduate who specialises and builds a portfolio can target them directly.",
    entries: [
      { name: "AI / GenAI Engineer", what: "Builds LLM-powered and applied-AI systems.", dataPoint: "Pune: ₹6–12 LPA fresher, ₹28–50 LPA senior — the fastest-rising band.", bestFor: "Graduates excited by AI who build real projects.", href: "/tools/pune-it-salary-calculator" },
      { name: "Machine Learning Engineer", what: "Productionises ML models and data systems.", dataPoint: "Pune: ₹6–10 LPA fresher, ₹24–42 LPA senior.", bestFor: "Strong maths/CS graduates.", href: "/courses/data-ai/machine-learning-training-in-pune" },
      { name: "Data Scientist", what: "Extracts insight and builds models from data.", dataPoint: "Pune market average ~₹10.8 LPA; senior ₹15–26 LPA.", bestFor: "Analytical graduates who enjoy statistics.", href: "/courses/data-ai/data-science-training-in-pune" },
      { name: "Cloud / Solutions Architect (AWS)", what: "Designs and runs cloud infrastructure.", dataPoint: "Pune: certified engineers ₹8–12 LPA; senior architects ₹20–35 LPA.", bestFor: "Graduates who like systems and scale.", href: "/courses/cloud-devops/aws-training-in-pune" },
      { name: "DevOps / Platform Engineer", what: "CI/CD, Kubernetes and reliability engineering.", dataPoint: "Pune: ₹4–7 LPA fresher, ₹16–28 LPA senior/SRE.", bestFor: "Graduates who enjoy automation and infra.", href: "/courses/cloud-devops/devops-training-in-pune" },
    ],
    methodology:
      "Roles were ranked by senior-level Pune salary ceilings and demand growth, using the same aggregated AmbitionBox/Glassdoor/Indeed/PayScale data (cross-checked with placement records) that powers our Pune IT Salary Calculator. Figures are estimates, not guarantees.",
    faqs: [
      { question: "What is the highest-paying IT job in Pune for freshers?", answer: "AI/GenAI and machine learning roles offer the highest fresher and senior bands in Pune in 2026, followed by data science and cloud architecture. See the salary calculator for role-by-role ranges." },
      { question: "Can an engineering graduate get into these roles directly?", answer: "Yes — all five reward demonstrable skill and projects over pedigree. A focused specialisation plus a strong portfolio lets a graduate target them directly, often via a placement-backed programme." },
    ],
  },

  // 6 ─ Python libraries (P5-18 cluster spoke, 2026-06-07) ───────────────────
  {
    slug: "top-python-libraries-every-developer-should-know-2026",
    shortLabel: "Top Python libraries",
    metaTitle: "Top 10 Python Libraries Every Developer Should Know in 2026 (Pune Guide)",
    metaDescription:
      "The 10 Python libraries that show up most in Pune Python job posts in 2026 — covering web, data, ML, automation, and the rising agentic-AI stack. With what each does and when to learn it.",
    h1: "Top 10 Python Libraries Every Developer Should Know in 2026",
    intro:
      "Pune Python job posts in 2026 reference a remarkably consistent library set across backend, data, ML and the rapidly-growing agentic AI segment. You don't need expertise in all 10 to be hireable — but you should at least recognise every name on this list, know what each does, and have hands-on time with the 3–4 that anchor your specialisation. Below are the libraries Pune recruiters actually probe, ordered by foundation-first then specialisation.",
    entries: [
      { name: "Requests / httpx", what: "The standard HTTP client for calling REST APIs from Python.", dataPoint: "Used in virtually every Python backend + automation role.", bestFor: "Foundation. Learn first." },
      { name: "Pandas", what: "Tabular data manipulation — the data analyst / data scientist staple.", dataPoint: "Listed in 70%+ of Pune data + analytics Python job posts.", bestFor: "Data Analyst, Data Scientist tracks.", href: "/courses/data-ai/data-science-training-in-pune" },
      { name: "NumPy", what: "Numerical arrays + linear algebra primitives. The foundation Pandas sits on.", dataPoint: "Essential for any ML or scientific-computing role.", bestFor: "Data Science, ML Engineer." },
      { name: "scikit-learn", what: "Classical machine learning — regression, classification, clustering, model evaluation.", dataPoint: "The first ML library Pune recruiters probe at interview.", bestFor: "Data Science + ML Engineer foundations.", href: "/courses/data-ai/machine-learning-training-in-pune" },
      { name: "FastAPI", what: "Modern async REST framework — fast, typed, auto-documented.", dataPoint: "Among the fastest-growing Python skills in Pune backend posts.", bestFor: "Backend, ML serving, agent-app APIs." },
      { name: "Django", what: "Full-featured web framework with built-in admin + ORM.", dataPoint: "Pune services-sector default for Python web work.", bestFor: "Python Full Stack backend.", href: "/courses/full-stack-development/python-full-stack-training-in-pune" },
      { name: "SQLAlchemy", what: "Python's most-used SQL toolkit + ORM.", dataPoint: "Standard pairing with FastAPI in Pune startup backends.", bestFor: "Backend developers using non-Django stacks." },
      { name: "LangChain + LangGraph", what: "The agentic AI framework stack — multi-step LLM workflows + tool calls + memory.", dataPoint: "Pune AI Engineer postings reference these explicitly.", bestFor: "Agentic AI, GenAI specialists.", href: "/courses/generative-ai/agentic-ai-training-in-pune" },
      { name: "PyTorch (or TensorFlow)", what: "Deep learning — model definition, training, GPU acceleration.", dataPoint: "PyTorch leads in Pune research + AI startup hiring; TensorFlow remains common in enterprise ML teams.", bestFor: "ML Engineer, AI Research tracks." },
      { name: "Pydantic", what: "Type-safe data validation — the FastAPI + LangChain standard.", dataPoint: "Pydantic v2 is a 2024+ table-stakes skill in modern Python codebases.", bestFor: "Every modern Python developer." },
    ],
    methodology:
      "Libraries were selected by frequency in Pune Python job postings (Naukri + LinkedIn, last 90 days, 2026-06 sample) cross-referenced with what hiring managers actually probe in technical screens. Foundation libraries (Requests, Pandas, NumPy) ranked first; specialisation libraries grouped by track.",
    faqs: [
      { question: "Which Python libraries should I learn first as a Pune beginner?", answer: "Foundation tier: Requests (for HTTP), Pandas (for tabular data), NumPy (for numerical work). These three open the door to either web or data tracks. After 4–6 weeks of hands-on practice with them, pick a specialisation library (scikit-learn for data, FastAPI for backend, etc.) and go deep there." },
      { question: "Do I need TensorFlow AND PyTorch for ML jobs in Pune?", answer: "No — pick one and go deep. PyTorch dominates in Pune research and AI startup hiring; TensorFlow remains common at enterprise ML teams (Persistent ML, BrowserStack ML, services-major AI practices). Switching between them later is days, not weeks." },
      { question: "Where does LangChain fit in this stack?", answer: "LangChain + LangGraph sit on top of regular Python — they're agent-orchestration frameworks, not a separate runtime. They expect comfort with Python fundamentals + Requests + Pydantic + an LLM API key. Don't rush LangChain before the foundations." },
    ],
  },

  // 7 ─ Full Stack projects (P5-19 cluster spoke, 2026-06-07) ────────────────
  {
    slug: "best-full-stack-projects-for-pune-resume-2026",
    shortLabel: "Full stack resume projects",
    metaTitle: "10 Best Full Stack Projects for Your Pune Resume in 2026",
    metaDescription:
      "10 portfolio-ready full-stack projects that close Pune interviews in 2026 — across Java, MERN, .NET, and Python stacks. With what each demonstrates and who it's best for.",
    h1: "10 Best Full Stack Projects for Your Pune Resume in 2026",
    intro:
      "Full-stack portfolio projects that actually close Pune interviews in 2026 share four traits: deployed to a live URL, authentication + database CRUD, at least one harder-than-CRUD concept (real-time, payments, file processing, third-party integration), and a clean GitHub README. The 10 projects below cover Java FS / MERN / .NET FS / Python FS stacks; each lists the harder concept it exercises and the kind of role it best signals to. Build 2–3 and push deployed.",
    entries: [
      { name: "E-commerce store with payment integration", what: "Full CRUD + auth + Razorpay or Stripe test-mode integration + order admin.", dataPoint: "Demonstrates the BFSI + retail pattern Pune services majors hire heavily for.", bestFor: "Java FS / .NET FS portfolios.", href: "/career-paths/full-stack-developer" },
      { name: "Real-time chat application with WebSockets", what: "Authenticated chat with rooms + presence + persistent history.", dataPoint: "Exercises the real-time concept that pure-CRUD apps don't.", bestFor: "MERN / Node.js backend portfolios." },
      { name: "Project management dashboard (Kanban-style)", what: "Drag-drop tasks + assignees + comments + activity log.", dataPoint: "Tests UI complexity + state management depth.", bestFor: "React / Angular portfolios." },
      { name: "Booking / appointment platform", what: "Calendar UI + availability rules + confirmation emails.", dataPoint: "Hits the SaaS pattern Pune product startups screen for.", bestFor: "Any stack — high recruiter recognition." },
      { name: "Multi-tenant SaaS skeleton", what: "Subdomain or path-based tenancy + role-based auth + isolated data.", dataPoint: "Demonstrates senior-fresher architectural thinking.", bestFor: "Product-company-targeted portfolios." },
      { name: "Document / file upload + processing app", what: "Upload PDF/image + extract text or thumbnails + searchable history.", dataPoint: "Exercises file handling + async background jobs + storage.", bestFor: "Python FS or Java FS portfolios." },
      { name: "Public REST API + interactive docs", what: "A well-documented backend API + Swagger/OpenAPI UI + auth + rate limiting.", dataPoint: "Pure-backend signal; cleanly separable from your frontend story.", bestFor: "Backend-leaning full-stack portfolios." },
      { name: "Analytics dashboard with charts", what: "Multi-source data + filters + interactive visualisations + export.", dataPoint: "Shows data + frontend together — strong signal for product roles.", bestFor: "Anyone targeting analytics-heavy verticals." },
      { name: "Internal-tool clone (mini-CRM, mini-help-desk)", what: "End-to-end workflow tool with realistic role permissions.", dataPoint: "Services-sector hiring loves this pattern — most projects look like this.", bestFor: "Java FS / .NET FS services-sector targets.", href: "/courses/full-stack-development/java-full-stack-training-in-pune" },
      { name: "AI-augmented full-stack app (RAG search / LLM chat)", what: "Standard full-stack app + an LLM-powered feature (search, summarisation, chatbot).", dataPoint: "Most-asked-for 2026 differentiator — shows you've shipped real GenAI integration.", bestFor: "Standing out at product companies.", href: "/courses/generative-ai/agentic-ai-training-in-pune" },
    ],
    methodology:
      "Projects were selected by what Pune full-stack interviewers actually probe in technical and project-walkthrough rounds (sampled across services-major and product-company hiring patterns over 17 years of placement-cell data), balanced across difficulty and stack so any full-stack learner can build 2–3 credible portfolio pieces.",
    faqs: [
      { question: "How many full-stack projects do I need on my Pune fresher resume?", answer: "Two to three substantial projects beat ten shallow ones. At least one must be deployed to a live URL, at least one must exercise a harder-than-CRUD concept (real-time, payments, file processing, LLM integration), and all must have clean GitHub READMEs." },
      { question: "Do I need to build projects in multiple stacks?", answer: "No — depth in one stack beats shallow exposure to three. Build 2–3 projects in your chosen stack (Java FS / MERN / .NET FS / Python FS). Cross-stack experience is a 2-year+ goal, not a fresher requirement." },
      { question: "Are AI-augmented projects worth the extra effort in 2026?", answer: "Yes — at most Pune product companies and increasingly at services majors too. A single full-stack app with an LLM-powered feature (RAG search, summarisation, chat) is the most-recognised 2026 differentiator on a fresher resume. Treat it as your portfolio's headline project." },
    ],
  },

  // 8 ─ Data Science projects (P5-20 cluster spoke, 2026-06-07) ──────────────
  {
    slug: "best-data-science-projects-pune-freshers-2026",
    shortLabel: "Data science resume projects",
    metaTitle: "10 Best Data Science Projects for Pune Freshers in 2026",
    metaDescription:
      "10 portfolio-ready data science + ML projects that close Pune interviews in 2026 — from analytics dashboards to deployed ML models to GenAI apps. With what each demonstrates and the right fresher fit.",
    h1: "10 Best Data Science Projects for Pune Freshers in 2026",
    intro:
      "Data science portfolio projects that move Pune freshers from interview calls to offers in 2026 share four traits: a real (messy) dataset, a clear problem statement framed in business terms, a defensible methodology, and at least one project that's deployed beyond a Jupyter notebook. The 10 below cover analytics, classical ML, deep learning, and the rapidly-growing GenAI segment; each lists what it demonstrates and who it suits. Build 2–3 across difficulty levels.",
    entries: [
      { name: "End-to-end EDA on a real (messy) dataset", what: "Find a real dataset (not Iris/Titanic) — web scrape, clean, analyse, visualise, write up insights.", dataPoint: "Pune interviewers read this kind of notebook end-to-end; tutorial clones get scrolled past.", bestFor: "Foundation Data Analyst / Data Scientist portfolios." },
      { name: "Interactive analytics dashboard (Streamlit / Power BI)", what: "Multi-source data + filters + visualisations + clear storytelling.", dataPoint: "Demonstrates Data Analyst + business framing skills together.", bestFor: "Data Analyst portfolios.", href: "/courses/data-ai/data-analytics-training-in-pune" },
      { name: "Supervised ML model with clear methodology", what: "Classification or regression project with proper train/test, cross-validation, evaluation metrics, and a writeup.", dataPoint: "The single most-requested Data Scientist portfolio piece.", bestFor: "Data Scientist track foundation.", href: "/courses/data-ai/data-science-training-in-pune" },
      { name: "Deployed ML model behind an API", what: "scikit-learn / PyTorch model + FastAPI + Render or Cloudflare deployment.", dataPoint: "Moves you from 'I trained a model' to 'I shipped a model.'", bestFor: "ML Engineer portfolios.", href: "/courses/data-ai/machine-learning-training-in-pune" },
      { name: "NLP project (sentiment / classification / NER)", what: "Apply transformer models (HuggingFace) to a real text classification problem.", dataPoint: "NLP is the largest hireable ML specialisation in Pune in 2026.", bestFor: "Data Scientist + ML Engineer NLP focus." },
      { name: "Time-series forecasting project", what: "Forecast a real time-series (stock, weather, demand) with ARIMA + LSTM comparison.", dataPoint: "Tests statistical + ML breadth together.", bestFor: "Data Scientist + analytics-team-targeted portfolios." },
      { name: "Computer vision / image classification project", what: "Train a CNN on a real image dataset; deploy a demo.", dataPoint: "Strong product-company signal; smaller hiring market than NLP.", bestFor: "ML Engineer with CV focus." },
      { name: "Recommendation system (collaborative or content-based)", what: "Build a recommender on a real dataset (movies, products, articles).", dataPoint: "Exercises algorithm choice + evaluation rigour.", bestFor: "ML Engineer + product-DS roles." },
      { name: "RAG chatbot over your own documents", what: "LangChain + vector store + LLM + a working UI on your notes/blog/PDFs.", dataPoint: "Highest-recognition 2026 GenAI portfolio piece in Pune.", bestFor: "GenAI / Agentic AI portfolios.", href: "/courses/generative-ai/agentic-ai-training-in-pune" },
      { name: "Multi-agent system with observability + evals", what: "LangGraph supervisor + workers + LangSmith traces + eval framework.", dataPoint: "Pune AI Engineer hiring premium piece — supply gap means immediate interview signal.", bestFor: "Standing out for Pune AI Engineer roles.", href: "/career-paths/data-science-ai" },
    ],
    methodology:
      "Projects were selected by what Pune data + ML interviewers actually probe in technical and case-study rounds, sampled across services-major analytics (TCS, Cognizant, Capgemini) and product / AI-native companies (ZS, Tiger Analytics, Persistent ML, Helpshift, GUVI). Difficulty is graded foundation → ML → modern AI so every learner can build a credible 2–3 project portfolio.",
    faqs: [
      { question: "Do I need a Kaggle competition entry on my data science resume?", answer: "No. Kaggle entries are recognised but not differentiating — recruiters can spot a competition clone instantly. A project on a real, messy dataset that you scoped, cleaned, modelled, and wrote up clearly outperforms a Kaggle silver medal at the fresher level." },
      { question: "Should my portfolio projects be in notebooks or deployed apps?", answer: "Mix. At least 1 substantial Jupyter notebook for analytical storytelling; at least 1 deployed app (Streamlit dashboard, FastAPI-served model, or LLM web app). Pure-notebook portfolios cap at Data Analyst roles; deployed work opens ML Engineer + GenAI Engineer doors." },
      { question: "Which 2026 specialisation gives the biggest portfolio premium?", answer: "Agentic AI / LLM-application engineering. The supply gap in Pune means a deployed multi-agent capstone with observability + evals on your GitHub generates outsized interview signal at product companies. The skill premium is currently ₹3–6 LPA over equivalent classical-ML profiles." },
    ],
  },

  // 9 ─ LeetCode patterns (P5-21 cluster spoke, 2026-06-07) ──────────────────
  {
    slug: "leetcode-patterns-pune-fresher-it-interviews-2026",
    shortLabel: "LeetCode patterns for Pune freshers",
    metaTitle: "10 LeetCode Patterns Every Pune Fresher Should Master in 2026",
    metaDescription:
      "The 10 LeetCode patterns that cover 80% of Pune fresher IT interview DSA rounds in 2026 — with the canonical problem for each, why interviewers ask it, and target practice volume.",
    h1: "10 LeetCode Patterns Every Pune Fresher Should Master in 2026",
    intro:
      "Pune fresher IT interviews — services majors, product companies, and growing startups alike — concentrate their DSA rounds on a remarkably small set of patterns. Learn these 10 to working depth (recognise the pattern in 60 seconds, write the canonical solution in 15–25 minutes) and you'll cover 80% of what comes up. Below is the priority-ordered set with the canonical problem for each, why it gets asked, and how much practice volume per pattern your target company tier needs.",
    entries: [
      { name: "Two Pointers", what: "Iterate two indices through an array — opposite-end (Two Sum II) or same-end (remove duplicates).", dataPoint: "The most-asked easy pattern across Pune services + product fresher screens.", bestFor: "Start here. Lowest-friction pattern to master." },
      { name: "Sliding Window", what: "Maintain a moving window of valid elements; expand and contract by index.", dataPoint: "Underlies most substring / subarray problems — Longest Substring Without Repeating Characters being canonical.", bestFor: "Strings + array subrange interview questions." },
      { name: "Fast & Slow Pointers (Floyd's cycle)", what: "Two pointers moving at different speeds — detect cycles + find middle nodes.", dataPoint: "Linked-list and cycle-detection rounds rely on this pattern almost exclusively.", bestFor: "Linked lists + linked-list-on-array problems." },
      { name: "Binary Search (and its variants)", what: "Logarithmic search — classic + modified (find boundary, search rotated array).", dataPoint: "Appears in 25–30% of Pune product company DSA rounds, often disguised.", bestFor: "Anyone targeting product companies. Practice variants until they're automatic." },
      { name: "Hash Map / Hash Set", what: "Trade memory for O(1) lookup — Two Sum and 80% of frequency-counting problems.", dataPoint: "The single most-used data structure in interview solutions, period.", bestFor: "Universal — learn first if not already comfortable." },
      { name: "BFS / DFS on Trees", what: "Traverse binary trees — level order, in-order, post-order, recursive + iterative.", dataPoint: "Trees are screened in every Pune product company fresher round and many services-major rounds too.", bestFor: "Product-company-targeted prep. Memorise iterative versions." },
      { name: "Recursion + Backtracking", what: "Generate combinations + permutations + subsets; solve constraint problems (N-Queens).", dataPoint: "The pattern interviewers use to test problem-decomposition thinking.", bestFor: "Anyone targeting beyond services-major tier." },
      { name: "Dynamic Programming (basic)", what: "1D and 2D DP — Climbing Stairs, House Robber, Longest Common Subsequence.", dataPoint: "Differentiator between medium-only and hard-capable candidates.", bestFor: "Product-company DSA prep. 30+ DP problems before strong-company interviews." },
      { name: "Greedy", what: "Make locally-optimal choices — Jump Game, Best Time to Buy and Sell Stock.", dataPoint: "Often disguised as 'array maximum' problems — pattern recognition is the test.", bestFor: "Standalone pattern; ~10 problems builds intuition." },
      { name: "Heap / Priority Queue", what: "Top-K / Kth-largest patterns — using a heap to avoid full sorting.", dataPoint: "Common at product companies; rarer at services majors.", bestFor: "Product-company-targeted prep. Bonus pattern after the first 9.", href: "/career-paths/first-it-job-pune" },
    ],
    methodology:
      "Patterns were ranked by Pune fresher interview frequency across services majors (Persistent, Capgemini, Mindtree, Tech Mahindra, Cognizant), product companies (BrowserStack, Druva, Helpshift, GUVI, ZS), and growing AI startups, weighted by the volume of fresher hiring at each tier. Practice volume targets: 50+ easy + 20 medium for services tier, 100+ medium + 20 hard for product tier, focused on these 10 patterns.",
    faqs: [
      { question: "How many LeetCode problems do I need to solve for a Pune fresher IT job?", answer: "Services-major tier: 50+ easy + 20 medium across these 10 patterns is the working baseline. Product-company tier: 100+ medium + 20 hard. Top-tier product companies (BrowserStack, Persistent product, AI startups): 250+ medium/hard with competitive-programming exposure. The patterns matter more than the count — 200 problems across all 10 patterns beats 500 random problems." },
      { question: "Should I solve problems in Java or Python for Pune interviews?", answer: "Use the language you'll actually interview in. Most candidates pick Python for LeetCode practice (faster to write) regardless of their interview language — that's fine for pattern learning, but spend the last 2 weeks before interviews practising in your interview language so you don't fumble syntax under pressure." },
      { question: "Which pattern should I learn first if I'm starting from zero?", answer: "Hash Map / Hash Set first — it underlies more solutions than any other single tool and is the easiest to develop intuition for. Two Pointers second. Then Sliding Window. After those three, you can solve a large share of easy-tier problems, which builds confidence before tackling Binary Search + tree patterns. Trying to start with DP or backtracking before this foundation usually ends in tutorial fatigue without retention." },
    ],
  },

  // 10 ─ Top Pune IT companies hiring freshers (P5-21 cluster spoke #2, 2026-06-07) ──
  {
    slug: "top-pune-it-companies-hiring-freshers-2026",
    shortLabel: "Top Pune IT companies hiring freshers",
    metaTitle: "Top 10 Pune IT Companies Hiring Freshers in 2026 — Career Guide",
    metaDescription:
      "The 10 Pune IT companies with the strongest fresher hiring pipelines in 2026 — across services majors, mid-tier consulting, and product / AI-native firms. With fresher salary bands and what each hires for.",
    h1: "Top 10 Pune IT Companies Hiring Freshers in 2026",
    intro:
      "Pune's fresher IT hiring market in 2026 concentrates at a small set of companies that account for roughly 60% of total intake volume. Below are the 10 with the strongest fresher pipelines, ranked by combined fresher hiring volume + salary band + ladder velocity. Each entry lists what they hire for, the realistic fresher salary band, and which kind of candidate they fit best. Volume numbers are sampled from Naukri + LinkedIn Pune fresher listings (last 90 days, 2026-06).",
    entries: [
      { name: "Persistent Systems", what: "Pune's largest services-+-product hybrid — fresher hiring across Java FS, .NET FS, Python, data engineering, Salesforce, and the new AI engineering practice (Avaamo group).", dataPoint: "Pune fresher intake of 1,000-1,500/year; salary band ₹4-6 LPA (services) / ₹6-9 LPA (product teams).", bestFor: "Anyone targeting a Pune services-major fresher slot with an upside path into the product / AI side." },
      { name: "Capgemini Pune", what: "Massive Pune fresher campus drives — Java, Angular, .NET, SAP, Salesforce, testing, infra. Strong onshore client engagement on US/UK accounts.", dataPoint: "Fresher salary band ₹3.5-5 LPA; year-1 onshore deputation possible for top performers.", bestFor: "Highest-probability first offer for engineering graduates from Tier 2/3 colleges." },
      { name: "Cognizant Pune", what: "Diverse Pune fresher hiring — Java + .NET + Angular + Python + Salesforce. Strong Salesforce + AI practice presence in Pune.", dataPoint: "Fresher salary band ₹3.5-5 LPA; large quarterly intake batches.", bestFor: "Salesforce or .NET track candidates; healthcare/BFSI client work." },
      { name: "Tech Mahindra Pune", what: "Pune campus runs a steady fresher pipeline — Java, .NET, telecom-domain work, network engineering, automation testing.", dataPoint: "Fresher salary band ₹3.5-5 LPA; strong telecom-domain specialisation opportunity.", bestFor: "Engineering graduates open to telecom/network engineering exposure alongside dev work." },
      { name: "LTIMindtree (Mindtree)", what: "Pune fresher hiring across Java + Angular + cloud + Salesforce + data tracks. Smaller batch sizes than top-3 services majors but cleaner mentorship structure.", dataPoint: "Fresher salary band ₹3.5-5.5 LPA; slightly more selective.", bestFor: "Candidates targeting services-tier hiring with above-average team experience." },
      { name: "Cybage", what: "Pune-headquartered services + product hybrid — Java, .NET, Python, mobile, QA, data science. Cleaner fresher onboarding than the top-3 services majors.", dataPoint: "Fresher salary band ₹4-6 LPA; smaller batch sizes mean faster onto real projects.", bestFor: "Candidates who prefer mid-sized firms over large-batch services majors.", href: "/career-paths/first-it-job-pune" },
      { name: "BrowserStack", what: "Pune product company — testing infrastructure SaaS. Fresher hiring across full-stack (React + Node + Go), QA automation, and the growing AI test-platform team.", dataPoint: "Fresher salary band ₹7-12 LPA (product-company tier); strong DSA + system design filters.", bestFor: "Top 20% candidates with strong portfolios + DSA prep targeting product-tier compensation." },
      { name: "ZS Associates Pune", what: "Data + AI consulting — fresher hiring for Data Scientist, Decision Analytics, BI Engineer, and the growing AI engineering practice.", dataPoint: "Fresher salary band ₹6-10 LPA; statistics + Python + business-framing filters.", bestFor: "Data / Analyst / AI Engineer track candidates with strong analytical communication.", href: "/career-paths/data-science-ai" },
      { name: "Druva", what: "Pune product (cloud data protection). Fresher hiring in backend (Go + Java + Python), full-stack, and the data engineering team.", dataPoint: "Fresher salary band ₹6-10 LPA; smaller selective fresher intake.", bestFor: "Backend / data engineering candidates with deeper portfolio + open-source contributions." },
      { name: "Helpshift", what: "Pune product (customer support SaaS + the rapidly-growing AI agent team). Smaller selective fresher hiring across full-stack + AI engineering.", dataPoint: "Fresher salary band ₹8-12 LPA (highest in this list); AI engineering roles trend toward the top of that band.", bestFor: "Candidates with deployed agent / LangChain portfolios targeting AI-native Pune product work.", href: "/career-paths/python-developer" },
    ],
    methodology:
      "Companies were selected by combining (1) Naukri + LinkedIn Pune fresher listing volume over the last 90 days, (2) the company's documented Pune campus / office presence + scale, (3) Archer Infotech placement-cell hiring relationships built over 17 years. Salary bands are the typical fresher-tier midpoints; outliers (campus toppers, candidates with strong portfolios, niche specialisations) can land ₹1-3 LPA above the listed band. Volume + ladder-velocity weighted ordering — not pure salary ranking.",
    faqs: [
      {
        question: "How many companies should I apply to from this list for my Pune fresher search?",
        answer:
          "All 10, plus 50-60 more across mid-tier consulting (Saksoft, Atos Syntel, Coforge, Mphasis, IBM India, DXC), other product cos (Helpshift, GUVI, Avaamo, Saviynt, Mu Sigma, Tiger Analytics), and growing Pune startups. The 10 above are the highest-leverage targets, but volume + diversification are what drive a 60-90 day first offer.",
      },
      {
        question: "Which company on this list pays freshers the most in Pune?",
        answer:
          "Helpshift (₹8-12 LPA, particularly the AI engineering roles), then BrowserStack (₹7-12 LPA), then ZS Associates and Druva (₹6-10 LPA each). Persistent product teams can also land in the ₹6-9 LPA band. The product-tier bands sit 30-80% above the services-tier bands; the trade-off is much stricter portfolio + DSA + system design filters.",
      },
      {
        question: "Are services-major Pune fresher salaries fixed, or can I negotiate?",
        answer:
          "Mostly fixed at fresher level (campus-drive structure). Off-campus or referral-based hires sometimes have ₹0.3-0.8 LPA negotiation room. Negotiation room expands once you have a competing offer from any of the product companies on this list — that's the leverage point.",
      },
      {
        question: "Does this list cover SAP, Salesforce, or pure-cloud companies?",
        answer:
          "Implicitly — most companies above hire across these specialisations. Cognizant, Accenture, Capgemini, and Persistent all have substantial Pune SAP + Salesforce + AWS / Azure practices. For dedicated SAP-only or Salesforce-only Pune fresher hiring, also target boutique SAP partners + CloudFulcrum, Saksoft, Saviynt, Mphasis Stelligent for Salesforce-native work.",
      },
    ],
  },

  // 11 ─ Spring Boot projects (Java pillar spoke, 2026-06-07) ───────────────
  {
    slug: "best-spring-boot-projects-for-pune-resume-2026",
    shortLabel: "Best Spring Boot resume projects",
    metaTitle: "10 Best Spring Boot Projects for Your Pune Resume in 2026",
    metaDescription:
      "10 portfolio-ready Spring Boot projects that close Pune Java interviews in 2026 — from REST API foundations to deployed microservices. With what each demonstrates and the right fresher fit.",
    h1: "10 Best Spring Boot Projects for Your Pune Resume in 2026",
    intro:
      "Spring Boot is the dominant Pune Java fresher framework — every services-major Pune codebase you'll touch runs on it. Portfolio projects that close Pune Java interviews share four traits: deployed to a live URL, authentication + relational database + REST API, at least one harder-than-CRUD concept (security, async, integration), and a clean GitHub README with the architectural choices documented. Below are 10 projects ordered foundation-first then specialisation. Build 2–3 across difficulty levels.",
    entries: [
      { name: "REST API + JWT Authentication", what: "Full CRUD REST API with Spring Security + JWT + role-based access + Swagger docs.", dataPoint: "The foundational Spring Boot interview project — exercises 80% of what services-major recruiters probe.", bestFor: "Foundation. Every Java fresher portfolio should have this." },
      { name: "Spring Boot + PostgreSQL Banking App", what: "Account management + transactions + transfer endpoints + auditing + transactional integrity.", dataPoint: "Hits the BFSI pattern Pune services majors hire heavily for (BNP Paribas IT, Allianz tech, Cognizant + Capgemini BFSI accounts).", bestFor: "Backend portfolios targeting BFSI / enterprise verticals." },
      { name: "E-commerce REST Backend", what: "Product catalogue + cart + order + payment (Razorpay test mode) + inventory management.", dataPoint: "Most-recognisable services-sector pattern — recruiters identify the architecture instantly.", bestFor: "Java Full Stack portfolios.", href: "/courses/full-stack-development/java-full-stack-training-in-pune" },
      { name: "File Upload + Async Processing", what: "Upload PDF/image → process async via @Async or Kafka → return result via polling/webhook.", dataPoint: "Exercises async patterns that pure-CRUD apps don't.", bestFor: "Standing out beyond the typical CRUD portfolio." },
      { name: "Spring Boot + React Full Stack", what: "Full backend stack (above) + React frontend + JWT integration + a real deployed full-stack app.", dataPoint: "The Pune-services-sector full-stack pattern — Java FS is the most-hired stack.", bestFor: "Java Full Stack track portfolios." },
      { name: "Microservices with Spring Cloud", what: "3-service microservice architecture: API Gateway + Service Discovery (Eureka) + 2 business services + inter-service REST calls.", dataPoint: "Demonstrates senior-fresher architectural thinking; pays ₹2-4 LPA above standard backend band.", bestFor: "Targeting Pune product companies + above-band services roles.", href: "/courses/full-stack-development/spring-boot-microservices-training-in-pune" },
      { name: "Spring Boot + Kafka Event-Driven App", what: "Producer + consumer + Kafka topic + dead-letter handling + at-least-once delivery patterns.", dataPoint: "Modern Pune product companies (Druva, Persistent product, BFSI tech) increasingly screen for async messaging fluency.", bestFor: "Product-company-targeted portfolios + senior-fresher band." },
      { name: "Spring Boot + Docker + Deployment", what: "Existing project + Dockerfile + docker-compose for local dev + deployment to Render/Railway/Fly.io with environment-based config.", dataPoint: "Moves you from 'I built it locally' to 'I shipped it' — the deployment signal.", bestFor: "Every portfolio needs at least 1 deployed project." },
      { name: "Spring Boot + Test Coverage", what: "JUnit 5 + Mockito + Testcontainers + 80%+ test coverage on one of your existing projects.", dataPoint: "Pune services sector screens hard on testing discipline; product companies require it.", bestFor: "Adding to your strongest existing project before applying — fastest portfolio differentiator." },
      { name: "Spring Boot + LLM Integration", what: "REST API + LangChain4j (or OpenAI/Anthropic SDK) + a working LLM-powered feature (search, summarisation, chatbot) + RAG over your own docs.", dataPoint: "Most-recognised 2026 differentiator — shows you've shipped real GenAI integration on the JVM.", bestFor: "Standing out at product companies + JVM-shop AI engineering roles.", href: "/career-paths/java-developer" },
    ],
    methodology:
      "Projects were selected by what Pune Java interviewers actually probe in technical and project-walkthrough rounds (sampled across services-major + product-company hiring patterns over 17 years of placement-cell data), balanced foundation → specialisation so any Java learner can build 2–3 credible portfolio pieces in their 3 months of Spring Boot module work.",
    faqs: [
      {
        question: "How many Spring Boot projects do I need on my Pune Java fresher resume?",
        answer:
          "Two to three substantial deployed projects beat ten shallow ones. At least one must demonstrate the foundational pattern (REST API + JWT + database), at least one must exercise a harder-than-CRUD concept (async, microservices, Kafka, security depth, LLM integration), and all must have clean GitHub READMEs documenting the architectural choices.",
      },
      {
        question: "Do I need microservices on my fresher resume for Pune Java jobs?",
        answer:
          "Not at services-major fresher level (₹3.5-6 LPA band) — a solid monolithic Spring Boot project closes most services interviews. Yes at product-company fresher level (₹6-9 LPA band) and at above-band services roles. One working microservices project demonstrates the senior-fresher architectural thinking that pays ₹2-4 LPA above standard backend band.",
      },
      {
        question: "Should I learn Spring (Framework) before Spring Boot in 2026?",
        answer:
          "No — Spring Boot first. Pure Spring (Framework) is legacy at this point; Spring Boot is the default for new projects + the framework Pune services majors hire on. You'll encounter Spring (non-Boot) when working on older codebases at services majors, but the concepts transfer; learning the old syntax later takes days.",
      },
      {
        question: "Where do I deploy Spring Boot projects for free?",
        answer:
          "Render (free tier with auto-sleep) for backend; Railway (small free credit per month); Fly.io (free tier with cold starts); or a tiny AWS EC2 instance if you have a student credit. Pair with PostgreSQL on Supabase or Neon (free tier) for the database. Total cost to deploy a portfolio of 3 Spring Boot projects: ₹0.",
      },
    ],
  },

  // 12 ─ AWS projects (Cloud / DevOps pillar spoke, 2026-06-07) ─────────────
  {
    slug: "best-aws-projects-for-pune-resume-2026",
    shortLabel: "Best AWS resume projects",
    metaTitle: "10 Best AWS Projects for Your Pune Resume in 2026",
    metaDescription:
      "10 portfolio-ready AWS projects that close Pune cloud interviews in 2026 — from foundational compute + storage to multi-account governance + serverless event-driven systems. With what each demonstrates and the right fresher fit.",
    h1: "10 Best AWS Projects for Your Pune Resume in 2026",
    intro:
      "Pune AWS hiring volume runs at ~55% of cloud listings — the largest single cloud track. Portfolio projects that close Pune AWS interviews share four traits: built using Infrastructure-as-Code (Terraform or CloudFormation, not Console clicks), exercise at least one cross-service integration (not just spinning up a single EC2), demonstrate cost-awareness (resources tagged + within free tier), and documented on GitHub with a clear architecture diagram. Below are 10 projects ordered foundation-first then specialisation. Build 2–3 across difficulty.",
    entries: [
      { name: "Static Site on S3 + CloudFront + Route 53", what: "Deploy a static site (your portfolio) to S3, distribute via CloudFront CDN, with custom domain via Route 53.", dataPoint: "The foundational AWS project — exercises ~30% of AWS Solutions Architect Associate (SAA) exam areas in one build.", bestFor: "Foundation. Every cloud fresher portfolio should have this." },
      { name: "Three-Tier Web App (EC2 + RDS + ALB)", what: "Spring Boot or Flask app on EC2 behind an Application Load Balancer, with PostgreSQL on RDS in a private subnet.", dataPoint: "Demonstrates VPC + subnet + security group design — the most-screened AWS networking topic at fresher interviews.", bestFor: "Java FS / Python FS portfolios targeting Pune services-major cloud roles.", href: "/courses/cloud-certifications/aws-solutions-architect-training-in-pune" },
      { name: "Serverless REST API (Lambda + API Gateway + DynamoDB)", what: "Build a REST API where API Gateway triggers Lambda functions that read/write DynamoDB. No servers to manage.", dataPoint: "Serverless is the modern AWS pattern — appears in 40%+ of Pune product company cloud postings.", bestFor: "Product-company-targeted portfolios + above-band fresher salary." },
      { name: "Infrastructure-as-Code Project with Terraform", what: "Provision a VPC + EC2 + RDS + ALB + S3 stack via Terraform, version-controlled on GitHub with module structure.", dataPoint: "IaC fluency moves you from 'Console clicker' to 'production-engineering thinking' — directly screened at Pune interviews.", bestFor: "Anyone targeting beyond services-major fresher tier. The highest-leverage portfolio differentiator." },
      { name: "CI/CD Pipeline (CodePipeline or GitHub Actions → AWS)", what: "Source code push triggers automated build + test + deploy to a real AWS environment.", dataPoint: "Demonstrates DevOps thinking + automation discipline. Pune DevOps Engineer fresher roles screen heavily for this.", bestFor: "DevOps + SRE-targeted portfolios.", href: "/courses/cloud-devops/devops-training-in-pune" },
      { name: "Event-Driven Architecture (SQS + SNS + Lambda)", what: "Producer Lambda → SQS queue → consumer Lambda → SNS notifications, with retry + dead-letter queue patterns.", dataPoint: "Tests async messaging patterns — moves you above pure-CRUD-app portfolio level.", bestFor: "Product-company portfolios + senior-fresher band targeting." },
      { name: "EKS Kubernetes Deployment", what: "Deploy a multi-service application to AWS EKS with proper Deployment + Service + Ingress + Secret resources, plus Helm for templating.", dataPoint: "Kubernetes fluency appears in 50%+ of Pune cloud + DevOps postings in 2026; EKS specifically is the AWS-native managed K8s.", bestFor: "Standing out for DevOps + product company Cloud Engineer roles.", href: "/courses/cloud-devops/kubernetes-training-in-pune" },
      { name: "Multi-Account Organization (AWS Organizations + SSO)", what: "Set up a 2-account AWS Organization with consolidated billing, SCPs, and centralised SSO access via IAM Identity Center.", dataPoint: "Demonstrates governance + security thinking — most-asked-about at Pune BFSI + enterprise cloud interviews.", bestFor: "BFSI / enterprise cloud track + Solutions Architect specialisation." },
      { name: "Cost Optimisation Audit + Dashboard", what: "Use Cost Explorer + AWS Budgets + a custom CloudWatch dashboard to identify + reduce costs on a sample workload.", dataPoint: "Cost discipline is the signal that separates senior-track candidates from junior-only candidates — even at fresher level.", bestFor: "Signal-boosting any cloud portfolio. Differentiates from pure-deployment-focused projects." },
      { name: "RAG-Powered AI App on AWS (Bedrock + S3 + Lambda)", what: "Build an LLM-powered Q&A app using Amazon Bedrock + RAG over documents stored in S3 + serverless backend.", dataPoint: "Most-recognised 2026 differentiator — combines cloud architecture with the rapidly-growing AI engineering specialisation.", bestFor: "Standing out at product companies + GenAI-adjacent cloud roles.", href: "/career-paths/cloud-devops-engineer" },
    ],
    methodology:
      "Projects were selected by what Pune AWS interviewers actually probe in technical + project-walkthrough rounds, sampled across services-major cloud practices (Persistent, Capgemini, Cognizant, Mindtree) and product / GCC cos (Druva, Helpshift, BrowserStack, BNP Paribas IT). Difficulty graded foundation → specialisation; AWS free tier covers all 10 projects without significant cost. Cross-referenced with AWS Solutions Architect Associate (SAA-C03) exam domain weighting.",
    faqs: [
      {
        question: "How many AWS projects do I need on my Pune fresher cloud resume?",
        answer:
          "Two to three substantial projects with proper documentation beat ten shallow ones. At least one must use Infrastructure-as-Code (Terraform or CloudFormation), at least one must exercise cross-service integration (not just spinning up a single resource), and all must have clean GitHub READMEs with architecture diagrams. The projects above are ordered so 2-3 across difficulty levels covers most interview probes.",
      },
      {
        question: "Will the AWS free tier cover all these projects?",
        answer:
          "Yes if you're disciplined — stop EC2 instances when not in use, delete unused resources (especially RDS + EKS which cost even when idle), use small instance types (t2.micro / t3.micro), monitor with AWS Budgets. Set a billing alarm at $1 to catch surprises early. Realistic cost for 3 portfolio projects built carefully over 3-4 months: under $5 total even with free tier.",
      },
      {
        question: "Do I need an AWS certification before building these projects?",
        answer:
          "No — and actually build first, certify second. Hands-on project work makes the SAA-C03 (Solutions Architect Associate) exam materially easier because you've experienced what the questions describe. Cert + 2-3 deployed projects = stronger fresher portfolio than cert alone. The exam is ~$150; budget for it in months 4-6 of cloud learning.",
      },
      {
        question: "Should I learn AWS or Azure first if I'm starting from zero?",
        answer:
          "AWS for most Pune learners — it has ~55% of cloud listings vs Azure's ~30%, broader ecosystem, larger community. Azure makes sense if you're specifically targeting Pune BFSI / Insurance verticals (BNP Paribas IT, Allianz tech, Cognizant Azure practice) or transitioning from a .NET enterprise background. Full nuance in our AWS vs Azure compare.",
      },
    ],
  },
];

export function getListicle(slug: string): Listicle | undefined {
  return listicles.find((l) => l.slug === slug);
}
