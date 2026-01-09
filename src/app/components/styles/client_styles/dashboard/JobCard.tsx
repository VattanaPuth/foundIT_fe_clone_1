"use client";

import React from "react";
import type { JobItem } from "@/app/components/styles/client_styles/dashboard/moskData";
import { handleKeyboardActivate } from "@/app/components/styles/client_styles/dashboard/utils";

function Chip({ text }: { text: string }) {
  return (
    <div className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
      {text}
    </div>
  );
}

function Badge({  
  text,
  tone,
}: {
  text: string;
  tone: "green" | "gray";
}) {
  const cls =
    tone === "green"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-gray-100 text-gray-700 border-gray-200";
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${cls}`}
    >
      {text}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border bg-gray-50 px-3 py-2">
      <div className="text-sm font-semibold text-gray-900 leading-5">
        {value}
      </div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

export default function JobCard({
  job,
  showAction,
}: {
  job: JobItem;
  showAction?: boolean;
}) {
  const hasMetrics =
    job.proposals !== undefined || job.views !== undefined || job.lastActivity;

  return (
    <div className="bg-white border rounded-xl shadow-sm p-4">
      {/* ===== Desktop / Tablet layout ===== */}
      <div className="hidden md:flex items-start justify-between gap-4">
        {/* left */}
        <div className="min-w-0">
          <div className="text-sm font-semibold text-gray-900">{job.title}</div>
          {job.subtitle ? (
            <div className="text-sm font-semibold text-gray-900">
              {job.subtitle}
            </div>
          ) : null}

          <div className="mt-1 text-xs text-gray-500">{job.metaLine}</div>

          <div className="mt-3 flex flex-wrap gap-2">
            {job.tags.map((t) => (
              <Chip key={t} text={t} />
            ))}
          </div>

          {job.badge ? (
            <div className="mt-3">
              <Badge text={job.badge.text} tone={job.badge.tone} />
            </div>
          ) : null}
        </div>

        {/* right */}
        <div className="flex items-center gap-6">
          {job.proposals !== undefined ? (
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900">
                {job.proposals}
              </div>
              <div className="text-xs text-gray-500">Proposals</div>
            </div>
          ) : null}

          {job.views !== undefined ? (
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900">
                {job.views}
              </div>
              <div className="text-xs text-gray-500">Views</div>
            </div>
          ) : null}

          {job.lastActivity ? (
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900">
                {job.lastActivity}
              </div>
              <div className="text-xs text-gray-500">Last activity</div>
            </div>
          ) : null}

          {showAction ? (
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                // blank for now
              }}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => {
                  // blank
                })
              }
              className="rounded-md border bg-white px-3 py-2 text-xs text-gray-700 cursor-pointer select-none
                         hover:bg-gray-50 hover:border-gray-300 transition active:scale-[0.99]"
              aria-label="View proposals"
            >
              View proposals
            </div>
          ) : null}
        </div>
      </div>

      {/* ===== Mobile layout ===== */}
      <div className="md:hidden">
        {/* top row: title + badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900">{job.title}</div>
            {job.subtitle ? (
              <div className="text-sm font-semibold text-gray-900">
                {job.subtitle}
              </div>
            ) : null}
          </div>

          {job.badge ? (
            <div className="shrink-0">
              <Badge text={job.badge.text} tone={job.badge.tone} />
            </div>
          ) : null}
        </div>

        <div className="mt-1 text-xs text-gray-500">{job.metaLine}</div>

        {/* tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {job.tags.map((t) => (
            <Chip key={t} text={t} />
          ))}
        </div>

        {/* metrics grid */}
        {hasMetrics ? (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {job.proposals !== undefined ? (
              <Metric label="Proposals" value={job.proposals} />
            ) : null}
            {job.views !== undefined ? (
              <Metric label="Views" value={job.views} />
            ) : null}
            {job.lastActivity ? (
              <Metric label="Last activity" value={job.lastActivity} />
            ) : null}
          </div>
        ) : null}

        {/* action button full width */}
        {showAction ? (
          <div className="mt-4">
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                // blank for now
              }}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => {
                  // blank
                })
              }
              className="w-full rounded-md border bg-white px-4 py-2 text-center text-sm text-gray-700 cursor-pointer select-none
                         hover:bg-gray-50 hover:border-gray-300 transition active:scale-[0.99]"
              aria-label="View proposals"
            >
              View proposals
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
