export type Category = "tech" | "fashion" | "home" | "beauty" | "gaming" | "furniture";

export type Recommendation = {
  id: number;
  name: string;
  category: Category;
  price: number;
  originalPrice: number;
  discountPercent: number;
  score: number;
  store: string;
  shippingDays: number;
  offersShipping: boolean;
  rating: number;
  stock: number;
  distanceMiles: number;
  image: string;
  description: string;
  why: string;
};

export type CouponDeal = {
  id: string;
  category: Category;
  store: string;
  code: string;
  savingsText: string;
  affiliateEligible: boolean;
  expiresInHours: number;
};

const makeRecommendation = (item: Omit<Recommendation, "discountPercent">): Recommendation => ({
  ...item,
  discountPercent: Math.max(0, Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100))
});

export const recommendations: Recommendation[] = [
  makeRecommendation({ id: 1, name: "AeroNoise Pro Earbuds", category: "tech", price: 89, originalPrice: 119, score: 94, store: "TechHub", shippingDays: 2, offersShipping: true, rating: 4.8, stock: 32, distanceMiles: 14, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80", description: "Premium ANC earbuds with 40-hour battery and adaptive audio.", why: "Top-rated ANC under $100 with strong battery life." }),
  makeRecommendation({ id: 2, name: "Lumen 4K Streaming Stick", category: "tech", price: 49, originalPrice: 69, score: 88, store: "MegaMart", shippingDays: 1, offersShipping: true, rating: 4.6, stock: 75, distanceMiles: 9, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80", description: "Compact 4K stick with voice remote and smart home support.", why: "Excellent value and same-day shipping in most regions." }),
  makeRecommendation({ id: 3, name: "Cloudweave Overshirt", category: "fashion", price: 72, originalPrice: 99, score: 91, store: "Mode District", shippingDays: 3, offersShipping: true, rating: 4.7, stock: 44, distanceMiles: 26, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80", description: "Layer-ready overshirt in breathable all-season blend.", why: "Premium fabric with high repeat purchase satisfaction." }),
  makeRecommendation({ id: 4, name: "StrideFlex Sneakers", category: "fashion", price: 110, originalPrice: 140, score: 90, store: "Urban Sole", shippingDays: 2, offersShipping: true, rating: 4.9, stock: 19, distanceMiles: 22, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80", description: "Lightweight everyday sneaker with responsive sole.", why: "Highly rated comfort profile and durable outsole." }),
  makeRecommendation({ id: 5, name: "Noma Smart Air Purifier", category: "home", price: 129, originalPrice: 169, score: 93, store: "HomeSphere", shippingDays: 2, offersShipping: true, rating: 4.8, stock: 28, distanceMiles: 36, image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80", description: "HEPA purifier with app controls and room analytics.", why: "Best filter performance per dollar in its class." }),
  makeRecommendation({ id: 6, name: "Luna Ceramic Cook Set", category: "home", price: 99, originalPrice: 135, score: 86, store: "Kitchen Atlas", shippingDays: 4, offersShipping: true, rating: 4.5, stock: 11, distanceMiles: 53, image: "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?auto=format&fit=crop&w=800&q=80", description: "Non-toxic ceramic set for high-heat and daily prep.", why: "Balanced price and longevity for daily home cooking." }),
  makeRecommendation({ id: 7, name: "VelvetGlow Retinol Serum", category: "beauty", price: 39, originalPrice: 54, score: 95, store: "PureSkin", shippingDays: 2, offersShipping: true, rating: 4.9, stock: 120, distanceMiles: 18, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80", description: "Night serum with encapsulated retinol and ceramides.", why: "Dermatologist-loved formula with proven results." }),
  makeRecommendation({ id: 8, name: "HydraMist Skin Duo", category: "beauty", price: 58, originalPrice: 79, score: 87, store: "BeautyBarn", shippingDays: 1, offersShipping: true, rating: 4.6, stock: 48, distanceMiles: 12, image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=80", description: "Hydrating mist + cream duo for dry or combo skin.", why: "Fast shipping and strong user results for hydration." }),
  makeRecommendation({ id: 9, name: "Nebula RGB Gaming Headset", category: "gaming", price: 119, originalPrice: 149, score: 89, store: "GameGrid", shippingDays: 3, offersShipping: true, rating: 4.7, stock: 24, distanceMiles: 64, image: "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=800&q=80", description: "Surround-sound headset with low-latency wireless mode.", why: "Low-latency audio and deep discount bundle today." }),
  makeRecommendation({ id: 10, name: "Titan Pro Controller", category: "gaming", price: 79, originalPrice: 109, score: 92, store: "LootHub", shippingDays: 2, offersShipping: true, rating: 4.8, stock: 41, distanceMiles: 88, image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=80", description: "Pro-grade controller with hall-effect sticks and paddles.", why: "High durability and strongest rating in this price tier." }),
  makeRecommendation({ id: 11, name: "Nord Haven Sofa", category: "furniture", price: 399, originalPrice: 529, score: 90, store: "Roomline", shippingDays: 5, offersShipping: true, rating: 4.8, stock: 7, distanceMiles: 132, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80", description: "Three-seat sofa with stain-resistant woven fabric.", why: "Excellent comfort and materials with strong delivery reliability." }),
  makeRecommendation({ id: 12, name: "Elm Arc Desk", category: "furniture", price: 249, originalPrice: 319, score: 88, store: "Furnishly", shippingDays: 4, offersShipping: true, rating: 4.6, stock: 14, distanceMiles: 121, image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80", description: "Wide workspace desk with cable management tray.", why: "Best desk value under $300 with easy assembly support." })
];

export const coupons: CouponDeal[] = [
  { id: "cp_1", category: "gaming", store: "GameGrid", code: "PLAY18", savingsText: "18% off accessories", affiliateEligible: true, expiresInHours: 10 },
  { id: "cp_2", category: "furniture", store: "Roomline", code: "LIVING70", savingsText: "$70 off orders over $700", affiliateEligible: true, expiresInHours: 32 },
  { id: "cp_3", category: "tech", store: "TechHub", code: "FASTSHIP", savingsText: "Free express shipping", affiliateEligible: true, expiresInHours: 18 },
  { id: "cp_4", category: "beauty", store: "PureSkin", code: "GLOW15", savingsText: "15% off skincare bundles", affiliateEligible: true, expiresInHours: 22 }
];

export const hotSales = [
  { title: "Flash Friday Console Drop", desc: "Sold out in 18 minutes — promoted by DealVista today.", image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=1000&q=80" },
  { title: "Luxury Sofa Bundle", desc: "-32% before stock ended. High affiliate conversion window.", image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1000&q=80" },
  { title: "Top-Rated Earbuds Blitz", desc: "Trending globally across 150+ mile shopping radius results.", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?auto=format&fit=crop&w=1000&q=80" }
];

export const priceAlerts = [
  { item: "AeroNoise Pro Earbuds", drop: "-18%", now: "$89" },
  { item: "Nord Haven Sofa", drop: "-11%", now: "$399" },
  { item: "Titan Pro Controller", drop: "-16%", now: "$79" }
];

export function getRecommendationById(id: number) {
  return recommendations.find((item) => item.id === id);
}

export function getRelatedRecommendations(category: Category, excludeId: number) {
  return recommendations.filter((item) => item.category === category && item.id !== excludeId);
}
