import React from "react";
import { categories, locations } from "./data";

interface FilterSidebarProps {
  hourlyMin: number;
  setHourlyMin: (value: number) => void;
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
  selectedExperience: string[];
  toggleExperience: (exp: string) => void;
  selectedLocations: string[];
  toggleLocation: (loc: string) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (value: boolean) => void;
  setLastActive: (value: number | null) => void;
  minRating: number | null;
  setMinRating: (value: number | null) => void;
  minWorkCount: boolean;
  setMinWorkCount: (value: boolean) => void;
}

export default function FilterSidebar({
  hourlyMin,
  setHourlyMin,
  selectedCategory,
  setSelectedCategory,
  selectedExperience,
  toggleExperience,
  selectedLocations,
  toggleLocation,
  verifiedOnly,
  setVerifiedOnly,
  setLastActive,
  minRating,
  setMinRating,
  minWorkCount,
  setMinWorkCount,
}: FilterSidebarProps) {
  const handleClearAll = () => {
    setHourlyMin(0);
    setSelectedCategory(null);
    selectedExperience.forEach((exp) => toggleExperience(exp)); // remove all
    selectedLocations.forEach((loc) => toggleLocation(loc)); // remove all
    setVerifiedOnly(false);
    setLastActive(null);
    setMinRating(null);
    setMinWorkCount(false);
  };

  return (
    // UPDATED: Removed the fixed width (w-64) which is now in the parent div.
    // ADDED: h-full to fill the parent's calculated height.
    // ADDED: overflow-y-auto to enable scrolling when content overflows the fixed height.
    // ADDED: hover:overflow-y-scroll for a potential UX improvement (scrollbar only visible on hover).
    <div className="h-full overflow-y-auto hover:overflow-y-scroll pr-4 pb-37">
      <div className="space-y-8 pb-1">
        {" "}
        {/* Added pb-4 for button spacing at the bottom */}
        <h5>Filters</h5>
        <hr className="border-gray-200 my-4" />
        {/* Category Filter */}
        <details open>
          <summary className="font-semibold cursor-pointer flex justify-between items-center text-250">
            Category
          </summary>
          <div className="mt-1.5 space-y-2 space-x-5  ">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategory === cat}
                  onChange={() =>
                    setSelectedCategory(selectedCategory === cat ? null : cat)
                  }
                  className="w-4 h-4 accent-green-600 text-green-600 rounded focus:ring-green-500 border-gray-300"
                />
                <span className="text-sm ">{cat}</span>
              </div>
            ))}
          </div>
        </details>
        <hr className="border-gray-200 my-4" />
        {/* Skills Filter */}
        <details open>
          <summary className="font-semibold cursor-pointer flex justify-between items-center text-250">
            Skills
          </summary>
          <div className="mt-1.5">
            <input
              type="text"
              placeholder="Type to search skills.. "
              className="w-full p-2 border rounded-lg focus:ring-green-500 focus:border-green-500 text-sm placeholder:text-sm"
            />
          </div>
        </details>
        <hr className="border-gray-200 my-4" />
        {/* Hourly Rate Filter */}
        <details open>
          <summary className="font-semibold cursor-pointer flex justify-between items-center text-250">
            Hourly Rate
          </summary>
          <div className="mt-1.5">
            <div className="flex justify-between text-sm mb-2">
              <span></span>
              <span className="text-sm">${hourlyMin}/hr</span>
            </div>
            <input
              type="range"
              min={0}
              max={200}
              value={hourlyMin}
              onChange={(e) => setHourlyMin(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>
        </details>
        <hr className="border-gray-200 my-4" />
        {/* Experience Level Filter */}
        <details open>
          <summary className="font-semibold cursor-pointer flex justify-between items-center text-250">
            Experience Level
          </summary>
          <div className="mt-1.5 space-y-2 cursor-pointer">
            {["Entry", "Intermediate", "Expert"].map((exp) => (
              <div key={exp} className="flex items-center gap-3 w-full ">
                <input
                  type="checkbox"
                  checked={selectedExperience.includes(exp)}
                  onChange={() => toggleExperience(exp)}
                  className="w-4 h-4 accent-green-600 text-green-600 rounded focus:ring-green-500 border-gray-300"
                />
                <span className="text-sm">{exp}</span>
              </div>
            ))}
          </div>
        </details>
        <hr className="border-gray-200 my-4" />
        {/* Location Filter */}
        <details open>
          <summary className="font-semibold cursor-pointer flex justify-between items-center text-250">
            Location
          </summary>
          <div className="mt-1.5 space-y-2">
            {locations.map((loc) => (
              <div
                key={loc}
                className="flex items-center gap-3 cursor-pointer mr-4"
              >
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(loc)}
                  onChange={() => toggleLocation(loc)}
                  className="w-4 h-4 accent-green-600 text-green-600 rounded focus:ring-green-500 border-gray-300 "
                />
                <span className="text-sm ml-1">{loc}</span>
              </div>
            ))}
          </div>
        </details>
        <hr className="border-gray-200 my-4" />
        {/* Verified Filter */}
        <details open>
          <summary className="font-semibold cursor-pointer flex justify-between items-center text-250">
            Badges
          </summary>
          <div className="mt-1.5 space-y-2">
            <div className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={() => setVerifiedOnly(!verifiedOnly)}
                className="w-4 h-4 accent-green-600 text-green-600 rounded focus:ring-green-500 border-gray-300"
              />
              <span className="text-sm">Verified ID</span>
            </div>
          </div>
        </details>
        <hr className="border-gray-200 my-4" />
        {/* Last Active Filter  need to change it to checkbox*/}
        <details open>
          <summary className="font-semibold cursor-pointer flex justify-between items-center text-250">
            Last Active
          </summary>
          <div className="mt-1.5 space-y-2">
            <div className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="lastActive"
                onChange={() => setLastActive(7)}
                className="w-4 h-4 accent-green-600 rounded-full focus:ring-green-500 border-gray-300"
              />
              <span className="text-sm">7 days</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="lastActive"
                onChange={() => setLastActive(30)}
                className="w-4 h-4 accent-green-600 rounded-full focus:ring-green-500 border-gray-300"
              />
              <span className="text-sm">30 days</span>
            </div>
          </div>
        </details>
        <hr className="border-gray-200 my-4" />
        {/* Minimum Rating Filter */}
        <details open>
          <summary className="font-semibold cursor-pointer flex justify-between items-center text-250">
            Minimum Rating
          </summary>
          <div className="mt-1.5 space-y-2">
            {[4, 4.5].map((rating) => (
              <div
                key={rating}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={minRating === rating}
                  onChange={() =>
                    setMinRating(minRating === rating ? null : rating)
                  }
                  className="w-4 h-4 accent-green-600 text-green-600 rounded focus:ring-green-500 border-gray-300"
                />
                <span className=" text-sm">{rating}+</span>
              </div>
            ))}
          </div>
        </details>
        <hr className="border-gray-200 my-4" />
        {/* Minimum Work Count Filter */}
        <details open>
          <summary className="font-semibold cursor-pointer flex justify-between items-center text-250 ">
            Job Count
          </summary>
          <div className="mt-1.5 space-y-2 mb-4">
            <div className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={minWorkCount}
                onChange={() => setMinWorkCount(!minWorkCount)}
                className="w-4 h-4 accent-green-600 text-green-600 rounded focus:ring-green-500 border-gray-300"
              />
              <span className="text-sm">{" >=10 completed jobs"}</span>
            </div>
          </div>
        </details>
      </div>

      {/* Action Buttons are outside the main scrollable content, but still inside the overall fixed container */}

      <div className="h-auto">
        <div className="flex gap-3  pt-4 border-t border-b  bg-gray-50 sticky bottom-4 p-2">
          <p
            onClick={handleClearAll}
            className="flex items-center px-3 py-1 border rounded-lg w-auto hover:bg-gray-100 transition cursor-pointer "
          >
            Clear all
          </p>
          <p className="flex items-center px-3 py-1 w-auto bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer">
            Apply
          </p>
        </div>
      </div>
    </div>
  );
}
