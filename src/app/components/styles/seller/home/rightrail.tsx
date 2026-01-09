"use client";

import React, { useMemo } from "react";
import {
  MiniWarnIcon,
  MiniDocIcon,
  MiniInfoIcon,
  MiniCameraIcon,
  MiniTagIcon,
  MiniSearchIcon,
  MiniBoltIcon,
} from "@/app/components/styles/seller/icons";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function SupportRow({
  label,
  icon,
  rightBadge,
}: {
  label: string;
  icon: React.ReactNode;
  rightBadge?: string;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {}}
      onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
      className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3
                 hover:bg-gray-50 hover:border-gray-300 transition cursor-pointer select-none"
      aria-label={label}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-9 w-9 shrink-0 rounded-lg bg-gray-50 border border-gray-200 grid place-items-center text-orange-600">
          {icon}
        </div>
        <div className="text-sm text-gray-800 truncate">{label}</div>
      </div>

      {rightBadge ? (
        <div className="h-6 min-w-[28px] px-2 rounded-full bg-gray-100 text-xs text-gray-700 grid place-items-center">
          {rightBadge}
        </div>
      ) : (
        <div className="text-gray-300">›</div>
      )}
    </div>
  );
}

export default function SellerRightRail() {
  const tips = useMemo(
    () => [
      {
        id: "t1",
        icon: <MiniCameraIcon />,
        text: "Add high-quality screenshots to increase conversions by up to 40%",
      },
      {
        id: "t2",
        icon: <MiniTagIcon />,
        text: "Products priced between $49-$99 see the highest conversion rates",
      },
      {
        id: "t3",
        icon: <MiniSearchIcon />,
        text: 'Use specific keywords in titles - "Figma UI Kit" performs better than "Design Kit"',
      },
      {
        id: "t4",
        icon: <MiniBoltIcon />,
        text: "Respond to buyer questions within 24h to maintain high seller rating",
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* Payouts */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="text-sm font-semibold">Payouts</div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => {}}
            onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
            className="text-sm text-gray-600 hover:text-orange-600 cursor-pointer select-none"
            aria-label="View payouts"
          >
            View All
          </div>
        </div>

        <div className="px-5 pb-5">
          <div className="text-xs text-gray-500">Available Balance</div>
          <div className="mt-1 text-orange-600 font-semibold">$3,240.00</div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">Pending</div>
              <div className="mt-1 text-sm font-semibold">$1,850.00</div>
              <div className="mt-1 text-xs text-gray-400">Clears in 5 days</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Next Payout</div>
              <div className="mt-1 text-sm font-semibold">$3,240.00</div>
              <div className="mt-1 text-xs text-gray-400">Nov 15, 2024</div>
            </div>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => {}}
            onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
            className="mt-4 h-10 rounded-lg border border-gray-200 bg-white
                       flex items-center justify-center gap-2 text-sm text-gray-800
                       cursor-pointer select-none hover:bg-gray-50 hover:border-gray-300 transition"
            aria-label="Withdraw funds"
          >
            <span className="text-gray-700">$</span>
            Withdraw Funds
          </div>
        </div>
      </div>

      {/* Seller Level */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="text-sm font-semibold">Seller Level</div>

          <div className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-orange-700 flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
            Level 2
          </div>
        </div>

        <div className="px-5 pb-5">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">Health Score</div>
            <div className="text-xs font-semibold text-green-600">Excellent</div>
          </div>

          <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full w-[82%] bg-orange-500 rounded-full" />
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <div className="text-gray-600">Response rate</div>
              <div className="font-semibold">98%</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-gray-600">Order completion</div>
              <div className="font-semibold">99%</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-gray-600">Rating</div>
              <div className="font-semibold">4.9/5.0</div>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500 flex items-start gap-2">
            <span className="text-orange-500 mt-[1px]">💡</span>
            Tip: Maintain 95%+ response rate to reach Level 3
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="px-5 py-4">
          <div className="text-sm font-semibold">Tips to Improve</div>
        </div>

        <div className="px-5 pb-5 space-y-3">
          {tips.map((t) => (
            <div
              key={t.id}
              className="rounded-xl border border-yellow-100 bg-yellow-50 p-4 flex gap-3"
            >
              <div className="h-9 w-9 shrink-0 rounded-lg bg-white border border-yellow-100 grid place-items-center text-orange-600">
                {t.icon}
              </div>
              <div className="text-sm text-gray-700 leading-snug">{t.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Support */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="px-5 py-4">
          <div className="text-sm font-semibold">Support &amp; Safety</div>
        </div>

        <div className="px-5 pb-5 space-y-2">
          <SupportRow label="Refund Requests" rightBadge="0" icon={<MiniWarnIcon />} />
          <SupportRow label="Policy Center" icon={<MiniDocIcon />} />
          <SupportRow label="Help & Resources" icon={<MiniInfoIcon />} />
        </div>
      </div>
    </div>
  );
}
