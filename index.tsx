import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Upload, Sliders, Eye, Lock, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ChatReplay — Beautiful WhatsApp Chat Viewer & Exporter" },
      { name: "description", content: "Render your WhatsApp .zip exports as a pixel-accurate chat. Privacy-first — your files never leave your browser." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-30" style={{ background: "radial-gradient(60% 60% at 50% 0%, var(--wa-green) 0%, transparent 70%)" }} />
          <div className="mx-auto max-w-5xl px-4 py-24 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium">
              <Shield className="h-3.5 w-3.5" style={{ color: "var(--wa-green)" }} />
              100% client-side. Your chats never touch a server.
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
              Relive your WhatsApp chats — <span style={{ color: "var(--wa-green)" }}>beautifully.</span>
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">
              Drop in your WhatsApp <code className="rounded bg-muted px-1.5 py-0.5 text-sm">.zip</code> export and ChatReplay renders a pixel-perfect chat — pick how much media to load, search, and export to PDF.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" style={{ background: "var(--wa-green)", color: "white" }}>
                <Link to="/signup">Start Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/pricing">See Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Shield, title: "Privacy-first", desc: "All parsing happens in your browser. No uploads. No tracking your conversations." },
              { icon: Sparkles, title: "Pixel-perfect WhatsApp UI", desc: "Bubbles, tails, ticks, dark mode — indistinguishable from the real thing." },
              { icon: Sliders, title: "Flexible media modes", desc: "Text only, voice notes, or full media — choose what to load and stay fast." },
              { icon: Eye, title: "Search & filter", desc: "Jump between matches, hide system messages, merge consecutive bubbles." },
              { icon: Lock, title: "Privacy blur", desc: "Hide names and phone numbers before exporting or sharing screenshots." },
              { icon: Upload, title: "PDF & PNG export", desc: "Save full chats as PDF or one long PNG — perfect for archiving memories." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-6">
                <f.icon className="h-6 w-6 mb-3" style={{ color: "var(--wa-green)" }} />
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-muted/30 border-y border-border">
          <div className="mx-auto max-w-5xl px-4 py-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center">How it works</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { n: "1", title: "Upload your zip", desc: "Export a chat from WhatsApp and drop the .zip into ChatReplay." },
                { n: "2", title: "Choose a media mode", desc: "Text only, with voice notes, or full media. Lighter modes are faster." },
                { n: "3", title: "View & export", desc: "Browse the rendered chat or export to PDF with one click." },
              ].map((s) => (
                <div key={s.n} className="rounded-xl border border-border bg-card p-6 text-center">
                  <div className="mx-auto grid h-10 w-10 place-items-center rounded-full font-bold text-white" style={{ background: "var(--wa-green)" }}>{s.n}</div>
                  <h3 className="mt-4 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="mx-auto max-w-5xl px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Simple pricing</h2>
          <p className="mt-4 text-muted-foreground">Free forever for casual use. Upgrade for media, export, and unlimited messages.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3 text-left">
            {[
              { name: "Starter", price: "Free", desc: "150 messages, text only", features: ["Text Only mode", "Light & dark mode", "150 message limit"] },
              { name: "Plus", price: "$3.99/mo", desc: "Voice notes & PDF export", features: ["Voice notes", "5,000 messages", "PDF export", "Privacy blur"], featured: true },
              { name: "Pro", price: "$7.99/mo", desc: "Full media & unlimited", features: ["Video thumbnails", "Unlimited messages", "PDF + PNG + Print"] },
            ].map((p) => (
              <div key={p.name} className={`rounded-xl border p-6 ${p.featured ? "border-2" : "border-border"} bg-card`} style={p.featured ? { borderColor: "var(--wa-green)" } : undefined}>
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="mt-2 text-3xl font-bold">{p.price}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="h-4 w-4" style={{ color: "var(--wa-green)" }} /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Button asChild size="lg" className="mt-8" variant="outline"><Link to="/pricing">Compare all plans →</Link></Button>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
