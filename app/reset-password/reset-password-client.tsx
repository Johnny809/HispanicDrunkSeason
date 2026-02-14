"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
export default function ResetPasswordClient() {
  const token = useSearchParams().get("token") || "";
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const submit = async () => {
    const res = await fetch("/api/auth/reset-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, password }) });
    const data = await res.json();
    if (!res.ok) return setError(data.error ?? "Failed");
    setNotice("Password reset. You can now login.");
  };
  return <section className="section-shell py-16"><div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><h1 className="text-2xl font-semibold text-ink">Reset password</h1><div className="mt-6 space-y-3"><input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="New password" className="w-full rounded-xl border border-slate-300 px-3 py-2" /><button onClick={submit} className="w-full rounded-full bg-ink px-4 py-2 text-sm text-white">Reset password</button>{error && <p className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-xs text-rose-700">{error}</p>}{notice && <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-2 text-xs text-emerald-700">{notice}</p>}</div></div></section>;
}
