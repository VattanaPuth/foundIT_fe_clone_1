"use client";

import React from "react";
import { BarChart3, DollarSign, TrendingUp, Users } from "lucide-react";

function handleKeyboardActivate(e: React.KeyboardEvent, onActivate: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export default function Tab({
  value,
  onChange,
}: {
  value: "overview" | "buyers" | "revenue" | "performance";
  onChange: (v: "overview" | "buyers" | "revenue" | "performance") => void;
}) {
  const items = [
    { key: "overview" as const, label: "Overview", icon: <BarChart3 className="h-4 w-4" /> },
    { key: "buyers" as const, label: "Buyers", icon: <Users className="h-4 w-4" /> },
    { key: "revenue" as const, label: "Revenue", icon: <DollarSign className="h-4 w-4" /> },
    { key: "performance" as const, label: "Performance", icon: <TrendingUp className="h-4 w-4" /> },
  ];

  return (
    <div className="w-full overflow-x-auto">
  <div className="inline-flex min-w-max items-center gap-1 rounded-xl bg-gray-100 p-1">
      {items.map((t) => {
        const active = value === t.key;
        return (
          <div
            key={t.key}
            role="button"
            tabIndex={0}
            onClick={() => onChange(t.key)}
            onKeyDown={(e) => handleKeyboardActivate(e, () => onChange(t.key))}
            className={
              "h-9 px-3 rounded-lg text-sm inline-flex items-center gap-2 cursor-pointer select-none transition " +
              (active
                ? "bg-white border border-gray-200 shadow-sm text-gray-900"
                : "text-gray-700 hover:bg-white/60")
            }
            aria-label={t.label}
          >
            <span className="text-gray-600">{t.icon}</span>
            {t.label}
          </div>
        );
      })}
    </div>
    </div>
  );
}
