"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * You said: "for star icon just use IconStar i will import at top myself"
 * For now this fallback keeps it runnable.
 * Replace it with: import { IconStar } from "...";
 */
function IconStar({ className = "" }: { className?: string }) {
  return (
    <div className={`w-4 h-4 flex items-center justify-center flex-shrink-0 ${className}`}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.60306 1.91371C9.63958 1.83993 9.696 1.77782 9.76594 1.7344C9.83588 1.69098 9.91657 1.66797 9.9989 1.66797C10.0812 1.66797 10.1619 1.69098 10.2319 1.7344C10.3018 1.77782 10.3582 1.83993 10.3947 1.91371L12.3197 5.81288C12.4465 6.06952 12.6337 6.29155 12.8652 6.45992C13.0968 6.6283 13.3657 6.73797 13.6489 6.77955L17.9539 7.40955C18.0355 7.42137 18.1121 7.45577 18.1751 7.50888C18.2382 7.56199 18.2851 7.63167 18.3106 7.71005C18.3361 7.78843 18.3391 7.87239 18.3194 7.95241C18.2996 8.03243 18.2579 8.10534 18.1989 8.16288L15.0856 11.1945C14.8802 11.3946 14.7266 11.6416 14.6379 11.9142C14.5492 12.1869 14.5281 12.477 14.5764 12.7595L15.3114 17.0429C15.3258 17.1244 15.317 17.2083 15.286 17.2851C15.255 17.3619 15.203 17.4284 15.136 17.477C15.069 17.5257 14.9897 17.5545 14.9071 17.5603C14.8245 17.566 14.742 17.5485 14.6689 17.5095L10.8206 15.4862C10.567 15.3531 10.2849 15.2835 9.99848 15.2835C9.71208 15.2835 9.42996 15.3531 9.1764 15.4862L5.3289 17.5095C5.25584 17.5482 5.17339 17.5656 5.09094 17.5598C5.00848 17.5539 4.92933 17.525 4.86247 17.4764C4.79562 17.4278 4.74376 17.3614 4.71278 17.2847C4.6818 17.2081 4.67294 17.1243 4.68723 17.0429L5.4214 12.7604C5.46989 12.4777 5.44888 12.1874 5.36018 11.9146C5.27147 11.6418 5.11774 11.3947 4.91223 11.1945L1.7989 8.16371C1.73939 8.10624 1.69722 8.03321 1.6772 7.95294C1.65717 7.87267 1.66009 7.78839 1.68563 7.70971C1.71116 7.63102 1.75828 7.56108 1.82163 7.50787C1.88497 7.45465 1.96198 7.4203 2.0439 7.40871L6.34806 6.77955C6.63161 6.7383 6.90089 6.62876 7.13272 6.46037C7.36454 6.29198 7.55198 6.06977 7.6789 5.81288L9.60306 1.91371Z" fill="#FDC700" stroke="#FDC700" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    </div>
  );
}

function handleKeyboardActivate(e: React.KeyboardEvent, onActivate: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

type LicenseKey = "personal" | "commercial" | "extended";

export default function Pricebox() {
  const router = useRouter();
  const [license, setLicense] = useState<LicenseKey>("personal");

  const plan = useMemo(() => {
    const data = {
      personal: {
        name: "Personal",
        price: 49,
        items: ["1 project", "Lifetime updates", "Email support"],
      },
      commercial: {
        name: "Commercial",
        price: 149,
        items: ["Unlimited projects", "Lifetime updates", "Priority support", "Source files"],
      },
      extended: {
        name: "Extended",
        price: 499,
        items: ["Unlimited projects", "Source files", "White-label rights", "Priority support", "Custom license"],
      },
    } as const;

    return data[license];
  }, [license]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      {/* title */}
      <div className="text-xl font-semibold text-gray-900">Modern Dashboard UI Kit</div>

      {/* rating row */}
      <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <IconStar className="text-orange-500" />
          <div className="font-semibold text-gray-900">4.9</div>
        </div>
        <div className="text-gray-500">(234 reviews)</div>
        <div className="text-gray-300 px-1">•</div>
        <div className="text-gray-500">2,341 sales</div>
      </div>

      {/* choose */}
      <div className="mt-5 text-sm text-gray-700">Choose Your Favorite</div>

      <div className="mt-3 space-y-3">
        <Plancard
          active={license === "personal"}
          title="Personal"
          price="$49"
          items={["1 project", "Lifetime updates", "Email support"]}
          onClick={() => setLicense("personal")}
        />

        <Plancard
          active={license === "commercial"}
          title="Commercial"
          price="$149"
          items={["Unlimited projects", "Lifetime updates", "Priority support", "Source files"]}
          onClick={() => setLicense("commercial")}
        />

        <Plancard
          active={license === "extended"}
          title="Extended"
          price="$499"
          items={["Unlimited projects", "Source files", "White-label rights", "Priority support", "Custom license"]}
          onClick={() => setLicense("extended")}
        />
      </div>

      {/* bottom price */}
      <div className="mt-6 flex items-end gap-2">
        <div className="text-3xl font-semibold text-gray-900">${plan.price}</div>
        <div className="text-sm text-gray-500 pb-1">one-time</div>
      </div>

      {/* buttons */}
      <div className="mt-4 space-y-3">
        <div
          role="button"
          tabIndex={0}
          onClick={() => router.push("/page/seller/home/myproduct")}
          onKeyDown={(e) =>
            handleKeyboardActivate(e, () => router.push("/page/seller/home/myproduct"))
          }
          className="h-11 rounded-md bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium flex items-center justify-center gap-2 select-none"
          aria-label="Add to cart"
        >
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-white">
           <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2381_19086)">
<path d="M5.33464 14.6654C5.70283 14.6654 6.0013 14.3669 6.0013 13.9987C6.0013 13.6305 5.70283 13.332 5.33464 13.332C4.96645 13.332 4.66797 13.6305 4.66797 13.9987C4.66797 14.3669 4.96645 14.6654 5.33464 14.6654Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.6667 14.6654C13.0349 14.6654 13.3333 14.3669 13.3333 13.9987C13.3333 13.6305 13.0349 13.332 12.6667 13.332C12.2985 13.332 12 13.6305 12 13.9987C12 14.3669 12.2985 14.6654 12.6667 14.6654Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.36719 1.36719H2.70052L4.47385 9.64719C4.53891 9.95043 4.70763 10.2215 4.951 10.4138C5.19436 10.606 5.49712 10.7074 5.80719 10.7005H12.3272C12.6306 10.7 12.9248 10.596 13.1612 10.4057C13.3976 10.2154 13.5619 9.95021 13.6272 9.65385L14.7272 4.70052H3.41385" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2381_19086">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

          </div>
          Add to Cart
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => router.push("/page/seller/home/myproduct")}
          onKeyDown={(e) =>
            handleKeyboardActivate(e, () => router.push("/page/seller/home/myproduct"))
          }
          className="h-10 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-900 flex items-center justify-center select-none"
          aria-label="Buy now"
        >
          Buy Now
        </div>
      </div>

      {/* guarantees */}
      <div className="mt-5 pt-4 border-t border-gray-100 space-y-2 text-sm text-gray-600">
        {[
          "30-day money-back guarantee",
          "Lifetime updates included",
          "Malware scan passed",
        ].map((t) => (
          <div key={t} className="flex items-start gap-2">
            <div className="mt-0.5 w-4 h-4 flex items-center justify-center flex-shrink-0 text-emerald-600">
             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3346 4L6.0013 11.3333L2.66797 8" stroke="#00BC7D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
            <div>{t}</div>
          </div>
        ))}

        <div className="flex items-start gap-2">
          <div className="mt-0.5 w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
           <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 10V2" stroke="#99A1AF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#99A1AF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.66797 6.66797L8.0013 10.0013L11.3346 6.66797" stroke="#99A1AF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </div>
          <div>Instant download after purchase</div>
        </div>
      </div>
    </div>
  );
}

function Plancard({
  active,
  title,
  price,
  items,
  onClick,
}: {
  active: boolean;
  title: string;
  price: string;
  items: string[];
  onClick: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => handleKeyboardActivate(e, onClick)}
      className={[
        "rounded-lg border p-4 select-none",
        active
          ? "border-orange-500 bg-orange-50"
          : "border-gray-200 bg-white hover:bg-gray-50",
      ].join(" ")}
      aria-label={`Select ${title}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        <div className="text-lg font-semibold text-gray-900">{price}</div>
      </div>

      <div className="mt-3 space-y-2">
        {items.map((t) => (
          <div key={t} className="flex items-start gap-2 text-sm text-gray-600">
            <div className="mt-0.5 w-4 h-4 flex items-center justify-center flex-shrink-0 text-orange-500">
              ✓
            </div>
            <div>{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
