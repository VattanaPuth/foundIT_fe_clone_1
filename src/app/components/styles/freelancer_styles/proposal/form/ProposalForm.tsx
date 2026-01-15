"use client";

import React, { useState, useEffect } from "react";
import { FileText, CheckCircle2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import authService from "@/app/services/authService";
import { useAuth } from "@/app/contexts/AuthContext";
import Loading from "../../../global_styles/loading/loading";

export default function ProposalForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const [coverLetter, setCoverLetter] = useState("");
  const [rate, setRate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAcceptedBox, setShowAcceptedBox] = useState(false);
  const [jobError, setJobError] = useState<string | null>(null);

  const jobId = searchParams.get("id");

  useEffect(() => {
    const fetchJob = async () => {
      setJobError(null);
      if (!jobId) {
        const msg = "No jobId in URL params";
        console.error(msg);
        setJobError(msg);
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          const msg = "No token found in localStorage";
          console.error(msg);
          setJobError(msg);
          setLoading(false);
          return;
        }
        const url = `http://localhost:8085/gigs/client/public/${jobId}`;
        console.log("Fetching job from", url, "with token", token);
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const jobData = await response.json();
          setJob(jobData);
          console.log("Fetched job data:", jobData);
        } else {
          const errorText = await response.text();
          const msg = `Failed to fetch job. Status: ${response.status} ${errorText}`;
          console.error(msg);
          setJobError(msg);
        }
      } catch (error: any) {
        const msg = `Error fetching job: ${error?.message || error}`;
        console.error(msg);
        setJobError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (!isAuthenticated) {
    router.push("/page/sign_in");
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>
          <div className="text-lg font-semibold text-red-600 mb-2">
            Job not found
          </div>
          {jobError && (
            <div className="text-sm text-gray-700 bg-red-50 border border-red-200 rounded p-3">
              <div className="font-mono break-all">{jobError}</div>
              <div className="mt-2 text-xs text-gray-500">
                Check the job link, your login status, and network connection.
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new URLSearchParams();
      formData.append("senderId", (user?.id || "1").toString());
      formData.append("recipientId", job?.clientId?.toString() || "1");
      formData.append("coverLetter", coverLetter);
      formData.append("rate", rate);
      formData.append("deliveryTime", deliveryTime);

      const response = await fetch("http://localhost:8085/chat/sendProposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        
          router.push("/page/freelancer/application");
      } else {
        alert("Failed to send proposal");
      }
    } catch (error) {
      console.error("Error sending proposal:", error);
      alert("Error sending proposal");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showAcceptedBox ? (
        <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
          <div className="w-full max-w-xl bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl border-2 border-green-200 p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {job?.title || "E-commerce Platform Development"}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-green-300">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  Accepted
                </span>
              </div>
            </div>
            {/* Details */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Type:</span>
                <span className="bg-white px-4 py-1.5 rounded-lg text-sm font-medium text-gray-900 border border-gray-200">
                  {job?.payMode === "fixed" ? "Fixed Price" : "Hourly"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Budget:</span>
                <span className="text-xl font-bold text-gray-900">
                  $ {job?.budgetMax || "-"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Milestones:</span>
                <span className="text-xl font-bold text-gray-900">4</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Submit Proposal
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Introduce yourself and explain why you're the best fit for this job..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rate (USD)
                </label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your proposed rate"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Time (days)
                </label>
                <input
                  type="number"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="How many days to complete"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
