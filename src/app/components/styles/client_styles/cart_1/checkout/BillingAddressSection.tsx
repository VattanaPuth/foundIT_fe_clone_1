"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void,
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function ChevronIcon({ open }: { open: boolean }) {
  return <span className="ml-2 text-gray-500">{open ? "▴" : "▾"}</span>;
}

function TextInput({
  placeholder,
  ariaLabel,
}: {
  placeholder: string;
  ariaLabel: string;
}) {
  return (
    <input
      placeholder={placeholder}
      aria-label={ariaLabel}
      className="w-full rounded-md border bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none
                 focus:ring-2 focus:ring-green-500 focus:border-green-500"
    />
  );
}

function SimpleDropdown({
  label,
  value,
  options,
  onChange,
  placeholder = "Select...",
  disabled = false,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (next: string) => void;
  placeholder?: string;
  disabled?: boolean;
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

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-gray-700">{label}</div>

      <div className="relative" ref={rootRef}>
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            if (disabled) return;
            setOpen((v) => !v);
          }}
          onKeyDown={(e) =>
            handleKeyboardActivate(e, () => {
              if (disabled) return;
              setOpen((v) => !v);
            })
          }
          className={`w-full rounded-md border px-3 py-2 text-sm select-none
                      flex items-center justify-between transition active:scale-[0.99]
                      ${
                        disabled
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                          : "bg-gray-50 text-gray-900 cursor-pointer hover:bg-white hover:border-gray-300"
                      }`}
          aria-label={`${label} dropdown`}
        >
          <span
            className={`${value ? "text-gray-900" : "text-gray-400"} truncate`}
          >
            {value || placeholder}
          </span>
          <ChevronIcon open={open} />
        </div>

        {open ? (
          <div className="absolute left-0 right-0 z-30 mt-2 rounded-xl border bg-white shadow-sm overflow-hidden max-h-56 overflow-y-auto">
            {options.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No options</div>
            ) : (
              options.map((opt) => {
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
                    {opt}
                  </div>
                );
              })
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function BillingAddressSection() {
  const [country, setCountry] = useState("");
  const [stateProv, setStateProv] = useState("");

  const countryOptions = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Singapore",
    "Cambodia",
    "Japan",
    "Germany",
  ];

  const stateOptions = useMemo(() => {
    const stateMap: Record<string, string[]> = {
      "United States": [
        "California",
        "New York",
        "Texas",
        "Florida",
        "Washington",
      ],
      Canada: ["Ontario", "British Columbia", "Quebec", "Alberta"],
      "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
      Australia: [
        "New South Wales",
        "Victoria",
        "Queensland",
        "Western Australia",
      ],
      Singapore: ["Central", "East", "North", "North-East", "West"],
      Cambodia: ["Phnom Penh", "Siem Reap", "Battambang", "Kampot"],
      Japan: ["Tokyo", "Osaka", "Hokkaido", "Fukuoka"],
      Germany: ["Berlin", "Bavaria", "Hamburg", "Hesse"],
    };
    if (!country) return [];
    return stateMap[country] || ["State 1", "State 2", "State 3"];
  }, [country]);

  useEffect(() => {
    setStateProv("");
  }, [country]);

  return (
    <section className="bg-white border rounded-xl shadow-sm p-5">
      <div className="text-sm font-semibold text-gray-900">Billing Address</div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-700">First Name</div>
          <TextInput placeholder="" ariaLabel="First name" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-700">Last Name</div>
          <TextInput placeholder="" ariaLabel="Last name" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <div className="text-xs font-medium text-gray-700">Address</div>
          <TextInput placeholder="" ariaLabel="Address" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-700">City</div>
          <TextInput placeholder="" ariaLabel="City" />
        </div>

        <SimpleDropdown
          label="State"
          value={stateProv}
          options={stateOptions}
          onChange={setStateProv}
          placeholder={country ? "Select state" : "Select country first"}
          disabled={!country}
        />

        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-700">ZIP Code</div>
          <TextInput placeholder="" ariaLabel="ZIP code" />
        </div>

        <div className="md:col-span-2">
          <SimpleDropdown
            label="Country"
            value={country}
            options={countryOptions}
            onChange={setCountry}
            placeholder="Select country"
          />
        </div>
      </div>
    </section>
  );
}
