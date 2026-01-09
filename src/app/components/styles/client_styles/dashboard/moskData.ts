export type JobStatus = "live" | "draft" | "paused" | "hired" | "completed";

export type JobItem = {
  id: string;
  status: JobStatus;
  title: string;
  subtitle?: string;
  metaLine: string;
  tags: string[];
  proposals?: number;
  views?: number;
  lastActivity?: string;
  badge?: { text: string; tone: "green" | "gray" };
};

export type Candidate = {
  id: string;
  name: string;
  rating: number;
  role: string;
  skills: string;
  rate: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  iconTone: "green" | "purple" | "blue";
};

export const dashboardMock = {
  jobs: [
    {
      id: "j1",
      status: "live",
      title: "Full-Stack Developer",
      subtitle: "for E-commerce",
      metaLine: "Fixed $2,000 · 1–2 weeks · Remote",
      tags: ["React", "Node.js", "MongoDB"],
      proposals: 12,
      views: 250,
      lastActivity: "2 hours ago",
      badge: { text: "NEW", tone: "green" },
    },
    {
      id: "j2",
      status: "live",
      title: "UI/UX Designer for Mobile App",
      subtitle: "Redesign",
      metaLine: "$45/hour · 2–3 weeks · Remote",
      tags: ["Figma", "UI Design", "Mobile"],
      proposals: 8,
      views: 180,
      lastActivity: "5 hours ago",
    },
    {
      id: "j3",
      status: "draft",
      title: "Logo Design for Tech Startup",
      metaLine: "Fixed $800 · 3–5 days · Remote",
      tags: ["Logo Design", "Branding", "Illustrator"],
      badge: { text: "Draft saved", tone: "gray" },
    },
    {
      id: "j4",
      status: "paused",
      title: "Video Editor for YouTube Channel",
      metaLine: "$25/hour · Ongoing · Remote",
      tags: ["Video Editing", "Adobe Premiere", "After Effects"],
      proposals: 6,
      views: 95,
      lastActivity: "3 days ago",
      badge: { text: "Paused", tone: "gray" },
    },
    {
      id: "j5",
      status: "hired",
      title: "Content Writer for Blog Series",
      metaLine: "Fixed $500 · 1 week · Remote",
      tags: ["Content Writing", "SEO", "Marketing"],
      proposals: 15,
      lastActivity: "1 day ago",
    },
    {
      id: "j6",
      status: "completed",
      title: "Social Media Manager",
      metaLine: "Fixed $1,500 · 1 month · Remote",
      tags: ["Social Media", "Marketing", "Copywriting"],
      proposals: 20,
      lastActivity: "1 week ago",
    },
  ] as JobItem[],

  candidates: [
    {
      id: "c1",
      name: "Shu Xi",
      rating: 4.9,
      role: "Senior React Developer",
      skills: "React · TypeScript",
      rate: "$85/hr",
    },
    {
      id: "c2",
      name: "Ling He",
      rating: 5.0,
      role: "Full-Stack Engineer",
      skills: "Node.js · MongoDB",
      rate: "$75/hr",
    },
    {
      id: "c3",
      name: "Dong wook",
      rating: 4.8,
      role: "UI/UX Designer",
      skills: "Figma · Design Systems",
      rate: "$65/hr",
    },
  ] as Candidate[],

  activities: [
    {
      id: "a1",
      title: "New proposal",
      subtitle: "From Michael Torres",
      time: "5m ago",
      iconTone: "blue",
    },
    {
      id: "a2",
      title: "Interview scheduled",
      subtitle: "With Emma Wilson",
      time: "1h ago",
      iconTone: "purple",
    },
    {
      id: "a3",
      title: "Job viewed",
      subtitle: "Full-Stack Developer",
      time: "2h ago",
      iconTone: "green",
    },
    {
      id: "a4",
      title: "Milestone completed",
      subtitle: "Design Phase",
      time: "3h ago",
      iconTone: "green",
    },
  ] as ActivityItem[],
};
