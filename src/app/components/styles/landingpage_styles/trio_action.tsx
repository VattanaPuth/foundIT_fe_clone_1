// Filename: ActionTrio.tsx (TypeScript + React + Tailwind)
import React from "react";
import { Briefcase, Store, Package } from "lucide-react";

interface ActionItem {
  id: string;
  title: string;
  subtitle: string;
  cta: { label: string; href?: string };
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const DEFAULT_ITEMS: ActionItem[] = [
  {
    id: "hire",
    title: "Start hiring",
    subtitle: "Find the perfect talent for your project",
    cta: { label: "Post a Job", href: "#post" },
    Icon: Briefcase,
  },
  {
    id: "sell",
    title: "Start selling",
    subtitle: "Offer your services to clients worldwide",
    cta: { label: "Open a Shop", href: "#shop" },
    Icon: Store,
  },
  {
    id: "project",
    title: "Sell a project",
    subtitle: "Upload ready-made products and earn",
    cta: { label: "Upload Project", href: "#upload" },
    Icon: Package,
  },
];

export default function ActionTrio({
  items = DEFAULT_ITEMS,
  blurb = "Secure payments • Verified reviews • 24/7 support • Transparent fees",
}: {
  items?: ActionItem[];
  blurb?: string;
}): React.ReactElement {
  return (
    <section className="w-full mt-60">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top blurb */}
        <p className="mb-8 mt-4 text-center text-sm text-gray-600">{blurb}</p>

        {/* 3-up actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 mt-10">
          {items.map(({ id, title, subtitle, cta, Icon }) => (
            <div key={id} className="flex flex-col items-center text-center mt-14
                                    sm:flex sm:flex-col sm:items-center sm:text-center sm:mt-14
            ">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Icon className="h-7 w-7" aria-hidden />
              </div>

              <h3 className="text-base font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 max-w-xs text-sm text-slate-500">{subtitle}</p>

              <a href={cta.href ?? "#"} className="mt-6 inline-flex items-center justify-center rounded-md bg-slate-900 px-20 lg:px-32 xl:px-32 py-2 sm:px-24 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/20 !no-underline hover:!no-underline focus:!no-underline">
                {cta.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
