"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const navItems = [
  { label: "Features", href: "/#features" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Demo", href: "/demo" }
];

export function Header() {
  const reduceMotion = useReducedMotion();

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
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm text-slate-600 transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/demo"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Join Waitlist
        </Link>
      </div>
    </motion.header>
  );
}
