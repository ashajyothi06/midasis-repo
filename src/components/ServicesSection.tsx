import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import serviceAi from "@/assets/AI-Services-img.jpg";
import serviceProject from "@/assets/Project-Services.jpg";
import serviceStaffing from "@/assets/Staff-Augmentation.jpg";
import servicePlacement from "@/assets/service-project.jpg";
import serviceTesting from "@/assets/Software-Testing.jpg";
import serviceConsulting from "@/assets/service-consulting.jpg";
import serviceMaintenance from "@/assets/service-maintenance.jpg";
import serviceDevops from "@/assets/DevOps-and-Automation-Services.jpg";

import aiIcon from "@/assets/Ai-Services-Icon.png";
import projectIcon from "@/assets/Project-Services-Icon.png";
import staffIcon from "@/assets/Staff-Augmentation-Icon.png";
import placementIcon from "@/assets/permanent-placement-icon.png";
import testingIcon from "@/assets/software-testing-icon.png";
import consultingIcon from "@/assets/professional-consulting-icon.png";
import maintenanceIcon from "@/assets/application-maintanance-icon.png";
import devopsIcon from "@/assets/devops-automation.png";

type ServiceCard = {
  title: string;
  image: string;
  logo: string;
  href: string;
};

const services: ServiceCard[] = [
  { title: "A.I. Services", image: serviceAi, logo: aiIcon, href: "/services/ai-services" },
  { title: "Project Services", image: serviceProject, logo: projectIcon, href: "/services/project-services" },
  { title: "Staff Augmentation", image: serviceStaffing, logo: staffIcon, href: "/services/staff-augmentation" },
  { title: "Permanent Placement Service", image: servicePlacement, logo: placementIcon, href: "/services/permanent-placement" },
  { title: "Software Testing", image: serviceTesting, logo: testingIcon, href: "/services/software-testing" },
  { title: "Professional Consulting", image: serviceConsulting, logo: consultingIcon, href: "/services/professional-consulting" },
  {
    title: "Application Maintenance & Management",
    image: serviceMaintenance,
    logo: maintenanceIcon,
    href: "/services/application-maintenance",
  },
  {
    title: "DevOps and Automation Services",
    image: serviceDevops,
    logo: devopsIcon,
    href: "/services/devops-automation",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-[#f5f4ff] w-full">
      {/* slightly reduced side padding */}
      <div className="w-full px-2 sm:px-4 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#f58220]">
            EDATAFORCE CONSULTING LLC
          </p>

          <h2
            className="
              whitespace-nowrap
              font-extrabold 
              text-[#11153b]
              tracking-wide
              text-[1.9rem]
              sm:text-[2.3rem]
              md:text-[2.7rem]
              lg:text-[3rem]
            "
          >
            Our World-Class Services
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className="
                group
                relative
                block
                mx-auto
                w-[96%]          /* slightly wider → less left/right space on mobile */
                sm:w-full
                overflow-hidden
                shadow-xl
                transition-transform
                duration-500
                hover:-translate-y-3
                hover:shadow-2xl
              "
            >
              <div className="relative h-[420px] sm:h-[440px] md:h-[460px] w-full">
                {/* background image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="
                    absolute inset-0
                    h-full w-full object-cover
                    transition-transform duration-500
                    group-hover:scale-110
                  "
                />

                {/* dark overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-[#11153b]/95 via-[#11153b]/60 to-transparent
                    transition-opacity duration-500
                  "
                />

                {/* logo + title */}
                <div className="absolute bottom-20 left-5 flex items-center gap-4">
                  <div
                    className="
                      h-20 w-20
                      flex items-center justify-center
                      bg-[#11153b]
                      shadow-lg
                      transition-transform duration-500
                      group-hover:-translate-y-1 group-hover:translate-x-1
                    "
                  >
                    <img
                      src={service.logo}
                      alt={`${service.title} icon`}
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-white group-hover:text-[#f58220]">
                    {service.title}
                  </h3>
                </div>

                {/* READ MORE – only on hover */}
                <div
                  className="
                    absolute bottom-6 left-5
                    opacity-0 translate-y-2
                    transition-all duration-300
                    group-hover:opacity-100 group-hover:translate-y-0
                  "
                >
                  <span className="flex items-center gap-2 text-lg font-semibold text-[#f58220]">
                    <span className="group-hover:underline">Read More</span>
                    <ArrowRight
                      className="
                        h-5 w-5
                        opacity-0 -translate-x-1
                        transition-all duration-300
                        group-hover:opacity-100 group-hover:translate-x-0
                      "
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <Link to="/services">
            <Button
              variant="orange"
              size="lg"
              className="px-10 py-5 font-semibold tracking-wide"
            >
              All Our Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
