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

function BellMutedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9 21a3 3 0 0 0 6 0"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M4 4l16 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuItem({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => handleKeyboardActivate(e, onClick)}
      className="px-4 py-2 flex items-center gap-3 text-sm text-gray-800 hover:bg-gray-50 cursor-pointer select-none"
    >
      <div className="text-gray-500">{icon}</div>
      <div>{text}</div>
    </div>
  );
}

export default function MoreMenu({
  open,
  onMute,
  onDelete,
  onBlock,
  onReport,
}: {
  open: boolean;
  onMute: () => void;
  onDelete: () => void;
  onBlock: () => void;
  onReport: () => void;
}) {
  if (!open) return null;

  return (
    <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg overflow-hidden">
      <MenuItem text="Mute" icon={<BellMutedIcon />} onClick={onMute} />

      <MenuItem
        text="Delete"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 7h16M10 11v7M14 11v7M6 7l1 14h10l1-14M9 7V4h6v3"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        onClick={onDelete}
      />

      <MenuItem
        text="Block"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
            />
            <path
              d="M7 7l10 10"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        }
        onClick={onBlock}
      />

      <MenuItem
        text="Report"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 3v18M5 4h12l-1 4 2 4H5"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
              strokeLinejoin="round"
            />
          </svg>
        }
        onClick={onReport}
      />
    </div>
  );
}
