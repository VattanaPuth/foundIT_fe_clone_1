"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn, handleKeyboardActivate } from "@/app/components/styles/seller/setting/utils";
import { ChevronDown } from "lucide-react";

export default function Select({
  value,
  options,
  onChange,
  placeholder = "Select...",
  ariaLabel,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  placeholder?: string;
  ariaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (wrapRef.current && !wrapRef.current.contains(t)) setOpen(false);
    }

    if (open) {
      window.addEventListener("keydown", onKey);
      window.addEventListener("mousedown", onDown);
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => handleKeyboardActivate(e, () => setOpen((v) => !v))}
        aria-label={ariaLabel}
        className={cn(
          "h-11 w-full px-3 rounded-md bg-gray-50 border border-gray-200 shadow-sm flex items-center justify-between cursor-pointer select-none",
          "focus:outline-none"
        )}
      >
        <div className={cn("text-sm truncate", value ? "text-gray-900" : "text-gray-400")}>
          {value || placeholder}
        </div>
        <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0 ">
          <ChevronDown/>
        </div>
      </div>

      {open && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {options.map((opt) => {
            const active = opt === value;
            return (
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
                className={cn(
                  "px-3 py-2 text-sm cursor-pointer select-none",
                  active ? "bg-orange-50 text-orange-700" : "hover:bg-gray-50 text-gray-700"
                )}
                aria-label={`Select ${opt}`}
              >
                {opt}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
  