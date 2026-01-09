"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { handleKeyboardActivate } from "@/app/components/styles/seller/earning/utils";

type Row = {
  id: string;
  month: string;
  tag?: string;
  orders: string;
  amount: number;
  trend?: string;
  trendDir?: "up" | "down";
  isCurrent?: boolean;
};

function formatMoney(n: number) {
  return `$${n.toLocaleString()}`;
}

function Trend({ dir, text }: { dir: "up" | "down"; text: string }) {
  const cls = dir === "up" ? "text-green-600" : "text-orange-600";
  const icon =
    dir === "up" ? (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2381_15741)">
<path d="M8 3.5H11V6.5" stroke="#E17100" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 3.5L6.75 7.75L4.25 5.25L1 8.5" stroke="#E17100" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2381_15741">
<rect width="12" height="12" fill="white"/>
</clipPath>
</defs>
</svg>


    ) : (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 8.5H1L1 5.5" stroke="#E7000B" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1 8.5L5.25 4.25L7.75 6.75L11 3.5" stroke="#E7000B" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    );

  return (
    <div className={`flex items-center gap-1 text-xs ${cls}`}>
      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      {text}
    </div>
  );
}

export default function Breakdown({ rows }: { rows: Row[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("This Month");
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (wrapRef.current && !wrapRef.current.contains(t)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, []);

  const max = useMemo(() => Math.max(...rows.map((r) => r.amount)), [rows]);

  const opts = ["This Month", "Last 6 Months", "This Year"];

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-orange-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M4 19V5" />
              <path d="M4 19h16" />
              <path d="M7 16V9" />
              <path d="M12 16V7" />
              <path d="M17 16v-5" />
            </svg>
          </div>
          Earnings Breakdown
        </div>

        <div ref={wrapRef} className="relative">
          <div
            role="button"
            tabIndex={0}
            aria-label="Open breakdown filter"
            onClick={() => setOpen((v) => !v)}
            onKeyDown={(e) => handleKeyboardActivate(e, () => setOpen((v) => !v))}
            className="h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700 flex items-center gap-2 cursor-pointer select-none"
          >
            {value}
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
              {open ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              )}
            </div>
          </div>

          {open ? (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              {opts.map((o) => (
                <div
                  key={o}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setValue(o);
                    setOpen(false);
                  }}
                  onKeyDown={(e) =>
                    handleKeyboardActivate(e, () => {
                      setValue(o);
                      setOpen(false);
                    })
                  }
                  className={`px-3 py-2 text-xs cursor-pointer select-none hover:bg-gray-50 ${
                    value === o ? "text-orange-600 font-medium" : "text-gray-700"
                  }`}
                >
                  {o}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {rows.map((r) => {
          const pct = max > 0 ? Math.max(6, Math.round((r.amount / max) * 100)) : 0;

          return (
            <div
              key={r.id}
              className={`rounded-xl border p-4 ${
                r.isCurrent ? "border-orange-200 bg-orange-50/40" : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                        aria-hidden="true"
                      >
                        <path d="M8 2v3" />
                        <path d="M16 2v3" />
                        <path d="M3 9h18" />
                        <path d="M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                      </svg>
                    </div>

                    <div className="text-sm font-medium text-gray-900">{r.month}</div>

                    {r.tag ? (
                      <div className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                        {r.tag}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-1 text-xs text-gray-500">{r.orders}</div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-semibold text-gray-900">
                    {formatMoney(r.amount)}
                  </div>
                  {r.trend && r.trendDir ? (
                    <div className="mt-1 flex justify-end">
                      <Trend dir={r.trendDir} text={r.trend} />
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-3">
                <div className="h-2 rounded-full bg-orange-100 overflow-hidden">
                  <div
                    className="h-full bg-orange-600 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
