"use client";

import React from "react";

export function Spinner() {
  return (
    <div
      className="h-4 w-4 rounded-full border-2 border-white/60 border-t-white animate-spin"
      aria-hidden="true"
    />
  );
}

export function ProductThumb({
  tone,
}: {
  tone: "dark" | "gray" | "green" | "purple";
}) {
  const bg =
    tone === "dark"
      ? "bg-slate-900"
      : tone === "green"
      ? "bg-emerald-900"
      : tone === "purple"
      ? "bg-purple-500"
      : "bg-gray-300";
  return <div className={`h-14 w-14 rounded-xl ${bg}`} aria-hidden="true" />;
}

export function IconDoc() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1983_10947)">
<path d="M9.99935 1.33203H3.99935C3.64573 1.33203 3.30659 1.47251 3.05654 1.72256C2.80649 1.9726 2.66602 2.31174 2.66602 2.66536V13.332C2.66602 13.6857 2.80649 14.0248 3.05654 14.2748C3.30659 14.5249 3.64573 14.6654 3.99935 14.6654H11.9993C12.353 14.6654 12.6921 14.5249 12.9422 14.2748C13.1922 14.0248 13.3327 13.6857 13.3327 13.332V4.66536L9.99935 1.33203Z" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.33398 1.33203V3.9987C9.33398 4.35232 9.47446 4.69146 9.72451 4.94151C9.97456 5.19156 10.3137 5.33203 10.6673 5.33203H13.334" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66732 6H5.33398" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.6673 8.66797H5.33398" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.6673 11.332H5.33398" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1983_10947">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

  );
}

export function IconDownload() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 10V2" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.66602 6.66797L7.99935 10.0013L11.3327 6.66797" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );
}

export function IconLink() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 2H14V6" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66602 9.33333L13.9993 2" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );
}

export function IconSupport() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1983_10943)">
<path d="M14.6673 11.3333C14.6673 11.687 14.5268 12.0261 14.2768 12.2761C14.0267 12.5262 13.6876 12.6667 13.334 12.6667H4.55265C4.19906 12.6667 3.85997 12.8073 3.60998 13.0573L2.14198 14.5253C2.07579 14.5915 1.99145 14.6366 1.89964 14.6548C1.80783 14.6731 1.71267 14.6637 1.62619 14.6279C1.53971 14.5921 1.46579 14.5314 1.41377 14.4536C1.36176 14.3758 1.334 14.2843 1.33398 14.1907V3.33333C1.33398 2.97971 1.47446 2.64057 1.72451 2.39052C1.97456 2.14048 2.3137 2 2.66732 2H13.334C13.6876 2 14.0267 2.14048 14.2768 2.39052C14.5268 2.64057 14.6673 2.97971 14.6673 3.33333V11.3333Z" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1983_10943">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

  );
}

export function IconClose() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 4l8 8M12 4 4 12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
