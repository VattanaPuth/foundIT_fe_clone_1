"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { IconDoc } from "../../library/icons";
import { IconMessage } from "../../application/icons";
import { IconStar } from "../../admin/Icon";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

type TabKey = "overview" | "include" | "spec" | "change" | "support" | "review";

export default function Tabarea() {
  const tabs = useMemo(
    () => [
      { key: "overview" as const, label: "Overview" },
      { key: "include" as const, label: "What’s Included" },
      { key: "spec" as const, label: "Tech Specs" },
      { key: "change" as const, label: "Changelog" },
      { key: "support" as const, label: "Support" },
      { key: "review" as const, label: "Reviews" },
    ],
    []
  );

  const [tab, setTab] = useState<TabKey>("overview");
  const [open, setOpen] = useState(false);

  // drawer: ESC + click outside
  const drawerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onDown(e: MouseEvent) {
      if (!open) return;
      const el = drawerRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* top bar */}
      <div className="border-b border-gray-100 px-3 md:px-4 py-3 flex items-center justify-between">
        {/* md+ tabs */}
        <div className="hidden md:flex items-center gap-1 ">
          {tabs.map((t) => {
            const active = t.key === tab;
            return (
              <div
                key={t.key}
                role="button"
                tabIndex={0}
                onClick={() => setTab(t.key)}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () => setTab(t.key))
                }
                className={[
                  "h-9 px-3 rounded-md text-xs font-medium select-none flex items-center",
                  active
                    ? "bg-orange-50 text-orange-700 border border-orange-100"
                    : "text-gray-600 hover:bg-gray-50",
                ].join(" ")}
                aria-label={`Open ${t.label}`}
              >
                {t.label}
              </div>
            );
          })}
        </div>

        {/* mobile: hamburger -> drawer */}
        <div className="md:hidden flex items-center gap-3">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setOpen(true)}
            onKeyDown={(e) => handleKeyboardActivate(e, () => setOpen(true))}
            className="h-9 w-10 rounded-md border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center select-none"
            aria-label="Open tab menu"
          >
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
              <svg
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5 0.5H0.5"
                  stroke="#000001"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.5 5.5H0.5"
                  stroke="#000001"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.5 10.5H0.5"
                  stroke="#000001"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="text-sm font-medium text-gray-900">
            {tabs.find((x) => x.key === tab)?.label}
          </div>
        </div>
      </div>

      {/* content */}
      <div className="p-4 md:p-5">
        {tab === "overview" && <Overview />}
        {tab === "include" && <Include />}
        {tab === "spec" && <Spec />}
        {tab === "change" && <Change />}
        {tab === "support" && <Support />}
        {tab === "review" && <Review />}
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-x-0 bottom-0 p-3">
            <div
              ref={drawerRef}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-gray-900">Menu</div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setOpen(false)}
                  onKeyDown={(e) =>
                    handleKeyboardActivate(e, () => setOpen(false))
                  }
                  className="h-8 w-8 rounded-md border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center select-none"
                  aria-label="Close menu"
                >
                  <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-gray-500">
                    X
                  </div>
                </div>
              </div>

              <div className="px-3 pb-3 space-y-2">
                {tabs.map((t) => {
                  const active = t.key === tab;
                  return (
                    <div
                      key={t.key}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setTab(t.key);
                        setOpen(false);
                      }}
                      onKeyDown={(e) =>
                        handleKeyboardActivate(e, () => {
                          setTab(t.key);
                          setOpen(false);
                        })
                      }
                      className={[
                        "h-11 rounded-md border px-3 flex items-center justify-between select-none",
                        active
                          ? "border-orange-500 bg-orange-50 text-orange-700"
                          : "border-gray-200 bg-white hover:bg-gray-50 text-gray-800",
                      ].join(" ")}
                      aria-label={`Open ${t.label}`}
                    >
                      <div className="text-sm truncate">{t.label}</div>
                      
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- panel content (keep inside this file) ---------------- */

function Overview() {
  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold text-gray-900">
        Product Description
      </div>
      <div className="text-sm text-gray-600 leading-6">
        Modern Dashboard UI Kit includes carefully crafted components, cards,
        and responsive layouts. Built for clean admin dashboards and app
        interfaces.
      </div>

      <div className="space-y-2">
        {[
          "Figma-ready layout and component library",
          "Typography system and spacing scale",
          "Responsive grid and layout patterns",
          "Practical examples and mock screens",
        ].map((t) => (
          <div key={t} className="flex items-start gap-2 text-sm text-gray-700">
            <div className="mt-1 w-4 h-4 flex items-center justify-center flex-shrink-0 text-emerald-600">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6654 5L7.4987 14.1667L3.33203 10" stroke="#E17100" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
            <div>{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Include() {
  const left = ["50+ React components", "Responsive design", "Full documentation"];
  const right = ["Dark mode support", "TypeScript support", "Figma source files"];
  const formats = ["Figma", "JSX/TSX", "HTML/CSS", "ZIP"];

  return (
    <div className="space-y-5">
      <div className="text-lg font-semibold text-gray-900">What&apos;s Included</div>

      {/* 2-col checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {left.map((t) => (
            <div key={t} className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-orange-500">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6654 5L7.4987 14.1667L3.33203 10" stroke="#E17100" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              </div>
              <div className="text-sm text-gray-700">{t}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {right.map((t) => (
            <div key={t} className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-orange-500">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6654 5L7.4987 14.1667L3.33203 10" stroke="#E17100" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              </div>
              <div className="text-sm text-gray-700">{t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* File formats box */}
      <div className="rounded-xl border border-orange-300 bg-orange-50/60 p-4">
        <div className="text-sm font-semibold text-orange-700">File Formats</div>

        <div className="mt-3 flex flex-wrap gap-2">
          {formats.map((f) => (
            <div
              key={f}
              className="h-8 px-3 rounded-full bg-white border border-gray-200 text-xs text-gray-800 flex items-center"
            >
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function Spec() {
  const rows = [
    { k: "Framework", v: "React 18" },
    { k: "Styling", v: "Tailwind CSS" },
    { k: "Type", v: "UI kit" },
    { k: "File size", v: "12.5 MB" },
  ];

  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold text-gray-900">
        Technical Specification
      </div>

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        {rows.map((r, i) => (
          <div
            key={r.k}
            className={[
              "px-3 py-3 flex items-center justify-between text-sm",
              i !== rows.length - 1 ? "border-b border-gray-100" : "",
            ].join(" ")}
          >
            <div className="text-gray-500">{r.k}</div>
            <div className="text-gray-900 font-medium">{r.v}</div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-gray-200 p-3">
        <div className="text-xs font-semibold text-gray-900">
          System Requirement
        </div>
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <div>• Figma 1.0+</div>
          <div>• Modern browser</div>
          <div>• Basic UI knowledge</div>
        </div>
      </div>
    </div>
  );
}

function Change() {
  const current = "v2.1.0";

  const items = [
    {
      ver: "v2.1.0",
      date: "Nov 4, 2025",
      latest: true,
      list: [
        "Added dark mode support",
        "New analytics components",
        "Performance improvements",
        "Bug fixes",
      ],
    },
    {
      ver: "v2.0.0",
      date: "Oct 15, 2025",
      latest: false,
      list: ["Major redesign", "TypeScript migration", "New component library"],
    },
    {
      ver: "v1.5.0",
      date: "Sep 1, 2025",
      latest: false,
      list: ["Added charts", "Mobile responsive", "Accessibility improvements"],
    },
  ];

  return (
    <div className="space-y-5">
      {/* header */}
      <div className="flex items-center justify-between gap-3">
        <div className="text-lg font-semibold text-gray-900">Version History</div>

        <div className="h-7 px-3 rounded-full bg-gray-100 text-gray-700 text-xs flex items-center border border-gray-200">
          Current: {current}
        </div>
      </div>

      {/* timeline */}
      <div className="space-y-8">
        {items.map((it) => (
          <div key={it.ver} className="relative pl-8">
            {/* vertical line */}
            <div className="absolute left-3 top-1 bottom-1 w-[2px] bg-orange-500/70" />

            {/* header row */}
            <div className="flex items-center gap-2">
              <div className="text-base font-semibold text-gray-900">{it.ver}</div>
              <div className="text-sm text-gray-500">{it.date}</div>

              {it.latest && (
                <div className="ml-2 h-6 px-3 rounded-full bg-emerald-600 text-white text-xs flex items-center">
                  Latest
                </div>
              )}
            </div>

            {/* bullet list */}
            <div className="mt-3 space-y-2">
              {it.list.map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 flex items-center justify-center flex-shrink-0 text-orange-500">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6654 5L7.4987 14.1667L3.33203 10" stroke="#E17100" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                  </div>
                  <div className="text-sm text-gray-700">{t}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function Support() {
  const policies = [
    "30-day money-back guarantee",
    "Lifetime updates for purchased version",
    "No subscription required",
  ];

  return (
    <div className="space-y-5">
      <div className="text-lg font-semibold text-gray-900">Support &amp; Documentation</div>

      {/* green banner */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-white">
             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6654 5L7.4987 14.1667L3.33203 10" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
          </div>

          <div className="min-w-0">
            <div className="text-base font-semibold text-emerald-900">
              Premium Support Included
            </div>
            <div className="mt-1 text-sm text-emerald-900/80">
              Response within 24 hours &nbsp;·&nbsp; 6 months of updates &nbsp;·&nbsp; Priority email support
            </div>
          </div>
        </div>
      </div>

      {/* two cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-5 h-5 flex items-center justify-center flex-shrink-0 text-gray-500">
              <IconDoc/>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Documentation</div>
              <div className="mt-1 text-sm text-gray-600">
                Complete setup guide &amp; API reference
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-5 h-5 flex items-center justify-center flex-shrink-0 text-gray-500">
              <IconMessage/>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Community Forum</div>
              <div className="mt-1 text-sm text-gray-600">Get help from other users</div>
            </div>
          </div>
        </div>
      </div>

      {/* divider */}
      <div className="border-t border-gray-100 pt-4" />

      {/* policies */}
      <div className="space-y-3">
        <div className="text-sm font-semibold text-gray-900">Policies</div>

        <div className="space-y-2">
          {policies.map((t) => (
            <div key={t} className="flex items-start gap-3">
              <div className="mt-0.5 w-5 h-5 flex items-center justify-center flex-shrink-0 text-emerald-600">
                ✓
              </div>
              <div className="text-sm text-gray-700">{t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function Review() {
  const summary = {
    rating: 4.9,
    total: 234,
    breakdown: [
      { star: 5, count: 179 },
      { star: 4, count: 47 },
      { star: 3, count: 8 },
      { star: 2, count: 2 },
      { star: 1, count: 2 },
    ],
  };

  const all = [
    {
      id: "r1",
      name: "Michael Johnson",
      badge: "Verified Purchase",
      star: 5,
      date: "2 weeks ago",
      title: "Outstanding quality and attention to detail",
      text:
        "This dashboard UI kit exceeded my expectations. The components are incredibly well-designed and easy to customize. I was able to build a complete admin panel in just a few days. The dark mode implementation is flawless, and the TypeScript support made integration seamless.",
      helpful: 25,
      reply: true,
      sellerReply: {
        name: "Sarah Chen",
        role: "Seller",
        date: "1 week ago",
        text:
          "Thank you so much for the wonderful review, Michael! We're thrilled to hear that the kit helped you build your admin panel quickly. If you ever need any assistance or have feature requests, don’t hesitate to reach out. Happy building! ✨",
          avatarSrc:"/images/sellerbox.png",
      },
    },
    {
      id: "r2",
      name: "Sarah Chen",
      badge: "Verified Purchase",
      star: 5,
      date: "1 month ago",
      title: "Perfect for rapid prototyping",
      text:
        "As a product designer, I needed something that would help me quickly prototype dashboard concepts. This kit has been a game-changer. The component library is comprehensive, and everything works perfectly in Figma too.",
      helpful: 18,
      reply: true,
  
    },
    {
      id: "r3",
      name: "David Martinez",
      badge: "Verified Purchase",
      star: 4,
      date: "3 weeks ago",
      title: "Great components, minor documentation gaps",
      text:
        "Overall very satisfied with this purchase. The components are beautiful and well-coded. My only minor complaint is that some of the more advanced features could use better documentation. Had to figure out a few things on my own.",
      helpful: 12,
      reply: true,
      sellerReply: {
        name: "Sarah Chen",
        role: "Seller",
        date: "2 weeks ago",
        text:
          "Thanks for the honest feedback, David! You’re absolutely right about the documentation — we’re currently working on expanding it with more detailed examples for advanced features. Should be ready in the next update. Appreciate your patience! 🙏",
          avatarSrc:"/images/sellerbox.png",
      },
    },
    {
      id: "r4",
      name: "Emma Peters",
      badge: "Verified Purchase",
      star: 5,
      date: "5 days ago",
      title: "Best investment for our startup",
      text:
        "We’re a small startup and this UI kit saved us weeks of development time. The quality is professional-grade, and being able to customize everything with Tailwind made it perfect for our brand.",
      helpful: 31,
      reply: true,
      sellerReply: {
        name: "Sarah Chen",
        role: "Seller",
        date: "4 days ago",
        text:
          "This made our day, Emma! We’re so happy it helped the team ship faster. Feel free to reach out with your project, and we’ll always here if you need anything!",
        avatarSrc:"/images/sellerbox.png",
        },
    },
    {
      id: "r5",
      name: "Ryan Thompson",
      badge: "Verified Purchase",
      star: 5,
      date: "1 week ago",
      title: "Clean code and great performance",
      text:
        "As a developer who’s picky about code quality, I’m really impressed. The components are well-structured, TypeScript types are accurate, and there are no unnecessary dependencies.",
      helpful: 27,
      reply: true,
    },
  ];

  // your rule: default max 4, load more shows 1 more, then load less
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? all : all.slice(0, 4);

  const maxCount = Math.max(...summary.breakdown.map((b) => b.count));

  return (
    <div className="space-y-5">
      {/* header */}
      <div className="flex items-center justify-between gap-3">
        <div className="text-lg font-semibold text-gray-900">Customer Reviews</div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => {}}
          onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
          className="h-9 px-3 rounded-md bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium flex items-center justify-center select-none"
          aria-label="Write a review"
        >
          Write a Review
        </div>
      </div>

      {/* summary row */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5 items-start">
        {/* left rating */}
        <div>
          <div className="text-3xl font-semibold text-gray-900">{summary.rating}</div>
          <div className="mt-1 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-orange-500"
              >
                <IconStar/>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-gray-500">{summary.total} reviews</div>
        </div>

        {/* right breakdown */}
        <div className="space-y-2">
          {summary.breakdown.map((b) => {
            const pct = maxCount ? (b.count / maxCount) * 100 : 0;
            return (
              <div key={b.star} className="flex items-center gap-3">
                <div className="w-10 text-xs text-gray-600 flex items-center gap-1">
                  <div>{b.star}</div>
                  <div className="w-3 h-3 flex items-center justify-center flex-shrink-0 text-gray-400">
                    <IconStar/>
                  </div>
                </div>

                <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="w-8 text-xs text-gray-500 text-right">{b.count}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* review list */}
      <div className="space-y-4">
        {shown.map((r) => (
          <div key={r.id} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="h-9 w-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700 flex-shrink-0">
                  {r.name
                    .split(" ")
                    .slice(0, 2)
                    .map((x) => x[0])
                    .join("")}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="text-sm font-semibold text-gray-900">{r.name}</div>
                    <div className="h-6 px-2 rounded-full bg-gray-100 border border-gray-200 text-[11px] text-gray-700 flex items-center">
                      {r.badge}
                    </div>
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-orange-500"
                        >
                          <IconStar/>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">{r.date}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 text-sm font-semibold text-gray-900">{r.title}</div>
            <div className="mt-2 text-sm text-gray-600 leading-6">{r.text}</div>

            {/* actions */}
            <div className="mt-3 flex items-center gap-3 text-xs text-gray-600">
              

            

              <div
                role="button"
                tabIndex={0}
                onClick={() => {}}
                onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
                className="flex items-center gap-2 hover:text-gray-900 select-none"
                aria-label="Reply"
              >
                Reply
              </div>
            </div>

            {/* seller reply (if exists) */}
            {r.sellerReply && (
              <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50/60 p-4">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-white border border-orange-200 flex items-center justify-center text-xs font-semibold text-orange-700 flex-shrink-0">
                    <div className="h-9 w-9 rounded-full bg-white border border-orange-200 overflow-hidden flex-shrink-0">
  <img
    src={r.sellerReply.avatarSrc || "/placeholder.png"}
    alt={r.sellerReply.name}
    className="h-full w-full object-cover"
  />
</div>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {r.sellerReply.name}
                      </div>
                      <div className="h-6 px-2 rounded-full bg-orange-100 text-orange-700 text-[11px] flex items-center">
                        {r.sellerReply.role}
                      </div>
                    </div>

                    <div className="mt-1 text-xs text-gray-500">{r.sellerReply.date}</div>

                    <div className="mt-2 text-sm text-gray-700 leading-6">
                      {r.sellerReply.text}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* load more / less */}
      <div className="pt-2 flex justify-center">
        {!showAll ? (
          <div
            role="button"
            tabIndex={0}
            onClick={() => setShowAll(true)}
            onKeyDown={(e) => handleKeyboardActivate(e, () => setShowAll(true))}
            className="h-10 px-5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-900 inline-flex items-center justify-center select-none"
            aria-label="Load more review"
          >
            Load More Reviews
          </div>
        ) : (
          <div
            role="button"
            tabIndex={0}
            onClick={() => setShowAll(false)}
            onKeyDown={(e) => handleKeyboardActivate(e, () => setShowAll(false))}
            className="h-10 px-5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-900 inline-flex items-center justify-center select-none"
            aria-label="Load less review"
          >
            Load Less Reviews
          </div>
        )}
      </div>
    </div>
  );
}


function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-gray-200 p-3">
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      <div className="mt-1 text-sm text-gray-600 leading-6">{desc}</div>
    </div>
  );
}
