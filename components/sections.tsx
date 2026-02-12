"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BellRing, Gauge, ShieldCheck, Sparkles, Timer, Wallet } from "lucide-react";

const features = [
  { icon: Sparkles, title: "Personalized Picks", text: "DealVista adapts to your preferences and shopping behavior." },
  { icon: Gauge, title: "Deal Score Engine", text: "Every product gets a transparent AI-driven deal quality score." },
  { icon: BellRing, title: "Price Alerts", text: "Get notified when your saved items hit your ideal price." },
  { icon: Timer, title: "Fast Store Scan", text: "Scan top marketplaces in seconds with one unified feed." },
  { icon: Wallet, title: "Budget Friendly", text: "Set your spend target and get options that match it instantly." },
  { icon: ShieldCheck, title: "Trusted Results", text: "We prioritize verified ratings, shipping performance, and value." }
];

const testimonials = [
  ["DealVista saved me almost $400 this quarter.", "Maya P., Product Designer"],
  ["The recommendations are shockingly accurate.", "Daniel R., Founder"],
  ["Price alerts alone made it worth switching.", "Nina C., Operations Lead"]
];

const plans = [
  ["Free", "$0", "Smart deal feed + basic alerts"],
  ["Pro", "$19", "Advanced AI picks + unlimited alerts"],
  ["Premium", "$49", "Priority deal detection + concierge insights"]
];

export function SocialProof() {
  return (
    <section className="section-shell py-6">
      <div className="glass-card flex flex-wrap items-center justify-center gap-8 p-5 text-sm text-slate-500">
        <span>Trusted by shoppers from</span>
        {[
          "Northstar Ventures",
          "Pixel Commerce",
          "Lumen Labs",
          "Urban Retail Group"
        ].map((logo) => (
          <span key={logo} className="font-medium text-slate-600">{logo}</span>
        ))}
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="features" className="section-shell py-20">
      <h2 className="text-3xl font-semibold text-ink">Features that feel like a buying superpower</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, idx) => (
          <motion.article
            key={feature.title}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="glass-card group p-6 transition hover:-translate-y-1 hover:shadow-indigo-100"
          >
            <feature.icon className="h-6 w-6 text-indigo-600" />
            <h3 className="mt-4 font-semibold text-ink">{feature.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{feature.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-shell py-20">
      <h2 className="text-3xl font-semibold text-ink">How it Works</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {[
          ["1", "Tell us your preferences", "Pick your categories, budget, and priorities."],
          ["2", "AI scans top stores", "DealVista evaluates ratings, pricing trends, and shipping."],
          ["3", "Choose the smartest pick", "Compare confidence-backed recommendations in one view."]
        ].map((step) => (
          <article key={step[0]} className="glass-card p-6">
            <span className="text-sm font-medium text-indigo-600">Step {step[0]}</span>
            <h3 className="mt-2 font-semibold text-ink">{step[1]}</h3>
            <p className="mt-2 text-sm text-slate-600">{step[2]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function LiveRecommendationsSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="section-shell py-20">
      <h2 className="text-3xl font-semibold text-ink">Live AI Recommendations</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          "Top-rated wireless headphones below $150",
          "Fast-shipping skincare bundle with >4.7 rating",
          "Smart home upgrade with highest deal score"
        ].map((text, i) => (
          <motion.div
            key={text}
            animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
            className="glass-card p-5"
          >
            <p className="text-sm text-slate-600">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section-shell py-20">
      <h2 className="text-3xl font-semibold text-ink">Loved by modern shoppers</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {testimonials.map((quote) => (
          <article key={quote[0]} className="glass-card p-6">
            <p className="text-slate-700">“{quote[0]}”</p>
            <p className="mt-4 text-sm text-slate-500">{quote[1]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PricingTeaserSection() {
  return (
    <section className="section-shell py-20">
      <h2 className="text-3xl font-semibold text-ink">Simple pricing</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan[0]}
            className={`glass-card p-6 ${plan[0] === "Pro" ? "ring-2 ring-indigo-400" : ""}`}
          >
            {plan[0] === "Pro" && (
              <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs text-white">Most popular</span>
            )}
            <h3 className="mt-3 font-semibold text-ink">{plan[0]}</h3>
            <p className="mt-1 text-2xl font-semibold text-ink">{plan[1]}<span className="text-sm font-normal text-slate-500">/mo</span></p>
            <p className="mt-3 text-sm text-slate-600">{plan[2]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section className="section-shell pb-8 pt-16">
      <div className="glass-card bg-gradient-to-r from-indigo-600 to-violet-600 p-10 text-white">
        <h2 className="text-3xl font-semibold">Shop smarter with DealVista</h2>
        <p className="mt-3 max-w-2xl text-indigo-100">Start using AI to discover better products, lower prices, and faster delivery today.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/demo" className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink">Try Demo</Link>
          <Link href="/pricing" className="rounded-full border border-white/50 px-5 py-2.5 text-sm font-medium">View Pricing</Link>
        </div>
      </div>
    </section>
  );
}
