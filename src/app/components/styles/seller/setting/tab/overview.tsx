"use client";

import React from "react";
import { cn } from "@/app/components/styles/seller/setting/utils";

function StatCard({
  title,
  value,
  sub,
  tone,
}: {
  title: string;
  value: string;
  sub: string;
  tone: "yellow" | "green" | "blue" | "purple";
}) {
  const toneCls =
    tone === "yellow"
      ? "from-yellow-50 to-yellow-100 border-yellow-200"
      : tone === "green"
      ? "from-green-50 to-green-100 border-green-200"
      : tone === "blue"
      ? "from-blue-50 to-blue-100 border-blue-200"
      : "from-purple-50 to-purple-100 border-purple-200";

  const titleCls =
    tone === "yellow"
      ? "text-orange-600"
      : tone === "green"
      ? "text-green-600"
      : tone === "blue"
      ? "text-blue-600"
      : "text-purple-600";

  return (
    <div className={cn("rounded-xl border bg-gradient-to-br p-5", toneCls)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className={cn("text-sm font-medium", titleCls)}>{title}</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">{value}</div>
          <div className={cn("mt-2 text-sm", titleCls)}>{sub}</div>
        </div>
        <div className="w-9 h-9 rounded-xl bg-white/70 border border-white flex items-center justify-center flex-shrink-0">
          <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">
            ICON
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityRow({
  title,
  meta,
  tone,
}: {
  title: string;
  meta: string;
  tone: "green" | "blue" | "yellow";
}) {
  const ring =
    tone === "green"
      ? "bg-green-100 text-green-700"
      : tone === "blue"
      ? "bg-blue-100 text-blue-700"
      : "bg-orange-100 text-orange-700";

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-5 py-4 flex items-center gap-4">
      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0", ring)}>
        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">ICON</div>
      </div>
      <div className="min-w-0">
        <div className="text-sm font-medium text-gray-900 truncate">{title}</div>
        <div className="text-xs text-gray-500 mt-1">{meta}</div>
      </div>
    </div>
  );
}

export default function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="text-lg font-semibold text-gray-900">Shop Overview</div>
        <div className="text-sm text-gray-500 mt-1">Quick stats and recent activity for your shop</div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Products" value="24" sub="+3 this month" tone="yellow" />
          <StatCard title="Total Earnings" value="$1,247" sub="+$432 this week" tone="green" />
          <StatCard title="Active Orders" value="3" sub="2 pending delivery" tone="blue" />
          <StatCard title="Store Views" value="1.2K" sub="Last 30 days" tone="purple" />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="text-lg font-semibold text-gray-900">Recent Activity</div>
        <div className="text-sm text-gray-500 mt-1">Your latest sales and updates</div>

        <div className="mt-5 space-y-4">
          <ActivityRow
            tone="green"
            title="New sale: Modern Dashboard UI Kit"
            meta="$49.00 · 2 hours ago"
          />
          <ActivityRow
            tone="blue"
            title="Order completed: Icon Pack - 500+ Icons"
            meta="$29.00 · 1 day ago"
          />
          <ActivityRow
            tone="yellow"
            title="New product uploaded: Landing Page Template"
            meta="3 days ago"
          />
        </div>
      </div>
    </div>
  );
}
