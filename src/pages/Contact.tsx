import TopContactBar from "@/components/TopContactBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHeroSection from "@/components/contact/ContactHeroSection";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactMapSection from "@/components/contact/ContactMapSection";
import CTABand from "@/components/CTABand";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopContactBar />
      <Header />
      <ContactHeroSection />
      <ContactFormSection />
      <ContactMapSection />
      
      <Footer />
    </div>
  );
};

export default Contact;
