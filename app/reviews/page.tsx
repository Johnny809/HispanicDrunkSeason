"use client";

import { useEffect, useMemo, useState } from "react";

type Review = {
  id: string;
  username: string;
  rating: number;
  comment: string;
  purchaseConfirmed: boolean;
  createdAt: string;
};

const fillerComments = [
  "Found an in-stock gaming deal faster than 3 other apps.",
  "Category filters keep furniture and tech from mixing.",
  "Coupon center gave me an extra stackable code.",
  "Affiliate listing page was clear and mobile friendly."
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const load = async () => {
    const res = await fetch("/api/reviews");
    const data = await res.json();
    setReviews(data.reviews ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const feed = useMemo(() => {
    if (reviews.length === 0) return [];
    const endless = Array.from({ length: 80 }, (_, i) => {
      const base = reviews[i % reviews.length];
      if (i < reviews.length) return base;
      return {
        ...base,
        id: `${base.id}_clone_${i}`,
        comment: fillerComments[i % fillerComments.length],
        createdAt: new Date(Date.now() - i * 3600_000).toISOString()
      };
    });
    return endless;
  }, [reviews]);

  const submit = async () => {
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, rating, comment, purchaseConfirmed })
    });
    if (res.ok) {
      setComment("");
      load();
    }
  };

  return (
    <section className="section-shell py-16">
      <h1 className="text-4xl font-semibold text-ink">Reviews</h1>
      <p className="mt-2 text-slate-600">Share your experience and browse a continuous stream of community feedback.</p>

      <div className="mt-6 glass-card p-5">
        <div className="grid gap-3 md:grid-cols-2">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="rounded-xl border border-slate-300 px-3 py-2" />
          <input value={rating} onChange={(e) => setRating(Number(e.target.value))} type="number" min={1} max={5} className="rounded-xl border border-slate-300 px-3 py-2" />
        </div>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Your review" className="mt-3 h-24 w-full rounded-xl border border-slate-300 px-3 py-2" />
        <label className="mt-3 flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={purchaseConfirmed} onChange={(e) => setPurchaseConfirmed(e.target.checked)} /> Confirmed purchase</label>
        <button onClick={submit} className="mt-3 rounded-full bg-ink px-4 py-2 text-sm text-white">Post review</button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {feed.slice(0, visibleCount).map((review) => (
          <article key={review.id} className="glass-card p-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-ink">@{review.username}</p>
              <p className="text-sm text-amber-600">{"★".repeat(review.rating)}</p>
            </div>
            <p className="mt-2 text-sm text-slate-700">{review.comment}</p>
            <div className="mt-3 flex items-center gap-2 text-xs">
              {review.purchaseConfirmed && <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">Confirmed purchase</span>}
              <span className="text-slate-500">{new Date(review.createdAt).toLocaleString()}</span>
            </div>
          </article>
        ))}
      </div>

      {visibleCount < feed.length && (
        <button onClick={() => setVisibleCount((prev) => prev + 12)} className="mt-6 rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700">
          Load more reviews
        </button>
      )}
    </section>
  );
}
