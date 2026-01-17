import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

// Types
interface Application {
  id: string;
  title: string;
  postedBy: {
    name: string;
    avatar: string;
  };
  rate: string;
  delivery: string;
  applied: string;
  coverLetter: string;
  skills: string[];
  budget: string;
  proposals: number;
  status: "shortlisted" | "pending" | "under-review" | "accepted" | "rejected";
}

// Default avatar SVG
const DefaultAvatar: React.FC = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="20" fill="#E5E7EB" />
    <circle cx="20" cy="16" r="6" fill="#9CA3AF" />
    <path
      d="M8 32C8 26.4772 12.4772 22 18 22H22C27.5228 22 32 26.4772 32 32V32H8V32Z"
      fill="#9CA3AF"
    />
  </svg>
);

// Icons
const DocumentIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
    <path
      fillRule="evenodd"
      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
      clipRule="evenodd"
    />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
      clipRule="evenodd"
    />
  </svg>
);

const TrendIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
      clipRule="evenodd"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const SearchIcon = () => (
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
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const ChevronDownIcon = () => (
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
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

// Status Badge Component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const statusConfig: Record<
    string,
    { bg: string; text: string; label: string }
  > = {
    shortlisted: {
      bg: "bg-purple-600",
      text: "text-white",
      label: "Shortlisted",
    },
    pending: { bg: "bg-gray-600", text: "text-white", label: "Pending Review" },
    "under-review": {
      bg: "bg-blue-600",
      text: "text-white",
      label: "Under Review",
    },
    accepted: { bg: "bg-green-600", text: "text-white", label: "Accepted" },
    rejected: { bg: "bg-red-600", text: "text-white", label: "Not Selected" },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div
      className={`${config.bg} ${config.text} px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5`}
    >
      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
      {config.label}
    </div>
  );
};

// Stats Card Component
const StatsCard: React.FC<{
  title: string;
  count: number;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}> = ({ title, count, icon, bgColor, iconColor }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-100">
    <div className="flex items-start justify-between">
      <div>
        <div className="text-gray-500 text-sm mb-1">{title}</div>
        <div className="text-2xl font-semibold text-gray-900">{count}</div>
      </div>
      <div
        className={`${bgColor} w-12 h-12 rounded-xl flex items-center justify-center ${iconColor}`}
      >
        {icon}
      </div>
    </div>
  </div>
);

// Application Card Component
const ApplicationCard: React.FC<{
  application: Application;
  onViewDetails: (id: string) => void;
}> = ({ application, onViewDetails }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-100">
    <div className="flex items-start justify-between mb-4 gap-4">
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-gray-900 mb-2">
          {application.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Posted by</span>
          <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
            <DefaultAvatar />
          </div>
          <span className="text-gray-700 font-medium">
            {application.postedBy.name}
          </span>
        </div>
      </div>
      <div className="flex-shrink-0">
        <StatusBadge status={application.status} />
      </div>
    </div>

    <div className="grid grid-cols-3 gap-6 mb-5">
      <div className="flex items-start gap-2">
        <div className="text-gray-400 flex-shrink-0 mt-0.5">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-0.5">Your Rate</div>
          <div className="text-sm font-semibold text-gray-900">
            {application.rate}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <div className="text-gray-400 flex-shrink-0 mt-0.5">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-0.5">Delivery</div>
          <div className="text-sm font-semibold text-gray-900">
            {application.delivery}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <div className="text-gray-400 flex-shrink-0 mt-0.5">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-0.5">Applied</div>
          <div className="text-sm font-semibold text-gray-900">
            {application.applied}
          </div>
        </div>
      </div>
    </div>

    <div className="mb-4">
      <div className="text-xs font-semibold text-gray-900 mb-1.5">
        Cover Letter
      </div>
      <div className="text-sm text-gray-600 leading-relaxed">
        {application.coverLetter}
      </div>
    </div>

    <div className="flex flex-wrap gap-2 mb-5">
      {application.skills.map((skill, index) => (
        <span
          key={index}
          className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs text-gray-700 font-medium"
        >
          {skill}
        </span>
      ))}
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
      <div className="text-xs text-gray-500">
        Job Budget:{" "}
        <span className="text-gray-900 font-semibold">
          {application.budget}
        </span>{" "}
        • {application.proposals} proposals
      </div>
      <p
        onClick={() => onViewDetails(application.id)}
        className="text-gray-900 font-semibold text-sm transition-colors cursor-pointer"
        style={{ transition: "color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#615FFF")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#111827")}
      >
        View Details
      </p>
    </div>
  </div>
);

// Main Component
export default function ApplicationPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions = [
    "Most Recent",
    "Oldest First",
    "Highest Rate",
    "Lowest Rate",
  ];

  const [applications] = useState<Application[]>([
    {
      id: "1",
      title: "E-commerce Website Redesign",
      postedBy: { name: "Cardi B", avatar: "" },
      rate: "$5,500",
      delivery: "14 days",
      applied: "Mar 15, 2024",
      coverLetter:
        "I have over 5 years of experience in e-commerce design and have worked with brands similar to yours. I can deliver a modern, conversion-optimized design that aligns with your brand.",
      skills: ["Figma", "UI/UX Design", "E-commerce", "Responsive Design"],
      budget: "$5,000 - $8,000",
      proposals: 12,
      status: "shortlisted",
    },
    {
      id: "2",
      title: "Mobile App UI Design",
      postedBy: { name: "Ding Yuxi", avatar: "" },
      rate: "$75/hr",
      delivery: "21 days",
      applied: "Mar 14, 2024",
      coverLetter:
        "I specialize in mobile app design with a focus on user experience. I'd love to help bring your app vision to life.",
      skills: ["Mobile UI", "Figma", "Prototyping", "iOS Design"],
      budget: "$60 - $100/hr",
      proposals: 8,
      status: "pending",
    },
    {
      id: "3",
      title: "Brand Identity Design",
      postedBy: { name: "Yi Ran", avatar: "" },
      rate: "$3,500",
      delivery: "10 days",
      applied: "Mar 12, 2024",
      coverLetter:
        "I have a strong portfolio in brand identity work and would love to create a unique identity for your brand.",
      skills: [
        "Branding",
        "Logo Design",
        "Visual Identity",
        "Adobe Illustrator",
      ],
      budget: "$3,000 - $5,000",
      proposals: 25,
      status: "rejected",
    },
    {
      id: "4",
      title: "Dashboard UI for SaaS Platform",
      postedBy: { name: "Hyung Sik", avatar: "" },
      rate: "$6,500",
      delivery: "18 days",
      applied: "Mar 10, 2024",
      coverLetter:
        "I have extensive experience designing complex dashboards for SaaS products. I understand the importance of data visualization and user-friendly interfaces.",
      skills: ["Dashboard Design", "Data Visualization", "SaaS", "Figma"],
      budget: "$6,000 - $10,000",
      proposals: 15,
      status: "under-review",
    },
    {
      id: "5",
      title: "Landing Page Design & Development",
      postedBy: { name: "Celine Celine", avatar: "" },
      rate: "$2,500",
      delivery: "7 days",
      applied: "Mar 8, 2024",
      coverLetter:
        "I can design and develop a high-converting landing page for your campaign. My approach focuses on clear CTAs and modern design.",
      skills: ["Landing Pages", "Conversion Optimization", "Webflow", "Design"],
      budget: "$2,000 - $3,500",
      proposals: 20,
      status: "accepted",
    },
  ]);

  const statusCounts = {
    total: applications.length,
    underReview: applications.filter((app) => app.status === "under-review")
      .length,
    shortlisted: applications.filter((app) => app.status === "shortlisted")
      .length,
    accepted: applications.filter((app) => app.status === "accepted").length,
  };

  const tabs = [
    { id: "all", label: "All", count: applications.length },
    {
      id: "pending",
      label: "Pending",
      count: applications.filter((a) => a.status === "pending").length,
    },
    { id: "under-review", label: "Reviewing", count: statusCounts.underReview },
    {
      id: "shortlisted",
      label: "Shortlisted",
      count: statusCounts.shortlisted,
    },
    { id: "accepted", label: "Accepted", count: statusCounts.accepted },
    {
      id: "rejected",
      label: "Rejected",
      count: applications.filter((a) => a.status === "rejected").length,
    },
  ];

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.postedBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      app.coverLetter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || app.status === activeTab;
    return matchesSearch && matchesTab;
  });

  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case "Most Recent":
        return new Date(b.applied).getTime() - new Date(a.applied).getTime();
      case "Oldest First":
        return new Date(a.applied).getTime() - new Date(b.applied).getTime();
      case "Highest Rate":
        const aRate = parseFloat(a.rate.replace(/[$,\/hr]/g, ""));
        const bRate = parseFloat(b.rate.replace(/[$,\/hr]/g, ""));
        return bRate - aRate;
      case "Lowest Rate":
        const aRate2 = parseFloat(a.rate.replace(/[$,\/hr]/g, ""));
        const bRate2 = parseFloat(b.rate.replace(/[$,\/hr]/g, ""));
        return aRate2 - bRate2;
      default:
        return 0;
    }
  });

  const handleViewDetails = (id: string) => {
    router.push(`/page/freelancer/proposal?id=${id}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <p className="text-gray-600 hover:text-gray-900">
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </p>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                My Applications
              </h1>
              <p className="text-sm text-gray-500">
                Track all your job applications
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Applied"
            count={statusCounts.total}
            icon={<DocumentIcon />}
            bgColor="bg-indigo-50"
            iconColor="text-indigo-600"
          />
          <StatsCard
            title="Under Review"
            count={statusCounts.underReview}
            icon={<ClockIcon />}
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatsCard
            title="Shortlisted"
            count={statusCounts.shortlisted}
            icon={<TrendIcon />}
            bgColor="bg-purple-50"
            iconColor="text-purple-600"
          />
          <StatsCard
            title="Accepted"
            count={statusCounts.accepted}
            icon={<CheckCircleIcon />}
            bgColor="bg-green-50"
            iconColor="text-green-600"
          />
        </div>

        {/* Search and Sort */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <div className="absolute -mt-1.5 left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <p
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="pl-4 pr-10 py-2.5 rounded-lg bg-white border border-gray-200 cursor-pointer text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[160px] flex items-center justify-between"
            >
              <span>{sortBy}</span>
              <div className="text-gray-400 ml-2">
                <ChevronDownIcon />
              </div>
            </p>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                  {sortOptions.map((option) => (
                    <p
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                    >
                      <span>{option}</span>
                      {sortBy === option && (
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-100 rounded-xl p-1.5 mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <p
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-8 py-3 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {tab.label} ({tab.count})
              </p>
            ))}
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {sortedApplications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No applications found matching your search.
              </p>
            </div>
          ) : (
            sortedApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onViewDetails={handleViewDetails}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
