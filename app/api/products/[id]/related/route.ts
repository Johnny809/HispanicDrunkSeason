import { NextResponse } from "next/server";
import { getRecommendationById, getRelatedRecommendations } from "@/lib/data";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const productId = Number(id);
  const product = getRecommendationById(productId);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.max(1, Math.min(24, Number(searchParams.get("limit") ?? 8)));
  const related = getRelatedRecommendations(product.category, productId).slice(0, limit);

  return NextResponse.json({ related });
}
