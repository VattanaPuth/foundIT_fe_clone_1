"use client";
import Image from "next/image";

import React from "react";

interface ClientProfileData {
  id: number;
  avatarUrl?: string;
  fullName: string;
  titleRole: string;
  location: string;
  allowMessages: boolean;
  shortBio: string;
  valuesWhenHiring: string[];
  industries: string[];
  preferredWorkStyles: string[];
  hireCategories: string[];
  fixedProjectMedian: string;
  hourlyMedian: string;
  contractLengthMedian: string;
  website?: string;
  linkedin?: string;
  xTwitter?: string;
}

interface ClientProfileViewProps {
  profileData: ClientProfileData;
  onBack: () => void;
}

export default function ClientProfileView({
  profileData,
  onBack,
}: ClientProfileViewProps) {
  const placeholderAvatar =
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Breadcrumb */}
      <div
        className="px-6 py-4 text-sm flex items-center gap-2 cursor-pointer hover:text-green-600 transition-colors"
        onClick={onBack}
      >
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Back to Search</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <div className="flex items-start gap-6">
                <Image
                  src={profileData.avatarUrl || placeholderAvatar}
                  alt={profileData.fullName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                  width={96}
                  height={96}
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {profileData.fullName}
                  </h1>
                  <p className="text-lg text-gray-600 mt-1">
                    {profileData.titleRole}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{profileData.location}</span>
                  </div>
                  {profileData.allowMessages && (
                    <div className="mt-4">
                      <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium text-sm">
                        Send Message
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">
                {profileData.shortBio}
              </p>
            </div>

            {/* Values When Hiring */}
            {profileData.valuesWhenHiring &&
              profileData.valuesWhenHiring.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    What I Value When Hiring
                  </h2>
                  <ul className="space-y-2">
                    {profileData.valuesWhenHiring.map((value, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Industries */}
            {profileData.industries && profileData.industries.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Industries I Work With
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profileData.industries.map((industry, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Preferred Work Styles */}
            {profileData.preferredWorkStyles &&
              profileData.preferredWorkStyles.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Preferred Work Styles
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {profileData.preferredWorkStyles.map((style, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Hiring Categories */}
            {profileData.hireCategories &&
              profileData.hireCategories.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-3">
                    Looking to Hire
                  </h3>
                  <div className="space-y-2">
                    {profileData.hireCategories.map((category, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700"
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Budget Information */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-3">
                Typical Project Budgets
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-500">Fixed Project</div>
                  <div className="font-medium text-gray-900">
                    {profileData.fixedProjectMedian}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Hourly Rate</div>
                  <div className="font-medium text-gray-900">
                    {profileData.hourlyMedian}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Contract Length</div>
                  <div className="font-medium text-gray-900">
                    {profileData.contractLengthMedian}
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            {(profileData.website ||
              profileData.linkedin ||
              profileData.xTwitter) && (
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-3">Links</h3>
                <div className="space-y-2">
                  {profileData.website && (
                    <a
                      href={profileData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-700 text-sm"
                    >
                      🌐 Website
                    </a>
                  )}
                  {profileData.linkedin && (
                    <a
                      href={profileData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-700 text-sm"
                    >
                      💼 LinkedIn
                    </a>
                  )}
                  {profileData.xTwitter && (
                    <a
                      href={profileData.xTwitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-700 text-sm"
                    >
                      🐦 X/Twitter
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
