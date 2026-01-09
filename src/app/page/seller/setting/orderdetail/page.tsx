"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SellerNavHeader from "@/app/components/styles/global_styles/seller/header";
import SellerFooter from "@/app/components/styles/global_styles/seller/footer";

import {
  cn,
  handleKeyboardActivate,
} from "@/app/components/styles/seller/setting/utils";

function IconArrowLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 15L7.5 10L12.5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDownload({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 10V2"
        stroke="currentColor"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
        stroke="currentColor"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.66797 6.66797L8.0013 10.0013L11.3346 6.66797"
        stroke="currentColor"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function IconMail({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 6.5L10 10.5L16.5 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.2 5.2H15.8C16.6 5.2 17.2 5.8 17.2 6.6V13.4C17.2 14.2 16.6 14.8 15.8 14.8H4.2C3.4 14.8 2.8 14.2 2.8 13.4V6.6C2.8 5.8 3.4 5.2 4.2 5.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMapPin({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 17s5-4.2 5-8.2A5 5 0 0 0 5 8.8C5 12.8 10 17 10 17Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10.3a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconUser({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 10.2A3.4 3.4 0 1 0 10 3.4a3.4 3.4 0 0 0 0 6.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.2 16.6c1.3-2.4 3.4-3.6 5.8-3.6s4.5 1.2 5.8 3.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconReceipt({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.33333 14.4879C7.53603 14.6049 7.76595 14.6665 8 14.6665C8.23405 14.6665 8.46397 14.6049 8.66667 14.4879L13.3333 11.8212C13.5358 11.7043 13.704 11.5362 13.821 11.3338C13.938 11.1314 13.9998 10.9017 14 10.6679V5.33457C13.9998 5.10075 13.938 4.87111 13.821 4.66868C13.704 4.46625 13.5358 4.29815 13.3333 4.18124L8.66667 1.51457C8.46397 1.39755 8.23405 1.33594 8 1.33594C7.76595 1.33594 7.53603 1.39755 7.33333 1.51457L2.66667 4.18124C2.46418 4.29815 2.29599 4.46625 2.17897 4.66868C2.06196 4.87111 2.00024 5.10075 2 5.33457V10.6679C2.00024 10.9017 2.06196 11.1314 2.17897 11.3338C2.29599 11.5362 2.46418 11.7043 2.66667 11.8212L7.33333 14.4879Z"
        stroke="#4A5565"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 14.6667V8"
        stroke="#4A5565"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.19141 4.66797L7.99807 8.0013L13.8047 4.66797"
        stroke="#4A5565"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5 2.84766L11 6.28099"
        stroke="#4A5565"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function IconCreditCard({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2381_18369)">
        <path
          d="M13.332 3.33203H2.66536C1.92898 3.33203 1.33203 3.92898 1.33203 4.66536V11.332C1.33203 12.0684 1.92898 12.6654 2.66536 12.6654H13.332C14.0684 12.6654 14.6654 12.0684 14.6654 11.332V4.66536C14.6654 3.92898 14.0684 3.33203 13.332 3.33203Z"
          stroke="currentColor"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1.33203 6.66797H14.6654"
          stroke="currentColor"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2381_18369">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function IconMessage({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2381_18387)">
        <path
          d="M14.6654 4.66797L8.67136 8.48597C8.46796 8.60411 8.23692 8.66634 8.0017 8.66634C7.76647 8.66634 7.53543 8.60411 7.33203 8.48597L1.33203 4.66797"
          stroke="#1A1A1A"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.332 2.66797H2.66536C1.92898 2.66797 1.33203 3.26492 1.33203 4.0013V12.0013C1.33203 12.7377 1.92898 13.3346 2.66536 13.3346H13.332C14.0684 13.3346 14.6654 12.7377 14.6654 12.0013V4.0013C14.6654 3.26492 14.0684 2.66797 13.332 2.66797Z"
          stroke="#1A1A1A"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2381_18387">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function IconKey({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8C2 6.4087 2.63214 4.88258 3.75736 3.75736C4.88258 2.63214 6.4087 2 8 2C9.67737 2.00631 11.2874 2.66082 12.4933 3.82667L14 5.33333"
        stroke="#1A1A1A"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.0013 2V5.33333H10.668"
        stroke="#1A1A1A"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 8C14 9.5913 13.3679 11.1174 12.2426 12.2426C11.1174 13.3679 9.5913 14 8 14C6.32263 13.9937 4.71265 13.3392 3.50667 12.1733L2 10.6667"
        stroke="#1A1A1A"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.33333 10.668H2V14.0013"
        stroke="#1A1A1A"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function IconRefund({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 7.5H3.5V5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.7 8.2A7 7 0 1 1 3.5 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 6.5v3.2l2.2 1.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2381_18411)">
        <path
          d="M14.535 6.66764C14.8395 8.16183 14.6225 9.71525 13.9203 11.0688C13.218 12.4224 12.073 13.4943 10.6761 14.1058C9.27913 14.7174 7.71479 14.8315 6.24391 14.4292C4.77302 14.0269 3.4845 13.1326 2.59323 11.8952C1.70195 10.6579 1.26179 9.15246 1.34615 7.62989C1.43051 6.10733 2.0343 4.6597 3.05681 3.52842C4.07932 2.39714 5.45876 1.65059 6.96509 1.41327C8.47141 1.17595 10.0136 1.46221 11.3344 2.2243"
          stroke="#00A63E"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6 7.33464L8 9.33464L14.6667 2.66797"
          stroke="#00A63E"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2381_18411">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function IconStar() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2381_18432)">
        <path
          d="M7.68323 1.52863C7.71245 1.4696 7.75758 1.41992 7.81353 1.38518C7.86949 1.35044 7.93404 1.33203 7.9999 1.33203C8.06576 1.33203 8.13031 1.35044 8.18626 1.38518C8.24222 1.41992 8.28735 1.4696 8.31656 1.52863L9.85656 4.64796C9.95802 4.85327 10.1078 5.0309 10.293 5.1656C10.4782 5.30029 10.6933 5.38804 10.9199 5.42129L14.3639 5.92529C14.4292 5.93475 14.4905 5.96228 14.5409 6.00476C14.5913 6.04724 14.6288 6.10299 14.6492 6.1657C14.6696 6.2284 14.6721 6.29556 14.6563 6.35958C14.6405 6.4236 14.6071 6.48193 14.5599 6.52796L12.0692 8.95329C11.905 9.11336 11.7821 9.31095 11.7111 9.52905C11.6402 9.74714 11.6233 9.97922 11.6619 10.2053L12.2499 13.632C12.2614 13.6972 12.2544 13.7643 12.2296 13.8258C12.2048 13.8872 12.1632 13.9404 12.1096 13.9793C12.056 14.0182 11.9925 14.0413 11.9265 14.0459C11.8604 14.0505 11.7944 14.0364 11.7359 14.0053L8.65723 12.3866C8.45438 12.2801 8.22868 12.2245 7.99956 12.2245C7.77044 12.2245 7.54475 12.2801 7.3419 12.3866L4.2639 14.0053C4.20545 14.0362 4.1395 14.0502 4.07353 14.0455C4.00757 14.0408 3.94424 14.0177 3.89076 13.9788C3.83728 13.9399 3.79579 13.8868 3.771 13.8254C3.74622 13.7641 3.73914 13.6971 3.75056 13.632L4.3379 10.206C4.37669 9.97978 4.35989 9.74756 4.28892 9.52933C4.21796 9.31109 4.09497 9.1134 3.93056 8.95329L1.4399 6.52863C1.39229 6.48265 1.35856 6.42422 1.34254 6.36001C1.32652 6.2958 1.32886 6.22837 1.34928 6.16542C1.36971 6.10247 1.40741 6.04652 1.45808 6.00395C1.50876 5.96138 1.57037 5.93389 1.6359 5.92463L5.07923 5.42129C5.30607 5.38829 5.52149 5.30067 5.70695 5.16595C5.89242 5.03124 6.04237 4.85347 6.1439 4.64796L7.68323 1.52863Z"
          stroke="#D08700"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2381_18432">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      {children}
    </div>
  );
}

function CardHeader({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="px-5 py-4 flex items-center justify-between gap-3">
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      {right}
    </div>
  );
}

function Line() {
  return <div className="border-t border-gray-100" />;
}

function ActionBtn({
  label,
  icon,
  tone = "neutral",
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  tone?: "neutral" | "danger";
  onClick?: () => void;
}) {
  const cls =
    tone === "danger"
      ? "border-red-200 text-red-600 hover:bg-red-50"
      : "border-gray-200 text-gray-700 hover:bg-gray-50";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => handleKeyboardActivate(e, () => onClick?.())}
      className={cn(
        "h-10 rounded-lg border bg-white text-sm font-medium flex items-center justify-center gap-2 cursor-pointer select-none",
        cls
      )}
      aria-label={label}
    >
      <div className="w-4 h-4 flex items-center justify-center">{icon}</div>
      {label}
    </div>
  );
}

function SmallStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-2 text-xl font-semibold text-gray-900">{value}</div>
    </div>
  );
}

type DownloadRow = {
  id: string;
  date: string;
  version: string;
  location: string;
  device: string;
};

type TimelineItem = {
  id: string;
  title: string;
  sub: string;
  tone: "green" | "blue" | "gray" | "orange";
  icon: React.ReactNode;
};

function TimelineRow({ item }: { item: TimelineItem }) {
  const tone =
    item.tone === "green"
      ? "bg-green-50 text-green-700 border-green-200"
      : item.tone === "blue"
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : item.tone === "orange"
      ? "bg-orange-50 text-orange-700 border-orange-200"
      : "bg-gray-50 text-gray-600 border-gray-200";

  return (
    <div className="flex items-start gap-3">
      <div
        className={cn(
          "w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0",
          tone
        )}
      >
        <div className="w-4 h-4 flex items-center justify-center">
          {item.icon}
        </div>
      </div>
      <div className="min-w-0">
        <div className="text-sm font-medium text-gray-900">{item.title}</div>
        <div className="text-xs text-gray-500 mt-1">{item.sub}</div>
      </div>
    </div>
  );
}

export default function OrderDetailPage() {
  const router = useRouter();

  const downloads: DownloadRow[] = [
    {
      id: "d1",
      date: "Nov 28, 2024, 3:47 PM",
      version: "v1.2",
      location: "San Francisco, CA, US",
      device: "MacOS • Chrome",
    },
    {
      id: "d2",
      date: "Nov 28, 2024, 4:16 PM",
      version: "v1.2",
      location: "San Francisco, CA, US",
      device: "MacOS • Chrome",
    },
    {
      id: "d3",
      date: "Nov 29, 2024, 10:22 AM",
      version: "v1.2",
      location: "San Francisco, CA, US",
      device: "MacOS • Safari",
    },
  ];

  const timeline: TimelineItem[] = [
    {
      id: "t1",
      title: "Order Completed",
      sub: "Nov 28, 2024, 3:48 PM",
      tone: "green",
      icon: <IconCheckCircle />,
    },
    {
      id: "t2",
      title: "First Download",
      sub: "Nov 28, 2024, 3:47 PM",
      tone: "blue",
      icon: <IconDownload />,
    },
    {
      id: "t3",
      title: "Review Posted",
      sub: "Nov 30, 2024",
      tone: "orange",
      icon: <IconStar />,
    },
    {
      id: "t4",
      title: "License Issued",
      sub: "Nov 28, 2024",
      tone: "gray",
      icon: <IconKey />,
    },
    {
      id: "t5",
      title: "Order Placed",
      sub: "Nov 28, 2024, 3:45 PM",
      tone: "gray",
      icon: <IconReceipt />,
    },
  ];

  return (
    <div className="h-screen bg-gray-50 pb-20">
      <SellerNavHeader />
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Header */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div
              role="button"
              tabIndex={0}
              onClick={() => router.back()}
              onKeyDown={(e) => handleKeyboardActivate(e, () => router.back())}
              className="h-9 w-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center cursor-pointer select-none hover:bg-gray-50"
              aria-label="Go back"
            >
              <div className="text-gray-700">
                <IconArrowLeft />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="text-lg font-semibold text-gray-900">
                  Order Details
                </div>
                <div className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-[11px] font-medium">
                  Completed
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Nov 28, 2024, 3:45 PM
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              role="button"
              tabIndex={0}
              onClick={() =>
                router.push("/page/seller/setting/orderdetail/invoice")
              }
              onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
              className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 flex items-center justify-center gap-2 cursor-pointer select-none hover:bg-gray-50"
              aria-label="Download invoice"
            >
              <div className="w-4 h-4 text-gray-700">
                <IconDownload />
              </div>
              Download Invoice
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => {}}
              onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
              className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 flex items-center justify-center gap-2 cursor-pointer select-none hover:bg-gray-50"
              aria-label="Contact buyer"
            >
              <div className="w-4 h-4 text-gray-700">
                <IconMessage />
              </div>
              Contact Buyer
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          {/* Left */}
          <div className="space-y-6">
            {/* Buyer Information */}
            <Card>
              <CardHeader
                title="Buyer Information"
                right={
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {}}
                    onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
                    className="text-xs text-gray-600 cursor-pointer select-none hover:text-gray-900"
                    aria-label="View profile"
                  >
                    View Profile
                  </div>
                }
              />
              <Line />
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <img
                    src="/images/emma.png"
                    alt="Sarah Johnson"
                    className="w-11 h-11 rounded-full object-cover flex-shrink-0 border border-gray-200"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900">
                      Sarah Johnson
                    </div>

                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-4 h-4 text-gray-500">
                          <IconMail />
                        </div>
                        sarah.johnson@example.com
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-4 h-4 text-gray-500">
                          <IconMapPin />
                        </div>
                        San Francisco, CA, United States
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-4 h-4 text-gray-500">
                          <IconUser />
                        </div>
                        Member since Mar 2023
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SmallStat label="Total Purchases" value="12" />
                  <SmallStat label="Total Spent" value="$847" />
                </div>
              </div>
            </Card>

            {/* Product & License Details */}
            <Card>
              <CardHeader title="Product & License Details" />
              <Line />
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <img
                      src="/images/p2.png"
                      alt="Modern Dashboard UI Kit"
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div
                        className="text-sm font-semibold text-gray-900 truncate cursor-pointer
                      "
                        onClick={() =>
                          router.push(
                            "page/seller/home/myproduct/productdetail"
                          )
                        }
                      >
                        Modern Dashboard UI Kit • Figma
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Design</div>
                    </div>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      router.push("page/seller/home/myproduct/productdetail")
                    }
                    onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
                    className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 flex items-center justify-center cursor-pointer select-none hover:bg-gray-50 flex-shrink-0"
                    aria-label="View product"
                  >
                    View Product
                  </div>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-1">
                      <div className="text-xs text-gray-500">Type</div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="text-sm font-medium text-gray-900">
                          Commercial License
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">Issued</div>
                      <div className="mt-2 text-sm font-medium text-gray-900">
                        Nov 28, 2024
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">Expiry</div>
                      <div className="mt-2 text-sm font-medium text-gray-900">
                        Lifetime
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">Activations</div>
                      <div className="mt-2 text-sm font-medium text-gray-900">
                        1/5
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Download History */}
            <Card>
              <CardHeader
                title="Download History"
                right={<div className="text-xs text-gray-500">3 downloads</div>}
              />
              <Line />
              <div className="p-5">
                <div className="hidden md:grid grid-cols-[1.2fr_.5fr_1fr_1fr] gap-3 text-xs text-gray-500 px-2">
                  <div>Date &amp; Time</div>
                  <div>Version</div>
                  <div>Location</div>
                  <div>Device</div>
                </div>

                <div className="mt-2 space-y-2">
                  {downloads.map((r) => (
                    <div
                      key={r.id}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-3 md:grid md:grid-cols-[1.2fr_.5fr_1fr_1fr] md:gap-3 flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <div className="w-4 h-4 text-gray-600">
                          <IconDownload />
                        </div>
                        <div className="font-medium">{r.date}</div>
                      </div>
                      <div className="text-sm text-gray-700">{r.version}</div>
                      <div className="text-sm text-gray-700">{r.location}</div>
                      <div className="text-sm text-gray-700">{r.device}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Customer Review */}
            <Card>
              <CardHeader title="Customer Review" />
              <Line />
              <div className="p-5">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1 text-orange-500">
                    <IconStar />
                    <IconStar />
                    <IconStar />
                    <IconStar />
                    <IconStar />
                  </div>
                  <div className="text-sm font-semibold text-gray-900">5.0</div>
                  <div className="text-xs text-gray-500">· Nov 30, 2024</div>
                </div>

                <div className="mt-3 text-sm text-gray-700 leading-6">
                  Outstanding quality and attention to detail. This dashboard UI
                  kit exceeded my expectations. The components are incredibly
                  well designed and easy to customize. I was able to build a
                  complete admin panel for my SaaS product in just a few days.
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  24 people found this helpful
                </div>
              </div>
            </Card>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <Card>
              <CardHeader title="Payment Summary" />
              <Line />
              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600">Subtotal</div>
                    <div className="text-gray-900 font-medium">$99.00</div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600">Platform Fee (15%)</div>
                    <div className="text-red-600 font-medium">-$14.85</div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-sm">
                    <div className="text-gray-900 font-semibold">
                      Your Earnings
                    </div>
                    <div className="text-green-700 font-semibold">$84.15</div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-700">
                      <IconCreditCard />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-gray-500">
                        Visa ending in 4242
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        Paid
                      </div>
                    </div>
                  </div>

                  <div className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-[11px] font-medium">
                    Paid
                  </div>
                </div>

                <div className="text-[11px] text-gray-500">
                  Transaction ID: txn_1Gx...kZb...
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader title="Quick Actions" />
              <Line />
              <div className="p-5 space-y-3">
                <ActionBtn
                  label="Send Message"
                  icon={<IconMessage />}
                  onClick={() => {}}
                />
                <ActionBtn
                  label="Regenerate License Key"
                  icon={<IconKey />}
                  onClick={() => {}}
                />
                <ActionBtn
                  label="Issue Refund"
                  icon={<IconRefund />}
                  tone="danger"
                  onClick={() => {}}
                />
              </div>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader title="Order Timeline" />
              <Line />
              <div className="p-5 space-y-4">
                {timeline.map((t) => (
                  <TimelineRow key={t.id} item={t} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      <SellerFooter/>
    </div>
  );
}
