import processPlanning from "@/assets/process-planning.jpg";
import processDesign from "@/assets/process-design.jpg";
import processTesting from "@/assets/process-testing.jpg";
import processDelivery from "@/assets/process-delivery.jpg";

const steps = [
  {
    number: "01",
    title: "Planning",
    description: "Define objectives, gather data, and identify project scope.",
    image: processPlanning,
  },
  {
    number: "02",
    title: "Design & Development",
    description: "Develop algorithms, build models, and refine AI architecture.",
    image: processDesign,
  },
  {
    number: "03",
    title: "Project Testing",
    description: "Evaluate performance, validate results, and ensure model accuracy.",
    image: processTesting,
  },
  {
    number: "04",
    title: "Project Delivery",
    description: "Deploy solution, monitor performance, and ensure seamless integration.",
    image: processDelivery,
  },
];

const ProcessSection = () => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-[#f5f4ff]">
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Poppins:wght@400;500;600;700&display=swap");

          .main-heading {
            font-family: 'Roboto', sans-serif !important;
            font-size: 18px !important;
            color: #FF6000 !important;
            letter-spacing: 0.25em;
          }

          .section-heading {
            font-family: 'Poppins', sans-serif !important;
            font-size: 26px !important;
            font-weight: 700;
            color: #121158 !important;
          }

          .step-title {
            font-family: 'Poppins', sans-serif !important;
            font-size: 20px !important;
            font-weight: 600 !important;
            color: #1B1F2F !important;
          }

          .step-description {
            font-family: 'Roboto', sans-serif !important;
            font-size: 16px !important;
            color: #000000 !important;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Headings */}
        <div className="text-center mb-14">
          <p className="main-heading mb-3">MIDASIS CONSULTING LLC</p>

          <h2 className="section-heading">
            Industry Best Practices to the Core
          </h2>
        </div>

        {/* Curved Line (Desktop Only) */}
        <div className="pointer-events-none absolute left-0 right-0 top-[44%] hidden lg:block">
          <svg
            width="100%"
            height="120"
            fill="none"
            stroke="#9f8cff"
            strokeWidth="3"
            strokeDasharray="8 10"
          >
            <path d="M 0 70 C 250 10, 550 120, 900 60 C 1200 10, 1500 120, 1900 60" />
          </svg>
        </div>

        {/* Steps Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => {
            const offsetClass =
              index % 2 === 0 ? "lg:translate-y-6" : "lg:-translate-y-6";

            return (
              <div key={step.number} className={`relative ${offsetClass}`}>
                <div className="bg-white rounded-none shadow-md hover:shadow-xl transition-shadow overflow-hidden">

                  {/* Image */}
                  <div className="relative">
                    <div className="h-48 sm:h-56 lg:h-[230px] overflow-hidden rounded-none">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 rounded-none"
                      />
                    </div>

                    {/* Number Badge */}
                    <div className="absolute -bottom-6 right-6 group">
                      <div className="flex h-14 w-14 lg:h-16 lg:w-16 items-center justify-center 
                                      rounded-full border-4 border-white bg-[#11185a] shadow-lg 
                                      transition-colors duration-300 group-hover:bg-[#f58220]">
                        <span className="text-lg font-bold text-white">
                          {step.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="px-6 pt-10 pb-8 rounded-none">
                    <h3 className="step-title mb-2">{step.title}</h3>
                    <p className="step-description leading-relaxed">{step.description}</p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
