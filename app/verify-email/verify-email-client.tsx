"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
export default function VerifyEmailClient() {
  const params = useSearchParams();
  const [email, setEmail] = useState(params.get("email") || "");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const verify = async () => {
    setLoading(true); setError("");
    const res = await fetch("/api/auth/verify-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, code }) });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Failed"); setLoading(false); return; }
    window.location.href = "/home";
  };
  const resend = async () => { await fetch("/api/auth/resend-verification", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }); };
  return <section className="section-shell py-16"><div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><h1 className="text-2xl font-semibold text-ink">Verify your email</h1><div className="mt-6 space-y-3"><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full rounded-xl border border-slate-300 px-3 py-2" /><input value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="6-digit code" className="w-full rounded-xl border border-slate-300 px-3 py-2" />{error && <p className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-xs text-rose-700">{error}</p>}<button disabled={loading} onClick={verify} className="w-full rounded-full bg-ink px-4 py-2 text-sm text-white">{loading ? "Verifying..." : "Verify"}</button><button onClick={resend} className="w-full rounded-full border border-slate-300 px-4 py-2 text-sm">Resend code</button></div></div></section>;
}
