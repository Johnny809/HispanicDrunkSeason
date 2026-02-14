import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://getdealvista.com";
  const routes = [
    "",
    "/home",
    "/demo",
    "/coupons",
    "/pricing",
    "/reviews",
    "/signup",
    "/login",
    "/forgot-password",
    "/about",
    "/policies",
    "/terms",
    "/privacy"
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date()
  }));
}
