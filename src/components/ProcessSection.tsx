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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-14 lg:mb-16">
          <p className="text-[10px] sm:text-xs tracking-[0.25em] text-[#f58220] font-semibold mb-3">
            EDATAFORCE CONSULTING LLC
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#15172b]">
            Industry Best Practices to the Core
          </h2>
        </div>

        {/* Curved dashed connector (desktop only) */}
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

        {/* Steps */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {steps.map((step, index) => {
            // stagger up/down on large screens: 1↓ 2↑ 3↓ 4↑
            const offsetClass =
              index % 2 === 0 ? "lg:translate-y-6" : "lg:-translate-y-6";

            return (
              <div key={step.number} className={`relative ${offsetClass}`}>
                <div className="rounded-2xl bg-white shadow-sm hover:shadow-lg lg:hover:shadow-xl transition-shadow overflow-hidden">
                  {/* Image with number badge over it */}
                  <div className="relative">
                    <div className="h-48 sm:h-56 lg:h-[230px] overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Number badge - hover on number only */}
                    <div className="absolute -bottom-6 sm:-bottom-7 right-4 sm:right-6 group">
                      <div
                        className="flex h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center 
                                   rounded-full border-4 border-white bg-[#11185a] shadow-lg 
                                   transition-colors duration-300 group-hover:bg-[#f58220]"
                      >
                        <span className="text-base sm:text-lg font-bold text-white">
                          {step.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text block */}
                  <div className="px-5 sm:px-6 pt-8 sm:pt-9 lg:pt-10 pb-6 sm:pb-8">
                    <h3 className="mb-2 text-base sm:text-lg font-bold text-[#15172b]">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4b4d63]">
                      {step.description}
                    </p>
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
