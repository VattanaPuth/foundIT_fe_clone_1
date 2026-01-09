"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

function handleKeyboardActivate(e: React.KeyboardEvent, onActivate: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export default function MobileFiltersDrawer(props: {
  open: boolean;
  onClose: () => void;
  onClear: () => void;
  onApply: () => void;
  children: React.ReactNode;
}) {
  const { open, onClose, onClear, onApply, children } = props;
  const scrollYRef = useRef(0);

  // lock page scroll (background cannot scroll)
  useEffect(() => {
    if (!open) return;

    scrollYRef.current = window.scrollY;

    // strong lock (works better than overflow:hidden alone)
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      const y = scrollYRef.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, y);
    };
  }, [open]);

  // ESC close
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/35" onClick={onClose} aria-hidden="true" />

      {/* panel — RIGHT SIDE */}
      <div className="absolute left-0 top-0 h-full w-[92%] max-w-sm bg-white shadow-2xl border-r border-gray-200 flex flex-col">

        {/* header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <div className="text-sm font-semibold text-gray-900">Filters</div>

          <div
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => handleKeyboardActivate(e, onClose)}
            className="h-9 w-9 rounded-sm border border-gray-200 bg-white flex items-center justify-center
                       hover:bg-gray-50 cursor-pointer select-none"
            aria-label="Close filters"
          >
            <X className="h-4 w-4 text-gray-700" />
          </div>
        </div>

        {/* ONLY this scrolls */}
        <div className="flex-1 overflow-auto px-4 py-4">{children}</div>

        {/* footer */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-2">
            <div
              role="button"
              tabIndex={0}
              onClick={onClear}
              onKeyDown={(e) => handleKeyboardActivate(e, onClear)}
              className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800
                         hover:bg-gray-50 cursor-pointer select-none text-center"
              aria-label="Clear filters"
            >
              Clear
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={onApply}
              onKeyDown={(e) => handleKeyboardActivate(e, onApply)}
              className="flex-1 rounded-lg border border-orange-500 bg-orange-500 px-3 py-2 text-sm text-white
                         hover:bg-orange-600 cursor-pointer select-none text-center"
              aria-label="Apply filters"
            >
              Apply
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
