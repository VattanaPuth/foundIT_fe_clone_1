"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ClientNavHeader from "@/app/components/styles/global_styles/client/header";
import ClientFooter from "@/app/components/styles/global_styles/client/footer";

type Option = { label: string; value: string };

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function ChevronIcon({ direction }: { direction: "up" | "down" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="text-gray-500"
    >
      {direction === "down" ? (
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M5 12.5L10 7.5L15 12.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
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

/** Same dropdown style as Step 1 */
function SimpleDropdown({
  value,
  onChange,
  placeholder,
  options,
  ariaLabel,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  options: Option[];
  ariaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const listId = useId();

  const selectedLabel = options.find((o) => o.value === value)?.label || "";

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onDocKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onDocKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onDocKey);
    };
  }, []);

  return (
    <div ref={boxRef} className="relative">
      <div
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => handleKeyboardActivate(e, () => setOpen((v) => !v))}
        className={[
          "w-full rounded-md border bg-white",
          "px-3 py-2 h-10",
          "flex items-center justify-between",
          "cursor-pointer select-none",
          "hover:border-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
        ].join(" ")}
      >
        <span className={selectedLabel ? "text-gray-900" : "text-gray-400"}>
          {selectedLabel || placeholder}
        </span>
        <ChevronIcon direction={open ? "up" : "down"} />
      </div>

      {open && (
        <div
          id={listId}
          role="listbox"
          aria-label={`${ariaLabel} options`}
          className={[
            "absolute left-0 right-0 z-20",
            "mt-2",
            "rounded-md border bg-white shadow-sm",
            "max-h-56 overflow-auto",
          ].join(" ")}
        >
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={active}
                tabIndex={0}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () => {
                    onChange(opt.value);
                    setOpen(false);
                  })
                }
                className={[
                  "px-3 py-2 text-sm cursor-pointer",
                  "hover:bg-gray-50",
                  active ? "bg-green-50 text-green-700" : "text-gray-800",
                ].join(" ")}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Step3Page() {
  const router = useRouter();

  // Mock country list (same 20 style)
  const countryOptions: Option[] = [
    { label: "United States", value: "United States" },
    { label: "Canada", value: "Canada" },
    { label: "United Kingdom", value: "United Kingdom" },
    { label: "Australia", value: "Australia" },
    { label: "Germany", value: "Germany" },
    { label: "France", value: "France" },
    { label: "Italy", value: "Italy" },
    { label: "Spain", value: "Spain" },
    { label: "Japan", value: "Japan" },
    { label: "South Korea", value: "South Korea" },
    { label: "China", value: "China" },
    { label: "India", value: "India" },
    { label: "Thailand", value: "Thailand" },
    { label: "Vietnam", value: "Vietnam" },
    { label: "Singapore", value: "Singapore" },
    { label: "Malaysia", value: "Malaysia" },
    { label: "Indonesia", value: "Indonesia" },
    { label: "Philippines", value: "Philippines" },
    { label: "Cambodia", value: "Cambodia" },
    { label: "Brazil", value: "Brazil" },
  ];

  // Simple mock form state
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("United States");

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
              <span className="text-gray-700">Step 3 of 4</span>
              <span className="text-gray-500">80% Complete</span>
            </div>
            <div className="w-full h-2 bg-green-100 rounded-full">
              <div className="h-2 bg-green-500 rounded-full w-4/5" />
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

            {/* Step 2 - completed */}
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-green-600 text-white text-xs">
                ✓
              </span>
              <span>ID Verification</span>
            </div>

            <span className="text-gray-300">›</span>

            {/* Step 3 - active */}
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <span className="inline-flex w-5 h-5 items-center justify-center rounded-full border border-green-600 text-green-700 text-xs">
                3
              </span>
              <span>Address Proof</span>
            </div>

            <span className="text-gray-300">›</span>
            <span className="text-gray-400">Review</span>
          </div>

          {/* Main card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-medium text-gray-900 mb-1">
              Address Verification
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Provide your address and upload proof of residence
            </p>

            {/* Address fields */}
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-800 mb-1">
                  Address Line 1 <span className="text-red-500">*</span>
                </div>
                <input
                  aria-label="Address Line 1"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  placeholder="123 Main Street"
                  className={[
                    "w-full h-10 rounded-md border bg-white px-3 py-2",
                    "hover:border-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
                  ].join(" ")}
                />
              </div>

              <div>
                <div className="text-sm text-gray-800 mb-1">
                  Address Line 2{" "}
                  <span className="text-gray-400">(optional)</span>
                </div>
                <input
                  aria-label="Address Line 2"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  placeholder="Apt 4B"
                  className={[
                    "w-full h-10 rounded-md border bg-white px-3 py-2",
                    "hover:border-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
                  ].join(" ")}
                />
              </div>

              {/* City + State/Province */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-800 mb-1">
                    City <span className="text-red-500">*</span>
                  </div>
                  <input
                    aria-label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New York"
                    className={[
                      "w-full h-10 rounded-md border bg-white px-3 py-2",
                      "hover:border-gray-400",
                      "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
                    ].join(" ")}
                  />
                </div>

                <div>
                  <div className="text-sm text-gray-800 mb-1">
                    State/Province <span className="text-red-500">*</span>
                  </div>
                  <input
                    aria-label="State or Province"
                    value={stateProvince}
                    onChange={(e) => setStateProvince(e.target.value)}
                    placeholder="NY"
                    className={[
                      "w-full h-10 rounded-md border bg-white px-3 py-2",
                      "hover:border-gray-400",
                      "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
                    ].join(" ")}
                  />
                </div>
              </div>

              {/* Postal + Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-800 mb-1">
                    Postal Code{" "}
                    <span className="text-gray-400">(optional)</span>
                  </div>
                  <input
                    aria-label="Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="10001"
                    className={[
                      "w-full h-10 rounded-md border bg-white px-3 py-2",
                      "hover:border-gray-400",
                      "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
                    ].join(" ")}
                  />
                </div>

                <div>
                  <div className="text-sm text-gray-800 mb-1">
                    Country <span className="text-red-500">*</span>
                  </div>
                  <SimpleDropdown
                    ariaLabel="Country"
                    value={country}
                    onChange={setCountry}
                    placeholder="Select country"
                    options={countryOptions}
                  />
                </div>
              </div>

              {/* Upload proof */}
              <div className="pt-2">
                <div className="text-sm text-gray-800 mb-1">
                  Upload Proof of Address{" "}
                  <span className="text-red-500">*</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  Utility bill, bank statement, or lease agreement (within last
                  3 months)
                </p>

                <div className="rounded-md border bg-white p-8 flex flex-col items-center text-center">
                  <DocIcon />

                  <div className="mt-4">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => console.log("Upload clicked (static)")}
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
                      Upload Document
                    </div>

                    <div className="mt-3 text-xs text-gray-500">
                      JPG, PNG or PDF • Max 10MB
                    </div>
                  </div>
                </div>
              </div>

              {/* Accepted documents box */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-yellow-900">
                <div className="font-medium mb-2">Accepted documents:</div>
                <ul className="list-disc ml-5 space-y-1 text-sm text-yellow-800">
                  <li>Utility bill (electricity, water, gas)</li>
                  <li>Bank or credit card statement</li>
                  <li>Lease or rental agreement</li>
                  <li>Government-issued document</li>
                </ul>
                <div className="text-xs text-yellow-800 mt-2">
                  Document must be dated within the last 3 months
                </div>
              </div>
            </div>
          </div>

          {/* Bottom actions (router.push like you asked) */}
          <div className="mt-6 flex items-center justify-between">
            <p
              role="button"
              tabIndex={0}
              onClick={() => router.push("../verify/step-2")}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => router.push("../verify/step-2"))
              }
              className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer select-none"
            >
              Back
            </p>

            <div className="flex items-center gap-6">
              <p
                // href="#"
                className="no-underline text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                Save &amp; Exit
              </p>

              <p
                role="button"
                tabIndex={0}
                onClick={() => {
                  // Validate required fields
                  if (
                    !address1 ||
                    !city ||
                    !stateProvince ||
                    !postalCode ||
                    !country
                  ) {
                    alert("Please fill in all required fields");
                    return;
                  }

                  // Save step-3 data to localStorage
                  const step3Data = {
                    address1,
                    address2,
                    city,
                    stateProvince,
                    postalCode,
                    country,
                  };
                  localStorage.setItem(
                    "verifyStep3Data",
                    JSON.stringify(step3Data)
                  );
                  router.push("../verify/step-4");
                }}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () => {
                    // Validate required fields
                    if (
                      !address1 ||
                      !city ||
                      !stateProvince ||
                      !postalCode ||
                      !country
                    ) {
                      alert("Please fill in all required fields");
                      return;
                    }

                    const step3Data = {
                      address1,
                      address2,
                      city,
                      stateProvince,
                      postalCode,
                      country,
                    };
                    localStorage.setItem(
                      "verifyStep3Data",
                      JSON.stringify(step3Data)
                    );
                    router.push("/verify/step-4");
                  })
                }
                className="bg-green-500 hover:bg-green-600 text-white px-5 h-10 inline-flex items-center justify-center rounded-md text-sm cursor-pointer select-none"
              >
                Continue
              </p>
            </div>
          </div>
        </div>
      </main>
      <ClientFooter />
    </>
  );
}
