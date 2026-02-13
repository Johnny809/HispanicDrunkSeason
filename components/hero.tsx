"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-shell grid gap-12 py-20 lg:grid-cols-2 lg:items-center">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-7"
      >
        <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm text-indigo-700">
          AI-powered savings for every cart
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Your personal AI shopping assistant.
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-slate-600">
          Instantly uncover the best deals, receive personalized recommendations, and catch price alerts before everyone else.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/demo" className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:shadow-lg">
            Try Demo
          </Link>
          <Link href="/pricing" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700">
            Join Waitlist
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: 25 }}
        animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="glass-card p-6"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-medium text-ink">DealVista Dashboard</h3>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700">Live Scanning</span>
        </div>
        <div className="space-y-4">
          {[
            ["Noise-Canceling Headphones", "$129", "+24 score"],
            ["Organic Skin Serum", "$39", "+18 score"],
            ["Smart Air Fryer", "$89", "+22 score"]
          ].map((item) => (
            <div key={item[0]} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="font-medium text-slate-800">{item[0]}</p>
              <div className="mt-1 flex justify-between text-sm text-slate-600">
                <span>{item[1]}</span>
                <span>{item[2]}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
