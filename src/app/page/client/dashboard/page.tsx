"use client";

import React, { useMemo, useState } from "react";
import DashboardSearch from "@/app/components/styles/client_styles/dashboard/DashboardSearch";
import DashboardSection from "@/app/components/styles/client_styles/dashboard/DashboardSection";
import RightWidgets from "@/app/components/styles/client_styles/dashboard/RightWidgets";
import { dashboardMock, JobStatus } from "@/app/components/styles/client_styles/dashboard/moskData";
import ClientFooter from "@/app/components/styles/global_styles/client/footer";
import ClientNavHeader from "@/app/components/styles/global_styles/client/header";
import Footer from "@/app/components/styles/landingpage_styles/footer";


export default function DashboardPage() {
  const jobs = useMemo(() => dashboardMock.jobs, []);
  const candidates = useMemo(() => dashboardMock.candidates, []);
  const activities = useMemo(() => dashboardMock.activities, []);

  const [openMap, setOpenMap] = useState<Record<JobStatus, boolean>>({
    live: false,
    draft: false,
    paused: false,
    hired: false,
    completed: false,
  });

  function toggle(status: JobStatus) {
    setOpenMap((prev) => ({ ...prev, [status]: !prev[status] }));
  }

  const liveJobs = jobs.filter((j) => j.status === "live");
  const draftJobs = jobs.filter((j) => j.status === "draft");
  const pausedJobs = jobs.filter((j) => j.status === "paused");
  const hiredJobs = jobs.filter((j) => j.status === "hired");
  const completedJobs = jobs.filter((j) => j.status === "completed");

  return (
    <>
    <ClientNavHeader/>
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* You will import Header + Bottom nav + FooterLinks yourself */}

      <main className="mx-auto w-full max-w-6xl px-4 pt-6 pb-24 md:px-6">
        <h2>Dashboard</h2>
        <div className="mt-1 text-lg text-gray-500">
          Manage your job postings and proposals
        </div>

        <DashboardSearch />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT */}
          <section className="lg:col-span-2 space-y-6">
            <DashboardSection
              title="Live"
              count={liveJobs.length}
              open={openMap.live}
              onToggle={() => toggle("live")}
              jobs={liveJobs}
              showAction
            />

            <DashboardSection
              title="Draft"
              count={draftJobs.length}
              open={openMap.draft}
              onToggle={() => toggle("draft")}
              jobs={draftJobs}
            />

            <DashboardSection
              title="Paused"
              count={pausedJobs.length}
              open={openMap.paused}
              onToggle={() => toggle("paused")}
              jobs={pausedJobs}
            />

            <DashboardSection
              title="Hired"
              count={hiredJobs.length}
              open={openMap.hired}
              onToggle={() => toggle("hired")}
              jobs={hiredJobs}
            />

            <DashboardSection
              title="Completed"
              count={completedJobs.length}
              open={openMap.completed}
              onToggle={() => toggle("completed")}
              jobs={completedJobs}
            />
          </section>

          {/* RIGHT */}
          <RightWidgets candidates={candidates} activities={activities} />
        </div>

        {/* Footer links section: you already have it, so not included */}
      </main>
    </div>
    <Footer/>
    <ClientFooter/>
    </>
  );
}
