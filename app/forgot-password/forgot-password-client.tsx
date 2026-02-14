"use client";
import { useState } from "react";
import { Turnstile } from "@/components/turnstile";

export default function ForgotPasswordClient({ siteKey }: { siteKey: string }) {
  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, "cf-turnstile-response": captchaToken }) });
    const data = await res.json();
    if (!res.ok) setError(data.error ?? "Unable to process request.");
    else setNotice("If that email exists, a reset link has been sent.");
    setLoading(false);
  };

  return <section className="section-shell py-16"><div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><h1 className="text-2xl font-semibold text-ink">Forgot password</h1><div className="mt-6 space-y-3"><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full rounded-xl border border-slate-300 px-3 py-2" /><Turnstile siteKey={siteKey} onToken={setCaptchaToken} /><button disabled={loading} onClick={submit} className="w-full rounded-full bg-ink px-4 py-2 text-sm text-white disabled:opacity-50">{loading ? "Sending..." : "Send reset link"}</button>{error && <p className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-xs text-rose-700">{error}</p>}{notice && <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-2 text-xs text-emerald-700">{notice}</p>}</div></div></section>;
}
