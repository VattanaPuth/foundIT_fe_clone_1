"use client";

import React from "react";

export default function DashboardSearch() {
  return (
    <div className="mt-4">
      <div className="relative">
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.0008 13.9988L11.1074 11.1055"
              stroke="#6B7280"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
              stroke="#6B7280"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <input
          placeholder="Search your jobs..."
          aria-label="Search your jobs"
          className="w-full rounded-lg border bg-[#F3F3F5] pl-9 pr-3 py-2 text-sm text-gray-900 outline-none
                     focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>
    </div>
  );
}
