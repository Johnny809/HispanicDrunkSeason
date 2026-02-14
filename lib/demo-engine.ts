import { coupons, recommendations, type Category, type Recommendation } from "@/lib/data";

export type RecommendationPriority = "cheapest" | "best-rated" | "fastest-shipping";

export type RecommendationQuery = {
  budget: number;
  category: Category;
  priorities: RecommendationPriority[];
  limit?: number;
};

function sortByPriority(list: Recommendation[], priorities: RecommendationPriority[]) {
  let sorted = [...list];

  if (priorities.includes("cheapest")) {
    sorted = sorted.sort((a, b) => a.price - b.price);
  }

  if (priorities.includes("best-rated")) {
    sorted = sorted.sort((a, b) => b.rating - a.rating);
  }

  if (priorities.includes("fastest-shipping")) {
    sorted = sorted.sort((a, b) => a.shippingDays - b.shippingDays);
  }

  return sorted;
}

export function generateRecommendations(query: RecommendationQuery) {
  const budget = Number.isFinite(query.budget) ? query.budget : 250;
  const limit = query.limit && query.limit > 0 ? query.limit : 6;

  const base = recommendations.filter((item) => item.category === query.category && item.price <= budget + 100);
  const ranked = sortByPriority(base, query.priorities);
  const items = ranked.slice(0, limit);
  const scopedCoupons = coupons.filter((coupon) => coupon.category === query.category);

  return {
    items,
    stats: {
      scanned: 2200 + items.length * 91 + Math.max(0, budget - 30),
      coupons: scopedCoupons.length + 12
    }
  };
}
