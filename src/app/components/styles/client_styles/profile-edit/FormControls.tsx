"use client";

import React from "react";

// Keyboard helper (your preferred style)
export function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export type DropdownOption = { label: string; value: string };

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M14.77 12.79a.75.75 0 01-1.06-.02L10 9.06l-3.71 3.71a.75.75 0 11-1.06-1.06l4.24-4.24a.75.75 0 011.06 0l4.24 4.24a.75.75 0 01-.02 1.08z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function FieldLabel({
  text,
  required,
}: {
  text: string;
  required?: boolean;
}) {
  return (
    <div className="text-sm font-medium text-gray-700">
      {text} {required ? <span className="text-red-500">*</span> : null}
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  ariaLabel: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400"
    />
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  ariaLabel,
  rows = 4,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  ariaLabel: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      rows={rows}
      className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none placeholder:text-gray-400"
    />
  );
}

export function Toggle({
  checked,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  ariaLabel: string;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      onKeyDown={(e) => handleKeyboardActivate(e, () => onChange(!checked))}
      className={[
        "w-10 h-6 rounded-full border transition flex items-center px-0.5 select-none",
        checked
          ? "bg-green-500 border-green-500 justify-end"
          : "bg-gray-200 border-gray-200 justify-start",
      ].join(" ")}
    >
      <div className="w-5 h-5 rounded-full bg-white shadow" />
    </div>
  );
}

export function Dropdown({
  id,
  label,
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
}: {
  id: string;
  label: string;
  value: DropdownOption;
  options: DropdownOption[];
  isOpen: boolean;
  onToggle: (id: string) => void;
  onSelect: (opt: DropdownOption) => void;
}) {
  return (
    <div className="space-y-2">
      <FieldLabel text={label} />

      <div className="relative">
        <div
          role="button"
          tabIndex={0}
          aria-label={`${label} dropdown`}
          onClick={() => onToggle(id)}
          onKeyDown={(e) => handleKeyboardActivate(e, () => onToggle(id))}
          className={[
            "w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2",
            "text-sm flex items-center justify-between",
            "cursor-pointer select-none",
            "hover:border-gray-300",
            "outline-none focus:ring-2 focus:ring-green-500",
          ].join(" ")}
        >
          <div className="text-gray-900">{value.label}</div>

          <div className="text-gray-400">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </div>
        </div>

        {isOpen ? (
          <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {options.map((opt) => (
              <div
                key={opt.value}
                role="button"
                tabIndex={0}
                onClick={() => onSelect(opt)}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () => onSelect(opt))
                }
                className={[
                  "px-3 py-2 text-sm cursor-pointer select-none hover:bg-gray-50",
                  opt.value === value.value ? "bg-gray-50" : "",
                ].join(" ")}
              >
                {opt.label}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function Pill({
  text,
  onRemove,
}: {
  text: string;
  onRemove?: () => void;
}) {
  return (
    <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-700">
      <div>{text}</div>
      {onRemove ? (
        <div
          role="button"
          tabIndex={0}
          aria-label={`Remove ${text}`}
          onClick={onRemove}
          onKeyDown={(e) => handleKeyboardActivate(e, onRemove)}
          className="text-gray-400 hover:text-gray-700 cursor-pointer select-none"
        >
          ×
        </div>
      ) : null}
    </div>
  );
}
