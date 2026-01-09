"use client";

import React, { useEffect, useRef } from "react";
import { handleKeyboardActivate } from "@/app/components/styles/seller/earning/utils";

export default function Modal({
  open,
  title,
  subtitle,
  onClose,
  size = "md",
  children,
  footer,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // ✅ lock body scroll when modal is open
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    // prevent layout shift when scrollbar disappears
    const scrollBarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollBarW > 0) document.body.style.paddingRight = `${scrollBarW}px`;

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    function onMouseDown(e: MouseEvent) {
      const t = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(t)) onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const w =
    size === "sm" ? "max-w-md" : size === "lg" ? "max-w-2xl" : "max-w-lg";

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          ref={panelRef}
          className={`w-full ${w} rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden max-h-[calc(100vh-32px)] flex flex-col`}
        >
          {/* header */}
          <div className="px-6 py-5 border-b border-gray-200 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-900">{title}</div>
              {subtitle ? (
                <div className="mt-1 text-xs text-gray-500">{subtitle}</div>
              ) : null}
            </div>

            <div
              role="button"
              tabIndex={0}
              aria-label="Close modal"
              onClick={onClose}
              onKeyDown={(e) => handleKeyboardActivate(e, onClose)}
              className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer select-none text-gray-500 hover:text-gray-700"
            >
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>

          {/* body (scroll inside modal) */}
          <div className="px-6 py-5 overflow-auto">{children}</div>

          {/* footer */}
          {footer ? (
            <div className="px-6 py-5 border-t border-gray-200">{footer}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
