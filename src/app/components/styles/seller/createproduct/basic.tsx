"use client";

import React, { useMemo, useState } from "react";
import { Card, Dropdown, Input, Textarea, handleKeyboardActivate } from "@/app/components/styles/seller/createproduct/ui";

export default function Basic({
  tags,
  tagText,
  onChangeTagText,
  onAddTag,
  onRemoveTag,
}: {
  tags: string[];
  tagText: string;
  onChangeTagText: (v: string) => void;
  onAddTag: () => void;
  onRemoveTag: (idx: number) => void;
}) {
  const [category, setCategory] = useState("");

  const categoryOptions = useMemo(
    () => [
      "Design assets",
      "Web and application templates",
      "Code and developer tools",
      "Motion and video assets",
      "Audio and sound",
      "Photo and image tools",
      "Fonts and type",
      "Three-dimensional assets",
      "Data and knowledge packs",
      "Productivity templates",
      "Artificial intelligence helpers",
    ],
    []
  );

  const canAdd = tags.length < 10 && tagText.trim().length > 0;

  return (
    <Card
      title="Basic Information"
      subtitle="Essential details about your product"
      icon={
        // SVG icon (static)
        <svg
          className="h-4.5 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          
        >
          <path d="M12 2l4 4-4 4-4-4z" />
          <path d="M2 12l4-4 4 4-4 4z" />
          <path d="M12 14l4-4 4 4-4 4z" />
          <path d="M12 14l-4 4 4 4 4-4z" />
        </svg>
      }
    >
      <div className="space-y-4">
        <div>
          <div className="text-md text-gray-600">Product Title *</div>
          <div className="mt-2">
            <Input placeholder="e.g., Modern Dashboard UI Kit for Figma" />
          </div>
          <div className="mt-2 text-sm text-gray-400">
            Clear, descriptive title (60 chars recommended)
          </div>
        </div>

        <div>
          <div className="text-md text-gray-600">Description *</div>
          <div className="mt-2">
            <Textarea
              rows={6}
              placeholder="Describe what your product does, who it's for, and what problems it solves..."
            />
          </div>
          <div className="mt-2 text-sm text-gray-400">
            Be detailed - this appears on the product page
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-md text-gray-600">Category *</div>
            <div className="mt-2">
              <Dropdown
                value={category}
                placeholder="Select category"
                options={categoryOptions}
                onChange={setCategory}
              />
            </div>
          </div>

          <div>
            <div className="text-md text-gray-600">Compatible With</div>
            <div className="mt-2">
              <Input placeholder="e.g., Figma 124+, Sketch 99+, React 18+" />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <div className="text-sm text-gray-600">Tags (up to 10)</div>

          {tags.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((t, idx) => (
                <div
                  key={t + idx}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700"
                >
                  <span>{t}</span>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => onRemoveTag(idx)}
                    onKeyDown={(e) => handleKeyboardActivate(e, () => onRemoveTag(idx))}
                    className="h-4 w-4 rounded-full grid place-items-center cursor-pointer select-none hover:bg-gray-100 text-gray-500 mb-1.5"
                    aria-label="Remove tag"
                  >
                    ×
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1">
              <input
                value={tagText}
                onChange={(e) => onChangeTagText(e.target.value)}
                placeholder="Add a tag (e.g., dashboard, admin, saas)"
                className="w-full h-11 px-4 rounded-lg bg-gray-50 border border-gray-200 text-sm
                           outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                           hover:border-gray-300 transition"
              />
            </div>

            {/* Add tag (hidden after 10) */}
            {tags.length < 10 ? (
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (!canAdd) return;
                  onAddTag();
                }}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () => {
                    if (!canAdd) return;
                    onAddTag();
                  })
                }
                className={
                  "h-11 w-11 rounded-lg border border-gray-200 bg-white grid place-items-center select-none transition " +
                  (canAdd
                    ? "cursor-pointer hover:bg-gray-50 hover:border-gray-300"
                    : "cursor-not-allowed opacity-40")
                }
                aria-label="Add tag"
              >
                +
              </div>
            ) : null}
          </div>

          <div className="mt-2 text-sm text-gray-400">
            Press Enter or click + to add. Tags help buyers discover your product.
          </div>
        </div>
      </div>
    </Card>
  );
}
