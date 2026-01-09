"use client";

import React from "react";
import { handleKeyboardActivate } from "@/app/components/styles/seller/earning/utils";
import { IconDoc } from "@/app/components/styles/client_styles/library/components/icons";

export default function PayMethod({
  methodName,
  email,
  onChange,
}: {
  methodName: string;
  email: string;
  onChange: () => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-orange-600">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.668 4.16797H3.33464C2.41416 4.16797 1.66797 4.91416 1.66797 5.83464V14.168C1.66797 15.0884 2.41416 15.8346 3.33464 15.8346H16.668C17.5884 15.8346 18.3346 15.0884 18.3346 14.168V5.83464C18.3346 4.91416 17.5884 4.16797 16.668 4.16797Z" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.66797 8.33203H18.3346" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </div>
        Payment Method
      </div>

      <div className="mt-4 rounded-xl bg-gray-50 border border-gray-200 p-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8333 5.83333V3.33333C15.8333 3.11232 15.7455 2.90036 15.5893 2.74408C15.433 2.5878 15.221 2.5 15 2.5H4.16667C3.72464 2.5 3.30072 2.67559 2.98816 2.98816C2.67559 3.30072 2.5 3.72464 2.5 4.16667C2.5 4.60869 2.67559 5.03262 2.98816 5.34518C3.30072 5.65774 3.72464 5.83333 4.16667 5.83333H16.6667C16.8877 5.83333 17.0996 5.92113 17.2559 6.07741C17.4122 6.23369 17.5 6.44565 17.5 6.66667V10M17.5 10H15C14.558 10 14.134 10.1756 13.8215 10.4882C13.5089 10.8007 13.3333 11.2246 13.3333 11.6667C13.3333 12.1087 13.5089 12.5326 13.8215 12.8452C14.134 13.1577 14.558 13.3333 15 13.3333H17.5C17.721 13.3333 17.933 13.2455 18.0893 13.0893C18.2455 12.933 18.3333 12.721 18.3333 12.5V10.8333C18.3333 10.6123 18.2455 10.4004 18.0893 10.2441C17.933 10.0878 17.721 10 17.5 10Z" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.5 4.16797V15.8346C2.5 16.2767 2.67559 16.7006 2.98816 17.0131C3.30072 17.3257 3.72464 17.5013 4.16667 17.5013H16.6667C16.8877 17.5013 17.0996 17.4135 17.2559 17.2572C17.4122 17.1009 17.5 16.889 17.5 16.668V13.3346" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
          </div>

          <div className="min-w-0">
            <div className="text-sm font-medium text-gray-900">{methodName}</div>
            <div className="text-xs text-gray-500 truncate">{email}</div>
          </div>
        </div>

        <div className="mt-3">
          <div
            role="button"
            tabIndex={0}
            aria-label="Change method"
            onClick={onChange}
            onKeyDown={(e) => handleKeyboardActivate(e, onChange)}
            className="h-9 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-xs font-medium text-gray-700 cursor-pointer select-none"
          >
            Change Method
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-xs text-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2381_16010)">
<path d="M2.00171 7.0013C1.90709 7.00162 1.81432 6.97509 1.73418 6.92479C1.65404 6.87449 1.58982 6.80248 1.54898 6.71713C1.50814 6.63178 1.49235 6.5366 1.50345 6.44263C1.51456 6.34867 1.5521 6.25978 1.61171 6.1863L6.56171 1.0863C6.59884 1.04344 6.64943 1.01448 6.7052 1.00417C6.76096 0.993857 6.81857 1.00281 6.86857 1.02955C6.91857 1.0563 6.958 1.09925 6.98037 1.15136C7.00275 1.20346 7.00674 1.26163 6.9917 1.3163L6.03171 4.3263C6.0034 4.40206 5.99389 4.48356 6.004 4.56381C6.01411 4.64405 6.04354 4.72064 6.08975 4.78702C6.13597 4.85339 6.19759 4.90756 6.26934 4.94488C6.34109 4.98221 6.42083 5.00157 6.50171 5.0013H10.0017C10.0963 5.00098 10.1891 5.02751 10.2692 5.07781C10.3494 5.12812 10.4136 5.20012 10.4544 5.28547C10.4953 5.37082 10.5111 5.46601 10.5 5.55997C10.4889 5.65394 10.4513 5.74282 10.3917 5.8163L5.44171 10.9163C5.40457 10.9592 5.35398 10.9881 5.29821 10.9984C5.24245 11.0087 5.18484 10.9998 5.13484 10.9731C5.08484 10.9463 5.04541 10.9034 5.02304 10.8512C5.00066 10.7991 4.99667 10.741 5.01171 10.6863L5.9717 7.6763C6.00001 7.60054 6.00952 7.51904 5.99941 7.4388C5.9893 7.35856 5.95988 7.28196 5.91366 7.21559C5.86744 7.14922 5.80582 7.09504 5.73407 7.05772C5.66232 7.0204 5.58258 7.00104 5.50171 7.0013H2.00171Z" stroke="#717182" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2381_16010">
<rect width="12" height="12" fill="white"/>
</clipPath>
</defs>
</svg>

            </div>
            Auto-withdraw
          </div>
          <div className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-gray-600">
            Disabled
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2381_16017)">
<path d="M7.5 1H3C2.73478 1 2.48043 1.10536 2.29289 1.29289C2.10536 1.48043 2 1.73478 2 2V10C2 10.2652 2.10536 10.5196 2.29289 10.7071C2.48043 10.8946 2.73478 11 3 11H9C9.26522 11 9.51957 10.8946 9.70711 10.7071C9.89464 10.5196 10 10.2652 10 10V3.5L7.5 1Z" stroke="#717182" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 1V3C7 3.26522 7.10536 3.51957 7.29289 3.70711C7.48043 3.89464 7.73478 4 8 4H10" stroke="#717182" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 4.5H4" stroke="#717182" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 6.5H4" stroke="#717182" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 8.5H4" stroke="#717182" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2381_16017">
<rect width="12" height="12" fill="white"/>
</clipPath>
</defs>
</svg>

            </div>
            Tax Rate
          </div>
          <div className="text-gray-700 font-medium">0%</div>
        </div>

        <div className="pt-2">
          <div
            role="button"
            tabIndex={0}
            aria-label="Update settings"
            className="h-9 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-xs font-medium text-gray-700 cursor-pointer select-none"
          >
            Update Settings
          </div>
        </div>
      </div>
    </div>
  );
}
