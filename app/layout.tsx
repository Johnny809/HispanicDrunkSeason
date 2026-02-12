import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "DealVista | Your personal AI shopping assistant",
  description:
    "DealVista helps you discover smarter deals, personalized recommendations, and real-time price alerts from one elegant AI shopping assistant.",
  openGraph: {
    title: "DealVista",
    description:
      "Premium AI shopping assistant for deal discovery, recommendations, and price alerts.",
    url: "https://dealvista.app",
    siteName: "DealVista",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <div className="relative min-h-screen overflow-x-clip">
          <div className="gradient-orb -top-24 left-0 h-64 w-64 bg-indigo-400" />
          <div className="gradient-orb right-0 top-80 h-72 w-72 bg-violet-300" />
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
