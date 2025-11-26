'use client'

import React from "react";

type Billing = "monthly" | "annual";

const Check: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 20 20" width={18} height={18} fill="none" aria-hidden {...props}>
        <path
            d="M16.667 5.833L8.333 14.167 3.333 9.167"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const Cross: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 20 20" width={18} height={18} fill="none" aria-hidden {...props}>
        <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
);

interface Feature {
    label: string;
    included: boolean;
    muted?: boolean;
}

interface Tier {
    id: "starter" | "pro" | "business";
    name: string;
    blurb: string;
    cta: { label: string; href?: string; variant?: "solid" | "outline" };
    priceMonthly: number;
    priceAnnual?: number;
    featureIntro?: string;
    features: Feature[];
}

const TIERS: Tier[] = [
    {
        id: "starter",
        name: "Starter",
        blurb: "Perfect for new freelancers testing the platform",
        cta: { label: "Start Free", variant: "outline", href: "#" },
        priceMonthly: 0,
        featureIntro: "Everything in Starter:",
        features: [
            { label: "List up to 5 active gigs", included: true },
            { label: "Basic seller dashboard", included: true },
            { label: "15% commission on sales", included: true },
            { label: "Standard payment processing (3–5 days)", included: true },
            { label: "Community forum access", included: true },
            { label: "Email support (48hr response)", included: true },
            { label: "Featured gig placement", included: false, muted: true },
            { label: "Priority customer support", included: false, muted: true },
            { label: "Analytics & insights", included: false, muted: true },
            { label: "Promoted profile badge", included: false, muted: true },
            { label: "Video consultation calls", included: false, muted: true },
            { label: "Dedicated account manager", included: false, muted: true },
        ],
    },
    {
        id: "pro",
        name: "Pro",
        blurb: "Best for full-time freelancers and small teams",
        cta: { label: "Try Free for 14 Days", variant: "solid", href: "#" },
        priceMonthly: 39,
        priceAnnual: 32,
        featureIntro: "Everything in Pro:",
        features: [
            { label: "Unlimited active gigs", included: true },
            { label: "Advanced seller dashboard", included: true },
            { label: "8% commission on sales", included: true },
            { label: "Fast payment processing (24–48 hours)", included: true },
            { label: "Priority listing in search results", included: true },
            { label: "Priority support (12hr response)", included: true },
            { label: "Featured gig placement (3/month)", included: true },
            { label: 'Promoted "Pro" profile badge', included: true },
            { label: "Advanced analytics & insights", included: true },
            { label: "Custom profile URL", included: true },
            { label: "Video consultation calls", included: false, muted: true },
            { label: "Dedicated account manager", included: false, muted: true },
        ],
    },
    {
        id: "business",
        name: "Business",
        blurb: "For agencies and high-volume sellers",
        cta: { label: "Contact Sales", variant: "outline", href: "#" },
        priceMonthly: 149,
        priceAnnual: 125,
        featureIntro: "Everything in Business:",
        features: [
            { label: "Unlimited gigs + team accounts (up to 10)", included: true },
            { label: "White-label dashboard options", included: true },
            { label: "3% commission on sales", included: true },
            { label: "Instant payment processing", included: true },
            { label: "Top placement in all search results", included: true },
            { label: "VIP support (4hr response)", included: true },
            { label: "Unlimited featured placements", included: true },
            { label: 'Custom "Verified Business" badge', included: true },
            { label: "Full analytics suite + API access", included: true },
            { label: "Custom branded storefront", included: true },
            { label: "Monthly video strategy calls", included: true },
            { label: "Dedicated account manager", included: true },
        ],
    },
];

const formatPrice = (n: number) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

export default function ChoosePlan(): React.ReactElement {
    const [billing, setBilling] = React.useState<Billing>("monthly");

    const priceFor = (tier: Tier) =>
        billing === "monthly" ? tier.priceMonthly : tier.priceAnnual ?? tier.priceMonthly;

    return (
        <section className="w-full mt-32 pl-24 pr-24">
            <div className="mx-auto text-center">
                <h2 className="mt-6 text-sm text-gray-600">Choose your plan</h2>
                <p className="mt-2 text-gray-500 pt-2">
                    Start free, upgrade as you grow. All plans include secure escrow payments, seller <br />
                    protection, and access to millions of buyers worldwide.
                </p>

                {/* Billing toggle */}
                <div className="mt-6 flex w-fit items-center mx-auto rounded-full bg-gray-100 px-3 text-sm">
                    <div className="flex items-center justify-center">
                        <p
                            className={`cursor-pointer rounded-full px-4 py-2 pt-2 mt-3 transition-all ${
                                billing === "monthly"
                                    ? "text-white bg-[#101828] shadow-sm hover:bg-black"
                                    : "opacity-70 hover:opacity-100 hover:text-black"
                            }`}
                            onClick={() => setBilling("monthly")}
                            aria-pressed={billing === "monthly"}
                        >
                            Monthly
                        </p>
                        <p
                            className={`cursor-pointer rounded-full px-4 py-2 mt-3 transition-all ${
                                billing === "annual"
                                    ? "text-white bg-[#101828] shadow-sm hover:bg-black"
                                    : "opacity-70 hover:opacity-100 hover:text-black"
                            }`}
                            onClick={() => setBilling("annual")}
                            aria-pressed={billing === "annual"}
                        >
                            Annual
                        </p>
                        <p className="ml-2 hidden rounded-full bg-white px-2 py-1 mt-3 text-[11px] text-gray-600 sm:inline">
                            Save up to $98
                        </p>
                    </div>
                </div>
            </div>

            {/* Cards */}
           <div className="mx-auto mt-12 grid grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
                {TIERS.map((tier) => {
                    const emphasized = tier.id === "pro"; 

                    return (
                        <div
                            key={tier.id}
                            className={[
                                "group relative rounded-2xl border bg-white transition-all duration-200 cursor-pointer",
                                "hover:-translate-y-1 hover:shadow-xl hover:border-gray-300", // Hover effect for all cards
                                emphasized
                                    ? "border-gray-300 shadow-xl ring-1 ring-gray-200"  // Emphasize Pro card
                                    : "border-gray-200 shadow-sm", // Regular cards
                            ].join(" ")}
                        >
                            {/* "Most Popular" label only on the Pro card */}
                            {emphasized && (
                                <span className="absolute left-1/2 top-0 z-10 -translate-y-1/2 -translate-x-1/2 rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white transition-colors group-hover:bg-black">
                                    Most Popular
                                </span>
                            )}

                            {/* START */}
                            <div className="p-6">
                                <h3 className="text-sm font-medium text-gray-900 transition-colors group-hover:text-black">
                                    {tier.name}
                                </h3>
                                <p className="mt-1 max-w-xs text-xs leading-relaxed text-gray-500">
                                    {tier.blurb}
                                </p>

                                <div className="mt-4 flex items-end gap-2">
                                    <span className="text-4xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-black">
                                        {tier.priceMonthly === 0
                                            ? "Free"
                                            : `${formatPrice(priceFor(tier))}`}
                                    </span>
                                    <span className="mb-1 text-sm text-gray-400">/month</span>
                                </div>

                                <div className="mt-4">
                                    {tier.cta.href ? (
                                        <a
                                            href={tier.cta.href}
                                            className={[
                                                "block w-full rounded-md px-4 py-2 text-center text-sm font-medium !no-underline hover:!no-underline focus:!no-underline transition-all",
                                                tier.cta.variant === "solid"
                                                    ? "bg-gray-900 text-white hover:bg-black group-hover:bg-black"
                                                    : "border border-gray-300 text-gray-900 hover:bg-gray-50 group-hover:border-gray-400 group-hover:text-black",
                                            ].join(" ")}
                                        >
                                            {tier.cta.label}
                                        </a>
                                    ) : (
                                        <button
                                            className={[
                                                "w-full rounded-md px-4 py-2 text-sm font-medium transition-all",
                                                tier.cta.variant === "solid"
                                                    ? "bg-gray-900 text-white hover:bg-black group-hover:bg-black"
                                                    : "border border-gray-300 text-gray-900 hover:bg-gray-50 group-hover:border-gray-400 group-hover:text-black",
                                            ].join(" ")}
                                        >
                                            {tier.cta.label}
                                        </button>
                                    )}
                                </div>

                                {tier.featureIntro && (
                                    <div className="mt-6 whitespace-pre-line text-xs text-gray-500">
                                        {tier.featureIntro}
                                    </div>
                                )}

                                <ul className="mt-2 space-y-3">
                                    {tier.features.map((f, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-3 rounded-md px-2 py-1 transition-colors group-hover:bg-gray-50"
                                        >
                                            {f.included ? (
                                                <Check className="mt-0.5 text-gray-900 transition-colors group-hover:text-black" />
                                            ) : (
                                                <Cross className="mt-0.5 text-gray-300" />
                                            )}
                                            <span
                                                className={[
                                                    "text-sm transition-colors",
                                                    f.included
                                                        ? "text-gray-700 group-hover:text-black"
                                                        : "text-gray-300",
                                                    f.muted ? "line-through" : "",
                                                ].join(" ")}
                                            >
                                                {f.label}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>

        </section>
    );
}
