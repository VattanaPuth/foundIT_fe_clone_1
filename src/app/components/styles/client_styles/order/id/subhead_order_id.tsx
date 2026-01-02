import React, { useState } from 'react';

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
  status?: 'Active' | 'Completed' | 'Pending' | 'Cancelled';
  deadline?: string;
  nda?: boolean;
  onBackClick?: () => void;
  onMessageClick?: () => void;
  onReportClick?: () => void;
}

export default function SubHeaderOrderId({
  orderId = '2.5',
  projectTitle = 'Full-Stack Web Application - E-Learning Platform',
  teamMembers = [],
  selectedMemberId: externalSelectedId,
  onMemberSelect,
  status = 'Active',
  deadline = 'Dec 1, 2024',
  nda = true,
  onBackClick,
  onMessageClick,
  onReportClick,
}: SubHeaderOrderIdProps) {
  // Internal state if not controlled externally
  const [internalSelectedId, setInternalSelectedId] = useState<string>('default-1');
  const selectedId = externalSelectedId ?? internalSelectedId;
  const setSelectedId = onMemberSelect ?? setInternalSelectedId;

  const defaultMembers: TeamMember[] = [
    {
      id: 'default-1',
      name: 'James Foster',
      rating: 4.9,
      reviewCount: 89,
      budget: 8500,
      progress: 70,
      isVerified: true,
    },
    {
      id: 'default-2',
      name: 'Rachel Kim',
      rating: 4.8,
      reviewCount: 56,
      budget: 6000,
      progress: 65,
      isVerified: false,
    },
    {
      id: 'default-3',
      name: 'David Chen',
      rating: 5.0,
      reviewCount: 43,
      budget: 5500,
      progress: 80,
      isVerified: true,
    },
  ];

  const displayTeamMembers = teamMembers.length > 0 ? teamMembers : defaultMembers;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      Active: 'bg-emerald-50 text-emerald-700',
      Completed: 'bg-blue-50 text-blue-700',
      Pending: 'bg-amber-50 text-amber-700',
      Cancelled: 'bg-red-50 text-red-700',
    };
    return colors[status as keyof typeof colors] || colors.Active;
  };

  return (
    <div className="w-full bg-white">
      {/* Header Navigation */}
      <div className="w-full border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
              onClick={onBackClick}
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="text-sm sm:text-base font-medium">Back to Orders</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-sm sm:text-base text-gray-600">Order #{orderId}</span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
              onClick={onMessageClick}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-sm sm:text-base font-medium hidden sm:inline">Message</span>
            </div>
            <div
              className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer transition-colors"
              onClick={onReportClick}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                />
              </svg>
              <span className="text-sm sm:text-base font-medium hidden sm:inline">Report issue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Title */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-xl sm:text-2xl font-semibold text-gray-900">{projectTitle}</div>
      </div>

      {/* Team Members Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-emerald-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-emerald-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-sm sm:text-base font-medium">
              {displayTeamMembers.length} Team {displayTeamMembers.length === 1 ? 'Member' : 'Members'} Working on This Project
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
                  ${isSelected 
                    ? 'border-4 border-emerald-500 shadow-xl ring-4 ring-emerald-100' 
                    : 'border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg'
                  }
                `}
              >
                {/* Member Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    {member.avatarUrl ? (
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold text-lg">
                        {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    )}
                    {member.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
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
                    <div className="font-semibold text-gray-900 text-base">{member.name}</div>
                    <div className="flex items-center gap-1 text-sm">
                      <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold text-gray-900">{member.rating.toFixed(1)}</span>
                      <span className="text-gray-500">({member.reviewCount})</span>
                    </div>
                  </div>
                </div>

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
                    <span className="text-sm font-semibold text-gray-900">{member.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${member.progress}%` }}
                    />
                  </div>
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center gap-2 bg-emerald-500 text-white text-xs font-medium px-4 py-2 rounded-full">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Viewing this member
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Status Bar */}
        <div className="flex items-center gap-4 mt-6 flex-wrap">
          <div className={`px-3 py-1.5 rounded-md text-sm font-medium ${getStatusColor(status)}`}>
            {status}
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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