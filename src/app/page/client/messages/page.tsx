"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ConversationsSidebar, {
  Conversation,
  Message as SidebarMessage,
} from "@/app/components/styles/client_styles/messages/ConversationsSidebar";
import ChatPanel from "@/app/components/styles/client_styles/messages/ChatPanel";
import ModalShell from "@/app/components/styles/client_styles/messages/ModalShell";
import ConfirmDeleteModal from "@/app/components/styles/client_styles/messages/ConfirmDeleteModal";
import ClientNavHeader from "@/app/components/styles/global_styles/client/header";
import ClientFooter from "@/app/components/styles/global_styles/client/footer";

function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export default function MessagesPage() {
  const router = useRouter();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [active, setActive] = useState<Conversation | undefined>(undefined);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Fetch conversations from backend
  useEffect(() => {
    const fetchConversations = async () => {
      setLoadingConversations(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8085/chat/conversations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch conversations");
        const data = await res.json();
        // Map backend messages to Conversation[]
        // Group by other user (client/freelancer)
        const grouped: { [key: string]: Conversation } = {};
        data.forEach((msg: any) => {
          const otherUser =
            msg.senderName === localStorage.getItem("username")
              ? msg.recipientName
              : msg.senderName;
          if (!grouped[otherUser]) {
            grouped[otherUser] = {
              id: otherUser,
              name: otherUser,
              roleTag: "Freelancer", // TODO: get real role
              timeLabel: "",
              preview: msg.contents,
              online: false,
              projectLabel: "",
              muted: false,
              messages: [],
            };
          }
          grouped[otherUser].messages.push({
            id: msg.id,
            from:
              msg.senderName === localStorage.getItem("username")
                ? "me"
                : "them",
            text: msg.contents,
            time: msg.time,
            messageType: msg.messageType,
          });
        });
        const convArr = Object.values(grouped);
        setConversations(convArr);
        if (convArr.length > 0 && !activeId) setActiveId(convArr[0].id);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingConversations(false);
      }
    };
    fetchConversations();
    // eslint-disable-next-line
  }, []);

  // Fetch messages for active conversation
  useEffect(() => {
    if (!activeId) return;
    setLoadingMessages(true);
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:8085/chat/messages?otherUserId=${activeId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        setActive((prev) => {
          if (!prev) return undefined;
          return {
            ...prev,
            messages: data.map((msg: any) => ({
              id: msg.id,
              from:
                msg.senderName === localStorage.getItem("username")
                  ? "me"
                  : "them",
              text: msg.contents,
              time: msg.time,
              messageType: msg.messageType,
            })),
          };
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingMessages(false);
      }
    };
    // Find the conversation object
    const conv = conversations.find((c) => c.id === activeId);
    setActive(conv);
    fetchMessages();
    // eslint-disable-next-line
  }, [activeId, conversations]);

  // responsive: mobile list/chat
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  // left search (simple filter)
  const [searchLeft, setSearchLeft] = useState("");

  // chat input
  const [chatText, setChatText] = useState("");

  // 3-dots dropdown
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // modals
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  // report form
  const [reportReason, setReportReason] = useState("Spam or unwanted messages");
  const [reportDetails, setReportDetails] = useState("");

  // close dropdown on click outside
  useEffect(() => {
    function onDocDown(e: MouseEvent) {
      if (!menuOpen) return;
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [menuOpen]);

  // ESC closes menu + modals
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setDeleteOpen(false);
      setBlockOpen(false);
      setReportOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filteredConversations = useMemo(() => {
    const q = searchLeft.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter((c) => c.name.toLowerCase().includes(q));
  }, [conversations, searchLeft]);

  const showList = mobileView === "list";
  const showChat = mobileView === "chat";

  function openConversation(id: string) {
    setActiveId(id);
    setMenuOpen(false);
    setMobileView("chat");
  }

  function toggleMuteActive() {
    if (!active) return;
    setConversations((prev) =>
      prev.map((c) => (c.id === active.id ? { ...c, muted: !c.muted } : c))
    );
  }

  function deleteActiveConversation() {
    if (!active) return;

    const idToDelete = active.id;
    setConversations((prev) => prev.filter((c) => c.id !== idToDelete));
    setDeleteOpen(false);

    // pick next active
    setTimeout(() => {
      setConversations((curr) => {
        const next = curr[0];
        setActiveId(next?.id ?? "");
        setMobileView("list");
        return curr;
      });
    }, 0);
  }

  async function sendMessage() {
    const text = chatText.trim();
    if (!text || !active) return;

    // Get sender and recipient info
    const token = localStorage.getItem("token");
    const senderId = localStorage.getItem("userId");
    const recipientId = active.id; // assuming this is userId of freelancer

    // Optimistically update UI
    setConversations((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              messages: [
                ...c.messages,
                { id: `me-${Date.now()}`, from: "me", text, time: "Just now" },
              ],
              preview: text,
              timeLabel: "Just now",
            }
          : c
      )
    );
    setChatText("");

    // Send to backend
    try {
      const form = new URLSearchParams();
      form.append("senderId", senderId || "");
      form.append("recipientId", recipientId);
      form.append("messageContent", text);
      const res = await fetch("http://localhost:8085/chat/p2p", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form.toString(),
      });
      if (!res.ok) throw new Error("Failed to send message");
    } catch (e) {
      console.error(e);
      // Optionally: show error to user or revert optimistic update
    }
  }

  return (
    <>
      <ClientNavHeader />
      <main className="bg-gray-50 min-h-screen px-4 py-6">
        <div className="mx-auto max-w-6xl">
          {/* Back row */}
          <div className="mb-3">
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                console.log("Back clicked (placeholder)");
                void router;
              }}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => {
                  console.log("Back clicked (placeholder)");
                  void router;
                })
              }
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer select-none"
            >
              <span className="text-base">←</span> Back
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Messages
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-4">
            <ConversationsSidebar
              conversations={filteredConversations}
              activeId={activeId}
              searchText={searchLeft}
              setSearchText={setSearchLeft}
              onOpenConversation={openConversation}
              visible={showList}
            />

            <ChatPanel
              conversation={active}
              visible={showChat || true /* keep visible on desktop via CSS */}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              onMute={() => {
                setMenuOpen(false);
                toggleMuteActive();
              }}
              onDelete={() => {
                setMenuOpen(false);
                setDeleteOpen(true);
              }}
              onBlock={() => {
                setMenuOpen(false);
                setBlockOpen(true);
              }}
              onReport={() => {
                setMenuOpen(false);
                setReportOpen(true);
              }}
              mobileBackToList={() => setMobileView("list")}
              chatText={chatText}
              setChatText={setChatText}
              onSend={sendMessage}
              menuRef={menuRef}
            />
          </div>
        </div>

        {/* Delete modal */}
        <ConfirmDeleteModal
          open={deleteOpen}
          name={active?.name ?? "this user"}
          onClose={() => setDeleteOpen(false)}
          onConfirm={deleteActiveConversation}
        />

        {/* Block modal */}
        <ModalShell
          open={blockOpen}
          title={`Block ${active?.name ?? "user"}?`}
          onClose={() => setBlockOpen(false)}
        >
          <div className="text-sm text-gray-600">
            Blocking {active?.name ?? "this user"} will prevent them from
            sending you messages. You can unblock them later from your settings.
          </div>

          <div className="mt-5 flex items-center justify-end gap-2">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setBlockOpen(false)}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () => setBlockOpen(false))
              }
              className="h-9 px-4 rounded-md flex items-center border bg-white hover:bg-gray-50 text-sm cursor-pointer select-none"
            >
              Cancel
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => console.log("Block user (static)")}
              onKeyDown={(e) =>
                handleKeyboardActivate(e, () =>
                  console.log("Block user (static)")
                )
              }
              className="h-9 px-4 rounded-md flex items-center bg-red-500 hover:bg-red-600 text-white text-sm cursor-pointer select-none"
            >
              Block User
            </div>
          </div>
        </ModalShell>

        {/* Report modal */}
        <ModalShell
          open={reportOpen}
          title={`Report ${active?.name ?? "user"}`}
          onClose={() => setReportOpen(false)}
        >
          <div className="text-xs text-gray-500">
            Help us understand what’s wrong. Your report will be reviewed by our
            team.
          </div>

          <div className="mt-4">
            <div className="text-xs font-medium text-gray-800 mb-2">
              Reason for reporting
            </div>

            <div className="space-y-2">
              {[
                "Spam or unwanted messages",
                "Harassment or bullying",
                "Inappropriate content",
                "Scam or fraud",
                "Other",
              ].map((r) => (
                <div key={r} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="report-reason"
                    value={r}
                    checked={reportReason === r}
                    onChange={() => setReportReason(r)}
                    className="accent-red-500"
                    aria-label={r}
                  />
                  <div className="text-sm text-gray-700">{r}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="text-xs font-medium text-gray-800 mb-2">
              Additional details{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </div>

            <textarea
              aria-label="Additional details"
              value={reportDetails}
              onChange={(e) => setReportDetails(e.target.value)}
              placeholder="Please provide any additional information that might help us..."
              className={[
                "w-full min-h-[90px] rounded-md border bg-gray-50 px-3 py-2 text-sm",
                "hover:border-gray-300",
                "focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400",
              ].join(" ")}
            />

            <div className="mt-5 flex items-center justify-end gap-2">
              <div
                role="button"
                tabIndex={0}
                onClick={() => setReportOpen(false)}
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () => setReportOpen(false))
                }
                className="h-9 px-4 flex items-center rounded-md border bg-white hover:bg-gray-50 text-sm cursor-pointer select-none"
              >
                Cancel
              </div>

              <div
                role="button"
                tabIndex={0}
                onClick={() =>
                  console.log("Submit report (static)", {
                    reportReason,
                    reportDetails,
                  })
                }
                onKeyDown={(e) =>
                  handleKeyboardActivate(e, () =>
                    console.log("Submit report (static)", {
                      reportReason,
                      reportDetails,
                    })
                  )
                }
                className="h-9 px-4 rounded-md flex items-center bg-red-500 hover:bg-red-600 text-white text-sm cursor-pointer select-none"
              >
                Submit Report
              </div>
            </div>
          </div>
        </ModalShell>
      </main>
      <ClientFooter />
    </>
  );
}
