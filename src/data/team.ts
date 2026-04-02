export interface TeamMember {
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
    id: "founder",
    name: "Yogesh Patil",
    role: "Founder & Director",
    bio: "With over 15 years of experience in the IT industry, Yogesh founded Archer Infotech with a vision to bridge the gap between academic learning and industry requirements. His expertise spans Java, Cloud technologies, and enterprise architecture.",
    expertise: ["Java", "Cloud Architecture", "Enterprise Solutions", "Training & Development"],
    experience: "15+ years",
    image: "/images/team/yogesh-patil.jpg",
    linkedin: "https://www.linkedin.com/in/yogesh-patil-76328839/",
  },
  {
    id: "amol-patil",
    name: "Amol Patil",
    role: "Senior Corporate Trainer",
    bio: "Experienced Corporate Trainer with over 10 years of demonstrated history in the IT training industry in Pune. Specializes in Java Full Stack Development, Python Full Stack with various frameworks, and Data Science with AI/ML.",
    expertise: ["Java Full Stack", "Python", "AI/ML", "DevOps", "Data Science"],
    experience: "10+ years",
    image: "/images/team/amol-patil.jpg",
    linkedin: "https://www.linkedin.com/in/amol-patil-228b9a79/",
  },
  {
    id: "amol-chougule",
    name: "Amol Chougule",
    role: "Technical Trainer",
    bio: "Software developer with hands-on experience at Mindstix Software Labs. Brings real-world project experience to training sessions, helping students understand industry best practices in web development and programming.",
    expertise: ["Java", "JavaScript", "HTML5/CSS", "Git", "Linux"],
    experience: "5+ years",
    image: "/images/team/amol-chougule.jpg",
    linkedin: "https://www.linkedin.com/in/amol-chougule-201192175/",
  },
  {
    id: "ankita-hartale",
    name: "Ankita Hartale",
    role: "Java Full Stack Trainer",
    bio: "Java Full Stack Developer currently working at Wipro as Project Engineer. Former Associate Trainer at Archer Infotech with nearly 3 years of training experience. Expert in Spring Framework and enterprise Java development.",
    expertise: ["Java", "Spring Framework", "Hibernate", "DBMS", "Full Stack Development"],
    experience: "5+ years",
    image: "/images/team/ankita-hartale.jpg",
    linkedin: "https://www.linkedin.com/in/ankita-hartale-18a521228/",
  },
  {
    id: "suraj-kudache",
    name: "Suraj Kudache",
    role: ".NET Full Stack Trainer",
    bio: "Full Stack Developer currently working as Consultant at Capgemini. Former Senior Software Developer at Archer Infotech with over 2.5 years of training experience. Specializes in .NET ecosystem and modern web technologies.",
    expertise: [".NET MVC", ".NET Core", "REST API", "Bootstrap", "SQL Server"],
    experience: "7+ years",
    image: "/images/team/suraj-kudache.jpg",
    linkedin: "https://www.linkedin.com/in/suraj-kudache-001a3aa5/",
  },
  {
    id: "vinod-patil",
    name: "Vinod Patil",
    role: "Solutions Architect & AI Trainer",
    bio: "Solutions Architect with 12 years of experience in enterprise applications and emerging technologies. Specializes in Generative AI, LLMs, and AI-powered solutions. Passionate about training the next generation of AI engineers and solution architects.",
    expertise: ["Generative AI", "LLMs & ChatGPT", "Solution Architecture", "AI/ML", "Cloud Platforms"],
    experience: "12 years",
    image: "/images/team/vinod-patil.jpg",
    linkedin: "https://www.linkedin.com/in/vinod-patil/",
  },
];

export function getTeamMembers(): TeamMember[] {
  return teamMembers;
}
