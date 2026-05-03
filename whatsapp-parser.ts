import JSZip from "jszip";

export type MediaType = "image" | "voice" | "video" | "document" | null;

export interface ChatMessage {
  id: number;
  timestamp: Date | null;
  sender: string | null;
  text: string;
  mediaRef?: string;
  mediaType?: MediaType;
  isSystem: boolean;
}

export interface ParsedChat {
  messages: ChatMessage[];
  participants: string[];
  primarySender: string | null; // the "you" sender (right-aligned)
  totalMessages: number;
  dateRange: { from: Date | null; to: Date | null };
  zip: JSZip; // kept for lazy media extraction
}

// [DD/MM/YYYY, HH:MM:SS] Sender: message  OR  DD/MM/YYYY, HH:MM - Sender: message
const LINE_RE = /^\[?(\d{1,2})[/.](\d{1,2})[/.](\d{2,4}),?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\]?\s*[-–]?\s*(?:([^:]+?):\s*)?(.*)$/;
const ATTACHMENT_RE = /<\s*attached\s*:\s*([^>]+)>|‎?([\w\-. ]+\.(?:opus|ogg|m4a|mp3|wav|jpg|jpeg|png|gif|webp|mp4|mov|3gp|pdf|docx?|xlsx?|zip|txt))(?:\s*\(file attached\))?/i;

function detectMediaType(filename: string): MediaType {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
  if (["opus", "ogg", "m4a", "mp3", "wav", "aac"].includes(ext)) return "voice";
  if (["mp4", "mov", "3gp", "avi", "mkv"].includes(ext)) return "video";
  return "document";
}

export async function parseWhatsAppZip(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<ParsedChat> {
  onProgress?.(5);
  const zip = await JSZip.loadAsync(file);
  onProgress?.(25);

  // Find _chat.txt
  const chatFileEntry = Object.values(zip.files).find((f) => /(_chat|chat)\.txt$/i.test(f.name) && !f.dir);
  if (!chatFileEntry) throw new Error("Could not find _chat.txt in this zip. Is this a WhatsApp export?");

  const raw = await chatFileEntry.async("string");
  onProgress?.(60);

  const lines = raw.split(/\r?\n/);
  const messages: ChatMessage[] = [];
  let id = 0;

  for (const rawLine of lines) {
    const line = rawLine.replace(/\u200e/g, "").trim();
    if (!line) continue;
    const m = line.match(LINE_RE);
    if (m) {
      const [, dd, mm, yyyy, hh, mi, ss, sender, body] = m;
      const year = yyyy.length === 2 ? 2000 + parseInt(yyyy, 10) : parseInt(yyyy, 10);
      const ts = new Date(year, parseInt(mm, 10) - 1, parseInt(dd, 10), parseInt(hh, 10), parseInt(mi, 10), ss ? parseInt(ss, 10) : 0);
      const isSystem = !sender;
      let text = (body ?? "").trim();
      let mediaRef: string | undefined;
      let mediaType: MediaType = null;
      const att = text.match(ATTACHMENT_RE);
      if (att) {
        mediaRef = (att[1] ?? att[2] ?? "").trim();
        mediaType = detectMediaType(mediaRef);
        text = text.replace(att[0], "").trim();
      }
      messages.push({
        id: id++,
        timestamp: ts,
        sender: sender?.trim() || null,
        text,
        mediaRef,
        mediaType: mediaType ?? undefined,
        isSystem,
      });
    } else if (messages.length > 0) {
      // continuation of previous message
      messages[messages.length - 1].text += "\n" + line;
    }
  }

  const participants = Array.from(new Set(messages.map((m) => m.sender).filter((s): s is string => !!s)));
  const primarySender = participants[0] ?? null; // first sender = "you"

  const timestamps = messages.map((m) => m.timestamp).filter((t): t is Date => !!t);
  const dateRange = {
    from: timestamps.length ? timestamps.reduce((a, b) => (a < b ? a : b)) : null,
    to: timestamps.length ? timestamps.reduce((a, b) => (a > b ? a : b)) : null,
  };

  onProgress?.(100);

  return {
    messages,
    participants,
    primarySender,
    totalMessages: messages.length,
    dateRange,
    zip,
  };
}