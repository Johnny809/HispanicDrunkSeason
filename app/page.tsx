import Link from "next/link";

export default function IntroPage() {
  return (
    <section className="section-shell py-16 md:py-24">
      <div className="mx-auto max-w-4xl rounded-3xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50 to-violet-100 p-8 text-center shadow-sm md:p-14">
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-600">Welcome to DealVista</p>
        <h1 className="mt-4 text-4xl font-semibold text-ink md:text-5xl">Find deals, coupons, and affiliate offers in one place.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 md:text-base">Our AI-style engine organizes products by category, tracks stock and shipping, and helps you open clean listing pages before you buy.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/home" className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white">Enter main site</Link>
          <Link href="/demo" className="rounded-full border border-slate-300 px-6 py-3 text-sm text-slate-700">Try AI shopping demo</Link>
        </div>
      </div>
    </section>
  );
}
