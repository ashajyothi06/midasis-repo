import TopContactBar from "@/components/TopContactBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import StaffingSection from "@/components/StaffingSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopContactBar />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <StaffingSection />
        <ProcessSection />
        <TestimonialsSection />
        
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
