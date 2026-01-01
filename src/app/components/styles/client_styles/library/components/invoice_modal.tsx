"use client";

import React, { useEffect, useMemo, useRef } from "react";
import type { InvoiceItem, ProductItem } from "@/app/components/styles/client_styles/library/ts/mock_data";
import { formatMoney, handleKeyboardActivate } from "@/app/components/styles/client_styles/library/ts/ultis";
import { IconClose, ProductThumb } from "@/app/components/styles/client_styles/library/components/icons";

export default function InvoiceModal({
  openInvoiceId,
  invoices,
  products,
  onClose,
}: {
  openInvoiceId: string | null;
  invoices: InvoiceItem[];
  products: ProductItem[];
  onClose: () => void;
}) {
  const modalPanelRef = useRef<HTMLDivElement | null>(null);

  const selected = useMemo(() => {
    if (!openInvoiceId) return null;
    const inv = invoices.find((x) => x.id === openInvoiceId) || null;
    if (!inv) return null;
    const product = products.find((p) => p.id === inv.productId) || null;
    return { inv, product };
  }, [openInvoiceId, invoices, products]);

  // ✅ lock background scroll when modal is open
  useEffect(() => {
    if (!openInvoiceId) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    // avoid layout shift when scrollbar disappears
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [openInvoiceId]);

  // ESC close
  useEffect(() => {
    if (!openInvoiceId) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openInvoiceId, onClose]);

  // click outside closes
  useEffect(() => {
    if (!openInvoiceId) return;
    function onMouseDown(e: MouseEvent) {
      const panel = modalPanelRef.current;
      if (!panel) return;
      if (e.target instanceof Node && !panel.contains(e.target)) onClose();
    }
    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [openInvoiceId, onClose]);

  if (!openInvoiceId || !selected) return null;

  const amount = selected.inv.amount;
  const platformFee = amount * 0.05;
  const tax = amount * 0.1;
  const total = amount + platformFee + tax;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      aria-label="Invoice modal overlay"
    >
      <div className="absolute inset-0 bg-black/40" />

      {/* ✅ panel */}
      <div
        ref={modalPanelRef}
        className="relative w-full max-w-xl bg-white border rounded-xl shadow-sm overflow-hidden
                   max-h-[calc(100vh-160px)] flex flex-col"
      >
        {/* header (sticky) */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 px-4 py-3 border-b bg-white">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900">
              Invoice {selected.inv.invoiceNumber}
            </div>
            <div className="text-xs text-gray-500 truncate">
              Purchase invoice for {selected.product?.title || "Product"}
            </div>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => handleKeyboardActivate(e, onClose)}
            className="h-9 w-9 rounded-md border bg-white flex items-center justify-center cursor-pointer select-none
                       hover:bg-gray-50 hover:border-gray-300 transition active:scale-[0.99]"
            aria-label="Close"
          >
            <IconClose />
          </div>
        </div>

        {/* ✅ scroll area (THIS is what should scroll) */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          <div className="px-4 py-4">
            <div className="rounded-xl bg-orange-500 text-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">Found It Marketplace</div>
                  <div className="text-xs text-white/90">Digital Products Platform</div>
                  <div className="mt-2 text-[11px] text-white/90 leading-4">
                    123 Marketplace Street <br />
                    San Francisco, CA 94102 <br />
                    support@foundit.com
                  </div>
                </div>

                <div className="rounded-full bg-white/20 px-2 py-1 text-[11px]">
                  {selected.inv.status}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border bg-gray-50 p-3">
                <div className="font-semibold text-gray-900">Bill To:</div>
                <div className="mt-1 text-gray-600 leading-5">
                  John Doe <br />
                  john.doe@gmail.com <br />
                  Customer ID: #USER-12345
                </div>
              </div>

              <div className="rounded-xl border bg-gray-50 p-3">
                <div className="font-semibold text-gray-900">Invoice Details:</div>
                <div className="mt-1 text-gray-600 leading-5">
                  Invoice Number: {selected.inv.invoiceNumber} <br />
                  Date: {selected.inv.date} <br />
                  Payment Method: {selected.inv.paymentMethod} <br />
                  Status:{" "}
                  <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-[11px] text-green-700">
                    {selected.inv.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border overflow-hidden">
              <div className="px-4 py-2 bg-gray-50 border-b text-xs font-semibold text-gray-700">
                Product Details
              </div>

              <div className="p-4">
                {/* ✅ responsive header: hide on mobile so layout doesn't squeeze */}
                <div className="hidden sm:grid grid-cols-12 gap-3 text-xs text-gray-500 border-b pb-2">
                  <div className="col-span-6">Item</div>
                  <div className="col-span-3">Type</div>
                  <div className="col-span-3 text-right">Price</div>
                </div>

                {/* ✅ responsive row: stack on mobile, keep 12-col on sm+ */}
                <div className="pt-3 grid grid-cols-1 gap-3 sm:grid-cols-12 sm:items-start">
                  {/* Item */}
                  <div className="sm:col-span-6 flex items-start gap-3 min-w-0">
                    <div className="shrink-0">
                      <ProductThumb tone={selected.product?.imageTone || "gray"} />
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate">
                        {selected.product?.title || "Product"}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {selected.product?.author || "Seller"}{" "}
                        <span className="mx-1">•</span>{" "}
                        {selected.product?.version || ""}
                      </div>
                    </div>
                  </div>

                  {/* Type / License */}
                  <div className="sm:col-span-3 sm:flex sm:justify-start">
                    <span className="inline-flex whitespace-nowrap rounded-full bg-orange-100 px-2 py-0.5 text-[11px] text-orange-700">
                      {selected.product?.licenseLabel || "License"}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="sm:col-span-3 sm:text-right text-sm font-semibold text-gray-900">
                    {formatMoney(amount)}
                  </div>
                </div>

                <div className="mt-4 border-t pt-3 text-sm">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>{formatMoney(amount)}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-gray-600">
                    <span>Platform Fee (5%):</span>
                    <span>{formatMoney(platformFee)}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-gray-600">
                    <span>Tax (10%):</span>
                    <span>{formatMoney(tax)}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-gray-900 font-semibold">
                    <span>Total:</span>
                    <span>{formatMoney(total)}</span>
                  </div>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  Thank you for your purchase! <br />
                  If you have any questions, contact our support at support@foundit.com
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <div
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={(e) => handleKeyboardActivate(e, onClose)}
                className="rounded-md border bg-white px-4 py-2 text-sm text-gray-700 cursor-pointer select-none
                           hover:bg-gray-50 hover:border-gray-300 transition active:scale-[0.99]"
                aria-label="Close"
              >
                Close
              </div>

              <div
                role="button"
                tabIndex={0}
                onClick={() => {}}
                onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
                className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white cursor-pointer select-none
                           hover:bg-orange-600 transition active:scale-[0.99]"
                aria-label="Download PDF"
              >
                Download PDF
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
