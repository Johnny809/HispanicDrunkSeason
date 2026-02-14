"use client";

import { useEffect, useState } from "react";

type Review = {
  id: string;
  username: string;
  rating: number;
  comment: string;
  purchaseConfirmed: boolean;
  createdAt: string;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const load = async (nextPage: number, append = false) => {
    const res = await fetch(`/api/reviews?page=${nextPage}&pageSize=12`, { cache: "no-store" });
    const data = await res.json();

    const list = data.reviews ?? [];
    setReviews((prev) => (append ? [...prev, ...list] : list));
    setHasMore(Boolean(data?.pagination?.hasMore));
    setPage(nextPage);
  };

  useEffect(() => {
    load(1, false);
  }, []);

  const submit = async () => {
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, rating, comment, purchaseConfirmed })
    });

    if (res.ok) {
      setComment("");
      await load(1, false);
    }
  };

  return (
    <section className="section-shell py-16">
      <h1 className="text-4xl font-semibold text-ink">Reviews</h1>
      <p className="mt-2 text-slate-600">Post reviews and browse feedback loaded from backend pagination.</p>

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
        {reviews.map((review) => (
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

      {hasMore && (
        <button onClick={() => load(page + 1, true)} className="mt-6 rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700">
          Load more reviews
        </button>
      )}
    </section>
  );
}
