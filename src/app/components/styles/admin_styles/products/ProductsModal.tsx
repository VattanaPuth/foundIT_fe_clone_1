// src/app/components/styles/admin/products/ProductModal.tsx
"use client";

import React from "react";
import type { Product } from "@/app/components/styles/admin_styles/products/mockData";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export default function ProductModal({
  type,
  product,
  onClose,
}: {
  type: "details" | "sales" | "delete";
  product: Product;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full h-full flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="text-sm font-semibold text-gray-900">
              {type === "details"
                ? "View Details"
                : type === "sales"
                ? "View Sales Data"
                : "Delete Product"}
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={onClose}
              onKeyDown={(e) => handleKeyboardActivate(e, onClose)}
              className="h-9 w-9 rounded-md border border-gray-200 bg-white flex items-center justify-center cursor-pointer select-none hover:bg-gray-50"
              aria-label="Close modal"
            >
              ✕
            </div>
          </div>

          <div className="px-5 py-5">
            <div className="text-sm text-gray-700">
              <div className="font-medium text-gray-900">{product.name}</div>
              <div className="mt-2 text-gray-600">
                Category: {product.category}
              </div>
              <div className="mt-1 text-gray-600">Seller: {product.seller}</div>
              <div className="mt-1 text-gray-600">Sales: {product.sales}</div>

              <div className="mt-4 text-gray-500">
                (Blank modal for now — you’ll replace with your designed modal
                UI.)
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <div
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={(e) => handleKeyboardActivate(e, onClose)}
                className="h-9 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm text-gray-800 cursor-pointer select-none flex items-center justify-center"
              >
                Close
              </div>

              {type === "delete" ? (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={onClose}
                  onKeyDown={(e) => handleKeyboardActivate(e, onClose)}
                  className="h-9 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm cursor-pointer select-none flex items-center justify-center"
                >
                  Delete
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
