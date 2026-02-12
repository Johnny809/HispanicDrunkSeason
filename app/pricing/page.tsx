import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | DealVista",
  description: "Compare DealVista plans and find the right fit for your shopping habits."
};

const faqs = [
  ["Can I cancel anytime?", "Yes. All paid plans can be canceled at any time from your account settings."],
  ["Do you support global stores?", "DealVista currently supports major US and EU marketplaces, with more regions coming soon."],
  ["Is there a free plan?", "Yes. The Free plan includes core recommendations and limited price alerts."]
];

export default function PricingPage() {
  return (
    <section className="section-shell py-16">
      <h1 className="text-4xl font-semibold text-ink">Pricing built for every shopper</h1>
      <p className="mt-3 max-w-2xl text-slate-600">Scale from personal deal discovery to premium AI-assisted shopping intelligence.</p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          ["Free", "$0", ["Basic recommendations", "3 price alerts", "Weekly deal digest"]],
          ["Pro", "$19", ["Unlimited recommendations", "Unlimited alerts", "Priority AI scoring"]],
          ["Premium", "$49", ["Everything in Pro", "Concierge insights", "Early access features"]]
        ].map((plan) => (
          <article key={plan[0]} className={`glass-card p-6 ${plan[0] === "Pro" ? "ring-2 ring-indigo-400" : ""}`}>
            {plan[0] === "Pro" && <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs text-white">Most popular</span>}
            <h2 className="mt-3 text-xl font-semibold text-ink">{plan[0]}</h2>
            <p className="mt-2 text-3xl font-semibold text-ink">{plan[1]}<span className="text-sm font-normal text-slate-500">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {(plan[2] as string[]).map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-ink">FAQ</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((faq) => (
            <div key={faq[0]} className="glass-card p-5">
              <h3 className="font-semibold text-ink">{faq[0]}</h3>
              <p className="mt-2 text-sm text-slate-600">{faq[1]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
