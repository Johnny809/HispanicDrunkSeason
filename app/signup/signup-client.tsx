"use client";

import Link from "next/link";
import { useState } from "react";
import { Turnstile } from "@/components/turnstile";

export default function SignupClient({ siteKey }: { siteKey: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword, "cf-turnstile-response": captchaToken })
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error ?? "Unable to sign up.");
      setNotice("Account created. Check your email for your verification code.");
      setTimeout(() => {
        window.location.href = `/verify-email?email=${encodeURIComponent(email)}`;
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-shell py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-ink">Create account</h1>
        <p className="mt-2 text-sm text-slate-600">Secure signup with email verification.</p>
        <div className="mt-6 space-y-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full rounded-xl border border-slate-300 px-3 py-2" />
          <div className="flex gap-2">
            <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Password" className="w-full rounded-xl border border-slate-300 px-3 py-2" />
            <button type="button" onClick={() => setShowPassword((s) => !s)} className="rounded-xl border border-slate-300 px-3 text-xs">{showPassword ? "Hide" : "Show"}</button>
          </div>
          <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Confirm Password" className="w-full rounded-xl border border-slate-300 px-3 py-2" />
          <Turnstile siteKey={siteKey} onToken={setCaptchaToken} />
          {error && <p className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-xs text-rose-700">{error}</p>}
          {notice && <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-2 text-xs text-emerald-700">{notice}</p>}
          <button disabled={loading} onClick={submit} className="w-full rounded-full bg-ink px-4 py-2 text-sm font-medium text-white disabled:opacity-50">{loading ? "Creating..." : "Create account"}</button>
        </div>
        <p className="mt-4 text-xs text-slate-500">Already have an account? <Link href="/login" className="text-sky-700">Sign in</Link></p>
      </div>
    </section>
  );
}
