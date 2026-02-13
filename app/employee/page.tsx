"use client";

import { useEffect, useMemo, useState } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  preferredChannel: "email" | "sms";
  createdAt: string;
  status: "waiting" | "opened";
};

export default function EmployeePage() {
  const [messages, setMessages] = useState<Message[]>([]);

  const load = async () => {
    const res = await fetch("/api/support/message");
    const data = await res.json();
    setMessages(data.messages ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const waiting = useMemo(() => messages.filter((msg) => msg.status === "waiting"), [messages]);

  return (
    <section className="section-shell py-16">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-4xl font-semibold text-ink">Employee Panel</h1>
          <p className="mt-2 text-slate-600">Queue view for support responders. Open waiting tickets from Admin to trigger customer alerts.</p>
        </div>
        <button onClick={load} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">Refresh</button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="glass-card p-4"><p className="text-xs text-slate-500">Total conversations</p><p className="mt-1 text-2xl font-semibold text-ink">{messages.length}</p></div>
        <div className="glass-card p-4"><p className="text-xs text-slate-500">Waiting response</p><p className="mt-1 text-2xl font-semibold text-amber-600">{waiting.length}</p></div>
        <div className="glass-card p-4"><p className="text-xs text-slate-500">Opened</p><p className="mt-1 text-2xl font-semibold text-emerald-600">{messages.length - waiting.length}</p></div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {messages.length === 0 && <div className="glass-card p-5 text-sm text-slate-600">No open messages right now.</div>}
        {messages.map((msg) => (
          <article key={msg.id} className="glass-card p-5">
            <p className="font-semibold text-ink">{msg.name}</p>
            <p className="text-xs text-slate-500">{msg.email}</p>
            <p className="mt-2 text-xs text-slate-500">{new Date(msg.createdAt).toLocaleString()}</p>
            <p className="mt-3 text-sm text-slate-700">Status: <span className="font-medium">{msg.status}</span></p>
            <p className="text-xs text-slate-500">Preferred alert: {msg.preferredChannel.toUpperCase()}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
