// src/app/page/admin/dashboard/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import AdminSidebar from "@/app/components/styles/admin_styles/Sidebar";
import AdminTopbar from "@/app/components/styles/admin_styles/Topbar";
import { ProtectedRoute } from "@/app/components/auth/ProtectedRoute";
import { Role } from "@/app/types/auth";

import {
  adminNavItems,
  dashboardStats,
  type AdminStatCard,
} from "@/app/components/styles/admin_styles/mockData";
import {
  IconAlert,
  IconClipboard,
  IconMenu,
  IconMoney,
  IconUsers,
  IconUserPlus,
  IconBox,
  IconCube,
  IconUser,
} from "@/app/components/styles/admin_styles/Icon";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function getStatIcon(iconKey: AdminStatCard["iconKey"]) {
  if (iconKey === "cube") return <IconCube />;
  if (iconKey === "clipboard") return <IconClipboard />;
  if (iconKey === "users") return <IconUser />;
  if (iconKey === "userPlus") return <IconUserPlus />;
  if (iconKey === "alert") return <IconAlert />;
  return <IconMoney />;
}

export default function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navItems = useMemo(() => adminNavItems, []);

  // ESC closes drawer
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSidebarOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // ✅ Lock background scroll when sidebar is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (sidebarOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [sidebarOpen]);

  return (
    <ProtectedRoute requiredRole={Role.ADMIN}>
      <div className="h-screen bg-gray-50">
        <AdminTopbar />

        {/* Under topbar: make it full height of viewport */}
        <div className="flex min-h-[calc(100vh-76px)]">
          <AdminSidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            items={navItems}
          />

          <main className="flex-1 px-4 md:px-6 py-6">
            {/* Header row + mobile hamburger (NOT in topbar) */}
            <div className="flex items-start gap-3 mb-6">
              <div className="md:hidden pt-0.5">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSidebarOpen(true)}
                  onKeyDown={(e) =>
                    handleKeyboardActivate(e, () => setSidebarOpen(true))
                  }
                  className="h-10 w-10 rounded-md border border-gray-200 bg-white flex items-center justify-center cursor-pointer select-none hover:bg-gray-50 text-gray-900"
                  aria-label="Open sidebar"
                >
                  <IconMenu />
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Dashboard Overview
                </h1>
                <p className="mt-2 text-md text-gray-500">
                  Monitor platform activity and manage key metrics
                </p>
              </div>
            </div>

            <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardStats.map((c) => (
                <div
                  key={c.title}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-6"
                  aria-label={c.title}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={[
                        "h-10 w-10 rounded-lg flex items-center justify-center",
                        c.iconBgClass,
                        c.iconColorClass,
                      ].join(" ")}
                    >
                      {getStatIcon(c.iconKey)}
                    </div>

                    <div
                      className={[
                        "text-xs px-2 py-1 rounded-full",
                        c.badgeClass
                          ? c.badgeClass
                          : "bg-gray-100 text-gray-700",
                      ].join(" ")}
                    >
                      {c.delta}
                    </div>
                  </div>

                  <div className="mt-10">
                    <div className="text-sm text-gray-500">{c.title}</div>
                    <div className="mt-2 text-3xl font-semibold text-gray-900">
                      {c.value}
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
