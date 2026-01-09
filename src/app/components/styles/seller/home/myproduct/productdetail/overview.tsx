"use client";

import React, { useMemo } from "react";
import { Box, Globe, Heart, Receipt, ShoppingCart } from "lucide-react";

function Mini({
  title,
  value,
  sub,
  icon,
}: {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-orange-500">{icon}</div>
      </div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
      <div className="mt-2 text-xs text-gray-500">{sub}</div>
    </div>
  );
}

export default function Overview() {
  const licenseRows = useMemo(
    () => [
      { name: "Personal", price: "$49", pctText: "54% of total revenue", bar: 54, sales: "134 sales", amount: "$6,566" },
      { name: "Commercial", price: "$99", pctText: "36% of total revenue", bar: 36, sales: "89 sales", amount: "$8,811" },
      { name: "Extended", price: "$149", pctText: "10% of total revenue", bar: 10, sales: "24 sales", amount: "$3,576" },
    ],
    []
  );

  const countries = useMemo(
    () => [
      { name: "United States", buyers: 98, pct: 40 },
      { name: "United Kingdom", buyers: 52, pct: 21 },
      { name: "Canada", buyers: 37, pct: 15 },
      { name: "Australia", buyers: 27, pct: 11 },
      { name: "Germany", buyers: 18, pct: 7 },
      { name: "Others", buyers: 15, pct: 6 },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* License */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">License Distribution</div>
            <div className="text-gray-400">
              <Box className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-5 space-y-6">
            {licenseRows.map((r) => (
              <div key={r.name}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-900">{r.name}</div>
                    <div className="px-2 py-0.5 rounded-full text-xs border border-gray-200 bg-white text-gray-700">
                      {r.price}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-gray-500">{r.sales}</div>
                    <div className="text-gray-900 font-semibold">{r.amount}</div>
                  </div>
                </div>

                <div className="mt-2 h-2 rounded-full bg-orange-100 overflow-hidden">
                  <div className="h-full rounded-full bg-orange-500" style={{ width: `${r.bar}%` }} />
                </div>

                <div className="mt-2 text-xs text-gray-500">{r.pctText}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Countries */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Top Countries</div>
            <div className="text-gray-400">
              <Globe className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {countries.map((c) => (
              <div key={c.name} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-full bg-orange-50 border border-orange-100 grid place-items-center text-orange-600 shrink-0">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-gray-900 truncate">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.buyers} buyers</div>
                  </div>
                </div>

                <div className="w-[140px] shrink-0">
                  <div className="flex items-center justify-end text-sm text-gray-700">{c.pct}%</div>
                  <div className="mt-2 h-2 rounded-full bg-orange-100 overflow-hidden">
                    <div className="h-full rounded-full bg-orange-500" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Mini title="Added to Cart" value="892" sub="Cart conversion: 27.7%" icon={<ShoppingCart className="h-4 w-4" />} />
        <Mini title="Wishlist Adds" value="1247" sub="Wishlist conversion: 19.8%" icon={<Heart className="h-4 w-4" />} />
        <Mini title="Platform Fees" value="$2,767.5" sub="15% of gross revenue" icon={<Receipt className="h-4 w-4" />} />
      </div>
    </div>
  );
}
