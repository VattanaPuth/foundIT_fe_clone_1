import * as React from "react";

/** Types */
type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

type CardItem = {
  title: string;
  subtitle: string;
  cta: string;
  icon: IconComponent;
  onClick?: () => void;
};

type ChooseRoleProps = {
  items?: CardItem[];
  className?: string;
};

/** Inline SVG Icons */
const ArrowRight: IconComponent = () => (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 7H17M17 7L11 1M17 7L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const GiftIcon: IconComponent = () => (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 19V5C7 4.07003 7 3.60504 7.10222 3.22354C7.37962 2.18827 8.18827 1.37962 9.22354 1.10222C9.60504 1 10.07 1 11 1C11.93 1 12.395 1 12.7765 1.10222C13.8117 1.37962 14.6204 2.18827 14.8978 3.22354C15 3.60504 15 4.07003 15 5V19M4.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H4.2C3.07989 5 2.51984 5 2.09202 5.21799C1.71569 5.40973 1.40973 5.71569 1.21799 6.09202C1 6.51984 1 7.07989 1 8.2V15.8C1 16.9201 1 17.4802 1.21799 17.908C1.40973 18.2843 1.71569 18.5903 2.09202 18.782C2.51984 19 3.0799 19 4.2 19Z" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const BoltIcon: IconComponent = () => (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.0001 1L2.09356 11.6879C1.74475 12.1064 1.57035 12.3157 1.56768 12.4925C1.56537 12.6461 1.63384 12.7923 1.75336 12.8889C1.89085 13 2.16328 13 2.70814 13H10.0001L9.00011 21L17.9067 10.3121C18.2555 9.89358 18.4299 9.68429 18.4325 9.50754C18.4348 9.35388 18.3664 9.2077 18.2468 9.11111C18.1094 9 17.8369 9 17.2921 9H10.0001L11.0001 1Z" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const BagIcon: IconComponent = () => (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.52 1.64L1.96 3.72C1.65102 4.13198 1.49652 4.33797 1.50011 4.51039C1.50323 4.66044 1.57358 4.80115 1.69175 4.89368C1.82754 5 2.08503 5 2.6 5H17.4C17.915 5 18.1725 5 18.3083 4.89368C18.4264 4.80115 18.4968 4.66044 18.4999 4.51039C18.5035 4.33797 18.349 4.13198 18.04 3.72L16.48 1.64M3.52 1.64C3.696 1.40533 3.784 1.288 3.89552 1.20338C3.9943 1.12842 4.10616 1.0725 4.22539 1.03845C4.36 1 4.50667 1 4.8 1H15.2C15.4933 1 15.64 1 15.7746 1.03845C15.8938 1.0725 16.0057 1.12842 16.1045 1.20338C16.216 1.288 16.304 1.40533 16.48 1.64M3.52 1.64L1.64 4.14666C1.40254 4.46328 1.28381 4.62159 1.1995 4.79592C1.12469 4.95062 1.07012 5.11431 1.03715 5.28296C1 5.47301 1 5.6709 1 6.06666L1 17.8C1 18.9201 1 19.4802 1.21799 19.908C1.40973 20.2843 1.71569 20.5903 2.09202 20.782C2.51984 21 3.07989 21 4.2 21L15.8 21C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V6.06667C19 5.6709 19 5.47301 18.9628 5.28296C18.9299 5.11431 18.8753 4.95062 18.8005 4.79592C18.7162 4.62159 18.5975 4.46328 18.36 4.14667L16.48 1.64M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

/** Default data (you can override via props.items) */
const defaultItems: CardItem[] = [
    { title: "Client (Hire)", subtitle: "Post jobs, shortlist, contract safely", cta: "Post a Job", icon: GiftIcon },
    { title: "Freelancer (Offer services)", subtitle: "Create gigs, get discovered, get paid", cta: "Create a Gig", icon: BoltIcon },
    { title: "Seller (Sell finished work)", subtitle: "Upload ready-made apps/designs/code", cta: "Open a Shop", icon: BagIcon },
];

/** Component */
export default function ChooseYourPlat({ items = defaultItems, className = "" }: ChooseRoleProps) {
  return (
    <section className={className}>
        <div className="mx-auto w-full px-10 py-10 mt-22">
            <h1 className="text-center text-3xl sm:text-4xl font-semibold text-gray-900">
                Choose how you use the platform
            </h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 h-72 mt-10 hover:cursor-pointer">
                {items.map(({ title, subtitle, cta, icon: Icon, onClick }) => (
                    <div
                        key={title}
                        className="rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
                        >
                        {/* Icon bubble */}
                        <div
                            className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 ring-8 ring-green-50"
                            aria-hidden="true"
                            >
                            <Icon className="h-6 w-6" />
                        </div>

                        {/* Content */}
                        <p className="mt-6 pt-8 text-lg font-medium text-gray-900">{title}</p>
                        <p className="mt-2 text-sm text-gray-500">{subtitle}</p>

                        {/* CTA */}
                        <div
                            onClick={onClick}
                            className="inline-flex mt-6 w-full items-center justify-center gap-2
                                    rounded-md bg-green-600 px-4 py-2 text-white
                                    hover:bg-green-700 focus:outline-none focus:ring-2
                                    focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {cta}
                            <ArrowRight className="h-4 w-4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}