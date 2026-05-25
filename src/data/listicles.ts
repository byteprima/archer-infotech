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
];

export function getListicle(slug: string): Listicle | undefined {
  return listicles.find((l) => l.slug === slug);
}
