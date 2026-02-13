import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | DealVista",
  description: "Review DealVista terms, subscription policies, refunds, referrals, and support coverage."
};

export default function TermsPage() {
  return (
    <section className="section-shell py-16 prose prose-slate max-w-3xl">
      <h1>Terms of Service</h1>
      <p>By using DealVista, you agree to use the service lawfully and avoid misuse of platform features.</p>
      <p>Recommendation outputs are informational and may vary by inventory, region, and timing. Merchant checkout price is always the source of truth.</p>

      <h2>Account, Access, and Eligibility</h2>
      <p>Users must provide accurate registration details and keep account credentials private. We may suspend accounts used for abuse, fraud, or automation attacks.</p>

      <h2>Trials and Billing</h2>
      <p>Paid subscriptions begin with a 3-day free trial when eligible. After trial, billing renews monthly unless canceled before renewal.</p>

      <h2>Refund Policy</h2>
      <p>Monthly subscriptions are eligible for refund requests within 7 days of charge if account usage is low and no abuse is detected. Chargeback abuse may result in account suspension.</p>

      <h2>Referral Policy</h2>
      <p>Approved referrals earn 20% recurring commission for 12 months on paid customers. Fraudulent referral behavior results in forfeited payouts and possible program removal.</p>

      <h2>Messaging and Consent</h2>
      <p>Users can opt into email/SMS deal alerts and support callbacks. Consent can be revoked from account settings or by using unsubscribe/STOP instructions where applicable.</p>

      <h2>Support Service Levels</h2>
      <p>AI support may hand off to human agents. When a ticket is opened, users may receive a callback notification via their preferred alert channel.</p>

      <h2>Acceptable Use and Security</h2>
      <p>You may not reverse engineer, scrape, overload, or probe DealVista security controls. We reserve the right to throttle or block suspicious traffic.</p>

      <h2>Contact</h2>
      <p>For legal or billing requests, contact legal@dealvista.app.</p>
    </section>
  );
}
