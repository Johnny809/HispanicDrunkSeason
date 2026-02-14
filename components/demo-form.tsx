"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import type { Category, CouponDeal, Recommendation } from "@/lib/data";
import type { RecommendationPriority } from "@/lib/demo-engine";

type ScanStats = { scanned: number; coupons: number };
type HotSale = { title: string; desc: string; image: string };

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
  const [priorities, setPriorities] = useState<RecommendationPriority[]>(["best-rated"]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [scanStats, setScanStats] = useState<ScanStats | null>(null);
  const [coupons, setCoupons] = useState<CouponDeal[]>([]);
  const [hotSales, setHotSales] = useState<HotSale[]>([]);
  const [priceAlerts, setPriceAlerts] = useState<{ item: string; drop: string; now: string }[]>([]);
  const [error, setError] = useState("");
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();

  useEffect(() => {
    const bootstrap = async () => {
      const res = await fetch("/api/demo/bootstrap", { cache: "no-store" });
      const data = await res.json();
      setCoupons(data.coupons ?? []);
      setHotSales(data.hotSales ?? []);
      setPriceAlerts(data.priceAlerts ?? []);
    };

    bootstrap();
  }, []);

  const togglePriority = (p: RecommendationPriority) => {
    setPriorities((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  const generate = async () => {
    setLoading(true);
    setGenerated(false);
    setError("");

    const res = await fetch("/api/demo/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ budget, category, priorities })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data?.error ?? "Unable to generate recommendations.");
      setLoading(false);
      return;
    }

    setRecommendations(data.items ?? []);
    setScanStats(data.stats ?? null);
    setGenerated(true);
    setLoading(false);
  };

  const scopedCoupons = coupons.filter((coupon) => coupon.category === category);

  return (
    <section className="section-shell py-12 md:py-16">
      <div className="mb-8 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 p-4 text-sm text-slate-700">
        <p className="font-medium text-ink">Backended scanner</p>
        <p className="mt-1">Recommendations, hot sales, and coupons now load through server APIs for cleaner data flow.</p>
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
          <p className="mt-2 text-sm text-slate-600">Choose one section to keep results organized.</p>

          <div className="mt-6 space-y-5">
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
              <div className="mt-2 flex flex-wrap gap-2">
                {([
                  ["cheapest", "Cheapest"],
                  ["best-rated", "Best rated"],
                  ["fastest-shipping", "Fastest shipping"]
                ] as [RecommendationPriority, string][]).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => togglePriority(value)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${priorities.includes(value) ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-300 text-slate-600"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={generate} disabled={loading} className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-white disabled:opacity-60">
              {loading ? "AI is scanning stores..." : "Generate recommendations"}
            </button>
            {error && <p className="text-sm text-rose-600">{error}</p>}
          </div>

          {generated && (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {recommendations.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="relative h-36 w-full">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                  <div className="p-4">
                    <p className="font-medium text-ink">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-600">${item.price} · {item.discountPercent}% off · Stock {item.stock}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.store} · {item.distanceMiles} miles · {item.offersShipping ? `${item.shippingDays} day shipping` : "No shipping"}</p>
                    <Link href={`/product/${item.id}`} className="mt-3 inline-block text-xs font-medium text-indigo-700">Open listing</Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-ink">Price Drop Alerts</h3>
            <div className="mt-3 space-y-2">
              {priceAlerts.map((alert) => (
                <p key={alert.item} className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-700">{alert.item} {alert.drop} · now {alert.now}</p>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-ink">Coupons in this section</h3>
            <div className="mt-3 space-y-2">
              {scopedCoupons.map((coupon) => (
                <p key={coupon.id} className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-700">{coupon.store} · {coupon.code} · {coupon.savingsText}</p>
              ))}
              {scopedCoupons.length === 0 && <p className="text-xs text-slate-500">No active coupons for this section yet.</p>}
            </div>
          </div>

          {scanStats && (
            <div className="glass-card p-5 text-xs text-slate-700">
              <p>Scanned sites: <span className="font-semibold text-ink">{scanStats.scanned}</span></p>
              <p className="mt-2">Coupon matches: <span className="font-semibold text-ink">{scanStats.coupons}</span></p>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
