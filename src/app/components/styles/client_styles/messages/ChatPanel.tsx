"use client";

import { useRef } from "react";
import MoreMenu from "@/app/components/styles/client_styles/messages/MoreMenu";
import type { Conversation } from "./ConversationsSidebar";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 3h2l2 6-2 1c1 2 3 4 5 5l1-2 6 2v2c0 2-2 4-4 4-8 0-14-6-14-14 0-2 2-4 4-4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 7h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M16 10l6-3v10l-6-3v-4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM12 20.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 12.5 14.5 6a3 3 0 1 1 4.2 4.2L10.6 18.3a5 5 0 0 1-7.1-7.1L12 2.7"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 11.5 21 3l-8.5 18-2.2-7.3L3 11.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
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

function Avatar({ name }: { name: string }) {
  const initial = name.trim().slice(0, 1).toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 text-gray-700 flex items-center justify-center">
      <span className="text-sm font-medium">{initial}</span>
    </div>
  );
}

export default function ChatPanel({
  conversation,
  visible,
  menuOpen,
  setMenuOpen,
  onMute,
  onDelete,
  onBlock,
  onReport,
  mobileBackToList,
  chatText,
  setChatText,
  onSend,
  menuRef,
}: {
  conversation: Conversation | undefined;
  visible: boolean;

  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;

  onMute: () => void;
  onDelete: () => void;
  onBlock: () => void;
  onReport: () => void;

  mobileBackToList: () => void;

  chatText: string;
  setChatText: (v: string) => void;
  onSend: () => void;

  menuRef: React.RefObject<HTMLDivElement | null>;
}) {
  if (!visible) return null;

  return (
    <section className="bg-white border rounded-xl shadow-sm overflow-hidden h-[calc(100vh-220px)]">
      {conversation ? (
        <div className="h-full flex flex-col">
          {/* Sticky header */}
          <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative">
                  <Avatar name={conversation.name} />
                  <div
                    className={[
                      "absolute -left-0.5 bottom-0 w-3 h-3 rounded-full border-2 border-white",
                      conversation.online ? "bg-green-500" : "bg-gray-300",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      {conversation.name}
                    </div>
                    {conversation.muted ? (
                      <div className="text-gray-400" title="Muted">
                        <BellMutedIcon />
                      </div>
                    ) : null}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {conversation.online ? "Online" : "Offline"} • {conversation.projectLabel}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile: back to list */}
                <div className="lg:hidden">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={mobileBackToList}
                    onKeyDown={(e) => handleKeyboardActivate(e, mobileBackToList)}
                    className="px-3 h-9 rounded-md border bg-white hover:bg-gray-50 text-sm inline-flex items-center justify-center cursor-pointer select-none"
                  >
                    Chats
                  </div>
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => console.log("Phone clicked")}
                  onKeyDown={(e) =>
                    handleKeyboardActivate(e, () => console.log("Phone clicked"))
                  }
                  className="w-9 h-9 rounded-md hover:bg-gray-50 inline-flex items-center justify-center cursor-pointer select-none text-gray-600"
                  aria-label="Call"
                >
                  <PhoneIcon />
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => console.log("Video clicked")}
                  onKeyDown={(e) =>
                    handleKeyboardActivate(e, () => console.log("Video clicked"))
                  }
                  className="w-9 h-9 rounded-md hover:bg-gray-50 inline-flex items-center justify-center cursor-pointer select-none text-gray-600"
                  aria-label="Video call"
                >
                  <VideoIcon />
                </div>

                {/* 3-dots + menu */}
                <div className="relative" ref={menuRef}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setMenuOpen(!menuOpen)}
                    onKeyDown={(e) =>
                      handleKeyboardActivate(e, () => setMenuOpen(!menuOpen))
                    }
                    className="w-9 h-9 rounded-md hover:bg-gray-50 inline-flex items-center justify-center cursor-pointer select-none text-gray-600"
                    aria-label="More actions"
                  >
                    <DotsIcon />
                  </div>

                  <MoreMenu
                    open={menuOpen}
                    onMute={onMute}
                    onDelete={onDelete}
                    onBlock={onBlock}
                    onReport={onReport}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto px-4 py-4 bg-white">
            <div className="space-y-4">
              {conversation.messages.map((m) => {
                const isMe = m.from === "me";
                return (
                  <div
                    key={m.id}
                    className={["flex", isMe ? "justify-end" : "justify-start"].join(" ")}
                  >
                    <div className="max-w-[78%]">
                      <div
                        className={[
                          "px-4 py-3 rounded-2xl text-sm leading-5 whitespace-pre-line",
                          isMe
                            ? "bg-green-500 text-white rounded-tr-md"
                            : "bg-gray-100 text-gray-800 rounded-tl-md",
                        ].join(" ")}
                      >
                        {m.text}
                      </div>
                      <div
                        className={[
                          "text-xs text-gray-400 mt-1",
                          isMe ? "text-right" : "text-left",
                        ].join(" ")}
                      >
                        {m.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky composer */}
          <div className="sticky bottom-0 bg-white border px-4 py-3 ">
            <div className="flex items-center gap-3">
              <div
                role="button"
                tabIndex={0}
                onClick={() => console.log("Attach clicked")}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () => console.log("Attach clicked"))
                }
                className="w-9 h-9 rounded-md hover:bg-gray-50 inline-flex items-center justify-center cursor-pointer select-none text-gray-600"
                aria-label="Attach"
              >
                <PaperclipIcon />
              </div>

              <input
                aria-label="Type message"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onSend();
                  }
                }}
                placeholder="Type your message..."
                className={[
                  "flex-1 h-10 rounded-md border bg-gray-50 px-3 text-sm",
                  "hover:border-gray-300",
                  "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
                ].join(" ")}
              />

              <div
                role="button"
                tabIndex={0}
                onClick={onSend}
                onKeyDown={(e) => handleKeyboardActivate(e, onSend)}
                className="w-10 h-10 rounded-md bg-green-500 hover:bg-green-600 inline-flex items-center justify-center cursor-pointer select-none text-white"
                aria-label="Send"
              >
                <SendIcon />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-sm text-gray-500">
          Select a conversation
        </div>
      )}
    </section>
  );
}
