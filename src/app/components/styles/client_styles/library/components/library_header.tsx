"use client";

import React from "react";
import type { TabKey } from "@/app/components/styles/client_styles/library/ts/mock_data";;
import { handleKeyboardActivate } from "@/app/components/styles/client_styles/library/ts/ultis";

function ShortcutPill({
  label,
  onClick,
  tone,
}: {
  label: string;
  onClick: () => void;
  tone: "gray" | "orange";
}) {
  const cls =
    tone === "orange"
      ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => handleKeyboardActivate(e, onClick)}
      className={`rounded-full border h-10 px-5 text-sm
            flex items-center justify-center
            whitespace-nowrap leading-none
            cursor-pointer select-none transition active:scale-[0.99] ${cls}`}
      aria-label={label}
    >
      {label}
    </div>
  );
}

export default function LibraryHeader({
  productCount,
  updatesCount,
  activeTab,
  setActiveTab,
  search,
  setSearch,
}: {
  productCount: number;
  updatesCount: number;
  activeTab: TabKey;
  setActiveTab: (t: TabKey) => void;
  search: string;
  setSearch: (v: string) => void;
}) {
  return (
    <>
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
          Library (Purchases)
        </h2>

        <div className="mt-1 text-sm sm:text-base text-gray-500">
          Products you&apos;ve purchased from other sellers
        </div>

        
      </div>

      {/* pills */}
      <div className="hidden sm:flex items-center gap-2 sm:justify-end">
        <ShortcutPill
          label={`${productCount} Products`}
          tone={activeTab === "products" ? "orange" : "gray"}
          onClick={() => setActiveTab("products")}
        />
        <ShortcutPill
          label={`${updatesCount} Updates`}
          tone={activeTab === "updates" ? "orange" : "gray"}
          onClick={() => setActiveTab("updates")}
        />
      </div>
    </div>
    <div className="mt-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your library..."
            className="w-full sm:max-w-xl rounded-lg border bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none
                       focus:ring-2 focus:ring-green-500 focus:border-green-500"
            aria-label="Search your library"
          />
        </div>
    </>
  );
}
