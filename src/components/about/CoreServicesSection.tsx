import { Check } from "lucide-react";

const services = [
  {
    title: "IT Staffing & Recruitment",
    description:
      "Our expertise in sourcing top talent allows us to deliver highly skilled professionals who are a perfect fit for your business. From short-term contract roles to long-term project placements, we ensure you have the right people to achieve your goals.",
  },
  {
    title: "Project Augmentation",
    description:
      "Whether you need additional resources to scale your project or specialized skills for a particular phase, we provide tailored augmentation services to ensure seamless integration with your existing team and operations.",
  },
  {
    title: "Business Process Transformation",
    description:
      "We partner with you to assess, design, and implement business process improvements that enhance efficiency, reduce costs, and improve outcomes.",
  },
  {
    title: "Application Development",
    description:
      "Our team develops and delivers custom applications that are scalable, secure, and aligned with your specific business needs, ensuring optimal performance and user experience.",
  },
  {
    title: "Data Analytics & Business Intelligence",
    description:
      "We help businesses unlock the power of their data by implementing advanced analytics solutions that drive informed decision-making and strategic growth.",
  },
  {
    title: "Cloud Solutions & Digital Transformation",
    description:
      "Leveraging cloud technologies, we offer end-to-end digital transformation services, from strategy and design to implementation and support, ensuring your business is future-ready.",
  },
];

const CoreServicesSection = () => {
  return (
    <section className="py-20 bg-[#f5f4ff]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.25em] text-[#f58220] font-extrabold mb-3">
            EDATAFORCE CONSULTING LLC
          </p>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#11185a]">
            Core Services
          </h2>

          <p className="text-black max-w-3xl mx-auto mt-4 text-base sm:text-lg leading-relaxed">
            At eDataForce, we specialize in a range of services that address the 
            diverse needs of businesses across industries.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="flex items-start gap-4">
              
              {/* Icon */}
              <div className="flex items-center justify-center bg-[#11185a] rounded-full w-11 h-11 flex-shrink-0">
                <Check className="w-6 h-6 text-white" />
              </div>

              {/* Text Block */}
              <div>
                <h3 className="text-xl font-bold text-[#11185a] mb-2">
                  {service.title}
                </h3>

                <p className="text-black leading-relaxed text-[15px] sm:text-[16px]">
                  {service.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CoreServicesSection;
