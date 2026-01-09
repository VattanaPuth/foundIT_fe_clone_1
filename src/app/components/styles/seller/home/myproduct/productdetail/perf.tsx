"use client";

import React, { useMemo } from "react";
import { Download } from "lucide-react";

function handleKeyboardActivate(e: React.KeyboardEvent, onActivate: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

type FunnelRow = {
  label: string;
  value: number;
  pct?: number; // percent vs views
};

type DayRow = {
  date: string;
  sales: number;
  revenue: number;
};

export default function Perf() {
  const funnel = useMemo<FunnelRow[]>(
    () => [
      { label: "Product Views", value: 3421 },
      { label: "Added to Wishlist", value: 1247, pct: 36.5 },
      { label: "Added to Cart", value: 892, pct: 26.1 },
      { label: "Completed Purchase", value: 247, pct: 7.2 },
    ],
    []
  );

  const days = useMemo<DayRow[]>(
    () => [
      { date: "Nov 1", sales: 8, revenue: 592 },
      { date: "Nov 2", sales: 6, revenue: 444 },
      { date: "Nov 3", sales: 9, revenue: 741 },
      { date: "Nov 4", sales: 7, revenue: 539 },
      { date: "Nov 5", sales: 11, revenue: 989 },
      { date: "Nov 6", sales: 5, revenue: 395 },
      { date: "Nov 7", sales: 8, revenue: 672 },
      { date: "Nov 8", sales: 10, revenue: 840 },
      { date: "Nov 9", sales: 7, revenue: 553 },
      { date: "Nov 10", sales: 9, revenue: 783 },
    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* Conversion Funnel */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <div className="text-sm font-semibold">Conversion Funnel</div>

        <div className="mt-5 space-y-4">
          {funnel.map((r) => {
            const width = r.label === "Product Views" ? 100 : r.pct ?? 0;
            return (
              <div key={r.label}>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-800">{r.label}</div>
                  <div className="text-gray-700">
                    {r.value.toLocaleString()}
                    {typeof r.pct === "number" ? (
                      <span className="text-gray-500"> ({r.pct}%)</span>
                    ) : null}
                  </div>
                </div>

                <div className="mt-2 h-2 rounded-full bg-orange-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-orange-500"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Sales */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm font-semibold">Daily Sales (Last 10 Days)</div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => {}}
            onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
            className="h-9 px-3 rounded-lg bg-white border border-gray-200 shadow-sm
                       text-sm text-gray-800 inline-flex items-center gap-2
                       cursor-pointer select-none hover:bg-gray-50 hover:border-gray-300 transition"
            aria-label="Export"
          >
            <Download className="h-4 w-4 text-gray-600" />
            Export
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {days.map((d) => (
            <div
              key={d.date}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 flex items-center justify-between gap-4"
            >
              <div className="text-sm text-gray-800">{d.date}</div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="text-xs text-gray-500">Sales</div>
                  <div className="mt-1 text-sm text-gray-900">{d.sales}</div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-500">Revenue</div>
                  <div className="mt-1 text-sm font-medium text-orange-600">
                    ${d.revenue.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
