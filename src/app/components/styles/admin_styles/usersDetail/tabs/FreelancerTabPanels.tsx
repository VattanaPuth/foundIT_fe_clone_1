"use client";

import React from "react";

export default function FreelancerTabPanels() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Professional Details */}
      <Card
        title="Professional Details"
        icon={<IconBriefcase />}
        iconClass="text-fuchsia-600"
      >
        <Rows
          items={[
            {
              label: "Hourly Rate",
              value: (
                <span className="text-emerald-600 font-medium">$85/hr</span>
              ),
            },
            {
              label: "Portfolio Items",
              value: (
                <span className="font-medium text-gray-900">12 items</span>
              ),
            },
            {
              label: "Total Reviews",
              value: (
                <span className="font-medium text-gray-900">47 reviews</span>
              ),
            },
            {
              label: "Rating",
              value: (
                <span className="inline-flex items-center gap-1 font-medium text-gray-900">
                  <span className="text-amber-500" aria-hidden="true">
                    <IconStar />
                  </span>
                  4.9/5
                </span>
              ),
            },
            {
              label: "Response Time",
              value: <span className="text-blue-600 font-medium">2 hours</span>,
            },
          ]}
        />
      </Card>

      {/* Performance Metrics */}
      <Card
        title="Performance Metrics"
        icon={<IconTrendUp />}
        iconClass="text-emerald-600"
      >
        <Rows
          items={[
            {
              label: "Completion Rate",
              value: <span className="text-emerald-600 font-medium">98%</span>,
            },
            {
              label: "Repeat Client Rate",
              value: <span className="text-blue-600 font-medium">65%</span>,
            },
            {
              label: "Avg. Job Value",
              value: <span className="font-medium text-gray-900">$262</span>,
            },
            {
              label: "Total Earned",
              value: (
                <span className="text-emerald-600 font-medium">$12,300</span>
              ),
            },
            {
              label: "Total Transactions",
              value: <span className="font-medium text-gray-900">47</span>,
            },
          ]}
        />
      </Card>

      {/* Summary */}
      <Card title="Summary" icon={<IconTrendUp />} iconClass="text-emerald-600">
        <Rows
          items={[
            {
              label: "Hourly Rate",
              value: (
                <span className="font-medium text-gray-900">$ 85 / hr</span>
              ),
            },
            {
              label: "Pending Payments",
              value: <span className="font-medium text-gray-900">$850</span>,
            },
            {
              label: "Completed Jobs",
              value: <span className="font-medium text-gray-900">47</span>,
            },
            {
              label: "Ongoing Jobs",
              value: <span className="text-emerald-600 font-medium">3</span>,
            },
          ]}
        />
      </Card>

      {/* Skills & Expertise */}
      <Card
        title="Skills & Expertise"
        icon={<IconMedal />}
        iconClass="text-fuchsia-600"
      >
        <div className="flex flex-wrap gap-2">
          {[
            "React",
            "Node.js",
            "TypeScript",
            "AWS",
            "PostgreSQL",
            "UI/UX Design",
          ].map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6">
          <Rows
            items={[
              {
                label: "Portfolio Items",
                value: (
                  <span className="font-medium text-gray-900">12 items</span>
                ),
              },
            ]}
          />
        </div>
      </Card>
    </div>
  );
}

function Card({
  title,
  icon,
  iconClass,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  iconClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <div className="flex items-center gap-2">
        <span className={iconClass} aria-hidden="true">
          {icon}
        </span>
        <div className="font-semibold text-gray-900">{title}</div>
      </div>

      <div className="mt-4">{children}</div>
    </div>
  );
}

function Rows({
  items,
}: {
  items: { label: string; value: React.ReactNode }[];
}) {
  return (
    <div className="space-y-0">
      {items.map((it, idx) => (
        <div key={it.label}>
          <div className="flex items-center justify-between gap-4 py-3 text-sm">
            <div className="text-gray-500">{it.label}</div>
            <div className="text-right">{it.value}</div>
          </div>
          {idx !== items.length - 1 ? (
            <div className="border-t border-gray-100" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

/* icons (currentColor) */
function IconBriefcase() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 6a3 3 0 0 1 6 0v1H9V6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 8h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 13h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconTrendUp() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 17l6-6 4 4 7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 8h6v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconMedal() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 15 6 22l6-3 6 3-2-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconStar() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3.5l2.8 5.7 6.3.9-4.55 4.4 1.08 6.28L12 17.9 6.37 20.78l1.08-6.28L2.9 10.1l6.3-.9L12 3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
