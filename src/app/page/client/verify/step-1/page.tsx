"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ClientNavHeader from "@/app/components/styles/global_styles/client/header";
import ClientFooter from "@/app/components/styles/global_styles/client/footer";

type Option = { label: string; value: string };


/** Small helper: support Enter + Space for "div role=button" */
function handleKeyboardActivate(e: React.KeyboardEvent, onActivate: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function ChevronIcon({ direction }: { direction: "up" | "down" }) {
  // Simple inline SVG (no libraries)
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

/**
 * Junior-friendly custom dropdown (opens downward)
 * - No <button>, no <label>
 * - Click outside closes
 * - Max height menu (not too long)
 * - Keyboard: Enter/Space opens, Esc closes
 */
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

  const selectedLabel =
    options.find((o) => o.value === value)?.label || "";

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
      {/* Trigger */}
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

      {/* Menu (opens DOWN, with a little gap) */}
      {open && (
        <div
          id={listId}
          role="listbox"
          aria-label={`${ariaLabel} options`}
          className={[
            "absolute left-0 right-0 z-20",
            "mt-2", // <-- padding/gap between trigger & menu
            "rounded-md border bg-white shadow-sm",
            "max-h-56 overflow-auto", // <-- not too long
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

export default function Step1Page() {
  // Mock options (20 countries)
  const router = useRouter();
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

  const sexOptions: Option[] = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  // Simple form state (mock)
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState("United States");
  const [sex, setSex] = useState("");
  const [phone, setPhone] = useState("");

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem("verifyStep1Data");
    if (saved) {
      const data = JSON.parse(saved);
      setFullName(data.fullName || "");
      setDob(data.dob || "");
      setNationality(data.nationality || "United States");
      setSex(data.sex || "");
      setPhone(data.phone || "");
    }
  }, []);

  // Fix phone input: block letters by sanitizing
  function handlePhoneChange(next: string) {
    // Allow digits + common phone symbols only
    const cleaned = next.replace(/[^0-9+\-()\s]/g, "");
    setPhone(cleaned);
  }

  function handleContinue() {
    // Validate required fields
    if (!fullName || !dob || !nationality || !sex || !phone) {
      alert("Please fill in all required fields");
      return;
    }

    // Save data to localStorage for use in step-2
    const step1Data = { fullName, dob, nationality, sex, phone };
    localStorage.setItem("verifyStep1Data", JSON.stringify(step1Data));

    // Navigate to step-2
    router.push("../verify/step-2");
  }

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
            <span className="text-gray-700">Step 1 of 4</span>
            <span className="text-gray-500">20% Complete</span>
          </div>
          <div className="w-full h-2 bg-green-100 rounded-full">
            <div className="h-2 bg-green-500 rounded-full w-1/5" />
          </div>
        </div>

        {/* Step nav (visual only for now) */}
        <div className="flex items-center gap-4 text-sm mb-8">
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-green-600 text-white text-xs">
              ✓
            </span>
            <span>Personal Info</span>
          </div>
          <span className="text-gray-300">›</span>
          <span className="text-gray-400">ID Verification</span>
          <span className="text-gray-300">›</span>
          <span className="text-gray-400">Address Proof</span>
          <span className="text-gray-300">›</span>
          <span className="text-gray-400">Review</span>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-medium text-gray-900 mb-1">
            Personal Information
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Please provide your personal details as they appear on your
            government-issued ID
          </p>

          {/* Form */}
          <div className="space-y-4">
            {/* Full name */}
            <div>
              <div className="text-sm text-gray-800 mb-1">
                Full Legal Name <span className="text-red-500">*</span>
              </div>
              <input
                aria-label="Full Legal Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className={[
                  "w-full h-10 rounded-md border bg-white",
                  "px-3 py-2",
                  "hover:border-gray-400",
                  "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
                ].join(" ")}
              />
            </div>

            {/* Date + Nationality */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-800 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </div>

                {/* Better styled date input */}
                <input
                  type="date"
                  aria-label="Date of Birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className={[
                    "w-full h-10 rounded-md border bg-white",
                    "px-3 py-2",
                    "text-gray-900",
                    "hover:border-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
                  ].join(" ")}
                />
                <div className="text-xs text-gray-400 mt-1">
                  (Month / Day / Year)
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-800 mb-1">
                  Nationality <span className="text-red-500">*</span>
                </div>
                <SimpleDropdown
                  ariaLabel="Nationality"
                  value={nationality}
                  onChange={setNationality}
                  placeholder="Select nationality"
                  options={countryOptions}
                />
              </div>
            </div>

            {/* Sex + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-800 mb-1">
                  Sex <span className="text-red-500">*</span>
                </div>
                <SimpleDropdown
                  ariaLabel="Sex"
                  value={sex}
                  onChange={setSex}
                  placeholder="Select sex"
                  options={sexOptions}
                />
              </div>

              <div>
                <div className="text-sm text-gray-800 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </div>
                <input
                  type="tel"
                  inputMode="tel"
                  aria-label="Phone Number"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={[
                    "w-full h-10 rounded-md border bg-white",
                    "px-3 py-2",
                    "hover:border-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
                  ].join(" ")}
                />
                <div className="text-xs text-gray-400 mt-1">
                  Numbers only (we’ll allow +, spaces, (), -)
                </div>
              </div>
            </div>

            {/* Info box */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-700">
              <div className="font-medium">
                Why do we need this information?
              </div>
              <p className="mt-1">
                We verify your identity to ensure platform safety and comply
                with legal requirements. Your data is encrypted and secure.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom actions (aligned like Figma) */}
        <div className="mt-6 flex items-center justify-between">
          {/* Back (no underline, subtle) */}
          <p
            // href="#"
            className="no-underline text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            Back
          </p>

          <div className="flex items-center gap-6 ">
            {/* Save & Exit (aligned + no underline) */}
            <p
              // href="#"
              className="no-underline text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              Save &amp; Exit
            </p>

            <p
              onClick={handleContinue}
              className="bg-green-500 hover:bg-green-600 text-white px-5 h-10 inline-flex items-center justify-center rounded-md text-sm cursor-pointer"
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
