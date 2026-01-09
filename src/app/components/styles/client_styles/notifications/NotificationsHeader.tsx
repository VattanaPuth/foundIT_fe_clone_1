"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { handleKeyboardActivate } from "@/app/components/styles/client_styles/notifications/types";

export default function NotificationsHeader({
  unreadCount,
  onMarkAllAsRead,
  title = "Notifications",
}: {
  unreadCount: number;
  onMarkAllAsRead: () => void;
  title?: string;
}) {
  const router = useRouter();

  function goBack() {
    router.back();
  }

  return (
    <div>
      {/* Back row (spacing like your sample) */}
      <div className="mb-3">
        <div
          role="button"
          tabIndex={0}
          onClick={goBack}
          onKeyDown={(e) => handleKeyboardActivate(e, goBack)}
          className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer select-none
                     transition duration-150 ease-out active:scale-[0.98]"
          aria-label="Go back"
        >
          <span className="text-base leading-none">←</span>
          <span>Back</span>
        </div>
      </div>

      {/* Title + action row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          <p className="mt-1 text-sm text-gray-500">
            You have <span className="font-medium">{unreadCount}</span> unread
            notifications
          </p>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={onMarkAllAsRead}
          onKeyDown={(e) => handleKeyboardActivate(e, onMarkAllAsRead)}
          className="rounded-md border bg-white px-3 py-2 text-sm text-gray-700 shadow-sm cursor-pointer select-none
                     hover:bg-gray-50 hover:border-gray-300
                     transition duration-150 ease-out active:scale-[0.98]"
          aria-label="Mark all notifications as read"
        >
          Mark all as read
        </div>
      </div>
    </div>
  );
}
