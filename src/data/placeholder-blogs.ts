// Placeholder blog posts for development/demo purposes
// These are used when DATABASE_URL is not configured

export interface PlaceholderBlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  category: string | null;
  tags: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  author: string | null;
  isPublished: boolean | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export const placeholderBlogs: PlaceholderBlogPost[] = [
  {
    id: 1,
    title: "Getting Started with Full Stack Development in 2025",
    slug: "getting-started-full-stack-development-2025",
    excerpt:
      "A comprehensive guide to beginning your journey as a full stack developer. Learn about the essential technologies, frameworks, and best practices.",
    content: `
## Introduction

Full stack development continues to be one of the most sought-after skills in the tech industry. In 2025, the landscape has evolved with new tools and frameworks, but the fundamentals remain crucial.

## What is Full Stack Development?

Full stack development refers to the practice of working on both the frontend (client-side) and backend (server-side) of web applications. A full stack developer is versatile and can handle everything from designing user interfaces to managing databases and server infrastructure.

## Essential Technologies to Learn

### Frontend Technologies
- **HTML5 & CSS3**: The building blocks of web development
- **JavaScript/TypeScript**: Essential for interactive web applications
- **React or Next.js**: Modern frameworks for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

### Backend Technologies
- **Node.js**: JavaScript runtime for server-side development
- **Python with Django/FastAPI**: Popular for data-driven applications
- **Java with Spring Boot**: Enterprise-grade development
- **Databases**: PostgreSQL, MongoDB, Redis

## Getting Started

1. **Master the fundamentals**: HTML, CSS, and JavaScript
2. **Build projects**: Apply what you learn through hands-on practice
3. **Learn a framework**: Pick React, Vue, or Angular for frontend
4. **Explore backend**: Node.js is a great starting point
5. **Understand databases**: Start with SQL basics

## Conclusion

The journey to becoming a full stack developer is challenging but rewarding. At Archer Infotech, we offer comprehensive courses that cover all these technologies with hands-on training and placement assistance.
    `.trim(),
    featuredImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop",
    category: "Career Guide",
    tags: "full stack, web development, career, programming",
    metaTitle: "Getting Started with Full Stack Development in 2025 | Archer Infotech",
    metaDescription:
      "Learn how to start your full stack development journey in 2025. Comprehensive guide covering essential technologies, frameworks, and career tips.",
    author: "Archer Infotech",
    isPublished: true,
    publishedAt: new Date("2025-03-15"),
    createdAt: new Date("2025-03-15"),
    updatedAt: new Date("2025-03-15"),
  },
  {
    id: 2,
    title: "Top 10 Programming Languages to Learn in 2025",
    slug: "top-10-programming-languages-2025",
    excerpt:
      "Discover which programming languages are in highest demand and will give you the best career opportunities in 2025.",
    content: `
## The Programming Landscape in 2025

Choosing the right programming language can significantly impact your career trajectory. Here's our analysis of the top languages to learn this year.

## 1. Python
Python continues to dominate due to its versatility in AI/ML, data science, web development, and automation. Its readable syntax makes it perfect for beginners.

**Use cases**: Data Science, Machine Learning, Web Development, Automation

## 2. JavaScript/TypeScript
The backbone of web development. TypeScript adds type safety and is increasingly adopted in enterprise applications.

**Use cases**: Web Development, Mobile Apps, Backend Services

## 3. Java
Still the go-to for enterprise applications, Android development, and large-scale systems.

**Use cases**: Enterprise Software, Android Apps, Backend Systems

## 4. Go (Golang)
Known for its simplicity and excellent performance in concurrent programming. Popular for cloud-native applications.

**Use cases**: Cloud Infrastructure, Microservices, DevOps Tools

## 5. Rust
Gaining popularity for systems programming where performance and safety are critical.

**Use cases**: Systems Programming, WebAssembly, Game Development

## 6. SQL
Data is everywhere, and SQL remains essential for anyone working with databases.

**Use cases**: Data Analysis, Backend Development, Business Intelligence

## 7. Kotlin
The preferred language for Android development, with growing adoption in backend services.

**Use cases**: Android Development, Backend Services

## 8. Swift
Essential for iOS and macOS development with Apple's ecosystem.

**Use cases**: iOS Apps, macOS Applications

## 9. C#
Dominant in game development (Unity) and enterprise Windows applications.

**Use cases**: Game Development, Enterprise Software, Unity

## 10. PHP
Still powers a significant portion of the web, including WordPress and Laravel applications.

**Use cases**: Web Development, CMS, E-commerce

## Conclusion

The best language to learn depends on your career goals. At Archer Infotech, we offer courses in Python, Java, JavaScript, and more with industry-relevant curriculum.
    `.trim(),
    featuredImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=630&fit=crop",
    category: "Programming",
    tags: "programming languages, python, java, javascript, career",
    metaTitle: "Top 10 Programming Languages to Learn in 2025",
    metaDescription:
      "Discover the most in-demand programming languages in 2025. From Python to Rust, find the right language for your career goals.",
    author: "Archer Infotech",
    isPublished: true,
    publishedAt: new Date("2025-03-10"),
    createdAt: new Date("2025-03-10"),
    updatedAt: new Date("2025-03-10"),
  },
  {
    id: 3,
    title: "DevOps & Cloud Computing: A Complete Career Roadmap",
    slug: "devops-cloud-computing-career-roadmap",
    excerpt:
      "Everything you need to know about building a career in DevOps and Cloud Computing. From basics to advanced concepts.",
    content: `
## What is DevOps?

DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). It aims to shorten the development lifecycle and provide continuous delivery with high software quality.

## Why DevOps is in High Demand

- Companies are moving to cloud-native architectures
- Need for faster release cycles
- Automation of infrastructure and deployments
- Growing adoption of microservices

## Essential DevOps Skills

### 1. Linux Administration
Understanding Linux is fundamental. Most servers run on Linux, and command-line proficiency is essential.

### 2. Version Control (Git)
Git is the industry standard for version control. Learn branching, merging, and collaboration workflows.

### 3. CI/CD Pipelines
- Jenkins, GitHub Actions, GitLab CI
- Automated testing and deployment
- Blue-green deployments

### 4. Containerization
- Docker for container creation and management
- Container orchestration concepts

### 5. Kubernetes
The de facto standard for container orchestration. Essential for managing containerized applications at scale.

### 6. Cloud Platforms
- **AWS**: The market leader with extensive services
- **Azure**: Strong in enterprise environments
- **GCP**: Excellent for data and ML workloads

### 7. Infrastructure as Code
- Terraform for multi-cloud infrastructure
- Ansible for configuration management
- CloudFormation for AWS-specific deployments

### 8. Monitoring & Logging
- Prometheus and Grafana for monitoring
- ELK Stack for logging
- Cloud-native monitoring solutions

## Career Path

1. **Junior DevOps Engineer**: Focus on automation basics, CI/CD
2. **DevOps Engineer**: Handle complex deployments, cloud infrastructure
3. **Senior DevOps Engineer**: Architecture decisions, team leadership
4. **DevOps Architect**: Enterprise-wide DevOps strategy

## Salary Expectations in Pune

- Entry Level: ₹4-6 LPA
- Mid Level: ₹8-15 LPA
- Senior Level: ₹18-30+ LPA

## Get Started with Archer Infotech

Our DevOps and Cloud Computing course covers all these topics with hands-on labs on real cloud platforms. Join us to kickstart your DevOps career!
    `.trim(),
    featuredImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=630&fit=crop",
    category: "DevOps",
    tags: "devops, cloud computing, aws, kubernetes, docker, career",
    metaTitle: "DevOps & Cloud Computing Career Roadmap 2025 | Archer Infotech",
    metaDescription:
      "Complete guide to building a career in DevOps and Cloud Computing. Learn about essential skills, tools, certifications, and salary expectations.",
    author: "Archer Infotech",
    isPublished: true,
    publishedAt: new Date("2025-03-05"),
    createdAt: new Date("2025-03-05"),
    updatedAt: new Date("2025-03-05"),
  },
  {
    id: 4,
    title: "Why Python is the Best First Programming Language",
    slug: "python-best-first-programming-language",
    excerpt:
      "Discover why Python is recommended as the ideal starting point for aspiring programmers and how it opens doors to multiple career paths.",
    content: `
## Introduction

If you're new to programming and wondering where to start, Python is overwhelmingly recommended by educators, industry professionals, and experienced developers. Here's why.

## Simple and Readable Syntax

Python's syntax is designed to be intuitive and similar to English. Compare:

**Python:**
\`\`\`python
if age >= 18:
    print("You are an adult")
\`\`\`

**Java:**
\`\`\`java
if (age >= 18) {
    System.out.println("You are an adult");
}
\`\`\`

Python reduces the cognitive overhead, letting you focus on learning programming concepts rather than syntax rules.

## Versatile Career Paths

Python opens doors to multiple career paths:

### Data Science & Analytics
- Pandas for data manipulation
- NumPy for numerical computing
- Matplotlib and Seaborn for visualization

### Machine Learning & AI
- TensorFlow and PyTorch for deep learning
- Scikit-learn for traditional ML
- Natural Language Processing with NLTK

### Web Development
- Django for full-featured web apps
- Flask for lightweight applications
- FastAPI for high-performance APIs

### Automation & Scripting
- Automate repetitive tasks
- Web scraping with BeautifulSoup
- File and system operations

## Strong Community and Resources

Python has one of the largest and most supportive programming communities:
- Extensive documentation
- Thousands of tutorials and courses
- Active Stack Overflow community
- Regular meetups and conferences

## In-Demand in the Job Market

Python developers are highly sought after in Pune's IT industry. Job roles include:
- Python Developer
- Data Analyst
- Data Scientist
- Backend Developer
- Automation Engineer

## Getting Started

1. Install Python from python.org
2. Use an IDE like VS Code or PyCharm
3. Start with basic syntax and data types
4. Build small projects to practice
5. Explore libraries based on your interests

## Learn Python at Archer Infotech

Our Python programming course takes you from zero to job-ready with:
- Fundamentals to advanced concepts
- Hands-on projects
- Industry-relevant curriculum
- Placement assistance

Start your programming journey with us today!
    `.trim(),
    featuredImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1200&h=630&fit=crop",
    category: "Programming",
    tags: "python, programming, beginners, career, data science",
    metaTitle: "Why Python is the Best First Programming Language | Archer Infotech",
    metaDescription:
      "Learn why Python is the ideal first programming language. Discover its simple syntax, versatile applications, and career opportunities.",
    author: "Archer Infotech",
    isPublished: true,
    publishedAt: new Date("2025-02-28"),
    createdAt: new Date("2025-02-28"),
    updatedAt: new Date("2025-02-28"),
  },
  {
    id: 5,
    title: "How to Prepare for Technical Interviews: A Complete Guide",
    slug: "prepare-technical-interviews-guide",
    excerpt:
      "Master the art of technical interviews with this comprehensive guide covering DSA, system design, and behavioral questions.",
    content: `
## Introduction

Technical interviews can be intimidating, but with the right preparation strategy, you can significantly improve your chances of success. This guide covers everything you need to know.

## Understanding the Interview Process

Most tech companies follow a similar pattern:
1. **Phone/Online Screening**: Basic coding problems
2. **Technical Rounds**: DSA, problem-solving
3. **System Design** (for experienced roles): Architecture discussions
4. **Behavioral Round**: Cultural fit, soft skills

## Data Structures & Algorithms (DSA)

### Essential Data Structures
- Arrays and Strings
- Linked Lists
- Stacks and Queues
- Trees (Binary, BST, Heaps)
- Graphs
- Hash Tables

### Key Algorithms
- Sorting (Quick, Merge, Heap)
- Searching (Binary Search, BFS, DFS)
- Dynamic Programming
- Greedy Algorithms
- Two Pointers, Sliding Window

### Practice Strategy
1. Start with easy problems on LeetCode/HackerRank
2. Gradually increase difficulty
3. Focus on understanding patterns
4. Practice explaining your thought process
5. Time yourself to simulate real interviews

## System Design (For Experienced Candidates)

### Topics to Cover
- Load balancing
- Caching strategies
- Database design (SQL vs NoSQL)
- Microservices architecture
- Message queues
- CDN and content delivery

### Common Questions
- Design URL shortener
- Design Twitter/Instagram feed
- Design a chat application
- Design an e-commerce platform

## Behavioral Interviews

### The STAR Method
- **Situation**: Set the context
- **Task**: Describe your responsibility
- **Action**: Explain what you did
- **Result**: Share the outcome

### Common Questions
- Tell me about a challenging project
- How do you handle disagreements?
- Describe a time you failed and what you learned
- Why do you want to work here?

## Interview Day Tips

1. **Test your setup** for virtual interviews
2. **Think aloud** during coding problems
3. **Ask clarifying questions** before diving in
4. **Start with brute force**, then optimize
5. **Test your code** with edge cases
6. **Be honest** if you don't know something

## Resources

### For DSA
- LeetCode (75 and 150 problem sets)
- NeetCode for video explanations
- Cracking the Coding Interview book

### For System Design
- System Design Primer (GitHub)
- Designing Data-Intensive Applications book
- YouTube channels (Gaurav Sen, Tech Dummies)

## How Archer Infotech Helps

Our courses include:
- DSA modules with practice problems
- Mock interview sessions
- Resume building workshops
- Direct placement assistance with partner companies

Prepare confidently with our expert guidance!
    `.trim(),
    featuredImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=630&fit=crop",
    category: "Career Guide",
    tags: "interviews, dsa, system design, career, placement",
    metaTitle: "How to Prepare for Technical Interviews | Archer Infotech",
    metaDescription:
      "Complete guide to cracking technical interviews. Learn DSA preparation, system design, behavioral questions, and interview tips.",
    author: "Archer Infotech",
    isPublished: true,
    publishedAt: new Date("2025-02-20"),
    createdAt: new Date("2025-02-20"),
    updatedAt: new Date("2025-02-20"),
  },
  {
    id: 6,
    title: "Understanding Database Management: SQL vs NoSQL",
    slug: "database-management-sql-vs-nosql",
    excerpt:
      "A detailed comparison of SQL and NoSQL databases. Learn when to use each and how to make the right choice for your projects.",
    content: `
## Introduction

Choosing the right database is crucial for any application. This guide will help you understand the differences between SQL and NoSQL databases.

## What is SQL?

SQL (Structured Query Language) databases are relational databases that store data in tables with predefined schemas.

### Popular SQL Databases
- **PostgreSQL**: Feature-rich, open source
- **MySQL**: Widely used, great community
- **Microsoft SQL Server**: Enterprise solutions
- **Oracle**: Large-scale enterprise systems

### Characteristics
- Structured data with fixed schema
- ACID compliance (Atomicity, Consistency, Isolation, Durability)
- Complex queries with JOINs
- Vertical scaling

## What is NoSQL?

NoSQL databases are non-relational databases designed for specific data models with flexible schemas.

### Types of NoSQL Databases

**Document Stores**
- MongoDB, CouchDB
- Store data as JSON-like documents
- Good for content management, catalogs

**Key-Value Stores**
- Redis, DynamoDB
- Simple key-value pairs
- Excellent for caching, sessions

**Column-Family Stores**
- Cassandra, HBase
- Organized by columns
- Good for time-series, analytics

**Graph Databases**
- Neo4j, Amazon Neptune
- Store relationships as first-class citizens
- Perfect for social networks, recommendations

## When to Use SQL

✅ Complex queries and reporting
✅ Transactions are critical (banking, e-commerce)
✅ Data integrity is paramount
✅ Well-defined schema
✅ Relationships between entities

## When to Use NoSQL

✅ Rapid development with changing requirements
✅ Large volumes of unstructured data
✅ Horizontal scaling needs
✅ Real-time big data applications
✅ Content management systems

## Comparison Table

| Aspect | SQL | NoSQL |
|--------|-----|-------|
| Schema | Fixed | Flexible |
| Scaling | Vertical | Horizontal |
| Transactions | ACID | BASE (eventually consistent) |
| Query Language | SQL | Varies |
| Best For | Complex queries | Large-scale data |

## Practical Example

**E-commerce Application:**
- User accounts, orders: SQL (PostgreSQL)
- Product catalog: Document store (MongoDB)
- Session management: Key-value (Redis)
- Recommendations: Graph database (Neo4j)

## Learn More at Archer Infotech

Our Full Stack and Backend courses cover:
- SQL fundamentals and advanced queries
- PostgreSQL and MySQL in-depth
- MongoDB for document storage
- Redis for caching
- Database design best practices

Build robust applications with proper database knowledge!
    `.trim(),
    featuredImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&h=630&fit=crop",
    category: "Programming",
    tags: "database, sql, nosql, mongodb, postgresql, backend",
    metaTitle: "SQL vs NoSQL: Complete Database Guide | Archer Infotech",
    metaDescription:
      "Understand the differences between SQL and NoSQL databases. Learn when to use each type and make informed decisions for your projects.",
    author: "Archer Infotech",
    isPublished: true,
    publishedAt: new Date("2025-02-15"),
    createdAt: new Date("2025-02-15"),
    updatedAt: new Date("2025-02-15"),
  },
];

// Helper functions
export function getPlaceholderCategories(): string[] {
  const categories = new Set<string>();
  placeholderBlogs.forEach((post) => {
    if (post.category) categories.add(post.category);
  });
  return Array.from(categories);
}

export function getPlaceholderPostBySlug(slug: string): PlaceholderBlogPost | undefined {
  return placeholderBlogs.find((post) => post.slug === slug && post.isPublished);
}

export function getPlaceholderRecentPosts(limit: number = 5, excludeSlug?: string) {
  return placeholderBlogs
    .filter((post) => post.isPublished && post.slug !== excludeSlug)
    .sort((a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0))
    .slice(0, limit);
}
