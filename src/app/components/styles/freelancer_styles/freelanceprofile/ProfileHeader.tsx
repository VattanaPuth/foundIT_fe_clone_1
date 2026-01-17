import React, { useState } from "react";

interface GigData {
  id: number | string;
  freelancerName: string;
  shortBio: string;
  description: string;
  price: number;
  skillName: string;
  imageUrl?: string;
  verified: boolean;
  rating?: number;
  reviewCount?: number;
  experience: string;
  location: string;
  lastActiveDays?: number;
  workCount?: number;
  freelancerId?: number;
}

interface ProfileHeaderProps {
  gigData?: GigData | null;
  onHire?: () => void;
}

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 17.3l-5.2 3 1.4-5.9-4.6-4 6.1-.5L12 4.3l2.3 5.6 6.1.5-4.6 4 1.4 5.9-5.2-3z" />
    </svg>
  );
}

export default function ProfileHeader({ gigData, onHire }: ProfileHeaderProps) {
  const [tab, setTab] = useState<"work" | "reviews" | "about">("work");

  // Format last active text
  const formatLastActive = (days?: number) => {
    if (!days) return "Recently";
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <div className="w-full">
      {/* Breadcrumb */}

      {/* Top row */}
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Left */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
            {gigData?.imageUrl ? (
              <img
                src={gigData.imageUrl}
                alt={gigData.freelancerName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
            )}
          </div>

          {/* Text */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl sm:text-5xl font-semibold text-gray-900 leading-none">
                {gigData?.freelancerName || "Freelancer"}
              </h1>

              {/* Verified pill */}
              {gigData?.verified && (
                <div className="px-2 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium">
                  Verified ID
                </div>
              )}
            </div>

            <div className="mt-2 text-gray-700">
              {gigData?.shortBio ||
                gigData?.skillName ||
                "Professional Freelancer"}
            </div>

            {/* Meta */}
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
              {gigData?.rating && (
                <>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-amber-400" />
                    <span className="font-medium text-gray-900">
                      {gigData.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-500">
                      ({gigData.reviewCount || 0})
                    </span>
                  </div>
                  <span className="text-gray-300">·</span>
                </>
              )}

              {gigData?.price && (
                <>
                  <span>${gigData.price}/hr</span>
                  <span className="text-gray-300">·</span>
                </>
              )}

              {gigData?.location && (
                <>
                  <span>{gigData.location}</span>
                  <span className="text-gray-300">·</span>
                </>
              )}

              <span className="text-gray-500">
                Last active {formatLastActive(gigData?.lastActiveDays)}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Hire */}
        <div className="sm:pt-1">
          <div
            role="button"
            tabIndex={0}
            onClick={() => onHire?.()}
            onKeyDown={(e) => handleKeyboardActivate(e, () => onHire?.())}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-emerald-500 text-white text-sm font-medium
                       shadow-sm hover:bg-emerald-600 transition cursor-pointer select-none"
            aria-label="Hire"
          >
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1964_9543)">
                  <path
                    d="M8.00065 14.6654C11.6825 14.6654 14.6673 11.6806 14.6673 7.9987C14.6673 4.3168 11.6825 1.33203 8.00065 1.33203C4.31875 1.33203 1.33398 4.3168 1.33398 7.9987C1.33398 11.6806 4.31875 14.6654 8.00065 14.6654Z"
                    stroke="white"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6 8.0013L7.33333 9.33464L10 6.66797"
                    stroke="white"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1964_9543">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            Hire
          </div>
        </div>
      </div>
    </div>
  );
}
