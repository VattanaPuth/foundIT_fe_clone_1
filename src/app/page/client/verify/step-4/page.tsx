"use client";

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

export default function Step4Page() {
  const router = useRouter();

  // Mock review data (matches screenshot style)
  const personalInfo = {
    fullName: "John Doe",
    dob: "1990-05-15",
    nationality: "US",
    phone: "+1 (555) 123-4567",
  };

  const addressInfo = {
    line1: "123 Main Street, Apt 4B",
    line2: "New York, NY 10001",
    country: "United States",
  };

  function handleSubmit() {
    // Save completion status
    localStorage.setItem("verificationCompleted", "true");
    localStorage.setItem("verificationSubmittedAt", new Date().toISOString());

    // Navigate to client settings
    router.push("/page/client/setting");
  }

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
                  {personalInfo.fullName}
                </div>

                <div className="text-gray-500">Date of Birth:</div>
                <div className="text-gray-900 sm:text-right">
                  {personalInfo.dob}
                </div>

                <div className="text-gray-500">Nationality:</div>
                <div className="text-gray-900 sm:text-right">
                  {personalInfo.nationality}
                </div>

                <div className="text-gray-500">Phone:</div>
                <div className="text-gray-900 sm:text-right">
                  {personalInfo.phone}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t" />

            {/* ID Verification */}
            <div className="flex items-center justify-between py-1">
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
              <div>{addressInfo.line1}</div>
              <div>{addressInfo.line2}</div>
              <div>{addressInfo.country}</div>
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
