"use client";

import { useEffect } from "react";

export function UsageTracker() {
  useEffect(() => {
    fetch("/api/usage", { method: "POST" });
  }, []);

  return null;
}
