"use client";

import React from "react";
import { Card, Input } from "@/app/components/styles/seller/createproduct/ui";

export default function Media() {
  return (
    <Card
      title="Media & Previews"
      subtitle="Showcase your product with images and demos"
      icon={
        <svg
          className="h-4.5 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      }
    >
      <div className="space-y-5">
        <div>
          <div className="text-md text-gray-600">Cover Image * (16:9 ratio recommended)</div>
          <div className="mt-2 rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex flex-col items-center text-center gap-2 text-gray-700">
              <div className="h-10 w-10 rounded-xl bg-gray-50 border border-gray-200 grid place-items-center text-gray-600">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11" />
                  <path d="M3 16l5-5 4 4 3-3" />
                  <path d="M19 22v-6" />
                  <path d="M16 19h6" />
                </svg>
              </div>
              <div className="text-md font-medium text-orange-600">Click to upload</div>
              <div className="text-xs text-gray-500">or drag and drop</div>
              <div className="text-xs text-gray-400">
                PNG, JPG up to 10MB (1920×1080px recommended)
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-md text-gray-600">Gallery Images (3-8 images recommended)</div>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-xl border border-gray-200 bg-white grid place-items-center text-gray-400"
              >
                +
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-md text-gray-600">Live Preview URL</div>
            <div className="mt-2">
              <Input placeholder="https://preview.yoursite.com/demo" />
            </div>
          </div>
          <div>
            <div className="text-md text-gray-600">Demo Video URL</div>
            <div className="mt-2">
              <Input placeholder="https://youtube.com/watch?v=..." />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
