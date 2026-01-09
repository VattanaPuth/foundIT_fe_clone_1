"use client";

import React from "react";

export default function PillTag({ text }: { text: string }) {
  return (
    <div className="rounded-full border bg-white px-2 py-1 text-xs text-gray-700">
      {text}
    </div>
  );
}
