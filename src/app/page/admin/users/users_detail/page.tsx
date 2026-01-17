"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminTopbar from "@/app/components/styles/admin_styles/Topbar";
import AdminSidebar from "@/app/components/styles/admin_styles/Sidebar";
import { adminNavItems } from "@/app/components/styles/admin_styles/mockData";
import { IconMenu } from "@/app/components/styles/admin_styles/Icon";

import UserHeaderCard from "@/app/components/styles/admin_styles/usersDetail/UserHeaderCard";
import UserStatsStrip from "@/app/components/styles/admin_styles/usersDetail/UserStatsStrip";
import UserTabs, {
  UserTabKey,
} from "@/app/components/styles/admin_styles/usersDetail/usersTabs";
import UserBioCard from "@/app/components/styles/admin_styles/usersDetail/UserBioCard";

import OverviewPanels from "@/app/components/styles/admin_styles/usersDetail/tabs/OverviewPanels";
import ClientTabPanels from "@/app/components/styles/admin_styles/usersDetail/tabs/ClientTabPanels";
import SellerTabPanels from "@/app/components/styles/admin_styles/usersDetail/tabs/SellerTabPanels";
import ActivityLogTab from "@/app/components/styles/admin_styles/usersDetail/tabs/ActivityLogTab";
import FinancialTab from "@/app/components/styles/admin_styles/usersDetail/tabs/FinancialTab";
import FreelancerTabPanels from "@/app/components/styles/admin_styles/usersDetail/tabs/FreelancerTabPanels";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export default function AdminUsersDetailPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [status, setStatus] = useState<"Active" | "Removed">("Active");
  const [tab, setTab] = useState<UserTabKey>("overview");

  // lock scroll when sidebar is open (mobile drawer)
  useEffect(() => {
    if (!sidebarOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminTopbar />

      <div className="flex">
        <AdminSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          items={adminNavItems}
        />

        <main className="min-w-0 flex-1 px-4 md:px-6 py-6 overflow-x-hidden">
          {/* Back row */}
          <div className="flex items-center gap-3">
            <div className="md:hidden">
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

            <div
              role="button"
              tabIndex={0}
              onClick={() => router.push("/page/admin/users")}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () =>
                  router.push("/page/admin/users")
                )
              }
              className="inline-flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none hover:text-gray-900"
              aria-label="Back to users"
            >
              <IconBack />
              Back to Users
            </div>
          </div>

          {/* Header card */}
          <div className="mt-4">
            <UserHeaderCard
              name="Ling He"
              email="sarah.chen@example.com"
              location="Cambodia"
              lastActive="12/23/2024"
              joined="1/15/2024"
              status={status}
              verified
              roles={["Freelancer", "Client", "Seller"]}
              onToggleStatus={() =>
                setStatus((p) => (p === "Active" ? "Removed" : "Active"))
              }
            />
          </div>

          {/* 4 stat cards */}
          <div className="mt-6">
            <UserStatsStrip />
          </div>

          {/* Tabs */}
          <div className="mt-5">
            <UserTabs value={tab} onChange={setTab} />
          </div>

          {/* Tab content */}
          <div className="mt-4">
            {tab === "overview" && <OverviewPanels status={status} />}
            {tab === "freelancer" && <FreelancerTabPanels />}
            
            {tab === "client" && <ClientTabPanels />}
            {tab === "seller" && <SellerTabPanels />}
            {tab === "activity" && <ActivityLogTab />}
            {tab === "financial" && <FinancialTab />}
          </div>

          {/* Bio */}
          <div className="mt-6">
            <UserBioCard />
          </div>
        </main>
      </div>
    </div>
  );
}

function IconBack() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 18 9 12l6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
