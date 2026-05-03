import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { Button } from "@/components/ui/button";

type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  author: string;
  readTime: string;
  keywords: string[];
};

const POSTS: Record<string, Post> = {
  "how-to-export-whatsapp-chat": {
    slug: "how-to-export-whatsapp-chat",
    title: "How to Export a WhatsApp Chat (2026 Guide for iPhone & Android)",
    description:
      "Step-by-step guide to exporting WhatsApp conversations as a .zip on iPhone and Android, what's inside the export, and how to view them beautifully with ChatReplay.",
    date: "2026-05-01",
    updated: "2026-05-01",
    author: "ChatReplay Team",
    readTime: "7 min read",
    keywords: [
      "export whatsapp chat",
      "whatsapp chat export iphone",
      "whatsapp chat export android",
      "whatsapp chat viewer",
      "whatsapp zip file",
      "save whatsapp conversation",
      "archive whatsapp chat",
    ],
  },
  "save-whatsapp-chat-as-pdf": {
    slug: "save-whatsapp-chat-as-pdf",
    title: "How to Save a WhatsApp Chat as PDF (Without Losing Formatting)",
    description:
      "Convert your WhatsApp chat export into a beautiful, shareable PDF that keeps bubbles, voice notes, dates, and group sender colors intact.",
    date: "2026-05-02",
    updated: "2026-05-02",
    author: "ChatReplay Team",
    readTime: "6 min read",
    keywords: [
      "save whatsapp chat as pdf",
      "whatsapp chat to pdf",
      "convert whatsapp export to pdf",
      "print whatsapp conversation",
      "whatsapp chat archive pdf",
    ],
  },
  "whatsapp-chat-backup-vs-export": {
    slug: "whatsapp-chat-backup-vs-export",
    title: "WhatsApp Backup vs Export: Which One Actually Saves Your Memories?",
    description:
      "iCloud and Google Drive backups protect your WhatsApp account, but only chat exports give you a portable, future-proof copy you truly own.",
    date: "2026-05-03",
    updated: "2026-05-03",
    author: "ChatReplay Team",
    readTime: "5 min read",
    keywords: [
      "whatsapp backup vs export",
      "whatsapp icloud backup",
      "whatsapp google drive backup",
      "save whatsapp memories",
      "portable whatsapp archive",
    ],
  },
};

const SITE = "https://chatreplay.site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS[params.slug];
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article — ChatReplay" }] };
    const { post } = loaderData;
    const url = `${SITE}/blog/${post.slug}`;
    return {
      meta: [
        { title: `${post.title} | ChatReplay` },
        { name: "description", content: post.description },
        { name: "keywords", content: post.keywords.join(", ") },
        { name: "author", content: post.author },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: post.date },
        { property: "article:modified_time", content: post.updated },
        { property: "article:author", content: post.author },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            author: { "@type": "Organization", name: post.author },
            publisher: {
              "@type": "Organization",
              name: "ChatReplay",
              logo: { "@type": "ImageObject", url: `${SITE}/icon.png` },
            },
            datePublished: post.date,
            dateModified: post.updated,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <p className="mt-4 text-muted-foreground">The article you're looking for doesn't exist.</p>
        <Button asChild className="mt-6"><Link to="/blog">Back to blog</Link></Button>
      </main>
      <SiteFooter />
    </div>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const slug = post.slug;
  if (slug === "how-to-export-whatsapp-chat") return <HowToExportArticle post={post} />;
  if (slug === "save-whatsapp-chat-as-pdf") return <SaveAsPdfArticle post={post} />;
  if (slug === "whatsapp-chat-backup-vs-export") return <BackupVsExportArticle post={post} />;
  return null;
}

function HowToExportArticle({ post }: { post: Post }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link to="/blog" className="hover:text-foreground">Blog</Link>
          {" / "}
          <span className="text-foreground">How to Export a WhatsApp Chat</span>
        </nav>

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            How to Export a WhatsApp Chat (2026 Guide for iPhone &amp; Android)
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            By {post.author} ·{" "}
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>{" "}
            · {post.readTime}
          </p>

          <p className="mt-8 text-lg text-muted-foreground">
            WhatsApp chats hold our most precious conversations — birthdays, late-night confessions, the running jokes only one
            group will ever understand. But WhatsApp itself doesn't make those memories easy to keep. In this guide we'll show
            you exactly how to <strong>export a WhatsApp chat</strong> as a <code>.zip</code> file on both iPhone and Android,
            what's inside the export, and how to render it as a beautiful, scrollable conversation with ChatReplay — all without
            uploading a single byte to anyone's server.
          </p>

          <h2 className="mt-12 text-2xl font-bold">What is a WhatsApp chat export?</h2>
          <p className="mt-3 text-muted-foreground">
            When you export a chat from WhatsApp, the app bundles every message, attachment, voice note, and image from that
            conversation into a single zip archive. Inside, you'll find a <code>_chat.txt</code> file (the message log) and a
            folder of media files referenced by the log. It's the most complete, portable backup WhatsApp lets you create.
          </p>

          <h2 className="mt-12 text-2xl font-bold">How to export a WhatsApp chat on iPhone</h2>
          <ol className="mt-4 list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>Open WhatsApp and tap the chat (or group) you want to export.</li>
            <li>Tap the contact's name at the top to open chat info.</li>
            <li>Scroll down and tap <strong>Export Chat</strong>.</li>
            <li>Choose <strong>Attach Media</strong> if you want photos, videos, and voice notes included. Choose <strong>Without Media</strong> for a smaller, text-only export.</li>
            <li>Save the zip via <strong>Save to Files</strong>, AirDrop, or email it to yourself.</li>
          </ol>

          <h2 className="mt-12 text-2xl font-bold">How to export a WhatsApp chat on Android</h2>
          <ol className="mt-4 list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>Open the chat you want to export.</li>
            <li>Tap the three-dot menu in the top right.</li>
            <li>Tap <strong>More → Export chat</strong>.</li>
            <li>Pick <strong>Include media</strong> or <strong>Without media</strong>.</li>
            <li>Share the zip to Drive, email, or save it locally.</li>
          </ol>

          <h2 className="mt-12 text-2xl font-bold">What's inside the .zip file?</h2>
          <p className="mt-3 text-muted-foreground">
            Open the archive and you'll see a plain-text log named <code>_chat.txt</code> with lines like:
          </p>
          <pre className="mt-4 rounded-lg bg-muted p-4 overflow-x-auto text-sm"><code>{`[01/05/2026, 14:32:11] Sarah: Happy birthday! 🎂
[01/05/2026, 14:33:02] You: <attached: 00001-PHOTO-2026-05-01-14-33-02.jpg>
[01/05/2026, 14:33:40] Sarah: omg cake looks amazing`}</code></pre>
          <p className="mt-3 text-muted-foreground">
            Alongside it sits every photo, video, and voice note referenced by those <code>&lt;attached: ...&gt;</code> lines.
            Together they're a perfect time capsule — but reading raw text isn't quite the same as reliving the chat.
          </p>

          <h2 className="mt-12 text-2xl font-bold">View your export beautifully (and privately)</h2>
          <p className="mt-3 text-muted-foreground">
            That's where ChatReplay comes in. Drop your zip into{" "}
            <Link to="/dashboard" className="underline">the ChatReplay dashboard</Link> and you'll instantly see a pixel-perfect
            recreation of the WhatsApp interface — green bubbles, tails, ticks, dark mode, the works. Voice notes play inline,
            images open in a lightbox, and you can search across the whole conversation.
          </p>
          <p className="mt-3 text-muted-foreground">
            <strong>Privacy is the headline feature</strong>: every byte of parsing happens inside your browser tab. Your zip
            never touches our servers. We literally couldn't read your chats if we wanted to.
          </p>

          <h2 className="mt-12 text-2xl font-bold">Tips for a clean export</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Pick "Attach Media"</strong> if you want voice notes and photos rendered inside ChatReplay.</li>
            <li><strong>Keep the original zip</strong> — don't unzip it before uploading. The parser expects WhatsApp's exact structure.</li>
            <li><strong>Group chats work too.</strong> Each sender gets their own consistent color in the rendered view.</li>
            <li><strong>Long chats?</strong> The Pro plan removes the message cap and renders unlimited conversations.</li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold">Does WhatsApp limit how many messages I can export?</h3>
              <p className="mt-2 text-muted-foreground">
                Yes. With media attached, WhatsApp typically caps exports at the most recent 10,000 messages. Without media, the
                limit rises to 40,000.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Is uploading my export to ChatReplay safe?</h3>
              <p className="mt-2 text-muted-foreground">
                You're not really "uploading" anything. ChatReplay parses the zip directly inside your browser using the same
                JavaScript engine that runs the page — your messages and media never travel to our infrastructure.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Can I export the rendered chat as PDF?</h3>
              <p className="mt-2 text-muted-foreground">
                Yes — PDF export is available on the Plus plan, and PNG / Print exports are unlocked on Pro.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">What if my export is from years ago?</h3>
              <p className="mt-2 text-muted-foreground">
                ChatReplay supports every WhatsApp date format we've seen back to 2014, including both 12-hour and 24-hour clocks.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-xl border border-border bg-card p-6">
            <h3 className="text-xl font-bold">Ready to relive your chats?</h3>
            <p className="mt-2 text-muted-foreground">
              Drop your WhatsApp zip into ChatReplay and see your conversation come back to life — privately, beautifully, instantly.
            </p>
            <Button asChild className="mt-4" style={{ background: "var(--wa-green)", color: "white" }}>
              <Link to="/signup">Try ChatReplay free</Link>
            </Button>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

function ArticleShell({ post, breadcrumb, children }: { post: Post; breadcrumb: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link to="/blog" className="hover:text-foreground">Blog</Link>
          {" / "}
          <span className="text-foreground">{breadcrumb}</span>
        </nav>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            By {post.author} ·{" "}
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>{" "}
            · {post.readTime}
          </p>
          {children}
          <div className="mt-12 rounded-xl border border-border bg-card p-6">
            <h3 className="text-xl font-bold">Try ChatReplay free</h3>
            <p className="mt-2 text-muted-foreground">
              Drop your WhatsApp zip and watch your conversation come back to life — privately, in your browser.
            </p>
            <Button asChild className="mt-4" style={{ background: "var(--wa-green)", color: "white" }}>
              <Link to="/signup">Get started</Link>
            </Button>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

function SaveAsPdfArticle({ post }: { post: Post }) {
  return (
    <ArticleShell post={post} breadcrumb="Save WhatsApp Chat as PDF">
      <p className="mt-8 text-lg text-muted-foreground">
        Saving a WhatsApp chat as a PDF sounds simple — until you try. Screenshots break long conversations into hundreds of
        images, the built-in "Print" trick mangles emojis, and third-party tools demand you upload the entire archive to a
        stranger's server. This guide walks through the cleanest, privacy-respecting way to <strong>save a WhatsApp chat as PDF</strong>
        with formatting, bubbles, and timestamps fully intact.
      </p>
      <h2 className="mt-12 text-2xl font-bold">Why most "WhatsApp to PDF" methods fail</h2>
      <p className="mt-3 text-muted-foreground">
        WhatsApp's native export gives you a plain <code>_chat.txt</code> log and raw media files. Opening that text in a word
        processor produces a wall of monospace text — no green bubbles, no avatars, no chat feel. Online converters technically
        work, but they require uploading every private message you've ever sent. Not great.
      </p>
      <h2 className="mt-12 text-2xl font-bold">The clean method: render first, then export</h2>
      <ol className="mt-4 list-decimal pl-6 space-y-2 text-muted-foreground">
        <li>Export your chat from WhatsApp as a <code>.zip</code> (with or without media).</li>
        <li>Open <Link to="/dashboard" className="underline">ChatReplay</Link> and drop the zip into the uploader.</li>
        <li>Pick a media mode — Text Only, Voice Notes, or Full Media.</li>
        <li>Click <strong>Export → PDF</strong>. ChatReplay renders the entire conversation as a styled WhatsApp chat and saves it as a single PDF.</li>
      </ol>
      <h2 className="mt-12 text-2xl font-bold">What gets preserved in the PDF</h2>
      <ul className="mt-4 list-disc pl-6 space-y-2 text-muted-foreground">
        <li>Sender bubbles with the correct left/right alignment</li>
        <li>Per-sender colors in group chats</li>
        <li>Date separators and "today / yesterday" labels</li>
        <li>Image thumbnails and voice-note durations</li>
        <li>Light or dark mode — your choice</li>
      </ul>
      <h2 className="mt-12 text-2xl font-bold">Privacy</h2>
      <p className="mt-3 text-muted-foreground">
        Everything happens locally in your browser. Your zip, your messages, and the generated PDF never touch our servers.
      </p>
    </ArticleShell>
  );
}

function BackupVsExportArticle({ post }: { post: Post }) {
  return (
    <ArticleShell post={post} breadcrumb="Backup vs Export">
      <p className="mt-8 text-lg text-muted-foreground">
        People often confuse <strong>WhatsApp backups</strong> with <strong>chat exports</strong>. They sound similar but they
        do completely different jobs — and only one of them actually lets you keep your memories if you ever switch apps, lose
        your phone, or want to share a conversation with someone outside WhatsApp.
      </p>
      <h2 className="mt-12 text-2xl font-bold">What a backup does</h2>
      <p className="mt-3 text-muted-foreground">
        iCloud (iPhone) and Google Drive (Android) backups are encrypted bundles designed for one purpose: restoring your account
        on a new phone. You can't open them. You can't read them. If WhatsApp ever locks you out, the backup is useless on its own.
      </p>
      <h2 className="mt-12 text-2xl font-bold">What an export does</h2>
      <p className="mt-3 text-muted-foreground">
        A chat export is a portable <code>.zip</code> file containing a plain-text log and every photo, video, and voice note
        from the conversation. It's yours forever — readable on any device, any year, even if WhatsApp disappears tomorrow.
      </p>
      <h2 className="mt-12 text-2xl font-bold">Side-by-side comparison</h2>
      <ul className="mt-4 list-disc pl-6 space-y-2 text-muted-foreground">
        <li><strong>Backup:</strong> automatic, full account, but encrypted and locked to WhatsApp.</li>
        <li><strong>Export:</strong> manual, single chat at a time, but fully readable and portable.</li>
        <li><strong>Backup:</strong> can be lost if you forget your encryption key.</li>
        <li><strong>Export:</strong> a normal zip file you can store anywhere — Drive, iCloud, a USB stick, your hard drive.</li>
      </ul>
      <h2 className="mt-12 text-2xl font-bold">The right strategy</h2>
      <p className="mt-3 text-muted-foreground">
        Keep both. Let backups handle account recovery. For the chats that actually <em>matter</em> — wedding planning groups,
        long-distance friends, conversations with someone you've lost — export them and view them in{" "}
        <Link to="/" className="underline">ChatReplay</Link> so they look the way you remember.
      </p>
    </ArticleShell>
  );
}