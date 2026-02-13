import { NextResponse } from "next/server";
import { createAffiliateVisit } from "@/lib/affiliate";

export async function POST(request: Request) {
  const payload = await request.json();

  const recommendationId = Number(payload?.recommendationId);
  const productName = String(payload?.productName ?? "").trim();
  const store = String(payload?.store ?? "").trim();
  const price = Number(payload?.price);

  if (!recommendationId || !productName || !store || !Number.isFinite(price) || price <= 0) {
    return NextResponse.json({ error: "recommendationId, productName, store, and price are required" }, { status: 400 });
  }

  const transaction = createAffiliateVisit({ recommendationId, productName, store, price });

  return NextResponse.json({
    ok: true,
    affiliateUrl: transaction.affiliateUrl,
    transaction
  });
}
