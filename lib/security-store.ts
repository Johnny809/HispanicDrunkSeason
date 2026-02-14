import { createHmac } from "crypto";
import { queueNotification } from "@/lib/mock-notifications";

type SecurityState = {
  locked: boolean;
  attackDetectedAt?: string;
  ownerPhone: string;
  ownerEmail: string;
  otpSecret: string;
  incidentLog: string[];
  unlockToken: string;
};

declare global {
  var __dealvistaSecurity: SecurityState | undefined;
}

const state = globalThis.__dealvistaSecurity ?? {
  locked: false,
  ownerPhone: "5162884603",
  ownerEmail: "owner@dealvista.app",
  otpSecret: "dealvista-owner-security-seed",
  incidentLog: [],
  unlockToken: Math.random().toString(36).slice(2, 10)
};
if (!globalThis.__dealvistaSecurity) globalThis.__dealvistaSecurity = state;

function totp(secret: string, step = 30) {
  const counter = Math.floor(Date.now() / 1000 / step);
  const msg = Buffer.alloc(8);
  msg.writeBigUInt64BE(BigInt(counter));
  const hash = createHmac("sha1", secret).update(msg).digest();
  const offset = hash[hash.length - 1] & 0xf;
  const code = (hash.readUInt32BE(offset) & 0x7fffffff) % 1_000_000;
  return String(code).padStart(6, "0");
}

export function getSecurityStatus() {
  return {
    locked: state.locked,
    attackDetectedAt: state.attackDetectedAt,
    ownerEmail: state.ownerEmail,
    incidentLog: state.incidentLog
  };
}

export function triggerAttack() {
  state.locked = true;
  state.attackDetectedAt = new Date().toISOString();
  state.unlockToken = Math.random().toString(36).slice(2, 10);
  state.incidentLog.unshift(`Attack detected and site locked at ${state.attackDetectedAt}`);

  const trustPhrase = "Purple-Lantern";
  const unlockUrl = `https://dealvista-admin.example/unlock?token=${state.unlockToken}`;
  const ownerAlert = queueNotification({
    channel: "sms",
    to: state.ownerPhone,
    subject: "DealVista security lock activated",
    body: `DealVista alert phrase: ${trustPhrase}. Threat detected and site locked. Open ${unlockUrl} and approve unlock with Google Authenticator code.`,
    mode: "demo"
  });

  return { ownerAlert, trustPhrase, unlockUrl };
}

export function unlockWithCode(code: string, token?: string) {
  const valid = code === totp(state.otpSecret) && Boolean(token) && token === state.unlockToken;
  if (!valid) return { ok: false };

  state.locked = false;
  state.incidentLog.unshift(`Site unlocked at ${new Date().toISOString()} after 2FA validation`);

  const customerEmail = queueNotification({
    channel: "email",
    to: "customers@dealvista.app",
    subject: "DealVista service restored + 1-week free annual upgrade",
    body: "We resolved a security incident. Service is stable. Affected users receive one week of annual subscription access.",
    mode: "demo"
  });

  const customerSms = queueNotification({
    channel: "sms",
    to: "subscribed-users",
    subject: "DealVista service restored",
    body: "Service is back online. Affected users receive a 1-week annual plan extension.",
    mode: "demo"
  });

  return { ok: true, customerEmail, customerSms };
}
