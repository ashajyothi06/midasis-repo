import aboutHero from "@/assets/about-hero.jpg";

const AboutHeroSection = () => {
  return (
    <section
      className="
        relative 
        h-[320px] 
        md:h-[400px] 
        flex 
        items-center 
        justify-center 
        overflow-hidden
      "
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${aboutHero})` }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-navy/70" />
      </div>

      {/* TEXT */}
      <div className="relative z-10 text-center text-primary-foreground px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-3 leading-tight">
          About
        </h1>

        <p className="text-base md:text-lg">
          <span className="text-primary-foreground/80">Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-accent font-semibold">About</span>
        </p>
      </div>
    </section>
  );
};

export default AboutHeroSection;
