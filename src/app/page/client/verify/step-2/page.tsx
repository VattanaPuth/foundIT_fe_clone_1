"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ClientNavHeader from "@/app/components/styles/global_styles/client/header";
import ClientFooter from "@/app/components/styles/global_styles/client/footer";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function DocIcon() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="text-gray-500"
    >
      <path
        d="M7 3h7l3 3v15a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14 3v4a1 1 0 0 0 1 1h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8 12h8M8 16h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="text-gray-700"
    >
      <path
        d="M12 15V4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7.5 8.5 12 4l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Step2Page() {
  const [idType, setIdType] = useState<"Passport" | "Driver's License" | "National ID">(
    "Passport"
  );
  const router = useRouter();

  const uploadTitleMap: Record<string, string> = {
    Passport: "Upload Passport Front",
    "Driver's License": "Upload Driver’s License Front",
    "National ID": "Upload National ID Front",
  };

  const tabs: Array<"Passport" | "Driver's License" | "National ID"> = [
    "Passport",
    "Driver's License",
    "National ID",
  ];

  return (
    <>
    <ClientNavHeader/>
    <main className="bg-gray-50 min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Title area */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Identity Verification
            </h1>
            <p className="text-sm text-gray-500">
              Verify your identity to unlock all features
            </p>
          </div>

          <div className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700">
            🔒 Secure &amp; Encrypted
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-700">Step 2 of 4</span>
            <span className="text-gray-500">40% Complete</span>
          </div>
          <div className="w-full h-2 bg-green-100 rounded-full">
            <div className="h-2 bg-green-500 rounded-full w-2/5" />
          </div>
        </div>

        {/* Step navigation (visual only) */}
        <div className="flex items-center gap-4 text-sm mb-8">
          {/* Step 1 - completed */}
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-green-600 text-white text-xs">
              ✓
            </span>
            <span>Personal Info</span>
          </div>

          <span className="text-gray-300">›</span>

          {/* Step 2 - active */}
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <span className="inline-flex w-5 h-5 items-center justify-center rounded-full border border-green-600 text-green-700 text-xs">
              2
            </span>
            <span>ID Verification</span>
          </div>

          <span className="text-gray-300">›</span>
          <span className="text-gray-400">Address Proof</span>
          <span className="text-gray-300">›</span>
          <span className="text-gray-400">Review</span>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-medium text-gray-900 mb-1">Government-Issued ID</h2>
          <p className="text-sm text-gray-500 mb-6">
            Upload a clear photo of your government-issued identification document
          </p>

          {/* Tabs */}
          <div className="mb-4">
            <div className="text-sm text-gray-800 mb-2">
              Choose ID Type <span className="text-red-500">*</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {tabs.map((tab) => {
                const active = tab === idType;
                return (
                  <div
                    key={tab}
                    role="button"
                    tabIndex={0}
                    onClick={() => setIdType(tab)}
                    onKeyDown={(e) =>
                      handleKeyboardActivate(e, () => setIdType(tab))
                    }
                    className={[
                      "h-10 rounded-md border flex items-center justify-center text-sm",
                      "cursor-pointer select-none",
                      "hover:border-gray-400",
                      active
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-white text-gray-800",
                    ].join(" ")}
                  >
                    {tab}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upload section */}
          <div className="mb-4">
            <div className="text-sm text-gray-800 mb-2">
              {uploadTitleMap[idType]} <span className="text-red-500">*</span>
            </div>

            <div className="rounded-md border bg-white p-8 flex flex-col items-center text-center">
              <DocIcon />

              <div className="mt-4">
                {/* Static "upload" trigger look (no real file picker yet) */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    // static for now
                    console.log("Upload clicked (static)");
                  }}
                  onKeyDown={(e) =>
                    handleKeyboardActivate(e, () =>
                      console.log("Upload clicked (static)")
                    )
                  }
                  className={[
                    "inline-flex items-center gap-2",
                    "px-4 h-10 rounded-md border",
                    "text-sm text-gray-800 bg-white",
                    "cursor-pointer select-none",
                    "hover:bg-gray-50 hover:border-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
                  ].join(" ")}
                >
                  <UploadIcon />
                  Upload ID Front
                </div>

                <div className="mt-3 text-xs text-gray-500">
                  JPG, PNG or PDF • Max 10MB
                </div>
                <div className="text-xs text-gray-400">
                  Make sure all corners are visible
                </div>
              </div>
            </div>
          </div>

          {/* Tips box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-yellow-900">
            <div className="font-medium mb-2">Tips for a clear photo:</div>
            <ul className="list-disc ml-5 space-y-1 text-sm text-yellow-800">
              <li>Use good lighting</li>
              <li>Place ID on a plain background</li>
              <li>Ensure all text is readable</li>
              <li>No glare or shadows</li>
            </ul>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="mt-6 flex items-center justify-between">
          <p
            onClick = {()=> router.push("../verify/step-1")}
            className="no-underline text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            Back
          </p>

          <div className="flex items-center gap-6">
            <p
              // onClick = {()=> router.push("../verify/step-3")}
              className="no-underline text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              Save &amp; Exit
            </p>

            <p
              onClick = {()=> router.push("../verify/step-3")}
              className="no-underline bg-green-500 hover:bg-green-600 text-white px-5 h-10 inline-flex items-center justify-center rounded-md text-sm cursor-pointer"
            >
              Continue
            </p>
          </div>
        </div>
      </div>
    </main>
    <ClientFooter/>
    </>
  );
}
