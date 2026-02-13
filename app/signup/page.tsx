"use client";

import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [notice, setNotice] = useState("");

  const submit = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, username, autoGenerate })
    });
    const data = await res.json();
    if (!res.ok) return setNotice(data.error ?? "Unable to create account.");
    setNotice(`Account created for @${data.user.username}`);
  };

  return (
    <section className="section-shell py-16">
      <div className="mx-auto max-w-xl glass-card p-7">
        <h1 className="text-3xl font-semibold text-ink">Create your DealVista account</h1>
        <p className="mt-2 text-sm text-slate-600">Add your details, pick a username, or auto-generate one instantly.</p>
        <div className="mt-6 space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full rounded-xl border border-slate-300 px-3 py-2" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-slate-300 px-3 py-2" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full rounded-xl border border-slate-300 px-3 py-2" />
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full rounded-xl border border-slate-300 px-3 py-2" />
          <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={autoGenerate} onChange={(e) => setAutoGenerate(e.target.checked)} /> Auto-generate username</label>
          <button onClick={submit} className="w-full rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">Create account</button>
          {notice && <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700">{notice}</p>}
        </div>
      </div>
    </section>
  );
}
