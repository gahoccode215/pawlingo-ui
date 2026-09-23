import EcosystemSection from "@/components/landing/EcosystemSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import MethodSection from "@/components/landing/MethodSection";
import PathSection from "@/components/landing/PathSection";
import ProgressSection from "@/components/landing/ProgressSection";
import VocabularyDemo from "@/components/landing/VocabularyDemo";

export default function Home() {
  return (
    <div className="min-h-[100dvh] overflow-x-hidden">
      <LandingHeader />
      <main>
        <HeroSection />
        <MethodSection />
        <PathSection />
        <VocabularyDemo />
        <ProgressSection />
        <EcosystemSection />
        <FinalCtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
