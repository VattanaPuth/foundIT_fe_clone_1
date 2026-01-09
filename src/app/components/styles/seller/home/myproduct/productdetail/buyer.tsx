"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Download, Search, Star } from "lucide-react";

function handleKeyboardActivate(e: React.KeyboardEvent, onActivate: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

type LicenseType = "Commercial" | "Personal" | "Extended";
type BuyerItem = {
  id: string;
  name: string;
  license: LicenseType;
  date: string; // "Nov 28, 2024"
  location: string;
  amount: number;
  rating?: number; // undefined = no rating
};

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  const a = parts[0]?.[0] ?? "U";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

export default function Buyer() {
  const all = useMemo<BuyerItem[]>(
    () => [
      { id: "1", name: "Sarah Johnson", license: "Commercial", date: "Nov 28, 2024", location: "United States", amount: 99, rating: 5 },
      { id: "2", name: "Michael Chen", license: "Personal", date: "Nov 27, 2024", location: "Canada", amount: 49 },
      { id: "3", name: "Emily Rodriguez", license: "Extended", date: "Nov 26, 2024", location: "United Kingdom", amount: 149, rating: 5 },
      { id: "4", name: "David Park", license: "Commercial", date: "Nov 25, 2024", location: "Australia", amount: 99, rating: 4 },
      { id: "5", name: "Lisa Anderson", license: "Personal", date: "Nov 24, 2024", location: "Germany", amount: 49 },
      { id: "6", name: "James Wilson", license: "Personal", date: "Nov 23, 2024", location: "United States", amount: 49, rating: 5 },
      { id: "7", name: "Nina Patel", license: "Commercial", date: "Nov 22, 2024", location: "India", amount: 99, rating: 5 },
      { id: "8", name: "Robert Taylor", license: "Personal", date: "Nov 21, 2024", location: "Netherlands", amount: 49, rating: 4 },
      // 9th (for Next page)
      { id: "9", name: "Sophia Nguyen", license: "Extended", date: "Nov 20, 2024", location: "Singapore", amount: 149 },
    ],
    []
  );

  const [q, setQ] = useState(""); // static for now
  const [type, setType] = useState<"All Type" | LicenseType>("All Type");
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

  const pageSize = 8;
  const [page, setPage] = useState(0); // 0 -> first 8, 1 -> last 1
  const total = all.length;
  const pageCount = Math.ceil(total / pageSize);

  const start = page * pageSize;
  const end = Math.min(start + pageSize, total);
  const view = all.slice(start, end);

  const canPrev = page > 0;
  const canNext = page < pageCount - 1;

  return (
    <div className="space-y-4">
      {/* top controls */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 md:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* search */}
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search buyers by name..."
              className="w-full h-11 pl-10 pr-3 rounded-xl bg-gray-50 border border-gray-200 text-sm
                         outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400
                         hover:border-orange-300 transition"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* type dropdown */}
            <div ref={wrapRef} className="relative">
              <div
                role="button"
                tabIndex={0}
                onClick={() => setOpen((v) => !v)}
                onKeyDown={(e) => handleKeyboardActivate(e, () => setOpen((v) => !v))}
                className="h-11 min-w-[150px] px-4 rounded-xl bg-white border border-gray-200 shadow-sm
                           text-sm text-gray-700 inline-flex items-center justify-between gap-3
                           cursor-pointer select-none hover:bg-gray-50 hover:border-gray-300 transition"
                aria-label="All Type"
              >
                <span className="truncate">{type}</span>
                <ChevronDown
                  className={
                    "h-4 w-4 text-gray-500 transition " +
                    (open ? "rotate-180" : "rotate-0")
                  }
                />
              </div>

              {open ? (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-30">
                  {(["All Type", "Commercial", "Personal", "Extended"] as const).map((opt) => (
                    <div
                      key={opt}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setType(opt);
                        setOpen(false);
                      }}
                      onKeyDown={(e) =>
                        handleKeyboardActivate(e, () => {
                          setType(opt);
                          setOpen(false);
                        })
                      }
                      className={
                        "px-4 py-2 text-sm cursor-pointer select-none hover:bg-gray-50 " +
                        (opt === type ? "bg-gray-50 text-gray-900" : "text-gray-800")
                      }
                      aria-label={opt}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {/* export csv */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => {}}
              onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
              className="h-11 px-4 rounded-xl bg-white border border-gray-200 shadow-sm
                         text-sm text-gray-800 inline-flex items-center gap-2
                         cursor-pointer select-none hover:bg-gray-50 hover:border-gray-300 transition"
              aria-label="Export CSV"
            >
              <Download className="h-4 w-4 text-gray-600" />
              Export CSV
            </div>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[980px]">
            {/* header row */}
            <div className="grid grid-cols-[280px_160px_190px_220px_110px_110px_140px] px-4 py-3 text-xs text-gray-500 border-b border-gray-100">
              <div>Buyer</div>
              <div>License</div>
              <div>Purchase Date</div>
              <div>Location</div>
              <div>Amount</div>
              <div>Rating</div>
              <div>Actions</div>
            </div>

            {/* rows */}
            {view.map((b) => (
              <div
                key={b.id}
                className="grid grid-cols-[280px_160px_190px_220px_110px_110px_140px] px-4 py-3 text-sm border-b border-gray-100 last:border-b-0"
              >
                {/* buyer */}
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gray-100 border border-gray-200 grid place-items-center text-xs font-semibold text-gray-700">
                    {initials(b.name)}
                  </div>
                  <div className="text-gray-900">{b.name}</div>
                </div>

                {/* license */}
                <div>
                  <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs border border-gray-200 bg-white text-gray-700">
                    {b.license}
                  </div>
                </div>

                {/* date */}
                <div className="text-gray-700">{b.date}</div>

                {/* location */}
                <div className="text-gray-700">{b.location}</div>

                {/* amount */}
                <div className="text-gray-900 font-medium">${b.amount}</div>

                {/* rating (star + number only) */}
                <div className="text-gray-700">
                  {typeof b.rating === "number" ? (
                    <div className="inline-flex items-center gap-1">
                      <Star className="h-4 w-4 text-orange-500" fill="currentColor" />
                      <span className="font-medium text-gray-900">{b.rating}</span>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-xs">No rating</span>
                  )}
                </div>

                {/* actions */}
                <div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {}}
                    onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
                    className="inline-flex items-center h-9 px-3 rounded-lg border border-gray-200 bg-white
                               cursor-pointer select-none hover:bg-gray-50 hover:border-gray-300 transition text-sm"
                    aria-label="View Details"
                  >
                    View Details
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* footer */}
        <div className="px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-sm">
          <div className="text-gray-500">
            Showing {end - start} of {total} buyers
          </div>

          <div className="flex items-center gap-2 justify-end">
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                if (canPrev) setPage((p) => p - 1);
              }}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => {
                  if (canPrev) setPage((p) => p - 1);
                })
              }
              className={
                "h-9 px-3 rounded-lg border text-sm select-none flex items-center " +
                (canPrev
                  ? "bg-white border-gray-200 cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition"
                  : "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed")
              }
              aria-label="Previous"
            >
              Previous
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                if (canNext) setPage((p) => p + 1);
              }}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => {
                  if (canNext) setPage((p) => p + 1);
                })
              }
              className={
                "h-9 px-3 rounded-lg border text-sm select-none flex items-center " +
                (canNext
                  ? "bg-white border-gray-200 cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition"
                  : "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed")
              }
              aria-label="Next"
            >
              Next
            </div>
          </div>
        </div>
      </div>

      {/* note: filter/search is UI only for now */}
    </div>
  );
}
