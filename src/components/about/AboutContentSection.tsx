import aboutTeam1 from "@/assets/about-sec.png";
import aboutTeam2 from "@/assets/edataforce-about1a.jpg";

const AboutContentSection = () => {
  return (
    <section className="py-20 bg-[#f5f3ff]">
      {/* FONT RULES */}
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Poppins:wght@400;500;600;700&display=swap");

          .main-heading {
            font-family: 'Roboto', sans-serif !important;
            font-size: 18px !important;
            color: #FF6000 !important;
            letter-spacing: 0.25em !important;
            font-weight: 700 !important;
          }

          .section-heading {
            font-family: 'Poppins', sans-serif !important;
            font-size: 26px !important;
            font-weight: 700 !important;
            color: #121158 !important;
          }

          .sub-heading {
            font-family: 'Roboto', sans-serif !important;
            font-size: 18px !important;
            color: #121158 !important;
            font-weight: 700 !important;
          }

          .text-para {
            font-family: 'Roboto', sans-serif !important;
            font-size: 18px !important;
            color: #000000 !important;
            line-height: 1.65 !important;
          }
        `}
      </style>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT SIDE IMAGES */}
          <div className="relative flex justify-center lg:justify-start min-h-[600px]">
            <div className="absolute top-4 -left-10 lg:-left-20 w-[520px] h-[520px] bg-[#e8ddff] rounded-[999px]" />

            {/* Main Image */}
            <div className="relative z-10 mt-8 ml-4 lg:ml-6 xl:ml-10">
              <img
                src={aboutTeam1}
                alt="eDataForce team professionals"
                className="w-[300px] sm:w-[340px] lg:w-[400px] rounded-lg shadow-xl object-cover"
              />

              <div className="absolute top-28 -right-14 lg:-right-20 bg-accent text-accent-foreground px-7 py-5 shadow-xl rounded-md">
                <p className="font-bold text-lg leading-tight">25+ Years</p>
                <p className="text-xs sm:text-sm leading-snug">
                  Of Experience in<br />IT Solutions
                </p>
              </div>
            </div>

            {/* Second Image */}
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

            {/* MAIN HEADING */}
            <p className="main-heading mb-3">eDataForce Consulting LLC</p>

            {/* SECTION HEADING */}
            <h2 className="section-heading mb-6">About eDataForce</h2>

            {/* INTRO PARAGRAPH */}
            <p className="text-para mb-6">
              At eDataForce Consulting LLC, we are more than just a consulting firm; we are your trusted partner in transforming the way businesses leverage technology to drive success. With a deep commitment to innovation, integrity, and excellence, we stand at the forefront of IT staffing and project augmentations, delivering tailored solutions that empower businesses to thrive in today’s fast-evolving landscape.
            </p>

            <div className="space-y-8">

              {/* WHO WE ARE */}
              <div>
                <h3 className="sub-heading mb-2">Who We Are</h3>
                <p className="text-para">
                  Founded on the principles of trust, collaboration, and customer-centricity, eDataForce is a dynamic consulting firm with extensive experience in the IT sector. Our team of experts is dedicated to delivering customized technology solutions that align with your business objectives, enhance performance, and foster growth.
                </p>
              </div>

              {/* WHAT WE STAND FOR */}
              <div>
                <h3 className="sub-heading mb-2">What We Stand For</h3>
                <p className="text-para">
                  Our company values are rooted in delivering measurable outcomes for our clients. We are passionate about building lasting relationships and providing services that not only meet but exceed expectations. We believe in transparency, accountability, and quality—our core pillars that guide every project we undertake.
                </p>
              </div>

              {/* OUR MISSION */}
              <div>
                <h3 className="sub-heading mb-2">Our Mission</h3>
                <p className="text-para">
                  At eDataForce, our mission is to empower businesses by delivering innovative, results-driven technology solutions that foster growth, enhance performance, and create lasting value. We are committed to being a strategic partner to our clients, offering unmatched expertise in IT consulting, staffing, project management, and digital transformation. With an unwavering focus on quality, integrity, and security, we strive to provide flexible, tailored services that address the most complex business challenges. Our team of expert consultants, armed with top-tier technical knowledge and a relentless commitment to excellence, ensures that every project is executed with precision and efficiency. We are driven by a passion to not only meet but exceed expectations, positioning our clients for long-term success in an ever-evolving digital landscape.
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
