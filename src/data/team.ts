export interface TeamMember {
  /** Stable URL slug — used at /trainers/{id} */
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  expertise: string[];
  experience: string;
  linkedin?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "yogesh-patil",
    name: "Yogesh Patil",
    role: "Founder & Director",
    bio: "With over 15 years of experience in the IT industry, Yogesh founded Archer Infotech with a vision to bridge the gap between academic learning and industry requirements. His expertise spans Java, C / C++ systems programming, enterprise architecture, and AWS / Azure cloud platforms. Yogesh personally leads the flagship Java, Java Full Stack, and Cloud certification tracks.",
    expertise: [
      "Java",
      "C",
      "C++",
      "Cloud Architecture",
      "AWS",
      "Azure",
      "Spring Boot",
      "DevOps Strategy",
      "Enterprise Solutions",
      "Training & Development",
    ],
    experience: "15+ years",
    image: "/images/team/yogesh-patil.jpg",
    linkedin: "https://www.linkedin.com/in/yogesh-patil-76328839/",
  },
  {
    id: "amol-patil",
    name: "Amol Patil",
    role: "Senior Corporate Trainer",
    bio: "Senior Corporate Trainer with over 10 years of demonstrated history in the IT training industry in Pune. Amol leads the Python, Full Stack, Data Science, AI/ML, and DevOps tracks at Archer Infotech, training thousands of students and enterprise teams. Hands-on with modern stacks — MERN, Django, Kubernetes, Docker — and active in placement preparation.",
    expertise: [
      "Java Full Stack",
      "Python",
      "Python Full Stack",
      "MERN Stack",
      "Node.js",
      "AI/ML",
      "Generative AI",
      "Data Science",
      "Data Analytics",
      "Data Engineering",
      "DevOps",
      "Kubernetes",
      "Docker",
      "MongoDB",
      "Firebase",
    ],
    experience: "10+ years",
    image: "/images/team/amol-patil.jpg",
    linkedin: "https://www.linkedin.com/in/amol-patil-228b9a79/",
  },
  {
    id: "amol-chougule",
    name: "Amol Chougule",
    role: "Technical Trainer — Modern Web & Mobile",
    bio: "Software developer with hands-on experience at Mindstix Software Labs. Brings real-world project experience into training sessions and helps students understand industry best practices across modern web frameworks and cross-platform mobile development.",
    expertise: [
      "Java",
      "JavaScript",
      "TypeScript",
      "React",
      "Angular",
      "Next.js",
      "Node.js",
      "HTML5/CSS",
      "Android",
      "Flutter",
      "React Native",
      "iOS / Swift",
      "Firebase",
      "Git",
      "Linux",
    ],
    experience: "5+ years",
    image: "/images/team/amol-chougule.jpg",
    linkedin: "https://www.linkedin.com/in/amol-chougule-201192175/",
  },
  {
    id: "ankita-hartale",
    name: "Ankita Hartale",
    role: "Java Full Stack & Database Trainer",
    bio: "Java Full Stack Developer currently working at Wipro as Project Engineer. Former Associate Trainer at Archer Infotech with nearly 3 years of training experience. Expert in Spring Framework, enterprise Java development, and relational + NoSQL databases.",
    expertise: [
      "Java",
      "Spring Framework",
      "Spring Boot",
      "Hibernate",
      "DBMS",
      "MySQL",
      "PostgreSQL",
      "Oracle Database",
      "MongoDB",
      "Full Stack Development",
    ],
    experience: "5+ years",
    image: "/images/team/ankita-hartale.jpg",
    linkedin: "https://www.linkedin.com/in/ankita-hartale-18a521228/",
  },
  {
    id: "suraj-kudache",
    name: "Suraj Kudache",
    role: ".NET Full Stack Trainer",
    bio: "Full Stack Developer currently working as Consultant at Capgemini. Former Senior Software Developer at Archer Infotech with over 2.5 years of training experience. Specialises in the .NET ecosystem and modern web technologies.",
    expertise: [".NET MVC", ".NET Core", "C#", "REST API", "Bootstrap", "SQL Server"],
    experience: "7+ years",
    image: "/images/team/suraj-kudache.jpg",
    linkedin: "https://www.linkedin.com/in/suraj-kudache-001a3aa5/",
  },
  {
    id: "vinod-patil",
    name: "Vinod Patil",
    role: "Solutions Architect & AI Trainer",
    bio: "Solutions Architect with 12 years of experience in enterprise applications and emerging technologies. Specialises in Generative AI, LLMs, and AI-powered solutions. Leads the Generative AI and Cloud Certification tracks at Archer Infotech.",
    expertise: [
      "Generative AI",
      "LLMs & ChatGPT",
      "Prompt Engineering",
      "AI Tools",
      "Solution Architecture",
      "AI/ML",
      "AWS",
      "Azure",
      "Google Cloud",
    ],
    experience: "12 years",
    image: "/images/team/vinod-patil.jpg",
    linkedin: "https://www.linkedin.com/in/vinod-patil/",
  },
];

/**
 * Course → Trainer mapping.
 *
 * Keys are course slugs as defined in `src/data/courses.ts`. Values are trainer
 * IDs from `teamMembers` above, with the LEAD trainer listed first (used when
 * a single "taught by" line is rendered).
 *
 * Major / flagship subjects are anchored on Yogesh Patil (founder) and Amol
 * Patil (senior trainer); specialised subjects route to the trainer carrying
 * the matching expertise. Trainer expertise arrays were extended to cover
 * gaps so every course has at least one credible owner.
 */
export const courseTrainerMap: Record<string, string[]> = {
  // Programming
  "java-training-in-pune": ["yogesh-patil", "amol-patil"],
  "python-training-in-pune": ["amol-patil"],
  "javascript-training-in-pune": ["amol-chougule", "amol-patil"],
  "c-training-in-pune": ["yogesh-patil", "amol-chougule"],
  "cpp-training-in-pune": ["yogesh-patil", "amol-chougule"],
  "dotnet-csharp-training-in-pune": ["suraj-kudache"],
  "spring-boot-microservices-training-in-pune": ["ankita-hartale", "yogesh-patil"],

  // Full Stack Development
  "java-full-stack-training-in-pune": ["amol-patil", "yogesh-patil", "ankita-hartale"],
  "mern-stack-training-in-pune": ["amol-patil", "amol-chougule"],
  "python-full-stack-training-in-pune": ["amol-patil"],
  "dotnet-full-stack-training-in-pune": ["suraj-kudache"],

  // Modern Web
  "react-training-in-pune": ["amol-chougule", "amol-patil"],
  "angular-training-in-pune": ["amol-chougule"],
  "nextjs-training-in-pune": ["amol-chougule"],
  "typescript-training-in-pune": ["amol-chougule"],
  "nodejs-training-in-pune": ["amol-patil", "amol-chougule"],

  // Cloud & DevOps
  "aws-training-in-pune": ["yogesh-patil", "vinod-patil"],
  "azure-training-in-pune": ["yogesh-patil", "vinod-patil"],
  "google-cloud-training-in-pune": ["vinod-patil", "yogesh-patil"],
  "devops-training-in-pune": ["amol-patil", "yogesh-patil"],
  "kubernetes-training-in-pune": ["amol-patil"],
  "docker-training-in-pune": ["amol-patil"],

  // Cloud Certifications
  "aws-solutions-architect-training-in-pune": ["yogesh-patil", "vinod-patil"],
  "azure-administrator-training-in-pune": ["yogesh-patil", "vinod-patil"],
  "gcp-associate-cloud-engineer-training-in-pune": ["vinod-patil", "yogesh-patil"],

  // Data & AI
  "machine-learning-training-in-pune": ["amol-patil", "vinod-patil"],
  "data-science-training-in-pune": ["amol-patil", "vinod-patil"],
  "data-analytics-training-in-pune": ["amol-patil"],
  "data-engineering-training-in-pune": ["amol-patil"],

  // Generative AI
  "genai-training-in-pune": ["vinod-patil", "amol-patil"],
  "chatgpt-llms-training-in-pune": ["vinod-patil"],
  "prompt-engineering-training-in-pune": ["vinod-patil", "amol-patil"],
  "ai-tools-training-in-pune": ["vinod-patil", "amol-patil"],

  // Mobile App Development
  "android-development-training-in-pune": ["amol-chougule", "ankita-hartale"],
  "flutter-development-training-in-pune": ["amol-chougule"],
  "react-native-training-in-pune": ["amol-chougule", "amol-patil"],
  "ios-swift-training-in-pune": ["amol-chougule"],

  // Database Technologies
  "mysql-training-in-pune": ["ankita-hartale", "suraj-kudache"],
  "postgresql-training-in-pune": ["ankita-hartale"],
  "mongodb-training-in-pune": ["amol-patil", "ankita-hartale"],
  "oracle-database-training-in-pune": ["ankita-hartale"],
  "firebase-training-in-pune": ["amol-patil", "amol-chougule"],

  // Bootcamps
  "codeleap-bootcamp": ["yogesh-patil", "amol-patil", "vinod-patil"],
  "careercode-bootcamp": ["yogesh-patil", "amol-patil"],
  "techready-bootcamp": ["yogesh-patil", "amol-patil", "ankita-hartale", "vinod-patil"],
};

export function getTeamMembers(): TeamMember[] {
  return teamMembers;
}

export function getTrainer(id: string): TeamMember | undefined {
  return teamMembers.find((m) => m.id === id);
}

/** Returns trainers (lead first) for a given course slug. */
export function getTrainersForCourse(courseSlug: string): TeamMember[] {
  const ids = courseTrainerMap[courseSlug] ?? [];
  return ids
    .map((id) => getTrainer(id))
    .filter((t): t is TeamMember => t !== undefined);
}

/** Returns course slugs that a given trainer teaches. */
export function getCourseSlugsForTrainer(trainerId: string): string[] {
  return Object.entries(courseTrainerMap)
    .filter(([, ids]) => ids.includes(trainerId))
    .map(([slug]) => slug);
}
