"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import ConversationsSidebar, {
  Conversation,
  Message,
} from "@/app/components/styles/client_styles/messages/ConversationsSidebar";
import ChatPanel from "@/app/components/styles/client_styles/messages/ChatPanel";
import ws from "@/app/lib/ws";
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
  const { user } = useAuth();
  const router = useRouter();

  // Store both userId and username for each conversation
  type ConversationWithId = Conversation & {
    otherUserId: string;
    otherUserName: string;
  };
  const [conversations, setConversations] = useState<ConversationWithId[]>([]);
  const [activeId, setActiveId] = useState<string>(""); // this will be userId
  const [active, setActive] = useState<ConversationWithId | undefined>(
    undefined
  );
  // Removed unused loadingConversations and loadingMessages

  // Fetch conversations from backend
  useEffect(() => {
    const fetchConversations = async () => {
      // Removed unused loadingConversations
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8085/chat/conversations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch conversations");
        const data = await res.json();
        // Group by other userId, store both userId and username
        const grouped: { [key: string]: ConversationWithId } = {};
        data.forEach((msg: Message) => {
          // Prefer username from user object, fallback to localStorage
          const myUsername = user?.username || localStorage.getItem("username");
          const myUserId = user?.id ? String(user.id) : null;
          const isSender = msg.senderName === myUsername;
          const rawRecipientId = msg.recipientId;
          const rawSenderId = msg.senderId;
          const otherUserId = isSender
            ? typeof rawRecipientId === "object" &&
              rawRecipientId !== null &&
              "id" in rawRecipientId
              ? String((rawRecipientId as { id: string | number }).id)
              : String(rawRecipientId)
            : typeof rawSenderId === "object" &&
              rawSenderId !== null &&
              "id" in rawSenderId
            ? String((rawSenderId as { id: string | number }).id)
            : String(rawSenderId);
          if (myUserId && otherUserId === myUserId) return;
          // Always show the freelancer's username as the other user in client chat
          let otherUserName = isSender
            ? msg.recipientRole === "FREELANCER"
              ? msg.recipientUsername ||
                msg.recipientName ||
                msg.recipientEmail ||
                ""
              : msg.senderUsername || msg.senderName || msg.senderEmail || ""
            : msg.senderRole === "FREELANCER"
            ? msg.senderUsername || msg.senderName || msg.senderEmail || ""
            : msg.recipientUsername ||
              msg.recipientName ||
              msg.recipientEmail ||
              "";
          if (
            typeof otherUserName === "string" &&
            otherUserName.includes("@gmail.com")
          ) {
            otherUserName = otherUserName.replace(/@gmail\.com$/i, "");
          }
          if (!grouped[otherUserId]) {
            grouped[otherUserId] = {
              ...msg,
              id: otherUserId,
              name: otherUserName,
              otherUserId,
              otherUserName,
              roleTag: "Freelancer",
              timeLabel: "",
              preview: msg.contents ?? msg.text ?? "",
              online: false,
              projectLabel: "",
              muted: false,
              messages: [],
            };
          }
          grouped[otherUserId].messages.push({
            id: msg.id,
            from: isSender ? "me" : "them",
            text: msg.contents ?? msg.text ?? "",
            time: msg.time,
            messageType: msg.messageType,
            gigId: msg.gigId || null,
            senderName: msg.senderName,
            recipientName: msg.recipientName,
            senderId: msg.senderId,
            recipientId: msg.recipientId,
          });
        });
        const convArr = Object.values(grouped);
        // Debug log to inspect what otherUserId is
        if (convArr.length > 0) {
          console.log(
            "DEBUG: convArr[0].otherUserId =",
            convArr[0].otherUserId,
            typeof convArr[0].otherUserId
          );
        }
        setConversations(convArr);
        if (convArr.length > 0 && !activeId) {
          // Try to restore last selected chat from localStorage
          const lastActiveId = localStorage.getItem("lastActiveChatId");
          const found =
            lastActiveId && convArr.find((c) => c.otherUserId === lastActiveId);
          if (found) {
            setActiveId(lastActiveId);
          } else {
            setActiveId(String(convArr[0].otherUserId));
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        // Removed unused loadingConversations
      }
    };
    fetchConversations();
    // eslint-disable-next-line
  }, []);

  // Fetch messages for active conversation
  useEffect(() => {
    if (!activeId) return;
    const safeActiveId = String(activeId);
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:8085/chat/messages?otherUserId=${encodeURIComponent(
            safeActiveId
          )}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        const messagesArr: Message[] = Array.isArray(data)
          ? data
          : data
          ? [data]
          : [];
        setActive((prev) => {
          if (!prev) return undefined;
          const mappedMessages =
            messagesArr.length > 0
              ? messagesArr.map((msg) => ({
                  id: msg.id,
                  from: (msg.senderName === localStorage.getItem("username")
                    ? "me"
                    : "them") as "me" | "them",
                  text: msg.contents ?? msg.text ?? "",
                  time: msg.time,
                  messageType: msg.messageType,
                  gigId: msg.gigId || null,
                }))
              : prev.messages || [];
          return {
            ...prev,
            messages: mappedMessages,
          };
        });
      } catch (e) {
        console.error(e);
      } finally {
        // Removed unused loadingMessages
      }
    };
    const conv = conversations.find((c) => c.otherUserId === activeId);
    setActive(conv);
    fetchMessages();
    // Setup WebSocket listener for real-time updates
    if (user?.id) {
      ws.connect(user.id, (event: { type: string; payload: Message }) => {
        if (event.type === "MESSAGE") {
          let msg = event.payload;
          // If payload is stringified, parse it
          if (typeof msg === "string") {
            try {
              msg = JSON.parse(msg);
            } catch {}
          }
          // Only update if message belongs to current active conversation
          const myUsername = localStorage.getItem("username");
          const isSender = msg.senderName === myUsername;
          const otherUserId = isSender
            ? typeof msg.recipientId === "object" &&
              msg.recipientId !== null &&
              "id" in msg.recipientId
              ? String(msg.recipientId.id)
              : String(msg.recipientId)
            : typeof msg.senderId === "object" &&
              msg.senderId !== null &&
              "id" in msg.senderId
            ? String(msg.senderId.id)
            : String(msg.senderId);
          if (String(activeId) === String(otherUserId)) {
            setActive((prev) => {
              if (!prev) return undefined;
              return {
                ...prev,
                messages: [
                  ...prev.messages,
                  {
                    id: msg.id || Math.random().toString(),
                    from: isSender ? "me" : "them",
                    text: msg.contents,
                    time: msg.time || new Date().toLocaleTimeString(),
                    messageType: msg.messageType || undefined,
                  },
                ],
              };
            });
          }
        }
      });
      // Disconnect on unmount
      return () => ws.disconnect();
    }
    // (removed unused eslint-disable-next-line)
  }, [activeId, conversations, user?.id]);

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
      if (
        menuRef.current &&
        e.target &&
        !menuRef.current.contains(e.target as Node)
      ) {
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
    setActiveId(String(id)); // id is otherUserId
    localStorage.setItem("lastActiveChatId", String(id));
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
        setActiveId(next ? String(next.otherUserId) : "");
        setMobileView("list");
        return curr;
      });
    }, 0);
  }

  function sendMessage() {
    const text = chatText.trim();
    if (!text || !active || !user) return;

    // Optimistically update UI
    setConversations((prev) =>
      prev.map((c) =>
        c.otherUserId === active.otherUserId
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

    // Send via WebSocket, use userId
    const recipientIdStr = String(active.otherUserId);
    const wsPayload = {
      type: "MESSAGE",
      payload: JSON.stringify({
        recipientId: recipientIdStr,
        recipientName: recipientIdStr,
        senderId: String(user.id),
        senderName: user.username,
        contents: text,
        messageType: "text",
        gigId: active?.messages?.[0]?.gigId || null,
      }),
    };
    console.log("[DEBUG] ws.send payload:", wsPayload);
    ws.send(wsPayload);
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
              user={user}
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
