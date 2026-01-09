"use client";

import React, { useState } from "react";
import { Card, Input } from "@/app/components/styles/seller/createproduct/ui";

function Toggle({ on }: { on: boolean }) {
  return (
    <div className={"h-6 w-10 rounded-full relative " + (on ? "bg-orange-500" : "bg-gray-200")}>
      <div
        className={
          "h-5 w-5 rounded-full bg-white absolute top-0.5 border border-gray-200 transition " +
          (on ? "left-5" : "left-1")
        }
      />
    </div>
  );
}

export default function Setting() {
  const [virus, setVirus] = useState(true);

  return (
    <Card
      title="Product Settings"
      subtitle="Configure support, updates, and policies"
      icon={
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
          <path d="M12 11v4" />
          <path d="M12 8h.01" />
        </svg>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-md text-gray-600">Support Window (days)</div>
            <div className="mt-2">
              <Input placeholder="30" />
            </div>
          </div>
          <div>
            <div className="text-md text-gray-600">Response SLA (hours)</div>
            <div className="mt-2">
              <Input placeholder="24" />
            </div>
          </div>
          <div>
            <div className="text-md text-gray-600">Refund Window (days)</div>
            <div className="mt-2">
              <Input placeholder="14" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <div className="text-sm font-semibold">Lifetime Updates</div>
          <div className="mt-1 text-md text-gray-500">
            Buyers receive all future updates for free
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-4 flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">Virus Scanning</div>
            <div className="mt-1 text-md text-gray-500">
              Automatically scan all files for malware
            </div>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => setVirus((v) => !v)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setVirus((v) => !v);
              }
            }}
            className="cursor-pointer select-none"
            aria-label="Toggle virus scanning"
          >
            <Toggle on={virus} />
          </div>
        </div>
      </div>
    </Card>
  );
}
