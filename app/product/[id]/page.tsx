"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Recommendation } from "@/lib/data";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [product, setProduct] = useState<Recommendation | null>(null);
  const [related, setRelated] = useState<Recommendation[]>([]);
  const [notice, setNotice] = useState("");
  const [visibleRelated, setVisibleRelated] = useState(4);

  useEffect(() => {
    const load = async () => {
      const productRes = await fetch(`/api/products/${id}`, { cache: "no-store" });
      const productData = await productRes.json();
      if (!productRes.ok) {
        setProduct(null);
        return;
      }

      setProduct(productData.product);

      const relatedRes = await fetch(`/api/products/${id}/related?limit=24`, { cache: "no-store" });
      const relatedData = await relatedRes.json();
      setRelated(relatedData.related ?? []);
    };

    if (Number.isFinite(id)) load();
  }, [id]);

  if (!product) return <section className="section-shell py-16"><p className="text-slate-600">Product not found.</p></section>;

  const buyNow = async () => {
    const res = await fetch("/api/affiliate/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recommendationId: product.id, productName: product.name, store: product.store, price: product.price })
    });
    const data = await res.json();
    if (!res.ok) return setNotice(data?.error ?? "Unable to generate affiliate link.");
    setNotice(`Affiliate secured (${product.discountPercent}% off). Redirecting to ${product.store}...`);
    window.open(data.affiliateUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="section-shell py-12">
      <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1fr,1fr] md:p-8">
        <div className="relative h-72 overflow-hidden rounded-2xl md:h-full">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-indigo-600">{product.category}</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">{product.name}</h1>
          <p className="mt-3 text-sm text-slate-600">{product.description}</p>
          <p className="mt-4 text-2xl font-semibold text-ink">${product.price} <span className="text-sm font-normal text-slate-500 line-through">${product.originalPrice}</span></p>
          <p className="mt-1 text-sm text-emerald-700">Save {product.discountPercent}% today</p>

          <div className="mt-5 grid gap-2 text-sm text-slate-700">
            <p>Store: {product.store}</p>
            <p>Distance: {product.distanceMiles} miles</p>
            <p>Shipping: {product.offersShipping ? `Available (${product.shippingDays} day estimate)` : "Not available"}</p>
            <p>In stock: {product.stock} units</p>
            <p>Rating: {product.rating.toFixed(1)} / 5</p>
          </div>

          <button onClick={buyNow} className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white">Buy with affiliate</button>
          {notice && <p className="mt-3 rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-xs text-indigo-700">{notice}</p>}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-ink">More in {product.category}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {related.slice(0, visibleRelated).map((item) => (
            <Link key={item.id} href={`/product/${item.id}`} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5">
              <p className="font-medium text-ink">{item.name}</p>
              <p className="mt-1 text-sm text-slate-600">${item.price} · {item.discountPercent}% off · Stock {item.stock}</p>
            </Link>
          ))}
        </div>
        {visibleRelated < related.length && (
          <button onClick={() => setVisibleRelated((prev) => prev + 4)} className="mt-4 rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700">Load more products</button>
        )}
      </div>
    </section>
  );
}
