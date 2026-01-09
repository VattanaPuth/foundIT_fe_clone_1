"use client";

import React from "react";
import { DollarSign, ShoppingBag, Zap, Star } from "lucide-react";

import ProjectCard, {
  type ProjectItem,
} from "@/app/components/styles/fav/ProjectCard";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
      {/* icon holder (replace later with your svg) */}
      <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
        {icon}
      </div>
      <div className="mt-3 text-lg font-semibold text-gray-900">{value}</div>
      <div className="mt-1 text-xs text-gray-500">{label}</div>
    </div>
  );
}

function SectionShell({
  title,
  right,
  children,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 ">
        <div className="text-md font-semibold text-gray-900">{title}</div>
        {right}
      </div>
      <div className="p-5 pt-1">{children}</div>
    </div>
  );
}

export default function OverviewTab({
  onViewAllProducts,
}: {
  onViewAllProducts: () => void;
}) {
  const featured: ProjectItem[] = [
    {
      id: "p1",
      title: "Modern Dashboard UI Kit",
      subtitle: "React • TypeScript • Tailwind CSS",
      seller: "Mash Wiki",
      priceFrom: "$49",
      rating: "4.9",
      reviews: "438",
      badges: ["Bestseller"],
      updated: "Updated 2 days ago",
      coverTone: "dark",
      imageSrc: "/images/p1.png",
    },
    {
      id: "p2",
      title: "SaaS Website Template Pack",
      subtitle: "Next.js • Marketing Site",
      seller: "Mash Wiki",
      priceFrom: "$79",
      rating: "4.8",
      reviews: "312",
      badges: ["Featured"],
      updated: "Updated 1 week ago",
      coverTone: "light",
      imageSrc: "/images/p2.png",
    },
    {
      id: "p3",
      title: "Mobile App Design System",
      subtitle: "Figma • Design Tokens",
      seller: "Mash Wiki",
      priceFrom: "$99",
      rating: "5",
      reviews: "201",
      badges: ["Trending"],
      updated: "Updated 3 days ago",
      coverTone: "orange",
      imageSrc: "/images/p3.png",
    },
    {
      id: "p4",
      title: "E-commerce Components Library",
      subtitle: "Components • UI Kit",
      seller: "Mash Wiki",
      priceFrom: "$69",
      rating: "4.7",
      reviews: "89",
      badges: ["New"],
      updated: "Updated 5 days ago",
      coverTone: "brown",
      imageSrc: "/images/p4.png",
    },
  ];

  const reviews = [
    {
      id: "r1",
      name: "Sarah Johnson",
      product: "Modern Dashboard UI Kit",
      rating: 5,
      time: "2 days ago",
      msg: "Absolutely incredible quality! The components are so well organized and the documentation is perfect. Saved me weeks of work.",
    },
    {
      id: "r2",
      name: "Michael Chen",
      product: "SaaS Website Template Pack",
      rating: 5,
      time: "1 week ago",
      msg: "Best purchase I've made this year. The templates are production-ready and look amazing. Customer support is also top-notch!",
    },
    {
      id: "r3",
      name: "Emily Davis",
      product: "Mobile App Design System",
      rating: 4,
      time: "2 weeks ago",
      msg: "Great design system with everything you need. Only minor issue was the documentation could be more detailed in some areas.",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<DollarSign className="w-4 h-4" />}
          value="$84.2k"
          label="Total Revenue"
        />
        <StatCard
          icon={<ShoppingBag className="w-4 h-4" />}
          value="2,847"
          label="Total Sales"
        />
        <StatCard
          icon={<Zap className="w-4 h-4" />}
          value="2 hours"
          label="Avg Response"
        />
        <StatCard
          icon={<Star className="w-4 h-4" />}
          value="4.9"
          label="Average Rating"
        />
      </div>

      <SectionShell
        title="Featured Products"
        right={
          <div
            role="button"
            tabIndex={0}
            onClick={onViewAllProducts}
            onKeyDown={(e) => handleKeyboardActivate(e, onViewAllProducts)}
            className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer select-none"
            aria-label="View all products"
          >
            View All
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((p) => (
            <ProjectCard key={p.id} item={p} onOpen={() => {}} />
          ))}
        </div>
      </SectionShell>

      <SectionShell
        title="Recent Reviews"
        right={
          <div className="text-xs text-gray-400 select-none">View All</div>
        }
      >
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="flex items-start gap-3 w-full">
              {/* left side (avatar + content) */}
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-700 flex-shrink-0">
                  {r.name.slice(0, 1).toUpperCase()}
                </div>

                <div className="min-w-0 pr-3">
                  <div className="text-sm font-medium text-gray-900">
                    {r.name}
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <div className="text-orange-500 text-xs">
                      {"★".repeat(r.rating)}
                      <span className="text-gray-300">
                        {"★".repeat(Math.max(0, 5 - r.rating))}
                      </span>
                    </div>
                  </div>

                  <div className="mt-1 text-xs text-gray-500">
                    For: <span className="text-gray-700">{r.product}</span>
                  </div>

                  <div className="mt-2 text-xs text-gray-600 leading-relaxed">
                    {r.msg}
                  </div>
                </div>
              </div>

              {/* time (right edge) */}
              <div className="text-xs text-gray-400 whitespace-nowrap ml-auto pt-1">
                {r.time}
              </div>
            </div>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
