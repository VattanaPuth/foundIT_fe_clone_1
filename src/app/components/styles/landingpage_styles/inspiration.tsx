// src/app/components/Inspiration.tsx
'use client';
import React from "react";


/* -------------------------------------------------
   DATA – static, can stay on the server
   ------------------------------------------------- */
type CaseStudy = {
  id: string;
  category?: string;
  title?: string;
  metric?: string;
  image: string;
  large?: boolean;
  decorative?: boolean;
};

const ITEMS: CaseStudy[] = [
  {
    id: "1",
    category: "Branding",
    title: "Fintech Brand Redesign",
    metric: "conversion +24%",
    image:
      "https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1600&auto=format&fit=crop",
    large: true,
  },
  {
    id: "2",
    category: "UI/UX",
    title: "SaaS Dashboard UX Overhaul",
    metric: "churn -18%",
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "3",
    category: "Development",
    title: "E-commerce Speed Upgrade",
    metric: "LCP 5.2s to 2.1s",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1512804079794-5defc9d3a4d0?q=80&w=1600&auto=format&fit=crop",
    decorative: true,
  },
  {
    id: "5",
    category: "Localization",
    title: "Globalization Rollout (EN to KH/TH/VN)",
    metric: "3 markets in 6 weeks",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "6",
    category: "Video",
    title: "Explainer Video for Health App",
    metric: "1.2M views",
    image:
    "https://images.unsplash.com/photo-1516383607781-913a19294fd1?q=80&w=1600&auto=format&fit=crop",
    large:true
  },
  {
    id: "7",
    category: "Data Engineering",
    title: "Data Ops Migration to BigQuery",
    metric: "costs -28%",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "8",
    category: "Data Engineering",
    title: "Data Ops Migration to BigQuery",
    metric: "costs -28%",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
  },
];

/* -------------------------------------------------
   CLIENT CARD – contains onClick & hover effects
   ------------------------------------------------- */

const CaseStudyCard: React.FC<{ item: CaseStudy }> = ({ item }) => {
  const { category, title, metric, image, decorative, large } = item;

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-2xl",
        "outline outline-1 outline-white/10 bg-[#12141a]",
        large
          ? "sm:col-span-4 md:col-span-4 lg:col-span-8"
          : "sm:col-span-4 md:col-span-4 lg:col-span-4",

        decorative ? "sm:col-span-2 md:col-span-2 lg:col-span-2" : "",
        "min-h-[240px] focus-within:ring-4 focus-within:ring-indigo-400/40",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(.2,.6,.2,1)] group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />

      {/* gradients */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/70 to-transparent" />

      {/* text overlay */}
      <div className="absolute inset-x-4 bottom-3 z-[1] flex flex-col gap-1.5">
        {category && (
          <span className="w-max rounded-md border border-white/20 bg-white/10 px-2 py-1 text-[11px] uppercase tracking-[.04em] text-slate-200/90 backdrop-blur">
            {category}
          </span>
        )}
        {title && (
          <h3 className="m-0 text-lg leading-tight text-white">{title}</h3>
        )}
        {!decorative && metric && (
          <p className="m-0 text-sm text-slate-300/80">{metric}</p>
        )}
      </div>

      {/* clickable area */}
      <button
        className="absolute inset-0 cursor-pointer outline-none"
        aria-label={`Open ${title || "image"}`}
        onClick={() => console.log("Open:", title || "image")}
      />
    </article>
  );
};

/* -------------------------------------------------
   SERVER COMPONENT – just renders the list
   ------------------------------------------------- */
export default function Inspiration() {
  return (
    <div className="min-h-screen text-slate-700 mt-16">
      <div className="mx-auto w-full px-5 pt-9 pl-6 pr-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="m-0 text-3xl text-[#0A0A0A] font-semibold">
            Inspiration &amp; case studies
          </p>
          <a
            href="#"
            className="rounded-full px-3 py-2 font-medium text-lg transition-colors hover:bg-white/10 hover:text-slate-100 !text-emerald-600 !no-underline"
          >
            View all to →
          </a>
        </div>

        <section
          aria-label="case study cards"
          className="grid gap-4 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12"
        >
          {ITEMS.map((it) => (
            <CaseStudyCard key={it.id} item={it} />
          ))}
        </section>
      </div>
    </div>
  );
}