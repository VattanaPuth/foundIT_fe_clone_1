import React from "react";
import Image from "next/image";
import { Heart, ChevronDown, Star, ChevronUp } from "lucide-react";
import { Talent } from "./data"; // Assumes Talent interface and data are imported
import { useRouter } from "next/navigation";

interface TalentListProps {
  filteredTalents: Talent[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
  bestMatch: string;
  setBestMatch: (value: string) => void;
}

export default function TalentList({
  filteredTalents: initialTalents,
  favorites,
  toggleFavorite,
  bestMatch,
  setBestMatch,
}: TalentListProps) {
  const [showBestMatch, setShowBestMatch] = React.useState(false);
  const router = useRouter();

  // Truncate name if longer than 15 characters
  const truncateName = (name: string, maxLength: number = 15) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
  };

  // Apply sorting based on the selected option
  const sortTalents = (talents: Talent[], sortOption: string) => {
    switch (sortOption) {
      case "Highest Rated":
        return [...talents].sort((a, b) => b.rating - a.rating);
      case "Most Reviews":
      case "Best Match":
        // Sorting by reviews is a common proxy for 'Best Match'
        return [...talents].sort((a, b) => b.reviews - a.reviews);
      case "Lowest Rate":
        return [...talents].sort((a, b) => a.rate - b.rate);
      default:
        return talents;
    }
  };

  const sortedTalents = sortTalents(initialTalents, bestMatch);

  return (
    // REMOVED: flex-1 overflow-y-auto, allowing the main page to handle scrolling
    <div>
      <div className="flex justify-between items-center mb-3">
        <h5 className="text-2xl font-bold">{sortedTalents.length} Talents</h5>
        <div className="relative">
          <p
            onClick={() => setShowBestMatch(!showBestMatch)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm cursor-pointer"
          >
            {bestMatch}{" "}
            {showBestMatch ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </p>

          {showBestMatch && (
            <div className="absolute right-0 mt-0 w-56 bg-white border rounded-lg shadow-lg z-20 overflow-hidden">
              {[
                "Best Match",
                "Highest Rated",
                "Most Reviews",
                "Lowest Rate",
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setBestMatch(option);
                    setShowBestMatch(false);
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid Layout: 1 column mobile, 2 columns medium, 3 columns large screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTalents.map((talent) => (
          <div
            key={talent.id}
            className="bg-white rounded-2xl border p-6 hover:shadow-lg transition flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4">
                {/* Profile Avatar - Dynamic from backend */}
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(`/page/client/freelancerpf?id=${talent.id}`);
                  }}
                  title="View Profile"
                >
                  {talent.imageUrl ? (
                    <Image
                      src={talent.imageUrl}
                      alt={`${talent.name}'s profile`}
                      className="w-16 h-16 rounded-full object-cover"
                      width={64}
                      height={64}
                      onError={(e) => {
                        // Fallback to letter avatar if image fails to load
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                        e.currentTarget.nextElementSibling?.classList.remove(
                          "hidden",
                        );
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl ${
                      talent.imageUrl ? "hidden" : ""
                    }`}
                  >
                    {talent.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold" title={talent.name}>
                    {truncateName(talent.name)}
                  </h3>
                  <p className="text-sm text-gray-600">{talent.title}</p>
                </div>
              </div>
              <button onClick={() => toggleFavorite(Number(talent.id))}>
                <Heart
                  className={`w-6 h-6 ${
                    favorites.includes(Number(talent.id))
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>
                  {talent.rating} ({talent.reviews})
                </span>
              </div>
              <span className="font-bold">${talent.rate}/hr</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                Verified
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {talent.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-600 mb-4">{talent.bio}</p>

            {/* Push the button to the bottom using mt-auto */}
            <div className="mt-auto">
              <p
                className="w-full py-2.5 bg-gray-100 rounded-lg font-medium hover:bg-green-100 hover:text-green-700 flex justify-center cursor-pointer transition-all"
                onClick={() => {
                  console.log(
                    `Navigating to Profile ID: ${talent.id} - ${talent.name}`,
                  );
                  router.push(`/page/client/viewprofile?id=${talent.id}`);
                }}
              >
                View Profile
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
