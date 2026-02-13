import { NextResponse } from "next/server";
import { addReview, listReviews } from "@/lib/review-store";

export async function GET() {
  return NextResponse.json({ reviews: listReviews() });
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
