"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import ProfileHeader from "@/app/components/styles/freelancer_styles/freelanceprofile/ProfileHeader";
import OverviewSection from "@/app/components/styles/freelancer_styles/freelancerpf/OverviewSection";
import JobsSection from "@/app/components/styles/freelancer_styles/freelancerpf/JobsSection";
import ReviewsSection from "@/app/components/styles/freelancer_styles/freelancerpf/ReviewsSection";
import Sidebar from "@/app/components/styles/freelancer_styles/freelanceprofile/Sidebar";
import ClientNavHeader from "@/app/components/styles/global_styles/client/header";
import ClientFooter from "@/app/components/styles/client_styles/setting/setting_footer";

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

export default function ClientProfilePage() {
  const [activeTab, setActiveTab] = useState<"Overview" | "Jobs" | "Reviews">(
    "Overview"
  );
  const [gigData, setGigData] = useState<GigData | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const gigId = searchParams.get("id");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!gigId) {
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        let endpoint: string;
        let numericId: string;
        if (gigId.startsWith("fl-")) {
          numericId = gigId.replace("fl-", "");
        } else {
          numericId = gigId;
        }
        endpoint = `http://localhost:8085/gigs/freelancer/${numericId}/client-view`;
        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setGigData(data);
        } else {
          setGigData(null);
        }
      } catch (error) {
        setGigData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [gigId]);

  const handleHire = () => {
    if (!gigData) return;
    const freelancerData = {
      id: gigData.freelancerId || gigData.id,
      gigId: gigData.id,
      name: gigData.freelancerName,
      title: gigData.skillName || "Freelancer",
      rating: gigData.rating || 0,
      reviewCount: gigData.reviewCount || 0,
      hourlyRate: gigData.price || 0,
      avatarUrl: gigData.imageUrl,
    };
    router.push(
      `/page/client/milestone?freelancer=${encodeURIComponent(
        JSON.stringify(freelancerData)
      )}`
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading profile...</div>
      </div>
    );
  }

  if (!gigData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-lg">Profile not found</div>
      </div>
    );
  }

  return (
    <>
      <ClientNavHeader />
      <main className="flex-1 w-full mx-auto pl-12 pr-12 pt-8">
        <ProfileHeader gigData={gigData} onHire={handleHire} />

        {/* Tabs */}
        <div className="border-b flex gap-8 text-sm font-medium pt-8">
          {["Overview", "Jobs", "Reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 border-b-2 transition capitalize ${
                activeTab === tab
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content GRID */}
        <section className="mt-8 grid grid-cols-12 gap-8">
          {activeTab === "Overview" && <OverviewSection gigData={gigData} />}
          {activeTab === "Jobs" && <JobsSection gigData={gigData} />}
          {activeTab === "Reviews" && <ReviewsSection gigData={gigData} />}
          {/* Right Sidebar: Always visible */}
          <aside className="col-span-12 lg:col-span-4">
            <Sidebar gigData={gigData} />
          </aside>
        </section>
      </main>

      <ClientFooter />
    </>
  );
}
