"use client";

import React from "react";
import {
  CalendarDays,
  MapPin,
  Star,
  Users,
  Package,
  ShoppingBag,
} from "lucide-react";
import { IconStar } from "../../admin/Icon";

function handleKeyboardActivate(e: React.KeyboardEvent, onActivate: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function Pill({ text, tone }: { text: string; tone: "orange" | "purple" }) {
  const cls =
    tone === "orange"
      ? "bg-orange-100 text-orange-700 border-orange-200"
      : "bg-purple-100 text-purple-700 border-purple-200";

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${cls}`}>
      {text}
    </span>
  );
}

function StatMini({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-600">
      <div className="w-4 h-4 flex items-center justify-center text-gray-500">{icon}</div>
      <span className="text-gray-900 font-medium">{value}</span>
      <span className="text-gray-500">{label}</span>
    </div>
  );
}

export default function ProfileHeader({ onEditProfile }: { onEditProfile: () => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

        <div className="flex items-start gap-3 md:gap-4">

          {/* avatar */}
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            {/* swap with your real image */}
            <img
              src="/images/sellerpf.png"
              alt="Seller avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-sm font-semibold text-gray-900">Mash Wiki</div>
              <Pill text="Verified Seller" tone="orange" />
              <Pill text="Top Rated" tone="purple" />
            </div>

            <div className="mt-1 text-xs text-gray-500">
              Premium UI Kits &amp; Design Systems
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
              <StatMini icon={<IconStar />} value="4.9" label="(1,523 reviews)" />
              <StatMini icon={<ShoppingBag className="w-4 h-4" />} value="2,847" label="sales" />
              <StatMini icon={<Package className="w-4 h-4" />} value="24" label="products" />
              <StatMini icon={<Users className="w-4 h-4" />} value="3,891" label="followers" />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                Cambodia
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-400" />
                Joined January 2023
              </div>
            </div>
          </div>
        </div>

        {/* Edit profile */}
        <div
          role="button"
          tabIndex={0}
          onClick={onEditProfile}
          onKeyDown={(e) => handleKeyboardActivate(e, onEditProfile)}
          className="h-9 px-4 rounded-md border border-gray-200 bg-white text-sm text-gray-800
                     hover:bg-gray-50 cursor-pointer select-none flex items-center gap-2"
          aria-label="Edit profile"
        >
          <div className="flex items-center justify-center gap-2 w-full md:w-auto">
  <div className="w-4 h-4 flex items-center justify-center text-gray-500"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 2H3.33333C2.97971 2 2.64057 2.14048 2.39052 2.39052C2.14048 2.64057 2 2.97971 2 3.33333V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V8" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.2514 1.75015C12.5166 1.48493 12.8763 1.33594 13.2514 1.33594C13.6264 1.33594 13.9861 1.48493 14.2514 1.75015C14.5166 2.01537 14.6656 2.37508 14.6656 2.75015C14.6656 3.12522 14.5166 3.48493 14.2514 3.75015L8.2427 9.75948C8.0844 9.91765 7.88883 10.0334 7.67403 10.0962L5.7587 10.6562C5.70133 10.6729 5.64052 10.6739 5.58264 10.6591C5.52475 10.6442 5.47192 10.6141 5.42966 10.5719C5.38741 10.5296 5.35729 10.4768 5.34246 10.4189C5.32763 10.361 5.32863 10.3002 5.34536 10.2428L5.90536 8.32748C5.96838 8.11285 6.08439 7.91752 6.2427 7.75948L12.2514 1.75015Z" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
  <span>Edit Profile</span>
</div>
         
        </div>
      </div>
    </div>
  );
}
