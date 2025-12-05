import aboutHero from "@/assets/about-hero.jpg";

const ContactHeroSection = () => {
  return (
    <section className="relative h-[300px] md:h-[400px] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutHero})` }}
      >
        <div className="absolute inset-0 bg-navy/70" />
      </div>
      
      <div className="relative z-10 text-center text-primary-foreground">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-primary-foreground/80">
          <span className="hover:text-accent cursor-pointer">Home</span>
          <span className="mx-2">›</span>
          <span className="text-accent">Contact</span>
        </p>
      </div>
    </section>
  );
};

export default ContactHeroSection;
