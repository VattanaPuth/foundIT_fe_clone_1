"use client";

import React, { useState } from "react";
import { Card, Input, handleKeyboardActivate } from "@/app/components/styles/seller/createproduct/ui";

function BenefitRow({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-white px-3 py-2">
      <div className="text-sm text-gray-700">{text}</div>
      <div className="text-gray-300">×</div>
    </div>
  );
}

export default function Pricing() {
  const [pPrice, setPPrice] = useState("29");
  const [cPrice, setCPrice] = useState("79");

  return (
    <Card
      title="Pricing"
      subtitle="Set up pricing tiers and usage rights"
      icon={
        <svg
          className="h-5 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 1v22" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      }
    >
      <div className="space-y-4">
        {/* Personal */}
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-md font-semibold text-gray-900">Personal License</div>
              <div className="mt-1 text-sm text-gray-600">For individual, non-commercial use</div>
            </div>
            <div className="px-2 py-1 rounded-full text-[11px] bg-orange-100 text-orange-700 border border-orange-200">
              Recommended
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <BenefitRow text="Use in personal projects" />
            <BenefitRow text="Single end product" />
            <BenefitRow text="Free updates for 6 months" />
            <BenefitRow text="No commercial use" />
          </div>

          <div className="mt-4">
            <div className="text-sm text-gray-600">Price ($) *</div>
            <div className="mt-2">
              <input
                value={pPrice}
                onChange={(e) => setPPrice(e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-white border border-gray-200 text-sm
                           outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                           hover:border-gray-300 transition"
              />
            </div>
          </div>

          <div className="mt-3 text-sm text-orange-700 cursor-pointer select-none">+ Add benefit</div>
        </div>

        {/* Commercial */}
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
          <div>
            <div className="text-md font-semibold text-gray-900">Commercial</div>
            <div className="mt-1 text-sm text-gray-600">For business projects and client work</div>
          </div>

          <div className="mt-4 space-y-2">
            <BenefitRow text="Use in commercial projects" />
            <BenefitRow text="Use for client work" />
            <BenefitRow text="Multiple end products" />
            <BenefitRow text="Free updates for 12 months" />
            <BenefitRow text="No SaaS/resale rights" />
          </div>

          <div className="mt-4">
            <div className="text-sm text-gray-600">Price ($) *</div>
            <div className="mt-2">
              <input
                value={cPrice}
                onChange={(e) => setCPrice(e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-white border border-gray-200 text-sm
                           outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                           hover:border-gray-300 transition"
              />
            </div>
          </div>

          <div className="mt-3 text-sm text-orange-700 cursor-pointer select-none">+ Add benefit</div>
        </div>

        {/* Extended (disabled block UI) */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 opacity-70">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-gray-900">Extended</div>
              <div className="mt-1 text-sm text-gray-600">
                Unlimited usage rights for SaaS/products
              </div>
            </div>
            {/* button */}
            <div className="h-6 w-10 rounded-full bg-gray-200 relative">
              <div className="h-5 w-5 rounded-full bg-white absolute left-1 top-0.5 border border-gray-200" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          Products priced between $29-$99 see the highest conversion rates. Consider offering multiple tiers.
        </div>
      </div>
    </Card>
  );
}
