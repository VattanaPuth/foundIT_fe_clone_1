"use client";

import React, { useMemo, useState } from "react";

import Shell from "@/app/components/styles/seller/setting/shell";
import OverviewTab from "@/app/components/styles/seller/setting/tab/overview";
import OrderTab from "@/app/components/styles/seller/setting/tab/order";
import PayoutTab from "@/app/components/styles/seller/setting/tab/payout";
import NotiTab from "@/app/components/styles/seller/setting/tab/noti";
import AccountTab from "@/app/components/styles/seller/setting/tab/account";
import SecurityTab from "@/app/components/styles/seller/setting/tab/security";
import type { NavItem } from "@/app/components/styles/seller/setting/shell";


export type TabId = "overview" | "order" | "payout" | "noti" | "account" | "security";

export default function Page() {
  const [tab, setTab] = useState<TabId>("overview");
  const [drawer, setDrawer] = useState(false);

const nav = useMemo<NavItem[]>(
  () => [
    {
      id: "identity",
      label: "Identity Verification",
      sublabel: "",
      pill: "Action Required",
      disabled: true,
    },
    { id: "overview", label: "Overview" },
    { id: "order", label: "Orders & Fulfillment" },
    { id: "payout", label: "Payouts & Taxes" },
    { id: "noti", label: "Notifications" },
    { id: "divider", label: "" },
    { id: "account", label: "Account" },
    { id: "security", label: "Security" },
  ],
  []
);


  return (
    <Shell
      title="Shop Settings"
      nav={nav}
      activeTab={tab}
      onChangeTab={(t) => setTab(t)}
      drawerOpen={drawer}
      onToggleDrawer={() => setDrawer((v) => !v)}
      onCloseDrawer={() => setDrawer(false)}
    >
      {tab === "overview" && <OverviewTab />}
      {tab === "order" && <OrderTab />}
      {tab === "payout" && <PayoutTab />}
      {tab === "noti" && <NotiTab />}
      {tab === "account" && <AccountTab />}
      {tab === "security" && <SecurityTab />}
    </Shell>
  );
}
