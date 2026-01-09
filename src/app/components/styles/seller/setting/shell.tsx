"use client";

import React, { useEffect, useRef } from "react";
import Nav from "@/app/components/styles/seller/setting/nav";
import type { TabId } from "@/app/page/seller/setting/page";
import { cn, handleKeyboardActivate } from "@/app/components/styles/seller/setting/utils";
import { IconMenu } from "../../admin/Icon";

export type NavItem =
  | { id: "identity"; label: string; sublabel?: string; pill?: string; disabled?: boolean }
  | { id: "divider"; label: string }
  | { id: TabId; label: string };

export default function Shell({
  title,
  nav,
  activeTab,
  onChangeTab,
  drawerOpen,
  onToggleDrawer,
  onCloseDrawer,
  children,
}: {
  title: string;
  nav: NavItem[];
  activeTab: TabId;
  onChangeTab: (id: TabId) => void;
  drawerOpen: boolean;
  onToggleDrawer: () => void;
  onCloseDrawer: () => void;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!drawerOpen) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCloseDrawer();
    }
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(t)) onCloseDrawer();
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [drawerOpen, onCloseDrawer]);



  return (
    <div className=" bg-gray-50">
      <div className="w-full max-w-8xl mx-auto px-6 md:px-6 py-6">
        {/* Page header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
            <div className="w-4 h-4 flex items-center justify-center text-orange-600 flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.4896 2.1563C10.1771 1.84372 9.75329 1.66806 9.3113 1.66797H3.33464C2.89261 1.66797 2.46868 1.84356 2.15612 2.15612C1.84356 2.46868 1.66797 2.89261 1.66797 3.33464V9.3113C1.66806 9.75329 1.84372 10.1771 2.1563 10.4896L9.40964 17.743C9.7884 18.1193 10.3007 18.3306 10.8346 18.3306C11.3686 18.3306 11.8809 18.1193 12.2596 17.743L17.743 12.2596C18.1193 11.8809 18.3306 11.3686 18.3306 10.8346C18.3306 10.3007 18.1193 9.7884 17.743 9.40964L10.4896 2.1563Z" stroke="#E17100" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.2487 6.66536C6.47882 6.66536 6.66536 6.47882 6.66536 6.2487C6.66536 6.01858 6.47882 5.83203 6.2487 5.83203C6.01858 5.83203 5.83203 6.01858 5.83203 6.2487C5.83203 6.47882 6.01858 6.66536 6.2487 6.66536Z" fill="#E17100" stroke="#E17100" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-gray-900">{title}</div>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <div
              role="button"
              tabIndex={0}
              onClick={onToggleDrawer}
              onKeyDown={(e) => handleKeyboardActivate(e, onToggleDrawer)}
              className="h-10 px-3 rounded-lg border border-gray-200 bg-white shadow-sm text-sm text-gray-700 flex items-center gap-2 cursor-pointer select-none hover:bg-gray-50"
              aria-label="Open settings menu"
            >
              <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">
                <IconMenu/>
              </div>
              Menu
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar desktop */}
          <div className="hidden md:block">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3">
              <Nav nav={nav} activeTab={activeTab} onChangeTab={onChangeTab} />
            </div>
          </div>

          {/* Main */}
          <div>{children}</div>
        </div>
      </div>

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          drawerOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!drawerOpen}
      >
        <div className={cn("absolute inset-0 bg-black/30 transition-opacity", drawerOpen ? "opacity-100" : "opacity-0")} />
        <div
          ref={panelRef}
          className={cn(
            "absolute left-0 top-0 h-full w-[84%] max-w-[320px] bg-white border-r border-gray-200 shadow-xl transition-transform",
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="text-sm font-semibold text-gray-900">Settings</div>
            <div
              role="button"
              tabIndex={0}
              onClick={onCloseDrawer}
              onKeyDown={(e) => handleKeyboardActivate(e, onCloseDrawer)}
              className="h-9 w-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center cursor-pointer select-none hover:bg-gray-50"
              aria-label="Close settings menu"
            >
              <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0 ">
                X
              </div>
            </div>
          </div>

          <div className="p-3">
            <Nav
              nav={nav}
              activeTab={activeTab}
              onChangeTab={(t) => {
                onChangeTab(t);
                onCloseDrawer();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
