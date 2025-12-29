"use client";
import React, { useState } from "react";
import SubHeader from "./sub_header";

// ============================================================================
// TYPES
// ============================================================================

type OrderStatus = "Active" | "Awaiting approval" | "Completed";

type OrderGigAction = {
  text: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
};

type OrderGigMetaItem = {
  icon?: React.ReactNode;
  text: string;
};

export type OrderGig = {
  id: string;
  title: string;
  author: string;
  authorRole?: string;
  meta?: OrderGigMetaItem[];
  status?: OrderStatus;
  progressPercent?: number;
  currentAmount?: number;
  totalAmount?: number;
  rateType?: string;
  actions?: OrderGigAction[];
  hasIssues?: boolean;
  updatedAt?: Date;
  dueDate?: Date;
};

type Tab = {
  label: string;
  count: number;
  active?: boolean;
  variant?: "default" | "danger";
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const clampPercent = (n: number) => {
  if (!Number.isFinite(n)) return 0;
  return Math.min(100, Math.max(0, n));
};

const calcPercentFromAmounts = (current?: number, total?: number) => {
  if (!Number.isFinite(current) || !Number.isFinite(total)) return 0;
  if (!total || total <= 0) return 0;
  return (current / total) * 100;
};

const getStatusColor = (status?: OrderStatus) => {
  switch (status) {
    case "Active":
      return "bg-emerald-100 text-emerald-700";
    case "Awaiting approval":
      return "bg-yellow-100 text-yellow-700";
    case "Completed":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

// ============================================================================
// ICON COMPONENTS
// ============================================================================

const DefaultDocIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 5C15 4.07003 15 3.60504 14.8978 3.22354C14.6204 2.18827 13.8117 1.37962 12.7765 1.10222C12.395 1 11.93 1 11 1C10.07 1 9.60504 1 9.22354 1.10222C8.18827 1.37962 7.37962 2.18827 7.10222 3.22354C7 3.60504 7 4.07003 7 5M11.8 15.5H16.7C16.98 15.5 17.12 15.5 17.227 15.4455C17.3211 15.3976 17.3976 15.3211 17.4455 15.227C17.5 15.12 17.5 14.98 17.5 14.7V12.3C17.5 12.02 17.5 11.88 17.4455 11.773C17.3976 11.6789 17.3211 11.6024 17.227 11.5545C17.12 11.5 16.98 11.5 16.7 11.5H11.8C11.52 11.5 11.38 11.5 11.273 11.5545C11.1789 11.6024 11.1024 11.6789 11.0545 11.773C11 11.88 11 12.02 11 12.3V14.7C11 14.98 11 15.12 11.0545 15.227C11.1024 15.3211 11.1789 15.3976 11.273 15.4455C11.38 15.5 11.52 15.5 11.8 15.5ZM5.8 19H16.2C17.8802 19 18.7202 19 19.362 18.673C19.9265 18.3854 20.3854 17.9265 20.673 17.362C21 16.7202 21 15.8802 21 14.2V9.8C21 8.11984 21 7.27976 20.673 6.63803C20.3854 6.07354 19.9265 5.6146 19.362 5.32698C18.7202 5 17.8802 5 16.2 5H5.8C4.11984 5 3.27976 5 2.63803 5.32698C2.07354 5.6146 1.6146 6.07354 1.32698 6.63803C1 7.27976 1 8.11984 1 9.8V14.2C1 15.8802 1 16.7202 1.32698 17.362C1.6146 17.9265 2.07354 18.3854 2.63803 18.673C3.27976 19 4.11984 19 5.8 19Z"
      stroke="#717182"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DefaultClockIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path d="M12 6v6l4 2" strokeWidth="2" />
  </svg>
);

const DefaultLinkIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DefaultChatIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ============================================================================
// ACTION ITEM COMPONENT
// ============================================================================

const ActionItem = ({ action }: { action: OrderGigAction }) => {
  const content = (
    <div className="flex items-center gap-2 px-3 py-2">
      <span className="text-gray-500">
        {action.icon ?? <DefaultLinkIcon />}
      </span>
      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
        {action.text}
      </span>
    </div>
  );

  const common =
    "rounded-lg border border-gray-200 bg-white hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition";

  if (action.href) {
    return (
      <a
        href={action.href}
        className={`${common} !no-underline hover:!no-underline`}
        aria-label={action.text}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={common}
      onClick={action.onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") action.onClick?.();
      }}
      aria-label={action.text}
    >
      {content}
    </div>
  );
};

// ============================================================================
// ORDER GIG CARD COMPONENT
// ============================================================================

function OrderGigCard({
  gig,
  className = "",
}: {
  gig: OrderGig;
  className?: string;
}) {
  const computed = calcPercentFromAmounts(gig.currentAmount, gig.totalAmount);
  const percent = clampPercent(
    Number.isFinite(gig.progressPercent as number)
      ? (gig.progressPercent as number)
      : computed
  );

  const percentText =
    percent > 0 && percent < 1
      ? `${percent.toFixed(1)}%`
      : `${Math.round(percent)}%`;

  const current = Number.isFinite(gig.currentAmount)
    ? (gig.currentAmount as number)
    : 0;
  const total = Number.isFinite(gig.totalAmount)
    ? (gig.totalAmount as number)
    : 0;

  const actions = gig.actions?.length
    ? gig.actions
    : [
        {
          text: "View details",
          href: `/orders/${gig.id}`,
          icon: <DefaultLinkIcon />,
        },
        {
          text: "Message",
          onClick: () => console.log("Message", gig.id),
          icon: <DefaultChatIcon />,
        },
      ];

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-900">
              {gig.title}
            </p>
          </div>

          {/* Author */}
          <div className="flex flex-wrap items-center gap-x-2 -mt-6 text-sm text-gray-600">
            <span className="text-gray-500">by</span>
            <span className="text-teal-600 font-medium">{gig.author}</span>
            {gig.authorRole ? (
              <>
                <span className="text-gray-600">•</span>
                <span className="text-gray-600">{gig.authorRole}</span>
              </>
            ) : null}
          </div>

          {/* Meta */}
          {gig.meta?.length ? (
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-600">
              {gig.meta.map((m, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-gray-300">·</span>}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{m.icon ?? "•"}</span>
                    <span className="whitespace-nowrap">{m.text}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          ) : null}

          {/* Status */}
          <div className="flex items-start">
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                gig.status
              )}`}
            >
              {gig.status ?? "Unknown"}
            </span>
          </div>

          {/* Progress */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-semibold text-gray-900">{percentText}</span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* Amount + Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2 pt-4 border-t border-gray-200">
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  ${current.toLocaleString()}
                </span>
                <span className="text-gray-400">/</span>
                <span className="text-base sm:text-lg text-gray-500">
                  ${total.toLocaleString()}
                </span>
              </div>
              {gig.rateType ? (
                <span className="text-sm text-gray-500">{gig.rateType}</span>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              {actions.map((a, idx) => (
                <ActionItem key={idx} action={a} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE DATA
// ============================================================================

const exampleGigs: OrderGig[] = [
  {
    id: "1",
    title: "Mobile App Development - iOS & Android",
    author: "ma ria santos",
    authorRole: "Full-stack mobile developer",
    meta: [
      { icon: <DefaultDocIcon />, text: "Contract" },
      { icon: <DefaultClockIcon />, text: "Week of Nov 4–10" },
      { text: "Updated 2 hours ago" },
    ],
    status: "Active",
    currentAmount: 85,
    totalAmount: 10000,
    rateType: "per hour",
    hasIssues: true,
    updatedAt: new Date("2024-12-29T10:00:00"),
    dueDate: new Date("2025-01-15"),
  },
  {
    id: "2",
    title: "Landing Page UI/UX Redesign for SaaS",
    author: "john doe",
    authorRole: "UI/UX designer",
    meta: [
      { icon: <DefaultDocIcon />, text: "Fixed price" },
      { icon: <DefaultClockIcon />, text: "2 weeks" },
      { text: "Updated yesterday" },
    ],
    status: "Awaiting approval",
    currentAmount: 2500,
    totalAmount: 5000,
    rateType: "fixed",
    updatedAt: new Date("2024-12-28T10:00:00"),
    dueDate: new Date("2025-01-10"),
  },
  {
    id: "3",
    title: "SEO Audit + Content Plan (3 months)",
    author: "sophia lee",
    authorRole: "SEO specialist",
    meta: [
      { icon: <DefaultDocIcon />, text: "Contract" },
      { icon: <DefaultClockIcon />, text: "3 months" },
      { text: "Updated 5 days ago" },
    ],
    status: "Completed",
    currentAmount: 10000,
    totalAmount: 10000,
    rateType: "project",
    updatedAt: new Date("2024-12-24T10:00:00"),
    dueDate: new Date("2025-03-01"),
  },
  {
    id: "4",
    title: "Data Dashboard (React + API Integration)",
    author: "kevin tran",
    authorRole: "Frontend engineer",
    meta: [
      { icon: <DefaultDocIcon />, text: "Milestone" },
      { icon: <DefaultClockIcon />, text: "Week of Dec 1–7" },
      { text: "Updated 10 minutes ago" },
    ],
    status: "Active",
    progressPercent: 72,
    currentAmount: 3600,
    totalAmount: 5000,
    rateType: "milestone",
    updatedAt: new Date("2024-12-29T11:50:00"),
    dueDate: new Date("2025-01-05"),
  },
];

// ============================================================================
// MAIN ORDERS PAGE COMPONENT
// ============================================================================

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState("recently_updated");

  // Filter gigs based on active tab
  const filteredGigs = exampleGigs.filter((gig) => {
    if (activeTab === "All") return true;
    if (activeTab === "Active") return gig.status === "Active";
    if (activeTab === "Completed") return gig.status === "Completed";
    if (activeTab === "Awaiting approval") return gig.status === "Awaiting approval";
    if (activeTab === "Issues") return gig.hasIssues === true;
    if (activeTab === "Revisions") return false;
    return true;
  });

  // Sort gigs based on sortBy
  const sortedGigs = [...filteredGigs].sort((a, b) => {
    switch (sortBy) {
      case "highest_amount":
        // Sort by CURRENT amount (highest first)
        return (b.currentAmount || 0) - (a.currentAmount || 0);

      case "due_soon":
        // Sort by due date (earliest first)
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.getTime() - b.dueDate.getTime();

      case "recently_updated":
      default:
        // Sort by updated date (most recent first)
        if (!a.updatedAt) return 1;
        if (!b.updatedAt) return -1;
        return b.updatedAt.getTime() - a.updatedAt.getTime();
    }
  });

  return (
    <div className="w-full h-screen">
      {/* Header Section */}
      <SubHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Orders List */}
      <div className="w-full mx-auto px-3 py-6">
        <div className="flex flex-col gap-4">
          {sortedGigs.map((gig) => (
            <OrderGigCard key={gig.id} gig={gig} />
          ))}
        </div>
      </div>
    </div>
  );
}
