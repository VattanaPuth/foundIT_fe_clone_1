"use client";

import React from "react";
import type { TabKey } from "@/app/components/styles/client_styles/library/ts/mock_data";
import { handleKeyboardActivate } from "@/app/components/styles/client_styles/library/ts/ultis";

function TabPill({
  active,
  label,
  badge,
  onClick,
}: {
  active: boolean;
  label: string;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => handleKeyboardActivate(e, onClick)}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-md cursor-pointer select-none transition
      ${
        active
          ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
          : "bg-white text-gray-700 hover:bg-gray-50"
      }`}
      aria-label={label}
    >
      <span>{label}</span>
      {typeof badge === "number" ? (
        <span
          className={`min-w-5 h-5 px-1 rounded-full text-[11px] flex items-center justify-center
          ${active ? "bg-white/20 text-white" : "bg-green-600 text-white"}`}
        >
          {badge}
        </span>
      ) : null}
    </div>
  );
}

export default function LibraryTabs({
  activeTab,
  setActiveTab,
  updatesCount,
}: {
  activeTab: TabKey;
  setActiveTab: (t: TabKey) => void;
  updatesCount: number;
}) {
  return (
    <div className="mt-6 border-b">
      <div className="flex items-center gap-2 pb-3">
        <TabPill
          active={activeTab === "products"}
          label="Products"
          onClick={() => setActiveTab("products")}
        />
        <TabPill
          active={activeTab === "updates"}
          label="Updates"
          badge={updatesCount}
          onClick={() => setActiveTab("updates")}
        />
        <TabPill
          active={activeTab === "invoices"}
          label="Invoices"
          onClick={() => setActiveTab("invoices")}
        />
      </div>
    </div>
  );
}
