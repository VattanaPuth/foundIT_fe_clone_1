"use client";

import React, { useMemo } from "react";
import { DollarSign, Receipt, TrendingUp } from "lucide-react";

function money(n: number) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function money2(n: number) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

type Lic = {
  title: string;
  sales: number;
  price: number;
  gross: number;
};

export default function Revenue() {
  const top = useMemo(
    () => [
      {
        title: "Gross Revenue",
        value: "$18,450",
        sub: "Total sales before fees",
        tone: "orange" as const,
        icon: <DollarSign className="h-4 w-4" />,
      },
      {
        title: "Platform Fees",
        value: "-$2,767.5",
        sub: "15% platform commission",
        tone: "red" as const,
        icon: <Receipt className="h-4 w-4" />,
      },
      {
        title: "Net Earnings",
        value: "$15,682.5",
        sub: "Your actual earnings",
        tone: "green" as const,
        icon: <TrendingUp className="h-4 w-4" />,
      },
    ],
    []
  );

  const lic = useMemo<Lic[]>(
    () => [
      { title: "Personal License", sales: 134, price: 49, gross: 6566 },
      { title: "Commercial License", sales: 89, price: 99, gross: 8811 },
      { title: "Extended License", sales: 24, price: 149, gross: 3576 },
    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* top cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {top.map((c) => (
          <div key={c.title} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm text-gray-700 font-medium">{c.title}</div>
              <div className="text-orange-500">{c.icon}</div>
            </div>

            <div
              className={
                "mt-3 text-lg font-semibold " +
                (c.tone === "orange"
                  ? "text-orange-600"
                  : c.tone === "red"
                  ? "text-red-600"
                  : "text-green-600")
              }
            >
              {c.value}
            </div>

            <div className="mt-2 text-xs text-gray-500">{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Revenue by License Type */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <div className="text-sm font-semibold">Revenue by License Type</div>

        <div className="mt-5 space-y-6">
          {lic.map((x) => {
            const fee = x.gross * 0.15;
            const net = x.gross - fee;

            return (
              <div key={x.title} className="space-y-3">
                {/* header row */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{x.title}</div>
                    <div className="mt-1 text-xs text-gray-500">
                      {x.sales} sales × ${x.price}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">${money(x.gross)}</div>
                    <div className="mt-1 text-xs text-gray-500">
                      Net: <span className="text-gray-700">${money2(net)}</span>
                    </div>
                  </div>
                </div>

                {/* inner breakdown */}
                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-gray-500">Gross</div>
                      <div className="mt-2 text-sm font-medium text-gray-900">
                        ${money(x.gross)}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">Fees (15%)</div>
                      <div className="mt-2 text-sm font-medium text-red-600">
                        -${money2(fee)}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">Net</div>
                      <div className="mt-2 text-sm font-medium text-green-600">
                        ${money2(net)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
