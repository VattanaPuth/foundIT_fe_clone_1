"use client";

type SelectMode = "fixed" | "hourly";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export default function PayAndBudgetSection({
  payMode,
  setPayMode,
  budgetMin,
  setBudgetMin,
  budgetMax,
  setBudgetMax,
}: {
  payMode: SelectMode;
  setPayMode: (m: SelectMode) => void;
  budgetMin: string;
  setBudgetMin: (v: string) => void;
  budgetMax: string;
  setBudgetMax: (v: string) => void;
}) {
  const budgetTitle =
    payMode === "fixed" ? "Budget amount or range" : "Hourly rate range";
  const minPlaceholder = payMode === "fixed" ? "100" : "Minimum $/hr";
  const maxPlaceholder =
    payMode === "fixed" ? "Maximum (optional)" : "Maximum $/hr";
  const helperText =
    payMode === "fixed" ? "Similar work is usually $800 - $2,000" : "";

  return (
    <>
      {/* Fixed or Hourly */}
      <div className="mb-5">
        <div className="text-sm font-medium text-gray-900 mb-2">
          Fixed or Hourly?{" "}
          <span className="text-gray-500 font-normal">
            You’ll see fees and totals here
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setPayMode("fixed")}
            onKeyDown={(e) =>
              handleKeyboardActivate(e, () => setPayMode("fixed"))
            }
            className={[
              "rounded-lg border p-4 cursor-pointer select-none",
              payMode === "fixed"
                ? "border-green-400 bg-green-50"
                : "border-gray-200 bg-white hover:border-gray-300",
            ].join(" ")}
          >
            <div className="text-sm font-medium text-gray-900">Fixed Price</div>
            <div className="text-xs text-gray-500 mt-1">One total amount</div>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => setPayMode("hourly")}
            onKeyDown={(e) =>
              handleKeyboardActivate(e, () => setPayMode("hourly"))
            }
            className={[
              "rounded-lg border p-4 cursor-pointer select-none",
              payMode === "hourly"
                ? "border-green-400 bg-green-50"
                : "border-gray-200 bg-white hover:border-gray-300",
            ].join(" ")}
          >
            <div className="text-sm font-medium text-gray-900">Hourly Rate</div>
            <div className="text-xs text-gray-500 mt-1">Pay per hour</div>
          </div>
        </div>
      </div>

      {/* Budget */}
      <div className="mb-5">
        <div className="text-sm font-medium text-gray-900 mb-2">{budgetTitle}</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            aria-label="Budget minimum"
            value={budgetMin}
            onChange={(e) => setBudgetMin(e.target.value)}
            placeholder={minPlaceholder}
            className={[
              "w-full h-10 rounded-md border bg-gray-50 px-3 text-sm",
              "hover:border-gray-300",
              "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
            ].join(" ")}
          />

          <input
            aria-label="Budget maximum"
            value={budgetMax}
            onChange={(e) => setBudgetMax(e.target.value)}
            placeholder={maxPlaceholder}
            className={[
              "w-full h-10 rounded-md border bg-gray-50 px-3 text-sm",
              "hover:border-gray-300",
              "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
            ].join(" ")}
          />
        </div>

        {helperText ? (
          <div className="text-xs text-gray-400 mt-2">{helperText}</div>
        ) : null}
      </div>
    </>
  );
}
