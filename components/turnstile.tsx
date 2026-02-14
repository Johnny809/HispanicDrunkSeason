"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, opts: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void }) => void;
      remove?: (widgetId: string) => void;
    };
  }
}

export function Turnstile({ siteKey, onToken }: { siteKey: string; onToken: (token: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!siteKey || !ref.current || !window.turnstile) return;
    ref.current.innerHTML = "";
    window.turnstile.render(ref.current, {
      sitekey: siteKey,
      callback: onToken,
      "expired-callback": () => onToken("")
    });
  }, [siteKey, onToken]);

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer strategy="afterInteractive" />
      <div ref={ref} className="cf-turnstile min-h-16 w-full overflow-hidden" data-sitekey={siteKey} />
    </>
  );
}
