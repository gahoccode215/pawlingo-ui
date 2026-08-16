import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import Features from "@/components/Features";
import Personas from "@/components/Personas";
import WaitlistCta from "@/components/WaitlistCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <WhySection />
      <Features />
      <Personas />
      <WaitlistCta />
      <Footer />
    </>
  );
}
