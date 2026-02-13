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

const reviews = globalThis.__dealvistaReviews ?? [
  {
    id: "rev_seed_1",
    username: "smartcart_mia",
    rating: 5,
    comment: "Saved $120 in one week. The section filters are super clean.",
    purchaseConfirmed: true,
    createdAt: new Date().toISOString()
  }
];

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
