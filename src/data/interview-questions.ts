/**
 * Pune IT Fresher Interview Questions Bank.
 *
 * Q&A-organised content that AI engines (Google AI Overview, Perplexity,
 * Gemini, Claude) cite prolifically for "X interview questions for
 * freshers" long-tail queries. Each entry is FAQPage-schema-eligible
 * and includes Pune-context where it materially changes the answer.
 *
 * Different shape from the glossary (term + definition) and from the
 * existing FAQ component (single-page per-topic): this is a structured
 * interview-prep resource organised by category.
 */

export type InterviewCategory =
  | "behavioural"
  | "dsa"
  | "java-spring"
  | "python"
  | "fullstack"
  | "cloud-devops"
  | "database-sql"
  | "system-design";

export interface InterviewQuestion {
  /** Slug for direct linking + structured-data id. */
  slug: string;
  /** The question as a Pune recruiter or interviewer would ask it. */
  question: string;
  /** Tight 80-150 word answer covering the right depth for fresher tier. */
  answer: string;
  /** Optional Pune-specific notes if the answer changes locally. */
  puneNote?: string;
}

export interface InterviewCategoryBlock {
  category: InterviewCategory;
  /** Human-readable category label for navigation + headings. */
  label: string;
  /** Short blurb describing what this category covers + when it's asked. */
  intro: string;
  questions: InterviewQuestion[];
}

export const interviewBank: InterviewCategoryBlock[] = [
  // ─── Behavioural / HR ───────────────────────────────────────────────────
  {
    category: "behavioural",
    label: "Behavioural & HR",
    intro:
      "Asked at every Pune fresher round — services majors do these first; product companies usually sandwich them between technical rounds.",
    questions: [
      {
        slug: "tell-me-about-yourself",
        question: "Tell me about yourself.",
        answer:
          "Structure in 3 parts (~60-90 seconds total): present (current education + most recent learning focus), past (1-2 relevant projects or experiences that signal your direction), and future (the kind of role you're targeting + why). Avoid reading your CV verbatim — the interviewer has it. Lead with the most distinctive thing about you (the project you can talk about with energy, the speciality you've chosen). End with a clean handoff: 'I'm targeting Java backend roles in Pune, ideally at a product company that values clean code and testing.'",
      },
      {
        slug: "why-this-company",
        question: "Why do you want to join our company?",
        answer:
          "Research the company before the interview: what they build, who their major clients are, recent news, their tech stack. The strong answer ties 2-3 specific things about the company to specific things about you. Weak answer: 'You're a top company in Pune.' Strong: 'I'm targeting Java + Spring Boot backend work, and your BFSI engagements at Cognizant Pune match what I want to specialise in over my first 2 years — plus the structured 3-month bench training period fits my career-changer background.'",
      },
      {
        slug: "biggest-weakness",
        question: "What's your biggest weakness?",
        answer:
          "Pick a real weakness that doesn't disqualify you for the role + show concrete steps you're taking. Avoid the cliché 'I'm a perfectionist.' Good template: 'When I started learning Java I tried to over-engineer simple things — I'd add Redis caching to a CRUD app that didn't need it. I've learned to keep my early solutions simple and add complexity when there's a real reason. I've explicitly practised this on my last 2 portfolio projects.' This shows self-awareness + improvement.",
      },
      {
        slug: "where-in-5-years",
        question: "Where do you see yourself in 5 years?",
        answer:
          "Show ambition tied to the role, not unrealistic leaps. For a fresher Java backend role: 'In 2 years I want to be a confident mid-level Spring Boot engineer who owns features end-to-end. By year 5 I want to be a Senior Engineer specialising in microservices architecture, ideally leading a small team on a real product.' Avoid 'I want to be CTO' or 'I'll have my own startup' — both signal short tenure.",
      },
      {
        slug: "salary-expectation",
        question: "What's your salary expectation?",
        answer:
          "Two pragmatic approaches. (1) Defer to their offer: 'I'm focused on the role fit and growth opportunity. I trust your offer will reflect the market rate for this position.' Use this when you have no competing offer. (2) Anchor to the band: 'Based on Pune fresher Java offers I've seen (₹4-6 LPA at product companies), I'm looking in the ₹5-6 LPA range, with flexibility on the right opportunity.' Use this only if you have specific market intelligence + a strong CV.",
      },
    ],
  },

  // ─── DSA ────────────────────────────────────────────────────────────────
  {
    category: "dsa",
    label: "Data Structures & Algorithms",
    intro:
      "Universal Pune fresher screen — services tier expects pattern recognition + clean solutions, product tier expects depth + optimisation.",
    questions: [
      {
        slug: "two-sum",
        question: "Given an array of integers and a target sum, find two numbers that add up to the target. (Two Sum)",
        answer:
          "Brute force: nested loop, O(n²) time, O(1) space. Optimal: single pass with a HashMap storing value→index — for each element check if (target - current) is in the map; O(n) time, O(n) space. Walk through both verbally before coding. Mention the trade-off: HashMap uses extra memory but is asymptotically faster. Common follow-ups: what if the array is sorted (use two pointers, O(1) space)? What if there are duplicates? What if you need all pairs, not just one?",
      },
      {
        slug: "reverse-linked-list",
        question: "Reverse a singly linked list.",
        answer:
          "Iterative is the cleanest answer. Maintain 3 pointers: prev (initially null), current (head), next. Loop: save next, point current.next to prev, advance prev to current, current to next. Return prev when current becomes null. O(n) time, O(1) space. Mention the recursive solution too (cleaner code but O(n) call-stack space). Be ready to walk through a 3-node example on paper — this question is as much about clear communication as about the algorithm.",
      },
      {
        slug: "valid-parentheses",
        question: "Given a string of brackets, determine if they're properly matched. (Valid Parentheses)",
        answer:
          "Stack-based solution: for each char, if it's an opening bracket push onto stack; if closing, check the top matches the corresponding opening — pop if it does, fail if it doesn't or stack is empty. At end, valid only if stack is empty. O(n) time, O(n) space worst case. Walk through edge cases: empty string (valid by convention), single bracket (invalid), nested patterns. This question tests stack-pattern recognition + edge-case thinking.",
      },
      {
        slug: "binary-search-explanation",
        question: "Explain binary search. When would you use it, and what's the time complexity?",
        answer:
          "Binary search finds a target in a sorted array by repeatedly halving the search range. Compare the middle element to the target: equal → found; smaller → search right half; larger → search left half. O(log n) time, O(1) space iterative. Prerequisites: data must be sorted (or sortable in O(n log n) if you sort first, which only pays off if you'll search many times). Common pitfalls: integer overflow when computing mid = (low + high) / 2; use low + (high - low) / 2 instead. Variants worth knowing: find first/last occurrence, search rotated array, binary search on answer.",
      },
      {
        slug: "string-anagram-check",
        question: "Are two strings anagrams of each other?",
        answer:
          "Two clean approaches. (1) Sort both strings and compare — O(n log n) time, O(n) space, works but not optimal. (2) Count character frequencies in a HashMap (or 26-element array for lowercase ASCII) and compare — O(n) time, O(1) space for fixed alphabets. Always check lengths first; unequal lengths means not an anagram. Mention case-sensitivity + Unicode considerations as follow-ups. This question tests dictionary/hashing fluency.",
      },
    ],
  },

  // ─── Java + Spring Boot ─────────────────────────────────────────────────
  {
    category: "java-spring",
    label: "Java + Spring Boot",
    intro:
      "Asked at virtually every Pune Java fresher interview — the most-screened framework concepts across services majors and product companies.",
    questions: [
      {
        slug: "java-oop-pillars",
        question: "Explain the four pillars of OOP with Java examples.",
        answer:
          "Abstraction (hide implementation behind interfaces — Java's `interface` keyword), Encapsulation (data hiding via private fields + public accessors), Inheritance (`extends` for class, `implements` for interface), Polymorphism (one interface, multiple implementations — runtime via method overriding, compile-time via overloading). Walk through a concrete example: a `Payment` interface with `CardPayment` and `UPIPayment` implementations demonstrates abstraction + polymorphism naturally. Mention composition vs inheritance ('prefer composition') as a sophistication signal.",
      },
      {
        slug: "spring-boot-vs-spring",
        question: "What's the difference between Spring Framework and Spring Boot?",
        answer:
          "Spring Framework provides the core infrastructure (dependency injection, AOP, transaction management) but requires significant XML/Java configuration. Spring Boot is opinionated convention-over-configuration on top of Spring — it auto-configures most common components based on classpath dependencies, embeds a Tomcat server, provides starters for common stacks (web, JPA, security), and ships with sensible defaults. Practical impact: Spring Boot apps go from idea to running REST endpoint in minutes; pure Spring takes hours of config. Modern Pune Java work is almost exclusively Spring Boot.",
      },
      {
        slug: "dependency-injection",
        question: "Explain dependency injection. Why does Spring use it?",
        answer:
          "Dependency injection (DI) is a pattern where an object's dependencies are provided externally (by a framework or factory) rather than created internally. Benefits: looser coupling, easier testing (inject mocks), centralised configuration. Spring's IoC container manages bean lifecycles + wires dependencies automatically via @Autowired or constructor injection (constructor injection is the modern preference — fail-fast + immutable + easier to test). Walk through a UserService that depends on UserRepository: with DI, the test can pass a mock repository without touching the database.",
      },
      {
        slug: "jpa-vs-jdbc",
        question: "What's the difference between JDBC and Spring Data JPA?",
        answer:
          "JDBC is Java's low-level database API — write SQL strings, manage connections, map ResultSets to objects manually. Spring Data JPA sits on top of JPA (which sits on Hibernate by default) — define entity classes + repository interfaces, JPA generates SQL + maps results automatically. Trade-off: JDBC gives full SQL control + better performance for complex queries; JPA is faster to develop + maintainable for CRUD-heavy apps. Most Pune Java services-major work uses JPA; performance-critical paths fall back to native queries via @Query.",
      },
      {
        slug: "spring-bean-scopes",
        question: "What are Spring bean scopes?",
        answer:
          "Five scopes: singleton (default — one instance per Spring container, shared across all requests), prototype (new instance every time the bean is requested), request (one per HTTP request, web-only), session (one per HTTP session, web-only), application (one per ServletContext). Singleton works for stateless services like a UserService. Prototype is rare but useful for objects with mutable state. Request and session are for web-state objects. Choose based on whether the bean needs to hold per-request or per-session state.",
      },
    ],
  },

  // ─── Python ─────────────────────────────────────────────────────────────
  {
    category: "python",
    label: "Python",
    intro:
      "Screened at Pune Python web, data, and AI fresher interviews — both syntax fundamentals and Pythonic idioms.",
    questions: [
      {
        slug: "list-vs-tuple",
        question: "What's the difference between a list and a tuple in Python?",
        answer:
          "Lists are mutable (can change after creation), tuples are immutable. Lists use square brackets [1, 2], tuples use parentheses (1, 2). Tuples are slightly faster + use less memory because they're immutable. Tuples can be used as dictionary keys; lists cannot (mutability prevents hashing). Use tuples for fixed collections of related values (coordinates, RGB), lists for collections that grow/shrink. Mention NamedTuple from collections + dataclass(frozen=True) as more structured alternatives for fresher signal.",
      },
      {
        slug: "list-comprehension",
        question: "What's a list comprehension? Show an example.",
        answer:
          "A concise syntactic way to build a list by applying an expression to each element of an iterable, optionally filtered. Syntax: [expression for item in iterable if condition]. Example: [x*x for x in range(10) if x % 2 == 0] gives squares of even numbers. Equivalent set comprehension uses {}, dict comprehension uses {k: v for ...}. Pythonic, faster than a for-loop with append() for moderate sizes. Caution: deeply nested comprehensions hurt readability — extract to a regular for loop when you need clarity over conciseness.",
      },
      {
        slug: "decorators",
        question: "What's a decorator? Give an example.",
        answer:
          "A decorator is a function that takes another function and extends its behaviour without modifying its code. Common use cases: logging, timing, caching, authentication. Example: @lru_cache(maxsize=128) before a function caches its results. Implementation: a decorator returns a wrapper function that calls the original. Walk through writing one — `def timer(func): def wrapper(*args, **kwargs): start = time.time(); result = func(*args, **kwargs); print(time.time() - start); return result; return wrapper`. Decorators are first-class Python and commonly tested at Pune Python fresher interviews.",
      },
      {
        slug: "generators",
        question: "What's the difference between a list and a generator?",
        answer:
          "A list holds all elements in memory at once; a generator produces elements one at a time, lazily. Generators are created via `yield` in a function or via generator expressions ((x for x in range(10))). Use generators for large or infinite sequences where you don't need all elements at once — they save memory. Trade-off: you can iterate a list multiple times but a generator only once. Common interview follow-up: write a generator that yields Fibonacci numbers. Mention itertools as a useful generator-based standard library module.",
      },
      {
        slug: "args-kwargs",
        question: "What are *args and **kwargs in Python?",
        answer:
          "*args lets a function accept any number of positional arguments (collected as a tuple); **kwargs accepts any number of keyword arguments (collected as a dict). Pattern: `def my_func(*args, **kwargs):`. Used for flexible function signatures + when forwarding arguments to another function (`other_func(*args, **kwargs)`). The names *args/**kwargs are convention — you can use any name after * and ** — but stick with the convention for readability. Common pitfall: mutable default arguments — never use def f(x=[]); use def f(x=None): x = x or [].",
      },
    ],
  },

  // ─── Full Stack / Web ───────────────────────────────────────────────────
  {
    category: "fullstack",
    label: "Full Stack / Web",
    intro:
      "Asked at Pune Java FS, MERN, .NET FS, Python FS fresher interviews — both front-end concepts and the API-database glue.",
    questions: [
      {
        slug: "http-methods",
        question: "Explain the difference between GET, POST, PUT, PATCH, and DELETE.",
        answer:
          "GET retrieves data, idempotent + safe + cacheable. POST creates a new resource or triggers an action; not idempotent. PUT replaces a resource entirely; idempotent (same PUT twice = same state). PATCH partially updates a resource; should be idempotent but often isn't. DELETE removes a resource; idempotent. 'Idempotent' = calling it multiple times has the same effect as once. Practical impact: PUT and DELETE are safe to retry on network failure; POST is not (might create duplicates). REST APIs use these methods to express intent; following the convention makes APIs predictable + cacheable.",
      },
      {
        slug: "rest-vs-graphql",
        question: "REST vs GraphQL — when would you use each?",
        answer:
          "REST uses multiple endpoints (one per resource), each returns a fixed structure. GraphQL uses one endpoint where clients specify exactly what fields they want. REST advantages: caching is easier (HTTP-level), more mature tooling, simpler to learn. GraphQL advantages: clients fetch only what they need (no over-fetching/under-fetching), strong typing via schema, single round-trip for complex data. Pune market: REST dominates (~90% of fresher backend roles); GraphQL appears at modern product startups + some product cos. Learn REST deeply first; add GraphQL after first job if a role requires it.",
      },
      {
        slug: "cors",
        question: "What is CORS and why does it matter?",
        answer:
          "CORS = Cross-Origin Resource Sharing. Browser-enforced security policy that prevents JavaScript on one origin (https://my-site.com) from calling APIs on a different origin (https://my-api.com) unless the API explicitly opts in via Access-Control-Allow-Origin headers. Why it matters: nearly every full-stack project hits CORS errors during development when the frontend (localhost:3000) calls the backend (localhost:8080). Fix: configure backend to send appropriate CORS headers (Spring Boot @CrossOrigin, Express cors middleware). Common interview trap: candidates blame backend bugs that are actually CORS issues.",
      },
      {
        slug: "jwt-auth",
        question: "Explain how JWT authentication works.",
        answer:
          "JSON Web Token = signed token (header.payload.signature) the server creates after successful login and the client stores (localStorage or httpOnly cookie). Client sends it in the Authorization: Bearer <token> header on subsequent requests. Server verifies the signature using its secret key (stateless — no DB lookup needed). Payload typically contains user id + roles + expiry. Security considerations: never store sensitive data in payload (it's base64-encoded, not encrypted); use HTTPS to prevent token theft; implement refresh tokens for long sessions; rotate keys periodically. JWT is the dominant Pune fresher full-stack auth pattern.",
      },
      {
        slug: "react-vs-server-rendered",
        question: "When would you use a React SPA vs a server-rendered framework (Next.js / Spring MVC)?",
        answer:
          "React SPA (Single-Page App): rich interactivity, app-like UX, good for dashboards + tools. Trade-off: initial page slower (JavaScript bundle), SEO requires extra work, complex client-side state. Server-rendered: faster initial load (HTML ready instantly), great SEO (content in initial HTML), simpler architecture for content sites + e-commerce + landing pages. Modern hybrid (Next.js, Remix): server-render the initial page, hydrate to client React. Pune market: SPAs dominate for internal tools + SaaS dashboards; server-rendered + hybrid dominate for marketing + e-commerce + content sites.",
      },
    ],
  },

  // ─── Cloud / DevOps ─────────────────────────────────────────────────────
  {
    category: "cloud-devops",
    label: "Cloud / DevOps",
    intro:
      "Screened at Pune Cloud Engineer, DevOps, and SRE fresher interviews — both platform fundamentals and operational thinking.",
    questions: [
      {
        slug: "docker-vs-vm",
        question: "What's the difference between a Docker container and a virtual machine?",
        answer:
          "A VM virtualises hardware — each VM runs its own complete OS + kernel + applications, isolated by a hypervisor. A container virtualises the OS — multiple containers share the host kernel but isolate processes, file system, network via Linux namespaces + cgroups. Trade-offs: containers are lighter (MBs vs GBs), faster to start (seconds vs minutes), but offer weaker isolation than VMs. Practical impact: containers fit microservices + CI/CD pipelines; VMs fit legacy applications + strict isolation requirements. Most modern Pune cloud + DevOps work uses containers; VMs remain for specific workloads.",
      },
      {
        slug: "k8s-pod-vs-deployment",
        question: "What's the difference between a Pod, a Deployment, and a Service in Kubernetes?",
        answer:
          "Pod = the smallest deployable unit, wraps one or more containers that share network + storage. You rarely create Pods directly. Deployment = declarative manager for replicated, self-healing Pods. Specifies how many replicas, what image, rollout strategy. Service = stable network endpoint that load-balances across the Pods backing a Deployment, since Pod IPs change. Practical flow: write a Deployment YAML to manage your application, write a Service YAML to expose it inside (ClusterIP) or outside (LoadBalancer / NodePort) the cluster. Add Ingress for HTTP routing rules.",
      },
      {
        slug: "ci-cd-pipeline",
        question: "Walk me through a typical CI/CD pipeline.",
        answer:
          "Trigger: developer pushes commit. Continuous Integration stages: checkout code → install dependencies → run unit tests → static analysis (ESLint, Sonar) → security scan → build artifact (JAR, Docker image). On main branch, push artifact to registry. Continuous Deployment stages: deploy to staging environment → run integration / smoke tests → if pass, promote to production (often with approval gate). Tools: Jenkins (services-major default), GitHub Actions (product co default), GitLab CI, Azure DevOps. Good pipelines fail fast (cheap checks first), report clearly, and let any failure auto-rollback the deployment.",
      },
      {
        slug: "iac-benefits",
        question: "What is Infrastructure as Code? Why does it matter?",
        answer:
          "IaC = managing infrastructure through machine-readable configuration files (Terraform, CloudFormation, Bicep, Ansible) instead of clicking through cloud consoles. Benefits: version control (track who changed what), reproducibility (same env in dev/staging/prod), faster onboarding (new env provisioned in minutes), disaster recovery (rebuild from code). Trade-off: learning curve + initial setup time. Modern Pune cloud + DevOps roles increasingly expect Terraform fluency at fresher level — manual Console-only management signals 'I'm a beginner' to recruiters.",
      },
      {
        slug: "monitoring-vs-observability",
        question: "What's the difference between monitoring and observability?",
        answer:
          "Monitoring tells you WHAT is wrong (predefined metrics: CPU, memory, request rate, error count) via dashboards + alerts. Observability lets you ask WHY it's wrong (structured logs, distributed traces, custom metrics) for problems you didn't predict. Three pillars of observability: metrics (numerical, aggregated — Prometheus), logs (text events — ELK, Loki), traces (request flow across services — Jaeger, Honeycomb). Monitoring is necessary; observability becomes essential at microservices scale. SRE roles screen heavily on observability thinking; pure DevOps roles screen on monitoring + alerting.",
      },
    ],
  },

  // ─── Database / SQL ─────────────────────────────────────────────────────
  {
    category: "database-sql",
    label: "Database / SQL",
    intro:
      "Universal Pune fresher interview screen — SQL appears in nearly every backend, data, and even some QA fresher interview rounds.",
    questions: [
      {
        slug: "join-types",
        question: "Explain INNER, LEFT, RIGHT, and FULL OUTER JOIN with examples.",
        answer:
          "INNER JOIN: returns only rows that match in both tables. LEFT JOIN: all rows from the left table + matching rows from right (right is NULL if no match). RIGHT JOIN: mirror of LEFT. FULL OUTER JOIN: all rows from both tables, NULL where no match (not supported in MySQL — emulate with UNION). Walk through a Users + Orders example: INNER JOIN gives users with at least one order; LEFT JOIN gives all users including those with no orders. Common pitfall: forgetting that LEFT JOIN of an entirely-unmatched table still returns all left rows.",
      },
      {
        slug: "indexes",
        question: "When should you add an index? When shouldn't you?",
        answer:
          "Add an index on: columns frequently used in WHERE filters, JOIN conditions, ORDER BY, foreign keys. Index when read-heavy workload + the column has high selectivity (many distinct values). Don't index: small tables (<1000 rows), columns with low selectivity (boolean flags, gender), write-heavy tables where index maintenance cost outweighs read benefit, every column 'just in case' (each index adds storage + write overhead). EXPLAIN PLAN tells you whether the database is using your index. Most Pune backend interviews probe index trade-offs at depth.",
      },
      {
        slug: "transaction-acid",
        question: "What does ACID mean?",
        answer:
          "Atomicity: a transaction either fully completes or has no effect — partial states are rolled back. Consistency: a transaction takes the database from one valid state to another, respecting all constraints. Isolation: concurrent transactions appear to execute sequentially (controlled by isolation level — READ COMMITTED, REPEATABLE READ, SERIALIZABLE). Durability: once committed, the transaction survives crashes (typically via write-ahead logging). Practical impact: ACID-compliant databases (PostgreSQL, MySQL with InnoDB, Oracle, SQL Server) are the safe default for transactional data; NoSQL stores often relax some properties for performance.",
      },
      {
        slug: "n-plus-one",
        question: "What is the N+1 query problem in JPA/ORMs?",
        answer:
          "Fetching a list of N parent entities then accessing a related child entity per parent triggers 1 query for the list + N queries for the children = N+1 total queries. Cripples performance at scale. Example: list 100 Orders, then for each Order access order.getCustomer() — 1 query for orders + 100 for customers. Fix: eager fetching via JOIN FETCH (JPA), .includes() (Rails), .select_related() / .prefetch_related() (Django), or explicit JOIN in raw SQL. Most ORMs default to lazy loading; recognising and fixing N+1 problems is a senior-fresher signal at Pune Java + Python interviews.",
      },
    ],
  },

  // ─── System Design (junior tier) ────────────────────────────────────────
  {
    category: "system-design",
    label: "System Design (Junior Tier)",
    intro:
      "Asked at Pune product company fresher rounds and senior services-major rounds — junior tier focuses on basic patterns, not deep distributed-system details.",
    questions: [
      {
        slug: "url-shortener",
        question: "Design a URL shortener (TinyURL).",
        answer:
          "Requirements: short URL → long URL mapping, fast redirect, scale to billions of URLs. Components: API server (accepts long URL, returns short), database (stores mapping), redirect service (looks up short → long, returns 301 or 302). Short-code generation: base62 encoding of an auto-increment ID (a, b, c, ..., z, A, ..., Z, 0, 9) gives short codes that scale. Cache popular URLs in Redis for fast redirect. For analytics, write redirect events to a queue (Kafka) and process async. Walk through the schema: urls table (id, long_url, short_code, created_at, click_count).",
      },
      {
        slug: "rate-limiter",
        question: "Design a rate limiter for an API.",
        answer:
          "Use case: prevent abuse, ensure fair usage (e.g. 100 requests/min per user). Common algorithms: (1) Token bucket — tokens added at fixed rate; request consumes a token; allowed if tokens available. (2) Sliding window — count requests in the last 60 seconds. Where to implement: API Gateway (centralised, language-agnostic) or middleware (per-service). State storage: Redis (fast atomic counters via INCR + EXPIRE). For distributed deployments, use Redis cluster or a dedicated service (e.g. Envoy rate-limit service). Trade-offs: stricter algorithms (sliding window log) cost more memory; simpler algorithms (fixed window) have edge-case bursts.",
      },
      {
        slug: "scaling-database",
        question: "How would you scale a database that's hitting performance limits?",
        answer:
          "Sequential strategy: (1) Add indexes on slow queries (cheapest fix). (2) Add a read replica + route read queries to it (offloads ~80% of typical workloads). (3) Add caching (Redis / Memcached) for hot reads. (4) Vertical scaling (bigger instance) — easy, expensive ceiling. (5) Sharding — split data by tenant_id or hash of user_id (last resort, painful). (6) Migrate write-heavy data to a different store (Kafka for events, Elasticsearch for search, Cassandra for time-series). Walk through trade-offs verbally. Show you understand the cheapest fix first — don't jump to 'I'll shard it' immediately.",
      },
    ],
  },
];

/** Total question count for the page heading. */
export function totalQuestionCount(): number {
  return interviewBank.reduce((sum, c) => sum + c.questions.length, 0);
}

/** Flatten all questions for FAQPage schema emission. */
export function allQuestions(): InterviewQuestion[] {
  return interviewBank.flatMap((c) => c.questions);
}
