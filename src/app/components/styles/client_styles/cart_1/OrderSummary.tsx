"use client";

import React, { useState } from "react";
import {
  formatMoney,
  handleKeyboardActivate,
} from "@/app/components/styles/client_styles/cart_1/types";

export default function OrderSummary({
  subtotal,
  discount,
  tax,
  total,
  onApplyDiscountRate,
  onProceed,
}: {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  onApplyDiscountRate: (rate: number) => void; // 0.1 = 10%
  onProceed: () => void;
}) {
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isDiscountActive, setIsDiscountActive] = useState(false);

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();

    if (code === "SAVE10") {
      onApplyDiscountRate(0.1);
      setIsDiscountActive(true);
      setMessage("Coupon applied: 10% off");

      window.localStorage.setItem("cart_discount_rate", "0.1");
      window.localStorage.setItem("cart_coupon_code", "SAVE10");
      return;
    }

    if (code === "") {
      onApplyDiscountRate(0);
      setIsDiscountActive(false);
      setMessage(null);

      window.localStorage.setItem("cart_discount_rate", "0");
      window.localStorage.removeItem("cart_coupon_code");
      return;
    }

    onApplyDiscountRate(0);
    setIsDiscountActive(false);
    setMessage("Invalid coupon code");

    window.localStorage.setItem("cart_discount_rate", "0");
    window.localStorage.removeItem("cart_coupon_code");
  }

  function removeCoupon() {
    setCoupon("");
    setIsDiscountActive(false);
    setMessage(null);

    onApplyDiscountRate(0);

    window.localStorage.setItem("cart_discount_rate", "0");
    window.localStorage.removeItem("cart_coupon_code");
  }

  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 sticky top-4">
      <div className="text-sm font-semibold text-gray-900">Order Summary</div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatMoney(subtotal)}</span>
        </div>

        {discount > 0 ? (
          <div className="flex items-center justify-between text-gray-600">
            <span>Discount</span>
            <span>-{formatMoney(discount)}</span>
          </div>
        ) : null}

        <div className="flex items-center justify-between text-gray-600">
          <span>Tax</span>
          <span>{formatMoney(tax)}</span>
        </div>

        <div className="my-3 border-t" />

        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">Total</span>
          <span className="text-lg font-semibold text-gray-900">
            {formatMoney(total)}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div
          role="button"
          tabIndex={0}
          onClick={onProceed}
          onKeyDown={(e) => handleKeyboardActivate(e, onProceed)}
          className="w-full rounded-md bg-orange-500 px-4 py-2 text-center text-sm font-medium text-white cursor-pointer select-none
                     hover:bg-orange-600 transition active:scale-[0.99]"
          aria-label="Proceed to Checkout"
        >
          Proceed to Checkout
        </div>
      </div>

      {/* coupon */}
      <div className="mt-4 space-y-2">
        <div className="text-xs text-gray-500">Coupon code</div>

        <input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter coupon"
          className="w-full rounded-md border bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none
                     focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />

        <div
          role="button"
          tabIndex={0}
          onClick={applyCoupon}
          onKeyDown={(e) => handleKeyboardActivate(e, applyCoupon)}
          className="w-full rounded-md border bg-white px-4 py-2 text-center text-sm text-gray-700 cursor-pointer select-none
                     hover:bg-gray-50 hover:border-gray-300 transition active:scale-[0.99] mt-2"
          aria-label="Apply coupon"
        >
          Apply Coupon
        </div>

        {message ? (
          <div className="flex items-center justify-between gap-3">
            <div
              className={`text-xs ${
                isDiscountActive ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </div>

            {isDiscountActive ? (
              <div
                role="button"
                tabIndex={0}
                onClick={removeCoupon}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, removeCoupon)
                }
                className="text-xs text-gray-600 cursor-pointer select-none hover:text-gray-900 underline underline-offset-2"
                aria-label="Remove coupon"
              >
                Remove
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
