"use client";

import React from "react";

export type ProfileTabKey = "overview" | "products" | "reviews" | "about";

function handleKeyboardActivate(e: React.KeyboardEvent, onActivate: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

const tabs: { key: ProfileTabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "products", label: "Product" }, // no count
  { key: "reviews", label: "Reviews" },  // no count
  { key: "about", label: "About" },
];

export default function ProfileTabs({
  value,
  onChange,
}: {
  value: ProfileTabKey;
  onChange: (v: ProfileTabKey) => void;
}) {
  return (
    <div className="border-b border-gray-200">
      <div className="grid grid-cols-4 text-center">
        {tabs.map((t) => {
          const active = t.key === value;

          return (
            <div key={t.key} className="flex justify-center">
              <div
                role="button"
                tabIndex={0}
                onClick={() => onChange(t.key)}
                onKeyDown={(e) => handleKeyboardActivate(e, () => onChange(t.key))}
                className={[
                  "px-4 py-3 text-sm cursor-pointer select-none",
                  "border-b-2 -mb-[1px]",
                  active
                    ? "border-orange-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700",
                ].join(" ")}
                aria-label={`Open ${t.label} tab`}
              >
                {t.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
