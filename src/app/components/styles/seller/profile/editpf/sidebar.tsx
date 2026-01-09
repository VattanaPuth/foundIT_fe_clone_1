"use client";

import React from "react";
import { handleKeyboardActivate } from "@/app/components/styles/seller/profile/editpf/utils";

import {
  User,
  Store,
  Sparkles,
  Link2,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

export type SectionKey =
  | "basic"
  | "store"
  | "specialties"
  | "social"
  | "policies"
  | "display";

export type SectionItem = {
  key: SectionKey;
  label: string;
  icon: React.ReactNode;
};

export default function SectionSidebar({
  items,
  active,
  onPick,
}: {
  items: SectionItem[];
  active: SectionKey;
  onPick: (k: SectionKey) => void;
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3">
          <div className="text-xs font-semibold text-gray-700 px-2 py-2">
            Sections
          </div>

          <div className="mt-1">
            {items.map((it) => {
              const on = it.key === active;

              return (
                <div
                  key={it.key}
                  role="button"
                  tabIndex={0}
                  onClick={() => onPick(it.key)}
                  onKeyDown={(e) =>
                    handleKeyboardActivate(e, () => onPick(it.key))
                  }
                  className={[
                    "px-3 py-2 rounded-lg text-sm cursor-pointer select-none",
                    "flex items-center gap-2",
                    on
                      ? "bg-orange-50 text-orange-700 border border-orange-200"
                      : "text-gray-700 hover:bg-gray-50",
                  ].join(" ")}
                  aria-label={`Go to ${it.label}`}
                >
                  <div
                    className={[
                      "w-4 h-4 flex items-center justify-center",
                      on ? "text-orange-600" : "text-gray-500",
                    ].join(" ")}
                  >
                    {it.icon}
                  </div>

                  <div className="min-w-0 truncate">{it.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
