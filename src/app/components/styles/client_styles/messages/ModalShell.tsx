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

export default function ModalShell({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        role="button"
        tabIndex={0}
        onClick={onClose}
        onKeyDown={(e) => handleKeyboardActivate(e, onClose)}
        aria-label="Close modal overlay"
      />
      {/* modal */}
      <div className="relative w-[92%] max-w-lg bg-white rounded-xl shadow-lg border p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="text-sm font-semibold text-gray-900">{title}</div>

          <div
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => handleKeyboardActivate(e, onClose)}
            className="text-gray-400 hover:text-gray-600 cursor-pointer select-none"
            aria-label="Close modal"
          >
            ✕
          </div>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
