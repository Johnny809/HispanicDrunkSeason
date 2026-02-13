import { NextResponse } from "next/server";
import { addSupportMessage, listSupportMessages, type SupportChannel } from "@/lib/support-store";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
  return NextResponse.json({ messages: listSupportMessages() });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const name = String(payload?.name ?? "").trim();
  const email = String(payload?.email ?? "").trim();
  const phone = String(payload?.phone ?? "").trim();
  const preferredChannel = (payload?.preferredChannel === "sms" ? "sms" : "email") as SupportChannel;
  const message = String(payload?.message ?? "").trim();

  if (!name || !email || !message || !emailRegex.test(email)) {
    return NextResponse.json({ error: "Valid name, email, and message are required" }, { status: 400 });
  }

  if (preferredChannel === "sms" && !phone) {
    return NextResponse.json({ error: "Phone number is required for SMS alerts" }, { status: 400 });
  }

  const created = addSupportMessage({ name, email, phone: phone || undefined, preferredChannel, message });
  return NextResponse.json({ ok: true, item: created });
}
