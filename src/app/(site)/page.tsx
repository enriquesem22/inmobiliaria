import { Hero } from "@/components/sections/Hero";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Differentiators } from "@/components/sections/Differentiators";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ClientProfiles } from "@/components/sections/ClientProfiles";
import { ZonesSection } from "@/components/sections/ZonesSection";
import { DualCta } from "@/components/sections/DualCta";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <ServicesGrid />
      <Differentiators />
      <ProcessSteps />
      <ClientProfiles />
      <ZonesSection />
      <DualCta />
      <Testimonials />
      <FinalCta />
    </>
  );
}
