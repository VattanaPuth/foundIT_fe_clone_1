"use client";

import React from "react";
import type { TabId } from "@/app/page/seller/setting/page";
import { cn, handleKeyboardActivate } from "@/app/components/styles/seller/setting/utils";
import { IconShield } from "../../admin/Icon";

type NavItem =
  | { id: "identity"; label: string; sublabel?: string; pill?: string; disabled?: boolean }
  | { id: "divider"; label: string }
  | { id: TabId; label: string };
function NavIcon({ id }: { id: string }) {
  // Replace ICON text with your real icons later
  const map: Record<string, React.ReactNode> = {
    identity: <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">ID</div>,
    overview: <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 2H2.66667C2.29848 2 2 2.29848 2 2.66667V7.33333C2 7.70152 2.29848 8 2.66667 8H6C6.36819 8 6.66667 7.70152 6.66667 7.33333V2.66667C6.66667 2.29848 6.36819 2 6 2Z" stroke="CurrentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.332 2H9.9987C9.63051 2 9.33203 2.29848 9.33203 2.66667V4.66667C9.33203 5.03486 9.63051 5.33333 9.9987 5.33333H13.332C13.7002 5.33333 13.9987 5.03486 13.9987 4.66667V2.66667C13.9987 2.29848 13.7002 2 13.332 2Z" stroke="CurrentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.332 8H9.9987C9.63051 8 9.33203 8.29848 9.33203 8.66667V13.3333C9.33203 13.7015 9.63051 14 9.9987 14H13.332C13.7002 14 13.9987 13.7015 13.9987 13.3333V8.66667C13.9987 8.29848 13.7002 8 13.332 8Z" stroke="CurrentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 10.668H2.66667C2.29848 10.668 2 10.9664 2 11.3346V13.3346C2 13.7028 2.29848 14.0013 2.66667 14.0013H6C6.36819 14.0013 6.66667 13.7028 6.66667 13.3346V11.3346C6.66667 10.9664 6.36819 10.668 6 10.668Z" stroke="CurrentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>,
    order: <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2381_24718)">
<path d="M9.33203 12.0013V4.0013C9.33203 3.64768 9.19156 3.30854 8.94151 3.05849C8.69146 2.80844 8.35232 2.66797 7.9987 2.66797H2.66536C2.31174 2.66797 1.9726 2.80844 1.72256 3.05849C1.47251 3.30854 1.33203 3.64768 1.33203 4.0013V11.3346C1.33203 11.5114 1.40227 11.681 1.52729 11.806C1.65232 11.9311 1.82189 12.0013 1.9987 12.0013H3.33203" stroke="CurrentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 12H6" stroke="CurrentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.6654 11.9987H13.9987C14.1755 11.9987 14.3451 11.9285 14.4701 11.8034C14.5951 11.6784 14.6654 11.5088 14.6654 11.332V8.8987C14.6651 8.74741 14.6134 8.60071 14.5187 8.4827L12.1987 5.5827C12.1363 5.50462 12.0572 5.44155 11.9672 5.39816C11.8772 5.35477 11.7786 5.33217 11.6787 5.33203H9.33203" stroke="CurrentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.3333 13.3346C12.0697 13.3346 12.6667 12.7377 12.6667 12.0013C12.6667 11.2649 12.0697 10.668 11.3333 10.668C10.597 10.668 10 11.2649 10 12.0013C10 12.7377 10.597 13.3346 11.3333 13.3346Z" stroke="CurrentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.66536 13.3346C5.40174 13.3346 5.9987 12.7377 5.9987 12.0013C5.9987 11.2649 5.40174 10.668 4.66536 10.668C3.92898 10.668 3.33203 11.2649 3.33203 12.0013C3.33203 12.7377 3.92898 13.3346 4.66536 13.3346Z" stroke="CurrentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2381_24718">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
</div>,
    payout: <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">ICON</div>,
    noti: <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">ICON</div>,
    account: <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">ICON</div>,
    security: <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">ICON</div>,
  };

  return <>{map[id] ?? map.overview}</>;
}


export default function Nav({
  nav,
  activeTab,
  onChangeTab,
}: {
  nav: NavItem[];
  activeTab: TabId;
  onChangeTab: (id: TabId) => void;
}) {
  return (
    <div className="space-y-1">
      {nav.map((item) => {
        if (item.id === "divider") {
          return <div key="divider" className="my-2 border-t border-gray-100" />;
        }

        if (item.id === "identity") {
          return (
            <div
  key={item.id}
  className="rounded-lg border border-blue-100 bg-blue-50/60 p-3 flex items-start justify-between gap-3"
>
  <div className="w-9 h-9 rounded-lg bg-white border border-blue-100 flex items-center justify-center flex-shrink-0">
    <div className="w-4 h-4 flex items-center justify-center text-blue-600 flex-shrink-0">
      <IconShield />
    </div>
  </div>

  <div className="flex-1 min-w-0">
    <div className="text-sm font-medium text-blue-700 leading-5">
      Identity Verification
    </div>
  </div>

  <div className="flex-shrink-0 pt-0.5">
    <div className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-600 text-white whitespace-nowrap">
      Needed
    </div>
  </div>
</div>
          );
        }

        const isActive = activeTab === item.id;

        return (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => onChangeTab(item.id)}
            onKeyDown={(e) => handleKeyboardActivate(e, () => onChangeTab(item.id))}
            aria-label={`Open ${item.label}`}
            className={cn(
              "h-11 px-3 rounded-lg flex items-center gap-3 cursor-pointer select-none transition",
              isActive
                ? "bg-orange-50 border border-orange-200"
                : "hover:bg-gray-50 border border-transparent"
            )}
          >
            <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">
              <NavIcon id={item.id} />
            </div>
            <div className={cn("text-sm", isActive ? "text-orange-700 font-medium" : "text-gray-700")}>
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
