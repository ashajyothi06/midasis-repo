import TopContactBar from "@/components/TopContactBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutContentSection from "@/components/about/AboutContentSection";
import CoreServicesSection from "@/components/about/CoreServicesSection";
import AboutTestimonialsSection from "@/components/about/AboutTestimonialsSection";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopContactBar />
      <Header />
      <main>
        <AboutHeroSection />
        <AboutContentSection />
        <CoreServicesSection />
        <AboutTestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
