"use client";

import React, { useState } from "react";
import { IconEye } from "../../admin/Icon";

function handleKeyboardActivate(e: React.KeyboardEvent, onActivate: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export default function Gallery() {
  /**
   * ✅ PUT YOUR IMAGE SRC HERE
   * Examples:
   * - "/productpreview/main.png" (file in /public/productpreview/main.png)
   * - "/Primitive.img (1).png" (file in /public/Primitive.img (1).png)
   */
  const images = [
    "/images/p1.png",
    "/images/p3.png",
    "/images/p2.png",
  ];

  const [idx, setIdx] = useState(0);

  function prev() {
    setIdx((v) => (v - 1 + images.length) % images.length);
  }
  function next() {
    setIdx((v) => (v + 1) % images.length);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* big preview */}
      <div className="relative h-56 sm:h-64 md:h-80 bg-gradient-to-r from-orange-200 to-orange-100">
        <img
          src={images[idx]}
          alt="Preview"
          className="h-full w-full object-contain"
        />

        {/* arrows */}
        <div
          role="button"
          tabIndex={0}
          onClick={prev}
          onKeyDown={(e) => handleKeyboardActivate(e, prev)}
          className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center hover:bg-white select-none"
          aria-label="Previous image"
        >
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 15L7.5 10L12.5 5" stroke="#364153" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </div>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={next}
          onKeyDown={(e) => handleKeyboardActivate(e, next)}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center hover:bg-white select-none"
          aria-label="Next image"
        >
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 15L12.5 10L7.5 5" stroke="#364153" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </div>
        </div>

        {/* top right pill (static UI) */}
        <div className="absolute right-3 top-3">
          <div className="h-7 px-3 rounded-full bg-emerald-600 text-white text-xs flex items-center">
            Verified Safe
          </div>
        </div>
      </div>

      {/* thumb row + live preview row */}
      <div className="p-3 space-y-3">
        <div className="flex items-center gap-2">
          {images.map((src, i) => {
            const active = i === idx;
            return (
              <div
                key={src}
                role="button"
                tabIndex={0}
                onClick={() => setIdx(i)}
                onKeyDown={(e) => handleKeyboardActivate(e, () => setIdx(i))}
                className={[
                  "h-14 w-20 rounded-md border overflow-hidden bg-gray-50 flex items-center justify-center select-none",
                  active ? "border-orange-500" : "border-gray-200 hover:border-gray-300",
                ].join(" ")}
                aria-label={`Select thumbnail ${i + 1}`}
              >
                <img src={src} alt={`Thumb ${i + 1}`} className="h-full w-full object-cover" />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <div className="h-8 px-5  text-xs text-gray-600 flex items-center gap-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50">
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500 ">
              <IconEye/>
            </div>
            <div>Live Preview</div>
          </div>

          <div className="flex items-center gap-2">
            <div
              role="button"
              tabIndex={0}
              onClick={() => {}}
              onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
              className="h-8 px-3 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-xs text-gray-700 flex items-center gap-2 select-none"
              aria-label="Share"
            >
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2381_18808)">
<path d="M12 5.33203C13.1046 5.33203 14 4.4366 14 3.33203C14 2.22746 13.1046 1.33203 12 1.33203C10.8954 1.33203 10 2.22746 10 3.33203C10 4.4366 10.8954 5.33203 12 5.33203Z" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 10C5.10457 10 6 9.10457 6 8C6 6.89543 5.10457 6 4 6C2.89543 6 2 6.89543 2 8C2 9.10457 2.89543 10 4 10Z" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 14.668C13.1046 14.668 14 13.7725 14 12.668C14 11.5634 13.1046 10.668 12 10.668C10.8954 10.668 10 11.5634 10 12.668C10 13.7725 10.8954 14.668 12 14.668Z" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.72656 9.00781L10.2799 11.6611" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.2732 4.33984L5.72656 6.99318" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2381_18808">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

              </div>
              Share
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => {}}
              onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
              className="h-8 w-10 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-xs text-gray-700 flex items-center justify-center select-none"
              aria-label="Favorite"
            >
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2381_18815)">
<path d="M1.33203 6.33369C1.33204 5.59182 1.55709 4.86741 1.97745 4.25613C2.39781 3.64485 2.99371 3.17546 3.68644 2.90995C4.37916 2.64445 5.13614 2.59532 5.85737 2.76905C6.57861 2.94278 7.23018 3.33121 7.72603 3.88302C7.76096 3.92036 7.80318 3.95013 7.85008 3.97049C7.89698 3.99084 7.94757 4.00134 7.9987 4.00134C8.04983 4.00134 8.10041 3.99084 8.14731 3.97049C8.19422 3.95013 8.23644 3.92036 8.27136 3.88302C8.76566 3.32762 9.41738 2.93593 10.1398 2.76009C10.8622 2.58424 11.621 2.63258 12.3153 2.89867C13.0095 3.16477 13.6063 3.63599 14.0261 4.24962C14.4459 4.86325 14.6689 5.59019 14.6654 6.33369C14.6654 7.86035 13.6654 9.00035 12.6654 10.0004L9.00403 13.5424C8.87981 13.685 8.72665 13.7996 8.55473 13.8786C8.38281 13.9575 8.19606 13.9989 8.00689 14.0001C7.81772 14.0013 7.63046 13.9622 7.45756 13.8855C7.28465 13.8088 7.13005 13.6961 7.00403 13.555L3.33203 10.0004C2.33203 9.00035 1.33203 7.86702 1.33203 6.33369Z" stroke="#4A5565" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2381_18815">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
