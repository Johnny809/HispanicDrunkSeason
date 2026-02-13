"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";

export function SiteGuard() {
  const [locked, setLocked] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    let active = true;

    const sync = async () => {
      const res = await fetch("/api/security/status", { cache: "no-store" });
      const data = await res.json();
      if (active) setLocked(Boolean(data.locked));
    };

    sync();
    const timer = setInterval(sync, 5000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  if (!locked) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/85 p-6 text-center text-white">
      <div>
        <h2 className="text-2xl font-semibold">{t("securityLock")}</h2>
        <p className="mt-3 text-sm text-slate-200">{t("restore")}</p>
      </div>
    </div>
  );
}
