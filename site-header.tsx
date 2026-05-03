import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export function SiteHeader() {
  const { user, signOut } = useAuth();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: "var(--wa-green)" }}>
            <MessageCircle className="h-5 w-5 text-white" />
          </span>
          ChatReplay
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/pricing" activeProps={{ className: "text-foreground" }} className="text-muted-foreground hover:text-foreground">Pricing</Link>
          <Link to="/blog" activeProps={{ className: "text-foreground" }} className="text-muted-foreground hover:text-foreground">Blog</Link>
          <Link to="/about" activeProps={{ className: "text-foreground" }} className="text-muted-foreground hover:text-foreground">About</Link>
          <Link to="/privacy" activeProps={{ className: "text-foreground" }} className="text-muted-foreground hover:text-foreground">Privacy</Link>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm"><Link to="/dashboard">Dashboard</Link></Button>
              <Button onClick={() => signOut()} variant="outline" size="sm">Sign out</Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm"><Link to="/login">Log in</Link></Button>
              <Button asChild size="sm" style={{ background: "var(--wa-green)", color: "white" }}><Link to="/signup">Start Free</Link></Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} ChatReplay. Privacy-first WhatsApp chat viewer.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/about" className="hover:text-foreground">About</Link>
            <Link to="/blog" className="hover:text-foreground">Blog</Link>
            <a href="mailto:hello@chatreplay.site" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}