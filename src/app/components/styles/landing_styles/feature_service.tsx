import React from "react";

export type Service = {
  id: string;
  title: string;
  seller: string;
  badge?: string;
  rating: number; 
  reviews: number;
  price: number; 
  image?: string;
};

const SERVICES: Service[] = [
  {
    id: "logo",
    title: "Logo & Identity Pack",
    seller: "BrandFoundry",
    rating: 4.9,
    reviews: 342,
    price: 150,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "uiux",
    title: "UI/UX for Web App (3 screens)",
    seller: "FlowStudio",
    rating: 4.8,
    reviews: 228,
    price: 220,
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "react-next",
    title: "React + Next.js Landing",
    seller: "CodeMaven",
    badge: "Top Rated",
    rating: 4.9,
    reviews: 412,
    price: 250,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "shopify",
    title: "Shopify Store Setup",
    seller: "CartCraft",
    rating: 4.7,
    reviews: 189,
    price: 180,
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "dataviz",
    title: "Data Dashboard in Looker",
    seller: "DataForge",
    rating: 4.8,
    reviews: 156,
    price: 260,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "pitchdeck",
    title: "Pitch Deck Design (10 slides)",
    seller: "SlideSmith",
    rating: 4.8,
    reviews: 267,
    price: 140,
    image:
      "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "mascot",
    title: "Illustrated Mascot",
    seller: "DoodleFox",
    badge: "Top Rated",
    rating: 4.9,
    reviews: 394,
    price: 13,
    image:
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "icons",
    title: "App Icon Set (iOS/Android)",
    seller: "IconNest",
    rating: 4.8,
    reviews: 521,
    price: 90,
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
  }
];

const Star: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4" {...props}>
    <path
      d="M10 1.8l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9 5.06 17l.94-5.5-4-3.9 5.53-.8L10 1.8z"
      fill="currentColor"
    />
  </svg>
);

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="ml-2 inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
    {children}
  </span>
);

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  return (
    <a href={`#/gig/${service.id}`} className="group block w-[96%] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 !no-underline !text-gray-600">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            {service.image ? (
                <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                />
                ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <svg viewBox="0 0 24 24" className="h-10 w-10"><path fill="currentColor" d="M21 19V5a2 2 0 0 0-2-2H5C3.9 3 3 3.9 3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2m-2 0H5V5h14zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5.5z"/></svg>
                </div>
            )}
        </div>

        <div className="space-y-2 p-3 sm:p-4">
            <p className="line-clamp-1 text-lg font-semibold text-gray-900">
                {service.title}
            </p>

            <div className="flex items-center text-sm text-gray-500">
                <span className="truncate">{service.seller}</span>
                {service.badge && <Badge>{service.badge}</Badge>}
            </div>

            <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center text-amber-500">
                    <Star />
                    <span className="ml-1 font-medium text-gray-900">
                        {service.rating.toFixed(1)}
                    </span>
                </div>
                <span className="text-gray-500">({service.reviews})</span>
            </div>
            
            <div className="pt-1 text-sm text-gray-600">
                Starting at <span className="font-semibold text-gray-900">${service.price}</span>
            </div>
        </div>
    </a>
  );
};

export default function FeaturedServices() {
  return (
    <section className="mx-auto mt-20 px-3 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-center justify-between pl-6 pr-12">
            <p className="text-3xl font-medium text-[#0A0A0A]">Featured services</p>
            <a href="#/gigs" className="text-lg font-medium !text-gray-600 hover:text-gray-900 !no-underline">
                Browse all gigs →
            </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pl-6 pr-6">
            {SERVICES.map((s) => (
                <ServiceCard key={s.id} service={s}/>
            ))}
        </div>
    </section>
  );
}
