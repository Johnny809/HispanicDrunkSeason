"use client";

import Link from "next/link";
import { useState } from "react";
import { Turnstile } from "@/components/turnstile";

export default function LoginClient({ siteKey }: { siteKey: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password, "cf-turnstile-response": captchaToken }) });
      const data = await res.json();
      if (!res.ok) return setError(data.error ?? "Login failed.");
      window.location.href = "/home";
    } finally {
      setLoading(false);
    }
  };

  return <section className="section-shell py-16"><div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><h1 className="text-2xl font-semibold text-ink">Sign in</h1><div className="mt-6 space-y-3"><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full rounded-xl border border-slate-300 px-3 py-2" /><div className="flex gap-2"><input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Password" className="w-full rounded-xl border border-slate-300 px-3 py-2" /><button type="button" onClick={() => setShowPassword((s) => !s)} className="rounded-xl border border-slate-300 px-3 text-xs">{showPassword ? "Hide" : "Show"}</button></div><Turnstile siteKey={siteKey} onToken={setCaptchaToken} />{error && <p className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-xs text-rose-700">{error}</p>}<button disabled={loading} onClick={submit} className="w-full rounded-full bg-ink px-4 py-2 text-sm text-white disabled:opacity-50">{loading ? "Signing in..." : "Sign in"}</button><div className="text-xs text-slate-500"><Link href="/forgot-password" className="text-sky-700">Forgot password?</Link></div></div></div></section>;
}
