import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white/70 py-8">
      <div className="section-shell flex flex-col justify-between gap-4 text-sm text-slate-600 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} DealVista. Smarter shopping starts here.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-ink">Privacy</Link>
          <Link href="/terms" className="hover:text-ink">Terms</Link>
          <Link href="/pricing" className="hover:text-ink">Pricing</Link>
        </div>
      </div>
    </footer>
  );
}
