"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";

const navItems = [
  { label: "Home", href: "/home" },
  { label: "Features", href: "/home#features" },
  { label: "How it Works", href: "/home#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Demo", href: "/demo" },
  { label: "Coupons", href: "/coupons" },
  { label: "Reviews", href: "/reviews" },
  { label: "Policies", href: "/policies" }
];

export function Header() {
  const reduceMotion = useReducedMotion();
  const { lang, setLang } = useLanguage();

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -40, opacity: 0 }}
      animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur"
    >
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-ink">
          DealVista
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm text-slate-600 transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "en" | "es")}
            className="rounded-full border border-slate-300 bg-white px-2 py-1 text-xs"
            aria-label="Language"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
          <Link href="/login" className="rounded-full border border-slate-300 px-4 py-2 text-xs font-medium text-slate-700 md:text-sm">Log in</Link>
          <Link href="/signup" className="rounded-full bg-ink px-4 py-2 text-xs font-medium text-white md:text-sm">Sign up</Link>
        </div>
      </div>
    </motion.header>
  );
}
