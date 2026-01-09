"use client";

import React from "react";

export default function Timeline() {
  const items = [
    "Orders clear 7-14 days after completion",
    "Withdrawals process within 1-3 business days",
    "No fees for standard withdrawals",
  ];

  return (
    <div className="bg-blue-50/60 border border-blue-100 rounded-xl shadow-sm p-4 sm:p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-blue-600">
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
            <path d="M12 8v4l3 3" />
            <path d="M12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10z" />
          </svg>
        </div>
        Payment Timeline
      </div>

      <div className="mt-4 space-y-2">
        {items.map((t) => (
          <div key={t} className="flex items-start gap-2 text-xs text-gray-600">
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-blue-600 mt-0.5">
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
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="leading-5">{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
