import { NextResponse } from "next/server";
import { queueNotification } from "@/lib/mock-notifications";
import { openSupportMessage } from "@/lib/support-store";

export async function POST(request: Request) {
  const payload = await request.json();
  const id = String(payload?.id ?? "").trim();

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const opened = openSupportMessage(id);
  if (!opened) {
    return NextResponse.json({ error: "message not found" }, { status: 404 });
  }

  const channel = opened.preferredChannel === "sms" && opened.phone ? "sms" : "email";
  const to = channel === "sms" ? opened.phone! : opened.email;

  const customerAlert = queueNotification({
    channel,
    to,
    subject: "DealVista support is replying now",
    body: `Hi ${opened.name}, a support specialist just opened your conversation and will respond shortly.`,
    mode: "demo"
  });

  return NextResponse.json({ ok: true, item: opened, customerAlert });
}
