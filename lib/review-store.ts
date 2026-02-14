export type Review = {
  id: string;
  username: string;
  rating: number;
  comment: string;
  purchaseConfirmed: boolean;
  createdAt: string;
};

declare global {
  var __dealvistaReviews: Review[] | undefined;
}

const seededReviews: Review[] = [
  { id: "rev_seed_1", username: "smartcart_mia", rating: 5, comment: "Saved $120 in one week. The section filters are super clean.", purchaseConfirmed: true, createdAt: new Date(Date.now() - 1 * 3600_000).toISOString() },
  { id: "rev_seed_2", username: "gearhunter_jay", rating: 5, comment: "Gaming deals are organized and stock status is accurate in demo mode.", purchaseConfirmed: true, createdAt: new Date(Date.now() - 4 * 3600_000).toISOString() },
  { id: "rev_seed_3", username: "homefinds_ava", rating: 4, comment: "Furniture category stopped mixed results and made searching way faster.", purchaseConfirmed: true, createdAt: new Date(Date.now() - 8 * 3600_000).toISOString() },
  { id: "rev_seed_4", username: "couponmaxx", rating: 5, comment: "Coupon center + affiliate listing flow feels polished.", purchaseConfirmed: false, createdAt: new Date(Date.now() - 13 * 3600_000).toISOString() },
  { id: "rev_seed_5", username: "dailydeals_ron", rating: 4, comment: "Great UI on mobile and recommendation filters are clear.", purchaseConfirmed: true, createdAt: new Date(Date.now() - 19 * 3600_000).toISOString() },
  { id: "rev_seed_6", username: "desksetup_em", rating: 5, comment: "Related products section is super helpful when browsing furniture.", purchaseConfirmed: true, createdAt: new Date(Date.now() - 26 * 3600_000).toISOString() }
];

const reviews = globalThis.__dealvistaReviews ?? seededReviews;

if (!globalThis.__dealvistaReviews) globalThis.__dealvistaReviews = reviews;

export function listReviews() {
  return reviews;
}

export function addReview(input: Omit<Review, "id" | "createdAt">) {
  const row: Review = {
    id: `rev_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    ...input
  };
  reviews.unshift(row);
  return row;
}
