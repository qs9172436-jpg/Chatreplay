import { createFileRoute } from "@tanstack/react-router";

const SITE = "https://chatreplay.site";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const today = new Date().toISOString().split("T")[0];
        const urls = [
          { loc: "/", priority: "1.0", changefreq: "weekly" },
          { loc: "/pricing", priority: "0.9", changefreq: "monthly" },
          { loc: "/about", priority: "0.7", changefreq: "monthly" },
          { loc: "/privacy", priority: "0.5", changefreq: "yearly" },
          { loc: "/blog", priority: "0.8", changefreq: "weekly" },
          { loc: "/blog/how-to-export-whatsapp-chat", priority: "0.8", changefreq: "monthly" },
          { loc: "/blog/save-whatsapp-chat-as-pdf", priority: "0.8", changefreq: "monthly" },
          { loc: "/blog/whatsapp-chat-backup-vs-export", priority: "0.8", changefreq: "monthly" },
          { loc: "/signup", priority: "0.6", changefreq: "yearly" },
          { loc: "/login", priority: "0.4", changefreq: "yearly" },
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${SITE}${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
  )
  .join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});