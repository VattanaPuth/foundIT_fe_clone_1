"use client";

import React, { useMemo, useState } from "react";
import Select from "@/app/components/styles/seller/setting/select";
import Toggle from "@/app/components/styles/seller/setting/toggle";
import {
  cn,
  handleKeyboardActivate,
} from "@/app/components/styles/seller/setting/utils";

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <div className="text-lg font-semibold text-gray-900">{title}</div>
      {subtitle && <div className="text-sm text-gray-500 mt-1">{subtitle}</div>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function SubCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      {children}
    </div>
  );
}

function Pill({
  text,
  tone = "gray",
}: {
  text: string;
  tone?: "gray" | "orange";
}) {
  const cls =
    tone === "orange"
      ? "bg-orange-100 text-orange-700 border-orange-200"
      : "bg-gray-100 text-gray-600 border-gray-200";
  return (
    <div
      className={cn(
        "px-2.5 py-1 rounded-full text-[11px] font-medium border",
        cls
      )}
    >
      {text}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  hint,
  rightTag,
  readOnly,
  placeholder,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  hint?: string;
  rightTag?: string;
  readOnly?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-900">{label}</div>

      <div className="relative">
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={!!readOnly}
          placeholder={placeholder}
          className={cn(
            "w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-800 outline-none",
            "focus:ring-2 focus:ring-orange-200 focus:border-orange-500",
            readOnly ? "text-gray-600" : ""
          )}
        />

        {rightTag && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Pill text={rightTag} />
          </div>
        )}
      </div>

      {hint && <div className="text-xs text-gray-400">{hint}</div>}
    </div>
  );
}

type SessionItem = {
  id: string;
  device: string;
  meta1: string;
  meta2: string;
  current?: boolean;
};

function SessionRow({
  item,
  signedOut,
  onSignOut,
}: {
  item: SessionItem;
  signedOut: boolean;
  onSignOut: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-4 flex items-start justify-between gap-4",
        signedOut ? "opacity-60" : ""
      )}
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
          <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">
            ICON
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="text-sm font-medium text-gray-900">
              {item.device}
            </div>
            {item.current && <Pill text="Current" tone="gray" />}
            {signedOut && <Pill text="Signed out" tone="gray" />}
          </div>
          <div className="text-xs text-gray-500 mt-1">{item.meta1}</div>
          <div className="text-xs text-gray-400 mt-1">{item.meta2}</div>
        </div>
      </div>

      {!item.current && (
        <div
          role="button"
          tabIndex={0}
          onClick={onSignOut}
          onKeyDown={(e) => handleKeyboardActivate(e, onSignOut)}
          className="text-sm text-gray-600 cursor-pointer select-none hover:text-gray-900 flex-shrink-0"
          aria-label="Sign out"
        >
          Sign Out
        </div>
      )}
    </div>
  );
}

export default function AccountTab() {
  // profile info
  const [displayName, setDisplayName] = useState("Sarah Chen");
  const [username] = useState("sarachen"); // immutable
  const [primaryEmail, setPrimaryEmail] = useState("sarah.chen@example.com");
  const [backupEmail, setBackupEmail] = useState("sarah.backup@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [country, setCountry] = useState("United States");
  const [zone, setZone] = useState("Pacific Time (PT)");
  const [lang, setLang] = useState("English");

  // sessions
  const sessions = useMemo<SessionItem[]>(
    () => [
      {
        id: "s1",
        device: "Chrome on macOS",
        meta1: "San Francisco, CA • 192.168.1.1",
        meta2: "Last seen: 2 minutes ago",
        current: true,
      },
      {
        id: "s2",
        device: "Safari on iPhone",
        meta1: "San Francisco, CA • 192.168.1.50",
        meta2: "Last seen: 1 hour ago",
      },
      {
        id: "s3",
        device: "Firefox on Windows",
        meta1: "New York, NY • 203.0.113.1",
        meta2: "Last seen: 2 days ago",
      },
    ],
    []
  );

  const [signedOutById, setSignedOutById] = useState<Record<string, boolean>>(
    {}
  );

  function signOutSession(id: string) {
    // IMPORTANT: do NOT remove card (user asked). Just mark as signed out.
    setSignedOutById((prev) => ({ ...prev, [id]: true }));
  }

  // visibility
  const [visibility, setVisibility] = useState("Public - Anyone can view");
  const [showOnline, setShowOnline] = useState(false);
  const [showEarnings, setShowEarnings] = useState(false);
  const [seoIndex, setSeoIndex] = useState(true);

  return (
    <div className="space-y-6">
      <SectionCard
        title="Profile Information"
        subtitle="Update your personal details and contact information"
      >
        <div className="space-y-5">
          <Field
            label="Display Name"
            value={displayName}
            onChange={setDisplayName}
          />

          <Field
            label="Handle (Username)"
            value={username}
            readOnly
            rightTag="Immutable"
            hint="Your unique username cannot be changed"
          />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">
                ICON
              </div>
              <div className="text-sm font-medium text-gray-900">
                Primary Email
              </div>
            </div>
            <input
              value={primaryEmail}
              onChange={(e) => setPrimaryEmail(e.target.value)}
              className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-800 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
            />
            <div className="text-xs text-gray-400">
              Used for login and receipts
            </div>
          </div>

          <Field
            label="Backup Email (Recovery)"
            value={backupEmail}
            onChange={setBackupEmail}
            hint="Used for account recovery"
          />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">
                ICON
              </div>
              <div className="text-sm font-medium text-gray-900">
                Phone Number
              </div>
            </div>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-800 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
            />
            <div className="text-xs text-gray-400">
              We only use your phone for security and critical payout updates.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">Country</div>
              <Select
                ariaLabel="Country"
                value={country}
                options={[
                  "United States",
                  "Canada",
                  "United Kingdom",
                  "Australia",
                ]}
                onChange={setCountry}
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">Time Zone</div>
              <Select
                ariaLabel="Time Zone"
                value={zone}
                options={[
                  "Pacific Time (PT)",
                  "Mountain Time (MT)",
                  "Central Time (CT)",
                  "Eastern Time (ET)",
                ]}
                onChange={setZone}
              />
            </div>
          </div>

          <Field
            label="Languages"
            value={lang}
            onChange={setLang}
            hint="Interface and communication languages"
          />

          <div className="pt-2 flex justify-end">
            <div
              role="button"
              tabIndex={0}
              onClick={() => {}}
              onKeyDown={(e) => handleKeyboardActivate(e, () => {})}
              className="h-10 px-4 rounded-lg bg-orange-500 text-white text-sm font-medium cursor-pointer select-none hover:bg-orange-600 flex items-center justify-center"
              aria-label="Save changes"
            >
              Save Changes
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Active Sessions"
        subtitle="Manage devices where you're currently logged in"
      >
        <div className="space-y-3">
          {sessions.map((s) => (
            <SessionRow
              key={s.id}
              item={s}
              signedOut={!!signedOutById[s.id]}
              onSignOut={() => signOutSession(s.id)}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Profile Visibility"
        subtitle="Control who can see your profile and information"
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-900">
              Profile Visibility
            </div>
            <Select
              ariaLabel="Profile visibility"
              value={visibility}
              options={[
                "Public - Anyone can view",
                "Private - Only you",
                "Clients only",
              ]}
              onChange={setVisibility}
            />
          </div>

          <SubCard>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900">
                    Show Online Status
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Control whether others can see when you are active. Turning
                    this off will not affect message delivery.
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <Toggle
                    on={showOnline}
                    onChange={(v) => setShowOnline(v)}
                    ariaLabel="Toggle online status"
                  />
                </div>
              </div>

              <div className="border-t border-gray-100" />

              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900">
                    Show Earnings
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Display your total earnings on your public profile
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <Toggle
                    on={showEarnings}
                    onChange={(v) => setShowEarnings(v)}
                    ariaLabel="Toggle earnings visibility"
                  />
                </div>
              </div>

              <div className="border-t border-gray-100" />

              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-gray-900">
                      Search Engine Indexing
                    </div>
                    <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">
                      ICON
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Turning off indexing may reduce external traffic but
                    improves privacy
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <Toggle
                    on={seoIndex}
                    onChange={(v) => setSeoIndex(v)}
                    ariaLabel="Toggle search indexing"
                  />
                </div>
              </div>
            </div>
          </SubCard>
        </div>
      </SectionCard>
    </div>
  );
}
