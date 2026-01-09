"use client";

import React from "react";

export default function ReviewsTab() {
  const reviews = [
    {
      id: "r1",
      name: "Yami sakihno",
      rating: 5,
      product: "Modern Dashboard UI Kit",
      time: "2 days ago",
      msg: "Absolutely incredible quality! The components are so well organized and the documentation is perfect. Saved me weeks of work.",
    },
    {
      id: "r2",
      name: "Kim Jennie",
      rating: 5,
      product: "SaaS Website Template Pack",
      time: "1 week ago",
      msg: "Best purchase I've made this year. The templates are production-ready and look amazing. Customer support is also top-notch!",
    },
    {
      id: "r3",
      name: "Ariana Grande",
      rating: 4,
      product: "Mobile App Design System",
      time: "2 weeks ago",
      msg: "Great design system with everything you need. Only minor issue was the documentation could be more detailed in some areas.",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <div className="space-y-5">
        {reviews.map((r) => (
          <div key={r.id} className="flex items-start gap-3 w-full">
            {/* left side (avatar + content) */}
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-700 flex-shrink-0">
                {r.name.slice(0, 1).toUpperCase()}
              </div>

              <div className="min-w-0 pr-3">
                <div className="text-sm font-medium text-gray-900">{r.name}</div>

                <div className="mt-1 text-orange-500 text-xs">
                  {"★".repeat(r.rating)}
                  <span className="text-gray-300">
                    {"★".repeat(Math.max(0, 5 - r.rating))}
                  </span>
                </div>

                <div className="mt-1 text-xs text-gray-500">
                  Purchased: <span className="text-gray-700">{r.product}</span>
                </div>

                <div className="mt-1.5 text-xs text-gray-600 leading-relaxed">
                  {r.msg}
                </div>
              </div>
            </div>

            {/* time (right edge) */}
            <div className="text-xs text-gray-400 whitespace-nowrap ml-auto pt-1">
              {r.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
