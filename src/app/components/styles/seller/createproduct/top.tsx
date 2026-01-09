"use client";

import React from "react";
import { handleKeyboardActivate } from "@/app/components/styles/seller/createproduct/ui";

export default function Top() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <div>
        <div className="text-xl">Create New Product</div>
        <div className="mt-1 text-lg text-gray-600">
          Fill in all details to publish your product
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          role="button"
          tabIndex={0}
          onClick={() => {}}
          onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
          className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-700
                     cursor-pointer select-none hover:bg-gray-50 hover:border-gray-300 transition flex items-center"
          aria-label="Save Draft"
        >
          Save Draft
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => {}}
          onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
          className="h-10 px-4 rounded-lg bg-orange-500 text-white text-sm font-medium
                     cursor-pointer select-none hover:bg-orange-600 transition flex items-center"
          aria-label="Publish Product"
        >
          Publish Product
        </div>
      </div>
    </div>
  );
}
