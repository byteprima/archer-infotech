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
    image: "/images/team/yogesh.png",
  },
];

export function getTeamMembers(): TeamMember[] {
  return teamMembers;
}
