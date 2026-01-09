"use client";

import React from "react";
import type { StatItem } from "@/app/components/styles/seller/home/myproduct/mock";

import {
  MiniMoneyIcon,
  MiniTagIcon,
  MiniUsersIcon,
  MiniDocIcon,
} from "@/app/components/styles/seller/icons";

/*
If any icon import is missing in your icons.tsx, tell me which one errors
and I’ll list the exact icon name to add.
*/

const ICONS: Record<StatItem["iconName"], React.ReactNode> = {
  MiniMoneyIcon: <MiniMoneyIcon />,
  MiniTagIcon: <MiniTagIcon />,
  MiniUsersIcon: <MiniUsersIcon />,
  MiniDocIcon: <MiniDocIcon />,
};

export default function Stat({ items }: { items: StatItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((it) => (
        <div
          key={it.title}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="text-sm text-gray-500">{it.title}</div>
            <div className="text-orange-500">{ICONS[it.iconName]}</div>
          </div>

          <div className="mt-2 text-lg font-semibold">{it.value}</div>

          {it.sub ? (
            <div
              className={
                "mt-2 text-xs " +
                (it.tone === "good" ? "text-green-600" : "text-gray-500")
              }
            >
              {it.sub}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
