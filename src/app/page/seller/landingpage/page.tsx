"use client";

import React, { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import ProjectCard, {
  type ProjectItem,
} from "@/app/components/styles/client_styles/fav/ProjectCard";
import SellerHero from "@/app/components/styles/seller/landingpage/SellerHero";
import SortDropdown from "@/app/components/styles/seller/landingpage/SortDropdown";
import FiltersPanel, {
  type AccKey,
} from "@/app/components/styles/seller/landingpage/FiltersPanel";
import MobileFiltersDrawer from "@/app/components/styles/seller/landingpage/MobileFiltersDrawer";
import Footer from "@/app/components/styles/landingpage_styles/footer";
import BrowsingHistoryCard from "@/app/components/styles/seller/landingpage/BrowsingHistoryStrip";


export default function SellerPage() {
  // ---- hero
  const [heroQuery, setHeroQuery] = useState("");
  const topChips = useMemo(
    () => [
      "All",
      "UI Kits",
      "Web Templates",
      "Code Starters",
      "Plugins",
      "AI Prompts",
      "Video Packs",
      "Brand Packs",
      "Illustrations",
      "Docs & Policies",
      "More",
    ],
    []
  );
  const [activeTopChip, setActiveTopChip] = useState<string>("All");

  const subChips = useMemo(
    () => ["Featured", "Best Sellers", "Trending", "New"],
    []
  );
  const [activeSubChip, setActiveSubChip] = useState<string>("Featured");

  // ---- sort
  const sortOptions = useMemo(
    () => ["Best Match", "Newest", "Price: Low to High", "Price: High to Low"],
    []
  );
  const [sortValue, setSortValue] = useState<string>("Best Match");

  // ---- mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ---- accordions (default open only: category, price, platform)
  const [accOpen, setAccOpen] = useState<Record<AccKey, boolean>>({
    category: true,
    price: true,
    platform: true,
    fileTypes: false,
    license: false,
    rating: false,
    seller: false,
    updated: false,
  });

  // ---- filter states (static UI)
  const categories = useMemo(
    () => [
      { label: "UI Kits", count: 1248 },
      { label: "Web Templates", count: 2156 },
      { label: "Code Starters", count: 632 },
      { label: "Plugins", count: 197 },
      { label: "AI Prompts", count: 84 },
      { label: "Video Packs", count: 124 },
      { label: "Brand Packs", count: 58 },
      { label: "Illustrations", count: 342 },
      { label: "Docs & Policies", count: 45 },
      { label: "Other", count: 19 },
    ],
    []
  );
  const [catValue, setCatValue] = useState<string>("All");

  const platforms = useMemo(
    () => [
      "React",
      "Vue",
      "Angular",
      "WordPress",
      "Shopify",
      "Figma",
      "Framer",
      "Unity",
      "Unreal Engine",
    ],
    []
  );
  const [platformChecks, setPlatformChecks] = useState<Record<string, boolean>>(
    () => Object.fromEntries(platforms.map((p) => [p, false]))
  );

  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(500);

  const fileTypes = useMemo(
    () => [
      "Figma",
      "Sketch",
      "XD",
      "PSD",
      "AI",
      "MP4",
      "AEP",
      "ZIP",
      "JS/TSX",
      "Vue",
      "PHP",
      "HTML/CSS",
    ],
    []
  );
  const [fileTypeChecks, setFileTypeChecks] = useState<Record<string, boolean>>(
    () => Object.fromEntries(fileTypes.map((t) => [t, false]))
  );

  const [licenseType, setLicenseType] = useState<
    "Personal" | "Commercial" | "Extended"
  >("Personal");

  const [minRating, setMinRating] = useState<"4.5+" | "4+" | "3.5+" | "3+">(
    "4+"
  );
  const [verifiedSellersOnly, setVerifiedSellersOnly] = useState(false);

  const [updatedWithin, setUpdatedWithin] = useState<
    "Last 7 days" | "Last 30 days" | "Last 3 months" | "Last year"
  >("Last 30 days");

  // ---- products (matches ProjectItem)
  const products: ProjectItem[] = useMemo(
    () => [
      {
        id: "p1",
        title: "Modern Dashboard UI Kit",
        subtitle: "React • TypeScript • Tailwind CSS",
        seller: "Sarah Chen",
        priceFrom: "$49",
        rating: "4.9",
        reviews: "2,341",
        badges: ["Bestseller", "Featured"],
        updated: "Updated 2 days ago",
        coverTone: "orange",
        imageSrc: "/images/p2.png"
        
      },
      {
        id: "p2",
        title: "Next.js SaaS Starter Template",
        subtitle: "Next.js • SaaS Boilerplate",
        seller: "Marcus Dev",
        priceFrom: "$99",
        rating: "4.8",
        reviews: "1,507",
        badges: ["Trending"],
        updated: "Updated 1 week ago",
        coverTone: "dark",
        imageSrc: "/images/p1.png",
      },
      {
        id: "p3",
        title: "Figma Design System Pro",
        subtitle: "Figma • Design Tokens",
        seller: "Sarah Chen",
        priceFrom: "$79",
        rating: "4.9",
        reviews: "3,264",
        badges: ["Bestseller", "New"],
        updated: "Updated 3 days ago",
        coverTone: "light",
        imageSrc:"/images/p3.png",
      },
      {
        id: "p4",
        title: "ChatGPT Prompt Engineering Pack",
        subtitle: "Prompts • Templates • Systems",
        seller: "Cory Patel",
        priceFrom: "$29",
        rating: "4.7",
        reviews: "982",
        badges: ["Trending"],
        updated: "Updated 5 days ago",
        coverTone: "light",
        imageSrc:"/images/p4.png",
      },
      {
        id: "p5",
        title: "Motion Graphics Video Pack",
        subtitle: "Premiere • After Effects",
        seller: "Motion Sage",
        priceFrom: "$59",
        rating: "4.6",
        reviews: "634",
        badges: ["New"],
        updated: "Updated 1 day ago",
        coverTone: "brown",
        imageSrc:"/images/p5.png",
      },
      {
        id: "p6",
        title: "Complete Brand Identity Kit",
        subtitle: "Logo • Colors • Guidelines",
        seller: "Konic Studio",
        priceFrom: "$89",
        rating: "4.8",
        reviews: "1,234",
        badges: ["Featured"],
        updated: "Updated 4 days ago",
        coverTone: "orange",
        imageSrc:"/images/p6.png",
      },
    ],
    []
  );

  function toggleAcc(key: AccKey) {
    setAccOpen((p) => ({ ...p, [key]: !p[key] }));
  }

  function resetFilters() {
    setCatValue("All");
    setPriceMin(0);
    setPriceMax(500);

    setPlatformChecks(Object.fromEntries(platforms.map((p) => [p, false])));
    setFileTypeChecks(Object.fromEntries(fileTypes.map((t) => [t, false])));
    setLicenseType("Personal");
    setMinRating("4+");
    setVerifiedSellersOnly(false);
    setUpdatedWithin("Last 30 days");
  }

  return (
    <>
    <main className="bg-gray-50">
      <SellerHero
        heroQuery={heroQuery}
        onChangeHeroQuery={setHeroQuery}
        topChips={topChips}
        activeTopChip={activeTopChip}
        onPickTopChip={setActiveTopChip}
        subChips={subChips}
        activeSubChip={activeSubChip}
        onPickSubChip={setActiveSubChip}
      />

      <section className="mx-auto w-full  px-4 py-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setDrawerOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setDrawerOpen(true);
                }
              }}
              className="md:hidden inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs text-gray-800
                         shadow-sm hover:bg-gray-50 cursor-pointer select-none"
              aria-label="Open filters"
            >
              <SlidersHorizontal className="h-4 w-4 text-orange-500" />
              Filters
            </div>

            <div className="text-xs text-gray-500">
              {products.length} products
            </div>
          </div>

          <SortDropdown
            value={sortValue}
            options={sortOptions}
            onChange={setSortValue}
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[260px_1fr]">
          {/* Desktop Filters */}
          <aside className="hidden md:block">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-gray-900">
                  Filters
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={resetFilters}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      resetFilters();
                    }
                  }}
                  className="text-xs text-orange-600 hover:text-orange-700 cursor-pointer select-none"
                  aria-label="Clear filters"
                >
                  Clear all
                </div>
              </div>

              <div className="mt-4">
                <FiltersPanel
                  accOpen={accOpen}
                  onToggleAcc={toggleAcc}
                  categories={categories}
                  catValue={catValue}
                  setCatValue={setCatValue}
                  priceMin={priceMin}
                  priceMax={priceMax}
                  setPriceMin={setPriceMin}
                  setPriceMax={setPriceMax}
                  platforms={platforms}
                  platformChecks={platformChecks}
                  setPlatformChecks={setPlatformChecks}
                  fileTypes={fileTypes}
                  fileTypeChecks={fileTypeChecks}
                  setFileTypeChecks={setFileTypeChecks}
                  licenseType={licenseType}
                  setLicenseType={setLicenseType}
                  minRating={minRating}
                  setMinRating={setMinRating}
                  verifiedSellersOnly={verifiedSellersOnly}
                  setVerifiedSellersOnly={setVerifiedSellersOnly}
                  updatedWithin={updatedWithin}
                  setUpdatedWithin={setUpdatedWithin}
                />
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <div key={p.id}>
                  <ProjectCard
                    item={p}
                    onOpen={(id: string) => {
                      // later: router.push(`/seller/product/${id}`);
                      console.log("open", id);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MobileFiltersDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onClear={resetFilters}
        onApply={() => setDrawerOpen(false)}
      >
        <FiltersPanel
          accOpen={accOpen}
          onToggleAcc={toggleAcc}
          categories={categories}
          catValue={catValue}
          setCatValue={setCatValue}
          priceMin={priceMin}
          priceMax={priceMax}
          setPriceMin={setPriceMin}
          setPriceMax={setPriceMax}
          platforms={platforms}
          platformChecks={platformChecks}
          setPlatformChecks={setPlatformChecks}
          fileTypes={fileTypes}
          fileTypeChecks={fileTypeChecks}
          setFileTypeChecks={setFileTypeChecks}
          licenseType={licenseType}
          setLicenseType={setLicenseType}
          minRating={minRating}
          setMinRating={setMinRating}
          verifiedSellersOnly={verifiedSellersOnly}
          setVerifiedSellersOnly={setVerifiedSellersOnly}
          updatedWithin={updatedWithin}
          setUpdatedWithin={setUpdatedWithin}
        />
      </MobileFiltersDrawer>
    </main>
    <BrowsingHistoryCard/>
    <Footer/>
    </>
  );
}
