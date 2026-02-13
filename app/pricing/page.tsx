"use client";

import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/site-config";

type Plan = { name: string; basePrice: number; features: string[]; trial: string };

const plans: Plan[] = [
  { name: "Free", basePrice: 0, features: ["Basic recommendations", "3 price alerts", "Weekly deal digest"], trial: "No trial needed" },
  { name: "Pro", basePrice: 19, features: ["Unlimited recommendations", "Unlimited alerts", "Priority AI scoring"], trial: "Includes 3-day free trial" },
  { name: "Premium", basePrice: 49, features: ["Everything in Pro", "Concierge insights", "Early access features"], trial: "Includes 3-day free trial" }
];

export default function PricingPage() {
  const [discounts, setDiscounts] = useState({ proPercentOff: 0, premiumPercentOff: 0 });

  useEffect(() => {
    fetch("/api/subscriptions/discount")
      .then((res) => res.json())
      .then((data) => setDiscounts(data.discounts ?? { proPercentOff: 0, premiumPercentOff: 0 }));
  }, []);

  const computed = useMemo(() => plans.map((plan) => {
    if (plan.name === "Pro") {
      const finalPrice = Math.max(0, plan.basePrice * (1 - discounts.proPercentOff / 100));
      return { ...plan, finalPrice, discount: discounts.proPercentOff };
    }
    if (plan.name === "Premium") {
      const finalPrice = Math.max(0, plan.basePrice * (1 - discounts.premiumPercentOff / 100));
      return { ...plan, finalPrice, discount: discounts.premiumPercentOff };
    }
    return { ...plan, finalPrice: plan.basePrice, discount: 0 };
  }), [discounts]);

  const faqs = [
    ["Can I cancel anytime?", "Yes. All paid plans can be canceled any time from account settings."],
    ["Do paid plans include a trial?", "Yes. Pro and Premium include a 3-day free trial, limited to one IP/person in this demo model."],
    ["Is pricing 100% guaranteed?", "Displayed prices are estimates from merchant feeds. Final checkout price at the merchant is the source of truth."],
    ["Do you offer referrals?", `Yes. We offer ${siteConfig.referral.commissionPercent}% recurring commission for ${siteConfig.referral.durationMonths} months on paid referrals.`]
  ];

  return (
    <section className="section-shell py-16">
      <h1 className="text-4xl font-semibold text-ink">Pricing built for every shopper</h1>
      <p className="mt-3 max-w-2xl text-slate-600">Launch with confidence, test with free trials, and scale with referral revenue.</p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {computed.map((plan) => (
          <article key={plan.name} className={`glass-card p-6 ${plan.name === "Pro" ? "ring-2 ring-indigo-400" : ""}`}>
            {plan.name === "Pro" && <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs text-white">Most popular</span>}
            <h2 className="mt-3 text-xl font-semibold text-ink">{plan.name}</h2>
            <p className="mt-2 text-3xl font-semibold text-ink">${plan.finalPrice.toFixed(2)}<span className="text-sm font-normal text-slate-500">/mo</span></p>
            {plan.discount > 0 && <p className="text-xs text-emerald-700">{plan.discount}% admin discount active</p>}
            <p className="mt-2 text-xs text-indigo-700">{plan.trial}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {plan.features.map((item) => <li key={item}>• {item}</li>)}
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
