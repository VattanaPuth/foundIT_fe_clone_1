import React from "react";
import { Heart, ChevronDown, Star, ChevronUp } from "lucide-react";
import { Talent } from "./data"; // Assumes Talent interface and data are imported

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
                {/* 🟢 IMAGE BLOCK: INPUT PROFILE IMAGE HERE 🟢 */}
                <img
                  src={talent.imageUrl || "/default-avatar.png"}
                  alt={`Profile image of ${talent.name}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-dashed border-gray-300"
                />

                <div>
                  <h3 className="font-bold">{talent.name}</h3>
                  <p className="text-sm text-gray-600">{talent.title}</p>
                </div>
              </div>
              <button onClick={() => toggleFavorite(talent.id)}>
                <Heart
                  className={`w-6 h-6 ${
                    favorites.includes(talent.id)
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
              <p className="w-full py-2.5 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 flex justify-center" >
                View Profile
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
