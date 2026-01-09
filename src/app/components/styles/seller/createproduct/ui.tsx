"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export function Card({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-start gap-3">
          {icon ? (
            <div className="mt-0.5 text-orange-500">{icon}</div>
          ) : null}
          <div>
            <div className="text-md font-semibold">{title}</div>
            {subtitle ? (
              <div className="mt-1 text-sm text-gray-500">{subtitle}</div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="px-5 py-5">{children}</div>
    </section>
  );
}

export function Dropdown({
  value,
  placeholder,
  options,
  onChange,
  widthClass = "w-full",
}: {
  value: string;
  placeholder: string;
  options: string[];
  onChange: (v: string) => void;
  widthClass?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!open) return;
      const el = wrapRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className={"relative " + widthClass}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => handleKeyboardActivate(e, () => setOpen((v) => !v))}
        className="h-11 px-4 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-800
                   inline-flex items-center justify-between gap-3 cursor-pointer select-none
                   hover:border-gray-300 transition outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        aria-label={placeholder}
      >
        <span className={"truncate " + (value ? "text-gray-900" : "text-gray-400")}>
          {value || placeholder}
        </span>

        <ChevronDown
          className={
            "h-4 w-4 text-gray-500 transition " + (open ? "rotate-180" : "rotate-0")
          }
        />
      </div>

      {open ? (
        <div className="absolute left-0 right-0 mt-2 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-30">
          {options.map((opt) => (
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
              className={
                "px-4 py-2 text-sm cursor-pointer select-none hover:bg-gray-50 " +
                (opt === value ? "bg-gray-50 text-gray-900" : "text-gray-800")
              }
              aria-label={opt}
            >
              {opt}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Input({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      className="w-full h-11 px-4 rounded-lg bg-gray-50 border border-gray-200 text-sm
                 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400
                 hover:border-gray-300 transition"
    />
  );
}

export function Textarea({
  placeholder,
  value,
  onChange,
  rows = 5,
}: {
  placeholder: string;
  value?: string;
  onChange?: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-sm
                 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                 hover:border-gray-300 transition resize-none"
    />
  );
}
