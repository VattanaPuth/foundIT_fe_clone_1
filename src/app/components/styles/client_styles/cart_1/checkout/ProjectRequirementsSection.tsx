"use client";

import React from "react";

export default function ProjectRequirementsSection() {
  return (
    <section className="bg-white border rounded-xl shadow-sm p-5">
      <div className="text-sm font-semibold text-gray-900">
        Project Requirements
      </div>

      <div className="mt-4 space-y-2">
        <div className="text-xs font-medium text-gray-700">
          Describe your project requirements
        </div>

        <textarea
          aria-label="Project requirements"
          placeholder="Please provide details about your logo design needs, preferred colors, style, and any specific requirements..."
          className="w-full min-h-[64px] rounded-md border bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none
                     focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div className="mt-4 space-y-2">
        <div className="text-xs font-medium text-gray-700">
          Preferred Deadline (Optional)
        </div>

        <input
          aria-label="Preferred deadline"
          placeholder=""
          className="w-full rounded-md border bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none
                     focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>
    </section>
  );
}
