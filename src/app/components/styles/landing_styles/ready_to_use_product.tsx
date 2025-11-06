"use client";
import React, { useMemo, useState } from "react";

type Category = "All" | "UI Kits" | "Code" | "Illustrations" | "3D" | "Templates" | "Tools";

interface Product {
  id: string;
  title: string;
  author: string;
  price: number; // USD
  image: string; // external URL
  category: Exclude<Category, "All">;
  instant?: boolean;
}

const CATEGORIES: Category[] = ["All", "UI Kits", "Code", "Illustrations", "3D", "Templates", "Tools"];

const PRODUCTS: Product[] = [
  {
    id: "figma-saas",
    title: "Figma SaaS Dashboard Kit",
    author: "FrameForge",
    price: 49,
    category: "UI Kits",
    instant: true,
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "mobile-ui",
    title: "Mobile UI Kit (200 screens)",
    author: "PixelPilot",
    price: 79,
    category: "UI Kits",
    instant: true,
   image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "nextjs-starter",
    title: "Next.js SaaS Starter",
    author: "ShipFast Labs",
    price: 129,
    category: "Code",
    instant: true,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "react-lib",
    title: "React Components Library",
    author: "UIBits",
    price: 59,
    category: "Code",
    instant: true,
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "notion-kit",
    title: "Blog SEO Notion Kit",
    author: "WordSmith",
    price: 15,
    category: "Templates",
    instant: true,
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "illustration-pack",
    title: "Illustration Pack: Startup Scenes",
    author: "DoodleFox",
    price: 39,
    category: "Illustrations",
    instant: true,
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3d-icons",
    title: "3D Icons (Blender/GLB)",
    author: "PolyPack",
    price: 29,
    category: "3D",
    instant: true,
    image: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "email-templates",
    title: "Email Templates (Marketing)",
    author: "MailMint",
    price: 24,
    category: "Templates",
    instant: true,
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "pitchdeck",
    title: "Pitch Deck Template (Figma/Keynote)",
    author: "SlideSmith",
    price: 19,
    category: "Templates",
    instant: true,
    image: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "ae-toolkit",
    title: "After Effects Explainer Toolkit",
    author: "MotionBuddy",
    price: 44,
    category: "Tools",
    instant: true,
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
  },
];

const BadgeInstant: React.FC = () => (
  <div className="pointer-events-none absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-white/85 px-2 py-1 text-[10px] font-medium text-gray-800 shadow ring-1 ring-black/5">
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
      <path d="M10 1.7 7.5 8.1h4.4L7.7 18.3l.4-6.4H4L10 1.7z" fill="currentColor" />
    </svg>
    Instant
  </div>
);

const ProductCard: React.FC<{ p: Product } & { onClick?: () => void }> = ({ p }) => {
  return (
    <a href={`#/product/${p.id}`} className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 !no-underline !text-black">
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {p.instant && <BadgeInstant />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt={p.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
      <div className="p-3 sm:p-3.5">
        <p className="line-clamp-1 text-lg font-semibold text-gray-900">{p.title}</p>
        <p className="text-sm text-gray-500">{p.author}</p>
        <p className="text-sm font-semibold text-gray-900">${p.price}</p>
      </div>
    </a>
  );
};

export default function ReadyToUseProducts() {
  const [active, setActive] = useState<Category>("All");

  const filtered = useMemo(() => {
    if (active === "All") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === active);
  }, [active]);

  return (
    <section className="mx-auto mt-28 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between pl-6 pr-6 overflow-x-hidden">
        <div>
          <h2 className="text-[15px] font-medium text-gray-700">Ready-to-use products</h2>
          <p className="text-sm text-gray-500">Instant download. Start using in minutes.</p>
        </div>
        <a href="#/marketplace" className="text-lg font-medium !text-gray-600 hover:text-gray-900 !no-underline">
          Browse marketplace →
        </a>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2 pl-6 pr-6">
        {CATEGORIES.map((c) => {
          const isActive = active === c;
          return (
            <p
              key={c}
              onClick={() => setActive(c)}
              className={[
                "rounded-[10px] border-2 px-3.5 py-1.5 text-sm transition",
                isActive
                  ? "border-gray-900 bg-gray-900 text-white shadow"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50",
              ].join(" ")}
            >
              {c}
            </p>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pr-6 pl-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
