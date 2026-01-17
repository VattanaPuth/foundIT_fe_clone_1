"use client";

import { IconStar } from "@/app/components/styles/admin_styles/Icon";
import Image from "next/image";

export type ProjectItem = {
  id: string;
  title: string;
  subtitle: string;
  seller: string;
  priceFrom: string;
  rating: string;
  reviews: string;
  badges: string[];
  updated: string;
  coverTone: "orange" | "dark" | "brown" | "light";
  imageSrc: string;
};

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void,
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function HeartFilledRed() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className="text-red-500"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function Badge({ text }: { text: string }) {
  const lower = text.toLowerCase();
  const style =
    lower === "featured"
      ? "bg-purple-100 text-purple-700"
      : lower === "trending"
        ? "bg-red-100 text-red-700"
        : lower === "bestseller"
          ? "bg-orange-100 text-orange-700"
          : lower === "new"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-gray-100 text-gray-700";

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${style}`}>{text}</span>
  );
}

function AvatarDot({ name }: { name: string }) {
  return (
    <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 text-gray-700 flex items-center justify-center">
      <Image src="/images/sellerpf.png" alt={name} width={24} height={24} />
    </div>
  );
}

export default function ProjectCard({
  item,
  onOpen,
}: {
  item: ProjectItem;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="relative h-58 bg-gray-100">
        <Image
          src={item.imageSrc}
          alt={item.title}
          className="h-full w-full object-cover"
          width={400}
          height={232}
        />
        <div className="absolute top-2 left-2 flex gap-2">
          {(item.badges ?? []).map((b) => (
            <Badge key={b} text={b} />
          ))}
        </div>

        <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center select-none">
          <HeartFilledRed />
        </div>

        <div className="absolute bottom-2 right-2 text-xs px-2 py-1 rounded bg-black/60 text-white">
          {item.updated}
        </div>

        <div
          role="button"
          tabIndex={0}
          aria-label="Open item"
          onClick={() => onOpen(item.id)}
          onKeyDown={(e) => handleKeyboardActivate(e, () => onOpen(item.id))}
          className="absolute inset-0 cursor-pointer"
        />
      </div>

      <div className="p-4">
        <div
          role="button"
          tabIndex={0}
          onClick={() => onOpen(item.id)}
          onKeyDown={(e) => handleKeyboardActivate(e, () => onOpen(item.id))}
          className="text-sm font-semibold text-gray-900 hover:text-gray-700 cursor-pointer select-none"
        >
          {item.title}
        </div>

        <div className="text-xs text-gray-500 mt-1">{item.subtitle}</div>

        <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
          <span className="text-yellow-500">
            <IconStar />
          </span>
          <span className="font-medium text-gray-800">{item.rating}</span>
          <span className="text-gray-400">({item.reviews})</span>
        </div>

        {/* ✅ small seller avatar in front of seller name */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
          <AvatarDot name={item.seller} />
          <span className="text-gray-800">{item.seller}</span>
        </div>

        <div className="mt-4 text-sm text-gray-700">
          from{" "}
          <span className="font-semibold text-gray-900">{item.priceFrom}</span>
        </div>
      </div>
    </div>
  );
}
