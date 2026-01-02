import React from 'react';

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

interface PaymentSummary {
  inEscrow: number;
  paymentsReleased: number;
  platformFee: number;
  platformFeePercentage: number;
  totalContract: number;
}

interface OrderOverview {
  type: string;
  startDate: string;
  dueDate: string;
  relatedJobId?: string;
  relatedJobTitle?: string;
}

interface QuickLink {
  id: string;
  label: string;
  icon: 'job' | 'profile';
  onClick?: () => void;
}

interface RightOrderIdProps {
  teamMembers?: TeamMember[];
  orderOverview?: OrderOverview;
  paymentSummary?: PaymentSummary;
  quickLinks?: QuickLink[];
  onViewJob?: () => void;
  onViewProfile?: (memberId: string) => void;
  onDownloadInvoices?: () => void;
}

export default function RightOrderId({
  teamMembers = [],
  orderOverview,
  paymentSummary,
  quickLinks = [],
  onViewJob,
  onViewProfile,
  onDownloadInvoices,
}: RightOrderIdProps) {
  // Default data
  const defaultTeamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'James Foster',
      rating: 4.9,
      reviewCount: 89,
      budget: 8500,
      progress: 70,
      isVerified: false,
    },
    {
      id: '2',
      name: 'Rachel Kim',
      rating: 4.8,
      reviewCount: 56,
      budget: 6000,
      progress: 65,
      isVerified: false,
    },
    {
      id: '3',
      name: 'David Chen',
      rating: 5.0,
      reviewCount: 43,
      budget: 5500,
      progress: 80,
      isVerified: true,
    },
  ];

  const defaultOrderOverview: OrderOverview = {
    type: 'Fixed Price',
    startDate: 'Oct 20, 2024',
    dueDate: 'Dec 1, 2024',
    relatedJobTitle: 'View job',
  };

  const defaultPaymentSummary: PaymentSummary = {
    inEscrow: 14000,
    paymentsReleased: 6000,
    platformFee: 1000,
    platformFeePercentage: 5,
    totalContract: 20000,
  };

  const defaultQuickLinks: QuickLink[] = [
    { id: '1', label: 'View original job', icon: 'job' },
    { id: '2', label: "James Foster's profile", icon: 'profile' },
  ];

  const displayTeamMembers = teamMembers.length > 0 ? teamMembers : defaultTeamMembers;
  const displayOrderOverview = orderOverview || defaultOrderOverview;
  const displayPaymentSummary = paymentSummary || defaultPaymentSummary;
  const displayQuickLinks = quickLinks.length > 0 ? quickLinks : defaultQuickLinks;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return dateString;
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Team Members Section - Scrollable */}
      <div className="border-b border-gray-200">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-base sm:text-lg font-semibold text-gray-900">Team members</span>
            <span className="text-sm text-gray-500">{displayTeamMembers.length} people</span>
          </div>

          {/* Scrollable Team Members List */}
          <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <style jsx>{`
              .scrollbar-thin::-webkit-scrollbar {
                width: 6px;
              }
              .scrollbar-thin::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 10px;
              }
              .scrollbar-thin::-webkit-scrollbar-thumb {
                background: #d1d5db;
                border-radius: 10px;
              }
              .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                background: #9ca3af;
              }
            `}</style>

            {displayTeamMembers.map((member) => (
              <div key={member.id} className="space-y-3">
                {/* Member Info */}
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    {member.avatarUrl ? (
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                        {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    )}
                    {member.isVerified && (
                      <div className="absolute -bottom-0.5 -right-0.5 bg-teal-500 rounded-full p-0.5">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm sm:text-base text-teal-600 truncate">
                      {member.name}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-amber-400 fill-current flex-shrink-0" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold text-gray-900 text-xs sm:text-sm">{member.rating.toFixed(1)}</span>
                      <span className="text-gray-500 text-xs sm:text-sm">({member.reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Budget */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(member.budget)}</span>
                </div>

                {/* Progress */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-900">{member.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-teal-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${member.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Overview Section */}
      <div className="border-b border-gray-200 p-4 sm:p-6">
        <div className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Order overview</div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Type</span>
            <span className="text-gray-900 font-medium">{displayOrderOverview.type}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Start date</span>
            <span className="text-gray-900">{formatDate(displayOrderOverview.startDate)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Due date</span>
            <span className="text-gray-900">{formatDate(displayOrderOverview.dueDate)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Related to</span>
            <span
              className="text-teal-600 font-medium cursor-pointer hover:text-teal-700 transition-colors"
              onClick={onViewJob}
            >
              {displayOrderOverview.relatedJobTitle}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Summary Section */}
      <div className="border-b border-gray-200 p-4 sm:p-6">
        <div className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Payment summary</div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">In escrow</span>
            <span className="text-gray-900 font-semibold">{formatCurrency(displayPaymentSummary.inEscrow)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Payments released</span>
            <span className="text-teal-600 font-semibold">{formatCurrency(displayPaymentSummary.paymentsReleased)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Platform fee ({displayPaymentSummary.platformFeePercentage}%)</span>
            <span className="text-gray-900">{formatCurrency(displayPaymentSummary.platformFee)}</span>
          </div>
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-900 font-semibold">Total contract</span>
              <span className="text-gray-900 font-bold text-base">{formatCurrency(displayPaymentSummary.totalContract)}</span>
            </div>
          </div>
        </div>

        {/* Download Invoices */}
        <div
          className="mt-4 flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={onDownloadInvoices}
        >
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-sm font-medium text-gray-700">Download invoices</span>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="p-4 sm:p-6">
        <div className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Quick links</div>
        <div className="space-y-2">
          {displayQuickLinks.map((link) => (
            <div
              key={link.id}
              className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors"
              onClick={link.onClick}
            >
              {link.icon === 'job' ? (
                <svg className="w-5 h-5 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
              <span className="text-sm text-gray-700">{link.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}