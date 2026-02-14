import { NextResponse } from "next/server";
import { getRecommendationById } from "@/lib/data";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const row = getRecommendationById(Number(id));

  if (!row) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ product: row });
}
