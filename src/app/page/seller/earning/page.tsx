"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Hero from "@/app/components/styles/seller/earning/hero";
import StatRow from "@/app/components/styles/seller/earning/statrow";
import Breakdown from "@/app/components/styles/seller/earning/breakdown";
import QuickAction from "@/app/components/styles/seller/earning/quickaction";
import PayMethod from "@/app/components/styles/seller/earning/paymethod";
import Timeline from "@/app/components/styles/seller/earning/timeline";
import RecentTx from "@/app/components/styles/seller/earning/recent";
import { handleKeyboardActivate } from "@/app/components/styles/seller/earning/utils";
import { IconDoc } from "@/app/components/styles/client_styles/library/components/icons";
import { IconDownload } from "@/app/components/styles/admin/Icon";
import WithdrawModal from "@/app/components/styles/seller/earning/withdrawmodal";
import AddPayModal from "@/app/components/styles/seller/earning/addpaymodal";

export default function Page() {
  const router = useRouter();

  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<
    "withdraw" | "tax" | "statement"
  >("withdraw");

  const [addPayOpen, setAddPayOpen] = useState(false);

  const statItems = useMemo(
    () => [
      {
        id: "s1",
        title: "Total Earnings",
        value: "$15,760",
        sub: "All time revenue",
        accent: "blue" as const,
      },
      {
        id: "s2",
        title: "This Month",
        value: "$2,340",
        sub: "vs $1,890 last month",
        accent: "orange" as const,
        note: "+23.8%",
      },
      {
        id: "s3",
        title: "Pending Clearance",
        value: "$450",
        sub: "Available in 7-14 days",
        accent: "amber" as const,
      },
      {
        id: "s4",
        title: "Monthly Goal",
        value: "78%",
        sub: "$2,340 / $3,000 goal",
        accent: "green" as const,
        right: (
          <div className="w-14">
            <div className="h-2 rounded-full bg-green-100 overflow-hidden mt-2">
              <div
                className="h-full bg-green-600 rounded-full"
                style={{ width: "78%" }}
              />
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const breakdownRows = useMemo(
    () => [
      {
        id: "m1",
        month: "Jan",
        tag: "Current",
        orders: "12 orders completed",
        amount: 2340,
        isCurrent: true,
      },
      {
        id: "m2",
        month: "Dec",
        orders: "9 orders completed",
        amount: 1890,
        trend: "19%",
        trendDir: "down" as const,
      },
      {
        id: "m3",
        month: "Nov",
        orders: "11 orders completed",
        amount: 2100,
        trend: "11%",
        trendDir: "up" as const,
      },
      {
        id: "m4",
        month: "Oct",
        orders: "8 orders completed",
        amount: 1750,
        trend: "17%",
        trendDir: "down" as const,
      },
      {
        id: "m5",
        month: "Sep",
        orders: "10 orders completed",
        amount: 1950,
        trend: "11%",
        trendDir: "up" as const,
      },
      {
        id: "m6",
        month: "Aug",
        orders: "13 orders completed",
        amount: 2250,
        trend: "15%",
        trendDir: "up" as const,
      },
    ],
    []
  );

  const txItems = useMemo(
    () => [
      {
        id: "t1",
        title: "Professional Logo Design & Brand Identity",
        meta: "Bun seavlang  •  ORD-2024-001",
        status: "Completed" as const,
        date: "2024-01-15",
        extra: "Available 2024-01-29",
        amount: 250,
        accent: "blue" as const,
      },
      {
        id: "t2",
        title: "Custom Website Development",
        meta: "Jeon Jungkook  •  ORD-2024-002",
        status: "Pending Clearance" as const,
        date: "2024-01-12",
        extra: "Available 2024-01-26",
        amount: 800,
        accent: "amber" as const,
      },
      {
        id: "t3",
        title: "Video Editing & Motion Graphics",
        meta: "Kim Mama  •  ORD-2024-003",
        status: "Ready to Withdraw" as const,
        date: "2024-01-08",
        extra: "Available now",
        amount: 150,
        accent: "green" as const,
      },
      {
        id: "t4",
        title: "AI Content Generation Tool",
        meta: "Innovation Labs  •  ORD-2024-004",
        status: "Withdrawn" as const,
        date: "2024-01-05",
        extra: "",
        amount: 1200,
        accent: "gray" as const,
      },
    ],
    []
  );

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Back"
          onClick={() => router.push("/page/seller/landingpage")}
          onKeyDown={(e) =>
            handleKeyboardActivate(e, () => router.push("/page/seller/landingpage"))
          }
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer select-none"
        >
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>
          Back
        </div>

        {/* Header */}
        <div className="mt-3">
          <div className="text-2xl font-semibold text-gray-900">
            Your Earnings Dashboard
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Track your income, manage payouts, and grow your business
          </div>
        </div>

        {/* Hero */}
        <div className="mt-6">
          <Hero amount="$1,890" onWithdraw={() => setWithdrawOpen(true)} />
        </div>

        {/* Stats */}
        <div className="mt-6">
          <StatRow items={statItems} />
        </div>

        {/* Main grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <Breakdown rows={breakdownRows} />
          </div>

          <div className="lg:col-span-4 space-y-4">
            <QuickAction
              items={[
                {
                  id: "withdraw",
                  label: "Withdraw Funds",
                  icon: (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.6667 4.66667V2.66667C12.6667 2.48986 12.5964 2.32029 12.4714 2.19526C12.3464 2.07024 12.1768 2 12 2H3.33333C2.97971 2 2.64057 2.14048 2.39052 2.39052C2.14048 2.64057 2 2.97971 2 3.33333C2 3.68696 2.14048 4.02609 2.39052 4.27614C2.64057 4.52619 2.97971 4.66667 3.33333 4.66667H13.3333C13.5101 4.66667 13.6797 4.7369 13.8047 4.86193C13.9298 4.98695 14 5.15652 14 5.33333V8M14 8H12C11.6464 8 11.3072 8.14048 11.0572 8.39052C10.8071 8.64057 10.6667 8.97971 10.6667 9.33333C10.6667 9.68696 10.8071 10.0261 11.0572 10.2761C11.3072 10.5262 11.6464 10.6667 12 10.6667H14C14.1768 10.6667 14.3464 10.5964 14.4714 10.4714C14.5964 10.3464 14.6667 10.1768 14.6667 10V8.66667C14.6667 8.48986 14.5964 8.32029 14.4714 8.19526C14.3464 8.07024 14.1768 8 14 8Z"
                        stroke="black"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2 3.33203V12.6654C2 13.019 2.14048 13.3581 2.39052 13.6082C2.64057 13.8582 2.97971 13.9987 3.33333 13.9987H13.3333C13.5101 13.9987 13.6797 13.9285 13.8047 13.8034C13.9298 13.6784 14 13.5088 14 13.332V10.6654"
                        stroke="black"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ),
                  onClick: () => setWithdrawOpen(true),
                },
                {
                  id: "tax",
                  label: "Tax Information",
                  icon: <IconDoc />,
                  onClick: () => router.push("/page/seller/earning/taxinfo"),
                },
                {
                  id: "statement",
                  label: "Download Statement",
                  icon: <IconDownload />,
                  onClick: () => {
                    // blank for now
                  },
                },
              ]}
            />

            <PayMethod
              methodName="PayPal"
              email="user@email.com"
              onChange={() => setAddPayOpen(true)}
            />

            <Timeline />
          </div>
        </div>

        {/* Recent tx */}
        <div className="mt-6">
          <RecentTx items={txItems} />
        </div>
      </div>

      {/* Blank modals */}
      <WithdrawModal
        open={withdrawOpen}
        balance={1890}
        onClose={() => setWithdrawOpen(false)}
        onAddMethod={() => {
          setWithdrawOpen(false);
          setAddPayOpen(true);
        }}
      />

      <AddPayModal open={addPayOpen} onClose={() => setAddPayOpen(false)} />
    </div>
  );
}
