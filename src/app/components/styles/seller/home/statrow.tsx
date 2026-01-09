"use client";

import React from "react";
import {
  MiniMoneyIcon,
  MiniDocIcon,
  MiniTrendIcon,
  MiniUsersIcon,
  MiniWarnIcon,
} from "@/app/components/styles/seller/icons";

type StatItem = {
  title: string;
  value: string;
  note: string;
  noteTone: "good" | "neutral";
  iconName:
    | "MiniMoneyIcon"
    | "MiniDocIcon"
    | "MiniTrendIcon"
    | "MiniUsersIcon"
    | "MiniWarnIcon";
};

const ICONS: Record<StatItem["iconName"], React.ReactNode> = {
  MiniMoneyIcon: <MiniMoneyIcon />,
  MiniDocIcon: <MiniDocIcon />,
  MiniTrendIcon: <MiniTrendIcon />,
  MiniUsersIcon: <MiniUsersIcon />,
  MiniWarnIcon: <MiniWarnIcon />,
};

export default function SellerStatsRow({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((s) => (
        <div
          key={s.title}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="text-sm text-gray-500">{s.title}</div>

            {/* icon */}
            <div className="text-orange-500">{ICONS[s.iconName]}</div>
          </div>

          <div className="mt-2 text-xl font-semibold">{s.value}</div>

          <div
            className={
              "mt-2 text-xs " +
              (s.noteTone === "good" ? "text-green-600" : "text-gray-500")
            }
          >
            {s.note}
          </div>
        </div>
      ))}
    </div>
  );
}
