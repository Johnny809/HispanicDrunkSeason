"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { priceAlerts, recommendations } from "@/lib/data";

type Category = "tech" | "fashion" | "home" | "beauty";
type Priority = "cheapest" | "best-rated" | "fastest-shipping";

export function DemoForm() {
  const [budget, setBudget] = useState(150);
  const [category, setCategory] = useState<Category>("tech");
  const [priorities, setPriorities] = useState<Priority[]>(["best-rated"]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    let list = recommendations.filter((item) => item.category === category && item.price <= budget + 80);
    if (priorities.includes("cheapest")) list = [...list].sort((a, b) => a.price - b.price);
    if (priorities.includes("best-rated")) list = [...list].sort((a, b) => b.rating - a.rating);
    if (priorities.includes("fastest-shipping")) list = [...list].sort((a, b) => a.shippingDays - b.shippingDays);
    return list.slice(0, 6);
  }, [budget, category, priorities]);

  const togglePriority = (p: Priority) => {
    setPriorities((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  const generate = async () => {
    setLoading(true);
    setGenerated(false);
    await new Promise((res) => setTimeout(res, 1400));
    setLoading(false);
    setGenerated(true);
  };

  return (
    <section className="section-shell py-16">
      <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="glass-card p-7">
          <h1 className="text-3xl font-semibold text-ink">AI shopping demo</h1>
          <p className="mt-2 text-sm text-slate-600">Tune your preferences and see AI-generated recommendations in seconds.</p>

          <div className="mt-8 space-y-6">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Budget: ${budget}</span>
              <input type="range" min={30} max={500} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="mt-3 w-full" />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Category</span>
              <select value={category} onChange={(e) => setCategory(e.target.value as Category)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2">
                <option value="tech">Tech</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home</option>
                <option value="beauty">Beauty</option>
              </select>
            </label>

            <div>
              <p className="text-sm font-medium text-slate-700">I care about</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  ["cheapest", "Cheapest"],
                  ["best-rated", "Best-rated"],
                  ["fastest-shipping", "Fastest shipping"]
                ].map(([value, label]) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => togglePriority(value as Priority)}
                    className={`rounded-full border px-4 py-2 text-sm ${
                      priorities.includes(value as Priority)
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-slate-300 text-slate-600"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={generate} className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white">
              Generate recommendations
            </button>
          </div>

          {loading && <p className="mt-6 text-sm text-indigo-700">AI is scanning stores…</p>}

          {generated && (
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {filtered.map((item, idx) => (
                <motion.article
                  key={item.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.06 }}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium text-ink">{item.name}</p>
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs text-indigo-700">Deal score {item.score}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{item.store} · ${item.price}</p>
                  <p className="mt-2 text-sm text-slate-500">Why this pick: {item.why}</p>
                </motion.article>
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="font-semibold text-ink">Price Drop Alerts</h2>
            <div className="mt-4 space-y-3">
              {priceAlerts.map((alert) => (
                <div key={alert.item} className="rounded-xl border border-slate-200 p-3">
                  <p className="text-sm font-medium text-slate-800">{alert.item}</p>
                  <p className="text-xs text-emerald-700">{alert.drop} · Now {alert.now}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="font-semibold text-ink">Email me alerts</h2>
            <p className="mt-2 text-sm text-slate-600">Get notified when DealVista spots meaningful price drops.</p>
            <input type="email" placeholder="you@company.com" className="mt-4 w-full rounded-xl border border-slate-300 px-3 py-2" />
            <button className="mt-3 w-full rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Notify me</button>
          </div>
        </aside>
      </div>
    </section>
  );
}
