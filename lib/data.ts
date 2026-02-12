export type Recommendation = {
  id: number;
  name: string;
  category: "tech" | "fashion" | "home" | "beauty";
  price: number;
  score: number;
  store: string;
  shippingDays: number;
  rating: number;
  why: string;
};

export const recommendations: Recommendation[] = [
  { id: 1, name: "AeroNoise Pro Earbuds", category: "tech", price: 89, score: 94, store: "TechHub", shippingDays: 2, rating: 4.8, why: "Top-rated ANC under $100 with strong battery life." },
  { id: 2, name: "Lumen 4K Streaming Stick", category: "tech", price: 49, score: 88, store: "MegaMart", shippingDays: 1, rating: 4.6, why: "Excellent value and same-day shipping in most regions." },
  { id: 3, name: "Cloudweave Overshirt", category: "fashion", price: 72, score: 91, store: "Mode District", shippingDays: 3, rating: 4.7, why: "Premium fabric with high repeat purchase satisfaction." },
  { id: 4, name: "StrideFlex Sneakers", category: "fashion", price: 110, score: 90, store: "Urban Sole", shippingDays: 2, rating: 4.9, why: "Highly rated comfort profile and durable outsole." },
  { id: 5, name: "Noma Smart Air Purifier", category: "home", price: 129, score: 93, store: "HomeSphere", shippingDays: 2, rating: 4.8, why: "Best filter performance per dollar in its class." },
  { id: 6, name: "Luna Ceramic Cook Set", category: "home", price: 99, score: 86, store: "Kitchen Atlas", shippingDays: 4, rating: 4.5, why: "Balanced price and longevity for daily home cooking." },
  { id: 7, name: "VelvetGlow Retinol Serum", category: "beauty", price: 39, score: 95, store: "PureSkin", shippingDays: 2, rating: 4.9, why: "Dermatologist-loved formula with proven results." },
  { id: 8, name: "HydraMist Skin Duo", category: "beauty", price: 58, score: 87, store: "BeautyBarn", shippingDays: 1, rating: 4.6, why: "Fast shipping and strong user results for hydration." },
  { id: 9, name: "Flux Mechanical Keyboard", category: "tech", price: 119, score: 89, store: "KeyCraft", shippingDays: 3, rating: 4.7, why: "Premium switch feel and discounted bundle pricing." },
  { id: 10, name: "Nova Linen Bedding Set", category: "home", price: 145, score: 92, store: "Loft & Co", shippingDays: 3, rating: 4.8, why: "High-quality linen with excellent long-term value." }
];

export const priceAlerts = [
  { item: "AeroNoise Pro Earbuds", drop: "-18%", now: "$89" },
  { item: "VelvetGlow Retinol Serum", drop: "-22%", now: "$39" },
  { item: "Noma Smart Air Purifier", drop: "-14%", now: "$129" }
];
