"use client";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function UploadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 15V4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M7.5 8.5 12 4l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function DeliveryAndDescriptionSection({
  deliveryKey,
  setDeliveryKey,
  customDays,
  setCustomDays,
  description,
  setDescription,
}: {
  deliveryKey: string;
  setDeliveryKey: (v: string) => void;
  customDays: string;
  setCustomDays: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
}) {
  const deliveryOptions = [
    { key: "24h", label: "24 hours" },
    { key: "3d", label: "3 days" },
    { key: "1w", label: "1 week" },
    { key: "custom", label: "Custom" },
  ];

  const maxWords = 500;
  const wordCount = (() => {
    const trimmed = description.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  })();

  return (
    <>
      {/* Delivery */}
      <div className="mb-6">
        <div className="text-sm font-medium text-gray-900 mb-2">
          When do you want first delivery?
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {deliveryOptions.map((d) => {
            const active = d.key === deliveryKey;
            return (
              <div
                key={d.key}
                role="button"
                tabIndex={0}
                onClick={() => setDeliveryKey(d.key)}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () => setDeliveryKey(d.key))
                }
                className={[
                  "h-10 rounded-md border text-sm flex items-center justify-center",
                  "cursor-pointer select-none",
                  active
                    ? "border-green-400 bg-green-50 text-gray-900"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300",
                ].join(" ")}
              >
                {d.label}
              </div>
            );
          })}
        </div>

        {deliveryKey === "custom" ? (
          <div className="mt-3">
            <div className="relative max-w-[240px]">
              <input
                aria-label="Custom delivery days"
                value={customDays}
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/[^\d]/g, "");
                  setCustomDays(digitsOnly);
                }}
                placeholder="10"
                className={[
                  "w-full h-10 rounded-md border bg-gray-50 px-3 pr-12 text-sm",
                  "hover:border-gray-300",
                  "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
                ].join(" ")}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                days
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Description */}
      <div className="mb-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-sm font-medium text-gray-900">Description</div>
            <div className="text-xs text-gray-500 mt-1">
              Tell freelancers what you need in clear, simple terms
            </div>
          </div>
          <div className="text-xs text-gray-400">
            {wordCount}/{maxWords} words
          </div>
        </div>

        <textarea
          aria-label="Job description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., A modern logo that works across digital and print..."
          className={[
            "mt-3 w-full min-h-[180px] rounded-md border bg-gray-50 px-3 py-3 text-sm",
            "hover:border-gray-300",
            "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
          ].join(" ")}
        />
      </div>

      {/* References upload (static) */}
      <div className="mb-6">
        <div className="text-sm font-medium text-gray-900 mb-2">
          Add references{" "}
          <span className="text-gray-500 font-normal">
            (PDF/Images/ZIP, up to 10)
          </span>
        </div>

        <div className="rounded-lg border bg-white p-6 flex flex-col items-center justify-center text-center text-gray-500">
          <div className="text-gray-400 mb-2">
            <UploadIcon />
          </div>
          <div className="text-sm">Drop files here or click to upload</div>
          <div className="text-xs text-gray-400 mt-1">0/10 files</div>
        </div>
      </div>
    </>
  );
}
