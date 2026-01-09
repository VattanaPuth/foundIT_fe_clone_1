"use client";

import React, { useEffect } from "react";
import { handleKeyboardActivate } from "@/app/components/styles/client_styles/profile-edit/FormControls";

type SectionKey =
  | "overview"
  | "about"
  | "hiring"
  | "jobs"
  | "reviews"
  | "links";

export default function ProfileEditSectionNav({
  sections,
  activeSection,
  isMobileOpen,
  onOpenMobile,
  onCloseMobile,
  onGoToSection,
  topOffset,
}: {
  sections: { key: SectionKey; label: string }[];
  activeSection: SectionKey;
  isMobileOpen: boolean;
  onOpenMobile: () => void;
  onCloseMobile: () => void;
  onGoToSection: (key: SectionKey) => void;
  topOffset: number;
}) {
  // ESC closes mobile menu
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCloseMobile();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCloseMobile]);

  return (
    <>
      {/* Mobile hamburger */}
      <div className="mb-4 flex items-center justify-end lg:hidden">
        <div
          role="button"
          tabIndex={0}
          aria-label="Open sections menu"
          onClick={onOpenMobile}
          onKeyDown={(e) => handleKeyboardActivate(e, onOpenMobile)}
          className="h-10 w-12 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 cursor-pointer select-none flex items-center justify-center"
        >
          ☰
        </div>
      </div>

      {/* Mobile drawer */}
      {isMobileOpen ? (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/30" onClick={onCloseMobile} />

          <div className="absolute left-0 top-0 h-full w-[75%] max-w-xs bg-white border-r border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-gray-900">Menu</div>
              <div
                role="button"
                tabIndex={0}
                aria-label="Close menu"
                onClick={onCloseMobile}
                onKeyDown={(e) => handleKeyboardActivate(e, onCloseMobile)}
                className="h-9 w-9 rounded-md border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center cursor-pointer select-none"
              >
                ✕
              </div>
            </div>

            <div className="mt-4 space-y-1">
              {sections.map((s) => {
                const active = activeSection === s.key;
                return (
                  <div
                    key={s.key}
                    role="button"
                    tabIndex={0}
                    aria-label={`Go to ${s.label}`}
                    onClick={() => {
                      onCloseMobile();
                      onGoToSection(s.key);
                    }}
                    onKeyDown={(e) =>
                      handleKeyboardActivate(e, () => {
                        onCloseMobile();
                        onGoToSection(s.key);
                      })
                    }
                    className={[
                      "px-3 py-2 rounded-md text-sm cursor-pointer select-none",
                      active
                        ? "bg-gray-100 text-gray-900"
                        : "hover:bg-gray-50 text-gray-700",
                    ].join(" ")}
                  >
                    {s.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      {/* Desktop sticky sidebar (offset below header) */}
      <aside
        className="hidden lg:block lg:sticky lg:self-start h-fit"
        style={{ top: topOffset }}
      >
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2">
          {sections.map((s) => {
            const active = activeSection === s.key;
            return (
              <div
                key={s.key}
                role="button"
                tabIndex={0}
                aria-label={`Go to ${s.label}`}
                onClick={() => onGoToSection(s.key)}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () => onGoToSection(s.key))
                }
                className={[
                  "px-3 py-2 rounded-md text-sm cursor-pointer select-none",
                  active
                    ? "bg-gray-100 text-gray-900"
                    : "hover:bg-gray-50 text-gray-700",
                ].join(" ")}
              >
                {s.label}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
