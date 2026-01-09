"use client";

import React from "react";
import { IconStar } from "../../admin/Icon";

function handleKeyboardActivate(e: React.KeyboardEvent, onActivate: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export default function Sellerbox() {
  const seller = {
    name: "Sarah Chen",
    role: "Seller",
    rating: "4.9",
    sold: "2,341 sold",
    respond: "Respond in 2 hour",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
      <div className="text-sm font-semibold text-gray-900">About the Seller</div>

      <div className="mt-3 flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-sm font-semibold text-orange-700">
          <img className="rounded-full" src="/images/sellerbox.png" alt="" />
        </div>

        <div className="min-w-0">
          <div className="text-sm font-semibold text-gray-900">{seller.name}</div>
          <div className="mt-1 text-xs text-gray-500 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-orange-500">
                <IconStar/>
              </div>
              <div className="text-gray-900 font-medium">{seller.rating}</div>
            </div>
            <div>•</div>
            <div>{seller.sold}</div>
            <div>•</div>
            <div>{seller.respond}</div>
          </div>

          <div className="mt-3">
            <div
              role="button"
              tabIndex={0}
              onClick={() => {}}
              onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
              className="h-10 px-4 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-900 inline-flex items-center gap-2 select-none"
              aria-label="Contact seller"
            >
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.99316 10.8932C2.09118 11.1404 2.11301 11.4114 2.05583 11.6712L1.34583 13.8645C1.32295 13.9757 1.32886 14.091 1.36301 14.1993C1.39716 14.3076 1.4584 14.4053 1.54094 14.4833C1.62347 14.5613 1.72456 14.617 1.83463 14.6449C1.94469 14.6729 2.06007 14.6723 2.16983 14.6432L4.44516 13.9778C4.6903 13.9292 4.94418 13.9505 5.17783 14.0392C6.60142 14.704 8.21407 14.8446 9.73126 14.4363C11.2484 14.028 12.5727 13.0969 13.4703 11.8074C14.3679 10.5179 14.7812 8.95277 14.6374 7.38819C14.4935 5.82362 13.8016 4.36014 12.6839 3.25596C11.5661 2.15178 10.0943 1.47785 8.52808 1.35309C6.96187 1.22833 5.40192 1.66075 4.12345 2.57405C2.84499 3.48736 1.93018 4.82285 1.54042 6.34492C1.15066 7.86698 1.311 9.4778 1.99316 10.8932Z" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </div>
              Contact Seller
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
