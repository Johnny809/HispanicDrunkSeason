import type { Metadata } from "next";
import { DemoForm } from "@/components/demo-form";

export const metadata: Metadata = {
  title: "Demo | DealVista",
  description: "Try DealVista's AI shopping demo and preview personalized recommendations."
};

export default function DemoPage() {
  return <DemoForm />;
}
