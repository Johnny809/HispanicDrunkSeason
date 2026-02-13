export type AffiliateTransaction = {
  id: string;
  recommendationId: number;
  productName: string;
  store: string;
  price: number;
  commissionRate: number;
  commissionAmount: number;
  affiliateUrl: string;
  createdAt: string;
  status: "available" | "withdrawn";
};

export type AffiliateSummary = {
  clicks: number;
  totalRevenue: number;
  availableBalance: number;
  withdrawnTotal: number;
  lastWithdrawalAt?: string;
};

type AffiliateState = {
  transactions: AffiliateTransaction[];
  summary: AffiliateSummary;
};

declare global {
  var __dealvistaAffiliateState: AffiliateState | undefined;
}

const initialState: AffiliateState = {
  transactions: [],
  summary: {
    clicks: 0,
    totalRevenue: 0,
    availableBalance: 0,
    withdrawnTotal: 0
  }
};

const state = globalThis.__dealvistaAffiliateState ?? initialState;
if (!globalThis.__dealvistaAffiliateState) {
  globalThis.__dealvistaAffiliateState = state;
}

const storePrograms: Record<string, { baseUrl: string; commissionRate: number }> = {
  TechHub: { baseUrl: "https://techhub.example/products", commissionRate: 0.05 },
  MegaMart: { baseUrl: "https://megamart.example/item", commissionRate: 0.04 },
  "Mode District": { baseUrl: "https://modedistrict.example/product", commissionRate: 0.08 },
  "Urban Sole": { baseUrl: "https://urbansole.example/product", commissionRate: 0.07 },
  HomeSphere: { baseUrl: "https://homesphere.example/product", commissionRate: 0.06 },
  "Kitchen Atlas": { baseUrl: "https://kitchenatlas.example/product", commissionRate: 0.055 },
  PureSkin: { baseUrl: "https://pureskin.example/product", commissionRate: 0.1 },
  BeautyBarn: { baseUrl: "https://beautybarn.example/product", commissionRate: 0.09 },
  GameGrid: { baseUrl: "https://gamegrid.example/product", commissionRate: 0.06 },
  LootHub: { baseUrl: "https://loothub.example/product", commissionRate: 0.065 },
  Roomline: { baseUrl: "https://roomline.example/product", commissionRate: 0.07 },
  Furnishly: { baseUrl: "https://furnishly.example/product", commissionRate: 0.075 }
};

export function createAffiliateVisit(input: {
  recommendationId: number;
  productName: string;
  store: string;
  price: number;
}) {
  const program = storePrograms[input.store] ?? {
    baseUrl: "https://merchant.example/product",
    commissionRate: 0.04
  };

  const affiliateUrl = `${program.baseUrl}/${input.recommendationId}?utm_source=dealvista&utm_medium=affiliate&utm_campaign=ai_recommendations`;
  const commissionAmount = Number((input.price * program.commissionRate).toFixed(2));

  const transaction: AffiliateTransaction = {
    id: `aff_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    recommendationId: input.recommendationId,
    productName: input.productName,
    store: input.store,
    price: input.price,
    commissionRate: program.commissionRate,
    commissionAmount,
    affiliateUrl,
    createdAt: new Date().toISOString(),
    status: "available"
  };

  state.transactions.unshift(transaction);
  state.summary.clicks += 1;
  state.summary.totalRevenue = Number((state.summary.totalRevenue + commissionAmount).toFixed(2));
  state.summary.availableBalance = Number((state.summary.availableBalance + commissionAmount).toFixed(2));

  return transaction;
}

export function getAffiliateDashboard() {
  return {
    summary: state.summary,
    transactions: state.transactions
  };
}

export function withdrawAffiliateBalance() {
  const amount = state.summary.availableBalance;

  if (amount <= 0) {
    return {
      ok: false,
      amount: 0
    };
  }

  state.summary.availableBalance = 0;
  state.summary.withdrawnTotal = Number((state.summary.withdrawnTotal + amount).toFixed(2));
  state.summary.lastWithdrawalAt = new Date().toISOString();

  state.transactions = state.transactions.map((item) =>
    item.status === "available" ? { ...item, status: "withdrawn" } : item
  );

  return {
    ok: true,
    amount
  };
}
