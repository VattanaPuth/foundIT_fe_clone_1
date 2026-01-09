"use client";

import React from "react";
import { DollarSign, Star, TrendingUp, Users } from "lucide-react";

type Item = {
  title: string;
  value: string;
  sub: string;
  delta: string;
  iconKey: "users" | "money" | "trend" | "star";
  stars?: number;
};

const ICONS: Record<Item["iconKey"], React.ReactNode> = {
  users: <Users className="h-4 w-4" />,
  money: <DollarSign className="h-4 w-4" />,
  trend: <TrendingUp className="h-4 w-4" />,
  star: <Star className="h-4 w-4" />,
};

export default function Kpi({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((k) => (
        <div
          key={k.title}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 min-w-0"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="text-sm text-gray-500">{k.title}</div>
            <div className="text-orange-500 shrink-0">{ICONS[k.iconKey]}</div>
          </div>

          <div className="mt-2 flex items-end justify-between gap-3">
            <div className="text-xl font-semibold">{k.value}</div>

            {k.delta ? (
              <div className="text-xs text-green-600 inline-flex items-center gap-1 shrink-0">
                <span>↗</span>
                {k.delta}
              </div>
            ) : (
              <div />
            )}
          </div>

          <div className="mt-2 text-xs text-gray-500">{k.sub}</div>

          {k.stars ? (
            <div className="mt-2 flex items-center gap-1 text-orange-500">
              {Array.from({ length: k.stars }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
