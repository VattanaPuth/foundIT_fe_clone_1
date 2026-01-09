"use client";

import React from "react";
import { MiniDocIcon } from "@/app/components/styles/seller/icons";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export default function SellerActiveProducts({
  countText,
  items,
  onViewAll,
  onViewAllLink,
}: {
  countText: string;
  items: { id: string; title: string; meta: string; status: string }[];
  onViewAll: () => void;
  onViewAllLink: () => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="text-sm font-semibold">
          Active Products <span className="text-gray-500">{countText}</span>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={onViewAll}
          onKeyDown={(e) => handleKeyboardActivate(e, onViewAll)}
          className="h-9 px-3 rounded-lg bg-white border border-gray-200 text-sm text-gray-700
                     flex items-center cursor-pointer select-none
                     hover:bg-gray-50 hover:border-gray-300 transition"
          aria-label="View All active products"
        >
          View All
        </div>
      </div>

      <div className="px-5 pb-4 space-y-3">
        {items.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-gray-200 bg-white p-4 hover:border-gray-300 hover:bg-gray-50 transition"
          >
            {/* mobile-first: stack, then row on sm+ */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 min-w-0">
                {/* FIX: icon box never stretches */}
                <div className="h-12 w-12 shrink-0 rounded-xl bg-yellow-100 grid place-items-center text-orange-600">
                  <MiniDocIcon />
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{p.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{p.meta}</div>
                </div>
              </div>

              {/* FIX: badge aligned and doesn’t stretch */}
              <div className="shrink-0 self-start sm:self-center">
                <div className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700 inline-flex">
                  active
                </div>
              </div>
            </div>
          </div>
        ))}

        <div
          role="button"
          tabIndex={0}
          onClick={onViewAllLink}
          onKeyDown={(e) => handleKeyboardActivate(e, onViewAllLink)}
          className="mt-2 text-sm text-gray-600 hover:text-orange-600 cursor-pointer select-none
                     flex items-center justify-center py-2"
          aria-label="View all products link"
        >
          View all 7 products →
        </div>
      </div>
    </div>
  );
}
