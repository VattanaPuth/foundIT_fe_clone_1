"use client";

import React from "react";
import { useRouter } from "next/navigation";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function formatMoney(n: number) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 0 });
}

type OrderStatus = "Delivered" | "New" | "Completed";

export default function SellerRecentOrders({
  items,
}: {
  items: {
    id: string;
    title: string;
    status: OrderStatus;
    user: string;
    date: string;
    price: number;
    action: string;
  }[];
}) {
  const router = useRouter();

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="text-sm font-semibold">Recent Orders</div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => router.push("#")}
          onKeyDown={(e) => handleKeyboardActivate(e, () => router.push("#"))}
          className="h-9 px-3 rounded-lg bg-white border border-gray-200 text-sm text-gray-700
                     flex items-center cursor-pointer select-none
                     hover:bg-gray-50 hover:border-gray-300 transition"
          aria-label="View All recent orders"
        >
          View All
        </div>
      </div>

      <div className="px-5 pb-4 divide-y">
        {items.map((o) => (
          <div
            key={o.id}
            className="py-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="text-sm font-medium">{o.title}</div>

                <div
                  className={
                    "px-2 py-0.5 rounded-full text-xs " +
                    (o.status === "New"
                      ? "bg-orange-100 text-orange-700"
                      : o.status === "Delivered"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-green-100 text-green-700")
                  }
                >
                  {o.status}
                </div>
              </div>

              <div className="mt-1 text-xs text-gray-500">
                {o.user} · Order #{o.id} · {o.date}
              </div>
            </div>

            <div className="shrink-0 sm:text-right">
              <div className="text-sm font-semibold">
                ${formatMoney(o.price)}
              </div>

              <div
                role="button"
                tabIndex={0}
                onClick={() => router.push("#")}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () => router.push("#"))
                }
                className="mt-1 text-xs text-orange-600 hover:text-orange-700 cursor-pointer select-none inline-flex"
                aria-label={`${o.action} order ${o.id}`}
              >
                {o.action}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
