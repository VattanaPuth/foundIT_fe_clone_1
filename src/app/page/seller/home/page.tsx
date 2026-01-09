"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";

import SellerStatsRow from "@/app/components/styles/seller/home/statrow";
import SellerActiveProducts from "@/app/components/styles/seller/home/activeproduct";
import SellerRecentOrders from "@/app/components/styles/seller/home/recentorder";
import SellerRightRail from "@/app/components/styles/seller/home/rightrail";

export default function SellerHomePage() {
  const router = useRouter();

  const stats = useMemo(
    () => [
      {
        title: "Revenue",
        value: "$12,450",
        note: "+18% from last month",
        noteTone: "good" as const,
        iconName: "MiniMoneyIcon" as const,
      },
      {
        title: "Orders",
        value: "247",
        note: "+12% from last month",
        noteTone: "good" as const,
        iconName: "MiniDocIcon" as const,
      },
      {
        title: "Conversion",
        value: "3.8%",
        note: "+0.4% from last month",
        noteTone: "good" as const,
        iconName: "MiniTrendIcon" as const,
      },
      {
        title: "Views",
        value: "6,521",
        note: "+24% from last month",
        noteTone: "good" as const,
        iconName: "MiniUsersIcon" as const,
      },
      {
        title: "Refund rate",
        value: "1.2%",
        note: "Below 3% target",
        noteTone: "neutral" as const,
        iconName: "MiniWarnIcon" as const,
      },
    ],
    []
  );

  const products = useMemo(
    () => [
      {
        id: "p1",
        title: "Modern Dashboard UI Kit - Figma",
        meta: "orders · $",
        status: "active",
      },
      {
        id: "p2",
        title: "SaaS Landing Page React Template",
        meta: "orders · $",
        status: "active",
      },
      {
        id: "p3",
        title: "AI Prompt Pack - ChatGPT & Claude (500+ Prompts)",
        meta: "orders · $",
        status: "active",
      },
    ],
    []
  );

  const orders = useMemo(
    () => [
      {
        id: "1247",
        title: "UI Kit Pro",
        status: "Delivered" as const,
        user: "@sarah_design",
        date: "Nov 8, 2024",
        price: 149,
        action: "View",
      },
      {
        id: "1246",
        title: "Dashboard Template",
        status: "New" as const,
        user: "@mike_dev",
        date: "Nov 8, 2024",
        price: 79,
        action: "Respond",
      },
      {
        id: "1245",
        title: "Icon Pack",
        status: "Delivered" as const,
        user: "@anna_product",
        date: "Nov 7, 2024",
        price: 29,
        action: "View",
      },
      {
        id: "1244",
        title: "Landing Page Kit",
        status: "Completed" as const,
        user: "@john_founder",
        date: "Nov 7, 2024",
        price: 99,
        action: "View",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* NOTE: Header/Footer removed as requested (your friend will add later) */}

      <main className="mx-auto w-full max-w-7xl px-4 md:px-6 py-6">
        {/* Title row */}
        <section>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-2xl font-semibold">Dashboard</div>
              <div className="mt-1 text-sm text-gray-500">
                Manage your products and grow your business
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => router.push("/page/seller/home/myproduct")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push("/page/seller/home/myproduct");
                }
              }}
              className="h-10 px-4 rounded-lg bg-white border border-gray-200 shadow-sm
                         text-sm text-gray-700 flex items-center cursor-pointer select-none
                         hover:bg-gray-50 hover:border-gray-300 transition"
              aria-label="View All Products"
            >
              View All Products
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-5">
          <SellerStatsRow stats={stats} />
        </section>

        {/* Main grid */}
        <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SellerActiveProducts
              countText="(4)"
              items={products}
              onViewAll={() => router.push("/page/seller/home/myproduct")}
              onViewAllLink={() => router.push("/page/seller/home/myproduct")}
            />

            <SellerRecentOrders items={orders} />
          </div>

          <SellerRightRail />
        </section>
      </main>
    </div>
  );
}
