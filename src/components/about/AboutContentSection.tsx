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
        {/* mobile 1 column, desktop 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT IMAGE CLUSTER */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[500px] h-[630px] sm:h-[650px] lg:h-[670px]">

              {/* Gray Background Shape */}
              <div className="
                absolute top-[20px] left-[-30px]
                w-[500px] h-[500px]
                bg-[#e8e8e8]
                rounded-[999px]
                -z-10
                opacity-60
              " />

              {/* MAIN IMAGE */}
              <img
                src={aboutTeam1}
                alt="team main"
                className="
                  absolute
                  top-[80px] sm:top-[90px] lg:top-[95px]
                  left-[40px] sm:left-[50px] lg:left-[55px]
                  w-[280px] sm:w-[330px] lg:w-[370px]
                  shadow-xl object-cover
                "
              />

              {/* ORANGE BADGE */}
              <div
                className="
                  absolute
                  top-[165px] sm:top-[175px] lg:top-[185px]
                  right-[10px] sm:right-[35px] lg:right-[50px]
                  bg-[#FF6000] text-white
                  px-6 py-5 shadow-xl
                  max-w-[250px]
                "
              >
                <p className="font-bold text-sm sm:text-base leading-tight">
                  25+ Years Of <br />
                  Experience in <br />
                  IT Solutions
                </p>
              </div>

              {/* SECOND IMAGE — Just Touches the Bottom-Right Corner */}
            {/* SECOND IMAGE — Just Touches the Bottom-Right Corner */}
<div
  className="
    absolute
    bottom-[70px] sm:bottom-[80px] lg:bottom-[40px]   /* moved DOWN on desktop */
    right-[90px] sm:right-[110px] lg:right-[120px]
    w-[240px] sm:w-[270px] lg:w-[285px]
    shadow-xl bg-white
  "
>
  <img
    src={aboutTeam2}
    alt="team second"
    className="w-full h-full object-cover"
  />
</div>


            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col justify-start lg:pt-6">
            <p className="main-heading mb-3">Midasis Consulting LLC</p>
            <h2 className="section-heading mb-6">About Midasis</h2>

            <p className="text-para mb-6">
              At Midasis Consulting LLC, we are more than just a consulting firm; 
              we are your trusted partner in transforming the way businesses leverage 
              technology to drive success. With a deep commitment to innovation, 
              integrity, and excellence, we stand at the forefront of IT staffing 
              and project augmentations, delivering tailored solutions that empower 
              businesses to thrive in today’s fast-evolving landscape.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="sub-heading mb-2">Who We Are</h3>
                <p className="text-para">
                  Founded on the principles of trust, collaboration, and customer-centricity, 
                  midasis is a dynamic consulting firm with extensive experience in the 
                  IT sector. Our team of experts is dedicated to delivering customized 
                  technology solutions that align with your business objectives, enhance 
                  performance, and foster growth.
                </p>
              </div>

              <div>
                <h3 className="sub-heading mb-2">What We Stand For</h3>
                <p className="text-para">
                  Our company values are rooted in delivering measurable outcomes for our 
                  clients. We are passionate about building lasting relationships and 
                  providing services that not only meet but exceed expectations. We 
                  believe in transparency, accountability, and quality—our core pillars 
                  that guide every project we undertake.
                </p>
              </div>

              <div>
                <h3 className="sub-heading mb-2">Our Mission</h3>
                <p className="text-para">
                  At midasis, our mission is to empower businesses by delivering 
                  innovative, results-driven technology solutions that foster growth, 
                  enhance performance, and create lasting value. We are committed to 
                  being a strategic partner to our clients, offering unmatched expertise 
                  in IT consulting, staffing, project management, and digital 
                  transformation.
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
