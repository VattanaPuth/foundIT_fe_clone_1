"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { cartMockData } from "@/app/components/styles/client_styles/cart_1/mockData";
import {
  CartItem,
  formatMoney,
  getLicensePrice,
  handleKeyboardActivate,
} from "@/app/components/styles/client_styles/cart_1/types";

import PaymentMethodCardSection from "@/app/components/styles/client_styles/cart_1/checkout/PaymentMethodCardSection";
import BillingAddressSection from "@/app/components/styles/client_styles/cart_1/checkout/BillingAddressSection";
import ProjectRequirementsSection from "@/app/components/styles/client_styles/cart_1/checkout/ProjectRequirementsSection";

function CheckboxRow({
  checked,
  onToggle,
  text,
  ariaLabel,
}: {
  checked: boolean;
  onToggle: () => void;
  text: string;
  ariaLabel: string;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => handleKeyboardActivate(e, onToggle)}
      className="flex items-start gap-3 cursor-pointer select-none"
      aria-label={ariaLabel}
    >
      {/* FIX: keep square even */}
      <div
        className={`mt-0.5 h-5 w-5 shrink-0 rounded border flex items-center justify-center
        ${
          checked ? "bg-green-500 border-green-600" : "bg-white border-gray-300"
        }`}
        aria-hidden="true"
      >
        {checked ? (
          <span className="text-white text-xs leading-none">✓</span>
        ) : null}
      </div>
      <div className="text-sm text-gray-700 leading-5">{text}</div>
    </div>
  );
}

function SummaryItemRow({
  title,
  author,
  sales,
  price,
  imageColor,
}: {
  title: string;
  author: string;
  sales: number;
  price: string;
  imageColor: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`h-10 w-10 rounded-lg ${imageColor}`}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-gray-900 truncate">
          {title}
        </div>
        <div className="text-xs text-gray-500">by {author}</div>
        <div className="text-xs text-gray-500">
          {sales.toLocaleString()} sales
        </div>
      </div>
      <div className="text-sm font-semibold text-gray-900">{price}</div>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();

  const [items] = useState<CartItem[]>(cartMockData);
  const [showAllItems, setShowAllItems] = useState(false);

  // ✅ read discount from localStorage (set in cart page)
  const [discountRate, setDiscountRate] = useState(0);
useEffect(() => {
  const code = window.localStorage.getItem("cart_coupon_code");

  if (code !== "SAVE10") {
    setDiscountRate(0);
    window.localStorage.setItem("cart_discount_rate", "0"); // reset stored rate too
    return;
  }

  const raw = window.localStorage.getItem("cart_discount_rate");
  const n = raw ? Number(raw) : 0;
  setDiscountRate(Number.isFinite(n) ? n : 0);
}, []);


  const hasMore = items.length > 3;
  const visibleItems = showAllItems ? items : items.slice(0, 3);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, it) => sum + getLicensePrice(it.basePrice, it.license),
        0
      ),
    [items]
  );

  const discount = useMemo(
    () => subtotal * discountRate,
    [subtotal, discountRate]
  );
  const discountedSubtotal = useMemo(
    () => Math.max(0, subtotal - discount),
    [subtotal, discount]
  );

  const taxRate = 0.1;
  const tax = useMemo(() => discountedSubtotal * taxRate, [discountedSubtotal]);
  const total = useMemo(
    () => discountedSubtotal + tax,
    [discountedSubtotal, tax]
  );

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const canComplete = agreeTerms && receiveUpdates;

  function goBackToCart() {
    router.push("/page/cart");
  }

  function completeOrder() {
    // placeholder
    // router.push("/page/success");
    void router;
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* You will import Header + Footer yourself here */}

      <main className="mx-auto w-full max-w-6xl px-4 pt-6 pb-24 md:px-6">
        {/* Back */}
        <div className="mb-4">
          <div
            role="button"
            tabIndex={0}
            onClick={goBackToCart}
            onKeyDown={(e) => handleKeyboardActivate(e, goBackToCart)}
            className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer select-none
                       transition duration-150 ease-out active:scale-[0.98]"
            aria-label="Back to cart"
          >
            <span className="text-base leading-none">←</span>
            <span>Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT: exactly 3 sections */}
          <section className="lg:col-span-2 space-y-5">
            <PaymentMethodCardSection />
            <BillingAddressSection />
            <ProjectRequirementsSection />
          </section>

          {/* RIGHT */}
          <aside className="lg:col-span-1">
            <div className="bg-white border rounded-xl shadow-sm p-5 sticky top-4">
              <div className="text-sm font-semibold text-gray-900">
                Order Summary
              </div>

              <div className="mt-4 space-y-3">
                {visibleItems.map((it) => {
                  const price = getLicensePrice(it.basePrice, it.license);
                  return (
                    <SummaryItemRow
                      key={it.id}
                      title={it.title}
                      author={it.author}
                      sales={it.sales}
                      imageColor={it.imageColor}
                      price={formatMoney(price)}
                    />
                  );
                })}

                {hasMore ? (
                  <div className="pt-1">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setShowAllItems((v) => !v)}
                      onKeyDown={(e) =>
                        handleKeyboardActivate(e, () =>
                          setShowAllItems((v) => !v)
                        )
                      }
                      className="text-sm text-gray-700 cursor-pointer select-none inline-flex items-center
                                 hover:text-gray-900 transition active:scale-[0.99]"
                      aria-label="Toggle more items"
                    >
                      {showAllItems
                        ? "Show less"
                        : `More (${items.length - 3})`}
                      <span className="ml-2 text-gray-500">
                        {showAllItems ? "▴" : "▾"}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="my-4 border-t" />

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>

                {discountRate > 0 ? (
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
                  <span className="text-sm font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    {formatMoney(total)}
                  </span>
                </div>

                {discountRate > 0 ? (
                  <div className="text-xs text-green-600 mt-1">
                    Coupon applied: 10% off
                  </div>
                ) : null}
              </div>

              <div className="mt-5 space-y-3">
                <CheckboxRow
                  checked={agreeTerms}
                  onToggle={() => setAgreeTerms((v) => !v)}
                  text="I agree to the Terms of Service and Privacy Policy"
                  ariaLabel="Agree to terms"
                />
                <CheckboxRow
                  checked={receiveUpdates}
                  onToggle={() => setReceiveUpdates((v) => !v)}
                  text="I want to receive updates about new products and offers"
                  ariaLabel="Receive updates"
                />
              </div>
              {/* Payment security note */}
<div className="mt-5 rounded-xl bg-gray-50 border px-4 py-3 flex items-center gap-3">
  <div className="text-green-600 shrink-0" aria-hidden="true">
    <svg
      width="25"
      height="25"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1983_12153)">
        <path
          d="M13.3327 8.66566C13.3327 11.999 10.9993 13.6657 8.22602 14.6323C8.08079 14.6815 7.92304 14.6792 7.77935 14.6257C4.99935 13.6657 2.66602 11.999 2.66602 8.66566V3.999C2.66602 3.82219 2.73625 3.65262 2.86128 3.52759C2.9863 3.40257 3.15587 3.33233 3.33268 3.33233C4.66602 3.33233 6.33268 2.53233 7.49268 1.519C7.63392 1.39833 7.81358 1.33203 7.99935 1.33203C8.18511 1.33203 8.36478 1.39833 8.50602 1.519C9.67268 2.539 11.3327 3.33233 12.666 3.33233C12.8428 3.33233 13.0124 3.40257 13.1374 3.52759C13.2624 3.65262 13.3327 3.82219 13.3327 3.999V8.66566Z"
          stroke="#00A63E"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1983_12153">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </div>

  <div className="text-sm text-[#717182]">
    <span className="font-medium">Your payment info is secure 256-bit SSL encrypted</span>
    
  </div>
</div>

              <div className="mt-5">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    if (!canComplete) return;
                    completeOrder();
                  }}
                  onKeyDown={(e) =>
                    handleKeyboardActivate(e, () => {
                      if (!canComplete) return;
                      completeOrder();
                    })
                  }
                  className={`w-full rounded-md px-4 py-2 text-center text-sm font-medium select-none transition active:scale-[0.99]
                    ${
                      canComplete
                        ? "bg-green-500 text-white cursor-pointer hover:bg-green-600"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  aria-label="Complete order"
                >
                  Complete Order
                </div>

                {!canComplete ? (
                  <div className="mt-2 text-xs text-gray-500">
                    Please check both boxes to complete the order.
                  </div>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
