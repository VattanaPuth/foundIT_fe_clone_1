"use client";

import React, { useState } from "react";
import { Card, Input, Textarea } from "@/app/components/styles/seller/createproduct/ui";

export default function Seo() {
  const [desc, setDesc] = useState("");

  return (
    <Card
      title="SEO & Visibility"
      subtitle="Optimize for search and set publishing status"
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
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      }
    >
      <div className="space-y-4">
        <div>
          <div className="text-md text-gray-600">SEO Title</div>
          <div className="mt-2">
            <Input placeholder="Optimized title for search engines" />
          </div>
          <div className="mt-2 text-sm text-gray-400">Leave blank to use product title</div>
        </div>

        <div>
          <div className="text-md text-gray-600">SEO Description</div>
          <div className="mt-2">
            <Textarea
              rows={4}
              value={desc}
              onChange={setDesc}
              placeholder="Brief description for search results (155 chars recommended)"
            />
          </div>
          <div className="mt-2 text-sm text-gray-400">
            {desc.length}/160 characters
          </div>
        </div>
      </div>
    </Card>
  );
}
