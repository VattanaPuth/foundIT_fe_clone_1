"use client";

import React, { useEffect, useRef, useState } from "react";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

const STATUS = ["All Status", "Active", "Paused", "Draft"] as const;
const SORT = [
  "Most Recent",
  "Highest Revenue",
  "Most Sale",
  "Most View",
] as const;

export default function Filter() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<(typeof STATUS)[number]>("All Status");
  const [sort, setSort] = useState<(typeof SORT)[number]>("Most Recent");

  const [openKey, setOpenKey] = useState<"status" | "sort" | null>(null);

  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!openKey) return;
      const el = wrapRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setOpenKey(null);
      }
    }

    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenKey(null);
    }

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [openKey]);

  return (
    <div ref={wrapRef} className="w-full">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* search */}
        <div className="flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="w-full h-11 rounded-xl bg-white border border-gray-200 px-4 text-sm
                       outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400
                       hover:border-orange-300 transition"
          />
        </div>

        {/* dropdowns */}
        <div className="flex items-center gap-3">
          <Drop
            label={status}
            open={openKey === "status"}
            onToggle={() => setOpenKey(openKey === "status" ? null : "status")}
            items={STATUS as unknown as string[]}
            onPick={(v) => {
              setStatus(v as typeof status);
              setOpenKey(null);
            }}
          />

          <Drop
            label={sort}
            open={openKey === "sort"}
            onToggle={() => setOpenKey(openKey === "sort" ? null : "sort")}
            items={SORT as unknown as string[]}
            onPick={(v) => {
              setSort(v as typeof sort);
              setOpenKey(null);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Drop({
  label,
  open,
  onToggle,
  items,
  onPick,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  items: string[];
  onPick: (v: string) => void;
}) {
  return (
    <div className="relative">
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => handleKeyboardActivate(e, onToggle)}
        className="h-11 min-w-[140px] px-4 rounded-xl bg-white border border-gray-200
                   flex items-center justify-between gap-3 text-sm text-gray-800
                   cursor-pointer select-none hover:border-gray-300 transition"
        aria-label={label}
      >
        <div className="truncate">{label}</div>
        <div className="text-gray-500">{open ? "▴" : "▾"}</div>
      </div>

      {open ? (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-30">
          {items.map((it, idx) => (
            <div
              key={it}
              role="button"
              tabIndex={0}
              onClick={() => onPick(it)}
              onKeyDown={(e) => handleKeyboardActivate(e, () => onPick(it))}
              className={
                "px-4 py-3 text-sm cursor-pointer select-none " +
                (idx === 0 ? "bg-gray-50 text-gray-900" : "text-gray-800") +
                " hover:bg-gray-50"
              }
              aria-label={it}
            >
              {it}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
