"use client";

export default function BrowsingHistoryCard({ title }: { title: string }) {
  return (
    <div className="w-52 flex-shrink-0 bg-white border rounded-lg overflow-hidden shadow-sm">
      {/* bigger thumbnail */}
      <div className="h-24 bg-gray-100" />
      <div className="p-3 text-xs text-gray-700 line-clamp-2">{title}</div>
    </div>
  );
}
