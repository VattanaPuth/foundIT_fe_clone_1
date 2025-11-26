"use client";
import React from "react";

interface TalentCardProps {
  name: string;
  initials: string;
  title: string;
  hourlyRate: number;
  heroImage: string;
  avatarImage?: string;
  skills: string[];
  rating: number;
  reviewsCount: string; // e.g. "1.1k"
  location: string;
  availableNow?: boolean;
}

const talentData: TalentCardProps[] = [
  {
    name: "Samantha B.",
    initials: "SB",
    title: "Brand Designer",
    hourlyRate: 45,
    heroImage: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
    avatarImage: "defaults.webp",
    skills: ["Logo", "Brand Guidelines", "Figma", "Identity"],
    rating: 4.9,
    reviewsCount: "1.1k",
    location: "Brooklyn",
    availableNow: true,
  },
  {
    name: "Felix S.",
    initials: "FS",
    title: "Product Designer",
    hourlyRate: 52,
    heroImage: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
    avatarImage: "defaults.webp",
    skills: ["Figma", "Prototyping", "UX", "Design Systems"],
    rating: 4.8,
    reviewsCount: "1.0k",
    location: "San Francisco",
    availableNow: true,
  },
  {
    name: "Priya P.",
    initials: "PP",
    title: "UI Designer",
    hourlyRate: 42,
    heroImage: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
    avatarImage: "defaults.webp",
    skills: ["Mobile UI", "Components", "Figma", "iOS/Android"],
    rating: 4.8,
    reviewsCount: "0.9k",
    location: "London",
    availableNow: true,
  },
  // duplicate a few to get 6 cards (like screenshot)
  {
    name: "Samantha B.",
    initials: "SB",
    title: "Brand Designer",
    hourlyRate: 45,
    heroImage: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
    avatarImage: "defaults.webp",
    skills: ["Logo", "Brand Guidelines", "Figma", "Identity"],
    rating: 4.9,
    reviewsCount: "1.1k",
    location: "Brooklyn",
    availableNow: true,
  },
  {
    name: "Felix S.",
    initials: "FS",
    title: "Product Designer",
    hourlyRate: 52,
    heroImage: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
    avatarImage: "defaults.webp",
    skills: ["Figma", "Prototyping", "UX", "Design Systems"],
    rating: 4.8,
    reviewsCount: "1.0k",
    location: "San Francisco",
    availableNow: true,
  },
  {
    name: "Priya P.",
    initials: "PP",
    title: "UI Designer",
    hourlyRate: 42,
    heroImage: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
    avatarImage: "defaults.webp",
    skills: ["Mobile UI", "Components", "Figma", "iOS/Android"],
    rating: 4.8,
    reviewsCount: "0.9k",
    location: "London",
    availableNow: true,
  },
];

const TalentCard: React.FC<TalentCardProps> = ({
  name,
  initials,
  title,
  hourlyRate,
  heroImage,
  avatarImage,
  skills,
  rating,
  reviewsCount,
  location,
  availableNow,
}) => {
  return (
    <article className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      {/* content */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        {/* hero image */}
        <div className="h-60 w-full overflow-hidden">
          <img
            src={heroImage}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              {avatarImage ? (
                <img
                  src={avatarImage}
                  alt={name}
                  className="h-14 w-14 rounded-full object-cover border-1 border-gray-300"
                />
                
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
                  {initials}
                </div>
              )}
            </div>
            <div className="flex flex-col items-end gap-1 mt-2">
              {availableNow && (
                <span className="text-lg font-medium text-emerald-600">
                  Available now
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="mt-1">
                <p className="text-[18px] font-medium text-[#6B7280]">{title}</p>
            </div>
            <div>
              <p className="mt-1 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-lg font-semibold text-white hover:bg-emerald-600 transition">
                Hire
              </p>
            </div>
          </div>

          <div className="relative">
            <p className="absolute text-sm right-0">
              <span className="text-lg font-semibold text-gray-900">
                ${hourlyRate}
              </span>
              <span className="text-xs text-gray-500">
                /hr
              </span>
            </p>
          </div>
        </div>
          
        {/* skills chips */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* rating + location */}
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500 pt-1">
          <div className="flex items-center gap-1">
            {/* star icon */}
            <svg
              className="h-3.5 w-3.5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold text-gray-700">{rating}</span>
            <span>· {reviewsCount} reviews</span>
          </div>

          <div className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_498_4998)">
                <path d="M11.6668 5.83268C11.6668 8.74527 8.43575 11.7786 7.35075 12.7154C7.24967 12.7914 7.12663 12.8325 7.00016 12.8325C6.8737 12.8325 6.75066 12.7914 6.64958 12.7154C5.56458 11.7786 2.3335 8.74527 2.3335 5.83268C2.3335 4.59501 2.82516 3.40802 3.70033 2.53285C4.5755 1.65768 5.76249 1.16602 7.00016 1.16602C8.23784 1.16602 9.42482 1.65768 10.3 2.53285C11.1752 3.40802 11.6668 4.59501 11.6668 5.83268Z" stroke="#6B7280" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 7.58398C7.9665 7.58398 8.75 6.80048 8.75 5.83398C8.75 4.86749 7.9665 4.08398 7 4.08398C6.0335 4.08398 5.25 4.86749 5.25 5.83398C5.25 6.80048 6.0335 7.58398 7 7.58398Z" stroke="#6B7280" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_498_4998">
                  <rect width="14" height="14" fill="white"/>
                </clipPath>
              </defs>
            </svg>

            <span>{location}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const HireTalent: React.FC = () => {
  return (
    <section className="w-full mx-auto px-4 py-12 mt-20">
        {/* header */}
        <div className="flex items-baseline justify-between mb-6">
            <div className="pl-4">
                <p className="text-3xl font-semibold text-gray-900">
                    Hire top-rated talent
                </p>
                <p className="text-sm text-gray-500">
                    Vetted professionals ready to start immediately
                </p>
            </div>
            <p className="text-lg font-medium text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 pr-4">
                See all <span>→</span>
            </p>
        </div>

        {/* cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pl-4 pr-4">
            {talentData.map((talent, idx) => (
                <TalentCard key={idx} {...talent} />
            ))}
        </div>
    </section>
  );
};

export default HireTalent;
