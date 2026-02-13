"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { coupons, hotSales, priceAlerts, recommendations, type Category } from "@/lib/data";
import { useLanguage } from "@/components/language-provider";

type Priority = "cheapest" | "best-rated" | "fastest-shipping";

const categoryCopy: Record<Category, string> = {
  tech: "Phones, accessories, laptops, and smart devices",
  fashion: "Clothing, footwear, and daily essentials",
  home: "Kitchen, appliances, and practical home picks",
  beauty: "Skincare, wellness, and self-care products",
  gaming: "Consoles, peripherals, and gaming accessories",
  furniture: "Desks, chairs, sofas, and space upgrades"
};

export function DemoForm() {
  const [budget, setBudget] = useState(250);
  const [category, setCategory] = useState<Category>("gaming");
  const [priorities, setPriorities] = useState<Priority[]>(["best-rated"]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [scanStats, setScanStats] = useState<{ scanned: number; coupons: number } | null>(null);
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();

  const filtered = useMemo(() => {
    let list = recommendations.filter((item) => item.category === category && item.price <= budget + 100);
    if (priorities.includes("cheapest")) list = [...list].sort((a, b) => a.price - b.price);
    if (priorities.includes("best-rated")) list = [...list].sort((a, b) => b.rating - a.rating);
    if (priorities.includes("fastest-shipping")) list = [...list].sort((a, b) => a.shippingDays - b.shippingDays);
    return list;
  }, [budget, category, priorities]);

  const scopedCoupons = useMemo(() => coupons.filter((coupon) => coupon.category === category), [category]);

  const togglePriority = (p: Priority) => {
    setPriorities((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  const generate = async () => {
    setLoading(true);
    setGenerated(false);
    await new Promise((res) => setTimeout(res, 1200));
    setScanStats({ scanned: 2417 + Math.floor(Math.random() * 1800), coupons: scopedCoupons.length + 12 });
    setLoading(false);
    setGenerated(true);
  };

  return (
    <section className="section-shell py-12 md:py-16">
      <div className="mb-7 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 p-4 text-sm text-slate-700">
        <p className="font-medium text-ink">Organized search sections + global radius simulation</p>
        <p className="mt-1">The AI scans thousands of stores (simulated) and prioritizes affiliate-safe offers with shipping and stock data.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-ink">{t("hottest")}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {hotSales.map((sale) => (
            <article key={sale.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative h-36 w-full">
                <Image src={sale.image} alt={sale.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-4">
                <p className="font-medium text-ink">{sale.title}</p>
                <p className="mt-2 text-xs text-slate-600">{sale.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.25fr,0.75fr]">
        <div className="glass-card p-5 md:p-7">
          <h1 className="text-3xl font-semibold text-ink">{t("demoTitle")}</h1>
          <p className="mt-2 text-sm text-slate-600">Choose a category like Gaming or Furniture to avoid mixed product types in one search.</p>

          <div className="mt-8 space-y-6">
            <div>
              <p className="text-sm font-medium text-slate-700">Popular sections</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["gaming", "furniture", "tech", "fashion", "home", "beauty"] as Category[]).map((item) => (
                  <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full border px-3 py-1.5 text-xs capitalize ${category === item ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-300 text-slate-600"}`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Budget: ${budget}</span>
              <input type="range" min={30} max={600} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="mt-3 w-full" />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Section</span>
              <select value={category} onChange={(e) => setCategory(e.target.value as Category)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2">
                <option value="gaming">Gaming</option>
                <option value="furniture">Furniture</option>
                <option value="tech">Tech</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home</option>
                <option value="beauty">Beauty</option>
              </select>
              <p className="mt-2 text-xs text-slate-500">{categoryCopy[category]}</p>
            </label>

            <div>
              <p className="text-sm font-medium text-slate-700">I care about</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[["cheapest", "Cheapest"], ["best-rated", "Best-rated"], ["fastest-shipping", "Fastest shipping"]].map(([value, label]) => (
                  <button type="button" key={value} onClick={() => togglePriority(value as Priority)} className={`rounded-full border px-4 py-2 text-sm ${priorities.includes(value as Priority) ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-300 text-slate-600"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={generate} className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white">Generate recommendations</button>
          </div>

          {loading && <p className="mt-6 text-sm text-indigo-700">AI is scanning stores…</p>}
          {scanStats && <p className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-xs text-indigo-700">Scanned {scanStats.scanned.toLocaleString()} stores and found {scanStats.coupons} matching coupon opportunities.</p>}

          {generated && (
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {filtered.map((item, idx) => (
                <motion.article key={item.id} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: idx * 0.06 }} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="relative h-32 w-full">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium text-ink">{item.name}</p>
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs text-indigo-700">Deal score {item.score}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-700">${item.price} <span className="text-xs text-slate-500 line-through">${item.originalPrice}</span> · {item.discountPercent}% off</p>
                    <p className="mt-1 text-xs text-slate-600">{item.store} · {item.distanceMiles} miles · {item.offersShipping ? `Ships in ${item.shippingDays}d` : "No shipping"}</p>
                    <p className="mt-1 text-xs text-slate-600">Stock: {item.stock} units</p>
                    <p className="mt-2 text-sm text-slate-500">Why this pick: {item.why}</p>
                    <Link href={`/product/${item.id}`} className="mt-3 inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700">Open listing</Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="font-semibold text-ink">Coupons scanner</h2>
            <p className="mt-1 text-xs text-slate-600">Affiliate-compatible coupon picks for the selected category.</p>
            <div className="mt-4 space-y-3">
              {scopedCoupons.map((coupon) => (
                <div key={coupon.id} className="rounded-xl border border-slate-200 p-3 text-xs">
                  <p className="font-medium text-slate-800">{coupon.store} · {coupon.savingsText}</p>
                  <p className="mt-1 text-indigo-700">Code: <span className="font-semibold">{coupon.code}</span> · Expires in {coupon.expiresInHours}h</p>
                </div>
              ))}
            </div>
            <Link href="/coupons" className="mt-3 inline-flex rounded-full border border-slate-300 px-3 py-1.5 text-xs text-slate-700">View all coupons</Link>
          </div>

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
        </aside>
      </div>
    </section>
  );
}
