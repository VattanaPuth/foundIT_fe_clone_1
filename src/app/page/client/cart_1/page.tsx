"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import ClientNavHeader from "@/app/components/styles/global_styles/client/header";
import ClientFooter from "@/app/components/styles/global_styles/client/footer";
import CartItemCard from "@/app/components/styles/client_styles/cart_1/CartItemCard";
import OrderSummary from "@/app/components/styles/client_styles/cart_1/OrderSummary";
import { cartMockData } from "@/app/components/styles/client_styles/cart_1/mockData";
import { CartItem, LicenseKey, getLicensePrice } from "@/app/components/styles/client_styles/cart_1/types";

export default function CartPage() {
  const router = useRouter();

  const [items, setItems] = useState<CartItem[]>(cartMockData);
  const [discountRate, setDiscountRate] = useState(0); // 0.1 = 10%

  const subtotal = useMemo(() => {
    return items.reduce(
      (sum, it) => sum + getLicensePrice(it.basePrice, it.license),
      0
    );
  }, [items]);

  const discount = useMemo(() => subtotal * discountRate, [subtotal, discountRate]);

  const discountedSubtotal = useMemo(
    () => Math.max(0, subtotal - discount),
    [subtotal, discount]
  );

  const taxRate = 0.1; // mock 10%
  const tax = useMemo(() => discountedSubtotal * taxRate, [discountedSubtotal]);

  const total = useMemo(() => discountedSubtotal + tax, [discountedSubtotal, tax]);

  function removeItem(id: string) {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  function changeLicense(id: string, license: LicenseKey) {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, license } : x)));
  }

  function goCheckout() {
    router.push("/page/cart/checkout");
  }

  return (
    <>
    <ClientNavHeader/>
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* You will import Header + Footer yourself here */}

      <main className="mx-auto w-full max-w-6xl px-4 pt-6 pb-24 md:px-6">
        <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left */}
          <section className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <div className="bg-white border rounded-xl shadow-sm p-6 text-center text-gray-600">
                Your cart is empty.
              </div>
            ) : (
              items.map((it) => (
                <CartItemCard
                  key={it.id}
                  item={it}
                  onRemove={removeItem}
                  onChangeLicense={changeLicense}
                />
              ))
            )}
          </section>

          {/* Right */}
          <aside className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              tax={tax}
              total={total}
              onApplyDiscountRate={setDiscountRate}
              onProceed={goCheckout}
            />
          </aside>
        </div>
      </main>
    </div>
    <ClientFooter/>
    </>
  );
}
