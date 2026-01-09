"use client";

import React from "react";
import { handleKeyboardActivate } from "@/app/components/styles/client_styles/dashboard/utils";
import type { JobItem } from "@/app/components/styles/client_styles/dashboard/moskData";
import JobCard from "@/app/components/styles/client_styles/dashboard/JobCard";

function Chevron({ open }: { open: boolean }) {
  return <span className="text-gray-500">{open ? "▾" : "▸"}</span>;
}

export default function DashboardSection({
  title,
  count,
  open,
  onToggle,
  jobs,
  showAction,
}: {
  title: string;
  count: number;
  open: boolean;
  onToggle: () => void;
  jobs: JobItem[];
  showAction?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div
          role="button"
          tabIndex={0}
          onClick={onToggle}
          onKeyDown={(e) => handleKeyboardActivate(e, onToggle)}
          className="flex items-center gap-2 cursor-pointer select-none text-md font-medium text-gray-900"
          aria-label={`Toggle ${title}`}
        >
          <Chevron open={open} />
          <span>{title}</span>
          <div className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            {count}
          </div>
        </div>
        <div className="h-px flex-1 bg-gray-200 ml-4" />
      </div>

      {open ? (
        <div className="mt-3 space-y-3">
          {jobs.map((j) => (
            <JobCard key={j.id} job={j} showAction={showAction} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
