// app/page.tsx
"use client";
import React from "react";
import { useState } from "react";

const HOW_IT_WORKS_SECTIONS = [
  {
    title: "For Clients",
    steps: [
      "Post your project with clear requirements and budget",
      "Review proposals from qualified freelancers",
      "Select and contract with secure payment protection",
    ],
  },
  {
    title: "For Freelancers",
    steps: [
      "Create your profile and showcase your best work",
      "Set up gig packages with clear deliverables",
      "Get discovered and build your reputation",
    ],
  },
  {
    title: "For Sellers",
    steps: [
      "Upload ready-made products to your shop",
      "Set pricing and licensing terms",
      "Earn passive income from instant downloads",
    ],
  },
];
export default function CommunityPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 mt-5">
      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl text-center font-semibold tracking-tight text-gray-900">
        Community &amp; learn
      </h1>

      <div className="mt-16 mx-auto pl-10 pr-10 grid gap-10 lg:grid-cols-2">
        {/* LEFT: How it works */}
        <section>
          <p className="text-2xl mt-3 text-gray-900">How it works</p>
          <div className="mt-12"></div>

          {HOW_IT_WORKS_SECTIONS.map((section, index) => {
            const isOpen = activeIndex === index;

            const wrapperClasses =
              index === 0
                ? "mt-6 border-b border-gray-200 pb-6"
                : index === HOW_IT_WORKS_SECTIONS.length - 1
                ? "pt-6"
                : "border-b border-gray-200 py-6";
 
            return (
              <div key={section.title} className={wrapperClasses}>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() =>
                    setActiveIndex(isOpen ? null : index)
                  }
                >
                  <p className="text-xl text-gray-900 pt-0">{section.title}</p>
                  <ChevronDown
                      className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {isOpen && (
                  <ol className="mt-4 space-y-4">
                    {section.steps.map((text, stepIndex) => (
                      <StepItem
                        key={text}
                        n={stepIndex + 1}
                        text={text}
                      />
                    ))}
                  </ol>
                )}
              </div>
            );
          })}
        </section>

        {/* RIGHT: Guides & Playbooks */}
        <section>
          <p className="text-2xl mt-3 text-gray-900">Guides &amp; playbooks</p>

          <div className="mt-6 pt-6 space-y-4">
            <GuideCard
              icon={<BookIcon />}
              title="How to brief a designer"
              subtitle="Get the best results from your design projects"
            />
            <GuideCard
              icon={<DollarIcon />}
              title="How to price your gig"
              subtitle="Set competitive rates that reflect your value"
            />
            <GuideCard
              icon={<CubeIcon />}
              title="How to package a project"
              subtitle="Create ready-to-sell digital products"
            />
            <GuideCard
              icon={<SparklesIcon />}
              title="Building your reputation"
              subtitle="Stand out and win more clients"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- tiny components (inline to keep it all in one file) ---------- */

function StepItem({ n, text }: { n: number; text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="grid size-8 place-items-center rounded-full border border-gray-300 bg-[#F3F4F6] text-sm font-semibold text-gray-700">
        {n}
      </span>
      <p className="text-gray-700">{text}</p>
    </li>
  );
}

function GuideCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="grid size-12 place-items-center rounded-xl bg-gray-100 text-gray-700">
        {icon}
      </div>
      <div>
        <div className="text-base font-semibold text-gray-900">{title}</div>
        <div className="mt-1 text-sm text-gray-600">{subtitle}</div>
      </div>
    </div>
  );
}

/* ---------- inline SVG icons (no external packages) ---------- */

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`${className} h-5 w-5 text-gray-400`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 19L10.8999 18.8499C10.2053 17.808 9.85798 17.287 9.3991 16.9098C8.99286 16.5759 8.52476 16.3254 8.02161 16.1726C7.45325 16 6.82711 16 5.57482 16H4.2C3.07989 16 2.51984 16 2.09202 15.782C1.71569 15.5903 1.40973 15.2843 1.21799 14.908C1 14.4802 1 13.9201 1 12.8V4.2C1 3.07989 1 2.51984 1.21799 2.09202C1.40973 1.71569 1.71569 1.40973 2.09202 1.21799C2.51984 1 3.07989 1 4.2 1H4.6C6.84021 1 7.96031 1 8.81596 1.43597C9.56861 1.81947 10.1805 2.43139 10.564 3.18404C11 4.03968 11 5.15979 11 7.4M11 19V7.4M11 19L11.1001 18.8499C11.7947 17.808 12.142 17.287 12.6009 16.9098C13.0071 16.5759 13.4752 16.3254 13.9784 16.1726C14.5467 16 15.1729 16 16.4252 16H17.8C18.9201 16 19.4802 16 19.908 15.782C20.2843 15.5903 20.5903 15.2843 20.782 14.908C21 14.4802 21 13.9201 21 12.8V4.2C21 3.07989 21 2.51984 20.782 2.09202C20.5903 1.71569 20.2843 1.40973 19.908 1.21799C19.4802 1 18.9201 1 17.8 1H17.4C15.1598 1 14.0397 1 13.184 1.43597C12.4314 1.81947 11.8195 2.43139 11.436 3.18404C11 4.03968 11 5.15979 11 7.4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 15C1 17.2091 2.79086 19 5 19H9C11.2091 19 13 17.2091 13 15C13 12.7909 11.2091 11 9 11H5C2.79086 11 1 9.20914 1 7C1 4.79086 2.79086 3 5 3H9C11.2091 3 13 4.79086 13 7M7 1V21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CubeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.5 7.27783L12 12.0001M12 12.0001L3.49997 7.27783M12 12.0001L12 21.5001M21 16.0586V7.94153C21 7.59889 21 7.42757 20.9495 7.27477C20.9049 7.13959 20.8318 7.01551 20.7354 6.91082C20.6263 6.79248 20.4766 6.70928 20.177 6.54288L12.777 2.43177C12.4934 2.27421 12.3516 2.19543 12.2015 2.16454C12.0685 2.13721 11.9315 2.13721 11.7986 2.16454C11.6484 2.19543 11.5066 2.27421 11.223 2.43177L3.82297 6.54288C3.52345 6.70928 3.37369 6.79248 3.26463 6.91082C3.16816 7.01551 3.09515 7.13959 3.05048 7.27477C3 7.42757 3 7.59889 3 7.94153V16.0586C3 16.4013 3 16.5726 3.05048 16.7254C3.09515 16.8606 3.16816 16.9847 3.26463 17.0893C3.37369 17.2077 3.52345 17.2909 3.82297 17.4573L11.223 21.5684C11.5066 21.726 11.6484 21.8047 11.7986 21.8356C11.9315 21.863 12.0685 21.863 12.2015 21.8356C12.3516 21.8047 12.4934 21.726 12.777 21.5684L20.177 17.4573C20.4766 17.2909 20.6263 17.2077 20.7354 17.0893C20.8318 16.9847 20.9049 16.8606 20.9495 16.7254C21 16.5726 21 16.4013 21 16.0586Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.5 9.5L7.5 4.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 19V17C21 15.1362 19.7252 13.5701 18 13.126M14.5 1.29076C15.9659 1.88415 17 3.32131 17 5C17 6.67869 15.9659 8.11585 14.5 8.70924M16 19C16 17.1362 16 16.2044 15.6955 15.4693C15.2895 14.4892 14.5108 13.7105 13.5307 13.3045C12.7956 13 11.8638 13 10 13H7C5.13623 13 4.20435 13 3.46927 13.3045C2.48915 13.7105 1.71046 14.4892 1.30448 15.4693C1 16.2044 1 17.1362 1 19M12.5 5C12.5 7.20914 10.7091 9 8.5 9C6.29086 9 4.5 7.20914 4.5 5C4.5 2.79086 6.29086 1 8.5 1C10.7091 1 12.5 2.79086 12.5 5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
