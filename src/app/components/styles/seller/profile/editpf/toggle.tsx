"use client";

import React from "react";
import { handleKeyboardActivate } from "@/app/components/styles/seller/profile/editpf/utils";

function Toggle({ on }: { on: boolean }) {
  return (
    <div
      className={[
        "w-11 h-6 rounded-full border transition flex items-center",
        on ? "bg-orange-500 border-orange-500 justify-end" : "bg-gray-200 border-gray-200 justify-start",
      ].join(" ")}
    >
      <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
    </div>
  );
}

export default function ToggleRow({
  label,
  desc,
  on,
  setOn,
}: {
  label: string;
  desc: string;
  on: boolean;
  setOn: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <div className="text-sm font-medium text-gray-900">{label}</div>
        <div className="mt-0.5 text-xs text-gray-500">{desc}</div>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => setOn(!on)}
        onKeyDown={(e) => handleKeyboardActivate(e, () => setOn(!on))}
        className="cursor-pointer select-none flex-shrink-0"
        aria-label={`Toggle ${label}`}
      >
        <Toggle on={on} />
      </div>
    </div>
  );
}
