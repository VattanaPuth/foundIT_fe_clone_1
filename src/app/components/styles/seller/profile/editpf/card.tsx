"use client";

import React from "react";

export default function SectionCard({
  id,
  title,
  subtitle,
  icon,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="bg-white border border-gray-200 rounded-xl shadow-sm scroll-mt-[120px]"

    >
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {/* icon holder */}
          {icon ? (
            <div className="w-5 h-5 flex items-center justify-center text-gray-600">
              {icon}
            </div>
          ) : null}

          <div className="text-sm font-semibold text-gray-900">{title}</div>
        </div>

        {subtitle ? (
          <div className="mt-1 text-xs text-gray-500">{subtitle}</div>
        ) : null}
      </div>

      <div className="p-5">{children}</div>
    </section>
  );
}
