"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import TabsToggle from "@/app/components/styles/client_styles/fav/TabsToggle";
import FreelancerCard, {
  FreelancerItem,
} from "@/app/components/styles/client_styles/fav/FreelancerCard";
import ProjectCard, {
  ProjectItem,
} from "@/app/components/styles/client_styles/fav/ProjectCard";
import BrowsingHistoryCard from "@/app/components/styles/seller_styles/landingpage/BrowsingHistoryStrip";
import ClientNavHeader from "@/app/components/styles/global_styles/client/header";
import ClientFooter from "@/app/components/styles/global_styles/client/footer";
import Footer from "@/app/components/styles/landingpage_styles/footer";

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
      />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

type TabKey = "freelancers" | "projects";

export default function FavoritesPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabKey>("freelancers");
  const [searchText, setSearchText] = useState("");

  const freelancers: FreelancerItem[] = [
    {
      id: "f1",
      name: "Sarah Johnso",
      role: "Full-Stack Developer & UI",
      rate: "$85",
      tags: ["React", "Node.js", "UI/UX", "TypeScript"],
    },
    {
      id: "f2",
      name: "Michael Cher",
      role: "Logo Designer & Brand Strategist",
      rate: "$65",
      tags: ["Logo Design", "Branding", "Illustrator", "Figma"],
    },
    {
      id: "f3",
      name: "Emma Rodrigue",
      role: "AI/ML Engineer & Data Scientist",
      rate: "$95",
      tags: ["Python", "Machine Learning", "TensorFlow", "Data Analysis"],
    },
    {
      id: "f4",
      name: "David Kim",
      role: "Mobile App Developer",
      rate: "$75",
      tags: ["React Native", "Flutter", "iOS", "Android"],
    },
  ];

  const projects: ProjectItem[] = [
    {
      id: "p1",
      title: "Modern Dashboard UI Kit",
      subtitle: "React • TypeScript • Tailwind CSS",
      seller: "Sarah Chen",
      priceFrom: "$49",
      rating: "4.9",
      reviews: "2,341 sales",
      badges: ["Bestseller", "Featured"],
      updated: "Updated 2 days ago",
      coverTone: "orange",
      imageSrc:"/images/p2.png"
    },
    {
      id: "p2",
      title: "Next.js SaaS Starter Template",
      subtitle: "Next.js • Supabase • Stripe",
      seller: "Marcus Dev",
      priceFrom: "$99",
      rating: "4.8",
      reviews: "1,567 sales",
      badges: ["Trending"],
      updated: "Updated 1 week ago",
      coverTone: "dark",
      imageSrc:"/images/p1.png"
    },
    {
      id: "p3",
      title: "Complete Brand Identity Kit",
      subtitle: "AI • PSD • Figma",
      seller: "Sarah Chen",
      priceFrom: "$89",
      rating: "4.9",
      reviews: "1,234 sales",
      badges: ["Featured"],
      updated: "Updated 4 days ago",
      coverTone: "brown",
      imageSrc:"/images/p3.png"
    },
    {
      id: "p4",
      title: "Figma Design System Pro",
      subtitle: "Figma • Design Tokens • Auto-layout",
      seller: "Sarah Chen",
      priceFrom: "$79",
      rating: "4.9",
      reviews: "3,245 sales",
      badges: ["Bestseller", "New"],
      updated: "Updated 3 days ago",
      coverTone: "light",
      imageSrc:"/images/p4.png"
    },
  ];



  function onOpen(id: string) {
    console.log("Navigate to:", id);
    // later: router.push(`/details/${id}`);
    void router;
  }

  return (
    <>
      <ClientNavHeader />
      <main className="bg-gray-50 min-h-screen px-4 py-6 ">
        <div className="mx-auto max-w-7xl">
          {/* Title */}
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Your Favorites
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Keep track of freelancers and ready-to-buy services you’re
              interested in
            </p>
          </div>

          {/* Search row */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-4">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
              <input
                aria-label="Search favorites"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search freelancers, clients, jobs, products..."
                className={[
                  "w-full h-10 rounded-md border bg-white",
                  "pl-10 pr-3 text-sm",
                  "hover:border-gray-400",
                  "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-700",
                ].join(" ")}
              />
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() =>
                console.log("Search clicked (placeholder):", searchText)
              }
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () =>
                  console.log("Search clicked (placeholder):", searchText)
                )
              }
              className="h-10 px-4 rounded-md bg-green-500 hover:bg-green-600 text-white text-sm inline-flex items-center justify-center cursor-pointer select-none"
            >
              Search
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-5">
            <TabsToggle activeTab={activeTab} onChange={setActiveTab} />
          </div>

          {/* Content */}
          {activeTab === "freelancers" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {freelancers.map((item) => (
                <FreelancerCard
                  key={item.id}
                  item={item}
                  onViewProfile={onOpen}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {projects.map((item) => (
                <ProjectCard key={item.id} item={item} onOpen={onOpen} />
              ))}
            </div>
          )}

          
          <div />
        </div>
        
        <BrowsingHistoryCard />
      </main>
      
      <Footer />
      <ClientFooter />
    </>
  );
}
