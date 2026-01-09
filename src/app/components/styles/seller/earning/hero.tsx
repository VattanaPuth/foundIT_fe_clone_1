"use client";

import React from "react";
import { handleKeyboardActivate } from "@/app/components/styles/seller/earning/utils";

export default function Hero({
  amount,
  onWithdraw,
}: {
  amount: string;
  onWithdraw: () => void;
}) {
  return (
    <div className="bg-orange-50 border border-orange-100 rounded-2xl shadow-sm p-5 sm:p-6 flex items-center justify-between gap-6">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-orange-600">
           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8333 5.83333V3.33333C15.8333 3.11232 15.7455 2.90036 15.5893 2.74408C15.433 2.5878 15.221 2.5 15 2.5H4.16667C3.72464 2.5 3.30072 2.67559 2.98816 2.98816C2.67559 3.30072 2.5 3.72464 2.5 4.16667C2.5 4.60869 2.67559 5.03262 2.98816 5.34518C3.30072 5.65774 3.72464 5.83333 4.16667 5.83333H16.6667C16.8877 5.83333 17.0996 5.92113 17.2559 6.07741C17.4122 6.23369 17.5 6.44565 17.5 6.66667V10M17.5 10H15C14.558 10 14.134 10.1756 13.8215 10.4882C13.5089 10.8007 13.3333 11.2246 13.3333 11.6667C13.3333 12.1087 13.5089 12.5326 13.8215 12.8452C14.134 13.1577 14.558 13.3333 15 13.3333H17.5C17.721 13.3333 17.933 13.2455 18.0893 13.0893C18.2455 12.933 18.3333 12.721 18.3333 12.5V10.8333C18.3333 10.6123 18.2455 10.4004 18.0893 10.2441C17.933 10.0878 17.721 10 17.5 10Z" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.5 4.16797V15.8346C2.5 16.2767 2.67559 16.7006 2.98816 17.0131C3.30072 17.3257 3.72464 17.5013 4.16667 17.5013H16.6667C16.8877 17.5013 17.0996 17.4135 17.2559 17.2572C17.4122 17.1009 17.5 16.889 17.5 16.668V13.3346" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </div>
          Ready to withdraw
        </div>

        <div className="mt-2 text-2xl sm:text-3xl font-semibold text-orange-600">
          {amount}
        </div>

        <div className="mt-2 text-xs sm:text-sm text-gray-500 max-w-xl">
          This money is available for immediate withdrawal to your connected
          payment method
        </div>

        <div className="mt-4">
          <div
            role="button"
            tabIndex={0}
            aria-label="Withdraw now"
            onClick={onWithdraw}
            onKeyDown={(e) => handleKeyboardActivate(e, onWithdraw)}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium cursor-pointer select-none"
          >
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2381_15582)">
<path d="M12.6667 4.66667V2.66667C12.6667 2.48986 12.5964 2.32029 12.4714 2.19526C12.3464 2.07024 12.1768 2 12 2H3.33333C2.97971 2 2.64057 2.14048 2.39052 2.39052C2.14048 2.64057 2 2.97971 2 3.33333C2 3.68696 2.14048 4.02609 2.39052 4.27614C2.64057 4.52619 2.97971 4.66667 3.33333 4.66667H13.3333C13.5101 4.66667 13.6797 4.7369 13.8047 4.86193C13.9298 4.98695 14 5.15652 14 5.33333V8M14 8H12C11.6464 8 11.3072 8.14048 11.0572 8.39052C10.8071 8.64057 10.6667 8.97971 10.6667 9.33333C10.6667 9.68696 10.8071 10.0261 11.0572 10.2761C11.3072 10.5262 11.6464 10.6667 12 10.6667H14C14.1768 10.6667 14.3464 10.5964 14.4714 10.4714C14.5964 10.3464 14.6667 10.1768 14.6667 10V8.66667C14.6667 8.48986 14.5964 8.32029 14.4714 8.19526C14.3464 8.07024 14.1768 8 14 8Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 3.33203V12.6654C2 13.019 2.14048 13.3581 2.39052 13.6082C2.64057 13.8582 2.97971 13.9987 3.33333 13.9987H13.3333C13.5101 13.9987 13.6797 13.9285 13.8047 13.8034C13.9298 13.6784 14 13.5088 14 13.332V10.6654" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2381_15582">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

            </div>
            Withdraw Now
          </div>
        </div>
      </div>

      <div className="flex-shrink-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8"
              aria-hidden="true"
            >
              <path d="M12 1v22" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
