"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  User,
  Store,
  Sparkles,
  Link2,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

import EditProfileHeader from "@/app/components/styles/seller/profile/editpf/header";
import SectionSidebar, {
  type SectionItem,
  type SectionKey,
} from "@/app/components/styles/seller/profile/editpf/sidebar";
import MobileSectionsDrawer from "@/app/components/styles/seller/profile/editpf/drawer";
import SectionCard from "@/app/components/styles/seller/profile/editpf/card";
import TagInput from "@/app/components/styles/seller/profile/editpf/input";
import TimezoneSelect from "@/app/components/styles/seller/profile/editpf/timezone";
import ToggleRow from "@/app/components/styles/seller/profile/editpf/toggle";
import { handleKeyboardActivate } from "@/app/components/styles/seller/profile/editpf/utils";

const HEADER_OFFSET = 80; // ONLY CHANGE THIS if alignment is off (try 72 / 80 / 88)
const STICKY_GAP = 16;
const TOP_OFFSET = HEADER_OFFSET + STICKY_GAP;



export default function EditSellerProfilePage() {
  const router = useRouter();

  const sections: SectionItem[] = useMemo(
    () => [
      {
        key: "basic",
        label: "Basic Information",
        icon: <User className="h-4 w-4" />,
      },
      {
        key: "store",
        label: "Store Settings",
        icon: <Store className="h-4 w-4" />,
      },
      {
        key: "specialties",
        label: "Specialties & Expertise",
        icon: <Sparkles className="h-4 w-4" />,
      },
      {
        key: "social",
        label: "Social Links",
        icon: <Link2 className="h-4 w-4" />,
      },
      {
        key: "policies",
        label: "Store Policies",
        icon: <ShieldCheck className="h-4 w-4" />,
      },
      {
        key: "display",
        label: "Display Settings",
        icon: <SlidersHorizontal className="h-4 w-4" />,
      },
    ],
    []
  );

  const [active, setActive] = useState<SectionKey>("basic");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ✅ prevent scroll-spy from fighting click-scroll
  const isProgrammaticScrollRef = useRef(false);
  const programmaticTimerRef = useRef<number | null>(null);

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    isProgrammaticScrollRef.current = true;
    if (programmaticTimerRef.current)
      window.clearTimeout(programmaticTimerRef.current);
    programmaticTimerRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 700);

    const y = el.getBoundingClientRect().top + window.scrollY - TOP_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  // ✅ scroll-spy highlight (friend-style)
  useEffect(() => {
    const idToKey: Record<string, SectionKey> = {
      "sec-basic": "basic",
      "sec-store": "store",
      "sec-specialties": "specialties",
      "sec-social": "social",
      "sec-policies": "policies",
      "sec-display": "display",
    };

    const map = new Map<Element, SectionKey>();
    Object.keys(idToKey).forEach((id) => {
      const el = document.getElementById(id);
      if (el) map.set(el, idToKey[id]);
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

          elements.forEach((el) => {
            const rect = (el as HTMLElement).getBoundingClientRect();
            const dist = Math.abs(rect.top - TOP_OFFSET);
            if (dist < closestDist) {
              closestDist = dist;
              closestKey = map.get(el) ?? null;
            }
          });

          if (closestKey) setActive(closestKey);
          return;
        }

        setActive(bestKey);
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
  }, []);

  function pickSection(k: SectionKey) {
    setActive(k);
    setDrawerOpen(false);

    const map: Record<SectionKey, string> = {
      basic: "sec-basic",
      store: "sec-store",
      specialties: "sec-specialties",
      social: "sec-social",
      policies: "sec-policies",
      display: "sec-display",
    };

    scrollToId(map[k]);
  }

  // Basic info
  const [avatarSrc, setAvatarSrc] = useState<string | null>(
    "/seller/avatar.png"
  );
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [about, setAbout] = useState("");

  // Store settings
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("Central (CST/CDT)");
  const timezones = [
    "Central (CST/CDT)",
    "Pacific (PST/PDT)",
    "Mountain (MST/MDT)",
    "Eastern (EST/EDT)",
    "UTC",
  ];

  // Tags
  const [specialties, setSpecialties] = useState<string[]>([
    "UI Kits",
    "Design Systems",
    "Figma Templates",
  ]);
  const [software, setSoftware] = useState<string[]>([
    "Figma",
    "Sketch",
    "Adobe XD",
    "Framer",
  ]);

  // Social
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [policyNotes, setPolicyNotes] = useState("");

  // Display toggles
  const [showSalesCount, setShowSalesCount] = useState(true);
  const [showRevenue, setShowRevenue] = useState(false);
  const [showReviews, setShowReviews] = useState(true);
  const [showBadges, setShowBadges] = useState(true);
  const [showFollowers, setShowFollowers] = useState(true);
  const [allowMessages, setAllowMessages] = useState(true);

  function onUploadFile(file: File | null) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarSrc(url);
  }

  return (
    <main className="bg-gray-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <EditProfileHeader
          title="Edit Seller Profile"
          subtitle="Update your store information"
          onBack={() => router.push("/page/seller/profile")}
        />

        <MobileSectionsDrawer
          open={drawerOpen}
          onOpen={() => setDrawerOpen(true)}
          onClose={() => setDrawerOpen(false)}
          items={sections}
          active={active}
          onPick={pickSection}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
          <SectionSidebar
            items={sections}
            active={active}
            onPick={pickSection}
          />

          <div className="space-y-5">
            {/* Basic Information */}
            <SectionCard
              id="sec-basic"
              title="Basic Information"
              subtitle="Your shop’s core details and public appearance"
              icon={<User className="h-4 w-4 text-orange-500" />}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                    {avatarSrc ? (
                      <img
                        src={avatarSrc}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-xs font-medium text-gray-500 whitespace-nowrap">
                        Profile
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Upload (static picker) */}
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) =>
                          onUploadFile(e.target.files?.[0] ?? null)
                        }
                        aria-label="Upload profile image"
                      />
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => {}}
                        onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
                        className="h-9 px-4 rounded-md border border-gray-200 bg-white text-xs text-gray-800
                                   hover:bg-gray-50 cursor-pointer select-none flex items-center justify-center"
                        aria-label="Upload new image"
                      >
                        <div className="flex items-center gap-1">
                          <Upload className="h-4 w-4 text-gray-600" />
                          <span>Upload New</span>
                        </div>
                      </div>
                    </div>

                    {/* Remove works */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setAvatarSrc(null)}
                      onKeyDown={(e) =>
                        handleKeyboardActivate(e, () => setAvatarSrc(null))
                      }
                      className="h-9 px-4 rounded-md border border-gray-200 bg-white text-sm text-gray-800
                                 hover:bg-gray-50 cursor-pointer select-none flex items-center justify-center"
                      aria-label="Remove image"
                    >
                      Remove
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-medium text-gray-700">Name</div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full h-10 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900
                               outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                    aria-label="Name"
                    placeholder="Mash Wiki"
                  />
                </div>

                <div>
                  <div className="text-xs font-medium text-gray-700">
                    Tagline
                  </div>
                  <input
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="mt-2 w-full h-10 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900
                               outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                    aria-label="Tagline"
                    placeholder="Premium UI Kits & Design Systems"
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs font-medium text-gray-700">
                  About Your Store
                </div>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell buyers about your shop, your experience, and what makes your products special."
                  className="mt-2 w-full min-h-[110px] rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900
             outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 placeholder:text-gray-400"
                  aria-label="About your store"
                />
              </div>
            </SectionCard>

            {/* Store Settings */}
            <SectionCard
              id="sec-store"
              title="Store Settings"
              subtitle="Location and availability information"
              icon={<Store className="h-4 w-4 text-orange-500" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-medium text-gray-700">
                    Location
                  </div>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-2 w-full h-10 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900
                               outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                    aria-label="Location"
                      placeholder="Austin, TX"
                  />
                </div>

                <TimezoneSelect
                  value={timezone}
                  onChange={setTimezone}
                  options={timezones}
                />
              </div>
            </SectionCard>

            {/* Specialties & Expertise */}
            <SectionCard
              id="sec-specialties"
              title="Specialties & Expertise"
              subtitle="What you specialize in and tools you use"
              icon={<Sparkles className="h-4 w-4 text-orange-500" />}
            >
              <div className="space-y-6">
                <TagInput
                  label="Specialties"
                  placeholder="e.g. UI Kits, Design Systems..."
                  value={specialties}
                  onChange={setSpecialties}
                  max={10}
                />

                <TagInput
                  label="Software Expertise"
                  placeholder="e.g. Figma, Photoshop..."
                  value={software}
                  onChange={setSoftware}
                  max={10}
                />
              </div>
            </SectionCard>

            {/* Social Links */}
            <SectionCard
              id="sec-social"
              title="Social Links"
              subtitle="Connect your social media and portfolio"
              icon={<Link2 className="h-4 w-4 text-orange-500" />}
            >
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center text-gray-500">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_2381_12973)">
                          <path
                            d="M7.9987 14.6654C11.6806 14.6654 14.6654 11.6806 14.6654 7.9987C14.6654 4.3168 11.6806 1.33203 7.9987 1.33203C4.3168 1.33203 1.33203 4.3168 1.33203 7.9987C1.33203 11.6806 4.3168 14.6654 7.9987 14.6654Z"
                            stroke="#1A1A1A"
                            stroke-width="1.33333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.9987 1.33203C6.28685 3.12947 5.33203 5.51652 5.33203 7.9987C5.33203 10.4809 6.28685 12.8679 7.9987 14.6654C9.71054 12.8679 10.6654 10.4809 10.6654 7.9987C10.6654 5.51652 9.71054 3.12947 7.9987 1.33203Z"
                            stroke="#1A1A1A"
                            stroke-width="1.33333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M1.33203 8H14.6654"
                            stroke="#1A1A1A"
                            stroke-width="1.33333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2381_12973">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>

                    <div className="text-xs font-medium text-gray-700">
                      Website
                    </div>
                  </div>
                  <input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="mt-2 w-full h-10 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900
                               outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                    aria-label="Website"
                    placeholder="https://pixelcraft.studio"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center text-gray-500">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_2381_12982)">
                          <path
                            d="M14.6654 2.66538C14.6654 2.66538 14.1987 4.06538 13.332 4.93205C14.3987 11.5987 7.06536 16.4654 1.33203 12.6654C2.7987 12.732 4.26536 12.2654 5.33203 11.332C1.9987 10.332 0.332031 6.39871 1.9987 3.33205C3.46536 5.06538 5.73203 6.06538 7.9987 5.99871C7.3987 3.19871 10.6654 1.59871 12.6654 3.46538C13.3987 3.46538 14.6654 2.66538 14.6654 2.66538Z"
                            stroke="#1A1A1A"
                            stroke-width="1.33333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2381_12982">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>

                    <div className="text-xs font-medium text-gray-700">
                      Twitter
                    </div>
                  </div>
                  <input
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="mt-2 w-full h-10 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900
                               outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                    aria-label="Twitter"
                    placeholder="https://twitter.com/pixelcraft"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center text-gray-500">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_2381_12989)">
                          <path
                            d="M10.668 5.33203C11.7288 5.33203 12.7463 5.75346 13.4964 6.5036C14.2465 7.25375 14.668 8.27117 14.668 9.33203V13.9987H12.0013V9.33203C12.0013 8.97841 11.8608 8.63927 11.6108 8.38922C11.3607 8.13917 11.0216 7.9987 10.668 7.9987C10.3143 7.9987 9.97521 8.13917 9.72516 8.38922C9.47511 8.63927 9.33464 8.97841 9.33464 9.33203V13.9987H6.66797V9.33203C6.66797 8.27117 7.0894 7.25375 7.83954 6.5036C8.58969 5.75346 9.6071 5.33203 10.668 5.33203Z"
                            stroke="#1A1A1A"
                            stroke-width="1.33333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M3.9987 6H1.33203V14H3.9987V6Z"
                            stroke="#1A1A1A"
                            stroke-width="1.33333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.66536 3.9987C3.40174 3.9987 3.9987 3.40174 3.9987 2.66536C3.9987 1.92898 3.40174 1.33203 2.66536 1.33203C1.92898 1.33203 1.33203 1.92898 1.33203 2.66536C1.33203 3.40174 1.92898 3.9987 2.66536 3.9987Z"
                            stroke="#1A1A1A"
                            stroke-width="1.33333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2381_12989">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>

                    <div className="text-xs font-medium text-gray-700">
                      Linkedln
                    </div>
                  </div>
                  <input
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="mt-2 w-full h-10 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900
                               outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                    aria-label="LinkedIn"
                    placeholder="https://linkedin.com/company/pixelcraft"
                  />
                </div>
              </div>
            </SectionCard>

            {/* Store Policies */}
            <SectionCard
              id="sec-policies"
              title="Store Policies"
              subtitle="Share policies for support, refunds, and usage"
              icon={<ShieldCheck className="h-4 w-4 text-orange-500" />}
            >
              <div>
  <div className="text-xs font-medium text-gray-700">Policy Notes</div>

  <textarea
    value={policyNotes}
    onChange={(e) => setPolicyNotes(e.target.value)}
    className="mt-2 w-full min-h-[110px] rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900
               outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 placeholder:text-gray-400"
    aria-label="Store policies"
    placeholder="30 days support. Refunds handled case by case. License terms apply per product."
  />
</div>

            </SectionCard>

            {/* Display Settings */}
            <SectionCard
              id="sec-display"
              title="Display Settings"
              subtitle="Control what information is visible on your profile"
              icon={<SlidersHorizontal className="h-4 w-4 text-orange-500" />}
            >
              <div className="divide-y divide-gray-100">
                <ToggleRow
                  label="Show Sales Count"
                  desc="Display total sales count"
                  on={showSalesCount}
                  setOn={setShowSalesCount}
                />
                <ToggleRow
                  label="Show Revenue"
                  desc="Display total revenue earned"
                  on={showRevenue}
                  setOn={setShowRevenue}
                />
                <ToggleRow
                  label="Show Reviews"
                  desc="Display customer reviews publicly"
                  on={showReviews}
                  setOn={setShowReviews}
                />
                <ToggleRow
                  label="Show Badges"
                  desc="Display achievement badges (Verified, Top Rated, etc.)"
                  on={showBadges}
                  setOn={setShowBadges}
                />
                <ToggleRow
                  label="Show Followers"
                  desc="Display follower count"
                  on={showFollowers}
                  setOn={setShowFollowers}
                />
                <ToggleRow
                  label="Allow Messages"
                  desc="Let buyers contact you directly"
                  on={allowMessages}
                  setOn={setAllowMessages}
                />
              </div>

              <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
                <div className="text-xs font-semibold text-blue-700 flex items-center gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0013 18.3346C14.6037 18.3346 18.3346 14.6037 18.3346 10.0013C18.3346 5.39893 14.6037 1.66797 10.0013 1.66797C5.39893 1.66797 1.66797 5.39893 1.66797 10.0013C1.66797 14.6037 5.39893 18.3346 10.0013 18.3346Z"
                      stroke="#155DFC"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 6.66797V10.0013"
                      stroke="#155DFC"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 13.332H10.0083"
                      stroke="#155DFC"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Profile Visibility
                </div>
                <div className="mt-1 text-xs text-blue-700/90">
                  Your seller profile is public and can be viewed by anyone.
                  Make sure all information is accurate and professional.
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </main>
  );
}
