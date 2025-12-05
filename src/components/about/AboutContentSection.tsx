import aboutTeam1 from "@/assets/about-sec.png";
import aboutTeam2 from "@/assets/edataforce-about1a.jpg";

const AboutContentSection = () => {
  return (
    <section className="py-20 bg-[#f5f3ff]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT: Images */}
          <div className="relative flex justify-center lg:justify-start min-h-[600px]">

            {/* Move main image block more left on large screens */}
            <div className="absolute top-4 -left-10 lg:-left-20 w-[520px] h-[520px] bg-[#e8ddff] rounded-[999px]" />

            {/* Top image */}
            <div className="relative z-10 mt-8 ml-4 lg:ml-6 xl:ml-10">
              <img
                src={aboutTeam1}
                alt="eDataForce team professionals"
                className="w-[300px] sm:w-[340px] lg:w-[400px] rounded-lg shadow-xl object-cover"
              />

              {/* Orange Badge */}
              <div className="absolute top-28 -right-14 lg:-right-20 bg-accent text-accent-foreground px-7 py-5 shadow-xl rounded-md">
                <p className="font-bold text-lg leading-tight">25+ Years</p>
                <p className="text-xs sm:text-sm leading-snug">
                  Of Experience in
                  <br />
                  IT Solutions
                </p>
              </div>
            </div>

            {/* Bottom image – moved left slightly for balance */}
            <div className="absolute bottom-4 left-24 sm:left-32 lg:left-40 xl:left-48 z-20">
              <img
                src={aboutTeam2}
                alt="Team collaboration"
                className="w-[260px] sm:w-[300px] lg:w-[340px] rounded-lg shadow-xl object-cover"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col justify-start lg:pt-6">
            <p className="section-label mb-3">eDataForce Consulting LLC</p>
            <h2 className="section-title mb-6">About eDataForce</h2>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              At eDataForce Consulting LLC, we are more than just a consulting
              firm; we are your trusted partner in transforming the way
              businesses leverage technology to drive success. With a deep
              commitment to innovation, integrity, and excellence, we stand at
              the forefront of IT staffing, project augmentation, and technology
              solutions, delivering tailored solutions that empower businesses
              to thrive in today&apos;s fast-evolving landscape.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-navy mb-2">Who We Are</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We are a team of dedicated professionals built on the
                  foundation of trust, collaboration, and customer-centricity.
                  Our expertise spans across industries, enabling us to provide
                  customized solutions that address the unique challenges of
                  each client.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-navy mb-2">
                  What We Stand For
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We believe in building lasting relationships through
                  transparency, accountability, and quality. Our commitment to
                  excellence ensures that every engagement delivers measurable
                  results and exceeds expectations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-navy mb-2">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is to empower businesses with innovative IT
                  solutions, expert talent, and unparalleled service. We are
                  committed to driving digital transformation, enhancing
                  cybersecurity, and delivering scalable technology solutions
                  that foster success for our clients, partners, and employees
                  alike.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutContentSection;
