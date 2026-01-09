"use client";

import React, { useState } from "react";

import Top from "@/app/components/styles/seller/createproduct/top";
import Basic from "@/app/components/styles/seller/createproduct/basic";
import Media from "@/app/components/styles/seller/createproduct/media";
import Files from "@/app/components/styles/seller/createproduct/files";
import Pricing from "@/app/components/styles/seller/createproduct/pricing";
import Setting from "@/app/components/styles/seller/createproduct/setting";
import Seo from "@/app/components/styles/seller/createproduct/seo";

export default function Page() {
  // tags are the only “real” logic you asked for
  const [tags, setTags] = useState<string[]>(["dashboard", "ui kit"]);
  const [tagText, setTagText] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* header/footer intentionally NOT included */}

      <main className="mx-auto w-full max-w-6xl px-4 md:px-6 py-6">
        <Top />

        <div className="mt-6 space-y-5 ">
          <Basic
            tags={tags}
            tagText={tagText}
            onChangeTagText={setTagText}
            onAddTag={() => {
              const clean = tagText.trim();
              if (!clean) return;
              if (tags.length >= 10) return;

              // prevent duplicates (simple)
              if (tags.some((t) => t.toLowerCase() === clean.toLowerCase())) {
                setTagText("");
                return;
              }

              setTags((prev) => [...prev, clean]);
              setTagText("");
            }}
            onRemoveTag={(idx) => setTags((prev) => prev.filter((_, i) => i !== idx))}
          />

          <Media />
          <Files />
          <Pricing />
          <Setting />
          <Seo />

          <div className="flex items-center justify-between pt-2">
            <div
              role="button"
              tabIndex={0}
              onClick={() => {}}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                }
              }}
              className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-700
                         cursor-pointer select-none hover:bg-gray-50 hover:border-gray-300 transition flex items-center"
              aria-label="Cancel"
            >
              Cancel
            </div>

            <div className="flex items-center gap-3">
              <div
                role="button"
                tabIndex={0}
                onClick={() => {}}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                  }
                }}
                className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm text-gray-700
                           cursor-pointer select-none hover:bg-gray-50 hover:border-gray-300 transition flex items-center"
                aria-label="Save Draft"
              >
                Save Draft
              </div>

              <div
                role="button"
                tabIndex={0}
                onClick={() => {}}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                  }
                }}
                className="h-10 px-4 rounded-lg bg-orange-500 text-white text-sm font-medium
                           cursor-pointer select-none hover:bg-orange-600 transition flex items-center"
                aria-label="Publish Product"
              >
                Publish Product
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
