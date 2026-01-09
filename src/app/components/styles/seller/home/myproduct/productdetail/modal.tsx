"use client";

import React, { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";

function handleKeyboardActivate(e: React.KeyboardEvent, onActivate: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export default function Modal({
  onClose,
  buyersCount,
}: {
  onClose: () => void;
  buyersCount: number;
}) {
  const [version, setVersion] = useState("");
  const [changelog, setChangelog] = useState(
    "- Fixed critical bug in navigation\n- Added dark mode support\n- Improved performance by 40%\n- Updated documentation"
  );

  // lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ESC close
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 px-4 py-6 flex items-center justify-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-label="Update Product Version"
    >
      {/* shorter modal: max-h, inner scroll */}
      <div className="mx-auto  w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-200 max-h-[calc(100vh-180px)] flex flex-col">
        {/* header */}
        <div className="px-6 pt-5 pb-3 flex items-start justify-between gap-4 border-b border-gray-100">
          <div className="min-w-0">
            <div className="text-base font-semibold">Update Product Version</div>
            <div className="mt-2 text-sm text-gray-500">
              Upload new files and provide a changelog for this version update. All
              existing buyers will be notified.
            </div>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => handleKeyboardActivate(e, onClose)}
            className="h-9 w-9 rounded-lg hover:bg-gray-100 grid place-items-center cursor-pointer select-none text-gray-700"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </div>
        </div>

        {/* body scroll */}
        <div className="px-6 pb-5 overflow-auto">
          <div className="mt-4 text-sm font-medium text-gray-900">
            Version Number <span className="text-red-500">*</span>
          </div>
          <input
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="e.g., 2.1.0"
            className="mt-2 w-full h-11 rounded-xl bg-gray-50 border border-gray-200 px-4 text-sm
                       outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400
                       hover:border-orange-300 transition"
          />
          <div className="mt-2 text-xs text-gray-500">
            Follow semantic versioning (major.minor.patch)
          </div>

          <div className="mt-5 text-sm font-medium text-gray-900">
            Changelog <span className="text-red-500">*</span>
          </div>
          <textarea
            value={changelog}
            onChange={(e) => setChangelog(e.target.value)}
            className="mt-2 w-full min-h-[110px] rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm
                       outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400
                       hover:border-orange-300 transition"
          />
          <div className="mt-2 text-xs text-gray-500">
            Describe what changed in this version
          </div>

          <div className="mt-5 text-sm font-medium text-gray-900">
            Upload Files <span className="text-red-500">*</span>
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => {}}
            onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
            className="mt-2 rounded-2xl border border-gray-200 bg-white p-6 cursor-pointer select-none
                       hover:bg-gray-50 hover:border-gray-300 transition"
            aria-label="Upload files"
          >
            <div className="flex flex-col items-center text-center gap-2 text-gray-700">
              <div className="h-10 w-10 rounded-xl bg-gray-50 border border-gray-200 grid place-items-center text-gray-600">
                <Upload className="h-5 w-5" />
              </div>
              <div className="text-sm font-medium">Click to upload files</div>
              <div className="text-xs text-gray-500">or drag and drop</div>
              <div className="text-xs text-gray-400">
                ZIP, Figma, Sketch, PDF, PNG (max 500MB)
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4">
            <div className="text-sm font-semibold text-blue-900">What happens next?</div>
            <div className="mt-2 text-sm text-blue-800 space-y-1">
              <div>• All {buyersCount} buyers will be notified about this update</div>
              <div>• New version will be available for download immediately</div>
              <div>• Old version will remain accessible in buyer&#39;s download history</div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 pb-1">
            <div
              role="button"
              tabIndex={0}
              onClick={onClose}
              onKeyDown={(e) => handleKeyboardActivate(e, onClose)}
              className="h-10 px-4 rounded-xl bg-white border border-gray-200 text-sm text-gray-800
                         grid place-items-center cursor-pointer select-none
                         hover:bg-gray-50 hover:border-gray-300 transition"
              aria-label="Cancel"
            >
              Cancel
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => {}}
              onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
              className="h-10 px-4 rounded-xl bg-orange-500 text-white text-sm font-medium
                         inline-flex items-center gap-2 cursor-pointer select-none
                         hover:bg-orange-600 transition"
              aria-label="Publish Update"
            >
              <Upload className="h-4 w-4" />
              Publish Update
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
