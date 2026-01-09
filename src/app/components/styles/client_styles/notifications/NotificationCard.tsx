"use client";

import React from "react";
import IconBadge from "@/app/components/styles/client_styles/notifications/IconBadge";
import PillTag from "@/app/components/styles/client_styles/notifications/PillTag";
import {
  NotificationItem,
  getTypeIcon,
  handleKeyboardActivate,
} from "@/app/components/styles/client_styles/notifications/types";

export default function NotificationCard({
  item,
  onMarkAsRead,
  onPrimaryAction,
  variant = "client",
}: {
  item: NotificationItem;
  onMarkAsRead: (id: string) => void;
  onPrimaryAction: (item: NotificationItem) => void;
  variant?: "client" | "seller";
}) {
  const icon = getTypeIcon(item.type, variant);

  const unreadStyles = item.isUnread
    ? variant === "seller"
      ? "border-2 border-orange-300 bg-orange-50/30"
      : "border-2 border-emerald-300 bg-emerald-50/30"
    : "border border-gray-200 bg-white";

  return (
    <div
      className={`border rounded-xl shadow-sm ${unreadStyles} transition duration-150 ease-out hover:shadow-md`}
    >
      <div className="flex gap-4 p-4">
        {/* Left icon / avatar */}
        <div className="pt-0.5">
          {typeof item.avatarSrc === "string" ? (
            <img
              src={item.avatarSrc || ""} 
              alt={item.avatarAlt || item.title}
              className="h-9 w-9 rounded-full object-cover border border-gray-200 bg-gray-100"
            />
          ) : (
            <IconBadge
              bg={icon.bg}
              icon={icon.icon}
              ariaLabel="Notification icon"
            />
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {item.title}
              </div>

              {item.meta ? (
                <div className="mt-1 text-sm text-gray-500">{item.meta}</div>
              ) : null}

              {/* Tags */}
              {item.tags && item.tags.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <PillTag key={t} text={t} />
                  ))}
                </div>
              ) : null}

              {/* Amount tag */}
              {item.amountTag ? (
                <div className="mt-2">
                  <div
                    className={
                      variant === "seller"
                        ? "inline-flex rounded-full bg-orange-500 px-2.5 py-1 text-xs font-medium text-white"
                        : "inline-flex rounded-full bg-green-500 px-2.5 py-1 text-xs font-medium text-white"
                    }
                  >
                    {item.amountTag}
                  </div>
                </div>
              ) : null}

              {/* Primary action */}
              {item.actionLabel ? (
                <div className="mt-3">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => onPrimaryAction(item)}
                    onKeyDown={(e) =>
                      handleKeyboardActivate(e, () => onPrimaryAction(item))
                    }
                    className="inline-flex rounded-md border bg-white px-3 py-2 text-sm text-gray-700 shadow-sm cursor-pointer select-none
                               hover:bg-gray-50 hover:border-gray-300
                               transition duration-150 ease-out active:scale-[0.98]"
                    aria-label={item.actionLabel}
                  >
                    {item.actionLabel}
                  </div>
                </div>
              ) : null}

              {/* Per-item mark as read */}
              <div className="mt-3">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onMarkAsRead(item.id)}
                  onKeyDown={(e) =>
                    handleKeyboardActivate(e, () => onMarkAsRead(item.id))
                  }
                  className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer select-none inline-flex
                             transition duration-150 ease-out active:scale-[0.98]"
                  aria-label="Mark this notification as read"
                >
                  {item.isUnread ? "Mark as read" : "Read"}
                </div>
              </div>
            </div>

            {/* Right meta */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              {item.isUnread ? (
                <div className="rounded-full border bg-white px-2 py-1 text-xs text-gray-700">
                  New
                </div>
              ) : (
                <div className="h-6" />
              )}

              <div className="text-xs text-gray-400">{item.timeAgo}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Whole-card click area: marks as read */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onMarkAsRead(item.id)}
        onKeyDown={(e) =>
          handleKeyboardActivate(e, () => onMarkAsRead(item.id))
        }
        className="px-4 pb-3 text-[0px] cursor-pointer select-none"
        aria-label="Card click area (marks as read)"
      >
        .
      </div>
    </div>
  );
}
