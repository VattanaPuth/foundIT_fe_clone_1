"use client";

import React from "react";

export default function StarRating({ rating }: { rating: number }) {
  const full = Math.round(rating);

  return (
    <div className="flex items-center gap-2 text-xs text-gray-600">
      <span className="text-amber-500">
        {"★".repeat(full)}
        <span className="text-gray-300">
          {"★".repeat(Math.max(0, 5 - full))}
        </span>
      </span>
      <span className="text-gray-500">{rating.toFixed(1)}</span>
    </div>
  );
}
