import { NextResponse } from "next/server";
import { generateRecommendations, type RecommendationPriority } from "@/lib/demo-engine";
import type { Category } from "@/lib/data";

const categorySet = new Set(["tech", "fashion", "home", "beauty", "gaming", "furniture"]);
const prioritySet = new Set(["cheapest", "best-rated", "fastest-shipping"]);

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));

  const rawCategory = String(payload?.category ?? "").trim() as Category;
  const category: Category = categorySet.has(rawCategory) ? rawCategory : "gaming";
  const budget = Number(payload?.budget ?? 250);

  const rawPriorities = Array.isArray(payload?.priorities) ? payload.priorities : [];
  const priorities = rawPriorities
    .map((value: unknown) => String(value).trim() as RecommendationPriority)
    .filter((value: RecommendationPriority) => prioritySet.has(value));

  const result = generateRecommendations({ budget, category, priorities });
  return NextResponse.json(result);
}
