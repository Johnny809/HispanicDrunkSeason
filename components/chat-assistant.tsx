"use client";

import { MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";

type ChatItem = { role: "user" | "assistant"; text: string };

const starterMessage: ChatItem = {
  role: "assistant",
  text: "Hi! I'm DealVista AI. I can help with plans, policies, alerts, and finding product sections like gaming or furniture."
};

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredChannel, setPreferredChannel] = useState<"email" | "sms">("email");
  const [messages, setMessages] = useState<ChatItem[]>([starterMessage]);
  const [status, setStatus] = useState<string>("");

  const onSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const nextUser: ChatItem = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, nextUser]);
    setInput("");

    const low = trimmed.toLowerCase();
    const needsHuman = low.includes("support") || low.includes("refund") || low.includes("problem") || low.includes("help me");

    if (needsHuman) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "I can escalate this to a human specialist. Please share your name/email, choose Email or SMS alert, then tap Request human support."
        }
      ]);
      return;
    }

    const reply = low.includes("policy")
      ? "You can review all policies in the Policies hub (top nav)."
      : low.includes("category") || low.includes("gaming") || low.includes("furniture")
        ? "On the demo page, choose one section like Gaming, Furniture, Home, Tech, Fashion, or Beauty to keep results organized."
        : "I can help compare plans, explain alerts, and point you to the right shopping section.";

    setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
  };

  const requestSupport = async () => {
    setStatus("Sending request...");
    const res = await fetch("/api/support/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        preferredChannel,
        message: messages.map((m) => `${m.role}: ${m.text}`).join("\n")
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus(data?.error ?? "Please add your details so we can notify you when support opens your ticket.");
      return;
    }

    const channelCopy = preferredChannel === "sms" ? "SMS" : "email";
    setStatus(`Done. Please wait a little bit — support has your request. We'll send a ${channelCopy} alert when your ticket is opened.`);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: `Support request created. You'll get a ${channelCopy} notification when a team member joins.` }
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {open ? (
        <div className="w-[23rem] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-semibold text-ink">DealVista AI Assistant</p>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-1 text-slate-500 hover:bg-slate-100"><X className="h-4 w-4" /></button>
          </div>
          <div className="max-h-56 space-y-2 overflow-y-auto rounded-xl bg-slate-50 p-3 text-sm">
            {messages.map((msg, idx) => (
              <p key={`${msg.role}-${idx}`} className={msg.role === "assistant" ? "text-slate-700" : "text-indigo-700"}>{msg.text}</p>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" placeholder="Ask a question..." />
            <button onClick={onSend} className="rounded-xl bg-indigo-600 px-3 text-white"><Send className="h-4 w-4" /></button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <input value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl border border-slate-300 px-3 py-2 text-xs" placeholder="Your name" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl border border-slate-300 px-3 py-2 text-xs" placeholder="Email" />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl border border-slate-300 px-3 py-2 text-xs" placeholder="Phone (for SMS)" />
            <select value={preferredChannel} onChange={(e) => setPreferredChannel(e.target.value as "email" | "sms")} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs">
              <option value="email">Notify by Email</option>
              <option value="sms">Notify by SMS</option>
            </select>
          </div>

          <button onClick={requestSupport} className="mt-2 w-full rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-700">Request human support</button>
          <p className="mt-2 text-[11px] text-slate-500">Demo mode: SMS/email notifications are queued in-app for testing.</p>
          {status && <p className="mt-2 text-xs text-slate-500">{status}</p>}
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-xl"
          aria-label="Open AI assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
