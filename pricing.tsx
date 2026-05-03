import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — ChatReplay" },
      { name: "description", content: "Free Starter plan, plus affordable Plus and Pro tiers for voice notes, video, and exports." },
    ],
  }),
  component: PricingPage,
});

const plans = [
  { name: "Starter", price: "$0", sub: "Free forever", cta: "Start Free", to: "/signup", features: { "Text Only mode": true, "Voice notes": false, "Video thumbnails": false, "Message limit": "150", "Search": false, "Privacy blur": false, "PDF export": false, "PNG export": false, "Saved chats": "0" } },
  { name: "Plus", price: "$3.99", sub: "per month · $29/yr", cta: "Choose Plus", to: "/signup", featured: true, features: { "Text Only mode": true, "Voice notes": true, "Video thumbnails": false, "Message limit": "5,000", "Search": true, "Privacy blur": true, "PDF export": true, "PNG export": false, "Saved chats": "3" } },
  { name: "Pro", price: "$7.99", sub: "per month · $59/yr", cta: "Choose Pro", to: "/signup", features: { "Text Only mode": true, "Voice notes": true, "Video thumbnails": true, "Message limit": "Unlimited", "Search": true, "Privacy blur": true, "PDF export": true, "PNG export": true, "Saved chats": "10" } },
];

function PricingPage() {
  const allFeatures = Object.keys(plans[0].features);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Pricing</h1>
          <p className="mt-4 text-muted-foreground">Pay only for what you need. Cancel anytime.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`rounded-2xl border p-6 bg-card ${p.featured ? "border-2 shadow-lg" : "border-border"}`} style={p.featured ? { borderColor: "var(--wa-green)" } : undefined}>
              {p.featured && <div className="text-xs font-bold mb-2" style={{ color: "var(--wa-green)" }}>MOST POPULAR</div>}
              <h3 className="font-bold text-lg">{p.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{p.price}</span>
              </div>
              <p className="text-sm text-muted-foreground">{p.sub}</p>
              <Button asChild className="mt-6 w-full" style={p.featured ? { background: "var(--wa-green)", color: "white" } : undefined} variant={p.featured ? "default" : "outline"}>
                <Link to={p.to}>{p.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-16 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-left font-semibold">Feature</th>
                {plans.map((p) => <th key={p.name} className="p-4 text-center font-semibold">{p.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((feat) => (
                <tr key={feat} className="border-t border-border">
                  <td className="p-4">{feat}</td>
                  {plans.map((p) => {
                    const v = (p.features as Record<string, string | boolean>)[feat];
                    return (
                      <td key={p.name} className="p-4 text-center">
                        {typeof v === "boolean" ? (v ? <Check className="h-5 w-5 inline" style={{ color: "var(--wa-green)" }} /> : <X className="h-5 w-5 inline text-muted-foreground/50" />) : v}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Billing isn't enabled yet — all new accounts start on Starter. Plus and Pro will be available soon.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}