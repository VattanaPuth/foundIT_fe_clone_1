"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  ActivityItem,
  Candidate,
} from "@/app/components/styles/client_styles/dashboard/moskData";
import { handleKeyboardActivate } from "@/app/components/styles/client_styles/dashboard/utils";

function JobPerformanceCard() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [range, setRange] = useState<
    "Last 7 days" | "Last 30 days" | "Last 90 days"
  >("Last 7 days");

  useEffect(() => {
    function onDocDown(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (rootRef.current && !rootRef.current.contains(t)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div className="bg-white border rounded-xl shadow-sm p-4" ref={rootRef}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">
          Job Performance
        </div>

        <div className="relative">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setOpen((v) => !v)}
            onKeyDown={(e) =>
              handleKeyboardActivate(e, () => setOpen((v) => !v))
            }
            className="rounded-full border bg-white px-3 py-1 text-xs text-gray-700 cursor-pointer select-none
                       hover:bg-gray-50 hover:border-gray-300 transition active:scale-[0.99]"
            aria-label="Select date range"
          >
            {range}
          </div>

          {open ? (
            <div className="absolute right-0 mt-2 w-40 rounded-xl border bg-white shadow-sm overflow-hidden z-30">
              {(["Last 7 days", "Last 30 days", "Last 90 days"] as const).map(
                (opt) => (
                  <div
                    key={opt}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setRange(opt);
                      setOpen(false);
                    }}
                    onKeyDown={(e) =>
                      handleKeyboardActivate(e, () => {
                        setRange(opt);
                        setOpen(false);
                      })
                    }
                    className={`px-3 py-2 text-sm cursor-pointer select-none hover:bg-gray-50
                                ${opt === range ? "bg-green-50/40" : ""}`}
                    aria-label={`Choose ${opt}`}
                  >
                    {opt}
                  </div>
                )
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-gray-50 border px-3 py-3">
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-lg bg-green-100 flex items-center justify-center"
              aria-hidden="true"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1565_23940)">
                  <path
                    d="M1.7181 10.2908C1.64865 10.1037 1.64865 9.89788 1.7181 9.71079C2.39452 8.07067 3.5427 6.66832 5.01708 5.68154C6.49146 4.69475 8.22564 4.16797 9.99977 4.16797C11.7739 4.16797 13.5081 4.69475 14.9825 5.68154C16.4568 6.66832 17.605 8.07067 18.2814 9.71079C18.3509 9.89788 18.3509 10.1037 18.2814 10.2908C17.605 11.9309 16.4568 13.3333 14.9825 14.32C13.5081 15.3068 11.7739 15.8336 9.99977 15.8336C8.22564 15.8336 6.49146 15.3068 5.01708 14.32C3.5427 13.3333 2.39452 11.9309 1.7181 10.2908Z"
                    stroke="#009966"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                    stroke="#009966"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1565_23940">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">Total Views</div>
              <div className="text-sm font-semibold text-gray-900">1,247</div>
            </div>
          </div>
          <div className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700 border border-green-200">
            +12%
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-gray-50 border px-3 py-3">
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center"
              aria-hidden="true"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1565_23953)">
                  <path
                    d="M13.3327 17.5V15.8333C13.3327 14.9493 12.9815 14.1014 12.3564 13.4763C11.7313 12.8512 10.8834 12.5 9.99935 12.5H4.99935C4.11529 12.5 3.26745 12.8512 2.64233 13.4763C2.01721 14.1014 1.66602 14.9493 1.66602 15.8333V17.5"
                    stroke="#4F39F6"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.334 2.60547C14.0488 2.79078 14.6818 3.20819 15.1337 3.79219C15.5856 4.37619 15.8308 5.09371 15.8308 5.83214C15.8308 6.57056 15.5856 7.28808 15.1337 7.87208C14.6818 8.45608 14.0488 8.87349 13.334 9.0588"
                    stroke="#4F39F6"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.334 17.501V15.8344C18.3334 15.0958 18.0876 14.3784 17.6351 13.7946C17.1826 13.2109 16.5491 12.794 15.834 12.6094"
                    stroke="#4F39F6"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.49935 9.16667C9.3403 9.16667 10.8327 7.67428 10.8327 5.83333C10.8327 3.99238 9.3403 2.5 7.49935 2.5C5.6584 2.5 4.16602 3.99238 4.16602 5.83333C4.16602 7.67428 5.6584 9.16667 7.49935 9.16667Z"
                    stroke="#4F39F6"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1565_23953">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">Applications</div>
              <div className="text-sm font-semibold text-gray-900">43</div>
            </div>
          </div>
          <div className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 border border-blue-200">
            +8%
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-gray-50 border px-3 py-3">
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-lg bg-orange-100 flex items-center justify-center"
              aria-hidden="true"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1565_23968)">
                  <path
                    d="M10 5V10L13.3333 11.6667"
                    stroke="#E17100"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.99935 18.3346C14.6017 18.3346 18.3327 14.6037 18.3327 10.0013C18.3327 5.39893 14.6017 1.66797 9.99935 1.66797C5.39698 1.66797 1.66602 5.39893 1.66602 10.0013C1.66602 14.6037 5.39698 18.3346 9.99935 18.3346Z"
                    stroke="#E17100"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1565_23968">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">Avg. Response Time</div>
              <div className="text-sm font-semibold text-gray-900">2.4 hrs</div>
            </div>
          </div>
          <div className="rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-700 border border-orange-200">
            -15%
          </div>
        </div>
      </div>
    </div>
  );
}

function SavedCandidatesCard({
  candidates,
  onViewAll,
}: {
  candidates: Candidate[];
  onViewAll: () => void;
}) {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-4">
      <div className="text-sm font-semibold text-gray-900">
        Saved Candidates
      </div>

      <div className="mt-3 space-y-3">
        {candidates.map((c) => (
          <div key={c.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="h-9 w-9 rounded-full bg-gray-200"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {c.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    ★ {c.rating.toFixed(1)}
                  </div>
                </div>
                <div className="text-xs text-gray-500 truncate">{c.role}</div>
                <div className="text-xs text-gray-500 truncate">{c.skills}</div>
              </div>
            </div>
            <div className="text-xs text-gray-700 whitespace-nowrap">
              {c.rate}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div
          role="button"
          tabIndex={0}
          onClick={onViewAll}
          onKeyDown={(e) => handleKeyboardActivate(e, onViewAll)}
          className="w-full rounded-md border bg-white px-4 py-2 text-center text-sm text-gray-700 cursor-pointer select-none
                     hover:bg-gray-50 hover:border-gray-300 transition active:scale-[0.99]"
          aria-label="View all saved candidates"
        >
          View All Saved
        </div>
      </div>
    </div>
  );
}

function BudgetTrackerCard() {
  const spent = 8500;
  const limit = 15000;
  const pct = Math.min(100, Math.round((spent / limit) * 100));

  return (
    <div className="bg-white border rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">
          Budget Tracker
        </div>
        <div className="rounded-full border bg-white px-3 py-1 text-xs text-gray-700">
          This month
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <span>Spent</span>
        <span className="text-gray-700 font-medium">
          ${spent.toLocaleString()} / ${limit.toLocaleString()}
        </span>
      </div>

      <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full bg-green-500" style={{ width: `${pct}%` }} />
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <span
              className="h-2 w-2 rounded-full bg-green-500"
              aria-hidden="true"
            />
            <span className="text-xs">Active Projects</span>
          </div>
          <div className="text-xs text-gray-700">$6,200</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <span
              className="h-2 w-2 rounded-full bg-blue-500"
              aria-hidden="true"
            />
            <span className="text-xs">In Escrow</span>
          </div>
          <div className="text-xs text-gray-700">$2,300</div>
        </div>
      </div>
    </div>
  );
}

function RecentActivityCard({ items }: { items: ActivityItem[] }) {
  // Use your exact background colors
  function toneBg(tone: ActivityItem["iconTone"], variant?: string) {
    // Optional 4th icon background
    if (variant === "info") return "bg-[#DCFCE7]";

    if (tone === "blue") return "bg-[#E0E7FF]";
    if (tone === "purple") return "bg-[#F3E8FF]";
    return "bg-[#D0FAE5]"; // green default
  }

  return (
    <div className="bg-white border rounded-xl shadow-sm p-4">
      <div className="text-sm font-semibold text-gray-900">Recent Activity</div>

      <div className="mt-3 space-y-3">
        {items.map((a) => {
          // Optional: use variant property if it exists on the item
          const variant: string | undefined =
            "variant" in a &&
            typeof (a as Record<string, unknown>).variant === "string"
              ? ((a as Record<string, unknown>).variant as string)
              : undefined;

          return (
            <div key={a.id} className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`h-9 w-9 rounded-lg ${toneBg(
                    a.iconTone,
                    variant
                  )} flex items-center justify-center`}
                  aria-hidden="true"
                >
                  {/* BLUE (Users) */}
                  {variant !== "info" && a.iconTone === "blue" ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1565_23436)">
                        <path
                          d="M10.6673 14V12.6667C10.6673 11.9594 10.3864 11.2811 9.88627 10.781C9.38617 10.281 8.70789 10 8.00065 10H4.00065C3.29341 10 2.61513 10.281 2.11503 10.781C1.61494 11.2811 1.33398 11.9594 1.33398 12.6667V14"
                          stroke="#4F39F6"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.666 2.08594C11.2379 2.23418 11.7443 2.56811 12.1058 3.03531C12.4673 3.50251 12.6635 4.07653 12.6635 4.66727C12.6635 5.25801 12.4673 5.83203 12.1058 6.29923C11.7443 6.76643 11.2379 7.10036 10.666 7.2486"
                          stroke="#4F39F6"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.666 13.9993V12.6659C14.6656 12.0751 14.4689 11.5011 14.1069 11.0341C13.7449 10.5672 13.2381 10.2336 12.666 10.0859"
                          stroke="#4F39F6"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.00065 7.33333C7.47341 7.33333 8.66732 6.13943 8.66732 4.66667C8.66732 3.19391 7.47341 2 6.00065 2C4.52789 2 3.33398 3.19391 3.33398 4.66667C3.33398 6.13943 4.52789 7.33333 6.00065 7.33333Z"
                          stroke="#4F39F6"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1565_23436">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  ) : null}

                  {/* PURPLE (Calendar) */}
                  {variant !== "info" && a.iconTone === "purple" ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1565_23450)">
                        <path
                          d="M5.33398 1.33203V3.9987"
                          stroke="#9810FA"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.666 1.33203V3.9987"
                          stroke="#9810FA"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.6667 2.66797H3.33333C2.59695 2.66797 2 3.26492 2 4.0013V13.3346C2 14.071 2.59695 14.668 3.33333 14.668H12.6667C13.403 14.668 14 14.071 14 13.3346V4.0013C14 3.26492 13.403 2.66797 12.6667 2.66797Z"
                          stroke="#9810FA"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 6.66797H14"
                          stroke="#9810FA"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1565_23450">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  ) : null}

                  {/* GREEN (Eye) */}
                  {variant !== "info" && a.iconTone === "green" ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1565_23464)">
                        <path
                          d="M1.3737 8.23029C1.31814 8.08061 1.31814 7.91596 1.3737 7.76629C1.91483 6.45419 2.83338 5.33231 4.01288 4.54289C5.19239 3.75346 6.57973 3.33203 7.99904 3.33203C9.41834 3.33203 10.8057 3.75346 11.9852 4.54289C13.1647 5.33231 14.0832 6.45419 14.6244 7.76629C14.6799 7.91596 14.6799 8.08061 14.6244 8.23029C14.0832 9.54238 13.1647 10.6643 11.9852 11.4537C10.8057 12.2431 9.41834 12.6645 7.99904 12.6645C6.57973 12.6645 5.19239 12.2431 4.01288 11.4537C2.83338 10.6643 1.91483 9.54238 1.3737 8.23029Z"
                          stroke="#009966"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                          stroke="#009966"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1565_23464">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  ) : null}

                  {/* OPTIONAL 4TH ICON (Info) */}
                  {variant === "info" ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1565_23476)">
                        <path
                          d="M8.00065 14.6654C11.6825 14.6654 14.6673 11.6806 14.6673 7.9987C14.6673 4.3168 11.6825 1.33203 8.00065 1.33203C4.31875 1.33203 1.33398 4.3168 1.33398 7.9987C1.33398 11.6806 4.31875 14.6654 8.00065 14.6654Z"
                          stroke="#00A63E"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 5.33203V7.9987"
                          stroke="#00A63E"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 10.668H8.00667"
                          stroke="#00A63E"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1565_23476">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  ) : null}
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {a.title}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {a.subtitle}
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 whitespace-nowrap">
                {a.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function RightWidgets({
  candidates,
  activities,
}: {
  candidates: Candidate[];
  activities: ActivityItem[];
}) {
  const router = useRouter();

  return (
    <aside className="lg:col-span-1 space-y-6">
      <JobPerformanceCard />

      <SavedCandidatesCard
        candidates={candidates}
        onViewAll={() => router.push("")}
      />

      <BudgetTrackerCard />

      <RecentActivityCard items={activities} />
    </aside>
  );
}
