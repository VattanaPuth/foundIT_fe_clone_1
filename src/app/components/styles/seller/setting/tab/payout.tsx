"use client";

import React from "react";
import { handleKeyboardActivate } from "@/app/components/styles/seller/setting/utils";

function RightBtn({ label }: { label: string }) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="h-9 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 flex items-center justify-center cursor-pointer select-none hover:bg-gray-50"
      aria-label={label}
      onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
    >
      {label}
    </div>
  );
}

export default function PayoutTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
            <div className="w-4 h-4 flex items-center justify-center text-orange-600 flex-shrink-0">
              ICON
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">Payment & Financial Management</div>
            <div className="text-sm text-gray-500 mt-1">Manage payment methods, payouts, and financial settings</div>
          </div>
        </div>

        <div className="mt-5 border-t border-gray-100" />

        <div className="mt-5">
          <div className="text-sm font-medium text-gray-900">Payment Methods</div>

          <div className="mt-3 rounded-xl border border-gray-200 bg-white p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 flex items-center justify-center text-purple-700 flex-shrink-0">
                  ICON
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Stripe</div>
                <div className="text-xs text-gray-500">Connected</div>
              </div>
              <div className="ml-2 px-2.5 py-1 rounded-full text-[11px] font-medium bg-green-100 text-green-700">
                Active
              </div>
            </div>
            <RightBtn label="Manage" />
          </div>

          <div className="mt-3 rounded-xl border border-gray-200 bg-white h-11 flex items-center justify-center text-sm text-orange-600">
            <div className="w-4 h-4 mr-2 flex items-center justify-center text-orange-600 flex-shrink-0">
              +
            </div>
            Add Bank Transfer
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100" />

        <div className="mt-6">
          <div className="text-sm font-medium text-gray-900">Earnings Summary</div>

          <div className="mt-3 rounded-xl bg-gray-50 border border-gray-200 p-4">
            <div className="flex items-center justify-between text-sm text-gray-600 py-2">
              <div>Total Sales (This Month)</div>
              <div className="text-gray-900">$1,247.00</div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 py-2">
              <div>Platform Fee (10%)</div>
              <div className="text-red-600">-$124.70</div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 py-2">
              <div>Processing Fee</div>
              <div className="text-red-600">-$37.41</div>
            </div>
            <div className="border-t border-gray-200 my-2" />
            <div className="flex items-center justify-between text-sm font-medium py-2">
              <div className="text-gray-900">Net Earnings</div>
              <div className="text-orange-600">$1,084.89</div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100" />

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-900">Recent Transactions</div>
            <div className="text-sm text-gray-500">View All</div>
          </div>

          <div className="mt-3 space-y-3">
            {[
              { title: "Order #12345", time: "2 hours ago", amount: "+$49.00", tone: "text-green-600" },
              { title: "Order #12344", time: "5 hours ago", amount: "+$29.00", tone: "text-green-600" },
              { title: "Payout to Stripe", time: "2 days ago", amount: "-$500.00", tone: "text-gray-600" },
            ].map((r) => (
              <div key={r.title} className="rounded-xl border border-gray-200 bg-white p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">{r.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{r.time}</div>
                </div>
                <div className={"text-sm font-medium " + r.tone}>{r.amount}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100" />

        <div className="mt-6">
          <div className="text-sm font-medium text-gray-900">Downloadable Invoices</div>

          <div className="mt-3 space-y-3">
            {[
              { title: "Invoice - December 2025", meta: "5 sales · $1,247.00" },
              { title: "Invoice - November 2025", meta: "12 sales · $2,894.00" },
            ].map((i) => (
              <div key={i.title} className="rounded-xl border border-gray-200 bg-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 flex items-center justify-center text-orange-600 flex-shrink-0">
                      ICON
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{i.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{i.meta}</div>
                  </div>
                </div>

                <div className="h-9 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">
                    ICON
                  </div>
                  Download
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="h-11 w-fit px-6 rounded-xl bg-orange-500 text-white flex items-center justify-center text-sm font-medium">
            Save Payment Settings
          </div>
        </div>
      </div>
    </div>
  );
}
