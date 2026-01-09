"use client";

import React from "react";
import LicenseDropdown from "@/app/components/styles/client_styles/cart_1/LicenseDropdown";
import StarRating from "@/app/components/styles/client_styles/cart_1/StarRating";
import {
  CartItem,
  LicenseKey,
  formatMoney,
  getLicensePrice,
  handleKeyboardActivate,
} from "@/app/components/styles/client_styles/cart_1/types";

function TrashIcon() {
  // replace later with SVG if you want
  return (
    <span className="text-gray-400 hover:text-gray-600">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.66602 7.33203V11.332"
          stroke="#99A1AF"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.33398 7.33203V11.332"
          stroke="#99A1AF"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.6673 4V13.3333C12.6673 13.687 12.5268 14.0261 12.2768 14.2761C12.0267 14.5262 11.6876 14.6667 11.334 14.6667H4.66732C4.3137 14.6667 3.97456 14.5262 3.72451 14.2761C3.47446 14.0261 3.33398 13.687 3.33398 13.3333V4"
          stroke="#99A1AF"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 4H14"
          stroke="#99A1AF"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.33398 3.9987V2.66536C5.33398 2.31174 5.47446 1.9726 5.72451 1.72256C5.97456 1.47251 6.3137 1.33203 6.66732 1.33203H9.33398C9.68761 1.33203 10.0267 1.47251 10.2768 1.72256C10.5268 1.9726 10.6673 2.31174 10.6673 2.66536V3.9987"
          stroke="#99A1AF"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  );
}

export default function CartItemCard({
  item,
  onRemove,
  onChangeLicense,
}: {
  item: CartItem;
  onRemove: (id: string) => void;
  onChangeLicense: (id: string, license: LicenseKey) => void;
}) {
  const price = getLicensePrice(item.basePrice, item.license);

  return (
    <div className="bg-white border rounded-xl shadow-sm p-4">
      <div className="flex items-start gap-4">
        {/* image placeholder */}
        <div
          className={`h-16 w-16 rounded-lg ${item.imageColor}`}
          aria-label="Product image"
        />

        {/* info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">
                {item.title}
              </div>

              <div className="mt-1 text-xs text-gray-500">by {item.author}</div>

              <div className="mt-1 flex items-center gap-3">
                <StarRating rating={item.rating} />
                <div className="text-xs text-gray-500">
                  {item.sales.toLocaleString()} sales
                </div>
              </div>
            </div>

            {/* remove */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => onRemove(item.id)}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => onRemove(item.id))
              }
              className="p-2 rounded-md hover:bg-gray-50 cursor-pointer select-none transition active:scale-[0.98]"
              aria-label="Remove item"
            >
              <TrashIcon />
            </div>
          </div>

          {/* license + price */}
          <div className="mt-3 flex items-center justify-between gap-4">
            <LicenseDropdown
              basePrice={item.basePrice}
              value={item.license}
              onChange={(next) => onChangeLicense(item.id, next)}
            />

            <div className="text-lg font-semibold text-gray-900">
              {formatMoney(price)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
