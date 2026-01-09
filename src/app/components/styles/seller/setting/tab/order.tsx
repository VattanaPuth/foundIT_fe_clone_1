"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Select from "@/app/components/styles/seller/setting/select";
import { cn, handleKeyboardActivate } from "@/app/components/styles/seller/setting/utils";

type Milestone = {
  id: string;
  title: string;
  status: "Completed" | "In Progress" | "Awaiting";
};

type Order = {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  highlight?: boolean;
  status: string;
  milestones?: Milestone[];
};

function Pill({ text }: { text: string }) {
  return (
    <div className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-orange-100 text-orange-700">
      {text}
    </div>
  );
}

function RowBtn({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => handleKeyboardActivate(e, () => onClick?.())}
      className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 flex items-center justify-center cursor-pointer select-none hover:bg-gray-50"
      aria-label={label}
    >
      {label}
    </div>
  );
}

export default function OrderTab() {
  const router = useRouter();

  const [statusById, setStatusById] = useState<Record<string, string>>({
    "12345": "Completed",
    "12343": "In Progress",
  });

  function setOrderStatus(id: string, v: string) {
    setStatusById((prev) => ({ ...prev, [id]: v }));
  }

  const orders: Order[] = [
    {
      id: "12345",
      title: "Order #12345",
      subtitle: "Modern Dashboard UI Kit · $49.00",
      meta: "Ordered 2 hours ago by @johndoe",
      status: statusById["12345"] ?? "Completed",
    },
    {
      id: "12344",
      title: "Order #12344 - Custom Design Project",
      subtitle: "Landing Page Design Service · $299.00",
      meta: "Ordered 2 days ago by @sarahsmith",
      highlight: true,
      status: "In Progress",
      milestones: [
        { id: "m1", title: "Initial Concept", status: "Completed" },
        { id: "m2", title: "Design Mockup", status: "In Progress" },
        { id: "m3", title: "Final Delivery", status: "Awaiting" },
      ],
    },
    {
      id: "12343",
      title: "Order #12343",
      subtitle: "Icon Pack - 500+ Icons · $29.00",
      meta: "Ordered 1 day ago by @mikechen",
      status: statusById["12343"] ?? "In Progress",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold text-gray-900">
              Order Management
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Manage and track your orders and milestones
            </div>
          </div>
          <Pill text="3 Active" />
        </div>

        <div className="mt-5 border-t border-gray-100" />

        <div className="mt-5 space-y-4">
          {orders.map((o) => {
            const bg = o.highlight
              ? "bg-orange-50/50 border-orange-200"
              : "bg-white border-gray-200";

            return (
              <div
                key={o.id}
                className={cn("rounded-xl border shadow-sm p-5", bg)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900">
                      {o.title}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {o.subtitle}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{o.meta}</div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    {(o.id === "12345" || o.id === "12343") && (
                      <div className="w-44">
                        <Select
                          ariaLabel="Order status"
                          value={statusById[o.id] ?? o.status}
                          options={["Completed", "In Progress", "Awaiting"]}
                          onChange={(v) => setOrderStatus(o.id, v)}
                        />
                      </div>
                    )}

                    <RowBtn
                      label="View"
                      onClick={() => {
                        if (o.id === "12344") {
                          router.push("/page/seller/setting/orderdetail");
                        }
                      }}
                    />
                  </div>
                </div>

                {o.milestones && (
                  <>
                    <div className="mt-5 border-t border-orange-100" />
                    <div className="mt-4">
                      <div className="text-xs font-semibold text-orange-700">
                        Project Milestones
                      </div>

                      <div className="mt-3 space-y-2">
                        {o.milestones.map((m) => {
                          const tone =
                            m.status === "Completed"
                              ? "border-gray-200 bg-white"
                              : m.status === "In Progress"
                              ? "border-orange-400 bg-white"
                              : "border-transparent bg-transparent";

                          const rightTone =
                            m.status === "Completed"
                              ? "text-gray-500"
                              : m.status === "In Progress"
                              ? "text-orange-700"
                              : "text-gray-400";

                          const iconTone =
                            m.status === "Completed"
                              ? "text-green-600"
                              : m.status === "In Progress"
                              ? "text-orange-600"
                              : "text-gray-300";

                          return (
                            <div
                              key={m.id}
                              className={cn(
                                "rounded-lg px-4 py-3 flex items-center justify-between",
                                "border",
                                tone
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={cn(
                                    "w-4 h-4 flex items-center justify-center flex-shrink-0",
                                    iconTone
                                  )}
                                >
                                  ICON
                                </div>
                                <div
                                  className={cn(
                                    "text-sm",
                                    m.status === "Awaiting"
                                      ? "text-gray-400"
                                      : "text-gray-800"
                                  )}
                                >
                                  {m.title}
                                </div>
                              </div>

                              <div className={cn("text-xs font-medium", rightTone)}>
                                {m.status}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="text-lg font-semibold text-gray-900">
          Earnings & Payouts
        </div>
        <div className="text-sm text-gray-500 mt-1">
          Track your earnings and manage payouts
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="text-sm text-gray-500">Total Earnings</div>
            <div className="mt-2 text-2xl font-semibold text-orange-600">
              $1,247
            </div>
          </div>

          <div className="rounded-xl border border-orange-200 bg-orange-50/40 p-5">
            <div className="text-sm text-gray-500">Available</div>
            <div className="mt-2 text-2xl font-semibold text-orange-600">
              $432
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50/40 p-5">
            <div className="text-sm text-gray-500">Pending</div>
            <div className="mt-2 text-2xl font-semibold text-gray-700">
              $115
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-orange-200 bg-orange-50/40 p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
              <div className="w-4 h-4 flex items-center justify-center text-white flex-shrink-0">
                ICON
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                Stripe Connected
              </div>
              <div className="text-xs text-gray-500">account****@email.com</div>
            </div>
          </div>

          <div className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 flex items-center justify-center">
            Manage
          </div>
        </div>

        <div className="mt-4">
          <div
            role="button"
            tabIndex={0}
            onClick={() => router.push("/page/seller/home")}
            onKeyDown={(e) =>
              handleKeyboardActivate(e, () => router.push("/page/seller/home"))
            }
            className="h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center text-sm font-medium cursor-pointer select-none"
            aria-label="Request payout"
          >
            Request Payout ($432 Available)
          </div>

          <div className="mt-3 h-11 rounded-xl border border-gray-200 bg-white text-gray-700 flex items-center justify-center text-sm">
            <div className="w-4 h-4 mr-2 flex items-center justify-center text-gray-500 flex-shrink-0">
              ICON
            </div>
            View Transaction History
          </div>
        </div>
      </div>
    </div>
  );
}
