"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import { handleKeyboardActivate } from "@/app/components/styles/seller/profile/editpf/utils";

export default function EditProfileHeader({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle: string;
  onBack: () => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div
              role="button"
              tabIndex={0}
              onClick={onBack}
              onKeyDown={(e) => handleKeyboardActivate(e, onBack)}
              className="h-9 w-9 rounded-md border border-gray-200 bg-white flex items-center justify-center
                         hover:bg-gray-50 cursor-pointer select-none"
              aria-label="Back"
            >
              <ChevronLeft className="h-4 w-4 text-gray-700" />
            </div>

            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">
                {title}
              </div>
              <div className="text-xs text-gray-500">{subtitle}</div>
            </div>
          </div>
        </div>

        {/* Static actions */}
        <div className="hidden md:flex items-center gap-2">
          <div
            role="button"
            tabIndex={0}
            onClick={() => {}}
            onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
            className="h-9 px-4 rounded-md border border-gray-200 bg-white text-sm text-gray-800
                       hover:bg-gray-50 cursor-pointer select-none flex items-center justify-center"
            aria-label="Cancel"
          >
            Cancel
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => {}}
            onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
            className="h-9 px-4 rounded-md bg-orange-500 text-sm text-white
                       hover:bg-orange-600 cursor-pointer select-none flex items-center justify-center"
            aria-label="Save changes"
          >
            Save Changes
          </div>
        </div>
      </div>

      {/* Mobile actions */}
      <div className="mt-4 flex md:hidden items-center gap-2">
        <div
          role="button"
          tabIndex={0}
          onClick={() => {}}
          onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
          className="flex-1 h-9 rounded-md border border-gray-200 bg-white text-sm text-gray-800
                     hover:bg-gray-50 cursor-pointer select-none flex items-center justify-center"
          aria-label="Cancel"
        >
          Cancel
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => {}}
          onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
          className="flex-1 h-9 rounded-md bg-orange-500 text-sm text-white
                     hover:bg-orange-600 cursor-pointer select-none flex items-center justify-center"
          aria-label="Save changes"
        >
          Save Changes
        </div>
      </div>
    </div>
  );
}
