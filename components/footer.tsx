import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white/80 py-10">
      <div className="section-shell grid gap-8 text-sm text-slate-600 md:grid-cols-4">
        <div>
          <p className="font-semibold text-ink">DealVista</p>
          <p className="mt-2">© {new Date().getFullYear()} DealVista. Smarter shopping starts here.</p>
          <p className="mt-2 text-xs">Support: {siteConfig.supportEmail}</p>
        </div>
        <div>
          <p className="font-semibold text-ink">Explore</p>
          <div className="mt-2 space-y-1">
            <Link href="/demo" className="block hover:text-ink">Demo</Link>
            <Link href="/reviews" className="block hover:text-ink">Reviews</Link>
            <Link href="/coupons" className="block hover:text-ink">Coupons</Link>
            <Link href="/about" className="block hover:text-ink">About</Link>
            <Link href="/signup" className="block hover:text-ink">Signup</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-ink">Policies</p>
          <div className="mt-2 space-y-1">
            <Link href="/policies" className="block hover:text-ink">Policy Hub</Link>
            <Link href="/privacy" className="block hover:text-ink">Privacy</Link>
            <Link href="/terms" className="block hover:text-ink">Terms</Link>
            <Link href="/pricing" className="block hover:text-ink">Pricing & Trials</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-ink">Socials</p>
          <div className="mt-2 space-y-1">
            <a href={siteConfig.social.twitter} target="_blank" rel="noreferrer" className="block hover:text-ink">Twitter</a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="block hover:text-ink">Instagram</a>
            <a href={siteConfig.social.tiktok} target="_blank" rel="noreferrer" className="block hover:text-ink">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
