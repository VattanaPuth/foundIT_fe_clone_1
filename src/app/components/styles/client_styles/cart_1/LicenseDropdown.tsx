"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import ChevronIcon from "@/app/components/styles/client_styles/cart_1/ChevronIcon";
import {
  LicenseKey,
  formatMoney,
  getLicensePrice,
  handleKeyboardActivate,
} from "@/app/components/styles/client_styles/cart_1/types";

const licenseOptions: LicenseKey[] = ["Personal", "Commercial", "Extended"];

export default function LicenseDropdown({
  basePrice,
  value,
  onChange,
}: {
  basePrice: number;
  value: LicenseKey;
  onChange: (next: LicenseKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (rootRef.current && !rootRef.current.contains(target)) setOpen(false);
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectedPrice = useMemo(
    () => getLicensePrice(basePrice, value),
    [basePrice, value]
  );

  return (
    <div className="relative" ref={rootRef}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => handleKeyboardActivate(e, () => setOpen((v) => !v))}
        className="inline-flex items-center rounded-md border bg-gray-50 px-3 py-2 text-sm text-gray-700 cursor-pointer select-none
                   hover:bg-white hover:border-gray-300 transition active:scale-[0.98]"
        aria-label="Select license"
      >
        <span className="truncate">
          {value} - {formatMoney(selectedPrice)}
        </span>
        <ChevronIcon open={open} />
      </div>

      {open ? (
        <div className="absolute z-20 mt-2 w-56 rounded-xl border bg-white shadow-sm overflow-hidden">
          {licenseOptions.map((opt) => {
            const optPrice = getLicensePrice(basePrice, opt);
            const active = opt === value;

            return (
              <div
                key={opt}
                role="button"
                tabIndex={0}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () => {
                    onChange(opt);
                    setOpen(false);
                  })
                }
                className={`px-3 py-2 text-sm cursor-pointer select-none transition
                            hover:bg-gray-50 active:scale-[0.99]
                            ${active ? "bg-green-50/40" : ""}`}
                aria-label={`Select ${opt}`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-gray-800">{opt}</div>
                  <div className="text-gray-600">{formatMoney(optPrice)}</div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
