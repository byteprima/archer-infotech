export interface CourseModule {
  title: string;
  topics: string[];
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  categorySlug: string;
  description: string;
  shortDescription: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  mode: ("Online" | "Offline")[];
  image: string;
  highlights: string[];
  modules: CourseModule[];
  faqs: CourseFAQ[];
  prerequisites: string[];
  careerOpportunities: string[];
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
    icon: "Sparkles",
  },
];

export const courses: Course[] = [
  // Programming
  {
    id: "java",
    slug: "java",
    title: "Java Programming",
    shortTitle: "Java",
    category: "Programming",
    categorySlug: "programming",
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
        question: "Is Java still relevant in 2024?",
        answer: "Java remains one of the most in-demand programming languages, especially for enterprise applications, Android development, and large-scale systems.",
      },
    ],
    prerequisites: ["Basic computer knowledge", "Logical thinking ability"],
    careerOpportunities: ["Java Developer", "Backend Developer", "Software Engineer", "Android Developer"],
  },
  {
    id: "python",
    slug: "python",
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
    slug: "javascript",
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
    id: "c-cpp",
    slug: "c-cpp",
    title: "C/C++ Programming",
    shortTitle: "C/C++",
    category: "Programming",
    categorySlug: "programming",
    description: "Learn the foundation of programming with C and C++. Master memory management, pointers, OOP concepts, and build high-performance applications.",
    shortDescription: "Master C and C++ for system-level programming",
    duration: "3 Months",
    level: "Beginner",
    mode: ["Online", "Offline"],
    image: "/images/courses/cpp.jpg",
    highlights: [
      "C programming fundamentals",
      "Pointers and memory management",
      "Data structures in C",
      "C++ and object-oriented programming",
      "STL (Standard Template Library)",
      "File handling and streams",
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
        question: "Should I learn C before C++?",
        answer: "Our course covers both. C provides a strong foundation in programming fundamentals before moving to C++ and OOP concepts.",
      },
    ],
    prerequisites: ["Basic computer knowledge", "Logical thinking"],
    careerOpportunities: ["System Programmer", "Game Developer", "Embedded Systems Developer"],
  },
  {
    id: "dotnet-csharp",
    slug: "dotnet-csharp",
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

  // Full Stack Development
  {
    id: "java-fullstack",
    slug: "java-full-stack",
    title: "Java Full Stack Development",
    shortTitle: "Java Full Stack",
    category: "Full Stack Development",
    categorySlug: "full-stack-development",
    description: "Become a complete Java Full Stack Developer. Master Spring Boot, Hibernate, React/Angular, and build enterprise-grade web applications.",
    shortDescription: "Complete Java Full Stack with Spring Boot and React/Angular",
    duration: "6 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/java-fullstack.jpg",
    isFeatured: true,
    isPopular: true,
    highlights: [
      "Core Java and Advanced Java",
      "Spring Framework and Spring Boot",
      "Hibernate and JPA",
      "React.js or Angular (frontend)",
      "RESTful API development",
      "Microservices architecture",
      "Database design with MySQL/PostgreSQL",
      "Docker and deployment",
    ],
    modules: [
      {
        title: "Java Fundamentals",
        topics: ["Core Java concepts", "OOP principles", "Collections", "Multithreading", "Java 8+ features"],
      },
      {
        title: "Backend with Spring",
        topics: ["Spring Core", "Spring Boot", "Spring MVC", "Spring Data JPA", "Spring Security"],
      },
      {
        title: "Database & ORM",
        topics: ["SQL fundamentals", "MySQL/PostgreSQL", "Hibernate ORM", "JPA specifications", "Query optimization"],
      },
      {
        title: "Frontend Development",
        topics: ["HTML5/CSS3", "JavaScript/TypeScript", "React.js fundamentals", "State management", "API integration"],
      },
      {
        title: "Advanced Topics",
        topics: ["RESTful APIs", "Microservices", "JWT authentication", "Docker basics", "CI/CD introduction"],
      },
    ],
    faqs: [
      {
        question: "Do I need Java experience before joining?",
        answer: "Basic Java knowledge is helpful but not mandatory. We cover Java fundamentals before moving to advanced topics.",
      },
      {
        question: "Which frontend framework will be covered?",
        answer: "We primarily cover React.js, with an introduction to Angular concepts as well.",
      },
    ],
    prerequisites: ["Basic programming knowledge", "Understanding of web technologies"],
    careerOpportunities: ["Java Full Stack Developer", "Backend Developer", "Software Engineer", "Technical Lead"],
    certifications: ["Spring Professional Certification"],
  },
  {
    id: "mern-stack",
    slug: "mern-stack",
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
    slug: "python-full-stack",
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
    slug: "dotnet-full-stack",
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
    modules: [
      {
        title: "C# & .NET Core",
        topics: ["C# advanced features", ".NET Core overview", "Dependency injection", "Configuration", "Logging"],
      },
      {
        title: "ASP.NET Core",
        topics: ["MVC pattern", "Razor pages", "Web API", "Middleware", "Authentication"],
      },
      {
        title: "Database & EF Core",
        topics: ["SQL Server", "Entity Framework Core", "Migrations", "LINQ queries", "Performance"],
      },
      {
        title: "Frontend Development",
        topics: ["TypeScript", "Angular/React basics", "Component architecture", "Services", "HTTP client"],
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
    slug: "react",
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
    id: "nextjs",
    slug: "nextjs",
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
    slug: "typescript",
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
    slug: "nodejs",
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
    slug: "aws",
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
    slug: "azure",
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
    slug: "google-cloud",
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
    slug: "devops",
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
    slug: "kubernetes",
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
    slug: "docker",
    title: "Docker",
    shortTitle: "Docker",
    category: "Cloud & DevOps",
    categorySlug: "cloud-devops",
    description: "Learn Docker containerization from basics to advanced. Build, ship, and run applications in containers.",
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
    slug: "aws-solutions-architect",
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
    slug: "azure-administrator",
    title: "Azure Administrator",
    shortTitle: "Azure Admin",
    category: "Cloud Certifications",
    categorySlug: "cloud-certifications",
    description: "Prepare for the Azure Administrator Associate (AZ-104) certification. Master Azure infrastructure management.",
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
    slug: "gcp-associate-cloud-engineer",
    title: "GCP Associate Cloud Engineer",
    shortTitle: "GCP ACE",
    category: "Cloud Certifications",
    categorySlug: "cloud-certifications",
    description: "Prepare for the Google Cloud Associate Cloud Engineer certification. Master GCP services and operations.",
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
    slug: "machine-learning",
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
    slug: "data-science",
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
    slug: "data-analytics",
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
    slug: "data-engineering",
    title: "Data Engineering",
    shortTitle: "Data Engineering",
    category: "Data & AI",
    categorySlug: "data-ai",
    description: "Build data pipelines and infrastructure. Learn Spark, Kafka, Airflow, and modern data engineering practices.",
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
    slug: "generative-ai",
    title: "Generative AI",
    shortTitle: "Generative AI",
    category: "AI & GenAI",
    categorySlug: "generative-ai",
    description: "Master generative AI technologies including LLMs, image generation, and building AI-powered applications.",
    shortDescription: "Build applications with generative AI and LLMs",
    duration: "3 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/genai.jpg",
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
    slug: "chatgpt-llms",
    title: "ChatGPT & LLMs",
    shortTitle: "ChatGPT/LLMs",
    category: "AI & GenAI",
    categorySlug: "generative-ai",
    description: "Deep dive into ChatGPT and large language models. Learn to build, fine-tune, and deploy LLM-powered applications.",
    shortDescription: "Master ChatGPT and large language models",
    duration: "2 Months",
    level: "Intermediate",
    mode: ["Online", "Offline"],
    image: "/images/courses/llm.jpg",
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
    slug: "prompt-engineering",
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
    slug: "ai-tools",
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
  return courses.filter((course) => course.isFeatured);
}

export function getPopularCourses(): Course[] {
  return courses.filter((course) => course.isPopular);
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
