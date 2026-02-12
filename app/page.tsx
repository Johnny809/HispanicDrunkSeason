import { Hero } from "@/components/hero";
import {
  FeaturesSection,
  FinalCtaSection,
  HowItWorksSection,
  LiveRecommendationsSection,
  PricingTeaserSection,
  SocialProof,
  TestimonialsSection
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <FeaturesSection />
      <HowItWorksSection />
      <LiveRecommendationsSection />
      <TestimonialsSection />
      <PricingTeaserSection />
      <FinalCtaSection />
    </>
  );
}
