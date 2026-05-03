import { MessageSquare, Mic, Film, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/lib/auth-context";

export type MediaMode = "text" | "voice" | "full";

const MODES: Array<{
  id: MediaMode;
  icon: typeof MessageSquare;
  emoji: string;
  title: string;
  desc: string;
  requires: Plan;
}> = [
  { id: "text",  icon: MessageSquare, emoji: "💬", title: "Text Only",       desc: "Render messages, emojis, timestamps and file names. No media is loaded — fastest, perfect for huge chats.", requires: "starter" },
  { id: "voice", icon: Mic,           emoji: "🎙️", title: "Text & Voice Notes", desc: "Render all messages plus embedded audio players for voice notes. Images and videos remain placeholders.", requires: "plus" },
  { id: "full",  icon: Film,          emoji: "🎬", title: "Full Media",       desc: "Messages, voice players, inline images, and video thumbnails with lightbox playback.", requires: "pro" },
];

const PLAN_RANK: Record<Plan, number> = { starter: 0, plus: 1, pro: 2 };

interface Props {
  plan: Plan;
  selected: MediaMode | null;
  onSelect: (m: MediaMode) => void;
  onContinue: () => void;
  messageCount: number;
}

export function MediaModeSelector({ plan, selected, onSelect, onContinue, messageCount }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-xl font-bold">Choose how to render media</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {messageCount.toLocaleString()} messages parsed. Pick a mode — you can change it later.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {MODES.map((m) => {
          const locked = PLAN_RANK[plan] < PLAN_RANK[m.requires];
          const isSelected = selected === m.id;
          return (
            <button
              key={m.id}
              type="button"
              disabled={locked}
              onClick={() => onSelect(m.id)}
              className={`relative text-left rounded-xl border p-5 transition ${
                locked
                  ? "opacity-60 cursor-not-allowed border-border bg-muted/30"
                  : isSelected
                  ? "border-2 shadow-md"
                  : "border-border hover:border-foreground/30"
              }`}
              style={isSelected ? { borderColor: "var(--wa-green)" } : undefined}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 grid h-6 w-6 place-items-center rounded-full" style={{ background: "var(--wa-green)" }}>
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
              {locked && (
                <div className="absolute top-3 right-3">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
              <div className="text-3xl">{m.emoji}</div>
              <div className="mt-3 font-semibold">{m.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
              <div className="mt-3 text-xs">
                {locked ? (
                  <span className="font-medium" style={{ color: "var(--wa-green-dark)" }}>
                    🔒 Upgrade to {m.requires === "plus" ? "Plus" : "Pro"}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    Available on {m.requires === "starter" ? "all plans" : m.requires === "plus" ? "Plus & Pro" : "Pro"}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={onContinue}
          disabled={!selected}
          size="lg"
          style={selected ? { background: "var(--wa-green)", color: "white" } : undefined}
        >
          Render Chat →
        </Button>
      </div>
    </div>
  );
}