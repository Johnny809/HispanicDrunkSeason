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

export default function MarketingHomePage() {
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
