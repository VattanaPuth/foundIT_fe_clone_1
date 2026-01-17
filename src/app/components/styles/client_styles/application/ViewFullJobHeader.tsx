"use client";

import React from "react";
import Image from "next/image";
import {
  IconHeart,
  IconShare,
} from "@/app/components/styles/client_styles/application/icons";
import { handleKeyboardActivate } from "@/app/components/styles/client_styles/application/utils";

export default function ViewFullJobHeader({
  title,
  badge,
  postedByName,
  postedByImageSrc,
  liked,
  onToggleLike,
  onBack,
}: {
  title: string;
  badge: string;
  postedByName: string;
  postedByImageSrc: string;
  liked: boolean;
  onToggleLike: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        {/* Back (Figma style: no border box, subtle hover) */}
        <div
          role="button"
          tabIndex={0}
          onClick={onBack}
          onKeyDown={(e) => handleKeyboardActivate(e, onBack)}
          className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-700 cursor-pointer select-none hover:bg-gray-100"
          aria-label="Back"
          title="Back"
        >
          <IconArrowLeft />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2 ">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            <span className="rounded-full border border-gray-200 bg-white px-2.5 p-0.5 text-[11px] text-gray-700 ">
              {badge}
            </span>
          </div>

          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
            <span>Posted by</span>

            {/* Posted-by image (you will replace src) */}
            <Image
              src={postedByImageSrc}
              alt={`${postedByName} avatar`}
              className="h-5 w-5 rounded-full object-cover border border-gray-200"
              width={20}
              height={20}
            />

            <span className="text-gray-700">{postedByName}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Video Call */}
        <div
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600 select-none hover:bg-gray-100 cursor-pointer"
          aria-label="Video Call"
          title="Video Call"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Call */}
        <div
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600 select-none hover:bg-gray-100 cursor-pointer"
          aria-label="Call"
          title="Call"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </div>

        {/* Heart: clickable, toggles filled red */}
        <div
          role="button"
          tabIndex={0}
          onClick={onToggleLike}
          onKeyDown={(e) => handleKeyboardActivate(e, onToggleLike)}
          className={[
            "inline-flex h-9 w-9 items-center justify-center rounded-full cursor-pointer select-none hover:bg-gray-100",
            liked
              ? "text-red-600 [&_path]:fill-red-600 [&_path]:stroke-red-600"
              : "text-gray-600 [&_path]:fill-transparent [&_path]:stroke-current",
          ].join(" ")}
          aria-label={liked ? "Unsave job" : "Save job"}
          title={liked ? "Saved" : "Save"}
        >
          <IconHeart />
        </div>

        {/* Share: static */}
        <div
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600 select-none hover:bg-gray-100"
          aria-label="Share job"
          title="Share"
        >
          <IconShare />
        </div>
      </div>
    </div>
  );
}

function IconArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M14.5 5.5L8 12l6.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
