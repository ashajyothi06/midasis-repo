import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutBuilding from "@/assets/about-building.png";
import aboutNetwork from "@/assets/about-network.png";
import technologyLogo from "@/assets/technology-logo.png";

const AboutSection = () => {
  return (
    <>
      {/* Updated font rules */}
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

          /* Sub Heading – 18px Roboto */
          #about .sub-heading {
            font-family: "Roboto" !important;
            font-size: 18px !important;
            color: #121158 !important;
            font-weight: 700 !important;
            margin: 0 !important;
          }

          /* Main Heading – 26px Poppins */
          #about .main-heading {
            font-family: "Poppins" !important;
            font-size: 26px !important;
            color: #1B1F2E !important;
            font-weight: 700 !important;
            margin: 0 !important;
          }

          /* Body Text – 18px Roboto */
          #about p,
          #about span,
          #about .body-text {
            font-family: "Roboto" !important;
            font-size: 18px !important;
            color: #000000 !important;
            margin: 0 !important;
          }
        `}
      </style>

      <section id="about" className="py-20 bg-[#f5f4ff]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-[1.4fr,1fr]">

            {/* MOBILE IMAGE CLUSTER */}
            <div className="lg:hidden order-1">
              <div className="relative max-w-sm mx-auto h-[380px]">
                <img
                  src={aboutBuilding}
                  alt="Modern office building"
                  className="absolute top-0 left-0 h-[240px] w-[200px] object-cover shadow-lg"
                />

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

                <img
                  src={aboutNetwork}
                  alt="Digital networking"
                  className="absolute bottom-[-10px] left-[90px] h-[200px] w-[200px] object-cover shadow-lg"
                />

                <div className="absolute bottom-[150px] left-1 grid grid-cols-8 gap-[5px] opacity-40">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#bcbcc9]" />
                  ))}
                </div>
              </div>
            </div>

            {/* TEXT CONTENT */}
            <div className="order-2 lg:order-1 space-y-4">

              {/* Sub Heading */}
              <p className="tracking-wide sub-heading">
                Midasis Consulting LLC
              </p>

              {/* Main Heading */}
              <h2 className="main-heading">
                About Midasis
              </h2>

              {/* Body Text */}
              <p className="leading-relaxed body-text">
                At Midasis Consulting LLC, we are more than just a consulting firm; 
                we are your trusted partner in transforming the way businesses leverage 
                technology to drive success. With a deep commitment to innovation, 
                integrity, and excellence, we stand at the forefront of IT staffing 
                and project augmentations, delivering tailored solutions that empower 
                businesses to thrive in today’s fast-evolving landscape.
              </p>

              <p className="leading-relaxed body-text">
                At Midasis, our mission is to empower businesses with innovative 
                IT solutions, expert talent, and unparalleled service. We are committed 
                to delivering excellence in every engagement, fostering success for our 
                clients, partners, and employees alike.
              </p>

              <Button
                variant="orange"
                size="lg"
                className="px-6 py-5 text-sm font-semibold tracking-wide w-auto mt-4"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* DESKTOP IMAGE CLUSTER */}
            <div className="relative hidden lg:block h-[550px] order-1 lg:order-2">
              <img
                src={aboutBuilding}
                alt="Modern office building"
                className="absolute top-0 left-0 h-[430px] w-[360px] object-cover shadow-xl"
              />

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

              <img
                src={aboutNetwork}
                alt="Digital networking"
                className="absolute bottom-[-15px] left-[120px] h-[300px] w-[300px] object-cover shadow-xl"
              />

              <div className="absolute bottom-[140px] left-4 grid grid-cols-10 gap-[6px] opacity-40">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-[#bcbcc9]" />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
