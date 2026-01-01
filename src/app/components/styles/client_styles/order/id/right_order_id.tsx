import React from 'react';

interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
  budget: number;
  progress: number;
  verified?: boolean;
}

interface OrderOverview {
  startDate: string;
  dueDate: string;
  relatedTo?: string;
}

interface PaymentSummary {
  inEscrow: number;
  paymentsReleased: number;
  platformFee: number;
  platformFeePercentage: number;
  totalContract: number;
}

interface QuickLink {
  id: string;
  label: string;
  icon: 'briefcase' | 'user';
  onClick: () => void;
}

interface RightOrderIdProps {
  teamMembers: TeamMember[];
  orderOverview: OrderOverview;
  paymentSummary: PaymentSummary;
  quickLinks: QuickLink[];
  fixedPrice?: number;
  onDownloadInvoice?: () => void;
}

const RightOrderId: React.FC<RightOrderIdProps> = ({
  teamMembers,
  orderOverview,
  paymentSummary,
  quickLinks,
  fixedPrice,
  onDownloadInvoice,
}) => {
  const showTeamMembers = teamMembers.length > 1;

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      {/* Team Members Section */}
      {showTeamMembers && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-gray-900">Team members</span>
            <span className="text-sm text-gray-500">{teamMembers.length} people</span>
          </div>

          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="space-y-2 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                    {member.avatar ? (
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white text-sm font-semibold">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {member.name}
                      </span>
                      {member.verified && (
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <span className="text-xs font-medium text-gray-900">{member.rating}</span>
                      <span className="text-xs text-gray-500">({member.reviewCount})</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Budget</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {formatCurrency(member.budget)}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-green-600 font-medium">progress</span>
                    <span className="font-semibold text-gray-900">{member.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${getProgressColor(member.progress)}`}
                      style={{ width: `${member.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Overview Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-gray-900">Order overview</span>
          {fixedPrice && (
            <div className="text-right">
              <div className="text-xs text-gray-500">Fixed Price</div>
              <div className="text-sm font-semibold text-gray-900">
                {formatCurrency(fixedPrice)}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600">Start date</span>
            <span className="text-sm font-medium text-gray-900">
              {formatDate(orderOverview.startDate)}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-100">
            <span className="text-sm text-gray-600">Due date</span>
            <span className="text-sm font-medium text-gray-900">
              {formatDate(orderOverview.dueDate)}
            </span>
          </div>

          {orderOverview.relatedTo && (
            <div className="flex items-center justify-between py-2 border-t border-gray-100">
              <span className="text-sm text-gray-600">Related to</span>
              <span className="text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-700">
                {orderOverview.relatedTo}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Payment Summary Section */}
      <div className="space-y-4">
        <span className="text-base font-semibold text-gray-900 block">Payment summary</span>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600">In escrow</span>
            <span className="text-sm font-semibold text-gray-900">
              {formatCurrency(paymentSummary.inEscrow)}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-100">
            <span className="text-sm text-gray-600">Payments released</span>
            <span className="text-sm font-semibold text-green-600">
              {formatCurrency(paymentSummary.paymentsReleased)}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-100">
            <span className="text-sm text-gray-600">
              Platform fee ({paymentSummary.platformFeePercentage}%)
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {formatCurrency(paymentSummary.platformFee)}
            </span>
          </div>

          <div className="flex items-center justify-between py-3 border-t-2 border-gray-200">
            <span className="text-sm font-semibold text-gray-900">Total contract</span>
            <span className="text-base font-bold text-gray-900">
              {formatCurrency(paymentSummary.totalContract)}
            </span>
          </div>
        </div>

        <div 
          onClick={onDownloadInvoice}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">Download invoice</span>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="space-y-4">
        <span className="text-base font-semibold text-gray-900 block">Quick links</span>

        <div className="space-y-2">
          {quickLinks.map((link) => (
            <div
              key={link.id}
              onClick={link.onClick}
              className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {link.icon === 'briefcase' ? (
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
              <span className="text-sm text-gray-700">{link.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightOrderId;

// ===== MOCK DATA =====

// Mock data for multiple team members
export const mockMultipleTeamMembersRightPanel = {
  teamMembers: [
    {
      id: "1",
      name: "James Foste",
      avatar: "",
      rating: 4.9,
      reviewCount: 89,
      budget: 8500,
      progress: 70,
      verified: true,
    },
    {
      id: "2",
      name: "Rachel Kim",
      avatar: "",
      rating: 4.8,
      reviewCount: 56,
      budget: 5000,
      progress: 65,
      verified: false,
    },
    {
      id: "3",
      name: "David Chen",
      avatar: "",
      rating: 5.0,
      reviewCount: 43,
      budget: 5500,
      progress: 80,
      verified: true,
    },
  ],
  orderOverview: {
    startDate: "2024-10-20",
    dueDate: "2024-12-01",
    relatedTo: "View job",
  },
  paymentSummary: {
    inEscrow: 14000,
    paymentsReleased: 6000,
    platformFee: 1000,
    platformFeePercentage: 5,
    totalContract: 20000,
  },
  quickLinks: [
    {
      id: "1",
      label: "View original job",
      icon: "briefcase" as const,
      onClick: () => console.log("View original job clicked"),
    },
    {
      id: "2",
      label: "James Foste's profile",
      icon: "user" as const,
      onClick: () => console.log("Profile clicked"),
    },
  ],
  fixedPrice: 20000,
  onDownloadInvoice: () => console.log("Download invoice clicked"),
};

// Mock data for single team member (no team members section shown)
export const mockSingleTeamMemberRightPanel = {
  teamMembers: [
    {
      id: "1",
      name: "Bai Lu",
      avatar: "",
      rating: 5.0,
      reviewCount: 62,
      budget: 15000,
      progress: 45,
      verified: true,
    },
  ],
  orderOverview: {
    startDate: "2024-11-04",
    dueDate: "2024-12-15",
    relatedTo: "View job",
  },
  paymentSummary: {
    inEscrow: 10000,
    paymentsReleased: 5000,
    platformFee: 750,
    platformFeePercentage: 5,
    totalContract: 15000,
  },
  quickLinks: [
    {
      id: "1",
      label: "View original job",
      icon: "briefcase" as const,
      onClick: () => console.log("View original job clicked"),
    },
    {
      id: "2",
      label: "Bai Lu's profile",
      icon: "user" as const,
      onClick: () => console.log("Profile clicked"),
    },
  ],
  fixedPrice: 15000,
  onDownloadInvoice: () => console.log("Download invoice clicked"),
};