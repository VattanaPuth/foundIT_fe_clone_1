"use client";

import React from "react";
import { Search } from "lucide-react";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export default function SellerHero(props: {
  heroQuery: string;
  onChangeHeroQuery: (v: string) => void;

  topChips: string[];
  activeTopChip: string;
  onPickTopChip: (v: string) => void;

  subChips: string[];
  activeSubChip: string;
  onPickSubChip: (v: string) => void;
}) {
  const {
    heroQuery,
    onChangeHeroQuery,
    topChips,
    activeTopChip,
    onPickTopChip,
    subChips,
    activeSubChip,
    onPickSubChip,
  } = props;

  return (
    <section className="bg-[linear-gradient(130deg,#ECEEF2_0%,#ED9A09_50%)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-12">
        <div className="text-center">
          <div className="text-2xl md:text-4xl font-semibold text-white drop-shadow-sm flex items-center justify-center gap-2 mb-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0155 2.81249C11.0583 2.58309 11.1801 2.3759 11.3596 2.22681C11.5391 2.07771 11.7651 1.99609 11.9985 1.99609C12.2319 1.99609 12.4579 2.07771 12.6374 2.22681C12.8169 2.3759 12.9386 2.58309 12.9815 2.81249L14.0325 8.37049C14.1071 8.76564 14.2992 9.12911 14.5835 9.41346C14.8679 9.69781 15.2313 9.88984 15.6265 9.96449L21.1845 11.0155C21.4139 11.0583 21.6211 11.1801 21.7702 11.3596C21.9193 11.5391 22.0009 11.7651 22.0009 11.9985C22.0009 12.2319 21.9193 12.4579 21.7702 12.6374C21.6211 12.8169 21.4139 12.9386 21.1845 12.9815L15.6265 14.0325C15.2313 14.1071 14.8679 14.2992 14.5835 14.5835C14.2992 14.8679 14.1071 15.2313 14.0325 15.6265L12.9815 21.1845C12.9386 21.4139 12.8169 21.6211 12.6374 21.7702C12.4579 21.9193 12.2319 22.0009 11.9985 22.0009C11.7651 22.0009 11.5391 21.9193 11.3596 21.7702C11.1801 21.6211 11.0583 21.4139 11.0155 21.1845L9.96449 15.6265C9.88984 15.2313 9.69781 14.8679 9.41346 14.5835C9.12911 14.2992 8.76564 14.1071 8.37049 14.0325L2.81249 12.9815C2.58309 12.9386 2.3759 12.8169 2.22681 12.6374C2.07771 12.4579 1.99609 12.2319 1.99609 11.9985C1.99609 11.7651 2.07771 11.5391 2.22681 11.3596C2.3759 11.1801 2.58309 11.0583 2.81249 11.0155L8.37049 9.96449C8.76564 9.88984 9.12911 9.69781 9.41346 9.41346C9.69781 9.12911 9.88984 8.76564 9.96449 8.37049L11.0155 2.81249Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 2V6"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22 4H18"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4 22C5.10457 22 6 21.1046 6 20C6 18.8954 5.10457 18 4 18C2.89543 18 2 18.8954 2 20C2 21.1046 2.89543 22 4 22Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Ready-Made Assets &amp; Templates
          </div>
          <div className="mt-2 text-sm md:text-lg text-white/90">
            Premium UI kits, code starters, plugins, and creative assets from
            top creators
          </div>
        </div>

        <div className="mt-6">
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Search className="h-4 w-4" />
              </div>
              <input
                value={heroQuery}
                onChange={(e) => onChangeHeroQuery(e.target.value)}
                placeholder="Search templates, plugins, assets..."
                className="w-full h-12 rounded-lg bg-white border border-white/70 pl-11 pr-4 text-sm text-gray-900
                           outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* TOP pills: scroll only on mobile, no scroll on md+ */}
        <div className="mt-7">
          <div
            className={[
              "flex gap-2",
              "overflow-x-auto whitespace-nowrap pb-2",
              "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              "md:overflow-visible md:whitespace-normal md:flex-wrap md:justify-center md:pb-0",
            ].join(" ")}
          >
            {topChips.map((c) => {
              const active = activeTopChip === c;
              return (
                <div
                  key={c}
                  role="button"
                  tabIndex={0}
                  onClick={() => onPickTopChip(c)}
                  onKeyDown={(e) =>
                    handleKeyboardActivate(e, () => onPickTopChip(c))
                  }
                  className={[
                    "shrink-0 rounded-md px-3.5 py-1.5 text-xs md:text-xs font-medium",
                    "transition select-none cursor-pointer",
                    active
                      ? "bg-white text-orange-600 shadow-sm"
                      : "bg-white/15 text-white hover:bg-white/20",
                  ].join(" ")}
                  aria-label={`Filter category ${c}`}
                >
                  {c}
                </div>
              );
            })}
          </div>

          {/* 4 pills row: smaller + tighter like figma */}
          <div className="mt-4 flex justify-center">
            {/* mobile: allow scroll, md+: centered, no scroll */}
            <div className="w-full md:w-auto overflow-x-auto md:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex justify-center md:justify-center">
                {/* group container */}
                <div className="rounded-full bg-white/15 p-1">
                  <div className="flex gap-1">
                    {subChips.map((c) => {
                      const active = activeSubChip === c;

                      return (
                        <div
                          key={c}
                          role="button"
                          tabIndex={0}
                          onClick={() => onPickSubChip(c)}
                          onKeyDown={(e) =>
                            handleKeyboardActivate(e, () => onPickSubChip(c))
                          }
                          className={[
                            "rounded-full font-medium transition select-none cursor-pointer",
                            // mobile smaller
                            "px-3 py-1.5 text-xs",
                            // md+ bigger like figma screenshot
                            "md:px-5 md:py-2 md:text-sm",
                            active
                              ? "bg-white text-orange-600 shadow-sm"
                              : "bg-transparent text-white hover:bg-white/10",
                          ].join(" ")}
                          aria-label={`Set feed ${c}`}
                        >
                          {c}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
