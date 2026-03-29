export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  course: string;
  image?: string;
  content: string;
  rating: number;
  linkedIn?: string;
  placedAt?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Amit Patil",
    role: "Software Developer",
    company: "Tech Mahindra",
    course: "Java Full Stack",
    content: "Completed Java Course at Archer Infotech. The faculties are excellent and very supportive. They focus on practical learning with real-world projects. Best experience overall! Got placed at Tech Mahindra within a month of completing the course.",
    rating: 5,
    placedAt: "Tech Mahindra",
  },
  {
    id: "2",
    name: "Bhushan Patil",
    role: "Java Developer",
    company: "e-Zest Solutions",
    course: "Java",
    content: "Completed Java Course at Archer Infotech. Nice Faculty and good learning environment. The trainers have real industry experience which makes the sessions very practical and useful. Good experience!",
    rating: 5,
    placedAt: "e-Zest Solutions",
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "Python Developer",
    company: "Infosys",
    course: "Python Programming",
    content: "The Python course at Archer Infotech was comprehensive and well-structured. The hands-on projects helped me understand concepts clearly. The placement support was excellent.",
    rating: 5,
    placedAt: "Infosys",
  },
  {
    id: "4",
    name: "Rahul Kulkarni",
    role: "AWS Cloud Engineer",
    company: "TCS",
    course: "AWS Cloud Computing",
    content: "Excellent AWS training! The instructor had deep practical knowledge. The lab sessions were very helpful in clearing the certification exam. Highly recommend for anyone looking to start a career in cloud.",
    rating: 5,
    placedAt: "TCS",
  },
  {
    id: "5",
    name: "Sneha Joshi",
    role: "Full Stack Developer",
    company: "Persistent Systems",
    course: "MERN Stack",
    content: "The MERN Stack course was exactly what I needed to transition into full-stack development. The project-based approach helped me build a solid portfolio. Got multiple job offers after completing the course.",
    rating: 5,
    placedAt: "Persistent Systems",
  },
  {
    id: "6",
    name: "Vikram Deshmukh",
    role: "DevOps Engineer",
    company: "Wipro",
    course: "DevOps",
    content: "Comprehensive DevOps training covering all major tools. The trainers are industry experts who share practical insights. The hands-on labs with Jenkins, Docker, and Kubernetes were invaluable.",
    rating: 5,
    placedAt: "Wipro",
  },
  {
    id: "7",
    name: "Anjali Mehta",
    role: "Data Analyst",
    company: "Capgemini",
    course: "Data Analytics",
    content: "The Data Analytics course covered everything from Excel to Python and Power BI. The real-world case studies made learning enjoyable. Great placement support helped me land my dream job.",
    rating: 5,
    placedAt: "Capgemini",
  },
  {
    id: "8",
    name: "Karan Singh",
    role: "ML Engineer",
    company: "Accenture",
    course: "Machine Learning",
    content: "Outstanding Machine Learning course! The faculty explained complex algorithms in simple terms. The projects on real datasets prepared me well for my current role.",
    rating: 5,
    placedAt: "Accenture",
  },
  {
    id: "9",
    name: "Neha Pawar",
    role: "React Developer",
    company: "Cognizant",
    course: "React.js",
    content: "Learned React from scratch and built several projects. The course covered hooks, Redux, and testing. The interview preparation sessions were very helpful.",
    rating: 5,
    placedAt: "Cognizant",
  },
  {
    id: "10",
    name: "Saurabh Jadhav",
    role: ".NET Developer",
    company: "L&T Infotech",
    course: ".NET Full Stack",
    content: "Excellent .NET training with focus on latest technologies like .NET Core and Azure. The trainers are very patient and clear doubts thoroughly. Highly recommended for aspiring .NET developers.",
    rating: 5,
    placedAt: "L&T Infotech",
  },
];

export function getTestimonials(): Testimonial[] {
  return testimonials;
}

export function getFeaturedTestimonials(count: number = 6): Testimonial[] {
  return testimonials.slice(0, count);
}

export function getTestimonialsByCourse(course: string): Testimonial[] {
  return testimonials.filter((t) => t.course.toLowerCase().includes(course.toLowerCase()));
}
