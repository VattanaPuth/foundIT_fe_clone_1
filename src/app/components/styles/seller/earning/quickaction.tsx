"use client";

import React from "react";
import { handleKeyboardActivate } from "@/app/components/styles/seller/earning/utils";

type Item = {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export default function QuickAction({ items }: { items: Item[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-orange-600">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        Quick Actions
      </div>

      <div className="mt-4 space-y-2">
        {items.map((it) => (
          <div
            key={it.id}
            role="button"
            tabIndex={0}
            aria-label={it.label}
            onClick={it.onClick}
            onKeyDown={(e) => handleKeyboardActivate(e, it.onClick)}
            className="
              h-10 rounded-lg border border-gray-200 bg-white
              flex items-center gap-2 px-3
              cursor-pointer select-none transition
              text-gray-700
              hover:bg-orange-600 
              active:bg-orange-600 active:border-orange-600 active:text-white
            "
          >
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
              {it.icon}
            </div>
            <div className="text-sm font-medium">{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
