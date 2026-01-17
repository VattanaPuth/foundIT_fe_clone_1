"use client";

import { useState, useEffect } from "react";
import { categories, Talent } from "./data";
import ClientNavHeader from "@/app/components/styles/global_styles/client/header";
import FilterSidebar from "./FilterSidebar";
import TalentList from "./TalentList";
import ClientFooter from "@/app/components/styles/global_styles/client/footer";

export default function TalentPageContent() {
  // States and filter logic...
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [hourlyMin, setHourlyMin] = useState(0);
  const [bestMatch, setBestMatch] = useState("Best Match");
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [lastActive, setLastActive] = useState<number | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [minWorkCount, setMinWorkCount] = useState(false);

  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch gigs from backend (both freelancer gigs and client job postings)
  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch freelancer gigs only
        const freelancerResponse = await fetch(
          "http://localhost:8085/gigs/freelancer/client-view?limit=50",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        let mappedTalents: Talent[] = [];

        // Map freelancer gigs
        if (freelancerResponse.ok) {
          const freelancerData = await freelancerResponse.json();
          const freelancerGigs = freelancerData.content || [];

          interface FreelancerGig {
            id: string;
            freelancerName?: string;
            shortBio?: string;
            rating?: number;
            reviewCount?: number;
            price?: number;
            skillName?: string;
            description?: string;
            experience?: string;
            location?: string;
            lastActiveDays?: number;
            workCount?: number;
            verified?: boolean;
            imageUrl?: string;
          }
          const freelancerTalents: Talent[] = freelancerGigs.map(
            (gig: FreelancerGig) => ({
              id: `fl-${gig.id}`,
              name: gig.freelancerName || "Freelancer",
              title: gig.shortBio || "Skilled Professional",
              rating: gig.rating || 4.5,
              reviews: gig.reviewCount || 0,
              rate: gig.price || 50,
              skills: gig.skillName ? [gig.skillName] : ["General"],
              bio: gig.description || "No description available",
              category: gig.skillName || "General",
              experience: gig.experience || "Intermediate",
              location: gig.location || "Cambodia",
              lastActive: gig.lastActiveDays || 0,
              workCount: gig.workCount || 0,
              verified: gig.verified || false,
              imageUrl: gig.imageUrl,
            }),
          );

          mappedTalents = [...mappedTalents, ...freelancerTalents];
        }

        console.log(
          "✓ Fetched freelancer gigs:",
          mappedTalents.length,
          "IDs:",
          mappedTalents.map((t) => t.id),
        );
        setTalents(mappedTalents);
      } catch (error) {
        console.error("Error fetching gigs:", error);
        setTalents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  // Filter application logic...
  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleExperience = (exp: string) => {
    setSelectedExperience((prev) =>
      prev.includes(exp) ? prev.filter((x) => x !== exp) : [...prev, exp],
    );
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((x) => x !== loc) : [...prev, loc],
    );
  };

  const filteredTalents: Talent[] = talents.filter((t) => {
    // Filter logic remains the same
    if (t.rate < hourlyMin) return false;
    if (selectedCategory && t.category !== selectedCategory) return false;
    if (
      selectedExperience.length > 0 &&
      !selectedExperience.includes(t.experience)
    )
      return false;
    if (selectedLocations.length > 0 && !selectedLocations.includes(t.location))
      return false;
    if (verifiedOnly && !t.verified) return false;
    if (lastActive && t.lastActive > lastActive) return false;
    if (minRating && t.rating < minRating) return false;
    if (minWorkCount && t.workCount < 10) return false;
    return true;
  });

  return (
    <>
      <ClientNavHeader />

      {/* Main container: pt-24 accounts for the 96px (24*4) height of the sticky header  */}
      <main className="pt-0 bg-gray-50">
        {/* Max width change: Use max-w-full and increased horizontal padding (px-12) */}
        <div className="max-w-full mx-auto px-12 py-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500 text-lg">Loading gigs...</div>
            </div>
          ) : talents.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500 text-lg">
                No gigs available yet. Check back later!
              </div>
            </div>
          ) : (
            <>
              {/* Top Categories: No vertical scrollbar generated here */}
              <div className="flex overflow-x-auto gap-3 mb-10 pb-2">
                {categories.map((cat) => (
                  <p
                    key={cat}
                    onClick={() =>
                      setSelectedCategory(selectedCategory === cat ? null : cat)
                    }
                    className={`px-4 py-2.5 w-auto rounded-full border text-sm transition-all whitespace-nowrap ${
                      selectedCategory === cat
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 cursor-pointer"
                    }`}
                  >
                    {cat}
                  </p>
                ))}
              </div>

              {/* Core Layout: Sidebar and Content */}
              <div className="flex gap-10">
                {/* Left Sidebar: Fixed width, sticky position, and fixed viewport height */}
                {/* top-24 (6rem) pushes the sidebar down past the fixed header */}
                <div className="w-64 flex-shrink-0 sticky top-24 h-[calc(100vh-8rem)]">
                  <FilterSidebar
                    hourlyMin={hourlyMin}
                    setHourlyMin={setHourlyMin}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedExperience={selectedExperience}
                    toggleExperience={toggleExperience}
                    selectedLocations={selectedLocations}
                    toggleLocation={toggleLocation}
                    verifiedOnly={verifiedOnly}
                    setVerifiedOnly={setVerifiedOnly}
                    setLastActive={setLastActive}
                    minRating={minRating}
                    setMinRating={setMinRating}
                    minWorkCount={minWorkCount}
                    setMinWorkCount={setMinWorkCount}
                  />
                </div>

                {/* Talent Section: Takes remaining width and allows content to dictate page scroll */}
                <div className="flex-1">
                  <TalentList
                    filteredTalents={filteredTalents}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    bestMatch={bestMatch}
                    setBestMatch={setBestMatch}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <ClientFooter />
    </>
  );
}
