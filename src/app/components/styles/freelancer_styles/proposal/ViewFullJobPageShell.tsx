"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

import ViewFullJobHeader from "@/app/components/styles/client_styles/application/ViewFullJobHeader";
import JobDescriptionCard from "@/app/components/styles/client_styles/application/JobDescriptionCard";
import SkillsCard from "@/app/components/styles/client_styles/application/SkillsCard";
import ProjectDetailsCard from "@/app/components/styles/client_styles/application/ProjectDetailsCard";
import ScreeningQuestionsCard from "@/app/components/styles/client_styles/application/ScreeningQuestionsCard";
import AttachmentsCard from "@/app/components/styles/client_styles/application/AttachmentsCard";
import JobSidebar from "@/app/components/styles/freelancer_styles/proposal/JobSidebar";

// import { viewFullJobMock } from "@/app/components/styles/freelancer_styles/proposal/mockdata";
import AboutClientCard from "./AboutClientCard";
import SimilarJobsCard from "./SimilarJobsCard";

export default function ViewFullJobPageShell() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");
  const { isAuthenticated } = useAuth();
  const [liked, setLiked] = useState(false);
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Early returns
  if (!isAuthenticated) {
    router.push("/page/sign_in");
    return null;
  }
  useEffect(() => {
    console.log("[ViewFullJobPageShell] useEffect called. jobId:", jobId);
    if (!jobId) {
      console.log("[ViewFullJobPageShell] No jobId in URL.");
      return;
    }
    let didTimeout = false;
    const timeout = setTimeout(() => {
      didTimeout = true;
      setLoading(false);
      setError(
        "Request timed out. Please check your network or backend server."
      );
      console.log("[ViewFullJobPageShell] Request timed out.");
    }, 10000); // 10 seconds

    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        console.log(`[ViewFullJobPageShell] Fetching job with id: ${jobId}`);
        const res = await fetch(
          `http://localhost:8085/gigs/client/public/${jobId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (didTimeout) return;
        clearTimeout(timeout);
        if (res.status === 404) {
          setError("Job not found");
          setJob(null);
          console.log("[ViewFullJobPageShell] Job not found (404)");
        } else if (!res.ok) {
          setError(`Failed to fetch job. Status: ${res.status}`);
          setJob(null);
          console.log(
            `[ViewFullJobPageShell] Failed to fetch job. Status: ${res.status}`
          );
        } else {
          const data = await res.json();
          setJob(data);
          console.log("[ViewFullJobPageShell] Job data fetched:", data);
        }
      } catch (e: any) {
        console.error("[ViewFullJobPageShell] Fetch error:", e);
        setError("Network or server error");
        setJob(null);
      } finally {
        if (!didTimeout) {
          clearTimeout(timeout);
          setLoading(false);
        }
      }
    };
    fetchJob();
    // Cleanup on unmount
    return () => clearTimeout(timeout);
  }, [jobId]);
  // ...existing code...

  // Adjust if your HeaderNav height differs
  const stickyTopClass = "top-[72px]";

  // Show loading or error before rendering job-dependent UI
  if (loading) {
    return (
      <div className="text-gray-600 font-semibold p-8">
        Loading job details...
      </div>
    );
  }
  if (error) {
    return <div className="text-red-600 font-semibold p-8">{error}</div>;
  }
  if (!job) {
    return (
      <div className="text-red-600 font-semibold p-8">No job data found.</div>
    );
  }

  // Map backend job data to expected props for components (adjust as needed)
  // This mapping assumes backend returns similar fields as mockdata
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-6">
          <ViewFullJobHeader
            title={job.title}
            badge={job.badge || job.status}
            postedByName={
              job.postedByName || (job.client && job.client.name) || ""
            }
            postedByImageSrc={
              job.postedByImageSrc ||
              (job.client && job.client.avatarSrc) ||
              "/images/default-avatar.png"
            }
            liked={liked}
            onToggleLike={() => setLiked((v) => !v)}
            onBack={() => router.push("/page/application")}
          />

          {/* grey divider like Figma */}
          <div className="mt-4 border-b border-gray-200" />

          <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
            {/* LEFT */}
            <section className="space-y-4">
              <JobDescriptionCard
                intro={job.descriptionIntro || job.description}
                keyRequirements={job.keyRequirements || []}
                deliverables={job.deliverables || []}
                idealCandidate={job.idealCandidate || []}
                proposalInclude={job.proposalInclude || []}
              />

              <SkillsCard skills={job.skills || []} />

              <ProjectDetailsCard details={job.details || []} />

              <ScreeningQuestionsCard
                questions={job.screeningQuestions || []}
              />

              <AttachmentsCard attachments={job.attachments || []} />

              <AboutClientCard
                client={job.client || {}}
                onViewProfile={() => {
                  // Navigate to client profile - need to implement
                  console.log("View client profile clicked");
                }}
              />

              <SimilarJobsCard jobs={job.similarJobs || []} />
            </section>

            {/* RIGHT */}
            <aside className="space-y-4 ">
              <div className={`lg:sticky ${stickyTopClass} space-y-4 pt-3`}>
                <JobSidebar
                  budget={
                    job.budget || {
                      amount: "-",
                      type: "-",
                      competitionLabel: "-",
                      proposalsText: "-",
                      competitionPercent: 0,
                    }
                  }
                  jobId={jobId}
                />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
