"use client";


import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

// DTO types for backend responses
type ProposalDto = {
  id: string | number;
  freelancerName?: string;
  freelancerSkill?: string;
  freelancerRating?: number;
  freelancerReviewCount?: number;
  proposedBudget?: number;
  deliveryDays?: number;
  coverLetter?: string;
  status?: string;
  createdAt?: string;
};
type MatchDto = {
  gigId: string | number;
  freelancerName?: string;
  skillName?: string;
  rating?: number;
  hourlyRate?: number;
};

import {
  TabKey,
  Proposal,
  MessageRow,
  HiredRow,
  MatchRow,
} from "@/app/components/styles/client_styles/application/mockdata";

import {
  IconMore,
  IconEye,
  IconSettings,
  IconPause,
  Iconx,
} from "@/app/components/styles/client_styles/application/icons";

import { handleKeyboardActivate } from "@/app/components/styles/client_styles/application/utils";

import TabsBar from "@/app/components/styles/client_styles/application/TabsBar";
import ProposalsPanel from "@/app/components/styles/client_styles/application/ProposalsPanel";
import MessagesPanel from "@/app/components/styles/client_styles/application/MessagesPanel";
import HiredPanel from "@/app/components/styles/client_styles/application/HiredPanel";
import ApplicationSidebar from "@/app/components/styles/client_styles/application/ApplicationSidebar";
import DropDownMenu from "@/app/components/styles/client_styles/application/DropDownMenu";

import ClientFooter from "@/app/components/styles/global_styles/client/footer";
import ClientNavHeader from "@/app/components/styles/global_styles/client/header";

// ✅ new modals (the ones we built for this page)
import PauseJobApplicationsModal from "@/app/components/styles/client_styles/application/PauseJobApplicationsModal";
import CloseJobPostingModal from "@/app/components/styles/client_styles/application/CloseJobPostingModal";

export default function ApplicationPage() {
  const router = useRouter();
  const { user } = useAuth();
  // const stickyTopClass = "top-[88px]"; // 72px header + 16px gap

  const [tab, setTab] = useState<TabKey>("proposals");

  // proposals shortlist state
  const [proposalList, setProposalList] = useState<Proposal[]>([]);
  const [isLoadingProposals, setIsLoadingProposals] = useState(true);

  // sidebar data
  const [matches, setMatches] = useState<MatchRow[]>([]);
  const [isLoadingMatches, setIsLoadingMatches] = useState(true);
  const [jobStats, setJobStats] = useState<{
    views: number;
    proposals: number;
  }>({ views: 0, proposals: 0 });

  // messages and hired data
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [hired, setHired] = useState<HiredRow[]>([]);
  const [isLoadingHired, setIsLoadingHired] = useState(true);

  // job info for header
  const [jobInfo, setJobInfo] = useState({
    title: "Loading...",
    postedLabel: "Posted recently",
    views: 0,
    proposals: 0,
    visibility: "Public",
  });

  // top-right job actions menu
  const [jobMenuOpen, setJobMenuOpen] = useState(false);

  // ✅ modals
  const [pauseOpen, setPauseOpen] = useState(false);
  const [closeOpen, setCloseOpen] = useState(false);

  const shortlistedCount = useMemo(
    () => proposalList.filter((p) => p.shortlisted).length,
    [proposalList],
  );

  // Fetch proposals from backend
  useEffect(() => {
    const fetchProposals = async () => {
      if (!user?.id) {
        setIsLoadingProposals(false);
        return;
      }

      try {
        setIsLoadingProposals(true);
        const response = await fetch(
          `https://foundit-c7e7.onrender.com/proposals/client/${user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          const data = await response.json();

          // Map backend data to frontend Proposal format
          const mappedProposals: Proposal[] = data.map((item: ProposalDto) => ({
            id: item.id.toString(),
            name: item.freelancerName || "Unknown Freelancer",
            title: item.freelancerSkill || "Freelancer",
            rating: item.freelancerRating || 0,
            reviews: item.freelancerReviewCount || 0,
            jobsDone: 0, // Not available in backend DTO
            country: "N/A", // Not available in backend DTO
            bid: item.proposedBudget || 0,
            durationLabel: item.deliveryDays
              ? `${item.deliveryDays} days`
              : "TBD",
            intro: item.coverLetter || "No cover letter provided",
            qa: [], // Not available in backend DTO
            attachments: [], // Not available in backend DTO
            shortlisted: false,
          }));

          setProposalList(mappedProposals);
        } else {
          console.error("Failed to fetch proposals");
          setProposalList([]);
        }
      } catch (error) {
        console.error("Error fetching proposals:", error);
        setProposalList([]);
      } finally {
        setIsLoadingProposals(false);
      }
    };

    fetchProposals();
  }, [user?.id]);

  // Fetch suggested matches (freelancers with gigs)
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setIsLoadingMatches(true);
        const response = await fetch(
          "https://foundit-c7e7.onrender.com/gigs/freelancer/client-view",
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          const data = await response.json();

          // Map backend data to match format, limit to 3-5 matches
          const mappedMatches = data.slice(0, 5).map((item: MatchDto) => ({
            id: item.gigId.toString(),
            name: item.freelancerName || "Unknown",
            subtitle: item.skillName || "Freelancer",
            rating: item.rating || 0,
            rate: item.hourlyRate ? `$${item.hourlyRate}/hr` : "Rate not set",
            tags: item.skillName ? [item.skillName] : [],
          }));

          setMatches(mappedMatches);
        } else {
          console.error("Failed to fetch matches");
          setMatches([]);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
        setMatches([]);
      } finally {
        setIsLoadingMatches(false);
      }
    };

    fetchMatches();
  }, []);

  // Fetch messages (conversations with freelancers)
  useEffect(() => {
    const fetchMessages = async () => {
      if (!user?.id) {
        setIsLoadingMessages(false);
        return;
      }

      try {
        setIsLoadingMessages(true);
        // TODO: Replace with actual messages endpoint when available
        // For now, we'll use an empty array or mock data structure
        // const response = await fetch(`https://foundit-c7e7.onrender.com/messages/client/${user.id}`);

        // Placeholder: Return empty messages for now
        setMessages([]);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [user?.id]);

  // Fetch hired freelancers (accepted contracts)
  useEffect(() => {
    const fetchHired = async () => {
      if (!user?.id) {
        setIsLoadingHired(false);
        return;
      }

      try {
        setIsLoadingHired(true);
        const response = await fetch(
          `https://foundit-c7e7.onrender.com/proposals/client/${user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          const data = await response.json();

          // Filter only accepted proposals
          const acceptedProposals = data.filter(
            (item: ProposalDto) => item.status === "ACCEPTED",
          );

          // Map to HiredRow format
          const mappedHired = acceptedProposals.map((item: ProposalDto) => ({
            id: item.id.toString(),
            name: item.freelancerName || "Unknown Freelancer",
            role: item.freelancerSkill || "Freelancer",
            rating: item.freelancerRating || 0,
            reviews: item.freelancerReviewCount || 0,
            jobsDone: 0, // Not available in backend
            status: "active" as const,
            contractValue: `$${item.proposedBudget || 0}`,
            timeline: item.deliveryDays ? `${item.deliveryDays} days` : "TBD",
            startLabel: "Started",
            startValue: item.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : "Recently",
          }));

          setHired(mappedHired);
        } else {
          console.error("Failed to fetch hired freelancers");
          setHired([]);
        }
      } catch (error) {
        console.error("Error fetching hired freelancers:", error);
        setHired([]);
      } finally {
        setIsLoadingHired(false);
      }
    };

    fetchHired();
  }, [user?.id]);

  // Fetch job details and update job info and stats
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!user?.id) return;
      try {
        const response = await fetch(
          `https://foundit-c7e7.onrender.com/jobs/client/${user.id}`,
        );
        if (response.ok) {
          const data = await response.json();
          const job = Array.isArray(data) ? data[0] : data;
          setJobStats({
            views: job.views || 0,
            proposals: proposalList.length,
          });
          setJobInfo({
            title: job.title || "-",
            postedLabel: job.dueDate ? `Due ${job.dueDate}` : "-",
            views: job.views || 0,
            proposals: proposalList.length,
            visibility: job.status || "-",
          });
        }
      } catch {
        setJobStats({ views: 0, proposals: proposalList.length });
        setJobInfo({
          title: "-",
          postedLabel: "-",
          views: 0,
          proposals: proposalList.length,
          visibility: "-",
        });
      }
    };
    fetchJobDetails();
  }, [user?.id, proposalList]);

  return (
    <>
      <ClientNavHeader />

      <div className="min-h-screen bg-gray-50">
        <main className="mx-auto max-w-6xl px-4 pb-16 pt-4">
          {/* Top job info header */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div
                role="button"
                tabIndex={0}
                onClick={() => {}}
                onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
                className="inline-flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none hover:text-gray-900"
                aria-label="Back to jobs"
              >
                <span className="text-lg leading-none">
                  {/* ✅ keep your exact inline SVG */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.00065 12.6654L3.33398 7.9987L8.00065 3.33203"
                      stroke="#717182"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.6673 8H3.33398"
                      stroke="#717182"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Back to jobs
              </div>

              <div className="mt-2 text-lg font-semibold text-gray-900">
                {jobInfo.title}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                  {jobInfo.postedLabel}
                </span>

                <span className="inline-flex items-center gap-1">
                  <IconEye />
                  {jobInfo.views} views
                </span>

                <span className="inline-flex items-center gap-1">
                  <span className="h-4 w-4 rounded bg-gray-200 inline-flex items-center justify-center text-[10px] text-gray-700">
                    {/* ✅ keep your exact inline doc SVG */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1565_12519)">
                        <path
                          d="M9.99935 1.33203H3.99935C3.64573 1.33203 3.30659 1.47251 3.05654 1.72256C2.80649 1.9726 2.66602 2.31174 2.66602 2.66536V13.332C2.66602 13.6857 2.80649 14.0248 3.05654 14.2748C3.30659 14.5249 3.64573 14.6654 3.99935 14.6654H11.9993C12.353 14.6654 12.6921 14.5249 12.9422 14.2748C13.1922 14.0248 13.3327 13.6857 13.3327 13.332V4.66536L9.99935 1.33203Z"
                          stroke="#717182"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.33398 1.33203V3.9987C9.33398 4.35232 9.47446 4.69146 9.72451 4.94151C9.97456 5.19156 10.3137 5.33203 10.6673 5.33203H13.334"
                          stroke="#717182"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.66732 6H5.33398"
                          stroke="#717182"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.6673 8.66797H5.33398"
                          stroke="#717182"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.6673 11.332H5.33398"
                          stroke="#717182"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1565_12519">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  {jobInfo.proposals} proposals
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                  {jobInfo.visibility}
                </span>
              </div>
            </div>

            {/* Job actions dropdown only (Hire button removed) */}
            <div className="flex items-center gap-2">
              <DropDownMenu
                align="right"
                open={jobMenuOpen}
                onOpenChange={setJobMenuOpen}
                trigger={
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setJobMenuOpen((v) => !v)}
                    onKeyDown={(e) =>
                      handleKeyboardActivate(e, () => setJobMenuOpen((v) => !v))
                    }
                    className="h-9 w-9 rounded-md border bg-white flex items-center justify-center cursor-pointer select-none
                             hover:bg-gray-50 hover:border-gray-300 transition active:scale-[0.99]"
                    aria-label="Job actions"
                  >
                    <IconMore />
                  </div>
                }
              >
                <DropDownMenu.Item
                  icon={<IconEye />}
                  label="View full post"
                  onClick={() => {
                    setJobMenuOpen(false);
                    router.push("/page/client/application/viewfulljob");
                  }}
                />

                <DropDownMenu.Item
                  icon={<IconSettings />}
                  label="Edit job post"
                  onClick={() => {
                    setJobMenuOpen(false);
                    // later
                  }}
                />

                <DropDownMenu.Item
                  icon={<IconPause />}
                  label="Pause applications"
                  onClick={() => {
                    setJobMenuOpen(false);
                    setPauseOpen(true);
                  }}
                />

                <DropDownMenu.Divider />

                <DropDownMenu.Item
                  icon={<Iconx />}
                  label="Close job"
                  tone="danger"
                  onClick={() => {
                    setJobMenuOpen(false);
                    setCloseOpen(true);
                  }}
                />
              </DropDownMenu>
            </div>
          </div>

          <div className="mt-4 border-t" />

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* Left */}
            <section className="lg:col-span-8">
              <TabsBar
                tab={tab}
                onChange={setTab}
                proposalsCount={proposalList.length}
                messagesCount={messages.length}
                hiredCount={hired.length}
              />

              <div className="mt-4">
                {tab === "proposals" ? (
                  isLoadingProposals ? (
                    <div className="bg-white border rounded-xl shadow-sm p-8 text-center text-gray-500">
                      Loading proposals...
                    </div>
                  ) : proposalList.length === 0 ? (
                    <div className="bg-white border rounded-xl shadow-sm p-8 text-center text-gray-500">
                      No proposals yet
                    </div>
                  ) : (
                    <ProposalsPanel
                      proposals={proposalList}
                      shortlistedCount={shortlistedCount}
                      onToggleShortlist={(id) => {
                        setProposalList((prev) =>
                          prev.map((p) =>
                            p.id === id
                              ? { ...p, shortlisted: !p.shortlisted }
                              : p,
                          ),
                        );
                      }}
                      onOpenProposal={() =>
                        router.push("/page/client/application/proposals")
                      }
                      onHireClick={(proposalId) => {
                        router.push(
                          `/page/client/application/proposals?id=${proposalId}`,
                        );
                      }}
                    />
                  )
                ) : null}

                {tab === "messages" ? (
                  isLoadingMessages ? (
                    <div className="bg-white border rounded-xl shadow-sm p-8 text-center text-gray-500">
                      Loading messages...
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="bg-white border rounded-xl shadow-sm p-8 text-center text-gray-500">
                      No messages yet
                    </div>
                  ) : (
                    <MessagesPanel messages={messages} />
                  )
                ) : null}

                {tab === "hired" ? (
                  isLoadingHired ? (
                    <div className="bg-white border rounded-xl shadow-sm p-8 text-center text-gray-500">
                      Loading hired freelancers...
                    </div>
                  ) : hired.length === 0 ? (
                    <div className="bg-white border rounded-xl shadow-sm p-8 text-center text-gray-500">
                      No hired freelancers yet
                    </div>
                  ) : (
                    <HiredPanel hired={hired} />
                  )
                ) : null}
              </div>
            </section>

            {/* Right */}
            <aside className="lg:col-span-4">
              {/* ✅ keep your old sticky style */}
              <div className="sticky top-24 space-y-4">
                <ApplicationSidebar
                  matches={matches}
                  job={jobStats}
                  isLoadingMatches={isLoadingMatches}
                  proposalList={proposalList}
                />
              </div>
            </aside>
          </div>
        </main>
      </div>

      <ClientFooter />

      {/* ✅ Modals */}
      <PauseJobApplicationsModal
        open={pauseOpen}
        activeProposalsCount={proposalList.length}
        onClose={() => setPauseOpen(false)}
      />

      <CloseJobPostingModal
        open={closeOpen}
        onClose={() => setCloseOpen(false)}
      />
    </>
  );
}
