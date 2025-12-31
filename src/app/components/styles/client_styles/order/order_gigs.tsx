"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMemo } from "react";
import SubHeader from "./sub_header";

// ============================================================================
// TYPES
// ============================================================================

type OrderStatus =
  | "Active"
  | "Awaiting approval"
  | "Completed"
  | "Revisions"
  | "Issues";

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
  return ((current as number) / total) * 100;
};

const getStatusColor = (status?: OrderStatus) => {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-800";

    case "Revisions":
      return "bg-amber-100 text-amber-800";

    case "Awaiting approval":
      return "bg-blue-100 text-blue-800";

    case "Completed":
      return "bg-green-100 text-green-800";

    case "Issues":
      return "bg-red-100 text-red-800";

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

function OrderGigCard({ gig }: { gig: OrderGig }) {
  const computed = calcPercentFromAmounts(gig.currentAmount, gig.totalAmount);
  const percent = clampPercent(gig.progressPercent ?? computed);
  const percentText =
    percent > 0 && percent < 1
      ? `${percent.toFixed(1)}%`
      : `${Math.round(percent)}%`;

  const current = gig.currentAmount ?? 0;
  const total = gig.totalAmount ?? 0;

  // Determine if this gig needs special action buttons
  const isAwaitingApproval = gig.status === "Awaiting approval";

  // Default actions (View details + Message)
  const defaultActions: OrderGigAction[] = [
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

  // Override actions only for "Awaiting approval"
  const actions = isAwaitingApproval
    ? [
        defaultActions[0], // Keep "View details"
        {
          text: "Accept delivery",
          onClick: () => console.log("Accept delivery", gig.id),
        },
      ]
    : gig.actions?.length
    ? gig.actions
    : defaultActions;

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="flex flex-col gap-4">
        {/* Title */}
        <p className="text-xl md:text-2xl lg:text-2xl text-gray-900">
          {gig.title}
        </p>

        {/* Author */}
        <div className="flex flex-wrap items-center gap-x-2 text-sm text-gray-600">
          <span className="text-gray-500">by</span>
          <span className="text-teal-600 font-medium">{gig.author}</span>
          {gig.authorRole && (
            <>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">{gig.authorRole}</span>
            </>
          )}
        </div>

        {/* Meta info */}
        {gig.meta?.length ? (
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            {gig.meta.map((m, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-gray-300">·</span>}
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">{m.icon ?? "•"}</span>
                  <span>{m.text}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        ) : null}

        {/* Status Badge */}
        {(() => {
          const isIssue = gig.hasIssues === true;
          const displayStatus = isIssue ? "Issues" : gig.status ?? "Unknown";
          const colorStatus = isIssue ? "Issues" : gig.status;

          return (
            <span
              className={`inline-flex px-3 py-1 w-fit rounded-full text-xs font-medium ${getStatusColor(
                colorStatus
              )}`}
            >
              {displayStatus}
            </span>
          );
        })()}

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-3xl font-bold text-gray-900">
                ${current.toLocaleString()}
              </span>
              <span className="text-gray-400">/</span>
              <span className="text-lg text-gray-500">
                ${total.toLocaleString()}
              </span>
            </div>
            {gig.rateType && (
              <span className="text-sm text-gray-500 capitalize">
                {gig.rateType}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Always show "View details" as secondary button */}
            <ActionItem action={actions[0]} />

            {/* Special prominent "Accept delivery" button */}
            {isAwaitingApproval && (
              <p
                onClick={actions[1].onClick}
                className="flex items-center gap-x-2 px-3 py-1.5 mt-3 active:opacity-30 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 active:bg-emerald-800 transition shadow-sm"
              >
                <svg className="w-4 h-4 mt-0.5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10.0857V11.0057C20.9988 13.1621 20.3005 15.2604 19.0093 16.9875C17.7182 18.7147 15.9033 19.9782 13.8354 20.5896C11.7674 21.201 9.55726 21.1276 7.53447 20.3803C5.51168 19.633 3.78465 18.2518 2.61096 16.4428C1.43727 14.6338 0.879791 12.4938 1.02168 10.342C1.16356 8.19029 1.99721 6.14205 3.39828 4.5028C4.79935 2.86354 6.69279 1.72111 8.79619 1.24587C10.8996 0.770634 13.1003 0.988061 15.07 1.86572M21 3L11 13.01L8 10.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Accept delivery
              </p>
            )}

            {/* Show "Message" button for all other statuses */}
            {!isAwaitingApproval && actions[1]?.text === "Message" && (
              <ActionItem action={actions[1]} />
            )}
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
  // 1. Active - Normal ongoing gig
  {
    id: "1",
    title: "Mobile App Development - iOS & Android",
    author: "Maria Santos",
    authorRole: "Full-stack mobile developer",
    meta: [
      { icon: <DefaultDocIcon />, text: "Contract" },
      { icon: <DefaultClockIcon />, text: "Due Jan 15, 2026" },
      { text: "Updated 2 hours ago" },
    ],
    status: "Active",
    currentAmount: 6200,
    totalAmount: 12000,
    rateType: "hourly",
    hasIssues: false,
    updatedAt: new Date("2025-12-31T09:30:00"),
    dueDate: new Date("2026-01-15"),
  },

  // 2. Awaiting approval - Matches your screenshot perfectly
  {
    id: "2",
    title: "E-commerce Dashboard Redesign",
    author: "John Doe",
    authorRole: "Senior UI/UX Designer",
    meta: [
      { icon: <DefaultDocIcon />, text: "Milestone 2: High-fidelity mockups" },
      { icon: <DefaultClockIcon />, text: "Nov 15, 2025" },
      { text: "Updated 5 minutes ago" },
    ],
    status: "Awaiting approval",
    currentAmount: 3200,
    totalAmount: 8000,
    rateType: "funded in escrow",
    hasIssues: false,
    updatedAt: new Date("2025-12-31T11:55:00"),
    dueDate: new Date("2026-01-10"),
  },

  // 3. Completed
  {
    id: "3",
    title: "SEO Audit + Content Plan (3 months)",
    author: "Sophia Lee",
    authorRole: "SEO Specialist",
    meta: [
      { icon: <DefaultDocIcon />, text: "Contract" },
      { icon: <DefaultClockIcon />, text: "Completed on time" },
      { text: "Updated Dec 20, 2025" },
    ],
    status: "Completed",
    currentAmount: 15000,
    totalAmount: 15000,
    rateType: "fixed price",
    hasIssues: false,
    updatedAt: new Date("2025-12-20T14:00:00"),
  },

  // 4. Active with progress override
  {
    id: "4",
    title: "Data Dashboard (React + API Integration)",
    author: "Kevin Tran",
    authorRole: "Frontend Engineer",
    meta: [
      { icon: <DefaultDocIcon />, text: "Milestone" },
      { icon: <DefaultClockIcon />, text: "Due Jan 5, 2026" },
      { text: "Updated 30 minutes ago" },
    ],
    status: "Active",
    progressPercent: 72,
    currentAmount: 3600,
    totalAmount: 5000,
    rateType: "milestone",
    hasIssues: false,
    updatedAt: new Date("2025-12-31T11:30:00"),
    dueDate: new Date("2026-01-05"),
  },

  // 5. Revisions - Needs changes (yellow badge)
  {
    id: "5",
    title: "Brand Identity & Logo Design",
    author: "Emma Chen",
    authorRole: "Graphic Designer",
    meta: [
      { icon: <DefaultDocIcon />, text: "Fixed price" },
      { icon: <DefaultClockIcon />, text: "Revisions requested" },
      { text: "Updated 1 day ago" },
    ],
    status: "Revisions",
    currentAmount: 1800,
    totalAmount: 2000,
    rateType: "fixed",
    hasIssues: false,
    updatedAt: new Date("2025-12-30T16:45:00"),
    dueDate: new Date("2026-01-08"),
  },

  // 6. Issues - Has problems (red badge + counts in "Issues" tab)
  {
    id: "6",
    title: "Backend API Development (Node.js + PostgreSQL)",
    author: "Alex Rivera",
    authorRole: "Backend Developer",
    meta: [
      { icon: <DefaultDocIcon />, text: "Contract" },
      { icon: <DefaultClockIcon />, text: "Due Jan 20, 2026" },
      { text: "Updated 4 hours ago" },
    ],
    status: "Active",
    currentAmount: 4500,
    totalAmount: 9000,
    rateType: "hourly",
    hasIssues: true, // This will show in "Issues" tab and can have red badge if you map status to "Issues"
    updatedAt: new Date("2025-12-31T08:00:00"),
    dueDate: new Date("2026-01-20"),
  },

  // 7. Another Revisions example
  {
    id: "7",
    title: "Social Media Content Calendar (Q1 2026)",
    author: "Liam Park",
    authorRole: "Content Strategist",
    meta: [
      { icon: <DefaultDocIcon />, text: "Monthly retainer" },
      { icon: <DefaultClockIcon />, text: "Feedback pending" },
      { text: "Updated yesterday" },
    ],
    status: "Revisions",
    currentAmount: 1200,
    totalAmount: 3000,
    rateType: "monthly",
    hasIssues: false,
    updatedAt: new Date("2025-12-30T10:20:00"),
  },

  // 8. One more Completed for balance
  {
    id: "8",
    title: "Website Migration to Next.js",
    author: "Olivia Grant",
    authorRole: "Full-stack Developer",
    meta: [
      { icon: <DefaultDocIcon />, text: "Project" },
      { icon: <DefaultClockIcon />, text: "Completed ahead of schedule" },
      { text: "Finalized Dec 15, 2025" },
    ],
    status: "Completed",
    currentAmount: 8000,
    totalAmount: 8000,
    rateType: "fixed",
    hasIssues: false,
    updatedAt: new Date("2025-12-15T12:00:00"),
  },
];

// ============================================================================
// MAIN ORDERS PAGE COMPONENT
// ============================================================================

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState("recently_updated");

  // Compute dynamic tab counts
  const tabCounts = useMemo(() => {
    const counts = {
      All: exampleGigs.length,
      Active: 0,
      Revisions: 0,
      "Awaiting approval": 0,
      Completed: 0,
      Issues: 0,
    };

    exampleGigs.forEach((gig) => {
      if (gig.status === "Active") counts.Active++;
      if (gig.status === "Revisions") counts.Revisions++;
      if (gig.status === "Awaiting approval") counts["Awaiting approval"]++;
      if (gig.status === "Completed") counts.Completed++;
      if (gig.hasIssues) counts.Issues++;
    });

    return counts;
  }, []);

  // Define tabs
  const tabs = useMemo<Tab[]>(
    () => [
      { label: "All", count: tabCounts.All },
      { label: "Active", count: tabCounts.Active },
      { label: "Revisions", count: tabCounts.Revisions },
      { label: "Awaiting approval", count: tabCounts["Awaiting approval"] },
      { label: "Completed", count: tabCounts.Completed },
      { label: "Issues", count: tabCounts.Issues, variant: "danger" },
    ],
    [tabCounts]
  );

  // Filter gigs based on active tab
  const filteredGigs = useMemo(() => {
    return exampleGigs.filter((gig) => {
      if (activeTab === "All") return true;
      if (activeTab === "Active") return gig.status === "Active";
      if (activeTab === "Completed") return gig.status === "Completed";
      if (activeTab === "Awaiting approval")
        return gig.status === "Awaiting approval";
      if (activeTab === "Revisions") return gig.status === "Revisions"; // Fixed!
      if (activeTab === "Issues")
        return gig.hasIssues === true || gig.status === "Issues";
      return false;
    });
  }, [activeTab]);

  // Sort gigs based on sortBy
  const sortedGigs = useMemo(() => {
    return [...filteredGigs].sort((a, b) => {
      switch (sortBy) {
        case "highest_amount":
          return (b.currentAmount || 0) - (a.currentAmount || 0);
        case "due_soon":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.getTime() - b.dueDate.getTime();
        case "recently_updated":
        default:
          if (!a.updatedAt) return 1;
          if (!b.updatedAt) return -1;
          return (b.updatedAt?.getTime() || 0) - (a.updatedAt?.getTime() || 0);
      }
    });
  }, [filteredGigs, sortBy]);

  return (
    <div className="w-full h-screen">
      {/* Header Section */}
      <SubHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
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
