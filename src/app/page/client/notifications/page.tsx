"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import ClientNavHeader from "@/app/components/styles/global_styles/client/header";
import ClientFooter from "@/app/components/styles/global_styles/client/footer";
import NotificationsHeader from "@/app/components/styles/client_styles/notifications/NotificationsHeader";
import NotificationCard from "@/app/components/styles/client_styles/notifications/NotificationCard";
import { NotificationItem } from "@/app/components/styles/client_styles/notifications/types";
import { notificationsMockData } from "@/app/components/styles/client_styles/notifications/mockData";

export default function NotificationsPage() {
  const router = useRouter();

  const [items, setItems] = useState<NotificationItem[]>(notificationsMockData);

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
    // Placeholder: set routes later per item
    // Example later: if (n.actionRoute) router.push(n.actionRoute);
    void router;
    void n;
  }

  return (
    <><ClientNavHeader/>
    <div className="min-h-screen bg-gray-50">
      {/* You will import Header + Footer yourself here */}

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
              />
            ))
          )}
        </section>
      </main>
    </div>
    <ClientFooter/>
    </>
  );
}
