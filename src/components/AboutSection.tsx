import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutBuilding from "@/assets/about-building.png";
import aboutNetwork from "@/assets/about-network.png";
import technologyLogo from "@/assets/technology-logo.png";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-[#f5f4ff]">
      <div className="max-w-6xl mx-auto px-4">

        {/* GRID WRAPPER — Desktop: Content Left, Images Right */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr,1fr]">

          {/* 🚀 MOBILE IMAGE CLUSTER (Shows FIRST on Mobile) */}
          <div className="lg:hidden order-1">
            <div className="relative max-w-sm mx-auto h-[380px]">

              {/* Building Image */}
              <img
                src={aboutBuilding}
                alt="Modern office building"
                className="absolute top-0 left-0 h-[240px] w-[200px] object-cover shadow-lg"
              />

              {/* Logo shifted to right */}
              <div className="absolute top-8 right-6 flex flex-col items-center">
                <img
                  src={technologyLogo}
                  alt="Technology Logo"
                  className="w-[100px] h-auto drop-shadow-md"
                />
                <span className="mt-1 text-[9px] font-semibold tracking-[0.35em] text-[#26c3a9]">
                  TECHNOLOGY
                </span>
              </div>

              {/* Network image */}
              <img
                src={aboutNetwork}
                alt="Digital networking"
                className="absolute bottom-[-10px] left-[90px] h-[200px] w-[200px] object-cover shadow-lg"
              />

              {/* Dot Pattern */}
              <div className="absolute bottom-[150px] left-1 grid grid-cols-8 gap-[5px] opacity-40">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#bcbcc9]" />
                ))}
              </div>
            </div>
          </div>

          {/* 📝 CONTENT SECTION */}
          <div className="order-2 lg:order-1">
            <p className="mb-3 text-sm font-semibold tracking-wide text-[#5c5e8c]">
              eDataForce Consulting LLC
            </p>

            <h2 className="mb-6 text-4xl font-extrabold text-navy">
              About eDataForce
            </h2>

            <p className="mb-4 leading-relaxed text-[#000] text-base sm:text-lg">
              At eDataForce Consulting LLC, we are more than just a consulting firm; 
              we are your trusted partner in transforming the way businesses leverage 
              technology to drive success. With a deep commitment to innovation, 
              integrity, and excellence, we stand at the forefront of IT staffing 
              and project augmentations, delivering tailored solutions that empower 
              businesses to thrive in today’s fast-evolving landscape.
            </p>

            <p className="mb-8 leading-relaxed text-[#000] text-base sm:text-lg">
              At eDataForce, our mission is to empower businesses with innovative 
              IT solutions, expert talent, and unparalleled service. We are committed 
              to delivering excellence in every engagement, fostering success for our 
              clients, partners, and employees alike.
            </p>

            <Button
              variant="orange"
              size="lg"
              className="px-6 py-5 text-sm font-semibold tracking-wide w-auto"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* 🖼️ DESKTOP IMAGE CLUSTER — RIGHT SIDE */}
          <div className="relative hidden lg:block h-[550px] order-1 lg:order-2">

            {/* Building */}
            <img
              src={aboutBuilding}
              alt="Modern office building"
              className="absolute top-0 left-0 h-[430px] w-[360px] object-cover shadow-xl"
            />

            {/* Logo */}
            <div className="absolute top-6 right-[-100px] flex flex-col items-center">
              <img
                src={technologyLogo}
                alt="Technology Logo"
                className="w-[150px] h-auto drop-shadow-lg"
              />
              <span className="mt-1 text-xs font-semibold tracking-[0.35em] text-[#26c3a9]">
                TECHNOLOGY
              </span>
            </div>

            {/* Network */}
            <img
              src={aboutNetwork}
              alt="Digital networking"
              className="absolute bottom-[-15px] left-[120px] h-[300px] w-[300px] object-cover shadow-xl"
            />

            {/* Dots */}
            <div className="absolute bottom-[140px] left-4 grid grid-cols-10 gap-[6px] opacity-40">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-[#bcbcc9]" />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
