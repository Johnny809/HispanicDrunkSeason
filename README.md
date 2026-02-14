# DealVista SaaS Landing Page

## Quick Start
```bash
npm install
npm run dev
```

## Install requirements
You only need Node.js 20+ and npm.
All project dependencies install with:
```bash
npm install
```

## Pages
- `/` intro page (welcome + entry)
- `/home` main marketing page
- `/demo` AI shopping demo (now powered by backend recommendation APIs)
- `/product/:id` product listing detail page with affiliate buy flow
- `/coupons` coupon center
- `/pricing` dynamic pricing (admin discounts reflected live)
- `/reviews` post/view reviews with endless feed simulation
- `/signup` account signup with custom or auto-generated username
- `/about` visual overview of how DealVista works
- `/policies`, `/terms`, `/privacy`

### Operations pages (not linked in public nav)
- `/admin` owner admin panel
- `/employee` employee queue panel

## Demo APIs
- Demo backend: `GET /api/demo/bootstrap`, `POST /api/demo/recommendations`
- Products backend: `GET /api/products/:id`, `GET /api/products/:id/related`
- Reviews: `GET/POST /api/reviews`
- Signup: `POST /api/signup`
- Discounts: `GET/POST /api/subscriptions/discount`
- Usage: `GET/POST /api/usage`
- Security: `GET /api/security/status`, `POST /api/security/attack`, `POST /api/security/unlock`
- Affiliate: `POST /api/affiliate/click`, `GET /api/affiliate/summary`, `POST /api/affiliate/withdraw`


## Cloudflare Turnstile configuration
Set these environment variables (for local dev and production):

```bash
CF_TURNSTILE_SITE_KEY=0x4AAAAAACb_9_-gQiiJrEcH
CF_TURNSTILE_SECRET_KEY=0x4AAAAAACb_96mFOBDIVCIxW1GOPUPYE6g
```

If values are copied with extra wrappers (quotes, angle brackets, or spaces), the app now normalizes them at runtime.

## Notes
- Security, affiliate payouts, and notifications run in **demo mode** with in-memory stores.
- SMS/Email alerts are queued as mock notifications unless you connect providers (Twilio/Resend/etc.).
- For production accuracy, use live merchant/catalog integrations and inventory feeds.
