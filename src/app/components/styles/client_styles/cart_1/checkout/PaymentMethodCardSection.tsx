"use client";

import React, { useState } from "react";

type MethodKey = "card";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
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

export default function PaymentMethodCardSection() {
  const [method, setMethod] = useState<MethodKey>("card");

  return (
    <section className="bg-white border rounded-xl shadow-sm p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        <span aria-hidden="true"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.666 4.16797H3.33268C2.41221 4.16797 1.66602 4.91416 1.66602 5.83464V14.168C1.66602 15.0884 2.41221 15.8346 3.33268 15.8346H16.666C17.5865 15.8346 18.3327 15.0884 18.3327 14.168V5.83464C18.3327 4.91416 17.5865 4.16797 16.666 4.16797Z" stroke="#1A1A1A" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.66602 8.33203H18.3327" stroke="#1A1A1A" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
        <span>Payment Method - Card</span>
      </div>

      <div className="mt-4 space-y-3">
        {/* Card Number */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-700">Card Number</div>
          <TextInput placeholder="1234 5678 9012 3456" ariaLabel="Card number" />
        </div>

        {/* Expiry + CVV */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-700">Expiry Date</div>
            <TextInput placeholder="MM/YY" ariaLabel="Expiry date" />
          </div>

          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-700">CVV</div>
            <TextInput placeholder="123" ariaLabel="CVV" />
          </div>
        </div>

        {/* Name on card */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-700">Name on Card</div>
          <TextInput placeholder="John Doe" ariaLabel="Name on card" />
        </div>

        {/* (Optional) method selector UI placeholder — keeps design flexible */}
        <div className="hidden">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setMethod("card")}
            onKeyDown={(e) =>
              handleKeyboardActivate(e, () => setMethod("card"))
            }
          />
          {method}
        </div>
      </div>
    </section>
  );
}
