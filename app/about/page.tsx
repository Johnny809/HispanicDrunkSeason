import Image from "next/image";

const aboutCards = [
  ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80", "AI ranking engine", "Scores products by quality, price, deal confidence, and fulfillment speed."],
  ["https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80", "Affiliate monetization", "Generates affiliate links, coupons, and tracks payout-ready events from partner merchants."],
  ["https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=900&q=80", "Security + support", "Supports lock mode, Google Authenticator unlock flow, and customer incident notifications."]
] as const;

export default function AboutPage() {
  return (
    <section className="section-shell py-16">
      <h1 className="text-4xl font-semibold text-ink">What DealVista does</h1>
      <p className="mt-3 max-w-3xl text-slate-600">DealVista uses AI ranking logic to scan products worldwide, compare price/rating/shipping signals, and surface monetizable affiliate opportunities with transparent policies and support workflows.</p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {aboutCards.map((item) => (
          <article key={item[1]} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-40 w-full">
              <Image src={item[0]} alt={item[1]} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-ink">{item[1]}</h2>
              <p className="mt-2 text-sm text-slate-600">{item[2]}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
