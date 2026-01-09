"use client";

import React, { useState } from "react";
import Modal from "@/app/components/styles/seller/earning/modal";
import { handleKeyboardActivate } from "@/app/components/styles/seller/earning/utils";

export default function AddPayModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [method, setMethod] = useState<"card">("card");

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      title="Add payment method"
      subtitle="Secured & encrypted"
      footer={
        <div className="flex items-center justify-between gap-3">
          <div
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => handleKeyboardActivate(e, onClose)}
            className="h-10 flex-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer select-none flex items-center justify-center"
          >
            Cancel
          </div>

          <div
            role="button"
            tabIndex={0}
            className="h-10 flex-1 rounded-lg bg-orange-600 hover:bg-orange-700 active:bg-orange-700 text-white text-sm font-medium cursor-pointer select-none flex items-center justify-center"
          >
            Save & Continue
          </div>
        </div>
      }
    >
      {/* Select method */}
      <div className="text-xs font-medium text-gray-700">Select payment method</div>

      <div className="mt-2">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setMethod("card")}
          onKeyDown={(e) => handleKeyboardActivate(e, () => setMethod("card"))}
          className={`rounded-xl border p-4 cursor-pointer select-none ${
            method === "card"
              ? "border-orange-300 bg-orange-50/30"
              : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600">
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.668 4.16797H3.33464C2.41416 4.16797 1.66797 4.91416 1.66797 5.83464V14.168C1.66797 15.0884 2.41416 15.8346 3.33464 15.8346H16.668C17.5884 15.8346 18.3346 15.0884 18.3346 14.168V5.83464C18.3346 4.91416 17.5884 4.16797 16.668 4.16797Z" stroke="#1A1A1A" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.66797 8.33203H18.3346" stroke="#1A1A1A" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </div>
            </div>

            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-900">Card</div>
              <div className="text-xs text-gray-500">Visa, Mastercard</div>

              <div className="mt-2 text-[11px] text-gray-400 flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2381_15058)">
<path d="M10 6.50022C10 9.00022 8.25 10.2502 6.17 10.9752C6.06108 11.0121 5.94277 11.0104 5.835 10.9702C3.75 10.2502 2 9.00022 2 6.50022V3.00022C2 2.86762 2.05268 2.74044 2.14645 2.64667C2.24021 2.5529 2.36739 2.50022 2.5 2.50022C3.5 2.50022 4.75 1.90022 5.62 1.14022C5.72593 1.04972 5.86068 1 6 1C6.13932 1 6.27407 1.04972 6.38 1.14022C7.255 1.90522 8.5 2.50022 9.5 2.50022C9.63261 2.50022 9.75979 2.5529 9.85355 2.64667C9.94732 2.74044 10 2.86762 10 3.00022V6.50022Z" stroke="#717182" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2381_15058">
<rect width="12" height="12" fill="white"/>
</clipPath>
</defs>
</svg>

                </div>
                We never store your full card number (PCI DSS)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="mt-5 space-y-4">
        <div>
          <div className="text-xs font-medium text-gray-700">Card number</div>
          <input
            placeholder="1234 5678 9012 3456"
            className="mt-2 w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none
                       focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
          />
        </div>

        <div>
          <div className="text-xs font-medium text-gray-700">Name on card</div>
          <input
            placeholder="John Doe"
            className="mt-2 w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none
                       focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs font-medium text-gray-700">Expiry</div>
            <input
              placeholder="MM/YY"
              className="mt-2 w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none
                         focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
            />
          </div>

          <div>
            <div className="text-xs font-medium text-gray-700">CVC</div>
            <input
              placeholder="123"
              className="mt-2 w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none
                         focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
            />
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-gray-700">Billing address</div>

          <div className="mt-2 space-y-3">
            <div>
              <div className="text-[11px] text-gray-500">Country</div>
              <div className="mt-1 h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between text-sm text-gray-900">
                United States
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
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
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[11px] text-gray-500">Street address</div>
              <input
                placeholder="123 Main St"
                className="mt-1 w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none
                           focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] text-gray-500">City</div>
                <input
                  placeholder="San Francisco"
                  className="mt-1 w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none
                             focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                />
              </div>
              <div>
                <div className="text-[11px] text-gray-500">State</div>
                <input
                  placeholder="CA"
                  className="mt-1 w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none
                             focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <div className="text-[11px] text-gray-500">Postal code</div>
              <input
                placeholder="94105"
                className="mt-1 w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none
                           focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
              />
            </div>

            <div className="rounded-xl bg-blue-50/60 border border-blue-100 p-3 text-xs text-gray-600 flex items-start gap-2">
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-blue-600 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2381_15119)">
<path d="M7.9987 14.6654C11.6806 14.6654 14.6654 11.6806 14.6654 7.9987C14.6654 4.3168 11.6806 1.33203 7.9987 1.33203C4.3168 1.33203 1.33203 4.3168 1.33203 7.9987C1.33203 11.6806 4.3168 14.6654 7.9987 14.6654Z" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 10.6667V8" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 5.33203H8.00667" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2381_15119">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

              </div>
              No extra fee. Charged in USD.
            </div>

            <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2381_15141)">
<path d="M10 6.50022C10 9.00022 8.25 10.2502 6.17 10.9752C6.06108 11.0121 5.94277 11.0104 5.835 10.9702C3.75 10.2502 2 9.00022 2 6.50022V3.00022C2 2.86762 2.05268 2.74044 2.14645 2.64667C2.24021 2.5529 2.36739 2.50022 2.5 2.50022C3.5 2.50022 4.75 1.90022 5.62 1.14022C5.72593 1.04972 5.86068 1 6 1C6.13932 1 6.27407 1.04972 6.38 1.14022C7.255 1.90522 8.5 2.50022 9.5 2.50022C9.63261 2.50022 9.75979 2.5529 9.85355 2.64667C9.94732 2.74044 10 2.86762 10 3.00022V6.50022Z" stroke="#717182" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2381_15141">
<rect width="12" height="12" fill="white"/>
</clipPath>
</defs>
</svg>

                </div>
                PCI DSS
              </div>

              <div className="flex items-center gap-1">
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2381_15146)">
<path d="M9.5 5.5H2.5C1.94772 5.5 1.5 5.94772 1.5 6.5V10C1.5 10.5523 1.94772 11 2.5 11H9.5C10.0523 11 10.5 10.5523 10.5 10V6.5C10.5 5.94772 10.0523 5.5 9.5 5.5Z" stroke="#717182" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.5 5.5V3.5C3.5 2.83696 3.76339 2.20107 4.23223 1.73223C4.70107 1.26339 5.33696 1 6 1C6.66304 1 7.29893 1.26339 7.76777 1.73223C8.23661 2.20107 8.5 2.83696 8.5 3.5V5.5" stroke="#717182" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2381_15146">
<rect width="12" height="12" fill="white"/>
</clipPath>
</defs>
</svg>

                </div>
                256-bit SSL
              </div>

              <div className="flex items-center gap-1">
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 3L4.5 8.5L2 6" stroke="#717182" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </div>
                Tokenized by Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
