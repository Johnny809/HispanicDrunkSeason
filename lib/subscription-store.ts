export type DiscountConfig = {
  proPercentOff: number;
  premiumPercentOff: number;
  updatedAt?: string;
};

declare global {
  var __dealvistaDiscounts: DiscountConfig | undefined;
}

const discounts = globalThis.__dealvistaDiscounts ?? { proPercentOff: 0, premiumPercentOff: 0 };
if (!globalThis.__dealvistaDiscounts) globalThis.__dealvistaDiscounts = discounts;

export function getDiscounts() {
  return discounts;
}

export function updateDiscounts(next: Pick<DiscountConfig, "proPercentOff" | "premiumPercentOff">) {
  discounts.proPercentOff = Math.max(0, Math.min(80, next.proPercentOff));
  discounts.premiumPercentOff = Math.max(0, Math.min(80, next.premiumPercentOff));
  discounts.updatedAt = new Date().toISOString();
  return discounts;
}
