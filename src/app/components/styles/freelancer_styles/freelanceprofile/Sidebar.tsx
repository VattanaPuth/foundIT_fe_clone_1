import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
}

interface SidebarProps {
  gigData?: GigData | null;
}

export default function Sidebar({ gigData }: SidebarProps) {
  const router = useRouter();
  const [similarGigs, setSimilarGigs] = useState<GigData[]>([]);

  // Format last active text
  const formatLastActive = (days?: number) => {
    if (!days) return "Recently";
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  // Fetch similar gigs based on skill type
  useEffect(() => {
    const fetchSimilarGigs = async () => {
      if (!gigData?.skillName) return;

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8085/gigs/freelancer/client-view",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Response is PageDTO with { content: [...], pageable: {...} }
          const allGigs: GigData[] = data.content || [];

          // Filter gigs with same skill, exclude current gig, limit to 3
          const filtered = allGigs
            .filter(
              (gig) =>
                gig.skillName === gigData.skillName && gig.id !== gigData.id
            )
            .slice(0, 3);

          setSimilarGigs(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch similar gigs:", error);
      }
    };

    fetchSimilarGigs();
  }, [gigData]);

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="border rounded-xl p-5 text-sm">
        <div className="flex justify-between py-1">
          <span>Hourly rate</span>
          <strong>${gigData?.price || 55}/hr</strong>
        </div>
        <div className="flex justify-between py-1">
          <span>Hours per week</span>
          <span>20–30</span>
        </div>
        <div className="flex justify-between py-1">
          <span>Response time</span>
          <span>&lt; 1 hour</span>
        </div>
        <div className="flex justify-between py-1">
          <span>Experience</span>
          <span>{gigData?.experience || "N/A"}</span>
        </div>
        <div className="flex justify-between py-1">
          <span>Last active</span>
          <span>{formatLastActive(gigData?.lastActiveDays)}</span>
        </div>
      </div>

      {/* Performance */}
      <div className="border rounded-xl p-5 text-sm">
        <h3 className="font-semibold mb-3">Performance</h3>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>Projects completed</span>
            <span>{gigData?.workCount || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Rating</span>
            <span className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              {gigData?.rating?.toFixed(1) || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Total reviews</span>
            <span>{gigData?.reviewCount || 0}</span>
          </div>
          {gigData?.verified && (
            <div className="flex justify-between">
              <span>Verified</span>
              <span className="text-green-600 font-medium">✓ Yes</span>
            </div>
          )}
        </div>
      </div>

      {/* Availability */}
      <div className="border rounded-xl p-5 text-sm">
        <h3 className="font-semibold mb-2">Availability</h3>
        <div className="flex items-center gap-2 text-green-600 font-medium">
          ● Open to work
        </div>
        {gigData?.location && (
          <div className="mt-2 text-gray-600">{gigData.location}</div>
        )}
      </div>

      {/* Similar Talent */}
      <div className="border rounded-xl p-5 text-sm">
        <h3 className="font-semibold mb-4">
          Similar Talent {gigData?.skillName && `(${gigData.skillName})`}
        </h3>
        {similarGigs.length > 0 ? (
          similarGigs.map((gig) => (
            <div
              key={gig.id}
              onClick={() =>
                router.push(`/page/client/viewprofile?id=${gig.id}`)
              }
              className="flex items-center gap-3 py-3 border-b last:border-0 cursor-pointer hover:bg-gray-50 transition-colors rounded"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                {gig.imageUrl ? (
                  <img
                    src={gig.imageUrl}
                    alt={gig.freelancerName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{gig.freelancerName}</p>
                <p className="text-xs text-gray-600">
                  ${gig.price}/hr
                  {gig.rating && (
                    <>
                      {" · "}
                      <span className="text-yellow-500">★</span>{" "}
                      {gig.rating.toFixed(1)}
                    </>
                  )}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">
            No similar talent found
          </p>
        )}
      </div>
    </div>
  );
}
