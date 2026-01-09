"use client";

import React, { useEffect, useRef } from "react";
import { X, Menu } from "lucide-react";
import {
  type SectionItem,
  type SectionKey,
} from "@/app/components/styles/seller/profile/editpf/sidebar";
import { handleKeyboardActivate } from "@/app/components/styles/seller/profile/editpf/utils";

export default function MobileSectionsDrawer({
  open,
  onOpen,
  onClose,
  items,
  active,
  onPick,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  items: SectionItem[];
  active: SectionKey;
  onPick: (k: SectionKey) => void;
}) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!open) return;

    scrollYRef.current = window.scrollY;
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

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div className="lg:hidden">
      {/* hamburger below back arrow area */}
      <div className="mt-3">
        <div
          role="button"
          tabIndex={0}
          onClick={onOpen}
          onKeyDown={(e) => handleKeyboardActivate(e, onOpen)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 bg-white
                     hover:bg-gray-50 cursor-pointer select-none"
          aria-label="Open sections menu"
        >
          <Menu className="h-4 w-4 text-gray-700" />
          <span className="text-sm text-gray-800">Sections</span>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/35"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* drawer from left */}
          <div className="absolute left-0 top-0 h-full w-[92%] max-w-sm bg-white shadow-2xl border-r border-gray-200 flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <div className="text-sm font-semibold text-gray-900">Sections</div>

              <div
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={(e) => handleKeyboardActivate(e, onClose)}
                className="h-9 w-9 rounded-sm border border-gray-200 bg-white flex items-center justify-center
                           hover:bg-gray-50 cursor-pointer select-none"
                aria-label="Close sections"
              >
                <X className="h-4 w-4 text-gray-700" />
              </div>
            </div>

            <div className="flex-1 overflow-auto px-3 py-3">
              {items.map((it) => {
                const on = it.key === active;
                return (
                  <div
                    key={it.key}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      onPick(it.key);
                      onClose();
                    }}
                    onKeyDown={(e) =>
                      handleKeyboardActivate(e, () => {
                        onPick(it.key);
                        onClose();
                      })
                    }
                    className={[
                      "px-3 py-3 rounded-lg text-sm cursor-pointer select-none",
                      on
                        ? "bg-orange-50 text-orange-700 border border-orange-200"
                        : "text-gray-700 hover:bg-gray-50",
                    ].join(" ")}
                    aria-label={`Go to ${it.label}`}
                  >
                    {it.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
