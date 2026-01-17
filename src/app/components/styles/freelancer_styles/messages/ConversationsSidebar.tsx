"use client";

export type RoleTag = "Freelancer" | "Seller";

export type Message = {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
  messageType?: string;
};

export type Conversation = {
  id: string;
  name: string;
  roleTag: RoleTag;
  timeLabel: string;
  preview: string;
  online: boolean;
  projectLabel: string;
  muted: boolean;
  messages: Message[];
};

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
      />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
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

function RolePill({ role }: { role: RoleTag }) {
  const isFreelancer = role === "Freelancer";
  return (
    <span
      className={[
        "text-xs px-2 py-0.5 rounded-full border",
        isFreelancer
          ? "bg-indigo-50 text-indigo-600 border-indigo-200"
          : "bg-orange-50 text-orange-600 border-orange-200",
      ].join(" ")}
    >
      {role}
    </span>
  );
}

export default function ConversationsSidebar({
  conversations,
  activeId,
  searchText,
  setSearchText,
  onOpenConversation,
  visible,
}: {
  conversations: Conversation[];
  activeId: string;
  searchText: string;
  setSearchText: (v: string) => void;
  onOpenConversation: (id: string) => void;
  visible: boolean;
}) {
  return (
    <section
      className={[
        "bg-white border rounded-xl shadow-sm overflow-hidden",
        "h-[calc(100vh-220px)]",
        visible ? "block" : "hidden lg:block",
      ].join(" ")}
    >
      <div className="p-4 border">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </div>
          <input
            aria-label="Search messages"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search messages..."
            className={[
              "w-full h-10 rounded-md border bg-gray-50",
              "pl-9 pr-3 text-sm",
              "hover:border-gray-300",
              "focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400",
            ].join(" ")}
          />
        </div>
      </div>

      <div className="overflow-auto h-[calc(100%-73px)]">
        {conversations.map((c) => {
          const isActive = c.id === activeId;
          return (
            <div
              key={c.id}
              role="button"
              tabIndex={0}
              onClick={() => onOpenConversation(c.id)}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => onOpenConversation(c.id))
              }
              className={[
                "px-4 py-3 border border-gray-400 cursor-pointer select-none",
                "hover:bg-gray-50",
                isActive ? "bg-green-50" : "bg-white",
              ].join(" ")}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="relative">
                  <Avatar name={c.name} />
                  <div
                    className={[
                      "absolute -left-0.5 bottom-0 w-3 h-3 rounded-full border-2  border-white",
                      c.online ? "bg-green-500" : "bg-gray-300",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {c.name}
                    </div>
                    {c.muted ? (
                      <div className="text-gray-400" title="Muted">
                        <BellMutedIcon />
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <RolePill role={c.roleTag} />
                    <div className="text-xs text-gray-400">{c.timeLabel}</div>
                  </div>

                  <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {c.preview}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {conversations.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No conversations.</div>
        ) : null}
      </div>
    </section>
  );
}
