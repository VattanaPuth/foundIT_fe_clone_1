"use client";

import React from "react";
import { cn, handleKeyboardActivate } from "@/app/components/styles/seller/setting/utils";

export default function Toggle({
  on,
  onChange,
  ariaLabel,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  ariaLabel: string;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onChange(!on)}
      onKeyDown={(e) => handleKeyboardActivate(e, () => onChange(!on))}
      aria-label={ariaLabel}
      className={cn(
        "w-12 h-7 rounded-full border transition flex items-center px-1 cursor-pointer select-none",
        on ? "bg-orange-500 border-orange-500" : "bg-gray-200 border-gray-200"
      )}
    >
      <div
        className={cn(
          "w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
          on ? "translate-x-5" : "translate-x-0"
        )}
      />
    </div>
  );
}
