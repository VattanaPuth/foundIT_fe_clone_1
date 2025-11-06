// Filename: Footer.tsx (TypeScript + React + Tailwind)
import React from "react";

interface LinkItem { label: string; href: string; }
interface LinkGroup { title: string; links: LinkItem[] }

const GROUPS: LinkGroup[] = [
  {
    title: "Explore",
    links: [
      { label: "Discover", href: "#" },
      { label: "Categories", href: "#" },
      { label: "Top Creators", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Collections", href: "#" },
      { label: "Trending Now", href: "#" },
    ],
  },
  {
    title: "For Clients",
    links: [
      { label: "Post a Job", href: "#" },
      { label: "Hire Designers", href: "#" },
      { label: "Pricing & Fees", href: "#" },
      { label: "How It Works", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Client Success", href: "#" },
    ],
  },
  {
    title: "For Creators",
    links: [
      { label: "Create a Profile", href: "#" },
      { label: "Sell Projects", href: "#" },
      { label: "Create a Service", href: "#" },
      { label: "Guidelines", href: "#" },
      { label: "Payouts & Taxes", href: "#" },
      { label: "Creator Resources", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Partnerships", href: "#" },
      { label: "Brand Assets", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Playbooks", href: "#" },
      { label: "Community Stories", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "API Docs", href: "#" },
    ],
  },
];

function Social({ label }: { label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
    >
      {label}
    </a>
  );
}

type FooterLink = { label: string; href: string; };

const footerLinks: FooterLink[] = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Community Standards", href: "/community-standards" },
  { label: "IP Policy", href: "/ip-policy" },
  { label: "Refund Policy", href: "/refunds" },
];

export default function Footer(): React.ReactElement {
  return (
    <footer className="w-[90%] mt-56 border-t mx-auto border-slate-600 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top brand + newsletter */}
        <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-2">
          <div className="max-w-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-xs font-semibold text-white">M</div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Marketplace</div>
                <p className="text-sm text-gray-500">Where talent and projects meet.</p>
              </div>
            </div>
          </div>

          <div className="max-w-xl md:justify-self-end">
            <div className="text-sm font-medium text-gray-900">Get the monthly roundup</div>
              <form className="mt-2 flex items-center gap-3" action="/api/subscribe" method="POST">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                />
                <p className="inline-flex shrink-0 items-center rounded-md bg-gray-900 mt-3 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                  Subscribe
                </p>
              </form>
              <p className="mt-2 text-xs text-gray-500">Top work, creators, and templates—once a month.</p>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-6 py-8 sm:grid-cols-3 md:grid-cols-5">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <div className="text-sm font-semibold text-gray-900">{group.title}</div>
              <ul className="mt-3 space-y-2">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm !text-gray-600 hover:text-gray-900 !no-underline hover:!no-underline focus:!no-underline">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-gray-200" />

        {/* Social + trust row */}
        <div className="flex flex-col items-start justify-between gap-3 py-6 text-xs text-gray-500 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <span className="mr-2">Follow us:</span>
            <Social label="D" />
            <Social label="Be" />
            <Social label="in" />
            <Social label="X" />
            <Social label="YT" />
          </div>

          <div className="text-center md:text-right">
            Secure checkout • Buyer & Seller Protection • Verified Reviews
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Bottom legal */}
        <div className="flex flex-col-reverse items-start justify-between gap-3 py-6 text-xs text-gray-500 md:flex-row md:items-center">
          <div>© 2025 Marketplace. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <a href="#" className="!text-gray-600 hover:text-gray-900 !no-underline hover:!no-underline focus:!no-underline">Terms of Service</a>
            <span>·</span>
            <a href="#" className="!text-gray-600 hover:text-gray-900 !no-underline hover:!no-underline focus:!no-underline">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="!text-gray-600 hover:text-gray-900 !no-underline hover:!no-underline focus:!no-underline">Cookie Policy</a>
            <span>·</span>
            <a href="#" className="!text-gray-600 hover:text-gray-900 !no-underline hover:!no-underline focus:!no-underline">Community Standards</a>
            <span>·</span>
            <a href="#" className="!text-gray-600 hover:text-gray-900 !no-underline hover:!no-underline focus:!no-underline">IP Policy</a>
            <span>·</span>
            <a href="#" className="!text-gray-600 hover:text-gray-900 !no-underline hover:!no-underline focus:!no-underline">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
