import Image from "next/image";
import React, { useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  avatarUrl?: string;
  rating: number;
  reviewCount: number;
  budget: number;
  progress: number;
  isVerified?: boolean;
}

interface SubHeaderOrderIdProps {
  orderId?: string;
  projectTitle?: string;
  teamMembers?: TeamMember[];
  selectedMemberId?: string;
  onMemberSelect?: (memberId: string) => void;
  status?: "Active" | "Completed" | "Pending" | "Cancelled";
  deadline?: string;
  nda?: boolean;
  onBackClick?: () => void;
  onMessageClick?: () => void;
}

export default function SubHeaderOrderId({
  orderId = "2.5",
  projectTitle = "Full-Stack Web Application - E-Learning Platform",
  teamMembers = [],
  selectedMemberId: externalSelectedId,
  onMemberSelect,
  status = "Active",
  deadline = "Dec 1, 2024",
  nda = true,
  onBackClick,
  onMessageClick,
}: SubHeaderOrderIdProps) {
  // Internal state if not controlled externally
  const [internalSelectedId, setInternalSelectedId] =
    useState<string>("default-1");
  const selectedId = externalSelectedId ?? internalSelectedId;
  const setSelectedId = onMemberSelect ?? setInternalSelectedId;

  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  const [issueCategory, setIssueCategory] = useState(""); // Issue category state
  const [description, setDescription] = useState(""); // Description state

  const defaultMembers: TeamMember[] = [
    {
      id: "default-1",
      name: "James Foster",
      rating: 4.9,
      reviewCount: 89,
      budget: 8500,
      progress: 70,
      isVerified: true,
    },
    {
      id: "default-2",
      name: "Rachel Kim",
      rating: 4.8,
      reviewCount: 56,
      budget: 6000,
      progress: 65,
      isVerified: false,
    },
    {
      id: "default-3",
      name: "David Chen",
      rating: 5.0,
      reviewCount: 43,
      budget: 5500,
      progress: 80,
      isVerified: true,
    },
  ];

  const displayTeamMembers =
    teamMembers.length > 0 ? teamMembers : defaultMembers;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      Active: "bg-emerald-50 text-emerald-700",
      Completed: "bg-blue-50 text-blue-700",
      Pending: "bg-amber-50 text-amber-700",
      Cancelled: "bg-red-50 text-red-700",
    };
    return colors[status as keyof typeof colors] || colors.Active;
  };

  const handleReportClick = () => {
    setIsModalOpen(true); // Open the report issue modal
  };

  const handleCancelReport = () => {
    setIsModalOpen(false); // Close the modal without submitting
  };

  const handleSubmitReport = () => {
    // Add your form submission logic here
    console.log("Report Submitted:", { issueCategory, description });
    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <div className="w-full bg-white">
      {/* Header Navigation */}
      <div className="w-full border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div
              className="flex items-center gap-x-5 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
              onClick={onBackClick}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 7H1M1 7L7 13M1 7L7 1"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span className="text-sm sm:text-base font-medium">
                Back to Orders
              </span>
            </div>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-sm sm:text-base text-gray-600">
              Order #{orderId}
            </span>
          </div>

          <div className="flex items-center space-x-2 gap-x-3">
            <div
              className="flex items-center border border-gray-200 px-3 py-2 rounded-xl gap-2 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
              onClick={onMessageClick}
            >
              <svg
                className="w-5 h-5 mt-1"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H14.2C15.8802 1 16.7202 1 17.362 1.32698C17.9265 1.6146 18.3854 2.07354 18.673 2.63803C19 3.27976 19 4.11984 19 5.8V11.2C19 12.8802 19 13.7202 18.673 14.362C18.3854 14.9265 17.9265 15.3854 17.362 15.673C16.7202 16 15.8802 16 14.2 16H7.68375C7.0597 16 6.74767 16 6.44921 16.0613C6.18443 16.1156 5.9282 16.2055 5.68749 16.3285C5.41617 16.4671 5.17252 16.662 4.68521 17.0518L2.29976 18.9602C1.88367 19.2931 1.67563 19.4595 1.50054 19.4597C1.34827 19.4599 1.20422 19.3906 1.10923 19.2716C1 19.1348 1 18.8684 1 18.3355V5.8Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span className="text-sm sm:text-base font-medium hidden sm:inline">
                Message
              </span>
            </div>

            <div
              className="flex items-center border border-gray-200 px-3 py-2 rounded-xl gap-2 text-red-600 hover:text-red-700 cursor-pointer transition-colors"
              onClick={handleReportClick}
            >
              <svg
                className="w-5 h-5 mt-1"
                viewBox="0 0 18 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 14C1 14 2 13 5 13C8 13 10 15 13 15C16 15 17 14 17 14V3C17 3 16 4 13 4C10 4 8 2 5 2C2 2 1 3 1 3M1 21L1 1"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span className="text-sm sm:text-base font-medium hidden sm:inline">
                Report issue
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Report Issue Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-1/3">
            <p className="text-2xl font-bold mb-4">Report an Issue</p>
            <p className="text-lg text-gray-500 mb-4">
              Describe the issue you are experiencing with this order. Our
              support team will review your report and get back to you.
            </p>

            {/* Issue Category */}
            <div className="mb-4">
              <label htmlFor="issueCategory" className="block text-md">
                Issue category
              </label>
              <select
                id="issueCategory"
                value={issueCategory}
                onChange={(e) => setIssueCategory(e.target.value)}
                className="w-full mt-2 px-3 py-2 border border-gray-300 bg-[#F3F3F5] rounded-xl"
              >
                <option value="">Select an issue category</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="Billing Issue">Billing Issue</option>
                <option value="Delivery Issue">Delivery Issue</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-md">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full mt-2 px-3 py-2 border border-gray-300 bg-[#F3F3F5] rounded-xl focus:outline-none"
                placeholder="Please provide detailed information about the issue..."
              ></textarea>
              <p className="text-gray-500 text-sm mt-2">
                Be specific and include relevant details to help us resolve the
                issue quickly.
              </p>
            </div>

            {/* What happens next */}
            <div className="bg-blue-50 border border-blue-400 rounded-2xl pt-3 pl-3 mb-4">
              <p className="text-sm text-blue-700">
                <p>What happens next:</p>
                <ul className="list-disc pl-4">
                  <li>
                    Our support team will review your report within 24 hours
                  </li>
                  <li>You will receive updates via email and notifications</li>
                  <li>We may contact you for additional information</li>
                </ul>
              </p>
            </div>

            <div className="flex text-center justify-end gap-x-4 cursor-pointer">
              <p
                onClick={handleCancelReport}
                className="w-fit px-3 py-2 rounded-lg border border-gray-300 text-gray-700 active:opacity-30"
              >
                Cancel
              </p>
              <p
                onClick={handleSubmitReport}
                className="w-fit px-3 py-2 rounded-lg bg-[#D4183D] text-white active:opacity-30"
              >
                Submit Report
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Project Title */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-xl sm:text-2xl text-gray-900">{projectTitle}</div>
      </div>

      {/* Team Members Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-emerald-50 rounded-xl border-2 border-[#A4F4CF] p-4 mb-6">
          <div className="flex items-center gap-2 text-emerald-800">
            <svg
              className="w-5 h-5"
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
            <span className="text-sm sm:text-base font-medium">
              {displayTeamMembers.length} Team{" "}
              {displayTeamMembers.length === 1 ? "Member" : "Members"} Working
              on This Project
            </span>
          </div>
        </div>

        {/* Team Member Cards - Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide">
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

          {displayTeamMembers.map((member) => {
            const isSelected = selectedId === member.id;

            return (
              <div
                key={member.id}
                onClick={() => setSelectedId(member.id)}
                className={`
                  bg-white rounded-xl p-6 flex-shrink-0 w-[280px] sm:w-[320px] cursor-pointer transition-all duration-300
                  ${
                    isSelected
                      ? "border-2 border-emerald-500 ring-4 ring-emerald-100"
                      : "border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg"
                  }
                `}
              >
                {/* Member Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    {member.avatarUrl ? (
                      <Image
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                        width={48}
                        height={48}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold text-lg">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                    )}
                    {member.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-base">
                      {member.name}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <svg
                        className="w-4 h-4 text-amber-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold text-gray-900">
                        {member.rating.toFixed(1)}
                      </span>
                      <span className="text-gray-500">
                        ({member.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full h-[0.8px] bg-gray-200 mb-2"></div>

                {/* Budget */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Budget</span>
                  <span className="text-base font-semibold text-teal-600">
                    {formatCurrency(member.budget)}
                  </span>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {member.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${member.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Bar */}
        <div className="flex items-center gap-4 mt-6 flex-wrap">
          <div
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${getStatusColor(status)}`}
          >
            {status}
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{deadline}</span>
          </div>
          {nda && (
            <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-md text-sm font-medium">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>NDA</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
