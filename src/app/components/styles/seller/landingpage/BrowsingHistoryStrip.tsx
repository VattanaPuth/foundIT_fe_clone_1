"use client";

import React from "react";

function handleKeyboardActivate(e: React.KeyboardEvent, onActivate: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

type HistoryItem = {
  id: string;
  title: string;
  imgSrc: string; // from /public
};

export default function BrowsingHistoryStrip() {
  // ✅ WHERE TO PUT IMAGES:
  // Put your files in: /public/images/
  // Then use src like: "/images/1.png"
  const items: HistoryItem[] = [
    { id: "h1", title: "I will do high end corporate video for your business", imgSrc: "/images/1.png" },
    { id: "h2", title: "I will create professional video", imgSrc: "/images/2.png" },
    { id: "h3", title: "I will edit your YouTube videos with modern effects", imgSrc: "/images/3.png" },
    { id: "h4", title: "I will create stunning motion graphics for your brand", imgSrc: "/images/4.png" },
    { id: "h5", title: "I will produce cinematic wedding videos", imgSrc: "/images/5.png" },
    { id: "h6", title: "I will animate your logo with professional effects", imgSrc: "/images/6.png" },
    { id: "h7", title: "I will design brand identity kit for your business", imgSrc: "/images/1.png" },
    { id: "h8", title: "I will create clean UI kit for your product", imgSrc: "/images/1.png" },
  ];

  return (
    <section className="mx-auto w-full px-4 pb-10 mt-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-gray-900">Your Browsing History</div>

        {/* static */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => {}}
          onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
          className="text-md text-gray-500 hover:text-gray-700 cursor-pointer select-none"
          aria-label="Clear all browsing history"
        >
          Clear All
        </div>
      </div>

      <div className="mt-4">
        <div
          className={[
            "flex gap-4 overflow-x-auto pb-2",
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          ].join(" ")}
        >
          {items.map((it) => (
            <div
              key={it.id}
              className="w-[200px] sm:w-[240px] flex-shrink-0"
            >
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                {/* image */}
                <div className="h-[125px] sm:h-[150px] bg-gray-100">
                  {/* If image path is wrong, you’ll just see gray bg */}
                  <img
                    src={it.imgSrc}
                    alt={it.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* title */}
                <div className="p-2.5 text-xs text-gray-700 leading-snug line-clamp-2">
                  {it.title}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div/>
      </div>
    </section>
  );
}
