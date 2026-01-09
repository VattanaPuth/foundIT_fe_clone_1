"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Eye } from "lucide-react";

function handleKeyboardActivate(e: React.KeyboardEvent, onActivate: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

type Range = "All time" | "Last 9 days" | "Last 30 days" | "Last 90 days";

export default function Top({ onOpenUpdate }: { onOpenUpdate: () => void }) {
  const router = useRouter();

  const [range, setRange] = useState<Range>("Last 30 days");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!open) return;
      const el = wrapRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const ranges: Range[] = ["All time", "Last 9 days", "Last 30 days", "Last 90 days"];

  return (
    <section className="w-full">
      {/* Mobile: stack. Desktop: row */}
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        {/* left group */}
        <div className="flex items-start gap-4 min-w-0">
          {/* back */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => router.push("/page/seller/home/myproduct")}
            onKeyDown={(e) =>
              handleKeyboardActivate(e, () =>
                router.push("/page/seller/home/myproduct")
              )
            }
            className="mt-2 h-9 w-9 rounded-lg hover:bg-gray-100 grid place-items-center cursor-pointer select-none text-gray-700"
            aria-label="Back"
          >
            ←
          </div>

          {/* bigger thumbnail */}
          <div className="shrink-0 rounded-2xl overflow-hidden bg-gray-200 h-16 w-16 md:h-20 md:w-20">
            <img
              src="/images/modern.png"
              alt="Product"
              className="h-full w-full object-cover"
            />
          </div>

          {/* title + meta + actions */}
          <div className="min-w-0">
            <div className="text-lg font-semibold leading-snug break-words">
              Modern Dashboard UI Kit - Figma
            </div>

            <div className="mt-1 text-xs text-gray-500 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Design</span>
              <span>·</span>
              <span>UI Kits</span>
              <span>·</span>
              <span>Created Aug 15, 2024</span>
              <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                Active
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {/* Preview Product */}
              <div
                role="button"
                tabIndex={0}
                onClick={() =>
                  router.push(
                    "/page/seller/home/myproduct/productdetail/productpreview"
                  )
                }
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () =>
                    router.push(
                      "/page/seller/home/myproduct/productdetail/productpreview"
                    )
                  )
                }
                className="h-9 px-3 rounded-lg bg-white border border-gray-200 shadow-sm
                           text-sm text-gray-700 inline-flex items-center gap-2
                           cursor-pointer select-none hover:bg-gray-50 hover:border-gray-300 transition"
                aria-label="Preview Product"
              >
                <Eye className="h-4 w-4 text-gray-600" />
                Preview Product
              </div>

              {/* Edit Product (no icon) */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => {}}
                onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
                className="h-9 px-3 rounded-lg bg-white border border-gray-200 shadow-sm
                           text-sm text-gray-700 inline-flex items-center
                           cursor-pointer select-none hover:bg-gray-50 hover:border-gray-300 transition"
                aria-label="Edit Product"
              >
                Edit Product
              </div>

              {/* Update Version */}
              <div
                role="button"
                tabIndex={0}
                onClick={onOpenUpdate}
                onKeyDown={(e) => handleKeyboardActivate(e, onOpenUpdate)}
                className="h-9 px-3 rounded-lg bg-white border border-gray-200 shadow-sm
                           text-sm text-gray-700 inline-flex items-center
                           cursor-pointer select-none hover:bg-gray-50 hover:border-gray-300 transition"
                aria-label="Update Version"
              >
                Update Version
              </div>
            </div>
          </div>
        </div>

        {/* right: date dropdown (full width on mobile so no overflow) */}
        <div ref={wrapRef} className="relative w-full md:w-auto md:shrink-0">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setOpen((v) => !v)}
            onKeyDown={(e) => handleKeyboardActivate(e, () => setOpen((v) => !v))}
            className="h-10 w-full md:w-auto md:min-w-[170px] px-4 rounded-xl bg-white border border-gray-200 shadow-sm
                       text-sm text-gray-700 inline-flex items-center justify-between gap-3
                       cursor-pointer select-none hover:bg-gray-50 hover:border-gray-300 transition"
            aria-label="Date range"
          >
            <span className="truncate">{range}</span>
            <ChevronDown
              className={
                "h-4 w-4 text-gray-500 transition " +
                (open ? "rotate-180" : "rotate-0")
              }
            />
          </div>

          {open ? (
            <div className="absolute right-0 mt-2 w-full md:w-56 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-30">
              {ranges.map((opt, idx) => (
                <div
                  key={opt}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setRange(opt);
                    setOpen(false);
                  }}
                  onKeyDown={(e) =>
                    handleKeyboardActivate(e, () => {
                      setRange(opt);
                      setOpen(false);
                    })
                  }
                  className={
                    "px-4 py-2 text-sm cursor-pointer select-none hover:bg-gray-50 " +
                    (opt === range ? "bg-gray-50 text-gray-900" : "text-gray-800") +
                    (idx === 0 ? "" : "")
                  }
                  aria-label={opt}
                >
                  {opt}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
