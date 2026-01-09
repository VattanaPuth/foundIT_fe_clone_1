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

export default function Also() {
  const router = useRouter();

  const items = [
    { id: "a1", title: "Analytics Dashboard Kit", price: "$39", imgSrc: "/images/p3.png" },
    { id: "a2", title: "Marketing Landing Page", price: "$19", imgSrc: "/images/p2.png" },
    {
      id: "a3",
      title: "Component Library Pro",
      price: "$79",
      imgSrc: "/images/p1.png",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
      <div className="text-sm font-semibold text-gray-900">
        Customer Also Bought
      </div>

      <div className="mt-3 space-y-3">
        {items.map((it) => (
          <div
            key={it.id}
            role="button"
            tabIndex={0}
            onClick={() => router.push("/page/seller/home/myproduct")}
            onKeyDown={(e) =>
              handleKeyboardActivate(e, () =>
                router.push("/page/seller/home/myproduct")
              )
            }
            className="rounded-lg border border-gray-200 hover:bg-gray-50 p-3 flex items-center gap-3 select-none"
            aria-label={`Open ${it.title}`}
          >
            <div className="h-10 w-10 rounded-md bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
              <img
                src={it.imgSrc}
                alt={it.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-gray-900 truncate">
                {it.title}
              </div>
              <div className="mt-1 text-xs text-gray-500">UI kit</div>
            </div>

            <div className="text-sm font-semibold text-gray-900">
              {it.price}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <div
          role="button"
          tabIndex={0}
          onClick={() => router.push("/page/seller/home/myproduct")}
          onKeyDown={(e) =>
            handleKeyboardActivate(e, () =>
              router.push("/page/seller/home/myproduct")
            )
          }
          className="h-10 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-900 flex items-center justify-center select-none"
          aria-label="Browse more"
        >
          Browse More
        </div>
      </div>
    </div>
  );
}
