"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import ConversationsSidebar, {
  Conversation,
  Message as SidebarMessage,
} from "@/app/components/styles/freelancer_styles/messages/ConversationsSidebar";
import ChatPanel from "@/app/components/styles/freelancer_styles/messages/ChatPanel";
import ws from "@/app/lib/ws";
import ModalShell from "@/app/components/styles/freelancer_styles/messages/ModalShell";
import ConfirmDeleteModal from "@/app/components/styles/freelancer_styles/messages/ConfirmDeleteModal";
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
  const [activeId, setActiveId] = useState<string>("");
  const [active, setActive] = useState<ConversationWithId | undefined>(
    undefined
  );
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [searchLeft, setSearchLeft] = useState("");
  const [chatText, setChatText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("Spam or unwanted messages");
  const [reportDetails, setReportDetails] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);


  // WebSocket connection for real-time messages
  useEffect(() => {
    const userId = user?.id || localStorage.getItem("userId");
    if (!userId) return;

    const token = localStorage.getItem("token");
    const safeUserId =
      typeof userId === "object" && userId !== null
        ? (userId as any).id || (userId as any)._id || JSON.stringify(userId)
        : String(userId);
    const wsUrl = `ws://localhost:8085/chat?userId=${safeUserId}`;

    console.log("Establishing WebSocket connection to:", wsUrl);

    try {
      const socket = new WebSocket(wsUrl);
      wsRef.current = socket;

      socket.onopen = () => {
        console.log("WebSocket connection established");
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log("Parsed message:", message);

          const myUserId = user?.id
            ? String(user.id)
            : localStorage.getItem("userId");
          // Always treat senderId/recipientId as string for comparison
          const senderId = String(message.senderId);
          const recipientId = String(message.recipientId);

          // The other user is the one who is NOT me
          const otherUserId = senderId === myUserId ? recipientId : senderId;
          // Always set otherUserName to client's name for freelancer chat

          setConversations((prev) => {
            return prev.map((conv) => {
              // Match conversation by otherUserId (string compare)
              if (String(conv.otherUserId) === otherUserId) {
                return {
                  ...conv,
                  preview: message.contents || "",
                  timeLabel: "Just now",
                  messages: [
                    ...conv.messages,
                    {
                      id: message.id || `msg-${Date.now()}`,
                      from: senderId === myUserId ? "me" : "them",
                      text: message.contents || "",
                      time: message.time || new Date().toISOString(),
                      messageType: message.messageType || "text",
                    },
                  ],
                };
              }
              return conv;
            });
          });

          setActive((prev) => {
            if (!prev || String(prev.otherUserId) !== otherUserId) return prev;
            return {
              ...prev,
              messages: [
                ...prev.messages,
                {
                  id: message.id || `msg-${Date.now()}`,
                  from: senderId === myUserId ? "me" : "them",
                  text: message.contents || "",
                  time: message.time || new Date().toISOString(),
                  messageType: message.messageType || "text",
                },
              ],
            };
          });
        } catch (e) {
          console.error("Error parsing WebSocket message:", e);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = (event) => {
        console.log("WebSocket connection closed:", event.code, event.reason);
      };
    } catch (e) {
      console.error("Failed to establish WebSocket connection:", e);
    }

    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        console.log("Closing WebSocket connection");
        wsRef.current.close();
      }
    };
  }, [user]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (active?.messages && active.messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [active?.messages]);

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

      const grouped: { [key: string]: ConversationWithId } = {};
      
      data.forEach((msg: any) => {
        const myUsername = user?.username || localStorage.getItem("username");
        const myUserId = user?.id ? String(user.id) : null;
        
        // Determine if current user is the sender
        const isSender = msg.senderName === myUsername || String(msg.senderId) === myUserId;
        
        // Extract the other user's ID
        const otherUserId = isSender
          ? typeof msg.recipientId === "object" && msg.recipientId !== null && "id" in msg.recipientId
            ? String(msg.recipientId.id)
            : String(msg.recipientId)
          : typeof msg.senderId === "object" && msg.senderId !== null && "id" in msg.senderId
          ? String(msg.senderId.id)
          : String(msg.senderId);

        if (myUserId && otherUserId === myUserId) return;

        // For FREELANCER page: otherUserName should be the CLIENT's name
        // If I'm the sender, the other person is the recipient (client)
        // If I'm the recipient, the other person is the sender (client)
        const otherUserName = isSender ? msg.recipientName : msg.senderName;

        // Clean up email domain from names
        const cleanName = otherUserName ? otherUserName.replace(/@gmail\.com$/i, "") : "";

        if (!grouped[otherUserId]) {
          grouped[otherUserId] = {
            ...msg,
            id: otherUserId,
            name: cleanName,
            otherUserId,
            otherUserName: cleanName,
            roleTag: "Client", // Freelancer always sees "Client"
            timeLabel: "",
            preview: msg.contents || "",
            online: false,
            projectLabel: "",
            muted: false,
            messages: [],
          };
        }
        
        grouped[otherUserId].messages.push({
          id: msg.id,
          from: isSender ? "me" : "them",
          text: msg.contents || "",
          time: msg.time,
          messageType: msg.messageType,
        });
      });

      const convArr = Object.values(grouped);
      setConversations(convArr);
      
      if (convArr.length > 0 && !activeId) {
        const lastActiveId = localStorage.getItem("lastActiveChatId");
        const found = lastActiveId && convArr.find((c) => c.otherUserId === lastActiveId);
        if (found) {
          setActiveId(lastActiveId);
        } else {
          setActiveId(String(convArr[0].otherUserId));
        }
      }
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

    let safeActiveId = activeId;
    if (typeof activeId === "object" && activeId !== null) {
      safeActiveId =
        (activeId as any).id ||
        (activeId as any)._id ||
        JSON.stringify(activeId);
    }
    safeActiveId = String(safeActiveId);

    if (typeof safeActiveId !== "string" && typeof safeActiveId !== "number") {
      console.warn("[WARN] activeId is not a string or number:", activeId);
      return;
    }

    setLoadingMessages(true);
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
        setActive((prev) => {
          if (!prev) return undefined;
          // Sort messages by time ascending (oldest to newest)
          const sorted = Array.isArray(data)
            ? data.slice().sort((a, b) => {
                if (a.time && b.time) {
                  return (
                    new Date(a.time).getTime() - new Date(b.time).getTime()
                  );
                }
                return 0;
              })
            : [];
          return {
            ...prev,
            messages: sorted.map((msg: any) => ({
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

    const conv = conversations.find((c) => c.otherUserId === activeId);
    setActive(conv);
    fetchMessages();
  }, [activeId, conversations]);

  // Close dropdown on click outside
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
    setActiveId(String(id));
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
}

// This appears to be a separate send message function
  function sendMessage() {
    const text = chatText.trim();
    if (!text || !active || !user) return;

    // Check if WebSocket is connected
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error("[WebSocket] Not connected");
      alert("Connection lost. Please refresh the page.");
      return;
    }

    const myUserId =
      typeof user.id === "object" && user.id !== null
        ? (user.id as any).id || (user.id as any)._id || JSON.stringify(user.id)
        : String(user.id);
    const recipientId =
      typeof active.otherUserId === "object" && active.otherUserId !== null
        ? (active.otherUserId as any).id ||
          (active.otherUserId as any)._id ||
          JSON.stringify(active.otherUserId)
        : String(active.otherUserId);

    // Optimistically update UI
    const tempId = `me-${Date.now()}`;
    const newMessage = {
      id: tempId,
      from: "me" as const,
      text,
      time: "Just now",
      messageType: "text",
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.otherUserId === active.otherUserId
          ? {
              ...c,
              messages: [...c.messages, newMessage],
              preview: text,
              timeLabel: "Just now",
            }
          : c
      )
    );

    setActive((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        messages: [...prev.messages, newMessage],
      };
    });

    setChatText("");

    // Send via WebSocket
    try {
      const messagePayload = {
        type: "MESSAGE",
        payload: {
          recipientId,
          recipientName: active.otherUserName,
          senderId: myUserId,
          senderName: user.username,
          contents: text,
          messageType: "text",
          gigId: (active as any).gigId || null,
        },
      };
      console.log("[WebSocket] Sending message:", messagePayload);
      wsRef.current.send(JSON.stringify(messagePayload));
    } catch (error) {
      console.error("[WebSocket] Failed to send message:", error);
      alert("Failed to send message. Please try again.");
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
              onClick={() => router.back()}
              onKeyDown={(e) => handleKeyboardActivate(e, () => router.back())}
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
              visible={showChat || true}
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
              messagesEndRef={messagesEndRef} 
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
            Help us understand what's wrong. Your report will be reviewed by our
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
          </div>

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
        </ModalShell>
      </main>
      <ClientFooter />
    </>
  );
}
