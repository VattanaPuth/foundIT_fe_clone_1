"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { ProductItem } from "@/app/components/styles/seller/home/myproduct/mock";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function fmt(n: number) {
  return n.toLocaleString();
}

export default function Card({ item }: { item: ProductItem }) {
  const router = useRouter();
  const canGo = item.id === "modern";
  if (item.status === "Draft") {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
        <div className="relative">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-40 object-cover"
          />

          <div className="absolute left-3 top-3">
            <div className="px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 bg-gray-100 text-gray-700">
              <span className="h-2 w-2 rounded-full bg-gray-400" />
              Draft
            </div>
          </div>

          <div className="absolute right-3 top-3">
            <div className="h-9 w-9 rounded-lg bg-white/90 border border-gray-200 grid place-items-center text-gray-700">
              ⋮
            </div>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="text-sm font-semibold leading-snug">{item.title}</div>
          <div className="mt-2 text-xs text-gray-500">
            {item.cateLeft} <span className="mx-1">·</span> {item.cateRight}
          </div>

          <div className="mt-6 flex-1 flex flex-col items-center justify-center text-center">
            {/* If you have an edit/pencil icon in seller/icons.tsx, use it here.
              If not, tell me the icon names you have and I’ll pick one. */}
            <div className="h-12 w-12 rounded-xl border border-gray-200 bg-gray-50 grid place-items-center text-gray-700">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 4H6.66667C5.95942 4 5.28115 4.28095 4.78105 4.78105C4.28095 5.28115 4 5.95942 4 6.66667V25.3333C4 26.0406 4.28095 26.7189 4.78105 27.219C5.28115 27.719 5.95942 28 6.66667 28H25.3333C26.0406 28 26.7189 27.719 27.219 27.219C27.719 26.7189 28 26.0406 28 25.3333V16" stroke="#717182" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24.4988 3.5003C25.0293 2.96987 25.7487 2.67188 26.4988 2.67188C27.249 2.67188 27.9684 2.96987 28.4988 3.5003C29.0293 4.03073 29.3272 4.75016 29.3272 5.5003C29.3272 6.25045 29.0293 6.96987 28.4988 7.5003L16.4815 19.519C16.1649 19.8353 15.7738 20.0669 15.3442 20.1923L11.5135 21.3123C11.3988 21.3458 11.2771 21.3478 11.1614 21.3181C11.0456 21.2884 10.9399 21.2282 10.8554 21.1437C10.7709 21.0592 10.7107 20.9535 10.681 20.8378C10.6514 20.722 10.6534 20.6004 10.6868 20.4856L11.8068 16.655C11.9329 16.2257 12.1649 15.835 12.4815 15.519L24.4988 3.5003Z" stroke="#717182" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
            <div className="mt-3 text-xs text-gray-500">
              Complete your product setup
            </div>

            <div className="mt-3 h-10 w-full rounded-lg border border-gray-200 bg-white grid place-items-center text-sm text-gray-700">
              Continue Editing
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (item.status === "Pending") {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
        <div className="relative">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-40 object-cover"
          />

          <div className="absolute left-3 top-3">
            <div className="px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 bg-blue-100 text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Pending
            </div>
          </div>

          <div className="absolute right-3 top-3">
            <div className="h-9 w-9 rounded-lg bg-white/90 border border-gray-200 grid place-items-center text-gray-700">
              ⋮
            </div>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="text-sm font-semibold leading-snug">{item.title}</div>
          <div className="mt-2 text-xs text-gray-500">
            {item.cateLeft} <span className="mx-1">·</span> {item.cateRight}
          </div>

          <div className="mt-6 flex-1 flex flex-col items-center justify-center text-center">
            {/* You already have MiniInfoIcon in seller/icons.tsx (if yes use it here) */}
            <div className="h-12 w-12 rounded-xl border border-gray-200 bg-white grid place-items-center text-blue-600">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.0013 29.3346C23.3651 29.3346 29.3346 23.3651 29.3346 16.0013C29.3346 8.63751 23.3651 2.66797 16.0013 2.66797C8.63751 2.66797 2.66797 8.63751 2.66797 16.0013C2.66797 23.3651 8.63751 29.3346 16.0013 29.3346Z" stroke="#155DFC" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 10.668V16.0013" stroke="#155DFC" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 21.332H16.0133" stroke="#155DFC" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>

            <div className="mt-3 text-sm font-semibold text-gray-900">
              Under Review
            </div>
            <div className="mt-1 text-xs text-gray-500 max-w-[240px]">
              Your product is being reviewed by our team. This usually takes
              24-48 hours.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const goDetail = () => {
    if (!canGo) return;
    router.push("/page/seller/home/myproduct/productdetail");
  };

  const badge = badgeStyle(item.status);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
      {/* image */}
      <div className="relative">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-40 object-cover"
        />

        {/* status pill */}
        <div className="absolute left-3 top-3">
          <div
            className={
              "px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 " +
              badge.cls
            }
          >
            <span className={"h-2 w-2 rounded-full " + badge.dot} />
            {item.status}
          </div>
        </div>

        {/* 3 dots (UI only) */}
        <div className="absolute right-3 top-3">
          <div
            role="button"
            tabIndex={0}
            onClick={() => {}}
            onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
            className="h-9 w-9 rounded-lg bg-white/90 border border-gray-200 grid place-items-center
                       text-gray-700 cursor-pointer select-none hover:bg-white transition"
            aria-label="Menu"
          >
            ⋮
          </div>
        </div>
      </div>

      {/* content */}
      <div className="p-4 flex-1 flex flex-col">
        <div
          role={canGo ? "button" : undefined}
          tabIndex={canGo ? 0 : undefined}
          onClick={goDetail}
          onKeyDown={(e) => handleKeyboardActivate(e, goDetail)}
          className={
            "text-sm font-semibold leading-snug " +
            (canGo ? "cursor-pointer hover:text-orange-600" : "")
          }
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 40, // keeps all cards aligned even if 1-line title
          }}
          aria-label={item.title}
        >
          {item.title}
        </div>

        <div className="mt-2 text-xs text-gray-500">
          {item.cateLeft} <span className="mx-1">·</span> {item.cateRight}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
          {/* row 1 */}
          <div className="text-xs text-gray-500">Price Range</div>

          <div className="flex items-center justify-end gap-2 text-xs text-gray-500">
            <span className="text-orange-500">★</span>
            <span className="text-gray-900 font-medium">{item.rating}</span>
          </div>

          {/* row 2 */}
          <div className="text-sm font-semibold">{item.price}</div>

          <div className="text-xs text-gray-500 text-right">
            {item.reviews} reviews
          </div>
        </div>
<hr></hr>
        {/* metrics */}
        <div className="mt-1 flex items-start justify-between text-xs">
          {/* left */}
          <div className="min-w-[72px]">
            <div className="text-gray-500">Sales</div>
            <div className="mt-1 text-gray-900 font-semibold">
              {fmt(item.sales)}
            </div>
          </div>

          {/* middle (centered) */}
          <div className="text-center">
            <div className="text-gray-500">Revenue</div>
            <div className="mt-1 text-gray-900 font-semibold">
              {item.revenue}
            </div>
          </div>

          {/* right */}
          <div className="min-w-[72px] text-right">
            <div className="text-gray-500">Conv.</div>
            <div className="mt-1 text-gray-900 font-semibold">{item.conv}</div>
          </div>
        </div>

        {/* performance */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <div className="text-gray-500">Performance</div>
            <div
              className={
                "font-medium " +
                (item.perfLabel === "Excellent"
                  ? "text-orange-600"
                  : "text-orange-500")
              }
            >
              {item.perfLabel}
            </div>
          </div>

          <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full bg-orange-500 rounded-full"
              style={{ width: `${item.perfPct}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <div>{fmt(item.views)} views</div>
            <div>{item.updated}</div>
          </div>
        </div>

        {/* action */}
        <div className="mt-auto pt-4">
          <div
            role={canGo ? "button" : undefined}
            tabIndex={canGo ? 0 : undefined}
            onClick={goDetail}
            onKeyDown={(e) => handleKeyboardActivate(e, goDetail)}
            className={
              "h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center gap-2 text-sm " +
              (canGo
                ? "cursor-pointer select-none hover:bg-gray-50 hover:border-gray-300 transition"
                : "text-gray-400")
            }
            aria-label="View Analytics"
          >
            {/* use your existing analytics icon if you have one */}
            <span className="text-gray-600"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 2V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H14" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 11.3333V6" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.66797 11.332V3.33203" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.33203 11.332V9.33203" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
            View Analytics
          </div>
        </div>
      </div>
    </div>
  );
}

function badgeStyle(status: ProductItem["status"]) {
  if (status === "Active") {
    return { cls: "bg-green-100 text-green-700", dot: "bg-green-500" };
  }
  if (status === "Paused") {
    return { cls: "bg-yellow-100 text-yellow-800", dot: "bg-yellow-500" };
  }
  if (status === "Draft") {
    return { cls: "bg-gray-100 text-gray-700", dot: "bg-gray-400" };
  }
  return { cls: "bg-blue-100 text-blue-700", dot: "bg-blue-500" };
}
