"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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

export default function JobSidebar({
  budget,
  jobId,
}: {
  budget: {
    amount: string;
    type: string;
    competitionLabel: string;
    proposalsText: string;
    competitionPercent: number;
  };
  jobId?: string;
}) {
  const router = useRouter();
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [applied, setApplied] = useState(false); // TODO: check from backend

  // dropdown (reason)
  const reasonOptions = useMemo(
    () => [
      { key: "another", label: "Found another opportunity" },
      { key: "budget", label: "Budget too low" },
      { key: "timeline", label: "Timeline not suitable" },
      { key: "fit", label: "Not a good fit" },
      { key: "custom", label: "Custom..." },
    ],
    []
  );

  const [reasonOpen, setReasonOpen] = useState(false);
  const [reasonKey, setReasonKey] = useState<string>("another");
  const [customReason, setCustomReason] = useState("");

  const reasonWrapRef = useRef<HTMLDivElement | null>(null);

  const selectedReasonLabel =
    reasonOptions.find((o) => o.key === reasonKey)?.label ?? "Select reason";

  // ESC close: dropdown first, then modal
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (reasonOpen) setReasonOpen(false);
        else if (withdrawOpen) setWithdrawOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [reasonOpen, withdrawOpen]);

  // click outside: dropdown
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!reasonOpen) return;
      const el = reasonWrapRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target))
        setReasonOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [reasonOpen]);

  // lock body scroll when modal open
  useEffect(() => {
    if (!withdrawOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [withdrawOpen]);

  // static client info (for now)
  const client = {
    location: "San Francisco, CA",
    totalSpent: "$45,000",
    hireRate: "85%",
  };

  return (
    <>
      {/* Budget */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="px-5 py-4">
          <p className="text-xl font-semibold text-gray-900">{budget.amount}</p>
          <p className="mt-1 text-xs text-gray-500">{budget.type}</p>

          {/* static for now */}
          <p className="mt-2 text-xs text-[#615FFF]">Your rate: $75/hr</p>
        </div>

        <div className="border-t border-gray-200 px-5 py-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Competition:</span>
            <span className="text-orange-600">{budget.competitionLabel}</span>
          </div>

          <div className="mt-2 h-2 w-full rounded-full bg-emerald-100 overflow-hidden">
            <div
              className="h-full bg-emerald-500"
              style={{ width: `${budget.competitionPercent}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-gray-500">{budget.proposalsText}</p>

          {/* Buttons (under budget card in Figma) */}
          <div className="mt-4 space-y-2">
            {applied ? (
              <>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push("/page/freelancer/application")}
                  onKeyDown={(e) =>
                    handleKeyboardActivate(e, () =>
                      router.push("/page/freelancer/application")
                    )
                  }
                  className="w-full rounded-md border border-[#615FFF]/40 bg-white px-3 py-2.5 text-center text-sm font-medium text-[#615FFF]
                             hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#615FFF] focus:border-[#615FFF]"
                >
                  Back to Applications
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setWithdrawOpen(true)}
                  onKeyDown={(e) =>
                    handleKeyboardActivate(e, () => setWithdrawOpen(true))
                  }
                  className="w-full rounded-md border border-red-300 bg-white px-3 py-2.5 text-center text-sm font-medium text-red-600
                             hover:bg-gray-50 focus:outline-none focus:ring-2 "
                >
                  Withdraw Application
                </div>
              </>
            ) : (
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  setApplied(true);
                  // Use jobId prop if available
                  if (jobId) {
                    router.push(`/page/freelancer/proposal/form?id=${jobId}`);
                  } else if (typeof window !== "undefined") {
                    const url = new URL(window.location.href);
                    const urlJobId =
                      url.searchParams.get("id") ||
                      url.searchParams.get("jobId");
                    if (urlJobId) {
                      router.push(
                        `/page/freelancer/proposal/form?id=${urlJobId}`
                      );
                    } else {
                      alert("Job ID not found in URL. Cannot apply.");
                    }
                  } else {
                    alert("Job ID not found in props or URL. Cannot apply.");
                  }
                }}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () => {
                    setApplied(true);
                    if (typeof window !== "undefined") {
                      const url = new URL(window.location.href);
                      const jobId =
                        url.searchParams.get("id") ||
                        url.searchParams.get("jobId");
                      if (jobId) {
                        router.push(
                          `/page/freelancer/proposal/form?id=${jobId}`
                        );
                      } else {
                        alert("Job ID not found in URL. Cannot apply.");
                      }
                    }
                  })
                }
                className="w-full rounded-md border border-[#615FFF]/40 bg-[#615FFF] px-3 py-2.5 text-center text-sm font-medium text-white
                           hover:bg-[#615FFF]/90 focus:outline-none focus:ring-2 focus:ring-[#615FFF] focus:border-[#615FFF]"
              >
                Apply
              </div>
            )}
          </div>
        </div>
      </div>

      {/* About the Client */}
      <div className="mt-4 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">
              About the Client
            </p>

            <div className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-600">
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
                ✓
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Location:</span>
              <span className="text-xs font-medium text-gray-900">
                {client.location}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Total spent:</span>
              <span className="text-xs font-medium text-gray-900">
                {client.totalSpent}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Hire rate:</span>
              <span className="text-xs font-medium text-gray-900">
                {client.hireRate}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <div
              role="button"
              tabIndex={0}
              onClick={() => alert("View client profile")}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => alert("View client profile"))
              }
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-center text-sm font-medium text-gray-900
                         hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#615FFF] focus:border-[#615FFF]"
            >
              View Client Profile
            </div>
          </div>
        </div>
      </div>

      {/* Payment Verified (green tinted like Figma) */}
      <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl shadow-sm">
        <div className="px-4 py-4 flex items-start gap-3">
          <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-emerald-700">
              ✓
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              Payment Verified
            </p>
            <p className="mt-1 text-xs text-gray-600">
              This client has verified payment method on file
            </p>
          </div>
        </div>
      </div>

      {/* Withdraw modal */}
      {withdrawOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setReasonOpen(false);
            setWithdrawOpen(false);
          }}
        >
          {/* overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* modal */}
          <div
            className="relative w-full max-w-xl rounded-xl bg-white border border-gray-200 shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-gray-200">
              <div className="min-w-0">
                <p className="text-base font-semibold text-gray-900">
                  Withdraw Application
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  This action cannot be undone. The client will be notified of
                  your withdrawal.
                </p>
              </div>

              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  setReasonOpen(false);
                  setWithdrawOpen(false);
                }}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () => {
                    setReasonOpen(false);
                    setWithdrawOpen(false);
                  })
                }
                className="h-8 w-8 rounded-md border border-gray-200 bg-white flex items-center justify-center text-gray-500
                           hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#615FFF] focus:border-[#615FFF]"
                aria-label="Close"
              >
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
                  X
                </div>
              </div>
            </div>

            {/* body (scrollable inside modal on mobile) */}
            <div className="px-5 py-4 max-h-[70vh] overflow-y-auto">
              {/* dropdown */}
              <div ref={reasonWrapRef} className="relative">
                <p className="text-xs font-medium text-gray-700">
                  Reason for withdrawing <span className="text-red-600">*</span>
                </p>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setReasonOpen((v) => !v)}
                  onKeyDown={(e) =>
                    handleKeyboardActivate(e, () => setReasonOpen((v) => !v))
                  }
                  className="mt-2 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900
                             flex items-center justify-between gap-3
                             hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#615FFF] focus:border-[#615FFF]"
                >
                  <span className="truncate">{selectedReasonLabel}</span>
                  <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M4 6L8 10L12 6"
                          stroke="#717182"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </svg>
                  </div>
                </div>

                {reasonOpen && (
                  <div className="absolute z-10 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden">
                    {reasonOptions.map((opt) => {
                      const active = opt.key === reasonKey;
                      return (
                        <div
                          key={opt.key}
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            setReasonKey(opt.key);
                            setReasonOpen(false);
                          }}
                          onKeyDown={(e) =>
                            handleKeyboardActivate(e, () => {
                              setReasonKey(opt.key);
                              setReasonOpen(false);
                            })
                          }
                          className={`px-3 py-2 text-sm cursor-pointer select-none ${
                            active
                              ? "bg-gray-50 text-gray-900"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {opt.label}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* custom textarea */}
              {reasonKey === "custom" && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-gray-700">
                    Custom reason
                  </p>
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className="mt-2 w-full min-h-[96px] rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900
                               outline-none focus:ring-2 focus:ring-[#615FFF] focus:border-[#615FFF]"
                    placeholder="Write your reason..."
                  />
                </div>
              )}

              {/* warning box */}
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-red-600">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.9974 18.3337C14.5998 18.3337 18.3307 14.6027 18.3307 10.0003C18.3307 5.39795 14.5998 1.66699 9.9974 1.66699C5.39502 1.66699 1.66406 5.39795 1.66406 10.0003C1.66406 14.6027 5.39502 18.3337 9.9974 18.3337Z"
                          stroke="#E7000B"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10 6.66699V10.0003"
                          stroke="#E7000B"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10 13.333H10.0083"
                          stroke="#E7000B"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-red-700">
                      What happens when you withdraw:
                    </p>

                    <div className="mt-2 space-y-1 text-xs text-red-700">
                      <div>Your application will be permanently removed</div>
                      <div>The client will be notified of your withdrawal</div>
                      <div>You won't be able to undo this action</div>
                      <div>You can reapply later if the job is still open</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="px-5 py-4 border-t border-gray-200 flex items-center justify-end gap-2">
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  setReasonOpen(false);
                  setWithdrawOpen(false);
                }}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () => {
                    setReasonOpen(false);
                    setWithdrawOpen(false);
                  })
                }
                className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900
                           hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#615FFF] focus:border-[#615FFF]"
              >
                Cancel
              </div>

              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  // static behavior for now: close
                  setReasonOpen(false);
                  setWithdrawOpen(false);
                }}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () => {
                    setReasonOpen(false);
                    setWithdrawOpen(false);
                  })
                }
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white
                           hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[#615FFF] focus:border-[#615FFF]"
              >
                Withdraw Application
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
