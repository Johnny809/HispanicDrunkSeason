import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ChatAssistant } from "@/components/chat-assistant";
import { LanguageProvider } from "@/components/language-provider";
import { SiteGuard } from "@/components/site-guard";
import { UsageTracker } from "@/components/usage-tracker";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getdealvista.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DealVista | Your personal AI shopping assistant",
  description:
    "DealVista helps you discover smarter deals, personalized recommendations, and real-time price alerts from one elegant AI shopping assistant.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "DealVista",
    description:
      "Premium AI shopping assistant for deal discovery, recommendations, and price alerts.",
    url: siteUrl,
    siteName: "DealVista",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <UsageTracker />
          <div className="relative min-h-screen overflow-x-clip">
            <div className="gradient-orb -top-24 left-0 h-64 w-64 bg-indigo-400" />
            <div className="gradient-orb right-0 top-80 h-72 w-72 bg-violet-300" />
            <Header />
            <main>{children}</main>
            <Footer />
            <ChatAssistant />
            <SiteGuard />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
