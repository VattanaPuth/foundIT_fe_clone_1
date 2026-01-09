"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import ProfileHeader from "@/app/components/styles/seller/profile/ProfileHeader";
import ProfileTabs, { type ProfileTabKey } from "@/app/components/styles/seller/profile/ProfileTabs";
import OverviewTab from "@/app/components/styles/seller/profile/tabs/overview";
import ProductsTab from "@/app/components/styles/seller/profile/tabs/products";
import ReviewsTab from "@/app/components/styles/seller/profile/tabs/review";
import AboutTab from "@/app/components/styles/seller/profile/tabs/about";

export default function SellerProfilePage() {
  const router = useRouter();
  const [tab, setTab] = useState<ProfileTabKey>("overview");

  return (
    <main className="bg-gray-50">
      <section className="mx-auto w-full  px-4 py-6">
        <ProfileHeader
          onEditProfile={() => router.push("/page/seller/profile/editprofile")}
        />

        <div className="mt-5">
          <ProfileTabs value={tab} onChange={setTab} />
        </div>

        <div className="mt-5">
          {tab === "overview" && (
            <OverviewTab
              onViewAllProducts={() => router.push("/page/seller/home/myproduct")}
            />
          )}

          {tab === "products" && <ProductsTab />}

          {tab === "reviews" && <ReviewsTab />}

          {tab === "about" && <AboutTab />}
        </div>
      </section>
    </main>
  );
}
