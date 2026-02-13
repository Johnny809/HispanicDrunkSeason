"use client";

import { useEffect, useMemo, useState } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  preferredChannel: "email" | "sms";
  message: string;
  createdAt: string;
  status: "waiting" | "opened";
};

type Notification = {
  id: string;
  channel: "email" | "sms";
  to: string;
  subject: string;
  queuedAt: string;
};

type AffiliateTransaction = {
  id: string;
  productName: string;
  store: string;
  commissionAmount: number;
  status: "available" | "withdrawn";
  createdAt: string;
};

export default function AdminPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  type AffiliateSummary = { clicks: number; totalRevenue: number; availableBalance: number; withdrawnTotal: number };

type SecurityStatus = { locked: boolean; totpCodePreview: string; incidentLog: string[]; authenticatorKey: string; unlockToken: string; otpAuthUri: string };

const [affiliateSummary, setAffiliateSummary] = useState<AffiliateSummary | null>(null);
  const [affiliateTransactions, setAffiliateTransactions] = useState<AffiliateTransaction[]>([]);
  const [usage, setUsage] = useState<{ activeUsers: number; totalVisits: number }>({ activeUsers: 0, totalVisits: 0 });
  const [discounts, setDiscounts] = useState({ proPercentOff: 0, premiumPercentOff: 0 });
  const [security, setSecurity] = useState<SecurityStatus | null>(null);
  const [unlockCode, setUnlockCode] = useState("");
  const [notice, setNotice] = useState<string>("");

  const load = async () => {
    const [messagesRes, notificationsRes, affiliateRes, usageRes, discountRes, securityRes] = await Promise.all([
      fetch("/api/support/message"),
      fetch("/api/notifications"),
      fetch("/api/affiliate/summary"),
      fetch("/api/usage"),
      fetch("/api/subscriptions/discount"),
      fetch("/api/security/status")
    ]);

    const messagesJson = await messagesRes.json();
    const notificationsJson = await notificationsRes.json();
    const affiliateJson = await affiliateRes.json();
    const usageJson = await usageRes.json();
    const discountJson = await discountRes.json();
    const securityJson = await securityRes.json();

    setMessages(messagesJson.messages ?? []);
    setNotifications(notificationsJson.notifications ?? []);
    setAffiliateSummary(affiliateJson.summary ?? null);
    setAffiliateTransactions(affiliateJson.transactions ?? []);
    setUsage(usageJson.usage ?? { activeUsers: 0, totalVisits: 0 });
    setDiscounts(discountJson.discounts ?? { proPercentOff: 0, premiumPercentOff: 0 });
    setSecurity(securityJson);
  };

  useEffect(() => { load(); }, []);

  const openForResponse = async (id: string) => {
    setNotice("Opening ticket and notifying customer...");
    const res = await fetch("/api/support/open", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    const data = await res.json();
    setNotice(res.ok ? `Customer ${data.customerAlert.channel.toUpperCase()} alert queued for: ${data.customerAlert.to}` : (data.error ?? "Unable to open ticket."));
    load();
  };

  const withdrawAffiliate = async () => {
    const res = await fetch("/api/affiliate/withdraw", { method: "POST" });
    const data = await res.json();
    setNotice(res.ok ? `Withdrawal queued: $${data.withdrawnAmount.toFixed(2)} moved to payout processing.` : (data.error ?? "Affiliate withdrawal failed."));
    load();
  };

  const saveDiscounts = async () => {
    const res = await fetch("/api/subscriptions/discount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discounts)
    });
    setNotice(res.ok ? "Subscription discounts updated." : "Unable to update discounts.");
    load();
  };

  const triggerAttack = async () => {
    await fetch("/api/security/attack", { method: "POST" });
    setNotice("Security AI lock activated. Owner alert queued.");
    load();
  };

  const unlockSite = async () => {
    const res = await fetch("/api/security/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: unlockCode, token: security?.unlockToken })
    });
    const data = await res.json();
    setNotice(res.ok ? "Site unlocked. Recovery notifications queued." : (data.error ?? "Invalid code"));
    load();
  };

  const waitingCount = useMemo(() => messages.filter((item) => item.status === "waiting").length, [messages]);

  return (
    <section className="section-shell py-16">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-4xl font-semibold text-ink">Admin Panel</h1>
          <p className="mt-2 text-slate-600">Manage traffic, discounts, security, support, and affiliate payouts.</p>
        </div>
        <button onClick={load} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">Refresh queue</button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-5">
        <div className="glass-card p-4"><p className="text-xs text-slate-500">Active users</p><p className="mt-1 text-2xl font-semibold text-ink">{usage.activeUsers}</p></div>
        <div className="glass-card p-4"><p className="text-xs text-slate-500">Total visits</p><p className="mt-1 text-2xl font-semibold text-ink">{usage.totalVisits}</p></div>
        <div className="glass-card p-4"><p className="text-xs text-slate-500">Total tickets</p><p className="mt-1 text-2xl font-semibold text-ink">{messages.length}</p></div>
        <div className="glass-card p-4"><p className="text-xs text-slate-500">Waiting now</p><p className="mt-1 text-2xl font-semibold text-amber-600">{waitingCount}</p></div>
        <div className="glass-card p-4"><p className="text-xs text-slate-500">Affiliate available</p><p className="mt-1 text-2xl font-semibold text-emerald-600">${affiliateSummary?.availableBalance?.toFixed(2) ?? "0.00"}</p></div>
      </div>

      {notice && <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{notice}</p>}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-5">
          <h2 className="text-lg font-semibold text-ink">Subscription discount controls</h2>
          <p className="mt-1 text-xs text-slate-500">Adjust prices for Pro and Premium anytime.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <label className="text-sm">Pro % off
              <input type="number" value={discounts.proPercentOff} onChange={(e) => setDiscounts((p) => ({ ...p, proPercentOff: Number(e.target.value) }))} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" />
            </label>
            <label className="text-sm">Premium % off
              <input type="number" value={discounts.premiumPercentOff} onChange={(e) => setDiscounts((p) => ({ ...p, premiumPercentOff: Number(e.target.value) }))} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" />
            </label>
          </div>
          <button onClick={saveDiscounts} className="mt-4 rounded-full bg-ink px-4 py-2 text-sm text-white">Save discounts</button>
        </div>

        <div className="glass-card p-5">
          <h2 className="text-lg font-semibold text-ink">Security AI center</h2>
          <p className="mt-1 text-xs text-slate-500">Google Authenticator code preview: <span className="font-semibold">{security?.totpCodePreview ?? "------"}</span></p>
          <p className="mt-1 break-all text-xs text-slate-500">Authenticator key: <span className="font-semibold">{security?.authenticatorKey ?? "n/a"}</span></p>
          <p className="mt-1 break-all text-xs text-slate-500">Unlock token: <span className="font-semibold">{security?.unlockToken ?? "n/a"}</span></p>
          <p className="mt-1 text-xs text-slate-500">Status: {security?.locked ? "Locked" : "Online"}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={triggerAttack} className="rounded-full bg-rose-600 px-4 py-2 text-xs text-white">Simulate attack + lock site</button>
            <input value={unlockCode} onChange={(e) => setUnlockCode(e.target.value)} placeholder="Enter 2FA code" className="rounded-xl border border-slate-300 px-3 py-2 text-xs" />
            <button onClick={unlockSite} className="rounded-full bg-emerald-600 px-4 py-2 text-xs text-white">Unlock with code</button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          {messages.length === 0 && <div className="glass-card p-5 text-sm text-slate-600">No support requests yet.</div>}
          {messages.map((item) => (
            <article key={item.id} className="glass-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.email} {item.phone ? `· ${item.phone}` : ""}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs ${item.status === "waiting" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>{item.status}</span>
              </div>
              <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-xs text-slate-700">{item.message}</pre>
              {item.status === "waiting" && <button onClick={() => openForResponse(item.id)} className="mt-3 rounded-full bg-ink px-4 py-2 text-xs font-medium text-white">Open & notify customer</button>}
            </article>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="glass-card p-5">
            <h2 className="text-lg font-semibold text-ink">Affiliate monetization</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-slate-200 p-3"><p className="text-xs text-slate-500">Tracked clicks</p><p className="font-semibold text-ink">{affiliateSummary?.clicks ?? 0}</p></div>
              <div className="rounded-xl border border-slate-200 p-3"><p className="text-xs text-slate-500">Total revenue</p><p className="font-semibold text-ink">${affiliateSummary?.totalRevenue?.toFixed(2) ?? "0.00"}</p></div>
            </div>
            <button onClick={withdrawAffiliate} className="mt-4 w-full rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white">Withdraw all affiliate money</button>
          </div>

          <div className="glass-card p-5">
            <h2 className="text-lg font-semibold text-ink">Recent affiliate transactions</h2>
            <div className="mt-3 space-y-3">
              {affiliateTransactions.slice(0, 8).map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-3 text-xs">
                  <p className="font-semibold text-ink">{item.productName} · {item.store}</p>
                  <p className="mt-1 text-slate-600">Commission: ${item.commissionAmount.toFixed(2)} ({item.status})</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <h2 className="text-lg font-semibold text-ink">Recent queued alerts</h2>
            <div className="mt-4 space-y-3">
              {notifications.slice(0, 6).map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-3 text-xs">
                  <p className="font-semibold text-ink">{item.channel.toUpperCase()} → {item.to}</p>
                  <p className="mt-1 text-slate-500">{item.subject}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
