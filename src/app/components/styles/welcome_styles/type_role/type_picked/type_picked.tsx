"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TypePicked() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role"); // Get role from URL query

  // List of categories based on role
  const getCategoriesByRole = () => {
    switch (role) {
      case "find_job": // FREELANCER
        return {
          categoryTitle: "What skills do you offer?",
          categories: [
            "Designer",
            "Web Developer",
            "Mobile Developer",
            "Writer/Copy",
            "Marketer/SEO",
            "Video/Motion",
            "3D Artist",
          ],
          toolsTitle: "Which tools do you use?",
          tools: [
            "Figma",
            "Photoshop",
            "Illustrator",
            "React",
            "Next.js",
            "Vue",
          ],
          dashboardRoute: "/page/freelancer/projects",
        };
      case "hire_talent": // CLIENT
        return {
          categoryTitle: "What roles do you need?",
          categories: [
            "Designer",
            "Web Developer",
            "Mobile Developer",
            "Writer/Copy",
            "Marketer/SEO",
            "Video/Motion",
            "3D Artist",
          ],
          toolsTitle: "Any tools to prefer?",
          tools: [
            "Figma",
            "Photoshop",
            "Illustrator",
            "React",
            "Next.js",
            "Vue",
          ],
          dashboardRoute: "/page/client/home",
        };
      case "sell_products": // SELLER
        return {
          categoryTitle: "What products do you sell?",
          categories: [
            "UI/UX Design",
            "Web Templates",
            "Mobile Templates",
            "Courses",
            "E-books",
            "Graphics",
            "Plugins",
          ],
          toolsTitle: "Which platforms do you use?",
          tools: [
            "Figma",
            "Photoshop",
            "Illustrator",
            "Sketch",
            "Adobe XD",
            "Canva",
          ],
          dashboardRoute: "/page/seller/home",
        };
      default:
        return {
          categoryTitle: "What are you interested in?",
          categories: [
            "Designer",
            "Developer",
            "Writer",
            "Marketer",
            "Video",
            "3D",
          ],
          toolsTitle: "Any tools to prefer?",
          tools: ["Figma", "Photoshop", "React", "Next.js", "Vue"],
          dashboardRoute: "/page/client/home",
        };
    }
  };

  const config = getCategoriesByRole();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    // Redirect if no role is provided
    if (!role) {
      router.push("/page/type_role");
    }
  }, [role, router]);

  // Toggle button on/off
  const toggleSelect = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  // Remove using small X tag
  const removeSelected = (item: string) => {
    setSelected(selected.filter((i) => i !== item));
  };

  return (
    <div className="w-full ">
      <div className="flex justify-center w-full h-9 mt-12 mb-8">
        <img src="/favicon.ico" alt="logo" />
      </div>

      <div className="flex justify-center items-start bg-white p-4 sm:p-8 min-h-screen">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 sm:p-8 relative">
          {/* Close Button */}
          <div
            onClick={() => window.history.back()}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
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

          {/* Header */}
          <div className="mb-6">
            <div className="text-3xl sm:text-3xl font-bold text-gray-900 mb-4">
              Tell us what you're into
            </div>
            <div className="text-sm sm:text-base text-gray-500 mb-4">
              We'll personalize your feed and shortcuts. You can change this
              anytime.
            </div>
          </div>

          {/* Selected Tags Display */}
          <div className="flex flex-wrap gap-3 mb-6">
            {selected.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between bg-white border border-[#D92AD0] text-[#D92AD0] px-4 py-2 rounded-full"
              >
                {item}
                <div
                  onClick={() => removeSelected(item)}
                  className="ml-2 text-[#D92AD0] cursor-pointer"
                >
                  ✕
                </div>
              </div>
            ))}
          </div>

          {/* First Category */}
          <div className="mb-6">
            <div className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
              {config.categoryTitle}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {config.categories.map((item) => (
                <div
                  key={item}
                  onClick={() => toggleSelect(item)}
                  className={`text-center py-2 px-4 rounded-full cursor-pointer transition-all 
                    ${
                      selected.includes(item)
                        ? "bg-[#D92AD0] text-white"
                        : "bg-[#EEF2F7] text-[#364153]"
                    }
                    hover:opacity-70`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Second Category */}
          <div className="mb-6">
            <div className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
              {config.toolsTitle}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {config.tools.map((item) => (
                <div
                  key={item}
                  onClick={() => toggleSelect(item)}
                  className={`text-center py-2 px-4 rounded-full cursor-pointer transition-all 
                    ${
                      selected.includes(item)
                        ? "bg-[#D92AD0] text-white"
                        : "bg-[#EEF2F7] text-[#364153]"
                    }
                    hover:opacity-70`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center mb-4">
            <div
              onClick={() => {
                if (selected.length === 0) {
                  alert("Please select at least one option");
                  return;
                }
                console.log("Selected items:", selected);
                // Navigate to appropriate dashboard based on role
                router.push(config.dashboardRoute);
              }}
              className="w-full py-3.5 rounded-xl text-white text-center font-medium text-base bg-[#D92AD0] hover:bg-[#C01FB8] cursor-pointer transition-all"
            >
              Continue
            </div>
          </div>

          {/* Skip Button */}
          <div className="flex justify-center text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
            <div
              onClick={() => {
                console.log("Skipped preference selection");
                // Navigate to appropriate dashboard even when skipped
                router.push(config.dashboardRoute);
              }}
              className="hover:underline"
            >
              Skip for now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
