import { useMemo, useState } from "react";
import { Moon, Sun, Image as ImageIcon, Mic, Film, FileText } from "lucide-react";
import type { ParsedChat, ChatMessage } from "@/lib/whatsapp-parser";
import type { MediaMode } from "@/components/media-mode-selector";

const COLORS = ["#E91E63", "#9C27B0", "#3F51B5", "#03A9F4", "#009688", "#FF9800", "#795548", "#607D8B"];
function colorFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return COLORS[h % COLORS.length];
}
function initials(name: string) {
  return name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}
function fmtTime(d: Date | null) {
  if (!d) return "";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}
function fmtDate(d: Date) {
  return d.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

interface Props {
  chat: ParsedChat;
  mode: MediaMode;
  messageLimit: number; // Starter = 150
  showWatermark: boolean;
}

export function ChatViewer({ chat, mode, messageLimit, showWatermark }: Props) {
  const [dark, setDark] = useState(false);

  const visible = useMemo(() => chat.messages.slice(0, messageLimit), [chat.messages, messageLimit]);
  const truncated = chat.messages.length > messageLimit;

  const groups: Array<{ date: Date; items: ChatMessage[] }> = [];
  for (const m of visible) {
    if (!m.timestamp) continue;
    const last = groups[groups.length - 1];
    if (!last || !sameDay(last.date, m.timestamp)) groups.push({ date: m.timestamp, items: [m] });
    else last.items.push(m);
  }

  const bgClass = dark ? "wa-chat-bg-dark" : "wa-chat-bg-light";

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div>
          <div className="font-semibold">{chat.participants.slice(0, 3).join(", ")}{chat.participants.length > 3 ? "…" : ""}</div>
          <div className="text-xs text-muted-foreground">
            {chat.totalMessages.toLocaleString()} messages
            {chat.dateRange.from && chat.dateRange.to && (
              <> · {chat.dateRange.from.toLocaleDateString()} – {chat.dateRange.to.toLocaleDateString()}</>
            )}
          </div>
        </div>
        <button
          onClick={() => setDark((d) => !d)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>

      {/* Chat body */}
      <div className={`${bgClass} relative max-h-[70vh] overflow-y-auto px-3 py-4`} style={{ fontFamily: "-apple-system, 'Helvetica Neue', Arial, sans-serif" }}>
        {showWatermark && (
          <div className="sticky top-0 z-10 mb-3 mx-auto w-fit rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
            Upgrade to export — ChatReplay
          </div>
        )}
        {groups.map((g, i) => (
          <div key={i}>
            <DateSeparator date={g.date} dark={dark} />
            {g.items.map((m) => (
              <Bubble key={m.id} m={m} primary={chat.primarySender} dark={dark} mode={mode} />
            ))}
          </div>
        ))}

        {truncated && (
          <div className="mt-6 mx-auto max-w-md rounded-xl border-2 border-dashed border-border bg-card p-4 text-center text-sm">
            <p className="font-semibold">You've hit the Starter limit ({messageLimit} messages).</p>
            <p className="mt-1 text-muted-foreground">
              {(chat.totalMessages - messageLimit).toLocaleString()} more messages are waiting.
              Upgrade to Plus or Pro to see them all.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function DateSeparator({ date, dark }: { date: Date; dark: boolean }) {
  return (
    <div className="my-3 flex justify-center">
      <span
        className="rounded-md px-3 py-1 text-xs font-medium shadow-sm"
        style={{
          background: dark ? "oklch(0.22 0.02 240)" : "oklch(0.95 0.01 110)",
          color: dark ? "oklch(0.85 0.01 240)" : "oklch(0.4 0.02 240)",
        }}
      >
        📅 {fmtDate(date)}
      </span>
    </div>
  );
}

function Bubble({ m, primary, dark, mode }: { m: ChatMessage; primary: string | null; dark: boolean; mode: MediaMode }) {
  if (m.isSystem) {
    return (
      <div className="my-2 flex justify-center">
        <span className="rounded-md px-3 py-1 text-xs italic" style={{ background: dark ? "oklch(0.22 0.02 240 / 0.7)" : "oklch(1 0 0 / 0.6)", color: dark ? "oklch(0.75 0.02 240)" : "oklch(0.45 0.02 240)" }}>
          {m.text}
        </span>
      </div>
    );
  }

  const isMine = m.sender === primary;
  const align = isMine ? "justify-end" : "justify-start";
  const bg = isMine
    ? dark ? "var(--wa-bubble-sent-dark)" : "var(--wa-bubble-sent-light)"
    : dark ? "var(--wa-bubble-received-dark)" : "var(--wa-bubble-received-light)";
  const text = dark ? "var(--wa-text-dark)" : "oklch(0.18 0.02 240)";

  return (
    <div className={`my-1 flex ${align} gap-2`}>
      {!isMine && m.sender && (
        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white self-end" style={{ background: colorFor(m.sender) }}>
          {initials(m.sender)}
        </div>
      )}
      <div
        className="relative max-w-[75%] rounded-lg px-2.5 py-1.5 shadow-sm"
        style={{ background: bg, color: text, borderRadius: "7.5px" }}
      >
        {!isMine && m.sender && (
          <div className="text-xs font-semibold mb-0.5" style={{ color: colorFor(m.sender) }}>
            {m.sender}
          </div>
        )}
        {m.mediaRef && <MediaPlaceholder ref_={m.mediaRef} type={m.mediaType} mode={mode} dark={dark} />}
        {m.text && <div className="whitespace-pre-wrap break-words text-[14.5px] leading-snug">{m.text}</div>}
        <div className="mt-0.5 flex items-center justify-end gap-1 text-[10px] opacity-60">
          <span>{fmtTime(m.timestamp)}</span>
          {isMine && <span style={{ color: "#53BDEB" }}>✓✓</span>}
        </div>
      </div>
    </div>
  );
}

function MediaPlaceholder({ ref_, type, mode, dark }: { ref_: string; type?: any; mode: MediaMode; dark: boolean }) {
  const Icon = type === "image" ? ImageIcon : type === "voice" ? Mic : type === "video" ? Film : FileText;
  const label = type === "image" ? "Photo" : type === "voice" ? "Voice note" : type === "video" ? "Video" : "Document";
  // In Phase 1, all modes show placeholders. Voice and full will swap to real media later.
  void mode;
  return (
    <div className="mb-1 flex items-center gap-2 rounded-md p-2" style={{ background: dark ? "oklch(0.2 0.02 240 / 0.6)" : "oklch(0.95 0.01 110 / 0.7)" }}>
      <Icon className="h-4 w-4 shrink-0 opacity-70" />
      <div className="min-w-0">
        <div className="text-xs font-medium">{label}</div>
        <div className="truncate text-[11px] opacity-70">{ref_}</div>
      </div>
    </div>
  );
}