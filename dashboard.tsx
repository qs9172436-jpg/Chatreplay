import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Upload, Loader2, X, ArrowLeft, Crown } from "lucide-react";
import { toast } from "sonner";
import { useAuth, type Plan } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SiteHeader } from "@/components/site-header";
import { parseWhatsAppZip, type ParsedChat } from "@/lib/whatsapp-parser";
import { MediaModeSelector, type MediaMode } from "@/components/media-mode-selector";
import { ChatViewer } from "@/components/chat-viewer";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — ChatReplay" }] }),
  component: DashboardPage,
});

const PLAN_LIMITS: Record<Plan, number> = { starter: 150, plus: 5000, pro: Number.POSITIVE_INFINITY };
const PLAN_LABELS: Record<Plan, string> = { starter: "Starter", plus: "Plus", pro: "Pro" };

type Stage = "upload" | "parsing" | "select-mode" | "view";

function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  const [stage, setStage] = useState<Stage>("upload");
  const [progress, setProgress] = useState(0);
  const [chat, setChat] = useState<ParsedChat | null>(null);
  const [mode, setMode] = useState<MediaMode | null>(null);
  const [activeMode, setActiveMode] = useState<MediaMode>("text");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  const plan: Plan = profile?.plan ?? "starter";

  async function handleFile(file: File) {
    if (!file.name.toLowerCase().endsWith(".zip")) {
      toast.error("Please upload a .zip file exported from WhatsApp.");
      return;
    }
    setStage("parsing");
    setProgress(0);
    try {
      const result = await parseWhatsAppZip(file, setProgress);
      if (result.messages.length === 0) {
        toast.error("No messages found in this export.");
        setStage("upload");
        return;
      }
      setChat(result);
      setMode(null);
      setStage("select-mode");
      toast.success(`Parsed ${result.messages.length.toLocaleString()} messages`);
    } catch (e: any) {
      toast.error(e?.message || "Failed to parse this zip.");
      setStage("upload");
    }
  }

  function reset() {
    setChat(null);
    setMode(null);
    setStage("upload");
    setProgress(0);
  }

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">Your Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome{profile?.full_name ? `, ${profile.full_name}` : ""} · Logged in as {user?.email}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-sm font-medium">
            <Crown className="h-3.5 w-3.5" style={{ color: "var(--wa-green)" }} />
            {PLAN_LABELS[plan]} plan
          </span>
        </div>

        {plan === "starter" && (
          <div className="mt-4 rounded-xl border border-border bg-card p-4 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="font-semibold">You're on Starter</div>
              <div className="text-sm text-muted-foreground">Text Only · 150 messages · Watermarked exports off</div>
            </div>
            <Button asChild variant="outline"><Link to="/pricing">Upgrade →</Link></Button>
          </div>
        )}

        <div className="mt-8 space-y-6">
          {stage === "upload" && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const f = e.dataTransfer.files?.[0];
                if (f) handleFile(f);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition ${dragOver ? "bg-muted/50" : "bg-card hover:bg-muted/30"}`}
              style={dragOver ? { borderColor: "var(--wa-green)" } : undefined}
            >
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full" style={{ background: "var(--wa-green)" }}>
                <Upload className="h-6 w-6 text-white" />
              </div>
              <p className="mt-4 font-semibold">Drop your WhatsApp .zip here</p>
              <p className="mt-1 text-sm text-muted-foreground">or click to browse · processed entirely in your browser</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".zip,application/zip"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>
          )}

          {stage === "parsing" && (
            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <Loader2 className="mx-auto h-6 w-6 animate-spin" style={{ color: "var(--wa-green)" }} />
              <p className="mt-3 font-semibold">Parsing your chat…</p>
              <p className="text-sm text-muted-foreground">Reading messages and indexing media.</p>
              <div className="mx-auto mt-4 max-w-sm">
                <Progress value={progress} />
              </div>
            </div>
          )}

          {stage === "select-mode" && chat && (
            <>
              <button onClick={reset} className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-foreground">
                <ArrowLeft className="h-3.5 w-3.5" /> Upload a different chat
              </button>
              <MediaModeSelector
                plan={plan}
                selected={mode}
                onSelect={setMode}
                messageCount={chat.messages.length}
                onContinue={() => {
                  if (!mode) return;
                  setActiveMode(mode);
                  setStage("view");
                }}
              />
            </>
          )}

          {stage === "view" && chat && (
            <>
              <div className="flex items-center gap-3 flex-wrap">
                <Button onClick={reset} variant="outline" size="sm">
                  <X className="h-4 w-4" /> Close chat
                </Button>
                <Button onClick={() => setStage("select-mode")} variant="ghost" size="sm">
                  Change mode
                </Button>
                <span className="text-xs text-muted-foreground">
                  Mode: <strong className="text-foreground">{activeMode === "text" ? "Text Only" : activeMode === "voice" ? "Voice Notes" : "Full Media"}</strong>
                </span>
              </div>
              <ChatViewer
                chat={chat}
                mode={activeMode}
                messageLimit={PLAN_LIMITS[plan]}
                showWatermark={plan === "starter"}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}