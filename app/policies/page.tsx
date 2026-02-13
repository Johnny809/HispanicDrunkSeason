import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Policies | DealVista",
  description: "Central policy hub for terms, privacy, refunds, referrals, communications, and support standards."
};

const sections = [
  { id: "account", title: "Account & Access Policy", text: "Users must provide accurate account information and keep credentials secure." },
  { id: "accuracy", title: "Pricing Accuracy & Merchant Policy", text: "Displayed prices are recommendation snapshots. Merchant checkout is always the source of truth." },
  { id: "refund", title: "Refund Policy", text: "Refund requests are reviewed within 7 days for eligible paid charges based on plan usage and abuse checks." },
  { id: "referrals", title: "Referral Program Policy", text: "Referrals earn recurring commission under anti-fraud controls and payout verification rules." },
  { id: "messaging", title: "Messaging Consent Policy", text: "Email/SMS alerts require user consent and can be opted out at any time." },
  { id: "support", title: "Support Service Policy", text: "AI can escalate to human support. Once opened by staff, the customer receives a callback alert." },
  { id: "security", title: "Security & Abuse Policy", text: "Automated scraping, platform abuse, and fraudulent activity may lead to suspension." }
] as const;

export default function PoliciesPage() {
  return (
    <section className="section-shell py-16">
      <h1 className="text-4xl font-semibold text-ink">Policy Hub</h1>
      <p className="mt-3 max-w-2xl text-slate-600">Everything legal and operational in one organized place.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.75fr,1.25fr]">
        <aside className="glass-card h-fit p-5">
          <p className="text-sm font-semibold text-ink">Jump to section</p>
          <div className="mt-3 space-y-2 text-sm">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="block text-slate-600 hover:text-ink">{section.title}</a>
            ))}
          </div>
          <div className="mt-6 border-t border-slate-200 pt-4 text-sm">
            <Link href="/terms" className="block text-slate-600 hover:text-ink">Read full Terms</Link>
            <Link href="/privacy" className="mt-1 block text-slate-600 hover:text-ink">Read Privacy Policy</Link>
          </div>
        </aside>

        <div className="space-y-4">
          {sections.map((section) => (
            <article key={section.id} id={section.id} className="glass-card scroll-mt-24 p-5">
              <h2 className="font-semibold text-ink">{section.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{section.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
