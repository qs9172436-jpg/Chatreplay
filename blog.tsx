import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — WhatsApp Export Tips & Guides | ChatReplay" },
      { name: "description", content: "Guides on exporting, archiving, and viewing WhatsApp chats beautifully. Privacy-first tutorials from the ChatReplay team." },
      { property: "og:title", content: "ChatReplay Blog — WhatsApp Export Tips & Guides" },
      { property: "og:description", content: "Guides on exporting, archiving, and viewing WhatsApp chats beautifully." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { rel: "canonical", href: "https://chatreplay.site/blog" } as any,
    ],
    links: [{ rel: "canonical", href: "https://chatreplay.site/blog" }],
  }),
  component: BlogIndex,
});

const posts = [
  {
    slug: "how-to-export-whatsapp-chat",
    title: "How to Export a WhatsApp Chat (2026 Guide for iPhone & Android)",
    excerpt: "Step-by-step guide to exporting WhatsApp conversations as a .zip file on iPhone and Android — plus how to view them beautifully with ChatReplay.",
    date: "2026-05-01",
    readTime: "7 min read",
  },
  {
    slug: "save-whatsapp-chat-as-pdf",
    title: "How to Save a WhatsApp Chat as PDF (Without Losing Formatting)",
    excerpt: "The cleanest way to convert a WhatsApp chat export into a beautiful, shareable PDF — with bubbles, voice notes, and dates intact.",
    date: "2026-05-02",
    readTime: "6 min read",
  },
  {
    slug: "whatsapp-chat-backup-vs-export",
    title: "WhatsApp Backup vs Export: Which One Actually Saves Your Memories?",
    excerpt: "iCloud and Google Drive backups protect your account — but only chat exports give you a real, portable copy you own forever.",
    date: "2026-05-03",
    readTime: "5 min read",
  },
];

function BlogIndex() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold">The ChatReplay Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tutorials, tips, and stories about preserving the chats that matter.
        </p>
        <div className="mt-12 space-y-6">
          {posts.map((p) => (
            <article key={p.slug} className="rounded-xl border border-border bg-card p-6 hover:border-foreground/20 transition">
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="block">
                <h2 className="text-2xl font-bold">{p.title}</h2>
                <p className="mt-2 text-muted-foreground">{p.excerpt}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
                  {" · "}{p.readTime}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}