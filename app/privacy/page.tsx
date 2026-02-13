import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | DealVista",
  description: "Read how DealVista handles your data and protects your privacy."
};

export default function PrivacyPage() {
  return (
    <section className="section-shell py-16 prose prose-slate max-w-3xl">
      <h1>Privacy Policy</h1>
      <p>DealVista collects account details, preference settings, and interaction events to improve recommendation quality and platform reliability.</p>
      <p>We do not sell personal data. We only process information required to deliver deal insights, price alerts, product recommendations, and support operations.</p>

      <h2>Data We Collect</h2>
      <p>We may collect your name, email, phone number, shopping preferences, plan details, and support conversation history when you use interactive features.</p>

      <h2>Communications and Alerts</h2>
      <p>You may opt into email or SMS alerts for deal drops and support updates. You can unsubscribe at any time by using provided opt-out methods.</p>

      <h2>Support Conversations</h2>
      <p>AI assistant interactions may be retained to improve responses and route conversations to human staff when escalation is requested.</p>

      <h2>Retention and Deletion</h2>
      <p>Support tickets and account logs are retained for operational, fraud-prevention, and compliance reasons. You may request deletion by contacting privacy@dealvista.app.</p>

      <h2>Security</h2>
      <p>We use administrative, technical, and organizational safeguards designed to protect account and messaging data. No method is 100% secure.</p>
    </section>
  );
}
