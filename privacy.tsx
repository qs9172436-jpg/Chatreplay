import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ChatReplay" },
      { name: "description", content: "How ChatReplay handles your data. Spoiler: your chats never leave your browser." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-16 prose prose-slate dark:prose-invert">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: 1 May 2026</p>

        <h2 className="mt-8 text-2xl font-bold">1. What we collect</h2>
        <p className="mt-2 text-muted-foreground">
          We collect the minimum needed to give you an account: your email address and your name. Nothing else.
          Your <strong>WhatsApp chat exports never touch our servers</strong>. Zip parsing, media extraction, and rendering all
          happen entirely in your browser.
        </p>

        <h2 className="mt-8 text-2xl font-bold">2. How we use your data</h2>
        <p className="mt-2 text-muted-foreground">
          Email and name are used to authenticate you, track your subscription plan, and send essential service emails
          (e.g. password reset). We do not sell, share, or use your data for advertising.
        </p>

        <h2 className="mt-8 text-2xl font-bold">3. Cookies</h2>
        <p className="mt-2 text-muted-foreground">
          We use a session cookie to keep you logged in. We do not use third-party tracking or advertising cookies.
        </p>

        <h2 className="mt-8 text-2xl font-bold">4. Third parties</h2>
        <p className="mt-2 text-muted-foreground">
          We use a managed backend provider for authentication and database storage, and Stripe for billing
          (when paid plans launch). Both are GDPR-compliant.
        </p>

        <h2 className="mt-8 text-2xl font-bold">5. Your rights</h2>
        <p className="mt-2 text-muted-foreground">
          You can delete your account at any time, which permanently removes your profile from our database. You can also
          request an export of the personal data we hold about you by emailing us.
        </p>

        <h2 className="mt-8 text-2xl font-bold">6. Contact</h2>
        <p className="mt-2 text-muted-foreground">
          Privacy questions? Email{" "}
          <a className="underline" href="mailto:privacy@chatreplay.site">privacy@chatreplay.site</a>.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}