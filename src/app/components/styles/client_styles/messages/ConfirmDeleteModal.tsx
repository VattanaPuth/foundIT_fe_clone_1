"use client";

import ModalShell from "./ModalShell";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export default function ConfirmDeleteModal({
  open,
  name,
  onClose,
  onConfirm,
}: {
  open: boolean;
  name: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <ModalShell open={open} title={`Delete conversation with ${name}?`} onClose={onClose}>
      <div className="text-sm text-gray-600">
        This will remove the conversation from your inbox.
      </div>

      <div className="mt-5 flex items-center justify-end gap-2 ">
        <div
          role="button"
          tabIndex={0}
          onClick={onClose}
          onKeyDown={(e) => handleKeyboardActivate(e, onClose)}
          className="h-9 px-4 flex items-center rounded-md border bg-white hover:bg-gray-50 text-sm cursor-pointer select-none"
        >
          Cancel
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={onConfirm}
          onKeyDown={(e) => handleKeyboardActivate(e, onConfirm)}
          className="h-9 px-4 flex items-center rounded-md bg-red-500 hover:bg-red-600 text-white text-sm cursor-pointer select-none"
        >
          Delete
        </div>
      </div>
    </ModalShell>
  );
}
