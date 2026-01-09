"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { handleKeyboardActivate } from "@/app/components/styles/seller/profile/editpf/utils";

export default function TimezoneSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <div className="text-xs font-medium text-gray-700">Timezone</div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => handleKeyboardActivate(e, () => setOpen((v) => !v))}
        className="mt-2 h-10 rounded-md border border-gray-200 bg-gray-50 px-3
                   flex items-center justify-between cursor-pointer select-none
                   focus:outline-none"
        aria-label="Select timezone"
      >
        <div className="text-sm text-gray-900 truncate">{value}</div>
        <ChevronDown
          className={[
            "h-4 w-4 text-gray-500 transition",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
        />
      </div>

      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-md overflow-hidden">
          {options.map((opt) => (
            <div
              key={opt}
              role="button"
              tabIndex={0}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => {
                  onChange(opt);
                  setOpen(false);
                })
              }
              className={[
                "px-3 py-2 text-sm cursor-pointer select-none",
                "hover:bg-gray-50",
                opt === value ? "text-orange-600 font-medium" : "text-gray-700",
              ].join(" ")}
              aria-label={`Timezone ${opt}`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
