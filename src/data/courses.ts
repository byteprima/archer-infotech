export interface CourseModule {
  title: string;
  topics: string[];
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface CourseProject {
  title: string;
  description: string;
  skills: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  /**
   * Optional SEO-precise overrides. When set, these win over the shared
   * "{title} Training in Pune with Placement" template so an individual
   * course can target the exact high-demand search phrase (e.g. Java's
   * "...Developer Course in Pune") without renaming `title`, which is
   * reused in breadcrumbs, schema, and CTAs. Both fall back to the
   * template when omitted, so all other courses are unaffected.
   */
  seoTitle?: string;
  heroHeading?: string;
  /**
   * Optional hand-written meta description for this course. When unset,
   * `resolveCourseMetaDescription()` composes one from the course's real
   * duration/mode/EMI fields — see lib/seo/course-seo-description.ts.
   *
   * Set this only when a page is worth targeting by hand. `description`
   * is NOT used for meta any more: it renders as the visible hero
   * paragraph, and as marketing copy it produced snippets that answered
   * none of what searchers actually ask (fee, duration, placement, Pune).
   */
  seoDescription?: string;
  /**
   * Curated cross-category related-course slugs, surfaced FIRST in the
   * "Related Courses" block. Use to pass crawl equity to a page that the
   * default same-category relatedness would never reach — e.g. the indexed,
   * frequently-crawled /courses/programming/java-training-in-pune linking to
   * the un-crawled java-full-stack-training-in-pune page.
   */
  relatedSlugs?: string[];
  /**
   * Optional per-course outcome/trust signals shown in the hero. All
   * optional so only courses with real, verified numbers display them —
   * never invent these. `batchesCompleted` here is COURSE-SPECIFIC (e.g.
   * Java batches run), distinct from site-config's all-courses total.
   */
  emiAvailable?: boolean;
  highestPackageLpa?: string;
  avgPackageThisYearLpa?: string;
  batchesCompleted?: string;
  category: string;
  categorySlug: string;
  description: string;
  shortDescription: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  mode: ("Online" | "Offline")[];
  image: string;
  /**
   * Course tile artwork — a generated banner carrying the language or
   * technology mark with a small Archer Infotech lockup.
   *
   * Separate from `image` above rather than replacing it: `image` points at
   * legacy JPGs that nothing currently renders (the /courses tiles use
   * <CourseImagePlaceholder>, and the detail page never used it), several of
   * those files are 1.7 MB, and one of them was assigned to the wrong course.
   * Introducing a new field lets the tile set roll out course by course
   * without disturbing the 44 that have no artwork yet.
   *
   * Give the WebP path; the AVIF sibling is derived by extension swap.
   * Version the filename — /images is served immutable for a year.
   */
  tileImage?: string;
  highlights: string[];
  modules: CourseModule[];
  faqs: CourseFAQ[];
  prerequisites: string[];
  careerOpportunities: string[];
  tools?: string[];
  projects?: CourseProject[];
  targetAudience?: string[];
  placementSupport?: string[];
  certifications?: string[];
  isFeatured?: boolean;
  isPopular?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  courseCount?: number;
}

export const categories: Category[] = [
  {
    id: "programming",
    slug: "programming",
    name: "Programming",
    description: "Master core programming languages from fundamentals to advanced concepts",
    icon: "Code",
  },
  {
    id: "fullstack",
    slug: "full-stack-development",
    name: "Full Stack Development",
    description: "Build complete web applications from frontend to backend",
    icon: "Layers",
  },
  {
    id: "modern-web",
    slug: "modern-web",
    name: "Modern Web",
    description: "Learn cutting-edge web technologies and frameworks",
    icon: "Globe",
  },
  {
    id: "cloud-devops",
    slug: "cloud-devops",
    name: "Cloud & DevOps",
    description: "Deploy and manage applications on cloud platforms",
    icon: "Cloud",
  },
  {
    id: "cloud-certifications",
    slug: "cloud-certifications",
    name: "Cloud Certifications",
    description: "Prepare for industry-recognized cloud certifications",
    icon: "Award",
  },
  {
    id: "data-ai",
    slug: "data-ai",
    name: "Data & AI",
    description: "Harness the power of data science and artificial intelligence",
    icon: "Brain",
  },
  {
    id: "genai",
    slug: "generative-ai",
    name: "AI & GenAI",
    description: "Build with generative AI, LLMs, and modern AI tools",
    icon: "Wand2",
  },
  {
    id: "mobile-app",
    slug: "mobile-app-development",
    name: "Mobile App Development",
    description: "Build native and cross-platform mobile applications",
    icon: "Smartphone",
  },
  {
    id: "database",
    slug: "database-technologies",
    name: "Database Technologies",
    description: "Master SQL and NoSQL database systems",
    icon: "Database",
  },
  {
    id: "testing-qa",
    slug: "testing-qa",
    name: "Testing & QA",
    description: "Manual testing, Selenium automation, and ISTQB-aligned QA tracks",
    icon: "Bug",
  },
  {
    id: "salesforce",
    slug: "salesforce",
    name: "Salesforce",
    description: "Salesforce Admin + Developer certification training (ADM 201 + PD1)",
    icon: "Briefcase",
  },
  {
    id: "bootcamps",
    slug: "bootcamps",
    name: "Bootcamps",
    description: "Intensive career-focused programs with placement support",
    icon: "Rocket",
  },
];

export const courses: Course[] = [
  // Programming
  {
    id: "java",
    slug: "java-training-in-pune",
    title: "Java Programming",
    shortTitle: "Java",
    category: "Programming",
    categorySlug: "programming",
    // Route crawl equity from this indexed, frequently-crawled page to the
    // un-crawled Java Full Stack page (its natural next step for learners).
    relatedSlugs: ["java-full-stack-training-in-pune"],
    description: "Master Java from basics to advanced concepts. Learn object-oriented programming, data structures, and build real-world applications with industry best practices.",
    shortDescription: "Complete Java programming from fundamentals to advanced OOP concepts",
    duration: "3 Months",
    level: "Beginner",
    mode: ["Online", "Offline"],
    image: "/images/courses/java.jpg",
    isFeatured: true,
    isPopular: true,
    highlights: [
      "Core Java fundamentals and OOP concepts",
      "Collections framework and generics",
      "Multithreading and concurrency",
      "JDBC and database connectivity",
      "Real-world project development",
      "Industry-standard coding practices",
    ],
    modules: [
      {
        title: "Java Fundamentals",
        topics: ["Introduction to Java", "Data types and operators", "Control flow statements", "Arrays and strings", "Methods and functions"],
      },
      {
        title: "Object-Oriented Programming",
        topics: ["Classes and objects", "Inheritance", "Polymorphism", "Abstraction", "Encapsulation", "Interfaces"],
      },
      {
        title: "Advanced Java",
        topics: ["Exception handling", "Collections framework", "Generics", "File I/O", "Serialization"],
      },
      {
        title: "Multithreading & Concurrency",
        topics: ["Thread basics", "Synchronization", "Executor framework", "Concurrent collections", "Thread pools"],
      },
      {
        title: "Database Connectivity",
        topics: ["JDBC fundamentals", "Connection pooling", "PreparedStatement", "ResultSet handling", "Transaction management"],
      },
    ],
    faqs: [
      {
        question: "Do I need prior programming experience?",
        answer: "No, this course starts from basics and is designed for complete beginners as well as those with some programming background.",
      },
      {
        question: "What projects will I build?",
        answer: "You'll build multiple projects including a student management system, inventory application, and a complete web application.",
      },
      {
        question: "Is Java still relevant in 2026?",
        answer: "Java remains one of the most in-demand programming languages, especially for enterprise applications, Android development, and large-scale systems.",
      },
    ],
    prerequisites: ["Basic computer knowledge", "Logical thinking ability"],
    careerOpportunities: ["Java Developer", "Backend Developer", "Software Engineer", "Android Developer"],
  },
  {
    id: "python",
    slug: "python-training-in-pune",
    title: "Python Programming",
    shortTitle: "Python",
    category: "Programming",
    categorySlug: "programming",
    description: "Learn Python programming from scratch to advanced levels. Master data structures, algorithms, and build powerful applications with Python's extensive ecosystem.",
    shortDescription: "Comprehensive Python programming for beginners to advanced",
    duration: "2.5 Months",
    level: "Beginner",
    mode: ["Online", "Offline"],
    image: "/images/courses/python.jpg",
    isFeatured: true,
    isPopular: true,
    highlights: [
      "Python syntax and fundamentals",
      "Data structures and algorithms",
      "Object-oriented programming in Python",
      "File handling and modules",
      "Web scraping basics",
      "Introduction to data analysis",
    ],
    modules: [
      {
        title: "Python Basics",
        topics: ["Introduction to Python", "Variables and data types", "Operators and expressions", "Input/Output operations", "Control structures"],
      },
      {
        title: "Data Structures",
        topics: ["Lists and tuples", "Dictionaries and sets", "Strings and string operations", "List comprehensions", "Iterators and generators"],
      },
      {
        title: "Functions & Modules",
        topics: ["Function definitions", "Arguments and parameters", "Lambda functions", "Built-in modules", "Creating custom modules"],
      },
      {
        title: "Object-Oriented Python",
        topics: ["Classes and objects", "Inheritance and polymorphism", "Encapsulation", "Magic methods", "Decorators"],
      },
      {
        title: "Advanced Topics",
        topics: ["File handling", "Exception handling", "Regular expressions", "Database connectivity", "API basics"],
      },
    ],
    faqs: [
      {
        question: "Why should I learn Python?",
        answer: "Python is versatile and used in web development, data science, AI/ML, automation, and more. It has the simplest syntax making it beginner-friendly.",
      },
      {
        question: "What can I do after learning Python?",
        answer: "You can pursue careers in web development, data science, machine learning, automation, scripting, and many more fields.",
      },
    ],
    prerequisites: ["Basic computer knowledge"],
    careerOpportunities: ["Python Developer", "Data Analyst", "Automation Engineer", "Backend Developer"],
  },
  {
    id: "javascript",
    slug: "javascript-training-in-pune",
    title: "JavaScript Programming",
    shortTitle: "JavaScript",
    category: "Programming",
    categorySlug: "programming",
    description: "Master JavaScript for modern web development. Learn ES6+, DOM manipulation, async programming, and build interactive web applications.",
    shortDescription: "Modern JavaScript for web development and beyond",
    duration: "2 Months",
    level: "Beginner",
    mode: ["Online", "Offline"],
    image: "/images/courses/javascript.jpg",
    highlights: [
      "JavaScript fundamentals and ES6+",
      "DOM manipulation and events",
      "Asynchronous programming",
      "Object-oriented JavaScript",
      "Error handling and debugging",
      "Modern development tools",
    ],
    modules: [
      {
        title: "JavaScript Fundamentals",
        topics: ["Variables and data types", "Operators and expressions", "Control flow", "Functions", "Arrays and objects"],
      },
      {
        title: "ES6+ Features",
        topics: ["Arrow functions", "Template literals", "Destructuring", "Spread/rest operators", "Modules import/export"],
      },
      {
        title: "DOM & Events",
        topics: ["DOM selection", "Event handling", "Event delegation", "Form handling", "Dynamic content"],
      },
      {
        title: "Asynchronous JavaScript",
        topics: ["Callbacks", "Promises", "Async/await", "Fetch API", "Error handling"],
      },
    ],
    faqs: [
      {
        question: "Is JavaScript necessary for web development?",
        answer: "Yes, JavaScript is essential for frontend development and increasingly important for backend development with Node.js.",
      },
    ],
    prerequisites: ["Basic HTML and CSS knowledge"],
    careerOpportunities: ["Frontend Developer", "Full Stack Developer", "Web Developer"],
  },
  {
    id: "c",
    slug: "c-training-in-pune",
    title: "C Programming",
    shortTitle: "C",
    category: "Programming",
    categorySlug: "programming",
    description: "Master the C programming language — the foundation of systems programming, embedded development, and operating systems. Learn data types, control flow, functions, pointers, dynamic memory, structures, and file handling through hands-on projects.",
    shortDescription: "Master C for system-level and embedded programming",
    duration: "1.5 Months",
    level: "Beginner",
    mode: ["Online", "Offline"],
    image: "/images/courses/c-programming-v1.webp",
    tileImage: "/images/courses/c-programming-v1.webp",
    highlights: [
      "C language fundamentals and syntax",
      "Control structures, functions, and arrays",
      "Pointers and pointer arithmetic",
      "Dynamic memory allocation",
      "Structures, unions, and enumerations",
      "File handling and the standard library",
    ],
    modules: [
      {
        title: "C Fundamentals",
        topics: ["Introduction to C", "Data types and operators", "Control structures", "Functions", "Arrays"],
      },
      {
        title: "Pointers & Memory",
        topics: ["Pointer basics", "Pointer arithmetic", "Dynamic memory allocation", "Memory management", "Common pitfalls"],
      },
      {
        title: "Structures & File I/O",
        topics: ["Structures and unions", "Enumerations", "File operations", "Standard library", "Preprocessor directives"],
      },
    ],
    faqs: [
      {
        question: "Why learn C in 2026?",
        answer: "C remains the foundation for systems programming, embedded development, operating systems, and performance-critical applications. It also gives you a strong base before learning C++, Go, or Rust.",
      },
    ],
    prerequisites: ["Basic computer knowledge", "Logical thinking"],
    careerOpportunities: ["System Programmer", "Embedded Systems Developer", "Firmware Engineer"],
  },
  {
    id: "cpp",
    slug: "cpp-training-in-pune",
    title: "C++ Programming",
    shortTitle: "C++",
    category: "Programming",
    categorySlug: "programming",
    description: "Master modern C++ for high-performance applications, game development, and competitive programming. Learn object-oriented programming, templates, the Standard Template Library, exception handling, and modern C++ features.",
    shortDescription: "Master C++ for high-performance and OOP-driven development",
    duration: "2 Months",
    level: "Beginner",
    mode: ["Online", "Offline"],
    image: "/images/courses/cpp-programming-v1.webp",
    tileImage: "/images/courses/cpp-programming-v1.webp",
    highlights: [
      "C++ syntax and modern features",
      "Object-oriented programming concepts",
      "Classes, inheritance, and polymorphism",
      "Templates and generic programming",
      "STL containers, iterators, and algorithms",
      "Exception handling and file streams",
    ],
    modules: [
      {
        title: "C++ Basics",
        topics: ["C++ introduction", "Input/Output streams", "References", "Function overloading", "Default arguments"],
      },
      {
        title: "OOP in C++",
        topics: ["Classes and objects", "Constructors and destructors", "Inheritance", "Polymorphism", "Virtual functions"],
      },
      {
        title: "Advanced C++",
        topics: ["Templates", "STL containers", "Iterators", "Exception handling", "File I/O"],
      },
    ],
    faqs: [
      {
        question: "Do I need to know C before learning C++?",
        answer: "Basic C familiarity helps but is not mandatory. The course covers core syntax fundamentals before moving to OOP and modern C++ features.",
      },
    ],
    prerequisites: ["Basic programming familiarity helpful", "Logical thinking"],
    careerOpportunities: ["Game Developer", "Systems Engineer", "C++ Application Developer", "Quantitative Developer"],
  },
  {
    id: "dotnet-csharp",
    slug: "dotnet-csharp-training-in-pune",
    title: ".NET/C# Programming",
    shortTitle: ".NET/C#",
    category: "Programming",
    categorySlug: "programming",
    description: "Learn Microsoft .NET ecosystem with C# programming. Build desktop, web, and enterprise applications using the latest .NET technologies.",
    shortDescription: "Enterprise application development with C# and .NET",
    duration: "3 Months",
    level: "Beginner",
    mode: ["Online", "Offline"],
    image: "/images/courses/dotnet.jpg",
    isPopular: true,
    highlights: [
      "C# programming fundamentals",
      "Object-oriented programming",
      ".NET Core and .NET 8",
      "ASP.NET basics",
      "Entity Framework",
      "Windows application development",
    ],
    modules: [
      {
        title: "C# Fundamentals",
        topics: ["C# syntax and data types", "Control structures", "Methods and parameters", "Arrays and collections", "Exception handling"],
      },
      {
        title: "OOP with C#",
        topics: ["Classes and objects", "Inheritance", "Interfaces", "Polymorphism", "Abstract classes"],
      },
      {
        title: ".NET Ecosystem",
        topics: [".NET overview", "CLR and framework", "Assemblies", "NuGet packages", ".NET CLI"],
      },
      {
        title: "Advanced C#",
        topics: ["Generics", "LINQ", "Async programming", "Delegates and events", "Reflection"],
      },
    ],
    faqs: [
      {
        question: "Is .NET still relevant?",
        answer: ".NET is widely used in enterprise environments and Microsoft has modernized it with .NET Core/8 for cross-platform development.",
      },
    ],
    prerequisites: ["Basic programming knowledge helpful"],
    careerOpportunities: [".NET Developer", "Software Engineer", "Enterprise Developer"],
  },
  {
    id: "spring-boot-microservices",
    slug: "spring-boot-microservices-training-in-pune",
    title: "Spring Boot & Microservices",
    shortTitle: "Spring Boot & Microservices",
    category: "Programming",
    categorySlug: "programming",
    description:
      "Master Spring Boot and design production-grade microservices the way modern engineering teams build them. Learn to build REST APIs, secure them with JWT and OAuth2, persist data with Spring Data JPA, design service-to-service communication, and deploy resilient microservices on Docker and Kubernetes.",
    shortDescription:
      "Build, secure, and deploy production-grade microservices with Spring Boot and Spring Cloud",
    duration: "2.5 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/spring-boot-microservices.jpg",
    isFeatured: true,
    isPopular: true,
    highlights: [
      "Spring Boot 3 with Java 21 LTS",
      "RESTful APIs with proper versioning and error handling",
      "Spring Data JPA, Hibernate, and database migrations",
      "Spring Security with JWT and OAuth2",
      "Microservices architecture with Spring Cloud",
      "Containerisation with Docker and orchestration with Kubernetes",
      "Observability with Actuator, Prometheus, and Grafana",
    ],
    modules: [
      {
        title: "Spring Boot Fundamentals",
        topics: [
          "Spring Framework core and IoC container",
          "Spring Boot starters and auto-configuration",
          "Application properties, profiles, and externalised config",
          "Dependency injection patterns",
          "Project structure and Maven/Gradle build",
        ],
      },
      {
        title: "REST API Development",
        topics: [
          "RESTful design principles and resource modelling",
          "Spring MVC controllers and request mapping",
          "Request validation with Bean Validation (Jakarta)",
          "Global exception handling with @ControllerAdvice",
          "API versioning, pagination, and HATEOAS basics",
          "OpenAPI / Swagger documentation",
        ],
      },
      {
        title: "Data Persistence with Spring Data JPA",
        topics: [
          "Spring Data JPA repositories",
          "Entity mapping, relationships, and lazy/eager loading",
          "Custom queries with JPQL and native SQL",
          "Transactions and isolation levels",
          "Database migrations with Flyway / Liquibase",
          "Connection pooling with HikariCP",
        ],
      },
      {
        title: "Security with Spring Security",
        topics: [
          "Authentication and authorisation flows",
          "JWT-based stateless authentication",
          "OAuth2 and OpenID Connect with Spring Authorization Server",
          "Method-level security with @PreAuthorize",
          "CORS, CSRF, and common security pitfalls",
          "Password hashing and credential storage best practices",
        ],
      },
      {
        title: "Microservices Architecture",
        topics: [
          "Monolith vs microservices trade-offs",
          "Service decomposition and domain-driven design (DDD) basics",
          "Service discovery with Eureka / Consul",
          "API Gateway patterns with Spring Cloud Gateway",
          "Inter-service communication: REST, OpenFeign, and messaging",
          "Resilience patterns: Circuit Breaker (Resilience4j), retries, timeouts",
          "Distributed configuration with Spring Cloud Config",
          "Event-driven architecture with Apache Kafka and RabbitMQ",
        ],
      },
      {
        title: "Deployment, DevOps & Observability",
        topics: [
          "Containerising Spring Boot apps with Docker",
          "Multi-stage Docker builds and image optimisation",
          "Kubernetes basics: pods, deployments, services, ConfigMaps, Secrets",
          "Helm charts and rolling deployments",
          "Spring Boot Actuator endpoints",
          "Metrics with Micrometer + Prometheus, dashboards with Grafana",
          "Distributed tracing with OpenTelemetry / Zipkin",
          "CI/CD pipelines with GitHub Actions",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need Java experience before joining this course?",
        answer:
          "Yes — this is an Intermediate course. You should be comfortable with Core Java (OOP, collections, exception handling, basic multithreading). If you're new to Java, take our Java Programming course first; the two pair perfectly.",
      },
      {
        question: "Will I learn microservices or only Spring Boot?",
        answer:
          "Both. Roughly 40% of the course covers Spring Boot fundamentals (REST APIs, data, security) and the remaining 60% is dedicated to microservices architecture, Spring Cloud, Kafka, Docker, Kubernetes, and production deployment patterns.",
      },
      {
        question: "What kind of projects will I build?",
        answer:
          "You'll build a complete production-style system end-to-end: an e-commerce backend split into multiple microservices (user service, product catalogue, order service, payment service, notification service) with a Spring Cloud Gateway, JWT authentication, Kafka-based event flows, and full Docker/Kubernetes deployment.",
      },
      {
        question: "Is Spring Boot still in demand?",
        answer:
          "Spring Boot remains the dominant Java backend framework in India and globally. Almost every product company hiring Java developers — TCS, Infosys, Wipro, Persistent, plus most product startups — uses Spring Boot for new services, and microservices skills are among the most asked-for in current job postings.",
      },
      {
        question: "Will the course cover Kubernetes deeply?",
        answer:
          "We cover Kubernetes from a developer's perspective — enough to deploy, configure, scale, and debug your own services confidently. For deep platform-engineering Kubernetes, we recommend pairing this with our DevOps course.",
      },
      {
        question: "Do you cover testing?",
        answer:
          "Yes. We include unit testing with JUnit 5 and Mockito, integration testing with @SpringBootTest, contract testing basics, and Testcontainers for spinning up real databases inside tests. Testing is treated as a first-class skill, not an afterthought.",
      },
      {
        question: "What is the placement support?",
        answer:
          "Standard Archer Infotech placement assistance applies: resume preparation, mock interviews focused on Spring Boot and microservices system-design rounds, and direct introductions to our 100+ corporate hiring partners.",
      },
    ],
    prerequisites: [
      "Working knowledge of Core Java (OOP, collections, exceptions)",
      "Basic SQL and relational database concepts",
      "Comfort with command line and Git",
    ],
    careerOpportunities: [
      "Backend Java Developer",
      "Spring Boot Developer",
      "Microservices Engineer",
      "Software Engineer (Backend)",
      "API Developer",
    ],
    certifications: ["Spring Professional Certification (VMware)"],
  },

  // Full Stack Development
  {
    id: "java-fullstack",
    slug: "java-full-stack-training-in-pune",
    title: "Java Full Stack Development",
    shortTitle: "Java Full Stack",
    // SERP-facing strings target the highest-demand query from GSC
    // ("java full stack developer course in pune"), not the lower-volume
    // "...development training" phrasing the template produced.
    seoTitle: "Java Full Stack Developer Course in Pune with Placement",
    heroHeading: "Java Full Stack Developer Course in Pune with Placement",
    emiAvailable: true,
    highestPackageLpa: "16",
    avgPackageThisYearLpa: "8.3",
    batchesCompleted: "250+",
    category: "Full Stack Development",
    categorySlug: "full-stack-development",
    description: "Become a job-ready Java Full Stack Developer with practical training in Core Java, Advanced Java, Spring Boot, Hibernate, REST APIs, React or Angular, MySQL, Git, Docker, and live projects.",
    shortDescription: "Job-ready Java Full Stack course with Spring Boot, REST APIs, React/Angular, and live projects",
    duration: "6 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/java-fullstack.jpg",
    isFeatured: true,
    isPopular: true,
    highlights: [
      "Complete Java backend path from Core Java to Spring Boot",
      "REST API development with Spring MVC, validation, and Postman testing",
      "Hibernate, JPA, MySQL, database design, joins, and transactions",
      "Frontend development with HTML, CSS, JavaScript, and React or Angular",
      "Authentication basics with Spring Security and JWT",
      "Git, GitHub, Maven, Docker basics, and deployment workflow",
      "Resume-ready projects with code, API documentation, and database design",
      "Placement assistance with resume guidance and mock interviews",
    ],
    // Restructured 2026-08-17 to mirror the Java + AI Roadmap 2026 (Levels
    // 1-12), with frontend inserted after REST APIs — the roadmap is a
    // backend-and-AI roadmap and carries no frontend, but this is a Full
    // Stack course. Per roadmap §4, JSP/Servlets and legacy Java EE patterns
    // are no longer taught as core. Kept in step with the week-by-week
    // curriculum in course-content/java-full-stack-training-in-pune.ts.
    modules: [
      {
        title: "Programming Fundamentals",
        topics: ["Algorithms and flowcharts", "Variables and memory", "Data types and operators", "Conditions and loops", "Functions and methods", "Debugging as a method", "Basic algorithms", "Time and space complexity"],
      },
      {
        title: "Java Platform and Fundamentals",
        topics: ["JDK, JRE and JVM", "Source, bytecode and execution", "Classpath and packages", "Primitive vs reference types", "Type casting and operators", "Methods, overloading, varargs", "Recursion and static", "JDK 21+, IntelliJ IDEA, Maven"],
      },
      {
        title: "OOP and Modern Java",
        topics: ["Classes, objects, constructors", "Encapsulation, inheritance, polymorphism, abstraction", "Interfaces and abstract classes", "Composition vs inheritance", "equals(), hashCode(), toString()", "Records, enums, sealed classes", "Lambdas and functional interfaces", "Stream API and Optional", "Pattern matching and switch expressions"],
      },
      {
        title: "Exceptions and Collections",
        topics: ["Checked vs unchecked exceptions", "try-with-resources and custom exceptions", "List, Set, Map, Queue, Deque", "HashMap, TreeMap, LinkedHashMap", "Iterators, Comparable, Comparator", "Generics and wildcards"],
      },
      {
        title: "JVM, Memory and Concurrency",
        topics: ["JVM architecture — stack, heap, metaspace", "Garbage collection and GC generations", "Class loading, JIT, memory leaks", "Threads, synchronization, locks", "Race conditions and deadlocks", "ExecutorService and thread pools", "CompletableFuture and concurrent collections", "Virtual threads (Java 21+)"],
      },
      {
        title: "I/O, Tools and Database Foundations",
        topics: ["File handling, NIO, Paths and Files", "JSON, Date/Time API, regex", "SQL — joins, subqueries, CTEs, window functions", "Indexes, normalization, query optimization", "Transactions, ACID, isolation levels", "JDBC and PreparedStatement", "Connection pooling with HikariCP", "Maven or Gradle, Git and GitHub"],
      },
      {
        title: "Spring and Spring Boot",
        topics: ["Inversion of control and dependency injection", "Beans, ApplicationContext, component scanning", "Configuration and profiles", "Spring Boot starters and auto-configuration", "Externalised configuration", "Actuator and production endpoints", "Structured logging with SLF4J and Logback"],
      },
      {
        title: "REST APIs and Persistence",
        topics: ["HTTP methods, status codes, headers", "REST principles, DTOs, validation", "Pagination, sorting, filtering", "Global exception handling", "JPA and Hibernate entity mapping", "Spring Data JPA repositories", "Relationships, lazy loading, cascading", "JPQL, native queries, the N+1 problem", "OpenAPI / Swagger"],
      },
      {
        title: "Frontend Development",
        topics: ["HTML5, CSS3, JavaScript, TypeScript", "React 19 — Hooks, Server Components", "Next.js 15 App Router", "Angular 18+ as an opt-in alternative", "State management and routing", "REST integration with the Spring Boot API", "JWT auth flow front-to-back", "Tailwind CSS and responsive UI"],
      },
      {
        title: "Security and Testing",
        topics: ["Authentication vs authorization", "Password hashing, roles, permissions", "JWT, OAuth 2.0, OpenID Connect", "CORS, CSRF, Spring Security filters", "JUnit and Mockito", "Integration testing with Testcontainers", "REST Assured and Postman", "JaCoCo code coverage"],
      },
      {
        title: "Production Engineering",
        topics: ["Docker, images, volumes, networks", "Docker Compose", "Redis and the cache-aside pattern", "TTL and distributed caching", "Kafka — producers, consumers, topics", "Partitions, consumer groups, event ordering", "Idempotency and safe retries"],
      },
      {
        title: "Microservices, Cloud and DevOps",
        topics: ["Service boundaries and API Gateway", "Service discovery and OpenFeign", "Circuit breakers and resilience", "Saga pattern and event-driven architecture", "AWS or Azure — containers, managed DBs, IAM", "GitHub Actions CI/CD and secrets management", "Kubernetes basics", "Observability — OpenTelemetry, Prometheus, Grafana"],
      },
      {
        title: "AI for Java Developers",
        topics: ["LLM concepts — prompts, tokens, context windows", "Structured output, streaming, tool calling", "Spring AI — chat models and prompt templates", "Embeddings and vector stores", "RAG — chunking, retrieval, grounded generation", "PostgreSQL + pgvector", "AI agents, memory, human approval", "AI security — prompt injection, tool authorization", "AI evaluation — groundedness, hallucination, cost"],
      },
      {
        title: "AI-Assisted Development Workflow",
        topics: ["GitHub Copilot, Claude, Cursor, IDE-native AI", "Prompting for scaffolding and boilerplate", "AI-assisted test generation", "Refactoring and explaining unfamiliar code", "AI debugging from errors and logs", "Guardrails — hallucinated APIs, licensing, privacy", "Reviewing and owning AI-generated code"],
      },
      {
        title: "Capstone Project",
        topics: ["Requirement analysis", "Database schema design", "Backend API development", "Frontend integration", "Authentication and authorization", "Testing and debugging", "An AI-backed feature end to end", "GitHub portfolio preparation"],
      },
    ],
    // Matches the "Recommended 2026 Stack" in the Java + AI Roadmap 2026,
    // plus the frontend this course adds. Updated 2026-08-17.
    tools: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Hibernate",
      "JPA",
      "PostgreSQL",
      "MySQL",
      "REST APIs",
      "JUnit",
      "Mockito",
      "Testcontainers",
      "Postman",
      "React.js",
      "Angular",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Git",
      "GitHub",
      "GitHub Actions",
      "Maven",
      "Gradle",
      "Docker",
      "Kubernetes",
      "Redis",
      "Kafka",
      "AWS",
      "Azure",
      "OpenTelemetry",
      "Spring AI",
      "pgvector",
    ],
    projects: [
      {
        title: "Student Management System",
        description: "Build a role-based application with student records, course assignment, search, validation, and database-backed CRUD operations.",
        skills: ["Spring Boot", "MySQL", "Hibernate", "REST APIs"],
      },
      {
        title: "E-commerce Product and Order App",
        description: "Create product, cart, order, and admin modules with backend APIs, frontend integration, and transaction handling.",
        skills: ["Spring Boot", "React/Angular", "JPA", "Postman"],
      },
      {
        title: "Job Portal or CRM Dashboard",
        description: "Develop a complete full stack dashboard with authentication, forms, filters, reports, and deployment-ready project structure.",
        skills: ["JWT", "JavaScript", "MySQL", "GitHub"],
      },
    ],
    targetAudience: [
      "BE, BTech, BCA, BCS, MCA, MSc IT students",
      "Freshers preparing for Java developer and software engineer roles",
      "Working professionals moving into full stack development",
      "Career switchers with basic computer knowledge and willingness to practice",
    ],
    placementSupport: [
      "Resume preparation focused on Java full stack skills",
      "GitHub and project portfolio guidance",
      "Mock technical interviews for Java, SQL, Spring Boot, and REST APIs",
      "HR interview preparation and communication guidance",
      "Job alerts and interview coordination with hiring partners where available",
    ],
    faqs: [
      {
        question: "What is Java Full Stack Development?",
        answer: "Java Full Stack Development means building both the frontend and backend of a web application using Java backend technologies, databases, REST APIs, and frontend frameworks such as React or Angular.",
      },
      {
        question: "Is this Java Full Stack course suitable for beginners?",
        answer: "Yes. The course starts with programming foundations and Core Java before moving to Advanced Java, Spring Boot, databases, frontend development, and full stack projects.",
      },
      {
        question: "Does this course include Spring Boot?",
        answer: "Yes. Spring Boot, REST API development, Spring Data JPA, validation, exception handling, and backend project development are core parts of the course.",
      },
      {
        question: "Which frontend will I learn: React or Angular?",
        answer: "The course can include React.js or Angular depending on the batch structure and student requirement. Both options are connected to Java backend APIs during project work.",
      },
      {
        question: "Will I work on live projects?",
        answer: "Yes. Students build practical projects that include backend APIs, database integration, frontend screens, authentication basics, and GitHub-ready code.",
      },
      {
        question: "Do you provide placement assistance?",
        answer: "Yes. Archer Infotech provides resume support, mock interviews, interview preparation, and placement assistance through job alerts and hiring partner coordination where available.",
      },
      {
        question: "What is the duration of the Java Full Stack Training in Pune?",
        answer: "The recommended duration is 6 months. Fast-track, weekday, weekend, classroom, and online options may vary by batch schedule.",
      },
      {
        question: "What roles can I apply for after this course?",
        answer: "You can apply for roles such as Java Full Stack Developer, Java Backend Developer, Spring Boot Developer, Web Application Developer, and Software Engineer Trainee.",
      },
    ],
    prerequisites: ["Basic computer knowledge", "Logical thinking ability", "Consistent coding practice during the course"],
    careerOpportunities: ["Java Full Stack Developer", "Java Backend Developer", "Spring Boot Developer", "Web Application Developer", "Software Engineer Trainee"],
    certifications: ["Archer Infotech course completion certificate"],
  },
  {
    id: "mern-stack",
    slug: "mern-stack-training-in-pune",
    title: "MERN Stack Development",
    shortTitle: "MERN Stack",
    category: "Full Stack Development",
    categorySlug: "full-stack-development",
    description: "Master the MERN stack - MongoDB, Express.js, React.js, and Node.js. Build modern, scalable web applications from scratch.",
    shortDescription: "Build full-stack apps with MongoDB, Express, React, and Node.js",
    duration: "5 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/mern.jpg",
    isFeatured: true,
    isPopular: true,
    highlights: [
      "MongoDB database design",
      "Express.js backend development",
      "React.js with hooks and context",
      "Node.js server-side development",
      "RESTful API design",
      "Authentication with JWT",
      "State management with Redux",
      "Deployment on cloud platforms",
    ],
    modules: [
      {
        title: "JavaScript Deep Dive",
        topics: ["ES6+ features", "Asynchronous JavaScript", "Promises and async/await", "Modules", "Modern tooling"],
      },
      {
        title: "Node.js & Express",
        topics: ["Node.js fundamentals", "Express.js framework", "Middleware", "Routing", "Error handling"],
      },
      {
        title: "MongoDB",
        topics: ["NoSQL concepts", "MongoDB CRUD", "Mongoose ODM", "Aggregation", "Indexing"],
      },
      {
        title: "React.js",
        topics: ["React fundamentals", "Hooks", "Context API", "React Router", "Redux/Toolkit"],
      },
      {
        title: "Full Stack Integration",
        topics: ["REST API design", "Authentication/Authorization", "File uploads", "Real-time with Socket.io", "Deployment"],
      },
    ],
    faqs: [
      {
        question: "Why MERN stack?",
        answer: "MERN uses JavaScript throughout the stack, making it easier to learn and highly productive for building modern web applications.",
      },
    ],
    prerequisites: ["JavaScript fundamentals", "Basic HTML/CSS"],
    careerOpportunities: ["MERN Stack Developer", "Full Stack Developer", "React Developer", "Node.js Developer"],
  },
  {
    id: "python-fullstack",
    slug: "python-full-stack-training-in-pune",
    title: "Python Full Stack Development",
    shortTitle: "Python Full Stack",
    category: "Full Stack Development",
    categorySlug: "full-stack-development",
    description: "Become a Python Full Stack Developer with Django/Flask backend and modern frontend technologies. Build web applications end-to-end.",
    shortDescription: "Full-stack web development with Python, Django, and React",
    duration: "5 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/python-fullstack.jpg",
    highlights: [
      "Python programming mastery",
      "Django framework",
      "Django REST Framework",
      "React.js frontend",
      "PostgreSQL database",
      "Authentication and security",
      "API development",
      "Deployment and DevOps basics",
    ],
    modules: [
      {
        title: "Python Mastery",
        topics: ["Advanced Python", "OOP in Python", "Decorators", "Generators", "Context managers"],
      },
      {
        title: "Django Framework",
        topics: ["Django basics", "Models and ORM", "Views and templates", "Forms", "Admin interface"],
      },
      {
        title: "Django REST Framework",
        topics: ["REST principles", "Serializers", "ViewSets", "Authentication", "API documentation"],
      },
      {
        title: "Frontend with React",
        topics: ["React fundamentals", "Component design", "State management", "API integration", "Routing"],
      },
    ],
    faqs: [
      {
        question: "Django or Flask?",
        answer: "We primarily cover Django for its batteries-included approach, ideal for larger applications. Flask concepts are also introduced.",
      },
    ],
    prerequisites: ["Basic Python knowledge", "HTML/CSS basics"],
    careerOpportunities: ["Python Full Stack Developer", "Django Developer", "Backend Developer"],
  },
  {
    id: "dotnet-fullstack",
    slug: "dotnet-full-stack-training-in-pune",
    title: ".NET Full Stack Development",
    shortTitle: ".NET Full Stack",
    category: "Full Stack Development",
    categorySlug: "full-stack-development",
    description: "Master .NET Full Stack development with ASP.NET Core, C#, and modern frontend frameworks. Build enterprise-grade applications.",
    shortDescription: "Enterprise full-stack development with .NET Core and Angular/React",
    duration: "6 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/dotnet-fullstack.jpg",
    highlights: [
      "C# programming",
      "ASP.NET Core MVC",
      "ASP.NET Core Web API",
      "Entity Framework Core",
      "Angular or React frontend",
      "SQL Server database",
      "Azure deployment",
      "Microservices with .NET",
    ],
    // Restructured 2026-08-18 to mirror the .NET + AI Roadmap 2026
    // (Levels 1-16). Kept in step with the week-by-week curriculum in
    // course-content/dotnet-full-stack-training-in-pune.ts — the previous
    // four-module list described roughly a third of what the course teaches.
    // Per roadmap section 5, ASP.NET Web Forms, .NET Framework-first
    // development and legacy MVC patterns are not core content.
    modules: [
      {
        title: "Programming Fundamentals",
        topics: ["Algorithms and flowcharts", "Variables, data types, operators", "Conditions, loops, functions", "Debugging as a method", "Core data structures", "Time and space complexity"],
      },
      {
        title: ".NET Platform and Tooling",
        topics: [".NET SDK vs runtime", "CLR, IL and JIT compilation", "Assemblies and NuGet", "dotnet CLI — new, build, run, test, publish", "Solution and project layout"],
      },
      {
        title: "C# Fundamentals and OOP",
        topics: ["Value vs reference types", "Nullable types and conversion", "ref, out, in, params", "Classes, constructors, properties", "Encapsulation, inheritance, polymorphism, abstraction", "Interfaces and composition"],
      },
      {
        title: "Modern C#",
        topics: ["Delegates, Action, Func, Predicate", "Lambdas, events, extension methods", "Records, init and required members", "Nullable reference types", "Pattern matching and tuples", "Primary constructors and collection expressions"],
      },
      {
        title: "Collections, Generics and LINQ",
        topics: ["List, Dictionary, HashSet, Queue, Stack", "IEnumerable, ICollection, IList", "Generic constraints, covariance, contravariance", "LINQ query and method syntax", "Deferred execution", "IEnumerable vs IQueryable"],
      },
      {
        title: "Exceptions, Runtime and Async",
        topics: ["Exceptions and custom exception types", "Stack vs heap, garbage collection", "IDisposable, using, resource lifetime", "Task, async/await, CancellationToken", "ThreadPool, locks, concurrent collections", "Channels, background services, IAsyncEnumerable"],
      },
      {
        title: "SQL and Data Access",
        topics: ["Joins, subqueries, CTEs, window functions", "Indexes, transactions, ACID, isolation", "Query optimisation", "ADO.NET and SQL-injection prevention", "EF Core — DbContext, entities, migrations", "Tracking, loading strategies, concurrency"],
      },
      {
        title: "Dependency Injection and ASP.NET Core",
        topics: ["Inversion of control and DI", "Singleton, scoped, transient lifetimes", "Middleware pipeline and routing", "Configuration, environments, options pattern", "Logging and application lifecycle", "Minimal APIs vs controllers"],
      },
      {
        title: "REST APIs and Security",
        topics: ["HTTP methods, status codes, DTOs", "Validation, pagination, filtering, versioning", "ASP.NET Core Identity and password hashing", "Roles, claims and policies", "JWT and refresh tokens", "OAuth 2.0, OpenID Connect, CORS, CSRF"],
      },
      {
        title: "Frontend Development",
        topics: ["HTML, CSS, JavaScript, TypeScript", "Angular 19 — components, services, RxJS", "React 19 as an opt-in alternative", "Forms, routing, API integration", "HttpClient, JWT interceptors, route guards", "NgRx for global state"],
      },
      {
        title: "Testing and Dev Tools",
        topics: ["xUnit and NUnit concepts", "Mocking and assertions", "Integration testing with Testcontainers", "Postman and REST testing", "Playwright end-to-end tests", "Git, pull requests, code review, GitHub Actions"],
      },
      {
        title: "Production Engineering",
        topics: ["Docker, Compose, volumes, health checks", "Redis — cache-aside, TTL, distributed caching", "Rate limiting and distributed locks", "RabbitMQ and Kafka", "Partitions, consumer groups, idempotency", "gRPC and Protocol Buffers"],
      },
      {
        title: "Microservices, Azure and DevOps",
        topics: ["Service boundaries and modular monolith", "API Gateway, service discovery, resilience", "Saga pattern and event-driven architecture", "Azure App Service, Container Apps, Functions", "Azure SQL, Key Vault, Service Bus, Entra ID", "GitHub Actions CI/CD", "OpenTelemetry and Application Insights"],
      },
      {
        title: "AI for .NET Developers",
        topics: ["Tokens, context windows, prompts", "Structured outputs and streaming", "Function/tool calling and model selection", "Microsoft.Extensions.AI abstractions", "Semantic Kernel", "Azure OpenAI", "Auth, logging and rate limiting on AI endpoints"],
      },
      {
        title: "Embeddings, RAG, Agents and AI Safety",
        topics: ["Embeddings and semantic search", "pgvector and Azure AI Search", "RAG — chunking, retrieval, reranking, citations", "Tool calling against internal APIs", "Agents — planning, memory, human-in-the-loop", "Prompt injection and tool authorisation", "Groundedness, hallucination and cost evaluation"],
      },
      {
        title: "Architecture and Design Principles",
        topics: ["SOLID, DRY, KISS", "Layered, Clean and Hexagonal architecture", "Modular monolith vs microservices", "CQRS concepts and Saga", "Scalability, fault tolerance, load balancing"],
      },
      {
        title: "AI-Assisted Development Workflow",
        topics: ["GitHub Copilot, Claude, Cursor, IDE-native AI", "Prompting for C# and ASP.NET Core", "AI-assisted test generation", "AI debugging from errors and logs", "Guardrails — hallucinated APIs, licensing, privacy", "Reviewing and owning AI-generated code"],
      },
      {
        title: "Capstone Project",
        topics: ["Requirement analysis and schema design", "ASP.NET Core API development", "Frontend integration", "Authentication and authorisation", "Testing and deployment to Azure", "An AI-backed feature end to end", "GitHub portfolio preparation"],
      },
    ],
    faqs: [
      {
        question: "Is .NET good for full stack?",
        answer: ".NET is excellent for enterprise applications with great tooling, performance, and Microsoft ecosystem support.",
      },
    ],
    prerequisites: ["Basic C# knowledge helpful", "Understanding of web concepts"],
    careerOpportunities: [".NET Full Stack Developer", "Software Engineer", "Enterprise Developer"],
  },

  // Modern Web
  {
    id: "reactjs",
    slug: "react-training-in-pune",
    title: "React.js Development",
    shortTitle: "React.js",
    category: "Modern Web",
    categorySlug: "modern-web",
    description: "Master React.js for building modern user interfaces. Learn hooks, state management, testing, and build production-ready applications.",
    shortDescription: "Build modern UIs with React.js and its ecosystem",
    duration: "2.5 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/react.jpg",
    isPopular: true,
    highlights: [
      "React fundamentals and JSX",
      "Hooks (useState, useEffect, custom hooks)",
      "Context API and Redux",
      "React Router",
      "Testing with Jest",
      "Performance optimization",
    ],
    modules: [
      {
        title: "React Fundamentals",
        topics: ["JSX syntax", "Components", "Props and state", "Event handling", "Conditional rendering"],
      },
      {
        title: "React Hooks",
        topics: ["useState", "useEffect", "useContext", "useReducer", "Custom hooks"],
      },
      {
        title: "State Management",
        topics: ["Context API", "Redux basics", "Redux Toolkit", "RTK Query", "Zustand"],
      },
      {
        title: "Advanced React",
        topics: ["Performance optimization", "Code splitting", "Error boundaries", "Testing", "Deployment"],
      },
    ],
    faqs: [
      {
        question: "Do I need JavaScript knowledge?",
        answer: "Yes, good JavaScript knowledge (especially ES6+) is essential before learning React.",
      },
    ],
    prerequisites: ["Strong JavaScript knowledge", "HTML/CSS"],
    careerOpportunities: ["React Developer", "Frontend Developer", "UI Developer"],
  },
  {
    id: "angular",
    slug: "angular-training-in-pune",
    title: "Angular Development",
    shortTitle: "Angular",
    category: "Modern Web",
    categorySlug: "modern-web",
    description: "Master Angular for building scalable, enterprise-ready web applications. Learn TypeScript, components, services, routing, forms, API integration, testing, and deployment through practical projects.",
    shortDescription: "Build enterprise-ready frontend apps with Angular and TypeScript",
    duration: "2.5 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/angular.jpg",
    highlights: [
      "Angular CLI, workspace setup, and project structure",
      "TypeScript, components, templates, and data binding",
      "Directives, pipes, services, and dependency injection",
      "Routing, guards, lazy loading, and feature modules",
      "Template-driven and reactive forms with validation",
      "REST API integration, testing basics, and deployment",
    ],
    modules: [
      {
        title: "Angular Fundamentals",
        topics: ["Angular CLI setup", "Workspace structure", "Components", "Templates", "Data binding", "Event handling"],
      },
      {
        title: "TypeScript & Component Design",
        topics: ["TypeScript essentials", "Inputs and outputs", "Lifecycle hooks", "Content projection", "Component communication"],
      },
      {
        title: "Directives, Pipes & Services",
        topics: ["Built-in directives", "Custom directives", "Built-in pipes", "Custom pipes", "Services", "Dependency injection"],
      },
      {
        title: "Routing & Application Flow",
        topics: ["Angular Router", "Nested routes", "Route parameters", "Route guards", "Lazy loading", "Navigation patterns"],
      },
      {
        title: "Forms & API Integration",
        topics: ["Template-driven forms", "Reactive forms", "Form validation", "HTTP client", "REST API integration", "Error handling"],
      },
      {
        title: "Production Practices",
        topics: ["State management basics", "Testing fundamentals", "Build optimization", "Environment configuration", "Deployment", "Project review"],
      },
    ],
    faqs: [
      {
        question: "Do I need TypeScript before learning Angular?",
        answer: "Basic JavaScript knowledge is required, and TypeScript fundamentals are covered as part of the course so you can work confidently with Angular.",
      },
      {
        question: "Is Angular good for enterprise applications?",
        answer: "Yes. Angular is widely used for large-scale, maintainable business applications because it includes routing, forms, dependency injection, and strong TypeScript support.",
      },
      {
        question: "What kind of project will I build?",
        answer: "You will build a structured Angular application with reusable components, routing, forms, API integration, validation, and production deployment steps.",
      },
    ],
    prerequisites: ["JavaScript fundamentals", "HTML/CSS", "Basic understanding of web applications"],
    careerOpportunities: ["Angular Developer", "Frontend Developer", "UI Developer", "Web Application Developer"],
  },
  {
    id: "nextjs",
    slug: "nextjs-training-in-pune",
    title: "Next.js Development",
    shortTitle: "Next.js",
    category: "Modern Web",
    categorySlug: "modern-web",
    description: "Learn Next.js for building production-ready React applications with SSR, static generation, and the latest App Router features.",
    shortDescription: "Production-ready React apps with Next.js",
    duration: "2 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/nextjs.jpg",
    highlights: [
      "Next.js App Router",
      "Server Components",
      "Static and dynamic rendering",
      "API routes",
      "Authentication patterns",
      "Deployment on Vercel",
    ],
    modules: [
      {
        title: "Next.js Fundamentals",
        topics: ["Project setup", "App Router", "File-based routing", "Layouts", "Loading and error states"],
      },
      {
        title: "Data Fetching",
        topics: ["Server Components", "Client Components", "Caching", "Revalidation", "Streaming"],
      },
      {
        title: "Advanced Features",
        topics: ["API routes", "Middleware", "Authentication", "Image optimization", "SEO"],
      },
    ],
    faqs: [
      {
        question: "Should I learn React first?",
        answer: "Yes, Next.js is built on React. Strong React fundamentals are necessary before learning Next.js.",
      },
    ],
    prerequisites: ["React.js experience", "JavaScript/TypeScript"],
    careerOpportunities: ["Full Stack Developer", "Frontend Developer", "React Developer"],
  },
  {
    id: "typescript",
    slug: "typescript-training-in-pune",
    title: "TypeScript Development",
    shortTitle: "TypeScript",
    category: "Modern Web",
    categorySlug: "modern-web",
    description: "Master TypeScript for type-safe JavaScript development. Learn types, interfaces, generics, and integrate TypeScript with modern frameworks.",
    shortDescription: "Type-safe JavaScript development with TypeScript",
    duration: "1.5 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/typescript.jpg",
    highlights: [
      "TypeScript fundamentals",
      "Type annotations and inference",
      "Interfaces and types",
      "Generics",
      "TypeScript with React",
      "TypeScript with Node.js",
    ],
    modules: [
      {
        title: "TypeScript Basics",
        topics: ["Type system", "Basic types", "Type annotations", "Type inference", "Type guards"],
      },
      {
        title: "Advanced Types",
        topics: ["Interfaces", "Type aliases", "Union and intersection", "Generics", "Utility types"],
      },
      {
        title: "TypeScript in Practice",
        topics: ["Configuration", "With React", "With Node.js", "Declaration files", "Best practices"],
      },
    ],
    faqs: [
      {
        question: "Is TypeScript necessary?",
        answer: "TypeScript is increasingly standard in professional development, providing better tooling and catching errors early.",
      },
    ],
    prerequisites: ["JavaScript proficiency"],
    careerOpportunities: ["Full Stack Developer", "Frontend Developer", "Software Engineer"],
  },
  {
    id: "nodejs",
    slug: "nodejs-training-in-pune",
    title: "Node.js Development",
    shortTitle: "Node.js",
    category: "Modern Web",
    categorySlug: "modern-web",
    description: "Master Node.js for server-side JavaScript development. Build scalable APIs, real-time applications, and microservices.",
    shortDescription: "Server-side JavaScript with Node.js and Express",
    duration: "2.5 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/nodejs.jpg",
    highlights: [
      "Node.js fundamentals",
      "Express.js framework",
      "RESTful API design",
      "Database integration",
      "Authentication and security",
      "Real-time with WebSockets",
    ],
    modules: [
      {
        title: "Node.js Core",
        topics: ["Node.js architecture", "Modules and npm", "File system", "Streams", "Events"],
      },
      {
        title: "Express.js",
        topics: ["Express basics", "Routing", "Middleware", "Error handling", "Template engines"],
      },
      {
        title: "Database Integration",
        topics: ["MongoDB with Mongoose", "SQL with Sequelize", "ORMs and ODMs", "Query optimization", "Migrations"],
      },
      {
        title: "Advanced Topics",
        topics: ["Authentication", "Security best practices", "WebSockets", "Testing", "Deployment"],
      },
    ],
    faqs: [
      {
        question: "Node.js vs other backend technologies?",
        answer: "Node.js excels in I/O-intensive applications and real-time features, with the advantage of using JavaScript throughout.",
      },
    ],
    prerequisites: ["JavaScript proficiency", "Basic understanding of servers"],
    careerOpportunities: ["Node.js Developer", "Backend Developer", "Full Stack Developer"],
  },

  // Cloud & DevOps
  {
    id: "aws",
    slug: "aws-training-in-pune",
    title: "AWS Cloud Computing",
    shortTitle: "AWS",
    category: "Cloud & DevOps",
    categorySlug: "cloud-devops",
    description: "Master Amazon Web Services cloud platform. Learn core services, architecture patterns, and prepare for AWS certifications.",
    shortDescription: "Comprehensive AWS cloud platform training",
    duration: "3 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/aws.jpg",
    isFeatured: true,
    isPopular: true,
    highlights: [
      "AWS core services (EC2, S3, RDS)",
      "Networking (VPC, Route 53)",
      "Security and IAM",
      "Serverless with Lambda",
      "Container services (ECS, EKS)",
      "AWS certification preparation",
    ],
    modules: [
      {
        title: "AWS Fundamentals",
        topics: ["Cloud concepts", "AWS global infrastructure", "IAM basics", "Billing and pricing", "Support plans"],
      },
      {
        title: "Compute & Storage",
        topics: ["EC2 instances", "EBS volumes", "S3 storage", "EFS", "Glacier"],
      },
      {
        title: "Networking & Security",
        topics: ["VPC design", "Subnets and routing", "Security groups", "NACLs", "Route 53"],
      },
      {
        title: "Databases & Applications",
        topics: ["RDS", "DynamoDB", "ElastiCache", "Lambda", "API Gateway"],
      },
      {
        title: "Advanced Topics",
        topics: ["CloudFormation", "ECS/EKS", "Monitoring", "Well-Architected Framework", "Cost optimization"],
      },
    ],
    faqs: [
      {
        question: "Which AWS certification should I target?",
        answer: "We recommend starting with AWS Solutions Architect Associate, which provides a comprehensive foundation.",
      },
    ],
    prerequisites: ["Basic IT knowledge", "Understanding of networking concepts"],
    careerOpportunities: ["AWS Cloud Engineer", "DevOps Engineer", "Cloud Architect", "Solutions Architect"],
    certifications: ["AWS Solutions Architect Associate", "AWS Developer Associate"],
  },
  {
    id: "azure",
    slug: "azure-training-in-pune",
    title: "Microsoft Azure",
    shortTitle: "Azure",
    category: "Cloud & DevOps",
    categorySlug: "cloud-devops",
    description: "Learn Microsoft Azure cloud services. Master Azure infrastructure, services, and prepare for Azure certifications.",
    shortDescription: "Microsoft Azure cloud platform training",
    duration: "3 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/azure.jpg",
    highlights: [
      "Azure core services",
      "Virtual machines and networking",
      "Azure App Service",
      "Azure SQL and Cosmos DB",
      "Azure DevOps",
      "Azure certification preparation",
    ],
    modules: [
      {
        title: "Azure Fundamentals",
        topics: ["Cloud concepts", "Azure architecture", "Azure portal", "Resource management", "Subscriptions"],
      },
      {
        title: "Compute & Networking",
        topics: ["Virtual machines", "App Service", "Azure Functions", "Virtual networks", "Load balancing"],
      },
      {
        title: "Storage & Database",
        topics: ["Blob storage", "Azure SQL", "Cosmos DB", "Azure Files", "Storage accounts"],
      },
      {
        title: "Identity & Security",
        topics: ["Azure AD", "RBAC", "Key Vault", "Security Center", "Compliance"],
      },
    ],
    faqs: [
      {
        question: "Azure vs AWS?",
        answer: "Both are leading cloud platforms. Azure integrates well with Microsoft ecosystem and is popular in enterprises.",
      },
    ],
    prerequisites: ["Basic IT knowledge", "Windows Server familiarity helpful"],
    careerOpportunities: ["Azure Cloud Engineer", "Cloud Administrator", "DevOps Engineer"],
    certifications: ["Azure Administrator Associate", "Azure Developer Associate"],
  },
  {
    id: "gcp",
    slug: "google-cloud-training-in-pune",
    title: "Google Cloud Platform",
    shortTitle: "GCP",
    category: "Cloud & DevOps",
    categorySlug: "cloud-devops",
    description: "Master Google Cloud Platform services. Learn compute, storage, data services, and prepare for GCP certifications.",
    shortDescription: "Google Cloud Platform training and certification",
    duration: "2.5 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/gcp.jpg",
    highlights: [
      "GCP core services",
      "Compute Engine and GKE",
      "Cloud Storage and BigQuery",
      "Cloud Functions",
      "Networking and security",
      "GCP certification preparation",
    ],
    modules: [
      {
        title: "GCP Fundamentals",
        topics: ["GCP overview", "Projects and billing", "Cloud Console", "IAM", "Resource hierarchy"],
      },
      {
        title: "Compute & Containers",
        topics: ["Compute Engine", "App Engine", "Cloud Functions", "GKE", "Cloud Run"],
      },
      {
        title: "Data Services",
        topics: ["Cloud Storage", "Cloud SQL", "BigQuery", "Datastore", "Pub/Sub"],
      },
    ],
    faqs: [
      {
        question: "Why choose GCP?",
        answer: "GCP excels in data analytics, ML/AI services, and Kubernetes (GKE). It's popular for data-intensive applications.",
      },
    ],
    prerequisites: ["Basic cloud knowledge", "Linux fundamentals"],
    careerOpportunities: ["GCP Cloud Engineer", "Data Engineer", "Cloud Architect"],
    certifications: ["GCP Associate Cloud Engineer"],
  },
  {
    id: "devops",
    slug: "devops-training-in-pune",
    title: "DevOps Engineering",
    shortTitle: "DevOps",
    category: "Cloud & DevOps",
    categorySlug: "cloud-devops",
    description: "Master DevOps practices and tools. Learn CI/CD, infrastructure as code, containerization, and build automated deployment pipelines.",
    shortDescription: "DevOps practices, tools, and automation",
    duration: "4 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/devops.jpg",
    isFeatured: true,
    isPopular: true,
    highlights: [
      "Linux administration",
      "Git and version control",
      "CI/CD with Jenkins/GitHub Actions",
      "Docker containerization",
      "Kubernetes orchestration",
      "Infrastructure as Code (Terraform)",
      "Monitoring and logging",
      "Cloud deployment",
    ],
    modules: [
      {
        title: "Foundation",
        topics: ["DevOps culture", "Linux essentials", "Shell scripting", "Networking basics", "Git workflows"],
      },
      {
        title: "CI/CD",
        topics: ["Jenkins setup", "Pipeline design", "GitHub Actions", "Automated testing", "Artifact management"],
      },
      {
        title: "Containers",
        topics: ["Docker fundamentals", "Dockerfile best practices", "Docker Compose", "Container networking", "Registry management"],
      },
      {
        title: "Orchestration",
        topics: ["Kubernetes architecture", "Deployments and services", "ConfigMaps and secrets", "Helm charts", "Cluster management"],
      },
      {
        title: "Infrastructure as Code",
        topics: ["Terraform basics", "AWS/Azure providers", "State management", "Modules", "Best practices"],
      },
    ],
    faqs: [
      {
        question: "Is coding required for DevOps?",
        answer: "Basic scripting (Bash, Python) is essential. DevOps involves automation which requires coding skills.",
      },
    ],
    prerequisites: ["Basic Linux knowledge", "Programming fundamentals"],
    careerOpportunities: ["DevOps Engineer", "Site Reliability Engineer", "Platform Engineer", "Cloud Engineer"],
  },
  {
    id: "kubernetes",
    slug: "kubernetes-training-in-pune",
    title: "Kubernetes",
    shortTitle: "Kubernetes",
    category: "Cloud & DevOps",
    categorySlug: "cloud-devops",
    description: "Master Kubernetes container orchestration. Learn to deploy, scale, and manage containerized applications in production.",
    shortDescription: "Container orchestration with Kubernetes",
    duration: "2 Months",
    level: "Advanced",
    mode: ["Online", "Offline"],
    image: "/images/courses/kubernetes.jpg",
    highlights: [
      "Kubernetes architecture",
      "Deployments and services",
      "ConfigMaps and secrets",
      "Persistent storage",
      "Helm package manager",
      "Cluster administration",
    ],
    modules: [
      {
        title: "Kubernetes Core",
        topics: ["Architecture overview", "Pods and containers", "ReplicaSets", "Deployments", "Services"],
      },
      {
        title: "Configuration",
        topics: ["ConfigMaps", "Secrets", "Resource limits", "Namespaces", "Labels and selectors"],
      },
      {
        title: "Advanced Topics",
        topics: ["Persistent volumes", "StatefulSets", "DaemonSets", "Jobs and CronJobs", "RBAC"],
      },
      {
        title: "Operations",
        topics: ["Helm charts", "Monitoring", "Logging", "Troubleshooting", "Cluster upgrades"],
      },
    ],
    faqs: [
      {
        question: "Should I learn Docker first?",
        answer: "Yes, Docker fundamentals are essential before learning Kubernetes container orchestration.",
      },
    ],
    prerequisites: ["Docker experience", "Linux administration", "Basic networking"],
    careerOpportunities: ["Kubernetes Administrator", "DevOps Engineer", "Platform Engineer"],
    certifications: ["CKA - Certified Kubernetes Administrator"],
  },
  {
    id: "docker",
    slug: "docker-training-in-pune",
    title: "Docker",
    shortTitle: "Docker",
    category: "Cloud & DevOps",
    categorySlug: "cloud-devops",
    description: "Learn Docker containerization from basics to advanced. Build, ship and run applications in containers over a 1.5-month Pune batch, online or classroom.",
    shortDescription: "Container technology with Docker",
    duration: "1.5 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/docker.jpg",
    highlights: [
      "Docker fundamentals",
      "Dockerfile creation",
      "Image management",
      "Docker Compose",
      "Networking and volumes",
      "Docker security",
    ],
    modules: [
      {
        title: "Docker Basics",
        topics: ["Container concepts", "Docker installation", "Images and containers", "Docker commands", "Docker Hub"],
      },
      {
        title: "Building Images",
        topics: ["Dockerfile syntax", "Layer caching", "Multi-stage builds", "Best practices", "Image optimization"],
      },
      {
        title: "Docker Compose",
        topics: ["Compose file", "Multi-container apps", "Networks", "Volumes", "Environment variables"],
      },
    ],
    faqs: [
      {
        question: "Why learn Docker?",
        answer: "Docker is the industry standard for containerization, essential for modern application deployment and DevOps practices.",
      },
    ],
    prerequisites: ["Basic Linux knowledge", "Command line familiarity"],
    careerOpportunities: ["DevOps Engineer", "Software Developer", "Cloud Engineer"],
  },

  // Cloud Certifications
  {
    id: "aws-solutions-architect",
    slug: "aws-solutions-architect-training-in-pune",
    title: "AWS Solutions Architect",
    shortTitle: "AWS SA",
    category: "Cloud Certifications",
    categorySlug: "cloud-certifications",
    description: "Prepare for the AWS Solutions Architect Associate certification. Master AWS architecture patterns and best practices.",
    shortDescription: "AWS Solutions Architect Associate certification prep",
    duration: "2.5 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/aws-sa.jpg",
    highlights: [
      "Exam-focused curriculum",
      "Hands-on labs",
      "Practice tests",
      "Architecture patterns",
      "Well-Architected Framework",
      "Exam strategies",
    ],
    modules: [
      {
        title: "Design Resilient Architectures",
        topics: ["High availability", "Fault tolerance", "Disaster recovery", "Data replication", "Scaling strategies"],
      },
      {
        title: "Design High-Performing Architectures",
        topics: ["Compute optimization", "Storage selection", "Database selection", "Caching", "Network optimization"],
      },
      {
        title: "Design Secure Applications",
        topics: ["IAM best practices", "Data protection", "Network security", "Compliance", "Logging and monitoring"],
      },
      {
        title: "Design Cost-Optimized Architectures",
        topics: ["Cost-effective compute", "Storage cost optimization", "Reserved capacity", "Billing and pricing", "Cost analysis"],
      },
    ],
    faqs: [
      {
        question: "How long to prepare for the exam?",
        answer: "With our structured program and practice tests, most students are exam-ready in 2-3 months.",
      },
    ],
    prerequisites: ["Basic AWS knowledge", "Hands-on AWS experience helpful"],
    careerOpportunities: ["AWS Solutions Architect", "Cloud Architect", "Cloud Engineer"],
    certifications: ["AWS Solutions Architect Associate"],
  },
  {
    id: "azure-administrator",
    slug: "azure-administrator-training-in-pune",
    title: "Azure Administrator",
    shortTitle: "Azure Admin",
    category: "Cloud Certifications",
    categorySlug: "cloud-certifications",
    description: "Prepare for the Azure Administrator Associate (AZ-104) certification. Master Azure infrastructure management over a 2.5-month Pune batch, online or classroom.",
    shortDescription: "Azure Administrator Associate (AZ-104) certification prep",
    duration: "2.5 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/azure-admin.jpg",
    highlights: [
      "AZ-104 exam preparation",
      "Hands-on labs",
      "Practice assessments",
      "Identity management",
      "Resource management",
      "Virtual networking",
    ],
    modules: [
      {
        title: "Manage Identities",
        topics: ["Azure AD", "Users and groups", "External identities", "RBAC", "Administrative units"],
      },
      {
        title: "Governance & Compliance",
        topics: ["Subscriptions", "Resource groups", "Azure Policy", "Blueprints", "Cost management"],
      },
      {
        title: "Storage & Compute",
        topics: ["Storage accounts", "VM deployment", "App Service", "Container instances", "Backup and recovery"],
      },
      {
        title: "Networking",
        topics: ["Virtual networks", "Load balancing", "VPN Gateway", "Azure DNS", "Network security"],
      },
    ],
    faqs: [
      {
        question: "Is AZ-104 difficult?",
        answer: "AZ-104 requires solid understanding of Azure services. Our hands-on approach ensures thorough preparation.",
      },
    ],
    prerequisites: ["Basic Azure knowledge", "IT administration experience helpful"],
    careerOpportunities: ["Azure Administrator", "Cloud Administrator", "Cloud Engineer"],
    certifications: ["Azure Administrator Associate (AZ-104)"],
  },
  {
    id: "gcp-associate",
    slug: "gcp-associate-cloud-engineer-training-in-pune",
    title: "GCP Associate Cloud Engineer",
    shortTitle: "GCP ACE",
    category: "Cloud Certifications",
    categorySlug: "cloud-certifications",
    description: "Prepare for the Google Cloud Associate Cloud Engineer certification. Master GCP services and operations over a 2-month Pune batch, online or classroom.",
    shortDescription: "GCP Associate Cloud Engineer certification prep",
    duration: "2 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/gcp-ace.jpg",
    highlights: [
      "Exam-focused training",
      "Hands-on labs",
      "Practice questions",
      "GCP console mastery",
      "gcloud CLI",
      "Real-world scenarios",
    ],
    modules: [
      {
        title: "Setting Up Cloud Solutions",
        topics: ["Project creation", "Billing management", "Cloud SDK", "IAM setup", "APIs"],
      },
      {
        title: "Planning & Configuring",
        topics: ["Compute options", "Data solutions", "Network resources", "Cost estimation", "Resource sizing"],
      },
      {
        title: "Deploying & Implementing",
        topics: ["Compute Engine", "GKE", "App Engine", "Cloud Functions", "Data services"],
      },
      {
        title: "Operations",
        topics: ["Monitoring", "Logging", "Alerts", "Troubleshooting", "Access management"],
      },
    ],
    faqs: [
      {
        question: "Which GCP cert should I start with?",
        answer: "Associate Cloud Engineer is the recommended starting certification for most professionals.",
      },
    ],
    prerequisites: ["Basic GCP knowledge", "Cloud concepts understanding"],
    careerOpportunities: ["GCP Cloud Engineer", "Cloud Administrator", "DevOps Engineer"],
    certifications: ["GCP Associate Cloud Engineer"],
  },

  // Data & AI
  {
    id: "machine-learning",
    slug: "machine-learning-training-in-pune",
    title: "Machine Learning",
    shortTitle: "Machine Learning",
    category: "Data & AI",
    categorySlug: "data-ai",
    description: "Master machine learning algorithms and techniques. Learn supervised, unsupervised learning, and build ML models with Python.",
    shortDescription: "Machine learning with Python and scikit-learn",
    duration: "4 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/ml.jpg",
    isFeatured: true,
    isPopular: true,
    highlights: [
      "Python for ML",
      "Supervised learning algorithms",
      "Unsupervised learning",
      "Feature engineering",
      "Model evaluation",
      "Real-world projects",
    ],
    modules: [
      {
        title: "ML Foundations",
        topics: ["Introduction to ML", "Python for ML", "NumPy and Pandas", "Data preprocessing", "Feature engineering"],
      },
      {
        title: "Supervised Learning",
        topics: ["Linear regression", "Logistic regression", "Decision trees", "Random forests", "SVM"],
      },
      {
        title: "Unsupervised Learning",
        topics: ["K-means clustering", "Hierarchical clustering", "PCA", "Anomaly detection", "Association rules"],
      },
      {
        title: "Model Development",
        topics: ["Cross-validation", "Hyperparameter tuning", "Ensemble methods", "Model deployment", "MLOps basics"],
      },
    ],
    faqs: [
      {
        question: "Do I need math background?",
        answer: "Basic statistics and linear algebra help. We cover necessary mathematical concepts as part of the course.",
      },
    ],
    prerequisites: ["Python programming", "Basic statistics"],
    careerOpportunities: ["ML Engineer", "Data Scientist", "AI Developer"],
  },
  {
    id: "data-science",
    slug: "data-science-training-in-pune",
    title: "Data Science",
    shortTitle: "Data Science",
    category: "Data & AI",
    categorySlug: "data-ai",
    description: "Comprehensive data science program covering statistics, machine learning, data visualization, and business analytics.",
    shortDescription: "Complete data science with Python",
    duration: "5 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/data-science.jpg",
    isFeatured: true,
    highlights: [
      "Python for data science",
      "Statistics and probability",
      "Data visualization",
      "Machine learning",
      "SQL for data analysis",
      "Business analytics",
    ],
    modules: [
      {
        title: "Python & Statistics",
        topics: ["Python basics", "NumPy and Pandas", "Descriptive statistics", "Probability", "Statistical inference"],
      },
      {
        title: "Data Analysis",
        topics: ["Data cleaning", "Exploratory analysis", "SQL queries", "Data wrangling", "Feature engineering"],
      },
      {
        title: "Visualization",
        topics: ["Matplotlib", "Seaborn", "Plotly", "Dashboard creation", "Storytelling with data"],
      },
      {
        title: "Machine Learning",
        topics: ["Regression", "Classification", "Clustering", "Model evaluation", "Deployment"],
      },
    ],
    faqs: [
      {
        question: "Is data science right for me?",
        answer: "If you're analytical, curious about data, and enjoy problem-solving, data science could be a great fit.",
      },
    ],
    prerequisites: ["Basic programming helpful", "Analytical mindset"],
    careerOpportunities: ["Data Scientist", "Data Analyst", "Business Analyst"],
  },
  {
    id: "data-analytics",
    slug: "data-analytics-training-in-pune",
    title: "Data Analytics",
    shortTitle: "Data Analytics",
    category: "Data & AI",
    categorySlug: "data-ai",
    description: "Learn data analytics with Excel, SQL, Python, and BI tools. Transform raw data into actionable business insights.",
    shortDescription: "Business analytics with SQL, Python, and BI tools",
    duration: "3 Months",
    level: "Beginner",
    mode: ["Online", "Offline"],
    image: "/images/courses/data-analytics.jpg",
    highlights: [
      "Excel for analytics",
      "SQL querying",
      "Python basics",
      "Power BI / Tableau",
      "Statistical analysis",
      "Business reporting",
    ],
    modules: [
      {
        title: "Excel Analytics",
        topics: ["Advanced Excel", "Pivot tables", "VLOOKUP/INDEX-MATCH", "Charts and graphs", "What-if analysis"],
      },
      {
        title: "SQL for Analysis",
        topics: ["SQL basics", "Joins and subqueries", "Aggregations", "Window functions", "Performance"],
      },
      {
        title: "Python Basics",
        topics: ["Python fundamentals", "Pandas basics", "Data manipulation", "Basic visualization", "Automation"],
      },
      {
        title: "BI Tools",
        topics: ["Power BI / Tableau", "Dashboard design", "Data modeling", "Report publishing", "Best practices"],
      },
    ],
    faqs: [
      {
        question: "Data Analytics vs Data Science?",
        answer: "Data Analytics focuses on business insights from existing data. Data Science includes predictive modeling and ML.",
      },
    ],
    prerequisites: ["Basic computer skills", "Basic math"],
    careerOpportunities: ["Data Analyst", "Business Analyst", "BI Analyst"],
  },
  {
    id: "data-engineering",
    slug: "data-engineering-training-in-pune",
    title: "Data Engineering",
    shortTitle: "Data Engineering",
    category: "Data & AI",
    categorySlug: "data-ai",
    description: "Build data pipelines and infrastructure. Learn Spark, Kafka, Airflow and modern data engineering practices over a 4-month Pune batch with placement support.",
    shortDescription: "Data pipelines with Spark, Kafka, and Airflow",
    duration: "4 Months",
    level: "Advanced",
    mode: ["Online", "Offline"],
    image: "/images/courses/data-engineering.jpg",
    highlights: [
      "Apache Spark",
      "Apache Kafka",
      "Apache Airflow",
      "Data warehousing",
      "ETL/ELT pipelines",
      "Cloud data platforms",
    ],
    modules: [
      {
        title: "Data Engineering Fundamentals",
        topics: ["Data architecture", "Data modeling", "Data warehousing", "Data lakes", "ETL vs ELT"],
      },
      {
        title: "Apache Spark",
        topics: ["Spark architecture", "RDDs and DataFrames", "Spark SQL", "Streaming", "Optimization"],
      },
      {
        title: "Kafka & Streaming",
        topics: ["Kafka basics", "Producers and consumers", "Stream processing", "Kafka Connect", "KSQL"],
      },
      {
        title: "Orchestration",
        topics: ["Airflow basics", "DAGs", "Operators", "Scheduling", "Monitoring"],
      },
    ],
    faqs: [
      {
        question: "Is coding required?",
        answer: "Yes, strong Python and SQL skills are essential for data engineering.",
      },
    ],
    prerequisites: ["Python proficiency", "SQL experience", "Basic cloud knowledge"],
    careerOpportunities: ["Data Engineer", "Big Data Engineer", "ETL Developer"],
  },

  // AI & GenAI
  {
    id: "generative-ai",
    slug: "genai-training-in-pune",
    title: "Generative AI",
    shortTitle: "Generative AI",
    category: "AI & GenAI",
    categorySlug: "generative-ai",
    description: "Master generative AI technologies including LLMs, image generation and building AI-powered applications over a 3-month Pune batch with placement support.",
    shortDescription: "Build applications with generative AI and LLMs",
    duration: "3 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/genai.png",
    isFeatured: true,
    isPopular: true,
    highlights: [
      "LLM fundamentals",
      "OpenAI API and models",
      "Prompt engineering",
      "RAG applications",
      "LangChain framework",
      "AI application development",
    ],
    modules: [
      {
        title: "GenAI Fundamentals",
        topics: ["Introduction to GenAI", "Types of generative models", "LLM architecture", "Transformer basics", "Model capabilities"],
      },
      {
        title: "Working with LLMs",
        topics: ["OpenAI API", "Claude API", "Model selection", "Token management", "Cost optimization"],
      },
      {
        title: "Prompt Engineering",
        topics: ["Prompt design", "Few-shot learning", "Chain of thought", "System prompts", "Prompt optimization"],
      },
      {
        title: "Building Applications",
        topics: ["LangChain basics", "Vector databases", "RAG implementation", "Agents and tools", "Deployment"],
      },
    ],
    faqs: [
      {
        question: "Do I need ML background?",
        answer: "Basic understanding helps, but we cover fundamentals. Focus is on application development with existing models.",
      },
    ],
    prerequisites: ["Python programming", "Basic API knowledge"],
    careerOpportunities: ["AI Developer", "GenAI Engineer", "ML Engineer"],
  },
  {
    id: "chatgpt-llms",
    slug: "chatgpt-llms-training-in-pune",
    title: "ChatGPT & LLMs",
    shortTitle: "ChatGPT/LLMs",
    category: "AI & GenAI",
    categorySlug: "generative-ai",
    description: "Deep dive into ChatGPT and large language models. Learn to build, fine-tune, and deploy LLM-powered applications.",
    shortDescription: "Master ChatGPT and large language models",
    duration: "2 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/llm.png",
    highlights: [
      "LLM fundamentals",
      "ChatGPT API",
      "Custom GPTs",
      "Fine-tuning",
      "Application development",
      "Enterprise use cases",
    ],
    modules: [
      {
        title: "Understanding LLMs",
        topics: ["What are LLMs", "GPT architecture", "Capabilities and limitations", "Model comparison", "Use cases"],
      },
      {
        title: "ChatGPT API",
        topics: ["API setup", "Chat completions", "Function calling", "Assistants API", "Best practices"],
      },
      {
        title: "Custom Solutions",
        topics: ["Custom GPTs", "Knowledge bases", "Fine-tuning basics", "Embedding models", "Semantic search"],
      },
    ],
    faqs: [
      {
        question: "What's the difference from GenAI course?",
        answer: "This course focuses specifically on ChatGPT and OpenAI ecosystem, while GenAI covers broader generative AI topics.",
      },
    ],
    prerequisites: ["Basic programming", "API concepts"],
    careerOpportunities: ["AI Developer", "LLM Specialist", "AI Product Manager"],
  },
  {
    id: "prompt-engineering",
    slug: "prompt-engineering-training-in-pune",
    title: "Prompt Engineering",
    shortTitle: "Prompt Eng.",
    category: "AI & GenAI",
    categorySlug: "generative-ai",
    description: "Master the art of prompt engineering. Learn techniques to get optimal results from AI models for various use cases.",
    shortDescription: "Effective prompting techniques for AI models",
    duration: "1 Month",
    level: "Beginner",
    mode: ["Online", "Offline"],
    image: "/images/courses/prompt.jpg",
    highlights: [
      "Prompt fundamentals",
      "Advanced techniques",
      "Domain-specific prompts",
      "Prompt templates",
      "Output optimization",
      "Tool integration",
    ],
    modules: [
      {
        title: "Prompt Basics",
        topics: ["What is prompt engineering", "Prompt structure", "Clear instructions", "Context setting", "Examples"],
      },
      {
        title: "Advanced Techniques",
        topics: ["Chain of thought", "Few-shot learning", "Role playing", "Iterative refinement", "Temperature control"],
      },
      {
        title: "Practical Applications",
        topics: ["Content creation", "Coding assistance", "Data analysis", "Research", "Automation"],
      },
    ],
    faqs: [
      {
        question: "Is this course for non-technical people?",
        answer: "Yes! Prompt engineering is accessible to everyone and valuable for any role working with AI tools.",
      },
    ],
    prerequisites: ["Basic familiarity with ChatGPT or similar tools"],
    careerOpportunities: ["Prompt Engineer", "AI Trainer", "Content Creator"],
  },
  {
    id: "ai-tools",
    slug: "ai-tools-training-in-pune",
    title: "AI Tools for Productivity",
    shortTitle: "AI Tools",
    category: "AI & GenAI",
    categorySlug: "generative-ai",
    description: "Learn to leverage AI tools for enhanced productivity. Master ChatGPT, Copilot, Midjourney, and other AI assistants.",
    shortDescription: "Boost productivity with AI tools and assistants",
    duration: "1 Month",
    level: "Beginner",
    mode: ["Online", "Offline"],
    image: "/images/courses/ai-tools.jpg",
    highlights: [
      "ChatGPT for work",
      "GitHub Copilot",
      "AI image tools",
      "AI writing assistants",
      "Automation with AI",
      "Best practices",
    ],
    modules: [
      {
        title: "Text AI Tools",
        topics: ["ChatGPT", "Claude", "Copilot", "Gemini", "Perplexity"],
      },
      {
        title: "Creative AI Tools",
        topics: ["Midjourney", "DALL-E", "Stable Diffusion", "Canva AI", "Adobe Firefly"],
      },
      {
        title: "Productivity Integration",
        topics: ["Writing and editing", "Research", "Code generation", "Meeting notes", "Automation"],
      },
    ],
    faqs: [
      {
        question: "Do I need technical skills?",
        answer: "No technical background required. This course is designed for anyone wanting to use AI tools effectively.",
      },
    ],
    prerequisites: ["Basic computer skills"],
    careerOpportunities: ["Enhanced productivity in any role"],
  },

  // Mobile App Development
  {
    id: "android",
    slug: "android-development-training-in-pune",
    title: "Android App Development",
    shortTitle: "Android",
    category: "Mobile App Development",
    categorySlug: "mobile-app-development",
    description: "Build native Android applications using Kotlin and Java. Master Android SDK, Material Design, and publish apps to Google Play Store.",
    shortDescription: "Native Android development with Kotlin and Java",
    duration: "4 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/android.jpg",
    isFeatured: true,
    highlights: [
      "Kotlin and Java for Android",
      "Android SDK and Android Studio",
      "Material Design UI/UX",
      "Room Database and SQLite",
      "REST API integration",
      "Google Play Store publishing",
    ],
    modules: [
      {
        title: "Android Fundamentals",
        topics: ["Android Studio setup", "Project structure", "Activities and Intents", "Layouts and Views", "Resources"],
      },
      {
        title: "Kotlin for Android",
        topics: ["Kotlin basics", "Null safety", "Coroutines", "Extensions", "Data classes"],
      },
      {
        title: "UI Development",
        topics: ["Material Design", "RecyclerView", "Fragments", "Navigation", "Custom views"],
      },
      {
        title: "Data & Networking",
        topics: ["Room Database", "SharedPreferences", "Retrofit", "JSON parsing", "Image loading"],
      },
      {
        title: "Advanced Topics",
        topics: ["MVVM architecture", "Dependency injection", "Testing", "Firebase integration", "App publishing"],
      },
    ],
    faqs: [
      {
        question: "Should I learn Java or Kotlin?",
        answer: "We cover both, but emphasize Kotlin as it's Google's preferred language for Android development.",
      },
    ],
    prerequisites: ["Basic programming knowledge", "OOP concepts"],
    careerOpportunities: ["Android Developer", "Mobile App Developer", "Software Engineer"],
  },
  {
    id: "flutter",
    slug: "flutter-development-training-in-pune",
    title: "Flutter App Development",
    shortTitle: "Flutter",
    category: "Mobile App Development",
    categorySlug: "mobile-app-development",
    description: "Build beautiful cross-platform mobile apps with Flutter and Dart. Create iOS and Android apps from a single codebase.",
    shortDescription: "Cross-platform mobile development with Flutter",
    duration: "3.5 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/flutter.jpg",
    isFeatured: true,
    isPopular: true,
    highlights: [
      "Dart programming language",
      "Flutter widgets and layouts",
      "State management (Provider, Bloc)",
      "Firebase integration",
      "REST API integration",
      "iOS and Android deployment",
    ],
    modules: [
      {
        title: "Dart Fundamentals",
        topics: ["Dart syntax", "OOP in Dart", "Async programming", "Collections", "Null safety"],
      },
      {
        title: "Flutter Basics",
        topics: ["Flutter setup", "Widgets", "Layouts", "Navigation", "Forms and validation"],
      },
      {
        title: "State Management",
        topics: ["setState", "Provider", "Bloc pattern", "GetX", "Riverpod basics"],
      },
      {
        title: "Data & Backend",
        topics: ["HTTP requests", "JSON handling", "Local storage", "Firebase Auth", "Firestore"],
      },
      {
        title: "Production Ready",
        topics: ["Testing", "Performance optimization", "Platform channels", "App Store deployment", "Play Store deployment"],
      },
    ],
    faqs: [
      {
        question: "Why choose Flutter over native?",
        answer: "Flutter offers faster development with single codebase for iOS and Android, with near-native performance.",
      },
    ],
    prerequisites: ["Basic programming knowledge", "OOP understanding"],
    careerOpportunities: ["Flutter Developer", "Mobile App Developer", "Cross-platform Developer"],
  },
  {
    id: "react-native",
    slug: "react-native-training-in-pune",
    title: "React Native Development",
    shortTitle: "React Native",
    category: "Mobile App Development",
    categorySlug: "mobile-app-development",
    description: "Build mobile apps using React Native and JavaScript. Leverage your web development skills for mobile app development.",
    shortDescription: "Mobile development with React Native and JavaScript",
    duration: "3 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/react-native.jpg",
    highlights: [
      "React Native fundamentals",
      "React Navigation",
      "State management with Redux",
      "Native modules",
      "REST API integration",
      "App Store deployment",
    ],
    modules: [
      {
        title: "React Native Basics",
        topics: ["Setup and tooling", "Components", "Styling", "Platform-specific code", "Debugging"],
      },
      {
        title: "Navigation & UI",
        topics: ["React Navigation", "Tab and stack navigation", "Gestures", "Animations", "Custom components"],
      },
      {
        title: "State & Data",
        topics: ["Redux setup", "Async actions", "API integration", "AsyncStorage", "SQLite"],
      },
      {
        title: "Advanced Topics",
        topics: ["Native modules", "Push notifications", "Maps integration", "Camera and media", "App publishing"],
      },
    ],
    faqs: [
      {
        question: "Do I need React.js experience?",
        answer: "React.js experience is highly beneficial. We cover React basics but recommend prior React knowledge.",
      },
    ],
    prerequisites: ["JavaScript proficiency", "React.js basics helpful"],
    careerOpportunities: ["React Native Developer", "Mobile Developer", "Full Stack Developer"],
  },
  {
    id: "ios-swift",
    slug: "ios-swift-training-in-pune",
    title: "iOS App Development",
    shortTitle: "iOS/Swift",
    category: "Mobile App Development",
    categorySlug: "mobile-app-development",
    description: "Build native iOS applications using Swift and SwiftUI. Master Apple's development ecosystem and publish to the App Store.",
    shortDescription: "Native iOS development with Swift and SwiftUI",
    duration: "4 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/ios-swift.jpg",
    highlights: [
      "Swift programming language",
      "SwiftUI and UIKit",
      "Core Data persistence",
      "Combine framework",
      "App Store guidelines",
      "TestFlight and deployment",
    ],
    modules: [
      {
        title: "Swift Fundamentals",
        topics: ["Swift syntax", "Optionals", "Collections", "Closures", "Error handling"],
      },
      {
        title: "iOS Development Basics",
        topics: ["Xcode IDE", "Interface Builder", "Auto Layout", "View controllers", "Navigation"],
      },
      {
        title: "SwiftUI",
        topics: ["SwiftUI basics", "State management", "Data binding", "Animations", "Custom views"],
      },
      {
        title: "Data & Networking",
        topics: ["Core Data", "URLSession", "Codable", "UserDefaults", "Keychain"],
      },
      {
        title: "Advanced & Publishing",
        topics: ["Combine framework", "Testing", "Performance", "App Store Connect", "Review guidelines"],
      },
    ],
    faqs: [
      {
        question: "Do I need a Mac?",
        answer: "Yes, iOS development requires a Mac with Xcode. We provide lab access for students without Mac.",
      },
    ],
    prerequisites: ["Programming fundamentals", "Mac computer (or lab access)"],
    careerOpportunities: ["iOS Developer", "Mobile App Developer", "Apple Platform Developer"],
  },

  // Database Technologies
  {
    id: "mysql",
    slug: "mysql-training-in-pune",
    title: "MySQL Database",
    shortTitle: "MySQL",
    category: "Database Technologies",
    categorySlug: "database-technologies",
    description: "Master MySQL database management. Learn SQL queries, database design, optimization and administration over a 2-month Pune batch, online or classroom.",
    shortDescription: "Complete MySQL database training",
    duration: "2 Months",
    level: "Beginner",
    mode: ["Online", "Offline"],
    image: "/images/courses/mysql.jpg",
    highlights: [
      "SQL fundamentals",
      "Database design and normalization",
      "Complex queries and joins",
      "Stored procedures and triggers",
      "Performance optimization",
      "Database administration",
    ],
    modules: [
      {
        title: "SQL Basics",
        topics: ["Introduction to databases", "SELECT statements", "Filtering and sorting", "Aggregate functions", "Grouping"],
      },
      {
        title: "Data Manipulation",
        topics: ["INSERT, UPDATE, DELETE", "Joins (INNER, LEFT, RIGHT)", "Subqueries", "UNION operations", "Transactions"],
      },
      {
        title: "Database Design",
        topics: ["ER diagrams", "Normalization", "Primary and foreign keys", "Indexes", "Data types"],
      },
      {
        title: "Advanced MySQL",
        topics: ["Stored procedures", "Functions", "Triggers", "Views", "User management"],
      },
    ],
    faqs: [
      {
        question: "Is MySQL still relevant?",
        answer: "MySQL is one of the most popular databases, widely used in web applications and enterprises.",
      },
    ],
    prerequisites: ["Basic computer knowledge"],
    careerOpportunities: ["Database Administrator", "Backend Developer", "Data Analyst"],
  },
  {
    id: "postgresql",
    slug: "postgresql-training-in-pune",
    title: "PostgreSQL Database",
    shortTitle: "PostgreSQL",
    category: "Database Technologies",
    categorySlug: "database-technologies",
    description: "Learn PostgreSQL, the advanced open-source database. Master complex queries, JSON support, and enterprise features.",
    shortDescription: "Advanced PostgreSQL database training",
    duration: "2 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/postgresql.jpg",
    highlights: [
      "PostgreSQL fundamentals",
      "Advanced SQL features",
      "JSON/JSONB support",
      "Full-text search",
      "Partitioning and sharding",
      "High availability setup",
    ],
    modules: [
      {
        title: "PostgreSQL Basics",
        topics: ["Installation and setup", "SQL in PostgreSQL", "Data types", "Constraints", "Indexes"],
      },
      {
        title: "Advanced Queries",
        topics: ["Window functions", "CTEs (WITH clause)", "Recursive queries", "Array operations", "JSON functions"],
      },
      {
        title: "Performance",
        topics: ["Query planning", "EXPLAIN ANALYZE", "Index optimization", "Partitioning", "Connection pooling"],
      },
      {
        title: "Administration",
        topics: ["Backup and recovery", "Replication", "Security", "Monitoring", "Maintenance"],
      },
    ],
    faqs: [
      {
        question: "PostgreSQL vs MySQL?",
        answer: "PostgreSQL offers more advanced features like JSON support, full-text search, and better standards compliance.",
      },
    ],
    prerequisites: ["Basic SQL knowledge"],
    careerOpportunities: ["Database Administrator", "Backend Developer", "Data Engineer"],
  },
  {
    id: "mongodb",
    slug: "mongodb-training-in-pune",
    title: "MongoDB Database",
    shortTitle: "MongoDB",
    category: "Database Technologies",
    categorySlug: "database-technologies",
    description: "Master MongoDB NoSQL database. Learn document modeling, aggregation pipelines, and building scalable applications.",
    shortDescription: "NoSQL database with MongoDB",
    duration: "2 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/mongodb.jpg",
    isPopular: true,
    highlights: [
      "Document database concepts",
      "CRUD operations",
      "Aggregation framework",
      "Indexing strategies",
      "Mongoose ODM",
      "MongoDB Atlas cloud",
    ],
    modules: [
      {
        title: "MongoDB Fundamentals",
        topics: ["NoSQL concepts", "Document model", "CRUD operations", "Query operators", "Projections"],
      },
      {
        title: "Data Modeling",
        topics: ["Embedding vs referencing", "Schema design patterns", "Data validation", "Relationships", "Denormalization"],
      },
      {
        title: "Aggregation",
        topics: ["Aggregation pipeline", "$match and $group", "$lookup joins", "$unwind", "Pipeline optimization"],
      },
      {
        title: "Operations",
        topics: ["Indexing", "Replication", "Sharding basics", "Backup", "MongoDB Atlas"],
      },
    ],
    faqs: [
      {
        question: "When to use MongoDB?",
        answer: "MongoDB excels with flexible schemas, rapid development, and applications with varied data structures.",
      },
    ],
    prerequisites: ["Basic programming", "JSON understanding"],
    careerOpportunities: ["MongoDB Developer", "Backend Developer", "Full Stack Developer"],
  },
  {
    id: "oracle",
    slug: "oracle-database-training-in-pune",
    title: "Oracle Database",
    shortTitle: "Oracle",
    category: "Database Technologies",
    categorySlug: "database-technologies",
    description: "Learn Oracle Database for enterprise applications. Master PL/SQL, database administration, and performance tuning.",
    shortDescription: "Enterprise database with Oracle",
    duration: "3 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/oracle.jpg",
    highlights: [
      "Oracle SQL",
      "PL/SQL programming",
      "Database administration",
      "Performance tuning",
      "Backup and recovery",
      "Oracle Cloud basics",
    ],
    modules: [
      {
        title: "Oracle SQL",
        topics: ["Oracle data types", "SQL queries", "Joins and subqueries", "Set operations", "Analytical functions"],
      },
      {
        title: "PL/SQL",
        topics: ["PL/SQL basics", "Procedures and functions", "Packages", "Triggers", "Exception handling"],
      },
      {
        title: "Administration",
        topics: ["Architecture overview", "User management", "Tablespaces", "Backup strategies", "RMAN"],
      },
      {
        title: "Performance",
        topics: ["Execution plans", "Index optimization", "Statistics", "AWR reports", "SQL tuning"],
      },
    ],
    faqs: [
      {
        question: "Is Oracle certification valuable?",
        answer: "Oracle certifications are highly valued in enterprise environments and can significantly boost career prospects.",
      },
    ],
    prerequisites: ["Basic SQL knowledge", "Database concepts"],
    careerOpportunities: ["Oracle DBA", "PL/SQL Developer", "Database Administrator"],
  },
  {
    id: "firebase",
    slug: "firebase-training-in-pune",
    title: "Firebase Development",
    shortTitle: "Firebase",
    category: "Database Technologies",
    categorySlug: "database-technologies",
    description: "Build applications with Firebase backend services. Learn Firestore, Authentication, Cloud Functions, and hosting.",
    shortDescription: "Backend-as-a-Service with Firebase",
    duration: "1.5 Months",
    level: "Beginner",
    mode: ["Online", "Offline"],
    image: "/images/courses/firebase.jpg",
    highlights: [
      "Firestore database",
      "Firebase Authentication",
      "Cloud Functions",
      "Firebase Hosting",
      "Real-time updates",
      "Firebase Analytics",
    ],
    modules: [
      {
        title: "Firebase Setup",
        topics: ["Firebase console", "Project setup", "SDK integration", "Security rules", "Emulator suite"],
      },
      {
        title: "Firestore",
        topics: ["Document model", "CRUD operations", "Queries", "Real-time listeners", "Offline support"],
      },
      {
        title: "Authentication",
        topics: ["Email/password auth", "Social login", "Phone authentication", "Custom tokens", "User management"],
      },
      {
        title: "Cloud Functions",
        topics: ["Function basics", "Triggers", "HTTP functions", "Callable functions", "Deployment"],
      },
    ],
    faqs: [
      {
        question: "Is Firebase free?",
        answer: "Firebase has a generous free tier. Paid plans are needed for higher usage and additional features.",
      },
    ],
    prerequisites: ["Basic programming", "JavaScript helpful"],
    careerOpportunities: ["Mobile Developer", "Full Stack Developer", "Firebase Developer"],
  },

  // Bootcamps — see /bootcamps pages for full detailed content
  {
    id: "codeleap-bootcamp",
    slug: "codeleap-bootcamp",
    title: "CodeLeap: Vacation Coding Bootcamp for HSC (12th) Passout",
    shortTitle: "CodeLeap",
    category: "Bootcamps",
    categorySlug: "bootcamps",
    description: "Specially designed coding bootcamp for 12th passout students. Learn Web Development, Python, or AI/Data Science basics in your 3-month gap before engineering college begins.",
    shortDescription: "Coding bootcamp for 12th passouts — 3 tracks",
    duration: "8 weeks / 2 months",
    level: "Beginner",
    mode: ["Online", "Offline"],
    image: "/images/courses/codeleap-bootcamp.jpg",
    isFeatured: true,
    isPopular: true,
    highlights: [
      "3 tracks: Web Dev, Python, AI/Data Science",
      "No prior coding experience required",
      "For 12th passouts waiting to join engineering",
      "English communication modules included",
      "Certificate on completion",
      "Industry trainers with 15+ years experience",
    ],
    modules: [
      {
        title: "Track A — Web Development Fundamentals",
        topics: ["HTML5 & CSS3", "JavaScript basics", "Responsive design", "Portfolio website project"],
      },
      {
        title: "Track B — Python Programming Fundamentals",
        topics: ["Python 3", "OOP concepts", "File handling", "Python application project"],
      },
      {
        title: "Track C — AI, Data Science & ML Introduction",
        topics: ["Python for data", "Pandas & NumPy", "Matplotlib & Seaborn", "Real-world dataset analysis"],
      },
      {
        title: "Common Modules",
        topics: ["English for Tech Communication", "Git & GitHub", "Career Orientation", "Problem-Solving & Logical Reasoning"],
      },
    ],
    faqs: [
      {
        question: "Do I need prior coding experience?",
        answer: "No. CodeLeap is built for absolute beginners. It starts from the very basics and builds steadily upward.",
      },
      {
        question: "Is online mode available?",
        answer: "Yes. CodeLeap is offered in both classroom mode at Kothrud, Pune, and online — so students from across Maharashtra can join.",
      },
    ],
    prerequisites: ["12th pass (any board)", "No prior coding required", "Interest in technology"],
    careerOpportunities: ["Web Developer", "Python Developer", "Data Analyst", "Software Engineer"],
  },
  {
    id: "careercode-bootcamp",
    slug: "careercode-bootcamp",
    title: "CareerCode: Semester-Wise Programming Training",
    shortTitle: "CareerCode",
    category: "Bootcamps",
    categorySlug: "bootcamps",
    description: "Flagship ongoing training program for engineering, BCA, and BSc CS students. Runs semester by semester alongside your college education with 6 specialisation tracks.",
    shortDescription: "Semester-by-semester training for engineering students",
    duration: "Ongoing (Semester-wise)",
    level: "Beginner",
    mode: ["Online", "Offline"],
    image: "/images/courses/careercode-bootcamp.jpg",
    highlights: [
      "6 specialisation tracks available",
      "Runs alongside your engineering degree",
      "1-2 technologies per semester",
      "Communication & aptitude training included",
      "Internship & placement preparation",
      "Weekend and evening batches",
    ],
    modules: [
      {
        title: "Frontend Developer Track",
        topics: ["HTML/CSS/JS", "React.js", "TypeScript & Tailwind", "Next.js & deployment"],
      },
      {
        title: "Backend Developer Track",
        topics: ["Python/Java", "REST APIs", "Databases", "Docker & cloud"],
      },
      {
        title: "Full Stack Developer Track",
        topics: ["Frontend + Backend combined", "Database design", "Cloud deployment", "Capstone project"],
      },
      {
        title: "Data Science / AI-ML / Database Tracks",
        topics: ["Python for data", "ML & deep learning", "Data visualisation", "Database administration"],
      },
      {
        title: "Career Development Modules",
        topics: ["Resume building", "LinkedIn optimisation", "Mock interviews", "Aptitude training"],
      },
    ],
    faqs: [
      {
        question: "Can I join from my first year?",
        answer: "Yes, and we highly recommend it. Students who start early have the greatest advantage — they build skills gradually and arrive at placement season fully prepared.",
      },
      {
        question: "How many hours per week does CareerCode require?",
        answer: "8 to 12 hours per week including classes, assignments, and projects. Designed to fit around your college schedule.",
      },
    ],
    prerequisites: ["Currently enrolled in engineering, BCA, or BSc CS", "Any year — first through final year"],
    careerOpportunities: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "ML Engineer", "Database Administrator"],
  },
  {
    id: "techready-bootcamp",
    slug: "techready-bootcamp",
    title: "TechReady: Placement-Assisted Intensive Program",
    shortTitle: "TechReady",
    category: "Bootcamps",
    categorySlug: "bootcamps",
    description: "Intensive, full-time, placement-assisted training program for engineering graduates. 10 specialised programs in Full Stack, Data Science, AI/ML — 6 hours daily, placement assistance.",
    shortDescription: "6-8 month placement-assisted programs for graduates",
    duration: "6 to 8 Months",
    level: "Beginner",
    mode: ["Online", "Offline"],
    image: "/images/courses/techready-bootcamp.jpg",
    highlights: [
      "10 specialised programs",
      "6 hours daily, full-time intensive",
      "placement assistance",
      "100+ company placement partners",
      "DSA, mock interviews, and resume prep",
      "Trainers with 15+ years experience",
    ],
    modules: [
      {
        title: "Full Stack Programs",
        topics: ["Java Full Stack", "Python Full Stack", "MERN Stack", "MEAN Stack", ".NET Full Stack"],
      },
      {
        title: "Data & AI Programs",
        topics: ["Data Analytics", "Data Science", "Data Engineering", "Machine Learning & AI"],
      },
      {
        title: "Frontend Program",
        topics: ["Advanced React", "React Native", "Angular", "Flutter"],
      },
      {
        title: "Career Preparation",
        topics: ["DSA practice", "System design", "Mock interviews", "Resume & LinkedIn optimisation", "Placement drives"],
      },
    ],
    faqs: [
      {
        question: "What makes TechReady different from regular coaching?",
        answer: "TechReady is a full-time, industry-intensive program — 6 hours per day, taught by 15+ year experienced professionals, with real projects, DSA prep, communication training, and direct hiring connections with 100+ companies.",
      },
      {
        question: "Is TechReady available for non-CS engineering branches?",
        answer: "Yes. Students from Mechanical, Civil, Electrical, and ENTC backgrounds regularly join TechReady to transition into software development.",
      },
    ],
    prerequisites: ["Final-year student or graduate (BE, BTech, BCA, BSc CS)", "Full-time availability (6 hours/day)"],
    careerOpportunities: ["Java Developer", "Python Developer", "MERN/MEAN Stack Developer", ".NET Developer", "Data Analyst", "Data Scientist", "ML Engineer", "Frontend Developer"],
  },
  // ── P4-10 additions (2026-06-04): Testing & QA + Salesforce tracks ───────
  {
    id: "selenium",
    slug: "selenium-training-in-pune",
    title: "Selenium with Java",
    shortTitle: "Selenium",
    category: "Testing & QA",
    categorySlug: "testing-qa",
    description: "Master Selenium WebDriver with Java for browser automation, TestNG for test orchestration, and the Page Object Model pattern. Build a production-grade automation framework integrated with Maven and Jenkins CI, ready for real Pune QA roles.",
    shortDescription: "Selenium 4 + Java + TestNG + POM with CI/CD integration",
    duration: "2 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/selenium.jpg",
    isPopular: true,
    highlights: [
      "Selenium 4 WebDriver with Java",
      "TestNG framework + parallel execution",
      "Page Object Model + Page Factory patterns",
      "Data-driven testing with Excel + Apache POI",
      "Maven build management + Jenkins CI integration",
      "BDD basics with Cucumber",
    ],
    modules: [
      {
        title: "Java for Testers",
        topics: ["Java basics for QA", "OOP fundamentals (classes, inheritance, polymorphism)", "Collections framework essentials", "Exception handling", "File I/O for test data"],
      },
      {
        title: "Selenium WebDriver Fundamentals",
        topics: ["Selenium architecture", "Browser drivers + WebDriverManager", "Locators (id, name, XPath, CSS)", "Element interactions + waits (implicit, explicit, fluent)", "Handling alerts, frames, windows, dropdowns"],
      },
      {
        title: "TestNG & Framework Design",
        topics: ["TestNG annotations + suites", "Parameterisation + DataProviders", "Parallel test execution", "Listeners, retries, reports (ExtentReports)", "Assertions (hard vs soft)"],
      },
      {
        title: "Advanced Selenium + CI/CD",
        topics: ["Page Object Model + Page Factory", "Data-driven testing with Excel/CSV", "Cross-browser + Selenium Grid basics", "Maven dependency management", "Jenkins integration + scheduled runs", "Cucumber BDD primer"],
      },
    ],
    faqs: [
      {
        question: "Do I need Java experience before joining?",
        answer: "No — the course starts with a focused 'Java for Testers' module covering exactly what you need for Selenium. Programming aptitude helps but full Java fluency is not a prerequisite.",
      },
      {
        question: "Selenium 3 vs Selenium 4 — what does this course cover?",
        answer: "Selenium 4 throughout. We cover the new W3C protocol, relative locators, improved WebDriver BiDi APIs, and the new TestNG-Selenium 4 integration patterns that Pune product companies expect.",
      },
      {
        question: "What career roles does this open up?",
        answer: "Automation Test Engineer (₹3.5–6 LPA fresher), QA Automation Lead (₹6–10 LPA), and SDET roles at Pune product companies and IT services majors. Combined with API testing (Postman/Rest Assured), it sets up the Test Architect track.",
      },
      {
        question: "What is the placement support like?",
        answer: "Same placement assistance as our other tracks — interview prep, profile building, mock interviews, and connections with 100+ Pune hiring partners actively looking for Selenium engineers (Persistent, Capgemini, Mindtree, mid-tier product companies).",
      },
    ],
    prerequisites: ["Basic programming aptitude (any language exposure helps)", "Logical thinking + attention to detail"],
    careerOpportunities: ["Automation Test Engineer", "QA Automation Engineer", "SDET (Software Development Engineer in Test)", "Test Automation Lead"],
    tools: ["Selenium WebDriver", "Java", "TestNG", "Maven", "Jenkins", "ExtentReports", "Cucumber", "Apache POI"],
    targetAudience: ["Manual QA testers moving to automation", "Graduates targeting QA roles", "Java developers pivoting to QA"],
  },
  {
    id: "software-testing",
    slug: "software-testing-training-in-pune",
    title: "Software Testing & QA",
    shortTitle: "Software Testing",
    category: "Testing & QA",
    categorySlug: "testing-qa",
    description: "Complete foundation in software testing — SDLC and STLC, test case design techniques, defect lifecycle with Jira, API testing with Postman, and ISTQB Foundation Level certification preparation. Industry-ready manual QA in 8–10 weeks.",
    shortDescription: "Manual testing, SDLC/STLC, Jira, Postman, ISTQB Foundation prep",
    duration: "2 Months",
    level: "Beginner",
    mode: ["Online", "Offline"],
    image: "/images/courses/software-testing.jpg",
    highlights: [
      "SDLC + STLC fundamentals",
      "Test case design (BVA, ECP, decision tables, state transition)",
      "Defect lifecycle + Jira workflows",
      "API testing with Postman",
      "Agile + Scrum for testers",
      "ISTQB Foundation Level certification preparation",
    ],
    modules: [
      {
        title: "Testing Fundamentals",
        topics: ["SDLC models (Waterfall, V-Model, Agile)", "STLC phases", "Levels of testing (unit, integration, system, UAT)", "Types of testing (functional, non-functional, smoke, sanity, regression)", "Testing principles + verification vs validation"],
      },
      {
        title: "Test Design Techniques",
        topics: ["Equivalence partitioning", "Boundary value analysis", "Decision table testing", "State transition testing", "Use case + exploratory testing", "Writing professional test cases + test scenarios"],
      },
      {
        title: "Manual Test Execution & Defect Management",
        topics: ["Test planning + test strategy", "Test execution workflows", "Defect lifecycle (new → assigned → fixed → verified → closed)", "Severity vs priority", "Jira: creating + tracking bugs, dashboards, JQL basics", "Test reporting + metrics"],
      },
      {
        title: "API Testing + ISTQB Prep",
        topics: ["REST API fundamentals", "Postman: collections, environments, scripts", "Response validation + status codes", "Agile testing + Scrum ceremonies for testers", "ISTQB Foundation syllabus walkthrough + 200+ practice questions"],
      },
    ],
    faqs: [
      {
        question: "Do I need a coding background?",
        answer: "No — manual testing is the standard entry point into QA careers and requires no coding. Logical thinking, attention to detail, and clear written communication matter more than coding. Many of our graduates from non-IT backgrounds (commerce, science, mechanical) get placed in QA roles.",
      },
      {
        question: "What is ISTQB and is the certification cost covered?",
        answer: "ISTQB (International Software Testing Qualifications Board) Foundation Level is the global QA entry-level certification — widely accepted by Pune IT services companies. The course preps you fully (200+ practice MCQs + mock exams); the certification exam itself is paid separately to ISTQB (~₹4,500) when you choose to sit for it.",
      },
      {
        question: "Can I move from manual testing to automation later?",
        answer: "Yes — and most testers do. Manual testing teaches you what to test and why, which is exactly what automation engineers need. Our recommended path: Manual QA → 6–12 months experience → Selenium track (see /courses/testing-qa/selenium-training-in-pune) → Automation/SDET role.",
      },
      {
        question: "What is the typical fresher salary?",
        answer: "Pune QA fresher salaries range ₹2.5–4 LPA at services companies and ₹3.5–5 LPA at product companies. With 1–2 years experience + ISTQB + basic API testing, this moves to ₹4–6 LPA. Source: AmbitionBox + Indeed Pune QA listings, last 12 months.",
      },
    ],
    prerequisites: ["Basic computer skills (browser, MS Office)", "Attention to detail + analytical thinking"],
    careerOpportunities: ["Manual QA Tester", "Quality Analyst", "Test Engineer (Entry-level)", "QA Associate"],
    tools: ["Jira", "Postman", "TestRail", "MS Excel", "Zephyr", "Bugzilla"],
    targetAudience: ["Non-IT graduates entering tech", "Fresh graduates", "Career changers from non-IT roles"],
  },
  {
    id: "salesforce",
    slug: "salesforce-training-in-pune",
    title: "Salesforce Admin + Developer",
    shortTitle: "Salesforce",
    category: "Salesforce",
    categorySlug: "salesforce",
    description: "Comprehensive Salesforce Admin + Developer track covering declarative configuration (Lightning, Flows, Validation Rules, Reports), Apex programming, SOQL/SOSL, Lightning Web Components, and integration patterns. Aligned with ADM 201 + Platform Developer I (PD1) certifications. Hands-on with a real Salesforce Developer Edition org.",
    shortDescription: "ADM 201 + Platform Developer I (PD1) certification track with org-based labs",
    duration: "3 Months",
    level: "All Levels",
    mode: ["Online", "Offline"],
    image: "/images/courses/salesforce.jpg",
    isPopular: true,
    highlights: [
      "Salesforce Lightning Experience deep-dive",
      "Object model + relationships + validation rules",
      "Apex programming (triggers, classes, batch, future)",
      "SOQL + SOSL query languages",
      "Lightning Web Components (LWC)",
      "Process Builder, Flows, Approval Processes",
      "ADM 201 + PD1 certification preparation",
      "Trailhead playground exercises throughout",
    ],
    modules: [
      {
        title: "Salesforce Platform Overview + Admin Essentials",
        topics: ["Salesforce ecosystem + cloud products", "Org setup + user management", "Standard objects (Account, Contact, Opportunity, Lead)", "Profiles, roles, permission sets", "Page layouts + record types"],
      },
      {
        title: "Data Modeling, Security & UI Configuration",
        topics: ["Custom objects + custom fields", "Object relationships (lookup, master-detail, many-to-many)", "Validation rules + formula fields", "Sharing rules + record-level security", "Lightning App Builder + Lightning pages", "Reports + dashboards"],
      },
      {
        title: "Apex Programming + SOQL",
        topics: ["Apex syntax + data types", "Triggers + trigger frameworks", "SOQL + SOSL queries", "Governor limits + bulk patterns", "Apex testing + code coverage requirements", "Asynchronous Apex (Batch, Queueable, Future)"],
      },
      {
        title: "Lightning Web Components + Integration + Certification Prep",
        topics: ["LWC fundamentals + decorators (@api, @track, @wire)", "LWC + Apex integration", "REST + SOAP API integrations", "Platform Events basics", "ADM 201 + PD1 mock exams + Trailhead Superbadges", "Resume + portfolio building"],
      },
    ],
    faqs: [
      {
        question: "Should I start with Admin or Developer track?",
        answer: "Both — this course covers both. The Pune Salesforce job market overwhelmingly hires for combined Admin + Developer profiles ('Salesforce Consultant'). Pure-Admin roles are rare; pure-Developer roles expect Admin literacy. We sequence Admin first (lower complexity) → Developer (deeper).",
      },
      {
        question: "Do I need programming experience?",
        answer: "Not for the Admin half. The Developer half (Apex, LWC) does involve programming but starts gently — Apex syntax is Java-like, and many of our Salesforce trainees come from non-CS backgrounds and pick it up. We allocate the first ~3 weeks of the Developer module specifically to programming foundations for non-coders.",
      },
      {
        question: "What about the certification cost?",
        answer: "ADM 201 + PD1 exam fees are paid separately to Salesforce (~₹16,500 / $200 each). The course preps you fully (Trailhead modules, mock exams, hands-on org work); you sit for the exams when you're ready. ~70-80% of our trainees clear at least ADM 201 within 3 months of course completion.",
      },
      {
        question: "What does the Pune Salesforce job market look like?",
        answer: "Pune has strong Salesforce demand at IT services majors (Cognizant, Accenture, TCS, Wipro, Capgemini) + boutique Salesforce partners (CloudFulcrum, Saksoft, Saviynt). Fresher salaries: ₹3.5–5 LPA. With 1+ year + 2 certifications: ₹5–8 LPA. Senior Salesforce Developers and Architects clear ₹15+ LPA. Source: AmbitionBox Pune + LinkedIn job aggregates 2026.",
      },
    ],
    prerequisites: ["Basic understanding of business processes", "Comfort with web applications", "No prior CRM or programming experience required for the Admin half"],
    careerOpportunities: ["Salesforce Administrator", "Salesforce Developer", "Salesforce Consultant", "Salesforce Business Analyst", "Salesforce Platform Engineer"],
    tools: ["Salesforce Lightning Experience", "Apex", "SOQL", "Lightning Web Components", "Salesforce CLI", "VS Code Salesforce Extensions", "Trailhead", "Postman (API testing)"],
    targetAudience: ["Career changers from non-IT", "Functional consultants moving into Salesforce", "Java developers pivoting to platform engineering"],
  },
  // ── P4-10 closer (2026-06-06): Agentic AI — the 5th and final priority
  // course from the original list (Selenium, SW Testing, Salesforce, GenAI,
  // Agentic AI). GenAI already existed as a category with multiple courses
  // (Prompt Engineering, ChatGPT & LLMs, AI Tools). Agentic AI is the 2026-
  // emerging vertical for engineers who want to build production agent
  // systems using LangChain / LangGraph / OpenAI Assistants / Claude tool
  // use — distinct enough from generic GenAI to warrant its own page.
  // Lives under the existing generative-ai category. ─────────────────────
  {
    id: "agentic-ai",
    slug: "agentic-ai-training-in-pune",
    title: "Agentic AI",
    shortTitle: "Agentic AI",
    category: "Generative AI",
    categorySlug: "generative-ai",
    description: "Build production-grade AI agents with LangChain, LangGraph, OpenAI Assistants API, and Claude tool use. Learn the ReAct pattern, multi-step planning, memory and state management, multi-agent orchestration, and observability + deployment for real-world agent systems. The fastest-growing GenAI specialisation in the Pune product-engineering market.",
    shortDescription: "LangChain + LangGraph + OpenAI Assistants + Claude tool use; ReAct, memory, multi-agent orchestration",
    duration: "2 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/agentic-ai.jpg",
    isPopular: true,
    isFeatured: true,
    highlights: [
      "LangChain + LangGraph fundamentals",
      "OpenAI Assistants API + Function Calling",
      "Claude tool use + Computer Use API",
      "ReAct pattern + planning + reflection loops",
      "Memory (short-term, long-term, episodic) + state management",
      "Multi-agent orchestration + supervisor patterns",
      "Production deployment: observability, evals, cost controls",
      "Capstone: a deployed multi-step agent",
    ],
    modules: [
      {
        title: "Foundations: LLMs as Reasoning Engines",
        topics: ["LLM API basics (OpenAI, Anthropic, Google)", "Tool / function calling fundamentals", "System prompts + behaviour shaping", "Structured outputs (JSON mode + schema constraints)", "Token economics + context-window strategy", "When an agent is the right tool vs a workflow"],
      },
      {
        title: "Agent Frameworks",
        topics: ["LangChain core (chains, runnables, expression language)", "LangGraph (stateful agent graphs)", "OpenAI Assistants API + Threads", "Claude tool use + Computer Use API", "Framework comparison: when to use which", "Building a single-agent ReAct loop from scratch"],
      },
      {
        title: "Multi-step Workflows + Memory",
        topics: ["ReAct + reflection patterns", "Plan-and-execute architectures", "Short-term vs long-term memory", "Vector stores for episodic memory (Pinecone, Weaviate, pgvector)", "Conversation summarisation + context pruning", "Error recovery + retry strategies"],
      },
      {
        title: "Multi-Agent Systems + Production",
        topics: ["Supervisor + worker patterns", "Agent-to-agent communication protocols", "Tool registries + permissions", "Observability with LangSmith / Helicone", "Evals: deterministic + LLM-as-judge", "Cost controls + caching strategies", "Deployment: FastAPI + serverless edge", "Capstone project: build, deploy, and evaluate a real multi-step agent"],
      },
    ],
    faqs: [
      {
        question: "What's the difference between an LLM and an AI agent?",
        answer: "An LLM is a single-call inference engine — give it a prompt, get a completion. An AI agent is an LLM in a loop: it can call tools (search the web, query a database, execute code), observe the results, and decide what to do next until a goal is achieved. This course teaches the second.",
      },
      {
        question: "Do I need to know Python or have ML background?",
        answer: "Python yes — the entire ecosystem (LangChain, LangGraph, OpenAI/Anthropic SDKs) is Python-first. Deep ML / model-training background is NOT required — agentic AI is about orchestrating existing models, not training them. If you can write Python and understand REST APIs, you can take this course. We dedicate week 1 to Python+LLM-API fundamentals for anyone who needs the refresher.",
      },
      {
        question: "Which frameworks does the course actually use?",
        answer: "LangChain + LangGraph as the primary teaching framework (largest ecosystem, most Pune job postings reference them). We also cover OpenAI Assistants API and Claude tool use directly without a wrapper — so you understand what abstractions exist and when to bypass them. Side coverage of LlamaIndex (RAG-heavy) and CrewAI (multi-agent specialist). No framework lock-in.",
      },
      {
        question: "What career roles does this prepare me for?",
        answer: "AI Engineer (₹8-15 LPA fresher to mid in Pune), Agentic AI Developer, GenAI Application Engineer, AI Solutions Engineer, and senior IC / Architect tracks at product companies building AI-native features. Pune product companies (Persistent, Avaamo, Helpshift, GUVI, BrowserStack's AI team) and IT services AI practices (TCS AI, Infosys Topaz, Wipro AI360, Capgemini AI CoE) are all hiring. Source: Naukri + LinkedIn Pune AI Engineer listings, last 90 days.",
      },
    ],
    prerequisites: ["Python (intermediate — comfortable with classes, async, REST APIs)", "Basic LLM exposure (have used ChatGPT or Claude as a user, ideally have called an LLM API once)", "Familiarity with Git and the command line"],
    careerOpportunities: ["AI Engineer", "Agentic AI Developer", "GenAI Application Engineer", "AI Solutions Engineer", "GenAI Architect (Sr.)"],
    tools: ["LangChain", "LangGraph", "OpenAI Assistants API", "Anthropic Claude API + tool use", "Pinecone / Weaviate / pgvector", "LangSmith / Helicone (observability)", "FastAPI", "Python 3.11+"],
    targetAudience: ["Python developers pivoting to GenAI", "Backend engineers wanting agentic skills", "Data scientists moving up the stack", "Generative AI track graduates wanting a deeper agent specialisation"],
  },
];

export function getCoursesByCategory(categorySlug: string): Course[] {
  return courses.filter((course) => course.categorySlug === categorySlug);
}

export function getCourse(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getFeaturedCourses(): Course[] {
  const priorityOrder = [
    "genai-training-in-pune",
    "java-full-stack-training-in-pune",
    "python-training-in-pune",
    "aws-training-in-pune",
    "codeleap-bootcamp",
  ];
  const featured = courses.filter((course) => course.isFeatured);

  return featured.sort((a, b) => {
    const aIndex = priorityOrder.indexOf(a.slug);
    const bIndex = priorityOrder.indexOf(b.slug);

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return 0;
  });
}

export function getPopularCourses(): Course[] {
  return courses.filter((course) => course.isPopular);
}

/**
 * Returns up to `limit` related courses for internal linking.
 * Prefers courses in the same category, then popular ones from any category.
 */
export function getRelatedCourses(currentSlug: string, limit = 4): Course[] {
  const current = getCourse(currentSlug);
  if (!current) return [];

  // Curated cross-category links first (crawl-equity routing), then the
  // default same-category siblings, then popular courses elsewhere.
  const curated = (current.relatedSlugs ?? [])
    .map((s) => getCourse(s))
    .filter((c): c is Course => !!c && c.slug !== currentSlug);
  const sameCategory = courses.filter(
    (c) => c.slug !== currentSlug && c.categorySlug === current.categorySlug
  );
  const popularElsewhere = courses.filter(
    (c) =>
      c.slug !== currentSlug &&
      c.categorySlug !== current.categorySlug &&
      c.isPopular
  );

  const seen = new Set<string>();
  return [...curated, ...sameCategory, ...popularElsewhere]
    .filter((c) => !seen.has(c.slug) && seen.add(c.slug))
    .slice(0, limit);
}

export function searchCourses(query: string): Course[] {
  const lowercaseQuery = query.toLowerCase();
  return courses.filter(
    (course) =>
      course.title.toLowerCase().includes(lowercaseQuery) ||
      course.description.toLowerCase().includes(lowercaseQuery) ||
      course.category.toLowerCase().includes(lowercaseQuery)
  );
}
