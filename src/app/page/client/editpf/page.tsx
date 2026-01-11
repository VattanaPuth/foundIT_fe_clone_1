"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Your imported header/footer (leave as-is)
import ClientNavHeader from "@/app/components/styles/global_styles/client/header";
import ClientFooter from "@/app/components/styles/global_styles/client/footer";
import ProfileEditSectionNav from "@/app/components/styles/client_styles/profile-edit/ProfileEditSectionNav";
import OverviewCard from "@/app/components/styles/client_styles/profile-edit/OverviewCard";
import AboutCard from "@/app/components/styles/client_styles/profile-edit/AboutCard";
import HiringHighlightsCard from "@/app/components/styles/client_styles/profile-edit/HiringHighlightsCard";

import {
  Dropdown,
  DropdownOption,
  FieldLabel,
  TextInput,
  Toggle,
  handleKeyboardActivate,
} from "@/app/components/styles/client_styles/profile-edit/FormControls";

type SectionKey =
  | "overview"
  | "about"
  | "hiring"
  | "jobs"
  | "reviews"
  | "links";

export default function Page() {
  const router = useRouter();

  // ✅ SET THIS NUMBER ONLY (no header edits needed)
  const HEADER_OFFSET = 80; // try 64 / 72 / 80 until perfect
  const STICKY_GAP = 16;
  const TOP_OFFSET = HEADER_OFFSET + STICKY_GAP;

  const sections: { key: SectionKey; label: string }[] = useMemo(
    () => [
      { key: "overview", label: "Overview" },
      { key: "about", label: "About" },
      { key: "hiring", label: "Hiring Highlights" },
      { key: "jobs", label: "Jobs Display" },
      { key: "reviews", label: "Reviews Display" },
      { key: "links", label: "Links" },
    ],
    []
  );

  // Section refs (scroll + scroll-spy)
  const sectionRefs: Record<
    SectionKey,
    React.RefObject<HTMLDivElement | null>
  > = {
    overview: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    hiring: useRef<HTMLDivElement>(null),
    jobs: useRef<HTMLDivElement>(null),
    reviews: useRef<HTMLDivElement>(null),
    links: useRef<HTMLDivElement>(null),
  };

  const [activeSection, setActiveSection] = useState<SectionKey>("overview");

  // Prevent scroll-spy from fighting with click-scroll
  const isProgrammaticScrollRef = useRef(false);
  const programmaticTimerRef = useRef<number | null>(null);

  function scrollToSection(key: SectionKey) {
    setActiveSection(key);

    isProgrammaticScrollRef.current = true;
    if (programmaticTimerRef.current)
      window.clearTimeout(programmaticTimerRef.current);
    programmaticTimerRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 700);

    const el = sectionRefs[key].current;
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - TOP_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  // Mobile nav
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Dropdown open state (shared)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Close dropdown on click outside
  const dropdownBoxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (!openDropdownId) return;
      const target = e.target as Node;
      if (dropdownBoxRef.current && !dropdownBoxRef.current.contains(target)) {
        setOpenDropdownId(null);
      }
    }
    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [openDropdownId]);

  // ESC closes dropdown + mobile drawer
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDropdownId(null);
        setIsMobileNavOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // ✅ Scroll-spy updates active section while scrolling (header-aware)
  useEffect(() => {
    const map = new Map<Element, SectionKey>();
    sections.forEach((s) => {
      const el = sectionRefs[s.key].current;
      if (el) map.set(el, s.key);
    });

    const elements = Array.from(map.keys());
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollRef.current) return;

        let bestKey: SectionKey | null = null;
        let bestRatio = 0;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = map.get(entry.target);
          if (!key) return;

          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestKey = key;
          }
        });

        if (!bestKey) {
          // fallback: closest to top (below header)
          let closestKey: SectionKey | null = null;
          let closestDist = Number.POSITIVE_INFINITY;

          sections.forEach((s) => {
            const el = sectionRefs[s.key].current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const dist = Math.abs(rect.top - TOP_OFFSET);
            if (dist < closestDist) {
              closestDist = dist;
              closestKey = s.key;
            }
          });

          if (closestKey) setActiveSection(closestKey);
          return;
        }

        setActiveSection(bestKey);
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: `-${TOP_OFFSET}px 0px -65% 0px`,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, TOP_OFFSET]);

  // ------- Form state -------
  const placeholderAvatar =
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
  const [avatarUrl, setAvatarUrl] = useState<string | null>(placeholderAvatar);

  const [fullName, setFullName] = useState("");
  const [titleRole, setTitleRole] = useState("");
  const [location, setLocation] = useState("");
  const [allowMessages, setAllowMessages] = useState(true);

  const [shortBio, setShortBio] = useState("");
  const [valuesWhenHiring, setValuesWhenHiring] = useState<string[]>([
    "Clear async updates",
    "Pixel-accurate UI work",
    "Reliable time estimates",
    "Value 4",
  ]);
  const [newValueText, setNewValueText] = useState("");

  const [industries, setIndustries] = useState<string[]>([
    "SaaS",
    "E-commerce",
    "Fintech",
  ]);
  const [newIndustryText, setNewIndustryText] = useState("");

  const allWorkStyles = [
    "Async-first",
    "Daily updates",
    "Sprint reviews",
    "Weekly check-ins",
    "Tight deadlines",
  ];
  const [preferredWorkStyles, setPreferredWorkStyles] = useState<string[]>([
    "Async-first",
    "Daily updates",
  ]);

  const [hireCategories, setHireCategories] = useState<string[]>([
    "Design",
    "Web Development",
    "Video Production",
  ]);
  const [newCategoryText, setNewCategoryText] = useState("");

  const fixedProjectOptions: DropdownOption[] = [
    { label: "$2k–$5k", value: "2-5" },
    { label: "$5k–$10k", value: "5-10" },
    { label: "$10k+", value: "10plus" },
    { label: "Custom", value: "custom" },
  ];
  const hourlyOptions: DropdownOption[] = [
    { label: "$60+", value: "60plus" },
    { label: "$40–$60", value: "40-60" },
    { label: "$20–$40", value: "20-40" },
    { label: "Custom", value: "custom" },
  ];
  const contractLengthOptions: DropdownOption[] = [
    { label: "1–3 months", value: "1-3" },
    { label: "3–6 months", value: "3-6" },
    { label: "6+ months", value: "6plus" },
    { label: "Custom", value: "custom" },
  ];

  const [fixedProjectMedian, setFixedProjectMedian] = useState<DropdownOption>(
    fixedProjectOptions[0]
  );
  const [hourlyMedian, setHourlyMedian] = useState<DropdownOption>(
    hourlyOptions[0]
  );
  const [contractLength, setContractLength] = useState<DropdownOption>(
    contractLengthOptions[0]
  );

  const [fixedProjectCustom, setFixedProjectCustom] = useState("");
  const [hourlyCustom, setHourlyCustom] = useState("");
  const [contractCustom, setContractCustom] = useState("");

  const [showJobs, setShowJobs] = useState(true);
  const defaultSortOptions: DropdownOption[] = [
    { label: "Most recent", value: "recent" },
    { label: "Oldest", value: "oldest" },
  ];
  const defaultFilterOptions: DropdownOption[] = [
    { label: "All categories", value: "all" },
    { label: "Design", value: "design" },
    { label: "Development", value: "dev" },
  ];
  const [defaultSort, setDefaultSort] = useState<DropdownOption>(
    defaultSortOptions[0]
  );
  const [defaultFilter, setDefaultFilter] = useState<DropdownOption>(
    defaultFilterOptions[0]
  );

  // Gig state for displaying posted jobs
  interface Gig {
    id: number;
    title: string;
    description: string;
    category: string;
    type: string;
    payMode: string;
    budgetMin: number;
    budgetMax: number;
    deliveryTime: string;
    postedBy: string;
    createdAt: string;
    isPublic: boolean;
    imageType?: string | null;
    imageData?: string | null;
    referenceFiles?: string | null;
  }

  const [myGigs, setMyGigs] = useState<Gig[]>([]);
  const [isLoadingGigs, setIsLoadingGigs] = useState(false);
  const [editingGigId, setEditingGigId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<{
    title: string;
    description: string;
    category: string;
    type: string;
    payMode: string;
    budgetMin: string;
    budgetMax: string;
    deliveryTime: string;
  } | null>(null);

  // Fetch gigs when component mounts or showJobs changes
  const fetchMyGigs = async () => {
    if (!showJobs) return;

    setIsLoadingGigs(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(
        "http://localhost:8085/gigs/client/my-gigs?page=0&size=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMyGigs(data.content || []);
      } else {
        console.error("Failed to fetch gigs");
      }
    } catch (error) {
      console.error("Error fetching gigs:", error);
    } finally {
      setIsLoadingGigs(false);
    }
  };

  useEffect(() => {
    fetchMyGigs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showJobs]);

  // Handle delete gig
  const handleDeleteGig = async (gigId: number) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await fetch(
        `http://localhost:8085/gigs/client/${gigId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok || response.status === 204) {
        alert("Job deleted successfully!");
        fetchMyGigs(); // Refresh the list
      } else {
        const error = await response.text();
        alert(`Failed to delete job: ${error}`);
      }
    } catch (error) {
      console.error("Error deleting gig:", error);
      alert("An error occurred while deleting the job");
    }
  };

  // Handle start edit
  const handleStartEdit = (gig: Gig) => {
    setEditingGigId(gig.id);
    setEditForm({
      title: gig.title,
      description: gig.description,
      category: gig.category,
      type: gig.type,
      payMode: gig.payMode,
      budgetMin: gig.budgetMin.toString(),
      budgetMax: gig.budgetMax.toString(),
      deliveryTime: gig.deliveryTime,
    });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingGigId(null);
    setEditForm(null);
  };

  // Handle save edit
  const handleSaveEdit = async (gigId: number) => {
    if (!editForm) return;

    // Validation
    if (!editForm.title.trim() || !editForm.description.trim()) {
      alert("Title and description are required");
      return;
    }
    if (!editForm.budgetMin || !editForm.budgetMax) {
      alert("Budget range is required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      const gigDTO = {
        title: editForm.title,
        description: editForm.description,
        category: editForm.category,
        type: editForm.type,
        payMode: editForm.payMode,
        budgetMin: parseFloat(editForm.budgetMin),
        budgetMax: parseFloat(editForm.budgetMax),
        deliveryTime: editForm.deliveryTime,
        imageType: null,
        imageData: null,
      };

      const response = await fetch(
        `http://localhost:8085/gigs/client/${gigId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(gigDTO),
        }
      );

      if (response.ok) {
        alert("Job updated successfully!");
        setEditingGigId(null);
        setEditForm(null);
        fetchMyGigs(); // Refresh the list
      } else {
        const error = await response.text();
        alert(`Failed to update job: ${error}`);
      }
    } catch (error) {
      console.error("Error updating gig:", error);
      alert("An error occurred while updating the job");
    }
  };

  const [showReviews, setShowReviews] = useState(true);

  const featuredLinkOptions: DropdownOption[] = [
    { label: "Website", value: "website" },
    { label: "LinkedIn", value: "linkedin" },
    { label: "X/Twitter", value: "x" },
  ];
  const [featuredLink, setFeaturedLink] = useState<DropdownOption>(
    featuredLinkOptions[0]
  );

  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [xTwitter, setXTwitter] = useState("");

  function toggleDropdown(id: string) {
    setOpenDropdownId(openDropdownId === id ? null : id);
  }

  return (
    <div className="min-h-screen bg-gray-50" ref={dropdownBoxRef}>
      {/* Imported header (no edits needed) */}
      <ClientNavHeader />

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Back + title */}
        <div className="mb-6">
          <div
            role="button"
            tabIndex={0}
            aria-label="Back"
            onClick={() => router.back()}
            onKeyDown={(e) => handleKeyboardActivate(e, () => router.back())}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer select-none"
          >
            <span>←</span>
            <span>Back</span>
          </div>

          <div className="mt-4 text-2xl font-semibold text-gray-900">
            Edit Client Profile
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_220px] gap-6 lg:items-start">
          {/* Left nav (sticky offset below header) */}
          <ProfileEditSectionNav
            sections={sections}
            activeSection={activeSection}
            isMobileOpen={isMobileNavOpen}
            onOpenMobile={() => setIsMobileNavOpen(true)}
            onCloseMobile={() => setIsMobileNavOpen(false)}
            onGoToSection={(k) => scrollToSection(k)}
            topOffset={TOP_OFFSET}
          />

          {/* Center content */}
          <div className="space-y-6">
            <OverviewCard
              sectionRef={sectionRefs.overview}
              avatarUrl={avatarUrl}
              onUpload={() => {
                // placeholder
              }}
              onDeleteAvatar={() => setAvatarUrl(null)}
              fullName={fullName}
              setFullName={setFullName}
              titleRole={titleRole}
              setTitleRole={setTitleRole}
              location={location}
              setLocation={setLocation}
              allowMessages={allowMessages}
              setAllowMessages={setAllowMessages}
            />

            <AboutCard
              sectionRef={sectionRefs.about}
              shortBio={shortBio}
              setShortBio={setShortBio}
              valuesWhenHiring={valuesWhenHiring}
              setValuesWhenHiring={setValuesWhenHiring}
              newValueText={newValueText}
              setNewValueText={setNewValueText}
              industries={industries}
              setIndustries={setIndustries}
              newIndustryText={newIndustryText}
              setNewIndustryText={setNewIndustryText}
              allWorkStyles={allWorkStyles}
              preferredWorkStyles={preferredWorkStyles}
              setPreferredWorkStyles={setPreferredWorkStyles}
            />

            <HiringHighlightsCard
              sectionRef={sectionRefs.hiring}
              hireCategories={hireCategories}
              setHireCategories={setHireCategories}
              newCategoryText={newCategoryText}
              setNewCategoryText={setNewCategoryText}
              openDropdownId={openDropdownId}
              setOpenDropdownId={setOpenDropdownId}
              fixedProjectMedian={fixedProjectMedian}
              setFixedProjectMedian={setFixedProjectMedian}
              fixedProjectOptions={fixedProjectOptions}
              fixedProjectCustom={fixedProjectCustom}
              setFixedProjectCustom={setFixedProjectCustom}
              hourlyMedian={hourlyMedian}
              setHourlyMedian={setHourlyMedian}
              hourlyOptions={hourlyOptions}
              hourlyCustom={hourlyCustom}
              setHourlyCustom={setHourlyCustom}
              contractLength={contractLength}
              setContractLength={setContractLength}
              contractLengthOptions={contractLengthOptions}
              contractCustom={contractCustom}
              setContractCustom={setContractCustom}
            />

            {/* Jobs Display */}
            <section ref={sectionRefs.jobs}>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
                <div className="font-semibold text-gray-900">Jobs display</div>

                <div className="mt-4 space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-700">
                        Show active jobs on profile
                      </div>
                      <div className="text-xs text-gray-500">
                        Visitors can see your open positions
                      </div>
                    </div>
                    <Toggle
                      checked={showJobs}
                      onChange={setShowJobs}
                      ariaLabel="Show active jobs"
                    />
                  </div>

                  <Dropdown
                    id="defaultSort"
                    label="Default sort"
                    value={defaultSort}
                    options={defaultSortOptions}
                    isOpen={openDropdownId === "defaultSort"}
                    onToggle={toggleDropdown}
                    onSelect={(opt) => {
                      setDefaultSort(opt);
                      setOpenDropdownId(null);
                    }}
                  />

                  <Dropdown
                    id="defaultFilter"
                    label="Default filter (optional)"
                    value={defaultFilter}
                    options={defaultFilterOptions}
                    isOpen={openDropdownId === "defaultFilter"}
                    onToggle={toggleDropdown}
                    onSelect={(opt) => {
                      setDefaultFilter(opt);
                      setOpenDropdownId(null);
                    }}
                  />

                  {/* Display Posted Gigs */}
                  {showJobs && (
                    <div className="mt-5 pt-5 border-t border-gray-200">
                      <div className="text-sm font-medium text-gray-700 mb-3">
                        Your Posted Jobs ({myGigs.length})
                      </div>

                      {isLoadingGigs ? (
                        <div className="text-sm text-gray-500 py-4">
                          Loading jobs...
                        </div>
                      ) : myGigs.length === 0 ? (
                        <div className="text-sm text-gray-500 py-4">
                          No jobs posted yet. Click "Post a Job" to create one!
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {myGigs.map((gig) => (
                            <div
                              key={gig.id}
                              className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                            >
                              {editingGigId === gig.id && editForm ? (
                                // Edit mode
                                <div className="space-y-3">
                                  <div>
                                    <label className="text-xs font-medium text-gray-700">
                                      Title
                                    </label>
                                    <input
                                      type="text"
                                      value={editForm.title}
                                      onChange={(e) =>
                                        setEditForm({
                                          ...editForm,
                                          title: e.target.value,
                                        })
                                      }
                                      className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs font-medium text-gray-700">
                                      Description
                                    </label>
                                    <textarea
                                      value={editForm.description}
                                      onChange={(e) =>
                                        setEditForm({
                                          ...editForm,
                                          description: e.target.value,
                                        })
                                      }
                                      rows={3}
                                      className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="text-xs font-medium text-gray-700">
                                        Min Budget ($)
                                      </label>
                                      <input
                                        type="number"
                                        value={editForm.budgetMin}
                                        onChange={(e) =>
                                          setEditForm({
                                            ...editForm,
                                            budgetMin: e.target.value,
                                          })
                                        }
                                        className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-xs font-medium text-gray-700">
                                        Max Budget ($)
                                      </label>
                                      <input
                                        type="number"
                                        value={editForm.budgetMax}
                                        onChange={(e) =>
                                          setEditForm({
                                            ...editForm,
                                            budgetMax: e.target.value,
                                          })
                                        }
                                        className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-end gap-2">
                                    <button
                                      onClick={handleCancelEdit}
                                      className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => handleSaveEdit(gig.id)}
                                      className="px-3 py-1.5 text-xs font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                                    >
                                      Save Changes
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                // View mode
                                <div className="flex items-start justify-between gap-3">
                                  {/* Image preview if available */}
                                  {gig.imageData && gig.imageType && (
                                    <div className="flex-shrink-0">
                                      <img
                                        src={`data:${gig.imageType};base64,${gig.imageData}`}
                                        alt={gig.title}
                                        className="w-20 h-20 object-cover rounded-md border border-gray-200"
                                      />
                                    </div>
                                  )}

                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate">
                                      {gig.title}
                                    </h3>
                                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                      {gig.description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                                      <span className="px-2 py-0.5 bg-white border border-gray-200 rounded">
                                        {gig.category}
                                      </span>
                                      <span className="px-2 py-0.5 bg-white border border-gray-200 rounded">
                                        {gig.type}
                                      </span>
                                      <span className="font-medium text-green-600">
                                        ${gig.budgetMin} - ${gig.budgetMax}
                                      </span>
                                      <span>•</span>
                                      <span>{gig.deliveryTime}</span>
                                      <span>•</span>
                                      <span className="text-green-600">
                                        {gig.isPublic ? "Public" : "Private"}
                                      </span>
                                      {gig.referenceFiles &&
                                        (() => {
                                          try {
                                            const files = JSON.parse(
                                              gig.referenceFiles
                                            );
                                            if (files.length > 0) {
                                              return (
                                                <>
                                                  <span>•</span>
                                                  <span className="text-blue-600">
                                                    📎 {files.length} file
                                                    {files.length > 1
                                                      ? "s"
                                                      : ""}
                                                  </span>
                                                </>
                                              );
                                            }
                                          } catch (e) {
                                            return null;
                                          }
                                        })()}
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleStartEdit(gig)}
                                      className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
                                      title="Edit job"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteGig(gig.id)}
                                      className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100"
                                      title="Delete job"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Reviews Display */}
            <section ref={sectionRefs.reviews}>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
                <div className="font-semibold text-gray-900">
                  Reviews display
                </div>

                <div className="mt-4 space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-700">
                        Show reviews you&apos;ve received
                      </div>
                      <div className="text-xs text-gray-500">
                        Display feedback from freelancers
                      </div>
                    </div>
                    <Toggle
                      checked={showReviews}
                      onChange={setShowReviews}
                      ariaLabel="Show reviews"
                    />
                  </div>

                  <Dropdown
                    id="reviewsSort"
                    label="Default sort"
                    value={defaultSort}
                    options={defaultSortOptions}
                    isOpen={openDropdownId === "reviewsSort"}
                    onToggle={toggleDropdown}
                    onSelect={(opt) => {
                      setDefaultSort(opt);
                      setOpenDropdownId(null);
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Links */}
            <section ref={sectionRefs.links}>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
                <div className="font-semibold text-gray-900">
                  Links &amp; presence
                </div>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <FieldLabel text="Website/Portfolio" />
                    <TextInput
                      value={website}
                      onChange={setWebsite}
                      ariaLabel="Website"
                      placeholder="https://techflow.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <FieldLabel text="LinkedIn" />
                    <TextInput
                      value={linkedin}
                      onChange={setLinkedin}
                      ariaLabel="LinkedIn"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>

                  <div className="space-y-2">
                    <FieldLabel text="X/Twitter (optional)" />
                    <TextInput
                      value={xTwitter}
                      onChange={setXTwitter}
                      ariaLabel="X/Twitter"
                      placeholder="https://x.com/yourhandle"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Bottom actions placeholder */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <div
                role="button"
                tabIndex={0}
                aria-label="Exit"
                onClick={() => {}}
                onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
                className="h-9 px-4 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-sm cursor-pointer select-none flex items-center"
              >
                Exit
              </div>

              <div
                role="button"
                tabIndex={0}
                aria-label="Publish"
                onClick={() => {}}
                onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
                className="h-9 px-4 rounded-md bg-green-500 hover:bg-green-600 text-white text-sm cursor-pointer select-none flex items-center"
              >
                Publish
              </div>
            </div>
          </div>

          {/* Right help (sticky offset below header) */}
          <aside className="hidden lg:block">
            <div
              className="sticky bg-white border border-gray-200 rounded-xl shadow-sm p-4"
              style={{ top: TOP_OFFSET }}
            >
              <div className="font-semibold text-gray-900">Section help</div>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <div className="text-green-600 mt-0.5">✓</div>
                  <div>Use a clear professional photo</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-green-600 mt-0.5">✓</div>
                  <div>Keep title under 60 characters</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-green-600 mt-0.5">✓</div>
                  <div>Location determines timezone</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Imported footer (no edits needed) */}
      <ClientFooter />
    </div>
  );
}
