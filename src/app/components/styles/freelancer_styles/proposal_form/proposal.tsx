"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

// Types for backend integration
interface JobDetails {
  id: string | number;
  title: string;
  postedBy: {
    name: string;
    avatarUrl?: string;
  };
  postedDate: string;
  price: string;
  duration: string;
  proposalsCount: number;
  isVerifiedClient: boolean;
  clientId?: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  duration: number;
  durationType: "days" | "weeks";
}

interface ScreeningQuestion {
  id: string;
  question: string;
  answer: string;
}

interface ProposalFormData {
  coverLetter: string;
  portfolioLinks: string[];
  attachments: File[];
  milestones: Milestone[];
  screeningQuestions: ScreeningQuestion[];
}

function ProposalForm() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id") || searchParams.get("jobId");

  // State management for form data
  const [formData, setFormData] = useState<ProposalFormData>({
    coverLetter: "",
    portfolioLinks: [""],
    attachments: [],
    milestones: [],
    screeningQuestions: [
      {
        id: "1",
        question: "What is your experience with payment gateway integration?",
        answer: "",
      },
      {
        id: "2",
        question: "Can you provide examples of e-commerce sites you've built?",
        answer: "",
      },
      {
        id: "3",
        question: "What is your estimated timeline for this project?",
        answer: "",
      },
    ],
  });

  // Job details state
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [loadingJob, setLoadingJob] = useState(false);
  const [jobError, setJobError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) {
      setJobError("No job ID provided in URL.");
      return;
    }
    setLoadingJob(true);
    setJobError(null);
    fetch(`/gigs/client/public/${jobId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Job not found");
        const data = await res.json();
        // Map backend data to JobDetails shape
        setJobDetails({
          id: data.id,
          title: data.title,
          postedBy: {
            name: data.clientName || "Client",
            avatarUrl: data.clientAvatarUrl || undefined,
          },
          postedDate: data.postedDate || "",
          price:
            data.payType === "Fixed"
              ? `$${data.fixedBudget} fixed`
              : `$${data.hourlyMin}-${data.hourlyMax}/hr`,
          duration: data.duration || "",
          proposalsCount: data.proposalsCount || 0,
          isVerifiedClient: !!data.isVerifiedClient,
        });
        setLoadingJob(false);
      })
      .catch((err) => {
        setJobError(err.message || "Failed to fetch job");
        setLoadingJob(false);
      });
  }, [jobId]);

  // New milestone form state
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    amount: "",
    duration: "",
    durationType: "days" as "days" | "weeks",
  });

  // Character count
  const [characterCount, setCharacterCount] = useState(0);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Handlers
  const handleCoverLetterChange = (value: string) => {
    const wordCount = value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    if (wordCount <= 500) {
      setFormData((prev) => ({ ...prev, coverLetter: value }));
      setCharacterCount(value.length);
    }
  };

  const handlePortfolioLinkChange = (index: number, value: string) => {
    const newLinks = [...formData.portfolioLinks];
    newLinks[index] = value;
    setFormData((prev) => ({ ...prev, portfolioLinks: newLinks }));
  };

  const addPortfolioLink = () => {
    setFormData((prev) => ({
      ...prev,
      portfolioLinks: [...prev.portfolioLinks, ""],
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...files],
      }));
    }
  };

  const handleScreeningAnswerChange = (id: string, answer: string) => {
    const wordCount = answer
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    if (wordCount <= 100) {
      setFormData((prev) => ({
        ...prev,
        screeningQuestions: prev.screeningQuestions.map((q) =>
          q.id === id ? { ...q, answer } : q,
        ),
      }));
    }
  };

  const addMilestone = () => {
    if (newMilestone.title && newMilestone.amount && newMilestone.duration) {
      const milestone: Milestone = {
        id: Date.now().toString(),
        title: newMilestone.title,
        description: newMilestone.description,
        amount: parseFloat(newMilestone.amount),
        duration: parseFloat(newMilestone.duration),
        durationType: newMilestone.durationType,
      };
      setFormData((prev) => ({
        ...prev,
        milestones: [...prev.milestones, milestone],
      }));
      setNewMilestone({
        title: "",
        description: "",
        amount: "",
        duration: "",
        durationType: "days",
      });
    }
  };

  const deleteMilestone = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((m) => m.id !== id),
    }));
  };

  const editMilestone = (id: string) => {
    const milestone = formData.milestones.find((m) => m.id === id);
    if (milestone) {
      setNewMilestone({
        title: milestone.title,
        description: milestone.description,
        amount: milestone.amount.toString(),
        duration: milestone.duration.toString(),
        durationType: milestone.durationType,
      });
      deleteMilestone(id);
    }
  };

  const calculateTotalCost = () => {
    return formData.milestones.reduce((sum, m) => sum + m.amount, 0);
  };

  const calculatePlatformFee = () => {
    return calculateTotalCost() * 0.1;
  };

  const calculateYouReceive = () => {
    return calculateTotalCost() - calculatePlatformFee();
  };

  const handleSubmit = () => {
    if (!jobDetails) {
      setJobError("Job details not available");
      return;
    }
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    const senderId = localStorage.getItem("userId");
    const recipientId = jobDetails.clientId || "";
    const gigId = String(jobDetails.id);
    const form = new URLSearchParams();
    form.append("senderId", senderId || "");
    form.append("recipientId", recipientId);
    form.append("gigId", gigId);
    form.append("coverLetter", formData.coverLetter);
    form.append("rate", calculateTotalCost().toString());
    form.append("deliveryTime", formData.milestones.reduce((total, m) => total + m.duration, 0).toString());
    fetch("https://foundit-c7e7.onrender.com/chat/sendProposal", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to send proposal message");
        return res.text();
      })
      .then(() => {
        setIsSubmitting(false);
        router.push("/page/freelancer/home"); // Redirect to freelancer homepage
      })
      .catch((err) => {
        setIsSubmitting(false);
        setJobError(err.message || "Failed to send proposal message");
      });
  };

  const handleCancel = () => {
    // Navigate back or clear form
    console.log("Cancelling proposal");
  };

  // Helper functions for word counting
  const getWordCount = (text: string) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const getCoverLetterWordCount = () => {
    return getWordCount(formData.coverLetter);
  };

  const getScreeningAnswerWordCount = (id: string) => {
    const question = formData.screeningQuestions.find((q) => q.id === id);
    return question ? getWordCount(question.answer) : 0;
  };

  // Validation function
  const isFormValid = () => {
    const hasCoverLetter = formData.coverLetter.trim().length > 0;
    const hasMilestones = formData.milestones.length > 0;
    const allScreeningAnswered = formData.screeningQuestions.every(
      (q) => q.answer.trim().length > 0,
    );
    return hasCoverLetter && hasMilestones && allScreeningAnswered;
  };

  return (
    <div className="bg-white w-full min-h-screen">
      {/* Loading/Error for job details */}
      {loadingJob && (
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading job details...</div>
        </div>
      )}
      {jobError && (
        <div className="flex items-center justify-center py-12">
          <div className="text-red-500 font-semibold">{jobError}</div>
        </div>
      )}

      {/* Job Details Card (conditionally rendered) */}
      {!isSubmitting && !loadingJob && !jobError && jobDetails && (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="flex items-center gap-2 mb-6 cursor-pointer hover:opacity-70 transition-opacity">
            <div className="size-4">
              <svg
                className="block size-full -mt-2"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.33333"
                />
              </svg>
            </div>
            <p className="font-['Arial:Regular',sans-serif] leading-5 text-[#717182] text-sm">
              Back to Job
            </p>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-2 mb-6">
            <p className="font-['Arial:Regular',sans-serif] leading-9 text-[#1a1a1a] text-xl sm:text-2xl md:text-3xl">
              Submit Proposal
            </p>
            <p className="font-['Arial:Regular',sans-serif] leading-6 text-[#717182] text-sm sm:text-base">
              Apply for this job by completing the form below
            </p>
          </div>

          {/* Job Details Card */}
          <div className="bg-white border-l-4 border-[#615fff] rounded-2xl mb-6 p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <p className="font-['Arial:Regular',sans-serif] leading-6 text-[#1a1a1a] text-base mb-2">
                  {jobDetails.title}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <p className="font-['Arial:Regular',sans-serif] leading-5 text-[#717182] text-sm">
                    Posted by {jobDetails.postedBy.name}
                  </p>
                  <p className="font-['Arial:Regular',sans-serif] leading-5 text-[#717182] text-sm">
                    • {jobDetails.postedDate}
                  </p>
                </div>
              </div>
              {jobDetails.isVerifiedClient && (
                <div className="bg-[#dbeafe] px-3 rounded-lg">
                  <p className="font-['Arial:Regular',sans-serif] leading-4 text-[#1447e6] text-xs mt-3">
                    Verified Client
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="size-4">
                  <svg
                    className="block size-full"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 1.33333V14.6667"
                      stroke="#717182"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33333"
                    />
                    <path
                      d="M11.3333 3.33333H6.33333C5.71449 3.33333 5.121 3.57917 4.68342 4.01675C4.24583 4.45434 4 5.04783 4 5.66667C4 6.2855 4.24583 6.879 4.68342 7.31658C5.121 7.75417 5.71449 8 6.33333 8H9.66667C10.2855 8 10.879 8.24583 11.3166 8.68342C11.7542 9.121 12 9.71449 12 10.3333C12 10.9522 11.7542 11.5457 11.3166 11.9832C10.879 12.4208 10.2855 12.6667 9.66667 12.6667H4"
                      stroke="#717182"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33333"
                    />
                  </svg>
                </div>
                <span className="text-[#1a1a1a]">{jobDetails.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4">
                  <svg
                    className="block size-full"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <rect
                      x="2"
                      y="3.33333"
                      width="12"
                      height="10.6667"
                      rx="1.33333"
                      stroke="#717182"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33333"
                    />
                    <path
                      d="M5.33333 1.33333V4"
                      stroke="#717182"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33333"
                    />
                    <path
                      d="M10.6667 1.33333V4"
                      stroke="#717182"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33333"
                    />
                    <path
                      d="M2 6.66667H14"
                      stroke="#717182"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33333"
                    />
                  </svg>
                </div>
                <span className="text-[#1a1a1a]">{jobDetails.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4">
                  <svg
                    className="block size-full"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="10"
                      height="10"
                      rx="1"
                      stroke="#717182"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33333"
                    />
                    <path
                      d="M6.66667 6H5.33333"
                      stroke="#717182"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33333"
                    />
                    <path
                      d="M10.6667 8.66667H5.33333"
                      stroke="#717182"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33333"
                    />
                    <path
                      d="M10.6667 11.3333H5.33333"
                      stroke="#717182"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33333"
                    />
                  </svg>
                </div>
                <span className="text-[#1a1a1a]">
                  {jobDetails.proposalsCount} proposals
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cover Letter Card */}
      <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.1)] mb-6 p-1">
        <div className="p-5 sm:p-6">
          <p className="font-['Arial:Regular',sans-serif] leading-4 text-[#1a1a1a] text-base mb-1">
            Cover Letter
          </p>
          <p className="font-['Arial:Regular',sans-serif] leading-5 text-[#717182] text-sm mb-6">
            Explain why you're a great fit for this job
          </p>
          <textarea
            className="w-full bg-[#f3f3f5] rounded-lg px-3 py-2 text-sm text-[#1a1a1a] min-h-[200px] resize-y focus:outline-none focus:ring-2 focus:ring-[#615fff]"
            placeholder="Dear Client,

                  I am excited to apply for this position because...

                  My relevant experience includes...

                  I can deliver this project by...

                  Looking forward to working with you!"
            value={formData.coverLetter}
            onChange={(e) => handleCoverLetterChange(e.target.value)}
          />
          <div className="flex items-center justify-between mt-2">
            <p
              className={`text-xs ${
                getCoverLetterWordCount() >= 500
                  ? "text-[#d4183d]"
                  : "text-[#717182]"
              }`}
            >
              {getCoverLetterWordCount()}/500 words
              {getCoverLetterWordCount() >= 500 && " - Limit reached"}
            </p>
            <p className="text-[#717182] text-xs">
              {characterCount} characters
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio & Samples Card */}
      <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.1)] mb-6 p-1">
        <div className="p-5 sm:p-6">
          <p className="font-['Arial:Regular',sans-serif] leading-4 text-[#1a1a1a] text-base mb-1">
            Portfolio & Samples{" "}
            <span className="text-[#717182]">(Optional)</span>
          </p>
          <p className="font-['Arial:Regular',sans-serif] leading-5 text-[#717182] text-sm mb-6">
            Share relevant work samples or portfolio links
          </p>

          {/* Portfolio Links */}
          <div className="mb-6">
            <p className="font-['Arial:Regular',sans-serif] leading-3.5 text-[#1a1a1a] text-sm mb-2">
              Portfolio Links
            </p>
            {formData.portfolioLinks.map((link, index) => (
              <input
                key={index}
                type="url"
                className="w-full bg-[#f3f3f5] rounded-lg px-3 py-2 text-sm text-[#1a1a1a] mb-2 focus:outline-none focus:ring-2 focus:ring-[#615fff]"
                placeholder="https://yourportfolio.com/project"
                value={link}
                onChange={(e) =>
                  handlePortfolioLinkChange(index, e.target.value)
                }
              />
            ))}
            <div
              className="inline-flex items-center justify-center bg-white border border-[rgba(0,0,0,0.1)] rounded-lg px-4 py-2 text-sm text-[#1a1a1a] cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={addPortfolioLink}
            >
              + Add Another Link
            </div>
          </div>

          {/* Divider */}
          <div className="bg-[rgba(0,0,0,0.1)] h-px w-full my-6" />

          {/* Attachments */}
          <p className="font-['Arial:Regular',sans-serif] leading-3.5 text-[#1a1a1a] text-sm mb-2 mt-4">
            Attachments
          </p>
          <p className="font-['Arial:Regular',sans-serif] leading-5 text-[#717182] text-sm mb-4">
            Upload relevant files (PDF, images, documents)
          </p>
          <div className="relative">
            <input
              type="file"
              multiple
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileUpload}
            />
            <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-lg h-9 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2">
                <div className="size-4">
                  <svg
                    className="block size-full "
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 10V3"
                      stroke="#1A1A1A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33333"
                    />
                    <path
                      d="M5 6L8 3L11 6"
                      stroke="#1A1A1A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33333"
                    />
                    <path
                      d="M3 10V12C3 12.5304 3.21071 13.0391 3.58579 13.4142C3.96086 13.7893 4.46957 14 5 14H11C11.5304 14 12.0391 13.7893 12.4142 13.4142C12.7893 13.0391 13 12.5304 13 12V10"
                      stroke="#1A1A1A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33333"
                    />
                  </svg>
                </div>
                <p className="font-['Arial:Regular',sans-serif] leading-5 text-[#1a1a1a] text-sm mt-3">
                  Upload File
                </p>
              </div>
            </div>
          </div>
          {formData.attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-xs text-[#717182] mb-2">
                {formData.attachments.length} file(s) uploaded:
              </p>
              {formData.attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#f3f3f5] rounded-lg px-3 py-2"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="size-4 flex-shrink-0">
                      <svg
                        className="block size-full"
                        fill="none"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M6.66667 6H5.33333"
                          stroke="#615fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33333"
                        />
                        <path
                          d="M10.6667 8.66667H5.33333"
                          stroke="#615fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33333"
                        />
                        <path
                          d="M10.6667 11.3333H5.33333"
                          stroke="#615fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33333"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-[#1a1a1a] truncate">
                      {file.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#717182] flex-shrink-0">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                    <div
                      className="size-4 flex-shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
                      onClick={() => {
                        const newAttachments = formData.attachments.filter(
                          (_, i) => i !== index,
                        );
                        setFormData((prev) => ({
                          ...prev,
                          attachments: newAttachments,
                        }));
                      }}
                    >
                      <svg
                        className="block size-full"
                        fill="none"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M6.66667 7.33333V11.3333"
                          stroke="#d4183d"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33333"
                        />
                        <path
                          d="M9.33333 7.33333V11.3333"
                          stroke="#d4183d"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33333"
                        />
                        <path
                          d="M2 4H14"
                          stroke="#d4183d"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33333"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Milestones Card */}
      <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.1)] mb-6 p-1">
        <div className="p-5 sm:p-6">
          <p className="font-['Arial:Regular',sans-serif] leading-4 text-[#1a1a1a] text-base mb-1">
            Milestones
          </p>
          <p className="font-['Arial:Regular',sans-serif] leading-5 text-[#717182] text-sm mb-6">
            Break down the project into manageable milestones with individual
            deliverables
          </p>

          {/* Existing Milestones */}
          {formData.milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="bg-white border border-[#e5e7eb] rounded-lg p-4 mb-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-[rgba(79,57,246,0.27)] rounded-full size-6 flex items-center justify-center flex-shrink-0">
                    <p className="font-['Arial:Regular',sans-serif] leading-4 text-[#4f39f6] text-xs">
                      {index + 1}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Arial:Regular',sans-serif] leading-6 text-[#1a1a1a] text-base mb-1">
                      {milestone.title}
                    </p>
                    <p className="font-['Arial:Regular',sans-serif] leading-5 text-[#717182] text-sm mb-2">
                      {milestone.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#717182]">
                      <div className="flex items-center gap-1">
                        <div className="size-3">
                          <svg
                            className="block size-full"
                            fill="none"
                            viewBox="0 0 12 12"
                          >
                            <path
                              d="M6 1V11"
                              stroke="#717182"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.5 2.5H4.75C4.28587 2.5 3.84075 2.68437 3.51256 3.01256C3.18437 3.34075 3 3.78587 3 4.25C3 4.71413 3.18437 5.15925 3.51256 5.48744C3.84075 5.81563 4.28587 6 4.75 6H7.25C7.71413 6 8.15925 6.18437 8.48744 6.51256C8.81563 6.84075 9 7.28587 9 7.75C9 8.21413 8.81563 8.65925 8.48744 8.98744C8.15925 9.31563 7.71413 9.5 7.25 9.5H3"
                              stroke="#717182"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span>${milestone.amount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="size-3">
                          <svg
                            className="block size-full"
                            fill="none"
                            viewBox="0 0 12 12"
                          >
                            <circle
                              cx="6"
                              cy="6"
                              r="4.5"
                              stroke="#717182"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6 3V6L8 7"
                              stroke="#717182"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span>
                          {milestone.duration} {milestone.durationType}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className="rounded-lg size-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => editMilestone(milestone.id)}
                  >
                    <div className="size-4">
                      <svg
                        className="block size-full"
                        fill="none"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M11.3333 2L14 4.66667L4.66667 14H2V11.3333L11.3333 2Z"
                          stroke="#1A1A1A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33333"
                        />
                        <path
                          d="M9.66667 3.66667L12.3333 6.33333"
                          stroke="#1A1A1A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33333"
                        />
                      </svg>
                    </div>
                  </div>
                  <div
                    className="rounded-lg size-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => deleteMilestone(milestone.id)}
                  >
                    <div className="size-4">
                      <svg
                        className="block size-full"
                        fill="none"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M2 4H14"
                          stroke="#1A1A1A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33333"
                        />
                        <path
                          d="M6.66667 7.33333V11.3333"
                          stroke="#1A1A1A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33333"
                        />
                        <path
                          d="M9.33333 7.33333V11.3333"
                          stroke="#1A1A1A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33333"
                        />
                        <path
                          d="M3.33333 4V13.3333C3.33333 13.687 3.47381 14.0261 3.72386 14.2761C3.97391 14.5262 4.31304 14.6667 4.66667 14.6667H11.3333C11.687 14.6667 12.0261 14.5262 12.2761 14.2761C12.5262 14.0261 12.6667 13.687 12.6667 13.3333V4"
                          stroke="#1A1A1A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33333"
                        />
                        <path
                          d="M5.33333 4V2.66667C5.33333 2.31304 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31304 1.33333 6.66667 1.33333H9.33333C9.68696 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31304 10.6667 2.66667V4"
                          stroke="#1A1A1A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33333"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Cost Summary */}
          {formData.milestones.length > 0 && (
            <div className="bg-[rgba(198,210,255,0.5)] border border-[#615fff] rounded-lg p-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <p className="text-[#717182] text-sm">Total Project Cost</p>
                <p className="text-[#1a1a1a] text-base">
                  ${calculateTotalCost().toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <p className="text-[#717182] text-sm">
                  Platform Fee - You will be charged (10%)
                </p>
                <p className="text-[#1a1a1a] text-base">
                  -${calculatePlatformFee().toFixed(2)}
                </p>
              </div>
              <div className="bg-[rgba(0,0,0,0.1)] h-px w-full my-2" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-[#1a1a1a] text-base">You&apos;ll Receive</p>
                <p className="text-[#615fff] text-base">
                  ${calculateYouReceive().toFixed(2)}
                </p>
              </div>
            </div>
          )}

          {/* Add New Milestone Form */}
          <div className="bg-[rgba(238,242,255,0.3)] border border-[#c6d2ff] rounded-lg p-4">
            <p className="font-['Arial:Regular',sans-serif] leading-6 text-[#1a1a1a] text-base mb-4">
              Add New Milestone
            </p>

            <div className="space-y-4">
              <div>
                <p className="font-['Arial:Regular',sans-serif] leading-3.5 text-[#1a1a1a] text-sm mb-2">
                  Milestone Title *
                </p>
                <input
                  type="text"
                  className="w-full bg-[#f3f3f5] rounded-lg px-3 py-2 text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#615fff]"
                  placeholder="e.g., Initial Design Phase"
                  value={newMilestone.title}
                  onChange={(e) =>
                    setNewMilestone((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <p className="font-['Arial:Regular',sans-serif] leading-3.5 text-[#1a1a1a] text-sm mb-2">
                  Description
                </p>
                <textarea
                  className="w-full bg-[#f3f3f5] rounded-lg px-3 py-2 text-sm text-[#1a1a1a] min-h-[64px] resize-y focus:outline-none focus:ring-2 focus:ring-[#615fff]"
                  placeholder="Describe what will be delivered in this milestone..."
                  value={newMilestone.description}
                  onChange={(e) =>
                    setNewMilestone((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-['Arial:Regular',sans-serif] leading-3.5 text-[#1a1a1a] text-sm mb-2">
                    Amount *
                  </p>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182] text-base">
                      $
                    </span>
                    <input
                      type="number"
                      className="w-full bg-[#f3f3f5] rounded-lg pl-7 pr-3 py-2 text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#615fff]"
                      placeholder="500"
                      value={newMilestone.amount}
                      onChange={(e) =>
                        setNewMilestone((prev) => ({
                          ...prev,
                          amount: e.target.value,
                        }))
                      }
                    />
                  </div>
                  {newMilestone.amount &&
                    parseFloat(newMilestone.amount) > 0 && (
                      <p className="text-xs text-[#717182] mt-1">
                        You will be charged $
                        {(parseFloat(newMilestone.amount) * 0.1).toFixed(2)}{" "}
                        (10% platform fee)
                      </p>
                    )}
                </div>

                <div>
                  <p className="font-['Arial:Regular',sans-serif] leading-3.5 text-[#1a1a1a] text-sm mb-2">
                    Duration *
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="number"
                      className="w-full sm:flex-1 bg-[#f3f3f5] rounded-lg px-3 py-2 text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#615fff]"
                      placeholder="7"
                      value={newMilestone.duration}
                      onChange={(e) =>
                        setNewMilestone((prev) => ({
                          ...prev,
                          duration: e.target.value,
                        }))
                      }
                    />
                    <div className="flex gap-3 sm:gap-2">
                      <div
                        className={`flex items-center gap-1.5 cursor-pointer ${
                          newMilestone.durationType === "days"
                            ? "opacity-100"
                            : "opacity-50"
                        }`}
                        onClick={() =>
                          setNewMilestone((prev) => ({
                            ...prev,
                            durationType: "days",
                          }))
                        }
                      >
                        <div
                          className={`size-4 rounded-full border-2 flex items-center justify-center ${
                            newMilestone.durationType === "days"
                              ? "border-[#615FFF]"
                              : "border-gray-300"
                          }`}
                        >
                          {newMilestone.durationType === "days" && (
                            <div className="size-2 rounded-full bg-[#615FFF]" />
                          )}
                        </div>
                        <p className="text-sm text-[#1a1a1a] mt-3">Days</p>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 cursor-pointer ${
                          newMilestone.durationType === "weeks"
                            ? "opacity-100"
                            : "opacity-50"
                        }`}
                        onClick={() =>
                          setNewMilestone((prev) => ({
                            ...prev,
                            durationType: "weeks",
                          }))
                        }
                      >
                        <div
                          className={`size-4 rounded-full border-2 flex items-center justify-center ${
                            newMilestone.durationType === "weeks"
                              ? "border-[#615FFF]"
                              : "border-gray-300"
                          }`}
                        >
                          {newMilestone.durationType === "weeks" && (
                            <div className="size-2 rounded-full bg-[#615FFF]" />
                          )}
                        </div>
                        <p className="text-sm text-[#1a1a1a] mt-3">Weeks</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                <div
                  className="bg-white border border-[rgba(0,0,0,0.1)] rounded-lg px-4 py-2 text-sm text-[#1a1a1a] cursor-pointer hover:bg-gray-50 transition-colors text-center"
                  onClick={() =>
                    setNewMilestone({
                      title: "",
                      description: "",
                      amount: "",
                      duration: "",
                      durationType: "days",
                    })
                  }
                >
                  Cancel
                </div>
                <div
                  className={`bg-[#615fff] rounded-lg px-4 py-2 text-sm text-white cursor-pointer transition-all text-center ${
                    newMilestone.title &&
                    newMilestone.amount &&
                    newMilestone.duration
                      ? "opacity-100 hover:bg-[#4f39f6]"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={addMilestone}
                >
                  Add Milestone
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screening Questions Card */}
      <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.1)] mb-6 p-1">
        <div className="p-5 sm:p-6">
          <p className="font-['Arial:Regular',sans-serif] leading-4 text-[#1a1a1a] text-base mb-1">
            Screening Questions
          </p>
          <p className="font-['Arial:Regular',sans-serif] leading-5 text-[#717182] text-sm mb-6">
            The client would like to know more about you
          </p>

          <div className="space-y-4">
            {formData.screeningQuestions.map((q, index) => (
              <div key={q.id}>
                <p className="font-['Arial:Regular',sans-serif] leading-3.5 text-[#1a1a1a] text-sm mb-2">
                  {index + 1}. {q.question}
                </p>
                <textarea
                  className="w-full bg-[#f3f3f5] rounded-lg px-3 py-2 text-sm text-[#1a1a1a] min-h-[64px] resize-y focus:outline-none focus:ring-2 focus:ring-[#615fff]"
                  placeholder="Your answer..."
                  value={q.answer}
                  onChange={(e) =>
                    handleScreeningAnswerChange(q.id, e.target.value)
                  }
                />
                <p
                  className={`text-xs mt-1 ${
                    getScreeningAnswerWordCount(q.id) >= 100
                      ? "text-[#d4183d]"
                      : "text-[#717182]"
                  }`}
                >
                  {getScreeningAnswerWordCount(q.id)}/100 words
                  {getScreeningAnswerWordCount(q.id) >= 100 &&
                    " - Limit reached"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Note Card */}
      <div className="bg-[#fffbeb] border border-[#fee685] rounded-2xl p-4 mb-6">
        <div className="flex gap-2">
          <p className="font-['Arial:Bold',sans-serif] leading-5 text-[#7b3306] text-sm flex-shrink-0">
            Note:
          </p>
          <p className="font-['Arial:Regular',sans-serif] leading-5 text-[#7b3306] text-sm">
            By submitting this proposal, you agree to the platform&apos;s terms
            of service. If selected, you&apos;ll enter into a contract with the
            client and be expected to deliver the work as described.
          </p>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="bg-[#f9fafb] border-t border-[rgba(0,0,0,0.1)] sticky bottom-0 py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="max-w-7xl mx-auto flex gap-3">
          <div
            className="flex-1 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg py-2 text-center text-sm text-[#1a1a1a] cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={handleCancel}
          >
            Cancel
          </div>
          <div
            className={`flex-1 bg-[#4f39f6] rounded-lg py-2 text-center text-sm text-white cursor-pointer transition-all ${
              isFormValid()
                ? "opacity-100 hover:bg-[#432dd7]"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Submitting..." : "Submit Proposal"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalForm;
