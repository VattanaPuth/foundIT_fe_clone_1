"use client";

import React from "react";

export default function IconBadge({
  bg,
  icon,
  ariaLabel = "Notification icon",
}: {
  bg: string;
  icon: React.ReactNode; // ✅ SVG component goes here
  ariaLabel?: string;
}) {
  return (
    <div
      className={`h-9 w-9 rounded-full flex items-center justify-center ${bg}`}
      aria-label={ariaLabel}
    >
      {icon}
    </div>
  );
}
