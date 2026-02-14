import { NextResponse } from "next/server";
import { addReview, listReviews } from "@/lib/review-store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const pageSize = Math.max(1, Math.min(50, Number(searchParams.get("pageSize") ?? 12)));

  const all = listReviews();
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const reviews = all.slice(start, end);

  return NextResponse.json({
    reviews,
    pagination: {
      page,
      pageSize,
      total: all.length,
      hasMore: end < all.length
    }
  });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const username = String(payload?.username ?? "").trim();
  const comment = String(payload?.comment ?? "").trim();
  const rating = Number(payload?.rating ?? 5);
  const purchaseConfirmed = Boolean(payload?.purchaseConfirmed);

  if (!username || !comment || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "username, comment, and rating(1-5) are required" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, item: addReview({ username, comment, rating, purchaseConfirmed }) });
}
