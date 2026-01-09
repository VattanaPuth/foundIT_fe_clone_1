"use client";

import React from "react";
import { ChevronDown, Check } from "lucide-react";

export type AccKey =
  | "category"
  | "price"
  | "platform"
  | "fileTypes"
  | "license"
  | "rating"
  | "seller"
  | "updated";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export default function FiltersPanel(props: {
  accOpen: Record<AccKey, boolean>;
  onToggleAcc: (key: AccKey) => void;

  categories: { label: string; count: number }[];
  catValue: string;
  setCatValue: (v: string) => void;

  priceMin: number;
  priceMax: number;
  setPriceMin: (v: number) => void;
  setPriceMax: (v: number) => void;

  platforms: string[];
  platformChecks: Record<string, boolean>;
  setPlatformChecks: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;

  fileTypes: string[];
  fileTypeChecks: Record<string, boolean>;
  setFileTypeChecks: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;

  licenseType: "Personal" | "Commercial" | "Extended";
  setLicenseType: (v: "Personal" | "Commercial" | "Extended") => void;

  minRating: "4.5+" | "4+" | "3.5+" | "3+";
  setMinRating: (v: "4.5+" | "4+" | "3.5+" | "3+") => void;

  verifiedSellersOnly: boolean;
  setVerifiedSellersOnly: (v: boolean) => void;

  updatedWithin: "Last 7 days" | "Last 30 days" | "Last 3 months" | "Last year";
  setUpdatedWithin: (
    v: "Last 7 days" | "Last 30 days" | "Last 3 months" | "Last year"
  ) => void;
}) {
  const {
    accOpen,
    onToggleAcc,
    categories,
    catValue,
    setCatValue,
    priceMin,
    priceMax,
    setPriceMin,
    setPriceMax,
    platforms,
    platformChecks,
    setPlatformChecks,
    fileTypes,
    fileTypeChecks,
    setFileTypeChecks,
    licenseType,
    setLicenseType,
    minRating,
    setMinRating,
    verifiedSellersOnly,
    setVerifiedSellersOnly,
    updatedWithin,
    setUpdatedWithin,
  } = props;
const trackRef = React.useRef<HTMLDivElement | null>(null);
const dragRef = React.useRef<"min" | "max" | null>(null);

const MIN = 0;
const MAX = 500;

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function valueToPct(v: number) {
  return ((v - MIN) / (MAX - MIN)) * 100;
}

function xToValue(clientX: number) {
  const el = trackRef.current;
  if (!el) return MIN;
  const r = el.getBoundingClientRect();
  const pct = clamp((clientX - r.left) / r.width, 0, 1);
  return Math.round(MIN + pct * (MAX - MIN));
}

function applyDrag(which: "min" | "max", clientX: number) {
  const next = xToValue(clientX);

  if (which === "min") {
    const v = clamp(next, MIN, priceMax - 1);
    setPriceMin(v);
  } else {
    const v = clamp(next, priceMin + 1, MAX);
    setPriceMax(v);
  }
}

React.useEffect(() => {
  function onMove(e: PointerEvent) {
    if (!dragRef.current) return;
    applyDrag(dragRef.current, e.clientX);
  }

  function onUp() {
    dragRef.current = null;
  }

  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  return () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  };
}, [priceMin, priceMax]); // keep latest min/max in closure
  const [activeThumb, setActiveThumb] = React.useState<"min" | "max">("min");
  function toggleCheck(
    key: string,
    setFn: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  ) {
    setFn((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  // Dual slider clamping
  function onChangeMin(v: number) {
    const next = Math.min(v, priceMax - 1);
    setPriceMin(next);
  }
  function onChangeMax(v: number) {
    const next = Math.max(v, priceMin + 1);
    setPriceMax(next);
  }

  return (
    <div className="space-y-3">
      <Accordion
        title="Category"
        open={accOpen.category}
        onToggle={() => onToggleAcc("category")}
      >
        <div className="space-y-2">
          <RadioRow
            label="All"
            checked={catValue === "All"}
            onPick={() => setCatValue("All")}
          />

          {categories.map((c) => (
            <div
              key={c.label}
              className="flex items-center justify-between gap-2"
            >
              <RadioRow
                label={c.label}
                checked={catValue === c.label}
                onPick={() => setCatValue(c.label)}
              />
              <div className="text-xs text-gray-400">{c.count}</div>
            </div>
          ))}
        </div>
      </Accordion>

      <Accordion
  title="Price Range"
  open={accOpen.price}
  onToggle={() => onToggleAcc("price")}
>
  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
    <div className="flex items-center justify-between text-xs text-gray-600">
      <div>
        Min: <span className="font-medium text-gray-900">${priceMin}</span>
      </div>
      <div>
        Max: <span className="font-medium text-gray-900">${priceMax}</span>
      </div>
    </div>

    {/* Track */}
    <div
      ref={trackRef}
      className="relative mt-3 h-10"
      role="presentation"
      onPointerDown={(e) => {
        // Click on track moves nearest thumb, then starts drag
        const target = xToValue(e.clientX);
        const dMin = Math.abs(target - priceMin);
        const dMax = Math.abs(target - priceMax);
        const which: "min" | "max" = dMin <= dMax ? "min" : "max";

        dragRef.current = which;
        applyDrag(which, e.clientX);
      }}
    >
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-gray-200" />

      {/* Active range */}
      <div
        className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-orange-500"
        style={{
          left: `${valueToPct(priceMin)}%`,
          width: `${valueToPct(priceMax) - valueToPct(priceMin)}%`,
        }}
      />

      {/* Min thumb */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Minimum price"
        onPointerDown={(e) => {
          e.stopPropagation();
          dragRef.current = "min";
        }}
        onKeyDown={(e) => {
  if (e.key === "ArrowLeft") setPriceMin(Math.max(MIN, Math.min(priceMin - 1, priceMax - 1)));
  if (e.key === "ArrowRight") setPriceMin(Math.max(MIN, Math.min(priceMin + 1, priceMax - 1)));
}}
        className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-orange-500 shadow ring-2 ring-white cursor-pointer select-none"
        style={{ left: `calc(${valueToPct(priceMin)}% - 10px)` }}
      />

      {/* Max thumb */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Maximum price"
        onPointerDown={(e) => {
          e.stopPropagation();
          dragRef.current = "max";
        }}
        onKeyDown={(e) => {
  if (e.key === "ArrowLeft") setPriceMax(Math.min(MAX, Math.max(priceMax - 1, priceMin + 1)));
  if (e.key === "ArrowRight") setPriceMax(Math.min(MAX, Math.max(priceMax + 1, priceMin + 1)));
}}
        className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-orange-500 shadow ring-2 ring-white cursor-pointer select-none"
        style={{ left: `calc(${valueToPct(priceMax)}% - 10px)` }}
      />
    </div>
  </div>
</Accordion>
         

      <Accordion
        title="Platform / Stack"
        open={accOpen.platform}
        onToggle={() => onToggleAcc("platform")}
      >
        <div className="space-y-2">
          {platforms.map((p) => (
            <CheckRow
              key={p}
              label={p}
              checked={!!platformChecks[p]}
              onToggle={() => toggleCheck(p, setPlatformChecks)}
            />
          ))}
        </div>
      </Accordion>

      <Accordion
        title="File Types"
        open={accOpen.fileTypes}
        onToggle={() => onToggleAcc("fileTypes")}
      >
        <div className="space-y-2">
          {fileTypes.map((t) => (
            <CheckRow
              key={t}
              label={t}
              checked={!!fileTypeChecks[t]}
              onToggle={() => toggleCheck(t, setFileTypeChecks)}
            />
          ))}
        </div>
      </Accordion>

      <Accordion
        title="License Type"
        open={accOpen.license}
        onToggle={() => onToggleAcc("license")}
      >
        <div className="space-y-2">
          <RadioRow
            label="Personal"
            checked={licenseType === "Personal"}
            onPick={() => setLicenseType("Personal")}
          />
          <RadioRow
            label="Commercial"
            checked={licenseType === "Commercial"}
            onPick={() => setLicenseType("Commercial")}
          />
          <RadioRow
            label="Extended"
            checked={licenseType === "Extended"}
            onPick={() => setLicenseType("Extended")}
          />
        </div>
      </Accordion>

      <Accordion
        title="Minimum Rating"
        open={accOpen.rating}
        onToggle={() => onToggleAcc("rating")}
      >
        <div className="space-y-2">
          <RadioRow
            label="4.5+"
            checked={minRating === "4.5+"}
            onPick={() => setMinRating("4.5+")}
          />
          <RadioRow
            label="4+"
            checked={minRating === "4+"}
            onPick={() => setMinRating("4+")}
          />
          <RadioRow
            label="3.5+"
            checked={minRating === "3.5+"}
            onPick={() => setMinRating("3.5+")}
          />
          <RadioRow
            label="3+"
            checked={minRating === "3+"}
            onPick={() => setMinRating("3+")}
          />
        </div>
      </Accordion>

      <Accordion
        title="Seller Rating"
        open={accOpen.seller}
        onToggle={() => onToggleAcc("seller")}
      >
        <CheckRow
          label="Verified Sellers Only"
          checked={verifiedSellersOnly}
          onToggle={() => setVerifiedSellersOnly(!verifiedSellersOnly)}
        />
      </Accordion>

      <Accordion
        title="Last Updated"
        open={accOpen.updated}
        onToggle={() => onToggleAcc("updated")}
      >
        <div className="space-y-2">
          {(
            [
              "Last 7 days",
              "Last 30 days",
              "Last 3 months",
              "Last year",
            ] as const
          ).map((v) => (
            <RadioRow
              key={v}
              label={v}
              checked={updatedWithin === v}
              onPick={() => setUpdatedWithin(v)}
            />
          ))}
        </div>
      </Accordion>
    </div>
  );
}

function Accordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => handleKeyboardActivate(e, onToggle)}
        className="flex items-center justify-between px-3 py-3 cursor-pointer select-none"
        aria-label={`Toggle ${title}`}
      >
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        <ChevronDown
          className={[
            "h-4 w-4 text-gray-600 transition",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </div>

      {open && <div className="px-3 pb-3">{children}</div>}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => handleKeyboardActivate(e, onToggle)}
      className="flex items-center justify-between gap-3 cursor-pointer select-none rounded-lg px-2 py-2 hover:bg-gray-50"
      aria-label={`Toggle ${label}`}
    >
      <div className="flex items-center gap-2">
        <div
          className={[
            "h-5 w-5 rounded-md border flex items-center justify-center",
            checked
              ? "bg-orange-500 border-orange-500"
              : "bg-white border-gray-300",
          ].join(" ")}
          aria-hidden="true"
        >
          {checked && <Check className="h-4 w-4 text-white" />}
        </div>
        <div className="text-sm text-gray-700">{label}</div>
      </div>
    </div>
  );
}

function RadioRow({
  label,
  checked,
  onPick,
}: {
  label: string;
  checked: boolean;
  onPick: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onPick}
      onKeyDown={(e) => handleKeyboardActivate(e, onPick)}
      className="flex items-center justify-between gap-3 cursor-pointer select-none rounded-lg px-2 py-2 hover:bg-gray-50"
      aria-label={`Select ${label}`}
    >
      <div className="flex items-center gap-2">
        <div
          className={[
            "h-5 w-5 rounded-full border flex items-center justify-center",
            checked ? "border-orange-500" : "border-gray-300",
          ].join(" ")}
          aria-hidden="true"
        >
          {checked && (
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
          )}
        </div>
        <div className="text-sm text-gray-700">{label}</div>
      </div>
    </div>
  );
}
