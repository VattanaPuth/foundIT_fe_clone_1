// src/app/page/freelancer/homepage/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  Filter,
  Heart,
  ThumbsDown,
  Menu,
  X,
} from "lucide-react";

type BudgetType = "all" | "fixed" | "hourly";
type Experience = "Entry" | "Intermediate" | "Expert";
type PostedRange = "all" | "24h" | "7d" | "30d";
type DeliveryTarget = "all" | "24h" | "3d" | "1w" | "custom";

type JobItem = {
  id: number;
  title: string;
  category: string;

  payType: "Fixed" | "Hourly";
  fixedBudget?: number;
  hourlyMin?: number;
  hourlyMax?: number;

  duration: string;
  postedLabel: string;
  locationLabel: string;
  timezoneLabel?: string;
  hireRate: number;
  experience: Experience;

  tags: string[];
  description: string;

  proposalsCount: number;
  paymentVerified: boolean;
  repeatHire: boolean;

  postedHoursAgo: number;
};

const CATEGORIES = [
  "Design & Branding",
  "Web Development",
  "Mobile Apps",
  "UI/UX & Product",
  "Video & Animation",
  "Content & Copywriting",
  "Digital Marketing",
  "Data & Analytics",
  "AI & Machine Learning",
  "Audio & Voice",
  "Translation & Localization",
];

const TOP_PILLS = [
  "Design & Branding",
  "Web Development",
  "Mobile Apps",
  "UI/UX & Product",
  "Video & Animation",
  "Content & Copywriting",
  "Digital Marketing",
  "Data & Analytics",
  "AI & Machine Learning",
];

const LOCATIONS = ["Cambodia", "Remote", "Austin, TX", "Singapore", "Thailand"];

const freelancerJobsMock: JobItem[] = [
  {
    id: 1,
    title: "React dashboard for SaaS analytics",
    category: "Web Development",
    payType: "Fixed",
    fixedBudget: 1200,
    duration: "2–4 weeks",
    postedLabel: "3h ago",
    postedHoursAgo: 3,
    locationLabel: "Remote",
    hireRate: 85,
    experience: "Intermediate",
    tags: ["React", "Next.js", "Tailwind", "Figma", "API", "Charts"],
    description:
      "We need a React-based dashboard with charts, role auth, and clean UI. Looking for someone with experience in data visualization and responsive design. Includes API integration and real-time updates.",
    proposalsCount: 5,
    paymentVerified: true,
    repeatHire: false,
  },
  {
    id: 2,
    title: "Mobile app UI design for fitness tracking",
    category: "UI/UX & Product",
    payType: "Hourly",
    hourlyMin: 45,
    hourlyMax: 75,
    duration: "2–4 weeks",
    postedLabel: "5h ago",
    postedHoursAgo: 5,
    locationLabel: "Cambodia",
    timezoneLabel: "BTB",
    hireRate: 92,
    experience: "Expert",
    tags: ["Figma", "UI Design", "Mobile Design", "Prototyping"],
    description:
      "Design a modern, clean mobile app UI for a fitness tracking application. Includes workout logging, progress charts, and social features.",
    proposalsCount: 12,
    paymentVerified: true,
    repeatHire: true,
  },
  {
    id: 3,
    title: "Landing page development with Next.js",
    category: "Web Development",
    payType: "Fixed",
    fixedBudget: 800,
    duration: "1–2 weeks",
    postedLabel: "1d ago",
    postedHoursAgo: 28,
    locationLabel: "Cambodia",
    timezoneLabel: "PP",
    hireRate: 67,
    experience: "Entry",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SEO"],
    description:
      "Build a high-converting landing page for our new SaaS product. Must be fast, SEO-optimized, and include subtle animations.",
    proposalsCount: 24,
    paymentVerified: false,
    repeatHire: false,
  },
  {
    id: 4,
    title: "AI chatbot integration for customer support",
    category: "AI & Machine Learning",
    payType: "Hourly",
    hourlyMin: 60,
    hourlyMax: 90,
    duration: "2–4 weeks",
    postedLabel: "6h ago",
    postedHoursAgo: 6,
    locationLabel: "Remote",
    hireRate: 95,
    experience: "Intermediate",
    tags: ["Python", "OpenAI API", "Node.js", "API Integration"],
    description:
      "Integrate a ChatGPT-based assistant into our web app for automated customer support. Need experience with prompt design and API optimization.",
    proposalsCount: 8,
    paymentVerified: true,
    repeatHire: false,
  },
  {
    id: 5,
    title: "Motion graphics for product explainer video",
    category: "Video & Animation",
    payType: "Fixed",
    fixedBudget: 1500,
    duration: "1–2 weeks",
    postedLabel: "12h ago",
    postedHoursAgo: 12,
    locationLabel: "Cambodia",
    timezoneLabel: "PP",
    hireRate: 78,
    experience: "Expert",
    tags: ["After Effects", "Motion Design", "Video Editing", "Animation"],
    description:
      "Create a 60-second product explainer video with smooth animations and professional voiceover. Must match our brand guidelines.",
    proposalsCount: 18,
    paymentVerified: true,
    repeatHire: true,
  },
  {
    id: 6,
    title: "Full-stack developer for e-commerce platform",
    category: "Web Development",
    payType: "Hourly",
    hourlyMin: 70,
    hourlyMax: 120,
    duration: "Ongoing",
    postedLabel: "2h ago",
    postedHoursAgo: 2,
    locationLabel: "Austin, TX",
    hireRate: 88,
    experience: "Expert",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe", "TypeScript", "AWS"],
    description:
      "Build a custom e-commerce platform from scratch. Need expertise in frontend + backend, payments, and database design.",
    proposalsCount: 15,
    paymentVerified: true,
    repeatHire: false,
  },
  {
    id: 7,
    title: "Technical blog writer for developer tools",
    category: "Content & Copywriting",
    payType: "Hourly",
    hourlyMin: 40,
    hourlyMax: 65,
    duration: "Ongoing",
    postedLabel: "1d ago",
    postedHoursAgo: 26,
    locationLabel: "Remote",
    hireRate: 82,
    experience: "Intermediate",
    tags: ["Technical Writing", "JavaScript", "API Documentation", "React"],
    description:
      "Write in-depth technical tutorials and documentation for our API platform. Must have hands-on development experience.",
    proposalsCount: 22,
    paymentVerified: false,
    repeatHire: false,
  },
  {
    id: 8,
    title: "Brand identity design for tech startup",
    category: "Design & Branding",
    payType: "Fixed",
    fixedBudget: 2500,
    duration: "2–4 weeks",
    postedLabel: "8h ago",
    postedHoursAgo: 8,
    locationLabel: "Cambodia",
    timezoneLabel: "PP",
    hireRate: 90,
    experience: "Expert",
    tags: ["Branding", "Logo Design", "Illustrator", "Brand Guidelines"],
    description:
      "Complete brand identity package including logo, color palette, typography, and brand guidelines for a B2B SaaS startup.",
    proposalsCount: 31,
    paymentVerified: true,
    repeatHire: true,
  },
];

function money(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function pillClass(active: boolean) {
  return (
    "px-4 py-2 rounded-full border text-sm whitespace-nowrap transition " +
    (active
      ? "bg-[#5B5CF6] text-white border-[#5B5CF6]"
      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300")
  );
}

function smallChip() {
  return "px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs border border-gray-200";
}

function FilterSidebarContent(props: {
  selectedCategory: string | null;
  setSelectedCategory: (v: string | null) => void;

  skillQuery: string;
  setSkillQuery: (v: string) => void;

  budgetType: BudgetType;
  setBudgetType: (v: BudgetType) => void;
  budgetMax: number;
  setBudgetMax: (v: number) => void;

  deliveryTarget: DeliveryTarget;
  setDeliveryTarget: (v: DeliveryTarget) => void;

  selectedExperience: Experience[];
  toggleExperience: (v: Experience) => void;

  paymentVerifiedOnly: boolean;
  setPaymentVerifiedOnly: (fn: (v: boolean) => boolean) => void;

  repeatHireOnly: boolean;
  setRepeatHireOnly: (fn: (v: boolean) => boolean) => void;

  selectedLocations: string[];
  toggleLocation: (v: string) => void;

  postedRange: PostedRange;
  setPostedRange: (v: PostedRange) => void;

  handleClearAll: () => void;
  handleApply: () => void;
}) {
  const {
    selectedCategory,
    setSelectedCategory,
    skillQuery,
    setSkillQuery,
    budgetType,
    setBudgetType,
    budgetMax,
    setBudgetMax,
    deliveryTarget,
    setDeliveryTarget,
    selectedExperience,
    toggleExperience,
    paymentVerifiedOnly,
    setPaymentVerifiedOnly,
    repeatHireOnly,
    setRepeatHireOnly,
    selectedLocations,
    toggleLocation,
    postedRange,
    setPostedRange,
    handleClearAll,
    handleApply,
  } = props;

  return (
    <div className="h-full overflow-y-auto px-4 py-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        <Filter className="h-4 w-4 text-gray-500" />
        Filter results
      </div>

      <div className="mt-4 space-y-5">
        {/* Category */}
        <details open className="group">
          <summary className="list-none cursor-pointer select-none">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-900">
                Category
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500 transition group-open:rotate-180" />
            </div>
          </summary>
          <div className="mt-3 space-y-2">
            {CATEGORIES.map((cat) => (
              <div key={cat} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedCategory === cat}
                  onChange={() =>
                    setSelectedCategory(selectedCategory === cat ? null : cat)
                  }
                  className="h-4 w-4 accent-[#5B5CF6] border-gray-300 rounded"
                />
                <div className="text-sm text-gray-700">{cat}</div>
              </div>
            ))}
          </div>
        </details>

        <hr className="border-gray-200" />

        {/* Skills */}
        <details open className="group">
          <summary className="list-none cursor-pointer select-none">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-900">Skills</span>
              <ChevronDown className="h-4 w-4 text-gray-500 transition group-open:rotate-180" />
            </div>
          </summary>
          <div className="mt-3">
            <input
              value={skillQuery}
              onChange={(e) => setSkillQuery(e.target.value)}
              placeholder="Type to search skills..."
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B5CF6] focus:border-[#5B5CF6]"
            />
            <div className="mt-2 text-xs text-gray-500">Add up to 10 skills</div>
          </div>
        </details>

        <hr className="border-gray-200" />

        {/* Budget */}
        <details open className="group">
          <summary className="list-none cursor-pointer select-none">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-900">Budget</span>
              <ChevronDown className="h-4 w-4 text-gray-500 transition group-open:rotate-180" />
            </div>
          </summary>

          <div className="mt-3">
            <div className="flex items-center gap-2">
              {(["fixed", "hourly"] as const).map((t) => {
                const active = budgetType === t;
                return (
                  <div
                    key={t}
                    role="button"
                    tabIndex={0}
                    onClick={() => setBudgetType(active ? "all" : t)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setBudgetType(active ? "all" : t);
                      }
                    }}
                    className={
                      "px-3 py-1.5 rounded-full text-sm border transition " +
                      (active
                        ? "bg-[#5B5CF6] text-white border-[#5B5CF6]"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-300")
                    }
                  >
                    {t === "fixed" ? "Fixed" : "Hourly"}
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>$0</span>
                <span>${money(budgetMax)}</span>
                <span>$10000</span>
              </div>
              <input
                type="range"
                min={0}
                max={10000}
                step={50}
                value={budgetMax}
                onChange={(e) => setBudgetMax(Number(e.target.value))}
                className="mt-2 w-full accent-[#5B5CF6]"
              />
              <div className="mt-2 text-xs text-gray-500">
                Show jobs in your sweet spot
              </div>
            </div>
          </div>
        </details>

        <hr className="border-gray-200" />

        {/* Delivery target */}
        <details open className="group">
          <summary className="list-none cursor-pointer select-none">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-900">
                Delivery Target
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500 transition group-open:rotate-180" />
            </div>
          </summary>

          <div className="mt-3 flex flex-wrap gap-2">
            {[
              ["all", "All"],
              ["24h", "24 hours"],
              ["3d", "3 days"],
              ["1w", "1 week"],
              ["custom", "Custom"],
            ].map(([key, label]) => {
              const active = deliveryTarget === (key as DeliveryTarget);
              return (
                <div
                  key={key}
                  role="button"
                  tabIndex={0}
                  onClick={() => setDeliveryTarget(key as DeliveryTarget)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setDeliveryTarget(key as DeliveryTarget);
                    }
                  }}
                  className={
                    "px-3 py-1.5 rounded-full text-sm border transition " +
                    (active
                      ? "bg-[#5B5CF6] text-white border-[#5B5CF6]"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300")
                  }
                >
                  {label}
                </div>
              );
            })}
          </div>
        </details>

        <hr className="border-gray-200" />

        {/* Experience */}
        <details open className="group">
          <summary className="list-none cursor-pointer select-none">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-900">
                Experience Level
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500 transition group-open:rotate-180" />
            </div>
          </summary>
          <div className="mt-3 space-y-2">
            {(["Entry", "Intermediate", "Expert"] as Experience[]).map((exp) => (
              <div key={exp} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedExperience.includes(exp)}
                  onChange={() => toggleExperience(exp)}
                  className="h-4 w-4 accent-[#5B5CF6] border-gray-300 rounded"
                />
                <div className="text-sm text-gray-700">{exp}</div>
              </div>
            ))}
          </div>
        </details>

        <hr className="border-gray-200" />

        {/* Client */}
        <details open className="group">
          <summary className="list-none cursor-pointer select-none">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-900">Client</span>
              <ChevronDown className="h-4 w-4 text-gray-500 transition group-open:rotate-180" />
            </div>
          </summary>

          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">Payment verified</span>
              <input
                type="checkbox"
                checked={paymentVerifiedOnly}
                onChange={() => setPaymentVerifiedOnly((v) => !v)}
                className="h-4 w-4 accent-[#5B5CF6]"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">Repeat hire</span>
              <input
                type="checkbox"
                checked={repeatHireOnly}
                onChange={() => setRepeatHireOnly((v) => !v)}
                className="h-4 w-4 accent-[#5B5CF6]"
              />
            </div>
          </div>
        </details>

        <hr className="border-gray-200" />

        {/* Location */}
        <details open className="group">
          <summary className="list-none cursor-pointer select-none">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-900">
                Location
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500 transition group-open:rotate-180" />
            </div>
          </summary>

          <div className="mt-3 space-y-2">
            {LOCATIONS.map((loc) => (
              <div key={loc} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(loc)}
                  onChange={() => toggleLocation(loc)}
                  className="h-4 w-4 accent-[#5B5CF6] border-gray-300 rounded"
                />
                <div className="text-sm text-gray-700">{loc}</div>
              </div>
            ))}
          </div>
        </details>

        <hr className="border-gray-200" />

        {/* Posted */}
        <details open className="group">
          <summary className="list-none cursor-pointer select-none">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-900">Posted</span>
              <ChevronDown className="h-4 w-4 text-gray-500 transition group-open:rotate-180" />
            </div>
          </summary>

          <div className="mt-3 flex flex-wrap gap-2">
            {[
              ["all", "All time"],
              ["24h", "24h"],
              ["7d", "7 days"],
              ["30d", "30 days"],
            ].map(([key, label]) => {
              const active = postedRange === (key as PostedRange);
              return (
                <div
                  key={key}
                  role="button"
                  tabIndex={0}
                  onClick={() => setPostedRange(key as PostedRange)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setPostedRange(key as PostedRange);
                    }
                  }}
                  className={
                    "px-3 py-1.5 rounded-full text-sm border transition " +
                    (active
                      ? "bg-[#5B5CF6] text-white border-[#5B5CF6]"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300")
                  }
                >
                  {label}
                </div>
              );
            })}
          </div>
        </details>

        {/* Bottom actions */}
        <div className="border-t border-gray-200 bg-white pt-4">
          <div className="flex items-center gap-3">
            <div
              role="button"
              tabIndex={0}
              onClick={handleClearAll}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClearAll();
                }
              }}
              className="flex-1 text-center px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
            >
              Clear all
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={handleApply}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleApply();
                }
              }}
              className="flex-1 text-center px-3 py-2 rounded-lg bg-[#5B5CF6] text-white text-sm hover:bg-[#4B4CF0]"
            >
              Apply
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FreelancerHomepagePage() {
  // mobile filter drawer
  const [filterOpen, setFilterOpen] = useState(false);

  // top pill category (quick filter)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // favorites
  const [favorites, setFavorites] = useState<number[]>([]);

  // sort
  const [bestMatch, setBestMatch] = useState<string>("Best match");
  const [sortOpen, setSortOpen] = useState(false);

  // sidebar filters
  const [skillQuery, setSkillQuery] = useState("");
  const [budgetType, setBudgetType] = useState<BudgetType>("all");
  const [budgetMax, setBudgetMax] = useState<number>(10000);
  const [deliveryTarget, setDeliveryTarget] = useState<DeliveryTarget>("all");
  const [selectedExperience, setSelectedExperience] = useState<Experience[]>([]);
  const [paymentVerifiedOnly, setPaymentVerifiedOnly] = useState(false);
  const [repeatHireOnly, setRepeatHireOnly] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]); // default = unticked
  const [postedRange, setPostedRange] = useState<PostedRange>("all");

  // lock outside scroll when filter is open
  useEffect(() => {
    if (!filterOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [filterOpen]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleExperience = (exp: Experience) => {
    setSelectedExperience((prev) =>
      prev.includes(exp) ? prev.filter((x) => x !== exp) : [...prev, exp]
    );
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((x) => x !== loc) : [...prev, loc]
    );
  };

  const handleClearAll = () => {
    setSelectedCategory(null);
    setFavorites([]);
    setBestMatch("Best match");
    setSortOpen(false);

    setSkillQuery("");
    setBudgetType("all");
    setBudgetMax(10000);
    setDeliveryTarget("all");
    setSelectedExperience([]);
    setPaymentVerifiedOnly(false);
    setRepeatHireOnly(false);
    setSelectedLocations([]); // keep everything unticked after clear
    setPostedRange("all");
  };

  const handleApply = () => {
    // UI-only: filters already apply live via useMemo, so this just closes mobile drawer.
    setFilterOpen(false);
  };

  const filteredJobs = useMemo(() => {
    return freelancerJobsMock
      .filter((j) => {
        if (selectedCategory && j.category !== selectedCategory) return false;

        if (skillQuery.trim()) {
          const q = skillQuery.trim().toLowerCase();
          const inTitle = j.title.toLowerCase().includes(q);
          const inTags = j.tags.some((t) => t.toLowerCase().includes(q));
          if (!inTitle && !inTags) return false;
        }

        if (budgetType !== "all") {
          if (budgetType === "fixed" && j.payType !== "Fixed") return false;
          if (budgetType === "hourly" && j.payType !== "Hourly") return false;
        }

        if (j.payType === "Fixed" && typeof j.fixedBudget === "number") {
          if (j.fixedBudget > budgetMax) return false;
        }
        if (j.payType === "Hourly" && typeof j.hourlyMin === "number") {
          if (j.hourlyMin > budgetMax) return false;
        }

        if (
          selectedExperience.length > 0 &&
          !selectedExperience.includes(j.experience)
        )
          return false;

        if (paymentVerifiedOnly && !j.paymentVerified) return false;
        if (repeatHireOnly && !j.repeatHire) return false;

        if (selectedLocations.length > 0) {
          const ok = selectedLocations.some((loc) => j.locationLabel === loc);
          if (!ok) return false;
        }

        if (postedRange === "24h" && j.postedHoursAgo > 24) return false;
        if (postedRange === "7d" && j.postedHoursAgo > 24 * 7) return false;
        if (postedRange === "30d" && j.postedHoursAgo > 24 * 30) return false;

        return true;
      })
      .sort((a, b) => {
        if (bestMatch === "Newest") return a.postedHoursAgo - b.postedHoursAgo;
        if (bestMatch === "Most proposals")
          return b.proposalsCount - a.proposalsCount;
        return b.hireRate - a.hireRate;
      });
  }, [
    selectedCategory,
    skillQuery,
    budgetType,
    budgetMax,
    deliveryTarget,
    selectedExperience,
    paymentVerifiedOnly,
    repeatHireOnly,
    selectedLocations,
    postedRange,
    bestMatch,
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile filter drawer (overlay) */}
      {filterOpen && (
        <div className="fixed inset-0 z-50">
          {/* dim background */}
          <div
            className="absolute inset-0 bg-black/35"
            role="button"
            tabIndex={0}
            onClick={() => setFilterOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setFilterOpen(false);
              }
            }}
            aria-label="Close filters backdrop"
          />

          {/* panel */}
          <div className="absolute inset-y-0 left-0 w-[65vw] max-w-[360px] bg-white shadow-xl border-r border-gray-200 flex flex-col">
            {/* top bar with X */}
            <div className="h-14 px-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
    <div className="text-sm font-semibold text-gray-900">Filters</div>
    <div
      role="button"
      tabIndex={0}
      onClick={() => setFilterOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFilterOpen(false);
        }
      }}
      className="h-9 w-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50"
      aria-label="Close filters"
    >
      <X className="h-4 w-4 text-gray-700" />
    </div>
  </div>

            {/* sidebar content */}
            <div className="flex-1 min-h-0">
              <FilterSidebarContent
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                skillQuery={skillQuery}
                setSkillQuery={setSkillQuery}
                budgetType={budgetType}
                setBudgetType={setBudgetType}
                budgetMax={budgetMax}
                setBudgetMax={setBudgetMax}
                deliveryTarget={deliveryTarget}
                setDeliveryTarget={setDeliveryTarget}
                selectedExperience={selectedExperience}
                toggleExperience={toggleExperience}
                paymentVerifiedOnly={paymentVerifiedOnly}
                setPaymentVerifiedOnly={setPaymentVerifiedOnly}
                repeatHireOnly={repeatHireOnly}
                setRepeatHireOnly={setRepeatHireOnly}
                selectedLocations={selectedLocations}
                toggleLocation={toggleLocation}
                postedRange={postedRange}
                setPostedRange={setPostedRange}
                handleClearAll={handleClearAll}
                handleApply={handleApply}
              />
            </div>
          </div>
        </div>
      )}

      {/* Top pills row */}
      <div className="px-4 sm:px-6 pt-5 sm:pt-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {TOP_PILLS.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <div
                key={cat}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedCategory(active ? null : cat)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedCategory(active ? null : cat);
                  }
                }}
                className={pillClass(active)}
              >
                {cat}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main layout */}
      <div className="px-4 sm:px-6 pb-10">
        <div className="mt-4 flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-[320px] flex-shrink-0">
            <div className="sticky top-6 h-[calc(100vh-48px)] rounded-xl border border-gray-200 bg-white overflow-hidden">
              <FilterSidebarContent
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                skillQuery={skillQuery}
                setSkillQuery={setSkillQuery}
                budgetType={budgetType}
                setBudgetType={setBudgetType}
                budgetMax={budgetMax}
                setBudgetMax={setBudgetMax}
                deliveryTarget={deliveryTarget}
                setDeliveryTarget={setDeliveryTarget}
                selectedExperience={selectedExperience}
                toggleExperience={toggleExperience}
                paymentVerifiedOnly={paymentVerifiedOnly}
                setPaymentVerifiedOnly={setPaymentVerifiedOnly}
                repeatHireOnly={repeatHireOnly}
                setRepeatHireOnly={setRepeatHireOnly}
                selectedLocations={selectedLocations}
                toggleLocation={toggleLocation}
                postedRange={postedRange}
                setPostedRange={setPostedRange}
                handleClearAll={handleClearAll}
                handleApply={handleApply}
              />
            </div>
          </aside>

          {/* Content */}
          <section className="flex-1 min-w-0">
            {/* header row: hamburger on mobile */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* mobile hamburger */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setFilterOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setFilterOpen(true);
                    }
                  }}
                  className="lg:hidden h-10 w-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50"
                  aria-label="Open filters"
                >
                  <Menu className="h-5 w-5 text-gray-700" />
                </div>

                <div className="text-sm font-semibold text-gray-900">
                  {filteredJobs.length} jobs
                </div>
              </div>

              <div className="relative">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSortOpen((v) => !v)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSortOpen((v) => !v);
                    }
                  }}
                  className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 flex items-center gap-2"
                >
                  {bestMatch}
                  <ChevronDown
                    className={
                      "h-4 w-4 text-gray-500 transition " +
                      (sortOpen ? "rotate-180" : "")
                    }
                  />
                </div>

                {sortOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden z-20">
                    {["Best match", "Newest", "Most proposals"].map((opt) => (
                      <div
                        key={opt}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          setBestMatch(opt);
                          setSortOpen(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setBestMatch(opt);
                            setSortOpen(false);
                          }
                        }}
                        className={
                          "px-3 py-2 text-sm hover:bg-gray-50 " +
                          (bestMatch === opt
                            ? "text-[#5B5CF6] font-semibold"
                            : "text-gray-700")
                        }
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {filteredJobs.map((job) => {
                const fav = favorites.includes(job.id);

                return (
                  <div
                    key={job.id}
                    className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 hover:shadow-sm transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-900">
                          {job.title}
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            {job.payType === "Fixed" ? (
                              <span className="font-medium text-gray-700">
                                Fixed ${money(job.fixedBudget || 0)}
                              </span>
                            ) : (
                              <span className="font-medium text-gray-700">
                                Hourly ${money(job.hourlyMin || 0)}–
                                {money(job.hourlyMax || 0)}
                              </span>
                            )}
                          </div>

                          <div>{job.duration}</div>
                          <div>{job.postedLabel}</div>
                          <div className="flex items-center gap-1">
                            <span>{job.locationLabel}</span>
                            {job.timezoneLabel ? (
                              <span className="text-gray-400">
                                , {job.timezoneLabel}
                              </span>
                            ) : null}
                          </div>
                          <div className="text-gray-400">•</div>
                          <div>Hire rate {job.hireRate}%</div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {job.tags.map((t) => (
                            <div key={t} className={smallChip()}>
                              {t}
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 text-sm text-gray-600 leading-relaxed">
                          {job.description}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => toggleFavorite(job.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              toggleFavorite(job.id);
                            }
                          }}
                          className="h-9 w-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50"
                          aria-label="Favorite"
                        >
                          <Heart
                            className={
                              "h-4 w-4 " +
                              (fav
                                ? "text-red-500 fill-red-500"
                                : "text-gray-500")
                            }
                          />
                        </div>

                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => {}}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                            }
                          }}
                          className="h-9 w-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50"
                          aria-label="Not interested"
                        >
                          <ThumbsDown className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-end text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0)">
                            <path
                              d="M8 3.5H11V6.5"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11 3.5L6.75 7.75L4.25 5.25L1 8.5"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect width="12" height="12" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>

                        <span>{job.proposalsCount} proposals</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center">
              <div
                role="button"
                tabIndex={0}
                onClick={() => {}}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                  }
                }}
                className="px-5 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50"
              >
                Load More Jobs
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
