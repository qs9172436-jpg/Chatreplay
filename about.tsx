import { createFileRoute } from "@tanstack/react-router";
import { Shield, Heart, Zap } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ChatReplay" },
      { name: "description", content: "ChatReplay is a privacy-first tool to help people relive, archive, and share their WhatsApp conversations beautifully." },
      { property: "og:title", content: "About ChatReplay" },
      { property: "og:description", content: "Privacy-first WhatsApp chat viewer & exporter. Meet the team and the mission." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://chatreplay.site/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold">About ChatReplay</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          ChatReplay is a privacy-first tool built to help people relive, archive, and share their WhatsApp conversations beautifully.
        </p>

        <h2 className="mt-12 text-2xl font-bold">Our mission</h2>
        <p className="mt-4 text-muted-foreground">
          Conversations matter. They hold birthdays, jokes, plans, and goodbyes. ChatReplay exists so that every exported chat
          looks as alive as it did the day it happened — without giving up your privacy.
        </p>

        <h2 className="mt-12 text-2xl font-bold">What we value</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { icon: Shield, t: "Privacy", d: "Your chats never leave your browser. We can't read them — and never will." },
            { icon: Heart, t: "Simplicity", d: "Drop a zip. See your chat. That's it." },
            { icon: Zap, t: "Accuracy", d: "Pixel-perfect WhatsApp visual fidelity, in light and dark mode." },
          ].map((v) => (
            <div key={v.t} className="rounded-xl border border-border bg-card p-6">
              <v.icon className="h-6 w-6 mb-3" style={{ color: "var(--wa-green)" }} />
              <h3 className="font-semibold">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold">Team</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {["Avery", "Jordan", "Sam"].map((n) => (
            <div key={n} className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="mx-auto h-16 w-16 rounded-full" style={{ background: "var(--wa-green)" }} />
              <p className="mt-4 font-semibold">{n}</p>
              <p className="text-sm text-muted-foreground">Building ChatReplay</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold">Contact</h2>
        <p className="mt-4 text-muted-foreground">
          Questions, feedback, or partnership ideas? Email us at{" "}
          <a href="mailto:hello@chatreplay.site" className="underline">hello@chatreplay.site</a>.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}