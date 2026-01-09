"use client";

import React, { useMemo, useState } from "react";

import Top from "@/app/components/styles/seller/home/myproduct/productdetail/top";
import Kpi from "@/app/components/styles/seller/home/myproduct/productdetail/kpi";
import Tab from "@/app/components/styles/seller/home/myproduct/productdetail/tab";
import Overview from "@/app/components/styles/seller/home/myproduct/productdetail/overview";
import Buyer from "@/app/components/styles/seller/home/myproduct/productdetail/buyer";
import Revenue from "@/app/components/styles/seller/home/myproduct/productdetail/revenue";
import Perf from "@/app/components/styles/seller/home/myproduct/productdetail/perf";
import Modal from "@/app/components/styles/seller/home/myproduct/productdetail/modal";

export default function Page() {
  const [tab, setTab] = useState<"overview" | "buyers" | "revenue" | "performance">(
    "overview"
  );
  const [updateOpen, setUpdateOpen] = useState(false);

  // NOTE:
  // - Buyers tab uses 9 mock rows (and paginates 8 + 1).
  // - KPI "Total Buyers" is static to match the design screenshot.
  const kpiItems = useMemo(
    () => [
      {
        title: "Total Buyers",
        value: "9",
        sub: "239 unique buyers",
        delta: "+12.5%",
        iconKey: "users" as const,
      },
      {
        title: "Total Revenue",
        value: "$18,450",
        sub: "Net: $15,682.5",
        delta: "+18.3%",
        iconKey: "money" as const,
      },
      {
        title: "Conversion Rate",
        value: "7.2%",
        sub: "3,421 total views",
        delta: "+2.1%",
        iconKey: "trend" as const,
      },
      {
        title: "Average Rating",
        value: "4.9",
        sub: "186 reviews",
        delta: "",
        iconKey: "star" as const,
        stars: 5,
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* header/footer intentionally NOT included */}

      <main className="mx-auto w-full max-w-7xl px-4 md:px-6 py-6">
        <Top onOpenUpdate={() => setUpdateOpen(true)} />

        <div className="mt-6">
          <Kpi items={kpiItems} />
        </div>

        <div className="mt-5">
          <Tab value={tab} onChange={setTab} />
        </div>

        <div className="mt-5">
          {tab === "overview" ? <Overview /> : null}
          {tab === "buyers" ? <Buyer /> : null}
          {tab === "revenue" ? <Revenue /> : null}
          {tab === "performance" ? <Perf /> : null}
        </div>
      </main>

      {updateOpen ? <Modal buyersCount={0} onClose={() => setUpdateOpen(false)} /> : null}
    </div>
  );
}
