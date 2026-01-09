"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { handleKeyboardActivate } from "@/app/components/styles/seller/profile/editpf/utils";

export default function TagInput({
  label,
  placeholder,
  value,
  onChange,
  max = 10,
}: {
  label: string;
  placeholder: string;
  value: string[];
  onChange: (next: string[]) => void;
  max?: number;
}) {
  const [txt, setTxt] = useState("");

  function add() {
    const v = txt.trim();
    if (!v) return;
    if (value.length >= max) return;
    if (value.some((x) => x.toLowerCase() === v.toLowerCase())) return;
    onChange([...value, v]);
    setTxt("");
  }

  function remove(v: string) {
    onChange(value.filter((x) => x !== v));
  }

  return (
    <div>
      <div className="text-xs font-medium text-gray-700">{label}</div>

      <div className="mt-2 flex flex-wrap gap-2">
        {value.map((t) => (
          <div
            key={t}
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs text-orange-700"
          >
            {t}
            <div
              role="button"
              tabIndex={0}
              onClick={() => remove(t)}
              onKeyDown={(e) => handleKeyboardActivate(e, () => remove(t))}
              className="h-4 w-4 rounded-full bg-orange-100 flex items-center justify-center cursor-pointer select-none"
              aria-label={`Remove ${t}`}
            >
              <X className="h-3 w-3" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input
          value={txt}
          onChange={(e) => setTxt(e.target.value)}
          placeholder={placeholder}
          className="flex-1 h-10 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900
                     outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
          aria-label={label}
        />

        <div
          role="button"
          tabIndex={0}
          onClick={add}
          onKeyDown={(e) => handleKeyboardActivate(e, add)}
          className={[
            "h-10 px-4 rounded-md border cursor-pointer select-none flex items-center justify-center text-sm",
            value.length >= max
              ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
              : "border-orange-500 bg-orange-500 text-white hover:bg-orange-600",
          ].join(" ")}
          aria-label="Add tag"
        >
          Add
        </div>
      </div>

      <div className="mt-2 text-[11px] text-gray-400">
        {value.length}/{max}
      </div>
    </div>
  );
}
