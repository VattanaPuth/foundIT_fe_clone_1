"use client";

import React from "react";
import { Card, Input, handleKeyboardActivate } from "@/app/components/styles/seller/createproduct/ui";

export default function Files() {
  return (
    <Card
      title="Files & Downloads"
      subtitle="Upload files buyers will receive after purchase"
      icon={
        <svg
          className="h-6 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v12" />
          <path d="M8 11l4 4 4-4" />
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        </svg>
      }
    >
      <div className="space-y-4">
        <div>
          <div className="text-md text-gray-600">Deliverable Files *</div>
          <div className="mt-2 rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex flex-col items-center text-center gap-2 text-gray-700">
              <div className="h-10 w-10 rounded-xl bg-gray-50 border border-gray-200 grid place-items-center text-gray-600">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v12" />
                  <path d="M8 11l4 4 4-4" />
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                </svg>
              </div>

              <div className="text-sm font-medium text-orange-600">Click to upload</div>
              <div className="text-xs text-gray-500">or drag and drop</div>
              <div className="text-xs text-gray-400">
                ZIP, PSD, SKETCH, FIG, CODE, or any file format
              </div>

              <div
                role="button"
                tabIndex={0}
                onClick={() => {}}
                onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
                className="mt-2 h-9 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-700
                           cursor-pointer select-none hover:bg-gray-50 hover:border-gray-300 transition flex items-center"
                aria-label="Browse Files"
              >
                Browse Files
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
          <div className="text-xs text-orange-800 font-medium">Security Check</div>
          <div className="mt-1 text-xs text-orange-700">
            All files are automatically scanned for viruses and verified with checksums.
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="text-md text-gray-600">What is Included</div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => {}}
            onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
            className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700
                       cursor-pointer select-none hover:bg-gray-50 hover:border-gray-300 transition flex items-center"
            aria-label="Add Item"
          >
            + Add Item
          </div>
        </div>

        <Input placeholder="e.g., 50+ pre-built components" />
      </div>
    </Card>
  );
}
