# Deployment and Cloudflare DNS Notes

## 1) Deploy app first
Deploy DealVista to your hosting platform first (for example Vercel) and obtain the target host/domain details provided by the platform.

## 2) Configure DNS in Cloudflare
In Cloudflare DNS for `getdealvista.com`, create the records required by your hosting platform (typically `A`, `AAAA`, or `CNAME` for apex/www).

## 3) Proxy status guidance
- Start with **DNS only** (gray cloud) while validating SSL, redirects, and origin connectivity.
- After everything is working, switch selected records to **Proxied** (orange cloud) if you want Cloudflare edge features.

## 4) Turnstile env vars
Set these env vars in your hosting environment (never commit secrets):

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_SITE_URL=https://getdealvista.com`

The secret key must stay server-side only.
