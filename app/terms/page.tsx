import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | DealVista",
  description: "Review DealVista's terms of service and platform usage guidelines."
};

export default function TermsPage() {
  return (
    <section className="section-shell py-16 prose prose-slate max-w-3xl">
      <h1>Terms of Service</h1>
      <p>By using DealVista, you agree to use the service lawfully and avoid misuse of platform features.</p>
      <p>Recommendation outputs are informational and may vary by inventory, region, and timing.</p>
      <p>Paid subscriptions renew monthly unless canceled before the next billing cycle.</p>
    </section>
  );
}
