// Define the type for a single Talent object
export type Talent = {
  id: number;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  rate: number;
  skills: string[];
  bio: string;
  category: string;
  experience: 'Entry' | 'Intermediate' | 'Expert';
  location: string;
  lastActive: number; // days ago
  workCount: number;
  verified: boolean;
};

// Define the categories and locations lists
export const categories = [
  "Design & Branding", "Web Development", "Mobile Apps", "UI/UX & Product",
  "Video & Animation", "Content & Copywriting", "Digital Marketing", "Data & Analytics", "AI & Machine Learning"
];

export const locations = ["Cambodia", "China", "South Korea", "Spain", "Italy", "Thailand", "Senegal", "Afghanistan"];

// Expanded talents data
export const talents: Talent[] = [
  {
    id: 1, name: "Bai Lu", title: "Full-Stack Developer & UI Designer", rating: 4.9, reviews: 234, rate: 85,
    skills: ["Figma", "Logo Design", "UI/UX", "Brand Guidelines"],
    bio: "Award winning brand designer with 8+ years helping startups & Fortune 500s build memorable visual identities and conversion-.",
    category: "Design & Branding", experience: "Expert", location: "China", lastActive: 5, workCount: 234, verified: true
  },
  {
    id: 2, name: "Jennie Kim", title: "Full-Stack Developer", rating: 4.8, reviews: 187, rate: 95,
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    bio: "Senior engineer specializing in scalable SaaS apps. Ex-Google/Stripe contractor. I ship clean code, strong tests, and...",
    category: "Web Development", experience: "Expert", location: "South Korea", lastActive: 3, workCount: 187, verified: true
  },
  {
    id: 3, name: "Bae Suzy", title: "Content Strategist & Copywriter", rating: 4.9, reviews: 312, rate: 65,
    skills: ["Content Writing", "SEO", "Brand Voice", "Email Marketing"],
    bio: "Compelling long-form and product copy for tech & wellness brands. 50+ companies grew traffic/conversions with...",
    category: "Content & Copywriting", experience: "Intermediate", location: "South Korea", lastActive: 10, workCount: 312, verified: true
  },
  {
    id: 4, name: "Woo Soek", title: "3D Artist & Motion Designer", rating: 4.7, reviews: 156, rate: 75,
    skills: ["3D Modeling", "Blender", "Motion Graphics", "Cinema 4D", "After Effects"],
    bio: "Cinematic motion graphics and product renders for DTC brands. Credits: Nike, Adobe, and music labels.",
    category: "Video & Animation", experience: "Expert", location: "South Korea", lastActive: 2, workCount: 156, verified: true
  },
  {
    id: 5, name: "Maya Alvarez", title: "Senior Product Designer", rating: 5.0, reviews: 91, rate: 100,
    skills: ["Design Systems", "Figma", "Prototyping", "UX Research"],
    bio: "Design systems and complex B2B flows. I turn messy requirements into clean, scalable interfaces backed by research.",
    category: "UI/UX & Product", experience: "Expert", location: "Spain", lastActive: 15, workCount: 91, verified: true
  },
  {
    id: 6, name: "Jimin", title: "DevOps & Cloud Architect", rating: 4.8, reviews: 144, rate: 110,
    skills: ["AWS", "Terraform", "Kubernetes", "CI/CD", "Zero-downtime"],
    bio: "I build reliable, cost-efficient cloud infra. Zero-downtime deployments, autoscaling, security hardening, and clear...",
    category: "Web Development", experience: "Intermediate", location: "Cambodia", lastActive: 20, workCount: 144, verified: true
  },
  {
    id: 7, name: "Fatima Noori", title: "Data Scientist", rating: 4.9, reviews: 129, rate: 90,
    skills: ["Python", "Pandas", "Time Series", "Forecasting", "Dashboards"],
    bio: "Actionable forecasting and KPI dashboards. I turn messy datasets into clear, executive-ready insights.",
    category: "Data & Analytics", experience: "Expert", location: "Afghanistan", lastActive: 7, workCount: 129, verified: true
  },
  {
    id: 8, name: "Luca Bianchi", title: "iOS Engineer", rating: 4.7, reviews: 98, rate: 85,
    skills: ["Swift", "SwiftUI", "Combine", "Core Data", "Firebase"],
    bio: "Native iOS apps with rock-solid SwiftUI architectures and delightful animations. Published 20+ apps.",
    category: "Mobile Apps", experience: "Intermediate", location: "Italy", lastActive: 25, workCount: 98, verified: true
  },
  {
    id: 9, name: "Aminata Diallo", title: "UX Researcher", rating: 4.9, reviews: 77, rate: 70,
    skills: ["User Interviews", "Usability Testing", "Personas", "Journey Maps"],
    bio: "I uncover user needs with rigorous research and turn them into clear product opportunities and tested prototypes.",
    category: "UI/UX & Product", experience: "Entry", location: "Senegal", lastActive: 1, workCount: 77, verified: true
  },
  {
    id: 10, name: "Faker T1", title: "Backend Engineer", rating: 4.8, reviews: 210, rate: 80,
    skills: ["Go", "Microservices", "gRPC", "PostgreSQL", "Redis"],
    bio: "High-throughput APIs and resilient microservices. I care about performance, observability, and simple designs.",
    category: "Web Development", experience: "Expert", location: "South Korea", lastActive: 4, workCount: 210, verified: true
  },
  {
    id: 11, name: "Kim Taehyung", title: "Frontend Developer", rating: 4.8, reviews: 189, rate: 88,
    skills: ["React", "Tailwind", "JavaScript", "HTML", "CSS"],
    bio: "Specializing in modern frontend development with React and Tailwind CSS.",
    category: "Web Development", experience: "Intermediate", location: "South Korea", lastActive: 12, workCount: 189, verified: true
  },
  {
    id: 12, name: "Lisa Manoban", title: "Brand Designer", rating: 4.9, reviews: 201, rate: 90,
    skills: ["Figma", "Illustration", "Branding", "Adobe Suite"],
    bio: "Creating impactful brand designs for global clients.",
    category: "Design & Branding", experience: "Expert", location: "Thailand", lastActive: 6, workCount: 201, verified: true
  },
  {
    id: 13, name: "Park Chaeyoung", title: "Motion Designer", rating: 4.7, reviews: 134, rate: 78,
    skills: ["After Effects", "Lottie", "Animation", "Illustrator"],
    bio: "Bringing ideas to life with smooth motion designs.",
    category: "Video & Animation", experience: "Intermediate", location: "South Korea", lastActive: 18, workCount: 134, verified: true
  },
  {
    id: 14, name: "Jung Hoseok", title: "Full-Stack Engineer", rating: 4.8, reviews: 167, rate: 92,
    skills: ["TypeScript", "NestJS", "React", "MongoDB"],
    bio: "Building end-to-end solutions with modern tech stacks.",
    category: "Web Development", experience: "Expert", location: "South Korea", lastActive: 9, workCount: 167, verified: true
  },
  {
    id: 15, name: "Min Yoongi", title: "Product Designer", rating: 4.9, reviews: 156, rate: 105,
    skills: ["Figma", "Design Systems", "Prototyping", "Wireframing"],
    bio: "Crafting user-centered product designs.",
    category: "UI/UX & Product", experience: "Expert", location: "South Korea", lastActive: 14, workCount: 156, verified: true
  },
  {
    id: 16, name: "Namjoon Kim", title: "Technical Writer", rating: 4.9, reviews: 145, rate: 75,
    skills: ["Documentation", "MDX", "API Docs", "Content Strategy"],
    bio: "Writing clear and comprehensive technical documentation.",
    category: "Content & Copywriting", experience: "Intermediate", location: "South Korea", lastActive: 22, workCount: 145, verified: true
  },
];