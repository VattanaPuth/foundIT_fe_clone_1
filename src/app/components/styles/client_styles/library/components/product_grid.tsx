"use client";

import React from "react";
import { useRouter } from "next/navigation";

import type { ProductItem } from "@/app/components/styles/client_styles/library/ts/mock_data";
import { handleKeyboardActivate } from "@/app/components/styles/client_styles/library/ts/ultis";
import {
  IconDoc,
  IconDownload,
  IconLink,
  IconSupport,
  ProductThumb,
  Spinner,
} from "@/app/components/styles/client_styles/library/components/icons";

export default function ProductGrid({
  products,
  updatingMap,
  onApplyUpdate,
  onOpenInvoice,
}: {
  products: ProductItem[];
  updatingMap: Record<string, boolean>;
  onApplyUpdate: (productId: string) => void;
  onOpenInvoice: (productId: string) => void;
}) {
  const router = useRouter();

  return (
    <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {products.map((p) => {
        const isUpdating = !!updatingMap[p.id];

        return (
          <div
            key={p.id}
            className="bg-white border rounded-xl shadow-sm overflow-hidden"
          >
            {/* Top update bar (reserved height for alignment) */}
            <div className="h-10">
  {p.updateAvailable ? (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onApplyUpdate(p.id)}
      onKeyDown={(e) =>
        handleKeyboardActivate(e, () => onApplyUpdate(p.id))
      }
      className="
        h-10
        bg-gradient-to-r
        from-[#615FFF]
        to-[#AD46FF]
        text-white
        px-4
        flex items-center justify-between gap-3
        cursor-pointer select-none
        transition
        hover:brightness-110
        active:brightness-95
      "
      aria-label="Get update"
    >
      <div className="text-xs flex items-center gap-2 min-w-0">
        <span className="opacity-90">Update available:</span>
        <span className="font-medium truncate">{p.updateFromTo}</span>
      </div>

      <div className="shrink-0 rounded-md bg-white/15 px-3 py-1 text-xs font-medium flex items-center gap-2">
        {isUpdating ? <Spinner /> : null}
        Get Update
      </div>
    </div>
  ) : (
    <div className="h-10" />
  )}
</div>


            {/* Card body */}
            <div className="p-4">
              {/* ✅ Mobile: image + title/meta on same row */}
              <div className="flex items-start gap-3 sm:hidden">
                <ProductThumb tone={p.imageTone} />

                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-900">
                    {p.title}
                  </div>

                  <div className="mt-0.5 text-xs text-gray-500">
                    {p.author} <span className="mx-1">•</span> {p.version}
                    <span className="mx-1">•</span> {p.purchasedDate}
                  </div>

                  <div className="mt-1">
                    <span className="inline-flex items-center rounded-full border bg-gray-50 px-2 py-0.5 text-[11px] text-gray-700">
                      {p.licenseLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* ✅ Tablet/Desktop: keep your nice layout */}
              <div className="hidden sm:flex sm:gap-4">
                <ProductThumb tone={p.imageTone} />

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900">
                    {p.title}
                  </div>

                  <div className="mt-0.5 text-xs text-gray-500">
                    {p.author} <span className="mx-1">•</span> {p.version}
                    <span className="mx-1">•</span> {p.purchasedDate}
                  </div>

                  <div className="mt-2">
                    <span className="inline-flex items-center rounded-full border bg-gray-50 px-2 py-0.5 text-[11px] text-gray-700">
                      {p.licenseLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status block (shared) */}
              <div className="mt-3 rounded-lg bg-gray-100/70 p-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Updates:</span>
                  <span
                    className={
                      p.updateStatus === "Lifetime"
                        ? "text-green-700 font-medium"
                        : "text-orange-500 font-medium"
                    }
                  >
                    {p.updateStatus}
                  </span>
                </div>

                <div className="mt-1 flex justify-between">
                  <span className="text-gray-500">Support:</span>
                  <span className="text-orange-500 font-medium">
                    {p.supportStatus}
                  </span>
                </div>
              </div>

              {/* Actions (shared) */}
              <div className="mt-3 flex flex-wrap gap-2">
                <ActionButton
                  label="Download"
                  icon={<IconDownload />}
                  primary
                  onClick={() => router.push("")}
                />
                <ActionButton
                  label="Product Page"
                  icon={<IconLink />}
                  onClick={() => router.push("")}
                />
                <ActionButton
                  label="Support"
                  icon={<IconSupport />}
                  onClick={() => router.push("")}
                />
                <ActionButton
                  label="Invoice"
                  icon={<IconDoc />}
                  onClick={() => onOpenInvoice(p.id)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- helpers ---------------- */

function ActionButton({
  label,
  icon,
  onClick,
  primary,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs cursor-pointer select-none transition active:scale-[0.99]";
  const cls = primary
    ? "bg-orange-500 text-white hover:bg-orange-600"
    : "border bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => handleKeyboardActivate(e, onClick)}
      className={`${base} ${cls}`}
      aria-label={label}
    >
      {icon}
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}
