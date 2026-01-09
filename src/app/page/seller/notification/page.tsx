"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// swap these to your seller header/footer components


import NotificationsHeader from "@/app/components/styles/client_styles/notifications/NotificationsHeader";
import NotificationCard from "@/app/components/styles/client_styles/notifications/NotificationCard";
import { NotificationItem } from "@/app/components/styles/client_styles/notifications/types";
import { sellerNotificationsMockData } from "@/app/components/styles/client_styles/notifications/sellerMockData";
import ClientNavHeader from "@/app/components/styles/global_styles/client/header";
import ClientFooter from "@/app/components/styles/global_styles/client/footer";

export default function SellerNotificationsPage() {
  const router = useRouter();
  const [items, setItems] = useState<NotificationItem[]>(
    sellerNotificationsMockData
  );

  const unreadCount = useMemo(
    () => items.filter((n) => n.isUnread).length,
    [items]
  );

  function markAllAsRead() {
    setItems((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  }

  function markOneAsRead(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n))
    );
  }

  function runPrimaryAction(n: NotificationItem) {
    // hook routes later
    void router;
    void n;
  }

  return (
    <>
      <ClientNavHeader />

      <div className="min-h-screen bg-gray-50">
        <main className="mx-auto max-w-4xl px-4 pt-6 pb-24 md:px-6">
          <NotificationsHeader
            unreadCount={unreadCount}
            onMarkAllAsRead={markAllAsRead}
            
          />

          <section className="mt-6 space-y-4">
            {items.length === 0 ? (
              <div className="bg-white border rounded-xl shadow-sm p-6 text-center text-gray-600">
                You’re all caught up.
              </div>
            ) : (
              items.map((n) => (
                <NotificationCard
                  key={n.id}
                  item={n}
                  onMarkAsRead={markOneAsRead}
                  onPrimaryAction={runPrimaryAction}
                  variant="seller"
                />
              ))
            )}
          </section>
        </main>
      </div>

      <ClientFooter />
    </>
  );
}
