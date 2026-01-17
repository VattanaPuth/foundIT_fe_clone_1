import React, { useState } from "react";
import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartProps {
  items?: CartItem[];
  onBrowseProducts?: () => void;
  onProceedToCheckout?: () => void;
  onApplyCoupon?: (code: string) => void;
}

export default function Cart({
  items = [],
  onBrowseProducts,
  onProceedToCheckout,
  onApplyCoupon,
}: CartProps) {
  const [couponCode, setCouponCode] = useState("");

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.1; // 10% tax example
  const total = subtotal + tax;

  const handleApplyCoupon = () => {
    if (couponCode.trim() && onApplyCoupon) {
      onApplyCoupon(couponCode);
      setCouponCode("");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="w-full mx-auto">
        <div className="text-2xl md:text-3xl mt-6 text-gray-900 mb-6">
          Shopping Cart
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl mt-12 border border-gray-300 shadow-sm p-6 md:p-8">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 md:py-16">
                  {/* Cart Icon SVG */}
                  <div className="mb-6">
                    <svg
                      className="w-20 h-20 md:w-24 md:h-24 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>

                  <div className="text-xl md:text-2xl text-gray-900 mb-2">
                    Your cart is empty
                  </div>

                  <div className="text-sm md:text-base text-gray-600 mb-6 text-center">
                    Browse our marketplace to find amazing templates and assets
                  </div>

                  <div
                    onClick={onBrowseProducts}
                    className="inline-flex items-center gap-2 bg-[#00BC7D] hover:bg-[#3dce9e] text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors"
                  >
                    <span>Browse Products</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg
                              className="w-10 h-10 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </div>
                      </div>
                      <div className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl mt-12 border border-gray-300 shadow-sm p-6 sticky top-6">
              <div className="text-2xl text-gray-900 mb-6">Order Summary</div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div
                onClick={onProceedToCheckout}
                className="w-full bg-[#00BC7D] hover:bg-[#3dce9e] text-white py-3 rounded-lg font-medium text-center cursor-pointer transition-colors mb-2"
              >
                Proceed to Checkout
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                <div
                  onClick={handleApplyCoupon}
                  className="w-full bg-white mt-[12px] hover:bg-gray-50 border border-gray-300 text-gray-900 py-3 rounded-lg font-medium text-center cursor-pointer transition-colors"
                >
                  Apply Coupon
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
