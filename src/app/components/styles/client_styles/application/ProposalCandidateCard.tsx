"use client";

import React from "react";
import Image from "next/image";
import { handleKeyboardActivate } from "@/app/components/styles/client_styles/application/utils";

import {
  IconMessage,
  IconStar,
} from "@/app/components/styles/client_styles/application/icons";

export default function ProposalCandidateCard({
  candidate,
  shortlisted,
  onToggleShortlist,
  onAccept,
  onReject,
}: {
  candidate: {
    name: string;
    role: string;
    avatarSrc: string;
    badges: { label: string; tone?: "green" | "neutral" }[];
    statsLeft: string;
    statsRight: string;
    submitted: string;
    lastViewed: string;
  };
  shortlisted: boolean;
  onToggleShortlist: () => void;
  onAccept?: () => void;
  onReject?: () => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-4 sm:p-5">
        {/* Top row: info + actions */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          {/* Left */}
          <div className="flex items-start gap-3 min-w-0">
            <Image
              src={candidate.avatarSrc}
              alt="Candidate avatar"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover border border-gray-200"
            />

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold text-gray-900 leading-none">
                  {candidate.name}
                </h1>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {candidate.badges.map((b) => (
                  <span
                    key={b.label}
                    className={[
                      "rounded-full px-3 py-1 text-xs border",
                      b.tone === "green"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-gray-200 bg-white text-gray-700",
                    ].join(" ")}
                  >
                    {b.label}
                  </span>
                ))}
              </div>

              <p className="mt-2 text-sm text-gray-600">{candidate.role}</p>

              <div className="mt-3 space-y-1 text-sm text-gray-600">
                <div className="inline-flex items-center gap-2">
                  <span className="text-amber-500 inline-flex">
                    <IconStar />
                  </span>
                  <span>{candidate.statsLeft}</span>
                </div>
                <div className="text-gray-600">{candidate.statsRight}</div>
              </div>
            </div>
          </div>

          {/* Right actions: MOBILE = grid stack nicely */}
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end lg:max-w-[360px]">
            {/* Accept - green button */}
            {onAccept && (
              <button
                onClick={onAccept}
                className="h-10 px-4 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium cursor-pointer select-none inline-flex items-center justify-center"
              >
                Accept Proposal
              </button>
            )}

            {/* Decline = red OUTLINE pill (not filled) */}
            {onReject && (
              <button
                onClick={onReject}
                className="h-10 px-4 rounded-full border border-red-200 bg-white text-red-600 hover:bg-red-50 text-sm cursor-pointer select-none inline-flex items-center justify-center"
              >
                Decline
              </button>
            )}

            <ActionPill tone="neutral" label="Message" icon={<IconMessage />} />

            <div
              role="button"
              tabIndex={0}
              onClick={onToggleShortlist}
              onKeyDown={(e) => handleKeyboardActivate(e, onToggleShortlist)}
              className={[
                "h-10 px-4 rounded-full border text-sm cursor-pointer select-none inline-flex items-center justify-center",
                shortlisted
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
              ].join(" ")}
              aria-label="Shortlist"
            >
              {shortlisted ? "Shortlisted" : "Shortlist"}
            </div>
          </div>
        </div>

        {/* Bottom row aligned left/right (fix your submitted/last viewed) */}
        <div className="mt-5 flex items-center justify-between gap-3 text-sm text-gray-500">
          <span>{candidate.submitted}</span>
          <span>{candidate.lastViewed}</span>
        </div>
      </div>
    </div>
  );
}

function ActionPill({
  label,
  tone,
  icon,
}: {
  label: string;
  tone: "neutral" | "danger";
  icon?: React.ReactNode;
}) {
  const cls =
    tone === "danger"
      ? "border-red-200 bg-red-600 text-white "
      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {}}
      onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
      className={[
        "h-10 px-4 rounded-full border text-sm cursor-pointer select-none inline-flex items-center justify-center gap-2",
        cls,
      ].join(" ")}
      aria-label={label}
    >
      {icon ? <span className="inline-flex">{icon}</span> : null}
      {label}
    </div>
  );
}
