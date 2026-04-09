import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const dbPath = process.env.DATABASE_URL || "./sqlite.db";
const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");
const db = drizzle(sqlite, { schema });

async function seed() {
  console.log("Seeding database...");

  // Check if already seeded (skip if batches table has data)
  const existing = db.select({ count: schema.batches.id }).from(schema.batches).all();
  if (existing.length > 0) {
    console.log("Database already has data, skipping seed.");
    sqlite.close();
    return;
  }

  // Seed Batches
  const batchData: schema.NewBatch[] = [
    // Offline batches
    {
      courseSlug: "java-full-stack",
      courseName: "Java Full Stack",
      startDate: new Date("2026-05-15"),
      timing: "9:00 AM - 12:00 PM",
      duration: "6 Months",
      mode: "offline",
      totalSeats: 15,
      seatsAvailable: 5,
      status: "upcoming",
      instructor: "Vinod Patil",
      location: "Archer Infotech, Pune",
    },
    {
      courseSlug: "python-programming",
      courseName: "Python Programming",
      startDate: new Date("2026-05-10"),
      timing: "2:00 PM - 5:00 PM",
      duration: "2.5 Months",
      mode: "offline",
      totalSeats: 20,
      seatsAvailable: 8,
      status: "upcoming",
      instructor: null,
      location: "Archer Infotech, Pune",
    },
    {
      courseSlug: "aws-cloud-computing",
      courseName: "AWS Cloud Computing",
      startDate: new Date("2026-05-20"),
      timing: "6:00 PM - 9:00 PM",
      duration: "3 Months",
      mode: "offline",
      totalSeats: 15,
      seatsAvailable: 10,
      status: "upcoming",
      instructor: null,
      location: "Archer Infotech, Pune",
    },
    {
      courseSlug: "mern-stack",
      courseName: "MERN Stack",
      startDate: new Date("2026-05-25"),
      timing: "10:00 AM - 1:00 PM",
      duration: "5 Months",
      mode: "offline",
      totalSeats: 15,
      seatsAvailable: 7,
      status: "upcoming",
      instructor: null,
      location: "Archer Infotech, Pune",
    },
    {
      courseSlug: "devops-engineering",
      courseName: "DevOps Engineering",
      startDate: new Date("2026-06-01"),
      timing: "9:00 AM - 12:00 PM",
      duration: "4 Months",
      mode: "offline",
      totalSeats: 15,
      seatsAvailable: 12,
      status: "upcoming",
      instructor: null,
      location: "Archer Infotech, Pune",
    },
    {
      courseSlug: "data-science",
      courseName: "Data Science",
      startDate: new Date("2026-06-05"),
      timing: "2:00 PM - 5:00 PM",
      duration: "5 Months",
      mode: "offline",
      totalSeats: 12,
      seatsAvailable: 9,
      status: "upcoming",
      instructor: null,
      location: "Archer Infotech, Pune",
    },
    // Online batches
    {
      courseSlug: "java-full-stack",
      courseName: "Java Full Stack",
      startDate: new Date("2026-05-12"),
      timing: "7:00 PM - 9:00 PM",
      duration: "6 Months",
      mode: "online",
      totalSeats: 30,
      seatsAvailable: 15,
      status: "upcoming",
      instructor: null,
      meetingLink: null,
    },
    {
      courseSlug: "machine-learning",
      courseName: "Machine Learning",
      startDate: new Date("2026-05-18"),
      timing: "8:00 PM - 10:00 PM",
      duration: "4 Months",
      mode: "online",
      totalSeats: 25,
      seatsAvailable: 18,
      status: "upcoming",
      instructor: null,
      meetingLink: null,
    },
    {
      courseSlug: "python-programming",
      courseName: "Python Programming",
      startDate: new Date("2026-05-22"),
      timing: "6:00 PM - 8:00 PM",
      duration: "2.5 Months",
      mode: "online",
      totalSeats: 30,
      seatsAvailable: 20,
      status: "upcoming",
      instructor: null,
      meetingLink: null,
    },
    {
      courseSlug: "generative-ai",
      courseName: "Generative AI",
      startDate: new Date("2026-05-28"),
      timing: "7:00 PM - 9:00 PM",
      duration: "3 Months",
      mode: "online",
      totalSeats: 25,
      seatsAvailable: 22,
      status: "upcoming",
      instructor: null,
      meetingLink: null,
    },
    {
      courseSlug: "aws-cloud-computing",
      courseName: "AWS Cloud Computing",
      startDate: new Date("2026-06-03"),
      timing: "8:00 PM - 10:00 PM",
      duration: "3 Months",
      mode: "online",
      totalSeats: 30,
      seatsAvailable: 25,
      status: "upcoming",
      instructor: null,
      meetingLink: null,
    },
    {
      courseSlug: "react-js",
      courseName: "React.js",
      startDate: new Date("2026-06-08"),
      timing: "6:00 PM - 8:00 PM",
      duration: "2.5 Months",
      mode: "online",
      totalSeats: 25,
      seatsAvailable: 20,
      status: "upcoming",
      instructor: null,
      meetingLink: null,
    },
  ];

  console.log("Inserting batches...");
  for (const batch of batchData) {
    await db.insert(schema.batches).values(batch);
  }
  console.log(`Inserted ${batchData.length} batches`);

  // Seed Placements
  const placementData: schema.NewPlacement[] = [
    {
      studentName: "Amit Patil",
      company: "Tech Mahindra",
      designation: "Software Developer",
      package: "8 LPA",
      courseTaken: "Java Full Stack",
      batchYear: 2025,
      testimonial: "Got placed at Tech Mahindra within a month of completing the course.",
      isHighlighted: true,
      isPublished: true,
    },
    {
      studentName: "Bhushan Patil",
      company: "e-Zest Solutions",
      designation: "Java Developer",
      package: "6 LPA",
      courseTaken: "Java",
      batchYear: 2025,
      isHighlighted: false,
      isPublished: true,
    },
    {
      studentName: "Priya Sharma",
      company: "Infosys",
      designation: "Python Developer",
      package: "7.5 LPA",
      courseTaken: "Python Programming",
      batchYear: 2025,
      isHighlighted: true,
      isPublished: true,
    },
    {
      studentName: "Rahul Kulkarni",
      company: "TCS",
      designation: "AWS Cloud Engineer",
      package: "9 LPA",
      courseTaken: "AWS Cloud Computing",
      batchYear: 2025,
      isHighlighted: true,
      isPublished: true,
    },
    {
      studentName: "Sneha Joshi",
      company: "Persistent Systems",
      designation: "Full Stack Developer",
      package: "8.5 LPA",
      courseTaken: "MERN Stack",
      batchYear: 2025,
      isHighlighted: true,
      isPublished: true,
    },
    {
      studentName: "Vikram Deshmukh",
      company: "Wipro",
      designation: "DevOps Engineer",
      package: "8 LPA",
      courseTaken: "DevOps",
      batchYear: 2024,
      isHighlighted: false,
      isPublished: true,
    },
    {
      studentName: "Anjali Mehta",
      company: "Capgemini",
      designation: "Data Analyst",
      package: "7 LPA",
      courseTaken: "Data Analytics",
      batchYear: 2024,
      isHighlighted: false,
      isPublished: true,
    },
    {
      studentName: "Karan Singh",
      company: "Accenture",
      designation: "ML Engineer",
      package: "10 LPA",
      courseTaken: "Machine Learning",
      batchYear: 2024,
      isHighlighted: true,
      isPublished: true,
    },
    {
      studentName: "Neha Pawar",
      company: "Cognizant",
      designation: "React Developer",
      package: "7 LPA",
      courseTaken: "React.js",
      batchYear: 2024,
      isHighlighted: false,
      isPublished: true,
    },
    {
      studentName: "Saurabh Jadhav",
      company: "L&T Infotech",
      designation: ".NET Developer",
      package: "7.5 LPA",
      courseTaken: ".NET Full Stack",
      batchYear: 2024,
      isHighlighted: false,
      isPublished: true,
    },
  ];

  console.log("Inserting placements...");
  for (const placement of placementData) {
    await db.insert(schema.placements).values(placement);
  }
  console.log(`Inserted ${placementData.length} placements`);

  // Seed Testimonials
  const testimonialData: schema.NewTestimonial[] = [
    {
      name: "Amit Patil",
      role: "Software Developer",
      company: "Tech Mahindra",
      courseTaken: "Java Full Stack",
      content: "Completed Java Course at Archer Infotech. The faculties are excellent and very supportive. They focus on practical learning with real-world projects. Best experience overall! Got placed at Tech Mahindra within a month of completing the course.",
      rating: 5,
      placedAt: "Tech Mahindra",
      isHighlighted: true,
      isPublished: true,
    },
    {
      name: "Bhushan Patil",
      role: "Java Developer",
      company: "e-Zest Solutions",
      courseTaken: "Java",
      content: "Completed Java Course at Archer Infotech. Nice Faculty and good learning environment. The trainers have real industry experience which makes the sessions very practical and useful. Good experience!",
      rating: 5,
      placedAt: "e-Zest Solutions",
      isHighlighted: false,
      isPublished: true,
    },
    {
      name: "Priya Sharma",
      role: "Python Developer",
      company: "Infosys",
      courseTaken: "Python Programming",
      content: "The Python course at Archer Infotech was comprehensive and well-structured. The hands-on projects helped me understand concepts clearly. The placement support was excellent.",
      rating: 5,
      placedAt: "Infosys",
      isHighlighted: true,
      isPublished: true,
    },
    {
      name: "Rahul Kulkarni",
      role: "AWS Cloud Engineer",
      company: "TCS",
      courseTaken: "AWS Cloud Computing",
      content: "Excellent AWS training! The instructor had deep practical knowledge. The lab sessions were very helpful in clearing the certification exam. Highly recommend for anyone looking to start a career in cloud.",
      rating: 5,
      placedAt: "TCS",
      isHighlighted: true,
      isPublished: true,
    },
    {
      name: "Sneha Joshi",
      role: "Full Stack Developer",
      company: "Persistent Systems",
      courseTaken: "MERN Stack",
      content: "The MERN Stack course was exactly what I needed to transition into full-stack development. The project-based approach helped me build a solid portfolio. Got multiple job offers after completing the course.",
      rating: 5,
      placedAt: "Persistent Systems",
      isHighlighted: true,
      isPublished: true,
    },
    {
      name: "Vikram Deshmukh",
      role: "DevOps Engineer",
      company: "Wipro",
      courseTaken: "DevOps",
      content: "Comprehensive DevOps training covering all major tools. The trainers are industry experts who share practical insights. The hands-on labs with Jenkins, Docker, and Kubernetes were invaluable.",
      rating: 5,
      placedAt: "Wipro",
      isHighlighted: false,
      isPublished: true,
    },
    {
      name: "Anjali Mehta",
      role: "Data Analyst",
      company: "Capgemini",
      courseTaken: "Data Analytics",
      content: "The Data Analytics course covered everything from Excel to Python and Power BI. The real-world case studies made learning enjoyable. Great placement support helped me land my dream job.",
      rating: 5,
      placedAt: "Capgemini",
      isHighlighted: false,
      isPublished: true,
    },
    {
      name: "Karan Singh",
      role: "ML Engineer",
      company: "Accenture",
      courseTaken: "Machine Learning",
      content: "Outstanding Machine Learning course! The faculty explained complex algorithms in simple terms. The projects on real datasets prepared me well for my current role.",
      rating: 5,
      placedAt: "Accenture",
      isHighlighted: true,
      isPublished: true,
    },
    {
      name: "Neha Pawar",
      role: "React Developer",
      company: "Cognizant",
      courseTaken: "React.js",
      content: "Learned React from scratch and built several projects. The course covered hooks, Redux, and testing. The interview preparation sessions were very helpful.",
      rating: 5,
      placedAt: "Cognizant",
      isHighlighted: false,
      isPublished: true,
    },
    {
      name: "Saurabh Jadhav",
      role: ".NET Developer",
      company: "L&T Infotech",
      courseTaken: ".NET Full Stack",
      content: "Excellent .NET training with focus on latest technologies like .NET Core and Azure. The trainers are very patient and clear doubts thoroughly. Highly recommended for aspiring .NET developers.",
      rating: 5,
      placedAt: "L&T Infotech",
      isHighlighted: false,
      isPublished: true,
    },
  ];

  console.log("Inserting testimonials...");
  for (const testimonial of testimonialData) {
    await db.insert(schema.testimonials).values(testimonial);
  }
  console.log(`Inserted ${testimonialData.length} testimonials`);

  // Seed Blog Posts
  const { placeholderBlogs } = await import("../data/placeholder-blogs");

  console.log("Inserting blog posts...");
  for (const blog of placeholderBlogs) {
    await db.insert(schema.blogPosts).values({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      featuredImage: blog.featuredImage,
      category: blog.category,
      tags: blog.tags,
      metaTitle: blog.metaTitle,
      metaDescription: blog.metaDescription,
      author: blog.author,
      isPublished: blog.isPublished,
      publishedAt: blog.publishedAt,
    });
  }
  console.log(`Inserted ${placeholderBlogs.length} blog posts`);

  console.log("Seeding complete!");
  sqlite.close();
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
