"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function MoneyCard({
  title,
  value,
  highlight,
}: {
  title: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? "border-orange-200 bg-orange-50/40"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="text-xs text-gray-500">{title}</div>
      <div className="mt-1 text-sm font-semibold text-gray-900">{value}</div>
    </div>
  );
}

function Pill({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] bg-green-50 text-green-700 border-green-100">
      {text}
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const [showSeason, setShowSeason] = useState(true);

  const summaryCards = useMemo(
    () => [
      { id: "ytd", title: "Year to Date", value: "$15,760", highlight: true },
      { id: "q1", title: "Q1 2024", value: "$2,340" },
      { id: "q2", title: "Q2 2024", value: "$4,120" },
      { id: "q3", title: "Q3 2024", value: "$4,860" },
      { id: "q4", title: "Q4 2024", value: "$3,720" },
    ],
    []
  );

  const docs = useMemo(
    () => [
      {
        id: "d2024",
        title: "1099-K • 2024",
        sub: "Payment card and third party network transactions",
        meta: "Issued: 2025-01-31 • Total: $15,760",
      },
      {
        id: "d2023",
        title: "1099-K • 2023",
        sub: "Payment card and third party network transactions",
        meta: "Issued: 2024-01-31 • Total: $12,450",
      },
      {
        id: "d2022",
        title: "1099-K • 2022",
        sub: "Payment card and third party network transactions",
        meta: "Issued: 2023-01-31 • Total: $8,920",
      },
    ],
    []
  );

  const chips = useMemo(
    () => [
      "IRS Form 1099-K Info",
      "Self-Employment Tax Guide",
      "Tax Deductions",
      "TurboTax for Freelancers",
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
          aria-label="Back to Earnings"
          onClick={() => router.push("/page/seller/earning")}
          onKeyDown={(e) =>
            handleKeyboardActivate(e, () => router.push("/page/seller/earning"))
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
          Back to Earnings
        </div>

        {/* Header */}
        <div className="mt-4">
          <div className="text-sm font-semibold text-gray-900">
            Tax Information
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Manage your tax documents and information
          </div>
        </div>

        {/* 2024 Tax Season notice */}
        {showSeason ? (
          <div className="mt-5 bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
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
                    <path d="M8 2v3" />
                    <path d="M16 2v3" />
                    <path d="M3 9h18" />
                    <path d="M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                  </svg>
                </div>
              </div>

              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-900">
                  2024 Tax Season
                </div>
                <div className="mt-1 text-xs text-gray-500 leading-5">
                  Your 2024 tax documents will be available by January 31, 2025.
                  Make sure your tax information is up to date.
                </div>
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              aria-label="Dismiss notice"
              onClick={() => setShowSeason(false)}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => setShowSeason(false))
              }
              className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer select-none text-gray-400 hover:text-gray-600"
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
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        ) : null}

        {/* Earnings Summary */}
        <div className="mt-5 bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5">
          <div className="text-sm font-semibold text-gray-900">
            2024 Earnings Summary
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Year-to-date earnings and quarterly breakdown
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {summaryCards.map((c) => (
              <MoneyCard
                key={c.id}
                title={c.title}
                value={c.value}
                highlight={c.highlight}
              />
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-blue-50/60 border border-blue-100 p-3 flex items-start gap-2 text-xs text-gray-700">
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-blue-600 mt-0.5">
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
                <path d="M12 8h.01" />
                <path d="M11 12h1v4h1" />
                <path d="M12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10z" />
              </svg>
            </div>
            You’ve exceeded the $600 IRS reporting threshold. You’ll receive a
            1099-K form.
          </div>
        </div>

        {/* Tax info card */}
        <div className="mt-5 bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-gray-900">
                Your tax information
              </div>
              <div className="mt-1 text-xs text-gray-500">
                This information will appear on your tax forms
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              aria-label="Edit tax information"
              onClick={() => {
                // blank router for now
              }}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => {
                  // blank router for now
                })
              }
              className="w-9 h-9 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center cursor-pointer select-none"
            >
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-700">
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
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <div>
                <div className="text-[11px] text-gray-500">Legal Name</div>
                <div className="mt-1 text-sm text-gray-900">John Doe</div>
              </div>

              <div>
                <div className="text-[11px] text-gray-500">Business Name</div>
                <div className="mt-1 text-sm text-gray-900">
                  John Doe Design Studio
                </div>
              </div>

              <div>
                <div className="text-[11px] text-gray-500">Tax ID (SSN)</div>
                <div className="mt-1 text-sm text-gray-900">***-**-6789</div>
              </div>

              <div>
                <div className="text-[11px] text-gray-500">Business Type</div>
                <div className="mt-1 text-sm text-gray-900">Sole Proprietor</div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-[11px] text-gray-500">Address</div>
                <div className="mt-1 text-sm text-gray-900 leading-6">
                  123 Main Street
                  <br />
                  San Francisco, CA 94102
                  <br />
                  United States
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tax documents */}
        <div className="mt-5 bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5">
          <div className="text-sm font-semibold text-gray-900">Tax Documents</div>
          <div className="mt-1 text-xs text-gray-500">
            Download your annual tax forms
          </div>

          <div className="mt-4 space-y-3">
            {docs.map((d) => (
              <div
                key={d.id}
                className="rounded-xl border border-gray-200 bg-white p-4 flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
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
                        <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                        <path d="M9 13h6" />
                        <path d="M9 17h6" />
                      </svg>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-sm font-medium text-gray-900">
                        {d.title}
                      </div>
                      <Pill text="available" />
                    </div>
                    <div className="mt-1 text-xs text-gray-500">{d.sub}</div>
                    <div className="mt-2 text-xs text-gray-500">{d.meta}</div>
                  </div>
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Download PDF"
                  onClick={() => {
                    // blank click for now
                  }}
                  onKeyDown={(e) =>
                    handleKeyboardActivate(e, () => {
                      // blank click for now
                    })
                  }
                  className="h-9 px-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-gray-700 flex-shrink-0"
                >
                  <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 10V2" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.66797 6.66797L8.0013 10.0013L11.3346 6.66797" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  </div>
                  Download PDF
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tax resources */}
        <div className="mt-5 bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5">
          <div className="text-sm font-semibold text-gray-900">Tax Resources</div>
          <div className="mt-1 text-xs text-gray-500">
            Helpful information for filing your taxes
          </div>

          <div className="mt-4">
            <div className="text-xs font-medium text-gray-900">
              Important Information
            </div>

            <ul className="mt-3 space-y-2 text-xs text-gray-600">
              {[
                "Tax forms are typically issued by January 31st for the previous tax year",
                "You’ll receive a 1099-K if your earnings exceed $600 in a calendar year",
                "Keep records of all business expenses for tax deductions",
                "Consult with a tax professional for personalized advice",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-400 mt-0.5">
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
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div className="leading-5">{t}</div>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {chips.map((c) => (
                <div
                  key={c}
                  className="h-8 px-3 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-700 flex items-center"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
}
