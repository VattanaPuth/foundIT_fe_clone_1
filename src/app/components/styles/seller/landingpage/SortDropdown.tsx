"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

function handleKeyboardActivate(e: React.KeyboardEvent, onActivate: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export default function SortDropdown(props: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const { value, options, onChange } = props;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onMouseDown(e: MouseEvent) {
      const t = e.target as Node;
      if (open && rootRef.current && !rootRef.current.contains(t)) {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => handleKeyboardActivate(e, () => setOpen((v) => !v))}
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs text-gray-800
                   shadow-sm hover:bg-gray-50 cursor-pointer select-none"
        aria-label="Open sort menu"
      >
        <div className="text-gray-500">Sort:</div>
        <div className="font-medium">{value}</div>
        <ChevronDown className={["h-4 w-4 transition", open ? "rotate-180" : ""].join(" ")} />
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-20">
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
                className={[
                  "px-3 py-2 text-sm cursor-pointer select-none",
                  active ? "bg-orange-50 text-orange-700" : "hover:bg-gray-50 text-gray-800",
                ].join(" ")}
                aria-label={`Sort by ${opt}`}
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
