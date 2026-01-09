"use client";

import React from "react";

export default function ChevronIcon({ open }: { open: boolean }) {
  // Replace with SVG later if you want
  return <span className="ml-2 text-gray-500">{open ? "▴" : "▾"}</span>;
}
