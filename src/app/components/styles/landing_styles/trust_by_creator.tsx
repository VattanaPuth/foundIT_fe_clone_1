// Filename: Testimonials.tsx
import React from "react";
import { Quote } from "lucide-react";

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
}

export interface TestimonialsProps {
  title?: string;
  ctaText?: string;
  ctaHref?: string;
  items?: TestimonialItem[];
}

const DEFAULT_ITEMS: TestimonialItem[] = [
  {
    quote:
      "I landed my first $15k project within 2 weeks of joining. The quality of clients here is unmatched—they actually read proposals and value good work. The escrow system",
    author: "Marcus Chen",
    role: "Full‑Stack Developer",
    company: "Independent • San Francisco, CA",
    initials: "MC",
  },
  {
    quote:
      "My UI kit has generated over $47,000 in passive income in just 8 months. The buyer base is incredible—designers, agencies,",
    author: "Sofia Rodriguez",
    role: "Product Designer",
    company: "SoloStudio • Barcelona, Spain",
    initials: "SR",
  },
  {
    quote:
      "As a client, I have hired 12 different freelancers here and every experience has been smooth. The review system is transparent, communication tools work flawlessly, and dispute resolution saved me once when scope changed.",
    author: "David Park",
    role: "Startup Founder",
    company: "TechFlow Inc. • Austin, TX",
    initials: "DP",
  },
  {
    quote:
      "As a client, I have hired 12 different freelancers here and every experience has been smooth. The review system is transparent, communication tools work flawlessly, and dispute resolution saved me once when scope changed.",
    author: "David Park",
    role: "Startup Founder",
    company: "TechFlow Inc. • Austin, TX",
    initials: "DP",
  },
];

export default function TrustByCreator({
  title = "Trusted by creators worldwide",
  ctaText = "Read more stories →",
  ctaHref = "#",
  items = DEFAULT_ITEMS,
}: TestimonialsProps) {
  return (
    <section className="w-full mt-24 pl-12 pr-12">
      {/* Header row */}
      <div className="mx-auto flex items-end justify-between px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">{title}</h2>
        <a
          href={ctaHref}
          className="hidden text-sm font-medium text-gray-600 hover:text-gray-900 sm:inline"
        >
          {ctaText}
        </a>
      </div>

      {/* Cards grid */}
      <div className="mx-auto mt-6 grid grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:px-8">
        {items.map((t, i) => (
          <figure
            key={`${t.author}-${i}`}
            className="relative flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <blockquote className="text-gray-700">
              <Quote aria-hidden className="mb-4 h-6 w-6" />
              <p className="leading-relaxed">{t.quote}</p>
            </blockquote>

            <figcaption className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-sm font-semibold text-gray-700">
                {t.initials}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-gray-900">{t.author}</div>
                <div className="truncate text-xs text-gray-500">{t.role}</div>
                <div className="truncate text-xs text-gray-400">{t.company}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8 sm:hidden">
        <a href={ctaHref} className="text-sm font-medium text-gray-600 hover:text-gray-900">
          {ctaText}
        </a>
      </div>
    </section>
  );
}
