"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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

interface Step1Data {
  fullName: string;
  dob: string;
  nationality: string;
  sex: string;
  phone: string;
}

interface Step2Data {
  fullname?: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  documentNumber?: string;
}

interface Step3Data {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export default function Step4Page() {
  const router = useRouter();
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const [step3Data, setStep3Data] = useState<Step3Data | null>(null);

  useEffect(() => {
    // Load data from localStorage
    const step1Str = localStorage.getItem("verifyStep1Data");
    const step2Str = localStorage.getItem("verifyStep2Data");
    const step3Str = localStorage.getItem("verifyStep3Data");

    if (step1Str) {
      setStep1Data(JSON.parse(step1Str));
    }
    if (step2Str) {
      setStep2Data(JSON.parse(step2Str));
    }
    if (step3Str) {
      setStep3Data(JSON.parse(step3Str));
    }
  }, []);

  function handleSubmit() {
    // Save completion status
    localStorage.setItem("verificationCompleted", "true");
    localStorage.setItem("verificationSubmittedAt", new Date().toISOString());

    // Navigate to client settings
    router.push("/page/client/setting");
  }

  // Format date to readable format
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <ClientNavHeader />
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
              <span className="text-gray-700">Step 4 of 4</span>
              <span className="text-gray-500">100% Complete</span>
            </div>
            <div className="w-full h-2 bg-green-100 rounded-full">
              <div className="h-2 bg-green-500 rounded-full w-full" />
            </div>
          </div>

          {/* Step navigation (visual only) */}
          <div className="flex items-center gap-4 text-sm mb-8">
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-green-600 text-white text-xs">
                ✓
              </span>
              <span>Personal Info</span>
            </div>

            <span className="text-gray-300">›</span>

            <div className="flex items-center gap-2 text-green-600 font-medium">
              <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-green-600 text-white text-xs">
                ✓
              </span>
              <span>ID Verification</span>
            </div>

            <span className="text-gray-300">›</span>

            <div className="flex items-center gap-2 text-green-600 font-medium">
              <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-green-600 text-white text-xs">
                ✓
              </span>
              <span>Address Proof</span>
            </div>

            <span className="text-gray-300">›</span>

            <div className="flex items-center gap-2 text-green-600 font-medium">
              <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-green-600 text-white text-xs">
                ✓
              </span>
              <span>Review</span>
            </div>
          </div>

          {/* Main card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-medium text-gray-900 mb-1">
              Review Your Information
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Please review all information before submitting
            </p>

            {/* Personal Information */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-gray-900">
                Personal Information
              </div>

              <div
                role="button"
                tabIndex={0}
                onClick={() => router.push("../verify/step-1")}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () =>
                    router.push("../verify/step-1")
                  )
                }
                className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer select-none"
              >
                Edit
              </div>
            </div>

            <div className="bg-gray-50 rounded-md border border-gray-100 p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="text-gray-500">Full Name:</div>
                <div className="text-gray-900 sm:text-right">
                  {step1Data?.fullName || "N/A"}
                </div>

                <div className="text-gray-500">Date of Birth:</div>
                <div className="text-gray-900 sm:text-right">
                  {step1Data?.dob ? formatDate(step1Data.dob) : "N/A"}
                </div>

                <div className="text-gray-500">Nationality:</div>
                <div className="text-gray-900 sm:text-right">
                  {step1Data?.nationality || "N/A"}
                </div>

                <div className="text-gray-500">Sex:</div>
                <div className="text-gray-900 sm:text-right">
                  {step1Data?.sex || "N/A"}
                </div>

                <div className="text-gray-500">Phone:</div>
                <div className="text-gray-900 sm:text-right">
                  {step1Data?.phone || "N/A"}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t" />

            {/* ID Verification */}
            <div className="flex items-center justify-between py-1 mb-3">
              <div className="text-sm font-medium text-gray-900">
                ID Verification
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => router.push("../verify/step-2")}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () =>
                    router.push("../verify/step-2")
                  )
                }
                className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer select-none"
              >
                Edit
              </div>
            </div>

            {step2Data && (
              <div className="bg-gray-50 rounded-md border border-gray-100 p-4 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {step2Data.fullname && (
                    <>
                      <div className="text-gray-500">Full Name (ID):</div>
                      <div className="text-gray-900 sm:text-right">
                        {step2Data.fullname}
                      </div>
                    </>
                  )}

                  {step2Data.dateOfBirth && (
                    <>
                      <div className="text-gray-500">Date of Birth (ID):</div>
                      <div className="text-gray-900 sm:text-right">
                        {step2Data.dateOfBirth}
                      </div>
                    </>
                  )}

                  {step2Data.gender && (
                    <>
                      <div className="text-gray-500">Gender (ID):</div>
                      <div className="text-gray-900 sm:text-right">
                        {step2Data.gender}
                      </div>
                    </>
                  )}

                  {step2Data.nationality && (
                    <>
                      <div className="text-gray-500">Nationality (ID):</div>
                      <div className="text-gray-900 sm:text-right">
                        {step2Data.nationality}
                      </div>
                    </>
                  )}

                  {step2Data.documentNumber && (
                    <>
                      <div className="text-gray-500">Document Number:</div>
                      <div className="text-gray-900 sm:text-right">
                        {step2Data.documentNumber}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="my-4 border-t" />

            {/* Selfie Verification (shown in screenshot even if we didn't build a step for it yet) */}
            <div className="flex items-center justify-between py-1">
              <div className="text-sm font-medium text-gray-900">
                Selfie Verification
              </div>
              <div className="text-sm text-gray-400 select-none cursor-not-allowed">
                Edit
              </div>
            </div>

            <div className="my-4 border-t" />

            {/* Address Verification */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-gray-900">
                Address Verification
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => router.push("../verify/step-3")}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () =>
                    router.push("../verify/step-3")
                  )
                }
                className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer select-none"
              >
                Edit
              </div>
            </div>

            <div className="bg-gray-50 rounded-md border border-gray-100 p-4 text-sm text-gray-800 space-y-1">
              <div>{step3Data?.address || "N/A"}</div>
              <div>
                {step3Data?.city && step3Data?.postalCode
                  ? `${step3Data.city}, ${step3Data.postalCode}`
                  : step3Data?.city || step3Data?.postalCode || "N/A"}
              </div>
              <div>{step3Data?.country || "N/A"}</div>
            </div>
          </div>

          {/* Info box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-700">
            <div className="font-medium flex items-center gap-2">
              What happens next?
            </div>
            <p className="mt-2">
              Our team will review your documents within 24–48 hours. You will
              receive an email notification once your verification is complete.
              You can track the status in your account settings.
            </p>
          </div>

          {/* Bottom actions */}
          <div className="mt-6 flex items-center justify-between">
            {/* Back */}
            <p
              role="button"
              tabIndex={0}
              onClick={() => router.push("../verify/step-3")}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => router.push("../verify/step-3"))
              }
              className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer select-none"
            >
              Back
            </p>

            <div className="flex items-center gap-6">
              {/* Save & Exit */}
              <p
                // href="#"
                className="no-underline text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                Save &amp; Exit
              </p>

              {/* Submit */}
              <p
                role="button"
                tabIndex={0}
                onClick={handleSubmit}
                onKeyDown={(e) => handleKeyboardActivate(e, handleSubmit)}
                className="bg-green-500 hover:bg-green-600 text-white px-5 h-10 inline-flex items-center justify-center rounded-md text-sm cursor-pointer select-none"
              >
                Submit for Review
              </p>
            </div>
          </div>
        </div>
      </main>
      <ClientFooter />
    </>
  );
}
