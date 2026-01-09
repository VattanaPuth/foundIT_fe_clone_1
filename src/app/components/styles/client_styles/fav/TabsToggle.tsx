"use client";

type TabKey = "freelancers" | "projects";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export default function TabsToggle({
  activeTab,
  onChange,
}: {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
}) {
  return (
    <div className="inline-flex bg-white border rounded-full p-1">
      <div
        role="button"
        tabIndex={0}
        onClick={() => onChange("freelancers")}
        onKeyDown={(e) => handleKeyboardActivate(e, () => onChange("freelancers"))}
        className={[
          "px-4 h-8 rounded-full text-sm inline-flex items-center justify-center cursor-pointer select-none",
          activeTab === "freelancers"
            ? "bg-gray-100 text-gray-900"
            : "text-gray-500 hover:text-gray-700",
        ].join(" ")}
      >
        Freelancers (6)
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => onChange("projects")}
        onKeyDown={(e) => handleKeyboardActivate(e, () => onChange("projects"))}
        className={[
          "px-4 h-8 rounded-full text-sm inline-flex items-center justify-center cursor-pointer select-none",
          activeTab === "projects"
            ? "bg-gray-100 text-gray-900"
            : "text-gray-500 hover:text-gray-700",
        ].join(" ")}
      >
        Ready Projects (8)
      </div>
    </div>
  );
}
