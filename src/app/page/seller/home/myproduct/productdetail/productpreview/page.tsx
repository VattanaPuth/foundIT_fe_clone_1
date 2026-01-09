"use client";

import React from "react";

import Gallery from "@/app/components/styles/seller/productpreview/gallery";
import Pricebox from "@/app/components/styles/seller/productpreview/pricebox";
import Tabarea from "@/app/components/styles/seller/productpreview/tabs";
import Sellerbox from "@/app/components/styles/seller/productpreview/sellerbox";
import Also from "@/app/components/styles/seller/productpreview/also";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-5 md:py-7">
        {/* breadcrumb */}
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.9987 12.6654L3.33203 7.9987L7.9987 3.33203" stroke="#717182" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.6654 8H3.33203" stroke="#717182" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </div>
          <div className="truncate">Back to Marketplace</div>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
          {/* left */}
          <div className="space-y-5">
            <Gallery />
            <Tabarea />
            <Sellerbox />
          </div>

          {/* right */}
          <div className="space-y-5">
            <Pricebox />
            <Also />
          </div>
        </div>
      </div>
    </div>
  );
}
