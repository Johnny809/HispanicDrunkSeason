import { coupons } from "@/lib/data";

export default function CouponsPage() {
  return (
    <section className="section-shell py-16">
      <h1 className="text-4xl font-semibold text-ink">Coupon center</h1>
      <p className="mt-2 text-slate-600">Daily coupon opportunities discovered by the DealVista scanner (demo mode).</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {coupons.map((coupon) => (
          <article key={coupon.id} className="glass-card p-5">
            <p className="text-xs uppercase text-indigo-600">{coupon.category}</p>
            <h2 className="mt-1 text-lg font-semibold text-ink">{coupon.store}</h2>
            <p className="mt-1 text-sm text-slate-600">{coupon.savingsText}</p>
            <p className="mt-3 text-sm">Code: <span className="rounded bg-slate-100 px-2 py-1 font-semibold">{coupon.code}</span></p>
            <p className="mt-2 text-xs text-slate-500">Expires in {coupon.expiresInHours} hours · Affiliate eligible: {coupon.affiliateEligible ? "Yes" : "No"}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
