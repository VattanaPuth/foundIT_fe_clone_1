"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProposalTopRow from "@/app/components/styles/client_styles/application/ProposalTopRow";
import ProposalCandidateCard from "@/app/components/styles/client_styles/application/ProposalCandidateCard";
import ProposalSidebar from "@/app/components/styles/client_styles/application/ProposalSidebar";

import { proposalMock } from "@/app/components/styles/client_styles/application/mockdata";
import {
  IconHired,
  IconPaperclip,
  IconDownload,
  IconEye,
  IconStar,
  IconShare,
  IconSend,
  IconMore,
  IconSee,
  IconMessage,
  IconShield,
} from "./icons";
import ClientNavHeader from "@/app/components/styles/global_styles/client/header";
import ClientFooter from "@/app/components/styles/global_styles/client/footer";

interface ProposalMilestone {
  id: number;
  offerId: number;
  description: string;
  amount: number;
  orderIndex: number;
}

interface ProposalDetail {
  id: number;
  jobPostId: number;
  jobTitle: string;
  clientId: number;
  clientName?: string;
  freelancerId: number;
  freelancerName: string;
  freelancerAvatar?: string;
  freelancerBio?: string;
  freelancerSkill?: string;
  freelancerRating?: number;
  freelancerReviewCount?: number;
  coverLetter: string;
  proposedBudget: number;
  currency: string;
  deliveryDays: number;
  status: string;
  projectId?: number;
  createdAt: string;
  milestones: ProposalMilestone[];
}

export default function ProposalDetailPageShell() {
  const [shortlisted, setShortlisted] = useState(false);
  const [proposalData, setProposalData] = useState<ProposalDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const proposalId = searchParams.get("id");

  useEffect(() => {
    const fetchProposalDetail = async () => {
      if (!proposalId) {
        console.error("No proposal ID provided");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8085/proposals/${proposalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Proposal data fetched:", data);
          setProposalData(data);
        } else {
          console.error("Failed to fetch proposal");
        }
      } catch (error) {
        console.error("Error fetching proposal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposalDetail();
  }, [proposalId]);

  const handleAccept = async () => {
    if (!proposalData || !proposalId) return;

    if (!confirm(`Accept proposal from ${proposalData.freelancerName}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const clientId = localStorage.getItem("userId");

      // Accept proposal API call
      const response = await fetch(
        `http://localhost:8085/proposals/${proposalId}/accept?clientId=${clientId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Proposal accepted successfully!");
        // Prepare freelancer data for milestone contract page
        const freelancerData = {
          id: proposalData.freelancerId,
          gigId: proposalData.jobPostId,
          name: proposalData.freelancerName,
          title: proposalData.freelancerSkill || "Professional",
          rating: proposalData.freelancerRating || 0,
          reviewCount: proposalData.freelancerReviewCount || 0,
          hourlyRate: proposalData.proposedBudget || 0,
          avatarUrl:
            proposalData.freelancerAvatar || "/images/default-avatar.png",
        };
        // Pass freelancer data via query param
        router.push(
          `/page/client/milestone?freelancer=${encodeURIComponent(
            JSON.stringify(freelancerData)
          )}`
        );
      } else {
        alert("Failed to accept proposal");
      }
    } catch (error) {
      console.error("Error accepting proposal:", error);
      alert("Error accepting proposal");
    }
  };

  const handleReject = async () => {
    if (!proposalData || !proposalId) return;

    const reason = prompt("Reason for declining (optional):");
    if (reason === null) return; // User cancelled

    try {
      const token = localStorage.getItem("token");
      const clientId = localStorage.getItem("userId");

      const response = await fetch(
        `http://localhost:8085/proposals/${proposalId}/reject?clientId=${clientId}&reason=${encodeURIComponent(
          reason
        )}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Proposal declined");
        router.push("/page/client/application");
      } else {
        alert("Failed to decline proposal");
      }
    } catch (error) {
      console.error("Error declining proposal:", error);
      alert("Error declining proposal");
    }
  };

  if (loading) {
    return (
      <>
        <ClientNavHeader />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-500">Loading proposal...</div>
        </main>
      </>
    );
  }

  if (!proposalData) {
    return (
      <>
        <ClientNavHeader />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-500">Proposal not found</div>
        </main>
      </>
    );
  }

  return (
    <>
      <ClientNavHeader />
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-4">
          <ProposalTopRow />

          <div className="mt-4">
            <ProposalCandidateCard
              candidate={{
                name: proposalData.freelancerName || "Freelancer",
                role: proposalData.freelancerSkill || "Professional",
                avatarSrc:
                  proposalData.freelancerAvatar || "/images/default-avatar.png",
                badges: [
                  { label: "Top Rated", tone: "green" },
                  {
                    label: proposalData.status,
                    tone:
                      proposalData.status === "ACCEPTED" ? "green" : "neutral",
                  },
                ],
                statsLeft: proposalData.freelancerRating
                  ? `${proposalData.freelancerRating.toFixed(1)} (${
                      proposalData.freelancerReviewCount || 0
                    } reviews)`
                  : "No reviews yet",
                statsRight: `${proposalData.currency}${proposalData.proposedBudget} • ${proposalData.deliveryDays} days`,
                submitted: new Date(
                  proposalData.createdAt
                ).toLocaleDateString(),
                lastViewed: "Just now",
              }}
              shortlisted={shortlisted}
              onToggleShortlist={() => setShortlisted((v) => !v)}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
            {/* LEFT */}
            <section className="space-y-4">
              {/* Cover Letter */}
              <SectionCard title="Cover Letter">
                <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
                  <p>
                    {proposalData.coverLetter || "No cover letter provided."}
                  </p>
                </div>
              </SectionCard>

              {/* Milestones */}
              <SectionCard title="Milestones">
                <div className="space-y-3">
                  {proposalData.milestones &&
                  proposalData.milestones.length > 0 ? (
                    proposalData.milestones.map((m, idx) => (
                      <div
                        key={m.id}
                        className="rounded-xl border border-gray-200 bg-white p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="mb-3 inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-[11px] text-gray-700">
                                {m.orderIndex}
                              </span>
                              <p className="text-sm font-semibold text-gray-900">
                                Milestone {m.orderIndex}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {m.description}
                            </p>
                          </div>

                          <div className="text-sm font-semibold text-gray-900">
                            {proposalData.currency}
                            {m.amount}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No milestones defined.
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-1 text-sm">
                    <span className="text-xs text-gray-500">
                      Total project cost
                    </span>
                    <span className="font-semibold text-gray-900">
                      {proposalData.currency}
                      {proposalData.proposedBudget}
                    </span>
                  </div>
                </div>
              </SectionCard>

              {/* Attachments */}
              <SectionCard
                title={`Attachments (${proposalMock.attachments.length})`}
                right={
                  <ActionPill
                    icon="download"
                    label="Download all"
                    onClick={() => {}}
                  />
                }
              >
                <div className="space-y-2">
                  {proposalMock.attachments.map((a) => (
                    <div
                      key={a.name}
                      className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600">
                          {/* Big icon like Figma (replace if needed) */}
                          <IconPaperclip />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm text-gray-900 truncate">
                            {a.name}
                          </p>
                          <p className="mt-0.5 text-[11px] text-gray-500">
                            {a.meta}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <ActionPill
                          icon="eye"
                          label="Preview"
                          onClick={() => {}}
                        />
                        <IconSquareAction
                          ariaLabel="Open file"
                          onClick={() => {}}
                        >
                          <IconDownload />
                        </IconSquareAction>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Screening Questions */}
              <SectionCard title="Screening Questions">
                <div className="space-y-3">
                  {proposalMock.screeningQA.map((qa) => (
                    <div
                      key={qa.q}
                      className="rounded-xl border border-gray-200 bg-white p-3"
                    >
                      <p className="text-xs font-semibold text-gray-900">
                        {qa.q}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">{qa.a}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Relevant Experience */}
              <SectionCard title="Relevant Experience">
                <div className="space-y-3">
                  {proposalMock.relevantExperience.map((r) => (
                    <div
                      key={r.title}
                      className="rounded-xl border border-gray-200 bg-white p-3"
                    >
                      <p className="text-sm font-semibold text-gray-900">
                        {r.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">{r.desc}</p>

                      {r.linkLabel ? (
                        <div className="mt-2">
                          <InlineLink label={r.linkLabel} />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Work Samples */}
              <SectionCard
                title="Work Samples"
                right={<InlineLink label="View full portfolio" withIcon />}
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {proposalMock.workSamples.map((w) => (
                    <div
                      key={w.title}
                      className="rounded-xl border border-gray-200 bg-white overflow-hidden"
                    >
                      <div className="h-28 bg-gray-100">
                        <img
                          src="/placeholder-sample.jpg"
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-semibold text-gray-900">
                          {w.title}
                        </p>
                        <p className="mt-1 text-xs text-gray-600">{w.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Recent Work History */}
              <SectionCard
                title="Recent Work History"
                right={<InlineLink label="View full profile" withIcon />}
              >
                <div className="space-y-3">
                  {proposalMock.recentWorkHistory.map((r) => (
                    <div
                      key={r.title}
                      className="rounded-xl border border-gray-200 bg-white p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900">
                            {r.title}
                          </p>
                          <p className="mt-1 text-xs text-gray-600">{r.desc}</p>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="inline-flex items-center gap-1 text-xs text-gray-700">
                            <IconStar />
                            {r.rating}
                          </div>
                          <p className="mt-1 text-[11px] text-gray-500">
                            {r.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Timeline & Activity */}
              <SectionCard title="Timeline & Activity">
                <div className="space-y-2">
                  {proposalMock.timelineActivity.map((t) => (
                    <div
                      key={t.label}
                      className="flex items-start justify-between gap-3 rounded-xl border border-gray-200 bg-white p-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm text-gray-700">{t.label}</span>
                      </div>
                      <span className="text-xs text-gray-500">{t.time}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Communication (ONLY 2 buttons, no placeholder) */}
              <SectionCard title="Communication">
                <p className="text-xs text-gray-500">
                  No messages yet with this freelancer
                </p>

                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                  <ActionButton label="Start conversation" tone="neutral" />
                  <ActionButton label="Schedule interview" tone="neutral" />
                </div>
              </SectionCard>

              {/* Trust & Safety */}
              <SectionCard title="Trust & Safety">
                <div className="rounded-xl border border-gray-200 bg-blue-50 px-3 py-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-green-700">
                      <IconShield />
                    </span>
                    <p>ID verification completed. Payment method verified.</p>
                  </div>
                </div>
              </SectionCard>
            </section>

            {/* RIGHT */}
            <aside>
              <ProposalSidebar
                bid={proposalMock.bid}
                match={proposalMock.match}
              />
            </aside>
          </div>
        </div>
      </main>
      <ClientFooter />
    </>
  );
}

/* ---------------------------- Shared UI pieces ---------------------------- */

function SectionCard({
  title,
  right,
  children,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  // Figma has minimal inner dividers: no heavy border-b lines
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      <div className="px-4 pb-4 pt-1">{children}</div>
    </div>
  );
}

function InlineLink({
  label,
  withIcon,
}: {
  label: string;
  withIcon?: boolean;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {}}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && (e.preventDefault(), void 0)
      }
      className="inline-flex items-center gap-2 text-xs text-green-600 cursor-pointer select-none hover:text-green-700"
      aria-label={label}
    >
      {label}
      {withIcon ? <IconSee /> : null}
    </div>
  );
}

function ActionButton({
  label,
  tone,
}: {
  label: string;
  tone: "neutral" | "green" | "danger";
}) {
  const base =
    "h-9 px-3 rounded-md text-xs cursor-pointer select-none flex items-center justify-center";
  const cls =
    tone === "green"
      ? `${base} bg-green-500 hover:bg-green-600 text-white`
      : tone === "danger"
      ? `${base} border border-red-200 bg-white text-red-600 hover:bg-red-50`
      : `${base} border border-gray-200 bg-white text-gray-700 hover:bg-gray-50`;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {}}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && (e.preventDefault(), void 0)
      }
      className={cls}
      aria-label={label}
    >
      {label}
    </div>
  );
}

function ActionPill({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: "download" | "eye";
  onClick: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onClick())
      }
      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 cursor-pointer select-none hover:bg-gray-50"
      aria-label={label}
    >
      {icon === "download" ? <IconDownload /> : <IconEye />}
      {label}
    </div>
  );
}

function IconSquareAction({
  ariaLabel,
  onClick,
  children,
}: {
  ariaLabel: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onClick())
      }
      className="h-9 w-9 rounded-md border border-gray-200 bg-white flex items-center justify-center text-gray-700 cursor-pointer select-none hover:bg-gray-50"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}
