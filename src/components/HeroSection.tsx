import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black">

      <video
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        className="
          w-full
          aspect-video        /* MOBILE: perfect horizontal rectangle */
          md:h-[90vh]         /* DESKTOP: large cinematic video */
          md:aspect-auto
          object-cover
        "
      />

    </section>
  );
};

export default HeroSection;
