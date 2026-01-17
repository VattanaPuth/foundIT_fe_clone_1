"use client";

import React from "react";

// Types
type TabKey =
  | "overview"
  | "profile_rates"
  | "proposals"
  | "earning_payout"
  | "workdiary"
  | "badge"
  | "notification"
  | "billing"
  | "account"
  | "security"
  | "privacy"
  | "apps";

interface BlockedUser {
  id: string;
  name: string;
  avatarSrc: string;
  blockedAt: string;
}

// UI Components
function handleKeyboardActivate(
  e: React.KeyboardEvent,
  callback: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    callback();
  }
}

function Toggle({ on, setOn }: { on: boolean; setOn: (v: boolean) => void }) {
  return (
    <div
      role="switch"
      aria-checked={on}
      tabIndex={0}
      onClick={() => setOn(!on)}
      onKeyDown={(e) => handleKeyboardActivate(e, () => setOn(!on))}
      className={[
        "w-11 h-6 rounded-full relative transition-colors cursor-pointer flex-shrink-0",
        on ? "bg-[#4F39F6]" : "bg-gray-300",
      ].join(" ")}
    >
      <div
        className={[
          "absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform",
          on ? "translate-x-[22px]" : "translate-x-0.5",
        ].join(" ")}
      />
    </div>
  );
}

function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-xs font-medium text-gray-700">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#4F39F6] focus:border-[#4F39F6]"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function Modal({
  open,
  onClose,
  title,
  children,
  widthClass = "max-w-2xl",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  widthClass?: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className={["bg-white rounded-xl shadow-xl w-full", widthClass].join(
          " "
        )}
      >
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-900">{title}</div>
          <div
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => handleKeyboardActivate(e, onClose)}
            className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-500"
          >
            ✕
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

// Mock Data
const overviewMock = {
  stats: [
    { label: "Total Earnings", value: "$12,450", hint: "+12% this month" },
    { label: "Active Projects", value: "8", hint: "2 pending" },
    { label: "Completed Jobs", value: "142", hint: "98% success rate" },
    { label: "Client Rating", value: "4.9", hint: "156 reviews" },
  ],
  deadlines: [
    {
      title: "E-commerce Dashboard",
      due: "Due in 2 days",
      percent: 75,
      tone: "amber" as const,
    },
    {
      title: "Mobile App Redesign",
      due: "Due tomorrow",
      percent: 92,
      tone: "red" as const,
    },
    {
      title: "Brand Identity",
      due: "Due in 5 days",
      percent: 45,
      tone: "blue" as const,
    },
  ],
  activity: [
    {
      title: "New project invitation",
      desc: "SaaS Dashboard Design",
      time: "2 hours ago",
      tone: "blue" as const,
    },
    {
      title: "Payment received",
      desc: "$850 from Acme Corp",
      time: "5 hours ago",
      tone: "green" as const,
    },
    {
      title: "Contract signed",
      desc: "Mobile App Development",
      time: "1 day ago",
      tone: "amber" as const,
    },
  ],
  summary: [
    { label: "Proposals Sent", value: "24", tone: "blue" as const },
    { label: "New Contracts", value: "6", tone: "green" as const },
    { label: "Hours Worked", value: "156", tone: "purple" as const },
    { label: "Revenue", value: "$8,200", tone: "amber" as const },
  ],
};

const proposalsMock = {
  keywords: "react, typescript, frontend",
};

const earningMock = {
  balance: "$2,345.00",
  methods: [
    { title: "Bank Account", meta: "Wells Fargo •••• 4521", badge: "Primary" },
    { title: "PayPal", meta: "john.doe@email.com", badge: null },
  ],
  currencyOptions: ["USD", "EUR", "GBP"],
};

const notificationMock = {
  channels: [
    { label: "Email", on: true, meta: "john.doe@email.com" },
    { label: "Push Notifications", on: true, meta: null },
    { label: "SMS", on: false, meta: "+1 (555) 123-4567" },
  ],
  events: [
    { label: "New Messages", on: true, meta: "Client and admin messages" },
    { label: "Project Updates", on: true, meta: "Milestones and deliverables" },
    { label: "Payment Alerts", on: true, meta: "Invoices and payments" },
    { label: "Job Matches", on: false, meta: "New jobs matching your skills" },
  ],
  quietHours: true,
};

const billingMock = {
  savedMethods: [
    { title: "Visa •••• 4242", meta: "Expires 12/2025", badge: "Default" },
    { title: "Mastercard •••• 8210", meta: "Expires 08/2026", badge: null },
  ],
  address: {
    firstName: "John",
    lastName: "Doe",
    street: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
  },
  charges: [
    { title: "Premium Subscription", due: "Renews Feb 28", price: "$29.99" },
    { title: "Connect Fee", due: "Due Mar 5", price: "$15.00" },
  ],
};

const accountMock = {
  profile: {
    displayName: "John Doe",
    handle: "@johndoe",
    primaryEmail: "john.doe@email.com",
    backupEmail: "john.backup@email.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
    timeZone: "PST (UTC-8)",
    language: "English",
  },
  sessions: [
    {
      title: "Chrome on MacBook Pro",
      meta: "San Francisco, CA",
      time: "Active now",
    },
    {
      title: "Safari on iPhone",
      meta: "San Francisco, CA",
      time: "2 hours ago",
    },
  ],
};

const privacyMock = {
  visibilityOptions: ["Public", "Freelancers Only", "Private"],
  directMsgOptions: ["Anyone", "Verified Clients Only", "No One"],
};

const securityMock = {
  devices: [
    { title: "MacBook Pro", meta: "Added Jan 15, 2025", action: "Remove" },
    { title: "iPhone 15 Pro", meta: "Added Jan 10, 2025", action: "Remove" },
  ],
  events: [
    { title: "Login from new device", meta: "Chrome, San Francisco - Jan 18" },
    { title: "Password changed", meta: "Successfully updated - Jan 15" },
    { title: "2FA enabled", meta: "Authenticator app added - Jan 12" },
  ],
};

// Main Components
function CardWrap({
  title,
  children,
  right,
}: {
  title?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      {(title || right) && (
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-900">{title}</div>
          {right}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

function Input({
  label,
  placeholder,
  defaultValue,
  disabled,
  type = "text",
  inputMode,
  pattern,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <div className="text-xs font-medium text-gray-700">{label}</div>
      <input
        className={[
          "mt-2 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none",
          "focus:ring-2 focus:ring-[#4F39F6] focus:border-[#4F39F6]",
          disabled ? "opacity-70 cursor-not-allowed" : "",
        ].join(" ")}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
        inputMode={inputMode}
        pattern={pattern}
      />
    </div>
  );
}

function PrimaryBtn({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) =>
        disabled ? undefined : handleKeyboardActivate(e, () => onClick?.())
      }
      className={[
        "px-4 py-2 rounded-md text-sm font-medium cursor-pointer",
        disabled
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-[#4F39F6] text-white hover:opacity-95",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function GhostBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => handleKeyboardActivate(e, () => onClick?.())}
      className="px-4 py-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 cursor-pointer"
    >
      {children}
    </div>
  );
}

// Main Content Component
export default function Content({
  activeTab = "overview",
  onOpenAddPayment,
  onOpenUnblock,

  blockedUsers,
  setBlockedUsers,

  unblockOpen,
  setUnblockOpen,
  unblockTargetId,
  setUnblockTargetId,

  addPayOpen,
  setAddPayOpen,
}: {
  activeTab?: TabKey;

  onOpenAddPayment: () => void;
  onOpenUnblock: (id: string) => void;

  blockedUsers: BlockedUser[];
  setBlockedUsers: React.Dispatch<React.SetStateAction<BlockedUser[]>>;

  unblockOpen: boolean;
  setUnblockOpen: (v: boolean) => void;
  unblockTargetId: string | null;
  setUnblockTargetId: (v: string | null) => void;

  addPayOpen: boolean;
  setAddPayOpen: (v: boolean) => void;
}) {

  const [jobAlertsOn, setJobAlertsOn] = React.useState(true);
  const [alertFrequency, setAlertFrequency] = React.useState("Real-time");
  const [minSpend, setMinSpend] = React.useState("$1,000+");
  const [verifiedOnly, setVerifiedOnly] = React.useState(false);

  const [payoutSchedule, setPayoutSchedule] = React.useState(
    "Weekly (Every Monday)"
  );
  const [preferredCurrency, setPreferredCurrency] = React.useState("USD");
  const [minPayout, setMinPayout] = React.useState("10");

  const [channels, setChannels] = React.useState(notificationMock.channels);
  const [events, setEvents] = React.useState(notificationMock.events);
  const [quietHours, setQuietHours] = React.useState(
    notificationMock.quietHours
  );

  const [visibility, setVisibility] = React.useState("Public");
  const [allowDirect, setAllowDirect] = React.useState("Anyone");
  const [showOnline, setShowOnline] = React.useState(true);
  const [showEarnings, setShowEarnings] = React.useState(false);
  const [searchIndexing, setSearchIndexing] = React.useState(true);
  const [aiDisclosure, setAiDisclosure] = React.useState(false);
  const [hideProposalCount, setHideProposalCount] = React.useState(false);

  const [authApp, setAuthApp] = React.useState(true);
  const [smsBackup, setSmsBackup] = React.useState(false);
  const [passkeys, setPasskeys] = React.useState(false);
  const [loginAlerts, setLoginAlerts] = React.useState(true);

  const [payType, setPayType] = React.useState<
    "card" | "bank" | "paypal" | "wallet"
  >("card");

  const unblockTarget = unblockTargetId
    ? blockedUsers.find((u) => u.id === unblockTargetId) || null
    : null;

  const closeUnblock = () => {
    setUnblockOpen(false);
    setUnblockTargetId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {overviewMock.stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-5"
                >
                  <div className="text-xs text-gray-500">{s.label}</div>
                  <div className="mt-1 text-2xl font-semibold text-gray-900">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-green-600">{s.hint}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <CardWrap title="Upcoming Deadlines">
                <div className="space-y-3">
                  {overviewMock.deadlines.map((d) => (
                    <div
                      key={d.title}
                      className="rounded-xl border border-gray-200 bg-white p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {d.title}
                          </div>
                          <div className="text-xs text-gray-600">{d.due}</div>
                        </div>
                        <div className="text-xs text-gray-600">
                          {d.percent}%
                        </div>
                      </div>
                      <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
                        <div
                          className={`h-full rounded-full ${
                            d.tone === "red"
                              ? "bg-red-500"
                              : d.tone === "amber"
                              ? "bg-amber-500"
                              : "bg-blue-500"
                          }`}
                          style={{ width: `${d.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardWrap>

              <CardWrap title="Recent Activity">
                <div className="space-y-3">
                  {overviewMock.activity.map((a) => (
                    <div
                      key={a.title}
                      className="rounded-xl border border-gray-200 bg-white p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {a.title}
                          </div>
                          <div className="text-xs text-gray-600">{a.desc}</div>
                        </div>
                        <div className="text-xs text-gray-500">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardWrap>
            </div>
          </>
        )}

        {/* Proposals Tab */}
        {activeTab === "proposals" && (
          <CardWrap title="Job Search Preferences">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Enable Job Alerts
                  </div>
                  <div className="text-xs text-gray-500">
                    Receive notifications for matching jobs
                  </div>
                </div>
                <Toggle on={jobAlertsOn} setOn={setJobAlertsOn} />
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Dropdown
                  label="Alert Frequency"
                  value={alertFrequency}
                  options={["Real-time", "Daily", "Weekly"]}
                  onChange={setAlertFrequency}
                />
                <Input
                  label="Alert Keywords"
                  placeholder="react, typescript, frontend"
                  defaultValue={proposalsMock.keywords}
                />
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Dropdown
                  label="Minimum Client Spend"
                  value={minSpend}
                  options={["No minimum", "$1,000+", "$10,000+"]}
                  onChange={setMinSpend}
                />
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div className="text-sm font-medium text-gray-900">
                    Payment Verified Only
                  </div>
                  <Toggle on={verifiedOnly} setOn={setVerifiedOnly} />
                </div>
              </div>
            </div>
          </CardWrap>
        )}

        {/* Earnings Tab */}
        {activeTab === "earning_payout" && (
          <CardWrap title="Payment Methods">
            <div className="rounded-xl border border-[#4F39F6]/25 bg-[#4F39F6]/5 p-4">
              <div className="text-xs text-gray-500">Available Balance</div>
              <div className="text-2xl font-semibold text-[#4F39F6]">
                {earningMock.balance}
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {earningMock.methods.map((m) => (
                <div
                  key={m.title}
                  className="p-4 border border-gray-200 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {m.title}
                    </div>
                    <div className="text-xs text-gray-500">{m.meta}</div>
                  </div>
                  {m.badge && (
                    <div className="px-2 py-1 bg-[#4F39F6]/10 text-[#4F39F6] text-xs rounded">
                      {m.badge}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Dropdown
                label="Payout Schedule"
                value={payoutSchedule}
                options={[
                  "Weekly (Every Monday)",
                  "Real-time",
                  "Daily (Every 8AM)",
                ]}
                onChange={setPayoutSchedule}
              />
              <Input
                label="Minimum Payout Threshold"
                value={minPayout}
                onChange={(e) =>
                  setMinPayout(e.target.value.replace(/[^0-9]/g, ""))
                }
                inputMode="numeric"
              />
            </div>
          </CardWrap>
        )}

        {/* Notifications Tab */}
        {activeTab === "notification" && (
          <CardWrap title="Notification Preferences">
            <div className="space-y-3">
              {channels.map((c, idx) => (
                <div
                  key={c.label}
                  className="p-4 border border-gray-200 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {c.label}
                    </div>
                    {c.meta && (
                      <div className="text-xs text-gray-500">{c.meta}</div>
                    )}
                  </div>
                  <Toggle
                    on={c.on}
                    setOn={(v) => {
                      const next = [...channels];
                      next[idx] = { ...next[idx], on: v };
                      setChannels(next);
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              {events.map((e, idx) => (
                <div
                  key={e.label}
                  className="p-4 border border-gray-200 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {e.label}
                    </div>
                    <div className="text-xs text-gray-500">{e.meta}</div>
                  </div>
                  <Toggle
                    on={e.on}
                    setOn={(v) => {
                      const next = [...events];
                      next[idx] = { ...next[idx], on: v };
                      setEvents(next);
                    }}
                  />
                </div>
              ))}
            </div>
          </CardWrap>
        )}

        {/* Billing Tab */}
        {activeTab === "billing" && (
          <CardWrap
            title="Payment Methods"
            right={
              <button
                onClick={onOpenAddPayment}
                className="px-3 py-2 rounded-md bg-[#4F39F6]/10 text-[#4F39F6] text-sm font-medium"
              >
                Add Payment Method
              </button>
            }
          >
            <div className="space-y-3">
              {billingMock.savedMethods.map((m) => (
                <div
                  key={m.title}
                  className="p-4 border border-gray-200 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {m.title}
                    </div>
                    <div className="text-xs text-gray-500">{m.meta}</div>
                  </div>
                  {m.badge && (
                    <div className="px-2 py-1 bg-[#4F39F6]/10 text-[#4F39F6] text-xs rounded">
                      {m.badge}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                defaultValue={billingMock.address.firstName}
              />
              <Input
                label="Last Name"
                defaultValue={billingMock.address.lastName}
              />
              <Input
                label="Street Address"
                defaultValue={billingMock.address.street}
              />
              <Input label="City" defaultValue={billingMock.address.city} />
            </div>
          </CardWrap>
        )}

        {/* Account Tab */}
        {activeTab === "account" && (
          <>
            <CardWrap title="Profile Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Display Name"
                  defaultValue={accountMock.profile.displayName}
                />
                <Input
                  label="Handle"
                  defaultValue={accountMock.profile.handle}
                  disabled
                />
                <Input
                  label="Primary Email"
                  defaultValue={accountMock.profile.primaryEmail}
                  type="email"
                />
                <Input
                  label="Phone Number"
                  defaultValue={accountMock.profile.phone}
                />
              </div>
            </CardWrap>

            <CardWrap title="Blocked Users">
              <div className="space-y-3">
                {blockedUsers.map((u) => (
                  <div
                    key={u.id}
                    className="p-4 border border-gray-200 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatarSrc}
                        alt={u.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {u.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {u.blockedAt}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenUnblock(u.id)}
                      className="px-3 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50"
                    >
                      Unblock
                    </button>
                  </div>
                ))}
              </div>
            </CardWrap>
          </>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <CardWrap title="Two-Factor Authentication">
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Authenticator App
                  </div>
                  <div className="text-xs text-gray-500">
                    Use Google Authenticator or Authy
                  </div>
                </div>
                <Toggle on={authApp} setOn={setAuthApp} />
              </div>
              <div className="p-4 border border-gray-200 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    SMS Backup
                  </div>
                  <div className="text-xs text-gray-500">
                    Receive codes via text
                  </div>
                </div>
                <Toggle on={smsBackup} setOn={setSmsBackup} />
              </div>
            </div>
          </CardWrap>
        )}

        {/* Privacy Tab */}
        {activeTab === "privacy" && (
          <div className="space-y-5">
            <CardWrap title="Profile Visibility">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Dropdown
                  label="Profile Visibility"
                  value={visibility}
                  options={privacyMock.visibilityOptions}
                  onChange={setVisibility}
                />
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Show Online Status
                    </div>
                    <div className="text-xs text-gray-500">
                      Let others know when you're active
                    </div>
                  </div>
                  <Toggle on={showOnline} setOn={setShowOnline} />
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Show Earnings
                    </div>
                    <div className="text-xs text-gray-500">
                      Display your public earnings on your profile
                    </div>
                  </div>
                  <Toggle on={showEarnings} setOn={setShowEarnings} />
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Search Engine Indexing
                    </div>
                    <div className="text-xs text-gray-500">
                      Allow search engines to index your profile
                    </div>
                  </div>
                  <Toggle on={searchIndexing} setOn={setSearchIndexing} />
                </div>
              </div>
            </CardWrap>

            <CardWrap title="Communication Preferences">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Dropdown
                  label="Allow Direct Messages From"
                  value={allowDirect}
                  options={privacyMock.directMsgOptions}
                  onChange={setAllowDirect}
                />
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Hide Proposal Count
                    </div>
                    <div className="text-xs text-gray-500">
                      Don't show how many proposals you've submitted
                    </div>
                  </div>
                  <Toggle on={hideProposalCount} setOn={setHideProposalCount} />
                </div>
              </div>
            </CardWrap>
          </div>
        )}

        {/* Apps Tab */}
        {activeTab === "apps" && (
          <CardWrap title="Connected Apps">
            <div className="text-xs text-gray-500 mb-4">
              OAuth scopes are shown for audit investigation. You can revoke access at any time.
            </div>

            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      Google Calendar
                    </div>
                    <div className="text-xs text-gray-500">Sync deadlines and meetings</div>
                  </div>
                  <button className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700">
                    Disconnect
                  </button>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      Google Drive
                    </div>
                    <div className="text-xs text-gray-500">Access and share files</div>
                  </div>
                  <button className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700">
                    Disconnect
                  </button>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-xl">
                <div className="text-sm font-semibold text-gray-900 mb-2">
                  Development & Design
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-900">GitHub</div>
                    <GhostBtn>Connect</GhostBtn>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-900">Figma</div>
                    <GhostBtn>Connect</GhostBtn>
                  </div>
                </div>
              </div>
            </div>
          </CardWrap>
        )}

        {/* Modals */}
        <Modal
          open={unblockOpen}
          onClose={closeUnblock}
          title={unblockTarget ? `Unblock ${unblockTarget.name}?` : "Unblock User"}
        >
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center flex-shrink-0">
                ⚠️
              </div>
              <div className="text-sm text-gray-600">
                This user will be able to contact you, apply to your jobs, and see your job posts again.
                You can always block them again later.
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <GhostBtn onClick={closeUnblock}>Cancel</GhostBtn>
              <PrimaryBtn
                onClick={() => {
                  if (unblockTargetId) {
                    setBlockedUsers((prev: BlockedUser[]) => prev.filter((u: BlockedUser) => u.id !== unblockTargetId));
                  }
                  closeUnblock();
                }}
              >
                Unblock User
              </PrimaryBtn>
            </div>
          </div>
        </Modal>

        <Modal
          open={addPayOpen}
          onClose={() => setAddPayOpen(false)}
          title="Add Payment Method"
        >
          <div className="p-5">
            <div className="text-xs text-gray-500 mb-4">
              Secured & encrypted
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium text-gray-900 mb-2">
                Select payment method
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { k: "card", t: "Card", s: "Visa, Mastercard..." },
                  { k: "bank", t: "Bank account", s: "ACH / SEPA" },
                  { k: "paypal", t: "PayPal", s: "Fast checkout" },
                  { k: "wallet", t: "Apple / Google Pay", s: "Device wallet" },
                ].map((option) => (
                  <div
                    key={option.k}
                    className={`p-4 border rounded-xl cursor-pointer ${
                      payType === option.k
                        ? "border-[#4F39F6] bg-[#4F39F6]/5"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => setPayType(option.k as typeof payType)}
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {option.t}
                    </div>
                    <div className="text-xs text-gray-500">{option.s}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Input label="Card number" placeholder="1234 5678 9012 3456" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry" placeholder="MM/YY" />
                <Input label="CVC" placeholder="123" />
              </div>
              <Input label="Name on card" placeholder="John Doe" />
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm font-medium text-gray-900 mb-3">
                Billing address
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Country" placeholder="United States" />
                <Input label="Street address" placeholder="123 Main St" />
                <Input label="City" placeholder="San Francisco" />
                <Input label="State / Province" placeholder="CA" />
                <Input label="Postal code" placeholder="94102" />
              </div>
            </div>

            <div className="mt-4 p-3 bg-[#4F39F6]/5 rounded-lg">
              <div className="text-xs text-[#4F39F6]">
                No extra fee. Charged in USD.
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <GhostBtn onClick={() => setAddPayOpen(false)}>Cancel</GhostBtn>
              <PrimaryBtn onClick={() => setAddPayOpen(false)}>
                Save & Continue
              </PrimaryBtn>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
