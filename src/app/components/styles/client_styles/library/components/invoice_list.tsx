"use client";

import React from "react";
import type {
  InvoiceItem,
  ProductItem,
} from "@/app/components/styles/client_styles/library/ts/mock_data";
import {
  handleKeyboardActivate,
  formatMoney,
} from "@/app/components/styles/client_styles/library/ts/ultis";
import { IconDoc, IconDownload } from "@/app/components/styles/client_styles/library/components/icons";

export default function InvoicesList({
  invoices,
  products,
  onOpenInvoice,
}: {
  invoices: InvoiceItem[];
  products: ProductItem[];
  onOpenInvoice: (invoiceId: string) => void;
}) {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <div />
        <div
          role="button"
          tabIndex={0}
          onClick={() => {}}
          onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
          className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-xs text-gray-700 cursor-pointer select-none
                     hover:bg-gray-50 hover:border-gray-300 transition active:scale-[0.99]"
          aria-label="Export CSV"
        >
          <IconDownload />
          Export CSV
        </div>
      </div>

      {/* ✅ List card (add bottom gap + stronger shadow) */}
      <div className="mt-3 space-y-3">
  {invoices.map((inv) => {
    const product = products.find((p) => p.id === inv.productId);
    const title = product ? product.title : "Product";

    return (
      <div
        key={inv.id}
        role="button"
        tabIndex={0}
        onClick={() => onOpenInvoice(inv.id)}
        onKeyDown={(e) =>
          handleKeyboardActivate(e, () => onOpenInvoice(inv.id))
        }
        className="flex items-center justify-between gap-3 px-4 py-3
                   bg-white rounded-xl border shadow-sm ring-1 ring-black/5
                   cursor-pointer select-none
                   hover:shadow-md hover:bg-gray-50 transition"
        aria-label="Open invoice"
      >
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <IconDoc />
          </div>

          <div className="min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">
              {title}
            </div>
            <div className="text-xs text-gray-500">
              {inv.date} <span className="mx-1">•</span>{" "}
              {formatMoney(inv.amount)}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <div
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onOpenInvoice(inv.id);
            }}
            className="rounded-md border bg-white px-3 py-2 text-xs text-gray-700
                       hover:bg-gray-50 hover:border-gray-300 transition"
          >
            View
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={(e) => e.stopPropagation()}
            className="rounded-md border bg-white px-3 py-2 text-xs text-gray-700
                       hover:bg-gray-50 hover:border-gray-300 transition"
          >
            PDF
          </div>
        </div>
      </div>
    );
  })}


      </div>
    </div>
  );
}
