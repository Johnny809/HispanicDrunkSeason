import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | DealVista",
  description: "Read how DealVista handles your data and protects your privacy."
};

export default function PrivacyPage() {
  return (
    <section className="section-shell py-16 prose prose-slate max-w-3xl">
      <h1>Privacy Policy</h1>
      <p>DealVista collects account details, preference settings, and interaction events to improve recommendation quality.</p>
      <p>We do not sell personal data. We only process information required to deliver deal insights, price alerts, and product recommendations.</p>
      <p>You may request deletion of your data at any time by contacting privacy@dealvista.app.</p>
    </section>
  );
}
