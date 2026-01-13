"use client";

import { useState } from "react";

export default function JobsSection({ gigData }) {
  // Placeholder: In a real app, fetch jobs for this freelancer using gigData.id
  // For now, just show a message or static content
  return (
    <>
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <div className="border rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-2">
            Jobs by {gigData?.freelancerName || "Freelancer"}
          </h3>
          <p className="text-gray-600">
            {/* Replace with dynamic job list if available */}
            No job history available for this freelancer yet.
          </p>
        </div>
      </div>
    </>
  );
}
