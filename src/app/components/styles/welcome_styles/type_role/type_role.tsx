"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { Role } from "@/app/types/auth";
import authService from "@/app/services/authService";

type RoleItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function TypeRole() {
  const router = useRouter();
  const { updateUserRole, user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const roles: RoleItem[] = useMemo(
    () => [
      {
        id: "find_job",
        title: "Find Job",
        description: "Instant download",
        icon: (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        ),
      },
      {
        id: "sell_products",
        title: "Sell products",
        description: "Ready-made (open a shop)",
        icon: (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        ),
      },
      {
        id: "hire_talent",
        title: "Hire talent",
        description: "Briefs, safe payments",
        icon: (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        ),
      },
    ],
    []
  );

  const toggleRole = (roleId: string) => {
    // Only allow single selection - toggle if clicking the same role, otherwise switch to new role
    setSelectedRole((prev) => (prev === roleId ? "" : roleId));
  };

  const handleContinue = async () => {
    if (!selectedRole) {
      alert("Please select one role");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Check authentication
      if (!user) {
        throw new Error(
          "You must be logged in to continue. Please sign in again."
        );
      }

      // Map role IDs to backend role enum values
      const roleMapping: Record<string, Role> = {
        find_job: Role.FREELANCER,
        hire_talent: Role.CLIENT,
        sell_products: Role.SELLER,
      };

      const mappedRole = roleMapping[selectedRole];

      console.log("Updating user role to:", mappedRole);

      // Use AuthContext's updateUserRole method
      await updateUserRole(mappedRole);

      console.log("Role updated successfully");

      // Navigate to verify/step-1 AFTER successful update
      router.push("/page/client/verify/step-1");
    } catch (err: unknown) {
      console.error("Error updating role:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage || "Failed to save role. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    console.log("Skipped role selection");
    window.location.href = "/dashboard"; // replace with your route
  };

  const handleClose = () => {
    console.log("Closed modal");
    window.history.back();
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Logo */}
      <div className="flex justify-center w-full h-9 mt-12">
        <img src="/favicon.ico" alt="logo" />
      </div>
      {/* Center */}
      <div className="w-full flex items-center justify-center px-4 py-8 sm:py-12">
        {/* Modal */}
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 relative">
          {/* Close */}
          <div
            onClick={handleClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
            role="presentation"
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          {/* Header (no h1-h6) */}
          <div className="mb-6">
            <div className="text-2xl sm:text-3xl text-gray-900 mb-3">
              How will you use the platform?
            </div>
            <div className="text-sm sm:text-base text-gray-500">
              Select one option to personalize your experience
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {roles.map((role) => {
              const active = selectedRole === role.id;

              return (
                <div
                  key={role.id}
                  onClick={() => toggleRole(role.id)}
                  className={`relative w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer
                        ${
                          active
                            ? "border-purple-500 bg-purple-50 ring-2 ring-purple-200"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                  role="presentation"
                >
                  {/* Optional check badge (NOT a checkbox) */}
                  {active && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-lg
                        ${
                          active
                            ? "bg-purple-100 text-purple-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                  >
                    {role.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 pr-8">
                    <div className="text-base sm:text-lg font-semibold text-gray-900">
                      {role.title}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      {role.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continue (no button tag) */}
          <div
            onClick={!isLoading ? handleContinue : undefined}
            className={`w-full py-3.5 rounded-xl text-white text-center font-medium text-sm sm:text-base transition-all mb-3
                ${
                  isLoading
                    ? "bg-pink-400 cursor-not-allowed"
                    : "bg-[#D92AD0] hover:bg-[#C01FB8] cursor-pointer"
                }`}
            role="presentation"
          >
            {isLoading ? "Loading..." : "Continue"}
          </div>

          {/* Skip */}
          <div
            onClick={handleSkip}
            className="w-full text-center text-sm text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
            role="presentation"
          >
            Skip for now
          </div>
        </div>
      </div>
    </div>
  );
}
